---
id: printer.anycubic-kobra-s1
title: Anycubic Kobra S1
summary: Anycubic Kobra S1 é FFF CoreXY enclosed (250³ mm), hotend 320 °C / bed 120 °C, listada para compra na loja oficial Anycubic em 2026-08-16.
doc_type: printer
domain:
- printers
- fff
technology:
- material-extrusion
process:
- fff
applies_to:
- anycubic-kobra-s1
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
- source.anycubic-kobra-s1
related:
- manufacturer.anycubic
- hub.impressoras
- tech.fff
prerequisites:
- tech.fff
supersedes: []
aliases_pt_br: []
aliases_en:
- Anycubic Kobra S1
- Kobra S1
tags:
- printer
- anycubic
- fff
- documented
- kobra-s1-series
manufacturer_id: anycubic
model_name: Kobra S1
family_status: kobra-s1-series
lifecycle_observed_at: '2026-08-16'
regions:
- Global
availability_evidence: Listed for purchase with Add to cart on official Anycubic store https://store.anycubic.com/products/kobra-s1 (accessed 2026-08-16).
---
# Anycubic Kobra S1

Hub: [Impressoras](INDEX.md) · Fabricante: [Anycubic](manufacturer-anycubic.md)

## Identidade

| Campo | Valor |
|---|---|
| Fabricante | Anycubic (`manufacturer.anycubic`) |
| Modelo | Kobra S1 |
| Família | kobra-s1-series |
| coverage_level | `documented` |
| Regiões | Global |

## Lifecycle

| Campo | Valor |
|---|---|
| lifecycle | `current` |
| observed_at | 2026-08-16 |
| evidence | Listed for purchase with Add to cart on official Anycubic store https://store.anycubic.com/products/kobra-s1 (accessed 2026-08-16). |
| URL produto | https://store.anycubic.com/products/kobra-s1 |

## Especificações

Valores observados na evidência citada (acesso 2026-08-16). Capability observada ≠ resultado de processo em qualquer material.

| Capability | Valor oficial observado | Fonte |
|---|---|---|
| Build volume | 250 × 250 × 250 mm³ | loja (oficial) |
| Max print speed | Recommended 300 mm/s; Maximum 600 mm/s | loja (oficial) |
| Acceleration | Recommended 10 000 mm/s²; Maximum 20 000 mm/s² | loja (oficial) |
| Max nozzle | 320 °C (0.4 mm std; 0.25/0.6/0.8 opcional) | loja (oficial) |
| Max heatbed | 120 °C, PEI spring steel | loja (oficial) |
| Filaments (specs) | PLA, PETG, TPU, ABS, ASA | loja (oficial) |
| Construction | CoreXY enclosed; Kobra OS | loja (oficial) |
| Camera | HD standard, 480P | loja (oficial) |
| Machine size / weight | 400 × 410 × 490 mm³; 9.37 kg | loja (oficial) |

Cells não listadas na evidência: **não publicado pelo fabricante na evidência consultada em 2026-08-16**.

## Tecnologia

Claims do fabricante (fonte oficial; evidência datada):

- Categoria: material extrusion
- Processo: FFF (fabricante também usa FDM em marketing)
- Arquitetura: CoreXY fully enclosed; LeviQ3.0 + Z-offset
- Multicolor: ACE Pro opcional (até 8 cores com 2× ACE Pro) — FAQ

## Manuais

- Página produto/manual links: https://store.anycubic.com/products/kobra-s1
- Service manual completo pinado: lacuna se não linkado na evidência

## Hardware

- Quick-release hotend; ceramic composite throat (marketing)
- 4.3" capacitive touchscreen; activated carbon included in box
- AI spaghetti detection (requer câmera; incluída)

## Software

- Ecossistema oficial do fabricante (app/cloud/LAN conforme página)
- Não expandir política de conta sem evidência

## Firmware

- Versão pinada: não publicado pelo fabricante na evidência consultada em 2026-08-16

## Slicer

- Usar preset/perfil do **modelo**; não colar perfil de outra família sem revisão

## Materiais

- Specs: PLA, PETG, TPU, ABS, ASA
- FAQ: também menciona PC, PA, CF/GF — tratar como suporte avançado, não preset automático
- TPU: single-color only com ACE Pro (FAQ [1])

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

- FAQ anota ruído medido a 1 m — variação unitária esperada
- Marketing de velocidade máxima ≠ velocidade recomendada de qualidade
- Transferência de perfil entre famílias/modelos sem revisão: risco alto

## Fontes

- [source.anycubic-official-products](../22-fontes/anycubic-official-products.md)
- [source.anycubic-kobra-s1](../22-fontes/anycubic-kobra-s1.md)
- URL oficial: https://store.anycubic.com/products/kobra-s1

## Lacunas

- Firmware pinado com hash/versão datada
- Service manual completo / BOM por serial
- Troubleshooting-mapped por sintoma
