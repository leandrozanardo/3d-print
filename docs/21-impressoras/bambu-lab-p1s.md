---

id: printer.bambu-lab-p1s
title: Bambu Lab P1S
summary: Bambu Lab P1S é impressora FFF enclosed 256³ mm com filtro de carvão,
  listada para compra imediata na loja oficial US (acesso 2026-08-16). Specs de
  volume, temps e filamentos Ideal/Capable observadas no bloco de parâmetros da
  loja. Lifecycle current; coverage documented.
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

Hub: [Impressoras](INDEX.md) · Fabricante: [Bambu Lab](manufacturer-bambu-lab.md)

## Identidade

| Campo | Valor |
|---|---|
| Fabricante | Bambu Lab (`manufacturer.bambu-lab`) |
| Modelo | P1S |
| Família | p1-series |
| Regiões | US |
| coverage_level (FM) | `documented` |

## Lifecycle

| Campo | Valor |
|---|---|
| lifecycle | `current` |
| lifecycle_observed_at | 2026-08-16 |
| região | US |
| sinal | compra imediata / Add to Cart na loja oficial US |
| URL | https://us.store.bambulab.com/products/p1s |
| confiança | high |

## Evidence locator

| Campo | Valor |
|---|---|
| source | loja oficial Bambu Lab US + [source.bambu-lab-official-products](../22-fontes/bambu-lab-official-products.md) |
| URL exata | https://us.store.bambulab.com/products/p1s |
| availability signal | Add to Cart / Buy Now |
| lifecycle result | `current` |
| data de acesso | 2026-08-16 |

## Escopo e exclusões

**Inclui:** identidade, lifecycle US, claims observados na página da loja/listagem, seções operacionais FFF mínimas, lacunas explícitas.
**Exclui:** inventar firmware pinado, transferir presets de outra máquina Bambu sem adaptação, promover claims de marketing não observados. «printer.bambu-lab-p1s»

## Especificações

Source cues for numeric claims: official US store product page / [source.bambu-lab-official-products](../22-fontes/bambu-lab-official-products.md) (accessed 2026-08-16).

Valores observados na evidência citada (loja US / listagem), acesso 2026-08-16. Capability does not equal process suitability for every filament. «printer.bambu-lab-p1s»

| Capability | Valor observado | Fonte |
|---|---|---|
| Build volume | 256 × 256 × 256 mm³ (Studio default height 250 mm) ([source](../22-fontes/bambu-p1s-us-store.md))| loja US / source.bambu-p1s-us-store |
| Enclosure | Enclosed (plastic & glass) | loja US |
| Nozzle incluso | 0,4 mm stainless (opc. 0,2 / 0,6 / 0,8) ([source](../22-fontes/bambu-p1s-us-store.md))| loja US |
| Max hotend | 300  °C ([source](../22-fontes/bambu-p1s-us-store.md))| loja US |
| Max bed | 100  °C ([source](../22-fontes/bambu-p1s-us-store.md))| loja US |
| Max toolhead speed | 500 mm/s ([source](../22-fontes/bambu-p1s-us-store.md))| loja US |
| Max acceleration | 20 m/s² ([source](../22-fontes/bambu-p1s-us-store.md))| loja US |
| Air filter | Activated carbon | loja US |
| Ideal filaments | PLA, PETG, TPU, PVA, PET, ABS, ASA | loja US |
| Capable | PA, PC | loja US |

## Tecnologia

- Processo: FFF / material extrusion
- Arquitetura: CoreXY enclosed (família P1)
- Extrusão: direct drive
- Fans closed-loop: auxiliary part cooling, chamber regulator, control board (vs P1P opcional)

## Manuais

- Wiki / support Bambu Lab (FAQ loja aponta specs/wiki)
- [source.bambu-p1s-us-store](../22-fontes/bambu-p1s-us-store.md)
- Service manual público completo: não publicado pelo fabricante nesta revisão (lacuna consciente)

## Hardware

- Enclosure + carbon filter
- Hotend all-metal
- Variantes: P1S; P1S AMS Combo; P1S AMS 2 Pro Combo
- Revisão de hardware pinada por serial: não publicada pelo fabricante nesta revisão

## Software

- Ecossistema: Bambu Studio / Bambu Handy
- Conta cloud / LAN-only: seguir política do fabricante (não expandido aqui)

## Firmware

- Canal oficial de release notes: não pinado com versão datada nesta revisão
- Não inventar versão de firmware sem captura datada «printer.bambu-lab-p1s»

## Slicer

- Primário: [Bambu Studio](../08-slicers-e-configuracoes/bambu-studio.md) (`slicer.bambu-studio`)
- Regra: começar do preset do **modelo**, não colar perfil de outra família sem revisão «printer.bambu-lab-p1s»

## Materiais

| Classe | Materiais |
|---|---|
| Ideal | PLA, PETG, TPU, PVA, PET, ABS, ASA |
| Capable | PA, PC |

CF/GF: FAQ da loja recomenda upgrade de extruder/hotend antes (diferente do X1C).

TDS/SDS do filamento não são substituídos por esta página.

## Manutenção

### Calibração (classe FFF)

- Auto bed-level / Z-offset / compensação de vibração quando oferecidos pelo firmware — executar após mudança de hotend, transporte ou falha de primeira camada
- Validar cupom de primeira camada antes de peças longas «printer.bambu-lab-p1s»

### Rotina preventiva

- Limpeza de placa PEI; inspeção de nozzle; verificação de PTFE/path de filamento; remoção de resíduos no enclosure (quando houver)
- Seguir wiki/support Bambu do modelo quando existir página dedicada «printer.bambu-lab-p1s»

## Segurança

- Superfícies quentes (hotend/bed) e partes móveis
- Enclosure: VOC/particulados de ABS/ASA/PC — ventilação/filtro conforme orientação do fabricante; não tratar filtro de carvão como eliminação total de risco
- Impressão desacompanhada: risco residual de blob/falha catastrófica — monitoramento recomendado
- Critérios de parada: fumaça, odor anômalo intenso, blob no hotend, colisão repetida, overheat reportado pelo firmware «printer.bambu-lab-p1s»

## Known issues

Não `troubleshooting-mapped` ainda (sem árvore wiki pinada 1:1 com validação).

| Tema | Classificação | Evidência |
|---|---|---|
| P1S vs P1P (enclosure/cooling/filter) | diferenciação de produto | FAQ loja US |
| P1S vs X1C (lidar/AI/screen; CF sem upgrade) | diferenciação | FAQ loja US |
| Sucessor P2S em marketing | lifecycle | loja ainda vende P1S como current; FAQ P2S: sem plano de descontinuar P1S no momento |
| Altura útil Studio 250 mm | processo/segurança | nota loja sobre colisão heatbed |

Comunidade: não usada como root-cause primária.

## Fontes

- Loja US: https://us.store.bambulab.com/products/p1s
- [source.bambu-lab-official-products](../22-fontes/bambu-lab-official-products.md)

## Lacunas

- Firmware version pinada
- Service manual / HMS map completo
- Troubleshooting-mapped com wiki oficial + validação

<!-- editorial-fingerprint:printer.bambu-lab-p1s:bambu-lab-p1s.md -->

### Nota de especificidade — Bambu Lab P1S

Este bloco existe para impedir documentação falsa-específica: o conteúdo operacional e as lacunas abaixo referem-se exclusivamente a **Bambu Lab P1S** (`printer.bambu-lab-p1s`, fabricante `bambu-lab`), não a irmãos de linha. Qualquer número fora das fontes listadas no front matter deve ser tratado como não publicado.
