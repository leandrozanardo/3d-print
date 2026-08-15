# A1 Mini — extrusion & nozzle

## Summary

The A1 Mini stock path is a **direct-drive hotend** with **0.4 mm** nozzle. Typical line width ~**0.42 mm**; useful layer heights **0.08–0.28 mm**. Most “random gaps” are **partial clog, moisture, volumetric overspeed, wrong flow, or AMS path grind** — not mysterious slicer ghosts. This page defines extrusion geometry limits and diagnosis order for PLA and PETG.

## When to use

| Symptom / task | Use this page |
|---|---|
| Gaps, missing perimeters, pale walls | Yes |
| Extreme stringing after dry | Partially — also [stringing](../qualidade-e-acabamento/stringing-e-retract.md) |
| Nozzle swap / cold pull | Yes + [maintenance](a1-mini-manutencao.md) |
| Setting line width / flow / layer height | Yes |
| First-layer only adhesion | Prefer [bed](a1-mini-mesa-e-adesao.md) |
| Color contamination after material change | Purge rules here + AMS page |
| Thin-wall packing math | Also [thin walls](../geometria/paredes-finas.md) |

## Decision tree — gaps / under-extrusion

```text
Gaps / under-extrusion symptoms?
  ├─ Hotend pops / foam → DRY ([secagem](../materiais/secagem-e-umidade.md))
  ├─ AMS load retries / grind dust → path/kink/tension ([AMS](a1-mini-ams-lite.md))
  ├─ Gradual flow drop mid-spool → partial clog → cold pull / clean
  ├─ Only at high speed → lower speed or volumetric; check temp
  ├─ After PLA↔PETG swap → purge longer
  ├─ Dimensional fat/skinny walls → flow ±2–5% after temp locked
  └─ First layer only → bed/Z page, not flow heroics
```

## A1 Mini rules

### Geometric limits (0.4 mm)

| Item | Guidance | Notes |
|---|---|---|
| Default line width | ~0.42 mm (≈105% of nozzle) | Stable coverage |
| Wide lines for strength | Up to ~0.48–0.55 mm | Avoid on mini detail faces |
| Min reliable feature | ~0.8–1.0 mm (2 walls) | Thinner = lottery |
| Layer “fine” | 0.08–0.12 mm | Minis/characters |
| Layer “standard” | 0.16–0.20 mm | Default project |
| Layer “draft/fast” | 0.24–0.28 mm | Tools/vases |
| Max volumetric | Filament + Studio limit | **validate on printer** if gaps at speed |

**Rule:** Do not force line width > ~0.55 mm when printing miniature facial detail.

### Flow, PA, retract (direct drive)

| Parameter | PLA starting stance | PETG starting stance |
|---|---|---|
| Flow ratio | 0.95–1.00 typical | 0.95–1.02 — **validate** |
| Retract length | ~0.4–1.2 mm order | Studio PETG default; tower after dry |
| Retract speed | Studio default | Often slightly tuned; don’t wild-guess |
| Pressure advance / Dynamic PA | Use Studio calibration assists | Recal if material/brand changes |
| Z-hop | Usually off or small | Small may help scars; may ↑ strings — **validate** |

### Clog & contamination

| Observation | Likely | Action |
|---|---|---|
| Color ghosting | Incomplete purge | Longer purge / flush |
| Gritty click, thin extrusion | Partial clog | Cold pull; check nozzle |
| Sudden nothing extruded | Full clog / heatcreep / grind | Stop; clear path; don’t force endless retry |
| PETG then PLA strings badly | Residue | Heat to PETG purge temp briefly, then PLA profile |
| Soft filament mushrooming | Wet or heatcreep | Dry; verify cooling fans |

### PLA vs PETG extrusion matrix

| Dimension | PLA | PETG |
|---|---|---|
| Ease of consistent extrusion | Easier | Needs dry + slower outer |
| Volumetric headroom | Higher typical | Keep lower — **validate** |
| Stringing when wet | Medium | Severe |
| Support scar weld | Lower | Higher — more Z gap |
| Line width for bonding | 0.42 OK | 0.42–0.45 can help |
| Purge after swap | Moderate | Longer |

### Failure modes

| Symptom | Causes | Next |
|---|---|---|
| Periodic gaps | Partial clog, grind, wet | Clean / dry / AMS path |
| Consistent thin walls | Flow low, width low, temp low | Flow cube; temp table |
| Blobs + gaps together | Moisture or PA wrong | Dry; PA cal |
| Nozzle scrape / rough top | Over-extrusion / elephant stacked | −flow; check Z |
| Mini detail melted away | Temp high + width fat + slow | [Detail lost](../troubleshooting/detalhe-perdido-miniatura.md) |
| Classic under-extrusion look | See troubleshooting matrix | [Under-extrusion](../troubleshooting/under-extrusion.md) |

### Do / don’t

| Do | Don’t |
|---|---|
| Start from Studio filament volumetric caps | Invent “max flow” from forums blindly |
| Purge on every material change | Assume one wipe clears PETG→PLA |
| Match layer height to intent | 0.28 mm for 28 mm miniature faces |
| Cold pull when colors mix chronically | Drill brass nozzle aggressively as first step |
| Recal flow after major temp change | Chase flow while filament is wet |

## Suggested presets (PLA)

| Parameter | Value | Reason |
|---|---|---|
| Nozzle | 0.4 mm | Project scope |
| Line width | 0.42 mm | Stable coverage |
| Layer height | 0.08–0.20 (intent) | See profiles |
| Flow ratio | 0.95–1.00 | Calibrate with single wall / cube |
| Nozzle temp | See [temp table](../materiais/tabela-temperaturas-a1-mini.md) | Brand-dependent — **validate** |
| Max volumetric | Studio PLA filament default | Cap speed if gaps appear |
| Retract | Studio ~0.8–1.2 mm order | Direct drive |
| Purge | On color/material change | Clean transitions |

## Suggested presets (PETG)

| Parameter | Value | Reason |
|---|---|---|
| Line width | 0.42–0.45 mm | Line-to-line adhesion |
| Flow ratio | 0.95–1.02 | **validate on printer** |
| Max volumetric | Below PLA equivalent | Prevent hot underextrusion |
| Outer wall | 40–80 mm/s | Melt quality |
| Temp / retract | PETG table + dry | [PETG](../materiais/petg.md) |
| Profile | [petg-funcional-0.4](../perfis-a1-mini/petg-funcional-0.4.md) | Project recipe |
| Purge | Longer than PLA habit | Residue / strings |

## Related

- [Under-extrusion](../troubleshooting/under-extrusion.md)
- [Stringing & retract](../qualidade-e-acabamento/stringing-e-retract.md)
- [Maintenance](a1-mini-manutencao.md)
- [AMS Lite](a1-mini-ams-lite.md)
- [PLA](../materiais/pla.md) · [PETG](../materiais/petg.md)
- [Drying](../materiais/secagem-e-umidade.md)
- [Layer height & speed](../fatiamento/altura-de-camada-e-velocidade.md)
- [Walls & infill](../fatiamento/preenchimento-e-paredes.md)
- [Thin walls](../geometria/paredes-finas.md)
- [Hardware INDEX](INDEX.md)
- [Wiki hub](../INDEX.md)

## Sources

- Ellis flow / PA calibration concepts
- Teaching Tech extrusion basics
- Bambu Wiki nozzle / hotend maintenance notes
- Studio default line width / volumetric assumptions (conceptual)
