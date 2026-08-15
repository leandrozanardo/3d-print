# Layer height & speed

## Summary

With **0.4 mm** nozzle: useful layer band **0.08–0.28 mm**. A1 Mini can go fast, but miniatures/characters and PETG need an **outer-wall brake**. Prefer Bambu A1 Mini accel presets; if ringing appears, slow outer before hunting accel blindly — **validate on printer**.

Bind layer/speed to named profiles under [perfis-a1-mini](../perfis-a1-mini/INDEX.md); don’t invent a parallel “max machine” profile for faces.

## When to use

| Situation | Use this page |
|---|---|
| Trading quality vs time | Yes |
| Visible vibration / ringing | Yes |
| Binding speeds to named profiles | Yes |
| First-layer only issues | Prefer [bed](../hardware/a1-mini-mesa-e-adesao.md) |
| Gaps at high speed | Also [extrusion](../hardware/a1-mini-extrusao-e-bico.md) |

## Decision tree

```text
pick layer by intent
    │
    ├─ 0.08 ── premium mini / character face
    ├─ 0.12 ── standard detail
    ├─ 0.16–0.20 ── general / tools
    ├─ 0.24–0.28 ── draft / thick vase banding
    └─ ringing / vertical bands? ──► cut outer speed first; then check belts
```

## A1 Mini rules

### Layer bands

| Layer | Use |
|---|---|
| 0.08 | Character / miniature premium |
| 0.12 | Standard detail |
| 0.16–0.20 | General / tools |
| 0.24–0.28 | Draft / thick vase banding |

### Speed starting bands

| Material | Outer | Inner | Infill |
|---|---|---|---|
| PLA | 60–120 mm/s | 100–200 | 150–250 |
| PETG | 40–80 | 60–120 | 80–150 |

| Purpose lean | Outer wall target |
|---|---|
| Mini / character | 40–80 mm/s |
| Decorative | 60–100 mm/s |
| Tool | moderate; favor bond |
| Vase spiral | steady; avoid jerk spikes |

### Non-negotiables

1. First layer slower/thicker per profile (adhesion).
2. Bridge / overhang slowdowns on.
3. Ringing: cut outer speed first; keep stock A1 Mini accel unless diagnosing.
4. Do not mix PLA speed stack onto PETG profile.
5. Volumetric caps from Studio filament — gaps at speed → slow or heat carefully.
6. Document layer + outer speed in `plan.md`.

### Failure modes

| Symptom | First change |
|---|---|
| Ringing / ghosting | ↓ outer speed |
| Lost mini detail | ↓ layer; ↓ outer; check width |
| Gaps mid-wall | volumetric / clog / wet |
| Weak PETG layers | ↓ cooling / ↓ outer; dry |
| Elephant foot | first-layer speed/temp — bed page |
| Layer shift | not speed heroics — [layer shift](../troubleshooting/layer-shift.md) |

### Do / don’t

| Do | Don’t |
|---|---|
| Outer brake on faces | Max travel myths on minis |
| Stock accel until proven | Random “input shaper” guesses |
| Match layer to intent | 0.28 on 28 mm faces |

## Suggested presets (PLA)

| Intent | Layer | Outer |
|---|---|---|
| Mini / character | 0.08–0.12 | 40–80 mm/s |
| Decorative | 0.12–0.16 | 60–100 |
| Tool | 0.16–0.20 | moderate |
| Vase | 0.16–0.28 | steady |
| Draft | 0.24–0.28 | higher OK |

Acceleration: Bambu process default unless diagnosing resonance.

## Suggested presets (PETG)

| Parameter | Value | Why |
|---|---|---|
| Outer | 40–80 mm/s | Melt quality |
| Inner/infill | below PLA stack | Viscosity |
| Layer | 0.16–0.20 typical | Functional |
| Fine 0.08 | rarely worth it | Time + strings |
| Cooling | 30–70% | Bond vs overhang |
| Dry | mandatory | Foam ≠ speed issue |

## Related

- [Profiles](../perfis-a1-mini/INDEX.md)
- [Seam & surface](../qualidade-e-acabamento/costura-e-superficie.md)
- [Extrusion & nozzle](../hardware/a1-mini-extrusao-e-bico.md)
- [Maintenance](../hardware/a1-mini-manutencao.md) (belts / ringing)
- [Overview](../hardware/a1-mini-visao-geral.md)
- [Slicing INDEX](INDEX.md)
- [Hub](../INDEX.md)

## Sources

- Bambu speed presets (A1 Mini process)
- Ellis PA / speed relationship (concepts)
- Teaching Tech ringing diagnosis order
- Project profile layer bands
