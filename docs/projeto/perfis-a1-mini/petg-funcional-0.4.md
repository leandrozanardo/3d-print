# Profile — PETG functional 0.4

## Summary

Functional **PETG** on A1 Mini 0.4: toughness and moderate heat better than PLA; cosmetics secondary. **Dry first.** Slower outer walls than PLA; larger support Z gap; textured PEI preferred. Never run PETG on a PLA process preset.

Anchor material page: [petg.md](../materiais/petg.md).

## When to use

| Signal | Action |
|---|---|
| PLA failed on impact / flex at layers | Candidate after walls/orientation tried |
| Warm device contact ~60–70 °C | Candidate — **validate** real load/temp |
| Tools / brackets needing toughness | This profile |
| Filament dry (or dryable now) | Proceed; else abort |

## When NOT to use

| Situation | Go to |
|---|---|
| Cosmetic miniatures / faces | PLA mini / character profiles |
| Spiral vase art | PLA vase (PETG stringing) |
| Wet spool | Dry ([secagem](../materiais/secagem-e-umidade.md)) or abort |
| Smooth PEI + yank-hot habit | Textured plate + cool release |
| PLA already meets strength | [pla-ferramenta-resistente-0.4](pla-ferramenta-resistente-0.4.md) |
| Food contact / chemical tanks | Out of scope |

## Decision tree

```text
Dry spool confirmed?
  ├─ NO → dry 65–70 °C order — validate dryer — then return
  └─ YES → PLA walls/orientation already optimized?
        ├─ NO → try pla-ferramenta-resistente-0.4 first
        └─ YES → need impact/heat → this profile
Plate?
  ├─ Smooth PEI → textured preferred; release after cool
  └─ Textured → proceed with brim if tall/thin
```

## A1 Mini rules

1. **Dry always** before print and before retract towers.
2. Speeds **lower** than PLA; outer wall 40–70 mm/s order.
3. Support top Z **larger** than PLA (0.25–0.30 mm order).
4. Careful with smooth PEI (weld / coating tear).
5. Never use PLA filament/process profile for PETG.
6. Expect more stringing — tune after dry ([stringing](../qualidade-e-acabamento/stringing-e-retract.md)).
7. Moderate cooling (40–60%): high fan → weak layers; low → sag/string.
8. Purge thoroughly when switching PLA ↔ PETG (manual or AMS).
9. Open frame: block AC drafts.
10. Uncertain nozzle/bed/retract → **validate on printer**.

## Bambu Studio fields (PETG)

| Field | Value | Why |
|---|---|---|
| Filament / process | Bambu PETG @ A1 Mini 0.4 | Not PLA clone |
| Layer height | 0.16–0.20 mm | Functional |
| First layer height | 0.24 mm | Stick |
| Wall loops | 4–5 | Strength |
| Top / bottom shells | 5–6 | Faces |
| Infill | 30–40% gyroid | Core |
| Outer wall speed | 40–70 mm/s | Bonding / surface |
| Inner / infill | Higher but under volumetric limit | Time |
| Cooling | 40–60% | Layer adhesion |
| Retract | Bambu PETG preset | Tower only after dry |
| Z-hop | 0–0.4 mm optional | May ↑ stringing — **validate** |
| Supports | Normal or tree per geometry | Flat vs organic |
| Top Z distance | 0.25–0.30 mm | Anti-weld |
| Interface layers | 4–5 | Separation |
| Brim | On often | Warping |
| Raft | Off unless brim fails | Cleanup |
| Elephant foot compensation | After stick OK | Fits — **validate** |
| Nozzle | 230–245 °C order | Tower — **validate** |
| Bed | 70–80 °C | Stick vs weld |

## PLA vs PETG columns (functional)

| Dimension | PLA tough tool | This PETG profile |
|---|---|---|
| Ease | Higher | Lower |
| Impact | Lower | Higher |
| Heat candidate | Weak | Better (**validate**) |
| Moisture | Moderate | High — dry mandatory |
| Support Z | 0.20–0.25 | 0.25–0.30 |
| Stringing | Lower | Higher |
| PEI stick risk | Lower | High on smooth |
| Cosmetics | Better | Secondary |

## Failure modes → first checks

| Symptom | Likely causes | Next |
|---|---|---|
| Extreme stringing / fog | Wet, hot, retract, Z-hop | Dry → [stringing](../qualidade-e-acabamento/stringing-e-retract.md) |
| Bubbles / pops / foam | Moisture | Dry 65–70 °C order |
| Delamination / weak Z | Fan high, nozzle cold, wet, speed high | −fan; +5 °C; dry; −speed |
| Plate welded | Smooth PEI + hot + yank | Textured; cool release; [mesa](../hardware/a1-mini-mesa-e-adesao.md) |
| Support fused | Z gap PLA-sized | [Hard supports](../troubleshooting/suporte-dificil-remover.md) |
| Corner lift | Warp / draft / cold bed | [Warping](../troubleshooting/warping.md) |
| Gaps at speed | Volumetric / clog / wet | [Under-extrusion](../troubleshooting/under-extrusion.md) |

## Calibration order (PETG)

1. Dry → first layer on textured PEI  
2. Temp tower (5 °C steps)  
3. Retract tower  
4. Cooling tweak (overhang vs strength)  
5. Support Z coupon  
6. Flow ±2–5% if needed  
7. Speed last  

## Plan.md must cite

- This profile + [petg.md](../materiais/petg.md)  
- Dry state / dryer settings used  
- Plate type (textured vs smooth)  
- Support Z + interface  
- Service temp assumption + **validate on printer**  

## Related

- [PETG](../materiais/petg.md)
- [Drying](../materiais/secagem-e-umidade.md)
- [Tools](../proposito/ferramentas.md)
- [PLA tough tool](pla-ferramenta-resistente-0.4.md)
- [Stringing](../qualidade-e-acabamento/stringing-e-retract.md)
- [Warping](../troubleshooting/warping.md)
- [Tree vs normal](suportes-arvore-vs-normal.md)
- [Profiles index](INDEX.md)
- [Hub](../INDEX.md)

## Sources

- Bambu PETG presets · Bambu forum PETG patterns
- Prusa PETG failure concepts (adapted to A1 Mini DD)
- Ellis / Teaching Tech tuning order
