# Mechanical fits

## Summary

FFF tolerances on A1 Mini: start **0.2–0.3 mm** diametral clearance for sliding PLA pins; tune with a caliper coupon. Align load in the **XY plane** when possible (layers are anisotropic — Z bond is the weak plane). **Elephant foot** destroys fits — compensate first layer before blaming clearance.

This is the geometry of **pins, clips, hinges, lids, snap fits, screw bosses**. Purpose/profile: [tools](../proposito/ferramentas.md).

## When to use

| Situation | Use this page |
|---|---|
| Tag `mechanical_fit` | Yes |
| Tools, clips, hinges, lids, snap fits | Yes |
| Printed threads / screw bosses | Yes |
| Pure decorative figurine | No |
| Spiral vase | No |

## Decision tree

```text
mechanical_fit?
    │
    ├─ sliding loose ──► 0.3–0.4 mm + elephant-foot compensate
    ├─ sliding snug ───► 0.15–0.25 mm + calibrate coupon
    ├─ press-fit ──────► 0.05–0.15 mm (break risk)
    ├─ printed thread ─► calculator + PETG candidate
    ├─ screw boss ─────► ≥3–4 walls, avoid support in hole
    └─ failed snap in PLA ─► +walls / reorient first; then PETG
```

## A1 Mini rules

### Clearance table (PLA start)

| Fit type | Initial PLA clearance | Note |
|---|---|---|
| Loose slide | 0.3–0.4 mm | Survives elephant foot |
| Snug slide | 0.15–0.25 mm | Calibrate |
| Press-fit | 0.05–0.15 mm | Crack risk |
| Printed thread | follow calculator + test | PETG often tougher |
| Lid / box | 0.2–0.35 mm per side order | **validate** |

PETG: start **+0.05 mm** vs PLA equivalent (stickier surface finish).

### Non-negotiables

1. Compensate elephant foot / first-layer squish — [elephant foot](../qualidade-e-acabamento/elephant-foot-e-primeira-camada.md).
2. Wall loops **≥ 3–4** around screw bosses and clips.
3. Prefer hole axis on **Z** for roundness; avoid support inside critical holes (reorient).
4. Shear loads: align so layers are not the failure plane ([orientation](../fatiamento/orientacao.md)).
5. Document clearance used in `plan.md`.
6. After first print: measure with caliper before batching.
7. Walls beat blind 80%+ infill for strength ([walls & infill](../fatiamento/preenchimento-e-paredes.md)).

### Load → orientation

| Load case | Orientation heuristic |
|---|---|
| Clip flex | flex axis in XY |
| Bolt tension | walls carry load; not sparse infill alone |
| Pin shear | pin axis Z or walls ≥4 |
| Living hinge | thin controlled wall; PLA may fatigue → PETG candidate |
| Snap fit | print so snap flexes in XY |

### Failure modes

| Symptom | Cause | Next |
|---|---|---|
| Won’t assemble | Elephant foot / clearance tight | Compensate Z; +clearance |
| Rattles loose | Clearance large / undersize pin | −clearance; check flow |
| Boss cracks | Too few walls / press too tight | +walls; looser press |
| Hole oblong | Axis not on Z / support in hole | Reorient |
| Layer delam under flex | Load in Z | Reorient; +walls; PETG |

### Coupon SOP

1. Print pin/hole coupon at candidate clearance.
2. Cool fully; measure OD/ID.
3. Adjust clearance or XY hole compensation once — don’t chase every print.
4. Only then batch the real tool.

## Suggested presets (PLA)

| Parameter | Value | Why |
|---|---|---|
| Profile | [pla-ferramenta-resistente-0.4](../perfis-a1-mini/pla-ferramenta-resistente-0.4.md) | Strength |
| Walls | 3–5 | Structural skin |
| Infill | 25–50% | Core |
| Layer | 0.16–0.20 | Dimensional OK |
| Outer speed | moderate | Layer adhesion |
| Elephant compensate | on / tuned | Fits |
| Support in holes | avoid | Reorient first |

## Suggested presets (PETG)

| Parameter | Value | Why |
|---|---|---|
| Profile | [petg-funcional-0.4](../perfis-a1-mini/petg-funcional-0.4.md) | Toughness |
| Clearance | +0.05 mm vs PLA | Stickier surface |
| Cooling | medium | Layer bond |
| Walls | 4–5 | Impact |
| Dry | mandatory | Dimensional foam |
| Plate | textured PEI | Release |

## Related

- [Classify geometry](classificar-geometria.md)
- [Purpose — tools](../proposito/ferramentas.md)
- [Elephant foot](../qualidade-e-acabamento/elephant-foot-e-primeira-camada.md)
- [Walls & infill](../fatiamento/preenchimento-e-paredes.md)
- [Orientation](../fatiamento/orientacao.md)
- [PETG](../materiais/petg.md)
- [Geometry INDEX](INDEX.md)
- [Hub](../INDEX.md)

## Sources

- Prusa tolerances KB (adapted to A1 Mini)
- CNC Kitchen strength / orientation
- Community clearance starting ranges (coupon-first)
- Project PETG day-1 functional path
