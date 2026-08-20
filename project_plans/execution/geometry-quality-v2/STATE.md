# Geometry Quality V2 — STATE

## Phase status

| Phase | Status | Notes |
| --- | --- | --- |
| A Baseline | PASS | acceptance lock + public/private E2E green |
| B Contract + lock | PASS | `geometry-quality-v2-acceptance-lock.json` |
| C 3MF semantics | PASS | instances + multiobject writer |
| D Repair | PASS | transactional `safeRepair` + fidelity |
| E Orientation V2 | PASS | staged search + goals |
| F Engine | PASS | `2.0.0-geometry-quality` |
| G Web | PASS | protocol v3, Buffer-free worker happy path |
| H E2E / fireproof / mutation | PASS | 5/5 E2E V2; fireproof; 10/10 mutants |
| I Final verify | PASS | `pnpm verify` exit 0 |

## Original fixture

- Path: `3ds/original/one+Piece.3mf`
- SHA-256: `5866bbb230db7fe3afe92981195431a52d67ba0a5d33babd26d2d1eb1989ab27`
- Bytes: `6844854`

## HEAD policy

Mission forbids new commits/push. Report both preflight and current HEAD without rewriting history.
