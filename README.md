# Kalpavriksha Collective Pvt Ltd — Website

Next.js (App Router) · React 19 · TypeScript (strict) · Tailwind CSS 4 · Motion · Lucide.

```bash
npm install
npm run dev          # http://localhost:3000
npm run lint && npm run typecheck && npm run build
```

## Where to edit
- `lib/site.ts` — copy, navigation, pillars, approach stages, company contact details (left `null` until verified).
- `lib/franchise.ts` — franchise ecosystem data. Add brands only after the relationship is verified in writing. Domino's/Subway are deliberately **not** included.
- `app/privacy`, `app/terms` — placeholder routes; replace with legal-approved text.

## Contact form (integration boundary)
`POST /api/contact` validates (shared rules in `lib/validation.ts`), applies a honeypot, a minimum-fill-time check and a per-instance rate limit, then calls `lib/contact-service.ts`.
Until `CONTACT_WEBHOOK_URL` is set the API returns 503 and the UI honestly says the message was **not** sent. To go live, set `CONTACT_WEBHOOK_URL` (and optionally `CONTACT_WEBHOOK_SECRET`) server-side, or swap in an approved email provider inside `deliverContact`. Never commit secrets; see `.env.example`.

## Before production
- Confirm PLAYPLATE master-franchise wording and supply an approved logo (`logoSrc` in `lib/franchise.ts`), else the text wordmark is used.
- Verify Hope Commoners Foundation copy against its official site (it was not reachable from the build environment).
- Set `NEXT_PUBLIC_SITE_URL` to enable canonical URL, sitemap and OG URLs.
- Supply real contact details and legal pages; add a shared-store rate limiter if running multiple instances.
