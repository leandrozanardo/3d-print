---
id: material.resin-standard-vs-tough
title: Resina standard vs tough (fotopolímeros)
summary: 'Em vat photopolymerization, ‘standard/cosmo’ e ‘tough/ABS-like’ são rótulos
  de marketing para famílias com trade-offs: detalhe e facilidade vs tenacidade/impacto
  relativos. Propriedades reais vêm do TDS/SDS do SKU e da pós-cura — não do nome.
  Nenhum rótulo autoriza uso clínico, dental DIY ou food-contact. Segurança e PPE
  precedem escolha cosmética.'
doc_type: material
domain:
- materials
- resin
technology:
- vat-photopolymerization
process:
- sla
- dlp
- msla
applies_to:
- vat-photopolymerization
- material.resin-families
not_for:
- diy-clinical-dental
- food-contact
- fff-filament-comparison-as-equal
materials:
- material.resin-standard-vs-tough
knowledge_status: draft
evidence_status: mixed
safety_level: high
confidence: medium
last_reviewed: '2026-08-15'
review_cycle: 6-months
sources: []
related:
- material.resin-families
- hazard.resin-ppe-disposal
- tech.sla-dlp-msla
- hub.materiais.resina
prerequisites:
- hazard.resin-ppe-disposal
supersedes: []
aliases_pt_br:
- resina standard vs tough
- resina abs-like
- resina cosmético vs impacto
aliases_en:
- standard vs tough resin
- ABS-like resin
- rigid vs tough photopolymer
tags:
- material
- resin
- tough
- standard
---
# Resina standard vs tough (fotopolímeros)

Hub pai: [Materiais — resina](INDEX.md)

## Antes de qualquer escolha

PPE, ventilação, lavagem e descarte: [PPE e descarte](../../15-seguranca-e-meio-ambiente/resina-ppe-e-descarte.md).

Famílias amplas: [famílias de resina](familias-de-resina.md).

## O que os rótulos costumam significar (heurística)

| Rótulo comum | Ênfase típica de marketing | Trade-off frequente |
|---|---|---|
| Standard / Cosmético / Detail | Detalhe fino, superfície, preço | Mais frágil ao impacto / peças finas quebram |
| Tough / Durable / ABS-like | Maior tenacidade/impacto *relativo* | Pode perder detalhe, mudar retração/cura, cheiro/viscosidade diferentes |
| High elongation / Flexible | Elasticidade | Não é “borracha certificada”; creep e química variam |

Estes termos **não são normas**. Dois produtos “tough” de marcas distintas podem divergir fortemente.

## Como escolher (sem números inventados)

1. Função: cosmético de mesa vs clipe vs gabarito leve
2. Espessura mínima real da peça
3. Capacidade de pós-cura correta (subcura → frágil/pegajoso; sobrecura → pode embrittle)
4. Compatibilidade com impressora (LCD/MSLA vs laser) e settings do fabricante
5. SDS: sensibilizantes, VOC, descarte

## O que não inferir

- “ABS-like” ≠ propriedades de ABS injetado
- Tough ≠ seguro para carga humana / outdoor UV sem ensaio
- Standard “atóxico” no marketing ≠ food/medical — [claims](../../15-seguranca-e-meio-ambiente/claims-food-contact-e-medico.md)
- Misturar marcas na mesma cuba “para equilibrar” sem protocolo

## Relação com FFF

Não traduza settings de PLA/PETG para resina. Anisotropia e falha são outros mecanismos — ver vat em [SLA/DLP/MSLA](../../02-tecnologias/vat-photopolymerization/sla-dlp-msla.md).

## Validação

- Cupom de impacto/flexão da **mesma** resina + mesma lavagem/cura
- Registrar lote, tempo de exposição e pós-cura

## Lacunas

- Matriz de produtos comerciais: intencionalmente omitida (evita endosso)
- Dados mecânicos medidos no projeto: abertos
