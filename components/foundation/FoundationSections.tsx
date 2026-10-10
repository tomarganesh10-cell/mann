import Image from "next/image";
import Link from "next/link";
import { ArrowRight, ArrowUpRight } from "lucide-react";
import { focusAreas, foundationPhotos, foundationUrl, missionStatement, proposedMotto, verifiedVolunteerUrl } from "@/lib/foundation";
import { FocusIcon, MealScene, SharedTableScene } from "./Illustrations";
import { MaskHeading, Reveal } from "../motion";

const h2 = "text-[clamp(2.1rem,1.2rem+3.6vw,4.4rem)]";
const eyebrow = "mb-6 flex items-center gap-4 text-[0.72rem] uppercase tracking-[0.28em] text-[#7a5326]";
const ext = { target: "_blank", rel: "noopener noreferrer" } as const;

function Eyebrow({ children }: { children: string }) {
  return <Reveal y={10}><p className={eyebrow}><span aria-hidden className="h-px w-10 bg-current" />{children}</p></Reveal>;
}

export function FoundationHero() {
  return (
    <section aria-labelledby="foundation-title" className="relative overflow-hidden bg-[#f4f0e6] pb-20 pt-36 sm:pb-28 sm:pt-40">
      <div aria-hidden className="pointer-events-none absolute -left-40 top-20 h-[34rem] w-[34rem] rounded-full bg-[radial-gradient(closest-side,rgba(181,117,61,0.14),transparent)]" />
      <div className="relative mx-auto grid max-w-[88rem] items-center gap-14 px-5 sm:px-8 lg:grid-cols-12 lg:px-12">
        <div className="lg:col-span-7">
          <nav aria-label="Breadcrumb" className="mb-6 text-[0.7rem] uppercase tracking-[0.2em] text-ink/70">
            <Link href="/" className="hover:text-ink">Home</Link> <span aria-hidden className="mx-2 text-[#7a5326]">/</span>
            <span aria-current="page" className="text-ink">Hope Commoners Foundation</span>
          </nav>
          <Reveal y={10}><p className={eyebrow}><span aria-hidden className="h-px w-10 bg-current" />A mission rooted in humanity</p></Reveal>
          <MaskHeading as="h1" id="foundation-title" immediate delay={0.2} className="text-[clamp(2.7rem,1.3rem+6.6vw,7rem)]" lines={["Hope Begins", <span key="b" className="italic text-[#2f5a45]">When We Care.</span>]} />
          <Reveal delay={0.5} className="mt-9 max-w-xl space-y-4 text-lead leading-relaxed text-ink/80">
            <p>Hope Commoners Foundation is a nonprofit organization working towards a hunger-free, empowered, and resilient society.</p>
            <p className="font-display text-2xl italic leading-snug text-ink" style={{ fontWeight: 300, lineHeight: 1.25 }}>Food, dignity, and opportunity should reach the people who need them most.</p>
          </Reveal>
          <Reveal delay={0.7} className="mt-11 flex flex-col gap-4 sm:flex-row">
            <a href="#mission" className="btn btn-dark">Discover Our Mission <ArrowRight className="arrow h-4 w-4" aria-hidden /></a>
            <a href={foundationUrl} {...ext} className="btn btn-outline-dark">Visit Official Website <ArrowUpRight className="arrow h-4 w-4" aria-hidden /><span className="sr-only"> (opens in a new tab)</span></a>
          </Reveal>
        </div>
        <div className="lg:col-span-5"><div className="mx-auto max-w-[30rem] lg:max-w-none"><SharedTableScene /></div></div>
      </div>
    </section>
  );
}

export function AboutFoundation() {
  return (
    <section id="mission" aria-labelledby="about-foundation-title" className="bg-[#fbf7ee] py-24 sm:py-32">
      <div className="mx-auto grid max-w-[88rem] gap-12 px-5 sm:px-8 lg:grid-cols-12 lg:gap-16 lg:px-12">
        <div className="lg:col-span-7">
          <Eyebrow>About the foundation</Eyebrow>
          <MaskHeading id="about-foundation-title" className={h2} lines={["More Than Charity.", <span key="b" className="italic text-[#2f5a45]">A Commitment to Humanity.</span>]} />
        </div>
        <div className="space-y-6 text-lead leading-relaxed text-ink/80 lg:col-span-5 lg:pt-14">
          <Reveal><p>Hope Commoners Foundation is a nonprofit organization dedicated to supporting underprivileged communities. Its work focuses on food, education, essential support, and creating opportunities for people who need them most.</p></Reveal>
          <Reveal delay={0.1}><p className="border-l-2 border-[#b5753d] pl-5 text-base text-ink/75">As a nonprofit, its purpose is social good. It does not exist to distribute profits to owners or shareholders.</p></Reveal>
        </div>
      </div>
    </section>
  );
}

export function MottoBand() {
  return (
    <section aria-label="Motto and mission" className="relative overflow-hidden bg-forest-2 py-24 text-ivory sm:py-36">
      <svg aria-hidden viewBox="0 0 600 600" className="pointer-events-none absolute -right-32 top-1/2 hidden h-[44rem] w-[44rem] -translate-y-1/2 opacity-[0.07] md:block">
        {[280, 210, 140, 70].map((r) => <circle key={r} cx="300" cy="300" r={r} fill="none" stroke="#f4f0e6" strokeWidth="1.5" />)}
      </svg>
      <div className="relative mx-auto max-w-[88rem] px-5 sm:px-8 lg:px-12">
        <Reveal y={10}><p className="eyebrow mb-8 flex items-center gap-4"><span aria-hidden className="h-px w-10 bg-gold" />Our motto</p></Reveal>
        {/* proposedMotto is editable copy in lib/foundation.ts, pending the foundation's approved wording */}
        <MaskHeading as="h2" className="text-[clamp(2.4rem,1.2rem+5.6vw,6.4rem)] max-w-5xl" lines={[proposedMotto.split(". ")[0] + ".", <span key="b" className="italic text-[#e9c98f]">{proposedMotto.split(". ")[1]}</span>]} />
        <Reveal delay={0.15} className="mt-14 grid gap-6 border-t border-ivory/20 pt-8 md:grid-cols-12">
          <p className="eyebrow md:col-span-3">Our mission</p>
          <p className="font-display text-2xl text-ivory/95 md:col-span-8 lg:text-3xl" style={{ fontWeight: 300, lineHeight: 1.3 }}>{missionStatement}</p>
        </Reveal>
      </div>
    </section>
  );
}

export function FoodSupport() {
  return (
    <section aria-labelledby="food-title" className="bg-[#ede3cf] py-24 sm:py-32">
      <div className="mx-auto max-w-[88rem] px-5 sm:px-8 lg:px-12">
        <div className="grid gap-10 lg:grid-cols-12 lg:items-end">
          <div className="lg:col-span-7">
            <Eyebrow>Food and hunger support</Eyebrow>
            <MaskHeading id="food-title" className={h2} lines={["Every Meal Can", <span key="b" className="italic text-[#8a4f1f]">Make a Difference.</span>]} />
          </div>
          <Reveal delay={0.1} className="text-lead leading-relaxed text-ink/80 lg:col-span-5">
            <p>We believe access to food is fundamental to human dignity. Through food-support initiatives and community-focused efforts, we aim to help people facing hunger and hardship.</p>
          </Reveal>
        </div>
        <Reveal className="mt-14" y={30}>
          {foundationPhotos.length > 0 ? (
            <ul className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
              {foundationPhotos.map((p) => (
                <li key={p.src}>
                  <figure>
                    <Image src={p.src} width={p.width} height={p.height} alt={p.alt} className="h-auto w-full" />
                    {p.credit && <figcaption className="mt-2 text-xs text-ink/70">{p.credit}</figcaption>}
                  </figure>
                </li>
              ))}
            </ul>
          ) : (
            <figure className="mx-auto max-w-4xl">
              <MealScene />
              <figcaption className="mt-4 text-center text-xs uppercase tracking-[0.18em] text-ink/70">Illustration. Authentic photography will be added when supplied with permission.</figcaption>
            </figure>
          )}
        </Reveal>
      </div>
    </section>
  );
}

const tint = { food: "bg-[#f3e1cc]", education: "bg-[#e1e8da]", community: "bg-[#d9e4dc]" } as const;

export function FocusAreas() {
  return (
    <section aria-labelledby="focus-title" className="bg-[#f4f0e6] py-24 sm:py-32">
      <div className="mx-auto max-w-[88rem] px-5 sm:px-8 lg:px-12">
        <Eyebrow>Areas of focus</Eyebrow>
        <MaskHeading id="focus-title" className={h2} lines={["Care in", <span key="b" className="italic text-[#2f5a45]">Many Forms.</span>]} />
        <ol className="mt-14 grid gap-6 lg:grid-cols-3">
          {focusAreas.map((f, i) => (
            <li key={f.id} className="h-full">
              <Reveal delay={i * 0.12} className="h-full">
                <article className={`flex h-full flex-col p-8 ${tint[f.id]}`}>
                  <div className="flex items-start justify-between"><FocusIcon id={f.id} /><span className="font-display text-3xl text-[#7a5326]" style={{ fontWeight: 300 }}>{f.no}</span></div>
                  <h3 className="mt-10 text-3xl text-ink" style={{ fontWeight: 400 }}>{f.title}</h3>
                  <p className="mt-4 text-ink/80">{f.body}</p>
                </article>
              </Reveal>
            </li>
          ))}
        </ol>
        <Reveal className="mt-8 max-w-2xl text-sm text-ink/70"><p>These are areas of focus, not a statement that every programme is active in every location. Please refer to the official website for current programme details.</p></Reveal>
      </div>
    </section>
  );
}

export function GetInvolved() {
  const volunteer = verifiedVolunteerUrl ?? foundationUrl;
  const actions = [
    { label: "Learn About the Foundation", note: "Read about the foundation in its own words.", href: foundationUrl, sr: "" },
    { label: "Explore Volunteering", note: "Volunteering information is on the official website.", href: volunteer, sr: verifiedVolunteerUrl ? "" : " (official website homepage)" },
    { label: "Visit the Official Website", note: "hopecommonersfoundation.com", href: foundationUrl, sr: "" },
  ];
  return (
    <section aria-labelledby="involved-title" className="bg-[#fbf7ee] py-24 sm:py-32">
      <div className="mx-auto max-w-[88rem] px-5 sm:px-8 lg:px-12">
        <Eyebrow>How to contribute</Eyebrow>
        <MaskHeading id="involved-title" className={h2} lines={["Be Part of", <span key="b" className="italic text-[#8a4f1f]">the Change.</span>]} />
        <ul className="mt-14 grid gap-6 lg:grid-cols-3">
          {actions.map((a, i) => (
            <li key={a.label} className="h-full">
              <Reveal delay={i * 0.1} className="h-full">
                <a href={a.href} {...ext} className="group flex h-full min-h-48 flex-col justify-between border border-ink/15 bg-white/50 p-7 transition-[border-color,background-color,transform] duration-500 hover:-translate-y-1 hover:border-[#2f5a45] hover:bg-white motion-reduce:transform-none">
                  <span className="font-display text-3xl leading-tight text-ink" style={{ fontWeight: 400 }}>{a.label}</span>
                  <span className="mt-8 flex items-end justify-between gap-4 text-sm text-ink/75"><span className="min-w-0 [overflow-wrap:anywhere]">{a.note}</span><ArrowUpRight className="h-5 w-5 shrink-0 text-[#2f5a45] transition-transform duration-300 group-hover:-translate-y-0.5 group-hover:translate-x-0.5" aria-hidden /></span>
                  <span className="sr-only">(opens in a new tab){a.sr}</span>
                </a>
              </Reveal>
            </li>
          ))}
        </ul>
        <Reveal className="mt-10 max-w-2xl space-y-3 text-sm leading-relaxed text-ink/70">
          <p>This website does not collect donations. For giving or volunteering details, please use the foundation&apos;s official website.</p>
          <p>Hope Commoners Foundation has its own identity, purpose, and website. Kalpavriksha Private Limited describes it as a nonprofit organization and features it as part of its social-impact focus.</p>
        </Reveal>
      </div>
    </section>
  );
}
