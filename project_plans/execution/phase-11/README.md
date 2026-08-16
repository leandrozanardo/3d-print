# Phase 11 — Supabase schema + RLS scaffolding

## Objective

Add initial Postgres migration for profiles, projects, runs, artifacts, run_events with owner-only RLS (`auth.uid()`), and document storage buckets.

## Deliverables

- `supabase/migrations/20260816000000_init.sql`
- Pure RLS policy helpers + tests (CLI-independent)
