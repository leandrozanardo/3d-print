# Hard-to-remove supports

## Summary

Support **welded** to the part: low top Z, **PETG**, missing interface, or high contact density. Tune interface and Z gap before forcing with pliers and scarring faces. Removal is a recipe problem first, post-processing second.

Strategy: [suportes-face-e-interface](../fatiamento/suportes-face-e-interface.md) · pick mode: [tree vs normal](../perfis-a1-mini/suportes-arvore-vs-normal.md).

## When to use

| Symptom | Use |
|---|---|
| Pliers won’t enter the gap | Yes |
| Face ripped on removal | Yes |
| PETG fused to interface | Yes |
| Support trapped in cavity | Yes |

## When NOT to use

- Overhangs sagging because supports missing → add support / lower threshold.
- Scar left but support released OK → [post-processing](../qualidade-e-acabamento/pos-processamento.md).
- Spiral vase with supports on → wrong profile.

## Decision tree

```text
Material?
  ├─ PETG → top Z 0.25–0.35; interface 4–5; don’t use PLA gaps
  └─ PLA → top Z 0.20–0.25; interface 2–4
Can pliers enter?
  ├─ NO → +0.05 top Z; ensure interface on
  └─ YES but face tears → lower interface density; tree↔normal; paint-off
Trapped in cavity?
  └─ Cut in sections; prefer tree branches next print
```

## Symptom → cause → fix

| Symptom | Cause | Fix |
|---|---|---|
| Pliers won’t enter | Z gap too small / no interface | Top Z +0.05 mm; add interface layers |
| Face ripped on removal | Contact too dense / wrong type | Lower interface density; tree↔normal |
| PETG fused | Material weld | Z 0.25–0.35 mm; more interface |
| Support trapped in cavity | Wrong topology | Section cut; prefer tree |
| Ceiling sagged after +Z | Gap too large / sparse | −0.05 Z or denser interface — balance |
| Normal support scars slot | Flat face needs snug + interface | Normal/snug; don’t force tree |

## A1 Mini rules

1. Top Z distance +0.05 mm per test.
2. Guarantee interface layers on noble/mating faces.
3. Lower contact density if scarring.
4. Swap tree ↔ normal per geometry.
5. PETG: larger gaps than PLA — non-negotiable.
6. Remove **cold**; cut internal supports in sections.
7. Never pry across faces — parallel cuts.
8. Coupon test before hero print — **validate on printer**.

## Suggested presets (PLA)

| Field | Value | Why |
|---|---|---|
| Top Z distance | 0.20–0.25 mm | Release |
| Interface layers | 3–4 | Separation |
| XY distance | 0.40–0.50 mm | Clearance |
| Interface density | Medium (not max) | Removability |
| Type | Tree mini; normal tools | Geometry |

## Suggested presets (PETG)

| Field | Value | Why |
|---|---|---|
| Top Z distance | 0.25–0.35 mm | Anti-weld |
| Interface layers | 4–5 | Separation |
| XY distance | 0.45–0.55 mm | Clearance |
| Speed on interface | Moderate | Quality vs weld |
| Cooling | Moderate | Don’t freeze weld worse — balance |

## PLA vs PETG columns

| Parameter | PLA | PETG |
|---|---|---|
| Start top Z | 0.20 | 0.25–0.30 |
| Interface | 2–4 | 4–5 |
| Weld risk | Medium | High |
| First fix | +0.05 Z | +0.05 Z + interface |

## Failure modes → next node

| If… | Then |
|---|---|
| Still welded after +Z | Interface style/density; material check |
| Released but ugly pits | Accept + post; or reorient next |
| Mini face destroyed | Paint-off + [lost detail](detalhe-perdido-miniatura.md) |
| Mechanical fit ruined | Normal/snug + elephant/fit pages |

## Related

- [Support face & interface](../fatiamento/suportes-face-e-interface.md)
- [Tree vs normal](../perfis-a1-mini/suportes-arvore-vs-normal.md)
- [Post-processing](../qualidade-e-acabamento/pos-processamento.md)
- [PETG functional](../perfis-a1-mini/petg-funcional-0.4.md)
- [Matrix](matriz-sintoma-causa.md)
- [Hub](../INDEX.md)

## Sources

- Bambu forum support-removal patterns · Ellis support notes
