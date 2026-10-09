import { franchiseBrands } from "@/lib/franchise";
import { featuredFoodBrands, moreFoodBrands, statusLegend } from "@/lib/portfolio";
import { FeaturedBrandPanel } from "../PlayPlatePanel";
import { MaskHeading, Reveal } from "../motion";
import { BrandCard } from "./BrandCard";

const dot = { confirmed: "bg-lime", featured: "bg-gold", industry: "bg-ivory/40" } as const;
const h2 = "text-[clamp(2.2rem,1.3rem+3.6vw,4.4rem)]";

function Eyebrow({ children }: { children: string }) {
  return <Reveal y={10}><p className="eyebrow mb-6 flex items-center gap-4"><span aria-hidden className="h-px w-10 bg-gold" />{children}</p></Reveal>;
}

export function Legend() {
  return (
    <section aria-label="How brands are labelled" className="border-b hairline bg-forest-2">
      <ul className="mx-auto grid max-w-[88rem] gap-6 px-5 py-8 sm:grid-cols-3 sm:px-8 lg:px-12">
        {statusLegend.map((s) => (
          <li key={s.status} className="flex gap-3">
            <span aria-hidden className={`mt-1.5 h-2 w-2 shrink-0 rounded-full ${dot[s.status]}`} />
            <p className="text-sm text-soft"><strong className="block font-medium text-ivory">{s.label}</strong>{s.body}</p>
          </li>
        ))}
      </ul>
    </section>
  );
}

export function FeaturedBrandSection() {
  const playplate = franchiseBrands.find((b) => b.id === "playplate");
  if (!playplate) return null;
  return (
    <section id="featured" aria-labelledby="featured-title" className="bg-forest py-24 sm:py-32">
      <div className="mx-auto max-w-[88rem] px-5 sm:px-8 lg:px-12">
        <Eyebrow>Featured Brand</Eyebrow>
        <MaskHeading id="featured-title" className={h2} lines={["Food, play,", <span key="b" className="italic text-lime">and community.</span>]} />
        <div className="mt-14"><Reveal y={40}><FeaturedBrandPanel brand={playplate} rank="#01" /></Reveal></div>
      </div>
    </section>
  );
}

export function FeaturedFoodBrandsSection() {
  return (
    <section aria-labelledby="featured-food-title" className="bg-forest-2 py-24 sm:py-32">
      <div className="mx-auto max-w-[88rem] px-5 sm:px-8 lg:px-12">
        <Eyebrow>Food Franchise Brands</Eyebrow>
        <MaskHeading id="featured-food-title" className={h2} lines={["Featured", <span key="b" className="italic text-gold">Food Brands.</span>]} />
        <p className="mt-6 max-w-xl text-soft">Two widely recognised quick-service names, highlighted for exploration. No partnership is implied.</p>
        <div className="mt-14 grid gap-6 md:grid-cols-2">
          {featuredFoodBrands.map((b, i) => (
            <Reveal key={b.id} delay={i * 0.1} className="h-full"><BrandCard brand={b} rank={`#0${i + 2}`} /></Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}

export function MoreFoodBrandsSection() {
  return (
    <section aria-labelledby="more-brands-title" className="bg-forest py-24 sm:py-32">
      <div className="mx-auto max-w-[88rem] px-5 sm:px-8 lg:px-12">
        <Eyebrow>Industry Examples</Eyebrow>
        <MaskHeading id="more-brands-title" className={h2} lines={["Explore More", <span key="b" className="italic text-lime">Food Brands.</span>]} />
        <p className="mt-6 max-w-xl text-soft">Well-known names across the food industry, shown for exploration. They are not confirmed Kalpavriksha partners.</p>
        <div className="mt-14 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {moreFoodBrands.map((b, i) => (
            <Reveal key={b.id} delay={(i % 3) * 0.08} className="h-full"><BrandCard brand={b} /></Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
