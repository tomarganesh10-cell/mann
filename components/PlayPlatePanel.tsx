"use client";

import { motion, useMotionValue, useReducedMotion, useSpring, useTransform } from "motion/react";
import { ArrowUpRight } from "lucide-react";
import type { FranchiseBrand } from "@/lib/franchise";

/** Feature panel for a verified franchise brand. Pointer-tilt applies only on fine pointers. */
export function FeaturedBrandPanel({ brand }: { brand: FranchiseBrand }) {
  const reduce = useReducedMotion();
  const px = useMotionValue(0.5), py = useMotionValue(0.5);
  const sx = useSpring(px, { stiffness: 80, damping: 20 }), sy = useSpring(py, { stiffness: 80, damping: 20 });
  const rotY = useTransform(sx, [0, 1], [-3, 3]);
  const rotX = useTransform(sy, [0, 1], [3, -3]);
  const glow = useTransform([sx, sy], ([x, y]) => `radial-gradient(520px circle at ${(x as number) * 100}% ${(y as number) * 100}%, rgba(196,232,121,0.14), transparent 60%)`);

  const onMove = (e: React.PointerEvent<HTMLElement>) => {
    if (reduce || e.pointerType !== "mouse") return;
    const r = e.currentTarget.getBoundingClientRect();
    px.set((e.clientX - r.left) / r.width);
    py.set((e.clientY - r.top) / r.height);
  };
  const onLeave = () => { px.set(0.5); py.set(0.5); };

  return (
    <div style={{ perspective: 1400 }}>
      <motion.article
        onPointerMove={onMove}
        onPointerLeave={onLeave}
        style={reduce ? undefined : { rotateX: rotX, rotateY: rotY }}
        aria-labelledby={`${brand.id}-name`}
        className="group relative grid overflow-hidden border hairline bg-[linear-gradient(135deg,#0d2920,#071a14)] lg:grid-cols-12"
      >
        <motion.div aria-hidden className="pointer-events-none absolute inset-0" style={{ background: glow }} />
        <svg aria-hidden viewBox="0 0 400 400" className="pointer-events-none absolute -right-10 top-0 h-full w-[70%] opacity-50 [mask-image:linear-gradient(to_left,black,transparent)]">
          {Array.from({ length: 9 }, (_, i) => (
            <motion.path key={i} d={`M-20 ${40 + i * 42} C 110 ${i * 30}, 210 ${120 + i * 36}, 420 ${20 + i * 44}`} fill="none" stroke={i % 3 ? "#C5A66A" : "#C4E879"} strokeOpacity=".35" strokeWidth=".8"
              initial={reduce ? false : { pathLength: 0 }} whileInView={{ pathLength: 1 }} viewport={{ once: true }} transition={{ duration: 2.4, delay: i * 0.12 }} />
          ))}
          {[[110, 70], [210, 200], [300, 120], [160, 310], [340, 260]].map(([cx, cy], i) => (
            <circle key={i} cx={cx} cy={cy} r="3" fill="#C4E879" className="node-pulse" style={{ animationDelay: `${i * 0.7}s`, filter: "drop-shadow(0 0 6px #C4E879)" }} />
          ))}
        </svg>

        <div className="relative z-10 p-7 sm:p-12 lg:col-span-8 lg:p-16">
          <p className="eyebrow">Featured · {brand.relationship}</p>
          <h3 id={`${brand.id}-name`} className="mt-8 text-[clamp(3.2rem,2rem+8vw,9rem)] uppercase" style={{ fontWeight: 600, letterSpacing: "-0.03em" }}>
            {brand.logoSrc ? (
              // eslint-disable-next-line @next/next/no-img-element
              <img src={brand.logoSrc} alt={brand.name} className="h-[1em] w-auto" />
            ) : (
              <>PLAY<span className="text-lime">PLATE</span></>
            )}
          </h3>
          {brand.tagline && <p className="mt-6 font-display text-xl tracking-[0.3em] text-gold sm:text-2xl">{brand.tagline}</p>}
          <p className="mt-8 max-w-xl text-lead leading-relaxed text-muted">{brand.description}</p>
          <ul className="mt-8 flex flex-wrap gap-2" aria-label={`${brand.name} focus areas`}>
            {brand.tags.map((t) => (
              <li key={t} className="border hairline px-3.5 py-1.5 text-[0.7rem] uppercase tracking-[0.16em] text-ivory/85">{t}</li>
            ))}
          </ul>
          <a href={brand.url} target="_blank" rel="noopener noreferrer" className="btn btn-primary mt-10">
            {brand.ctaLabel} <ArrowUpRight className="arrow h-4 w-4" aria-hidden />
            <span className="sr-only"> (opens in a new tab)</span>
          </a>
        </div>
        <div aria-hidden className="relative hidden items-end justify-end p-12 lg:col-span-4 lg:flex">
          <span className="font-display text-[11rem] leading-none text-ivory/[0.04]">&amp;</span>
        </div>
      </motion.article>
    </div>
  );
}
