import { company, interestOptions } from "@/lib/site";
import { generateTree } from "@/lib/tree";
import { ContactForm } from "./ContactForm";
import { MaskHeading, Reveal } from "./motion";

const tree = generateTree({ x: 160, y: 300, length: 60, depth: 6, seed: 61, spread: 30 });

export function Contact() {
  const { email, phone, address } = company.contact;
  return (
    <section id="contact" aria-labelledby="contact-title" className="relative overflow-hidden bg-forest-2 py-28 sm:py-36">
      <div className="mx-auto grid max-w-[88rem] gap-16 px-5 sm:px-8 lg:grid-cols-12 lg:px-12">
        <div className="lg:col-span-5">
          <Reveal y={10}><p className="eyebrow mb-8 flex items-center gap-4"><span aria-hidden className="h-px w-10 bg-gold" />Contact</p></Reveal>
          <MaskHeading id="contact-title" className="text-display" lines={["Start a", <span key="b" className="italic text-lime">Conversation.</span>]} />
          <Reveal delay={0.1} className="mt-8 max-w-md text-lead text-soft">
            Tell us about your idea, brand, or partnership interest and we&apos;ll take it from there.
          </Reveal>
          <Reveal delay={0.15}>
            <div className="mt-14 max-w-md border-t hairline">
              <p className="eyebrow pt-6">Conversations we welcome</p>
              <ul className="mt-2">
                {interestOptions.map((o, i) => (
                  <li key={o} className="flex items-baseline gap-4 border-b hairline py-3.5">
                    <span className="font-display text-sm text-gold">0{i + 1}</span>
                    <span className="font-display text-xl sm:text-2xl">{o}</span>
                  </li>
                ))}
              </ul>
            </div>
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
      <svg aria-hidden viewBox="0 0 320 320" className="pointer-events-none absolute -bottom-8 -right-6 hidden h-[24rem] w-[24rem] opacity-25 xl:block">
        {tree.paths.map((p, i) => <path key={i} d={p.d} fill="none" stroke={p.depth % 2 ? "#C5A66A" : "#C4E879"} strokeWidth={Math.max(0.6, 2 - p.depth * 0.28)} strokeLinecap="round" />)}
      </svg>
    </section>
  );
}
