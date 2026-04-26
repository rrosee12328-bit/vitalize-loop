## Vektiss — Marketing Site + Strategy Call Booking

A light, editorial-style marketing site positioning Vektiss as a "systems company" for operator-owners, with a qualifying lead form that triggers a confirmation email containing a scheduling link.

---

### Pages (separate routes for SEO + per-page social previews)

1. **Home (`/`)** — Hero with sharp positioning, problem-recognition section, four-pillars overview, social proof strip, primary CTA to book a call.
2. **How We Work (`/how-we-work`)** — Deep dive on the integrated systems approach vs. siloed tools; explains the four pillars working together.
3. **Case Studies (`/case-studies`)** — Results-led case study cards (placeholder until you provide content).
4. **About (`/about`)** — Positioning as a systems company, founder/team, philosophy.
5. **Book a Strategy Call (`/book`)** — The qualifying form (name, company, email, role, primary challenge, revenue range).
6. **Confirmation (`/book/confirmed`)** — "Check your inbox" page after submission.
7. **Privacy (`/privacy`)** and **Terms (`/terms`)** — Compliance basics.

A persistent header with nav + a "Book a strategy call" button, and a footer with company info, nav, and legal links.

---

### Design system (light, premium, editorial)

- **Background**: warm off-white (`#FAFAF7`)
- **Foreground**: near-black (`#0A0A0A`) for strong editorial contrast
- **Accent**: a single saturated accent for CTAs and key highlights (default proposal: a confident warm orange `#FF5B2E` — easy to swap)
- **Muted/borders**: subtle warm grays
- **Typography**: Inter for everything (400/500/600/700), tight tracking on headlines, generous body line-height. JetBrains Mono for small label/eyebrow text and metrics.
- **Layout**: wide editorial whitespace, large display headlines, asymmetric section layouts where appropriate, subtle hover states only.
- **Components**: shadcn/ui buttons (rounded-md), bordered cards with quiet shadows, clean form inputs with label-above pattern and accessible focus rings.
- All tokens defined as CSS variables in `styles.css` so the accent and surfaces are easy to retune.

---

### Booking flow

1. Visitor clicks any "Book a strategy call" CTA → lands on `/book`.
2. Form fields: name, company, work email, role, company stage/revenue range, primary operational challenge (textarea), how they heard about Vektiss (optional).
3. Client-side validation with Zod (required fields, email format, length limits).
4. Submission stores the request in a `strategy_call_requests` Supabase table.
5. Server-side trigger sends two emails via Lovable's built-in email infrastructure:
   - **To the visitor**: branded confirmation with a personal note and a scheduling link (a single configurable URL — e.g. your Cal.com or Calendly — stored in an env var so you can change it without a redeploy).
   - **To you (Vektiss)**: a notification with the full submission so you can prep before the call.
6. Visitor is redirected to `/book/confirmed` with clear next-steps copy.

No public auth, no user accounts. Lead data is admin-only (RLS locks the table; only service role can read/write).

---

### Backend (Lovable Cloud)

- **Table**: `strategy_call_requests` (id, name, company, email, role, stage, challenge, source, created_at, status).
- **RLS**: insert allowed via the server route only; no public read. No client-side direct writes — submission goes through a server route that validates input, inserts the row, and enqueues the two emails.
- **Email**: Lovable's built-in transactional email system (no Resend account needed). Two templates:
  - `strategy-call-confirmation` (to visitor, includes scheduling link).
  - `strategy-call-internal-notification` (to your inbox, includes form details).
- **Scheduling URL**: stored as an env var (e.g. `SCHEDULING_URL`) so swapping providers is one config change.

---

### Content

I'll write strong placeholder copy aligned with the "systems company" positioning, four pillars (Project Intelligence, AI Assistants, etc.), and operator-owner pain points. You'll edit/replace it once the site is live. Case studies and testimonials use realistic placeholder structures (logo slots, metric, quote) ready for you to drop real content into.

---

### Compliance basics included

- Cookie/analytics banner stub (no analytics wired by default — can be added later).
- Privacy and Terms pages with sensible boilerplate you'll review with counsel.
- Form: explicit consent checkbox for processing the submission and follow-up contact.
- Accessibility: semantic HTML, keyboard-navigable nav and forms, visible focus rings, AA contrast.

---

### Explicitly out of scope for v1

- Auth, dashboards, client portal, bookings/events tables (deferred per your scope choice).
- Analytics integration (PostHog/GA), AI assistant integrations, Cloudinary — easy to add later.
- Embedded scheduler — using a link in the confirmation email instead, per your choice.
