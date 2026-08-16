---
id: "scenario.miniatures"
title: "Playbook — miniaturas e detalhe fino"
summary: "Cenário para miniaturas/figuras: priorizar resolução aparente (camada fina, nozzle 0,4 mm ainda útil), orientação de faces cosméticas, cooling e suporte tipado — em FFF na A1 Mini com PLA. Resina (MSLA) ganha detalhe mas exige PPE e fluxo de lavagem/cura. Não misturar regras FFF/resina; não afirmar food/medical. Valide com cupom de detalhe antes da peça longa."
doc_type: "scenario"
domain: ["scenarios", "fff", "quality"]
technology: ["material-extrusion", "vat-photopolymerization"]
process: ["fff"]
applies_to: ["printer.bambu-lab-a1-mini", "material.pla", "cosmetic-miniatures"]
not_for: ["structural-brackets-as-miniature-settings", "food-minis", "resin-without-ppe"]
knowledge_status: "draft"
evidence_status: "mixed"
safety_level: "caution"
confidence: "medium"
last_reviewed: "2026-08-15"
review_cycle: "3-months"
sources: ["source.bambu-a1-mini-tech-specs", "source.niosh-am-entry"]
related: ["material.pla", "post.support-removal-fff", "post.sanding-finishing", "post.painting", "tech.sla-dlp-msla", "scenario.speed-vs-quality"]
prerequisites: ["material.pla", "process.fff.first-layer"]
supersedes: []
aliases_pt_br: ["miniaturas FFF", "detalhe fino", "figuras impressas"]
aliases_en: ["miniatures", "fine detail prints", "tabletop miniatures"]
tags: ["playbook", "miniatures", "detail"]
---

# Playbook — miniaturas e detalhe fino

Hub pai: [Cenários](INDEX.md)

## Objetivo

Obter detalhe cosmético aceitável em figura/miniatura (rostos, bordas, texturas) com trade-off explícito de tempo.

## Perguntas mínimas

- Tecnologia: FFF (A1 Mini) ou resina?
- Escala / menor feature visível desejada?
- Faces que não podem ter cicatriz de suporte?
- Pintura prevista?
- Tempo máximo de job?

## Hard constraints

- Sem food/medical ([claims](../15-seguranca-e-meio-ambiente/claims-food-contact-e-medico.md))
- Resina: PPE + ventilação obrigatórios ([resina PPE](../15-seguranca-e-meio-ambiente/resina-ppe-e-descarte.md))
- A1 Mini FFF: nozzle ref. [0,4 mm](../04-componentes-e-hardware/nozzle-0-4-mm-fff.md); detalhe limitado pelo cordão

## Seleção tech / material

| Se… | Então |
|---|---|
| Detalhe extremo + aceita química | Considerar [SLA/DLP/MSLA](../02-tecnologias/vat-photopolymerization/sla-dlp-msla.md) |
| Simplicidade / baixo PPE químico | FFF + [PLA](../05-materiais/fff/pla.md) |
| Resistência estrutural | Errado playbook → [brackets](pecas-funcionais-brackets.md) |

## Geometria e orientação (FFF)

- Face hero sem suporte se possível
- Inclinar levemente para reduzir “flat on bed” em peito/rosto (julgamento caso a caso)
- Evitar overhangs 90° em capas/armas — filete ou suporte paint-on
- Paredes mínimas respeitando nozzle (features abaixo de ~0,8 mm são arriscadas em 0,4 mm)

## Prioridades de slicing (FFF)

1. Perfil PLA A1 Mini oficial como base
2. Camada mais baixa **só** se tempo caber ([speed vs quality](impressao-rapida-vs-qualidade.md))
3. Cooling alto após L1 estável ([primeira camada](../10-processo-de-impressao/fff/primeira-camada.md))
4. Suporte árvore / paint-on; interface tipada ([remoção](../14-pos-processamento/remocao-de-suportes-fff.md))
5. Velocidade de parede externa moderada — detalhe &gt; máximo mm/s

## Pós

1. Remover suporte com corte fino
2. [Lixa](../14-pos-processamento/lixamento-e-acabamento.md) local (pó!)
3. [Primer/pintura](../14-pos-processamento/pintura-e-primer.md) com VOC controlado

## Checklist pré

- [ ] Preview: suporte não enterra face hero
- [ ] Envelope + brim se base pequena
- [ ] Draft controlado (warp vs emissões)
- [ ] Cupom de detalhe (orelha/espada) se job &gt; 4 h

## Sinais de falha

| Sintoma | Ação |
|---|---|
| Detalhe “derrete” | ↓ temp um passo / ↑ cooling / ↓ speed parede |
| Stringing no rosto | retrátil/úmido — secar; não só “mais temp” |
| Cicatriz profunda | retipar suporte; reorientar |

## Alternativas

- Imprimir em partes + pino ([tolerâncias](../06-design-para-impressao-3d/tolerancias-e-encaixes-fff.md))
- Migrar para resina se FFF esgotou

## Fontes / segurança

- [NIOSH](../22-fontes/niosh-additive-manufacturing.md) para emissões
- Legado: [projeto/proposito/miniaturas.md](../projeto/proposito/miniaturas.md), [organicos-e-miniaturas](../projeto/geometria/organicos-e-miniaturas.md)
