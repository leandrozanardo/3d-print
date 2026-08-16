---
id: printer.prusa-research-sl1s-speed
title: Prusa Research Original Prusa SL1S SPEED
summary: Original Prusa SL1S SPEED é impressora MSLA/SLA de resina da Prusa, listada para compra no catálogo oficial em 2026-08-16.
doc_type: printer
domain:
- printers
- resin
technology:
- vat-photopolymerization
process:
- msla
applies_to:
- prusa-research-sl1s-speed
not_for:
- fff-settings-transfer
- invent-exposure-times
knowledge_status: draft
lifecycle: current
coverage_level: documented
evidence_status: manufacturer-specific
safety_level: high
confidence: high
last_reviewed: '2026-08-16'
review_cycle: 3-months
sources:
- source.prusa-research-official-products
- source.prusa-research-sl1s-speed
related:
- manufacturer.prusa-research
- hub.impressoras
- tech.vat-photopolymerization
- tech.sla-dlp-msla
prerequisites:
- tech.sla-dlp-msla
supersedes: []
aliases_pt_br: []
aliases_en:
- Original Prusa SL1S SPEED
- Original Prusa Original Prusa SL1S SPEED
tags:
- printer
- prusa-research
- resin
- msla
- documented
- sl1-series
manufacturer_id: prusa-research
model_name: Original Prusa SL1S SPEED
family_status: sl1-series
lifecycle_observed_at: '2026-08-16'
regions:
- Global
availability_evidence: Listed with Buy CTA on official Prusa category https://www.prusa3d.com/category/3d-printers/ (SL1S SPEED and CW1S bundle; accessed 2026-08-16).
---
# Prusa Research Original Prusa SL1S SPEED

Hub: [Impressoras](INDEX.md) · Fabricante: [Prusa Research](manufacturer-prusa-research.md)

## Identidade

| Campo | Valor |
|---|---|
| Fabricante | Prusa Research (`manufacturer.prusa-research`) |
| Modelo | Original Prusa SL1S SPEED |
| Família | sl1-series |
| coverage_level | `documented` |
| Regiões | Global |

## Lifecycle

| Campo | Valor |
|---|---|
| lifecycle | `current` |
| observed_at | 2026-08-16 |
| evidence | Listed with Buy CTA on official Prusa category https://www.prusa3d.com/category/3d-printers/ (SL1S SPEED and CW1S bundle; accessed 2026-08-16). |
| URL produto | https://www.prusa3d.com/category/3d-printers/ |

## Especificações

Valores observados na evidência citada (acesso 2026-08-16). Capability observada ≠ resultado de processo em qualquer material.

| Capability | Valor oficial observado | Fonte |
|---|---|---|
| Listing | Original Prusa SL1S SPEED + CW1S bundle on official category | category (oficial) |
| Handbook class | MSLA/SLA printers — SL1S SPEED | help.prusa3d.com (oficial) |

Cells não listadas na evidência: **não publicado pelo fabricante na evidência consultada em 2026-08-16**.

## Tecnologia

Claims do fabricante (fonte oficial; evidência datada):

- Categoria: vat photopolymerization / msla (Prusa SLA lineage)
- Não é FFF MK/CORE/XL

## Manuais

- Página produto/FAQ: https://www.prusa3d.com/category/3d-printers/
- Wiki/support OEM quando linkado na página

## Hardware

- CW1S curing/washing bundle listed alongside printer

## Software

- Slicer resin oficial / Chitubox / Lychee conforme OEM
- Não importar perfis FFF

## Firmware

- Versão pinada: não publicado pelo fabricante na evidência consultada em 2026-08-16

## Slicer

- Usar perfil do **modelo/resolução**; exposição/lift específicos

## Materiais

- Resinas Prusa / third-party com perfis oficiais — não inventar exposição

TDS/SDS do filamento/resina não são substituídos por esta página.

## Manutenção

- Leveling / film / LCD protector: seguir procedimento oficial do modelo
- Troca de filme de liberação: resetar contadores se o firmware exigir
- Resina residual: filtrar e armazenar conforme SDS; não misturar lotes sem validação

## Segurança

- Resina não curada: PPE (luvas nitrílicas, óculos), ventilação, descarte químico
- UV/LCD: não olhar fonte UV; manter tampa fechada durante exposição
- IPA/solventes: inflamáveis; longe de ignição
- Critérios de parada: vazamento de vat, LCD danificado, odor intenso, overheat alarm

## Known issues

- Volume/XY resolution numéricos: extrair da product page dedicada na próxima passagem se URL estável
- Velocidade mm/h depende de resina/altura de camada; claims de lab ≠ qualquer resina
- Não transferir tempos de exposição entre modelos/resoluções

## Fontes

- [source.prusa-research-official-products](../22-fontes/prusa-research-official-products.md)
- [source.prusa-research-sl1s-speed](../22-fontes/prusa-research-sl1s-speed.md)
- URL oficial: https://www.prusa3d.com/category/3d-printers/

## Lacunas

- Firmware pinado
- Matriz de exposição oficial por resina (além de claims genéricos)
- Troubleshooting-mapped (falha de adesão, layer lines, film life)
