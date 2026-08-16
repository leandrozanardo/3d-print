---
id: printer.elegoo-neptune-4-pro
title: Elegoo Neptune 4 Pro
summary: ELEGOO Neptune 4 Pro é FFF Klipper 225×225×265 mm, nozzle 300 °C / bed 110 °C, listada na loja oficial US em 2026-08-16.
doc_type: printer
domain:
- printers
- fff
technology:
- material-extrusion
process:
- fff
applies_to:
- elegoo-neptune-4-pro
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
- source.elegoo-official-products
- source.elegoo-neptune-4-pro
related:
- manufacturer.elegoo
- hub.impressoras
- tech.fff
prerequisites:
- tech.fff
supersedes: []
aliases_pt_br: []
aliases_en:
- Elegoo Neptune 4 Pro
- ELEGOO Neptune 4 Pro
- Neptune 4 Pro
tags:
- printer
- elegoo
- fff
- documented
- neptune-4-series
manufacturer_id: elegoo
model_name: Neptune 4 Pro
family_status: neptune-4-series
lifecycle_observed_at: '2026-08-16'
regions:
- US
availability_evidence: Listed for purchase on official ELEGOO US store https://us.elegoo.com/products/elegoo-neptune-4-pro-fdm-3d-printer (accessed 2026-08-16).
---
# Elegoo Neptune 4 Pro

Hub: [Impressoras](INDEX.md) · Fabricante: [Elegoo](manufacturer-elegoo.md)

## Identidade

| Campo | Valor |
|---|---|
| Fabricante | Elegoo (`manufacturer.elegoo`) |
| Modelo | Neptune 4 Pro |
| Família | neptune-4-series |
| coverage_level | `documented` |
| Regiões | US |

## Lifecycle

| Campo | Valor |
|---|---|
| lifecycle | `current` |
| observed_at | 2026-08-16 |
| evidence | Listed for purchase on official ELEGOO US store https://us.elegoo.com/products/elegoo-neptune-4-pro-fdm-3d-printer (accessed 2026-08-16). |
| URL produto | https://us.elegoo.com/products/elegoo-neptune-4-pro-fdm-3d-printer |

## Especificações

Valores observados na evidência citada (acesso 2026-08-16). Capability observada ≠ resultado de processo em qualquer material.

| Capability | Valor oficial observado | Fonte |
|---|---|---|
| Build volume | 225 × 225 × 265 mm | Specification (oficial) |
| Max toolhead speed / accel | 500 mm/s; 20 000 mm/s² | Specification (oficial) |
| Max nozzle | 300 °C | Specification (oficial) |
| Max heatbed | 110 °C (segmented 100 W + 150 W) | página (oficial) |
| Filaments | PLA / TPU / PETG / ABS / ASA / Nylon | Specification (oficial) |
| Machine size / net weight | 475 × 445 × 515 mm; 8.9 kg | Specification (oficial) |
| Transfer | LAN, USB | Specification (oficial) |

Cells não listadas na evidência: **não publicado pelo fabricante na evidência consultada em 2026-08-16**.

## Tecnologia

Claims do fabricante (fonte oficial; evidência datada):

- Categoria: material extrusion / FFF
- Pre-installed Klipper; input shaping + pressure advance (marketing)
- ABS/ASA: fabricante recomenda enclosure

## Manuais

- Página produto/manual links: https://us.elegoo.com/products/elegoo-neptune-4-pro-fdm-3d-printer
- Service manual completo pinado: lacuna se não linkado na evidência

## Hardware

- Dual-gear direct extruder; 121-point ABL; intelligent segmented heatbed
- Removable touch screen; OTA (Type-C version note)

## Software

- Ecossistema oficial do fabricante (app/cloud/LAN conforme página)
- Não expandir política de conta sem evidência

## Firmware

- Versão pinada: não publicado pelo fabricante na evidência consultada em 2026-08-16

## Slicer

- Usar preset/perfil do **modelo**; não colar perfil de outra família sem revisão

## Materiais

- PLA, TPU, PETG, ABS, ASA, Nylon

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

- Nota de página: Type-C vs ribbon-cable — peças devem combinar com a revisão
- Marketing de velocidade máxima ≠ velocidade recomendada de qualidade
- Transferência de perfil entre famílias/modelos sem revisão: risco alto

## Fontes

- [source.elegoo-official-products](../22-fontes/elegoo-official-products.md)
- [source.elegoo-neptune-4-pro](../22-fontes/elegoo-neptune-4-pro.md)
- URL oficial: https://us.elegoo.com/products/elegoo-neptune-4-pro-fdm-3d-printer

## Lacunas

- Firmware pinado com hash/versão datada
- Service manual completo / BOM por serial
- Troubleshooting-mapped por sintoma
