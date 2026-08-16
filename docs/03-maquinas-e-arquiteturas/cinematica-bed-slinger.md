---
id: "kinematics.bed-slinger"
title: "Cinemática bed-slinger (mesa móvel em Y)"
summary: "Bed-slinger é a arquitetura FFF em que a mesa (bed) se move no eixo Y enquanto o gantry tipicamente move X (e Z sobe o head ou a mesa, conforme o desenho). A A1 Mini é bed-slinger compacta de frame aberto. Implica inércia da peça+mesa, sensibilidade a aceleração em Y, e envelope limitado pelo movimento da base. Não confundir com CoreXY de mesa fixa: perfis de velocidade e ringing mudam."
doc_type: "architecture"
domain: ["machines", "fff"]
technology: ["material-extrusion"]
process: ["fff"]
applies_to: ["bed-slinger", "printer.bambu-lab-a1-mini"]
not_for: ["corexy-identical-tuning", "industrial-gantry-assumptions"]
printers: ["printer.bambu-lab-a1-mini"]
knowledge_status: "draft"
evidence_status: "mixed"
safety_level: "caution"
confidence: "medium"
last_reviewed: "2026-08-15"
review_cycle: "12-months"
sources: ["source.bambu-a1-mini-tech-specs"]
related: ["printer.bambu-lab-a1-mini", "process.open-frame-env", "design.orientation-fff", "cal.fff-order", "slicer.bambu-studio"]
prerequisites: ["tech.fff"]
supersedes: []
aliases_pt_br: ["bed-slinger", "mesa móvel Y", "cartesianas de mesa móvel"]
aliases_en: ["bed slinger", "moving bed Y", "bed-slinger kinematics"]
tags: ["kinematics", "bed-slinger", "fff"]
---

# Cinemática bed-slinger (mesa móvel em Y)

Hub pai: [Máquinas e arquiteturas](INDEX.md)

## O que é

**Bed-slinger** designa impressoras FFF em que a **build plate se desloca no eixo Y** (vai-e-vem), enquanto o cabeçote tipicamente se move em X sobre um gantry e o eixo Z ajusta a altura relativa. É comum em cartesianas desktop de custo/volume contido.

A [Bambu Lab A1 Mini](../21-impressoras/bambu-lab-a1-mini.md) é bed-slinger: volume oficial **180 × 180 × 180 mm**, frame aberto, extrusão direct drive ([tech specs](../22-fontes/bambu-a1-mini-tech-specs.md)).

## Quando importa

- Peças altas/pesadas (inércia da mesa + peça)
- Artefatos de vibração / ghosting alinhados a movimentos Y
- Comparar presets de CoreXY/X1 com A1 Mini
- Layout no volume: eixo longo da peça vs direção de movimento da mesa

## Mecanismo e consequências

1. **Inércia variável:** conforme a peça cresce, a massa efetivamente acelerada em Y muda → qualidade em aceleração alta pode degradar no fim do print.
2. **Mesa móvel:** cabos, flex da base e nivelamento dinâmico importam mais do que em mesa fixa.
3. **Envelope:** o Y útil já incorpora o curso da mesa; brim e multi-peças precisam caber **com margem**.
4. **Frame aberto típico:** a cinemática em si não aquece câmara — ver [ambiente aberto](../10-processo-de-impressao/fff/ambiente-frame-aberto.md).

## O que fazer (decisões)

1. Começar de presets **A1 Mini** no [Bambu Studio](../08-slicers-e-configuracoes/bambu-studio.md); não colar aceleração de CoreXY “porque o marketing cita mm/s² altos”.
2. Em peças altas: preferir orientação que reduza momento/tombamento — [orientação](../06-design-para-impressao-3d/orientacao-fff.md).
3. Se ringing/ghosting inaceitável: reduzir aceleração/jerk (ou equivalente na versão) **depois** de first layer e flow estáveis — [ordem de calibração](../09-calibracao/ordem-de-calibracao-fff.md).
4. Capabilities oficiais (ex.: até 500 mm/s / 10 000 mm/s² nas specs) são **teto de marketing/capability**, não alvo de qualidade.

## Trade-offs vs mesa fixa (CoreXY etc.)

| Bed-slinger | Mesa fixa (ex. CoreXY típico) |
|---|---|
| Mecânica frequentemente mais simples/barata | Head move em XY; mesa só Z ou fixa |
| Qualidade sensível a massa na mesa | Melhor para altas acelerações em muitos designs |
| Bom em volumes compactos | Escala melhor a envelopes grandes |

## Segurança

- Mesa em movimento: risco de pinçamento; manter área livre.
- Não obstruir o curso Y com objetos.
- Falha de adesão + mesa móvel: peça pode ser arremessada ou virar obstáculo — interromper.

## Relações

- instantiated-by → [A1 Mini](../21-impressoras/bambu-lab-a1-mini.md)
- constrains → velocidade/aceleração úteis, orientação
- related → frame aberto, PEI magnética móvel

## Fontes

- [source.bambu-a1-mini-tech-specs](../22-fontes/bambu-a1-mini-tech-specs.md)

## Lacunas

- Comparativo medido ringing A1 Mini vs CoreXY do mesmo fabricante
- Página `kinematics.corexy` para contraste formal
- Folga de belt Y como átomo de manutenção
