---
id: printer.anycubic-kobra-s1-max
title: Anycubic Kobra S1 Max
summary: Anycubic Kobra S1 Max é FFF CoreXY enclosed 350³ mm com câmara ativa 65 °C e hotend 350 °C, listada na loja oficial Anycubic em 2026-08-16.
doc_type: printer
domain:
- printers
- fff
technology:
- material-extrusion
process:
- fff
applies_to:
- anycubic-kobra-s1-max
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
- source.anycubic-kobra-s1-max
related:
- manufacturer.anycubic
- hub.impressoras
- tech.fff
prerequisites:
- tech.fff
supersedes: []
aliases_pt_br: []
aliases_en:
- Anycubic Kobra S1 Max
- Kobra S1 Max
tags:
- printer
- anycubic
- fff
- documented
- kobra-s1-series
manufacturer_id: anycubic
model_name: Kobra S1 Max
family_status: kobra-s1-series
lifecycle_observed_at: '2026-08-16'
regions:
- Global
availability_evidence: Listed for purchase with Add to cart on official Anycubic store https://store.anycubic.com/products/kobra-s1-max (accessed 2026-08-16).
---
# Anycubic Kobra S1 Max

Hub: [Impressoras](INDEX.md) · Fabricante: [Anycubic](manufacturer-anycubic.md)

## Identidade

| Campo | Valor |
|---|---|
| Fabricante | Anycubic (`manufacturer.anycubic`) |
| Modelo | Kobra S1 Max |
| Família | kobra-s1-series |
| coverage_level | `documented` |
| Regiões | Global |

## Lifecycle

| Campo | Valor |
|---|---|
| lifecycle | `current` |
| observed_at | 2026-08-16 |
| evidence | Listed for purchase with Add to cart on official Anycubic store https://store.anycubic.com/products/kobra-s1-max (accessed 2026-08-16). |
| URL produto | https://store.anycubic.com/products/kobra-s1-max |

## Especificações

Valores observados na evidência citada (acesso 2026-08-16). Capability observada ≠ resultado de processo em qualquer material.

| Capability | Valor oficial observado | Fonte |
|---|---|---|
| Build volume | 350 × 350 × 350 mm³ | loja (oficial) |
| Active chamber | 65 °C | loja (oficial) |
| Max nozzle | 350 °C, hardened steel (0.4 + 0.6 incluídos) | loja (oficial) |
| Max heatbed | 120 °C, PEI spring steel | loja (oficial) |
| Max print speed | Recommended 300 mm/s; Maximum 600 mm/s | loja (oficial) |
| Acceleration | Recommended 10 000 mm/s²; Maximum 20 000 mm/s² | loja (oficial) |
| Filaments | Consumer + engineering lists (PLA…PET-CF) na página | loja (oficial) |
| Machine size / weight | 502.7 × 483 × 584 mm³; 25.7 kg | loja (oficial) |
| Rated power (FAQ) | 2200 W (220 V); 1000 W (110 V) | FAQ (oficial) |

Cells não listadas na evidência: **não publicado pelo fabricante na evidência consultada em 2026-08-16**.

## Tecnologia

Claims do fabricante (fonte oficial; evidência datada):

- Categoria: material extrusion / FFF
- CoreXY fully enclosed com aquecimento ativo de câmara
- Multicolor: ACE 2 Pro (não ACE Pro gen1) — até 16 cores (FAQ)

## Manuais

- Página produto/manual links: https://store.anycubic.com/products/kobra-s1-max
- Service manual completo pinado: lacuna se não linkado na evidência

## Hardware

- Hardened steel extruder gears; titanium alloy throat (marketing)
- 720P camera; dual-external circulation cooling fans
- Activated carbon filter

## Software

- Ecossistema oficial do fabricante (app/cloud/LAN conforme página)
- Não expandir política de conta sem evidência

## Firmware

- Versão pinada: não publicado pelo fabricante na evidência consultada em 2026-08-16

## Slicer

- Usar preset/perfil do **modelo**; não colar perfil de outra família sem revisão

## Materiais

- Consumer-grade e engineering-grade listados na página (PLA…PET-CF)
- Não transferir lista de filamentos do Kobra S1 sem revisão

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

- FAQ: não compatível com ACE Pro da geração Kobra 3/S1/Kobra 3 Max
- Marketing de velocidade máxima ≠ velocidade recomendada de qualidade
- Transferência de perfil entre famílias/modelos sem revisão: risco alto

## Fontes

- [source.anycubic-official-products](../22-fontes/anycubic-official-products.md)
- [source.anycubic-kobra-s1-max](../22-fontes/anycubic-kobra-s1-max.md)
- URL oficial: https://store.anycubic.com/products/kobra-s1-max

## Lacunas

- Firmware pinado com hash/versão datada
- Service manual completo / BOM por serial
- Troubleshooting-mapped por sintoma
