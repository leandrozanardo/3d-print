---
id: printer.anycubic-kobra-3
title: Anycubic Kobra 3
summary: Anycubic Kobra 3 é FFF gantry 250×250×260 mm com ACE Pro multicolor (4–8 cores), ainda listada via Combo na loja oficial em 2026-08-16.
doc_type: printer
domain:
- printers
- fff
technology:
- material-extrusion
process:
- fff
applies_to:
- anycubic-kobra-3
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
- source.anycubic-kobra-3
related:
- manufacturer.anycubic
- hub.impressoras
- tech.fff
prerequisites:
- tech.fff
supersedes: []
aliases_pt_br: []
aliases_en:
- Anycubic Kobra 3
- Kobra 3
tags:
- printer
- anycubic
- fff
- documented
- kobra-3-series
manufacturer_id: anycubic
model_name: Kobra 3
family_status: kobra-3-series
lifecycle_observed_at: '2026-08-16'
regions:
- Global
availability_evidence: Listed for purchase (Kobra 3 Combo) with Add to cart on official Anycubic store https://store.anycubic.com/products/kobra-3-combo; page notes free upgrade to Kobra 4 Combo if Kobra 3 Combo out of stock (accessed 2026-08-16).
---
# Anycubic Kobra 3

Hub: [Impressoras](INDEX.md) · Fabricante: [Anycubic](manufacturer-anycubic.md)

## Identidade

| Campo | Valor |
|---|---|
| Fabricante | Anycubic (`manufacturer.anycubic`) |
| Modelo | Kobra 3 |
| Família | kobra-3-series |
| coverage_level | `documented` |
| Regiões | Global |

## Lifecycle

| Campo | Valor |
|---|---|
| lifecycle | `current` |
| observed_at | 2026-08-16 |
| evidence | Listed for purchase (Kobra 3 Combo) with Add to cart on official Anycubic store https://store.anycubic.com/products/kobra-3-combo; page notes free upgrade to Kobra 4 Combo if Kobra 3 Combo out of stock (accessed 2026-08-16). |
| URL produto | https://store.anycubic.com/products/kobra-3-combo |

## Especificações

Valores observados na evidência citada (acesso 2026-08-16). Capability observada ≠ resultado de processo em qualquer material.

| Capability | Valor oficial observado | Fonte |
|---|---|---|
| Build volume | 250 × 250 × 260 mm³ | loja Combo (oficial) |
| Max print speed | Recommended 300 mm/s; Maximum 600 mm/s | loja (oficial) |
| Acceleration | Recommended 10 000 mm/s²; Maximum 20 000 mm/s² | loja (oficial) |
| Max nozzle | 300 °C; 0.4 mm std (0.6/0.8 opcional) | loja (oficial) |
| Max heatbed | 110 °C, PEI spring steel | loja (oficial) |
| Filaments (printer FAQ) | PLA, PETG, TPU (TPU ≠ ACE Pro) | FAQ (oficial) |
| ACE Pro materials (FAQ) | PLA, PETG, ABS, ASA, PET, PA, PC, PP, HIPS | FAQ (oficial) |

Cells não listadas na evidência: **não publicado pelo fabricante na evidência consultada em 2026-08-16**.

## Tecnologia

Claims do fabricante (fonte oficial; evidência datada):

- Categoria: material extrusion / FFF; gantry system
- Multicolor via ACE Pro (não ACE 2 Pro)
- Nota comercial: upgrade gratuito para Kobra 4 Combo se Combo esgotar

## Manuais

- Página produto/manual links: https://store.anycubic.com/products/kobra-3-combo
- Service manual completo pinado: lacuna se não linkado na evidência

## Hardware

- 4.3" touchscreen; LeviQ3.0; câmera 720P opcional (FAQ)

## Software

- Ecossistema oficial do fabricante (app/cloud/LAN conforme página)
- Não expandir política de conta sem evidência

## Firmware

- Versão pinada: não publicado pelo fabricante na evidência consultada em 2026-08-16

## Slicer

- Usar preset/perfil do **modelo**; não colar perfil de outra família sem revisão

## Materiais

- PLA/PETG/TPU no hotend; lista ACE Pro é do dryer/AMS — não misturar sem leitura

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

- Página Combo mistura pesos Kobra 3 / Kobra 3 V2 — tratar peso como lacuna se conflitante
- Marketing de velocidade máxima ≠ velocidade recomendada de qualidade
- Transferência de perfil entre famílias/modelos sem revisão: risco alto

## Fontes

- [source.anycubic-official-products](../22-fontes/anycubic-official-products.md)
- [source.anycubic-kobra-3](../22-fontes/anycubic-kobra-3.md)
- URL oficial: https://store.anycubic.com/products/kobra-3-combo

## Lacunas

- Firmware pinado com hash/versão datada
- Service manual completo / BOM por serial
- Troubleshooting-mapped por sintoma
