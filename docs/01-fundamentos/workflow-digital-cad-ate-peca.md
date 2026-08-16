---
id: fund.digital-workflow
title: 'Workflow digital: do CAD à peça'
summary: Cadeia CAD → malha/B-rep → reparo → orientação → slice → toolpath/G-code
  → impressão → pós → validação. Explica onde cada formato (STL, 3MF, G-code) entra,
  quais decisões são irreversíveis e como evitar otimizar o passo errado — com ênfase
  no fluxo FFF desktop desta base.
doc_type: concept
domain:
- fundamentals
- workflow
technology:
- material-extrusion
process:
- fff
applies_to:
- fff
- digital-pipeline
not_for:
- cam-only-machining
- injection-molding-tooling-design
materials: []
printers:
- printer.bambu-lab-a1-mini
knowledge_status: draft
evidence_status: mixed
safety_level: normal
confidence: medium
last_reviewed: '2026-08-15'
review_cycle: 12-months
sources:
- source.iso-astm-52900-entry
- source.bambu-wiki-a1-mini
- source.niosh-am-entry
related:
- fund.terminology
- fund.layers-resolution-accuracy
- hub.modelos
prerequisites:
- fund.terminology
aliases_pt_br:
- fluxo digital
- pipeline CAD impressão
- do modelo à peça
aliases_en:
- digital workflow
- CAD to part
- AM process chain
tags:
- fundamentals
- workflow
- stl
- 3mf
- gcode
supersedes: []
---
# Workflow digital: do CAD à peça

Hub pai: [Fundamentos](INDEX.md)

## O que é

O **workflow digital** de manufatura aditiva é a sequência de transformações de dados e decisões físicas que leva um intent de projeto a uma peça fabricada e validada. Cada etapa **descarta ou compromete informação**. Otimizar só o slicer quando o problema está na malha, na orientação ou no material desperdiça tempo.

Nesta base, o fluxo operacional de referência é **FFF desktop** (ex.: [A1 Mini](../21-impressoras/bambu-lab-a1-mini.md) + Bambu Studio). Outras tecnologias compartilham a lógica CAD→dados→processo→pós, mas com hardware e riscos distintos.

## Cadeia em uma página

```text
Intent / requisitos
    → CAD / scan / geração
    → Export (preferir 3MF quando o ecossistema permitir; STL ainda comum)
    → Análise de malha / reparo / unidades
    → Design for AM (espessuras, overhangs, furos, splits)
    → Orientação e agrupamento na mesa
    → Slice (paredes, infill, suportes, velocidades, temperaturas contextuais)
    → Toolpath / G-code ou job nativo do fabricante
    → Setup físico (plate, nozzle, material seco, ambiente)
    → Impressão + monitoramento
    → Remoção / pós (suportes, cura, sinter, lixa…)
    → Medição / ensaio / feedback ao CAD
```

## Etapas e decisões irreversíveis

### 1. Requisitos

Antes do CAD: função (decorativo, encaixe, carga), ambiente (calor, UV, químicos), tolerância crítica, acabamento, prazo e risco (food/medical → não certificar sem processo regulatório). Sem isso, “boa peça” não tem critério.

### 2. Modelo (CAD ou malha)

- **B-rep / CAD nativo** preserva intenção paramétrica; melhor para iterações e furos precisos.
- **Malha (STL)** aproxima superfícies por triângulos; resolução de malha ≠ resolução de impressão.
- **3MF** carrega metadados úteis (cores, materiais, objetos múltiplos) em ecossistemas modernos; ver glossário.

Unidades erradas (mm vs inch) e normals invertidas causam falhas “misteriosas” no slicer.

### 3. DfAM (design for additive)

Espessura mínima de parede, ângulos de overhang, orientação de cargas (anisotropia), splits para evitar suporte, tolerâncias de encaixe com folga de processo — decisões aqui valem mais que micro-tuning de velocidade. Entrada futura: hub [06-design](../06-design-para-impressao-3d/INDEX.md).

### 4. Orientação

Define: área de contato com a mesa, necessidade de suporte, qualidade de faces, eixos fracos sob carga, tempo e risco de warp. Em FFF, “bonito na tela” ≠ “forte no uso”.

### 5. Slice

Traduz geometria + política de processo em trajetórias. Parâmetros críticos em FFF incluem altura de camada, largura de linha, paredes, infill, cooling, retract, temperaturas **do perfil do material/máquina** (não inventar universais). Preview de camadas e tempo estimado são ferramentas de decisão, não verdade absoluta.

### 6. Job na máquina

G-code / arquivo de job assume firmware, kinematics e sensores da impressora alvo. Transferir job entre máquinas diferentes sem re-slice é risco clássico.

### 7. Físico e pós

Adesão de primeira camada, draft no ambiente, umidade do filamento, remoção de suporte e acabamento fecham o loop. Feedback dimensional deve voltar ao CAD ou à orientação — não só ao “aumentar temperatura”.

## Formatos: quando usar o quê

| Formato | Papel | Cuidado |
|---|---|---|
| CAD nativo | edição | não é o job de impressão |
| STL | intercâmbio legado de malha | perda de metadados; resolução de tessellação |
| 3MF | intercâmbio moderno | suporte varia por software |
| G-code / job | comandos de máquina | máquina/firmware específicos |

Hub de malhas: [07-modelos](../07-modelos-formatos-e-malhas/INDEX.md).

## Onde o tempo se perde (anti-padrões)

| Sintoma | Passo errado comum | Melhor foco |
|---|---|---|
| Encaixe folgado | “aumentar flow” | CAD + orientação + folga de processo |
| Face feia em Z | “layer mais fino forever” | orientação + pós |
| Warp em flat longo | “mais brim só” | material, bed, drafts, geometria — ver [empenamento](../12-problemas-e-diagnostico/fff/empenamento.md) |
| Stringing | “retract máximo” | umidade + temp contextual + retract do extruder |
| Job falha ao meio | reimprimir igual | layer shift / mecânica / filamento / first layer |

## Checklist mínimo pré-impressão (FFF)

1. Unidades e escala conferidas
2. Malha watertight / sem non-manifolds críticos
3. Orientação escolhida para carga e faces importantes
4. Perfil de material alinhado ao SKU (TDS/perfil fabricante)
5. Plate limpo; Z/bed level confiável no contexto da máquina
6. Preview: primeiros 5–10 mm e overhangs críticos
7. Ambiente: sem jato de ar-condicionado na peça (frame aberto)

## Relação com segurança

O workflow digital **não** remove riscos físicos: emissões (VOC/UFP), resinas, pós combustíveis, lasers. Segurança entra no setup e no pós — ver hubs de [segurança](../15-seguranca-e-meio-ambiente/INDEX.md) e [NIOSH AM](../22-fontes/niosh-additive-manufacturing.md).

## Relações

- precedes → processo de impressão e pós
- depends-on → [terminologia](terminologia-manufatura-aditiva.md)
- related → [camadas e precisão](camadas-resolucao-precisao.md), [FFF](../02-tecnologias/material-extrusion/fff.md)

## Fontes

- [source.iso-astm-52900-entry](../22-fontes/iso-astm-52900-entry.md)
- [source.bambu-wiki-a1-mini](../22-fontes/bambu-wiki-a1-mini.md) (operacional A1 Mini)

## Lacunas

- Diagrama de formatos por slicer (Bambu Studio, PrusaSlicer, Cura) com versões
- Pipeline scan → remesh → print
- Workflows industriais PBF/DED (build file, recoating, atmosphere)
