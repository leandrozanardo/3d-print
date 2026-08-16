---
id: printer.bambu-lab-a1
title: Bambu Lab A1
summary: Bambu Lab A1 é impressora FFF bed-slinger full-size com compra imediata na
  loja oficial US (acesso 2026-08-16). Companion da A1 mini com volume maior; Combo
  inclui AMS lite. Specs detalhadas além da loja ainda têm lacunas se a página de
  tech-specs estiver bloqueada.
doc_type: printer
domain:
- printers
- fff
technology:
- material-extrusion
process:
- fff
applies_to:
- bambu-lab-a1
- bambu-studio
not_for:
- heated-chamber-default
- x1c-presets-unadapted
knowledge_status: draft
lifecycle: current
coverage_level: documented
evidence_status: manufacturer-specific
safety_level: caution
confidence: high
last_reviewed: '2026-08-16'
review_cycle: 6-months
sources:
- source.bambu-lab-official-products
related:
- printer.bambu-lab-a1-mini
- manufacturer.bambu-lab
- hub.impressoras
- slicer.bambu-studio
prerequisites:
- tech.fff
supersedes: []
aliases_pt_br:
- A1
- Bambu A1
aliases_en:
- Bambu Lab A1
- A1
tags:
- printer
- bambu
- documented
manufacturer_id: bambu-lab
model_name: A1
family_status: a-series
lifecycle_observed_at: '2026-08-16'
regions:
- US
availability_evidence: Listed for immediate purchase on official Bambu Lab US store
  https://us.store.bambulab.com/products/a1 (accessed 2026-08-16).
---
# Bambu Lab A1

Hub: [Impressoras](INDEX.md) · [A1 Mini](bambu-lab-a1-mini.md)

## Identidade

| Campo | Valor |
|---|---|
| Fabricante | Bambu Lab (`manufacturer.bambu-lab`) |
| Modelo | A1 |
| Família | a-series |
| Regiões | US |
| Variantes | A1; A1 Combo (AMS lite) |

## Lifecycle

| Campo | Valor |
|---|---|
| lifecycle | `current` |
| observed_at | 2026-08-16 |
| evidence | Listed for immediate purchase on official Bambu Lab US store https://us.store.bambulab.com/products/a1 (accessed 2026-08-16). |
| URL | https://us.store.bambulab.com/products/a1 |

## Evidence locator

| Campo | Valor |
|---|---|
| source | loja oficial Bambu Lab US |
| URL exata | https://us.store.bambulab.com/products/a1 |
| nome observado | Bambu Lab A1 3D Printer |
| availability signal | Add to Cart / Buy Now |
| lifecycle result | current |
| data de acesso | 2026-08-16 |

## Escopo e exclusões

Inclui identidade, lifecycle US, specs observadas na evidência citada e lacunas.  
Exclui inventar firmware pinado, transferir presets de outras máquinas Bambu sem adaptação, e claims de materiais fora da tabela do fabricante.

## Especificações

| Capability | Valor observado | Fonte |
|---|---|---|
| Compra US | listada com Add to Cart / Buy Now | loja US 2026-08-16 |
| Combo | A1 Combo inclui AMS lite | loja US |
| Dimensões físicas (loja) | A1 465×410×430 mm³ (net ~8,3 kg) | loja US FAQ/specs block |
| Build volume numérico pinado | lacuna se tech-specs bloqueada | reabrir specs |

Valores de temperatura/velocidade: **não inventados** nesta página até source de specs dedicada acessível.


## Tecnologia

- Processo: FFF / material extrusion
- Arquitetura: bed-slinger (frame aberto, série A)
- Extrusão: direct drive (ecossistema Bambu)

## Manuais

- Wiki / support Bambu Lab (mapear páginas específicas por sintoma)
- Service manual completo: lacuna

## Hardware

- Frame aberto A-series
- Direct drive / ecossistema Bambu
- Revisão de hardware por serial: lacuna

## Software

- Bambu Studio / app Bambu

## Firmware

- Canal de release notes: lacuna pinada nesta revisão (não inventar versão)

## Slicer

- Primário: Bambu Studio — usar preset do modelo, não colar perfil de outra máquina sem revisão

## Materiais

- Seguir lista Ideal/Not Recommended do fabricante na página de specs do modelo (ainda não pinada se Cloudflare bloquear)
- Não copiar cegamente limites da A1 mini

## Manutenção

- Seguir wiki oficial de manutenção do modelo; rotinas locais ainda parciais

## Segurança

- Superfícies quentes, partes móveis, risco de blob/hotend wrap
- Critérios de parada: fumaça, odor anômalo intenso, blob, colisão repetida, overheat reportado

## Known issues

- Pesquisa de known-issues específica A1: parcial (compartilha família A1 com mini para clog/blob wiki)
- Não `troubleshooting-mapped` ainda

## Fontes

- Loja US: https://us.store.bambulab.com/products/a1
- Catálogo: [source.bambu-lab-official-products](../22-fontes/bambu-lab-official-products.md)


## Lacunas

- Datasheet técnico dedicado `source.*` quando a página de specs estiver acessível sem bloqueio
- Firmware version pinada
- Troubleshooting-mapped completo (exceto onde indicado)
