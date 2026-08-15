# Overhangs & angles

## Summary

On A1 Mini with **0.4 mm** nozzle and good cooling, **PLA** often prints cleanly to ~**45–50° from vertical** without support. Beyond that: reorient, tree/normal supports, or accept scars. **PETG** sags earlier — support sooner and keep cooling moderate so layers still bond. Short bridges (<10–15 mm) may pass with slow bridge settings; long bridges need support or redesign.

**Angle definition:** face inclination vs **vertical** (0° = wall; 90° = floor). Match Bambu Studio “overhang / support threshold” semantics in preview — do not mix with “from horizontal” conventions from other tutorials.

## When to use

| Situation | Use this page |
|---|---|
| Tag `overhang_heavy` | Yes |
| Choosing tree vs normal / threshold | Yes |
| Judging whether rotation eliminates support | Yes |
| Bridge sag / drool | Yes + bridge speed |
| Spiral vase | N/A — no classic supports |

## Decision tree

```text
overhang_heavy?
    │
    ├─ can rotate so cosmetic face is free? ──► reorient first ([orientacao](../fatiamento/orientacao.md))
    ├─ angle ≤45° PLA / ≤35° PETG? ──────────► try free print + high/med cooling
    ├─ organic / mini / character? ──────────► tree, threshold 30–40°
    ├─ straight slots / mechanical blocks? ──► normal/snug, 30–45°
    ├─ cosmetic face must be supported? ────► interface layers + paint-on
    └─ long bridge >15–20 mm? ──────────────► support or redesign; slow bridge alone rarely enough
```

## A1 Mini rules

### Angle bands

| Face angle (vs vertical) | Typical PLA action | Typical PETG action |
|---|---|---|
| 0–30° | Free print | Free print |
| 30–45° | Free with strong cooling | Caution; watch sag |
| 45–60° | Coupon test free / light support | Support earlier |
| >60° | Support or reorient | Support |

### Purpose → threshold defaults

| Purpose | Default support threshold | Notes |
|---|---|---|
| Miniatures / characters | 30–40° | Tree; hide scars on back |
| Tools / mechanical | 35–45° | Prefer reorient holes |
| Decorative | 40–50° if surface-critical | Reorient before support |
| Vase (spiral) | N/A | No classic supports |
| Draft / functional block | ~45° | Time over cosmetics |

### Non-negotiables

1. Prefer **reorient** so support scars land on non-cosmetic faces.
2. Studio threshold start: **30–45°** by purpose (table above).
3. Miniatures: **tree** usually scars less than dense normal on organics.
4. Bridges: slow bridge speed + fan; **>15–20 mm** → support or redesign.
5. Document chosen angles and threshold in `plan.md`.
6. Firm removable supports beat “zero support” that ruins overhangs ([playbook](../../../playbook.md)).
7. After type/threshold → tune Z/XY interface ([face & interface](../fatiamento/suportes-face-e-interface.md)).

### Bridge matrix

| Bridge length | PLA lean | PETG lean |
|---|---|---|
| <8 mm | Often free with slow bridge | Often free if dry |
| 8–15 mm | Slow bridge + fan; inspect | Support more often |
| >15–20 mm | Support or redesign | Support |

### Failure modes

| Symptom | Likely cause | Next |
|---|---|---|
| Drooping edges | Threshold too high / cooling low / speed high | ↓ threshold; ↑ cooling (PLA); slow outer |
| Scar carpet on face | Dense normal on organic | Tree + interface |
| Welded support | Z gap too tight (esp. PETG) | ↑ top Z |
| Bridge spaghetti | Too long / wet / fan off | Support or dry |
| Ringing on overhang lip | Outer too fast | Outer-wall brake |

### Do / don’t

| Do | Don’t |
|---|---|
| Lock orientation before auto-support | Blind-support then rotate |
| Paint-on critical regions | Trust auto on every face |
| Coupon overhangs for new filament | Assume brand X = brand Y |
| Match threshold to purpose | Copy “45° forever” on minis |

## Suggested presets (PLA)

| Parameter | Value | Why |
|---|---|---|
| Support threshold | 30–40° organics; 40–50° décor | Safety vs scars |
| Cooling | high after early layers | Overhang quality |
| Bridge speed | low (profile) | Less sag |
| Outer wall | 40–80 mm/s on hard overhangs | Edge definition |
| Support type | tree (organic) / normal (blocks) | See [strategy](../fatiamento/suportes-estrategia.md) |
| Top Z distance | ~0.2 mm start | **validate on printer** |

## Suggested presets (PETG)

| Parameter | Value | Why |
|---|---|---|
| Support threshold | 30–35° | Worse overhang than PLA |
| Cooling | 40–70% | Do not kill layer bond |
| Top Z distance | 0.25–0.30 mm | PETG sticks harder |
| Outer wall | 40–80 mm/s | Melt quality |
| Bridge | slower + earlier support | Viscosity |
| Dry filament | mandatory if unsure | Sag masquerades as geometry |

## Related

- [Classify geometry](classificar-geometria.md)
- [Support strategy](../fatiamento/suportes-estrategia.md)
- [Support face & interface](../fatiamento/suportes-face-e-interface.md)
- [Tree vs normal](../perfis-a1-mini/suportes-arvore-vs-normal.md)
- [Orientation](../fatiamento/orientacao.md)
- [Hard-to-remove supports](../troubleshooting/suporte-dificil-remover.md)
- [PLA](../materiais/pla.md) · [PETG](../materiais/petg.md)
- [Geometry INDEX](INDEX.md)
- [Hub](../INDEX.md)

## Sources

- Teaching Tech overhangs
- Ellis bridging notes
- Bambu forum tree-support patterns
- Studio overhang threshold semantics (conceptual)
