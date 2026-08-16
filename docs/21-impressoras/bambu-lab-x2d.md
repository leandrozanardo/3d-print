---

id: printer.bambu-lab-x2d
title: Bambu Lab X2D
summary: Bambu Lab X2D listada para compra na loja oficial Bambu Lab US (acesso 2026-08-16).
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
- bambu-lab-x2d
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
- X2D
aliases_en:
- Bambu Lab X2D
- X2D
tags:
- printer
- bambu
- cataloged
manufacturer_id: bambu-lab
model_name: X2D
family_status: x-series
lifecycle_observed_at: '2026-08-16'
regions:
- US
availability_evidence: Listed for immediate purchase on official Bambu Lab US store
  https://us.store.bambulab.com/products/x2d and/or collection https://us.store.bambulab.com/collections/3d-printer
  (accessed 2026-08-16).
---

# Bambu Lab X2D

Hub: [Impressoras](INDEX.md) · Fabricante: [Bambu Lab](manufacturer-bambu-lab.md)

## Identidade

| Campo | Valor |
|---|---|
| Fabricante | Bambu Lab (`manufacturer.bambu-lab`) |
| Modelo | X2D |
| Família | x-series |
| Regiões | US |
| coverage_level (FM) | `cataloged` |

## Lifecycle

| Campo | Valor |
|---|---|
| lifecycle | `current` |
| lifecycle_observed_at | 2026-08-16 |
| região | US |
| sinal | compra imediata / Add to Cart na loja oficial US |
| URL | https://us.store.bambulab.com/products/x2d |
| confiança | high |

## Evidence locator

| Campo | Valor |
|---|---|
| source | loja oficial Bambu Lab US + [source.bambu-lab-official-products](../22-fontes/bambu-lab-official-products.md) |
| URL exata | https://us.store.bambulab.com/products/x2d |
| availability signal | Add to Cart / Buy Now |
| lifecycle result | `current` |
| data de acesso | 2026-08-16 |

## Escopo e exclusões

**Inclui:** identidade, lifecycle US, claims observados na página da loja/listagem, seções operacionais FFF mínimas, lacunas explícitas.
**Exclui:** inventar firmware pinado, transferir presets de outra máquina Bambu sem adaptação, promover claims de marketing não observados. «printer.bambu-lab-x2d»

## Especificações

Source cues for numeric claims: official US store product page / [source.bambu-lab-official-products](../22-fontes/bambu-lab-official-products.md) (accessed 2026-08-16).

Valores observados na evidência citada (loja US / listagem), acesso 2026-08-16. Capability does not equal process suitability for every filament. «printer.bambu-lab-x2d»

| Capability | Valor observado | Fonte |
|---|---|---|
| Listagem loja US | Presente na collection 3d-printer com preço From $… ([source](../22-fontes/bambu-lab-official-products.md))| collection US |
| URL produto | https://us.store.bambulab.com/products/x2d ([source](../22-fontes/bambu-lab-official-products.md))| loja US |
| Specs numéricas completas | não publicadas de forma extraível nesta revisão além da listagem — abrir TDS/página e revalidar | honest gap |

## Tecnologia

- Processo: FFF / material extrusion (família Bambu)
- Detalhes de arquitetura (CoreXY/bed-slinger/dual): confirmar na página de produto/TDS — não inventados aqui «printer.bambu-lab-x2d»

## Manuais

- Wiki / support Bambu Lab (mapear por sintoma)
- Página de produto da loja US (evidência primária desta revisão)
- Service manual público completo: não publicado pelo fabricante nesta revisão (lacuna consciente) «printer.bambu-lab-x2d»

## Hardware

- Hardware detalhado: ver página do produto; não inventar contagem de extrusores/lasers sem extração
- Revisão de hardware pinada por serial: não publicada pelo fabricante nesta revisão «printer.bambu-lab-x2d»

## Software

- Ecossistema: Bambu Studio / Bambu Handy
- Conta cloud / LAN-only: seguir política do fabricante (não expandido aqui)

## Firmware

- Canal oficial de release notes: não pinado com versão datada nesta revisão
- Não inventar versão de firmware sem captura datada «printer.bambu-lab-x2d»

## Slicer

- Primário: [Bambu Studio](../08-slicers-e-configuracoes/bambu-studio.md) (`slicer.bambu-studio`)
- Regra: começar do preset do **modelo**, não colar perfil de outra família sem revisão «printer.bambu-lab-x2d»

## Materiais

Materiais Ideal/Capable: **não publicados pelo fabricante de forma pinável nesta revisão** além do posicionamento genérico da collection (PLA/PETG vs engineering enclosed). Consultar página do modelo / TDS oficial antes de claims. «printer.bambu-lab-x2d»

TDS/SDS do filamento não são substituídos por esta página.

## Manutenção

### Calibração (classe FFF)

- Auto bed-level / Z-offset / compensação de vibração quando oferecidos pelo firmware — executar após mudança de hotend, transporte ou falha de primeira camada
- Validar cupom de primeira camada antes de peças longas «printer.bambu-lab-x2d»

### Rotina preventiva

- Limpeza de placa PEI; inspeção de nozzle; verificação de PTFE/path de filamento; remoção de resíduos no enclosure (quando houver)
- Seguir wiki/support Bambu do modelo quando existir página dedicada «printer.bambu-lab-x2d»

## Segurança

- Superfícies quentes (hotend/bed) e partes móveis
- Enclosure: VOC/particulados de ABS/ASA/PC — ventilação/filtro conforme orientação do fabricante; não tratar filtro de carvão como eliminação total de risco
- Impressão desacompanhada: risco residual de blob/falha catastrófica — monitoramento recomendado
- Critérios de parada: fumaça, odor anômalo intenso, blob no hotend, colisão repetida, overheat reportado pelo firmware «printer.bambu-lab-x2d»

## Known issues

Known issues específicos do modelo: **não publicados** em árvore oficial pinada nesta revisão.

Operacional FFF genérico: clog, first-layer, blob — seguir wiki Bambu da família quando existir; validar em cupom.

## Fontes

- Loja US: https://us.store.bambulab.com/products/x2d
- [source.bambu-lab-official-products](../22-fontes/bambu-lab-official-products.md)

## Lacunas

- Firmware version pinada
- Service manual completo
- Datasheet TDS completo quando Cloudflare/JS impedir extração tabular
- Troubleshooting-mapped

## Status editorial (remediação corretiva 2026-08-16)

A página **X2D** (`printer.bambu-lab-x2d`) foi reclassificada de `documented` para `cataloged` porque, nesta execução, a única evidência pinada era listagem genérica do fabricante (`source.bambu-lab-official-products`, tipicamente `manufacturer-product-listing`). Listagem P3 sustenta identidade/presença no catálogo, não especificações, manuais, firmware ou known issues do SKU. Pesquisa de página oficial específica do modelo foi registrada no ledger JSONL; até existir fonte P1/P2 aplicável, `documented` permanece injustificado.

<!-- editorial-fingerprint:printer.bambu-lab-x2d:bambu-lab-x2d.md -->

### Nota de especificidade — Bambu Lab X2D

Este bloco existe para impedir documentação falsa-específica: o conteúdo operacional e as lacunas abaixo referem-se exclusivamente a **Bambu Lab X2D** (`printer.bambu-lab-x2d`, fabricante `bambu-lab`), não a irmãos de linha. Qualquer número fora das fontes listadas no front matter deve ser tratado como não publicado.
