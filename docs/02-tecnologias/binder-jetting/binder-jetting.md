---
id: "tech.binder-jetting"
title: "Binder jetting"
summary: "Categoria em que um aglutinante líquido é jateado seletivamente sobre um leito de pó, formando uma peça ‘verde’ que depois é curada, despoada e tipicamente sinterizada ou infiltrada. Produtiva e escalável; a metalurgia/cerâmica do pós decide propriedades finais. Distinta de powder bed fusion."
doc_type: "technology"
domain: ["technologies"]
technology: ["binder-jetting"]
process: ["binder-jetting"]
applies_to: ["binder-jetting"]
not_for: ["fff-defaults", "assume-full-density-off-the-printer"]
materials: []
printers: []
knowledge_status: "draft"
evidence_status: "mixed"
safety_level: "high"
confidence: "medium"
last_reviewed: "2026-08-15"
review_cycle: "12-months"
sources: ["source.iso-astm-52900-entry", "source.niosh-am-entry"]
related: ["tech.powder-bed-fusion", "fund.terminology"]
prerequisites: ["fund.terminology"]
aliases_pt_br: ["jetting de aglutinante", "binder jet"]
aliases_en: ["binder jetting", "binder jet"]
tags: ["binder-jetting", "powder", "sinter"]
supersedes: []
---

# Binder jetting

Hub pai: [Tecnologias](../INDEX.md) · pasta [binder-jetting](./)

## Mecanismo

1. Recoating de pó
2. Cabeça de jato deposita **binder** nas regiões da seção
3. Repete camadas → corpo **verde** (ligado, ainda não densificado como metal final)
4. Cura do binder / depowdering
5. **Sinterização** e/ou infiltração conforme rota do material

A impressora frequentemente **não** entrega a densidade metálica final: o forno e a metalurgia fazem parte do processo.

## Hardware

- Leito, recoater, cabeças de impressão, sistema de binder
- Estação de despoeiramento
- Fornos de sinter / equipamentos de infiltração (rota)

## Feedstock

Pós metálicos, areia/moldes, cerâmicos, alguns polímeros — cada um com binder e ciclo térmico próprios. Qualidade de pó e saturação de binder governam defeitos.

## Design rules (entrada)

- Compensar **encolhimento de sinter** (fatores do OEM — não inventar %)
- Espessuras uniformes reduzem distorção
- Canais de escape de pó e binder
- Orientação para estabilidade no leito e no sinter
- Evitar seções que colapsam no estado verde

## Failure modes (entrada)

- Verde frágil / quebra no handling
- Binder bleed / perda de resolução
- Densidade irregular, poros, warpage no sinter
- Contaminação cruzada de pós
- Entupimento de cabeças

## Pós-processamento

Depowdering cuidadoso → cura → sinter/infiltração → usinagem/acabamento. Planejar o fluxo completo no orçamento e no prazo.

## Segurança

Pó + solventes/binder + fornos em alta temperatura. Controles de inalação, inflamabilidade e térmica. [NIOSH AM](../../22-fontes/niosh-additive-manufacturing.md).

O estado **verde** engana: peça parece “pronta” mas é frágil e, em metal, ainda passa por química/térmica perigosa. Treinar handling separado da impressão e do forno reduz scrap e exposição.

## Economia (entrada)

- Atrativo para **produção em volume** e lotes com muitos componentes no leito
- Custo total = impressão + pós térmico + scrap de distorção
- Areia para moldes: caso de uso industrial clássico separado de metal final

Compare sempre o **custo da peça sinterizada inspecionada**, não o custo do job verde. Shrink e warpage no forno são linhas de risco financeiro, não só técnico.
## Comparações (entrada)

| vs LPBF | vs FFF |
|---|---|
| Sem fusão laser camada a camada | Outro feedstock e pós |
| Frequentemente mais throughput de peças | Propriedades via sinter |
| Verde + forno | Peça mais “pronta” na mesa FFF (polímero) |

Regra prática: se o requisito é densidade/propriedade de **fusão in-situ**, comece em PBF/DED; se o requisito é **produção de verdes + sinter controlado**, binder jetting entra na shortlist. Não escolha só pelo nome comercial da máquina.
## Parâmetros críticos (orientação)

Saturação de binder, velocidade de printhead, cura do verde, perfil de desaglutinação/sinter e atmosfera do forno definem densidade e distorção. Percentuais de encolhimento **só** do OEM/liga — não inventar.

## Quando faz sentido

- Muitas peças similares no leito (produção)
- Geometrias que se beneficiam de suporte de pó + sinter
- Moldes/machos em areia para fundição
- Alternativa a LPBF quando a rota sinter + custo de capital se alinham ao caso

Quando **não**: detalhe tipo joalheria fina de resina; “quero metal denso direto da impressora” sem forno; ambiente sem controle de pó.

## Navegação

- Variantes: [metal e areia](binder-jetting-metal-areia.md)
- Contraste com fusão in-situ: [powder bed fusion](../powder-bed-fusion/powder-bed-fusion.md)
- Matriz ampla: [comparação entre categorias](../comparacao-entre-categorias.md)

## Relações

- related → [powder bed fusion](../powder-bed-fusion/powder-bed-fusion.md)
- depends-on → rota de sinter do material

## Fontes

- [source.iso-astm-52900-entry](../../22-fontes/iso-astm-52900-entry.md)
- [source.niosh-am-entry](../../22-fontes/niosh-additive-manufacturing.md)

## Lacunas

- Guia de compensação de shrink (só com fonte OEM)
- Inspeção de densidade e porosimetria
- Binder chemistry por família de pó
