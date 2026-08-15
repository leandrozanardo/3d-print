# Organics & miniatures (geometry)

## Summary

Irregular **sculpture** meshes: local overhangs, islands, sub-mm detail, non-manifold-ish designer exports. Prioritize **noble-face orientation**, **tree** supports, **fine layers**, **slow outer wall**. Not vase mode. **PETG** is usually wrong for cosmetic minis (stringing, scar weld).

This page is the **geometry** branch. Intent/profile details live under [miniaturas](../proposito/miniaturas.md) and [personagens](../proposito/personagens.md).

## When to use

| Situation | Use this page |
|---|---|
| Tag `organic_mini` | Yes |
| RPG miniatures, busts, anime figures | Yes |
| Any “sculpture” mesh with islands | Yes |
| Flat mechanical bracket | No — [fits](encaixes-mecanicos.md) / tools |
| Spiral planter | No — [vessels](vasos-e-vasilhames.md) |

## Decision tree

```text
organic_mini?
    │
    ├─ RPG mini / diorama (~28–75 mm) ──► proposito/miniaturas + pla-miniatura-0.4
    ├─ statue / bust / anime figure ────► proposito/personagens + pla-personagem-detalhe-0.4
    ├─ decorative organic (no face) ────► proposito/decorativas + surface profile
    ├─ thin sword / antenna ────────────► also thin_wall rules
    └─ tiny base / tall pose ───────────► also tall_slender → brim, no raft
```

## A1 Mini rules

### Non-negotiables

1. Noble face up, or tilt **10–20°** if that cuts support without killing detail.
2. Layer **0.08–0.12 mm** for detail; **0.16** only if time-boxed draft.
3. Avoid **raft** (ruins base); brim if footprint tiny / tall slender.
4. Supports: **tree**; top Z distance ~**0.2 mm** PLA — **validate on printer**.
5. Never spiral vase on organics.
6. AMS multicolor: minimize swaps / flush waste ([AMS Lite](../hardware/a1-mini-ams-lite.md)).
7. Hide Z-seam on back/underside; slow outer wall **40–80 mm/s**.
8. Detect thin walls ON for spears/fingers.

### Concern matrix

| Concern | Prefer | Avoid |
|---|---|---|
| Support scars | tree + interface | dense normal on face |
| Base quality | brim if needed | raft |
| Detail | 0.08–0.12 + Detect thin walls | 0.28 draft on faces |
| Material | dry PLA | wet PETG on faces |
| Seam | back / aligned hidden | random on cheek |
| Speed | outer brake | max machine on outer |

### Orientation heuristics

| Goal | Rotation |
|---|---|
| Face detail free | Face up / slight tilt |
| Less support volume | Tilt 10–20° if islands shrink |
| Hide scars | Support behind / underside |
| Base flat on bed | Prefer designer base on PEI |
| Tall slender | Brim; slow outer; watch resonance |

### Failure modes

| Symptom | Cause | Next |
|---|---|---|
| Scarred face | Support on face / no interface | [Face & interface](../fatiamento/suportes-face-e-interface.md) |
| Lost micro detail | Layer coarse / width fat / wet | [Detail lost](../troubleshooting/detalhe-perdido-miniatura.md) |
| Tip-over mid print | Tiny base | Brim; [brim page](../fatiamento/brim-raft-saia.md) |
| Hair welded to support | Z too tight | ↑ top Z; tree tips |
| String fog | Wet / PETG / Z-hop | Dry; stay PLA |

## Suggested presets (PLA)

| Parameter | Value | Why |
|---|---|---|
| Profile | [pla-miniatura-0.4](../perfis-a1-mini/pla-miniatura-0.4.md) / [character](../perfis-a1-mini/pla-personagem-detalhe-0.4.md) | Named recipe |
| Layer | 0.08–0.12 | Detail |
| Support | tree, threshold 30–40° | Less scarring |
| Walls | 2–3 | Shell without bulk |
| Infill | 10–15% gyroid | Backbone only |
| Outer wall | 40–80 mm/s | Sharpness |
| Brim | if base ≲10–15 mm | Adhesion |
| Raft | off | Base quality |
| Cooling | high | Overhang islands |

## Suggested presets (PETG)

Avoid for cosmetic miniatures. If forced (e.g. outdoor figurine toughness):

| Parameter | Value | Why |
|---|---|---|
| Outer wall | very slow | Surface |
| Filament | dry mandatory | Strings |
| Support Z | 0.25–0.30 mm | Less weld |
| Expect | string cleanup + scar risk | Document in plan |
| Prefer | PLA + thicker walls instead | Cosmetics |

## Related

- [Classify geometry](classificar-geometria.md)
- [Purpose — miniatures](../proposito/miniaturas.md)
- [Purpose — characters](../proposito/personagens.md)
- [Overhangs](balancos-e-angulos.md)
- [Thin walls](paredes-finas.md)
- [Support strategy](../fatiamento/suportes-estrategia.md)
- [Hard-to-remove supports](../troubleshooting/suporte-dificil-remover.md)
- [AMS Lite](../hardware/a1-mini-ams-lite.md)
- [Geometry INDEX](INDEX.md)
- [Hub](../INDEX.md)

## Sources

- MakerWorld miniature profile patterns
- Bambu forum tree-on-minis patterns
- Ellis surface-quality / outer-wall notes
- Project playbook cheat-sheet (mini row)
