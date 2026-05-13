## Goal

Build a new AI Phone & Email Assistants solution page that matches the existing Vektiss site exactly — same Header, Footer, design tokens (`--primary` blue, `--background` off-white, `--foreground` near-black, `eyebrow`, `display-1/2`, `container-editorial`, card styling) — with all 5 sections specified and exact copy.

## Scope

- **Replace** the contents of `src/routes/solutions.ai-assistants.tsx`. The current file uses the generic `SolutionPage` template; the new page is fully custom and structurally different, so we won't reuse `SolutionPage`. Route URL stays `/solutions/ai-assistants` so existing nav/links keep working.
- Add two small new components for the interactive bits, kept colocated since they're page-specific:
  - `src/components/site/ai-assistants/CallDemo.tsx` — animated phone-call card (typing transcript loop, replay button).
  - `src/components/site/ai-assistants/PricingEstimator.tsx` — slider-driven plan card.
- Wrap everything in `<SiteLayout>` so nav + footer match the rest of the site.

## Design conformance

Use only existing tokens / utilities — no new colors:
- Page bg: `bg-background`, sections alternate with `bg-surface-elevated` and top border (`border-t border-border`) — same pattern as `SolutionPage.tsx`.
- Eyebrows: `<p className="eyebrow">` (mono, uppercase, tracked, muted).
- Headlines: `display-1` for hero H1, `display-2` for section H2s.
- Primary CTA: `bg-primary text-primary-foreground` button (`h-12 px-6 rounded-md`), with `ArrowRight` icon — copy exactly from `SolutionPage`'s strategy-call button (links to `https://calendly.com/vektiss-info/30-minute-vektiss-discovery`).
- Ghost CTA: `border border-border bg-background hover:bg-muted` matching the "All solutions" button style.
- Cards: `rounded-xl border border-border bg-card p-8 shadow-card`.
- Container: `container-editorial`, section padding `py-24 md:py-32`.
- Phone-demo card: dark surface using `bg-foreground text-background` (no new color), green pulse via `bg-emerald-500 animate-pulse` (lucide / tw built-ins are fine), accent badge using `bg-primary/10 text-primary`.

## Section breakdown

1. **Hero** — split grid (`md:grid-cols-12`), 6/6. Left: eyebrow `02 · AI PHONE & EMAIL ASSISTANTS`, H1 "Never let a missed call cost you another client.", subhead, two CTAs ("Book a Strategy Call" → calendly, "Hear a Real Call" → triggers `replay()` on demo via shared state / ref). Right: `<CallDemo />`.
2. **The Problem** — `bg-surface-elevated`, 12-col grid: left 5 cols eyebrow + H2; right 7 cols vertical stack of 3 numbered cards.
3. **How It Works** — 3-col grid, same numbered-step pattern used in `SolutionPage.implementation` (`STEP 01/02/03` with mono primary label).
4. **Pricing** — centered intro, then `<PricingEstimator />` card. Slider: shadcn `@/components/ui/slider`. Logic: tiers Starter (50–100), Growth (101–250), Pro (251–500); state holds current call value; derive plan via tiered function; compute included minutes label per tier (fixed values 200/500/1000 as spec'd). Smooth number transitions via simple CSS `transition-all` on opacity/translate when plan changes (track previous plan in state). CTA inside card: blue, "Get Started at This Plan →" → calendly. Footnotes for $1,500 setup + Smith.ai comparison in `text-xs text-muted-foreground`.
5. **Final CTA** — full-width `bg-surface-elevated` band, same shape as `SolutionPage`'s closing CTA, copy: "Ready to hire your best employee?" + subhead + blue "Book a Strategy Call →".

## CallDemo behavior

- `useState` for `visibleChars` per line, `useState` currentLineIndex.
- `useEffect` with `setInterval` (~30ms/char) types each line; pause 800ms between lines; after final line, show "✓ Lead captured" badge; pause 2.5s, reset.
- Expose `replay()` via `useImperativeHandle` so the hero's "Hear a Real Call" button restarts it. Cleanup interval on unmount.
- Lines exactly as specified in the request (Caller / Vektiss AI alternating, with a small avatar/label per bubble).

## Head metadata

Update `head()` meta to reflect the new positioning:
- title: "AI Phone & Email Assistants — Vektiss"
- description: "A fully managed AI receptionist that answers calls, qualifies leads, books appointments, and replies to emails 24/7."
- og:title / og:description mirrors.

## Files

- Edit: `src/routes/solutions.ai-assistants.tsx` (full rewrite of component, keep `createFileRoute` export).
- New: `src/components/site/ai-assistants/CallDemo.tsx`.
- New: `src/components/site/ai-assistants/PricingEstimator.tsx`.

## Out of scope

- No changes to Header, Footer, homepage, or other solution pages.
- No new design tokens or fonts.
- No backend / form submission — CTAs link to existing Calendly URL.
