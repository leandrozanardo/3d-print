---
id: printer.creality-k2
title: Creality K2
summary: Creality K2 é impressora FFF enclosed da série K2 (volume 260³ mm), listada
  para compra na loja oficial Creality em 2026-08-16. Specs de volume, temps e filamentos
  vêm da tabela Compare oficial K2 Series; sem câmara aquecida ativa (diferente de
  K2 Pro/Plus).
doc_type: printer
domain:
- printers
- fff
technology:
- material-extrusion
process:
- fff
applies_to:
- creality-k2
- creality-print
not_for:
- assume-heated-chamber-like-k2-pro
- invent-missing-k2-only-cells
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
- source.creality-k2-store
related:
- manufacturer.creality
- hub.impressoras
- printer.creality-k2-pro
- printer.creality-k2-plus
- printer.creality-k2-se
- tech.fff
prerequisites:
- tech.fff
supersedes: []
aliases_pt_br:
- K2
- Creality K2 Combo
aliases_en:
- Creality K2
- K2 Combo
tags:
- printer
- creality
- k2-series
- enclosed
- documented
manufacturer_id: creality
model_name: K2
family_status: k2-series
lifecycle_observed_at: '2026-08-16'
regions:
- Global
availability_evidence: Listed for purchase on official Creality store
  https://store.creality.com/products/k2-combo-3d-printer and series page
  https://www.creality.com/products/k2-series-3d-printer (accessed 2026-08-16).
---
# Creality K2

Hub: [Impressoras](INDEX.md) · Fabricante: [Creality](manufacturer-creality.md)

## Identidade

| Campo | Valor |
|---|---|
| Fabricante | Creality (`manufacturer.creality`) |
| Modelo | Creality K2 |
| Família | k2-series |
| coverage_level | `documented` |
| Regiões | Global |
| Variantes | K2; K2 Combo (1× CFS incluso no combo, CFS extras à parte) |

## Lifecycle

| Campo | Valor |
|---|---|
| lifecycle | `current` |
| observed_at | 2026-08-16 |
| evidence | Listed for purchase on official Creality store https://store.creality.com/products/k2-combo-3d-printer and series page https://www.creality.com/products/k2-series-3d-printer (accessed 2026-08-16). |
| URL loja | https://store.creality.com/products/k2-combo-3d-printer |
| URL série | https://www.creality.com/products/k2-series-3d-printer |

## Especificações

Valores da tabela **Compare K2 Series** em [source.creality-k2-series-product](../22-fontes/creality-k2-series-product.md) (acesso 2026-08-16), cruzados com marketing da loja K2:

| Capability | Valor oficial observado | Fonte |
|---|---|---|
| Build volume | 260 × 260 × 260 mm | série + loja (oficial)|
| Dimensões produto | 404 × 436 × 545 mm | série (oficial)|
| Peso líquido | 18,3 kg | série |
| Max print speed / accel | 600 mm/s, 20000 mm/s² | série (nota: tipicamente 300 mm/s) (oficial)|
| Max nozzle | 300 °C | série (oficial)|
| Max heatbed | 100 °C | série (oficial)|
| Max chamber | — (sem câmara aquecida ativa; célula “-” na Compare) | série |
| Filamentos | PLA / PETG / PET / ABS / PLA-CF | série |
| Storage | 8 GB eMMC | série |
| Touchscreen | 4-inch | série |
| Hotend power (rated) | 70 W | série |

Cells não listadas para o SKU K2 na evidência: **não publicado pelo fabricante na evidência consultada em 2026-08-16** (ex.: flow rate pinado só em nota genérica da série).

## Tecnologia

- Categoria: material extrusion
- Processo: FFF (fabricante também usa rótulo FDM em lojas)
- Arquitetura: CoreXY enclosed da família K2; step-servo em eixos X/Y + extrusor (não Z servo como no K2 Plus)
- Multicolor: CFS opcional/combo, até 4× CFS / 16 cores (claim série)

## Manuais

- Support hub série K2: https://www.creality.com/support/k2-series
- Wiki Creality / quick-start: mapear por sintoma (ainda não troubleshooting-mapped)
- Service manual completo pinado: lacuna

## Hardware

- Enclosure com 1× air filter e 1× auxiliary cooling fan (Compare)
- Dual-gear direct drive / quick-swap hotend (marketing série)
- Chamber AI camera 720p @30fps; **sem** nozzle AI camera / RFID reader built-in (Compare: “-” vs Pro/Plus)
- Flexible build plate (claim genérico série; PEI específico: lacuna K2-only)

## Software

- Creality OS (multicolor + root access mencionados no marketing série)
- Creality Cloud (PC/phone)

## Firmware

- Canal OTA / versão pinada para K2 nesta revisão: **não publicado pelo fabricante na evidência consultada em 2026-08-16** (não inventar build)

## Slicer

- Primário: Creality Print (série aponta rebuild; loja Pro cita 6.0+ — usar preset **K2**, não colar perfil K2 Pro/Plus)

## Materiais

- Oficiais (Compare K2): PLA, PETG, PET, ABS, PLA-CF
- ASA / PA-CF / PPA-CF: listados para Pro/Plus, **não** para K2 na Compare — não transferir
- ABS em enclosure sem câmara ativa: possível por claim de lista, mas warping/VOC exigem cautela operacional

## Manutenção

- Auto-leveling / fan calibration no boot (marketing série)
- Rotinas locais de lubrificação/filtro: lacuna documentada

## Segurança

- Superfícies quentes, peças móveis, VOCs de ABS/PET; air filter presente mas não elimina PPE/ventilação
- Critérios de parada: fumaça, odor anômalo, spaghetti detectado sem intervenção, overheat reportado

## Known issues

- Sem nozzle AI / RFID / heated chamber — usuários podem esperar paridade com K2 Pro por marketing “série”
- Dimensões/combos CFS: validar SKU (K2 vs Combo) antes de pedidos de peça
- Troubleshooting-mapped oficial: ainda não

## Fontes

- [source.creality-k2-store](../22-fontes/creality-k2-store.md)
- [source.creality-k2-series-product](../22-fontes/creality-k2-series-product.md)
- [source.creality-official-products](../22-fontes/creality-official-products.md)

## Lacunas

- Datasheet PDF K2 pinado com revisão
- Firmware version pinada
- Troubleshooting-mapped por sintoma
- Diâmetro de nozzle default confirmado em PDF (marketing cita quick-swap; célula dedicada K2 incompleta na loja consultada)
