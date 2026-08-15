# Purpose — decorative

## Summary

**Appearance** parts: lamp shades, frames, desk objects, logos. Priority: clean outer surface (**seam placement**, optional ironing). Strength secondary; light handling only. Profile: [pla-decorativo-superficie-0.4](../perfis-a1-mini/pla-decorativo-superficie-0.4.md).

If it is a wargame mini, character face, or spiral vessel — use those purpose pages instead.

## When to use

| Criterion | Decorative? |
|---|---|
| Viewed up close, light handling | Yes |
| Not spiral vase, not wargame mini | Yes |
| Needs structural load | Prefer [tools](ferramentas.md) |
| Face/figure detail primary | [Characters](personagens.md) / [miniatures](miniaturas.md) |
| Single-contour hollow | [Vases](vasos.md) |

## Decision tree

```text
decorative?
    │
    ├─ spiral vessel? ──► proposito/vasos
    ├─ wargame mini / face detail? ──► miniaturas / personagens
    └─ else ──► pla-decorativo-superficie-0.4
              ├─ hide seam on back/edge
              ├─ reorient before supporting
              ├─ outer-wall-first if available
              └─ ironing only on critical flat tops
```

## A1 Mini rules

### Non-negotiables

1. Profile [pla-decorativo-superficie-0.4](../perfis-a1-mini/pla-decorativo-superficie-0.4.md).
2. Outer-wall-first if available; seam on hidden edge (`aligned` / `back`).
3. Layer **0.12–0.20**; walls **2–3**; infill **10–15%**.
4. Support only if unavoidable; reorient first — [overhangs](../geometria/balancos-e-angulos.md).
5. Ironing on flat cosmetic tops only — time cost.
6. Prefer PLA; PETG OK outdoors-ish but expect more string cleanup.
7. Document seam strategy in `plan.md`.

### Surface goal matrix

| Surface goal | Setting lean |
|---|---|
| Smooth walls | slower outer; seam hidden |
| Flat top shine | ironing on |
| Minimal scars | threshold higher / reorient |
| Fast décor | 0.20 layer OK |
| Matte PLA look | don’t over-iron |

### Geometry tags

| Tag | Action |
|---|---|
| `overhang_heavy` | Reorient before support |
| `flat_plate` | Watch warp; clean PEI |
| `thin_wall` | ≥2 walls if handled |
| `tall_slender` | Brim |

### Failure modes

| Symptom | Next |
|---|---|
| Visible Z-seam | Move seam; outer-first |
| Scarred cosmetic face | Reorient / tree / interface |
| Dull banding | Layer/speed; ironing selective |
| Strings | Dry; retract; [stringing](../qualidade-e-acabamento/stringing-e-retract.md) |
| Tip-over | Brim |

## Suggested presets (PLA)

| Parameter | Value | Why |
|---|---|---|
| Layer | 0.12–0.16 (0.20 draft OK) | Balance |
| Outer speed | 60–100 mm/s | Surface |
| Seam | aligned / back | Hide |
| Infill | 10–15% | Economy |
| Walls | 2–3 | Shell |
| Support threshold | 40–50° if cosmetic | Fewer scars |
| Ironing | selective flats | Time |
| Cooling | high | Overhang cosmetics |
| Brim | if tippy | Stability |

## Suggested presets (PETG)

Possible for outdoor-ish décor; accept more stringing and post cleanup.

| Parameter | Value | Why |
|---|---|---|
| Cooling | medium | Bond |
| Outer | 40–80 mm/s | Clarity |
| Dry | mandatory | Strings |
| Support Z | 0.25–0.30 | Less weld |
| Prefer PLA | for indoor show pieces | Cosmetics |

## Related

- [Seam & surface](../qualidade-e-acabamento/costura-e-superficie.md)
- [Post-processing](../qualidade-e-acabamento/pos-processamento.md)
- [Overhangs](../geometria/balancos-e-angulos.md)
- [Orientation](../fatiamento/orientacao.md)
- [PLA](../materiais/pla.md)
- [Purpose INDEX](INDEX.md)
- [Hub](../INDEX.md)

## Sources

- Ellis seam / PA concepts
- Bambu surface settings (ironing, wall order)
- Project decorative profile contract
