# Phase 04 acceptance

| Gate | Check | Result |
|------|-------|--------|
| Web package present | `apps/web/package.json` name `@fix-my-print/web` | Pass (scaffolded) |
| Capability diagnostics | screen shows COI / Worker / WASM + single-thread note | Pass |
| Drop zone → worker | ArrayBuffer posted to `geometryWorker.ts` | Pass |
| Progress + cancel | cancel terminates worker | Pass |
| Viewer placeholder | canvas/div without three.js | Pass |
| Flags | `engine.ts.enabled=true`, `geometry.wasm.enabled=false`, AI off | Pass |
| Scripts | `build`, `test`, `preview` | Pass |
| Unit tests | ≥2–3 tests (capabilities + flags) | Pass |
| Root workspace | `apps/*` included | Pass |
