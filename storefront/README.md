# Kesmiris Storefront

Next.js 15 / React 19 storefront skeleton for the Kesmiris webshop.

Stack:
- Next.js 16 App Router + Turbopack
- Tailwind CSS v4
- shadcn/ui (neutral base, base-nova style)
- Medusa JS SDK v2 for product / cart / order data
- react-hook-form + zod for forms
- next-intl installed (not configured yet — for later DE/EN switch)

## Setup

```bash
cp .env.example .env.local
# edit values, especially NEXT_PUBLIC_MEDUSA_BACKEND_URL / publishable key
npm install
npm run dev
```

Backend lives at `../backend/` (built by sibling agent — Medusa 2.0).
The storefront talks to the backend via `NEXT_PUBLIC_MEDUSA_BACKEND_URL`.

## Pages (all skeletons — design refresh in next session)

| Route | Status |
|---|---|
| `/` | Hero stub + CTA buttons |
| `/produkte` | Lists products via Medusa SDK; falls back to empty grid |
| `/produkte/[handle]` | Product detail; image + price + (disabled) cart button |
| `/waermepumpe` | Info copy + lead form |
| `/waermepumpe/erfolg` | Lead-submit success page |
| `/warenkorb` | Empty cart stub |
| `/checkout` | Stub — Stripe integration in next session |
| `/bestellbestätigung` | Order confirmation stub |
| `/impressum`, `/datenschutz`, `/agb`, `/widerruf` | Legal placeholders |

## Components

- `src/components/layout/header.tsx` — Logo, nav, cart icon
- `src/components/layout/footer.tsx` — Legal links + contact placeholder
- `src/components/product-card.tsx` — Climate-unit listing card
- `src/components/heat-pump-lead-form.tsx` — zod-validated lead form, POSTs to `/store/heat-pump-leads`
- `src/lib/medusa.ts` — Medusa SDK client + `submitHeatPumpLead` helper

## Build

```bash
npm run build
```

`next.config.ts` is set to `output: "standalone"` so the Dockerfile can
ship the minimal runtime bundle for Coolify deploy.

## What the next session needs to build

- Visual design pass: typography, color tokens, hero, product grid polish
- Real product images + content (waiting on supplier feed)
- Cart state: Medusa cart create / line-item / persistence in localStorage
- Checkout flow with Stripe Payment Element + Medusa payment session
- Order confirmation: load actual order via token
- Legal page content (Impressum, Datenschutz, AGB, Widerruf — needs Kesmiris-Firmendaten)
- next-intl wiring for DE/EN
- next/image migration with explicit `remotePatterns` once supplier CDN is known
- SEO: sitemap.ts, robots.ts, og-image generation
