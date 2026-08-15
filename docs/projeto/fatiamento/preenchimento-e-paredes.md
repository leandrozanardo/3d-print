# Walls & infill

## Summary

In FFF practice, **walls** dominate bending strength; **infill** prevents collapse and anchors tops. Adding wall loops usually beats blind high infill (CNC Kitchen pattern). Match shells to purpose. Line width default ~**0.42 mm** on 0.4 mm nozzle.

Thin regions: [thin walls](../geometria/paredes-finas.md). Tools: [ferramentas](../proposito/ferramentas.md).

## When to use

| Situation | Use this page |
|---|---|
| Setting tool vs decorative vs mini profiles | Yes |
| Pillowing / holed tops | Yes — more top shells |
| Part too heavy/slow | Yes — cut infill, keep walls |
| Spiral vase | 1 wall / 0 infill by mode |
| Only adhesion fail | Prefer bed/brim pages |

## Decision tree

```text
pick shells by purpose
    │
    ├─ miniature / character ──► 2–3 walls, 10–20% gyroid
    ├─ decorative ────────────► 2–3 walls, 10–15%
    ├─ tool ──────────────────► 4–6 walls, 25–50%+
    ├─ spiral vase ───────────► 1 spiral wall, 0 infill
    └─ local solid boss ──────► modifiers / 100% zone — not global 100%
```

## A1 Mini rules

### Purpose table

| Purpose | Walls | Infill | Pattern |
|---|---|---|---|
| Miniature | 2–3 | 10–15% | gyroid |
| Decorative | 2–3 | 10–15% | gyroid / cubic |
| Tool | 4–6 | 25–50% | gyroid / cubic |
| Character | 2–3 | 10–20% | gyroid |
| Vase spiral | 1 (spiral) | 0 | — |
| PETG functional | ≥3–4 | ≥25% | gyroid / cubic |

### Non-negotiables

1. Top/bottom shells: ≥4–6 on visible flat faces.
2. 100% infill only for local need (weight/solid boss) — expensive.
3. PETG functional: walls ≥3.
4. Thin regions: Detect thin walls ON when needed.
5. Wall order: outer-first for surface-critical décor when available.
6. Line width ~0.42 mm default; widen for tools, not mini faces.
7. Document wall/infill in `plan.md`.

### Symptom → first fix

| Symptom | First fix |
|---|---|
| Weak flex | +walls |
| Soft top / pillow | +top shells / denser top |
| Heavy & slow | −infill, keep walls |
| Gaps in thin art | Detect thin walls / thicken mesh |
| Delam (PETG) | ↓ cooling; +temp carefully; dry |
| Sparse look through walls | +walls before +infill |

### Pattern notes

| Pattern | Lean |
|---|---|
| Gyroid | Good all-round; isotropic-ish |
| Cubic | Fine; watch resonance on tall |
| Grid | Simple; crossings may show |
| Lightning / sparse | Décor only; not tools |

## Suggested presets (PLA)

| Parameter | Value | Why |
|---|---|---|
| Line width | 0.42 | Consistency |
| Sparse infill | see purpose table | Intent |
| Wall order | outer-first for décor | Seam / gloss |
| Top shells | 4–6 visible flats | Anti-pillow |
| Detect thin walls | organics ON | Gaps |
| Profiles | named intent profiles | [Profiles](../perfis-a1-mini/INDEX.md) |

## Suggested presets (PETG)

| Parameter | Value | Why |
|---|---|---|
| Walls | +1 vs PLA equivalent | Bonding / toughness |
| Infill | ≥25% functional | Collapse resistance |
| Line width | 0.42–0.45 | Weld |
| Cooling | medium | Strength |
| 100% global | avoid | Time/warp |

## Related

- [Thin walls](../geometria/paredes-finas.md)
- [Tools](../proposito/ferramentas.md)
- [Extrusion & nozzle](../hardware/a1-mini-extrusao-e-bico.md)
- [Profiles](../perfis-a1-mini/INDEX.md)
- [Layer height & speed](altura-de-camada-e-velocidade.md)
- [Slicing INDEX](INDEX.md)
- [Hub](../INDEX.md)

## Sources

- CNC Kitchen wall/infill research summaries
- Bambu Studio shell/infill concepts
- Project purpose cheat-sheet wall counts
- Direct-drive line-width packing practice
