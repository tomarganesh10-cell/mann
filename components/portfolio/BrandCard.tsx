import { ArrowUpRight } from "lucide-react";
import { statusLegend, unconfirmedCaption, type PortfolioBrand } from "@/lib/portfolio";

/** Fluid size so the full name always fits the card width (Fraunces mixed-case ≈ 0.52em per character). */
const nameSize = (name: string) => `min(${(100 / (name.length * 0.54)).toFixed(2)}cqw, 3.4rem)`;

export function BrandCard({ brand, rank }: { brand: PortfolioBrand; rank?: string }) {
  const label = statusLegend.find((s) => s.status === brand.status)?.label ?? "Food franchise brand";
  return (
    <article
      aria-labelledby={`${brand.id}-name`}
      className="group relative flex h-full flex-col overflow-hidden border hairline bg-forest p-7 transition-[border-color,transform,background-color] duration-500 hover:-translate-y-1 hover:border-gold/60 hover:bg-forest-2 focus-within:border-gold/60 motion-reduce:transform-none sm:p-8"
    >
      {/* hover accent: a fine line draws across the top edge */}
      <span aria-hidden className="absolute inset-x-0 top-0 h-px origin-left scale-x-0 bg-gradient-to-r from-gold to-lime transition-transform duration-700 group-hover:scale-x-100 group-focus-within:scale-x-100 motion-reduce:transition-none" />
      <div className="flex items-start justify-between gap-4">
        {rank ? <span className="font-display text-3xl text-gold">{rank}</span> : <span aria-hidden className="h-px w-8 translate-y-3 bg-gold/70" />}
        <span className="border hairline px-2.5 py-1 text-[0.62rem] uppercase tracking-[0.18em] text-soft">{label}</span>
      </div>

      <div className="mt-10 [container-type:inline-size]">
        <h3 id={`${brand.id}-name`} className="font-display" style={{ fontSize: nameSize(brand.name), fontWeight: 400, lineHeight: 1.05, overflowWrap: "anywhere" }}>
          {brand.name}
        </h3>
      </div>
      <p className="eyebrow mt-4 !text-[0.66rem]">{brand.category}</p>
      <p className="mt-5 text-soft">{brand.description}</p>

      <div className="mt-auto pt-8">
        {brand.status !== "confirmed" && <p className="mb-5 border-t hairline pt-4 text-[0.74rem] leading-relaxed text-muted">{unconfirmedCaption}</p>}
        <a href={brand.url} target="_blank" rel="noopener noreferrer" className="inline-flex min-h-11 items-center gap-2 text-[0.78rem] font-medium uppercase tracking-[0.16em] text-ivory transition-colors hover:text-lime">
          Explore Brand <ArrowUpRight className="h-4 w-4 transition-transform duration-300 group-hover:-translate-y-0.5 group-hover:translate-x-0.5" aria-hidden />
          <span className="sr-only"> — {brand.name} official website (opens in a new tab)</span>
        </a>
      </div>
    </article>
  );
}
