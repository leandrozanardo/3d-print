# Supports — face & interface

## Summary

Supported-face quality depends on **top Z/XY distance**, **interface pattern**, and density. Too close → **weld**; too far → **sag**. Always use **interface** on faces (characters, minis). Values: **validate on printer** with a coupon — do not invent 0.01 mm “truth.”

Use after [support strategy](suportes-estrategia.md) has chosen type/threshold.

## When to use

| Situation | Use this page |
|---|---|
| Severe scars | Yes |
| Supports won’t release / leave hairs | Yes |
| PETG stuck to part | Yes |
| After strategy type/threshold chosen | Yes |
| Choosing tree vs normal only | Prefer strategy page first |

## Decision tree

```text
scarred or welded support face?
    │
    ├─ welded / won't release ──► ↑ Z and/or XY distance; more open pattern
    ├─ sag / rough undersurface ──► ↓ Z slightly; ↑ interface layers
    ├─ PETG stuck ──► start 0.25–0.30 Z; cold remove first
    ├─ face detail ──► never support without interface
    └─ still bad after coupon ──► reorient to free the face
```

## A1 Mini rules

### Starting distances

| Parameter | PLA start | PETG start |
|---|---|---|
| Top Z distance | 0.2 mm | 0.25–0.30 mm |
| Top XY distance | 0.35–0.5 mm | 0.45–0.6 mm |
| Interface layers | 2–4 | 3–5 |
| Interface pattern | rectilinear / default | default |
| Base pattern spacing | profile default | slightly more open if sticking |

### Non-negotiables

1. Faces: never support without interface.
2. Remove supports **cold**; heat only if PETG welded (careful — softens part).
3. Tree tip density: enough to hold islands, not carpet the face.
4. After change: reprint **coupon**, not the full character first.
5. Post cleanup: [post-processing](../qualidade-e-acabamento/pos-processamento.md).
6. Document final Z/XY in `plan.md`.

### Symptom → first knob

| Symptom | First knob |
|---|---|
| Welded | ↑ top Z |
| Sag | ↓ top Z / ↑ interface layers |
| Hard peel (PETG) | ↑ Z + XY; dry filament |
| Pitting | interface on + pattern |
| Hairs / fuzz | cold remove; light sand; check Z-hop strings |
| Interface fused to part | ↑ Z; open pattern |

### Purpose lean

| Purpose | Interface stance |
|---|---|
| Mini / character faces | Mandatory; gentle Z |
| Decorative underside | Interface if viewed |
| Tool non-cosmetic | Can trade scars for strength |
| PETG functional | Looser Z than PLA |

### Failure modes tied elsewhere

| If… | Also check |
|---|---|
| Whole part welded to PEI | [Bed adhesion](../hardware/a1-mini-mesa-e-adesao.md) |
| Strings look like support hairs | [Stringing](../qualidade-e-acabamento/stringing-e-retract.md) |
| Support type wrong | [Strategy](suportes-estrategia.md) |

## Suggested presets (PLA)

| Parameter | Value | Why |
|---|---|---|
| Top Z | 0.2 mm start | Removable — **validate** |
| Top XY | 0.35–0.5 mm | Lateral release |
| Interface layers | 2–4 | Finish |
| On faces | always | Detail |
| Coupon | yes before batch | Save filament |

Bind to named profile; don’t invent finer precision than coupon results.

## Suggested presets (PETG)

| Parameter | Value | Why |
|---|---|---|
| Top Z | 0.25–0.30 mm | Sticks harder |
| Top XY | 0.45–0.6 mm | Release |
| Interface layers | 3–5 | Separation |
| Dry | mandatory | Weld + string |
| Removal | cold | Coating/part safety |
| Prefer | less support on cosmetics | Scar risk |

## Related

- [Support strategy](suportes-estrategia.md)
- [Hard-to-remove supports](../troubleshooting/suporte-dificil-remover.md)
- [Post-processing](../qualidade-e-acabamento/pos-processamento.md)
- [Characters](../proposito/personagens.md)
- [Miniatures](../proposito/miniaturas.md)
- [PETG](../materiais/petg.md)
- [Slicing INDEX](INDEX.md)
- [Hub](../INDEX.md)

## Sources

- Ellis support interface notes
- Prusa support KB adapted
- Community PETG support-weld patterns
- Coupon-first calibration discipline
