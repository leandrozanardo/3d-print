---
id: tech.material-jetting
title: Material jetting
summary: Categoria em que gotas de material de construção (fotopolímeros, ceras, etc.)
  são depositadas seletivamente, frequentemente com material de suporte removível.
  Forte em multi-material, cores e superfícies lisas; custo e materiais proprietários
  são limitações típicas. Não confundir com binder jetting.
doc_type: technology
domain:
- technologies
technology:
- material-jetting
process:
- material-jetting
applies_to:
- material-jetting
not_for:
- fff-filament-pipeline
- binder-on-powder-as-same
materials: []
printers: []
knowledge_status: draft
evidence_status: mixed
safety_level: caution
confidence: medium
last_reviewed: '2026-08-15'
review_cycle: 12-months
sources:
- source.iso-astm-52900-entry
- source.niosh-am-entry
related:
- tech.vat-photopolymerization
- tech.binder-jetting
- fund.terminology
prerequisites:
- fund.terminology
aliases_pt_br:
- jetting de material
- PolyJet-like
aliases_en:
- material jetting
- PolyJet
- inkjet AM
tags:
- material-jetting
- multi-material
supersedes: []
---
# Material jetting

Hub pai: [Tecnologias](../INDEX.md) · pasta [material-jetting](INDEX.md)

## Mecanismo

Cabeças de impressão depositam **gotas** do material de construção camada a camada. Muitos sistemas depositam também **suporte** (gel/cera/fotopolímero frágil) removido depois. Fotopolímeros são curados por luz imediatamente após a deposição em várias arquiteturas comerciais.

**Diferença crítica:** em **binder jetting**, o jato é aglutinante sobre pó; em **material jetting**, o jato *é* (ou carrega) o material da peça.

## Hardware

- Arrays de jato, estabilização térmica de tintas/resinas
- Cura UV inline (quando fotopolímero)
- Sistemas de multi-material / gradientes
- Estação de remoção de suporte (água, banho, manual)

## Feedstock

Fotopolímeros rígidos/flexíveis, materiais digitais misturados, ceras para fundição — tipicamente **ecossistema fechado**. Propriedades mecânicas de fotopolímeros jateados podem ser limitadas vs termoplásticos de engenharia; verificar TDS do material do sistema.

## Resolução / acabamento

- Entre as melhores superfícies “as-printed” em polímero
- Detalhe fino e texto pequeno são casos de uso fortes
- Precisão dimensional: seguir envelope do OEM; não generalizar µm de marketing

## Design rules (entrada)

- Planejar remoção de suporte em cavidades
- Espessuras mínimas conforme guia do sistema
- Multi-material: interfaces e aderência entre grades
- Orientação para marcas de camada e tempo

## Failure modes (entrada)

- Jetting misfires / nozzles clogged
- Delaminação entre materiais
- Suporte preso em undercuts
- Cura incompleta / amarelamento
- Empenamento em peças grandes e finas

## Pós-processamento

Remoção de suporte → limpeza → eventualmente cura adicional / verniz. Para casting patterns: fluxo de fundição à parte.

## Segurança

Resinas/tintas e solventes de limpeza: SDS, ventilação, luvas. [NIOSH AM](../../22-fontes/niosh-additive-manufacturing.md).

Mesmo com máquina “fechada”, remoção de suporte e limpeza concentram contato cutâneo. Planeje área úmida, descarte de banho e armazenamento longe de luz/calor conforme TDS.

## Economia (entrada)

- Alto custo de material proprietário
- Ideal para protótipos visuais, masters, short-run multi-color
- Pouco competitivo vs FFF para brackets simples

Se a peça for monocromática e só precisar de detalhe, calcule MSLA + pós antes de assumir material jetting. O diferencial econômico aparece em **multi-material / cor / superfície**, não em volume bruto de plástico.
## Comparações (entrada)

| vs vat photopolymerization | vs FFF |
|---|---|
| Multi-material nativo mais comum | Materiais mais baratos em FFF |
| Superfície tipicamente superior | FFF: mais termoplásticos de uso |
| Custo/hr elevado | FFF: melhor para peças utilitárias grossas |

Armadilha de linguagem: “PolyJet” (e similares) não é binder jetting nem MSLA. Normalize para **material jetting** antes de copiar design rules ou SDS.
## Parâmetros críticos (orientação)

Temperatura de heads, drop size/estratégia, cura UV inline, e política de suporte são do sistema. Multi-material exige mapear **qual grade** em cada região e como a interface falha sob carga — não misturar “shore A de marketing” com allowables estruturais.

## Quando faz sentido

- Protótipos visuais, cores, transparências, overmolds digitais
- Masters para silicone/fundição quando o material for adequado
- Short runs onde tempo de acabamento manual supera custo de material

Quando **não**: brackets estruturais baratos (FFF); produção metálica; laboratório sem handling de resina.

## Checklist de decisão

1. A peça precisa de multi-material ou só de detalhe? (detalhe → MSLA pode bastar)
2. Há cavidades que prendem suporte?
3. Propriedade mecânica do TDS cobre o uso real (UV, fluência, impacto)?
4. Custo de material/hr cabe no projeto?

## Relações

- related → [vat photopolymerization](../vat-photopolymerization/vat-photopolymerization.md), [binder jetting](../binder-jetting/binder-jetting.md), [comparação](../comparacao-entre-categorias.md)
- incompatible-with → tratar PolyJet-like como “resina de cuba” sem adaptação

## Fontes

- [source.iso-astm-52900-entry](../../22-fontes/iso-astm-52900-entry.md)
- [source.niosh-am-entry](../../22-fontes/niosh-additive-manufacturing.md)

## Lacunas

- Matriz de materiais digitais e limites de uso estrutural
- Playbook de remoção de suporte solúvel
- Comparativo de custo por cm³ vs MSLA
