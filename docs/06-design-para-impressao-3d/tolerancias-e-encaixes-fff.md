---
id: "design.tolerances-fff"
title: "Tolerâncias e encaixes em FFF"
summary: "Em FFF, tolerância dimensional não é ‘precisão CNC’: depende de nozzle, flow, elephant foot, orientação, material e resfriamento. Para encaixes (pin/hole, tampa, snap), use folgas de partida calibradas com cupom e paquímetro — tipicamente ordem 0,15–0,40 mm de folga diametral em PLA na A1 Mini com nozzle 0,4 mm — e só então loteie. Compense a primeira camada antes de culpar o CAD. Esta página não garante encaixe ‘à prova de falha’ nem substitui ensaio funcional."
doc_type: "guide"
domain: ["design", "fff", "quality"]
technology: ["material-extrusion"]
process: ["fff"]
applies_to: ["fff", "printer.bambu-lab-a1-mini", "nozzle-0.4mm", "material.pla", "material.petg"]
not_for: ["cnc-tolerance-transfer", "metal-press-fit-specs", "food-medical-seals"]
knowledge_status: "draft"
evidence_status: "mixed"
safety_level: "normal"
confidence: "medium"
last_reviewed: "2026-08-15"
review_cycle: "6-months"
sources: ["source.ellis-print-tuning-guide", "source.bambu-a1-mini-tech-specs"]
related: ["design.holes-threads-inserts", "design.strength-anisotropy", "process.fff.first-layer", "quality.accuracy-vs-precision", "quality.test-coupons"]
prerequisites: ["tech.fff", "process.fff.first-layer"]
supersedes: []
aliases_pt_br: ["tolerâncias FFF", "encaixes mecânicos FFF", "folga pin hole"]
aliases_en: ["FFF tolerances", "clearance fits", "mechanical fits"]
tags: ["dfam", "tolerances", "fff", "fits"]
---

# Tolerâncias e encaixes em FFF

Hub pai: [Design para impressão 3D](INDEX.md)

## O que é

**Tolerância** aqui é a faixa aceitável de erro dimensional + folga funcional entre peças. Em FFF o erro vem de: diametro efetivo do cordão, *elephant foot*, contração, anisotropia de resfriamento e compensações do slicer — não de um “offset universal”.

**Encaixe** (*fit*): deslizante folgado, deslizante justo, interferência leve, tampa/caixa, clip/snap.

## Quando importa

- Pinos, dobradiças, tampas, clips, bosses de parafuso
- Peças que devem montar sem lixa agressiva
- Quando o legado do projeto marca geometria `mechanical_fit`

## Quando não aplicar cegamente

- Transferir folga de metal/CNC para PLA
- Vedação food-contact ou médica (ver [claims](../15-seguranca-e-meio-ambiente/claims-food-contact-e-medico.md))
- Assumir que “0,2 mm sempre funciona” entre marcas/cores/velocidades

## Folgas de partida (heurística A1 Mini + nozzle 0,4 mm)

Valores **de partida operacional** herdados do corpus do projeto; **validar com cupom** na sua máquina/lote:

| Tipo de encaixe | Folga diametral inicial (PLA) | Nota |
|---|---|---|
| Deslizante folgado | 0,3–0,4 mm | Tolera residual de elephant foot |
| Deslizante justo | 0,15–0,25 mm | Calibrar |
| Press-fit leve | 0,05–0,15 mm | Risco de trinca; paredes ≥3–4 |
| Tampa / caixa (por lado) | ordem 0,2–0,35 mm | Validar após cooling completo |
| Rosca impressa | calculadora + cupom | Preferir insert metálico quando carga cíclica |

**PETG:** partida típica **+0,05 mm** vs PLA equivalente (superfície mais “grudenta”; heurística de projeto — medir).

Não inventar micrometros sem cupom. Ver [cupons e ensaios](../11-qualidade-e-metrologia/cupons-e-ensaios.md).

## Ordem correta (anti-loop)

1. [Primeira camada](../10-processo-de-impressao/fff/primeira-camada.md) estável (sem elephant foot excessivo)
2. Orientar eixo do furo crítico no **Z** quando possível (circularidade)
3. Evitar suporte **dentro** do furo crítico (reorientar ou redesign)
4. Imprimir cupom pin/hole com a folga candidata
5. Deixar esfriar; medir OD/ID com paquímetro
6. Ajustar folga **ou** hole compensation **uma vez**; não caçar cada peça
7. Só então produzir lote

## Geometria e paredes

- Bosses e clips: **≥ 3–4 paredes** (loops) — paredes costumam vencer infill alto cego para resistência local ([anisotropia](resistencia-e-anisotropia.md))
- Preferir carga de cisalhamento/flexão no plano **XY** quando o encaixe for estrutural
- Documentar a folga usada no `plan.md` do job

## Modos de falha

| Sintoma | Causa plausível | Próximo passo |
|---|---|---|
| Não monta | Elephant foot / folga curta / over-extrusion | Compensar Z/squish; +folga |
| Folga demais | Clearance grande / under-size do pino | −folga; checar flow |
| Boss trinca | Poucas paredes / press apertado | +paredes; afrouxar press |
| Furo oval | Eixo fora do Z / suporte no furo | Reorientar |
| Delaminação no snap | Flexão no eixo Z | Reorientar; [PETG](../05-materiais/fff/petg.md) candidato |

## Relação com precisão vs repetibilidade

Uma peça “bateu” uma vez não prova processo. Distinguir erro sistemático (bias de flow/elephant foot) de dispersão entre réplicas — [precisão vs repetibilidade](../11-qualidade-e-metrologia/precisao-vs-repetibilidade.md).

## Segurança

Ferramentas de medição e montagem forçada: evite estilhaços (press excessivo em PLA frágil). Sem claims food/medical.

## Relações

- depends-on → [primeira camada](../10-processo-de-impressao/fff/primeira-camada.md)
- related → [furos, roscas e inserts](features-furos-roscas-inserts.md), [resistência](resistencia-e-anisotropia.md)
- legado EN → [projeto/geometria/encaixes-mecanicos.md](../projeto/geometria/encaixes-mecanicos.md)

## Lacunas

- Tabela formal por marca de filamento e perfil Bambu Studio ainda não medida neste repositório
- Compensações XY específicas por versão de slicer: mapear em wave de settings
