# Vessels & containers (geometry)

## Summary

Hollow parts with a **continuous contour** are candidates for **Spiral vase** (vase mode): 1 wall, 0 infill, 0 top. Mesh must be watertight and each layer a **single loop**. Handles, holes, or islands break spiral — use normal walls instead. Real liquids need liner/seal; single-wall spiral **will seep**.

Geometry eligibility first; purpose/profile under [vasos](../proposito/vasos.md) and [pla-vaso-vase-mode-0.4](../perfis-a1-mini/pla-vaso-vase-mode-0.4.md).

## When to use

| Situation | Use this page |
|---|---|
| Tag `vessel` | Yes |
| Hollow décor, planters, cups (decorative) | Yes |
| Checking spiral eligibility in preview | Yes |
| Organic sculpture with pockets | Usually `organic_mini` instead |
| Watertight functional tank claim | Out of scope — do not claim |

## Decision tree

```text
vessel?
    │
    ├─ single continuous loop per layer in preview? ──► spiral ON
    │         └─ bottom 3–6 solid layers; no classic supports
    ├─ handle / hole / island? ──► spiral OFF
    │         └─ walls 2–3, infill 0–5%, tops as needed
    ├─ multi-chamber? ──► spiral OFF; per-purpose shells
    └─ real liquid use? ──► liner / seal; never trust single wall alone
```

## A1 Mini rules

### Geometry → mode

| Geometry | Mode | Walls / infill |
|---|---|---|
| Single contour hollow | Spiral vase | 1 / 0 |
| Contour + handle | Normal | 2–3 / 0–5% |
| Multi-chamber | Normal | per purpose |
| Liquid duty | Normal + liner | do not trust single wall |
| Thin decorative shell | Normal or spiral | see thin walls |

### Non-negotiables

1. Preview: exactly **one continuous loop per layer** for spiral.
2. Bottom layers **3–6** for a closed base.
3. Line width may rise to **0.5–0.6 mm** in vase for a thicker wall — **validate on printer** (flow).
4. Steady speed; avoid harsh accel that makes wall thickness wander.
5. No classic supports in spiral vase.
6. PETG vase: possible; more internal stringing — dry filament.
7. Opening faces **up**; brim if base is narrow (`tall_slender`).
8. Do not claim food-safe / chemical tank from this wiki.

### Spiral preview checklist

| Check | Pass | Fail |
|---|---|---|
| One loop/layer | Spiral candidate | Spiral OFF |
| Closed base | Bottom shells set | Add bottoms |
| No floating islands | OK | Support or redesign (normal mode) |
| Wall thickness goal | Wider line or accept thin | Thicken mesh |
| Fits 180³ with brim | OK | Scale / refuse |

### Failure modes

| Symptom | Cause | Next |
|---|---|---|
| Spiral “breaks” mid-height | Extra contour / hole | Spiral OFF |
| Seepage | Single wall | Liner/seal |
| Wavy thickness | Accel / volumetric / temp | Steady speed; temp tower |
| Base warps | Narrow footprint | Brim; [adhesion](../hardware/a1-mini-mesa-e-adesao.md) |
| Internal hair nest | Wet PETG / stringing | Dry; PLA preferred |
| Gaps in wall | Underextrusion / wet | [Extrusion](../hardware/a1-mini-extrusao-e-bico.md) |

## Suggested presets (PLA)

| Parameter | Value | Why |
|---|---|---|
| Profile | [pla-vaso-vase-mode-0.4](../perfis-a1-mini/pla-vaso-vase-mode-0.4.md) | Recipe |
| Spiral vase | on | Single contour |
| Bottom | 4–6 | Close base |
| Layer | 0.16–0.28 | Banding aesthetic |
| Line width | 0.45–0.55 | Stronger single wall |
| Infill / top | 0 / 0 in spiral | Mode definition |
| Brim | if narrow base | Tip-over |
| Outer/steady speed | moderate constant | Uniform wall |

Non-spiral hollow PLA: walls 2–3, infill 0–5%, bottoms 4–6, tops as needed.

## Suggested presets (PETG)

| Parameter | Value | Why |
|---|---|---|
| Spiral vase | on if geometry OK | Same eligibility rules |
| Temp stable | tower | Avoid width drift |
| Dry filament | mandatory | Bubbles / string |
| Cooling | medium | Bond vs sag |
| Prefer | PLA for show vases | Cosmetics |
| Functional jug | normal walls + liner | Not single-wall trust |

## Related

- [Classify geometry](classificar-geometria.md)
- [Purpose — vases](../proposito/vasos.md)
- [Thin walls](paredes-finas.md)
- [Orientation](../fatiamento/orientacao.md)
- [Brim / raft / skirt](../fatiamento/brim-raft-saia.md)
- [Layer height & speed](../fatiamento/altura-de-camada-e-velocidade.md)
- [Geometry INDEX](INDEX.md)
- [Hub](../INDEX.md)

## Sources

- Bambu Studio spiral vase docs (concept)
- Community vase-mode pitfalls (multi-contour breaks)
- Project playbook vase row
- Flow/line-width practice for single-wall strength
