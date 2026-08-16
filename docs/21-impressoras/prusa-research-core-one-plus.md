---
id: printer.prusa-research-core-one-plus
title: Prusa Research Prusa CORE One+ (Gen 2)
summary: Prusa CORE One+ (Gen 2) é FFF CoreXY enclosed 250×220×270 mm com câmara ativa até 55 °C, listada In stock na loja oficial Prusa em 2026-08-16.
doc_type: printer
domain:
- printers
- fff
technology:
- material-extrusion
process:
- fff
applies_to:
- prusa-research-core-one-plus
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
- source.prusa-research-core-one-plus
related:
- manufacturer.prusa-research
- hub.impressoras
- tech.fff
prerequisites:
- tech.fff
supersedes: []
aliases_pt_br: []
aliases_en:
- Prusa CORE One+ (Gen 2)
- Prusa Prusa CORE One+ (Gen 2)
- Original Prusa Prusa CORE One+ (Gen 2)
tags:
- printer
- prusa-research
- fff
- documented
- core-one-series
manufacturer_id: prusa-research
model_name: Prusa CORE One+ (Gen 2)
family_status: core-one-series
lifecycle_observed_at: '2026-08-16'
regions:
- Global
availability_evidence: Listed In stock with Add to cart on official Prusa shop https://www.prusa3d.com/product/prusa-core-one-4/ and category https://www.prusa3d.com/category/3d-printers/ (accessed 2026-08-16).
---
# Prusa Research Prusa CORE One+ (Gen 2)

Hub: [Impressoras](INDEX.md) · Fabricante: [Prusa Research](manufacturer-prusa-research.md)

## Identidade

| Campo | Valor |
|---|---|
| Fabricante | Prusa Research (`manufacturer.prusa-research`) |
| Modelo | Prusa CORE One+ (Gen 2) |
| Família | core-one-series |
| coverage_level | `documented` |
| Regiões | Global |

## Lifecycle

| Campo | Valor |
|---|---|
| lifecycle | `current` |
| observed_at | 2026-08-16 |
| evidence | Listed In stock with Add to cart on official Prusa shop https://www.prusa3d.com/product/prusa-core-one-4/ and category https://www.prusa3d.com/category/3d-printers/ (accessed 2026-08-16). |
| URL produto | https://www.prusa3d.com/product/prusa-core-one-4/ |

## Especificações

Valores observados na evidência citada (acesso 2026-08-16). Capability observada ≠ resultado de processo em qualquer material.

| Capability | Valor oficial observado | Fonte |
|---|---|---|
| Build volume | 250 × 220 × 270 mm | product Technical Parameters |
| Kinematics | CoreXY enclosed | product (oficial) |
| Max nozzle | 290 °C (400 °C w/ HT upgrade claimed) | compare + tech params |
| Max heatbed | 120 °C | tech params (oficial) |
| Max chamber | 55 °C | tech params (oficial) |
| Layer height | 0.05–0.30 mm | tech params (oficial) |
| Filament diameter | 1.75 mm | tech params (oficial) |
| Printer size / weight | 415 × 444 × 555 mm; 22.5 kg | tech params (oficial) |

Cells não listadas na evidência: **não publicado pelo fabricante na evidência consultada em 2026-08-16**.

## Tecnologia

Claims do fabricante (fonte oficial; evidência datada):

- Categoria: material extrusion / FFF
- Nextruder + Load Cell; Input Shaper; PhaseStepping (compare)
- MMU3 (5) e INDX (8, coming soon) no ecossistema

## Manuais

- Página produto/manual links: https://www.prusa3d.com/product/prusa-core-one-4/
- Service manual completo pinado: lacuna se não linkado na evidência

## Hardware

- All-steel exoskeleton; optional HEPA / camera
- Quick-swap nozzle; Ethernet + Wi-Fi module

## Software

- Ecossistema oficial do fabricante (app/cloud/LAN conforme página)
- Não expandir política de conta sem evidência

## Firmware

- Versão pinada: não publicado pelo fabricante na evidência consultada em 2026-08-16

## Slicer

- Usar preset/perfil do **modelo**; não colar perfil de outra família sem revisão

## Materiais

- PLA, PETG, Flex, PVA, PC, PP, CPE, PVB; Advanced: ABS, ASA, HIPS, PA (tech params)
- Perfis PrusaSlicer 200+ (marketing)

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

- Gen 2 heatbed mount remove 'Absorbing heat' wait for beds ≤85 °C (fonte oficial / marketing)
- Marketing de velocidade máxima ≠ velocidade recomendada de qualidade
- Transferência de perfil entre famílias/modelos sem revisão: risco alto

## Fontes

- [source.prusa-research-official-products](../22-fontes/prusa-research-official-products.md)
- [source.prusa-research-core-one-plus](../22-fontes/prusa-research-core-one-plus.md)
- URL oficial: https://www.prusa3d.com/product/prusa-core-one-4/

## Lacunas

- Firmware pinado com hash/versão datada
- Service manual completo / BOM por serial
- Troubleshooting-mapped por sintoma
