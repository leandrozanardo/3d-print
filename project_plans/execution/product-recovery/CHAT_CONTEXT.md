# Chat context — REAL-3MF-PRODUCT-RECOVERY

This document freezes the Cursor chat that delivered product recovery so future agents can resume without rediscovering decisions.

## Transcript

- Cursor agent transcript id: `1b17dd9a-04cb-4ace-bb20-5a4aa27dd453`
- Cite in chat as: [REAL-3MF product recovery](1b17dd9a-04cb-4ace-bb20-5a4aa27dd453)
- Local path (developer machine): `agent-transcripts/1b17dd9a-04cb-4ace-bb20-5a4aa27dd453/*.jsonl` under the Cursor project cache (not committed).

## Mission intent

Corrective mission to make **fix-my-print** a real browser product:

`upload 3MF → validate → extract geometry → view → configure printer → optimize → download valid 3MF → reupload → reprocess`

Mandatory private fixture: `3ds/original/one+Piece.3mf` (gitignored, immutable).

## What shipped (commit `978e61c`)

- Real 3MF `parse` / `flatten` / `write` / `validate` in `@fix-my-print/formats-3mf`
- 24 proper cube orientations + `orientation-v1` scoring in `@fix-my-print/optimizer`
- `processModel` orchestration in `@fix-my-print/engine`
- Web Worker protocol v2 (`process` / `cancel`) + premium PT-BR UI + lazy Three.js viewer
- Playwright acceptance (private Chromium; public STL/mesh on Chromium/Firefox/WebKit)
- Acceptance lock + verify scripts; infra fixes (hook `invalid-json-via-raw`, knowledge-compiler self-import)
- Network attribution: clean Chromium shows **zero** app periodic XHR/fetch; user AV (`from?get&nocache`) treated as **EXTERNAL_BROWSER_INJECTION**, not product polling

## Hard constraints remembered

- Absolute repo boundary (`fix-my-print` root only); never mutate `3ds/original/**`
- No Python restoration; no AI in core; Supabase not required for processing
- Mission initially forbade commit/push; user later authorized commit+push of the recovery (`978e61c`) and this follow-up docs commit

## Baseline facts (private fixture)

| Field | Value |
| --- | --- |
| Path | `3ds/original/one+Piece.3mf` |
| Size | 6844854 bytes |
| SHA-256 | `5866bbb230db7fe3afe92981195431a52d67ba0a5d33babd26d2d1eb1989ab27` |
| Geometry | ~189611 verts / ~379222 tris (flattened) |
| Example output SHA-256 | `4c3f6029a14de3f3368075ea1978f7a00b53f3a603134b422f68f51ce753254e` |

## Decisions / spikes

- **Did not** adopt `@3mfconsortium/lib3mf` WASM for production (prerelease / unproven in Vite worker at mission time). Pure TS + fflate writer; reopen via production parser + structural validate.
- Output policy: **geometry-only Core 3MF** after orientation; strip G-code / derived slice / vendor project as valid.
- Default printer preset: Bambu Lab A1 Mini 180×180×180 mm.
- `crossOriginIsolated=false` is the hosting target (no COOP/COEP required on Vite preview).

## Conversation arc (compressed)

1. Preflight: root, hash original, local WT had inspect UI extras vs remote inspect-only.
2. Reproduced inspect-only / missing download / placeholder viewer / gate failures.
3. Built acceptance contract + lock; fixed infra; implemented 3MF port + 24 orients + engine.
4. Wired worker + premium UI; fixed Buffer-in-worker STL hang; fixed E2E paths / cancel / responsive / repeatability.
5. Declared SUCCESS for private flow; user asked commit+push → `978e61c`.
6. This follow-up: document remaining gaps + freeze chat context → commit+push.

## Where to continue

- Backlog of leftovers: [`IMPROVEMENTS_ROADMAP.md`](./IMPROVEMENTS_ROADMAP.md)
- AC matrix: [`TRACEABILITY.md`](./TRACEABILITY.md)
- Lock: [`acceptance-lock.json`](./acceptance-lock.json)

## Do not redo

Do not re-implement “inspect-only 3MF” or treat shallow vertex counts as product success. The product bar is downloadable, validated, reprocessable 3MF.
