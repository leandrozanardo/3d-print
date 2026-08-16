---
id: design.overhangs-self-supporting
title: Overhangs e ângulos autoportantes (FFF)
summary: 'Overhangs são faces que avançam sem suporte sólido abaixo. Em FFF, ângulos
  ‘autoportantes’ são heurística (frequentemente citada ~45° com nozzle 0,4 mm), não
  lei: material, cooling, largura de linha, velocidade e comprimento da saliência
  mudam o limite. Prefira orientação e geometria (chanfros, filetes) a suporte excessivo;
  valide no preview e em cupom.'
doc_type: design
domain:
- dfam
- fff
technology:
- material-extrusion
process:
- fff
applies_to:
- fff
- printer.bambu-lab-a1-mini
- material.pla
- material.petg
not_for:
- universal-45-degree-law
- resin-overhang-rules-as-fff
materials:
- material.pla
- material.petg
printers:
- printer.bambu-lab-a1-mini
slicers:
- slicer.bambu-studio
knowledge_status: draft
evidence_status: mixed
safety_level: normal
confidence: medium
last_reviewed: '2026-08-15'
review_cycle: 6-months
sources: []
related:
- design.orientation-fff
- design.supports-fff
- component.part-cooling
- design.split-assembly
- hub.dfam
prerequisites:
- tech.fff
supersedes: []
aliases_pt_br:
- ângulos autoportantes
- overhang FFF
- balanço sem suporte
aliases_en:
- self-supporting angles
- FFF overhangs
- bridging vs overhang
tags:
- dfam
- overhang
- supports
- fff
---
# Overhangs e ângulos autoportantes (FFF)

Hub pai: [Design para impressão 3D](INDEX.md)

> Nome do arquivo: `overhangs-e-angulos-autofportantes.md` (kebab pedido). Conceito: ângulos **autoportantes**.

## O que é

**Overhang** — região cuja próxima camada se apoia só parcialmente (ou nada) na camada anterior, projetando-se no ar.

**Ângulo autoportante** — inclinação em que, para um conjunto *material + cooling + extrusão + geometria*, a peça ainda imprime aceitável **sem suporte**. O número “45°” é **mnemônico comum**, não constante física universal.

**Bridge** — vão horizontal entre dois apoios; regras diferentes de overhang contínuo.

## Fatores que movem o limite

| Fator | Efeito típico |
|---|---|
| Material (PLA vs PETG) | PLA costuma tolerar overhang mais agressivo com cooling; PETG é mais sensível |
| Part cooling | Mais fan → menos sag (com trade-off de bonding) — [cooling](../04-componentes-e-hardware/cooling-de-peca-fff.md) |
| Comprimento da saliência | Trecho curto ≠ parede longa a 50° |
| Largura de linha / nozzle | Muda overlap e “degrau” |
| Velocidade local | Rápido demais → baba |
| Orientação | Muitas vezes elimina o overhang — [orientação](orientacao-fff.md) |

## Estratégias DfAM (preferência)

1. **Rotacionar** a peça para transformar overhang em parede
2. **Chanfrar / filetar** (substitui 90° por rampa)
3. **Dividir** e montar — [split e montagem](split-e-montagem.md)
4. **Suporte** só onde preview mostrar falha — [suportes](suportes-fff.md)
5. Ajustar cooling/velocidade **depois** de geometria

## Checklist no slicer

1. Colorir overhangs no preview (quando disponível)
2. Marcar faces cosméticas — evitar cicatriz de suporte nelas
3. Cupom de escada de ângulos no **mesmo** material/perfil antes de peça longa
4. Não copiar ângulo de vídeo sem replicar nozzle e cooling

## O que não fazer

- Tratar 45° como lei para todos os SKUs
- Aplicar regras de resina/SLA em FFF sem adaptação
- Cobrir a peça inteira de suporte “por segurança” sem custo de pós

## Validação

- Escada 20°–70° (passos à sua escolha) com o perfil real
- Inspecionar sag, stringing e união Z na face inferior

## Lacunas

- Escadas medidas PLA/PETG 0,4 mm na A1 Mini: não publicadas como tabela canônica
- Interação tree vs normal support em overhangs organicos: ver playbooks de miniatura
