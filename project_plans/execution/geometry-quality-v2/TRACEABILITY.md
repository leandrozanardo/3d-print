# Geometry Quality V2 — TRACEABILITY

| Requirement ID | Implementation | Test | Command | Evidence | Status |
| --- | --- | --- | --- | --- | --- |
| FMT-001 | `formats-3mf/src/instances.ts` | `instances-two-cubes.test.ts` | `pnpm --filter @fix-my-print/formats-3mf test -- instances-two-cubes` | instances API | PASS |
| FMT-002 | `geometry/src/repair/assemblyAnalysis.ts` | `instances-two-cubes.test.ts` | same | per-part watertight | PASS |
| FMT-003 | fixtures two cubes | `instances-two-cubes.test.ts` | same | partCount=2 | PASS |
| FMT-004 | `formats-3mf/src/write.ts` | `multiobject-roundtrip.test.ts` | `pnpm --filter @fix-my-print/formats-3mf test -- multiobject` | multi mesh write | PASS |
| FMT-005 | write+parse+instances | `multiobject-roundtrip.test.ts` | same | reopen multi | PASS |
| FMT-006 | UI badges + engine fields | E2E V2 | `test:e2e:geometry-quality-v2` | structure vs watertight copy | PASS |
| RPR-001–018 | `geometry/src/repair/*` | `safe-repair.test.ts` | `pnpm --filter @fix-my-print/geometry test -- safe-repair` | transactional repair | PASS |
| RPR-013 | `geometry-manifold/{common,browser,node}.ts` | package build | `pnpm --filter @fix-my-print/geometry-manifold build` | browser entry no node: | PASS |
| OPT-001–025 | `optimizer/src/evaluateOrientationsV2.ts` + helpers | `orientation-v2.test.ts` | `pnpm --filter @fix-my-print/optimizer test -- orientation-v2` | non-ortho + goals | PASS |
| ENG-001–012 | `engine/src/processModel.ts` | `process-model-v2.test.ts` | `pnpm --filter @fix-my-print/engine test -- process-model-v2` | pipeline V2 | PASS |
| ENG-011 | formats TextDecoder + zip Uint8Array; worker no Buffer | bundle audit | `node scripts/audit-geometry-quality-v2-bundle.mjs` | `bundle-audit.json` | PASS |
| WEB-001–014 | `apps/web` App + worker + protocol v3 | E2E V2 + a11y/network | `test:e2e:geometry-quality-v2` | UI honest decisionKind | PASS |
| QA-001 | unit suites above | unit | `test:geometry-quality-v2` | PASS | PASS |
| QA-004–008 | `e2e/geometry-quality-v2/*` | Playwright | `test:e2e:geometry-quality-v2` | 5 passed | PASS |
| QA-011 | `scripts/mutation-geometry-quality-v2.mjs` | mutation | `test:mutation:geometry-quality-v2` | 10/10 killed | PASS |
| QA-013 | bundle audit script | audit | `audit-geometry-quality-v2-bundle.mjs` | no node/buffer | PASS |
| Fireproof | `scripts/compare-one-piece-fireproof.mjs` | fireproof | `node scripts/compare-one-piece-fireproof.mjs` | `PASS_ALREADY_BEST_SANITIZED` | PASS |

Status values: `PASS` | `FAIL` | `BLOCKED` | `NOT_APPLICABLE`
