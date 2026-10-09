import { NextResponse } from "next/server";
import { deliverContact, isContactConfigured } from "@/lib/contact-service";
import { validateContact, type ContactInput } from "@/lib/validation";

export const runtime = "nodejs";

// Best-effort, per-instance rate limit (use a shared store in multi-instance production).
const hits = new Map<string, number[]>();
const WINDOW_MS = 10 * 60_000;
const MAX_HITS = 5;

function limited(ip: string): boolean {
  const now = Date.now();
  const recent = (hits.get(ip) ?? []).filter((t) => now - t < WINDOW_MS);
  recent.push(now);
  hits.set(ip, recent);
  if (hits.size > 5000) hits.clear();
  return recent.length > MAX_HITS;
}

export async function POST(request: Request) {
  if (!isContactConfigured()) {
    return NextResponse.json({ ok: false, code: "not_configured" }, { status: 503 });
  }

  const ip = request.headers.get("x-forwarded-for")?.split(",")[0]?.trim() || "unknown";
  if (limited(ip)) return NextResponse.json({ ok: false, code: "rate_limited" }, { status: 429 });

  let body: Record<string, unknown>;
  try {
    body = await request.json();
  } catch {
    return NextResponse.json({ ok: false, code: "bad_request" }, { status: 400 });
  }

  // Honeypot + minimum fill time: bots that fill hidden fields or submit instantly are silently dropped.
  const elapsed = Date.now() - Number(body.startedAt ?? 0);
  if (body.website || !(elapsed > 2500)) return NextResponse.json({ ok: true });

  const str = (v: unknown) => (typeof v === "string" ? v : "");
  const input: ContactInput = {
    name: str(body.name),
    email: str(body.email),
    phone: str(body.phone),
    company: str(body.company),
    interest: str(body.interest),
    message: str(body.message),
  };
  const errors = validateContact(input);
  if (Object.keys(errors).length) return NextResponse.json({ ok: false, code: "invalid", errors }, { status: 422 });

  try {
    await deliverContact({ ...input, name: input.name.trim(), email: input.email.trim(), message: input.message.trim() });
    return NextResponse.json({ ok: true });
  } catch (err) {
    console.error("contact delivery failed", err instanceof Error ? err.message : err);
    return NextResponse.json({ ok: false, code: "delivery_failed" }, { status: 502 });
  }
}
