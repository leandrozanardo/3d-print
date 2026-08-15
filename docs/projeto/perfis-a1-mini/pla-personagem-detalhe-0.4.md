# Profile — PLA character detail 0.4

## Summary

Miniature recipe extended for **larger figurines**, **faces**, and **multicolor AMS Lite**. Prioritize face layers and paint supports away from skin. Flush waste and seam placement matter as much as layer height.

Use when purpose = [personagens](../proposito/personagens.md) and the part is bigger than a tabletop mini, or AMS color swaps are in scope.

## When to use

| Signal | Action |
|---|---|
| Character / figurine / bust | This profile |
| Face / hands need sharper walls than body | Slow outer on face; body may stay 0.12 |
| AMS Lite color swaps | Minimize flush; dry each color |
| Hollow interior authorized | Cut time/filament — document in plan |

## When NOT to use

| Situation | Go to |
|---|---|
| Tiny tabletop mini only | [pla-miniatura-0.4](pla-miniatura-0.4.md) |
| Functional tools / fits | [pla-ferramenta-resistente-0.4](pla-ferramenta-resistente-0.4.md) or [petg-funcional-0.4](petg-funcional-0.4.md) |
| Spiral vase props | [pla-vaso-vase-mode-0.4](pla-vaso-vase-mode-0.4.md) |
| PETG faces | Avoid — stringing + scars |
| Pure mechanical jig | Tough-tool profile |

## Decision tree

```text
Size class?
  ├─ Tabletop mini (< ~40 mm typical) → pla-miniatura-0.4
  └─ Figurine / bust / AMS face →
        ├─ Multicolor? → AMS flush min + this profile
        └─ Mono → this profile; seam on back edge
Face support risk?
  ├─ Tree tips near eyes → paint-off mandatory
  └─ Body-only overhangs → tree OK at 30–35°
```

## A1 Mini rules

1. Fine layer on **face** (0.08–0.12); body can stay 0.12 if time-bound — document split if using modifiers.
2. Tree + **paint-on** away from face/hands.
3. AMS: minimize flush ([ams-lite](../hardware/a1-mini-ams-lite.md)); purge towers cost time and can string.
4. Consider hollow interior only when authorized and watertight after repair.
5. Seam on hidden edge ([costura](../qualidade-e-acabamento/costura-e-superficie.md)).
6. Outer wall slower than inner; never max travel speed across face islands.
7. Dry all AMS slots — one wet color contaminates the whole job.
8. Uncertain flush volume / face speed → **validate on printer**.

## Bambu Studio fields (PLA)

| Field | Value | Why |
|---|---|---|
| Process base | Fine family clone | Detail |
| Layer height | 0.08–0.12 mm | Face |
| First layer height | 0.20 mm | Stick |
| Wall loops | 2–3 | Detail vs time |
| Top / bottom shells | 3–4 | Skin |
| Infill | 10–15% gyroid | Light |
| Outer wall speed | 40–70 mm/s | Sharpness |
| Inner / infill | Higher | Time |
| Supports | Tree ~30° + paint | Organic |
| Top Z distance | 0.20–0.25 mm | Removal — **validate** |
| Interface layers | 2–4 | Release |
| AMS flush | Minimum viable | Waste |
| Wipe tower | Per Studio AMS defaults | Color purity |
| Brim | On if unstable base | Stick |
| Cooling | High on overhangs | Quality |
| Seam | Aligned / Back | Cosmetics |
| Ironing | Off (optional flat hair/hat tops) | Time |
| Retract | Bambu PLA DD default | After dry |
| Nozzle / bed | Material table | Brand |

## PLA vs PETG columns

| Dimension | PLA character | PETG |
|---|---|---|
| Face quality | Preferred | Avoid |
| AMS multicolor | Practical if dry | Purge↑ + string↑ |
| Support scars | Manageable with paint | Worse weld risk |
| Layer bond | Adequate for display | Stronger but irrelevant for faces |
| Recommendation | **Use** | Do not use for faces |

## AMS-specific failure modes

| Symptom | Likely cause | Fix |
|---|---|---|
| Color bleed / muddy face | Low flush / wet filament | Raise flush one step; dry |
| Strings after color change | Residual ooze + travel | Wipe; combing; −5 °C |
| Grind / under-extrusion mid-swap | Path kink / soft wet filament | [AMS Lite](../hardware/a1-mini-ams-lite.md) path check |
| Long purge tower scars part | Bad tower placement | Move tower; check wipe |

## Failure modes → first checks

| Symptom | Next page |
|---|---|
| Lost face detail | [Lost detail](../troubleshooting/detalhe-perdido-miniatura.md) |
| Support welded to cheek | [Hard supports](../troubleshooting/suporte-dificil-remover.md) |
| Vertical seam on nose | [Seam](../qualidade-e-acabamento/costura-e-superficie.md) |
| Hair webs | [Stringing](../qualidade-e-acabamento/stringing-e-retract.md) |
| Base peel on thin feet | [Adhesion](../troubleshooting/falha-adesao.md) + brim |

## Calibration order (character)

1. First layer + brim decision  
2. Dry all colors  
3. Mono face coupon (optional) before full AMS job  
4. Paint supports; preview tip contact on face  
5. Flush minimum → raise only if bleed  
6. Retract only after dry if webs remain  

## Plan.md must cite

- This profile + [personagens](../proposito/personagens.md)  
- AMS yes/no + flush strategy  
- Face layer height / modifiers  
- Support paint notes  
- **validate on printer** for flush and face speed  

## Related

- [Characters](../proposito/personagens.md)
- [AMS Lite](../hardware/a1-mini-ams-lite.md)
- [PLA miniature](pla-miniatura-0.4.md)
- [Lost detail](../troubleshooting/detalhe-perdido-miniatura.md)
- [Seam & surface](../qualidade-e-acabamento/costura-e-superficie.md)
- [Tree vs normal](suportes-arvore-vs-normal.md)
- [Profiles index](INDEX.md)
- [Hub](../INDEX.md)

## Sources

- Bambu Studio A1 Mini 0.4 + AMS Lite patterns
- Purpose pages · Ellis / Teaching Tech
