# Materials — index

English materials library for FFF on this project. **Default today:** PLA. **Documented for use:** PETG and other common families below (with explicit A1 Mini capability notes).

## How to extend

1. Copy [`_TEMPLATE.md`](_TEMPLATE.md) → `materiais/<slug>.md`
2. Add a row to the registry tables below
3. Link from [choosing-material](choosing-material.md) decision tree
4. Update temperature table if applicable
5. `python -m core validate-wiki docs`

## Primary (in active use / day-1)

| Material | Page | A1 Mini | Role |
|---|---|---|---|
| PLA / PLA+ | [pla.md](pla.md) | **excellent** | Default — detail & ease |
| PETG | [petg.md](petg.md) | **good** | Functional toughness |
| Drying | [secagem-e-umidade.md](secagem-e-umidade.md) | — | Prerequisite for hygroscopics |
| Temp table | [tabela-temperaturas-a1-mini.md](tabela-temperaturas-a1-mini.md) | A1 Mini bands | Starting °C |

## Extended library (dense docs — capability-gated)

| Material | Page | A1 Mini open-frame | Notes |
|---|---|---|---|
| ABS / ASA | [abs-asa.md](abs-asa.md) | **risky / limited** | Warping + fumes; risk plan required |
| TPU / flex | [tpu.md](tpu.md) | **possible** | Slow, Direct Drive friendly; tune carefully |
| PA (Nylon) | [pa-nylon.md](pa-nylon.md) | **risky** | Extreme moisture + warp |
| PC | [pc.md](pc.md) | **generally no** | Needs heat/enclosure class machine |
| Composites / filled | [composites.md](composites.md) | **conditional** | Abrasive → hardened nozzle |

## Decision entry

- [Choosing a material](choosing-material.md)

## Related

- [Hub](../INDEX.md)
- [Printers registry](../../printers/INDEX.md)
- [A1 Mini hardware](../hardware/INDEX.md)
- [Profiles](../perfis-a1-mini/INDEX.md)
