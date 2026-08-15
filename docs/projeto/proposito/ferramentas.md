# Purpose — tools

## Summary

**Functional** parts: jigs, levers, organizers, clips, brackets. Priority: **walls**, infill, load orientation, tolerances. Use tough PLA profile or documented PETG. Geometry: [mechanical fits](../geometria/encaixes-mecanicos.md). Profiles: [pla-ferramenta-resistente-0.4](../perfis-a1-mini/pla-ferramenta-resistente-0.4.md) or [petg-funcional-0.4](../perfis-a1-mini/petg-funcional-0.4.md).

Rule of thumb: **4–5 walls beat blind 80%+ infill** for most bending cases.

## When to use

| Criterion | Tools purpose? |
|---|---|
| Torque, impact, repeated mating | Yes |
| Tag `mechanical_fit` frequent | Yes |
| Desk sculpture, light handling | Prefer [decorative](decorativas.md) |
| Wargame mini | [Miniatures](miniaturas.md) |
| Sustained >~70 °C / chemicals | Out of scope / PETG with caveats only |

## Decision tree

```text
tool / mechanical?
    │
    ├─ impact / heat ~60–70 °C / PLA layer fail after walls fix? ──► petg-funcional-0.4
    ├─ else ──► pla-ferramenta-resistente-0.4
    │         ├─ walls 4–6 beat blind 80%+ infill
    │         ├─ orient load in XY; holes on Z if possible
    │         └─ clearance coupon before batch
    └─ support inside critical hole? ──► reorient first
```

## A1 Mini rules

### Non-negotiables

1. Named profile PLA tough or PETG functional — clone before edits.
2. Walls **3–6**; infill **25–50%+** (gyroid/cubic).
3. Orient so shear is not pure Z-layer delamination.
4. Avoid support inside critical holes — reorient first.
5. Dimensional check with caliper after first piece.
6. Clearances: [mechanical fits](../geometria/encaixes-mecanicos.md).
7. Elephant foot compensation mandatory for fits.
8. Dry PETG before blaming retract/flow.

### Walls / infill by duty

| Need | Walls | Infill | Layer |
|---|---|---|---|
| Light organizer | 3–4 | 20–30% | 0.16–0.20 |
| Clip / lever | 4–5 | 30–40% | 0.16–0.20 |
| High abuse | 5–6 | 40–50%+ | 0.16–0.20 |
| Local solid boss | 4–6 + modifiers | optional 100% zone | — |

### PLA vs PETG trigger

| Observation | Prefer |
|---|---|
| Room-temp light duty | PLA tough |
| Snap/impact broke at layers after +walls | PETG |
| Warm device contact ~60–70 °C | PETG candidate — **validate** |
| Cosmetics primary | Not this purpose |

### Failure modes

| Symptom | First fix |
|---|---|
| Flex break at layers | Reorient; +walls; then PETG |
| Won’t assemble | Elephant foot / clearance |
| Hole oblong | Support in hole / bad axis |
| Warp off bed | Brim; plate; drafts |
| Soft in heat | PETG / out of scope |

## Suggested presets (PLA)

| Parameter | Value | Why |
|---|---|---|
| Profile | pla-ferramenta-resistente-0.4 | Strength |
| Layer | 0.16–0.20 | Dimensional + time |
| Walls | 4 | Skin strength |
| Infill | 30–40% | Core |
| Outer speed | moderate | Layer adhesion |
| Support | normal/snug for blocks; avoid in holes | Stability |
| Elephant compensate | on | Fits |
| Brim | if small feet | Tip-over |

## Suggested presets (PETG)

| Parameter | Value | Why |
|---|---|---|
| Profile | petg-funcional-0.4 | Toughness |
| Walls | 4–5 | Impact |
| Infill | 30–50% | Collapse resistance |
| Cooling | 40–70% | Bond vs overhang |
| Clearance | +0.05 mm vs PLA | Stickier |
| Plate | textured PEI | Release |
| Dry | mandatory | Foam/strings |
| Outer wall | 40–80 mm/s | Surface + melt |

## Related

- [Mechanical fits](../geometria/encaixes-mecanicos.md)
- [Walls & infill](../fatiamento/preenchimento-e-paredes.md)
- [Orientation](../fatiamento/orientacao.md)
- [PETG material](../materiais/petg.md)
- [PLA](../materiais/pla.md)
- [Bed & adhesion](../hardware/a1-mini-mesa-e-adesao.md)
- [Purpose INDEX](INDEX.md)
- [Hub](../INDEX.md)

## Sources

- CNC Kitchen wall/infill studies (summary)
- Project PETG day-1 documentation
- Playbook tool cheat-sheet row
- Prusa/tolerance practice adapted to A1 Mini
