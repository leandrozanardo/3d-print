# A1 Mini — overview

## Summary

The **Bambu Lab A1 Mini** is a compact FFF bed-slinger: usable volume **180 × 180 × 180 mm**, **direct-drive** extruder, stock **0.4 mm** nozzle, automatic bed leveling / calibration helpers in **Bambu Studio**. It is the only printer in scope for this wiki. Ideal for miniatures, small tools, decorative parts, characters, and vases that fit the envelope with margin for brim and supports.

It is fast for its size, but **open-frame** (draft-sensitive), with **no heated chamber** — ABS/ASA are out of day-1 project scope. PLA is primary; PETG is supported with stricter drying and slower outer walls.

## When to use

| Question | This page answers |
|---|---|
| Does the part fit? | Volume + brim/support/purge margins |
| How fast can I push? | Outer-wall / acceleration baselines |
| AMS Lite or direct spool? | Tradeoffs summary → [AMS Lite](a1-mini-ams-lite.md) |
| Why isn’t “internet ABS recipe” here? | Scope lock |
| Where do temps live? | [Materials temps](../materiais/tabela-temperaturas-a1-mini.md) |
| New to this wiki’s machine assumptions | Start here |

## Decision tree — envelope & packing

```text
Bounding box ≤ 180³ mm raw?
  ├─ NO → split / scale / different machine
  └─ YES → add supports + brim + purge tower?
        ├─ Still fits with ≥2–5 mm margin → OK
        └─ Touches edges → shrink brim, reorient, or split
Tall aspect ratio (height >> XY footprint)?
  └─ Slow outer walls; check resonance / bed slap; consider brim
Draft from AC hitting bed?
  └─ Shield; adhesion/warp issues are environmental, not “bad PLA”
```

## A1 Mini rules

### Core specifications (project assumptions)

| Spec | Value | Project implication |
|---|---|---|
| Build volume | 180 × 180 × 180 mm | Leave ~2–5 mm edge margin with wide brim; watch tall skinny resonance |
| Nozzle (default) | 0.4 mm | All day-1 profiles assume 0.4; other sizes = new profiles |
| Extrusion | Direct drive | Short retract vs Bowden; good for flexible-ish feeds but PETG still strings |
| Motion | Bed slinger (Y bed) | Tall thin parts: reduce outer speed; check belts ([maintenance](a1-mini-manutencao.md)) |
| Bed | Magnetic PEI sheet (textured and/or smooth per kit) | Cleanliness = adhesion; PETG prefers textured |
| Calibration | Auto leveling / Studio flow assists | Re-run after move/transport |
| Chamber | Open ambient | No ABS/ASA day-1; drafts matter |
| Multicolor | Optional AMS Lite | Purge waste + humidity path — [AMS Lite](a1-mini-ams-lite.md) |

### In scope vs out of scope

| In scope | Out of day-1 scope |
|---|---|
| PLA (primary) | ABS / ASA / PC / nylon as defaults |
| PETG (documented) | Dual-nozzle / Toolchanger workflows |
| 0.4 mm nozzle recipes | Unvalidated 0.2/0.6/0.8 as project standards |
| Bambu Studio | Orca as primary (optional later only if clear gain) |
| Recipe + light mesh (mode B) | Full auto remesher app |
| AMS Lite optional | Claiming AMS dries filament |

### Motion & speed baselines (order-of-magnitude)

| Parameter | Typical starting band | Notes |
|---|---|---|
| Outer wall | 60–120 mm/s PLA; 40–80 mm/s PETG | Cosmetics: stay low — **validate on printer** |
| Inner wall / infill | Faster than outer | Limited by volumetric + resonance |
| First layer | 20–40 mm/s | Homogeneous squish |
| Acceleration | Bambu process presets | Avoid “max machine” on minis |
| Travel | Preset | Z-hop optional; may ↑ stringing on PETG |

**Rule:** For character faces and miniatures, **outer wall quality > print-time heroics**.

### Purpose → machine fit

| Purpose | Fit on A1 Mini | Hardware notes |
|---|---|---|
| [Miniatures](../proposito/miniaturas.md) | Excellent | Fine layers; tree supports; high PLA cooling |
| [Tools](../proposito/ferramentas.md) | Good if small | Walls/orientation; PETG for impact |
| [Decorative](../proposito/decorativas.md) | Excellent | Seam + surface presets |
| [Vases](../proposito/vasos.md) | Good within diameter | Spiral; watch volumetric |
| [Characters](../proposito/personagens.md) | Excellent | AMS Lite optional |

### Failure modes tied to machine class

| Symptom | Hardware-leaning cause | Next page |
|---|---|---|
| Corner ripple / vertical bands | Resonance / speed / loose belts | [Maintenance](a1-mini-manutencao.md), slow outer |
| First layer inconsistent after move | Needs full calibration | [Bed & adhesion](a1-mini-mesa-e-adesao.md) |
| Random gaps | Clog / grind / AMS path | [Extrusion](a1-mini-extrusao-e-bico.md), [AMS](a1-mini-ams-lite.md) |
| Layer shift | Belt, collision, unstable surface | [Layer shift](../troubleshooting/layer-shift.md) |
| PETG welded to plate | Smooth PEI + aggressive stick | [Bed & adhesion](a1-mini-mesa-e-adesao.md) |
| Part exceeds envelope with helpers | No margin planned | Reorient / scale / split |

### Do / don’t

| Do | Don’t |
|---|---|
| Leave brim/support/purge margin | Fill 180 mm edge-to-edge |
| Start from Bambu A1 Mini presets | Paste X1C “max speed” blindly |
| Recalibrate after transport | Assume last month’s first layer |
| Use named project profiles | Invent parallel anonymous profiles |

## Suggested presets (PLA)

| Parameter | Value | Reason |
|---|---|---|
| Process base | Bambu PLA @ A1 Mini 0.4 | Official baseline |
| Layer height default | 0.20 mm | Quality/time balance |
| Fine detail | 0.08–0.16 mm | Minis/characters |
| Outer wall speed | 80–100 mm/s (40–80 for faces) | Detail vs time — **validate** |
| Acceleration | Stock process | Stability |
| Cooling | 80–100% after early layers | Overhangs |
| Profiles | See [perfis-a1-mini](../perfis-a1-mini/INDEX.md) | Intent recipes |
| Envelope check | bbox + helpers ≤ 180³ | Fit |

## Suggested presets (PETG)

| Parameter | Value | Reason |
|---|---|---|
| Process base | Bambu PETG @ A1 Mini 0.4 | Do not clone PLA |
| Outer wall speed | 40–80 mm/s | Cleaner surface |
| Cooling | 30–70% | Strength vs overhang |
| Bed | 70–80 °C | Adhesion |
| Dry first | Mandatory if unsure | [Drying](../materiais/secagem-e-umidade.md) |
| Profile | [petg-funcional-0.4](../perfis-a1-mini/petg-funcional-0.4.md) | Project recipe |
| Plate | Textured PEI preferred | Release |

## Related

- [Bed & adhesion](a1-mini-mesa-e-adesao.md)
- [Extrusion & nozzle](a1-mini-extrusao-e-bico.md)
- [Maintenance](a1-mini-manutencao.md)
- [AMS Lite](a1-mini-ams-lite.md)
- [Materials](../materiais/INDEX.md)
- [Temperature table](../materiais/tabela-temperaturas-a1-mini.md)
- [Profiles](../perfis-a1-mini/INDEX.md)
- [Purpose](../proposito/INDEX.md)
- [Layer height & speed](../fatiamento/altura-de-camada-e-velocidade.md)
- [Troubleshooting](../troubleshooting/INDEX.md)
- [Wiki hub](../INDEX.md)
- [A1 Mini INDEX](../../printers/A1mini/INDEX.md)

## Sources

- Bambu Wiki A1 Mini manual: https://wiki.bambulab.com/en/a1-mini/manual
- Local conversion: [../../printers/A1mini/wiki.md](../../printers/A1mini/wiki.md)
- Bambu Studio machine/filament preset concepts
- Project playbook / start_plan scope locks
