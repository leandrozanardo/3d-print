-- Fix My Print initial schema (Phase 11/12 scaffolding)
-- RLS: owner-only via auth.uid() on owner_id columns.
--
-- Storage buckets (document only; create via dashboard/CLI separately):
--   original-models  — create-only (no overwrite / no public read)
--   derived-models   — derived meshes and intermediate artifacts
--   run-reports      — JSON/HTML reports per run

create extension if not exists "pgcrypto";

-- ---------------------------------------------------------------------------
-- Tables
-- ---------------------------------------------------------------------------

-- profiles.id is the auth user (owner); RLS uses auth.uid() = id
create table if not exists public.profiles (
  id uuid primary key references auth.users (id) on delete cascade,
  display_name text,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create table if not exists public.projects (
  id uuid primary key default gen_random_uuid(),
  owner_id uuid not null references auth.users (id) on delete cascade,
  name text not null,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create table if not exists public.runs (
  id uuid primary key default gen_random_uuid(),
  project_id uuid not null references public.projects (id) on delete cascade,
  owner_id uuid not null references auth.users (id) on delete cascade,
  status text not null default 'queued',
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create table if not exists public.artifacts (
  id uuid primary key default gen_random_uuid(),
  run_id uuid not null references public.runs (id) on delete cascade,
  owner_id uuid not null references auth.users (id) on delete cascade,
  -- Canonical key: userId/projectId/runId/artifactId/name
  storage_key text not null unique,
  bucket text not null check (bucket in ('original-models', 'derived-models', 'run-reports')),
  content_type text,
  byte_size bigint,
  created_at timestamptz not null default now()
);

create table if not exists public.run_events (
  id uuid primary key default gen_random_uuid(),
  run_id uuid not null references public.runs (id) on delete cascade,
  owner_id uuid not null references auth.users (id) on delete cascade,
  event_type text not null,
  payload jsonb not null default '{}'::jsonb,
  created_at timestamptz not null default now()
);

create index if not exists projects_owner_id_idx on public.projects (owner_id);
create index if not exists runs_owner_id_idx on public.runs (owner_id);
create index if not exists runs_project_id_idx on public.runs (project_id);
create index if not exists artifacts_owner_id_idx on public.artifacts (owner_id);
create index if not exists artifacts_run_id_idx on public.artifacts (run_id);
create index if not exists run_events_owner_id_idx on public.run_events (owner_id);
create index if not exists run_events_run_id_idx on public.run_events (run_id);

-- ---------------------------------------------------------------------------
-- Row Level Security (owner-only)
-- ---------------------------------------------------------------------------

alter table public.profiles enable row level security;
alter table public.projects enable row level security;
alter table public.runs enable row level security;
alter table public.artifacts enable row level security;
alter table public.run_events enable row level security;

-- profiles
drop policy if exists profiles_select_own on public.profiles;
create policy profiles_select_own on public.profiles
  for select using (auth.uid() = id);

drop policy if exists profiles_insert_own on public.profiles;
create policy profiles_insert_own on public.profiles
  for insert with check (auth.uid() = id);

drop policy if exists profiles_update_own on public.profiles;
create policy profiles_update_own on public.profiles
  for update using (auth.uid() = id) with check (auth.uid() = id);

drop policy if exists profiles_delete_own on public.profiles;
create policy profiles_delete_own on public.profiles
  for delete using (auth.uid() = id);

-- projects
drop policy if exists projects_select_own on public.projects;
create policy projects_select_own on public.projects
  for select using (auth.uid() = owner_id);

drop policy if exists projects_insert_own on public.projects;
create policy projects_insert_own on public.projects
  for insert with check (auth.uid() = owner_id);

drop policy if exists projects_update_own on public.projects;
create policy projects_update_own on public.projects
  for update using (auth.uid() = owner_id) with check (auth.uid() = owner_id);

drop policy if exists projects_delete_own on public.projects;
create policy projects_delete_own on public.projects
  for delete using (auth.uid() = owner_id);

-- runs
drop policy if exists runs_select_own on public.runs;
create policy runs_select_own on public.runs
  for select using (auth.uid() = owner_id);

drop policy if exists runs_insert_own on public.runs;
create policy runs_insert_own on public.runs
  for insert with check (auth.uid() = owner_id);

drop policy if exists runs_update_own on public.runs;
create policy runs_update_own on public.runs
  for update using (auth.uid() = owner_id) with check (auth.uid() = owner_id);

drop policy if exists runs_delete_own on public.runs;
create policy runs_delete_own on public.runs
  for delete using (auth.uid() = owner_id);

-- artifacts
drop policy if exists artifacts_select_own on public.artifacts;
create policy artifacts_select_own on public.artifacts
  for select using (auth.uid() = owner_id);

drop policy if exists artifacts_insert_own on public.artifacts;
create policy artifacts_insert_own on public.artifacts
  for insert with check (auth.uid() = owner_id);

drop policy if exists artifacts_update_own on public.artifacts;
create policy artifacts_update_own on public.artifacts
  for update using (auth.uid() = owner_id) with check (auth.uid() = owner_id);

drop policy if exists artifacts_delete_own on public.artifacts;
create policy artifacts_delete_own on public.artifacts
  for delete using (auth.uid() = owner_id);

-- run_events
drop policy if exists run_events_select_own on public.run_events;
create policy run_events_select_own on public.run_events
  for select using (auth.uid() = owner_id);

drop policy if exists run_events_insert_own on public.run_events;
create policy run_events_insert_own on public.run_events
  for insert with check (auth.uid() = owner_id);

drop policy if exists run_events_update_own on public.run_events;
create policy run_events_update_own on public.run_events
  for update using (auth.uid() = owner_id) with check (auth.uid() = owner_id);

drop policy if exists run_events_delete_own on public.run_events;
create policy run_events_delete_own on public.run_events
  for delete using (auth.uid() = owner_id);
