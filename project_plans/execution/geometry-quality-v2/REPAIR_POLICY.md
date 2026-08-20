# Repair Policy — geometry-quality-v2

Version: `repair-policy-v2.0.0`

Centralized in `packages/geometry/src/repair/repairPolicy.ts`.

## Tolerances (diagonal D)

- `weldToleranceMm = clamp(D * 1e-9, 1e-9, 1e-5)`
- `areaToleranceMm2 = max(1e-18, D² * 1e-14)`
- `planarityToleranceMm = clamp(D * 1e-5, 1e-5, 0.01)`

## Hole fill (conservative)

- Max diameter: `min(20 mm, max(0.5 mm, 0.02 * D))`
- Max projected area: `0.5%` of part surface area
- Max fillable loops: `16`
- Triangle growth: `max(1000, 5% of faces)`

## Fidelity commit gates

- Bounds per axis ≤ `max(0.01 mm, D * 1e-4)`
- Sample distance: p95 ≤ 0.02 mm, max ≤ 0.05 mm (widened locally when fill triangles exist)
- Volume/area deltas when both watertight: ≤ 0.5% / 1% (+ fill allowance)

## Transaction

`original → candidate → verify → commit | discard` — never in-place mutation of the input mesh.
