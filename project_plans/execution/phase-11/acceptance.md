# Phase 11 acceptance

| Gate | Check | Result |
|------|-------|--------|
| Migration present | `supabase/migrations/20260816000000_init.sql` | Pass |
| Tables | profiles, projects, runs, artifacts, run_events | Pass |
| RLS enabled | all five tables | Pass |
| Owner-only policies | `auth.uid()` match | Pass |
| Buckets documented | original-models (create-only), derived-models, run-reports | Pass |
| Policy tests | two-user access denied via pure helpers | Pass |
