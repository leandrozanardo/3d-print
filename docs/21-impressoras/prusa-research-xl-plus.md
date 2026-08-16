---
id: printer.prusa-research-xl-plus
title: Prusa Research Prusa XL+
summary: Original Prusa XL+ / XL é FFF toolchanger large-format 360³ mm, listada no catálogo oficial Prusa em 2026-08-16.
doc_type: printer
domain:
- printers
- fff
technology:
- material-extrusion
process:
- fff
applies_to:
- prusa-research-xl-plus
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
- source.prusa-research-xl-plus
related:
- manufacturer.prusa-research
- hub.impressoras
- tech.fff
prerequisites:
- tech.fff
supersedes: []
aliases_pt_br: []
aliases_en:
- Original Prusa XL+
- Prusa Original Prusa XL+
- Original Prusa Original Prusa XL+
tags:
- printer
- prusa-research
- fff
- documented
- xl-series
manufacturer_id: prusa-research
model_name: Original Prusa XL+
family_status: xl-series
lifecycle_observed_at: '2026-08-16'
regions:
- Global
availability_evidence: Listed on official Prusa category as Original Prusa XL+ (shipping starts note observed) and product family https://www.prusa3d.com/product/original-prusa-xl/ (accessed 2026-08-16).
---
# Prusa Research Prusa XL+

Hub: [Impressoras](INDEX.md) · Fabricante: [Prusa Research](manufacturer-prusa-research.md)

## Identidade

| Campo | Valor |
|---|---|
| Fabricante | Prusa Research (`manufacturer.prusa-research`) |
| Modelo | Original Prusa XL+ |
| Família | xl-series |
| coverage_level | `documented` |
| Regiões | Global |

## Lifecycle

| Campo | Valor |
|---|---|
| lifecycle | `current` |
| observed_at | 2026-08-16 |
| evidence | Listed on official Prusa category as Original Prusa XL+ (shipping starts note observed) and product family https://www.prusa3d.com/product/original-prusa-xl/ (accessed 2026-08-16). |
| URL produto | https://www.prusa3d.com/product/original-prusa-xl/ |

## Especificações

Valores observados na evidência citada (acesso 2026-08-16). Capability observada ≠ resultado de processo em qualquer material.

| Capability | Valor oficial observado | Fonte |
|---|---|---|
| Build volume | 360 × 360 × 360 mm | product compare / narrative |
| Toolheads | Up to 5 independent toolheads (true multi-material) | compare (oficial) |
| Max nozzle / bed | 290 °C / 120 °C | compare vs MK4S |
| Heatbed | 16× individual heatbed tiles | compare (oficial) |

Cells não listadas na evidência: **não publicado pelo fabricante na evidência consultada em 2026-08-16**.

## Tecnologia

Claims do fabricante (fonte oficial; evidência datada):

- Categoria: material extrusion / FFF; CoreXY toolchanger platform
- PhaseStepping + Input Shaper (compare)

## Manuais

- Página produto/manual links: https://www.prusa3d.com/product/original-prusa-xl/
- Service manual completo pinado: lacuna se não linkado na evidência

## Hardware

- Optional enclosure / filtration referenced in compare

## Software

- Ecossistema oficial do fabricante (app/cloud/LAN conforme página)
- Não expandir política de conta sem evidência

## Firmware

- Versão pinada: não publicado pelo fabricante na evidência consultada em 2026-08-16

## Slicer

- Usar preset/perfil do **modelo**; não colar perfil de outra família sem revisão

## Materiais

- Ecossistema Prusament + PrusaSlicer profiles for XL

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

- Category label XL+ vs product URL XL — documentar naming; não inventar delta mecânico sem nota oficial
- Marketing de velocidade máxima ≠ velocidade recomendada de qualidade
- Transferência de perfil entre famílias/modelos sem revisão: risco alto

## Fontes

- [source.prusa-research-official-products](../22-fontes/prusa-research-official-products.md)
- [source.prusa-research-xl-plus](../22-fontes/prusa-research-xl-plus.md)
- URL oficial: https://www.prusa3d.com/product/original-prusa-xl/

## Lacunas

- Firmware pinado com hash/versão datada
- Service manual completo / BOM por serial
- Troubleshooting-mapped por sintoma
