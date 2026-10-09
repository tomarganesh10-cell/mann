import "server-only";
import type { ContactInput } from "./validation";

/**
 * INTEGRATION BOUNDARY for the contact form.
 *
 * The API route (app/api/contact/route.ts) validates and spam-checks a
 * submission, then calls `deliverContact`. To go live, either:
 *   1. set CONTACT_WEBHOOK_URL (and optionally CONTACT_WEBHOOK_SECRET) in the
 *      server environment to point at an approved endpoint (e.g. a form
 *      service, CRM, or serverless function), or
 *   2. replace the body of `deliverContact` with a call to an approved email
 *      provider SDK.
 *
 * Secrets are read from the environment only and never exposed to the browser.
 * Until configured, `isContactConfigured()` is false and the site honestly
 * tells visitors that online submission is unavailable.
 */

export function isContactConfigured(): boolean {
  return Boolean(process.env.CONTACT_WEBHOOK_URL);
}

export async function deliverContact(input: ContactInput): Promise<void> {
  const url = process.env.CONTACT_WEBHOOK_URL;
  if (!url) throw new Error("Contact delivery is not configured");

  const secret = process.env.CONTACT_WEBHOOK_SECRET;
  const res = await fetch(url, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      ...(secret ? { Authorization: `Bearer ${secret}` } : {}),
    },
    body: JSON.stringify({ ...input, receivedAt: new Date().toISOString(), source: "kalpavriksha-website" }),
    signal: AbortSignal.timeout(10_000),
  });
  if (!res.ok) throw new Error(`Contact webhook responded ${res.status}`);
}
