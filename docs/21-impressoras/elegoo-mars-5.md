---
id: printer.elegoo-mars-5
title: Elegoo Mars 5
summary: ELEGOO Mars 5 é MSLA/LCD resin (6.6" 4K) volume ~143.43×89.6×150 mm, listada na loja oficial US em 2026-08-16.
doc_type: printer
domain:
- printers
- resin
technology:
- vat-photopolymerization
process:
- msla
applies_to:
- elegoo-mars-5
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
- source.elegoo-official-products
- source.elegoo-mars-5
related:
- manufacturer.elegoo
- hub.impressoras
- tech.vat-photopolymerization
- tech.sla-dlp-msla
prerequisites:
- tech.sla-dlp-msla
supersedes: []
aliases_pt_br: []
aliases_en:
- Elegoo Mars 5
- ELEGOO Mars 5
- Mars 5
tags:
- printer
- elegoo
- resin
- msla
- documented
- mars-5-series
manufacturer_id: elegoo
model_name: Mars 5
family_status: mars-5-series
lifecycle_observed_at: '2026-08-16'
regions:
- US
availability_evidence: Listed for purchase on official ELEGOO US store https://us.elegoo.com/products/mars-5-4k-6-6inch-monochrome-lcd-resin-3d-printer (accessed 2026-08-16).
---
# Elegoo Mars 5

Hub: [Impressoras](INDEX.md) · Fabricante: [Elegoo](manufacturer-elegoo.md)

## Identidade

| Campo | Valor |
|---|---|
| Fabricante | Elegoo (`manufacturer.elegoo`) |
| Modelo | Mars 5 |
| Família | mars-5-series |
| coverage_level | `documented` |
| Regiões | US |

## Lifecycle

| Campo | Valor |
|---|---|
| lifecycle | `current` |
| observed_at | 2026-08-16 |
| evidence | Listed for purchase on official ELEGOO US store https://us.elegoo.com/products/mars-5-4k-6-6inch-monochrome-lcd-resin-3d-printer (accessed 2026-08-16). |
| URL produto | https://us.elegoo.com/products/mars-5-4k-6-6inch-monochrome-lcd-resin-3d-printer |

## Especificações

Valores observados na evidência citada (acesso 2026-08-16). Capability observada ≠ resultado de processo em qualquer material.

| Capability | Valor oficial observado | Fonte |
|---|---|---|
| Build volume | 143.43 × 89.6 × 150 mm | loja US (oficial) |
| LCD class | 6.6-inch monochrome LCD (4K product handle) | URL/título (oficial) |

Cells não listadas na evidência: **não publicado pelo fabricante na evidência consultada em 2026-08-16**.

## Tecnologia

Claims do fabricante (fonte oficial; evidência datada):

- Categoria: vat photopolymerization / msla
- Família Mars resin — não FFF

## Manuais

- Página produto/FAQ: https://us.elegoo.com/products/mars-5-4k-6-6inch-monochrome-lcd-resin-3d-printer
- Wiki/support OEM quando linkado na página

## Hardware

- Compact desktop resin form factor

## Software

- Slicer resin oficial / Chitubox / Lychee conforme OEM
- Não importar perfis FFF

## Firmware

- Versão pinada: não publicado pelo fabricante na evidência consultada em 2026-08-16

## Slicer

- Usar perfil do **modelo/resolução**; exposição/lift específicos

## Materiais

- Resinas 405 nm mainstream ELEGOO (claim de ecossistema)

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

- XY μm / mm/h: extrair de Specification em revisão se não no HTML estático
- Velocidade mm/h depende de resina/altura de camada; claims de lab ≠ qualquer resina
- Não transferir tempos de exposição entre modelos/resoluções

## Fontes

- [source.elegoo-official-products](../22-fontes/elegoo-official-products.md)
- [source.elegoo-mars-5](../22-fontes/elegoo-mars-5.md)
- URL oficial: https://us.elegoo.com/products/mars-5-4k-6-6inch-monochrome-lcd-resin-3d-printer

## Lacunas

- Firmware pinado
- Matriz de exposição oficial por resina (além de claims genéricos)
- Troubleshooting-mapped (falha de adesão, layer lines, film life)
