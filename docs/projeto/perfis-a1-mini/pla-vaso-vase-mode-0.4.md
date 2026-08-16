# Profile — PLA vase (spiral / vase mode) 0.4

## Summary

**Spiral vase / spiralize**: one continuous perimeter, solid bottom, no infill, no top. Valid only if the slice shows a **single contour** per layer. On A1 Mini 0.4, line width often ≥0.45–0.55 mm for a stronger wall. Supports stay **off**.

Purpose: [vasos](../proposito/vasos.md) + geometry [vasos-e-vasilhames](../geometria/vasos-e-vasilhames.md).

## When to use

| Signal | Action |
|---|---|
| Decorative vessel / lamp shade spiral | This profile |
| Single outer contour in preview | Proceed |
| Want visible layer banding aesthetic | Layer 0.20–0.28 |
| Narrow base | Brim; watch peel |

## When NOT to use

| Situation | Go to |
|---|---|
| Multi-island / branched / multi-contour | Decorative or tool profile — do not spiralize |
| Need closed top / solid shell | [pla-decorativo-superficie-0.4](pla-decorativo-superficie-0.4.md) |
| Mechanical tools / fits | Tough-tool / PETG |
| Miniatures / characters with arms | Wrong mode |
| Model needs supports | Redesign orientation or don’t spiralize |
| Liquid-tight claim without test | Out of scope — **validate** seal separately |

## Decision tree

```text
Preview = single loop every layer?
  ├─ NO → abort spiral; use solid walls profile
  └─ YES → overhangs printable without support?
        ├─ NO → reorient / redesign / non-spiral
        └─ YES → bottom shells 4–6 + constant speed
Line width?
  ├─ Want stronger wall → 0.45–0.55 mm (validate flow)
  └─ Nominal 0.42 → OK for light décor
```

## A1 Mini rules

1. Confirm **single loop** in Bambu Studio preview before committing time.
2. Bottom shells **4–6**; top shells **0**.
3. Line width may be **≥0.45–0.55 mm** for stronger wall — watch volumetric limit.
4. **No supports** — vase mode must be support-free.
5. Keep speed **steady** for constant wall thickness.
6. High cooling after solid base for overhangs; don’t freeze first layers.
7. Spiralize incompatible with typical AMS color swaps mid-wall — mono spool preferred.
8. Uncertain width/flow → **validate on printer** with a short vase coupon.

## Bambu Studio fields (PLA)

| Field | Value | Why |
|---|---|---|
| Spiral vase / spiralize | On | Contour |
| Layer height | 0.20–0.28 mm | Aesthetic banding |
| Wall loops | 1 (spiral) | Vase mode |
| Bottom shells | 4–6 | Seal base |
| Top shells | 0 | Open |
| Infill | 0 | — |
| Line width | 0.45–0.55 mm | Stronger wall |
| Speed | Constant / moderate | Stable width |
| Outer wall speed | Match spiral speed | No accel scars |
| Supports | Off | Required |
| Brim | If narrow base | Stick |
| Cooling | Low early; high after base | Overhangs |
| Seam | N/A (spiral) | Continuous |
| Retract | Minimal travel islands | Still dry filament |
| Nozzle / bed | PLA table | Brand |

## PLA vs PETG columns

| Dimension | PLA vase | PETG vase |
|---|---|---|
| Cosmetics / ease | Preferred | Harder |
| Stringing on travels | Low if dry | High |
| Wall strength | Good with wider line | Often tougher |
| Cooling overhangs | High OK | Compromise |
| Recommendation | **Default** | Only if material required; slower; dry mandatory |

PETG vase: viable if dry; lower speed; stabilize temp; expect more cleanup.

## Failure modes → first checks

| Symptom | Likely cause | Fix |
|---|---|---|
| Open vertical slit / gap | Multi-contour / hole in wall | Abort spiral; fix mesh or mode |
| Wavy / variable thickness | Speed accel changes / under-extrusion | Constant speed; check flow |
| Collapsed overhang | Fan too low / layer too thick | +cooling; −layer or redesign |
| Base peel | Tiny footprint / dirty PEI | Brim; [adhesion](../troubleshooting/falha-adesao.md) |
| Bubbles / foam wall | Wet filament | Dry ([secagem](../materiais/secagem-e-umidade.md)) |
| Weak single wall crush | Line too thin | Widen line width; **validate** |

## Preview checklist (mandatory)

- [ ] Single contour per layer
- [ ] No support generated
- [ ] Bottom solid count ≥4
- [ ] BBox fits bed with brim margin
- [ ] No sudden overhang beyond printable angle without redesign

## Plan.md must cite

- This profile + vase purpose/geometry
- Spiralize confirmed single contour
- Line width + layer height
- Brim yes/no
- Any liquid-tight claim marked **validate on printer**

## Related

- [Vase geometry](../geometria/vasos-e-vasilhames.md)
- [Vase purpose](../proposito/vasos.md)
- [Decorative profile](pla-decorativo-superficie-0.4.md)
- [Adhesion](../troubleshooting/falha-adesao.md)
- [Profiles index](INDEX.md)
- [Hub](../INDEX.md)

## Sources

- Bambu Studio spiralize / vase mode behavior
- Purpose/geometry vase nodes
- Community single-wall width practice (0.4 nozzle)
