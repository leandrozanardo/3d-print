---
id: printer.creality-sparkx-i7
title: Creality SPARKX i7
summary: Creality SPARKX i7 é impressora FFF desktop 260×260×255 mm com AI camera,
  RGB status e opcionais CFS Lite/Mini/nano, listada no site e loja Creality em 2026-08-16.
doc_type: printer
domain:
- printers
- fff
technology:
- material-extrusion
process:
- fff
applies_to:
- creality-sparkx-i7
- creality-print
not_for:
- transfer-k2-chamber-presets
- invent-cfs-as-required
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
- source.creality-sparkx-i7-product
related:
- manufacturer.creality
- hub.impressoras
- printer.creality-sparkx-i7-nano
- tech.fff
prerequisites:
- tech.fff
supersedes: []
aliases_pt_br:
- SPARKX i7
- SparkX i7
aliases_en:
- Creality SPARKX i7
- SPARKX i7 Color Combo
- SPARKX i7 Autofill Combo
tags:
- printer
- creality
- sparkx
- documented
manufacturer_id: creality
model_name: SPARKX i7
family_status: sparkx-i7-series
lifecycle_observed_at: '2026-08-16'
regions:
- Global
availability_evidence: Listed on official Creality product page
  https://www.creality.com/products/sparkx-i7 and store
  https://store.creality.com/products/sparkx-i7-3d-printer (accessed 2026-08-16).
---
# Creality SPARKX i7

Hub: [Impressoras](INDEX.md) · Fabricante: [Creality](manufacturer-creality.md)

## Identidade

| Campo | Valor |
|---|---|
| Fabricante | Creality (`manufacturer.creality`) |
| Modelo | Creality SPARKX i7 |
| Família | sparkx-i7-series |
| coverage_level | `documented` |
| Regiões | Global |
| Variantes | SPARKX i7; Color Combo (CFS Lite); Autofill Combo (CFS Mini); Nano Combo (CFS nano) |

## Lifecycle

| Campo | Valor |
|---|---|
| lifecycle | `current` |
| observed_at | 2026-08-16 |
| evidence | Listed on official Creality product page https://www.creality.com/products/sparkx-i7 and store https://store.creality.com/products/sparkx-i7-3d-printer (accessed 2026-08-16). |
| URL produto | https://www.creality.com/products/sparkx-i7 |
| URL loja | https://store.creality.com/products/sparkx-i7-3d-printer |

## Especificações

Fonte: [source.creality-sparkx-i7-product](../22-fontes/creality-sparkx-i7-product.md) (+ loja irmã, 2026-08-16):

| Capability | Valor oficial observado | Nota |
|---|---|---|
| Printing technology | Fused Filament Fabrication | produto |
| Build volume | 260 × 260 × 255 mm | produto + loja (oficial)|
| Printer dimensions | 470 × 423 × 456 mm | produto (oficial)|
| Net weight | 9,12 kg | produto |
| Max speed / accel | ≤500 mm/s / ≤10000 mm/s² | produto (oficial)|
| Layer height | 0,05–0,3 mm | produto (oficial)|
| Extruder | Direct drive | produto |
| Nozzle | 0,4 mm (compat. 0,2/0,6/0,8) | produto (oficial)|
| Filament Ø | 1,75 mm | produto (oficial)|
| Max nozzle / bed | ≤300 °C / ≤100 °C | produto (oficial)|
| Build plate | Dual-sided golden textured PEI | produto |
| Display | 2,85-inch color touchscreen | produto |
| AI camera | 720p with lighting | produto |
| Storage | 8G eMMC | produto |
| Firmware stack | Creality OS | produto |
| Rated power | 700W@220V / 400W@110V | produto |
| Wi-Fi | 2,4 GHz | produto |

## Tecnologia

- material extrusion / FFF
- Desktop bed-slinger positioning (reviews/marketing); não é a CoreXY enclosed K2
- Multicolor via CFS Lite (4 cores) / CFS nano / refill via CFS Mini — acessórios, não obrigatórios
- Pressure Advance + Input Shaping Yes

## Manuais

- Creality Wiki SPARKX i7 (FAQ/firmware referenciados publicamente)
- Ticket 1:1 via Creality Cloud App (marketing)
- Manual PDF pinado nesta wiki: lacuna

## Hardware

- Quick-swap hotend / extruder lever / filament cutter
- RGB status light bar (programável)
- Camera com privacy cover
- RS485 port para CFS
- Night Mode (quiet + lights off) marketing

## Software

- Creality Print 6.3 or newer
- Creality Cloud + CubeMe AI (photo→model; privacy claims na página)

## Firmware

- Creality OS; updates via wiki/support — **build pinado**: não publicado na evidência de produto consultada em 2026-08-16

## Slicer

- Creality Print ≥6.3
- Usar preset **SPARKX i7**; não colar K2/K1

## Materiais

- Página oficial: PLA / PETG / PLA-CF / TPU (shore 64D or harder)
- Loja adicionalmente lista PLA-Silk — citar loja se usar esse claim
- ABS/ASA: **não** listados nas specs oficiais consultadas — não inventar

## Manutenção

- Full-auto leveling (área do print); Z-offset e input shaping auto pré-print
- Filament run-out / tangle / cutter wear monitoring Yes
- Power loss recovery Yes
- Kit de peças oficiais opcional

## Segurança

- Hotend/bed quentes; open/desktop footprint — supervisão
- AI spaghetti detection auxilia, não substitui presença
- Critérios de parada: air printing, entanglement, odor, overheat

## Known issues

- Só Color Combo vem fully assembled (nota produto); outras SKUs podem exigir montagem
- Confusão entre CFS Lite vs Mini vs nano
- Filament list site≠loja (PLA-Silk)

## Fontes

- [source.creality-sparkx-i7-product](../22-fontes/creality-sparkx-i7-product.md)
- [source.creality-official-products](../22-fontes/creality-official-products.md)
- Loja: https://store.creality.com/products/sparkx-i7-3d-printer

## Lacunas

- Manual/firmware pinados
- Clarificação oficial bed-slinger vs kinematics diagram
- Troubleshooting-mapped (AI false positives, CFS Lite humidity)
