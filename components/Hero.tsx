"use client";

import { motion, useReducedMotion, useScroll, useTransform } from "motion/react";
import { ArrowRight } from "lucide-react";
import { useRef } from "react";
import { HeroNetwork } from "./HeroNetwork";
import { MaskHeading, ease } from "./motion";

export function Hero() {
  const ref = useRef<HTMLElement>(null);
  const reduce = useReducedMotion();
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start start", "end start"] });
  const y = useTransform(scrollYProgress, [0, 1], [0, reduce ? 0 : 120]);
  const fade = useTransform(scrollYProgress, [0, 0.8], [1, reduce ? 1 : 0.2]);

  const appear = (delay: number) => ({
    initial: reduce ? false : { opacity: 0, y: 20 },
    animate: { opacity: 1, y: 0 },
    transition: { duration: 0.9, delay, ease },
  } as const);

  return (
    <section ref={ref} id="home" aria-labelledby="hero-title" className="grain relative flex min-h-[100svh] items-center overflow-hidden bg-forest">
      <motion.div className="absolute inset-0" initial={reduce ? false : { opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 1.4 }}>
        <div className="absolute inset-0 bg-[radial-gradient(120%_80%_at_70%_100%,#0d2920_0%,#071a14_60%)]" />
        <HeroNetwork />
        <div className="absolute inset-0 bg-[linear-gradient(90deg,#071a14_0%,rgba(7,26,20,0.75)_38%,transparent_75%)]" />
      </motion.div>

      <motion.div style={{ y, opacity: fade }} className="relative z-10 mx-auto w-full max-w-[88rem] px-5 pb-28 pt-32 sm:px-8 lg:px-12">
        <motion.p {...appear(0.2)} className="eyebrow mb-8 flex items-center gap-4">
          <span aria-hidden className="h-px w-10 bg-gold" /> Kalpavriksha Private Limited
        </motion.p>
        <MaskHeading as="h1" immediate delay={0.7} className="text-hero max-w-5xl" lines={["Where Ambition", <span key="b" className="italic text-lime">Becomes an Empire.</span>]} />
        <motion.p {...appear(1.9)} className="mt-9 max-w-xl text-lead leading-relaxed text-muted">
          From franchise opportunities to business expansion and social impact, we connect the people and ideas building tomorrow.
        </motion.p>
        <motion.div {...appear(2.2)} className="mt-11 flex flex-col gap-4 sm:flex-row">
          <a href="#ecosystem" className="btn btn-primary">Explore Our Ecosystem <ArrowRight className="arrow h-4 w-4" aria-hidden /></a>
          <a href="#contact" className="btn btn-ghost">Start a Conversation</a>
        </motion.div>
      </motion.div>

      <motion.a
        href="#about"
        aria-label="Scroll to the next section"
        {...appear(2.8)}
        className="absolute bottom-7 left-5 z-10 flex items-center gap-4 text-[0.68rem] uppercase tracking-[0.3em] text-muted sm:left-8 lg:left-12"
      >
        <span aria-hidden className="relative h-12 w-px overflow-hidden bg-ivory/20">
          <span className="absolute inset-0 bg-lime" style={{ animation: "scrollCue 2.4s cubic-bezier(.6,0,.3,1) infinite" }} />
        </span>
        Scroll
      </motion.a>
    </section>
  );
}
