# A1 Mini temperature table (0.4 mm)

## Summary

Starting **nozzle / bed / cooling** ranges for Bambu Studio on the **Bambu Lab A1 Mini** with **0.4 mm** nozzle. Always anchor on the **official filament preset**, then confirm with a temperature tower. Cells marked **validate on printer** are not false precision — pigment, brand, moisture, and enclosure drafts shift the sweet spot.

Use this page when creating or debugging profiles; do not treat a single number as universal truth.

## When to use

| Situation | Use this table? |
|---|---|
| New brand / color of PLA or PETG | Yes — tower from midpoint |
| Cloning a project profile | Yes — verify temps still match filament |
| Stringing vs cold underextrusion diagnosis | Yes — see decision tree |
| First-layer only issues | Partially — bed + first-layer nozzle; also [adhesion](../hardware/a1-mini-mesa-e-adesao.md) |
| Mechanical layer shift | No — [layer shift](../troubleshooting/layer-shift.md) |

## A1 Mini rules

### Global tuning rules

1. **Anchor:** Bambu Studio filament profile for that material @ A1 Mini.
2. **One variable at a time** (Ellis order conceptually): dry → first layer → temperature → retract → cooling → flow → speed.
3. **Step size:** ±5 °C nozzle; ±5 °C bed.
4. **Judge outer wall** visually and by layer bond — not by a single “internet number.”
5. **Open chamber:** ambient drafts cool the part; towers near a window/AC lie.
6. **Wet filament invalidates towers** — [dry first](secagem-e-umidade.md).
7. **PLA ↔ PETG:** never reuse the other material’s process temps without a full retune.

### Diagnostic decision tree (temp-related)

```text
Surface glossy blobs + hairs?
  └─ Nozzle likely high and/or wet → dry; −5 °C; then retract
Matte, weak layers, easy split?
  └─ Nozzle low and/or cooling high and/or wet → dry; +5 °C; reduce cooling
Rough underextrusion at high speed, temp OK?
  └─ Volumetric limit / clog — not only temperature ([extrusion](../hardware/a1-mini-extrusao-e-bico.md))
PETG delaminates with good temp?
  └─ Cooling too aggressive or still wet
First layer only fails?
  └─ Bed / Z / cleanliness — not full tower yet
```

### PLA table (0.4 mm, A1 Mini)

| Parameter | Start range | Typical Bambu PLA order | Intent notes | Uncertainty |
|---|---|---|---|---|
| Nozzle (rest) | 190–220 °C | Often ~220 °C | Minis may prefer slightly cooler for detail | **validate on printer** / brand |
| Nozzle (first layer) | +0–10 °C vs rest | Per preset | Improves wet-out | **validate** |
| Bed | 35–60 °C | Often ~55 °C | Too hot → elephant foot | PEI clean |
| Chamber | Ambient | — | No active heated chamber | Drafts matter |
| Part cooling | 80–100% after early layers | High | Overhangs / minis | Drop if Z-bond weak |
| Outer wall speed | 60–120 mm/s | 80–100 common | Cosmetic parts slower | Machine resonance |
| Volumetric max | Filament preset | Follow Studio | Don’t invent | **validate on printer** |

**PLA temperature tower protocol**

| Step | Setting | Pass look |
|---|---|---|
| 1 | Dry if needed | No pops |
| 2 | Tower 190→220 °C in 5 °C bands (or brand range) | Pick band with best overhang + least string + solid layers |
| 3 | Lock nozzle; optional ±5 °C fine | Consistent gloss without blobs |
| 4 | Retract tower at chosen temp | Minimal whiskers |

### PETG table (0.4 mm, A1 Mini)

| Parameter | Start range | Typical Bambu PETG order | Intent notes | Uncertainty |
|---|---|---|---|---|
| Nozzle (rest) | 220–250 °C | Often ~230–245 °C | Tower mandatory | **validate on printer** |
| Nozzle (first layer) | +5–10 °C vs rest | Per preset | PEI wet-out | **validate** |
| Bed | 70–80 °C | ~70–80 °C | Smooth PEI weld risk | Cool before remove |
| Part cooling | 30–70% | Mid | Overhang vs strength trade | Don’t copy PLA 100% |
| Outer wall speed | 40–80 mm/s | Slower than PLA | Cleaner walls | — |
| Retract | Studio PETG | Short DD | After dry only | **validate** |
| Z-hop | 0–0.4 mm | Optional | May ↑ strings | **validate** |

**PETG temperature tower protocol**

| Step | Setting | Pass look |
|---|---|---|
| 1 | Dry 65–70 °C order | Silent extrusion |
| 2 | Tower across 220–250 °C (5 °C) | Solid layers, limited ooze |
| 3 | If matte + fragile | Often cold **or** still wet — re-dry before +temp |
| 4 | If glossy + hair nest | −5 °C then retract |
| 5 | Cooling sweep 30→70% | Keep strength; fix overhangs with geometry/supports too |

### Combined quick reference

| | PLA | PETG |
|---|---|---|
| Nozzle start | 200–220 °C | 230–245 °C |
| Bed start | ~55 °C (35–60) | 70–80 °C |
| Cooling | High | Moderate |
| Dry priority | Medium | **High** |
| Outer wall | Faster OK | Keep slower |
| Profile examples | [PLA profiles](../perfis-a1-mini/INDEX.md) | [petg-funcional-0.4](../perfis-a1-mini/petg-funcional-0.4.md) |

### Failure modes vs temperature (both materials)

| Symptom | Try first | Then |
|---|---|---|
| Stringing | Dry; −5 °C nozzle | Retract / wipe / Z-hop |
| Weak Z-bond | Dry; +5 °C; −cooling | Slow outer; check flow |
| Elephant foot | −bed or −first-layer squish | [Elephant foot](../qualidade-e-acabamento/elephant-foot-e-primeira-camada.md) |
| Warping corners | +bed slightly; brim; clean plate | [Warping](../troubleshooting/warping.md) |
| Bridging sags | +cooling (PLA) / careful +cooling (PETG) | Geometry / slow bridge |
| Burnt specks / smoke smell | Stop; lower temp; check clog | [Maintenance](../hardware/a1-mini-manutencao.md) |

## Suggested presets (PLA)

| Profile intent | Nozzle | Bed | Cooling | Notes |
|---|---|---|---|---|
| Decorative surface | 205–220 °C | 55 °C | 80–100% | [pla-decorativo](../perfis-a1-mini/pla-decorativo-superficie-0.4.md) |
| Miniature / character | 200–215 °C | 50–55 °C | 90–100% | Slow outer wall |
| Tool light-duty | 205–220 °C | 55–60 °C | 70–90% | More walls > temp obsession |
| Vase | 205–220 °C | 55–60 °C | Per preset | Constant volumetric |

All values: **validate on printer** after drying.

## Suggested presets (PETG)

| Profile intent | Nozzle | Bed | Cooling | Notes |
|---|---|---|---|---|
| Functional default | 230–245 °C | 70–80 °C | 40–60% | [petg-funcional-0.4](../perfis-a1-mini/petg-funcional-0.4.md) |
| Max toughness (fewer overhangs) | Mid-high of tower | 75–80 °C | 30–50% | Accept sag on steep faces |
| Overhang compromise | Mid tower | 70–75 °C | 50–70% | Still not PLA-like |

### Extended materials (capability-gated on A1 Mini)

| Material | Nozzle band | Bed band | Cooling | A1 Mini gate | Page |
|---|---|---|---|---|---|
| TPU | 210–230 °C | 30–60 °C | 40–100% | Possible — slow / min retract | [tpu.md](tpu.md) |
| ABS / ASA | 240–260 °C | 90–100 °C | 0–30% | **Risk plan** / tent + vent | [abs-asa.md](abs-asa.md) |
| PA (Nylon) | 250–270 °C | 70–100 °C | 0–40% | **Risky** — dry-box discipline | [pa-nylon.md](pa-nylon.md) |
| PC | 260–290 °C | 100–120 °C | Low | **Generally no** on open A1 Mini | [pc.md](pc.md) |
| Composites | Follow base polymer | Follow base | Follow base | Hardened nozzle if abrasive | [composites.md](composites.md) |

All extended rows: **validate on printer** / brand; see [choosing-material](choosing-material.md).

## Related

- [PLA](pla.md)
- [PETG](petg.md)
- [Choosing material](choosing-material.md)
- [TPU](tpu.md) · [ABS/ASA](abs-asa.md) · [PA](pa-nylon.md) · [PC](pc.md) · [Composites](composites.md)
- [Drying & humidity](secagem-e-umidade.md)
- [Profiles A1 Mini](../perfis-a1-mini/INDEX.md)
- [Profiles registry](../profiles/INDEX.md)
- [Layer height & speed](../fatiamento/altura-de-camada-e-velocidade.md)
- [Stringing](../qualidade-e-acabamento/stringing-e-retract.md)
- [Extrusion & nozzle](../hardware/a1-mini-extrusao-e-bico.md)
- [Bed & adhesion](../hardware/a1-mini-mesa-e-adesao.md)
- [Wiki hub](../INDEX.md)

## Sources

- Bambu Studio default filament profiles (conceptual anchors)
- Teaching Tech temperature tower methodology
- Ellis Print Tuning Guide (order of operations concepts)
- Manufacturer filament labels — always cross-check and **validate on printer**
