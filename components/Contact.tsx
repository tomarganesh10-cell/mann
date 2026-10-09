import { company } from "@/lib/site";
import { ContactForm } from "./ContactForm";
import { MaskHeading, Reveal } from "./motion";

export function Contact() {
  const { email, phone, address } = company.contact;
  return (
    <section id="contact" aria-labelledby="contact-title" className="relative bg-forest-2 py-28 sm:py-36">
      <div className="mx-auto grid max-w-[88rem] gap-16 px-5 sm:px-8 lg:grid-cols-12 lg:px-12">
        <div className="lg:col-span-5">
          <Reveal y={10}><p className="eyebrow mb-8 flex items-center gap-4"><span aria-hidden className="h-px w-10 bg-gold" />Contact</p></Reveal>
          <MaskHeading id="contact-title" className="text-display" lines={["Start a", <span key="b" className="italic text-lime">Conversation.</span>]} />
          <Reveal delay={0.1} className="mt-8 max-w-md text-lead text-muted">
            Tell us about your idea, brand, or partnership interest and we&apos;ll take it from there.
          </Reveal>
          {(email || phone || address) && (
            <Reveal delay={0.2}>
              <dl className="mt-10 space-y-4 text-sm">
                {email && <div><dt className="eyebrow">Email</dt><dd><a className="underline underline-offset-4" href={`mailto:${email}`}>{email}</a></dd></div>}
                {phone && <div><dt className="eyebrow">Phone</dt><dd><a href={`tel:${phone}`}>{phone}</a></dd></div>}
                {address && <div><dt className="eyebrow">Address</dt><dd>{address}</dd></div>}
              </dl>
            </Reveal>
          )}
        </div>
        <Reveal className="relative lg:col-span-7" delay={0.1}><ContactForm /></Reveal>
      </div>
    </section>
  );
}
