---
id: printer.anycubic-kobra-3-v2
title: Anycubic Kobra 3 V2
summary: Anycubic Kobra 3 V2 é FFF gantry 255×255×260 mm (PLA/PETG/TPU); página oficial permanece publicada porém Sold out em 2026-08-16.
doc_type: printer
domain:
- printers
- fff
technology:
- material-extrusion
process:
- fff
applies_to:
- anycubic-kobra-3-v2
not_for:
- invent-missing-specs
- blind-profile-transfer
knowledge_status: draft
lifecycle: legacy-supported
coverage_level: documented
evidence_status: manufacturer-specific
safety_level: caution
confidence: high
last_reviewed: '2026-08-16'
review_cycle: 3-months
sources:
- source.anycubic-official-products
- source.anycubic-kobra-3-v2
related:
- manufacturer.anycubic
- hub.impressoras
- tech.fff
prerequisites:
- tech.fff
supersedes: []
aliases_pt_br: []
aliases_en:
- Anycubic Kobra 3 V2
- Kobra 3 V2
tags:
- printer
- anycubic
- fff
- documented
- kobra-3-series
manufacturer_id: anycubic
model_name: Kobra 3 V2
family_status: kobra-3-series
lifecycle_observed_at: '2026-08-16'
regions:
- Global
availability_evidence: Official product page still published at https://store.anycubic.com/products/kobra-3-v2 but marked Sold out on 2026-08-16 (no Add to cart).
---
# Anycubic Kobra 3 V2

Hub: [Impressoras](INDEX.md) · Fabricante: [Anycubic](manufacturer-anycubic.md)

## Identidade

| Campo | Valor |
|---|---|
| Fabricante | Anycubic (`manufacturer.anycubic`) |
| Modelo | Kobra 3 V2 |
| Família | kobra-3-series |
| coverage_level | `documented` |
| Regiões | Global |

## Lifecycle

| Campo | Valor |
|---|---|
| lifecycle | `legacy-supported` |
| observed_at | 2026-08-16 |
| evidence | Official product page still published at https://store.anycubic.com/products/kobra-3-v2 but marked Sold out on 2026-08-16 (no Add to cart). |
| URL produto | https://store.anycubic.com/products/kobra-3-v2 |

## Especificações

Valores observados na evidência citada (acesso 2026-08-16). Capability observada ≠ resultado de processo em qualquer material.

| Capability | Valor oficial observado | Fonte |
|---|---|---|
| Build volume | 255 × 255 × 260 mm³ | loja (oficial) |
| Max print speed | Recommended 300 mm/s; Maximum 600 mm/s | loja (oficial) |
| Max nozzle | 300 °C; 0.4 mm std (0.6/0.8) | loja (oficial) |
| Max heatbed | 110 °C, PEI spring steel | loja (oficial) |
| Filaments | PLA / PETG / TPU | loja + FAQ |
| Camera | 720P standard (bracket printável) | loja (oficial) |
| Machine size / weight | 452.9 × 504.7 × 483 mm³; 9.37 kg | loja (oficial) |

Cells não listadas na evidência: **não publicado pelo fabricante na evidência consultada em 2026-08-16**.

## Tecnologia

Claims do fabricante (fonte oficial; evidência datada):

- Categoria: material extrusion / FFF
- Upgrade da linha Kobra 3 (leveling/camera/volume) — FAQ de upgrades
- Lifecycle: sold out na loja global observada; página ainda indexada

## Manuais

- Página produto/manual links: https://store.anycubic.com/products/kobra-3-v2
- Service manual completo pinado: lacuna se não linkado na evidência

## Hardware

- LeviQ3.0; dual lead screws (marketing); Kobra OS

## Software

- Ecossistema oficial do fabricante (app/cloud/LAN conforme página)
- Não expandir política de conta sem evidência

## Firmware

- Versão pinada: não publicado pelo fabricante na evidência consultada em 2026-08-16

## Slicer

- Usar preset/perfil do **modelo**; não colar perfil de outra família sem revisão

## Materiais

- Somente PLA/PETG/TPU na evidência de specs — não inventar ABS

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

- FAQ layer thickness text apparently garbled (0.6–0.8 mm) — não usar como spec
- Sold out: preferir Kobra 4 / Kobra X para compra nova
- Marketing de velocidade máxima ≠ velocidade recomendada de qualidade
- Transferência de perfil entre famílias/modelos sem revisão: risco alto

## Fontes

- [source.anycubic-official-products](../22-fontes/anycubic-official-products.md)
- [source.anycubic-kobra-3-v2](../22-fontes/anycubic-kobra-3-v2.md)
- URL oficial: https://store.anycubic.com/products/kobra-3-v2

## Lacunas

- Firmware pinado com hash/versão datada
- Service manual completo / BOM por serial
- Troubleshooting-mapped por sintoma
