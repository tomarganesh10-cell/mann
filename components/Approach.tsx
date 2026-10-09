"use client";

import { motion, useMotionValueEvent, useReducedMotion, useScroll, useSpring } from "motion/react";
import { useRef, useState } from "react";
import { approachStages } from "@/lib/site";
import { MaskHeading, Reveal } from "./motion";

export function Approach() {
  const ref = useRef<HTMLOListElement>(null);
  const reduce = useReducedMotion();
  const [active, setActive] = useState(0);
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start 75%", "end 55%"] });
  const progress = useSpring(scrollYProgress, { stiffness: 90, damping: 24 });
  useMotionValueEvent(scrollYProgress, "change", (v) => setActive(Math.min(approachStages.length - 1, Math.max(0, Math.floor(v * approachStages.length * 0.999)))));

  return (
    <section id="approach" aria-labelledby="approach-title" className="relative overflow-hidden bg-forest-2 py-28 sm:py-36">
      <div className="mx-auto max-w-[88rem] px-5 sm:px-8 lg:px-12">
        <Reveal y={10}><p className="eyebrow mb-8 flex items-center gap-4"><span aria-hidden className="h-px w-10 bg-gold" />Our Approach</p></Reveal>
        <MaskHeading id="approach-title" className="text-display max-w-4xl" lines={["From Opportunity", <span key="b" className="italic text-gold">to Expansion.</span>]} />
        <Reveal delay={0.1} className="mt-8 max-w-xl text-soft">The way we intend to work with every brand, partner, and idea that comes to us.</Reveal>

        <ol ref={ref} className="relative mt-20 grid gap-0 lg:grid-cols-4 lg:gap-8">
          {/* Track: vertical on mobile, horizontal on desktop */}
          <span aria-hidden className="absolute bottom-3 left-[0.7rem] top-3 w-px bg-ivory/15 lg:bottom-auto lg:left-0 lg:right-0 lg:top-[0.7rem] lg:h-px lg:w-auto" />
          <motion.span aria-hidden className="absolute bottom-3 left-[0.7rem] top-3 w-px origin-top bg-lime lg:hidden" style={{ scaleY: reduce ? 1 : progress }} />
          <motion.span aria-hidden className="absolute left-0 right-0 top-[0.7rem] hidden h-px origin-left bg-lime lg:block" style={{ scaleX: reduce ? 1 : progress }} />

          {approachStages.map((s, i) => {
            const on = i <= active;
            return (
              <li key={s.no} className="relative pb-12 pl-12 last:pb-0 md:pb-14 md:last:pb-0 lg:pb-0 lg:pl-0 lg:pt-14">
                <span aria-hidden className={`absolute left-0 top-0.5 flex h-[1.4rem] w-[1.4rem] items-center justify-center rounded-full border transition-colors duration-700 ${on ? "border-lime bg-forest-2" : "border-ivory/30 bg-forest-2"}`}>
                  <span className={`h-2 w-2 rounded-full transition-all duration-700 ${i === active ? "scale-125 bg-lime shadow-[0_0_14px_3px_rgba(196,232,121,.6)]" : on ? "bg-lime" : "bg-ivory/20"}`} />
                </span>
                <Reveal delay={i * 0.08} className="md:grid md:grid-cols-[minmax(0,1fr)_minmax(0,1.3fr)] md:items-end md:gap-10 lg:block">
                  <div>
                    <p className={`font-display text-sm transition-colors duration-700 ${on ? "text-gold" : "text-soft"}`}>{s.no}</p>
                    <h3 className={`mt-3 text-4xl uppercase tracking-[0.04em] transition-colors duration-700 sm:text-5xl lg:text-4xl xl:text-5xl ${on ? "text-ivory" : "text-ivory/45"}`}>{s.title}</h3>
                  </div>
                  <p className="mt-4 max-w-xs text-soft md:mt-0 md:max-w-md md:pb-1 lg:mt-4 lg:max-w-xs lg:pb-0">{s.body}</p>
                </Reveal>
              </li>
            );
          })}
        </ol>
      </div>
    </section>
  );
}
