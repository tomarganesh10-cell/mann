import { franchiseBrands } from "@/lib/franchise";
import { MaskHeading, Reveal } from "./motion";
import { FeaturedBrandPanel } from "./PlayPlatePanel";

export function Ecosystem() {
  const featured = franchiseBrands.filter((b) => b.featured);
  return (
    <section id="ecosystem" aria-labelledby="ecosystem-title" className="relative bg-forest py-28 sm:py-36">
      <div className="mx-auto max-w-[88rem] px-5 sm:px-8 lg:px-12">
        <Reveal y={10}><p className="eyebrow mb-8 flex items-center gap-4"><span aria-hidden className="h-px w-10 bg-gold" />Franchise Ecosystem</p></Reveal>
        <div className="grid gap-8 lg:grid-cols-12 lg:items-end">
          <div className="lg:col-span-8">
            <MaskHeading id="ecosystem-title" className="text-display" lines={["Big Brands.", <span key="b" className="italic text-lime">Bold Possibilities.</span>]} />
          </div>
          <Reveal delay={0.15} className="max-w-md text-muted lg:col-span-4">
            A growing ecosystem of franchise relationships, each added only once it is verified and confirmed.
          </Reveal>
        </div>

        <div className="mt-16 space-y-6">
          {featured.map((b) => (
            <Reveal key={b.id} y={40}><FeaturedBrandPanel brand={b} /></Reveal>
          ))}
          <Reveal delay={0.1}>
            <div className="flex flex-col gap-2 border border-dashed hairline p-7 sm:flex-row sm:items-center sm:justify-between">
              <p className="font-display text-2xl">More partnerships, soon.</p>
              <p className="text-sm text-muted">Additional verified franchise relationships will appear here.</p>
            </div>
          </Reveal>
        </div>
      </div>
    </section>
  );
}
