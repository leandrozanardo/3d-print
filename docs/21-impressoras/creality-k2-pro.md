---

id: printer.creality-k2-pro
title: Creality K2 Pro
summary: Creality K2 Pro é impressora FFF enclosed 300³ mm com câmara aquecida até
  60 °C e suporte a filamentos de engenharia, listada na loja oficial Creality em
  2026-08-16. Specs cruzam FAQ/loja Pro e tabela Compare K2 Series.
doc_type: printer
domain:
- printers
- fff
technology:
- material-extrusion
process:
- fff
applies_to:
- creality-k2-pro
- creality-print
not_for:
- treat-as-k2-base-without-chamber
- invent-dimension-reconciliation
knowledge_status: draft
lifecycle: current
coverage_level: documented
evidence_status: manufacturer-specific
safety_level: caution
confidence: high
last_reviewed: '2026-08-16'
review_cycle: 3-months
sources:
- source.creality-official-products
- source.creality-k2-series-product
- source.creality-k2-pro-store
related:
- manufacturer.creality
- hub.impressoras
- printer.creality-k2
- printer.creality-k2-plus
- tech.fff
prerequisites:
- tech.fff
supersedes: []
aliases_pt_br:
- K2 Pro
- Creality K2 Pro Combo
aliases_en:
- Creality K2 Pro
- K2 Pro Combo
tags:
- printer
- creality
- k2-series
- enclosed
- heated-chamber
- documented
manufacturer_id: creality
model_name: K2 Pro
family_status: k2-series
lifecycle_observed_at: '2026-08-16'
regions:
- Global
availability_evidence: Listed for purchase on official Creality store
  https://store.creality.com/products/k2-pro-combo-3d-printer and series page
  https://www.creality.com/products/k2-series-3d-printer (accessed 2026-08-16).
---
# Creality K2 Pro

Hub: [Impressoras](INDEX.md) · Fabricante: [Creality](manufacturer-creality.md)

## Identidade

| Campo | Valor |
|---|---|
| Fabricante | Creality (`manufacturer.creality`) |
| Modelo | Creality K2 Pro |
| Família | k2-series |
| coverage_level | `documented` |
| Regiões | Global |
| Variantes | K2 Pro; K2 Pro Combo (CFS) |

## Lifecycle

| Campo | Valor |
|---|---|
| lifecycle | `current` |
| observed_at | 2026-08-16 |
| evidence | Listed for purchase on official Creality store https://store.creality.com/products/k2-pro-combo-3d-printer and series page https://www.creality.com/products/k2-series-3d-printer (accessed 2026-08-16). |
| URL loja | https://store.creality.com/products/k2-pro-combo-3d-printer |
| Support | https://www.creality.com/support/k2-series |

## Especificações

Cruzamento [source.creality-k2-pro-store](../22-fontes/creality-k2-pro-store.md) + Compare em [source.creality-k2-series-product](../22-fontes/creality-k2-series-product.md) (2026-08-16):

| Capability | Valor oficial observado | Nota |
|---|---|---|
| Build volume | 300 × 300 × 300 mm | loja FAQ + série (oficial)|
| Dimensões (série) | 445 × 477 × 573 mm | Compare (oficial)|
| Dimensões (loja) | 445 × 505 × 850 mm | **divergência** — não reconciliar inventando (oficial)|
| Peso líquido | 23,7 kg | série + loja |
| Max speed / accel | ≤600 mm/s, ≤20000 mm/s² | loja + série (oficial)|
| Max nozzle | ≤300 °C | loja FAQ + série (oficial)|
| Max heatbed | ≤110 °C | loja + série (oficial)|
| Max chamber | ≤60 °C (active chamber heating) | loja + série (oficial)|
| Nozzle diameter | 0,4 mm | loja (oficial)|
| Filament diameter | 1,75 mm | loja (oficial)|
| Extruder | Dual-gear direct drive | loja |
| Storage | 32 GB eMMC | série + loja |
| Rated power | 1300 W | loja |
| Connectivity | Wi-Fi 2.4G / RJ45 / USB / Creality 485 | série |

## Tecnologia

- material extrusion / FFF (loja: “Fused Deposition Modeling”)
- Enclosed CoreXY com **active chamber heating** (diferencial vs K2 base)
- Step-servo em X/Y + extrusor; Dual Z (FAQ loja)
- CFS até 4 unidades / 16 cores

## Manuais

- https://www.creality.com/support/k2-series (unboxing, firmware, vídeos)
- Creality Wiki linked from store FAQ
- Service manual pinado: lacuna

## Hardware

- All-metal frame parts (nota série: Pro/Plus)
- Chamber AI 720p + **nozzle AI camera** para flow calibration (Compare)
- Built-in RFID reader; 1× air filter; 1× auxiliary fan
- Flexible PEI build plate (loja)
- Active chamber heater Yes (loja)

## Software

- Creality OS; Creality Cloud; remote control (datasheet claims em canais de suporte)

## Firmware

- Support page lista builds (ex.: menção V1.1.4.1 em trechos indexados) — **versão pinada desta revisão wiki**: tratar como lacuna até extrair release notes em `source.*` dedicado

## Slicer

- Creality Print 6.0 or newer (loja)
- Usar perfil **K2 Pro**; não reutilizar presets K2 (bed/chamber) sem revisão

## Materiais

- Oficiais: PLA, PETG, PET, ABS, ASA, PLA-CF, PA-CF, PPA-CF (loja FAQ + Compare)
- Nota oficial da série: ABS/ASA/PPS pedem ~60 °C de câmara; PAHT-CF ~50 °C (footnote marketing)
- TPU flexível via CFS: CFS store notes excluem TPU em alguns textos de CFS — validar por acessório

## Manutenção

- Full-auto leveling; input shaping Yes (loja)
- Filament run-out / tangle / power-loss recovery Yes (loja)
- Limpeza de filtro e sensor RFID: lacuna procedural local

## Segurança

- Câmara quente + VOC de ASA/ABS; air purifier claim presente
- AI failure detection não substitui supervisão em materiais de engenharia
- Critérios de parada: overheat, odor tóxico intenso, blockage na waste chute (feature Pro)

## Known issues

- Divergência de dimensões externas loja vs Compare — documentar ambas, não “média”
- Expectativa de paridade com K2 Plus (350 °C nozzle / dual filter) é incorreta
- Troubleshooting-mapped: ainda não

## Fontes

- [source.creality-k2-pro-store](../22-fontes/creality-k2-pro-store.md)
- [source.creality-k2-series-product](../22-fontes/creality-k2-series-product.md)
- [source.creality-official-products](../22-fontes/creality-official-products.md)

## Lacunas

- Reconciliação oficial de envelope externo
- Firmware release notes em página `source.*` pinada
- Troubleshooting-mapped (spaghetti, chamber heater faults, CFS jams)

<!-- editorial-fingerprint:printer.creality-k2-pro:creality-k2-pro.md -->

### Nota de especificidade — Creality K2 Pro

Este bloco existe para impedir documentação falsa-específica: o conteúdo operacional e as lacunas abaixo referem-se exclusivamente a **Creality K2 Pro** (`printer.creality-k2-pro`, fabricante `creality`), não a irmãos de linha. Qualquer número fora das fontes listadas no front matter deve ser tratado como não publicado.
