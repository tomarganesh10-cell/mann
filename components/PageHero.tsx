"use client";

import { motion, useReducedMotion } from "motion/react";
import type { ReactNode } from "react";
import { HeroNetwork } from "./HeroNetwork";
import { MaskHeading, ease } from "./motion";

/** Compact cinematic page opener shared by secondary pages (same network backdrop as the home hero). */
export function PageHero({ id, eyebrow, lines, body, crumb }: { id: string; eyebrow: string; lines: readonly ReactNode[]; body: string; crumb: ReactNode }) {
  const reduce = useReducedMotion();
  const appear = (delay: number) => ({
    initial: reduce ? false : { opacity: 0, y: 20 },
    animate: { opacity: 1, y: 0 },
    transition: { duration: 0.9, delay, ease },
  } as const);
  return (
    <section aria-labelledby={id} className="grain relative flex min-h-[64svh] items-center overflow-hidden bg-forest">
      <div className="absolute inset-0">
        <div className="absolute inset-0 bg-[radial-gradient(120%_80%_at_70%_100%,#0d2920_0%,#071a14_60%)]" />
        <HeroNetwork />
        <div className="absolute inset-0 bg-[linear-gradient(90deg,#071a14_0%,rgba(7,26,20,0.78)_40%,transparent_78%)]" />
      </div>
      <div className="relative z-10 mx-auto w-full max-w-[88rem] px-5 pb-16 pt-36 sm:px-8 lg:px-12">
        <motion.nav {...appear(0.1)} aria-label="Breadcrumb" className="mb-6 text-[0.7rem] uppercase tracking-[0.2em] text-muted">{crumb}</motion.nav>
        <motion.p {...appear(0.2)} className="eyebrow mb-8 flex flex-wrap items-center gap-x-4 gap-y-2"><span aria-hidden className="h-px w-10 bg-gold" />{eyebrow}</motion.p>
        <MaskHeading as="h1" id={id} immediate delay={0.6} className="text-[clamp(2.6rem,1.3rem+6.4vw,7rem)] max-w-5xl" lines={lines} />
        <motion.p {...appear(1.7)} className="mt-9 max-w-xl text-lead leading-relaxed text-soft">{body}</motion.p>
      </div>
    </section>
  );
}
