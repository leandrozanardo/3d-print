# Profile — PLA tough tool 0.4

## Summary

Strength and dimensional stability for **light/medium tools** in **PLA** on A1 Mini 0.4. **Wall loops beat high sparse infill**; orient primary load in **XY**; use elephant-foot compensation on critical fits. Cosmetics secondary.

Default when purpose = [ferramentas](../proposito/ferramentas.md) and PLA still meets toughness/temp needs.

## When to use

| Signal | Action |
|---|---|
| Clips, jigs, brackets, housings | This profile |
| Mechanical fits / clearances | Pair [encaixes-mecanicos](../geometria/encaixes-mecanicos.md) |
| PLA already OK for impact | Stay PLA; document load assumption |
| Need repeatable XY dimensions | 0.20 mm layers; moderate speed |

## When NOT to use

| Situation | Go to |
|---|---|
| Cosmetic minis / characters | Miniature / character profiles |
| Spiral vase | [pla-vaso-vase-mode-0.4](pla-vaso-vase-mode-0.4.md) |
| Impact toughness or warmer service | [petg-funcional-0.4](petg-funcional-0.4.md) |
| Pure display sculpture | [pla-decorativo-superficie-0.4](pla-decorativo-superficie-0.4.md) |
| Certified structural / safety parts | Out of wiki scope — do not claim |

## Decision tree

```text
Load / heat beyond PLA comfort?
  ├─ YES → petg-funcional-0.4 (dry) — validate service temp
  └─ NO → primary stress direction?
        ├─ Can align in XY? → orient that way + walls ≥4
        └─ Must load in Z? → more walls/shells; warn delamination risk
Fits critical?
  ├─ YES → elephant foot compensation 0.1–0.2 + test coupon
  └─ NO → skip compensation until peel fixed
```

## A1 Mini rules

1. Wall loops **≥4** (skin strength > denser sparse infill myth).
2. Orient primary load in XY ([orientacao](../fatiamento/orientacao.md)).
3. Compensate elephant foot on tolerance-critical bases — **validate**.
4. Prefer **normal/snug** supports for straight slots and flat mating faces.
5. Document clearances and test fit in `plan/*.md`.
6. No raft unless brim failed twice.
7. Moderate cooling: high fan can weaken layer bond on thick walls.
8. If part snaps at layers under flex → try orientation/walls first, then PETG.

## Bambu Studio fields (PLA)

| Field | Value | Why |
|---|---|---|
| Process base | 0.20 standard clone | Dimensional / time |
| Layer height | 0.20 mm (0.16 if finer fits) | Strength/time |
| First layer height | 0.24 mm | Squish |
| Wall loops | 4–5 | Skin strength |
| Top / bottom shells | 5–6 | Solid faces |
| Infill | 25–40% gyroid | Core (walls first) |
| Outer wall speed | 60–100 mm/s | Structural OK |
| Inner / infill speed | Higher | Time |
| Supports | Normal/snug if mechanical | Flat faces |
| Top Z distance | 0.20–0.25 mm | Removable |
| Interface layers | 2–3 | Separation |
| Brim | Per footprint / tall parts | Stick |
| Elephant foot compensation | 0.1–0.2 mm if fit | Tolerances — **validate** |
| Cooling | Moderate–high on overhangs only | Bond vs sag |
| Raft | Off | Prefer brim |
| Seam | Least visible / aligned | Optional cosmetics |
| Nozzle / bed | PLA table | Brand |

## PLA vs PETG columns

| Dimension | PLA tough tool | PETG functional |
|---|---|---|
| Ease / dimensional | Easier | Harder (string/warp) |
| Impact | Lower | Higher |
| Layer bond | Good if cooled reasonably | Often better |
| Heat softening | Lower | Better candidate |
| Fits / elephant foot | Tune carefully | Same + stick risk |
| Default for light tools | **Yes** | When PLA fails |

## Failure modes → first checks

| Symptom | Likely cause | Next |
|---|---|---|
| Snaps at layer lines | Z load / cold / high fan | Reorient; −fan; or PETG |
| Hole too tight | Elephant foot / over-extrusion | [Elephant foot](../qualidade-e-acabamento/elephant-foot-e-primeira-camada.md) |
| Slot scarred | Wrong support type / low Z | [Hard supports](../troubleshooting/suporte-dificil-remover.md) |
| Corner lift on large plate | Warp | [Warping](../troubleshooting/warping.md) |
| Gaps in walls | Under-extrusion | [Under-extrusion](../troubleshooting/under-extrusion.md) |
| Soft under clamp | Walls too few / low infill | +walls before +infill |

## Strength recipe (order)

1. Orientation (XY load)  
2. Walls 4–5  
3. Top/bottom shells 5–6  
4. Infill 25–40%  
5. Only then material swap to PETG  

## Plan.md must cite

- This profile + tools / fits geometry pages  
- Orientation rationale  
- Walls / infill / elephant compensation  
- Clearance targets  
- **validate on printer** for fit coupons  

## Related

- [Tools](../proposito/ferramentas.md)
- [Mechanical fits](../geometria/encaixes-mecanicos.md)
- [Walls & infill](../fatiamento/preenchimento-e-paredes.md)
- [Orientation](../fatiamento/orientacao.md)
- [PETG functional](petg-funcional-0.4.md)
- [Elephant foot](../qualidade-e-acabamento/elephant-foot-e-primeira-camada.md)
- [Profiles index](INDEX.md)
- [Hub](../INDEX.md)

## Sources

- Bambu Studio 0.4 · CNC Kitchen walls-vs-infill concepts
- Ellis / Teaching Tech · project tools purpose node
