# Polycarbonate (PC) — capability-gated

## Summary

PC brings high heat resistance and toughness used in engineering enclosures and fixtures. It wants **high nozzle temps**, a **hot chamber/bed**, and excellent adhesion — poorly matched to an open A1 Mini as a default. This page exists so material selection and future printers are prepared; **do not treat PC as a normal A1 Mini filament**.

## When to use

- High-temperature fixtures, transparent-ish functional covers (grade-dependent)
- When PETG heat limits are proven insufficient

## When NOT to use

- A1 Mini day-1 prints
- Miniatures / PLA workflows
- Without enclosure-class machine or industrial intent

## Printer capability matrix

| Printer | Suitability | Notes |
|---|---|---|
| **A1 Mini (active)** | **Generally no** | Open frame; adhesion/warp/heat risk |
| Future high-temp enclosed | Prepared | Fill when onboarded |

## Behavior

| Property | Consequence |
|---|---|
| High Tg / heat resistance | Needs hot process |
| Moisture sensitive | Dry thoroughly |
| Tough | Great end-use when printed correctly |
| Optical grades vary | Clarity ≠ strength settings |

## Process rules

If ever attempted on A1 Mini (discouraged):

1. Written risk acceptance in `plan/*.md`
2. Max practical bed/nozzle within machine limits — **validate**
3. Tent + slow + huge brim
4. Prefer moving the job to a capable printer when available

## Suggested presets (PC) — reference bands (enclosed-class)

| Parameter | Typical enclosed start | Why |
|---|---|---|
| Nozzle | 260–290 °C | Grade dependent |
| Bed | 100–120 °C | Adhesion |
| Chamber | Hot | Stability |
| Cooling | Low | Weld |

## A1 Mini practical recommendation

**Use PETG or defer.** PC on A1 Mini is a last resort experiment, not a profile pack target.

## Related

- [Choosing material](choosing-material.md)
- [PETG](petg.md)
- [ABS/ASA](abs-asa.md)
- [Materials index](INDEX.md)

## Sources

- Manufacturer PC print guides
- Enclosed-printer OEM profiles (contrast)
