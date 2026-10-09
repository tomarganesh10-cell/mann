/** Abstract Kalpavriksha mark: a fine branching structure inside a hairline ring — not a literal tree icon. */
export function LogoMark({ className = "h-9 w-9" }: { className?: string }) {
  return (
    <svg viewBox="0 0 48 48" fill="none" className={className} aria-hidden="true">
      <circle cx="24" cy="24" r="22.5" stroke="currentColor" strokeOpacity=".35" />
      <path d="M24 41V25M24 25C24 19 19 16 14 13M24 25C24 19 29 16 34 13M24 25C23 20 24 15 24 9M14 13c-3 0-5-1-6-3M34 13c3 0 5-1 6-3" stroke="currentColor" strokeWidth="1.2" strokeLinecap="round" />
      <circle cx="24" cy="9" r="1.8" fill="var(--color-lime)" />
      <circle cx="14" cy="13" r="1.4" fill="var(--color-gold)" />
      <circle cx="34" cy="13" r="1.4" fill="var(--color-gold)" />
    </svg>
  );
}

export function Wordmark({ className = "" }: { className?: string }) {
  return (
    <span className={`inline-flex items-center gap-3 ${className}`}>
      <LogoMark />
      <span className="font-display text-[1.05rem] uppercase tracking-[0.32em]" style={{ fontWeight: 400 }}>
        Kalpavriksha
      </span>
    </span>
  );
}
