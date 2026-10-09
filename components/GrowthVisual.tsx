"use client";

import { motion, useReducedMotion } from "motion/react";
import { useMemo } from "react";
import { generateTree } from "@/lib/tree";

/** Abstract growth diagram: concentric rings with a branching structure drawing itself on scroll-in. */
export function GrowthVisual() {
  const reduce = useReducedMotion();
  const tree = useMemo(() => generateTree({ x: 300, y: 540, length: 130, depth: 6, seed: 42, spread: 30 }), []);
  return (
    <div className="relative mx-auto aspect-square w-full max-w-[34rem]">
      <svg viewBox="0 0 600 600" className="h-full w-full" role="img" aria-label="Abstract illustration of branches growing outward from a single root, representing growth and connection">
        {[250, 190, 130].map((r, i) => (
          <motion.circle key={r} cx="300" cy="300" r={r} fill="none" stroke="#C5A66A" strokeOpacity={0.25 - i * 0.05} strokeDasharray="2 7"
            initial={reduce ? false : { pathLength: 0 }} whileInView={{ pathLength: 1 }} viewport={{ once: true }} transition={{ duration: 2.2, delay: i * 0.25 }} />
        ))}
        {tree.paths.map((p, i) => (
          <motion.path key={i} d={p.d} fill="none" stroke="#F4F0E6" strokeOpacity={0.85 - p.depth * 0.09} strokeWidth={Math.max(0.7, 2.6 - p.depth * 0.35)} strokeLinecap="round"
            initial={reduce ? false : { pathLength: 0 }} whileInView={{ pathLength: 1 }} viewport={{ once: true, margin: "-10%" }}
            transition={{ duration: 1.4, delay: p.depth * 0.3 + (i % 4) * 0.04, ease: "easeOut" }} />
        ))}
        {tree.nodes.filter((n) => n.depth >= 3).map((n, i) => (
          <motion.circle key={i} cx={n.x} cy={n.y} r="3" fill={i % 2 ? "#C4E879" : "#C5A66A"} className="node-pulse" style={{ animationDelay: `${i * 0.3}s`, filter: "drop-shadow(0 0 5px rgba(196,232,121,.7))" }}
            initial={reduce ? false : { scale: 0 }} whileInView={{ scale: 1 }} viewport={{ once: true }} transition={{ delay: 1.6 + i * 0.05 }} />
        ))}
      </svg>
    </div>
  );
}
