# Geometry

## Summary

**Geometry** is the first decision layer after mesh inspect: tag shape constraints (overhangs, thin walls, organics, mechanical fits, vessels, tall slender, flat plates). Tags drive orientation, supports, and which purpose/profile branch is legal. Geometry does **not** set temperatures — materials live under [materiais](../materiais/INDEX.md); purpose trade-offs live under [proposito](../proposito/INDEX.md).

One part may carry **composite tags** (e.g. `organic_mini` + `thin_wall` + `tall_slender`). Mark all that apply; never force a single label.

## When to use

| Moment | Action |
|---|---|
| Playbook step after `inspect-mesh` / Studio preview | Classify here first |
| Before picking a named profile | Tags constrain legal profiles |
| Before painting supports | Overhang / vessel / hole tags matter |
| Bounding box near 180³ mm | Tag envelope risk; leave brim/support margin |
| Mesh looks “mostly fine” but fails later | Re-check missed thin walls / overhangs |

## Decision tree (folder entry)

```text
inspect mesh / Studio preview
        │
        ├─ continuous hollow single contour? ──► vessel → vasos-e-vasilhames
        ├─ pins / clips / tolerances? ─────────► mechanical_fit → encaixes-mecanicos
        ├─ sub-mm sculpture detail? ───────────► organic_mini → organicos-e-miniaturas
        ├─ local thickness ≲1.2 mm? ───────────► thin_wall → paredes-finas
        ├─ faces ≳50° unsupported? ────────────► overhang_heavy → balancos-e-angulos
        ├─ height ≫ footprint? ────────────────► tall_slender → brim + slow outer
        ├─ large bed contact plate? ───────────► flat_plate → adhesion / warp watch
        └─ always start from ──────────────────► classificar-geometria.md
```

## A1 Mini rules

| Rule | Guidance |
|---|---|
| Printer scope | A1 Mini only; 0.4 mm nozzle; Bambu Studio |
| Build volume | **180³ mm** — leave margin for brim, supports, purge tower |
| False precision | Values marked **validate on printer** are not metrology |
| Tag completeness | Apply **all** applicable tags |
| Next hop | Tags → [purpose](../proposito/INDEX.md) → [profiles](../perfis-a1-mini/INDEX.md) → [slicing](../fatiamento/INDEX.md) |
| Mode B | Prefer recipe + light mesh ops; no heavy remodel unless requested |

### Tag → page map

| Tag | Fast criterion | Next page |
|---|---|---|
| (entry) | Always | [Classify geometry](classificar-geometria.md) |
| `overhang_heavy` | faces ≳50° from vertical unsupported | [Overhangs & angles](balancos-e-angulos.md) |
| `thin_wall` | local thickness ≲1.2 mm | [Thin walls](paredes-finas.md) |
| `organic_mini` | irregular silhouette, details <1 mm | [Organics & miniatures](organicos-e-miniaturas.md) |
| `mechanical_fit` | pins, clips, nuts, snap fits | [Mechanical fits](encaixes-mecanicos.md) |
| `vessel` | hollow, single-contour spiral candidate | [Vessels & containers](vasos-e-vasilhames.md) |
| `tall_slender` | height ≫ base contact | Brim + reduced accel/outer — see [brim](../fatiamento/brim-raft-saia.md) |
| `flat_plate` | large XY area on bed | [Bed adhesion](../hardware/a1-mini-mesa-e-adesao.md), [warping](../troubleshooting/warping.md) |

### Pages

| Page | One-liner | Typical follow-on |
|---|---|---|
| [Classify geometry](classificar-geometria.md) | Tag the mesh first; composite tags allowed | Purpose INDEX |
| [Overhangs & angles](balancos-e-angulos.md) | Angle bands → support / reorient / free print | Support strategy |
| [Thin walls](paredes-finas.md) | Line-width multiples; 0.4 mm nozzle limits | Walls & infill |
| [Organics & miniatures](organicos-e-miniaturas.md) | Sculpture: tree, fine layers, noble face | Miniatures / characters |
| [Mechanical fits](encaixes-mecanicos.md) | Clearances, load axes, hole orientation | Tools purpose |
| [Vessels & containers](vasos-e-vasilhames.md) | Spiral vase eligibility vs normal walls | Vases purpose |

### PLA / PETG geometry bias (quick)

| Tag / concern | PLA lean | PETG lean |
|---|---|---|
| Overhangs | Cool hard; free to ~45–50° often | Support earlier; medium cooling |
| Thin walls | Cosmetics OK fragile | Prefer thicken; functional walls |
| Organics / minis | Primary | Usually wrong for faces |
| Mechanical fits | 0.2–0.3 mm start clearance | +0.05 mm vs PLA typical |
| Vessels / spiral | Primary | Possible if dry; more string |

## Suggested presets (PLA)

Geometry pages do not lock temps. After tags, pick purpose then a PLA profile under [perfis-a1-mini](../perfis-a1-mini/INDEX.md). Common anchors: `pla-miniatura-0.4`, `pla-personagem-detalhe-0.4`, `pla-ferramenta-resistente-0.4`, `pla-decorativo-superficie-0.4`, `pla-vaso-vase-mode-0.4`.

## Suggested presets (PETG)

Only when purpose demands toughness/heat — [petg-funcional-0.4](../perfis-a1-mini/petg-funcional-0.4.md). Geometry still classifies first; do not skip tags because material changed.

## Related

- [Hub](../INDEX.md)
- [How to use this wiki](../00-como-usar-esta-wiki.md)
- [Purpose](../proposito/INDEX.md)
- [Slicing](../fatiamento/INDEX.md)
- [Profiles](../perfis-a1-mini/INDEX.md)
- [Hardware](../hardware/INDEX.md)
- [Optimize model](../workflow/otimizar-modelo.md)
- [Playbook](../../../playbook.md)

## Sources

- Ellis overhang / orientation concepts
- Teaching Tech bridging & angle practice
- CNC Kitchen anisotropy / walls (mechanical geometry)
- Bambu Studio preview / overhang threshold semantics
- Project architecture mode B (`start_plan.md`, playbook)
