---
id: printer.anycubic-kobra-x
title: Anycubic Kobra X
summary: Anycubic Kobra X é FFF 260³ mm com multicolor nativo 4 cores (expansível a 19 via ACE 2 Pro), listada na loja oficial em 2026-08-16.
doc_type: printer
domain:
- printers
- fff
technology:
- material-extrusion
process:
- fff
applies_to:
- anycubic-kobra-x
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
- source.anycubic-kobra-x
related:
- manufacturer.anycubic
- hub.impressoras
- tech.fff
prerequisites:
- tech.fff
supersedes: []
aliases_pt_br: []
aliases_en:
- Anycubic Kobra X
- Kobra X
tags:
- printer
- anycubic
- fff
- documented
- kobra-x-series
manufacturer_id: anycubic
model_name: Kobra X
family_status: kobra-x-series
lifecycle_observed_at: '2026-08-16'
regions:
- Global
availability_evidence: Listed for purchase with Add to cart on official Anycubic store https://store.anycubic.com/products/kobra-x (accessed 2026-08-16).
---
# Anycubic Kobra X

Hub: [Impressoras](INDEX.md) · Fabricante: [Anycubic](manufacturer-anycubic.md)

## Identidade

| Campo | Valor |
|---|---|
| Fabricante | Anycubic (`manufacturer.anycubic`) |
| Modelo | Kobra X |
| Família | kobra-x-series |
| coverage_level | `documented` |
| Regiões | Global |

## Lifecycle

| Campo | Valor |
|---|---|
| lifecycle | `current` |
| observed_at | 2026-08-16 |
| evidence | Listed for purchase with Add to cart on official Anycubic store https://store.anycubic.com/products/kobra-x (accessed 2026-08-16). |
| URL produto | https://store.anycubic.com/products/kobra-x |

## Especificações

Valores observados na evidência citada (acesso 2026-08-16). Capability observada ≠ resultado de processo em qualquer material.

| Capability | Valor oficial observado | Fonte |
|---|---|---|
| Build volume | 260 × 260 × 260 mm³ | loja (oficial) |
| Multicolor | Native 4-color; expandable to 19 with ACE 2 Pro | loja (oficial) |
| Max print speed | Recommended 300 mm/s; Maximum 600 mm/s | loja (oficial) |
| Acceleration | Recommended 10 000 mm/s²; Maximum 20 000 mm/s² | loja (oficial) |
| Max nozzle | 300 °C, hardened steel 0.4 mm | loja (oficial) |
| Max heatbed | 100 °C, PEI spring steel | loja (oficial) |
| Filaments (specs) | PLA / PETG / TPU / PVA / PLA-CF / PETG-CF / ASA | loja (oficial) |
| Machine size / weight | 455.4 × 445.3 × 461.3 mm; ~9.5 kg | loja (oficial) |

Cells não listadas na evidência: **não publicado pelo fabricante na evidência consultada em 2026-08-16**.

## Tecnologia

Claims do fabricante (fonte oficial; evidência datada):

- Categoria: material extrusion / FFF
- ACE GEN2 multicolor integrado (marketing)
- Não compatível com ACE Pro gen1 (FAQ)

## Manuais

- Página produto/manual links: https://store.anycubic.com/products/kobra-x
- Service manual completo pinado: lacuna se não linkado na evidência

## Hardware

- 720P camera; LeviQ3.0; top-mounted spool holder (marketing)

## Software

- Ecossistema oficial do fabricante (app/cloud/LAN conforme página)
- Não expandir política de conta sem evidência

## Firmware

- Versão pinada: não publicado pelo fabricante na evidência consultada em 2026-08-16

## Slicer

- Usar preset/perfil do **modelo**; não colar perfil de outra família sem revisão

## Materiais

- Single-material FAQ também cita ABS; multi-material: PLA+TPU(68D), PLA+PVA, etc.
- Active drying: not supported on printer alone — requires ACE 2 Pro (specs)

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

- FAQ Q3 texto mistura volume do S1 Max — preferir bloco Specifications 260³
- Marketing de velocidade máxima ≠ velocidade recomendada de qualidade
- Transferência de perfil entre famílias/modelos sem revisão: risco alto

## Fontes

- [source.anycubic-official-products](../22-fontes/anycubic-official-products.md)
- [source.anycubic-kobra-x](../22-fontes/anycubic-kobra-x.md)
- URL oficial: https://store.anycubic.com/products/kobra-x

## Lacunas

- Firmware pinado com hash/versão datada
- Service manual completo / BOM por serial
- Troubleshooting-mapped por sintoma
