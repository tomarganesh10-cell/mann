import Image from "next/image";
import { ArrowUpRight } from "lucide-react";
import type { BestFranchise, BestFranchiseTheme } from "@/lib/best-franchises";

/**
 * Per-brand visual languages. Each brand keeps its own palette (purple / red-blue-white / green-yellow);
 * the logo panel background matches the logo file's own background so the artwork is never framed, cropped or recolored.
 */
const themes: Record<BestFranchiseTheme, { card: string; panel: string; rank: string; name: string; text: string; muted: string; chip: string; rule: string; cta: string; glow: string }> = {
  playplate: {
    card: "bg-[linear-gradient(180deg,#0a0320_0%,#1b0b45_100%)] border-[#7c3aed]/40 hover:border-[#a78bfa] hover:shadow-[0_30px_80px_-24px_rgba(124,58,237,0.65)]",
    panel: "bg-[#03010c]",
    rank: "text-[#c4b5fd]",
    name: "text-white",
    text: "text-[#e9e3ff]",
    muted: "text-[#c4b5fd]",
    chip: "border-[#7c3aed]/60 text-[#ddd6fe]",
    rule: "border-[#7c3aed]/35",
    cta: "bg-[#7c3aed] text-white border-[#7c3aed] hover:bg-[#8b5cf6] hover:border-[#c4b5fd] focus-visible:outline-[#c4b5fd]",
    glow: "bg-[radial-gradient(60%_50%_at_50%_0%,rgba(139,92,246,0.35),transparent_70%)]",
  },
  dominos: {
    card: "bg-white border-[#0b2a3f]/10 hover:border-[#007bad] hover:shadow-[0_30px_70px_-26px_rgba(0,123,173,0.55)]",
    panel: "bg-white",
    rank: "text-[#d9222e]",
    name: "text-[#0b2a3f]",
    text: "text-[#26475c]",
    muted: "text-[#4a6a7e]",
    chip: "border-[#007bad]/45 text-[#0b4a68]",
    rule: "border-[#0b2a3f]/12",
    cta: "bg-[#007bad] text-white border-[#007bad] hover:bg-[#0b2a3f] hover:border-[#0b2a3f] focus-visible:outline-[#d9222e]",
    glow: "bg-[radial-gradient(60%_50%_at_50%_0%,rgba(217,34,46,0.08),transparent_70%)]",
  },
  subway: {
    card: "bg-[#006b30] border-[#f2b701]/30 hover:border-[#f2b701] hover:shadow-[0_30px_70px_-26px_rgba(242,183,1,0.45)]",
    panel: "bg-[#009744]",
    rank: "text-[#f2b701]",
    name: "text-white",
    text: "text-white",
    muted: "text-[#e6f4ea]",
    chip: "border-white/45 text-white",
    rule: "border-white/25",
    cta: "bg-[#f2b701] text-[#063b1b] border-[#f2b701] hover:bg-white hover:border-white focus-visible:outline-white",
    glow: "bg-[radial-gradient(60%_50%_at_50%_0%,rgba(242,183,1,0.16),transparent_70%)]",
  },
};

export function BestFranchiseCard({ brand }: { brand: BestFranchise }) {
  const t = themes[brand.id];
  return (
    <article
      aria-labelledby={`${brand.id}-title`}
      className={`group relative flex h-full flex-col overflow-hidden border transition-[transform,box-shadow,border-color] duration-500 hover:-translate-y-1.5 focus-within:-translate-y-1.5 motion-reduce:transform-none motion-reduce:transition-none ${t.card}`}
    >
      <span aria-hidden className={`pointer-events-none absolute inset-0 opacity-70 transition-opacity duration-500 group-hover:opacity-100 ${t.glow}`} />

      {/* Logo panel: fixed 3:2 frame, logo contained (never cropped or stretched) */}
      <div className={`relative aspect-[3/2] w-full ${t.panel}`}>
        <Image
          src={brand.logo.src}
          alt={brand.logo.alt}
          fill
          unoptimized
          sizes="(min-width: 1024px) 30vw, (min-width: 640px) 600px, 100vw"
          className={`object-contain transition-transform duration-700 group-hover:scale-[1.03] motion-reduce:transform-none ${brand.id === "dominos" ? "p-4" : ""}`}
          priority={brand.id === "playplate"}
        />
      </div>

      <div className="relative flex flex-1 flex-col p-6 sm:p-8">
        <div className="flex items-baseline justify-between gap-4">
          <span className={`font-display text-4xl ${t.rank}`} style={{ fontWeight: 400 }}>{brand.rank}</span>
          {brand.relationship && <span className={`border px-2.5 py-1 text-[0.62rem] uppercase tracking-[0.16em] ${t.chip}`}>{brand.relationship}</span>}
        </div>

        <h2 id={`${brand.id}-title`} className={`mt-6 text-[2.1rem] ${t.name}`} style={{ fontWeight: 400, lineHeight: 1.05 }}>{brand.name}</h2>
        {brand.tagline && <p className={`mt-3 text-sm font-medium tracking-[0.26em] ${t.muted}`}>{brand.tagline}</p>}
        <p className={`mt-5 leading-relaxed ${t.text}`}>{brand.description}</p>

        <ul className="mt-6 flex flex-wrap gap-2" aria-label={`${brand.name} categories`}>
          {brand.categories.map((c) => (
            <li key={c} className={`border px-3 py-1.5 text-[0.66rem] uppercase tracking-[0.16em] ${t.chip}`}>{c}</li>
          ))}
        </ul>

        <div className="mt-auto pt-8">
          {brand.caption && <p className={`mb-5 border-t pt-4 text-[0.74rem] leading-relaxed ${t.rule} ${t.muted}`}>{brand.caption}</p>}
          <a
            href={brand.url}
            target="_blank"
            rel="noopener noreferrer"
            className={`btn w-full !px-5 text-center ${t.cta}`}
          >
            <span className="relative z-10 flex items-center gap-2">{brand.ctaLabel} <ArrowUpRight className="arrow h-4 w-4" aria-hidden /></span>
            <span className="sr-only"> (opens {brand.name} website in a new tab)</span>
          </a>
        </div>
      </div>
    </article>
  );
}
