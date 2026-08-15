# Quality & finish

## Summary

Surface control in **Bambu Studio** plus light manual post-processing on A1 Mini. Fix **seam**, **stringing**, and **first-layer squish** before sanding or paint. Prefer slicer fixes over heavy post-work.

Scope: 0.4 mm nozzle; PLA primary; PETG documented where behavior differs.

## When to use

| Trigger | Action |
|---|---|
| Cosmetic / character / miniature surface tuning | Child pages below |
| Print OK dimensionally, ugly walls | Seam / stringing / elephant |
| Before blaming “bad filament” | Dry + these pages |
| After supports leave scars | Fix interface; then post |

## Decision tree

```text
Problem class?
  ├─ Vertical scar line → costura-e-superficie
  ├─ Hairs between parts → stringing-e-retract (dry first)
  ├─ Fat / weak first layer → elephant-foot-e-primeira-camada
  └─ Cleanup after good slice → pos-processamento
Still bad after slicer?
  └─ Return to troubleshooting matrix — may be extrusion/support root cause
```

## A1 Mini rules

| # | Rule |
|---|---|
| 1 | Prefer slicer fixes over heavy post-work |
| 2 | Mark uncertain values **validate on printer** |
| 3 | Dry before retract towers |
| 4 | Direct drive → short retract (never Bowden lengths) |
| 5 | Outer wall speed before exotic PA tweaks |
| 6 | Child pages below; structural fails → troubleshooting |

## Pages

| Page | Intent |
|---|---|
| [Seam & surface](costura-e-superficie.md) | Z-seam, walls, ironing |
| [Stringing & retraction](stringing-e-retract.md) | Hairs, retract, travel |
| [Elephant foot & first layer](elephant-foot-e-primeira-camada.md) | Squish vs peel vs fits |
| [Post-processing](pos-processamento.md) | Support trim, sand, paint |

## PLA vs PETG (quality bias)

| Topic | PLA | PETG |
|---|---|---|
| Seam visibility | Tunable | Slower outer helps |
| Stringing | After dry, easy | Moisture-first forever |
| First layer | Forgiving | Stick vs weld balance |
| Sanding | 400–1000 OK | Gums — light pressure |
| Ironing | Optional flats | Rarely worth it |

## Related

- [Hub](../INDEX.md)
- [Slicing](../fatiamento/INDEX.md)
- [Troubleshooting](../troubleshooting/INDEX.md)
- [Profiles](../perfis-a1-mini/INDEX.md)
- [Checklist](../workflow/checklist-qualidade.md)

## Sources

- Ellis Print Tuning Guide · Teaching Tech · A1 Mini practice
