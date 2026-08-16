---
id: printer.prusa-research-pro-ht90
title: Prusa Research Prusa Pro HT90
summary: Prusa Pro HT90 é impressora FFF da linha Prusa Pro (alta temperatura), listada In stock no catálogo oficial em 2026-08-16.
doc_type: printer
domain:
- printers
- fff
technology:
- material-extrusion
process:
- fff
applies_to:
- prusa-research-pro-ht90
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
- source.prusa-research-pro-ht90
related:
- manufacturer.prusa-research
- hub.impressoras
- tech.fff
prerequisites:
- tech.fff
supersedes: []
aliases_pt_br: []
aliases_en:
- Prusa Pro HT90
- Prusa Prusa Pro HT90
- Original Prusa Prusa Pro HT90
tags:
- printer
- prusa-research
- fff
- documented
- prusa-pro-series
manufacturer_id: prusa-research
model_name: Prusa Pro HT90
family_status: prusa-pro-series
lifecycle_observed_at: '2026-08-16'
regions:
- Global
availability_evidence: Listed In stock on official Prusa category https://www.prusa3d.com/category/3d-printers/ (Order preparation time is 1 week; accessed 2026-08-16).
---
# Prusa Research Prusa Pro HT90

Hub: [Impressoras](INDEX.md) · Fabricante: [Prusa Research](manufacturer-prusa-research.md)

## Identidade

| Campo | Valor |
|---|---|
| Fabricante | Prusa Research (`manufacturer.prusa-research`) |
| Modelo | Prusa Pro HT90 |
| Família | prusa-pro-series |
| coverage_level | `documented` |
| Regiões | Global |

## Lifecycle

| Campo | Valor |
|---|---|
| lifecycle | `current` |
| observed_at | 2026-08-16 |
| evidence | Listed In stock on official Prusa category https://www.prusa3d.com/category/3d-printers/ (Order preparation time is 1 week; accessed 2026-08-16). |
| URL produto | https://www.prusa3d.com/product/prusa-pro-ht90/ |

## Especificações

Valores observados na evidência citada (acesso 2026-08-16). Capability observada ≠ resultado de processo em qualquer material.

| Capability | Valor oficial observado | Fonte |
|---|---|---|
| Listing | Prusa Pro HT90 — In stock; preparation ~1 week | category (oficial) |
| Handbook class | Prusa Pro — HT90 in Printer Handbooks index | help.prusa3d.com (oficial) |

Cells não listadas na evidência: **não publicado pelo fabricante na evidência consultada em 2026-08-16**.

## Tecnologia

Claims do fabricante (fonte oficial; evidência datada):

- Categoria: material extrusion / FFF (Prusa Pro high-temp class)
- Não tratar como MK4S desktop sem revisar envelope térmico

## Manuais

- Página produto/manual links: https://www.prusa3d.com/product/prusa-pro-ht90/
- Service manual completo pinado: lacuna se não linkado na evidência

## Hardware

- Industrial/pro form factor per Prusa Pro branding

## Software

- Ecossistema oficial do fabricante (app/cloud/LAN conforme página)
- Não expandir política de conta sem evidência

## Firmware

- Versão pinada: não publicado pelo fabricante na evidência consultada em 2026-08-16

## Slicer

- Usar preset/perfil do **modelo**; não colar perfil de outra família sem revisão

## Materiais

- Materiais high-temp: seguir página Pro / handbook — não inventar °C

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

- Tabela numérica completa de volume/temps: lacuna se product page for SPA-heavy nesta revisão
- Marketing de velocidade máxima ≠ velocidade recomendada de qualidade
- Transferência de perfil entre famílias/modelos sem revisão: risco alto

## Fontes

- [source.prusa-research-official-products](../22-fontes/prusa-research-official-products.md)
- [source.prusa-research-pro-ht90](../22-fontes/prusa-research-pro-ht90.md)
- URL oficial: https://www.prusa3d.com/product/prusa-pro-ht90/

## Lacunas

- Firmware pinado com hash/versão datada
- Service manual completo / BOM por serial
- Troubleshooting-mapped por sintoma
