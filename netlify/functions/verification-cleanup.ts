import { getStore } from "@netlify/blobs";
import type { Config } from "@netlify/functions";
export default async function cleanup() {
  const db = getStore({ name: "enquiry-verification", consistency: "strong" });
  // Paginate without retaining a full listing in memory.
  for await (const page of db.list({ paginate: true })) {
    for (const blob of page.blobs) {
      const record = await db.get(blob.key, { type: "json" });
      if (record?.expires < Date.now()) await db.delete(blob.key);
    }
  }
  return new Response(null, { status: 204 });
}
export const config: Config = { schedule: "@daily" };
