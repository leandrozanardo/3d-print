---
id: printer.prusa-research-mini-plus
title: Prusa Research Original Prusa MINI+
summary: Original Prusa MINI+ é FFF compacta da linha Prusa, listada no catálogo oficial de impressoras em 2026-08-16.
doc_type: printer
domain:
- printers
- fff
technology:
- material-extrusion
process:
- fff
applies_to:
- prusa-research-mini-plus
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
- source.prusa-research-mini-plus
related:
- manufacturer.prusa-research
- hub.impressoras
- tech.fff
prerequisites:
- tech.fff
supersedes: []
aliases_pt_br: []
aliases_en:
- Original Prusa MINI+
- Prusa Original Prusa MINI+
- Original Prusa Original Prusa MINI+
tags:
- printer
- prusa-research
- fff
- documented
- mini-series
manufacturer_id: prusa-research
model_name: Original Prusa MINI+
family_status: mini-series
lifecycle_observed_at: '2026-08-16'
regions:
- Global
availability_evidence: Listed on official Prusa 3D printers category https://www.prusa3d.com/category/3d-printers/ as Original Prusa MINI+ Semi-assembled (accessed 2026-08-16).
---
# Prusa Research Original Prusa MINI+

Hub: [Impressoras](INDEX.md) · Fabricante: [Prusa Research](manufacturer-prusa-research.md)

## Identidade

| Campo | Valor |
|---|---|
| Fabricante | Prusa Research (`manufacturer.prusa-research`) |
| Modelo | Original Prusa MINI+ |
| Família | mini-series |
| coverage_level | `documented` |
| Regiões | Global |

## Lifecycle

| Campo | Valor |
|---|---|
| lifecycle | `current` |
| observed_at | 2026-08-16 |
| evidence | Listed on official Prusa 3D printers category https://www.prusa3d.com/category/3d-printers/ as Original Prusa MINI+ Semi-assembled (accessed 2026-08-16). |
| URL produto | https://www.prusa3d.com/category/3d-printers/ |

## Especificações

Valores observados na evidência citada (acesso 2026-08-16). Capability observada ≠ resultado de processo em qualquer material.

| Capability | Valor oficial observado | Fonte |
|---|---|---|
| Listing | Original Prusa MINI+ Semi-assembled on official category | category (oficial) |
| Handbook class | FFF printers — MINI & MINI+ in Prusa Knowledge Base handbooks index | help.prusa3d.com (oficial) |

Cells não listadas na evidência: **não publicado pelo fabricante na evidência consultada em 2026-08-16**.

## Tecnologia

Claims do fabricante (fonte oficial; evidência datada):

- Categoria: material extrusion / FFF
- Compact / semi-assembled SKU; ecossistema PrusaSlicer

## Manuais

- Página produto/manual links: https://www.prusa3d.com/category/3d-printers/
- Service manual completo pinado: lacuna se não linkado na evidência

## Hardware

- Semi-assembled packaging per category title

## Software

- Ecossistema oficial do fabricante (app/cloud/LAN conforme página)
- Não expandir política de conta sem evidência

## Firmware

- Versão pinada: não publicado pelo fabricante na evidência consultada em 2026-08-16

## Slicer

- Usar preset/perfil do **modelo**; não colar perfil de outra família sem revisão

## Materiais

- Usar perfis MINI+ oficiais; não copiar MK4S/CORE One sem adaptação

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

- Build volume / temps: não inventados nesta revisão — abrir product page dedicada na próxima passagem
- Marketing de velocidade máxima ≠ velocidade recomendada de qualidade
- Transferência de perfil entre famílias/modelos sem revisão: risco alto

## Fontes

- [source.prusa-research-official-products](../22-fontes/prusa-research-official-products.md)
- [source.prusa-research-mini-plus](../22-fontes/prusa-research-mini-plus.md)
- URL oficial: https://www.prusa3d.com/category/3d-printers/

## Lacunas

- Firmware pinado com hash/versão datada
- Service manual completo / BOM por serial
- Troubleshooting-mapped por sintoma
