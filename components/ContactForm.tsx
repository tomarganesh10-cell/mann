"use client";

import Link from "next/link";
import { Loader2, ArrowRight } from "lucide-react";
import { useEffect, useRef, useState, type FormEvent } from "react";
import { interestOptions } from "@/lib/site";
import { validateContact, type ContactErrors, type ContactInput } from "@/lib/validation";

type Status = "idle" | "submitting" | "success" | "unavailable" | "failed";

const empty: ContactInput = { name: "", email: "", phone: "", company: "", interest: "", message: "" };

function Field({ id, label, optional, error, children }: { id: string; label: string; optional?: boolean; error?: string; children: React.ReactNode }) {
  return (
    <div>
      <label htmlFor={id} className="mb-1 block text-[0.72rem] uppercase tracking-[0.2em] text-muted">
        {label} {optional && <span className="normal-case tracking-normal text-muted/70">(optional)</span>}
      </label>
      {children}
      <p id={`${id}-err`} role={error ? "alert" : undefined} className="min-h-5 pt-1 text-sm text-[#ff9d8a]">{error}</p>
    </div>
  );
}

export function ContactForm() {
  const [values, setValues] = useState<ContactInput>(empty);
  const [errors, setErrors] = useState<ContactErrors>({});
  const [status, setStatus] = useState<Status>("idle");
  const [website, setWebsite] = useState(""); // honeypot
  const startedAt = useRef(0);
  useEffect(() => { startedAt.current = Date.now(); }, []);
  const formRef = useRef<HTMLFormElement>(null);

  const set = (k: keyof ContactInput) => (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    setValues((v) => ({ ...v, [k]: e.target.value }));
    if (errors[k]) setErrors((er) => ({ ...er, [k]: undefined }));
  };
  const a11y = (k: keyof ContactInput) => ({ "aria-invalid": errors[k] ? (true as const) : undefined, "aria-describedby": `${k}-err` });

  async function onSubmit(e: FormEvent) {
    e.preventDefault();
    if (status === "submitting") return;
    const found = validateContact(values);
    setErrors(found);
    const first = Object.keys(found)[0];
    if (first) { formRef.current?.querySelector<HTMLElement>(`[name="${first}"]`)?.focus(); return; }

    setStatus("submitting");
    try {
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ ...values, website, startedAt: startedAt.current }),
      });
      if (res.ok) { setStatus("success"); setValues(empty); return; }
      if (res.status === 503) { setStatus("unavailable"); return; }
      if (res.status === 422) {
        const data = await res.json().catch(() => null);
        if (data?.errors) setErrors(data.errors);
      }
      setStatus("failed");
    } catch {
      setStatus("failed");
    }
  }

  if (status === "success") {
    return (
      <div role="status" className="border hairline p-8 sm:p-12">
        <p className="eyebrow">Message received</p>
        <p className="font-display mt-4 text-4xl">Thank you. We&apos;ll be in touch.</p>
        <button type="button" className="btn btn-ghost mt-8" onClick={() => setStatus("idle")}>Send another message</button>
      </div>
    );
  }

  return (
    <form ref={formRef} onSubmit={onSubmit} noValidate className="grid gap-x-8 sm:grid-cols-2">
      <Field id="name" label="Full Name" error={errors.name}>
        <input id="name" name="name" className="field" autoComplete="name" maxLength={100} required value={values.name} onChange={set("name")} {...a11y("name")} />
      </Field>
      <Field id="email" label="Business Email" error={errors.email}>
        <input id="email" name="email" type="email" className="field" autoComplete="email" inputMode="email" required value={values.email} onChange={set("email")} {...a11y("email")} />
      </Field>
      <Field id="phone" label="Phone Number" optional error={errors.phone}>
        <input id="phone" name="phone" type="tel" className="field" autoComplete="tel" inputMode="tel" value={values.phone} onChange={set("phone")} {...a11y("phone")} />
      </Field>
      <Field id="company" label="Company / Organization" optional error={errors.company}>
        <input id="company" name="company" className="field" autoComplete="organization" maxLength={120} value={values.company} onChange={set("company")} {...a11y("company")} />
      </Field>
      <div className="sm:col-span-2">
        <Field id="interest" label="Area of Interest" error={errors.interest}>
          <select id="interest" name="interest" className="field" required value={values.interest} onChange={set("interest")} {...a11y("interest")}>
            <option value="" disabled>Select an area…</option>
            {interestOptions.map((o) => <option key={o} value={o}>{o}</option>)}
          </select>
        </Field>
      </div>
      <div className="sm:col-span-2">
        <Field id="message" label="Message" error={errors.message}>
          <textarea id="message" name="message" rows={5} maxLength={2000} className="field resize-y" required value={values.message} onChange={set("message")} {...a11y("message")} />
        </Field>
      </div>

      {/* Honeypot: hidden from people and assistive tech; bots tend to fill it. */}
      <div aria-hidden="true" className="absolute -left-[9999px] h-0 w-0 overflow-hidden">
        <label>Website<input tabIndex={-1} autoComplete="off" name="website" value={website} onChange={(e) => setWebsite(e.target.value)} /></label>
      </div>

      <div className="sm:col-span-2">
        <p className="mb-6 max-w-xl text-sm text-muted">
          We use the details you share only to respond to your enquiry. See the <Link className="underline underline-offset-4 hover:text-ivory" href="/privacy">Privacy Policy</Link>.
        </p>
        <button type="submit" className="btn btn-primary w-full sm:w-auto" disabled={status === "submitting"}>
          {status === "submitting" ? <><Loader2 className="h-4 w-4" style={{ animation: "spin 1s linear infinite" }} aria-hidden /> Sending…</> : <>Send Message <ArrowRight className="arrow h-4 w-4" aria-hidden /></>}
        </button>
        <div aria-live="polite" className="mt-6">
          {status === "unavailable" && (
            <p className="border border-gold/50 p-4 text-sm text-ivory">
              Online submission isn&apos;t available yet: this site&apos;s contact service hasn&apos;t been configured. Your message was <strong>not</strong> sent. Please try again later.
            </p>
          )}
          {status === "failed" && (
            <p className="border border-[#ff9d8a]/60 p-4 text-sm text-ivory">Something went wrong and your message was not sent. Please check your details and try again.</p>
          )}
        </div>
      </div>
    </form>
  );
}
