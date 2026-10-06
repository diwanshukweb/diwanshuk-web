import { getStore } from "@netlify/blobs";
import type { Config, Context } from "@netlify/functions";
import { createHmac, randomUUID } from "node:crypto";

type Channel = "email" | "sms";
type Session = {
  email: string; phone: string; expires: number;
  emailVerified: boolean; smsVerified: boolean;
  emailSid?: string; smsSid?: string;
  emailSent?: number; smsSent?: number;
  emailAttempts: number; smsAttempts: number;
  submitted?: boolean;
};
class Failure extends Error { constructor(message: string, public status = 400) { super(message); } }
const reply = (data: object, status = 200) => Response.json(data, { status, headers: { "Cache-Control": "no-store" } });
const env = (key: string) => Netlify.env.get(key) || "";
const store = () => getStore({ name: "enquiry-verification", consistency: "strong" });
function hash(value: string) { return createHmac("sha256", env("OTP_STORAGE_SECRET")).update(value).digest("hex"); }
export function contacts(email: unknown, phone: unknown) {
  if (typeof email !== "string" || typeof phone !== "string") throw new Failure("Enter your email and phone number.");
  const cleanEmail = email.trim().toLowerCase();
  let cleanPhone = phone.replace(/[\s()-]/g, "");
  if (/^[6-9]\d{9}$/.test(cleanPhone)) cleanPhone = `+91${cleanPhone}`;
  if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(cleanEmail) || cleanEmail.length > 200) throw new Failure("Enter a valid email address.");
  if (!/^\+[1-9]\d{7,14}$/.test(cleanPhone)) throw new Failure("Enter a valid phone number with country code, e.g. +91 7065908203.");
  return { email: cleanEmail, phone: cleanPhone };
}
async function limit(key: string, max: number, window: number) {
  const db = store();
  const bucket = `limits/${hash(key)}/${Math.floor(Date.now() / window)}`;
  for (let i = 0; i < 5; i++) {
    const existing = await db.getWithMetadata(bucket, { type: "json" });
    if (existing && !existing.etag) throw new Failure("Please try again later.", 503);
    const count = existing ? Number(existing.data.count) : 0;
    if (count >= max) throw new Failure("Too many requests. Please try later or contact me on WhatsApp.", 429);
    const result = await db.setJSON(bucket, { count: count + 1, expires: Date.now() + window * 2 }, existing ? { onlyIfMatch: existing.etag } : { onlyIfNew: true });
    if (result.modified) return;
  }
  throw new Failure("Please try again shortly.", 429);
}
export function requireVerified(session: Session, email: string, phone: string, now = Date.now()) {
  if (session.expires <= now) throw new Failure("Verification expired. Start again.", 410);
  if (session.submitted) throw new Failure("This enquiry has already been submitted.", 409);
  if (!session.emailVerified || !session.smsVerified) throw new Failure("Verify both your email and phone first.", 403);
  if (email !== session.email || phone !== session.phone) throw new Failure("Contact details changed. Verify them again.", 403);
}
async function change(id: string, fn: (session: Session) => void) {
  const db = store();
  for (let i = 0; i < 5; i++) {
    const existing = await db.getWithMetadata(`sessions/${id}`, { type: "json" });
    if (!existing || existing.data.expires <= Date.now()) throw new Failure("Verification expired. Start again.", 410);
    if (!existing.etag) throw new Failure("Please try again later.", 503);
    const session = existing.data as Session;
    if (session.submitted) throw new Failure("This enquiry has already been submitted.", 409);
    fn(session);
    const result = await db.setJSON(`sessions/${id}`, session, { onlyIfMatch: existing.etag });
    if (result.modified) return session;
  }
  throw new Failure("Another request is in progress. Please try again.", 409);
}
async function twilio(path: string, data: Record<string, string>) {
  const response = await fetch(`https://verify.twilio.com/v2/Services/${env("TWILIO_VERIFY_SERVICE_SID")}/${path}`, {
    method: "POST", headers: { Authorization: `Basic ${Buffer.from(`${env("TWILIO_ACCOUNT_SID")}:${env("TWILIO_AUTH_TOKEN")}`).toString("base64")}`, },
    body: new URLSearchParams(data), signal: AbortSignal.timeout(15000),
  });
  if (!response.ok) throw new Failure(response.status === 429 ? "Too many verification attempts. Please try later." : "Verification could not be completed. Check the code or request a new one.", response.status === 429 ? 429 : 400);
  return await response.json() as { sid: string; status: string };
}
export default async function handler(req: Request, context: Context) {
  if (req.method !== "POST") return reply({ error: "Method not allowed." }, 405);
  const origin = env("NEXT_PUBLIC_SITE_URL");
  if (!origin || req.headers.get("origin") !== new URL(origin).origin) return reply({ error: "Request not permitted." }, 403);
  if (env("OTP_ENABLED") !== "true" || ["TWILIO_ACCOUNT_SID", "TWILIO_AUTH_TOKEN", "TWILIO_VERIFY_SERVICE_SID", "SENDGRID_API_KEY", "OTP_FROM_EMAIL", "OTP_STORAGE_SECRET"].some(key => !env(key)) || env("OTP_STORAGE_SECRET").length < 32) return reply({ error: "Verification is not available yet. Please contact me on WhatsApp or by email." }, 503);
  try {
    const raw = await req.text();
    if (raw.length > 12000) throw new Failure("Request too large.", 413);
    const body = JSON.parse(raw);
    await limit(`requests:${context.ip}`, 60, 3600000);
    if (body.action === "start") {
      const pair = contacts(body.email, body.phone);
      await limit(`starts:${context.ip}`, 5, 3600000);
      const id = randomUUID();
      await store().setJSON(`sessions/${id}`, { ...pair, expires: Date.now() + 600000, emailVerified: false, smsVerified: false, emailAttempts: 0, smsAttempts: 0 } satisfies Session, { onlyIfNew: true });
      return reply({ session: id });
    }
    if (typeof body.session !== "string" || !/^[a-f0-9-]{36}$/.test(body.session)) throw new Failure("Start verification first.");
    const id = body.session;
    if (body.action === "send" || body.action === "check") {
      if (body.channel !== "email" && body.channel !== "sms") throw new Failure("Invalid verification channel.");
      const channel: Channel = body.channel;
      const verified = channel === "email" ? "emailVerified" : "smsVerified";
      const sent = channel === "email" ? "emailSent" : "smsSent";
      const sid = channel === "email" ? "emailSid" : "smsSid";
      const attempts = channel === "email" ? "emailAttempts" : "smsAttempts";
      if (body.action === "send") {
        const session = await change(id, s => {
          if (s[verified]) throw new Failure("Already verified.");
          if (s[sent] && Date.now() - s[sent]! < 60000) throw new Failure("Wait 60 seconds before requesting another code.", 429);
          s[sent] = Date.now();
        });
        await limit(`send-ip:${context.ip}`, 10, 3600000);
        await limit(`send-contact:${channel}:${session[channel === "email" ? "email" : "phone"]}`, 5, 3600000);
        await limit("global-sends", 100, 86400000);
        const result = await twilio("Verifications", { To: session[channel === "email" ? "email" : "phone"], Channel: channel });
        await change(id, s => { s[sid] = result.sid; });
        return reply({ sent: true });
      }
      if (typeof body.code !== "string" || !/^\d{4,10}$/.test(body.code)) throw new Failure("Enter the verification code.");
      const session = await change(id, s => {
        if (!s[sid]) throw new Failure("Request a code first.");
        if (s[verified]) throw new Failure("Already verified.");
        if (s[attempts] >= 5) throw new Failure("Too many incorrect attempts. Start again.", 429);
        s[attempts]++;
      });
      const result = await twilio("VerificationCheck", { VerificationSid: session[sid]!, Code: body.code });
      if (result.status !== "approved") throw new Failure("Incorrect code. Please try again.");
      await change(id, s => { s[verified] = true; });
      return reply({ verified: true });
    }
    if (body.action !== "submit") throw new Failure("Invalid request.");
    const pair = contacts(body.email, body.phone);
    for (const [key, max] of [["name", 100], ["business", 150], ["message", 5000]] as const) {
      if (typeof body[key] !== "string" || !body[key].trim() || body[key].length > max) throw new Failure("Complete all enquiry fields.");
    }
    const session = await change(id, s => {
      requireVerified(s, pair.email, pair.phone);
      s.submitted = true;
    });
    const response = await fetch("https://api.sendgrid.com/v3/mail/send", {
      method: "POST", headers: { Authorization: `Bearer ${env("SENDGRID_API_KEY")}`, "Content-Type": "application/json" },
      body: JSON.stringify({ personalizations: [{ to: [{ email: "diwanshuk.web@gmail.com" }] }], from: { email: env("OTP_FROM_EMAIL"), name: "Portfolio enquiries" }, reply_to: { email: session.email }, subject: "Verified website enquiry", content: [{ type: "text/plain", value: `Both contact details verified by OTP.\n\nName: ${body.name}\nBusiness: ${body.business}\nPhone: ${session.phone}\nEmail: ${session.email}\n\n${body.message}` }] }), signal: AbortSignal.timeout(15000),
    });
    // Once claimed, a session cannot send duplicate mail, including after ambiguous provider failures.
    if (!response.ok) throw new Failure("Your enquiry could not be sent. Please contact me on WhatsApp or restart verification.", 502);
    return reply({ submitted: true });
  } catch (error) {
    if (error instanceof Failure) return reply({ error: error.message }, error.status);
    return reply({ error: "Request could not be completed. Please try again or contact me directly." }, 500);
  }
}
export const config: Config = { path: "/api/enquiry", method: "POST" };
