# Warping

## Summary

Corners lift from **thermal shrinkage** after the part already stuck. PLA on A1 Mini warps little; **large flats** and **PETG** still fail. Brim, bed temp, low early cooling, and **no drafts** (open frame) are the primary levers. Raft is last resort.

Often overlaps early [adhesion](falha-adesao.md) — fix stick first, then warp.

## When to use

| Symptom | Use |
|---|---|
| Corners curl after many layers | Yes |
| Long plate bows off bed | Yes |
| PETG lifts despite good first layer | Yes |
| Brim still fails on huge flat | Yes → raft consideration |

## When NOT to use

- Never stuck at layer 1 → [adhesion](falha-adesao.md) first.
- XY permanent step → [layer-shift](layer-shift.md).
- Gaps in walls → [under-extrusion](under-extrusion.md).

## Decision tree

```text
Did first layer kiss and stick?
  ├─ NO → falha-adesao first
  └─ YES → corners lift later?
        ├─ Draft / AC? → block airflow
        ├─ Large continuous flat? → brim + reorient long axis + lower early fan
        └─ PETG? → dry + bed 70–80 + brim + moderate fan
```

## Symptom → cause → fix

| Symptom | Cause | Fix |
|---|---|---|
| Corners curl after many layers | Shrinkage + weak edge grip | Brim 5–10 mm; hotter bed in range |
| Long plate bows | Continuous long section + cooling | Reorient; lower early-layer fan |
| PETG lifts despite stick | Wet filament / cold bed / draft | Dry; bed 70–80 °C; block wind |
| Brim still fails | Extreme footprint / chill | Raft last resort ([brim-raft](../fatiamento/brim-raft-saia.md)) |
| Tall thin tower tips | Mass + leverage | Brim; −speed; check adhesion |
| One side only | Directional draft | Rotate printer / shield |

## A1 Mini rules

1. More contact (brim) + clean plate.  
2. Lower cooling on **first layers**; raise later for overhangs.  
3. Avoid drafts — A1 Mini has **no native enclosure**; manage room air.  
4. Reorient to shrink continuous long sections when possible.  
5. PETG: dry + hot bed + brim.  
6. Raft only if brim failed twice.  
7. Don’t max part cooling on large PETG flats.  
8. Uncertain bed/fan schedule → **validate on printer**.

## Suggested presets (PLA)

| Field | Value | Why |
|---|---|---|
| Bed | Top of safe range | Stick |
| Brim | 5–10 mm | Anchor |
| Early cooling | Reduced (layers 1–N) | Less shock |
| Later cooling | High if overhangs | Quality |
| Orientation | Break long flat if possible | Shrink path |
| Speed | Moderate on large solids | Less stress |

## Suggested presets (PETG)

| Field | Value | Why |
|---|---|---|
| Bed | 70–80 °C | Essential |
| Initial cooling | Low | Bonding |
| Draft | Avoid | No enclosure |
| Brim | On | Residual warp |
| Dry | Mandatory | Wet ↑ warp weirdness |
| Plate | Textured | Stick without weld drama |

## PLA vs PETG warp columns

| Lever | PLA | PETG |
|---|---|---|
| Sensitivity | Lower | Higher |
| Bed | 55–65 order | 70–80 |
| Early fan | Can rise sooner | Keep lower longer |
| Enclosure need | Rare | Helpful but not required if drafts managed |
| Moisture interaction | Mild | Strong |

## Failure modes → next node

| If… | Then |
|---|---|
| Brim glued but part still curls | Reorient / raft / material |
| Plate damaged on release | Over-bond — cool first; textured |
| Warp + stringing | Dry before more fan games |
| Warp + layer shift claim | Confirm part didn’t peel then get hit |

## Related

- [Adhesion failure](falha-adesao.md)
- [Brim / raft / skirt](../fatiamento/brim-raft-saia.md)
- [PETG](../materiais/petg.md)
- [PETG profile](../perfis-a1-mini/petg-funcional-0.4.md)
- [Orientation](../fatiamento/orientacao.md)
- [Matrix](matriz-sintoma-causa.md)
- [Hub](../INDEX.md)

## Sources

- Prusa warping KB · FixMyPrint warping patterns
- Open-frame PETG draft notes
