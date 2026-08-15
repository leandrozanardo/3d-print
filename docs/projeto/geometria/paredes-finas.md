# Thin walls

## Summary

With a **0.4 mm** nozzle, walls thinner than ~**0.8 mm** often get a single intermittent extrusion line (lost detail / weak shell). Target thickness ≈ **integer × line width** (e.g. 0.84 / 1.26 / 1.68 mm ≈ 2 / 3 / 4 lines at **0.42 mm** width). Spiral vase is the intentional exception: one wall by design.

Thin walls are a **geometry** problem first. Slicer “Detect thin walls” can fill gaps; it cannot invent strength for handled tools. Mode B may allow light thicken/repair — see [when to edit mesh](../workflow/quando-editar-malha.md).

## When to use

| Situation | Use this page |
|---|---|
| Tag `thin_wall` | Yes |
| Characters with swords / antennae / ears | Yes |
| Non-spiral vessels with thin shells | Yes |
| Studio wall preview shows gaps | Yes |
| Lost miniature detail | Yes + [troubleshooting](../troubleshooting/detalhe-perdido-miniatura.md) |
| Spiral vase eligible | Cross-check [vessels](vasos-e-vasilhames.md) |

## Decision tree

```text
thin_wall detected?
    │
    ├─ vase spiral eligible? ──► spiral (1 wall by design) → pla-vaso-vase-mode-0.4
    ├─ tool / handled part? ──► thicken mesh or ≥3–4 wall loops
    ├─ miniature cosmetic? ──► may accept 1–2 walls + document fragility
    ├─ preview gaps only? ────► Detect thin walls ON + check line width
    └─ feature <~0.4 mm? ─────► cannot print reliably with 0.4 nozzle — accept loss or remesh
```

## A1 Mini rules

### Thickness → line multiples (@ 0.42 mm)

| Thickness (approx) | Lines @ 0.42 mm | Guidance |
|---|---|---|
| <0.6 mm | <2 intermittent | Expect loss; thicken or accept |
| ~0.84 mm | 2 | Minimum cosmetic shell |
| ~1.26 mm | 3 | Handled / light tool |
| ≥1.68 mm | ≥4 | Structural skins |
| Spiral vase | 1 by design | Optional wider line 0.45–0.55 |

### Non-negotiables

1. Inspect with `python -m core inspect-mesh` and Studio wall preview.
2. Tools: thicken mesh (mode B light ops) if purpose demands strength.
3. Miniatures: single-wall aesthetics sometimes OK — **document fragility** in `plan.md`.
4. Any handled part: `Wall loops` ≥ 2 (prefer ≥ 3).
5. Avoid **0% infill + 1 wall** outside spiral vase mode.
6. Line width **0.42 mm** default; do not chase 0.2 mm features with 0.4 mm nozzle.
7. Wider lines (0.48–0.55) help bonding on tools — hurt facial micro-detail.

### Purpose matrix

| Purpose | Thin-wall stance | Walls / detect |
|---|---|---|
| Miniature | Accept fragility; preserve look | 2–3; Detect ON |
| Character | Same + hair strands | 2–3; Detect ON |
| Decorative | Prefer ≥2 solid shells | 2–3 |
| Tool | Thicken or fail closed | 3–6; Detect optional |
| Vase spiral | One wall intentional | Spiral ON |
| Vase + handle | Not spiral | 2–3 + low infill |

### Failure modes

| Symptom | Cause | Next |
|---|---|---|
| Missing perimeters in preview | Width packing / Detect off | Detect thin walls; adjust width |
| Printed but snaps | 1 wall + 0 infill | +walls or thicken |
| Detail melted blob | Temp high + fat width | [Detail lost](../troubleshooting/detalhe-perdido-miniatura.md) |
| Gaps at speed | Volumetric / underextrusion | [Extrusion](../hardware/a1-mini-extrusao-e-bico.md) |
| “Walls” still hollow | Spiral mistaken for normal | Check vase mode |

### Do / don’t

| Do | Don’t |
|---|---|
| Match thickness to integer lines | Assume 0.4 nozzle prints 0.3 art |
| Document accepted fragility | Ship tools with 1-wall shells silently |
| Prefer mesh thicken for tools | Only bump infill % for skin strength |
| Use Detect thin walls on minis | Blind 0.55 width on faces |

## Suggested presets (PLA)

| Parameter | Value | Why |
|---|---|---|
| Line width | 0.42 mm | Predictable packing |
| Wall loops | 2–4 by purpose | Integrity |
| Detect thin walls | on for organics | Fill gaps |
| Infill | ≥15% if not vase | Backbone |
| Layer | 0.08–0.12 minis; 0.16–0.20 tools | Intent |
| Profiles | mini / character / tool / vase | [Profiles](../perfis-a1-mini/INDEX.md) |

## Suggested presets (PETG)

| Parameter | Value | Why |
|---|---|---|
| Wall loops | 3–5 | Functional parts |
| Line width | 0.42–0.45 mm | Better weld |
| Thin cosmetic minis | Avoid PETG | Stringing |
| Detect thin walls | on if shells critical | Gaps worse when wet |
| Dry first | mandatory | Foam looks like missing walls |

## Related

- [Classify geometry](classificar-geometria.md)
- [Walls & infill](../fatiamento/preenchimento-e-paredes.md)
- [Vessels](vasos-e-vasilhames.md)
- [Lost miniature detail](../troubleshooting/detalhe-perdido-miniatura.md)
- [When to edit mesh](../workflow/quando-editar-malha.md)
- [Extrusion & nozzle](../hardware/a1-mini-extrusao-e-bico.md)
- [Geometry INDEX](INDEX.md)
- [Hub](../INDEX.md)

## Sources

- CNC Kitchen walls vs strength
- Bambu Studio thin-wall detection (concept)
- 0.4 mm nozzle packing practice (≈105% line width)
- Project mode B mesh-edit boundaries
