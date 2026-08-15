# Purpose — vases

## Summary

Hollow décor or planters. Prefer **spiral vase** when geometry allows; otherwise thin **normal** shells with little/no infill. Single-wall spiral **leaks** — liner or seal for real liquids. Geometry eligibility: [vessels & containers](../geometria/vasos-e-vasilhames.md). Profile: [pla-vaso-vase-mode-0.4](../perfis-a1-mini/pla-vaso-vase-mode-0.4.md).

Do not claim food-safe or chemical resistance from this wiki.

## When to use

| Criterion | Vases purpose? |
|---|---|
| Classification `vessel` | Yes |
| Top opening + closed base | Typical |
| Spiral eligibility unknown | Check geometry page first |
| Sculpture with arms/islands | Not vase — organics |
| Functional sealed tank | Out of scope |

## Decision tree

```text
vase / vessel purpose?
    │
    ├─ geometry single contour? ──► pla-vaso-vase-mode-0.4 + spiral ON
    ├─ handle / hole? ────────────► spiral OFF; walls 2–3; infill 0–5%
    ├─ liquid use? ───────────────► liner/seal; do not trust single wall
    └─ narrow base? ──────────────► brim; opening up
```

## A1 Mini rules

### Mode table

| Mode | Bottom | Walls | Infill | Support |
|---|---|---|---|---|
| Spiral | 4–6 | 1 (spiral) | 0 | none |
| Normal hollow | 4–6 | 2–3 | 0–5% | only if forced |
| Lined planter | as above | ≥2 | low | as geometry |

### Non-negotiables

1. Validate spiral in Studio preview (one loop/layer).
2. Profile [pla-vaso-vase-mode-0.4](../perfis-a1-mini/pla-vaso-vase-mode-0.4.md) when spiral.
3. If not spiral: walls 2–3, infill 0–5%, tops as needed.
4. Real liquid: waterproof (coating/liner) — single wall will seep.
5. Brim if narrow base; opening faces up.
6. Layer **0.16–0.28** for banding look; thicker line width **0.45–0.55** for stronger wall — **validate on printer**.
7. No classic supports in spiral mode.
8. Envelope ≤180³ mm with brim margin.

### Failure modes

| Symptom | Next |
|---|---|
| Spiral breaks mid-print | Extra contour → spiral OFF |
| Seepage | Liner/seal |
| Wavy wall | Steady speed; temp; flow |
| Tip-over | Brim |
| Internal strings | Dry; prefer PLA |
| Gaps | Extrusion / wet / volumetric |

## Suggested presets (PLA)

| Parameter | Value | Why |
|---|---|---|
| Spiral | on (if eligible) | Contour |
| Bottom layers | 4–6 | Base |
| Line width | 0.45–0.55 | Thicker wall |
| Layer | 0.16–0.28 | Banding |
| Infill / top | 0 / 0 spiral | Mode |
| Speed | steady moderate | Uniform thickness |
| Brim | if narrow | Stability |
| Skirt | 1–2 | Prime |

## Suggested presets (PETG)

Use when more flex/toughness needed; dry filament mandatory; expect more internal stringing.

| Parameter | Value | Why |
|---|---|---|
| Dry | mandatory | Bubbles/strings |
| Cooling | medium | Bond vs sag |
| Temp | tower | Width stability |
| Prefer PLA | for show spiral | Cosmetics |
| Functional jug | normal walls + liner | Not single-wall trust |

## Related

- [Vessel geometry](../geometria/vasos-e-vasilhames.md)
- [Vase profile](../perfis-a1-mini/pla-vaso-vase-mode-0.4.md)
- [Thin walls](../geometria/paredes-finas.md)
- [Orientation](../fatiamento/orientacao.md)
- [Brim / raft / skirt](../fatiamento/brim-raft-saia.md)
- [Layer height & speed](../fatiamento/altura-de-camada-e-velocidade.md)
- [Purpose INDEX](INDEX.md)
- [Hub](../INDEX.md)

## Sources

- Community vase mode pitfalls
- Bambu spiral vase concepts
- Playbook vase cheat-sheet row
- Single-wall leak reality (liner guidance)
