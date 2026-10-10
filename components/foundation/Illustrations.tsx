"use client";

import { motion, useReducedMotion } from "motion/react";

const earth = { green: "#1f4a38", clay: "#b5753d", sage: "#6f8a68", deep: "#0d2920", sand: "#e9d9bb" };
const tones = [earth.green, earth.clay, earth.sage, "#8a5a2b"];

function Person({ x, y, color, delay, reduce }: { x: number; y: number; color: string; delay: number; reduce: boolean | null }) {
  return (
    <motion.g
      style={{ transformOrigin: `${x}px ${y + 24}px` }}
      initial={reduce ? false : { opacity: 0, scale: 0.6 }}
      whileInView={{ opacity: 1, scale: 1 }}
      viewport={{ once: true }}
      transition={{ duration: 0.9, delay, ease: [0.2, 0.7, 0.2, 1] }}
    >
      <circle cx={x} cy={y} r="15" fill={color} />
      <path d={`M${x - 25} ${y + 52} a25 25 0 0 1 50 0 Z`} fill={color} opacity=".9" />
    </motion.g>
  );
}

function Steam({ x, y, delay, reduce }: { x: number; y: number; delay: number; reduce: boolean | null }) {
  return (
    <motion.path
      d={`M${x} ${y} c-9 -14 9 -22 0 -38 c-7 -11 5 -18 0 -28`}
      fill="none" stroke={earth.clay} strokeWidth="3" strokeLinecap="round" opacity=".85"
      initial={reduce ? false : { pathLength: 0 }} whileInView={{ pathLength: 1 }} viewport={{ once: true }}
      transition={{ duration: 1.6, delay, ease: "easeOut" }}
    />
  );
}

/** Hero: people gathered around a shared bowl. Abstract, no faces, no real or fictional beneficiaries. */
export function SharedTableScene() {
  const reduce = useReducedMotion();
  const people = Array.from({ length: 8 }, (_, i) => {
    const a = (i * 45 - 90) * (Math.PI / 180);
    return { x: 300 + Math.cos(a) * 205, y: 300 + Math.sin(a) * 205 - 24, color: tones[i % tones.length] };
  });
  return (
    <svg viewBox="0 0 600 600" className="h-auto w-full" role="img" aria-label="Illustration of eight people gathered in a circle around a shared bowl of food">
      <circle cx="300" cy="300" r="285" fill={earth.sand} opacity=".55" />
      <motion.circle cx="300" cy="300" r="205" fill="none" stroke={earth.green} strokeOpacity=".35" strokeDasharray="3 9"
        initial={reduce ? false : { pathLength: 0 }} animate={{ pathLength: 1 }} transition={{ duration: 2.4 }} />
      <circle cx="300" cy="300" r="128" fill="none" stroke={earth.green} strokeOpacity=".18" strokeDasharray="2 8" />
      {people.map((p, i) => <Person key={i} x={p.x} y={p.y} color={p.color} delay={0.3 + i * 0.12} reduce={reduce} />)}
      {/* shared bowl */}
      <path d="M232 292 h136 a68 68 0 0 1 -136 0 Z" fill={earth.green} />
      <path d="M226 292 h148" stroke={earth.deep} strokeWidth="6" strokeLinecap="round" />
      <ellipse cx="300" cy="292" rx="62" ry="9" fill={earth.clay} />
      <Steam x={272} y={278} delay={1.4} reduce={reduce} />
      <Steam x={300} y={278} delay={1.6} reduce={reduce} />
      <Steam x={328} y={278} delay={1.8} reduce={reduce} />
    </svg>
  );
}

/** Food section: a shared table with bowls, people gathered behind it. Illustration only, not documentation of real events. */
export function MealScene() {
  const reduce = useReducedMotion();
  return (
    <svg viewBox="0 0 800 460" className="h-auto w-full" role="img" aria-label="Illustration of a long shared table with bowls of food and people gathered behind it">
      <circle cx="400" cy="150" r="110" fill="#f0d9a8" opacity=".75" />
      <ellipse cx="400" cy="402" rx="360" ry="22" fill={earth.sage} opacity=".3" />
      {[110, 215, 320, 480, 585, 690].map((x, i) => (
        <Person key={x} x={x} y={228} color={tones[i % tones.length]} delay={0.2 + i * 0.12} reduce={reduce} />
      ))}
      <rect x="70" y="318" width="660" height="16" rx="3" fill={earth.green} />
      <path d="M130 334 v62 M670 334 v62" stroke={earth.green} strokeWidth="10" strokeLinecap="round" />
      {[160, 280, 400, 520, 640].map((x, i) => (
        <g key={x}>
          <path d={`M${x - 34} 284 h68 a34 34 0 0 1 -68 0 Z`} fill={i % 2 ? earth.sage : earth.clay} />
          <Steam x={x} y={272} delay={1 + i * 0.15} reduce={reduce} />
        </g>
      ))}
    </svg>
  );
}

export function FocusIcon({ id }: { id: "food" | "education" | "community" }) {
  const c = { food: earth.clay, education: earth.sage, community: earth.green }[id];
  return (
    <svg viewBox="0 0 64 64" className="h-14 w-14" aria-hidden fill="none" stroke={c} strokeWidth="2.6" strokeLinecap="round" strokeLinejoin="round">
      {id === "food" && (<><path d="M10 34h44a22 22 0 0 1-44 0Z" /><path d="M24 26c-4-5 4-8 0-13M34 26c-4-5 4-8 0-13M44 26c-4-5 4-8 0-13" /></>)}
      {id === "education" && (<><path d="M8 20c8-4 16-4 24 2v26c-8-6-16-6-24-2Z" /><path d="M56 20c-8-4-16-4-24 2v26c8-6 16-6 24-2Z" /><path d="M32 14c0-5 4-8 8-8-1 5-3 8-8 8Z" /></>)}
      {id === "community" && (<><circle cx="32" cy="22" r="10" /><circle cx="18" cy="42" r="10" /><circle cx="46" cy="42" r="10" /></>)}
    </svg>
  );
}
