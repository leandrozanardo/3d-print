---
id: fund.wetting-first-layer
title: Adesão, molhabilidade e primeira camada
summary: 'Adesão da first layer em FFF é fenômeno de superfície: o cordão quente precisa
  molhar a build surface (ex.: PEI) e solidificar sob geometria controlada (squish).
  Limpeza, distância Z, temperatura local, velocidade e área de contato dominam —
  não ‘cola mágica’ universal. Distingue adesão mesa↔peça de união camada↔camada.
  Conceitual; setpoints vêm do perfil/TDS e validação.'
doc_type: concept
domain:
- fundamentals
- fff
- adhesion
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
- universal-glue-recipes
- food-contact-surface-claims
materials:
- material.pla
- material.petg
printers:
- printer.bambu-lab-a1-mini
knowledge_status: draft
evidence_status: mixed
safety_level: caution
confidence: medium
last_reviewed: '2026-08-15'
review_cycle: 12-months
sources:
- source.ellis-print-tuning-guide
- source.teaching-tech-calibration
related:
- process.fff.first-layer
- fund.heat-transfer-fff
- surface.pei
- defect.fff.warping
- firmware.bed-mesh-z-offset
prerequisites:
- tech.fff
supersedes: []
aliases_pt_br:
- molhabilidade primeira camada
- adesão à mesa
- wetting FFF
aliases_en:
- first layer wetting
- bed adhesion fundamentals
- build surface wettability
tags:
- fundamentals
- adhesion
- first-layer
- fff
---
# Adesão, molhabilidade e primeira camada

Hub pai: [Fundamentos](INDEX.md)

## O que é

**Molhabilidade** (*wetting*) descreve se o polímero fundido espalha e faz contato íntimo com a superfície da mesa (ou raft). **Adesão** é o resultado mecânico/térmico desse contato após o resfriamento inicial: a peça resiste a forças de peel, shear e contração sem soltar.

A **primeira camada** é o momento em que molhabilidade e geometria do cordão (largura, altura, “squish”) decidem se o job nasce estável. Processo operacional detalhado: [primeira camada](../10-processo-de-impressao/fff/primeira-camada.md).

## Dois tipos de “adesão” (não misturar)

| Tipo | Interface | Falha típica |
|---|---|---|
| Mesa ↔ peça | Build surface / PEI ↔ first layer | Peel, spaghetti, cantos levantam cedo |
| Camada ↔ camada | Cordão N ↔ N+1 | Delaminação, Z fraco no meio da peça |

Corrigir bonding Z com “mais cola na mesa” é erro de categoria. Térmica: [transferência de calor](transferencia-de-calor-fff.md).

## Condições necessárias (checklist conceitual)

1. **Superfície limpa e adequada** — óleos, poeira e resíduos de cola improvisada alteram wetting; ver [placa PEI](../04-componentes-e-hardware/placa-pei-fff.md).
2. **Distância Z / mesh / offset coerentes** — cordão longe demais não molha; perto demais esmaga e gera elephant foot — [bed mesh e Z-offset](../17-software-firmware-e-automacao/bed-mesh-e-z-offset.md).
3. **Energia térmica local suficiente** — nozzle + mesa no contexto do material; sem inventar tetos.
4. **Tempo de contato** — first layer lenta demais demais é raramente o problema; rápida demais impede molhar.
5. **Área e geometria de contato** — ilhas mínimas, cantos vivos e bases longas aumentam risco; brim/raft são muletas geométricas, não cura de sujeira.
6. **Ambiente estável** — draft frio na first layer em frame aberto piora peel.

## Sinais visuais (heurística, não métrica universal)

| Observação | Interpretação frequente |
|---|---|
| Linhas se “beijam”, sem buracos nem panqueca grossa | Squish plausível |
| Cordões redondos, soltos, com vão | Z alto / flow baixo / velocidade alta |
| Base translúcida excessiva, bordas esmagadas | Z baixo / over-squish |
| Centro OK, cantos soltam depois | Mais warp/tensão do que “nunca grudou” — [empenamento](../12-problemas-e-diagnostico/fff/empenamento.md) |

## Alavancas (ordem segura)

1. Limpeza e estado da placa
2. Homing / leveling / mesh / Z (via fluxo recomendado do fabricante)
3. Velocidade e altura da first layer no preset
4. Temperatura de mesa/nozzle **dentro** do range do material e da máquina
5. Brim / skirt / raft só após 1–4
6. Mudança de material ou split de peça se a geometria for hostil

## O que não fazer

- Afirmar que um spray/cola caseira “resolve qualquer PEI”
- Subir temperatura sem limite “porque adesão” — [mito](../20-pesquisa-e-mitos/mito-mais-temp-mais-adesao-absoluto.md)
- Tratar falha no meio da peça como first-layer adhesion
- Declarar superfície FFF como food-contact limpa — [claims](../15-seguranca-e-meio-ambiente/claims-food-contact-e-medico.md)

## Relação com A1 Mini

Materiais Ideal (PLA, PETG, TPU, PVA nas [tech specs](../22-fontes/bambu-a1-mini-tech-specs.md)) + PEI texturizada/lisa conforme placa em uso. Preferir calibrações e fluxos oficiais do ecossistema Bambu; não inventar procedimentos proprietários não documentados nesta base.

## Relações

- enables → jobs longos, brim efetivo, menos falso “warp”
- depends-on → superfície, Z, térmica local
- related → [processo first layer](../10-processo-de-impressao/fff/primeira-camada.md)

## Fontes

- [source.ellis-print-tuning-guide](../22-fontes/ellis-print-tuning-guide.md)
- [source.teaching-tech-calibration](../22-fontes/teaching-tech-calibration.md)

## Lacunas

- Fotos de referência de squish no projeto: pendentes
- Comparação sistemática PEI lisa vs texturizada por material: aberta
