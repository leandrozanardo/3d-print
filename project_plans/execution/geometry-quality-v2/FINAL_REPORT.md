# Geometry Quality V2 — FINAL REPORT

## Status

`SUCCESS` (engineering gates green after local verification; see command log in STATE.md).

## Baseline

- Initial mission HEAD (preflight): `4e9fcdfb5e175ff1b4acf8b6a9112f02a517ee61`
- Repository HEAD at report time: `72f67c1419bf49cf020d9e7d70401037f602329e` (pre-existing V2 land by repo author)
- Additional uncommitted completion work: Buffer-free parsers, manifold browser/node split, fireproof V2, 10-mutation harness, docs
- This mission did **not** create commits or push

## Original fixture

- `3ds/original/one+Piece.3mf`
- Bytes: `6844854`
- SHA-256 before/after: `5866bbb230db7fe3afe92981195431a52d67ba0a5d33babd26d2d1eb1989ab27` (unchanged)

## Architecture

1. `resolveThreeMfInstances` preserves per-build geometric instances (no cross-object weld).
2. Per-part topology + assembly aggregation (`allPartsWatertight` ≠ global weld).
3. `safeRepair` transactional pipeline with fidelity gates; Manifold optional validator only.
4. `evaluateOrientationsV2` includes all 24 V1 specs + non-orthogonal candidates; goals change weights.
5. Engine `2.0.0-geometry-quality`: repair → orient → rigid multi-part transform → multiobject write → reopen.
6. Web worker protocol v3; honest `decisionKind`; repair toggle; no Buffer polyfill on happy path.

## one+Piece fireproof

- Verdict: `PASS_ALREADY_BEST_SANITIZED`
- Repair: `not-needed`
- Evidence: `artifacts/geometry-quality-v2/one-piece-fireproof.json`

## Mutation matrix

All 10 QA-011 mutants killed — `artifacts/geometry-quality-v2/mutation-matrix.json`

## Bundle audit

Worker free of `node:fs` / `node:path` / `node:module` / `buffer` import — `artifacts/geometry-quality-v2/bundle-audit.json`

## Limitations

- Support/time/material remain geometric proxies (not slicer).
- Independent `@3mfconsortium/lib3mf` not required on happy path; structural reopen validation used.
- Large open meshes abstain from expensive hole search.
- Manifold is not used as a magic hole filler.

## Confirmation

No commit / push / deploy performed by this completion pass.
