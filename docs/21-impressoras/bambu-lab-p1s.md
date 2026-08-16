---
id: printer.bambu-lab-p1s
title: Bambu Lab P1S
summary: Bambu Lab P1S é impressora FFF enclosed 256³ mm com filtro de carvão, listada
  para compra imediata na loja oficial US (acesso 2026-08-16). Specs de volume, temps
  e filamentos Ideal/Capable foram observadas no bloco de parâmetros da própria página
  da loja.
doc_type: printer
domain:
- printers
- fff
technology:
- material-extrusion
process:
- fff
applies_to:
- bambu-lab-p1s
- bambu-studio
not_for:
- open-frame-abs-as-equivalent-to-a1
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
- source.bambu-p1s-us-store
related:
- manufacturer.bambu-lab
- hub.impressoras
- slicer.bambu-studio
- printer.bambu-lab-a1
prerequisites:
- tech.fff
supersedes: []
aliases_pt_br:
- P1S
- Bambu P1S
aliases_en:
- Bambu Lab P1S
- P1S
tags:
- printer
- bambu
- enclosed
- documented
manufacturer_id: bambu-lab
model_name: P1S
family_status: p1-series
lifecycle_observed_at: '2026-08-16'
regions:
- US
availability_evidence: Listed for immediate purchase on official Bambu Lab US store
  https://us.store.bambulab.com/products/p1s (accessed 2026-08-16).
---
# Bambu Lab P1S

Hub: [Impressoras](INDEX.md)

## Identidade

| Campo | Valor |
|---|---|
| Fabricante | Bambu Lab (`manufacturer.bambu-lab`) |
| Modelo | P1S |
| Família | p1-series |
| Regiões | US |
| Variantes | P1S; P1S AMS Combo; P1S AMS 2 Pro Combo |

## Lifecycle

| Campo | Valor |
|---|---|
| lifecycle | `current` |
| observed_at | 2026-08-16 |
| evidence | Listed for immediate purchase on official Bambu Lab US store https://us.store.bambulab.com/products/p1s (accessed 2026-08-16). |
| URL | https://us.store.bambulab.com/products/p1s |

## Evidence locator

| Campo | Valor |
|---|---|
| source | loja oficial Bambu Lab US |
| URL exata | https://us.store.bambulab.com/products/p1s |
| nome observado | Bambu Lab P1S 3D Printer |
| availability signal | Add to Cart / Buy Now |
| lifecycle result | current |
| data de acesso | 2026-08-16 |

## Escopo e exclusões

Inclui identidade, lifecycle US, specs observadas na evidência citada e lacunas.  
Exclui inventar firmware pinado, transferir presets de outras máquinas Bambu sem adaptação, e claims de materiais fora da tabela do fabricante.

## Especificações

Valores abaixo foram observados no bloco de parâmetros da loja US P1S (acesso 2026-08-16):

| Capability | Valor oficial observado | Nota |
|---|---|---|
| Build volume | 256 × 256 × 256 mm³ | Studio pode limitar altura default a 250 mm |
| Enclosure | Enclosed (plastic & glass) | vs P1P open frame |
| Nozzle incluso | 0,4 mm (fonte oficial/fabricante/heuristic; ver sources)  stainless | opções 0,2 / 0,6 / 0,8 |
| Max hotend | 300 °C (fonte oficial/fabricante/heuristic; ver sources)  | capability |
| Max bed | 100 °C (fonte oficial/fabricante/heuristic; ver sources)  | |
| Max toolhead speed | 500 mm (fonte oficial/fabricante/heuristic; ver sources) /s (fonte oficial/fabricante/heuristic; ver sources)  | marketing/capability |
| Max acceleration | 20 m/s² | |
| Ideal filaments | PLA, PETG, TPU, PVA, PET, ABS, ASA | posição fabricante |
| Capable | PA, PC | |
| Air filter | Activated carbon | |


## Tecnologia

- Processo: FFF / material extrusion
- Arquitetura: CoreXY enclosed (família P1)
- Extrusão: direct drive (ecossistema Bambu)

## Manuais

- Wiki / support Bambu Lab (mapear páginas específicas por sintoma)
- Service manual completo: lacuna

## Hardware

- Enclosure + carbon filter
- Auxiliary part cooling / chamber regulator / control board fans (closed loop)
- Hotend all-metal

## Software

- Bambu Studio / app Bambu

## Firmware

- Canal de release notes: lacuna pinada nesta revisão (não inventar versão)

## Slicer

- Primário: Bambu Studio — usar preset do modelo, não colar perfil de outra máquina sem revisão

## Materiais

- Ideal: PLA, PETG, TPU, PVA, PET, ABS, ASA
- Capable: PA, PC
- CF/GF: fabricante recomenda upgrade de extruder/hotend antes (FAQ loja)

## Manutenção

- Seguir wiki oficial de manutenção do modelo; rotinas locais ainda parciais

## Segurança

- Superfícies quentes, partes móveis, risco de blob/hotend wrap
- Critérios de parada: fumaça, odor anômalo intenso, blob, colisão repetida, overheat reportado

## Known issues

- FAQ loja distingue P1S vs P1P vs X1C
- Marketing aponta sucessor P2S na loja — P1S permanece on-sale (current)
- Troubleshooting-mapped: ainda não

## Fontes

- Loja US: https://us.store.bambulab.com/products/p1s
- Catálogo: [source.bambu-lab-official-products](../22-fontes/bambu-lab-official-products.md)
- [source.bambu-p1s-us-store](../22-fontes/bambu-p1s-us-store.md)

## Lacunas

- Datasheet técnico dedicado `source.*` quando a página de specs estiver acessível sem bloqueio
- Firmware version pinada
- Troubleshooting-mapped completo (exceto onde indicado)
