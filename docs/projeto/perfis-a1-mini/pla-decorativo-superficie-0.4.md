# Profile — PLA decorative surface 0.4

## Summary

Clean **outer walls** and a **hidden seam** for display parts on A1 Mini 0.4. Low infill; supports only when needed; ironing optional on flat tops. Strength and micro-detail are secondary to wall clarity.

Use when purpose = [decorativas](../proposito/decorativas.md) and the viewer sees large outer surfaces.

## When to use

| Signal | Action |
|---|---|
| Visible walls matter more than strength | This profile |
| Display stand, plaque, shell, ornament | Seam + slow outer |
| Flat top needs gloss/smooth | Optional ironing (time cost) |
| Minimal supports possible via orientation | Prefer reorient first |

## When NOT to use

| Situation | Go to |
|---|---|
| Load-bearing / tools | [pla-ferramenta-resistente-0.4](pla-ferramenta-resistente-0.4.md) |
| Fine miniature faces | [pla-miniatura-0.4](pla-miniatura-0.4.md) / [pla-personagem-detalhe-0.4](pla-personagem-detalhe-0.4.md) |
| Spiral single-wall vase | [pla-vaso-vase-mode-0.4](pla-vaso-vase-mode-0.4.md) |
| Impact / warm service | [petg-funcional-0.4](petg-funcional-0.4.md) |
| PETG decorative default | Prefer PLA; PETG = stringing cleanup |

## Decision tree

```text
Is the hero surface an outer wall?
  ├─ YES → seam on hidden edge + outer slower than inner
  └─ NO (top only) → consider ironing on that top only
Can orientation hide overhangs?
  ├─ YES → rotate; supports off show faces
  └─ NO → tree if organic; normal if flat planes — paint off show face
Strength needed?
  ├─ YES → bump walls to 3–4 or switch to tough-tool
  └─ NO → keep 12% gyroid
```

## A1 Mini rules

1. Seam on hidden edge ([costura](../qualidade-e-acabamento/costura-e-superficie.md)).
2. Avoid support on show faces — reorient or paint-off.
3. Ironing only critical flat tops; default **off**.
4. Low infill unless stiffness needed for thin shells.
5. Outer wall slower than inner; drop speed before PA experiments.
6. Flow calibrated ~0.95–1.00 before chasing ringing.
7. Keep Bambu flow dynamics / PA defaults unless understood — **validate**.
8. Brim off by default for clean base edge; on if peel risk.

## Bambu Studio fields (PLA)

| Field | Value | Why |
|---|---|---|
| Process base | 0.16 quality clone | Visual balance |
| Layer height | 0.12–0.16 mm | Surface vs time |
| First layer height | 0.20–0.24 mm | Stick |
| Wall loops | 3 (4 if thin shell flexes) | Skin |
| Top / bottom shells | 4–5 | Tops |
| Infill | 10–15% gyroid | Economy |
| Outer wall speed | 50–80 mm/s | Surface |
| Inner / infill | Higher | Time |
| Seam | Aligned / Back | Cosmetics |
| Ironing | Off (On if critical flat) | Time |
| Supports | Only if needed; tree if organic | Less scar |
| Top Z distance | 0.20 mm | Release — **validate** |
| Interface | 2–4 if supported | Separation |
| Brim | Off default | Clean edge |
| Cooling | High on overhangs | Quality |
| Retract | Bambu PLA DD | After dry if hairs |
| Nozzle / bed | PLA table | Brand |

## PLA vs PETG columns

| Dimension | PLA decorative | PETG decorative |
|---|---|---|
| Wall clarity | Best | Gloss bands / scars |
| Stringing | Manageable | Likely cleanup |
| Cooling | High OK | Compromised |
| Recommendation | **Default** | Only if material required |
| Post sand | Light | Gummy — light pressure |

## Failure modes → first checks

| Symptom | Likely cause | Next |
|---|---|---|
| Vertical scar line | Seam on show face | [Seam](../qualidade-e-acabamento/costura-e-superficie.md) |
| Ghosting / ringing | Speed / accel / flow | Slow outer; check flow |
| Matte/gloss banding | Temp / cooling swing | Stabilize fan/temp |
| Hair on islands | Wet / retract / travel | [Stringing](../qualidade-e-acabamento/stringing-e-retract.md) |
| Support pits on show face | Contact density / low Z | [Hard supports](../troubleshooting/suporte-dificil-remover.md) |
| Bulged base edge | Elephant foot | [Elephant foot](../qualidade-e-acabamento/elephant-foot-e-primeira-camada.md) |

## Surface priority ladder

1. Orientation (hide seam + overhangs)
2. Outer wall speed
3. Seam position
4. Flow calibration
5. Ironing (optional)
6. Post sand/paint ([pos-processamento](../qualidade-e-acabamento/pos-processamento.md))

Do not sand forever to hide a bad seam placement.

## Plan.md must cite

- This profile + [decorativas](../proposito/decorativas.md)
- Seam strategy
- Support yes/no + type
- Ironing yes/no
- **validate on printer** for outer speed / PA if touched

## Related

- [Decorative intent](../proposito/decorativas.md)
- [Seam & surface](../qualidade-e-acabamento/costura-e-superficie.md)
- [Layer height & speed](../fatiamento/altura-de-camada-e-velocidade.md)
- [Post-processing](../qualidade-e-acabamento/pos-processamento.md)
- [Tree vs normal](suportes-arvore-vs-normal.md)
- [Profiles index](INDEX.md)
- [Hub](../INDEX.md)

## Sources

- Bambu Studio 0.4 · purpose pages
- Ellis Print Tuning Guide (seam / surface)
