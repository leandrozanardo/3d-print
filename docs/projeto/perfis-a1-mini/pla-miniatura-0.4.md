# Profile — PLA miniature 0.4

## Summary

High-detail **PLA** miniatures on **Bambu Lab A1 Mini** with **0.4 mm** nozzle. Fine layers, slow outer wall, tree supports with paint-away from faces, short direct-drive retract after dry filament. Cosmetics beat strength and print time.

This is the default recipe when purpose = [miniaturas](../proposito/miniaturas.md) and geometry = organic/small features.

## When to use

| Signal | Action |
|---|---|
| Purpose miniatures | Use this profile |
| Geometry organics / thin armor / faces | Pair with [organicos-e-miniaturas](../geometria/organicos-e-miniaturas.md) |
| Need texture / eye / rivet retention | Layer ≤0.12; outer wall slow |
| Small footprint on PEI | Brim 5 mm typical |

## When NOT to use

| Situation | Go to |
|---|---|
| Structural tools / load-bearing | [pla-ferramenta-resistente-0.4](pla-ferramenta-resistente-0.4.md) |
| Larger figurine + AMS face priority | [pla-personagem-detalhe-0.4](pla-personagem-detalhe-0.4.md) |
| Single-wall spiral vase | [pla-vaso-vase-mode-0.4](pla-vaso-vase-mode-0.4.md) |
| Impact / mild heat | [petg-funcional-0.4](petg-funcional-0.4.md) |
| Large flat display panel, time > detail | [pla-decorativo-superficie-0.4](pla-decorativo-superficie-0.4.md) |
| Features ≪ 0.4–0.8 mm | Scale up, accept loss, or out-of-scope nozzle change |

## Decision tree

```text
Feature size printable on 0.4 nozzle?
  ├─ NO → scale / redesign / accept loss ([detalhe-perdido](../troubleshooting/detalhe-perdido-miniatura.md))
  └─ YES → dry PLA?
        ├─ NO → dry first, then retract later
        └─ YES → tree + paint off face → this profile
```

## A1 Mini rules

1. Base: **Bambu PLA @ A1 Mini 0.4** + fine/0.12-family process — clone before edit.
2. **No raft** (brim OK). Raft ruins mini bases.
3. **Tree** default; paint supports off eyes/faces/armor fronts.
4. Dry filament before chasing retract/stringing.
5. Prefer firm removable supports over “zero support” that melts overhangs.
6. Detect thin walls on; thicken critical ridges only if mesh edit authorized.
7. Flow ≤1.00 without a measured calibration — over-extrusion kills detail.
8. Uncertain retract / top Z → **validate on printer**.

## Bambu Studio fields (PLA)

| Field | Value | Why |
|---|---|---|
| Process base | Fine / 0.12 family clone | Detail |
| Layer height | 0.10 mm (0.08 premium) | Resolution |
| First layer height | 0.20 mm | Adhesion |
| Wall loops | 2–3 | Skin without fatting features |
| Top / bottom shells | 3–4 | Close surfaces |
| Sparse infill | 10–15% gyroid | Backbone, low mass |
| Outer wall speed | 40–70 mm/s | Sharpness |
| Inner wall / infill speed | Higher than outer | Time |
| Travel | Avoid crossing walls / combing On | Stringing |
| Supports | Tree; overhang 30–35° | Organic |
| Top Z distance | 0.20 mm | **validate** removal vs scar |
| Interface layers | 2–4 | Removability |
| Support paint | Off noble faces | Detail survival |
| Brim | 5 mm if small base | Stick |
| Raft | Off | Cleanup |
| Cooling | 80–100% after first layers | Overhangs |
| Seam | Aligned / Back on hidden edge | Cosmetics |
| Retract | Bambu PLA direct-drive default | Tower only if hairs after dry |
| Nozzle / bed | [temp table](../materiais/tabela-temperaturas-a1-mini.md) | Brand — **validate** |

## PLA vs PETG columns

| Dimension | PLA (this profile) | PETG (not recommended) |
|---|---|---|
| Detail / cooling | Best | Compromised |
| Stringing risk | Low–medium if dry | High |
| Support Z gap | ~0.20 mm | 0.25–0.30 mm if forced |
| Face cosmetics | Preferred | Scars + webs |
| When forced | — | Copy structure; cooling 40–60%; slower outer |

If PETG is forced: expect lost mini quality — document as exception in plan.

## Failure modes → first checks

| Symptom | Likely cause | Next |
|---|---|---|
| Eyes/texture gone | Layer thick / outer fast / support on face | [Lost detail](../troubleshooting/detalhe-perdido-miniatura.md) |
| Hair between limbs | Wet / hot / retract / travel | [Stringing](../qualidade-e-acabamento/stringing-e-retract.md) |
| Support welded to armor | Top Z low / no interface | [Hard supports](../troubleshooting/suporte-dificil-remover.md) |
| Base peeled | Dirty PEI / no brim | [Adhesion](../troubleshooting/falha-adesao.md) |
| Soft blobby ridges | Over-extrusion / hot | Flow ≤1.00; −5 °C |
| Gaps in walls | Under-extrusion / clog | [Under-extrusion](../troubleshooting/under-extrusion.md) |

## Calibration order (mini)

1. Clean PEI + bed cal → first layer
2. Dry PLA
3. Print 10–15 mm scrap with tree on a non-critical overhang
4. Adjust top Z ±0.05 mm if welded or scarred
5. Retract tower only if stringing remains
6. Outer wall −10 mm/s if detail soft

## Plan.md must cite

- This file path
- [miniaturas](../proposito/miniaturas.md) + geometry page
- Support type + top Z + interface
- Brim yes/no
- Any **validate on printer** items (retract, exact temp)

## Related

- [Miniatures](../proposito/miniaturas.md)
- [Organics & miniatures](../geometria/organicos-e-miniaturas.md)
- [Tree vs normal](suportes-arvore-vs-normal.md)
- [Lost detail](../troubleshooting/detalhe-perdido-miniatura.md)
- [Stringing](../qualidade-e-acabamento/stringing-e-retract.md)
- [Character profile](pla-personagem-detalhe-0.4.md)
- [Profiles index](INDEX.md)
- [Hub](../INDEX.md)

## Sources

- Bambu Studio A1 Mini 0.4 presets
- Purpose/geometry wiki nodes
- MakerWorld mini tuning patterns
- Ellis / Teaching Tech (resolution + retract)
