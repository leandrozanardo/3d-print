---
id: printer.anycubic-photon-mono-m7-max
title: Anycubic Photon Mono M7 Max
summary: Anycubic Photon Mono M7 Max é MSLA large 13.6" 7K, volume 298×164×300 mm (14.7 L), listada na loja oficial em 2026-08-16.
doc_type: printer
domain:
- printers
- resin
technology:
- vat-photopolymerization
process:
- msla
applies_to:
- anycubic-photon-mono-m7-max
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
- source.anycubic-photon-mono-m7-max
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
- Anycubic Photon Mono M7 Max
- Photon Mono M7 Max
tags:
- printer
- anycubic
- resin
- msla
- documented
- photon-mono-m7-series
manufacturer_id: anycubic
model_name: Photon Mono M7 Max
family_status: photon-mono-m7-series
lifecycle_observed_at: '2026-08-16'
regions:
- Global
availability_evidence: Listed for purchase with Add to cart on official Anycubic store https://store.anycubic.com/products/photon-mono-m7-max (accessed 2026-08-16).
---
# Anycubic Photon Mono M7 Max

Hub: [Impressoras](INDEX.md) · Fabricante: [Anycubic](manufacturer-anycubic.md)

## Identidade

| Campo | Valor |
|---|---|
| Fabricante | Anycubic (`manufacturer.anycubic`) |
| Modelo | Photon Mono M7 Max |
| Família | photon-mono-m7-series |
| coverage_level | `documented` |
| Regiões | Global |

## Lifecycle

| Campo | Valor |
|---|---|
| lifecycle | `current` |
| observed_at | 2026-08-16 |
| evidence | Listed for purchase with Add to cart on official Anycubic store https://store.anycubic.com/products/photon-mono-m7-max (accessed 2026-08-16). |
| URL produto | https://store.anycubic.com/products/photon-mono-m7-max |

## Especificações

Valores observados na evidência citada (acesso 2026-08-16). Capability observada ≠ resultado de processo em qualquer material.

| Capability | Valor oficial observado | Fonte |
|---|---|---|
| Build volume | 298 × 164 × 300 mm³ (14.7 L) | loja (oficial) |
| LCD | 13.6" mono 7K; X/Y 46 × 46 μm | loja (oficial) |
| Print speed | Std 0.1 mm ≤63 mm/h; High-speed ≤86 mm/h | loja (oficial) |
| Layer height | 0.01–0.15 mm | loja (oficial) |
| Light intensity | 4500 ±10% μW/cm² | loja (oficial) |
| Leveling | 4-point manual | loja (oficial) |
| Power | 180 W | loja (oficial) |
| Machine size / weight | 425 × 362 × 652 mm³; 24 kg | loja (oficial) |

Cells não listadas na evidência: **não publicado pelo fabricante na evidência consultada em 2026-08-16**.

## Tecnologia

Claims do fabricante (fonte oficial; evidência datada):

- Categoria: vat photopolymerization / msla
- Large-format vs M7/M7 Pro; Intelligent Release 2.0 (marketing)
- Resin temp control 20–40 °C + auto-recycling (fonte oficial)

## Manuais

- Página produto/FAQ: https://store.anycubic.com/products/photon-mono-m7-max
- Wiki/support OEM quando linkado na página

## Hardware

- Hinged UV cover; power-loss resume Supported; WiFi/LAN scheduled note

## Software

- Slicer resin oficial / Chitubox / Lychee conforme OEM
- Não importar perfis FFF

## Firmware

- Versão pinada: não publicado pelo fabricante na evidência consultada em 2026-08-16

## Slicer

- Usar perfil do **modelo/resolução**; exposição/lift específicos

## Materiais

- High-speed / water-washable / standard / ABS-like / plant-based

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

- FAQ: air purifier e auto-feed compartilham USB power — um por vez
- Velocidade mm/h depende de resina/altura de camada; claims de lab ≠ qualquer resina
- Não transferir tempos de exposição entre modelos/resoluções

## Fontes

- [source.anycubic-official-products](../22-fontes/anycubic-official-products.md)
- [source.anycubic-photon-mono-m7-max](../22-fontes/anycubic-photon-mono-m7-max.md)
- URL oficial: https://store.anycubic.com/products/photon-mono-m7-max

## Lacunas

- Firmware pinado
- Matriz de exposição oficial por resina (além de claims genéricos)
- Troubleshooting-mapped (falha de adesão, layer lines, film life)
