-- Run this once in the EXTERNAL Supabase project used by implementation_intake.
-- This is intentionally separate from /supabase/migrations because the CRM table
-- is stored in the external project vpecetclcztgjtkrgvnd, not Lovable Cloud.

alter table public.implementation_intake
  add column if not exists tracking_consent boolean not null default false,
  add column if not exists attribution jsonb,
  add column if not exists meta_lead_event_id text,
  add column if not exists meta_schedule_event_id text,
  add column if not exists booking_tracking_token uuid,
  add column if not exists booking_status text not null default 'submitted',
  add column if not exists calendly_event_uri text,
  add column if not exists scheduled_at timestamptz,
  add column if not exists attended_at timestamptz,
  add column if not exists crm_stage text not null default 'new',
  add column if not exists disqualification_reason text,
  add column if not exists opportunity_value numeric,
  add column if not exists customer_won_at timestamptz;

update public.implementation_intake
set booking_tracking_token = gen_random_uuid()
where booking_tracking_token is null;

alter table public.implementation_intake
  alter column booking_tracking_token set not null;

create unique index if not exists implementation_intake_booking_tracking_token_key
  on public.implementation_intake (booking_tracking_token);

create index if not exists implementation_intake_booking_status_idx
  on public.implementation_intake (booking_status, created_at desc);

create index if not exists implementation_intake_crm_stage_idx
  on public.implementation_intake (crm_stage, created_at desc);

alter table public.implementation_intake
  drop constraint if exists implementation_intake_booking_status_check;

alter table public.implementation_intake
  add constraint implementation_intake_booking_status_check
  check (booking_status in ('submitted', 'scheduled', 'canceled', 'no_show'));

alter table public.implementation_intake
  drop constraint if exists implementation_intake_crm_stage_check;

alter table public.implementation_intake
  add constraint implementation_intake_crm_stage_check
  check (crm_stage in ('new', 'contacted', 'booked', 'attended', 'qualified', 'disqualified', 'opportunity', 'customer_won', 'closed_lost'));

comment on column public.implementation_intake.attribution is
  'Meta and UTM attribution captured at form submission. Keep only fields covered by the approved privacy notice.';

comment on column public.implementation_intake.booking_tracking_token is
  'Opaque server-generated token required to update this intake after the embedded scheduler confirms a booking.';
