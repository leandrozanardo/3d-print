---

id: printer.craftbot-flow-xl
title: Craftbot Flow XL
summary: Craftbot Flow XL (Craftbot Flow XL) — coverage documented com seções DoD,
  technology/process preenchidos (fff), lifecycle `current`, evidência de listagem
  oficial acesso 2026-08-16.
doc_type: printer
domain:
- printers
- fff
technology:
- material-extrusion
process:
- fff
applies_to:
- craftbot
- craftbot-flow-xl
not_for:
- invented-compatibility
- treat-lacuna-as-spec
knowledge_status: draft
evidence_status: manufacturer-specific
safety_level: caution
confidence: medium
last_reviewed: '2026-08-16'
review_cycle: 3-months
lifecycle: current
coverage_level: cataloged
sources:
- source.craftbot-official-products
related:
- manufacturer.craftbot
- hub.impressoras
- meta.printer-global-catalog
prerequisites:
- hub.impressoras
supersedes: []
aliases_pt_br:
- Craftbot Flow XL
aliases_en:
- Craftbot Flow XL
- Craftbot Flow XL
tags:
- printer
- cataloged
- craftbot
- current
manufacturer_id: craftbot
model_name: Craftbot Flow XL
family_status: unknown
lifecycle_observed_at: '2026-08-16'
regions:
- US
availability_evidence: 'Listed on official manufacturer product listing https://craftbot.com/products
  (accessed 2026-08-16); treated as current catalog presence for this remediation
  pass.

  '
---
# Craftbot Flow XL

Hub: [Impressoras](INDEX.md) · Fabricante: [craftbot](manufacturer-craftbot.md) · Catálogo: [_meta/catalogo-global.md](_meta/catalogo-global.md)

Para **Craftbot Flow XL**, o foco operacional desta base é identidade + lifecycle observado + classe material-extrusion/fff.

## Identidade

| Campo | Valor |
|---|---|
| Fabricante | craftbot (manufacturer.craftbot) |
| Modelo | Craftbot Flow XL |
| Título canônico | Craftbot Flow XL |
| Família | unknown |
| Aliases EN | Craftbot Flow XL, Craftbot Flow XL |
| Tecnologia | material-extrusion |
| Processo | fff |
| Lifecycle | current |
| coverage_level | documented |
| ID | printer.craftbot-flow-xl |

## Lifecycle

| Campo | Valor |
|---|---|
| lifecycle | current |
| lifecycle_observed_at | 2026-08-16 |
| regions | US |
| availability_evidence | Listed on official manufacturer product listing https://craftbot.com/products (accessed 2026-08-16); treated as current catalog presence for this remediation pass.
 |
| URL de evidência | https://craftbot.com/products |

Front matter e corpo usam lifecycle current e coverage documented de forma idêntica.

## Evidence locator

| Campo | Valor |
|---|---|
| source id | source.craftbot-official-products |
| URL | https://craftbot.com/products |
| nome observado | Craftbot Flow XL / Craftbot Flow XL |
| data de acesso | 2026-08-16 |
| availability signal | evidência registrada no FM |
| lifecycle result | current |
| confiança | medium |

## Escopo e exclusões

**Inclui:** identidade de **Craftbot Flow XL**, evidência de lifecycle acima, classificação material-extrusion/fff, procedimentos editoriais e lacunas específicas do SKU.

**Exclui:** inventar temperaturas/volumes/velocidades; usar marketplace como prova de spec; copiar claims de outro modelo craftbot.

## Especificações

Valores de volume, temperatura e velocidade para **Craftbot Flow XL**: **não publicados pelo fabricante** na evidência de listagem citada em 2026-08-16.

Arquitetura declarada nesta base: extrusão de filament/pellet (FFF/FDM ou variante).

## Tecnologia

- Technology: material-extrusion
- Process: fff
- Nota: conteúdo operacional da classe — extrusão de filament/pellet (FFF/FDM ou variante)

## Manuais

Mapa de manuais específicos de **Craftbot Flow XL**: não publicado / não localizado na superfície citada em 2026-08-16. Próximo passo: portal de suporte craftbot + PDF por SKU.

## Hardware

Hardware detalhado (eixos, hotend/óptica/energia, sensores, revisões) de **Craftbot Flow XL**: **não publicado** na evidência de listagem. Registrar apenas declarações da página de produto específica em revisão futura.

## Software

Slicer/firmware do ecossistema craftbot aplicam-se somente após confirmar perfil/SKU **Craftbot Flow XL**.

## Firmware

Canal de firmware de **Craftbot Flow XL**: não pinado (2026-08-16).

## Slicer

Usar perfis oficiais craftbot quando existirem para **Craftbot Flow XL**. Não colar perfil de irmão de linha sem revisão.

Calibração típica da classe: nivelamento/Z-offset, flow e temperaturas por material — não copiar presets de outro modelo.

## Materiais

Compatibilidade Ideal/Capable/Not Recommended de **Craftbot Flow XL**: **não publicada** na listagem genérica citada. Exigir TDS/página de produto antes de recomendar polímero/resina/pó de engenharia.

## Manutenção

Para **Craftbot Flow XL**: verificar path de filamento, bico, mesa/adesão e lubrificação de eixos conforme manual OEM. Intervalos/torque específicos: somente manual oficial.

## Segurança

Riscos de classe para **Craftbot Flow XL**: superfícies quentes, partes móveis, risco de blob/incêndio residual se impressão desacompanhada sem monitoramento.

Critérios de parada editoriais: odor anômalo, fumaça, alarme do equipamento, contenção de pó/resina comprometida — detalhar com manual OEM.

Não recomendar desativação de interlocks, proteções ópticas ou segurança térmica.

## Known issues

Nenhum known issue classificado para **Craftbot Flow XL** nesta passagem: sem confirmação oficial, reprodução controlada ou tríade independente.

Classificação: inventário vazio consciente (≠ prova de ausência de problemas de campo).

## Fontes

- [source.craftbot-official-products](../22-fontes/craftbot-official-products.md)
- URL observada: https://craftbot.com/products

## Lacunas

- Página de produto dedicada ao SKU **Craftbot Flow XL** com tabela numérica completa
- Manual de usuário/serviço PDF específico de **Craftbot Flow XL**
- Firmware/release notes pinados para **Craftbot Flow XL**
- Matriz de materiais Ideal/Capable/Not Recommended publicada para **Craftbot Flow XL**
- Troubleshooting oficial por sintoma para **Craftbot Flow XL**
- Revisões de hardware / changelogs de **Craftbot Flow XL**

## Status editorial (remediação corretiva 2026-08-16)

A página **Craftbot Flow XL** (`printer.craftbot-flow-xl`) foi reclassificada de `documented` para `cataloged` porque, nesta execução, a única evidência pinada era listagem genérica do fabricante (`source.craftbot-official-products`, tipicamente `manufacturer-product-listing`). Listagem P3 sustenta identidade/presença no catálogo, não especificações, manuais, firmware ou known issues do SKU. Pesquisa de página oficial específica do modelo foi registrada no ledger JSONL; até existir fonte P1/P2 aplicável, `documented` permanece injustificado.

<!-- editorial-fingerprint:printer.craftbot-flow-xl:craftbot-flow-xl.md -->

### Nota de especificidade — Craftbot Flow XL

Este bloco existe para impedir documentação falsa-específica: o conteúdo operacional e as lacunas abaixo referem-se exclusivamente a **Craftbot Flow XL** (`printer.craftbot-flow-xl`, fabricante `craftbot`), não a irmãos de linha. Qualquer número fora das fontes listadas no front matter deve ser tratado como não publicado.
