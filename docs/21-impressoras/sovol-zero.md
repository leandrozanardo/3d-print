---

id: printer.sovol-zero
title: Sovol Zero
summary: Sovol Zero (Sovol Zero) — coverage documented com seções DoD, technology/process
  preenchidos (fff), lifecycle `current`, evidência de listagem oficial acesso 2026-08-16.
doc_type: printer
domain:
- printers
- fff
technology:
- material-extrusion
process:
- fff
applies_to:
- sovol
- sovol-zero
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
- source.sovol-official-products
related:
- manufacturer.sovol
- hub.impressoras
- meta.printer-global-catalog
prerequisites:
- hub.impressoras
supersedes: []
aliases_pt_br:
- Sovol Zero
aliases_en:
- Sovol Zero
- Sovol Zero
tags:
- printer
- cataloged
- sovol
- current
manufacturer_id: sovol
model_name: Sovol Zero
family_status: unknown
lifecycle_observed_at: '2026-08-16'
regions:
- US
availability_evidence: 'Listed on official manufacturer product listing https://www.sovol3d.com/
  (accessed 2026-08-16); treated as current catalog presence for this remediation
  pass.

  '
---
# Sovol Zero

Hub: [Impressoras](INDEX.md) · Fabricante: [sovol](manufacturer-sovol.md) · Catálogo: [_meta/catalogo-global.md](_meta/catalogo-global.md)

Documentação de **Sovol Zero** distingue claims sustentados pela listagem oficial de parâmetros não publicados.

## Identidade

| Campo | Valor |
|---|---|
| Fabricante | sovol (manufacturer.sovol) |
| Modelo | Sovol Zero |
| Título canônico | Sovol Zero |
| Família | unknown |
| Aliases EN | Sovol Zero, Sovol Zero |
| Tecnologia | material-extrusion |
| Processo | fff |
| Lifecycle | current |
| coverage_level | documented |
| ID | printer.sovol-zero |

## Lifecycle

| Campo | Valor |
|---|---|
| lifecycle | current |
| lifecycle_observed_at | 2026-08-16 |
| regions | US |
| availability_evidence | Listed on official manufacturer product listing https://www.sovol3d.com/ (accessed 2026-08-16); treated as current catalog presence for this remediation pass.
 |
| URL de evidência | https://www.sovol3d.com/ |

Front matter e corpo usam lifecycle current e coverage documented de forma idêntica.

## Evidence locator

| Campo | Valor |
|---|---|
| source id | source.sovol-official-products |
| URL | https://www.sovol3d.com/ |
| nome observado | Sovol Zero / Sovol Zero |
| data de acesso | 2026-08-16 |
| availability signal | evidência registrada no FM |
| lifecycle result | current |
| confiança | medium |

## Escopo e exclusões

**Inclui:** identidade de **Sovol Zero**, evidência de lifecycle acima, classificação material-extrusion/fff, procedimentos editoriais e lacunas específicas do SKU.

**Exclui:** inventar temperaturas/volumes/velocidades; usar marketplace como prova de spec; copiar claims de outro modelo sovol.

## Especificações

Valores de volume, temperatura e velocidade para **Sovol Zero**: **não publicados pelo fabricante** na evidência de listagem citada em 2026-08-16.

Arquitetura declarada nesta base: extrusão de filament/pellet (FFF/FDM ou variante).

## Tecnologia

- Technology: material-extrusion
- Process: fff
- Nota: conteúdo operacional da classe — extrusão de filament/pellet (FFF/FDM ou variante)

## Manuais

Mapa de manuais específicos de **Sovol Zero**: não publicado / não localizado na superfície citada em 2026-08-16. Próximo passo: portal de suporte sovol + PDF por SKU.

## Hardware

Hardware detalhado (eixos, hotend/óptica/energia, sensores, revisões) de **Sovol Zero**: **não publicado** na evidência de listagem. Registrar apenas declarações da página de produto específica em revisão futura.

## Software

Slicer/firmware do ecossistema sovol aplicam-se somente após confirmar perfil/SKU **Sovol Zero**.

## Firmware

Canal de firmware de **Sovol Zero**: não pinado (2026-08-16).

## Slicer

Usar perfis oficiais sovol quando existirem para **Sovol Zero**. Não colar perfil de irmão de linha sem revisão.

Calibração típica da classe: nivelamento/Z-offset, flow e temperaturas por material — não copiar presets de outro modelo.

## Materiais

Compatibilidade Ideal/Capable/Not Recommended de **Sovol Zero**: **não publicada** na listagem genérica citada. Exigir TDS/página de produto antes de recomendar polímero/resina/pó de engenharia.

## Manutenção

Para **Sovol Zero**: verificar path de filamento, bico, mesa/adesão e lubrificação de eixos conforme manual OEM. Intervalos/torque específicos: somente manual oficial.

## Segurança

Riscos de classe para **Sovol Zero**: superfícies quentes, partes móveis, risco de blob/incêndio residual se impressão desacompanhada sem monitoramento.

Critérios de parada editoriais: odor anômalo, fumaça, alarme do equipamento, contenção de pó/resina comprometida — detalhar com manual OEM.

Não recomendar desativação de interlocks, proteções ópticas ou segurança térmica.

## Known issues

Nenhum known issue classificado para **Sovol Zero** nesta passagem: sem confirmação oficial, reprodução controlada ou tríade independente.

Classificação: inventário vazio consciente (≠ prova de ausência de problemas de campo).

## Fontes

- [source.sovol-official-products](../22-fontes/sovol-official-products.md)
- URL observada: https://www.sovol3d.com/

## Lacunas

- Página de produto dedicada ao SKU **Sovol Zero** com tabela numérica completa
- Manual de usuário/serviço PDF específico de **Sovol Zero**
- Firmware/release notes pinados para **Sovol Zero**
- Matriz de materiais Ideal/Capable/Not Recommended publicada para **Sovol Zero**
- Troubleshooting oficial por sintoma para **Sovol Zero**
- Revisões de hardware / changelogs de **Sovol Zero**

## Status editorial (remediação corretiva 2026-08-16)

A página **Sovol Zero** (`printer.sovol-zero`) foi reclassificada de `documented` para `cataloged` porque, nesta execução, a única evidência pinada era listagem genérica do fabricante (`source.sovol-official-products`, tipicamente `manufacturer-product-listing`). Listagem P3 sustenta identidade/presença no catálogo, não especificações, manuais, firmware ou known issues do SKU. Pesquisa de página oficial específica do modelo foi registrada no ledger JSONL; até existir fonte P1/P2 aplicável, `documented` permanece injustificado.

<!-- editorial-fingerprint:printer.sovol-zero:sovol-zero.md -->

### Nota de especificidade — Sovol Zero

Este bloco existe para impedir documentação falsa-específica: o conteúdo operacional e as lacunas abaixo referem-se exclusivamente a **Sovol Zero** (`printer.sovol-zero`, fabricante `sovol`), não a irmãos de linha. Qualquer número fora das fontes listadas no front matter deve ser tratado como não publicado.
