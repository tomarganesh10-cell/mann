"use client";

import { ArrowRight } from "lucide-react";
import Link from "next/link";
import { motion, useReducedMotion } from "motion/react";
import { HeroNetwork } from "../HeroNetwork";
import { MaskHeading, ease } from "../motion";

export function PortfolioHero() {
  const reduce = useReducedMotion();
  const appear = (delay: number) => ({
    initial: reduce ? false : { opacity: 0, y: 20 },
    animate: { opacity: 1, y: 0 },
    transition: { duration: 0.9, delay, ease },
  } as const);
  return (
    <section aria-labelledby="portfolio-title" className="grain relative flex min-h-[88svh] items-center overflow-hidden bg-forest">
      <div className="absolute inset-0">
        <div className="absolute inset-0 bg-[radial-gradient(120%_80%_at_70%_100%,#0d2920_0%,#071a14_60%)]" />
        <HeroNetwork />
        <div className="absolute inset-0 bg-[linear-gradient(90deg,#071a14_0%,rgba(7,26,20,0.78)_40%,transparent_78%)]" />
      </div>
      <div className="relative z-10 mx-auto w-full max-w-[88rem] px-5 pb-20 pt-36 sm:px-8 lg:px-12">
        <motion.nav {...appear(0.1)} aria-label="Breadcrumb" className="mb-6 text-[0.7rem] uppercase tracking-[0.2em] text-muted">
          <Link href="/" className="hover:text-ivory">Home</Link> <span aria-hidden className="mx-2 text-gold">/</span>
          <span aria-current="page" className="text-ivory">Our Franchise Portfolio</span>
        </motion.nav>
        <motion.p {...appear(0.2)} className="eyebrow mb-8 flex flex-wrap items-center gap-x-4 gap-y-2">
          <span aria-hidden className="h-px w-10 bg-gold" /> Kalpavriksha Collective Pvt Ltd / Franchise Ecosystem
        </motion.p>
        <MaskHeading as="h1" id="portfolio-title" immediate delay={0.6} className="text-hero max-w-5xl" lines={["Great Brands.", <span key="b" className="italic text-lime">Bigger Possibilities.</span>]} />
        <motion.p {...appear(1.7)} className="mt-9 max-w-xl text-lead leading-relaxed text-soft">
          From innovative food-and-entertainment concepts to established quick-service restaurant brands, discover the possibilities across the food franchise landscape.
        </motion.p>
        <motion.div {...appear(2)} className="mt-11">
          <a href="#featured" className="btn btn-primary">Explore Featured Brands <ArrowRight className="arrow h-4 w-4" aria-hidden /></a>
        </motion.div>
      </div>
    </section>
  );
}
