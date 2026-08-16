---
id: app.food-contact-limits
title: Contato alimentar — limites (sem certificação)
summary: 'Contato alimentar (food-contact) em peças AM desktop exige avaliação de
  material, processo, migração, limpeza e regulação da jurisdição — não o nome do
  polímero no spool. Esta página delimita riscos (porosidade, biofilm, aditivos, nozzle)
  e aponta a política da base: sem certificação DIY. Link obrigatório à página de
  claims food/médico. Não é guia para ‘tornar seguro’.'
doc_type: guide
domain:
- applications
- regulation
- safety
technology:
- material-extrusion
- vat-photopolymerization
process: []
applies_to:
- food-contact-questions
- desktop-am
not_for:
- diy-food-certification
- nsf-anvisa-self-issue
- medical-device-advice
knowledge_status: draft
evidence_status: mixed
safety_level: critical
confidence: high
last_reviewed: '2026-08-15'
review_cycle: 6-months
sources:
- source.fda-am-medical-devices-entry
related:
- hazard.food-medical-claims
- myth.pla-food-safe
- app.qualification-limits
- econ.when-not-to-print
- hub.aplicacoes
prerequisites: []
supersedes: []
aliases_pt_br:
- contato alimentar impressão 3D
- food-contact limites
- utensílio FFF
aliases_en:
- food contact AM limits
- food-safe 3D print boundaries
tags:
- regulation
- food-contact
- claims
- safety
---
# Contato alimentar — limites (sem certificação)

Hub pai: [Aplicações e regulação](./INDEX.md)

## Hard rule desta base

Esta página **não certifica** utensílios, embalagens nem superfícies food-contact feitas em impressão 3D desktop.

Leia primeiro a política operacional:

→ [Claims de food-contact e uso médico](../15-seguranca-e-meio-ambiente/claims-food-contact-e-medico.md)

Se a pergunta for “como deixar food-safe em casa”: explique limites e **pare** — não entregue receita de certificação.

## O que “contato alimentar” exige (visão de sistema)

Regulação tipicamente olha para **sistema**, não para buzzword no filamento:

1. Formulação do material e aditivos (incluindo corantes)
2. Processo de fabricação e contaminação (nozzle, mesa, ambiente)
3. Geometria e rugosidade (retenção de biofilm)
4. Condições de uso (quente/frio, gordura, ácido, reuso, abrasão)
5. Ensaios de migração / conformidade aplicáveis à jurisdição
6. Rotulagem, rastreabilidade e controle de mudanças quando comercial

Nada disso é substituído por “é PLA” ou “lavei com álcool”.

## Por que FFF desktop falha no atalho

| Fator | Risco |
|---|---|
| Camadas e poros | Retêm umidade e microrganismos |
| Remoção incompleta de suporte/cola | Contaminantes |
| Nozzle de latão / ligas | Contaminação metálica potencial |
| Pigmentos não caracterizados | Migração desconhecida |
| Reaquecimento / desgaste | Mudança de superfície ao longo do uso |

Detalhe do mito popular: [PLA food-safe](../20-pesquisa-e-mitos/mito-pla-food-safe.md).

## Resina e “dental/medical” no rótulo

Rótulos de marketing **não** autorizam utensílio de cozinha nem dispositivo clínico DIY. SDS/TDS e cadeia regulatória importam; ver [famílias de resina](../05-materiais/resina/familias-de-resina.md) e [PPE](../15-seguranca-e-meio-ambiente/resina-ppe-e-descarte.md).

## O que esta wiki pode fazer

- Explicar por que o claim absoluto é inválido
- Apontar [limites de qualificação](limites-de-qualificacao.md)
- Sugerir **não imprimir** quando o único objetivo é food-contact — [quando não imprimir](../19-economia-e-sustentabilidade/quando-nao-imprimir-3d.md)
- Indicar que usos decorativos / barreira física sem contato alimentar estão fora deste problema

## O que esta wiki não faz

- Emitir parecer ANVISA/FDA/NSF
- Indicar filamento “aprovado” sem documentação de processo
- Validar revestimentos (“só pintar/epóxi”) como food-safe

## Fontes

- Política interna: [hazard.food-medical-claims](../15-seguranca-e-meio-ambiente/claims-food-contact-e-medico.md)
- [source.fda-am-medical-devices-entry](../22-fontes/fda-am-medical-devices-guidance-entry.md) — rigor regulatório em AM (contexto medical devices; **não** autoriza utensílios FFF)

## Lacunas

- Mapeamento normativo BR (ANVISA) detalhado: não publicado
- Ensaios de migração locais: inexistentes nesta base
