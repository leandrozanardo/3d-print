# TPU / flexible filaments (A1 Mini)

## Summary

TPU (and cousins) print soft, grippy, impact-absorbing parts. A1 Mini’s **Direct Drive** extruder is a good fit versus Bowden systems, but flexibles demand **slow** speeds, careful retraction, and dry filament. Documented densely for grips, feet, gaskets, and living hinges.

## When to use

- Phone cases, feet, bumpers, watch straps, flexible latches
- Vibration damping inserts
- Soft-touch overlays

## When NOT to use

- Tight dimensional engineering fits (compliance eats tolerance)
- Tall skinny unsupported towers (wobble)
- Fast “default PLA” profiles
- Wet spools (bubbles + under-extrusion)

## Printer capability matrix

| Printer | Suitability | Notes |
|---|---|---|
| **A1 Mini (active)** | **Possible / good mechanically** | Direct Drive; start very slow |
| Future printers | Prepared | Check Bowden vs DD |

## Behavior

| Property | Consequence |
|---|---|
| Elastic filament path | Classic retract settings can jam — reduce/disable |
| Soft in hotend | Stringing + oozing common |
| Shore hardness varies | 85A ≠ 95A — profiles are not interchangeable |
| Moisture | Visible cosmetic damage quickly |

## Process rules (A1 Mini)

1. Dry thoroughly before first print
2. Start with Bambu TPU preset if available; else slow everything 30–50%
3. Retraction: **minimal** — validate; many success reports use very short retracts
4. Outer wall slow (often 20–40 mm/s class — **validate**)
5. Avoid combing through skin when possible; watch pressure
6. First layer: gentle squish; too much = rubber pancake
7. Supports: prefer geometries that need few; interface gaps matter

## Suggested presets (TPU) — starting bands

| Parameter | Start | Why |
|---|---|---|
| Nozzle | 210–230 °C | Brand tower |
| Bed | 30–60 °C | Adhesion without weld |
| Cooling | 40–100% | Depends on overhangs / hardness |
| Speed | Slow | Prevent buckling in path |
| Retraction | Minimal | Jams |
| Layer height | 0.16–0.24 | Flow stability |
| Infill | Gyroid / lightning variants | Flex-friendly |

## Suggested presets (PLA)

N/A — rigid. See [PLA](pla.md).

## Drying / storage

- Treat like PETG+: dry before important prints
- Print soon after drying; reseal

## Failure modes → first fix

| Symptom | First checks |
|---|---|
| Extruder clicks / grind | Too fast; temp low; wet; path drag |
| Spaghetti mid-air | Lost bed stick; slow down; brim |
| Extreme strings | Temp −5; less retract travel; wipe |
| Incomplete fills | Flow; slower; higher temp |

## Geometry / purpose pairing

- Design thick enough walls for Shore rating
- Living hinges: test coupons
- Multi-material rigid+flex: AMS Lite possible but purge/costly — plan explicitly

## Related

- [Choosing material](choosing-material.md)
- [Stringing](../qualidade-e-acabamento/stringing-e-retract.md)
- [Extrusion & nozzle](../hardware/a1-mini-extrusao-e-bico.md)
- [Materials index](INDEX.md)

## Sources

- Bambu TPU presets / wiki
- Flexible filament community tuning patterns (synthesized)
- Teaching Tech / Ellis methodology adapted (temp towers still apply)
