# Elephant foot & first layer

## Summary

**Elephant foot:** first layer over-squished → fat base, dead fits. Opposite: high Z / weak squish → peel. On A1 Mini: auto bed cal + **visual first-layer check**. Clean PEI before chasing compensation numbers.

Hardware: [a1-mini-mesa-e-adesao](../hardware/a1-mini-mesa-e-adesao.md). Fits: [encaixes-mecanicos](../geometria/encaixes-mecanicos.md).

## When to use

| Trigger | Use |
|---|---|
| Mechanical fits too tight at base | Yes |
| Mini bases looking bulged | Yes |
| Adhesion failures | Yes — with [falha-adesao](../troubleshooting/falha-adesao.md) |
| First layer ridges or gaps | Yes |

## When NOT to use

- Mid-part dimensional error only → flow/temp/walls, not elephant foot.
- Corner lift high up → [warping](../troubleshooting/warping.md).
- XY shift → [layer-shift](../troubleshooting/layer-shift.md).

## Decision tree

```text
First layer lines?
  ├─ Tall ridges / gaps → more squish / re-cal / wash (adhesion track)
  ├─ Transparent over-pancaked → less squish; then elephant compensation if fits fail
  └─ Kiss OK but holes tight at base only → elephant foot compensation 0.1–0.2 mm
Fits critical?
  ├─ YES → print fit coupon — validate on printer
  └─ NO → prioritize stick over micro-compensation
```

## A1 Mini rules

1. First layer lines must **kiss** — no tall ridges, no transparent gaps.
2. **Elephant foot compensation:** start 0.1–0.2 mm when base is tolerance-critical — **validate**.
3. **First layer height** ≥ normal layer (e.g. 0.20–0.28 mm).
4. **First layer speed** 20–40 mm/s.
5. Slightly hotter first layer helps stick; excess worsens foot.
6. Clean PEI before chasing compensation numbers.
7. Don’t use raft to “fix” elephant foot.
8. PETG: get stick first on textured plate; then compensate fits.

## Suggested presets (PLA)

| Bambu Studio field | Value | Why |
|---|---|---|
| First layer height | 0.20–0.28 mm | Controlled squish |
| First layer speed | 25–35 mm/s | Uniform |
| Elephant foot compensation | 0–0.2 mm | Fits — **validate** |
| Bed | 55–60 °C order | Stick |
| First layer nozzle | +0–10 °C | Wet-out |
| Brim | As needed | Stick ≠ foot fix |

## Suggested presets (PETG)

| Bambu Studio field | Value | Why |
|---|---|---|
| First layer speed | 20–30 mm/s | More viscous |
| Bed | 70–80 °C | Adhesion |
| Elephant compensation | After stick is OK | Fits |
| Plate | Textured preferred | Weld vs stick |
| Release | Cool first | Anti-tear |

## PLA vs PETG columns

| Aspect | PLA | PETG |
|---|---|---|
| Foot vs stick balance | Easier | Stick/weld tension |
| Compensation timing | After visual OK | After stick OK |
| Bed heat effect on foot | Mild–medium | Stronger |

## Failure modes → first checks

| Symptom | Likely cause | Fix |
|---|---|---|
| Fat base, hole undersize | Over-squish / hot bed | −squish; +elephant comp |
| Peel + ridges | High Z / dirty | [Adhesion](../troubleshooting/falha-adesao.md) |
| Only outer wall fat | Flow high | Calibrate flow |
| Compensation made peel | Too much / weak stick | Reduce comp; fix plate |
| Mini base mushroom | Classic foot | Comp 0.1–0.15; check Z |

## Fit coupon SOP

1. Print critical hole/boss coupon with same first-layer settings.
2. Measure after full cool.
3. Adjust elephant compensation ±0.05 mm.
4. Only then commit full tool print.
5. Log numbers in `plan.md` + **validate on printer**.

## Related

- [Bed & adhesion](../hardware/a1-mini-mesa-e-adesao.md)
- [Mechanical fits](../geometria/encaixes-mecanicos.md)
- [Adhesion failure](../troubleshooting/falha-adesao.md)
- [Tool profile](../perfis-a1-mini/pla-ferramenta-resistente-0.4.md)
- [Quality index](INDEX.md)
- [Hub](../INDEX.md)

## Sources

- Prusa first-layer KB · Ellis first-layer notes
- A1 Mini PEI practice
