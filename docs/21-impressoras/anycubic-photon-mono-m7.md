---
id: printer.anycubic-photon-mono-m7
title: Anycubic Photon Mono M7
summary: Anycubic Photon Mono M7 é MSLA/LCD 14K volume 223×126×230 mm (até 150 mm/h high-speed resin), listada na loja oficial em 2026-08-16.
doc_type: printer
domain:
- printers
- resin
technology:
- vat-photopolymerization
process:
- msla
applies_to:
- anycubic-photon-mono-m7
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
- source.anycubic-photon-mono-m7
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
- Anycubic Photon Mono M7
- Photon Mono M7
tags:
- printer
- anycubic
- resin
- msla
- documented
- photon-mono-m7-series
manufacturer_id: anycubic
model_name: Photon Mono M7
family_status: photon-mono-m7-series
lifecycle_observed_at: '2026-08-16'
regions:
- Global
availability_evidence: Listed on official Anycubic store https://store.anycubic.com/products/photon-mono-m7 (HTTP 200; accessed 2026-08-16).
---
# Anycubic Photon Mono M7

Hub: [Impressoras](INDEX.md) · Fabricante: [Anycubic](manufacturer-anycubic.md)

## Identidade

| Campo | Valor |
|---|---|
| Fabricante | Anycubic (`manufacturer.anycubic`) |
| Modelo | Photon Mono M7 |
| Família | photon-mono-m7-series |
| coverage_level | `documented` |
| Regiões | Global |

## Lifecycle

| Campo | Valor |
|---|---|
| lifecycle | `current` |
| observed_at | 2026-08-16 |
| evidence | Listed on official Anycubic store https://store.anycubic.com/products/photon-mono-m7 (HTTP 200; accessed 2026-08-16). |
| URL produto | https://store.anycubic.com/products/photon-mono-m7 |

## Especificações

Valores observados na evidência citada (acesso 2026-08-16). Capability observada ≠ resultado de processo em qualquer material.

| Capability | Valor oficial observado | Fonte |
|---|---|---|
| Build volume | 223 × 126 × 230 mm³ (6.5 L) | loja (oficial) |
| LCD | 10.1" mono 14K; X/Y 16.8 × 24.8 μm | loja (oficial) |
| Print speed | Std ≤90 mm/h; High-speed ≤150 mm/h @ 0.1 mm | loja (oficial) |
| Layer height | 0.01–0.15 mm | loja (oficial) |
| Light source | LighTurbo 3.0 / COB + Fresnel | loja (oficial) |
| Power | 135 W (specs block) | loja (oficial) |
| Machine size | 312 × 315 × 520 mm³ | loja (oficial) |

Cells não listadas na evidência: **não publicado pelo fabricante na evidência consultada em 2026-08-16**.

## Tecnologia

Claims do fabricante (fonte oficial; evidência datada):

- Categoria: vat photopolymerization / msla
- Mesma família dimensional do M7 Pro, sem o mesmo conjunto Pro de auto-fill/heating claims

## Manuais

- Página produto/FAQ: https://store.anycubic.com/products/photon-mono-m7
- Wiki/support OEM quando linkado na página

## Hardware

- Dual linear rails; laser-engraved build plate

## Software

- Slicer resin oficial / Chitubox / Lychee conforme OEM
- Não importar perfis FFF

## Firmware

- Versão pinada: não publicado pelo fabricante na evidência consultada em 2026-08-16

## Slicer

- Usar perfil do **modelo/resolução**; exposição/lift específicos

## Materiais

- High-speed, water-washable, standard, ABS-like, plant-based (claim)

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

- Não assumir auto-fill do M7 Pro sem evidência nesta SKU
- Velocidade mm/h depende de resina/altura de camada; claims de lab ≠ qualquer resina
- Não transferir tempos de exposição entre modelos/resoluções

## Fontes

- [source.anycubic-official-products](../22-fontes/anycubic-official-products.md)
- [source.anycubic-photon-mono-m7](../22-fontes/anycubic-photon-mono-m7.md)
- URL oficial: https://store.anycubic.com/products/photon-mono-m7

## Lacunas

- Firmware pinado
- Matriz de exposição oficial por resina (além de claims genéricos)
- Troubleshooting-mapped (falha de adesão, layer lines, film life)
