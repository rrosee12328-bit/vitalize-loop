# /apply Intake Form → External Supabase + Email + Calendly

Wire "Get Started" CTAs to a new `/apply` form. On submit: save to **your** Supabase project (`vpecetclcztgjtkrgvnd`), notify `info@vektiss.com`, and redirect to Calendly with the fields pre-filled. Nothing is written to Lovable Cloud.

## 1. Your Supabase — SQL to run yourself

I can't reach your external project, so you run this once in **your** Supabase SQL Editor before I ship the code:

```sql
create table public.implementation_intake (
  id uuid primary key default gen_random_uuid(),
  created_at timestamptz not null default now(),
  full_name text not null,
  business_name text not null,
  email text not null,
  phone text not null,
  industry text not null,
  monthly_call_volume text not null,
  team_size text not null,
  problem_description text not null,
  consent_contact boolean not null default false
);

alter table public.implementation_intake enable row level security;
-- No policies = only service_role can read/write. Server function uses service role.
```

## 2. Secrets I'll request

Three secrets, stored server-side only, never shipped to the browser:

- `EXTERNAL_SUPABASE_URL` → `https://vpecetclcztgjtkrgvnd.supabase.co`
- `EXTERNAL_SUPABASE_ANON_KEY` (from your Supabase → Settings → API)
- `EXTERNAL_SUPABASE_SERVICE_ROLE_KEY` (same page — this bypasses RLS to insert)

## 3. New page: `/apply`

Full server-rendered route matching site design (header, footer, dark theme, brand colors). Fields, in order:

- Full name *
- Business name *
- Work email *
- Phone *
- Industry / business type * (select: Home services, Healthcare, Legal, Real estate, E-commerce, Professional services, Other)
- Monthly call volume * (select: <100, 100–500, 500–2k, 2k–10k, 10k+)
- Team size * (select: 1–5, 6–20, 21–100, 100+)
- What do you need help with? * (textarea)
- Consent checkbox * — "I agree to be contacted about my inquiry."
- Submit button: "Continue to booking →"

Client-side validation with `react-hook-form` + `zod` (already installed). Loading state on submit, inline errors, small privacy note.

## 4. Server function: `src/lib/intake.functions.ts`

`createServerFn` with zod validation. Inside the handler (not module scope):

1. Insert into **your** Supabase via the REST API using `EXTERNAL_SUPABASE_SERVICE_ROLE_KEY`. Uses raw `fetch` to `${EXTERNAL_SUPABASE_URL}/rest/v1/implementation_intake` — no dependency on the generated Supabase client, which is bound to the Lovable Cloud project.
2. Send email to `info@vektiss.com` via Lovable Emails (see step 5). Email failure is logged but doesn't fail the submission.
3. Return `{ ok: true }`.

## 5. Email notification

**Prerequisite:** the site needs a verified email sender domain. I'll check status first; if none is set up I'll walk you through domain setup (one-time DNS records), then continue automatically.

New template `implementation-intake-notification.tsx` registered in `src/lib/email-templates/registry.ts`. Subject: `New implementation intake — {business name}`. Body: all submitted fields in a clean branded layout. Sent to `info@vektiss.com`.

## 6. Calendly redirect with prefill

On success the client redirects to:

```
https://calendly.com/vektiss-info/30-minute-vektiss-discovery
  ?name=<Full name>
  &email=<Work email>
  &a1=<Phone>
  &a2=<Business>
  &a3=<Industry>
  &a4=<Monthly call volume>
  &a5=<Team size>
  &a6=<Problem>
```

Calendly natively supports `name`/`email`; `a1…aN` map to your booking form's custom questions in the order they appear. If your Calendly event has different custom questions or none, tell me and I'll adjust.

## 7. CTA updates across the site

Replace every "Get Started" / external `voice.vektiss.com/get-started` / direct Calendly link with `/apply`:

- `src/components/site/Header.tsx`
- `src/routes/index.tsx`
- `src/routes/solutions.ai-assistants.tsx`
- Any other CTA locations found via search

The direct Calendly URL is now only used as the post-submit redirect.

## Out of scope

- No writes to Lovable Cloud (`voice_intake_submissions` / `contact_submissions` untouched).
- No admin dashboard for viewing submissions — you'll see them in your Supabase Table Editor.
- No SMS, no reCAPTCHA (can add later if spam appears).

## Order of execution once approved

1. Request the 3 secrets.
2. Check email domain status; run domain + infra setup if needed.
3. Create `/apply` route, server function, email template, update CTAs.
4. Give you the SQL block above to paste into your Supabase before testing.
