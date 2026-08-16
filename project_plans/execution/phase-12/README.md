# Phase 12 — Storage adapter scaffolding

## Objective

Provide `@fix-my-print/storage` with object-key helpers, `InMemoryStorageAdapter` (create-only Map), and real `SupabaseStorageAdapter` (`@supabase/supabase-js`, upsert:false) alongside existing `MemoryStorageAdapter`.

## Deliverables

- `packages/storage` adapter + object key helpers
- Jest tests including RLS policy mirrors and overwrite rejection
