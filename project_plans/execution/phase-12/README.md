# Phase 12 — Storage adapter scaffolding

## Objective

Provide `@fix-my-print/storage` with `SupabaseStorageAdapter` stub that validates object keys `userId/projectId/runId/artifactId/name` and rejects overwrite (merged with existing MemoryStorageAdapter).

## Deliverables

- `packages/storage` adapter + object key helpers
- Jest tests including RLS policy mirrors and overwrite rejection
