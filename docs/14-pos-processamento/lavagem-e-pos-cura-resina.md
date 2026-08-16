---
id: post.resin-wash-cure
title: Lavagem e pós-cura de resina
summary: 'Peças vat saem ‘green’: devem ser lavadas para remover resina não curada
  e pós-curadas com UV na dose adequada ao TDS. IPA ou fluxos water-washable têm riscos
  distintos (inflamável vs efluente). Cura incompleta deixa superfície irritante;
  cura excessiva pode fragilizar. Nunca pular PPE; nunca descarte no ralo; nunca claim
  food/medical. Referências NIOSH/EPA para higiene e química.'
doc_type: guide
domain:
- post-processing
- resin
- safety
technology:
- vat-photopolymerization
process:
- sla
- dlp
- msla
applies_to:
- vat-photopolymerization
not_for:
- fff-support-removal-as-wash
- drain-disposal
- food-safe-after-cure-claim
knowledge_status: draft
evidence_status: mixed
safety_level: critical
confidence: medium
last_reviewed: '2026-08-15'
review_cycle: 6-months
sources:
- source.niosh-am-entry
- source.epa-3d-printing-research
related:
- hazard.resin-ppe-disposal
- tech.sla-dlp-msla
- material.resin-families
- setting.resin-exposure-supports
- post.sanding-finishing
- post.painting
prerequisites:
- hazard.resin-ppe-disposal
supersedes: []
aliases_pt_br:
- lavar peça de resina
- pós-cura UV
- IPA wash
aliases_en:
- resin wash and cure
- IPA wash
- UV post-cure
tags:
- post-processing
- resin
- wash
- cure
- safety
---
# Lavagem e pós-cura de resina

Hub pai: [Pós-processamento](INDEX.md)

## O que é

1. **Lavagem:** remover resina líquida residual da superfície e cavidades
2. **Pós-cura:** completar polimerização com luz UV (e às vezes calor) conforme fabricante

## Quando importa

Sempre que imprimir vat. Peça “seca ao toque” **não** prova cura completa.

## Fluxo seguro (ordem)

```text
PPE ON → remover da plataforma → (opcional) remover suporte grosso
→ lavar em estação dedicada → secar → pós-curar → inspeção
→ só então lixa/pintura
```

Detalhes de PPE/descarte: [resina PPE](../15-seguranca-e-meio-ambiente/resina-ppe-e-descarte.md).

## Lavagem

| Método | Notas | Riscos |
|---|---|---|
| IPA / álcool isopropílico (comum) | Dois banhos (sujo → limpo) reduzem consumo | Inflamável; vapores; não esgoto livre |
| Water-washable | Seguir TDS; ainda é efluente químico | **Não** “é só água limpa” |
| Estação comercial wash | Agitação controlada | Manter tampa; filtrar lodo |

- Agitar cavidades; usar escova macia só com luva
- Não usar pele descoberta “para sentir se está limpa”
- Filtrar resina recuperável de volta ao tanque **somente** se o fluxo do fabricante permitir (contaminação)

## Secagem

- Ar / ar comprimido **com** controle de aerossol (não soprar resina no ambiente)
- Peça opaca molhada de IPA: esperar evaporação longe de ignição

## Pós-cura

- Seguir tempo/energia do **TDS da resina** e do fabricante da câmara — sem tip viral
- Subcura: pegajosa, irritante, mecânica ruim
- Overcure: amarelar/ficar quebradiça (depende da família)
- Rotacionar peça se a câmara tiver sombra
- Após cura: lavar mãos mesmo com luva removida corretamente

## Só então acabamento

- [Lixa](lixamento-e-acabamento.md) de polímero curado (pó!)
- [Pintura](pintura-e-primer.md) — VOC adicional

## O que não fazer

- Descartar IPA/resina no ralo ou solo
- Curar no sol “um tempinho” como método controlado sem validação
- Afirmar food-safe porque “curou 10 min” ([claims](../15-seguranca-e-meio-ambiente/claims-food-contact-e-medico.md))
- Misturar regras de [suporte FFF](remocao-de-suportes-fff.md)

## Evidência / higiene

- [NIOSH AM](../22-fontes/niosh-additive-manufacturing.md) — https://www.cdc.gov/niosh/manufacturing/additive/index.html
- [EPA 3D research](../22-fontes/epa-3d-printing-research.md) — https://www.epa.gov/chemical-research/3d-printing-research-epa

## Lacunas

- Tempos por SKU: deliberadamente omitidos
- Protocolo de saturação de banho IPA (quando trocar): heurística futura com medição
