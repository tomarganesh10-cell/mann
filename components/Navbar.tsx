"use client";

import { AnimatePresence, motion, useReducedMotion } from "motion/react";
import { ArrowUpRight, Menu, X } from "lucide-react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useCallback, useEffect, useRef, useState } from "react";
import { navLinks } from "@/lib/site";
import { Wordmark } from "./Logo";

export function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);
  const [active, setActive] = useState<string>("");
  const toggleRef = useRef<HTMLButtonElement>(null);
  const panelRef = useRef<HTMLDivElement>(null);
  const reduce = useReducedMotion();
  const pathname = usePathname();
  const onHome = pathname === "/";
  /** Section links point at the home page when the visitor is on another route. */
  const hrefFor = (l: (typeof navLinks)[number]) => (l.route || onHome ? l.href : `/${l.href}`);
  const current = onHome ? active : navLinks.find((l) => l.route && pathname.startsWith(l.href))?.id;

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 40);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    if (!onHome) return;
    const io = new IntersectionObserver(
      (entries) => entries.forEach((e) => e.isIntersecting && setActive(e.target.id)),
      { rootMargin: "-45% 0px -50% 0px" },
    );
    navLinks.forEach((l) => { const el = document.getElementById(l.id); if (el) io.observe(el); });
    const home = document.getElementById("home");
    if (home) io.observe(home);
    return () => io.disconnect();
  }, [onHome]);

  const close = useCallback(() => { setOpen(false); toggleRef.current?.focus(); }, []);

  // Mobile menu: scroll lock, Escape to close, focus trap, move focus into panel.
  useEffect(() => {
    if (!open) return;
    const prev = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    const panel = panelRef.current;
    const focusables = () => Array.from(panel?.querySelectorAll<HTMLElement>("a[href],button") ?? []);
    focusables()[0]?.focus();
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") { e.preventDefault(); close(); }
      if (e.key === "Tab") {
        const f = focusables();
        if (!f.length) return;
        const first = f[0], last = f[f.length - 1];
        if (e.shiftKey && document.activeElement === first) { e.preventDefault(); last.focus(); }
        else if (!e.shiftKey && document.activeElement === last) { e.preventDefault(); first.focus(); }
      }
    };
    document.addEventListener("keydown", onKey);
    const mq = window.matchMedia("(min-width: 1024px)");
    const onMq = () => mq.matches && setOpen(false);
    mq.addEventListener("change", onMq);
    return () => { document.body.style.overflow = prev; document.removeEventListener("keydown", onKey); mq.removeEventListener("change", onMq); };
  }, [open, close]);

  return (
    <header className={`fixed inset-x-0 top-0 z-50 transition-colors duration-500 ${scrolled || open ? "border-b hairline bg-forest/92 backdrop-blur-md" : "bg-transparent"}`}>
      <nav aria-label="Primary" className="mx-auto flex h-[4.5rem] max-w-[88rem] items-center justify-between px-5 sm:px-8 lg:px-12">
        <Link href={onHome ? "#home" : "/"} aria-label="Kalpavriksha, home" className="text-ivory"><Wordmark /></Link>

        <ul className="hidden items-center gap-5 lg:flex min-[1400px]:gap-9">
          {navLinks.map((l) => (
            <li key={l.id}>
              <Link href={hrefFor(l)} aria-current={current === l.id ? (l.route ? "page" : "true") : undefined} className="group relative whitespace-nowrap py-2 text-[0.68rem] uppercase tracking-[0.12em] text-muted transition-colors hover:text-ivory aria-[current=page]:text-ivory aria-[current=true]:text-ivory min-[1400px]:text-[0.78rem] min-[1400px]:tracking-[0.18em]">
                {l.id === "portfolio" ? <><span className="min-[1400px]:hidden">Portfolio</span><span className="hidden min-[1400px]:inline">{l.label}</span></> : l.label}
                <span aria-hidden className="absolute inset-x-0 -bottom-0.5 h-px origin-left scale-x-0 bg-lime transition-transform duration-500 group-hover:scale-x-100 group-aria-[current=page]:scale-x-100 group-aria-[current=true]:scale-x-100" />
              </Link>
            </li>
          ))}
          <li className="hidden min-[1100px]:block"><Link href={onHome ? "#contact" : "/#contact"} className="btn btn-primary !min-h-11 !whitespace-nowrap !px-4 !text-[0.68rem] min-[1400px]:!px-5 min-[1400px]:!text-[0.72rem]">Partner With Us <ArrowUpRight className="h-3.5 w-3.5" aria-hidden /></Link></li>
        </ul>

        <button
          ref={toggleRef}
          type="button"
          className="-mr-2 flex h-12 w-12 items-center justify-center text-ivory lg:hidden"
          aria-expanded={open}
          aria-controls="mobile-menu"
          aria-label={open ? "Close menu" : "Open menu"}
          onClick={() => (open ? close() : setOpen(true))}
        >
          {open ? <X className="h-6 w-6" aria-hidden /> : <Menu className="h-6 w-6" aria-hidden />}
        </button>
      </nav>

      <AnimatePresence>
        {open && (
          <motion.div
            id="mobile-menu"
            ref={panelRef}
            role="dialog"
            aria-modal="true"
            aria-label="Site menu"
            className="fixed inset-x-0 bottom-0 top-[4.5rem] overflow-y-auto bg-forest px-5 pb-10 pt-8 sm:px-8 lg:hidden"
            initial={reduce ? false : { opacity: 0, y: -16 }}
            animate={{ opacity: 1, y: 0 }}
            exit={reduce ? { opacity: 0 } : { opacity: 0, y: -16 }}
            transition={{ duration: 0.35 }}
          >
            <ul className="flex flex-col">
              {navLinks.map((l, i) => (
                <motion.li key={l.id} className="border-b hairline" initial={reduce ? false : { opacity: 0, x: -16 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: 0.08 + i * 0.06 }}>
                  <Link href={hrefFor(l)} onClick={() => setOpen(false)} className="font-display flex min-h-16 items-center justify-between text-3xl text-ivory">
                    {l.label}<span className="text-xs text-gold" aria-hidden>0{i + 1}</span>
                  </Link>
                </motion.li>
              ))}
            </ul>
            <Link href={onHome ? "#contact" : "/#contact"} onClick={() => setOpen(false)} className="btn btn-primary mt-10 w-full">Partner With Us</Link>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
}
