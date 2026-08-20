# Orientation V2 — geometry-quality-v2

Version: `orientation-v2.0.0`

## Invariants

- All 24 V1 `ORIENTATION_SPECS` are always included.
- `bestV2Cost <= bestLegacyCost + epsilon`
- Meaningful improvement requires absolute cost drop > 1e-6 and relative ≥ 0.5% (or hard-constraint rescue).

## Goals (weights sum to 1)

See `packages/optimizer/src/orientationPolicy.ts`:

- `balanced`
- `minimize-height`
- `maximize-bed-contact`

## Stages

A quick directions → B yaw → C refine → D exact (caps versioned). Large meshes sample ≤20k faces for search, exact on full mesh for shortlist.
