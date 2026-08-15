# A1 Mini — bed & adhesion

## Summary

First-layer success on the A1 Mini is mostly **clean PEI + correct bed temp + verified first-layer squish** (auto calibration + visual check). **PLA** sticks reliably to clean PEI. **PETG** can **over-adhere** on smooth PEI and damage coatings if yanked hot — prefer textured sheet and cool-down release. Brim/raft are geometry tools, not substitutes for a dirty plate.

Cross-link helpers: [brim / raft / skirt](../fatiamento/brim-raft-saia.md). Temps: [temperature table](../materiais/tabela-temperaturas-a1-mini.md).

## When to use

| Situation | Use this page |
|---|---|
| Spaghetti / part lifts mid-print | Yes |
| Warping corners | Yes + [warping](../troubleshooting/warping.md) |
| Elephant foot / over-squish | Yes + [elephant foot](../qualidade-e-acabamento/elephant-foot-e-primeira-camada.md) |
| Swapping smooth ↔ textured PEI | Yes |
| PETG stuck “permanently” | Yes |
| Layer shift mid-body | No — [layer shift](../troubleshooting/layer-shift.md) |
| Gaps after solid first layer | Prefer [extrusion](a1-mini-extrusao-e-bico.md) |

## Decision tree — brim / skirt / raft

```text
Footprint large + flat + PLA on clean PEI?
  └─ Skirt only often enough
Small footprint / tall tower / corners lift?
  └─ Brim 5–8 mm ([brim](../fatiamento/brim-raft-saia.md))
PETG still lifts after clean + temp?
  └─ Brim 3–8 mm; check drying; textured plate
Cosmetic bottom critical?
  └─ Prefer no raft; fix plate/temp; raft last resort
PETG on smooth PEI welded?
  └─ Stop yanking; cool; switch textured next; never chisel coating
```

## A1 Mini rules

### Plate types & material pairing

| Plate | PLA | PETG | Notes |
|---|---|---|---|
| Textured PEI | Excellent | Preferred | Easier release; texture shows on bottom |
| Smooth PEI | Excellent | Caution — can weld | Cool fully; gentle flex; avoid hot yank |
| Glue / adhesive | Rarely needed | Only if persistent lift | Remove residue before next PLA job |

### Cleaning SOP

1. Cool plate; remove debris with soft tool — no gouging.
2. Wash with warm water + mild dish soap; rinse; dry fully.
3. If oily fingerprints remain: IPA 90%+ — **validate coating compatibility** for your specific sheet.
4. Avoid acetone on PEI coatings unless manufacturer explicitly allows.
5. Re-clean when adhesion suddenly worsens after previously good prints.
6. After glue experiments: wash thoroughly before cosmetics PLA.

### Calibration & first-layer visual standard

| Check | Pass | Fail → action |
|---|---|---|
| Lines after calibration | Touch neighbors, slight flatten | Too high → recalibrate / live Z if available |
| Over-squash | Extreme widening, elephant | Lower bed or reduce first-layer flow/temp |
| Gaps between lines | Sparse / round beads | Too high Z or underextrusion |
| Local fail one corner | Draft / dirty / warp | Clean; check level; brim |

Re-run **full calibration** after moving the printer or changing the sheet.

### Temperatures (bed) — starting ranges

| Material | Bed start | Typical Studio order | Risk if wrong |
|---|---|---|---|
| PLA | 35–60 °C | Often ~55 °C | Hot → elephant; cold → lift — **validate on printer** |
| PETG | 70–80 °C | ~70–80 °C | Cold peel; hot weld on smooth |

Nozzle first-layer offsets: see [temperature table](../materiais/tabela-temperaturas-a1-mini.md).

### PLA vs PETG adhesion matrix

| Issue | PLA response | PETG response |
|---|---|---|
| Won’t stick | Clean; +bed; slower first layer; check Z | Same + ensure dry; +first-layer nozzle |
| Sticks too hard | Usually fine; cool then flex | **Stop yanking**; cool; textured; release carefully |
| Warping | Brim; drafts; bed temp | Brim; moderate cooling; drafts |
| Glue use | Avoid habit | Only if needed; wash after |

### Failure modes

| Symptom | Likely causes | Next |
|---|---|---|
| Full spaghetti | Z high, dirty, bed cold, grease | Reclean + calibrate |
| Corner peel after hour 1 | Draft, small footprint, temp drop | Brim; shield draft; [warping](../troubleshooting/warping.md) |
| Elephant foot | Over-squish / bed hot | [Elephant foot](../qualidade-e-acabamento/elephant-foot-e-primeira-camada.md) |
| PETG tears coating | Smooth PEI + hot remove | Textured; cool; never chisel aggressively |
| Only center fails | Debris / oil spot | Localized clean |
| Adhesion OK, upper warp | Cooling / geometry | Supports/orientation — not only bed |
| Brim welded | Gap too tight / PETG | ↑ gap; cold remove |

### Do / don’t

| Do | Don’t |
|---|---|
| Soap-wash regularly | Print on dusty/fingerprint PEI |
| Cool PETG before removal | Pry hot PETG off smooth PEI |
| Use brim for tiny feet | Raft every decorative part by default |
| Recalibrate after transport | Assume last week’s first layer still perfect |
| Match bed temp to material | Run PETG on PLA bed temps |

## Suggested presets (PLA)

| Parameter | Value | Reason |
|---|---|---|
| Bed temp | 55 °C (range 35–60) | Reliable PEI stick — **validate** |
| First layer height | 0.20–0.28 mm | Controlled squish |
| First layer speed | 20–40 mm/s | Homogeneous lines |
| First layer nozzle | Preset / +0–10 °C | Wet-out |
| Brim | Off, or 5–8 mm if tiny footprint | Stability without scarring large bases |
| Skirt | 1–2 loops | Prime nozzle |
| Plate | Clean textured or smooth | Both OK for PLA |
| Raft | Off | Default |

## Suggested presets (PETG)

| Parameter | Value | Reason |
|---|---|---|
| Bed temp | 70–80 °C | PETG adhesion window |
| First layer speed | 20–30 mm/s | Higher viscosity |
| First layer nozzle | +5–10 °C vs rest | Wet-out — **validate** |
| Plate | Textured preferred | Less permanent weld |
| Brim | 3–8 mm when needed | Residual warp |
| Release | After full cool | Protect coating |
| Glue | Only if still lifting after dry/clean/temp | Residue management |
| Raft | Last resort only | Hard removal |

## Related

- [Adhesion failure](../troubleshooting/falha-adesao.md)
- [Warping](../troubleshooting/warping.md)
- [Elephant foot & first layer](../qualidade-e-acabamento/elephant-foot-e-primeira-camada.md)
- [Brim / raft / skirt](../fatiamento/brim-raft-saia.md)
- [PLA](../materiais/pla.md) · [PETG](../materiais/petg.md)
- [Temperature table](../materiais/tabela-temperaturas-a1-mini.md)
- [Overview](a1-mini-visao-geral.md)
- [Maintenance](a1-mini-manutencao.md)
- [Hardware INDEX](INDEX.md)
- [Wiki hub](../INDEX.md)

## Sources

- Bambu Wiki build plate / adhesion guidance
- Prusa first-layer concepts (adapted to A1 Mini auto-cal)
- Community A1 Mini PEI PLA/PETG stick patterns
- Project no-raft-default / textured-for-PETG rules
