# A1 Mini profiles (Bambu Studio, 0.4 mm)

## Summary

Named, purpose-bound recipes for the playbook and every `3ds/plan/*.md`. Start from **Bambu Lab filament + process presets for A1 Mini 0.4**, then specialize. Each child page lists concrete Studio fields, **when NOT to use**, PLA vs PETG notes, failure modes, and **validate on printer** gates.

Do not invent orphan presets. If geometry + purpose already map to a named profile, cite that path.

## When to use

| Situation | Action |
|---|---|
| After geometry + purpose classification | Open matching profile below |
| Before ad-hoc slicer knobs | Clone Bambu preset → apply profile table |
| Writing `3ds/plan/<name>.md` | Link exact profile markdown path |
| Switching material PLA ↔ PETG | Change filament *and* process family — never bump PLA temps only |

## Decision tree — pick a profile

```text
Purpose / geometry?
  ├─ Spiral single-contour vessel → pla-vaso-vase-mode-0.4
  ├─ Tabletop mini / tiny organic detail → pla-miniatura-0.4
  ├─ Larger figurine / face / AMS colors → pla-personagem-detalhe-0.4
  ├─ Display walls, low load → pla-decorativo-superficie-0.4
  ├─ Tool / jig / fit / load →
  │     ├─ PLA OK for load/temp? → pla-ferramenta-resistente-0.4
  │     └─ Impact / warm service → petg-funcional-0.4 (dry first)
  └─ Support mode unclear → suportes-arvore-vs-normal (+ purpose profile)
```

## A1 Mini rules (all profiles)

| # | Rule | Why |
|---|---|---|
| 1 | Hardware = **A1 Mini** only; nozzle **0.4 mm**; slicer **Bambu Studio** | Scope lock |
| 2 | Clone official Bambu filament/process before edits | Avoid orphan numbers |
| 3 | PLA primary; PETG only when toughness/heat justifies | Cosmetics + stringing trade-off |
| 4 | Uncertain temps/retract/Z-gap → mark **validate on printer** | Brand + humidity dominate |
| 5 | Cite profile path in every plan | Audit trail |
| 6 | One variable per test when tuning off-profile | Stop thrashing |
| 7 | Prefer firm removable supports over “zero support” that kills surfaces | Quality > theory |

## Pages

| Profile | Intent | Layer (order) | Walls | Default supports |
|---|---|---|---|---|
| [PLA miniature 0.4](pla-miniatura-0.4.md) | High-detail minis | 0.08–0.12 | 2–3 | Tree |
| [PLA character detail 0.4](pla-personagem-detalhe-0.4.md) | Figures / faces / AMS | 0.08–0.12 | 2–3 | Tree + paint |
| [PLA tough tool 0.4](pla-ferramenta-resistente-0.4.md) | Strength / fits | 0.16–0.20 | 4–5 | Normal/snug |
| [PLA decorative surface 0.4](pla-decorativo-superficie-0.4.md) | Clean outer walls | 0.12–0.16 | 3 | Minimal / tree if organic |
| [PLA vase / spiral 0.4](pla-vaso-vase-mode-0.4.md) | Spiral vase | 0.20–0.28 | 1 spiral | Off |
| [PETG functional 0.4](petg-funcional-0.4.md) | Tough / warm-use | 0.16–0.20 | 4–5 | Normal or tree; larger Z |
| [Tree vs normal supports](suportes-arvore-vs-normal.md) | Support mode pick | — | — | Decision matrix |

## PLA vs PETG (profile selection)

| Dimension | Prefer PLA profile | Prefer PETG functional |
|---|---|---|
| Cosmetics / faces / minis | Yes | No |
| Impact toughness | Rarely | Yes |
| Service near warm device | Rarely | Candidate (**validate**) |
| Spiral vase | Yes | Rarely |
| AMS multicolor faces | Yes | Caution (purge + string) |
| Smooth PEI weld risk | Low–medium | High — prefer textured |

## Calibration order (any profile)

1. Plate clean + bed cal → first layer visual
2. Dry filament if open/soft/unknown
3. Temp tower (material family)
4. Retract tower only after dry
5. Support Z / interface on a scrap coupon
6. Flow ±2–5% if walls need it
7. Speed last

Mark any step skipped as **validate on printer** in the plan.

## Related

- [Hub](../INDEX.md)
- [Materials](../materiais/INDEX.md)
- [Purpose](../proposito/INDEX.md)
- [Slicing](../fatiamento/INDEX.md)
- [Troubleshooting](../troubleshooting/INDEX.md)
- [Quality checklist](../workflow/checklist-qualidade.md)
- [Playbook](../../../playbook.md)

## Sources

- Bambu Studio A1 Mini 0.4 filament/process presets
- Project purpose/geometry taxonomy
- Ellis / Teaching Tech tuning order (adapted)
