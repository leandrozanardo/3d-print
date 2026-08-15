# PETG — Bambu Lab A1 Mini

## Summary

**PETG is documented and profiled from day 1** for functional parts that need more **toughness** and **mild heat resistance** than PLA. On the A1 Mini it prints well, but it is **more hygroscopic**, **stringier**, and can **bond aggressively to smooth PEI**. Treat drying, slower outer walls, and moderate cooling as non-negotiable. Do not run PETG on a PLA process preset.

PETG is **not** a drop-in “stronger PLA.” Layer bonding is often better; impact toughness is better; fine-detail overhangs and vase cosmetics are usually worse than dry PLA.

## When to use

| Use case | Prefer PETG? | Caveat |
|---|---|---|
| Light-impact tools, clips, brackets | Yes | Dry spool; textured PEI preferred |
| Parts that see ~60–70 °C contact | Candidate | **Validate on printer** / real load — not certified high-temp |
| PLA failed at layer interface under flex | Candidate | Also try more walls/orientation in PLA first |
| Miniatures / fine face detail | Rarely | PLA + cooling wins cosmetics |
| Vase / spiral show piece | Rarely | Stringing + cooling compromise |
| Multicolor character faces | Caution | AMS Lite OK if dry; purge waste ↑ |
| Food contact / chemical tanks | Out of scope | Do not claim food-safe from this wiki |

**Decision tree**

```text
PLA already tried with correct walls/orientation?
  ├─ NO → fix PLA recipe first ([pla.md](pla.md))
  └─ YES → failure mode?
        ├─ Brittle snap / impact → PETG functional profile
        ├─ Softening near warm device → PETG (validate temp)
        ├─ Lost detail / stringing only → dry + retract; stay PLA if cosmetic
        └─ Adhesion warping → plate/temp/brim first ([mesa](../hardware/a1-mini-mesa-e-adesao.md))
```

## A1 Mini rules

### Non-negotiables

1. **Dry before printing** if the spool was open, soft, or unknown — see [drying](secagem-e-umidade.md). Wet PETG looks like bad retract forever.
2. **Start from Bambu PETG @ A1 Mini 0.4** (or brand-matched), never a PLA clone with temps bumped.
3. **Purge thoroughly** when switching PLA ↔ PETG (manual or AMS Lite). Residual PLA at PETG temps can cook; residual PETG in PLA jobs strings and contaminates color.
4. **PEI smooth:** PETG can weld. Prefer **textured** plate; release after cool-down; never yank hot.
5. **Open frame:** drafts + PETG cooling = uneven warping/delamination risk. Shield from AC blast.

### Temperature, cooling, motion (starting ranges)

| Parameter | Starting range | Typical Studio order | Notes |
|---|---|---|---|
| Nozzle | 220–250 °C | Often ~230–245 °C | Tower mandatory — **validate on printer** |
| Bed | 70–80 °C | ~70–80 °C | Too cold → peel; too hot → elephant / weld |
| Part cooling | 30–70% | Mid | High cooling → weak layers; low → sag/string |
| First-layer nozzle | +5–10 °C vs rest | Per preset | Wet-out on PEI |
| Outer wall speed | 40–80 mm/s | Slower than PLA | Surface clarity |
| Retract | Studio PETG default | Direct drive short | Tower after dry |
| Z-hop | 0–0.4 mm | Optional | May ↑ stringing — **validate** |
| Volumetric max | Below PLA equivalent | Follow filament | Hot underextrusion if too high |

### Process rules (checklist)

| # | Rule | Why |
|---|---|---|
| 1 | Dry → then retract tower | Moisture masquerades as retract failure |
| 2 | Change temp in **5 °C** steps | Avoid overshoot |
| 3 | Prefer outer-wall quality over speed | PETG shows scars and gloss bands |
| 4 | Supports: increase Z distance vs PLA | PETG welds to interface more |
| 5 | Avoid unnecessary color changes | Flush volume and oozing hurt cosmetics |
| 6 | Keep filament path kink-free | Especially with [AMS Lite](../hardware/a1-mini-ams-lite.md) |

### Failure modes → first checks

| Symptom | Likely causes (PETG) | Next node |
|---|---|---|
| Extreme stringing / fog of hairs | Wet filament, nozzle hot, retract weak, Z-hop | [Drying](secagem-e-umidade.md), [stringing](../qualidade-e-acabamento/stringing-e-retract.md) |
| Bubbles / pops / matte foam layers | Moisture | Dry 65–70 °C order — **validate dryer** |
| Delamination / weak Z | Cooling too high, nozzle cold, wet, speed high | [Temperature table](tabela-temperaturas-a1-mini.md) |
| Plate welded / coating tear risk | Smooth PEI + hot bed + yank | [Bed adhesion](../hardware/a1-mini-mesa-e-adesao.md) |
| Scarred supported faces | Z-gap too tight, interface missing | [Supports](../fatiamento/suportes-estrategia.md), [hard supports](../troubleshooting/suporte-dificil-remover.md) |
| Gaps at speed | Volumetric limit / partial clog / wet | [Extrusion](../hardware/a1-mini-extrusao-e-bico.md) |
| “Underextrusion” after AMS load fail | Path kink / grind / humidity soft filament | [AMS Lite](../hardware/a1-mini-ams-lite.md) |

### PLA vs PETG quick matrix (A1 Mini)

| Dimension | PLA | PETG |
|---|---|---|
| Ease / cosmetics | Better | Harder |
| Impact toughness | Lower | Higher |
| Layer bond (typical) | Good if tuned | Often better |
| Moisture sensitivity | Moderate | High |
| PEI stick risk | Low–medium | High on smooth |
| Overhangs with cooling | Excellent | Compromise |
| Day-1 project default | **Yes** | Functional only |

## Suggested presets (PLA)

N/A — see [PLA](pla.md) and PLA profiles under [perfis-a1-mini](../perfis-a1-mini/INDEX.md).

## Suggested presets (PETG)

Anchor profile: [petg-funcional-0.4](../perfis-a1-mini/petg-funcional-0.4.md).

| Parameter | Functional (default) | Conservative / hard-to-print | Notes |
|---|---|---|---|
| Process base | Bambu PETG @ A1 Mini 0.4 | Same, slower | Clone before edits |
| Layer height | 0.16–0.20 mm | 0.20–0.28 mm | Fine minis rarely worth it |
| Walls | 3–5 | 4–6 | Strength via walls |
| Infill | 20–40% | 30–50% | Gyroid/grid OK |
| Nozzle | 230–245 °C | 225–240 °C if strings after dry | **validate on printer** |
| Bed | 70–80 °C | 70 °C textured | Cool before release |
| Cooling | 40–60% | 30–50% if delam | Raise only for overhangs |
| Outer wall | 40–60 mm/s | 30–50 mm/s | Inner can be faster |
| Retract | Studio PETG | +0.1–0.2 mm only after dry tower | Don’t chase wet filament |
| Supports | Normal/snug for flats; tree OK | Top Z 0.25–0.30 mm order | **validate removal** |
| Brim | 3–8 mm if small footprint | On for tall thin | [Brim](../fatiamento/brim-raft-saia.md) |
| Plate | Textured PEI preferred | Glue only if needed; clean residue | |

**Calibration order (PETG):** dry → first layer → temp tower → retract tower → cooling tweak for overhang vs strength → flow ±2–5% if needed → speed last.

## Related

- [PLA](pla.md)
- [Drying & humidity](secagem-e-umidade.md)
- [A1 Mini temperature table](tabela-temperaturas-a1-mini.md)
- [PETG functional profile](../perfis-a1-mini/petg-funcional-0.4.md)
- [Tools purpose](../proposito/ferramentas.md)
- [Stringing & retract](../qualidade-e-acabamento/stringing-e-retract.md)
- [Bed & adhesion](../hardware/a1-mini-mesa-e-adesao.md)
- [AMS Lite](../hardware/a1-mini-ams-lite.md)
- [Troubleshooting](../troubleshooting/INDEX.md)
- [Wiki hub](../INDEX.md)

## Sources

- Bambu Lab PETG filament guidance / Studio defaults (conceptual)
- Community PETG stringing patterns (moisture-first diagnosis)
- Prusa Knowledge Base PETG failure concepts (adapted to A1 Mini direct drive)
- Ellis / Teaching Tech tuning order
