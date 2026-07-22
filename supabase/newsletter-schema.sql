-- =========================================================================
-- Openhouse newsletter submissions · Postgres schema for Supabase
-- =========================================================================
-- Paste into the Supabase SQL editor (SQL → New query → Run). Idempotent.
--
-- Educators submit a newsletter for their building; admins review + approve,
-- then download. All access goes through the app's server routes using the
-- service-role key, so no client-facing RLS policies are needed — RLS is
-- enabled and left closed.
-- =========================================================================

create extension if not exists "pgcrypto";

create table if not exists public.newsletter_submissions (
  id uuid primary key default gen_random_uuid(),
  building text not null,
  programme_slug text not null,
  programme_title text not null,
  age_label text not null,
  from_date text not null,
  to_date text not null,
  -- the full draft: { selected, nextSelected, photos, building, from, to }
  payload jsonb not null,
  status text not null default 'pending' check (status in ('pending', 'approved')),
  submitted_at timestamptz not null default now(),
  approved_at timestamptz
);

create index if not exists newsletter_submissions_building_idx
  on public.newsletter_submissions (building);
create index if not exists newsletter_submissions_status_idx
  on public.newsletter_submissions (status, submitted_at desc);

alter table public.newsletter_submissions enable row level security;
-- No policies: the anon/public role gets no access. The server routes use
-- the service-role key, which bypasses RLS.
