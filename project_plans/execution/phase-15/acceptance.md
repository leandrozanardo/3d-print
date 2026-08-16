# Phase 15 — Hardening / MVP release readiness

## Checklist

- [x] Unit/contract tests green across workspaces
- [x] Typecheck green
- [x] Web production build green
- [x] Python reference suite green
- [x] AI disabled by default (`NullAiPort`)
- [x] Original immutability preserved (no writes to `3ds/original`)
- [ ] Lovable published smoke (external hosting) — deferred until repo linked
- [ ] Supabase local RLS against live Postgres — SQL + pure policy tests present
- [ ] Performance budgets ADR-010 numbers — provisional PureTS only

## Residual limitations

No slicer-accurate time/material. WASM multithread off. Python still present intentionally.
