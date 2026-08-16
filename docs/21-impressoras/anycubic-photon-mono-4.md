---
id: printer.anycubic-photon-mono-4
title: Anycubic Photon Mono 4
summary: Anycubic Photon Mono 4 é MSLA entry 7" 10K volume 153.4×87×165 mm (até 70 mm/h high-speed), listada na loja oficial em 2026-08-16.
doc_type: printer
domain:
- printers
- resin
technology:
- vat-photopolymerization
process:
- msla
applies_to:
- anycubic-photon-mono-4
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
- source.anycubic-photon-mono-4
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
- Anycubic Photon Mono 4
- Photon Mono 4
tags:
- printer
- anycubic
- resin
- msla
- documented
- photon-mono-4-series
manufacturer_id: anycubic
model_name: Photon Mono 4
family_status: photon-mono-4-series
lifecycle_observed_at: '2026-08-16'
regions:
- Global
availability_evidence: Listed on official Anycubic store https://store.anycubic.com/products/photon-mono-4 (HTTP 200; accessed 2026-08-16).
---
# Anycubic Photon Mono 4

Hub: [Impressoras](INDEX.md) · Fabricante: [Anycubic](manufacturer-anycubic.md)

## Identidade

| Campo | Valor |
|---|---|
| Fabricante | Anycubic (`manufacturer.anycubic`) |
| Modelo | Photon Mono 4 |
| Família | photon-mono-4-series |
| coverage_level | `documented` |
| Regiões | Global |

## Lifecycle

| Campo | Valor |
|---|---|
| lifecycle | `current` |
| observed_at | 2026-08-16 |
| evidence | Listed on official Anycubic store https://store.anycubic.com/products/photon-mono-4 (HTTP 200; accessed 2026-08-16). |
| URL produto | https://store.anycubic.com/products/photon-mono-4 |

## Especificações

Valores observados na evidência citada (acesso 2026-08-16). Capability observada ≠ resultado de processo em qualquer material.

| Capability | Valor oficial observado | Fonte |
|---|---|---|
| Build volume | 153.4 × 87 × 165 mm³ (2.2 L) | loja (oficial) |
| LCD | 7" mono 10K; X/Y 17 × 17 μm | loja (oficial) |
| Print speed | Std ≤50 mm/h; High-speed ≤70 mm/h @ 0.1 mm | loja (oficial) |
| Layer height | 0.03–0.15 mm | loja (oficial) |
| Light source | Parallel Matrix Upgrade; ~3000 μW/cm² | loja (oficial) |
| Machine size | 230 × 235 × 391 mm³ | loja (oficial) |

Cells não listadas na evidência: **não publicado pelo fabricante na evidência consultada em 2026-08-16**.

## Tecnologia

Claims do fabricante (fonte oficial; evidência datada):

- Categoria: vat photopolymerization / msla
- Entry vs Ultra: optical path e velocidade diferem — não copiar presets Ultra

## Manuais

- Página produto/FAQ: https://store.anycubic.com/products/photon-mono-4
- Wiki/support OEM quando linkado na página

## Hardware

- 4-point manual leveling; single linear rail 30 μm (specs)

## Software

- Slicer resin oficial / Chitubox / Lychee conforme OEM
- Não importar perfis FFF

## Firmware

- Versão pinada: não publicado pelo fabricante na evidência consultada em 2026-08-16

## Slicer

- Usar perfil do **modelo/resolução**; exposição/lift específicos

## Materiais

- Resinas mainstream Anycubic (claim genérico da série)

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

- Menos sensores/assist vs Ultra — lacuna consciente
- Velocidade mm/h depende de resina/altura de camada; claims de lab ≠ qualquer resina
- Não transferir tempos de exposição entre modelos/resoluções

## Fontes

- [source.anycubic-official-products](../22-fontes/anycubic-official-products.md)
- [source.anycubic-photon-mono-4](../22-fontes/anycubic-photon-mono-4.md)
- URL oficial: https://store.anycubic.com/products/photon-mono-4

## Lacunas

- Firmware pinado
- Matriz de exposição oficial por resina (além de claims genéricos)
- Troubleshooting-mapped (falha de adesão, layer lines, film life)
