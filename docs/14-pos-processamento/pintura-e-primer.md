---
id: post.painting
title: Pintura e primer em peças impressas
summary: Primer e tinta melhoram cosmético e podem revelar defeitos; exigem superfície
  limpa, lixa adequada e ventilação por VOC de solventes. Compatibilidade tinta↔polímero
  (PLA/PETG/resina curada) deve seguir SDS do produto — esta base não certifica sistemas.
  Pintura não torna a peça apta a contato alimentar ou uso médico. Preferir camadas
  finas, cura entre demãos e PPE.
doc_type: guide
domain:
- post-processing
technology:
- material-extrusion
- vat-photopolymerization
process:
- fff
applies_to:
- cosmetic-finishing
- fff
not_for:
- food-contact-coating-claim
- medical-device-coating
- unventilated-solvent-spraying
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
- post.sanding-finishing
- post.support-removal-fff
- hazard.voc-ufp-ventilation
- scenario.miniatures
prerequisites:
- post.sanding-finishing
supersedes: []
aliases_pt_br:
- pintar impressão 3D
- primer em PLA
- acabamento com tinta
aliases_en:
- painting 3D prints
- primer
- spray paint plastics
tags:
- post-processing
- painting
- primer
- voc
---
# Pintura e primer

Hub pai: [Pós-processamento](INDEX.md)

## O que é

Aplicação de primer e/ou tinta (spray, brush, airbrush) sobre peça FFF ou resina **já estável** (limpa; resina lavada e pós-curada).

## Quando importa

- Miniaturas e display ([cenário](../16-cenarios-e-playbooks/miniaturas-detalhe-fino.md))
- Ocultar camadas após [lixa](lixamento-e-acabamento.md)
- Prototipagem visual de produto

## Pré-requisitos

1. Suportes removidos ([FFF](remocao-de-suportes-fff.md) ou fluxo resina)
2. Superfície desengordurada (água+detergente neutro ou produto indicado no SDS da tinta — sem improvisar solvente desconhecido)
3. Pó de lixa removido
4. Resina: obrigatoriamente pós-curada ([lavagem/cura](lavagem-e-pos-cura-resina.md))

## Fluxo típico (heurística)

```text
limpar → (opcional) primer fino → curar/secar → lixa leve P600+ →
tinta base em demãos finas → detalhes → clear (opcional)
```

- Demãos finas > uma grossa (escorrimento, perda de detalhe)
- Respeitar tempo de flash/cura do fabricante da tinta
- Primer “enche” microporos mas também arredonda arestas — trade-off em miniaturas

## Compatibilidade (não inventar química)

| Substrato | Cuidado |
|---|---|
| PLA | Muitos primers plásticos aderem; teste em cupom |
| PETG | Adesão variável; cupom obrigatório |
| Resina curada | Pode precisar de primer específico; monômero residual irrita — peça deve estar curada |
| Tintas solvente fortes | Podem atacar superfície — ler SDS |

Se o fabricante da tinta não lista o plástico, **teste** — não afirme compatibilidade universal.

## Segurança — VOC e spray

- Pintura/spray adiciona **VOC** além das emissões de impressão — ver [VOC/UFP](../15-seguranca-e-meio-ambiente/voc-ufp-e-ventilacao.md)
- Preferir área ventilada / exaustão; nunca spray em quarto fechado sem controle
- Máscara adequada a vapores orgânicos quando o SDS exigir — “pó de café” não é filtro
- Inflamáveis: longe de hotend/ignição
- Fontes: [NIOSH](../22-fontes/niosh-additive-manufacturing.md), [EPA 3D research](../22-fontes/epa-3d-printing-research.md)

## O que pintura NÃO faz

- Não certifica food-contact
- Não torna implante/dispositivo médico
- Não “sela” monômero de resina mal curada (cure primeiro)
- Não corrige warping estrutural

## Relações

- Acabamento mecânico → [lixamento](lixamento-e-acabamento.md)
- Claims proibidos → [food/medical](../15-seguranca-e-meio-ambiente/claims-food-contact-e-medico.md)

## Lacunas

- Matriz tinta×marca validada neste projeto: inexistente
- Airbrush booth setup: página futura
