# Geometry Quality V2 — ACCEPTANCE CONTRACT

Version: `geometry-quality-v2.0.0`  
Status: BINDING (tests must fail RED before green implementation)

## 1. Decision kinds (honest outcomes)

| Kind | Meaning |
| --- | --- |
| `orientation-improved` | Non-identity orientation wins with meaningful cost reduction |
| `repair-and-orientation-improved` | Safe repair committed AND orientation improved |
| `repair-only` | Safe repair committed; orientation already best |
| `already-best-or-sanitized` | No meaningful geometric win; sanitize/translate/validate only |

## 2. Non-claims (UI and reports)

Forbidden: “totalmente otimizado”, “arquivo perfeito”, slicer time/material guarantees, “otimização perfeita”, probability of print success without calibration.

Required when applicable: estimativa geométrica; melhor orientação encontrada; proxy de suporte; reparo conservador; estrutura 3MF validada; malha estanque only when topology proves it; requer nova fatiação.

## 3. Invariants

1. Product-recovery acceptance lock remains intact and green.
2. `3ds/original/**` byte-identical (SHA-256 unchanged).
3. No Python / AI / Supabase / remote processing in the happy path.
4. V2 orientation candidate set always includes all 24 V1 orientations.
5. Under shared V2 metrics: `v2BestCost <= v1BestCost + epsilon`.
6. Objects from different 3MF instances are never welded for topology or repair.
7. Repair is transactional: commit only after fidelity gates; otherwise rollback.
8. Writer serializes every mesh in the scene (not only `meshes[0]`).
9. Worker stays browser-safe (no `node:*`, no Buffer polyfill in happy path).
10. UI `decisionKind` drives the primary result title; goal changes weights/selection.

## 4. Acceptance scenarios (must have automated proof)

### FMT
- FMT-003: two closed cubes → `partCount===2`, each watertight, no cross-object non-manifold.
- FMT-004/005: multi-object write → validate → reopen → two instances preserved.
- FMT-006: separate container/core/topology/independent validator flags in report.

### RPR
- Safe open cube (missing face) → repair committed, watertight, volume ≈ 1.
- Large / non-planar / ambiguous hole → abstain or reject; mesh preserved.
- Two parts touching → never united.
- Rejected repair returns semantic original for that part.
- Double repair idempotent.

### OPT
- Non-orthogonal tilted fixture: V2 candidates > 24; improves ≥10% vs best V1; deterministic.
- Already-optimal fixture: identity kept; `alreadyOptimal===true`.
- Goals `balanced` / `minimize-height` / `maximize-bed-contact` are not weight aliases.

### ENG / WEB / QA
- Pipeline returns `before`, `normalized`, `after`; repair + orientation reports.
- E2E public: repair, non-orthogonal, multiobject, goal.
- E2E private `one+Piece` when fixture exists: hash lock, reopen, reprocess, honest decision.
- Mutation harness kills the 10 required mutants.
- `pnpm verify` exit 0 including V2 locks/gates.

## 5. Evidence locations

- `project_plans/execution/geometry-quality-v2/`
- `artifacts/geometry-quality-v2/`
- `.tmp/geometry-quality-v2/`
