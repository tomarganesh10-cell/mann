"use client";

import { motion, useMotionValue, useReducedMotion, useSpring, useTransform } from "motion/react";
import { useEffect, useMemo } from "react";
import { generateTree } from "@/lib/tree";

const LAYERS = [
  { seed: 11, x: 760, y: 900, length: 250, depth: 7, strength: 22, opacity: 0.95 },
  { seed: 5, x: 1020, y: 900, length: 170, depth: 6, strength: 10, opacity: 0.45 },
  { seed: 23, x: 470, y: 900, length: 150, depth: 6, strength: 5, opacity: 0.3 },
] as const;

const PARTICLES = Array.from({ length: 14 }, (_, i) => ({
  cx: 120 + ((i * 97) % 1040), cy: 140 + ((i * 163) % 620), r: 1 + (i % 3) * 0.5, delay: (i % 7) * 0.6,
}));

/** Decorative branching network. Mouse parallax is enabled only for fine pointers and when motion is allowed. */
export function HeroNetwork() {
  const reduce = useReducedMotion();
  const mx = useMotionValue(0);
  const my = useMotionValue(0);
  const sx = useSpring(mx, { stiffness: 40, damping: 18 });
  const sy = useSpring(my, { stiffness: 40, damping: 18 });

  useEffect(() => {
    if (reduce || !window.matchMedia("(hover: hover) and (pointer: fine)").matches) return;
    const onMove = (e: PointerEvent) => {
      mx.set(e.clientX / window.innerWidth - 0.5);
      my.set(e.clientY / window.innerHeight - 0.5);
    };
    window.addEventListener("pointermove", onMove, { passive: true });
    return () => window.removeEventListener("pointermove", onMove);
  }, [reduce, mx, my]);

  const trees = useMemo(() => LAYERS.map((l) => ({ ...l, tree: generateTree({ ...l, length: l.length, depth: l.depth }) })), []);
  const t0x = useTransform(sx, (v) => v * 22), t0y = useTransform(sy, (v) => v * 14);
  const t1x = useTransform(sx, (v) => v * 10), t1y = useTransform(sy, (v) => v * 6);
  const t2x = useTransform(sx, (v) => v * 4), t2y = useTransform(sy, (v) => v * 3);
  const shifts = [{ x: t0x, y: t0y }, { x: t1x, y: t1y }, { x: t2x, y: t2y }];

  return (
    <div aria-hidden="true" className="pointer-events-none absolute inset-0 overflow-hidden">
      <div className="absolute -right-[10%] top-[5%] h-[85vmin] w-[85vmin] rounded-full bg-[radial-gradient(circle,rgba(196,232,121,0.16),transparent_62%)] blur-2xl" />
      <div className="absolute bottom-[-20%] left-[-10%] h-[70vmin] w-[70vmin] rounded-full bg-[radial-gradient(circle,rgba(197,166,106,0.12),transparent_62%)] blur-2xl" />
      <svg viewBox="0 0 1280 900" preserveAspectRatio="xMidYMax slice" className="absolute inset-0 h-full w-full opacity-60 sm:opacity-90 lg:opacity-100">
        <defs>
          <linearGradient id="branch" x1="0" y1="1" x2="0" y2="0">
            <stop offset="0" stopColor="#C5A66A" stopOpacity=".9" />
            <stop offset="1" stopColor="#C4E879" stopOpacity=".9" />
          </linearGradient>
        </defs>
        {PARTICLES.map((p, i) => (
          <circle key={i} cx={p.cx} cy={p.cy} r={p.r} fill="#F4F0E6" className="node-pulse" style={{ animationDelay: `${p.delay}s` }} opacity=".4" />
        ))}
        {trees.map((l, li) => (
          <motion.g key={l.seed} style={reduce ? undefined : shifts[li]} opacity={l.opacity}>
            {l.tree.paths.map((p, i) => (
              <motion.path
                key={i}
                d={p.d}
                fill="none"
                stroke="url(#branch)"
                strokeWidth={Math.max(0.6, 2.4 - p.depth * 0.3)}
                strokeLinecap="round"
                initial={reduce ? false : { pathLength: 0, opacity: 0 }}
                animate={{ pathLength: 1, opacity: 0.85 }}
                transition={{ duration: 1.6, delay: 0.5 + p.depth * 0.28 + li * 0.25 + (i % 5) * 0.03, ease: [0.3, 0.6, 0.2, 1] }}
              />
            ))}
            {l.tree.nodes.filter((n) => n.depth >= 2).map((n, i) => (
              <motion.circle
                key={i}
                cx={n.x}
                cy={n.y}
                r={n.depth > 4 ? 2.6 : 1.8}
                fill={i % 3 === 0 ? "#C4E879" : "#C5A66A"}
                className="node-pulse"
                style={{ animationDelay: `${(i % 9) * 0.45}s`, filter: "drop-shadow(0 0 6px rgba(196,232,121,.8))" }}
                initial={reduce ? false : { scale: 0, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                transition={{ delay: 1.6 + n.depth * 0.3, duration: 0.8 }}
              />
            ))}
          </motion.g>
        ))}
      </svg>
    </div>
  );
}
