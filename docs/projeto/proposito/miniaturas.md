# Purpose — miniatures

## Summary

Small **high-detail** parts (RPG, diorama, ~**28–75 mm**). Priority: Z resolution, removable **tree** supports, slow outer wall, **dry PLA**. PETG is not recommended for cosmetic minis. Geometry branch: [organics & miniatures](../geometria/organicos-e-miniaturas.md). Named profile: [pla-miniatura-0.4](../perfis-a1-mini/pla-miniatura-0.4.md).

Success = readable faces/weapons after support removal — not max machine speed.

## When to use

| Criterion | Miniatures purpose? |
|---|---|
| Scale ~28–75 mm or features <0.5 mm visible | Yes |
| Tag `organic_mini` | Expected |
| Load-bearing tool / clip | No → [tools](ferramentas.md) |
| Large statue / bust with AMS | Often [characters](personagens.md) |
| Spiral planter | No → [vases](vasos.md) |

## Decision tree

```text
miniature?
    │
    ├─ tag organic_mini? ──► yes (else re-check geometry)
    ├─ profile ──► pla-miniatura-0.4
    ├─ orient noble face; support on back
    ├─ layer 0.08–0.12; tree; brim if tiny base
    ├─ Detect thin walls ON for spears/fingers
    ├─ raft? ──► NEVER for base quality
    └─ post: careful support peel + fine brush
```

## A1 Mini rules

### Non-negotiables

1. Profile [pla-miniatura-0.4](../perfis-a1-mini/pla-miniatura-0.4.md).
2. Layer **0.08–0.12**; walls **2–3**.
3. Infill **10–15%** gyroid/cubic — backbone only.
4. Orient noble face; accept support on reverse.
5. Support threshold **30–40°**; tree + interface on faces.
6. No raft; brim if contact <~10–15 mm or tall slender.
7. Post: careful removal — [post-processing](../qualidade-e-acabamento/pos-processamento.md).
8. If detail vanishes: [lost detail](../troubleshooting/detalhe-perdido-miniatura.md) + [thin walls](../geometria/paredes-finas.md).
9. Build volume 180³ mm with brim/support margin.

### Decision matrix

| Decision | Prefer | Avoid |
|---|---|---|
| Support | tree | raft / dense normal on face |
| Speed | slow outer 40–80 mm/s | max machine speed on outer |
| Material | PLA dry | PETG cosmetic |
| Seam | back / underside | cheek / forehead |
| Cooling | high | zero fan “for strength” on faces |
| Base | brim if needed | raft |

### Geometry tags often combined

| Tag | Extra action |
|---|---|
| `thin_wall` | Detect thin walls; accept fragility |
| `tall_slender` | Brim; slow outer; watch tip-over |
| `overhang_heavy` | Tree; threshold 30–40° |
| `flat_plate` base | Clean PEI; no glue habit |

### Failure modes

| Symptom | First checks |
|---|---|
| Scarred face | Support on face / Z too tight |
| Lost detail | Layer 0.2+, fat width, wet, temp high |
| Tip-over | Tiny base → brim |
| String fog | Dry; retract; avoid PETG |
| Hard supports | ↑ Z; interface; [hard supports](../troubleshooting/suporte-dificil-remover.md) |

## Suggested presets (PLA)

| Parameter | Value | Why |
|---|---|---|
| Layer height | 0.08–0.12 | Detail |
| Outer wall speed | 40–80 mm/s | Sharpness |
| Support | tree, 30–40° | Removability |
| Top Z distance | ~0.2 mm | **validate** |
| Interface layers | 2–4 | Face finish |
| Brim | if small base | Adhesion |
| Walls / infill | 2–3 / 10–15% | Light shell |
| Line width | 0.42 mm | Don’t fatten faces |
| Cooling | high after L1–2 | Overhangs |
| Detect thin walls | on | Spears/fingers |

## Suggested presets (PETG)

**Not recommended** for cosmetic miniatures.

| If forced | Stance |
|---|---|
| Outer | Very slow |
| Dry | Mandatory |
| Support Z | 0.25–0.30 mm |
| Expect | Strings + scar cleanup |
| Prefer | Stay PLA |

## Related

- [Organics geometry](../geometria/organicos-e-miniaturas.md)
- [Characters](personagens.md)
- [Lost miniature detail](../troubleshooting/detalhe-perdido-miniatura.md)
- [Support strategy](../fatiamento/suportes-estrategia.md)
- [Support face & interface](../fatiamento/suportes-face-e-interface.md)
- [PLA](../materiais/pla.md)
- [Purpose INDEX](INDEX.md)
- [Hub](../INDEX.md)

## Sources

- MakerWorld mini preset patterns
- Ellis surface-quality notes
- Project playbook mini cheat-sheet row
- Bambu tree-support on organics (community patterns)
