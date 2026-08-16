# Geometry Quality V2 — STATE

## Phase status

| Phase | Status | Notes |
| --- | --- | --- |
| A Baseline | IN_PROGRESS | gates running after V2 core land |
| B Contract + lock | PASS | lock created (`geometry-quality-v2-acceptance-lock.json`) |
| C 3MF semantics | PASS | `resolveThreeMfInstances`, multiobject writer, FMT-003/005 |
| D Repair | PASS | transactional `safeRepair` + assembly analysis |
| E Orientation V2 | PASS | staged search, goals, large-mesh budget |
| F Engine | PASS | `processModel` 2.0.0-geometry-quality; one+Piece ~13–30s |
| G Web | PARTIAL | protocol v3, decisionKind UI, repair toggle |
| H E2E / fireproof | PARTIAL | public V2 specs + fixtures; mutation harness |
| I Final verify | IN_PROGRESS | |

## Original fixture

- Path: `3ds/original/one+Piece.3mf`
- SHA-256 (baseline): `5866bbb230db7fe3afe92981195431a52d67ba0a5d33babd26d2d1eb1989ab27`
- Bytes: `6844854`

## HEAD

Confirm with `git rev-parse HEAD` at report time (no commits by this mission).
