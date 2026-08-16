---
id: printer.anycubic-kobra-4
title: Anycubic Kobra 4
summary: Anycubic Kobra 4 é FFF gantry 260³ mm (hotend 300 °C / bed 100 °C), listada para compra na loja oficial Anycubic em 2026-08-16.
doc_type: printer
domain:
- printers
- fff
technology:
- material-extrusion
process:
- fff
applies_to:
- anycubic-kobra-4
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
- source.anycubic-official-products
- source.anycubic-kobra-4
related:
- manufacturer.anycubic
- hub.impressoras
- tech.fff
prerequisites:
- tech.fff
supersedes: []
aliases_pt_br: []
aliases_en:
- Anycubic Kobra 4
- Kobra 4
tags:
- printer
- anycubic
- fff
- documented
- kobra-4-series
manufacturer_id: anycubic
model_name: Kobra 4
family_status: kobra-4-series
lifecycle_observed_at: '2026-08-16'
regions:
- Global
availability_evidence: Listed for purchase with Add to cart on official Anycubic store https://store.anycubic.com/products/kobra-4-3d-printer (accessed 2026-08-16).
---
# Anycubic Kobra 4

Hub: [Impressoras](INDEX.md) · Fabricante: [Anycubic](manufacturer-anycubic.md)

## Identidade

| Campo | Valor |
|---|---|
| Fabricante | Anycubic (`manufacturer.anycubic`) |
| Modelo | Kobra 4 |
| Família | kobra-4-series |
| coverage_level | `documented` |
| Regiões | Global |

## Lifecycle

| Campo | Valor |
|---|---|
| lifecycle | `current` |
| observed_at | 2026-08-16 |
| evidence | Listed for purchase with Add to cart on official Anycubic store https://store.anycubic.com/products/kobra-4-3d-printer (accessed 2026-08-16). |
| URL produto | https://store.anycubic.com/products/kobra-4-3d-printer |

## Especificações

Valores observados na evidência citada (acesso 2026-08-16). Capability observada ≠ resultado de processo em qualquer material.

| Capability | Valor oficial observado | Fonte |
|---|---|---|
| Build volume | 260 × 260 × 260 mm³ | loja (oficial) |
| Max print speed | Recommended 300 mm/s; Maximum 600 mm/s | loja (oficial) |
| Acceleration | Recommended 10 000 mm/s²; Maximum 20 000 mm/s² | loja (oficial) |
| Max nozzle | 300 °C, hardened steel 0.4 mm std | loja (oficial) |
| Max heatbed | 100 °C, PEI spring steel | loja (oficial) |
| Filaments (specs) | PLA, PETG, TPU (95A; TPU não compatível com ACE 2 Pro) | loja (oficial) |
| Construction | Gantry system; Kobra OS | loja (oficial) |
| Machine size / weight | 455.4 × 445.3 × 461.3 mm; 9.9 kg | loja (oficial) |

Cells não listadas na evidência: **não publicado pelo fabricante na evidência consultada em 2026-08-16**.

## Tecnologia

Claims do fabricante (fonte oficial; evidência datada):

- Categoria: material extrusion / FFF
- Gantry (não CoreXY enclosed como S1)
- Multicolor: requer ACE 2 Pro (Combo); base single-color (FAQ)

## Manuais

- Página produto/manual links: https://store.anycubic.com/products/kobra-4-3d-printer
- Service manual completo pinado: lacuna se não linkado na evidência

## Hardware

- LeviQ3.0 49-point auto-leveling; 720P camera
- 3.5" capacitive touchscreen
- Quick-release hotend

## Software

- Ecossistema oficial do fabricante (app/cloud/LAN conforme página)
- Não expandir política de conta sem evidência

## Firmware

- Versão pinada: não publicado pelo fabricante na evidência consultada em 2026-08-16

## Slicer

- Usar preset/perfil do **modelo**; não colar perfil de outra família sem revisão

## Materiais

- PLA, PETG, TPU — FAQ recomenda estes como materiais principais

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

- Combo inclui 1× ACE 2 Pro; 8 cores exige ACE 2 Pro adicional + hub (FAQ)
- Marketing de velocidade máxima ≠ velocidade recomendada de qualidade
- Transferência de perfil entre famílias/modelos sem revisão: risco alto

## Fontes

- [source.anycubic-official-products](../22-fontes/anycubic-official-products.md)
- [source.anycubic-kobra-4](../22-fontes/anycubic-kobra-4.md)
- URL oficial: https://store.anycubic.com/products/kobra-4-3d-printer

## Lacunas

- Firmware pinado com hash/versão datada
- Service manual completo / BOM por serial
- Troubleshooting-mapped por sintoma
