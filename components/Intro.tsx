import { pillars } from "@/lib/site";
import { GrowthVisual } from "./GrowthVisual";
import { MaskHeading, Reveal } from "./motion";

export function Intro() {
  return (
    <section id="about" aria-labelledby="about-title" className="relative bg-forest-2 py-28 sm:py-36">
      <div className="mx-auto grid max-w-[88rem] gap-16 px-5 sm:px-8 lg:grid-cols-12 lg:gap-8 lg:px-12">
        <div className="lg:col-span-7">
          <Reveal y={10}><p className="eyebrow mb-8 flex items-center gap-4"><span aria-hidden className="h-px w-10 bg-gold" />About</p></Reveal>
          <MaskHeading id="about-title" className="text-display" lines={["Rooted in Vision.", <span key="b" className="italic text-gold">Built for Growth.</span>]} />
          <Reveal delay={0.1} className="mt-10 max-w-2xl space-y-5 text-lead leading-relaxed text-muted">
            <p>Kalpavriksha takes its name from the wish-fulfilling tree of Indian tradition: a symbol of abundance, shelter, and possibility.</p>
            <p>We work where franchise opportunities, brand expansion, and community purpose overlap, connecting ambitious brands, entrepreneurs, and partners through a vision built for growth.</p>
          </Reveal>

          <ol className="mt-16 border-t hairline">
            {pillars.map((p, i) => (
              <Reveal as="li" key={p.no} delay={i * 0.1} className="group grid grid-cols-[3.5rem_1fr] gap-4 border-b hairline py-7 transition-colors hover:bg-ivory/[0.03] sm:grid-cols-[5rem_1fr_1.2fr] sm:items-baseline">
                <span className="font-display text-2xl text-gold">{p.no}</span>
                <h3 className="text-2xl sm:text-3xl">{p.title}</h3>
                <p className="col-start-2 text-muted sm:col-start-auto">{p.body}</p>
              </Reveal>
            ))}
          </ol>
        </div>
        <div className="flex items-center lg:col-span-5"><Reveal y={0} className="w-full"><GrowthVisual /></Reveal></div>
      </div>
    </section>
  );
}
