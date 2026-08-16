# ADR-001: Runtime placement — browser worker vs Edge

- **Status:** Accepted
- **Date:** 2026-08-16

Place intensive geometry in a dedicated browser Web Worker + WASM adapter. Supabase Edge Functions remain short/idempotent only.
