---
id: printer.prusa-research-mk4s
title: Prusa Research Original Prusa MK4S
summary: Original Prusa MK4S é FFF Cartesian bed-slinger 250×210×220 mm, nozzle 290 °C / bed 120 °C, listada In stock na loja oficial em 2026-08-16.
doc_type: printer
domain:
- printers
- fff
technology:
- material-extrusion
process:
- fff
applies_to:
- prusa-research-mk4s
not_for:
- invent-missing-specs
- blind-profile-transfer
knowledge_status: draft
lifecycle: current
coverage_level: documented
evidence_status: manufacturer-specific
safety_level: caution
confidence: high
last_reviewed: '2026-08-16'
review_cycle: 3-months
sources:
- source.prusa-research-official-products
- source.prusa-research-mk4s
related:
- manufacturer.prusa-research
- hub.impressoras
- tech.fff
prerequisites:
- tech.fff
supersedes: []
aliases_pt_br: []
aliases_en:
- Original Prusa MK4S
- Prusa Original Prusa MK4S
- Original Prusa Original Prusa MK4S
tags:
- printer
- prusa-research
- fff
- documented
- mk-series
manufacturer_id: prusa-research
model_name: Original Prusa MK4S
family_status: mk-series
lifecycle_observed_at: '2026-08-16'
regions:
- Global
availability_evidence: Listed In stock with Add to cart on official Prusa shop https://www.prusa3d.com/product/original-prusa-mk4s-3d-printer-8/ (accessed 2026-08-16).
---
# Prusa Research Original Prusa MK4S

Hub: [Impressoras](INDEX.md) · Fabricante: [Prusa Research](manufacturer-prusa-research.md)

## Identidade

| Campo | Valor |
|---|---|
| Fabricante | Prusa Research (`manufacturer.prusa-research`) |
| Modelo | Original Prusa MK4S |
| Família | mk-series |
| coverage_level | `documented` |
| Regiões | Global |

## Lifecycle

| Campo | Valor |
|---|---|
| lifecycle | `current` |
| observed_at | 2026-08-16 |
| evidence | Listed In stock with Add to cart on official Prusa shop https://www.prusa3d.com/product/original-prusa-mk4s-3d-printer-8/ (accessed 2026-08-16). |
| URL produto | https://www.prusa3d.com/product/original-prusa-mk4s-3d-printer-8/ |

## Especificações

Valores observados na evidência citada (acesso 2026-08-16). Capability observada ≠ resultado de processo em qualquer material.

| Capability | Valor oficial observado | Fonte |
|---|---|---|
| Build volume | 250 × 210 × 220 mm | Technical Parameters (oficial) |
| Max nozzle / bed | 290 °C / 120 °C | Technical Parameters (oficial) |
| Layer height | 0.05–0.30 mm | Technical Parameters (oficial) |
| Nozzle | High-flow Prusa Nozzle brass CHT 0.4 mm | Technical Parameters (oficial) |
| Weight / size | 7 kg; 500 × 550 × 400 mm (without spool) | Technical Parameters (oficial) |
| PSU | 240 W Delta with Power Panic HW | Technical Parameters (oficial) |

Cells não listadas na evidência: **não publicado pelo fabricante na evidência consultada em 2026-08-16**.

## Tecnologia

Claims do fabricante (fonte oficial; evidência datada):

- Categoria: material extrusion / FFF; Cartesian open design
- Nextruder + 360° cooling; Input Shaper; sem PhaseStepping (compare)
- Enclosure opcional para ABS/ASA/PC

## Manuais

- Página produto/manual links: https://www.prusa3d.com/product/original-prusa-mk4s-3d-printer-8/
- Service manual completo pinado: lacuna se não linkado na evidência

## Hardware

- Load Cell first-layer; filament sensor; MMU3 optional (5 colors)

## Software

- Ecossistema oficial do fabricante (app/cloud/LAN conforme página)
- Não expandir política de conta sem evidência

## Firmware

- Versão pinada: não publicado pelo fabricante na evidência consultada em 2026-08-16

## Slicer

- Usar preset/perfil do **modelo**; não colar perfil de outra família sem revisão

## Materiais

- PLA, PETG, Flex, PVA, PC, PP, CPE, PVB; with Enclosure+filtration: ABS, ASA, HIPS, PA

TDS/SDS do filamento/resina não são substituídos por esta página.

## Manutenção

- Calibração: seguir fluxo oficial (auto-level / first-layer checks) antes de produção
- Limpeza de bico/mesa: conforme manual; não inventar intervalos sem evidência
- Lubrificação e tensionamento: lacuna procedural local se não pinado pelo OEM

## Segurança

- Superfícies quentes (hotend/bed): risco de queimadura
- Peças móveis: manter mãos fora da área de movimento durante print
- ABS/ASA/engenharia: ventilação / filtragem conforme SDS e enclosure
- Critérios de parada: odor forte anômalo, smoke, layer-shift grave, spaghetti não contido

## Known issues

- High-flow nozzle vs MMU3: fabricante recomenda nozzle standard para menor waste
- Marketing de velocidade máxima ≠ velocidade recomendada de qualidade
- Transferência de perfil entre famílias/modelos sem revisão: risco alto

## Fontes

- [source.prusa-research-official-products](../22-fontes/prusa-research-official-products.md)
- [source.prusa-research-mk4s](../22-fontes/prusa-research-mk4s.md)
- URL oficial: https://www.prusa3d.com/product/original-prusa-mk4s-3d-printer-8/

## Lacunas

- Firmware pinado com hash/versão datada
- Service manual completo / BOM por serial
- Troubleshooting-mapped por sintoma
