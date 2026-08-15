# Composites & filled filaments

## Summary

Carbon fiber, glass fiber, metal-fill, glow, wood-fill, and other **filled** filaments change abrasion, stiffness, density, and cosmetics. Many are **PLA or PETG based** with additives — read the base polymer first. On A1 Mini, the critical gate is **nozzle wear** and whether the base polymer is suitable for an open frame.

## When to use

- Stiffer functional parts (CF-PA / CF-PETG) when you accept abrasion
- Cosmetic metal/wood effects (often PLA-based)
- Weight / texture experiments

## When NOT to use

- Soft brass nozzles with abrasive fills (rapid bore wear → underextrusion)
- CF-PA without nylon drying discipline
- Assuming “carbon” means heat resistance (base polymer still rules)

## Printer capability matrix

| Printer | Suitability | Notes |
|---|---|---|
| **A1 Mini (active)** | **Conditional** | Hardened nozzle recommended for abrasive fills |
| Future printers | Prepared | Same abrasion rules |

## Behavior

| Fill type | Typical effect |
|---|---|
| Short CF | Stiffer, matte, abrasive |
| GF | Stiff, abrasive, can be brittle |
| Metal | Heavy, abrasive, cosmetic |
| Wood | Soft abrasive, layer cosmetics |
| Glow | Mild abrasive possible |

## Process rules (A1 Mini)

1. Identify **base polymer** → follow that material page
2. Install **hardened steel** (or OEM abrasive-rated) nozzle for CF/GF/metal
3. Expect slightly different flow; recalibrate after nozzle change
4. Dry according to base polymer (PETG/PA fills still drink water)
5. Layer adhesion may differ — mechanical tests beat assumptions

## Suggested presets

Start from the **base polymer** profile (PLA/PETG/PA), then:

| Adjustment | Direction | Why |
|---|---|---|
| Nozzle type | Hardened | Abrasion |
| Temp | Often +0–10 °C | Filled melt behavior — **validate** |
| Speed | Slightly slower | Wear + flow |
| Retraction | Re-tune | Texture changes ooze |

## Failure modes → first fix

| Symptom | First checks |
|---|---|
| Sudden underextrusion after hours | Worn nozzle diameter |
| Rough matte + weak | Wet base polymer |
| Clogs | Temp; grind; particle jams |

## Related

- [PLA](pla.md) · [PETG](petg.md) · [PA](pa-nylon.md)
- [Extrusion & nozzle](../hardware/a1-mini-extrusao-e-bico.md)
- [Choosing material](choosing-material.md)
- [Materials index](INDEX.md)

## Sources

- OEM abrasive filament guides
- Nozzle metallurgy / wear community practice
