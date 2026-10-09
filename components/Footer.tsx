"use client";

import { motion, useReducedMotion } from "motion/react";
import { ArrowUpRight } from "lucide-react";
import Link from "next/link";
import { useMemo } from "react";
import { footerLinks, externalLinks } from "@/lib/site";
import { generateTree } from "@/lib/tree";
import { MaskHeading, Reveal } from "./motion";

function FooterTree() {
  const reduce = useReducedMotion();
  const trees = useMemo(() => [
    generateTree({ x: 600, y: 520, length: 120, depth: 7, seed: 3, spread: 26 }),
    generateTree({ x: 280, y: 520, length: 70, depth: 5, seed: 17 }),
    generateTree({ x: 930, y: 520, length: 80, depth: 5, seed: 29 }),
  ], []);
  return (
    <svg aria-hidden viewBox="0 0 1200 520" preserveAspectRatio="xMidYMax meet" className="pointer-events-none absolute inset-x-0 bottom-0 h-full w-full opacity-70">
      {trees.map((t, ti) => (
        <g key={ti} opacity={ti === 0 ? 1 : 0.5}>
          {t.paths.map((p, i) => (
            <motion.path key={i} d={p.d} fill="none" stroke={p.depth % 2 ? "#C5A66A" : "#C4E879"} strokeOpacity={0.6} strokeWidth={Math.max(0.6, 2 - p.depth * 0.25)} strokeLinecap="round"
              initial={reduce ? false : { pathLength: 0 }} whileInView={{ pathLength: 1 }} viewport={{ once: true, margin: "-5%" }} transition={{ duration: 1.6, delay: p.depth * 0.25 + ti * 0.3, ease: "easeOut" }} />
          ))}
          {t.nodes.filter((n) => n.depth >= 3).map((n, i) => (
            <circle key={i} cx={n.x} cy={n.y} r="2.4" fill="#C4E879" className="node-pulse" style={{ animationDelay: `${(i % 8) * 0.5}s`, filter: "drop-shadow(0 0 5px rgba(196,232,121,.8))" }} />
          ))}
        </g>
      ))}
    </svg>
  );
}

export function Footer() {
  const year = new Date().getFullYear();
  return (
    <footer className="grain relative overflow-hidden bg-[#04110c] text-ivory">
      <div className="relative mx-auto max-w-[88rem] px-5 pt-28 sm:px-8 sm:pt-40 lg:px-12">
        <p className="eyebrow mb-8 flex items-center gap-4"><span aria-hidden className="h-px w-10 bg-gold" />Kalpavriksha Private Limited</p>
        <MaskHeading as="h2" className="text-display max-w-4xl" lines={["Every Great Future", <span key="b" className="italic text-lime">Starts With a Seed.</span>]} />
        <Reveal delay={0.1} className="mt-8 max-w-md text-lead text-muted">Building businesses, connecting opportunities, and creating impact.</Reveal>

        <div className="relative mt-24 grid gap-14 pb-10 sm:grid-cols-2 lg:grid-cols-12">
          <nav aria-label="Footer" className="lg:col-span-5">
            <p className="eyebrow mb-5">Explore</p>
            <ul className="grid grid-cols-2 gap-x-6">
              {footerLinks.map((l) => (
                <li key={l.label}><Link href={l.href} className="flex min-h-11 items-center text-lg text-ivory/85 transition-colors hover:text-lime">{l.label}</Link></li>
              ))}
            </ul>
          </nav>
          <div className="lg:col-span-4">
            <p className="eyebrow mb-5">Elsewhere</p>
            <ul>
              <li><a href={externalLinks.playplate} target="_blank" rel="noopener noreferrer" className="flex min-h-11 items-center gap-2 text-lg hover:text-lime">PLAYPLATE <ArrowUpRight className="h-4 w-4" aria-hidden /><span className="sr-only">(opens in a new tab)</span></a></li>
              <li><a href={externalLinks.foundation} target="_blank" rel="noopener noreferrer" className="flex min-h-11 items-center gap-2 text-lg hover:text-lime">Hope Commoners Foundation <ArrowUpRight className="h-4 w-4" aria-hidden /><span className="sr-only">(opens in a new tab)</span></a></li>
            </ul>
          </div>
          <div className="lg:col-span-3">
            <p className="eyebrow mb-5">Contact</p>
            <Link href="/#contact" className="flex min-h-11 items-center text-lg hover:text-lime">Send us a message</Link>
          </div>
        </div>
      </div>

      {/* Signature wordmark over the branching network */}
      <div className="relative mt-6 h-[clamp(14rem,34vw,30rem)] overflow-hidden" aria-hidden="true">
        <FooterTree />
        <div className="absolute inset-x-0 bottom-0 select-none text-center font-display uppercase leading-[0.78] text-ivory/[0.12]" style={{ fontSize: "clamp(2.1rem, 10.6vw, 12.5rem)", letterSpacing: "-0.04em", fontWeight: 400, whiteSpace: "nowrap" }}>
          Kalpavriksha
        </div>
      </div>

      <div className="relative z-10 border-t hairline bg-[#04110c]">
        <div className="mx-auto flex max-w-[88rem] flex-col gap-4 px-5 py-6 text-sm text-muted sm:px-8 lg:flex-row lg:items-center lg:justify-between lg:px-12">
          <p>© {year} Kalpavriksha Private Limited. All rights reserved.</p>
          <ul className="flex gap-6">
            <li><Link className="inline-flex min-h-11 items-center hover:text-ivory" href="/privacy">Privacy Policy</Link></li>
            <li><Link className="inline-flex min-h-11 items-center hover:text-ivory" href="/terms">Terms and Conditions</Link></li>
          </ul>
          <a href={externalLinks.playplate} target="_blank" rel="noopener noreferrer" className="group inline-flex min-h-11 items-center gap-3 text-[0.68rem] uppercase tracking-[0.24em] text-ivory/80 sm:text-xs">
            <span aria-hidden className="h-px w-6 bg-gold transition-all duration-500 group-hover:w-12 group-hover:bg-lime" />
            <span className="transition-colors duration-300 group-hover:text-lime">Designed &amp; Developed by PLAYPLATE IT Team</span>
            <span className="sr-only">(opens in a new tab)</span>
          </a>
        </div>
      </div>
    </footer>
  );
}
