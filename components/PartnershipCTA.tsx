"use client";

import { motion, useReducedMotion, useScroll, useTransform } from "motion/react";
import { ArrowRight } from "lucide-react";
import { useRef } from "react";
import { MaskHeading, Reveal } from "./motion";

export function PartnershipCTA() {
  const ref = useRef<HTMLElement>(null);
  const reduce = useReducedMotion();
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start end", "end start"] });
  const y = useTransform(scrollYProgress, [0, 1], reduce ? [0, 0] : [-60, 60]);
  return (
    <section ref={ref} aria-labelledby="cta-title" className="grain relative overflow-hidden bg-forest py-24 sm:py-32">
      <motion.div aria-hidden style={{ y }} className="pointer-events-none absolute inset-0">
        <div className="absolute left-1/2 top-1/2 h-[80vmin] w-[120vmin] -translate-x-1/2 -translate-y-1/2 rounded-full bg-[radial-gradient(closest-side,rgba(196,232,121,0.14),rgba(197,166,106,0.06)_55%,transparent)]" />
        <svg viewBox="0 0 1200 500" className="absolute inset-0 h-full w-full opacity-40" preserveAspectRatio="xMidYMid slice">
          {[0, 1, 2, 3, 4, 5].map((i) => (
            <path key={i} d={`M-50 ${80 + i * 70} C 300 ${i * 40}, 700 ${300 + i * 20}, 1250 ${60 + i * 75}`} fill="none" stroke={i % 2 ? "#C5A66A" : "#C4E879"} strokeOpacity=".3" strokeWidth=".7" />
          ))}
        </svg>
      </motion.div>
      <div className="relative z-10 mx-auto max-w-[88rem] px-5 sm:px-8 lg:px-12">
        <Reveal y={36}>
          <div className="glow-border relative px-6 py-16 text-center sm:px-16 sm:py-24">
            <MaskHeading id="cta-title" className="text-display mx-auto max-w-4xl" lines={["Have a Vision", <span key="b" className="italic text-lime">Worth Building?</span>]} />
            <p className="mx-auto mt-8 max-w-xl text-lead text-soft">
              Let&apos;s explore how the right partnerships and opportunities can turn ambitious ideas into meaningful progress.
            </p>
            <div className="mt-11 flex flex-col items-stretch justify-center gap-4 sm:flex-row sm:items-center">
              <a href="#contact" className="btn btn-primary">Discuss a Partnership <ArrowRight className="arrow h-4 w-4" aria-hidden /></a>
              <a href="#ecosystem" className="btn btn-ghost">Explore Our Ecosystem</a>
            </div>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
