---
id: setting.speeds
title: Velocidades (speeds)
summary: 'Velocidades de impressão (perímetros, infill, first layer, travel) definem
  mm/s do head e, com geometria do cordão, o fluxo volumétrico exigido. Marketing
  de ‘max speed’ da impressora não é qualidade garantida. No Bambu Studio: Speed por
  tipo de feature (nomes variam). Na A1 Mini, comece dos presets A1 Mini; reduza se
  houver gaps em alta velocidade, ringing ou layer shift por inércia. Valide volumetric
  do filamento.'
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
- printer.bambu-lab-a1-mini
not_for:
- marketing-max-speed-as-quality-target
- eternal-ui-path-pinning
slicers:
- slicer.bambu-studio
printers:
- printer.bambu-lab-a1-mini
knowledge_status: draft
evidence_status: mixed
safety_level: caution
confidence: medium
last_reviewed: '2026-08-15'
review_cycle: 6-months
sources: []
related:
- setting.layer-height
- setting.temperatures
- defect.fff.under-extrusion
- defect.fff.layer-shift
- setting.retraction
- material.tpu
prerequisites:
- tech.fff
supersedes: []
aliases_pt_br:
- velocidade de impressão
- speeds
- mm/s
aliases_en:
- print speed
- outer wall speed
- infill speed
- travel speed
tags:
- setting
- speed
- slicer
setting_tags:
- speeds
---
# Velocidades (speeds)

Hub pai: [Settings](INDEX.md)

## Conceito semântico

**Print speeds** = velocidades alvo por tipo de movimento (outer wall, inner wall, infill, solid, first layer, travel…). Aceleração/jerk (ou equivalentes) limitam se o valor é alcançável em cantos.

Capability de marketing (ex.: toolhead até 500 mm/s nas [tech specs](../../22-fontes/bambu-a1-mini-tech-specs.md)) **≠** “imprima tudo a 500 com qualidade”.

## Nomes no Bambu Studio (notas)

Busque grupos **Speed** / wall / infill / first layer. Não pinne menu antigo como eterno.

## Unidade / tipo

mm/s (às vezes mm³/s no limite volumétrico do filamento).

## Mecanismo

Volume/s ≈ width × height × speed. Se exceder o que o hotend funde → [subextrusão](../../12-problemas-e-diagnostico/fff/subextrusao.md). Inércia alta em peças altas → risco de [layer shift](../../12-problemas-e-diagnostico/fff/layer-shift.md) ou ghosting.

## Dependências

- Layer height / line width
- Temp e max flow do filamento
- Input shaping / calibração mecânica
- Material ([TPU](../../05-materiais/fff/tpu.md) exige lento)

## Efeitos

| ↑ speed | ↓ speed |
|---|---|
| Menos tempo; mais artefato; mais exigência térmica | Mais tempo; geralmente mais estável |
| Outer rápido → detalhe perdido | Outer lento → melhor pele |

## Sintomas

- Gaps só em trechos rápidos → volumetric / temp
- Anéis / vibração → outer speed / accel
- Shift após slam → mecânico + speed/accel
- TPU click → slow down

## Heurísticas

1. Preset **A1 Mini** do material primeiro  
2. First layer bem mais lento que o resto — [primeira camada](../../10-processo-de-impressao/fff/primeira-camada.md)  
3. Outer wall mais lento que infill na maioria dos perfis cosméticos  
4. Se gaps: −20% speed ou ↓ max volumetric **antes** de flow >~1,05  
5. Uma variável por teste  

## Relações com outros conceitos

- couples-with → temperatures, layer height
- constrained-by → volumetric melt rate
- risks → layer shift, under-extrusion

## Veja também

- [Subextrusão](../../12-problemas-e-diagnostico/fff/subextrusao.md)
- [Layer shift](../../12-problemas-e-diagnostico/fff/layer-shift.md)
- [Retração](retracao.md)

## Fontes

- [source.bambu-a1-mini-tech-specs](../../22-fontes/bambu-a1-mini-tech-specs.md) (capabilities de speed)
- Presets Studio; metodologia Ellis/Teaching Tech para cupons

## Lacunas

- Tabela volumetric medida por SKU neste projeto
- Página dedicada a accel/PA
