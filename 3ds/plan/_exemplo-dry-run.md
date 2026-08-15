# Optimization plan — _sample_cube

## Input
- File: `3ds/original/_sample_cube.stl`
- Format: STL
- Target material: PLA
- Purpose: pipeline dry-run / adhesion smoke test
- Geometry summary: 20×20×20 mm solid cube, flat faces, no critical overhangs

## Diagnosis
- Likely failure modes: none structural; trivial geometry
- Constraints: documentation demo; physical print optional
- `core` report: watertight cube, ~12 faces, bounds ≈ 20 mm, volume 8000 mm³

## Changes applied
| # | Change | Why | Wiki page |
|---|---|---|---|
| 1 | Light `repair-mesh` → `3ds/upgraded/_sample_cube.stl` | Exercise write-guards + cleanup | [when to edit mesh](../../docs/projeto/workflow/quando-editar-malha.md) |
| 2 | Profile: PLA tough tool 0.4 | Simple functional brick | [pla-ferramenta-resistente-0.4](../../docs/projeto/perfis-a1-mini/pla-ferramenta-resistente-0.4.md) |
| 3 | No supports; brim off | Flat base on PEI is enough | [brim / raft / skirt](../../docs/projeto/fatiamento/brim-raft-saia.md) |

## Bambu Studio profile
- Profile page: `docs/projeto/perfis-a1-mini/pla-ferramenta-resistente-0.4.md`
- Deviations: none

## Mesh
- Ops: merge_vertices / process / fill_holes (best-effort)
- Command: `python -m core repair-mesh 3ds/original/_sample_cube.stl 3ds/upgraded/_sample_cube.stl --json`

## Expected outcome
- Surface quality: high (trivial)
- Supports: none
- Residual risks: none meaningful

## How to print / validate
1. Open `3ds/upgraded/_sample_cube.stl` in Bambu Studio
2. Apply cited profile
3. Slice and sanity-check time/filament
4. Optional: print as PEI adhesion smoke test

## Related
- [Playbook](../../playbook.md)
- [Dry-run workflow](../../docs/projeto/workflow/dry-run-exemplo.md)
