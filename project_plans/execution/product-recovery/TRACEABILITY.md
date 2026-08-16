# Traceability — REAL-3MF-PRODUCT-RECOVERY

| Requirement ID | Implementation | Test | Command | Evidence | Status |
| --- | --- | --- | --- | --- | --- |
| AC-001 | `3ds/original/one+Piece.3mf` immutable | hash before/after | node sha256 | `artifacts/product-recovery/baseline/original.sha256` | PASS |
| AC-002 | `parseThreeMf` + `flattenThreeMf` | `real-parse.test.ts` | pnpm --filter formats-3mf test | verts/tris arrays | PASS |
| AC-003 | flatten counts 189611 / 379222 | real-parse + process-model | same | smoke processModel | PASS |
| AC-004 | `ModelViewer` + Three.js lazy | private E2E screenshots | playwright one-piece | `screenshots/desktop-*.png` | PASS |
| AC-005 | `ORIENTATION_SPECS` 24 | `orientation-24.test.ts` | optimizer test | unit | PASS |
| AC-006 | `processModel` deterministic | process-model + private E2E | engine test | sha256 output | PASS |
| AC-007 | App + worker process | `one-piece-3mf.spec.ts` | playwright chromium | e2e | PASS |
| AC-008 | download `model/3mf` | one-piece E2E | playwright download | `3ds/upgraded/one+Piece-otimizado.3mf` | PASS |
| AC-009 | reupload optimized | one-piece E2E | playwright | e2e | PASS |
| AC-010 | original hash unchanged | sha before/after | node | match true | PASS |
| AC-011 | fit + minZ≈0 + scores | processModel | engine/private | minZ 0 | PASS |
| AC-012 | preservation report UI | writeThreeMf policy | private E2E | preservation-warning | PASS |
| AC-013 | geometry-only writer strips gcode | write policy | unit + e2e | policy geometry-only | PASS |
| AC-014 | STL process + download | `stl.spec.ts` | playwright | e2e | PASS |
| AC-015 | error alert + retry | `error-recovery.spec.ts` | playwright | e2e | PASS |
| AC-016 | cancel button | `cancel.spec.ts` | playwright | e2e | PASS |
| AC-017 | no app polling | `network-idle.spec.ts` | playwright | 15s idle zero xhr | PASS |
| AC-018 | attribution | static audit + clean chromium | rg + network-idle | EXTERNAL vs app | PASS |
| AC-019 | console clean (supported flow) | e2e flows | playwright | private/stl pass | PASS |
| AC-020 | offline after load | `offline.spec.ts` | playwright | e2e | PASS |
| AC-021 | no COOP/COEP required | vite.config without isolation | build/e2e | config | PASS |
| AC-022 | five viewports | `responsive.spec.ts` | playwright | screenshots | PASS |
| AC-023 | axe critical/serious | `accessibility.spec.ts` | playwright | e2e | PASS |
| AC-024 | viewer/three chunks | vite build | build:web | viewer + three assets | PASS |
| AC-025 | worker off main thread | geometryWorker | e2e UI heartbeat | worker chunk | PASS |
| AC-026 | three consecutive | `repeatability.spec.ts` | playwright | e2e | PASS |
| AC-027 | security negatives | `security.test.ts` | formats-3mf test | unit | PASS |
| AC-028 | no python tracked | verify-no-python | script | ok | PASS |
| AC-029 | clean rebuild | build packages + web | pnpm build:web | dist rebuilt | PASS |
| AC-030 | format/import/hook | hook + wikiDifferential | scripts/tests | hook ok | PASS |
| AC-031 | premium UI PT-BR | App.tsx tokens | screenshots | no Browser shell | PASS |
| AC-032 | acceptance lock | acceptance-lock.json | verify-acceptance-lock | 17 files | PASS |
