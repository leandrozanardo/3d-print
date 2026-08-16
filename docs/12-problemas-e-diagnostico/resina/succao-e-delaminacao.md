---
id: "defect.resin.suction-delamination"
title: "Sucção (cupping) e delaminação em resina"
summary: "Falha atômica em vat: cavidades tipo ‘copo’, shells fechados ou grandes áreas planas geram vácuo/sucção no peel do filme — camadas falham, buracos, delaminação entre camadas ou arrancamento mesmo com suporte tipado. Mecanismos: área de peel alta + selamento de fluido + lift inadequado + eventualmente subexposição. Mitigações de design (furos de alívio), orientação, lift e tipagem; não confundir com FFF delamination. PPE ao inspecionar tanque."
doc_type: "troubleshooting"
domain: ["troubleshooting", "resin"]
technology: ["vat-photopolymerization"]
process: ["sla", "dlp", "msla"]
applies_to: ["vat-photopolymerization"]
not_for: ["fff-z-bonding-delamination", "universal-hole-diameter-recipes"]
symptoms: ["symptom.cupping-failure", "symptom.layer-gap-resin", "symptom.hollow-print-collapse"]
causes: ["cause.suction-cupping", "cause.sealed-cavity", "cause.aggressive-peel", "cause.underexposure-interlayer"]
knowledge_status: "draft"
evidence_status: "mixed"
safety_level: "high"
confidence: "medium"
last_reviewed: "2026-08-15"
review_cycle: "6-months"
sources: ["source.niosh-am-entry"]
related: ["defect.resin.index", "defect.resin.island-loose-support", "defect.resin.over-under-exposure", "defect.resin.nothing-on-plate", "setting.resin-exposure-supports", "tech.sla-dlp-msla"]
prerequisites: ["hazard.resin-ppe-disposal", "tech.sla-dlp-msla"]
supersedes: []
aliases_pt_br: ["sucção resina", "cupping", "delaminação MSLA", "vácuo no FEP", "camadas faltando oco"]
aliases_en: ["resin suction", "cupping", "MSLA delamination", "vacuum peel failure"]
tags: ["troubleshooting", "resin", "suction", "cupping", "delamination"]
---

# Sucção (cupping) e delaminação em resina

Hub pai: [Problemas — resina](INDEX.md) · [Índice de falhas](indice-falhas-resina.md)

## Resumo de emergência

1. PPE: [resina PPE](../../15-seguranca-e-meio-ambiente/resina-ppe-e-descarte.md)
2. Se a peça “gruda” no filme com força anormal em geometria de copo: **não force** com metal sobre o LCD
3. Priorize **design/orientação** (drain holes) antes de empilhar over-exposure
4. Diferencie delaminação por sucção de falha de tip ([ilha/suporte](ilha-e-suporte-solto.md))

## Assinatura

- Visual: camadas faltando em região de cavidade; “anel” de falha; peça oca colapsada; superfície interna irregular
- Momento: tipicamente quando a geometria começa a selar volume contra o filme
- Sensação no unload: resistência anormal ao peel em shells

## Tecnologias afetadas

MSLA/SLA/DLP com filme flexível. Magnitude depende de área selada, viscosidade, velocidade de lift e compliance do filme.

## Diferenciar

| Parece sucção mas… | Vá para |
|---|---|
| Raft inteiro no FEP | [nada na placa](nada-na-placa.md) |
| Feature tipada que arrancou | [ilha e suporte solto](ilha-e-suporte-solto.md) |
| Bleeding / perda de microdetalhe | [over exposure](over-under-exposure.md) |
| Delaminação FFF (solda Z) | fora de escopo — processo diferente |

## Riscos e parada

- Força de peel extrema → filme + LCD
- Peça semi-curada com cavidade cheia de resina líquida → derrame ao abrir (furar/drenar conforme fluxo seguro)
- “Oco sem furo” impresso de propósito sem plano de drenagem

## Cause matrix (ordenada)

| Plausibilidade | Causa | Por quê |
|---|---|---|
| Alta | Geometria tipo cup/shell sem alívio | Vácuo relativo no peel |
| Alta | Grande área plana paralela ao filme | Pico de força de descolamento |
| Média | Lift rápido / distância curta demais | Não há tempo/curso para o filme “descascar” |
| Média | Subexposição → interface de camada fraca | Delamina sob peel normal |
| Média | Resina muito viscosa / fria | Fluido não reentra rápido no gap |
| Baixa-primeira | “Máquina fraca” | Só após esgotar design + lift + exposição |

## Árvore de decisão

```text
Há cavidade / face plana grande / shell?
  ├─ NÃO → preferir tip/exposição/level (outras páginas)
  └─ SIM → há drain/vent holes adequados?
        ├─ NÃO → adicionar furos de alívio (design) ou reorientar para abrir o volume
        └─ SIM → falha persiste?
              ├─ Peel ainda brusco? → suavizar lift; reduzir área paralela
              ├─ Camadas fracas em toda peça? → cupom de exposição (under)
              └─ Só em região oca? → tipagem interna + drenagem + lift
```

## Testes (barato → caro)

1. Inspecionar geometria no CAD/slicer: volumes fechados? faces “tampa”?
2. Adicionar/verificar **furos de drenagem/ventilação** (posição e tamanho conforme requisito da peça — sem diâmetro universal aqui)
3. Reorientar para que o “copo” não sele contra o filme nas camadas críticas
4. Ajustar perfil de lift (mais suave / mais distância) em uma variável
5. Validar exposição com cupom se a peça inteira parecer subcurada
6. Avaliar hollow com espessura de parede e tipagem interna (software de hollow)

## Ações corretivas por causa

| Causa confirmada | Ação | Não faça junto |
|---|---|---|
| Cupping de design | Drain/vent + reorientar | Só ↑ bottom |
| Área plana | Inclinar peça | Over-exposure cego |
| Lift agressivo | Perfil mais suave | Mudar resina no mesmo teste |
| Subcura | Matriz de exposição | Compensar só com furos |
| Oco sem tip | Hollow + internal supports | Ignorar drenagem |

## Design vs processo (decisão)

| Preferir mudar | Quando |
|---|---|
| CAD (furos, split, espessura) | Peça de produção / falha repetível |
| Orientação | Cicatriz e drenagem aceitáveis |
| Lift | Job único / peça já congelada |
| Exposição | Evidência de under em cupom |

## Validar correção

Mesma peça com drenagem/orientação alterada; unload sem resistência extrema; inspeção interna (se oco) sem camadas faltantes. Registrar lift + presença de holes.

## Prevenção

- Revisar “cups” no design review antes do slice
- Política: hollow sempre com drain + tip interno quando aplicável
- Evitar bases maciças 100% paralelas ao XY sem necessidade

## Relações com outros conceitos

- indicated-by → falha em cavidade / peel extremo
- causes ← selamento + área + lift + interface fraca
- mitigated-by → drain holes, orientação, lift, exposição adequada
- confused-with → tip tear, empty plate
- depends-on → [tech SLA/DLP/MSLA](../../02-tecnologias/vat-photopolymerization/sla-dlp-msla.md)

## Veja também

- [Over/under exposure](over-under-exposure.md)
- [Settings resina](../../08-slicers-e-configuracoes/resina-exposicao-e-suportes.md)

## Fontes

- [NIOSH Additive Manufacturing](../../22-fontes/niosh-additive-manufacturing.md)
- Mecanismo de peel/exposição: [setting.resin-exposure-supports](../../08-slicers-e-configuracoes/resina-exposicao-e-suportes.md)
- Diâmetros/posições de furo: requisito da peça + prática do time — **não** inventados como padrão universal

## Lacunas

- Limiares quantitativos de área vs falha (dependem de máquina/filme)
- Comparativo FEP vs nFEP vs membrane sob cupping
