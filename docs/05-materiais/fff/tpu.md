---
id: material.tpu
title: TPU (flexíveis) em FFF
summary: TPU e filamentos flexíveis produzem peças elásticas, antiderrapantes e absorvedoras
  de impacto. Na A1 Mini o fabricante lista TPU como Ideal; o extrusor direct drive
  ajuda frente a Bowden, mas velocidade alta, retração longa e bobina úmida causam
  grind, stringing e subextrusão. Shore hardness e marca não são intercambiáveis —
  ranges são ponto de partida com TDS e validação na impressora.
doc_type: material
domain:
- materials
- fff
technology:
- material-extrusion
process:
- fff
applies_to:
- fff
- printer.bambu-lab-a1-mini
- nozzle-0.4mm
- direct-drive
not_for:
- pla-speed-profiles
- tight-tolerance-as-rigid
- bowden-long-retract-copy
materials:
- material.tpu
printers:
- printer.bambu-lab-a1-mini
knowledge_status: draft
evidence_status: mixed
safety_level: caution
confidence: medium
last_reviewed: '2026-08-16'
review_cycle: 6-months
sources: []
related:
- printer.bambu-lab-a1-mini
- material.drying-storage
- setting.retraction
- defect.fff.stringing
- defect.fff.under-extrusion
prerequisites:
- tech.fff
supersedes: []
aliases_pt_br:
- TPU
- filamento flexível
- poliuretano termoplástico
aliases_en:
- TPU
- thermoplastic polyurethane
- flexible filament
tags:
- material
- tpu
- flexible
- fff
---
# TPU (flexíveis) em FFF

Hub pai: [Materiais FFF](INDEX.md)

## O que é

**TPU** (*thermoplastic polyurethane*) é família de filamentos flexíveis. Dureza Shore (ex.: 85A vs 95A), blends e pigmentos mudam fluxo, oozing e tendência a buckling no caminho. Não existe um único “perfil TPU universal”.

## Quando importa

- Pés, grips, bumpers, capas, gaxetas leves, amortecimento
- Dobradiças vivas (*living hinges*) — só com cupons de teste
- Quando rigidez de PLA/PETG é indesejada

## Quando não usar

- Encaixes dimensionais rígidos (compliance “come” tolerância)
- Torres altas finas sem suporte adequado
- Clonar velocidade/retração de PLA
- Bobina com histórico de umidade sem secar

## Compatibilidade A1 Mini

Fabricante: TPU = **Ideal** ([tech specs](../../22-fontes/bambu-a1-mini-tech-specs.md), `source.bambu-a1-mini-tech-specs`). Direct drive favorece flexíveis versus Bowden longo.

## Process window (contextual — não universal)

Partir do **preset TPU A1 Mini** no Bambu Studio (nome/campo podem mudar entre versões) e do TDS do SKU. Ajustar **uma** variável por teste.

| Parâmetro | Faixa de partida (ordem de magnitude / legado + prática) | Papel |
|---|---|---|
| Nozzle | ~210–230 °C — heurística editorial (sem fonte pinada) | Torre; marca manda |
| Bed | ~30–60 °C | Adesão sem soldar demais o PEI |
| Velocidade | bem abaixo de PLA “rápido” | Evitar buckling / click |
| Retração | mínima / curta (direct drive) | Retração longa → jam |
| Part cooling | moderado a alto conforme overhang/Shore | Trade-off sag vs string |
| Secagem | obrigatória se dúvida | Umidade mascara tudo |

Fonte operacional EN: [projeto/materiais/tpu.md](../../projeto/materiais/tpu.md). **Validar na impressora**; não tratar a tabela como gospel.

## Comportamento mecânico relevante

1. **Caminho elástico:** pressão e retração longas comprimem o filamento em vez de puxar o melt — grind e “subextrusão falsa”.
2. **Shore ≠ Shore:** 85A e 95A não compartilham o mesmo sweet spot.
3. **Anisotropia + flex:** falha ainda pode ser entre camadas; teste na orientação de uso.
4. **Primeira camada:** squish excessivo vira “panqueca” de borracha — ver [primeira camada](../../10-processo-de-impressao/fff/primeira-camada.md).

## Assinatura de falhas

| Sintoma | Hipóteses | Próximo |
|---|---|---|
| Click / grind no extrusor | velocidade, temp baixa, úmido, atrito | ↓ speed; secar; checar path |
| Stringing extremo | ooze + temp + travel | [stringing](../../12-problemas-e-diagnostico/fff/stringing.md); secar |
| Gaps / falhas de preenchimento | feed inconsistente | [subextrusão](../../12-problemas-e-diagnostico/fff/subextrusao.md) |
| Peça solta mid-print | adesão / tippy | brim; ↓ speed; first layer |

## Segurança

- Superfícies quentes; peça flexível pode grudar no nozzle se colidir
- Não afirmar food-contact / medical sem certificação de processo
- Emissões: ventilar; não declarar “seguro absoluto”

## Relações com outros conceitos

- is-a → família FFF flexível
- compatible-with → [A1 Mini](../../21-impressoras/bambu-lab-a1-mini.md) (Ideal)
- depends-on → [secagem](secagem-e-armazenamento.md), retração curta
- worsened-by → perfil PLA rápido, Bowden-length retract
- indicated-by → grind + strings + soft feed

## Veja também

- [Secagem e armazenamento](secagem-e-armazenamento.md)
- [Retração](../../08-slicers-e-configuracoes/settings/retracao.md)
- [Velocidades](../../08-slicers-e-configuracoes/settings/velocidades.md)
- Legado: [tpu.md](../../projeto/materiais/tpu.md)

## Fontes

- TDS/SDS e preset do fabricante do filamento
- Legado EN: [tpu.md](../../projeto/materiais/tpu.md)

## Lacunas

- Matriz Shore × presets por marca
- AMS Lite + TPU (fricção/tubo) — validação local pendente
- Tempos de secagem por SKU (só TDS)
