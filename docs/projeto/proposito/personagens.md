# Purpose — characters

## Summary

**Figures / character art**: miniature rules plus larger bases and optional **AMS Lite** multicolor. Facial detail beats speed. Prefer **PLA**; avoid PETG on faces. Geometry: [organics](../geometria/organicos-e-miniaturas.md). Profile: [pla-personagem-detalhe-0.4](../perfis-a1-mini/pla-personagem-detalhe-0.4.md). Overlaps [miniatures](miniaturas.md) when small/high detail — use this page when figure scale, face priority, or multicolor dominates.

## When to use

| Criterion | Characters? |
|---|---|
| Statues, anime figures, busts | Yes |
| Multicolor on demand (AMS Lite) | Yes |
| ~28 mm RPG mini mono | Often [miniaturas](miniaturas.md) enough |
| Mechanical tool | [Tools](ferramentas.md) |
| Spiral vase | [Vases](vasos.md) |

## Decision tree

```text
character / figurine?
    │
    ├─ apply miniaturas + organicos rules
    ├─ profile ──► pla-personagem-detalhe-0.4
    ├─ AMS? ──► group regions; minimize flush ([ams-lite](../hardware/a1-mini-ams-lite.md))
    ├─ hair/cape overhangs ──► tree + generous Z gap
    ├─ face supported? ──► interface mandatory; prefer reorient
    └─ hollow head OK if walls ≥2
```

## A1 Mini rules

### Non-negotiables

1. Base on [miniatures](miniaturas.md) + [organics](../geometria/organicos-e-miniaturas.md).
2. Profile [pla-personagem-detalhe-0.4](../perfis-a1-mini/pla-personagem-detalhe-0.4.md).
3. Multicolor: group regions; reduce flush — [AMS Lite](../hardware/a1-mini-ams-lite.md).
4. Hair/capes: tree supports + Z gap loose enough to release without chipping — **validate on printer**.
5. Hollow interiors OK for economy if walls ≥2.
6. Layer **0.08–0.12** on faces; never put support on face without interface.
7. Seam on back/base; outer wall **40–70 mm/s**.
8. No raft on bases; brim if small footprint.

### Area matrix

| Area | Support / surface |
|---|---|
| Face | no support if possible; else interface + gentle removal |
| Hair / cape | tree, threshold 30–40° |
| Base | brim if small; no raft |
| Multicolor | fewer swaps > perfect color count |
| Hands / props | Detect thin walls |

### AMS Lite notes

| Rule | Why |
|---|---|
| Dry all slots | Marble + grind |
| Minimize face swaps | Purge scars time |
| Prime tower if many changes | Pressure stability |
| Don’t mix PLA/PETG in one job | Temp/purge hazard |
| Path kink → false underextrusion | Fix path first |

### Failure modes

| Symptom | Next |
|---|---|
| Face scarred | Reorient; interface; ↑ Z |
| Color marble | +flush carefully |
| Load fail mid-face | AMS path / dry |
| Lost eyes/nose | Layer/width/temp — [detail](../troubleshooting/detalhe-perdido-miniatura.md) |
| Cape welded | ↑ support Z; cold remove |

## Suggested presets (PLA)

| Parameter | Value | Why |
|---|---|---|
| Layer | 0.08–0.12 | Face |
| Support | tree | Organic |
| Threshold | 30–40° | Islands |
| AMS flush | minimum viable | Waste — **validate** |
| Outer speed | 40–70 mm/s | Detail |
| Walls / infill | 2–3 / 10–20% | Shell |
| Interface | 2–4 on faces | Finish |
| Top Z | ~0.2 mm | **validate** |
| Brim | if small base | Tip-over |
| Detect thin walls | on | Props |

## Suggested presets (PETG)

Avoid for faces; stringing destroys detail.

| If forced | Stance |
|---|---|
| Mono outdoor figure | Dry; slow outer; loose Z |
| Multicolor PETG | Strongly discourage |
| Prefer | PLA + thicker walls |

## Related

- [AMS Lite](../hardware/a1-mini-ams-lite.md)
- [Miniatures](miniaturas.md)
- [Organics geometry](../geometria/organicos-e-miniaturas.md)
- [Support face & interface](../fatiamento/suportes-face-e-interface.md)
- [Support strategy](../fatiamento/suportes-estrategia.md)
- [Character profile](../perfis-a1-mini/pla-personagem-detalhe-0.4.md)
- [Purpose INDEX](INDEX.md)
- [Hub](../INDEX.md)

## Sources

- Bambu forum multicolor character patterns
- AMS Lite flush/prime tower practice (conceptual)
- Project character profile + playbook rows
- Miniature surface-quality notes (Ellis-style)
