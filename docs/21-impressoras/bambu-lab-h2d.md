---
id: printer.bambu-lab-h2d
title: Bambu Lab H2D
summary: Bambu Lab H2D listada para compra na loja oficial Bambu Lab US (acesso 2026-08-16).
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
- bambu-lab-h2d
- bambu-studio
not_for:
- invented-compatibility
knowledge_status: draft
lifecycle: current
coverage_level: documented
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
- H2D
aliases_en:
- Bambu Lab H2D
- H2D
tags:
- printer
- bambu
- documented
manufacturer_id: bambu-lab
model_name: H2D
family_status: h2-series
lifecycle_observed_at: '2026-08-16'
regions:
- US
availability_evidence: Listed for immediate purchase on official Bambu Lab US store
  https://us.store.bambulab.com/products/h2d and/or collection https://us.store.bambulab.com/collections/3d-printer
  (accessed 2026-08-16).
---

# Bambu Lab H2D

Hub: [Impressoras](INDEX.md) · Fabricante: [Bambu Lab](manufacturer-bambu-lab.md)

## Identidade

| Campo | Valor |
|---|---|
| Fabricante | Bambu Lab (`manufacturer.bambu-lab`) |
| Modelo | H2D |
| Família | h2-series |
| Regiões | US |
| coverage_level (FM) | `documented` |

## Lifecycle

| Campo | Valor |
|---|---|
| lifecycle | `current` |
| lifecycle_observed_at | 2026-08-16 |
| região | US |
| sinal | compra imediata / Add to Cart na loja oficial US |
| URL | https://us.store.bambulab.com/products/h2d |
| confiança | high |

## Evidence locator

| Campo | Valor |
|---|---|
| source | loja oficial Bambu Lab US + [source.bambu-lab-official-products](../22-fontes/bambu-lab-official-products.md) |
| URL exata | https://us.store.bambulab.com/products/h2d |
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
| Print volume (total two nozzles) | 350 × 320 × 325 mm³ ([source](../22-fontes/bambu-lab-official-products.md))| loja US H2D SPECS |
| Single nozzle volume | 325 × 320 × 325 mm³ ([source](../22-fontes/bambu-lab-official-products.md))| loja US |
| Dual nozzle volume | 300 × 320 × 325 mm³ ([source](../22-fontes/bambu-lab-official-products.md))| loja US |
| Nozzle temp (marketing) | 350  °C ([source](../22-fontes/bambu-lab-official-products.md))| product features loja |
| Active chamber heating (marketing) | 65  °C ([source](../22-fontes/bambu-lab-official-products.md))| product features loja |
| Included nozzle | 0,4 mm (opc. 0,2 / 0,6 / 0,8) ([source](../22-fontes/bambu-lab-official-products.md))| loja US SPECS |
| Filament diameter | 1,75 mm ([source](../22-fontes/bambu-lab-official-products.md))| loja US |
| Optional modules | 10W/40W laser + cutting (Laser Full Combo) ([source](../22-fontes/bambu-lab-official-products.md))| loja US |

## Tecnologia

- Processo: FFF dual-nozzle multi-material; módulos laser/corte opcionais (classe ferramenta — segurança dedicada)
- Closed-loop servo extruder (claim loja)

## Manuais

- Wiki / support Bambu Lab (mapear por sintoma)
- Página de produto da loja US (evidência primária desta revisão)
- Service manual público completo: não publicado pelo fabricante nesta revisão (lacuna consciente)

## Hardware

- Dual nozzle; BirdsEye camera (Laser edition)
- Variantes: H2D; H2D AMS Combo; H2D Laser Full Combo
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

Multi-material dual-nozzle. Lista Ideal/Not Recommended detalhada: consultar TDS download da loja — não inventada aqui além dos claims de temperatura/câmara.

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

| Tema | Evidência |
|---|---|
| Laser upgrade kit timeline | FAQ loja (kit esperado; verificar data atual) |
| AMS >2 unidades | adapter 4-in-1 PTFE (nota loja) |

Laser/cutting: riscos de classe ferramenta (olho/fumaça/incêndio) — seguir manuais do módulo; não cobertos em profundidade nesta página FFF.

## Fontes

- Loja US: https://us.store.bambulab.com/products/h2d
- [source.bambu-lab-official-products](../22-fontes/bambu-lab-official-products.md)

## Lacunas

- Firmware version pinada
- Service manual completo
- Datasheet TDS completo quando Cloudflare/JS impedir extração tabular
- Troubleshooting-mapped
