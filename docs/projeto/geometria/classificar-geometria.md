# Classify geometry

## Summary

Playbook step after inspect: **label the mesh with tags** that unlock rules. Classification picks the branch — it does **not** set nozzle/bed temperatures or named process profiles. One part may carry composite tags (e.g. `organic_mini` + `thin_wall` + `tall_slender`). Missed tags are a common root cause of “mystery” support scars, lost detail, and failed fits.

Run after:

- `python -m core inspect-mesh 3ds/original/<file>.stl --json`
- or `python -m core inspect-3mf ... --json`
- plus Bambu Studio preview (walls, overhangs, single-contour check)

## When to use

| Situation | Classify? |
|---|---|
| Start of every optimization | **Always** |
| Before purpose / profile pick | Yes |
| After light mesh repair/scale | Re-tag if topology changed |
| Part “almost” prints but fails cosmetics | Re-check thin wall + overhang |
| Bounding box near 180³ mm | Tag envelope + tall_slender / flat_plate |

## Decision tree

```text
inspect mesh / preview
        │
        ├─ continuous hollow contour? ──► vessel ──► vasos-e-vasilhames.md
        ├─ pins/clips/tolerances? ─────► mechanical_fit ──► encaixes-mecanicos.md
        ├─ sub-mm sculpture detail? ───► organic_mini ──► organicos-e-miniaturas.md
        ├─ thickness <~1.2 mm? ────────► thin_wall ──► paredes-finas.md
        ├─ faces >~50° unsupported? ───► overhang_heavy ──► balancos-e-angulos.md
        ├─ height >> footprint? ───────► tall_slender ──► brim + slow outer
        ├─ large bed contact plate? ───► flat_plate ──► adhesion / warp watch
        └─ none clear? ────────────────► still document “generic solid”; purpose next
```

**Composite example:** RPG mini with thin sword + tiny base → `organic_mini` + `thin_wall` + `tall_slender` → miniature profile + Detect thin walls + brim.

## A1 Mini rules

### Tag catalog

| Tag | Fast criterion | Next node | Notes |
|---|---|---|---|
| `overhang_heavy` | faces ≳50° from vertical without support | [Overhangs](balancos-e-angulos.md) | Angle vs **vertical** |
| `thin_wall` | local thickness ≲1.2 mm | [Thin walls](paredes-finas.md) | 0.4 mm nozzle limit |
| `organic_mini` | irregular silhouette, details <1 mm | [Organics](organicos-e-miniaturas.md) | Not vase mode |
| `mechanical_fit` | pins, clips, nuts, snap fits | [Fits](encaixes-mecanicos.md) | Clearance coupon |
| `vessel` | hollow, single-contour spiral candidate | [Vessels](vasos-e-vasilhames.md) | Preview one loop/layer |
| `tall_slender` | height ≫ base contact | Brim + slow outer | Resonance risk |
| `flat_plate` | large XY area on bed | Adhesion / warp | Drafts matter |

### Non-negotiables

1. Mark **all** applicable tags — do not force a single label.
2. Envelope must fit **180 × 180 × 180 mm** with brim/support/purge margin.
3. If bbox exceeds build volume: scale, split, or refuse — document in `plan.md`.
4. After tags → [purpose](../proposito/INDEX.md) → named profile under [perfis-a1-mini](../perfis-a1-mini/INDEX.md).
5. Values marked **validate on printer** are not false precision.
6. Mode B: recipe first; thicken/repair mesh only when thin-wall or fit rules demand it ([when to edit mesh](../workflow/quando-editar-malha.md)).

### Inspect checklist

| Check | Pass | Fail → |
|---|---|---|
| Units assumed mm | Bbox sensible for intent | Scale / ask |
| Non-manifold / holes | Repair candidate | `repair-mesh` |
| Wall preview gaps | Expected for vase; bad for tools | Thin walls page |
| Overhang paint | Matches threshold plan | Overhangs + orientation |
| Single contour (vessel) | One loop/layer | Spiral OFF |
| Critical holes | Clear of forced support | Reorient |

### Tag → purpose bias

| Dominant tags | Likely purpose start |
|---|---|
| `organic_mini` (small) | [Miniatures](../proposito/miniaturas.md) |
| `organic_mini` (figure/bust) | [Characters](../proposito/personagens.md) |
| `mechanical_fit` | [Tools](../proposito/ferramentas.md) |
| `vessel` | [Vases](../proposito/vasos.md) |
| Cosmetic solid, no face detail | [Decorative](../proposito/decorativas.md) |

## Suggested presets (PLA)

Classification does **not** lock temps. Branch only; material comes from purpose + profile sheets.

| After tags… | Typical PLA profile |
|---|---|
| Mini organic | [pla-miniatura-0.4](../perfis-a1-mini/pla-miniatura-0.4.md) |
| Character | [pla-personagem-detalhe-0.4](../perfis-a1-mini/pla-personagem-detalhe-0.4.md) |
| Tool / fit | [pla-ferramenta-resistente-0.4](../perfis-a1-mini/pla-ferramenta-resistente-0.4.md) |
| Décor surface | [pla-decorativo-superficie-0.4](../perfis-a1-mini/pla-decorativo-superficie-0.4.md) |
| Spiral vessel | [pla-vaso-vase-mode-0.4](../perfis-a1-mini/pla-vaso-vase-mode-0.4.md) |

## Suggested presets (PETG)

Only if purpose requires toughness/heat after PLA walls/orientation exhausted — [petg-funcional-0.4](../perfis-a1-mini/petg-funcional-0.4.md). Still complete geometry tags first (PETG overhangs fail earlier).

| Tag caution (PETG) | Extra rule |
|---|---|
| `organic_mini` | Avoid for cosmetic faces |
| `overhang_heavy` | Support earlier; medium cooling |
| `mechanical_fit` | +0.05 mm clearance vs PLA start |
| `vessel` | Dry mandatory; expect strings |

## Related

- [Geometry INDEX](INDEX.md)
- [Orientation](../fatiamento/orientacao.md)
- [Support strategy](../fatiamento/suportes-estrategia.md)
- [Purpose INDEX](../proposito/INDEX.md)
- [Optimize model](../workflow/otimizar-modelo.md)
- [When to edit mesh](../workflow/quando-editar-malha.md)
- [Hardware overview](../hardware/a1-mini-visao-geral.md)
- [Hub](../INDEX.md)
- [Playbook](../../../playbook.md)

## Sources

- Project architecture (mode B) / playbook classify step
- FFF overhang practice (~45–50° PLA free-print band)
- Bambu Studio preview workflows (overhang, wall, spiral)
- Teaching Tech / Ellis orientation-before-support philosophy
