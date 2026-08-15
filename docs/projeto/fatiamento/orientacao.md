# Orientation

## Summary

**Orientation is lever #1**: cuts support volume, improves strength (anisotropy), hides seams/scars. On A1 Mini, avoid very tall slender prints without brim; stay inside **180³ mm** with margin for brim, supports, and purge tower. Lock rotation **before** generating supports.

Document rotation (degrees about X/Y/Z) in every `plan.md`.

## When to use

| Situation | Use this page |
|---|---|
| Always, before supports | Yes |
| Preview shows excessive support | Yes — rotate first |
| Tool failed at layer lines | Yes — load axis |
| Hole out-of-round | Yes — put axis on Z |
| Spiral vase | Opening up |

## Decision tree

```text
lock orientation before supports
    │
    ├─ cosmetic face free of overhangs >45° (PLA)?
    ├─ tool loads in XY (not Z-shear)?
    ├─ critical holes on Z (roundness)?
    ├─ vessel opening up?
    ├─ mini noble face up / slight tilt if support drops?
    ├─ seam edge away from view?
    └─ still fits 180³ with brim/supports/purge?
```

## A1 Mini rules

### Goal heuristics

| Goal | Rotation heuristic |
|---|---|
| Less support | lay long overhangs onto bed or shallower angles |
| Stronger against Z-bend | avoid pure interlayer shear as primary failure |
| Better hole | axis along Z |
| Vase | opening up |
| Mini face | face up or 10–20° tilt |
| Hide seam | put seam edge away from view |
| Hide scars | support lands on back/underside |
| Tall slender | prefer lower CoG; brim |

### Non-negotiables

1. Minimize overhangs >45° on cosmetic faces (PLA); earlier caution for PETG (~35°).
2. Align tool loads in XY plane.
3. Miniatures/characters: noble face + support behind.
4. Mechanical holes: hole axis on Z when possible (circularity).
5. Fit in 180³ mm including brim/supports/purge.
6. Document rotation angles in `plan.md`.
7. After orientation lock → paint-on supports if needed.
8. Do not rotate after spending hours on paint-on regions without re-checking.

### Purpose matrix

| Purpose | Primary orientation goal |
|---|---|
| Miniature / character | Face free; scars behind |
| Tool | Strength + hole roundness |
| Decorative | Seam + cosmetic free |
| Vase | Opening up; stable base |

### Failure modes

| Symptom | Orientation-leaning cause | Next |
|---|---|---|
| Huge support tree | Bad rotation | Re-rotate |
| Delam under flex | Load in Z | Rotate load to XY |
| Oblong hole | Axis not Z / supported hole | Reorient |
| Tip-over | Tall CoG | Flatten or brim |
| Face scars | Face was down/overhung | Flip/tilt |

### Do / don’t

| Do | Don’t |
|---|---|
| Rotate then auto-support | Auto-support then rotate |
| Check envelope with helpers | Ignore purge tower on AMS jobs |
| Prefer scars on non-view | Support the hero face “because auto said so” |

## Suggested presets (PLA)

No temps here. After lock:

| Next setting | Lean |
|---|---|
| Support | Per [strategy](suportes-estrategia.md) |
| Seam | Hidden edge |
| Outer wall | Slow on hero faces |
| Brim | If tall_slender |

## Suggested presets (PETG)

Same orientation logic; expect **earlier** support need on overhangs. Prefer textured plate release orientation that doesn’t trap PETG weld on smooth PEI faces that must peel clean.

| Extra | Why |
|---|---|
| Avoid hero face on support | PETG welds harder |
| Document load axis | Layer bond weaker if cooling high |

## Related

- [Classify geometry](../geometria/classificar-geometria.md)
- [Overhangs](../geometria/balancos-e-angulos.md)
- [Support strategy](suportes-estrategia.md)
- [Mechanical fits](../geometria/encaixes-mecanicos.md)
- [Seam & surface](../qualidade-e-acabamento/costura-e-superficie.md)
- [Hardware overview](../hardware/a1-mini-visao-geral.md)
- [Slicing INDEX](INDEX.md)
- [Hub](../INDEX.md)

## Sources

- Ellis orientation philosophy
- CNC Kitchen anisotropy
- Teaching Tech support-reduction by rotation
- Project playbook lever-#1 practice
