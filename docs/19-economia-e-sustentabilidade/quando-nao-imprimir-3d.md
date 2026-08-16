---
id: econ.when-not-to-print
title: Quando não imprimir em 3D
summary: Impressão 3D desktop brilha em customização, iteração e geometrias difíceis
  de usinagem/injeção em baixa escala — e falha como default para commodity barata,
  peças reguladas, produção em massa sem QMS e usos food/medical sem processo. Esta
  página lista critérios de ‘não imprimir’ para economizar tempo, filamento e risco.
doc_type: guide
domain:
- economics
- applications
- fff
technology:
- material-extrusion
- vat-photopolymerization
process: []
applies_to:
- desktop-am
- hobby-to-prosumer
not_for:
- ban-all-3d-printing
- self-certify-regulated-parts
knowledge_status: draft
evidence_status: mixed
safety_level: caution
confidence: high
last_reviewed: '2026-08-15'
review_cycle: 12-months
sources: []
related:
- econ.fff-cost-waste
- app.qualification-limits
- app.food-contact-limits
- hazard.food-medical-claims
- hub.economia
prerequisites: []
supersedes: []
aliases_pt_br:
- quando não imprimir
- não use impressão 3D
- comprar vs imprimir
aliases_en:
- when not to 3D print
- buy vs print
- print economics stop rules
tags:
- economics
- decision
- dfam
- risk
---
# Quando não imprimir em 3D

Hub pai: [Economia e sustentabilidade](INDEX.md)

## Posição

Imprimir porque “dá” não é o mesmo que imprimir porque **vale a pena**. Use esta página como freio de decisão antes do fatiador.

## Sinais fortes de “não imprimir” (ou não nesta base/máquina)

| Situação | Por quê | Alternativa típica |
|---|---|---|
| Peça commodity barata idêntica no mercado | Custo tempo + falha > preço | Comprar |
| Food-contact / utensílio “seguro” DIY | Sem processo regulatório | [Claims food/médico](../15-seguranca-e-meio-ambiente/claims-food-contact-e-medico.md); [limites contato alimentar](../18-aplicacoes-e-regulacao/contato-alimentar-limites.md) |
| Dispositivo médico / implante / ortese clínica | Qualificação fora do hobby | [Limites de qualificação](../18-aplicacoes-e-regulacao/limites-de-qualificacao.md) |
| Carga estrutural crítica sem ensaio | Anisotropia + incerteza | Usinagem/peça certificada + engenharia |
| Material Not Recommended na máquina | Risco mecânico/térmico/qualidade | Trocar máquina/material Ideal |
| Lote grande repetível sem fixture/QMS | FFF desktop não é injeção | Serviço industrial / moldagem |
| Só “quero PLA food-safe / biocompatível” | Claim proibido aqui | Pare; não peça receita de certificação DIY |
| Sem ventilação/PPE para resina ou solventes | Saúde | Não processar — [PPE resina](../15-seguranca-e-meio-ambiente/resina-ppe-e-descarte.md) |

## Sinais de “imprimir faz sentido”

- Geometria custom, encaixe único, jigs internos
- Iteração rápida de forma (protótipo visual/funcional leve)
- Baixo volume onde lead time de usinagem dói
- Peças de reposição fora de linha **não críticas**
- Aprendizado e cupons — [custo/desperdício](custo-e-desperdicio-fff.md)

## Checklist de 60 segundos

1. Qual é a função e o modo de falha?
2. Existe compra pronta adequada?
3. O uso é regulado (food/medical/safety)?
4. Tenho material + máquina adequados (Ideal vs Not Recommended)?
5. Consigo validar com cupom/ensaio antes do lote?
6. O ROI de tempo supera a falha no pior caso?

Se 3 = sim → **não** trate esta wiki como caminho de certificação.

## Relação com A1 Mini

Escopo operacional forte: PLA/PETG/TPU (e PVA listado Ideal nas specs) para peças não reguladas. Não use a Mini como substituto de processo industrial qualificado.

## Lacunas

- Planilha buy-vs-print com custos locais: não publicada
- Limiares de volume (quebra de custo vs injeção): dependem de região — não inventados
