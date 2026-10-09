"use client";

import { motion, useReducedMotion } from "motion/react";
import { ArrowUpRight } from "lucide-react";
import { externalLinks } from "@/lib/site";
import { MaskHeading, Reveal } from "./motion";

const circles = [
  { cx: 300, cy: 300, r: 70, c: "#0d2920" }, { cx: 190, cy: 230, r: 46, c: "#C5A66A" }, { cx: 410, cy: 220, r: 52, c: "#2f5a45" },
  { cx: 170, cy: 380, r: 38, c: "#2f5a45" }, { cx: 420, cy: 395, r: 44, c: "#C5A66A" }, { cx: 300, cy: 150, r: 34, c: "#0d2920" }, { cx: 305, cy: 450, r: 30, c: "#2f5a45" },
];
const links = [[0, 1], [0, 2], [0, 3], [0, 4], [0, 5], [0, 6], [1, 5], [5, 2], [3, 6], [6, 4], [1, 3], [2, 4]];

export function Impact() {
  const reduce = useReducedMotion();
  return (
    <section id="impact" aria-labelledby="impact-title" className="on-light relative overflow-hidden bg-ivory py-28 text-ink sm:py-40">
      <div className="mx-auto grid max-w-[88rem] gap-16 px-5 sm:px-8 lg:grid-cols-12 lg:items-center lg:px-12">
        <div className="lg:col-span-6 lg:order-1">
          <Reveal y={10}><p className="mb-8 flex items-center gap-4 text-[0.72rem] uppercase tracking-[0.28em] text-[#6b5a2f]"><span aria-hidden className="h-px w-10 bg-current" />Social Impact · Hope Commoners Foundation</p></Reveal>
          <MaskHeading id="impact-title" className="text-display" lines={["A Better Future", <span key="b" className="italic text-[#2f5a45]">Is Built Together.</span>]} />
          <Reveal delay={0.1} className="mt-10 max-w-xl space-y-5 text-lead leading-relaxed text-ink/80">
            <p>Alongside business growth, we believe in creating opportunities for communities and supporting initiatives that make a meaningful difference.</p>
            <p>Hope Commoners Foundation is described by the company as a nonprofit organization. Learn more about it on its official website.</p>
          </Reveal>
          <Reveal delay={0.2}>
            <a href={externalLinks.foundation} target="_blank" rel="noopener noreferrer" className="btn btn-dark mt-12">
              Visit Hope Commoners Foundation <ArrowUpRight className="arrow h-4 w-4" aria-hidden />
              <span className="sr-only"> (opens in a new tab)</span>
            </a>
          </Reveal>
        </div>
        <div className="lg:col-span-6 lg:order-2">
          <svg viewBox="0 0 600 600" className="mx-auto w-full max-w-[32rem]" role="img" aria-label="Abstract illustration of connected circles representing a community">
            {links.map(([a, b], i) => (
              <motion.line key={i} x1={circles[a].cx} y1={circles[a].cy} x2={circles[b].cx} y2={circles[b].cy} stroke="#0d2920" strokeOpacity=".35" strokeWidth="1"
                initial={reduce ? false : { pathLength: 0 }} whileInView={{ pathLength: 1 }} viewport={{ once: true, margin: "-10%" }} transition={{ duration: 1.4, delay: 0.4 + i * 0.08 }} />
            ))}
            {circles.map((c, i) => (
              <motion.circle key={i} cx={c.cx} cy={c.cy} r={c.r} fill={c.c} fillOpacity={c.c === "#C5A66A" ? 0.85 : 1}
                style={{ transformOrigin: `${c.cx}px ${c.cy}px` }}
                initial={reduce ? false : { scale: 0, opacity: 0 }} whileInView={{ scale: 1, opacity: 1 }} viewport={{ once: true, margin: "-10%" }} transition={{ duration: 1, delay: i * 0.12, ease: [0.2, 0.7, 0.2, 1] }} />
            ))}
            <circle cx="300" cy="300" r="118" fill="none" stroke="#0d2920" strokeOpacity=".2" strokeDasharray="2 8" />
            <circle cx="300" cy="300" r="230" fill="none" stroke="#0d2920" strokeOpacity=".12" strokeDasharray="2 10" />
          </svg>
        </div>
      </div>
    </section>
  );
}
