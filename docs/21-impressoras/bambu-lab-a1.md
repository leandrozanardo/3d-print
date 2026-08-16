---
id: printer.bambu-lab-a1
title: Bambu Lab A1
summary: Bambu Lab A1 é impressora FFF bed-slinger full-size 256³ mm com compra
  imediata na loja oficial US (acesso 2026-08-16). Specs de volume, temps e
  filamentos Ideal/Not Recommended observadas no bloco SPECS da loja. Lifecycle
  current; coverage documented.
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
  https://us.store.bambulab.com/products/a1 (accessed 2026-08-16). Store SPECS
  block lists 256×256×256 mm³ build volume.
---

# Bambu Lab A1

Hub: [Impressoras](INDEX.md) · Fabricante: [Bambu Lab](manufacturer-bambu-lab.md)

## Identidade

| Campo | Valor |
|---|---|
| Fabricante | Bambu Lab (`manufacturer.bambu-lab`) |
| Modelo | A1 |
| Família | a-series |
| Regiões | US |
| coverage_level (FM) | `documented` |

## Lifecycle

| Campo | Valor |
|---|---|
| lifecycle | `current` |
| lifecycle_observed_at | 2026-08-16 |
| região | US |
| sinal | compra imediata / Add to Cart na loja oficial US |
| URL | https://us.store.bambulab.com/products/a1 |
| confiança | high |

## Evidence locator

| Campo | Valor |
|---|---|
| source | loja oficial Bambu Lab US + [source.bambu-lab-official-products](../22-fontes/bambu-lab-official-products.md) |
| URL exata | https://us.store.bambulab.com/products/a1 |
| availability signal | Add to Cart / Buy Now |
| lifecycle result | `current` |
| data de acesso | 2026-08-16 |

## Escopo e exclusões

**Inclui:** identidade, lifecycle US, claims observados na página da loja/listagem, seções operacionais FFF mínimas, lacunas explícitas.
**Exclui:** inventar firmware pinado, transferir presets de outra máquina Bambu sem adaptação, promover claims de marketing não observados.

## Especificações

Source cues for numeric claims: official US store product page / [source.bambu-lab-official-products](../22-fontes/bambu-lab-official-products.md) (accessed 2026-08-16).

Valores observados na evidência citada (loja US / listagem), acesso 2026-08-16. Capability does not equal process suitability for every filament.

| Capability | Valor observado | Fonte |
|---|---|---|
| Build volume | 256 × 256 × 256 mm³ ([source](../22-fontes/bambu-lab-official-products.md))| loja US A1 SPECS |
| Hotend | All-Metal | loja US |
| Nozzle incluso | 0,4 mm stainless (opc. 0,2 / 0,6 / 0,8) ([source](../22-fontes/bambu-lab-official-products.md))| loja US |
| Max hotend | 300  °C ([source](../22-fontes/bambu-lab-official-products.md))| loja US |
| Max bed | 100  °C ([source](../22-fontes/bambu-lab-official-products.md))| loja US |
| Max toolhead speed | 500 mm/s ([source](../22-fontes/bambu-lab-official-products.md))| loja US |
| Max acceleration | 10000 mm/s² ([source](../22-fontes/bambu-lab-official-products.md))| loja US |
| Dimensões físicas | 465 × 410 × 430 mm³; net ~8,3 kg ([source](../22-fontes/bambu-lab-official-products.md))| loja US |
| Variantes | A1; A1 Combo (AMS lite) ([source](../22-fontes/bambu-lab-official-products.md))| loja US |

## Tecnologia

- Processo: FFF / material extrusion (`tech.fff`)
- Arquitetura: bed-slinger (frame aberto, série A)
- Extrusão: direct drive (ecossistema Bambu)
- Calibração automática: Z-offset, bed-level, vibração, pressão de nozzle (claims da loja)

## Manuais

- Wiki / unboxing: referenciado no FAQ da loja US A1
- Wiki família A1 (sintomas compartilhados com A1 mini para clog/blob)
- Service manual público completo: não publicado pelo fabricante nesta revisão (lacuna consciente)

## Hardware

- Frame aberto A-series; placa PEI (várias opções listadas na loja)
- Sensores: runout, odometry, tangle, power-loss recover, câmera low framerate
- Heatbed cable: loja menciona reforço Kevlar / strain relief (pós-recall Jan 2024 — FAQ: unidades pós-30 Jan 2024 incluem mitigação)
- Revisão de hardware pinada por serial: não publicada pelo fabricante nesta revisão

## Software

- Ecossistema: Bambu Studio / Bambu Handy
- Conta cloud / LAN-only: seguir política do fabricante (não expandido aqui)

## Firmware

- Canal oficial de release notes: não pinado com versão datada nesta revisão
- Não inventar versão de firmware sem captura datada

## Slicer

- Primário: [Bambu Studio](../08-slicers-e-configuracoes/bambu-studio.md) (`slicer.bambu-studio`)
- Regra: começar do preset do **modelo**, não colar perfil de outra família sem revisão

## Materiais

Posição do fabricante (loja US A1 SPECS / FAQ):

| Classe | Materiais |
|---|---|
| Ideal | PLA, PETG, TPU, PVA |
| Not Recommended (tabela SPECS) | ABS, ASA, PC, PA, PET, CF/GF reinforced |

FAQ da loja esclarece que filamentos de alta temperatura **podem** ser usados em modelos pequenos/baixa densidade com risco de warping/interlayer fraco (frame aberto). Não recomenda enclosure DIY do A1. Nozzle hardened steel necessário para abrasivos (CF/GF).

TDS/SDS do filamento não são substituídos por esta página.

## Manutenção

### Calibração (classe FFF)

- Auto bed-level / Z-offset / compensação de vibração quando oferecidos pelo firmware — executar após mudança de hotend, transporte ou falha de primeira camada
- Validar cupom de primeira camada antes de peças longas

### Rotina preventiva

- Limpeza de placa PEI; inspeção de nozzle; verificação de PTFE/path de filamento; remoção de resíduos no enclosure (quando houver)
- Seguir wiki/support Bambu do modelo quando existir página dedicada

## Segurança

- Superfícies quentes (hotend/bed) e partes móveis
- Enclosure: VOC/particulados de ABS/ASA/PC — ventilação/filtro conforme orientação do fabricante; não tratar filtro de carvão como eliminação total de risco
- Impressão desacompanhada: risco residual de blob/falha catastrófica — monitoramento recomendado
- Critérios de parada: fumaça, odor anômalo intenso, blob no hotend, colisão repetida, overheat reportado pelo firmware

## Known issues

Pesquisa oficial (loja FAQ + wiki família A). Não `troubleshooting-mapped` nesta página.

| Tema | Classificação | Evidência | Nota |
|---|---|---|---|
| Heatbed cable recall (lote antigo) | histórico / mitigado em unidades novas | FAQ loja US | Unidades vendidas após 2026-01-30 (FAQ) não são do lote recalled |
| Clog / blob (família A) | mecânico/térmico comum | wiki A1 mini correlata | Validar com árvore oficial; não misturar presets X1C |
| Frame aberto + ABS/ASA grandes | processo / warping | FAQ loja | Preferir máquina enclosed para peças grandes |
| Enclosure DIY | não recomendado pelo fabricante | FAQ loja | |

Comunidade (fórum/Reddit): não usada como root-cause primária nesta revisão.

## Fontes

- Loja US: https://us.store.bambulab.com/products/a1
- [source.bambu-lab-official-products](../22-fontes/bambu-lab-official-products.md)

## Lacunas

- Firmware version + release notes datados
- Service manual / error code map completo
- Hardware revision por serial
- Páginas wiki A1 dedicadas pinadas 1:1 além do FAQ/loja (parcial via família A1 mini)
- Troubleshooting-mapped completo com pesquisa comunitária classificada
