# PLA — Bambu Lab A1 Mini

## Summary

**PLA is the day-1 primary filament** for this project: easy PEI adhesion, low warp, high cooling tolerance, excellent for miniatures, decorative parts, vases (incl. spiral), characters, and many light-duty tools. It is **anisotropic** (XY strength ≫ Z layer bond). It is **not** for sustained heat, chemical exposure, or high-impact structural loads — escalate to [PETG](petg.md) when those dominate.

On the A1 Mini (direct drive, 0.4 mm nozzle, open build volume ~180³ mm), PLA is the path of least resistance. Most “quality” issues with PLA are geometry, first layer, cooling, or moisture — not mysterious machine limits.

## When to use

| Intent | Prefer PLA? | Notes |
|---|---|---|
| [Miniatures](../proposito/miniaturas.md) | Yes | High cooling; fine layers 0.08–0.16 mm |
| [Decorative](../proposito/decorativas.md) | Yes | Surface + seam strategy matter more than toughness |
| [Vases](../proposito/vasos.md) | Yes | Spiral/vase mode; dry enough for clean single wall |
| [Characters](../proposito/personagens.md) | Yes | AMS Lite multicolor OK if dry |
| [Tools](../proposito/ferramentas.md) | Often | Light clips/jigs; PETG if impact or warm touch |
| Outdoor / >~55–60 °C | No | Softening / creep — validate load & temp |
| Living hinge / snap that failed in PLA | Maybe PETG | Measure failure mode first |

**Decision tree**

```text
Part fits A1 Mini envelope + room-temp use?
  ├─ Needs max detail / overhangs / vase → PLA
  ├─ Broke at layer lines under flex/impact → try more walls / denser infill in PLA first
  │     └─ still fails → PETG (dry) + functional profile
  └─ Heat / chemical / outdoor continuous → out of day-1 scope (or PETG with caveats)
```

## A1 Mini rules

### Machine / process constraints

| Spec / rule | Guidance | Uncertainty |
|---|---|---|
| Nozzle | 0.4 mm assumed for all project profiles | Other diameters = new profiles |
| Extruder | Direct drive → short retract | Typical order **0.4–1.2 mm** — **validate on printer** |
| Build volume | 180 × 180 × 180 mm | Leave margin for brim/purge tower |
| Chamber | Open ambient | Drafts cool unevenly; avoid AC blast on bed |
| Bed surface | Clean PEI (textured or smooth) | Soap wash first; IPA if oily — **validate coating** |

### Temperature & cooling (starting ranges)

| Parameter | Starting range | Typical Bambu PLA preset (order) | Notes |
|---|---|---|---|
| Nozzle | 190–220 °C | Often ~220 °C | Brand/pigment vary — **validate on printer** |
| Bed | 35–60 °C | Often ~55 °C | Too hot can increase elephant foot |
| Part cooling | 70–100% after layer 1–2 | High for minis | Drop slightly if layer bond too weak |
| First-layer nozzle | +0–10 °C vs rest | Per preset | Improves wet-out |
| Outer wall speed | 60–120 mm/s | 80–100 common | Minis: slow outer wall |
| Volumetric flow | Follow Studio max for filament | Do not invent | **validate on printer** if underextruding at speed |

### Mechanical behavior (design implications)

1. **Anisotropy:** Load across layers (Z tension) fails first. Orient critical tensile loads in XY when possible ([orientation](../fatiamento/orientacao.md)).
2. **Walls > infill** for strength (CNC Kitchen-style): for tools, prefer 3–5 walls over 100% sparse infill.
3. **Brittle snap:** PLA can crack under impact; fillet stress risers; avoid razor-thin living hinges unless tested.
4. **Creep:** Under constant load, PLA can slowly deform at room temp — design for that on clamps/clips.
5. **Moisture:** Moderately hygroscopic; open spools in humid climates degrade surface and stringing within days ([drying](secagem-e-umidade.md)).

### Do / don’t on A1 Mini

| Do | Don’t |
|---|---|
| Start from Bambu PLA @ A1 Mini 0.4 process | Copy PETG retract/cooling into PLA |
| Dry if spool sat open or pops in hotend | Blame retract first when filament pops/steams |
| Use high cooling on steep overhangs | Run 100% cooling on first layer |
| Slow outer walls for cosmetics | Max machine speed on character faces |
| Purge well after PETG → PLA | Assume “same color = same material” |

### Failure modes → first checks

| Symptom | Likely causes (PLA) | Next wiki node |
|---|---|---|
| Spaghetti / no stick | Dirty plate, wet first layer too cool/fast, Z too high | [Bed adhesion](../hardware/a1-mini-mesa-e-adesao.md), [adhesion fail](../troubleshooting/falha-adesao.md) |
| Elephant foot | Bed too hot, first layer over-squish, brim over-compression | [Elephant foot](../qualidade-e-acabamento/elephant-foot-e-primeira-camada.md) |
| Stringing / whiskers | Wet filament, temp high, retract short/low | [Stringing](../qualidade-e-acabamento/stringing-e-retract.md), [drying](secagem-e-umidade.md) |
| Weak layer split | Temp low, cooling too aggressive, wet, speed too high | [Temperature table](tabela-temperaturas-a1-mini.md) |
| Lost mini detail | Layer too thick, supports scarring, speed, flow | [Mini detail lost](../troubleshooting/detalhe-perdido-miniatura.md) |
| Gaps / under-extrusion | Partial clog, flow low, volumetric limit, moisture | [Extrusion](../hardware/a1-mini-extrusao-e-bico.md), [under-extrusion](../troubleshooting/under-extrusion.md) |
| Layer shift | Mechanical / belt / collision — not PLA chemistry | [Layer shift](../troubleshooting/layer-shift.md) |

## Suggested presets (PLA)

Anchor: **Bambu Studio → Bambu PLA (or your brand) + A1 Mini 0.4 nozzle process**, then clone for intent.

| Parameter | Decorative / surface | Miniature / character | Tool (light duty) | Vase / spiral |
|---|---|---|---|---|
| Profile stub | [pla-decorativo](../perfis-a1-mini/pla-decorativo-superficie-0.4.md) | [pla-miniatura](../perfis-a1-mini/pla-miniatura-0.4.md) / [personagem](../perfis-a1-mini/pla-personagem-detalhe-0.4.md) | [pla-ferramenta](../perfis-a1-mini/pla-ferramenta-resistente-0.4.md) | [pla-vaso](../perfis-a1-mini/pla-vaso-vase-mode-0.4.md) |
| Layer height | 0.16–0.20 mm | 0.08–0.16 mm | 0.16–0.28 mm | 0.20–0.28 mm (single wall aware) |
| Walls | 2–3 | 2–3 | 3–5 | 1 (vase) |
| Infill | 10–15% | 10–20% | 20–40%+ | 0% spiral |
| Nozzle | 200–220 °C | 200–215 °C | 205–220 °C | 205–220 °C |
| Bed | 50–60 °C | 50–55 °C | 55–60 °C | 55–60 °C |
| Cooling | 80–100% | 90–100% | 70–90% | per preset (avoid collapse) |
| Outer wall | 60–100 mm/s | 40–80 mm/s | 80–120 mm/s | moderate; constant flow |
| Retract | Studio default ~0.8–1.2 mm | same; tower if strings | same | less critical in spiral |
| Supports | tree preferred for organics | tree + paint | snug/normal for flats | none in spiral |

**Calibration order (PLA):** dry → first-layer square → temp tower (±5 °C) → retract tower → flow/PA if needed → then speed. See [temperature table](tabela-temperaturas-a1-mini.md).

### Strength heuristics (quick)

| Goal | Prefer |
|---|---|
| Toughness in PLA | 4–5 walls, 25–40% gyroid, reorient load into XY |
| Max detail | 0.08–0.12 mm layer, slow outer wall, high cooling |
| Draft / fit check | 0.28 mm layer, 2 walls, accept scars |
| Still snaps | Move to [PETG](petg.md) after walls/orientation exhausted |

## Suggested presets (PETG)

N/A on this page — use [PETG](petg.md) and [petg-funcional-0.4](../perfis-a1-mini/petg-funcional-0.4.md). Do not mix PLA process presets with PETG filament.

## Related

- [PETG](petg.md)
- [Drying & humidity](secagem-e-umidade.md)
- [A1 Mini temperature table](tabela-temperaturas-a1-mini.md)
- [Profiles](../perfis-a1-mini/INDEX.md)
- [Bed & adhesion](../hardware/a1-mini-mesa-e-adesao.md)
- [Extrusion & nozzle](../hardware/a1-mini-extrusao-e-bico.md)
- [Purpose hub](../proposito/INDEX.md)
- [Slicing](../fatiamento/INDEX.md)
- [Quality & finish](../qualidade-e-acabamento/INDEX.md)
- [Troubleshooting](../troubleshooting/INDEX.md)
- [Wiki hub](../INDEX.md)

## Sources

- Bambu Lab filament wiki / Studio PLA defaults (conceptual ranges)
- CNC Kitchen (walls vs infill strength concepts)
- Teaching Tech temperature tower methodology
- Local ebook materials chapters when converted ([ebook](../../ebook/INDEX.md))
