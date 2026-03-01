# I Feel Seen

A card-drawing web experience where you pick from three hidden piles — words, colors, objects — and receive a personal reflection grounded in timeless wisdom.

**Live:** [ifeelseen.ai](https://ifeelseen.ai)

---

## What it does

Draw nine cards without thinking. Watch what you chose. Receive a reflection written specifically for your combination — an interpretation of where you are right now, an insight that names what's underneath, and an encouraging note grounded in wisdom for hard seasons.

Results are saved with a unique link so you can share or return to them.

---

## Tech stack

- **Next.js** (App Router) — server rendering, dynamic OG metadata, API routes
- **Tailwind CSS** — styling
- **Framer Motion** — card flip animations
- **Anthropic SDK** — AI reflection generation via Claude
- **Upstash Redis** — result permalink storage
- **Vercel** — deployment (auto-deploys on push to `main`)

---

## Getting started

```bash
npm install
npm run dev
```

Open [http://localhost:3000](http://localhost:3000).

### Environment variables

Create a `.env.local` file with:

```
ANTHROPIC_API_KEY=
KV_REST_API_URL=
KV_REST_API_TOKEN=
```

`NEXT_PUBLIC_GA_MEASUREMENT_ID` is set in Vercel for production only — omit from `.env.local` so analytics don't fire locally.

---

## Project structure

```
src/
├── app/
│   ├── api/cards/generate/   # AI reflection API route
│   ├── api/og/               # Dynamic OG image generation
│   ├── cards/                # Draw and reveal pages
│   ├── cards/result/[id]/    # Shareable result permalink
│   └── page.tsx              # Landing page
├── components/               # Card UI components
└── lib/                      # Card data and utilities
```

## Deployment

Push to `main` — Vercel deploys automatically.
