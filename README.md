# I Feel Seen

A platform hosting interactive experiences that help people feel known and understood.

**Live:** [ifeelseen.ai](https://ifeelseen.ai)

---

## Experiences

### I Feel Seen — Card Draw (`/cards`)

Draw six cards without thinking — two words, two colors, two objects. Receive a personal reflection written specifically for your combination: an interpretation of where you are right now, an insight into what's underneath, and an encouraging note for the season you're in.

Results are saved with a unique link so you can share or return to them.

### What Career Should You Pursue? — Career Quiz (`/quiz/career`)

Answer 14 questions and discover your career archetype — the kind of work you're actually built for, at whatever stage you're at. 13 multiple choice questions plus a color pick for your gut. Your answers are interpreted holistically by AI to find your best-matching archetype from 10 possibilities, each with a description, career suggestions, and practical guidance.

No login, no data stored — results live at a shareable permalink.

---

## Tech stack

- **Next.js** (App Router) — server rendering, static params, dynamic OG metadata, API routes
- **Tailwind CSS** — styling
- **Framer Motion** — animations
- **Anthropic SDK** — AI reflection generation (card draw) and holistic quiz scoring (career quiz)
- **Upstash Redis** — result permalink storage (card draw), rate limiting (both experiences)
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
│   ├── api/cards/generate/      # AI reflection API route (card draw)
│   ├── api/quiz/career/result/  # AI archetype scoring API route (career quiz)
│   ├── api/og/                  # Dynamic OG image generation (cards + career quiz)
│   ├── cards/                   # Card draw and reveal pages
│   ├── cards/result/[id]/       # Shareable card result permalink
│   ├── quiz/career/             # Career quiz flow
│   ├── quiz/career/result/[archetype]/  # 10 static archetype result pages
│   └── page.tsx                 # Homepage hub
├── components/                  # Shared UI components
└── lib/                         # Card data, quiz data, scoring engine
```

## Deployment

Push to `main` — Vercel deploys automatically.
