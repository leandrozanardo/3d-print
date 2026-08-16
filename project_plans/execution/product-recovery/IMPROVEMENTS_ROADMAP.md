# Product recovery — improvements roadmap

**Status after:** `978e61c` (`feat(web): recover full 3MF optimize-download browser flow`)  
**Mission:** REAL-3MF-PRODUCT-RECOVERY — core private flow is **done**.  
**This file:** explicit backlog for what was deferred, partial, or left as known limitation.

Priority legend: `P0` = correctness/safety debt · `P1` = product quality · `P2` = polish/ops.

---

## P0 — Correctness & safety debt

| ID | Gap | Why it matters | Suggested next step |
| --- | --- | --- | --- |
| PR-I01 | UI **optimization goal** (`balanced` / `minimize-height` / `maximize-bed-contact`) is collected but **does not change** selection weights in `processModel` | Misleading UX — user thinks goal drives the engine | Map goal → `DEFAULT_SELECTION_WEIGHTS` variants; add unit + E2E assertion |
| PR-I02 | Happy path still ships a **`buffer` polyfill** in the web worker | Extra bundle surface; Node-shaped APIs leak into browser | Finish Uint8Array/`TextDecoder` migration in `formats` + `formats-3mf` zip/read; drop polyfill |
| PR-I03 | Section **35 mutation sensitivity** (swap output for input, drop model entry, 8 orients, etc.) was not archived as a durable evidence pack | Harder to prove tests catch false greens | Add `artifacts/product-recovery/mutation/` + scripted temporary mutations with restore |
| PR-I04 | Independent **lib3mf WASM** validator not in CI (TS reopen only) | Writer and reopen share more DNA than ideal | Spike `@3mfconsortium/lib3mf` again; if viable, gate only tests; if not, keep structural second parser permanently documented |

---

## P1 — Product & architecture follow-ups

| ID | Gap | Why it matters | Suggested next step |
| --- | --- | --- | --- |
| PR-I05 | Official public **3MF Consortium fixtures** not vendored with URL/commit/license attribution | Public E2E uses STL cube; weaker 3MF multi-browser geometry coverage | Vendor samples under `packages/test-fixtures/3mf/` + `ATTRIBUTION.md`; extend `public-3mf.spec.ts` |
| PR-I06 | Acceptance suite incomplete vs mission list (`components.test.ts`, richer `core-roundtrip.test.ts`) | Nested components/transforms under-tested beyond cycle reject | Add synthetic nested component + transform composition tests |
| PR-I07 | **Manifold** browser-safe adapter not on the web happy path | Repair remains Node-oriented (`node:module` history) | Lazy browser adapter or keep repair out of web with honest UI messaging |
| PR-I08 | Viewer uses **continuous `requestAnimationFrame`** while idle | Battery/CPU on laptop | Render on control change / idle stop after N ms; honor `prefers-reduced-motion` harder |
| PR-I09 | `InspectSummary` component remains in tree but main flow is optimize/result oriented | Dead UI surface risk | Delete or wire only under `?debug=1` |
| PR-I10 | Preservation policy is **geometry-only Core 3MF** (vendor/Bambu config stripped) | Correct & honest, but power users may want selective preserve | Optional “preserve materials/colors” path when Core-compatible |
| PR-I11 | Kaspersky / AV injection: product proves **zero app polling**; user-facing help is only in evidence JSON | Support burden when users see `from?get&nocache` | Short “Como funciona / rede” note linking https://support.kaspersky.com/15335 |

---

## P2 — Ops, CI, environment

| ID | Gap | Why it matters | Suggested next step |
| --- | --- | --- | --- |
| PR-I12 | Root `pnpm verify` exists but was not the **last single command** after every late CSS/E2E tweak | CI drift risk | Wire `verify` into GitHub Actions; run once on clean tree |
| PR-I13 | Local Node was **v24** while `.nvmrc` / mission cite **20** | Subtle toolchain skew | Document engines; CI matrix Node 20; optional `volta`/`fnm` |
| PR-I14 | Playwright HTML report / large `.3mf` downloads gitignored under `artifacts/` | Fine for repo size; auditors need local regen instructions | Document `pnpm test:e2e:private` → `3ds/upgraded/` + screenshots |
| PR-I15 | Score labels: ensure every UI string says **estimativa geométrica** (not slicer) wherever proxies appear | Trust | Audit copy + tooltip coverage on result panel |
| PR-I16 | Determinism / hash stability across OS for writer ZIP timestamps already pinned; expand golden-hash tests for tiny fixtures | Regression | Lock hash for synthetic triangle 3MF in unit tests |

---

## Explicitly out of scope (do not sneak into recovery follow-ups)

- Wiki enterprise editorial / SaaS billing / Stripe / auth / Lovable remote / Supabase remote as required path  
- Full slicer / G-code execution  
- Reintroducing Python  
- AI / LLM in the geometry core  

---

## Suggested order of attack

1. **PR-I01** (goal → weights) — small, high user trust  
2. **PR-I02** (drop Buffer) — bundle hygiene  
3. **PR-I05 + PR-I06** (fixtures + component tests) — geometry confidence  
4. **PR-I12** (CI verify) — keep main green  
5. **PR-I03 / PR-I04** when hardening acceptance further  

---

## Done baseline (do not re-open as “missing”)

Private `one+Piece.3mf` flow: parse → flatten → 24 orients → write → validate → download → reupload.  
See `TRACEABILITY.md`, `ACCEPTANCE_CONTRACT.md`, and commit `978e61c`.
