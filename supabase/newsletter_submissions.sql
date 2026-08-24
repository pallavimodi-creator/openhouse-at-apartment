-- Newsletter backend — recreate the table the app expects.
-- Run this in the Supabase SQL editor of a LIVE project, then set the
-- project's URL + service_role key as env vars on Vercel (see below).
--
-- The API uses the service_role key, which bypasses RLS, so enabling RLS
-- with no public policies keeps the table private while the server still works.

create extension if not exists pgcrypto;

create table if not exists public.newsletter_submissions (
  id              uuid primary key default gen_random_uuid(),
  building        text not null,
  programme_slug  text not null,
  programme_title text,
  age_label       text,
  from_date       text,
  to_date         text,
  payload         jsonb not null,          -- the full draft (selected, nextSelected, photos, note, …)
  status          text not null default 'pending',   -- 'pending' | 'approved'
  submitted_at    timestamptz not null default now(),
  approved_at     timestamptz
);

create index if not exists newsletter_submissions_submitted_at_idx
  on public.newsletter_submissions (submitted_at desc);

alter table public.newsletter_submissions enable row level security;
-- No policies added on purpose: only the service_role (server) may read/write.

-- Env vars to set on Vercel (both projects, all targets: production/preview/development):
--   NEXT_PUBLIC_SUPABASE_URL       = https://<your-project-ref>.supabase.co
--   SUPABASE_SERVICE_ROLE_KEY      = <the project's service_role secret>
-- Then redeploy production.
