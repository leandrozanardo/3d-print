# Slicing (Bambu Studio)

## Summary

**Process-setting** decisions on A1 Mini after geometry tags + purpose → named profile: **orientation**, supports, walls/infill, layer/speed, brim/raft/skirt. This folder refines the recipe — it does not replace purpose or material pages.

Order: lock **orientation** → choose **support strategy** → tune **face/interface** → set **walls/infill** → bind **layer/speed** → pick **adhesion helpers**.

## When to use

| Moment | Action |
|---|---|
| After profile pick | Refine here |
| Preview shows huge support volume | Revisit orientation first |
| Scarred or welded faces | Face & interface |
| Weak part / heavy print | Walls & infill |
| Ringing / time trade | Layer height & speed |
| Tip-over / peel | Brim / raft / skirt + bed page |

## Decision tree (folder entry)

```text
profile chosen?
  ├─ lock orientation (lever #1)
  ├─ support needed after rotation?
  │     ├─ spiral vase → none
  │     ├─ organic → tree
  │     └─ mechanical blocks → normal/snug
  ├─ tune Z/XY interface on cosmetic faces
  ├─ walls/infill by purpose
  ├─ layer/speed by intent (outer brake on minis/PETG)
  └─ skirt always; brim if tiny/tall; raft rare
```

## A1 Mini rules

| Rule | Guidance |
|---|---|
| Scope | A1 Mini 0.4 mm + Bambu Studio |
| Materials | PLA primary; PETG documented |
| False precision | **validate on printer** |
| Firm supports | Removable firm > ruined free overhangs |
| Cite | List slicing pages used in `plan.md` |

### Pages

| Page | One-liner | Typical knobs |
|---|---|---|
| [Orientation](orientacao.md) | Lever #1: support, strength, seam | Rotation angles |
| [Support strategy](suportes-estrategia.md) | Tree vs normal; thresholds by purpose | Type, threshold, paint |
| [Support face & interface](suportes-face-e-interface.md) | Z/XY gaps; scar vs weld | Top Z/XY, interface layers |
| [Walls & infill](preenchimento-e-paredes.md) | Walls beat blind high infill | Loops, %, pattern |
| [Layer height & speed](altura-de-camada-e-velocidade.md) | Quality vs time; outer-wall brake | Layer, outer mm/s |
| [Brim, raft & skirt](brim-raft-saia.md) | Adhesion toolkit; raft rare | Brim width, raft off |

### Purpose → slicing lean (quick)

| Purpose | Orientation | Support | Layer / outer |
|---|---|---|---|
| Mini / character | Noble face | Tree 30–40° | 0.08–0.12 / 40–80 |
| Tool | Load in XY; holes Z | Avoid in holes | 0.16–0.20 / moderate |
| Decorative | Seam hidden | Reorient first | 0.12–0.16 / 60–100 |
| Vase spiral | Opening up | None | 0.16–0.28 / steady |

## Failure → which slicing page

| Symptom | Open first |
|---|---|
| Huge support volume | [Orientation](orientacao.md) then [strategy](suportes-estrategia.md) |
| Welded / scarred faces | [Face & interface](suportes-face-e-interface.md) |
| Weak flex / pillowing | [Walls & infill](preenchimento-e-paredes.md) |
| Ringing / lost time trade | [Layer & speed](altura-de-camada-e-velocidade.md) |
| Tip-over / peel | [Brim / raft / skirt](brim-raft-saia.md) + [bed](../hardware/a1-mini-mesa-e-adesao.md) |

## Suggested presets (PLA)

Start from the named PLA profile, then apply child-page tables. Do not stack “internet max speed” on mini faces.

| Knob family | Typical PLA lean |
|---|---|
| Support Z | ~0.2 mm — **validate** |
| Outer mini/character | 40–80 mm/s |
| Walls tool | 4–6 |
| Raft | Off |

## Suggested presets (PETG)

Start from [petg-funcional-0.4](../perfis-a1-mini/petg-funcional-0.4.md): earlier supports, looser Z gaps, slower outer, medium cooling. Dry before tuning retract.

| Knob family | Typical PETG lean |
|---|---|
| Support Z | 0.25–0.30 mm |
| Outer | 40–80 mm/s |
| Threshold | 30–35° start |
| Brim | More often than PLA |

## Related

- [Hub](../INDEX.md)
- [How to use this wiki](../00-como-usar-esta-wiki.md)
- [Profiles](../perfis-a1-mini/INDEX.md)
- [Geometry](../geometria/INDEX.md)
- [Purpose](../proposito/INDEX.md)
- [Quality](../qualidade-e-acabamento/INDEX.md)
- [Hardware](../hardware/INDEX.md)
- [Playbook](../../../playbook.md)

## Sources

- Bambu Studio docs (process settings concepts)
- Ellis orientation / support / speed philosophy
- Teaching Tech bridging & first-layer practice
- Project playbook golden rules
