# A1 Mini — maintenance

## Summary

Preventive maintenance keeps first layers consistent and prevents **layer shift**, **false under-extrusion**, and **noise**. Focus on: **plate cleanliness**, **filament path** (especially AMS Lite), **belt tension per Bambu procedure**, **rail/fan lint**, **hotend cleanliness / cold pulls**, and **stable firmware**. Maintenance is a precondition — slicer tweaks cannot fix a grinding gear or loose bed.

Intervals below are **order-of-magnitude**; follow the official manual and **validate** against your duty cycle.

## When to use

| Trigger | Action level |
|---|---|
| ~50–100 h printing (order) | Full quick checklist |
| New noise, vertical banding, skipped layers | Immediate inspect belts/obstructions |
| Flow drop / color mix / clicks | Hotend clean / cold pull |
| After transport | Full calibration + mechanical check |
| Before long mini batch | Plate + path + first-layer test |
| AMS load failures repeating | Path + dryness + maintenance |
| After nozzle swap | Recalibrate + smoke test |

## Decision tree — layer shift / new artifact

```text
Layer shift or vertical artifact new?
  ├─ Collision with skirt/clip/purge? → clear volume
  ├─ Table wobble? → rigid surface
  ├─ Belt loose/uneven? → Bambu tension procedure only
  ├─ Fans/rails dirty? → clean per manual
  └─ Still shifting? → [layer shift](../troubleshooting/layer-shift.md)
Sudden underextrusion with clean plate?
  └─ Grind debris / clog / wet / AMS kink — not “mystery flow”
```

## A1 Mini rules

### Quick checklist (before big jobs)

| # | Item | Pass criteria |
|---|---|---|
| 1 | Build plate | Clean, no glue crust, seated on magnet |
| 2 | Filament path | No kinks; PTFE/tubes seated; AMS rollers free |
| 3 | Fasteners | No obvious loose base/bed screws |
| 4 | Belts | Firm per Bambu procedure — not guitar-string guesswork |
| 5 | Fans | Lint-free; spin freely |
| 6 | Nozzle/hotend | No blob armor; purge clean |
| 7 | Firmware | Known-stable via Handy/Studio when appropriate |
| 8 | Surface | Printer on rigid table; no wobble |

### Interval schedule (approximate)

| Cadence | Tasks |
|---|---|
| Every job | Visual plate; purge; listen for new noises |
| Weekly / heavy use | Soap-wash plate; wipe rails lightly per manual; check AMS path |
| ~50–100 h | Belt check, fan clean, fastener glance, cold pull if residue |
| After filament jam | Clear grind debris; inspect gear; dry filament |
| After move | Full calibration; belt/plate recheck |

All hours: **validate on printer** / official wiki — duty cycle and environment differ.

### Hotend hygiene

| Method | When | Notes |
|---|---|---|
| Purge to clear color | Material/color change | Longer for PETG→PLA |
| Cold pull | Persistent contamination / mild clog | Use appropriate pull filament — **validate** technique |
| Nozzle swap | Damaged orifice / chronic clog | Re-level/calibrate after |
| Never | Force steel wire wildly as first step | Can ruin nozzle geometry |

### Filament path & AMS Lite

- Soft/wet filament increases grind → clean debris from extruder gears.
- Kinked tubes → intermittent underextrusion that looks like “slicer flow bug.”
- After clearing a jam: verify load/unload cycle before long prints ([AMS Lite](a1-mini-ams-lite.md)).
- Document recurring path faults in `plan.md` if they affected a job.

### Firmware & software

- Update when release notes fix your class of bug; avoid updating mid-critical batch without need.
- Keep Bambu Studio machine profile matching actual nozzle (0.4).
- After firmware change: short validation print before 12 h character jobs.

### Failure modes → maintenance first

| Symptom | Maintenance-first check | If clear, then |
|---|---|---|
| Layer shift | Belts, collision, table | Troubleshooting page |
| Underextrusion | Clog, grind, wet, AMS path | [Extrusion](a1-mini-extrusao-e-bico.md) |
| Bad first layer suddenly | Dirty plate, calibration | [Bed](a1-mini-mesa-e-adesao.md) |
| New squeal/rattle | Fans, rails, debris | Manual lube guidance only |
| Random AMS fail | Tube seating, dust, humidity | Dry + path |
| Vertical banding new | Belts / speed / loose panels | Slow outer; tension procedure |

### Post-maintenance validation prints

| Test | Pass criteria |
|---|---|---|
| First-layer square / patch | Lines joined, no spaghetti, no extreme squash |
| 20 mm cube | Dimensions roughly ±0.2 mm hobby-acceptable — **validate** your tolerance needs |
| Short temp/retract tower | No severe stringing after dry |
| Optional bridging bar | Acceptable sag for material |

### Do / don’t

| Do | Don’t |
|---|---|
| Follow Bambu belt procedure | Overtighten “by feel” from random videos |
| Smoke-test after service | Jump into 10 h mini immediately |
| Clear grind debris | Keep retrying AMS into a dust pile |
| Match nozzle size in Studio | Leave 0.6 profile after 0.4 install |

## Suggested presets (PLA)

No slicer preset replaces maintenance. After service, use a stock **Bambu PLA @ A1 Mini 0.4** smoke test:

| Step | Action |
|---|---|---|
| 1 | Clean plate; calibrate |
| 2 | Dry PLA if storage doubtful |
| 3 | Print first-layer test |
| 4 | Print 20 mm cube or small decorative coupon |
| 5 | Resume intent profile only if pass |

## Suggested presets (PETG)

| Step | Action |
|---|---|---|
| 1 | Same mechanical checklist |
| 2 | **Dry PETG** before validation |
| 3 | First layer at PETG bed temps on textured PEI |
| 4 | Small functional coupon via [petg-funcional-0.4](../perfis-a1-mini/petg-funcional-0.4.md) |
| 5 | Inspect for pops (moisture) vs gaps (clog/path) |
| 6 | Only then run long functional parts |

## Related

- [Overview](a1-mini-visao-geral.md)
- [Extrusion & nozzle](a1-mini-extrusao-e-bico.md)
- [Bed & adhesion](a1-mini-mesa-e-adesao.md)
- [AMS Lite](a1-mini-ams-lite.md)
- [Layer shift](../troubleshooting/layer-shift.md)
- [Under-extrusion](../troubleshooting/under-extrusion.md)
- [Drying](../materiais/secagem-e-umidade.md)
- [Local A1 Mini wiki](../../printers/A1mini/wiki.md)
- [Hardware INDEX](INDEX.md)
- [Wiki hub](../INDEX.md)

## Sources

- https://wiki.bambulab.com/ (maintenance / A1 Mini manuals)
- Converted manuals: [../../printers/A1mini/INDEX.md](../../printers/A1mini/INDEX.md)
- Community duty-cycle checklists (adapted; verify against official steps)
- Project validation-print discipline after service
