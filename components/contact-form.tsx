"use client";
import { useState, type FormEvent } from "react";
const otpEnabled = process.env.NEXT_PUBLIC_OTP_ENABLED === "true";
type Channel = "email" | "sms";
export default function ContactForm() {
  const [state, setState] = useState("");
  const [busy, setBusy] = useState(false);
  const [session, setSession] = useState("");
  const [verified, setVerified] = useState({ email: false, sms: false });
  const [codes, setCodes] = useState({ email: "", sms: "" });
  const [sent, setSent] = useState({ email: false, sms: false });
  async function request(payload: object) {
    const response = await fetch("/api/enquiry", { method: "POST", headers: { "Content-Type": "application/json" }, body: JSON.stringify(payload) });
    const result = await response.json();
    if (!response.ok) throw new Error(result.error || "Verification could not be completed.");
    return result;
  }
  async function verify(action: "send" | "check", channel: Channel) {
    setBusy(true); setState("");
    try {
      const result = await request({ action, channel, session, code: codes[channel] });
      if (action === "send" && result.sent) {
        setSent(previous => ({ ...previous, [channel]: true }));
        setState(`Code sent by ${channel === "sms" ? "SMS" : "email"}. Check your ${channel === "sms" ? "phone" : "inbox and spam folder"}.`);
      }
      if (action === "check" && result.verified) {
        setVerified(previous => ({ ...previous, [channel]: true }));
        setState(`${channel === "sms" ? "Phone" : "Email"} verified.`);
      }
    } catch (error) { setState(error instanceof Error ? error.message : "Verification failed. Please try again."); }
    finally { setBusy(false); }
  }
  async function submit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    if (!otpEnabled && ["localhost", "127.0.0.1", "::1"].includes(location.hostname)) {
      setState(
        "The form is ready for Netlify deployment. In this local preview, please contact me on WhatsApp or by email.",
      );
      return;
    }
    const form = event.currentTarget;
    setBusy(true);
    setState("");
    try {
      const data = new FormData(form);
      if (otpEnabled) {
        if (!session) {
          const result = await request({ action: "start", email: data.get("email"), phone: data.get("phone") });
          setSession(result.session);
          setState("Verify your email and phone below. Codes expire after 10 minutes.");
          return;
        }
        await request({ action: "submit", session, ...Object.fromEntries(data) });
        setState("Thank you. Your verified enquiry has been submitted.");
        form.reset(); setSession(""); setVerified({ email: false, sms: false }); setSent({ email: false, sms: false }); setCodes({ email: "", sms: "" });
        return;
      }
      const body = new URLSearchParams();
      data.forEach((value, key) => body.append(key, String(value)));
      const response = await fetch("/__forms.html", {
        method: "POST",
        headers: { "Content-Type": "application/x-www-form-urlencoded" },
        body: body.toString(),
      });
      if (!response.ok) throw new Error("Submission failed");
      setState("Thank you. Your enquiry has been submitted.");
      form.reset();
    } catch (error) {
      setState(otpEnabled && error instanceof Error ? error.message :
        "Your enquiry could not be sent. Please try again or contact me on WhatsApp or by email.",
      );
    } finally {
      setBusy(false);
    }
  }
  return (
    <form
      name="business-enquiry"
      method="POST"
      action="/__forms.html"
      data-netlify="true"
      data-netlify-honeypot="bot-field"
      onSubmit={submit}
      onChange={event => {
        if (otpEnabled && ["email", "phone"].includes((event.target as unknown as HTMLInputElement).name)) {
          setSession(""); setVerified({ email: false, sms: false }); setSent({ email: false, sms: false }); setCodes({ email: "", sms: "" });
        }
      }}
      className="contact-form"
    >
      <input type="hidden" name="form-name" value="business-enquiry" />
      <div hidden>
        <label>
          Leave this empty
          <input name="bot-field" />
        </label>
      </div>
      <div className="form-row">
        <label>
          Name
          <input
            name="name"
            autoComplete="name"
            required
            maxLength={100}
            placeholder="Your name"
          />
        </label>
        <label>
          Business name
          <input
            name="business"
            autoComplete="organization"
            required
            maxLength={150}
            placeholder="Your business"
          />
        </label>
      </div>
      <div className="form-row">
        <label>
          Phone / WhatsApp
          <input
            name="phone"
            type="tel"
            autoComplete="tel"
            required
            maxLength={30}
            placeholder="Your phone number"
          />
        </label>
        <label>
          Email
          <input
            name="email"
            type="email"
            autoComplete="email"
            required
            maxLength={200}
            placeholder="you@example.com"
          />
        </label>
      </div>
      <label>
        What does your business need?
        <textarea
          name="message"
          required
          rows={4}
          maxLength={5000}
          placeholder="A new website, a redesign, or something else? Tell me a little about it."
        />
      </label>
      {otpEnabled && session && <fieldset className="otp-verification">
        <legend>Verify your contact details</legend>
        <p className="form-note">Each code expires after 10 minutes. Wait 60 seconds between resends. If time runs out, restart verification.</p>
        {(["email", "sms"] as const).map(channel => <div className="otp-channel" key={channel}>
          <p>{channel === "email" ? "Email" : "Phone"} {verified[channel] ? "— Verified ✓" : "verification"}</p>
          {!verified[channel] && <>
            <button type="button" className="button" disabled={busy} onClick={() => verify("send", channel)}>{sent[channel] ? "Resend code" : `Send ${channel === "email" ? "email" : "SMS"} code`}</button>
            {sent[channel] && <div className="otp-code-row">
              <label>{channel === "email" ? "Email" : "SMS"} code<input type="text" inputMode="numeric" autoComplete="one-time-code" maxLength={10} value={codes[channel]} onChange={event => setCodes(previous => ({ ...previous, [channel]: event.target.value.replace(/\D/g, "") }))} /></label>
              <button type="button" className="button" disabled={busy || codes[channel].length < 4} onClick={() => verify("check", channel)}>Verify code</button>
            </div>}
          </>}
        </div>)}
        <button type="button" className="otp-restart" disabled={busy} onClick={() => { setSession(""); setVerified({ email: false, sms: false }); setSent({ email: false, sms: false }); setCodes({ email: "", sms: "" }); setState("Verification reset. Start again below."); }}>Restart verification</button>
      </fieldset>}
      <p className="form-note">
        {otpEnabled && "By requesting codes, you agree to receive a one-time verification email and SMS for this enquiry. "}
        Your details are used to respond to your enquiry.
      </p>
      <button className="button" disabled={busy || (otpEnabled && !!session && (!verified.email || !verified.sms))}>
        {busy ? (otpEnabled ? "Please wait…" : "Sending…") : otpEnabled && !session ? "Verify Contact Details" : "Start a Conversation"} <span>↗</span>
      </button>
      <p role="status" className="form-status">
        {state}
      </p>
    </form>
  );
}
