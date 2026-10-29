-- =========================================================================
-- Openhouse at-apartment · access + daily-dashboard schema (Supabase/Postgres)
-- =========================================================================
-- Paste into the Supabase SQL editor (SQL → New query → Run). Idempotent.
--
-- Model:
--   apartments  — one shared login per apartment (username + password)
--   teachers    — individual admin-created logins, scoped to an apartment
--   daily_logs  — each teacher's "what I did today" entry, shared per apartment
--
-- All access goes through the app's server routes using the service-role key,
-- so RLS is enabled and left closed (no policies). Same pattern as the
-- newsletter schema.
-- =========================================================================

create extension if not exists "pgcrypto";

-- ── apartments ──────────────────────────────────────────────────────────
create table if not exists public.apartments (
  id              uuid primary key default gen_random_uuid(),
  name            text not null unique,
  login_username  text not null unique,
  login_password  text not null,
  -- when false, the apartment uses its shared login only; when true, the
  -- admin has turned on individual teacher logins for this apartment.
  individual_login_enabled boolean not null default false,
  created_at      timestamptz not null default now()
);

-- Migration for apartments created before the individual-login toggle existed.
-- Safe to run repeatedly.
alter table public.apartments
  add column if not exists individual_login_enabled boolean not null default false;

-- ── teachers (individual logins, created by admin, inside an apartment) ──
create table if not exists public.teachers (
  id           uuid primary key default gen_random_uuid(),
  apartment_id uuid not null references public.apartments(id) on delete cascade,
  name         text not null,
  username     text not null,
  password     text not null,
  categories   text[] not null default '{}',   -- subjects: art|language|stem|chess|music
  created_at   timestamptz not null default now(),
  unique (apartment_id, username)
);
create index if not exists teachers_apartment_idx on public.teachers (apartment_id);

-- ── daily_logs (one editable entry per teacher, per class, per day) ─────
create table if not exists public.daily_logs (
  id              uuid primary key default gen_random_uuid(),
  apartment_id    uuid not null references public.apartments(id) on delete cascade,
  teacher_id      uuid not null references public.teachers(id) on delete cascade,
  teacher_name    text not null,
  log_date        date not null default current_date,
  programme_slug  text not null,
  programme_title text,
  -- entries: [{ part, done: bool, reason?, note? }]
  entries         jsonb not null default '[]',
  free_note       text,
  created_at      timestamptz not null default now(),
  updated_at      timestamptz not null default now(),
  unique (teacher_id, log_date, programme_slug)
);
create index if not exists daily_logs_apartment_date_idx
  on public.daily_logs (apartment_id, log_date desc);

-- ── tracker_notes (monthly progress note, one per child/level/month) ────
-- Backs the robotics (and later PS/art) monthly progress tracker. Shared per
-- apartment: every teacher in the apartment sees all the children's notes.
create table if not exists public.tracker_notes (
  id            uuid primary key default gen_random_uuid(),
  apartment_id  uuid not null references public.apartments(id) on delete cascade,
  teacher_id    uuid references public.teachers(id) on delete set null,
  teacher_name  text not null,
  child_name    text not null,
  subject       text not null default 'robotics',   -- robotics | public-speaking | art
  level         text not null,                        -- robotics: mechanics|electronics
  age_band      text not null,                        -- 5-8 | 8-12
  note_month    text not null,                        -- YYYY-MM
  skills        jsonb not null default '{}',          -- robotics: { model: {bm,ps,pe} }
  experiments   jsonb not null default '{}',          -- robotics: { expId: rung }
  ready         boolean not null default false,       -- every skill secure → ready for assessment
  created_at    timestamptz not null default now(),
  updated_at    timestamptz not null default now(),
  unique (apartment_id, subject, child_name, level, note_month)
);
create index if not exists tracker_notes_apartment_idx
  on public.tracker_notes (apartment_id, updated_at desc);

-- ── class_completions (which session days a teacher has marked done) ────
-- Backs the "mark class completed" progress so an admin sees it across the
-- apartment instead of it living only in each teacher's browser.
create table if not exists public.class_completions (
  id              uuid primary key default gen_random_uuid(),
  apartment_id    uuid not null references public.apartments(id) on delete cascade,
  teacher_id      uuid not null references public.teachers(id) on delete cascade,
  teacher_name    text not null,
  programme_slug  text not null,
  programme_title text,
  building        text,
  completed_days  integer[] not null default '{}',
  updated_at      timestamptz not null default now(),
  unique (apartment_id, teacher_id, programme_slug)
);
create index if not exists class_completions_apartment_idx
  on public.class_completions (apartment_id, updated_at desc);

-- ── lock it all down (server/service-role only) ─────────────────────────
alter table public.apartments        enable row level security;
alter table public.teachers          enable row level security;
alter table public.daily_logs        enable row level security;
alter table public.tracker_notes     enable row level security;
alter table public.class_completions enable row level security;
-- No policies on purpose: only the service_role (server routes) may read/write.

-- ── OPTIONAL seed: a demo apartment + the current teachers ──────────────
-- Uncomment and edit to migrate the existing shared logins to the new model.
-- insert into public.apartments (name, login_username, login_password)
--   values ('demo apartment', 'demo', 'demo123')
--   on conflict (login_username) do nothing;
-- (then add teachers via the admin UI, or insert rows here referencing the id)
