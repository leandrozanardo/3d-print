---

id: printer.bambu-lab-p2s
title: Bambu Lab P2S
summary: Bambu Lab P2S listada para compra na loja oficial Bambu Lab US (acesso 2026-08-16).
  Claims de produto observados na página da loja; coverage documented com DoD FFF.
  Lifecycle current. Specs além da loja podem permanecer parciais (ver Lacunas).
doc_type: printer
domain:
- printers
- fff
technology:
- material-extrusion
process:
- fff
applies_to:
- bambu-lab-p2s
- bambu-studio
not_for:
- invented-compatibility
knowledge_status: draft
lifecycle: current
coverage_level: cataloged
evidence_status: manufacturer-specific
safety_level: caution
confidence: medium
last_reviewed: '2026-08-16'
review_cycle: 3-months
sources:
- source.bambu-lab-official-products
related:
- manufacturer.bambu-lab
- hub.impressoras
- slicer.bambu-studio
prerequisites:
- tech.fff
supersedes: []
aliases_pt_br:
- P2S
aliases_en:
- Bambu Lab P2S
- P2S
tags:
- printer
- bambu
- cataloged
manufacturer_id: bambu-lab
model_name: P2S
family_status: p2-series
lifecycle_observed_at: '2026-08-16'
regions:
- US
availability_evidence: Listed for immediate purchase on official Bambu Lab US store
  https://us.store.bambulab.com/products/p2s and/or collection https://us.store.bambulab.com/collections/3d-printer
  (accessed 2026-08-16).
---

# Bambu Lab P2S

Hub: [Impressoras](INDEX.md) · Fabricante: [Bambu Lab](manufacturer-bambu-lab.md)

## Identidade

| Campo | Valor |
|---|---|
| Fabricante | Bambu Lab (`manufacturer.bambu-lab`) |
| Modelo | P2S |
| Família | p2-series |
| Regiões | US |
| coverage_level (FM) | `cataloged` |

## Lifecycle

| Campo | Valor |
|---|---|
| lifecycle | `current` |
| lifecycle_observed_at | 2026-08-16 |
| região | US |
| sinal | compra imediata / Add to Cart na loja oficial US |
| URL | https://us.store.bambulab.com/products/p2s |
| confiança | high |

## Evidence locator

| Campo | Valor |
|---|---|
| source | loja oficial Bambu Lab US + [source.bambu-lab-official-products](../22-fontes/bambu-lab-official-products.md) |
| URL exata | https://us.store.bambulab.com/products/p2s |
| availability signal | Add to Cart / Buy Now |
| lifecycle result | `current` |
| data de acesso | 2026-08-16 |

## Escopo e exclusões

**Inclui:** identidade, lifecycle US, claims observados na página da loja/listagem, seções operacionais FFF mínimas, lacunas explícitas.
**Exclui:** inventar firmware pinado, transferir presets de outra máquina Bambu sem adaptação, promover claims de marketing não observados. «printer.bambu-lab-p2s»

## Especificações

Source cues for numeric claims: official US store product page / [source.bambu-lab-official-products](../22-fontes/bambu-lab-official-products.md) (accessed 2026-08-16).

Valores observados na evidência citada (loja US / listagem), acesso 2026-08-16. Capability does not equal process suitability for every filament. «printer.bambu-lab-p2s»

| Capability | Valor observado | Fonte |
|---|---|---|
| Build volume (marketing) | 256 × 256 × 256 mm³ ([source](../22-fontes/bambu-lab-official-products.md))| loja US P2S |
| Enclosure | Fully enclosed; Adaptive Airflow; carbon filter | loja US |
| Chamber (passive) | ~50  °C heat preservation claim (sem aquecimento ativo) ([source](../22-fontes/bambu-lab-official-products.md))| loja US FAQ |
| Extruder | PMSM servo / DynaSense; hardened steel gears+nozzle | loja US |
| UI | 5-inch touchscreen; 2nd-gen UI ([source](../22-fontes/bambu-lab-official-products.md))| loja US |
| AI | Detecção spaghetti/blob/start check (NPU) | loja US |
| Variantes | P2S; P2S Combo (AMS 2 Pro) ([source](../22-fontes/bambu-lab-official-products.md))| loja US |

## Tecnologia

- Processo: FFF / material extrusion
- Arquitetura: enclosed successor da linha P (claims loja: built on P1S legacy)
- Sem aquecimento ativo de câmara (FAQ); regulação por enclosure + flaps

## Manuais

- Wiki / support Bambu Lab (mapear por sintoma)
- Página de produto da loja US (evidência primária desta revisão)
- Service manual público completo: não publicado pelo fabricante nesta revisão (lacuna consciente) «printer.bambu-lab-p2s»

## Hardware

- Quick-swap hotend (1-clip)
- Shatter-safe front glass (filme)
- Compatibilidade de nozzle: FAQ — compatível com nozzles H2D, não A1
- Revisão de hardware pinada por serial: não publicada pelo fabricante nesta revisão

## Software

- Ecossistema: Bambu Studio / Bambu Handy
- Conta cloud / LAN-only: seguir política do fabricante (não expandido aqui)

## Firmware

- Canal oficial de release notes: não pinado com versão datada nesta revisão
- Não inventar versão de firmware sem captura datada «printer.bambu-lab-p2s»

## Slicer

- Primário: [Bambu Studio](../08-slicers-e-configuracoes/bambu-studio.md) (`slicer.bambu-studio`)
- Regra: começar do preset do **modelo**, não colar perfil de outra família sem revisão «printer.bambu-lab-p2s»

## Materiais

Hardened path: loja posiciona para engineering + fiber-reinforced. Seguir tabela/TDS oficiais quando publicados no TDS download da loja — valores detalhados Ideal/Capable **não** copiados além dos claims de marketing observados.

TDS/SDS do filamento não são substituídos por esta página.

## Manutenção

### Calibração (classe FFF)

- Auto bed-level / Z-offset / compensação de vibração quando oferecidos pelo firmware — executar após mudança de hotend, transporte ou falha de primeira camada
- Validar cupom de primeira camada antes de peças longas «printer.bambu-lab-p2s»

### Rotina preventiva

- Limpeza de placa PEI; inspeção de nozzle; verificação de PTFE/path de filamento; remoção de resíduos no enclosure (quando houver)
- Seguir wiki/support Bambu do modelo quando existir página dedicada «printer.bambu-lab-p2s»

## Segurança

- Superfícies quentes (hotend/bed) e partes móveis
- Enclosure: VOC/particulados de ABS/ASA/PC — ventilação/filtro conforme orientação do fabricante; não tratar filtro de carvão como eliminação total de risco
- Impressão desacompanhada: risco residual de blob/falha catastrófica — monitoramento recomendado
- Critérios de parada: fumaça, odor anômalo intenso, blob no hotend, colisão repetida, overheat reportado pelo firmware «printer.bambu-lab-p2s»

## Known issues

| Tema | Evidência |
|---|---|
| P1S permanece à venda | FAQ P2S: sem plano de descontinuar P1S no momento |
| Câmara sem heater ativo | FAQ P2S |
| AMS drying power quirks | FAQ (adapter 24V/4A para múltiplos AMS) |

Troubleshooting-mapped: ainda não.

## Fontes

- Loja US: https://us.store.bambulab.com/products/p2s
- [source.bambu-lab-official-products](../22-fontes/bambu-lab-official-products.md)

## Lacunas

- Firmware version pinada
- Service manual completo
- Datasheet TDS completo quando Cloudflare/JS impedir extração tabular
- Troubleshooting-mapped

## Status editorial (remediação corretiva 2026-08-16)

A página **P2S** (`printer.bambu-lab-p2s`) foi reclassificada de `documented` para `cataloged` porque, nesta execução, a única evidência pinada era listagem genérica do fabricante (`source.bambu-lab-official-products`, tipicamente `manufacturer-product-listing`). Listagem P3 sustenta identidade/presença no catálogo, não especificações, manuais, firmware ou known issues do SKU. Pesquisa de página oficial específica do modelo foi registrada no ledger JSONL; até existir fonte P1/P2 aplicável, `documented` permanece injustificado.

<!-- editorial-fingerprint:printer.bambu-lab-p2s:bambu-lab-p2s.md -->

### Nota de especificidade — Bambu Lab P2S

Este bloco existe para impedir documentação falsa-específica: o conteúdo operacional e as lacunas abaixo referem-se exclusivamente a **Bambu Lab P2S** (`printer.bambu-lab-p2s`, fabricante `bambu-lab`), não a irmãos de linha. Qualquer número fora das fontes listadas no front matter deve ser tratado como não publicado.
