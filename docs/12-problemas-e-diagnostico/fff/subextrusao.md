---
id: defect.fff.under-extrusion
title: Subextrusão (under-extrusion) em FFF
summary: 'Subextrusão aparece como gaps entre perímetros, infill fraco, paredes translúcidas
  ou tops incompletos. Na A1 Mini causas comuns: clog parcial, filamento úmido, nozzle
  frio, limite volumétrico em alta velocidade, atrito de path/AMS — não ‘flow 1,10’
  como primeira resposta. Seque e limpe o caminho antes de calibrar flow. Diferencie
  de vase mode intencional e de first layer alta.'
doc_type: troubleshooting
domain:
- fff
- quality
- troubleshooting
technology:
- material-extrusion
process:
- fff
applies_to:
- fff
- printer.bambu-lab-a1-mini
not_for:
- intentional-vase-thin-wall
- flow-above-1.05-to-hide-clog
printers:
- printer.bambu-lab-a1-mini
slicers:
- slicer.bambu-studio
knowledge_status: draft
evidence_status: mixed
safety_level: caution
confidence: medium
last_reviewed: '2026-08-15'
review_cycle: 6-months
sources:
- source.ellis-print-tuning-guide
- source.teaching-tech-calibration
related:
- material.drying-storage
- defect.fff.stringing
- material.composites-fiber
- setting.speeds
- process.fff.first-layer
prerequisites:
- tech.fff
supersedes: []
aliases_pt_br:
- subextrusão
- sub-extrusão
- falta de extrusão
aliases_en:
- under-extrusion
- underextrusion
- gaps in walls
tags:
- under-extrusion
- troubleshooting
- fff
symptom_tags:
- gaps
- weak-infill
- translucent-walls
cause_tags:
- partial-clog
- moisture
- cold-nozzle
- volumetric-limit
- path-friction
setting_tags:
- speeds
- temperatures
- line-width
---
# Subextrusão (under-extrusion) em FFF

Hub pai: [Problemas FFF](INDEX.md) · [Índice por sintoma](indice-por-sintoma.md)

## Resumo de emergência

Gaps / paredes ocas? Verifique **secagem** e **purge/clog** antes de subir flow. Se só falha em speed alto → reduza velocidade / max volumetric ~20%. Não use flow ≫ 1,05 para mascarar entupimento.

## Assinatura

- Visual: fendas entre walls, infill rarefeito, top com buracos, matte espumoso (úmido)
- Áudio: click/grind no extrusor
- Tempo: pode piorar ao longo do print (wear de nozzle em abrasivos — [compósitos](../../05-materiais/fff/composites-fibra.md))

## Diferenciar

| Observação | Página |
|---|---|
| First layer com ridges/gaps só na base | [Primeira camada](../../10-processo-de-impressao/fff/primeira-camada.md) |
| Fios sem gaps | [Stringing](stringing.md) |
| Degrau XY | [Layer shift](layer-shift.md) |
| Vase wall única “fina” | perfil vase, não underextrusion |

## Cause matrix

| Plausibilidade | Causa | Fix inicial |
|---|---|---|
| Alta | Umidade | [Secagem](../../05-materiais/fff/secagem-e-armazenamento.md) |
| Alta | Clog parcial / resíduo | Purge, cold pull, nozzle |
| Alta | Speed > volumetric | [Velocidades](../../08-slicers-e-configuracoes/settings/velocidades.md) ↓ |
| Média | Temp baixa | subir um pouco a temperatura dentro do range do material (ajuste exploratório; sem fonte pinada) — [temperaturas](../../08-slicers-e-configuracoes/settings/temperaturas.md) |
| Média | Path/AMS fricção | Desembaraçar PTFE/path |
| Média | Nozzle gasto (CF/GF) | Trocar hardened |
| Baixa-primeira | Flow “baixo” sem medir | Calibrar só após path limpo |

## Árvore

```text
Filamento seco / sem pops?
  ├─ NÃO → secar; retestar
  └─ SIM → purge limpo?
        ├─ NÃO → cold pull / nozzle; purge PLA↔PETG
        └─ SIM → só em alta velocidade?
              ├─ SIM → −20% speed / ↓ max volumetric
              └─ NÃO → subir um pouco a temperatura dentro do range (ajuste exploratório; sem fonte pinada); cupom single-wall; flow 0,95–1,00
AMS envolvido? → checar kink/tangle antes de flow no Studio
```

## Testes

1. Purge visual (corda consistente?)
2. Cupom de parede única
3. Mesmo modelo a −20% speed
4. Inspecionar nozzle se abrasivo

## Não faça

- Flow alto crônico para “corrigir” gaps
- Mudar retract e flow e temp juntos
- Ignorar clicks

## Validação

Cupom antes/depois; registrar temp/speed/flow/secagem.

## Prevenção

- Purge em troca de material
- Secar PETG/TPU
- Hardened nozzle com filled
- Presets A1 Mini

## Relações com outros conceitos

- caused-by → clog, moisture, cold, volumetric, friction, wear
- settings → speeds, temperatures, line width
- worsened-by → CF/GF em brass
- related-to → [delaminação](delaminacao.md) se bonding falha por frio/úmido

## Veja também

- Legado: [under-extrusion.md](../../projeto/troubleshooting/under-extrusion.md)

## Fontes

- Legado operacional A1 Mini
- Prática de volumetric vs flow mask

## Lacunas

- Procedimento cold pull canônico Bambu versionado
- Telemetria de extruder (se disponível) como evidência
