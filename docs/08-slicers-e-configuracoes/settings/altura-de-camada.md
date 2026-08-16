---
id: setting.layer-height
title: Altura de camada (layer height)
summary: 'Altura de camada é a espessura Z de cada fatia depositada. Controla resolução
  vertical, tempo, resistência anisotrópica e capacidade de detalhe/overhang. Conceito
  primeiro; no Bambu Studio o controle aparece sob Quality/layer height (rótulos variam
  por versão). Regra prática: fração do diâmetro do nozzle (comum 25–75% do Ø incluso
  tipicamente 0,4 mm nas tech specs A1 mini — ver sources), não um número mágico universal.
  Validar com a geometria e o material.'
doc_type: setting
domain:
- slicing
- fff
- quality
technology:
- material-extrusion
process:
- fff
applies_to:
- fff
- slicer.bambu-studio
- nozzle-0.4mm
not_for:
- resin-layer-exposure-time
- eternal-ui-path-pinning
slicers:
- slicer.bambu-studio
printers:
- printer.bambu-lab-a1-mini
knowledge_status: draft
evidence_status: mixed
safety_level: normal
confidence: medium
last_reviewed: '2026-08-15'
review_cycle: 6-months
sources:
- source.ellis-print-tuning-guide
- source.bambu-a1-mini-tech-specs
related:
- setting.line-width
- setting.speeds
- nozzle.0.4mm-fff
- process.fff.first-layer
prerequisites:
- tech.fff
supersedes: []
aliases_pt_br:
- altura de camada
- espessura de camada
aliases_en:
- layer height
- layer thickness
tags:
- setting
- layer-height
- slicer
setting_tags:
- layer-height
---
# Altura de camada (layer height)

Hub pai: [Settings](INDEX.md) · [Slicers](../INDEX.md)

## Conceito semântico

**Layer height** = distância entre planos Z sucessivos de extrusão. Menor altura → mais camadas, mais tempo, degraus Z menores. Maior altura → mais rápido, menos detalhe fino, cordões mais “gordos” em Z.

## Nomes no Bambu Studio (notas — UI muda)

Em builds recentes do Bambu Studio, procure campos de **Layer height** / **First layer height** na seção de qualidade/processo do perfil. Não pinne caminhos de menu como eternos; use busca do slicer se a UI mudou.

## Unidade / tipo

Comprimento (mm). Em desktop com nozzle 0,4 mm (tech specs A1 mini / sources), costuma-se partir de alturas de camada bem abaixo do diâmetro do bico — **faixa de partida ilustrativa**, não lei e sem fonte pinada.

## Mecanismo

O slicer gera perímetros/infill com altura H. O fluxo volumétrico necessário escala com H × largura × velocidade. H maior exige mais melt por tempo → aproxima limites volumétricos do hotend.

## Dependências

- Diâmetro do [nozzle](../../04-componentes-e-hardware/nozzle-0-4-mm-fff.md)
- [Largura de linha](largura-de-linha.md)
- [Velocidades](velocidades.md) e max volumetric do filamento
- [First layer height](../../10-processo-de-impressao/fff/primeira-camada.md) (pode ser ≥ H nominal)

## Efeitos

| Direção | Qualidade | Tempo | Resistência / risco |
|---|---|---|---|
| ↑ H | menos detalhe Z; overhangs mais duros | ↓ tempo | mais volume/s; possível under-extrusion se speed alto |
| ↓ H | mais detalhe; melhor curva aproximada | ↑ tempo | mais interfaces Z; útil em minis |

## Sintomas se mal escolhido

- Detalhe “derretido” / degrau grosso → H alto demais para a feature
- Tempo absurdo sem ganho visual → H baixo demais
- Gaps em velocidade alta → H + speed acima do volumetric — [subextrusão](../../12-problemas-e-diagnostico/fff/subextrusao.md)

## Heurísticas (com escopo)

- Cosmético fino / mini: frequentemente 0,08–0,12 mm com 0,4 mm (tech specs A1 mini / sources) — validar
- Funcional geral: frequentemente 0,16–0,20 mm — validar
- Rascunho: até ~0,24–0,28 mm se a geometria permitir
- First layer: muitas vezes ligeiramente maior que H — ver página de primeira camada

## Relação com A1 Mini

Nozzle incluso 0,4 mm nas [tech specs](../../22-fontes/bambu-a1-mini-tech-specs.md). Presets A1 Mini no Studio já escolhem H; altere com propósito, não por hábito.

## Relações com outros conceitos

- trades-off-with → tempo vs resolução
- couples-with → line width, speed, cooling
- indicated-for → miniatura vs ferramenta

## Veja também

- [Paredes](paredes-e-cascas.md) · [Preenchimento](preenchimento.md)
- Fontes metodológicas: [Ellis](../../22-fontes/ellis-print-tuning-guide.md), [Teaching Tech](../../22-fontes/teaching-tech-calibration.md)

## Fontes

- Conceito de processo FFF (princípio)
- [source.bambu-a1-mini-tech-specs](../../22-fontes/bambu-a1-mini-tech-specs.md) (nozzle 0,4)
- Heurísticas de calibração: Ellis / Teaching Tech (metodologia; não número sagrado)

## Lacunas

- Matriz H × propósito na biblioteca de perfis do projeto
- Adaptive layer height — página futura
