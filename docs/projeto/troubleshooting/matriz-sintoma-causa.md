# Symptom → cause matrix

## Summary

Playbook quick table for A1 Mini. Pick **one row**, open the page, fix **one cause**, retest. Golden rule: **one variable per test**.

Use before editing a profile “blind” and before declaring filament “bad.”

## When to use

| Trigger | Action |
|---|---|
| Any failure | Start here |
| Multiple symptoms | Treat adhesion/extrusion before cosmetics |
| After brand/spool change | Re-walk matrix; don’t trust last retract |

## When NOT to use

- As a substitute for reading the child page.
- To justify changing five knobs at once.
- To skip drying when PETG/PLA is soft or pops.

## Master matrix

| Symptom | Likely causes | Fix page |
|---|---|---|
| Part peeled / never stuck | Dirty plate, cold bed, high first layer, tiny footprint no brim | [Adhesion](falha-adesao.md) |
| Corners lifted later | Warping, draft, cold bed, large flat footprint | [Warping](warping.md) |
| Gaps / weak infill / translucent walls | Partial clog, low flow, wet filament, cold nozzle, volumetric limit | [Under-extrusion](under-extrusion.md) |
| Permanent XY step in walls | Belt/impact, knock after peel, speed/accel, gantry | [Layer shift](layer-shift.md) |
| Support welded to part | Low Z gap, PETG, no interface, high contact density | [Hard supports](suporte-dificil-remover.md) |
| Eyes/buttons/texture gone | Thick layer, fast outer wall, thin walls, over-extrusion, support on face | [Lost detail](detalhe-perdido-miniatura.md) |
| Hair / spider web | Moisture, hot nozzle, retract, travel | [Stringing](../qualidade-e-acabamento/stringing-e-retract.md) |
| Fat / bulged base | Elephant foot / over-squish | [Elephant foot](../qualidade-e-acabamento/elephant-foot-e-primeira-camada.md) |
| Ugly vertical seam | Seam + outer speed | [Seam](../qualidade-e-acabamento/costura-e-superficie.md) |
| Delamination mid-part | Cold / wet / high fan (esp. PETG) | Temp table + drying + cooling |
| Color bleed (AMS) | Low flush / wet color | [AMS Lite](../hardware/a1-mini-ams-lite.md) |

## Decision tree

```text
Failed on bed (layer 1–3)?
  ├─ YES → falha-adesao (+ warping if corners only)
  └─ NO → cosmetic vs structural?
        ├─ Structural gaps → under-extrusion
        ├─ XY step → layer-shift (rule out peel-push)
        ├─ Support trauma → suporte-dificil-remover
        └─ Surface/detail → quality pages or detalhe-perdido
```

## Cause → first action (dense)

| Cause class | First action | PLA note | PETG note |
|---|---|---|---|
| Plate / bed | Wash PEI; +5–10 °C bed in range; re-run bed cal | 55–60 °C order | 70–80 °C; textured preferred |
| Moisture | Dry spool; retest before retract changes | Often enough | **Mandatory** first |
| Mechanical knock | Confirm part still stuck; −speed/accel; brim tall parts | Same | Same |
| Support weld | +0.05 mm top Z; add interface | Z ~0.20–0.25 | Z ~0.25–0.35 |
| Resolution | Layer 0.08–0.12; outer ≤60–80 mm/s; paint supports off faces | Prefer PLA | Avoid for minis |
| Volumetric | −20% speed / lower max volumetric | Check clog | Lower than PLA |
| Over-squish | Elephant compensation 0.1–0.2; check first layer | Fits | After stick OK |

## Priority order when symptoms stack

1. Safety / nozzle crash risk (shift, detached part)
2. Adhesion / warp (part must survive)
3. Extrusion health (gaps, clogs, wet)
4. Supports removable
5. Detail / seam / stringing cosmetics

## A1 Mini rules

1. One variable per test.
2. Log before/after in `plan.md` when debugging a real job.
3. Uncertain numbers → **validate on printer**.
4. Don’t raise flow >~1.05 to “fix” gaps — hides clogs.
5. Open frame: treat drafts as a real cause for warp/uneven cooling.

## Profile-aware shortcuts

| If the job used… | Bias first checks toward… |
|---|---|
| [pla-miniatura-0.4](../perfis-a1-mini/pla-miniatura-0.4.md) | Lost detail, stringing, hard supports on face |
| [pla-personagem-detalhe-0.4](../perfis-a1-mini/pla-personagem-detalhe-0.4.md) | Seam, AMS flush, face paint supports |
| [pla-ferramenta-resistente-0.4](../perfis-a1-mini/pla-ferramenta-resistente-0.4.md) | Elephant foot, under-extrusion, warp on flats |
| [pla-vaso-vase-mode-0.4](../perfis-a1-mini/pla-vaso-vase-mode-0.4.md) | Adhesion at base, single-contour gaps (not “underextrusion”) |
| [petg-funcional-0.4](../perfis-a1-mini/petg-funcional-0.4.md) | Moisture, stringing, support weld, PEI over-bond |

## Related

- [Troubleshooting index](INDEX.md)
- [Quality checklist](../workflow/checklist-qualidade.md)
- [Optimize workflow](../workflow/otimizar-modelo.md)
- [Profiles](../perfis-a1-mini/INDEX.md)
- [Hub](../INDEX.md)

## Sources

- r/FixMyPrint common taxonomy (synthesis)
- Prusa KB failure modes
- Bambu A1 Mini field patterns
