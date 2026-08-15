# Supports — strategy

## Summary

Choose **tree vs normal**, **threshold**, and **paint-on** regions. Goal: support that holds during print and removes without destroying detail. Prefer **reorient** over blind support. Type comparison: [tree vs normal](../perfis-a1-mini/suportes-arvore-vs-normal.md). After type/threshold, tune gaps on [face & interface](suportes-face-e-interface.md).

Golden rule (playbook): prefer **firm, removable** supports over “zero support” if surface quality collapses.

## When to use

| Situation | Use this page |
|---|---|
| Any unavoidable overhang | Yes |
| Before dialing interface distances | Yes |
| Spiral vase | Supports = none |
| Choosing tree vs normal | Yes |

## Decision tree

```text
support needed after orientation?
    │
    ├─ spiral vase ──► none
    ├─ mini / character / organic ──► tree, 30–40°
    ├─ straight slots / mechanical blocks ──► normal/snug, 30–45°
    ├─ large flat with islands ──► normal + paint, ~45°
    ├─ decorative surface-first ──► reorient; tree or none; 40–50° if forced
    ├─ tool holes ──► avoid; reorient
    └─ cosmetic supported face ──► interface ≥2 + tune Z/XY
```

## A1 Mini rules

### Case → type → threshold

| Case | Type | Threshold |
|---|---|---|
| Miniature / character | tree | 30–40° |
| Straight blocks / slots | normal / snug | 30–45° |
| Large flat + islands | normal | ~45° + paint |
| Decorative (surface first) | tree or none | 40–50° if forced |
| Tool holes | avoid; reorient | — |
| Spiral vase | none | — |
| PETG functional | tree or normal by geo | 30–35° start |

### Non-negotiables

1. Reorient before adding blind support.
2. Avoid support inside critical holes.
3. Interface layers ≥2 on cosmetic faces.
4. Start from Bambu preset of the chosen named profile, then tune.
5. Firm removable > fragile “zero support” that ruins overhangs.
6. Document type, threshold, paint regions in `plan.md`.
7. After strategy → [face & interface](suportes-face-e-interface.md).

### Tree vs normal (short)

| | Tree | Normal / snug |
|---|---|---|
| Best for | Organics, minis, characters | Flats, slots, mechanical blocks |
| Scar style | Smaller tips | Broader contact |
| Stability | Watch thin trunks | High on large areas |
| Removability | Usually easier on organics | Can weld on PETG if Z tight |

### Failure modes

| Symptom | First change |
|---|---|
| Scar carpet on face | Tree + interface; reorient |
| Tip collapses mid-air | Denser tree / normal patch |
| Welded forever | ↑ Z (esp. PETG) |
| Part tips from support yank | Better Z; cold remove |
| Support inside hole | Reorient |

### Do / don’t

| Do | Don’t |
|---|---|
| Paint critical regions | Trust auto on every cheek |
| Match type to geometry | Tree on every mechanical slot blindly |
| Coupon new filament | Change 5 knobs at once |

## Suggested presets (PLA)

| Parameter | Value | Why |
|---|---|---|
| Type | tree (organic) / normal (mechanical) | Scar vs stability |
| Threshold | 30–40° organics; 40–50° décor | Safety vs scars |
| Top Z distance | 0.2 mm | **validate** removal |
| Top interface | 2–4 layers | Finish |
| Paint-on | faces / islands | Control |
| Raft under support | usually off | Cleanup |

## Suggested presets (PETG)

| Parameter | Value | Why |
|---|---|---|
| Z distance | 0.25–0.3 mm | PETG sticks more |
| Interface | on | Separation |
| Threshold | 30–35° | Earlier support |
| Type | by geometry | Same logic |
| Dry | mandatory | Stick + string |
| Removal | cold first | Protect part |

## Related

- [Face & interface](suportes-face-e-interface.md)
- [Orientation](orientacao.md)
- [Overhangs](../geometria/balancos-e-angulos.md)
- [Hard-to-remove supports](../troubleshooting/suporte-dificil-remover.md)
- [Tree vs normal](../perfis-a1-mini/suportes-arvore-vs-normal.md)
- [Miniatures](../proposito/miniaturas.md) · [Tools](../proposito/ferramentas.md)
- [Slicing INDEX](INDEX.md)
- [Hub](../INDEX.md)

## Sources

- Bambu Studio support docs (concepts)
- Forum tree-support patterns
- Playbook firm-removable rule
- Ellis support strategy notes
