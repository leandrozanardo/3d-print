---
id: post.vapor-smoothing
title: Vapor smoothing (acabamento por vapor de solvente)
summary: 'Vapor smoothing usa vapor de solvente (classicamente acetona em ABS) para
  fundir microtextura de camada e brilhar a superfície. É processo safety-critical:
  inflamável, exposição a vapores, risco de derreter a peça e alterar dimensões. NÃO
  é fluxo primário para PLA. Não faça banho improvisado em quarto fechado. Priorize
  ventilação, SDS, recipiente adequado e peça de teste. Esta base não fornece câmara
  DIY passo a passo nem garante acabamento ‘profissional’.'
doc_type: guide
domain:
- postprocessing
- fff
- safety
technology:
- material-extrusion
process:
- fff
applies_to:
- fff
- material.abs-asa
not_for:
- pla-primary-acetone-vapor
- food-contact-after-smoothing
- unventilated-solvent-chamber
- a1-mini-abs-as-default-print
knowledge_status: draft
evidence_status: mixed
safety_level: critical
confidence: high
last_reviewed: '2026-08-15'
review_cycle: 6-months
sources:
- source.niosh-am-entry
- source.epa-3d-printing-research
related:
- hazard.solvents-ipa-vapors
- hazard.voc-ufp-ventilation
- material.abs-asa
- post.sanding-finishing
- hub.pos
prerequisites:
- hazard.solvents-ipa-vapors
supersedes: []
aliases_pt_br:
- alisamento a vapor
- acetona ABS
- vapor smooth
aliases_en:
- vapor smoothing
- acetone vapor ABS
- solvent smoothing
tags:
- vapor-smoothing
- acetone
- abs
- safety-critical
---
# Vapor smoothing

Hub pai: [Pós-processamento](INDEX.md)

## Aviso crítico

Este processo envolve **solventes inflamáveis** e **vapores nocivos**.
Se não puder garantir ventilação, controle de ignição, SDS e descarte: **não faça**.
Prefira [lixamento](lixamento-e-acabamento.md) / primer.

## O que é

**Vapor smoothing**: expor a peça ao **vapor** de um solvente que solubiliza a superfície do polímero, reduzindo linhas de camada e aumentando brilho — ao custo de arredondar detalhes e mudar cotas.

Classicamente associado a **ABS + acetona**. Outros pares polímero/solvente existem em produtos comerciais; **não** generalize acetona para tudo.

## PLA — não é fluxo primário

| Afirmação de fórum | Postura desta base |
|---|---|
| “Acetona alisa PLA” | **Rejeitar** como método primário — PLA não se comporta como ABS com acetona |
| “É só deixar no pote” | Risco sem benefício típico |
| Alternativas cosméticas | Lixa, primer, pintura; ou aceitar linha de camada |

Se um produto comercial reivindica smooth de PLA: siga **SDS + instruções do fabricante daquele produto**, não mito de acetona.

## ABS / ASA — contexto

- Acabamento químico é motivo histórico de uso de ABS
- Impressão ABS/ASA na **A1 Mini** é **Not Recommended** pelo fabricante — [ABS/ASA](../05-materiais/fff/abs-asa.md) · [tech specs](../22-fontes/bambu-a1-mini-tech-specs.md)
- Mesmo com peça ABS impressa em máquina adequada: smoothing continua crítico em segurança

## Riscos (safety-critical)

| Risco | Por quê |
|---|---|
| Incêndio / explosão de vapor | Acetona inflamável; ar + ignição |
| Exposição respiratória/dérmica | Vapor concentrado em câmara |
| Colapso dimensional | Peça amolece; furos fecham; texto some |
| Contaminação | Resíduo de solvente; **não** food-contact |
| Desacompanhado | Incidente sem resposta — [fogo](../15-seguranca-e-meio-ambiente/eletrico-fogo-e-impressao-desacompanhada.md) |

Controles gerais de solvente: [IPA e vapores](../15-seguranca-e-meio-ambiente/solventes-ipa-e-vapores.md).

## Controles mínimos (conceitos — não é DIY tutorial)

1. Ler **SDS** do solvente e do filamento
2. Ventilação/exaustão reais; longe de dormitório e de chamas/hotend
3. Quantidade mínima de solvente; recipiente compatível; tampa consciente do risco de pressão/vapor
4. Peça **cupom** primeiro; tempo curto; inspecionar; iterar
5. PPE conforme SDS
6. Sem operação unattended
7. Descarte de residual conforme regra local

**Esta página deliberadamente não descreve montagem de câmara caseira passo a passo** (reduz incentivo a improvisos perigosos). Equipamentos comerciais existem com instruções próprias.

## O que esperar na peça

- Menos textura de camada; cantos vivos arredondados
- Possível perda de encaixes apertados
- Superfície mais brilhante ≠ mais forte
- Anisotropia de camada **não** desaparece magicamente no núcleo

## Food / medical

**Proibido** afirmar food-safe após smoothing. Ver [claims](../15-seguranca-e-meio-ambiente/claims-food-contact-e-medico.md).

## Fontes de higiene / ambiente

- [NIOSH AM](../22-fontes/niosh-additive-manufacturing.md)
  https://www.cdc.gov/niosh/manufacturing/additive/index.html
- [EPA 3D Printing Research](../22-fontes/epa-3d-printing-research.md)
  https://www.epa.gov/chemical-research/3d-printing-research-epa

## Aplicabilidade e exclusão

**Aplica-se a:** decisão de risco e escopo de vapor smoothing.
**Não se aplica a:** receita de tempo/°C; “smooth” mecânico (lixa); epoxy coating (outra química).

## Relações

- alternative → [lixamento](lixamento-e-acabamento.md), [pintura](pintura-e-primer.md)
- requires → [solventes](../15-seguranca-e-meio-ambiente/solventes-ipa-e-vapores.md)
- legado → nota em [pos-processamento.md](../projeto/qualidade-e-acabamento/pos-processamento.md) (“no acetone vapor on PLA”)

## Lacunas

- Avaliação de estações comerciais específicas: futura, com SDS
- Pares polímero/solvente além de ABS/acetona: só com fonte de produto
