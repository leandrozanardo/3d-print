# 05 — Optimization Model

**Date:** 2026-08-15

Proxies are **not** physics. Scores are **ordinal**, not calibrated probabilities. No “87% chance of success”.

---

## 1. Operation classes (gates)

| Class | Examples | Auto? | Gate |
|---|---|---|---|
| **A** Analysis-only | hash, topology, risks, candidate list | yes | none |
| **B** Non-destructive prep | rotate, translate to plate, uniform scale **if units confirmed**, plate/process/material, 3MF modifiers if round-trip proven | `--dry-run` then `--apply-safe` | units known for scale |
| **C** Conservative repair | winding, degenerate faces, unreferenced verts, weld w/ tolerance, small holes if classified | `--apply-safe` only if postconditions pass | classified boundary; invariants |
| **D** Design modification | split, holes, thicken, remesh, fit compensation | **never default** | purpose + regions + explicit `--apply-approved` + CAD adapter if STEP |

`fill_holes` is **C**, not default-on. Intentional openings (vase, drain, fit) stay open.

STEP/BREP uses a future `CadAdapter` (OCCT/CadQuery) after ADR. **No** silent STEP→STL while claiming CAD precision.

---

## 2. Hard constraints (filter before any score)

Fail closed / drop candidate:

- Build volume including brim/support clearance and edge margins.
- `bed_temperature_c <= printer.bed_max_c` (A1 Mini **80**).
- `nozzle_temperature_c <= printer.hotend_max_c` (300) **and** material window.
- Vendor `not_recommended` + `allowed_operation_classes` policy (default: block **apply** for ABS/ASA/PC/PA on A1 Mini; inspect may warn).
- Abrasive filament vs stainless nozzle.
- Units unknown + requested uniform scale.
- Class D without approval.
- `KNOWLEDGE_CONFLICT` on a field needed for apply.
- NaN/Inf, empty mesh, budget exceeded, malicious archive.

---

## 3. Features / proxies (orientation & process)

Each candidate stores **named features** with: value, unit, method, what it measures, what it does **not** measure, source (analyzer version).

| Feature | Proxy for | Not a measure of |
|---|---|---|
| `contact_area_mm2` | first-layer stick | actual PEI adhesion |
| `com_vs_support_polygon` | tipping | vibration / bed-slinger slap |
| `height_mm` / `slenderness` | time, resonance risk | strength |
| `overhang_area_by_band` | support need | sag physics |
| `bridge_span_mm` | bridging difficulty | cooling |
| `support_volume_proxy` | waste, time | slicer support |
| `trapped_support_risk` | removability | |
| `downward_cosmetic_area` | surface quality | color |
| `load_vs_layer_anisotropy` | functional strength **proxy** | certified yield |
| `footprint_fits` | compatibility | |
| `slicer_time_s` / `slicer_filament_g` | cost/time **when sliced** | — |

Pass 3 (thickness field, precise SI, Hausdorff, top-K slice) **off by default**.

---

## 4. Candidate generation (orientation)

Deterministic, not brute Euler grid:

1. Original orientation  
2. Stable planar faces (area threshold)  
3. Convex-hull support faces  
4. PCA / OBB axes  
5. Detected hole/cylinder axes  
6. Symmetry equivalents  
7. User-specified visible/load constraints  
8. Coarse fallback sampling **only if** candidate set < N after filters  

Dedup: rotation distance < ε; tie-break: lexicographic quaternion (canonicalized).

Same pipeline later for process variants (layer height bands, wall counts) as **discrete** catalogs from purpose profiles — not continuous search in v1.

---

## 5. Multi-objective / Pareto

**Presets** (weights versioned, shown in manifest):

| Preset | Intent |
|---|---|
| `reliability` | min failure-risk ordinal, then support removability |
| `balanced` | default |
| `quality` | cosmetics |
| `economy` | filament + time proxies |
| `speed` | time |
| `functional` | strength proxy + accuracy |
| `custom` | user weights |

Algorithm (v1):

1. Apply hard constraints.  
2. Normalize features with documented min/max **per printer envelope** (not global magic).  
3. Compute scalar `S = Σ w_i * n_i` for ranking **and** keep the vector.  
4. Compute Pareto front on the vector.  
5. If no unique dominant: show **up to 3** candidates; `recommended` via deterministic tie-break: (1) user preset scalar (2) lower support proxy (3) original orientation (4) run seed.

Never hide weights.

**Failure-risk ordinal** is a **heuristic rank** (`low|medium|high|unknown`), not P(fail).

---

## 6. Uncertainty

| Kind | Representation |
|---|---|
| Missing purpose | `unknown`; no structural claims |
| Missing calibration | `calibration_required: true`; do not clear validate flags |
| Proxy vs slicer | field prefix `estimate_` vs `slicer_` |
| Energy | omit unless power profile sourced (FAQ idle 6 W / avg 57 W / max 150 W may be cited as **bounds**, not print energy) |
| Money | filament cost only if user price/kg; no invented labor |

Templates must not say “fully optimized” if any `unknown` or pending calibration remains.

---

## 7. Cost / time sources

| Quantity | Allowed source |
|---|---|
| Filament mass | slicer, else volume × density **estimate** |
| Filament cost | user price × mass |
| Support/purge/prime | slicer only |
| Time | slicer only for “print time”; else `time_estimate_proxy` |
| Energy | measured profile or official coarse bounds labeled unknown-quality |
| Post-processing | user input only |

---

## 8. Explainability

Every rejected orientation must state the **feature** that beat a lower-support option (e.g. load axis vs layers, downward faces, tall bed-slinger). Change records carry rule/source ids.

---

## 9. Purpose defaults — decorative / scenario 2

Locked for the operational job in `docs/superpowers/specs/2026-08-15-one-piece-decorative-optimization-design.md`. Engine Phase 2 imports these as **experimental** heuristics (`purpose=decorative`, profile `pla-decorativo-superficie-0.4`), not verified physics.

| Setting | Scenario 2 default | Notes |
|---|---|---|
| Layer height | 0.12–0.16 mm | Not 0.08 (scenario 3) |
| Walls | ~3 | 4 if thin shell flexes |
| Infill | 10–15% gyroid | Economy |
| Ironing | **off** | Optional only on critical flat tops |
| Raft | **off** | Never default |
| Brim | off unless unstable base / peel | |
| Supports | After reorientation; only where required; tree if organic; paint off show faces | |
| Seam | Hidden edge | Studio UI / modifier; not 3MF blob rewrite |
| Escalation | Scenario 3 (0.08 mm, generous supports) only if preview shows unavoidable overhang cost | Do not apply by default |

**Operator scenario 2 (decided):** not a hidden scalar preset. `purpose=decorative` + the table above + **Pareto/trade-off report required** (material, time, fail-risk, cosmetics). Tie-break may use `balanced`. Scenario 3 appears as an optional `quality` candidate, never the default apply. See `10_DECISION_LOG.md` B-SCENARIO2-PRESET.

Until Phase 7 round-trip is proven, “apply” for a Bambu project is **binary copy** of the `.3mf` plus plan text (Studio UI steps). That is class **B** hygiene, not class D.

## 10. What v1 will **not** optimize

- Continuous infill percentage search  
- Toolpath-level seam painting (plan may *instruct* the operator in Studio)  
- FEM / real strength  
- Multi-plate packing / auto-select which plate to print (name the plate in the plan; do not silently merge)  
- AMS color painting (may **warn** purge waste only; job `one+Piece` is monochrome, no paint)
