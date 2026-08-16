---
id: printer.prusa-research-core-one-l-plus
title: Prusa Research Prusa CORE One L+
summary: Prusa CORE One L+ é FFF CoreXY enclosed large ~300×300×330 mm com câmara ativa até 60 °C, listada no catálogo oficial Prusa em 2026-08-16.
doc_type: printer
domain:
- printers
- fff
technology:
- material-extrusion
process:
- fff
applies_to:
- prusa-research-core-one-l-plus
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
- source.prusa-research-core-one-l-plus
related:
- manufacturer.prusa-research
- hub.impressoras
- tech.fff
prerequisites:
- tech.fff
supersedes: []
aliases_pt_br: []
aliases_en:
- Prusa CORE One L+
- Prusa Prusa CORE One L+
- Original Prusa Prusa CORE One L+
tags:
- printer
- prusa-research
- fff
- documented
- core-one-series
manufacturer_id: prusa-research
model_name: Prusa CORE One L+
family_status: core-one-series
lifecycle_observed_at: '2026-08-16'
regions:
- Global
availability_evidence: Listed on official Prusa category https://www.prusa3d.com/category/3d-printers/ as Prusa CORE One L+ and product page https://www.prusa3d.com/product/prusa-core-one-l-3/ (accessed 2026-08-16).
---
# Prusa Research Prusa CORE One L+

Hub: [Impressoras](INDEX.md) · Fabricante: [Prusa Research](manufacturer-prusa-research.md)

## Identidade

| Campo | Valor |
|---|---|
| Fabricante | Prusa Research (`manufacturer.prusa-research`) |
| Modelo | Prusa CORE One L+ |
| Família | core-one-series |
| coverage_level | `documented` |
| Regiões | Global |

## Lifecycle

| Campo | Valor |
|---|---|
| lifecycle | `current` |
| observed_at | 2026-08-16 |
| evidence | Listed on official Prusa category https://www.prusa3d.com/category/3d-printers/ as Prusa CORE One L+ and product page https://www.prusa3d.com/product/prusa-core-one-l-3/ (accessed 2026-08-16). |
| URL produto | https://www.prusa3d.com/product/prusa-core-one-l-3/ |

## Especificações

Valores observados na evidência citada (acesso 2026-08-16). Capability observada ≠ resultado de processo em qualquer material.

| Capability | Valor oficial observado | Fonte |
|---|---|---|
| Build volume | 300 × 300 × 330 mm (30 L claim on product narrative) | product (oficial) |
| Compare-table volume note | Some compare widgets also show 300 × 300 × 350 mm — treat as conflict; prefer dedicated product tech block when available | product/compare (oficial) |
| Chamber heating | Active convection up to 60 °C | product compare (oficial) |
| Max nozzle | 290 °C (400 °C w/ HT) | compare vs CORE One+ |

Cells não listadas na evidência: **não publicado pelo fabricante na evidência consultada em 2026-08-16**.

## Tecnologia

Claims do fabricante (fonte oficial; evidência datada):

- Categoria: material extrusion / FFF; larger sibling of CORE One+
- Critical Infrastructure Edition mentioned for offline/secured variants

## Manuais

- Página produto/manual links: https://www.prusa3d.com/product/prusa-core-one-l-3/
- Service manual completo pinado: lacuna se não linkado na evidência

## Hardware

- All-aluminum heatbed with dual-loop convection (AC) vs MK52 DC on CORE One+ (compare)

## Software

- Ecossistema oficial do fabricante (app/cloud/LAN conforme página)
- Não expandir política de conta sem evidência

## Firmware

- Versão pinada: não publicado pelo fabricante na evidência consultada em 2026-08-16

## Slicer

- Usar preset/perfil do **modelo**; não colar perfil de outra família sem revisão

## Materiais

- Mesmo ecossistema PrusaSlicer; high-temp materials optimized with HT upgrade (marketing)

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

- Conflito 330 vs 350 mm Z em widgets (fonte oficial) — não piná-lo sem datasheet único
- Marketing de velocidade máxima ≠ velocidade recomendada de qualidade
- Transferência de perfil entre famílias/modelos sem revisão: risco alto

## Fontes

- [source.prusa-research-official-products](../22-fontes/prusa-research-official-products.md)
- [source.prusa-research-core-one-l-plus](../22-fontes/prusa-research-core-one-l-plus.md)
- URL oficial: https://www.prusa3d.com/product/prusa-core-one-l-3/

## Lacunas

- Firmware pinado com hash/versão datada
- Service manual completo / BOM por serial
- Troubleshooting-mapped por sintoma
