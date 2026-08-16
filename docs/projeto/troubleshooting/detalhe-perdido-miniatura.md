# Lost miniature detail

## Summary

Eyes, buttons, rivets, or texture **gone**: thick layers, fast outer wall, thin walls, over-extrusion, or support eating the face. A **0.4 mm nozzle has a hard floor** — some detail is physically unprintable. Prefer [pla-miniatura-0.4](../perfis-a1-mini/pla-miniatura-0.4.md) / [pla-personagem-detalhe-0.4](../perfis-a1-mini/pla-personagem-detalhe-0.4.md).

Geometry: [organicos-e-miniaturas](../geometria/organicos-e-miniaturas.md) · [paredes-finas](../geometria/paredes-finas.md).

## When to use

| Symptom | Use |
|---|---|
| Preview sharp, print “melted” | Yes |
| Thin ridges missing | Yes |
| Face scarred / feature gone | Yes → supports |
| Soft / blobby detail | Yes → flow/temp |

## When NOT to use

- PETG for cosmetic minis — wrong material class; switch to PLA.
- Structural tools looking “low detail” — wrong profile expectation.
- Stringing hairs only — [stringing](../qualidade-e-acabamento/stringing-e-retract.md).

## Decision tree

```text
Feature width ≥ ~0.4–0.8 mm printable?
  ├─ NO → scale up / accept / out-of-scope nozzle — stop blaming slicer
  └─ YES → layer ≤0.12 and outer ≤60–80 mm/s?
        ├─ NO → apply mini profile speeds/layers
        └─ YES → support on face?
              ├─ YES → tree + paint-off
              └─ NO → flow ≤1.00; −5 °C if blobbing; detect thin walls
```

## Symptom → cause → fix

| Symptom | Cause | Fix |
|---|---|---|
| Preview sharp, print “melted” | Layer too thick / hot / fast | Layer 0.08–0.12; outer ≤60–80 mm/s; −5 °C if blobbing |
| Thin ridges missing | Walls < ~0.8 mm | Detect thin walls; thicken mesh if authorized |
| Face scarred / feature gone | Support on noble face | Tree + paint-on off face |
| Soft / blobby detail | Over-extrusion | Flow ≤1.00 without calibration |
| Still soft at 0.08 mm | Below nozzle capability | Accept, scale up, or change nozzle (out of day-1 scope) |
| One side only melted | Heat soak / cooling uneven | Check fan; drafts; seam/travel |
| AMS muddy face | Flush / wet | AMS flush + dry — not layer height |

## A1 Mini rules

1. Layer → **0.08–0.12 mm**.
2. Outer wall ≤ **60–80 mm/s** (often 40–70 for faces).
3. Detect thin walls on; thicken critical <0.8 mm if mesh edit allowed.
4. Flow not >1.00 without calibration.
5. Paint supports off noble faces.
6. Temp −5 °C if blobbing (after dry confirmed).
7. Below a size floor, 0.4 mm cannot recover detail.
8. Prefer PLA; PETG cosmetic minis are a bad default.
9. Uncertain minimum feature size → **validate on printer** with a detail coupon.

## Suggested presets (PLA)

| Field | Value | Why |
|---|---|---|
| Profile | [pla-miniatura-0.4](../perfis-a1-mini/pla-miniatura-0.4.md) | Baseline |
| Layer height | 0.08–0.12 mm | Resolution |
| Outer wall | 40–70 mm/s | Sharpness |
| Support | Tree + paint | Protect face |
| Top Z | 0.20 mm | Release vs scar — **validate** |
| Cooling | High after base | Overhang detail |
| Flow | ≤1.00 until calibrated | Anti-blob |
| Walls | 2–3 | Don’t fatten micro-features |

## Suggested presets (PETG)

| Field | Value | Why |
|---|---|---|
| Recommendation | **Avoid** for cosmetic miniature detail | Cooling/stringing |
| If forced | Cooling 40–60%; slower; larger support Z | Damage control |
| Expectation | Lost quality vs PLA | Document in plan |

## PLA vs PETG columns

| Dimension | PLA | PETG |
|---|---|---|
| Detail retention | Best | Poor relative |
| Support face risk | Manageable | Higher weld |
| Cooling for overhangs | High | Compromised |
| Wiki default | **Yes** | No |

## Failure modes → next node

| If… | Then |
|---|---|
| Detail OK but hairs | [Stringing](../qualidade-e-acabamento/stringing-e-retract.md) |
| Detail OK but seam on face | [Seam](../qualidade-e-acabamento/costura-e-superficie.md) |
| Support destroyed face | [Hard supports](suporte-dificil-remover.md) |
| Walls gappy | [Under-extrusion](under-extrusion.md) |

## Related

- [Miniatures](../proposito/miniaturas.md)
- [Thin walls](../geometria/paredes-finas.md)
- [Organics & miniatures](../geometria/organicos-e-miniaturas.md)
- [Character profile](../perfis-a1-mini/pla-personagem-detalhe-0.4.md)
- [Tree vs normal](../perfis-a1-mini/suportes-arvore-vs-normal.md)
- [Matrix](matriz-sintoma-causa.md)
- [Hub](../INDEX.md)

## Sources

- MakerWorld mini tuning patterns · Teaching Tech resolution limits
- 0.4 mm nozzle physics (feature floor)
