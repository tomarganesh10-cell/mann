"use client";

import { motion, useReducedMotion, type Variants } from "motion/react";
import type { ReactNode } from "react";

export const ease = [0.2, 0.7, 0.2, 1] as const;

/** Fade/slide in when scrolled into view. Content stays visible without JS (see layout noscript) and with reduced motion. */
export function Reveal({
  children, delay = 0, y = 28, className, as = "div", once = true,
}: { children: ReactNode; delay?: number; y?: number; className?: string; as?: "div" | "p" | "li" | "article"; once?: boolean }) {
  const reduce = useReducedMotion();
  const Comp = motion[as] as typeof motion.div;
  return (
    <Comp
      className={className}
      initial={reduce ? false : { opacity: 0, y }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once, margin: "0px 0px -12% 0px" }}
      transition={{ duration: 0.9, delay, ease }}
    >
      {children}
    </Comp>
  );
}

const lineVariants: Variants = {
  hidden: { y: "108%" },
  show: (i: number) => ({ y: "0%", transition: { duration: 1.05, delay: i * 0.12, ease } }),
};

/** Headline with per-line mask reveal. Pass explicit lines for controlled breaks. */
export function MaskHeading({
  lines, as: Tag = "h2", className, id, immediate = false, delay = 0,
}: { lines: readonly ReactNode[]; as?: "h1" | "h2" | "h3"; className?: string; id?: string; immediate?: boolean; delay?: number }) {
  const reduce = useReducedMotion();
  const MotionTag = motion[Tag as "h1"] as typeof motion.h1;
  const trigger = immediate ? { animate: "show" } : { whileInView: "show", viewport: { once: true, margin: "0px 0px -15% 0px" } };
  return (
    <MotionTag id={id} className={className} initial={reduce ? false : "hidden"} {...trigger} transition={{ delayChildren: reduce ? 0 : delay }}>
      {lines.map((line, i) => (
        <span key={i} className="block overflow-hidden pb-[0.12em] -mb-[0.12em]">
          <motion.span className="block will-change-transform" variants={lineVariants} custom={reduce ? 0 : i}>
            {line}
          </motion.span>
        </span>
      ))}
    </MotionTag>
  );
}
