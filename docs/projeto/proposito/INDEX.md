# Purpose

## Summary

**Purpose** (part intent) sets trade-offs: detail vs strength vs surface vs spiral. Combine with [geometry tags](../geometria/INDEX.md), then pick a **named A1 Mini profile**. Purpose does not replace geometry — a “tool” that is actually an organic mini still needs tree supports and fine layers.

Playbook order: inspect → geometry tags → **purpose** → profile → slicing refinements.

## When to use

| Moment | Action |
|---|---|
| After geometry classification | Choose intent page below |
| Conflict (pretty vs strong) | Prefer explicit purpose; document trade-off in `plan.md` |
| Choosing PLA vs PETG | Tools / heat / impact → consider PETG |
| Multicolor figure | Characters + AMS Lite |
| Hollow décor with opening | Vases (check spiral eligibility) |

## Decision tree (folder entry)

```text
geometry tags known?
  ├─ organic_mini + small scale → miniaturas
  ├─ organic_mini + figure/bust/AMS → personagens
  ├─ mechanical_fit / load / clips → ferramentas
  ├─ vessel / hollow opening → vasos (geometry spiral check)
  ├─ surface-first décor, not mini/vase → decorativas
  └─ unclear → default PLA decorative or ask; never invent precision
```

## Cheat-sheet (playbook)

| Intent | Start profile | Layer | Notes |
|---|---|---|---|
| Miniature | `pla-miniatura-0.4` | 0.08–0.12 | Tree; slow outer |
| Character | `pla-personagem-detalhe-0.4` | 0.08–0.12 | Face detail; AMS care |
| Tool | `pla-ferramenta-resistente-0.4` or `petg-funcional-0.4` | 0.16–0.20 | Walls beat blind high infill |
| Decorative | `pla-decorativo-superficie-0.4` | 0.12–0.16 | Hide Z-seam |
| Vase | `pla-vaso-vase-mode-0.4` | 0.16–0.28 | Spiral only if single contour |

## A1 Mini rules

| Rule | Guidance |
|---|---|
| Scope | A1 Mini, 0.4 mm, Bambu Studio |
| Materials | PLA primary; PETG documented for functional |
| False precision | Mark **validate on printer** |
| Cite in plan | Every `plan/*.md` lists purpose + profile pages used |
| Firm supports | Prefer removable firm supports over ruined overhangs |

### Pages

| Page | One-liner | Geometry tags often seen |
|---|---|---|
| [Miniatures](miniaturas.md) | Small high-detail; tree + fine Z | `organic_mini`, `thin_wall`, `tall_slender` |
| [Tools](ferramentas.md) | Functional; walls, fits, load axis | `mechanical_fit`, `overhang_heavy` |
| [Decorative](decorativas.md) | Surface-first; hide seam | mild overhangs, `flat_plate` |
| [Vases](vasos.md) | Spiral when eligible; else thin shells | `vessel` |
| [Characters](personagens.md) | Figure/bust; mini rules + AMS | `organic_mini`, AMS path |

### PLA vs PETG by purpose

| Purpose | PLA | PETG |
|---|---|---|
| Miniatures | **Default** | Avoid cosmetics |
| Characters | **Default** (+ AMS) | Avoid faces |
| Decorative | **Default** | Outdoor-ish OK w/ strings |
| Vases | **Default** spiral | Possible if dry |
| Tools | Often enough | Impact / ~60–70 °C / layer fail |

## Conflict resolution

| Conflict | Prefer |
|---|---|
| Pretty vs strong on same part | Split jobs, or document surface sacrifice on non-view faces |
| Mini detail vs PETG toughness | Stay PLA unless load proves otherwise |
| Spiral look vs handle geometry | Spiral OFF; normal thin shells |
| AMS colors vs face quality | Fewer swaps > more colors |

Document the chosen trade-off in `plan.md` with wiki paths cited.

## Suggested presets (PLA)

Use child pages + [profiles INDEX](../perfis-a1-mini/INDEX.md). Do not invent a sixth anonymous “custom max quality” without documenting deltas in `plan.md`.

| Intent | Profile anchor |
|---|---|
| Mini | `pla-miniatura-0.4` |
| Character | `pla-personagem-detalhe-0.4` |
| Tool | `pla-ferramenta-resistente-0.4` |
| Decorative | `pla-decorativo-superficie-0.4` |
| Vase | `pla-vaso-vase-mode-0.4` |

## Suggested presets (PETG)

Anchor: [petg-funcional-0.4](../perfis-a1-mini/petg-funcional-0.4.md) for tools that outgrow PLA. Dry first — [PETG](../materiais/petg.md). Not for cosmetic minis/faces.

## Related

- [Hub](../INDEX.md)
- [How to use this wiki](../00-como-usar-esta-wiki.md)
- [Geometry](../geometria/INDEX.md)
- [Profiles](../perfis-a1-mini/INDEX.md)
- [Slicing](../fatiamento/INDEX.md)
- [Hardware](../hardware/INDEX.md)
- [Materials](../materiais/INDEX.md)
- [Playbook](../../../playbook.md)

## Sources

- Locked project part-intent decisions (`start_plan.md`)
- Playbook decision cheat-sheet
- Named profile contracts under `perfis-a1-mini/`
