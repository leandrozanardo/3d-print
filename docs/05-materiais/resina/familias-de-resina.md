---
id: material.resin-families
title: Famílias de resina (fotopolímeros)
summary: '‘Resina’ em vat photopolymerization é família ampla: standard/cosmo, tough/abs-like,
  flexible, castable, water-washable, high-temp, filled, e rótulos ‘dental/medical’
  que NÃO autorizam uso clínico DIY. Propriedades e toxicologia vêm do SDS/TDS do
  SKU, não do marketing. Escolha pela função + capacidade de PPE/lavagem/cura; nunca
  por claim food-safe improvisado. Compatível conceitualmente com SLA/DLP/MSLA.'
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
not_for:
- fff-filament
- diy-clinical-dental
- food-contact
materials:
- material.resin-families
knowledge_status: draft
evidence_status: mixed
safety_level: high
confidence: medium
last_reviewed: '2026-08-15'
review_cycle: 6-months
sources:
- source.niosh-am-entry
- source.epa-3d-printing-research
related:
- tech.sla-dlp-msla
- setting.resin-exposure-supports
- post.resin-wash-cure
- hazard.resin-ppe-disposal
- hazard.food-medical-claims
- defect.resin.index
prerequisites:
- tech.sla-dlp-msla
supersedes: []
aliases_pt_br:
- tipos de resina 3D
- fotopolímero
- resina standard tough
aliases_en:
- resin families
- photopolymer resin types
tags:
- resin
- materials
- photopolymer
---
# Famílias de resina

Hub pai: [Materiais — resina](INDEX.md)

## O que é

Fotopolímeros líquidos (acrilatos/metacrilatos e sistemas proprietários) curados por UV/visível em [SLA/DLP/MSLA](../../02-tecnologias/vat-photopolymerization/sla-dlp-msla.md). “Standard grey” de uma marca **≠** outra marca.

## Famílias (mapa conceitual)

| Família (rótulo comum) | Uso típico | Ressalvas |
|---|---|---|
| Standard / craft | Modelos, miniaturas | Frágil relativo; irritante |
| Tough / ABS-like | Protótipos mecânicos leves | Ainda anisotrópico; validar |
| Flexible / elastic | Gaxetas de protótipo | Adesão/cura sensíveis; não vedação certificada |
| High-temp | Peças que veem calor moderado | Verificar HDT no TDS — não inferir |
| Castable | Fundição de investimento | Cinzas/resíduo: seguir fabricante |
| Water-washable | Lavagem com água (ainda química) | Efluente **não** vai no ralo livremente — ver descarte |
| Filled / ceramic-like | Estética/rigidez | Abrasivo; desgaste de filme |
| “Dental / medical / biocompatible” (rótulo) | **Só** com processo e indicação regulados | [Claims](../../15-seguranca-e-meio-ambiente/claims-food-contact-e-medico.md) — sem DIY clínico |

## Quando importa

- Trocar de cosmético para mecânico
- Escolher solvente de lavagem (IPA vs water-washable)
- Avaliar se o laboratório caseiro aguenta o SDS

## Propriedades — como ler

Exija no TDS/SDS: viscosidade, espectro de cura, tempos sugeridos **por máquina**, resistência (com cura declarada), perigos (H-statements), descarte. Sem isso = **não calibre de fórum**.

## Comparação com FFF

Para brackets estruturais leves, muitas vezes [PETG FFF](../fff/petg.md) é mais simples em PPE do que resina tough — trade-off detalhe vs química.

## Segurança

- Tratar toda resina não curada como perigo cutâneo/ocular
- VOC e aerossóis: [NIOSH](../../22-fontes/niosh-additive-manufacturing.md), [EPA](../../22-fontes/epa-3d-printing-research.md)
- Página: [PPE e descarte](../../15-seguranca-e-meio-ambiente/resina-ppe-e-descarte.md)
- Pós-cura incompleta ≠ “já é plástico inerte”

## Processo associado

- Exposição/suportes: [settings](../../08-slicers-e-configuracoes/resina-exposicao-e-suportes.md)
- Lavagem/cura: [pós](../../14-pos-processamento/lavagem-e-pos-cura-resina.md)
- Falhas: [índice](../../12-problemas-e-diagnostico/resina/indice-falhas-resina.md)

## Lacunas

- Tabela SKU-a-SKU: propositalmente ausente (evita números inventados)
- Compatibilidade tanque/FEP por marca: open
