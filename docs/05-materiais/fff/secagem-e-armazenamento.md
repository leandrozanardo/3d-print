---
id: material.drying-storage
title: Secagem e armazenamento de filamentos FFF
summary: 'Filamento úmido não é problema de slicer: vapor no hotend gera pops, bolhas,
  stringing, falsa subextrusão e camadas fracas. PLA é moderadamente higroscópico;
  PETG, TPU, PA e PC exigem disciplina maior. A A1 Mini não seca bobina durante o
  print — secar e vedar antes de culpar retração ou flow. Faixas de tempo/temperatura
  são pontos de partida subordinados ao TDS e aos limites do secador/carretel.'
doc_type: material
domain:
- materials
- fff
- process
technology:
- material-extrusion
process:
- fff
applies_to:
- fff
- printer.bambu-lab-a1-mini
- material.pla
- material.petg
- material.tpu
not_for:
- slicer-only-fix-for-wet-filament
- kitchen-oven-without-temp-control
materials:
- material.pla
- material.petg
- material.tpu
- material.pa
- material.pc
printers:
- printer.bambu-lab-a1-mini
knowledge_status: draft
evidence_status: mixed
safety_level: caution
confidence: medium
last_reviewed: '2026-08-16'
review_cycle: 6-months
sources:
- source.ellis-print-tuning-guide
- source.teaching-tech-calibration
related:
- material.pla
- material.petg
- material.tpu
- material.pa
- defect.fff.stringing
- defect.fff.under-extrusion
- defect.fff.delamination
prerequisites:
- tech.fff
supersedes: []
aliases_pt_br:
- secagem de filamento
- umidade
- armazenamento de bobina
aliases_en:
- filament drying
- moisture
- spool storage
- hygroscopy
tags:
- drying
- storage
- humidity
- fff
---
# Secagem e armazenamento de filamentos FFF

Hub pai: [Materiais FFF](INDEX.md)

## O que é

**Higroscopia** em filamentos: polímeros absorvem água do ar. No hotend, água vira vapor → voids, pops audíveis, diâmetro efetivo instável, ooze e solda de camada ruim. **Secagem** remove umidade até um nível utilizável; **armazenamento** atrasa a reabsorção.

## Quando importa

| Gatilho | Ação |
|---|---|
| Pops / vapor / bolhas na extrusão | Secar antes de qualquer torre |
| Stringing súbito em bobina “boa” | Secar → só então [stringing](../../12-problemas-e-diagnostico/fff/stringing.md) |
| PETG / TPU / PA / PC com histórico aberto | Secar profilaticamente |
| Gaps que “somem” com flow absurdo | Suspeitar umidade + path — [subextrusão](../../12-problemas-e-diagnostico/fff/subextrusao.md) |
| Delaminação com fan “normal” | Incluir umidade na hipótese — [delaminação](../../12-problemas-e-diagnostico/fff/delaminacao.md) |

## Quando não usar esta página como desculpa

- Falha só na camada 1 sem pops → [primeira camada](../../10-processo-de-impressao/fff/primeira-camada.md)
- Degrau XY permanente → [layer shift](../../12-problemas-e-diagnostico/fff/layer-shift.md)
- Empenamento tardio com base OK → [empenamento](../../12-problemas-e-diagnostico/fff/empenamento.md) (umidade pode contribuir em PETG/PA, mas draft/bed também)

## Árvore curta

```text
Pops, bolhas, cabelo + superfície porosa?
  └─ SIM → secar (TDS/secador) → cupom curto → só então retract/temp
PETG/TPU/PA/PC com armazenamento duvidoso?
  └─ SIM → secar profilaticamente
Após secar ainda ruim?
  └─ path/clog/temp/retract (uma variável)
```

## Por que a A1 Mini não “corrige” bobina úmida

- Não há dry-box nativo no hotend; AMS Lite **não** substitui secagem salvo solução projetada para isso
- Subir temperatura em filamento úmido frequentemente **piora** stringing e degradação
- Capability de materiais Ideal (PLA/PETG/TPU/PVA) nas [tech specs](../../22-fontes/bambu-a1-mini-tech-specs.md) assume processo saudável — não filamento vaporoso

## Sinais por família (heurística)

| Sinal | PLA | PETG | TPU | PA/PC |
|---|---|---|---|---|
| Pops | comum se úmido | muito comum | comum | crítico |
| Stringing súbito | possível | severo | comum | comum |
| Espuma / porosidade | possível | clássico | possível | clássico |
| Prioridade de secar | média-alta | alta | alta | máxima |

## Faixas de secagem (ponto de partida — não gospel)

> Validar **TDS do filamento**, precisão do secador e limite do carretel (papelão/plástico amolece). Se o spool ovalizar, baixe a temperatura. Forno de cozinha sem controle fino = risco.

| Família | Temp. típica de partida | Tempo típico de partida | Notas |
|---|---|---|---|
| PLA | ponto de partida comum ~45–55 °C (não pinado a TDS; respeitar limite do spool) | ~4–6 h | Não exceda limite do spool |
| PETG | ~65–70 °C | ~4–8 h | Re-secar após aberto em clima úmido |
| TPU | seguir TDS (ordem semelhante a PETG em muitos SKUs) | TDS | Não inventar; marca manda |
| PA | frequentemente mais quente/longo no TDS | TDS | Tratar overnight aberto como molhado |
| PC | seguir TDS | TDS | Não “chutar” acima do secador |

Tempos/temperaturas exatos **não** são universais. Fabricante do filamento + fabricante do dryer > tabela desta página.

## Armazenamento (SOP operacional)

1. Após abrir: saco vedado + dessecante; vácuo se disponível
2. Etiquetar data de abertura
3. PETG/TPU: default “secar antes de job importante”
4. Não deixar PETG semanas no AMS Lite em sala úmida sem estratégia
5. Regenerar/trocar dessecante quando o indicador mostrar gasto — validar marca
6. Imprimir logo após secar ou manter em dry-box

## Interação com defeitos

| Observação | Umidade provável? | Se seco, ver |
|---|---|---|
| Pops + strings juntos | alta | — |
| Só cabelo, hotend silencioso | média | temp/retract/travel |
| Gaps + grind | média–alta | path/clog/volumétrico |
| Só first layer | baixa | placa/Z/bed |
| Layer shift | muito baixa | mecânico |

## Segurança

- Secadores e aquecedores: risco de queimadura / fogo se improvisados
- Não ultrapassar temperatura que deforma o carretel ou viola o manual do dryer
- Ventilação ao abrir estufas quentes

## Relações com outros conceitos

- mitigates → stringing, falsa under-extrusion, delaminação por vapor
- prerequisite-for → torres de temp/retract confiáveis
- applies-to → PLA/PETG/TPU na A1 Mini; PA/PC sobretudo fora dela
- does-not-replace → limpeza de nozzle, calibração de first layer

## Veja também

- [PLA](pla.md) · [PETG](petg.md) · [TPU](tpu.md) · [PA](pa-nylon.md) · [PC](pc.md)
- [Stringing](../../12-problemas-e-diagnostico/fff/stringing.md)
- Legado: [secagem-e-umidade.md](../../projeto/materiais/secagem-e-umidade.md)

## Fontes

- Princípio físico: vapor/voids em melt úmido (conceito; não número inventado)
- [source.bambu-a1-mini-tech-specs](../../22-fontes/bambu-a1-mini-tech-specs.md) — contexto de materiais Ideal na máquina
- TDS do filamento + manual do secador — **obrigatórios** para valores finais
- Legado EN: [secagem-e-umidade.md](../../projeto/materiais/secagem-e-umidade.md)

## Lacunas

- Tabela por SKU Bambu com tempos medidos localmente
- AMS Lite como microclima (dados)
- Umidade relativa ambiente × tempo até “molhado demais”
