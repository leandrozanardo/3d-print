---
id: hazard.resin-ppe-disposal
title: Resina — PPE e descarte
summary: 'Resina não curada é perigo cutâneo/ocular e gera resíduos líquidos regulados:
  use luvas compatíveis (tipicamente nitrílica), óculos, roupa de cobertura e ventilação;
  leia o SDS de cada SKU. Descarte: cure resíduos quando o fluxo permitir, armazene
  solventes saturados como residual químico — nunca ralo/lixo comum sem regra local.
  NIOSH e EPA embasam cautela ocupacional/ambiental; esta página não substitui legislação
  municipal nem autoriza uso food/medical.'
doc_type: guide
domain:
- safety
- environment
- resin
technology:
- vat-photopolymerization
process:
- sla
- dlp
- msla
applies_to:
- vat-photopolymerization
- resin-handling
not_for:
- fff-only-users-skipping-read-if-no-resin
- drain-disposal-advice
- diy-biocompatibility
knowledge_status: draft
evidence_status: strong
safety_level: critical
confidence: high
last_reviewed: '2026-08-15'
review_cycle: 6-months
sources:
- source.niosh-am-entry
- source.epa-3d-printing-research
related:
- post.resin-wash-cure
- hazard.voc-ufp-ventilation
- hazard.food-medical-claims
- tech.sla-dlp-msla
- material.resin-families
- defect.resin.index
prerequisites: []
supersedes: []
aliases_pt_br:
- EPI resina 3D
- descarte de resina
- luvas nitrílica resina
aliases_en:
- resin PPE
- resin disposal
- photopolymer waste
tags:
- safety
- resin
- ppe
- disposal
---
# Resina — PPE e descarte

Hub pai: [Segurança e meio ambiente](INDEX.md)

## Regra de ouro

Sem SDS lido + PPE + plano de descarte = **não imprima resina**.

## Fontes de autoridade (higiene / ambiente)

| Fonte | URL | Uso |
|---|---|---|
| [NIOSH Additive Manufacturing](../22-fontes/niosh-additive-manufacturing.md) | https://www.cdc.gov/niosh/manufacturing/additive/index.html | Controles ocupacionais |
| [EPA 3D Printing Research](../22-fontes/epa-3d-printing-research.md) | https://www.epa.gov/chemical-research/3d-printing-research-epa | Contexto de emissões/química |

Complementar sempre com SDS do produto e regras locais de residual.

## PPE mínimo típico (confirmar no SDS)

| Item | Função |
|---|---|
| Luvas nitrílicas (espessura adequada; trocar se impregnadas) | Barreira cutânea |
| Óculos de proteção fechados | Respingo |
| Avental / manga longa | Roupa de rua |
| Ventilação / exaustão | Vapores e aerossóis — ver também [VOC/UFP](voc-ufp-e-ventilacao.md) |
| Respirador | **Só** se SDS/avaliação exigir e com filtro correto |

Latex fino e “luva de cozinha” improvisada **não** são default.

## Práticas de bancada

1. Área dedicada, sem comida/bebida  
2. Papel absorvente; kit de derrame  
3. Tampas fechadas; não deixar tanque aberto ocioso  
4. Remover luvas sem contaminação cruzada; lavar pele se contato (SDS)  
5. Contato ocular: lavagem conforme SDS + atendimento  

## Descarte — princípios

| Resíduo | Direção |
|---|---|
| Resina líquida / panos embebidos | Residual perigoso / coleta adequada — **não** lixo doméstico indiferente |
| IPA saturado | Inflamável residual; armazenar rotulado; coleta |
| Efluente water-washable | Ainda químico — **não** “desce no ralo e pronto” |
| Peças/suportes curados | Verificar regra local; preferível curar antes de descartar sólidos quando o fluxo permitir |
| FEP/film contaminado | Tratar como residual contaminado |

**Nunca:** despejar no esgoto, solo, ou queimar a céu aberto.

## O que esta página proíbe afirmar

- “Depois de curar pode usar na boca/comida” → [claims](claims-food-contact-e-medico.md)  
- “Resina dental do Mercado Livre = clínico”  
- “Luva qualquer serve”  

## Ligação operacional

- Processo: [SLA/DLP/MSLA](../02-tecnologias/vat-photopolymerization/sla-dlp-msla.md)  
- Pós: [lavagem e pós-cura](../14-pos-processamento/lavagem-e-pos-cura-resina.md)  
- Falhas: [índice](../12-problemas-e-diagnostico/resina/indice-falhas-resina.md)  

## Lacunas

- Contatos de coleta de residual por município BR: não listados (variam)
- Seleção de respirador por marca: exige avaliação — não receitar modelo aqui
