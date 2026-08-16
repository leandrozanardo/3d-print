---
id: printer.anycubic-photon-p1-max
title: Anycubic Photon P1 Max
summary: Anycubic Photon P1 Max é MSLA large-format com volume 285.5×214×300 mm (18.3 L claim), listada na loja oficial em 2026-08-16.
doc_type: printer
domain:
- printers
- resin
technology:
- vat-photopolymerization
process:
- msla
applies_to:
- anycubic-photon-p1-max
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
- source.anycubic-official-products
- source.anycubic-photon-p1-max
related:
- manufacturer.anycubic
- hub.impressoras
- tech.vat-photopolymerization
- tech.sla-dlp-msla
prerequisites:
- tech.sla-dlp-msla
supersedes: []
aliases_pt_br: []
aliases_en:
- Anycubic Photon P1 Max
- Photon P1 Max
tags:
- printer
- anycubic
- resin
- msla
- documented
- photon-p1-series
manufacturer_id: anycubic
model_name: Photon P1 Max
family_status: photon-p1-series
lifecycle_observed_at: '2026-08-16'
regions:
- Global
availability_evidence: Listed on official Anycubic store https://store.anycubic.com/products/photon-p1-max-best-large-resin-3d-printer (HTTP 200; accessed 2026-08-16).
---
# Anycubic Photon P1 Max

Hub: [Impressoras](INDEX.md) · Fabricante: [Anycubic](manufacturer-anycubic.md)

## Identidade

| Campo | Valor |
|---|---|
| Fabricante | Anycubic (`manufacturer.anycubic`) |
| Modelo | Photon P1 Max |
| Família | photon-p1-series |
| coverage_level | `documented` |
| Regiões | Global |

## Lifecycle

| Campo | Valor |
|---|---|
| lifecycle | `current` |
| observed_at | 2026-08-16 |
| evidence | Listed on official Anycubic store https://store.anycubic.com/products/photon-p1-max-best-large-resin-3d-printer (HTTP 200; accessed 2026-08-16). |
| URL produto | https://store.anycubic.com/products/photon-p1-max-best-large-resin-3d-printer |

## Especificações

Valores observados na evidência citada (acesso 2026-08-16). Capability observada ≠ resultado de processo em qualquer material.

| Capability | Valor oficial observado | Fonte |
|---|---|---|
| Build volume | 285.5 × 214 × 300 mm³ (18.3 L claim) | loja (oficial) |
| Resin vat | 1.9 L thermal-controlled (FAQ/marketing) | loja (oficial) |
| Release | Wave Release Technology / Wave Release Film | loja (oficial) |
| Light uniformity claim | 92% | loja (oficial) |
| High-viscosity resin | Engineered for 8000 cps resin (marketing) | loja (oficial) |
| Build platform | Precision-ground steel | loja (oficial) |

Cells não listadas na evidência: **não publicado pelo fabricante na evidência consultada em 2026-08-16**.

## Tecnologia

Claims do fabricante (fonte oficial; evidência datada):

- Categoria: vat photopolymerization / msla
- LightTurbo 4.0 (marketing); production-oriented large vat
- Não é FFF / Kobra

## Manuais

- Página produto/FAQ: https://store.anycubic.com/products/photon-p1-max-best-large-resin-3d-printer
- Wiki/support OEM quando linkado na página

## Hardware

- Intelligent Printing Assistant 3.0; dual-network Wi-Fi + Ethernet (marketing)

## Software

- Slicer resin oficial / Chitubox / Lychee conforme OEM
- Não importar perfis FFF

## Firmware

- Versão pinada: não publicado pelo fabricante na evidência consultada em 2026-08-16

## Slicer

- Usar perfil do **modelo/resolução**; exposição/lift específicos

## Materiais

- All Anycubic Resins (claim genérico da página)

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

- Tabela de resolução LCD/px não extraída de forma completa nesta revisão — lacuna
- Não inventar mm/h sem cell explícita
- Velocidade mm/h depende de resina/altura de camada; claims de lab ≠ qualquer resina
- Não transferir tempos de exposição entre modelos/resoluções

## Fontes

- [source.anycubic-official-products](../22-fontes/anycubic-official-products.md)
- [source.anycubic-photon-p1-max](../22-fontes/anycubic-photon-p1-max.md)
- URL oficial: https://store.anycubic.com/products/photon-p1-max-best-large-resin-3d-printer

## Lacunas

- Firmware pinado
- Matriz de exposição oficial por resina (além de claims genéricos)
- Troubleshooting-mapped (falha de adesão, layer lines, film life)
