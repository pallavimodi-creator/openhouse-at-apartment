-- Central log of teacher class progress, keyed by educator (name + login id).
-- Each time an educator marks a session complete (or un-marks it) the app
-- upserts a row here, so the admin records dashboard can see every educator's
-- results by name. The service-role key writes/reads; RLS stays on with no
-- anon policies so nothing is publicly readable.
--
-- Run this once in the Supabase SQL editor for the at-apartment project.

create table if not exists public.teacher_progress (
  id              uuid primary key default gen_random_uuid(),
  educator_name   text not null,
  username        text not null,            -- login id (e.g. art-01)
  category        text,                     -- art | language | stem
  age_scope       text,                     -- older | 3-5
  building        text,                     -- centre / apartment for that class
  programme_slug  text not null,
  programme_title text,
  day             int  not null,            -- 0 = trial, 1..n = sessions
  completed       boolean not null default true,
  updated_at      timestamptz not null default now(),
  unique (username, building, programme_slug, day)
);

create index if not exists teacher_progress_name_idx on public.teacher_progress (educator_name);
create index if not exists teacher_progress_updated_idx on public.teacher_progress (updated_at desc);

alter table public.teacher_progress enable row level security;
-- No anon policies: only the service-role key (server-side API) can read/write.
