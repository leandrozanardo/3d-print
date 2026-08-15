# PA (Nylon) on FFF (A1 Mini capability-gated)

## Summary

Polyamide (PA6/PA12 and blends) offers toughness, wear resistance, and chemical resilience — and is one of the **most moisture-hungry** consumer filaments. Warping and weak wet prints are the norm if drying discipline fails. On **A1 Mini**, treat PA as **advanced / generally deferred** unless you have dryer + adhesion strategy + accept risk. Documented so the materials system is complete.

## When to use

- Gears, bushings, wear surfaces, hinges under load
- Parts needing impact toughness beyond PETG
- When a future enclosed/dried workflow exists

## When NOT to use

- Decorative miniatures
- Undried spools
- Open-frame “quick print tonight” culture
- Food contact assumptions (usually invalid as printed)

## Printer capability matrix

| Printer | Suitability | Notes |
|---|---|---|
| **A1 Mini (active)** | **Risky** | Warp + moisture; glue sticks / exotic sheets often needed |
| Future enclosed + dry-box | Prepared | Preferred home for PA |

## Behavior

| Property | Consequence |
|---|---|
| Extreme hygroscopy | Wet PA = steam, bubbles, brittle or rubbery mess |
| High shrink | Lift and warp |
| Low friction / wear | Great functional surfaces when printed dry |
| CF/GF filled variants | Abrasive — see [composites](composites.md) |

## Process rules (risk plan)

1. Dry aggressively (often 70–80 °C class — **validate brand**); print from dry-box if possible
2. Hot bed (often 70–100 °C+); adhesion aids common
3. Low cooling; controlled chamber helps enormously
4. Slow down; expect tuning time measured in days, not minutes
5. Prefer PA12 over PA6 for slightly easier consumer printing when choosing filament (**validate**)

## Suggested presets (PA) — starting bands

| Parameter | Start | Why |
|---|---|---|
| Nozzle | 250–270 °C | Brand tower |
| Bed | 70–100 °C | Warp fight |
| Cooling | 0–40% | Weld layers |
| Speed | Moderate-slow | Stability |
| Enclosure | Strongly preferred | — |

## Drying / storage

Non-negotiable. See [drying](secagem-e-umidade.md). If PA sat open overnight, assume wet.

## Failure modes → first fix

| Symptom | First checks |
|---|---|
| Foam/bubbles | Dry again longer/hotter (within brand limits) |
| Corner lift | Bed, brim, glue, enclosure |
| Soft/weak part | Still wet or under-temp |
| Nozzle wear (filled) | Hardened nozzle |

## Related

- [Choosing material](choosing-material.md)
- [Composites](composites.md)
- [Warping](../troubleshooting/warping.md)
- [Materials index](INDEX.md)

## Sources

- Manufacturer PA dry/print guides
- Engineering filament community warp/moisture patterns
