---
id: design.strength-anisotropy
title: Resistência e anisotropia em FFF
summary: 'Peças FFF são anisotrópicas: a união entre camadas (eixo Z) costuma ser
  o elo fraco sob tração e flexão. Resistência útil depende mais de orientação, número
  de paredes, continuidade de toolpath e material do que de ‘100% infill’ sozinho.
  PLA e PETG têm assinaturas distintas de falha; nenhum é certificado estrutural sem
  ensaio. Oriente carga no plano XY quando possível, valide com cupom e não confunda
  marketing de filamento ‘tough’ com garantia de peça.'
doc_type: guide
domain:
- design
- fff
- quality
technology:
- material-extrusion
process:
- fff
applies_to:
- fff
- material.pla
- material.petg
- printer.bambu-lab-a1-mini
not_for:
- isotropic-metal-assumptions
- certified-load-bearing-without-test
- food-medical-implants
knowledge_status: draft
evidence_status: mixed
safety_level: caution
confidence: medium
last_reviewed: '2026-08-15'
review_cycle: 6-months
sources:
- source.ellis-print-tuning-guide
related:
- design.tolerances-fff
- design.holes-threads-inserts
- material.pla
- material.petg
- quality.test-coupons
- scenario.functional-brackets
prerequisites:
- tech.fff
supersedes: []
aliases_pt_br:
- anisotropia FFF
- resistência entre camadas
- orientação de carga
aliases_en:
- FFF anisotropy
- layer adhesion strength
- print orientation strength
tags:
- dfam
- strength
- anisotropy
- fff
---
# Resistência e anisotropia em FFF

Hub pai: [Design para impressão 3D](INDEX.md)

## O que é

**Anisotropia:** propriedades mecânicas dependem da direção. Em FFF, cordões fundidos no plano da camada (XY) geralmente superam a **adesão entre camadas** (Z) sob tração perpendicular às camadas.

**Resistência útil:** capacidade da peça de cumprir a função (estática, impacto, fadiga leve) no ambiente real — não o número de marketing do spool.

## Quando importa

- Brackets, clips, alavancas, carcaças aparafusadas
- Peças que falham “no meio” em delaminação
- Escolha entre mais paredes vs mais infill

## Princípios (fato vs heurística)

| Afirmação | Tipo | Escopo |
|---|---|---|
| União entre camadas é tipicamente o elo fraco em tração Z | Fato de processo (qualitativo) | FFF termoplástico típico |
| Paredes contínuas frequentemente vencem infill alto esparso para rigidez local | Heurística suportada | Validar geometria |
| Orientar flexão de clip no XY | Heurística de DfAM | Snap/clip |
| “100% infill = máxima resistência” | Mito parcial | Ignora orientação e paredes |

## Orientação de carga

| Caso de carga | Heurística de orientação |
|---|---|
| Clip / snap flexiona | eixo de flexão no plano XY |
| Parafuso em tração | paredes carregam; não confiar só em infill ralo |
| Pino sob cisalhamento | eixo do pino em Z **ou** paredes ≥4 em torno |
| Bracket de parede | alinhar fibras/paredes com o momento dominante; evitar Z puro na raiz |
| Living hinge | parede fina controlada; PLA fatiga → candidatar [PETG](../05-materiais/fff/petg.md) |

Ver playbook: [peças funcionais / brackets](../16-cenarios-e-playbooks/pecas-funcionais-brackets.md).

## Paredes, top/bottom e infill

Ordem prática de alavancas (barato → caro):

1. Reorientar para tirar tração do Z crítico
2. Aumentar **wall loops** na região de stress
3. Top/bottom sólidos adequados (não “casca oca” onde há compressão pontual)
4. Infill: padrão contínuo e densidade **só onde** necessário
5. Material mais tenaz (ex.: PETG seco) **depois** de esgotar geometria/orientação
6. Insert metálico / redesign se carga cíclica ou torque

Evite “subir tudo de uma vez” (temp + flow + walls + material) — uma variável por teste.

## Material (contexto A1 Mini)

- **[PLA](../05-materiais/fff/pla.md):** rígido, bom cosmético; falha frágil sob impacto; amolece em calor modestíssimo (validar TDS)
- **[PETG](../05-materiais/fff/petg.md):** tipicamente mais tenaz; processo mais sensível a umidade/adesão; ainda anisotrópico

Nenhum dos dois é “estrutural certificado” só por ser impresso.

## Validação mínima

1. Cupom de tração/flexão na orientação real da peça ([cupons](../11-qualidade-e-metrologia/cupons-e-ensaios.md))
2. Ensaio funcional com margem de carga (não só “deu certo uma vez”)
3. Registrar falha: delaminação Z vs ruptura no plano vs trinca no boss

## Segurança

- Peças de sustentação humana, infantis, pressão ou fogo: fora do escopo “hobby OK”
- Não afirmar food-safe/médico
- Emissões: [VOC/UFP](../15-seguranca-e-meio-ambiente/voc-ufp-e-ventilacao.md)

## Relações

- related → [tolerâncias](tolerancias-e-encaixes-fff.md), [furos/roscas/inserts](features-furos-roscas-inserts.md)
- process → [FFF](../02-tecnologias/material-extrusion/fff.md)

## Lacunas

- Curvas tensão-deformação medidas neste repo: ainda não publicadas
- Efeito quantitativo de temperature/cooling em Z-bond por SKU: open
