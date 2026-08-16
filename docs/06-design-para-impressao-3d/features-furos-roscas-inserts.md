---
id: "design.holes-threads-inserts"
title: "Features — furos, roscas e inserts em FFF"
summary: "Furos em FFF saem menores/ovais se mal orientados; roscas impressas funcionam em baixa carga com calculadora e cupom, mas inserts metálicos (heat-set ou press) são preferíveis para torque e ciclos. Desenhe bosses com paredes suficientes, evite suporte no furo crítico e corrija elephant foot antes de culpar o diâmetro CAD. Não use rosca impressa como substituto de fixação de segurança crítica."
doc_type: "guide"
domain: ["design", "fff"]
technology: ["material-extrusion"]
process: ["fff"]
applies_to: ["fff", "printer.bambu-lab-a1-mini", "nozzle-0.4mm", "material.pla", "material.petg"]
not_for: ["safety-critical-fasteners-without-engineering", "pipe-thread-pressure", "food-medical-seals"]
knowledge_status: "draft"
evidence_status: "mixed"
safety_level: "caution"
confidence: "medium"
last_reviewed: "2026-08-15"
review_cycle: "6-months"
sources: ["source.ellis-print-tuning-guide"]
related: ["design.tolerances-fff", "design.strength-anisotropy", "process.fff.first-layer", "quality.test-coupons", "scenario.functional-brackets"]
prerequisites: ["design.tolerances-fff"]
supersedes: []
aliases_pt_br: ["furos FFF", "roscas impressas", "insertos heat-set"]
aliases_en: ["printed holes", "printed threads", "heat-set inserts"]
tags: ["dfam", "holes", "threads", "inserts", "fff"]
---

# Features — furos, roscas e inserts em FFF

Hub pai: [Design para impressão 3D](INDEX.md)

## O que é

Features de fixação e passagem: **furos** (passantes/cegos), **roscas impressas**, **bosses**, e **inserts** metálicos (heat-set, press-fit, helicoil-like proprietários).

## Quando importa

- Montagem com parafusos M2–M5 típicos de maker
- Tampas e brackets aparafusados
- Quando a peça falha no boss ou a rosca “come” plástico

## Furos

### Regras práticas

1. Eixo do furo crítico preferencialmente no **Z** (melhor circularidade)
2. Evitar suporte **dentro** do furo de tolerância ([tolerâncias](tolerancias-e-encaixes-fff.md))
3. Diâmetro nominal CAD ≠ diâmetro efetivo: flow + wall + cooling alteram ID
4. Furos horizontais (eixo no XY): facetas de camada; considere oversize ou usinagem leve
5. Compense [primeira camada](../10-processo-de-impressao/fff/primeira-camada.md) / elephant foot se o furo nasce na base

### Heurística de oversize

Não há número universal. Imprima cupom de furos degrau (ex.: −0,1 / 0 / +0,1 / +0,2 mm vs nominal) e escolha o que passa o parafuso/pino desejado.

## Roscas impressas

| Uso | Recomendação |
|---|---|
| Protótipo, baixo torque, poucas montagens | Rosca impressa + cupom |
| Torque repetido / serviço | Insert metálico |
| Vedação / pressão | Fora do escopo hobby sem engenharia |

- Use calculadora de rosca para o passo/perfil (não inventar ângulo “de cabeça”)
- [PETG](../05-materiais/fff/petg.md) frequentemente tolera melhor que PLA em uso leve — ainda assim validar
- Orientação: eixo da rosca em Z quando possível
- Paredes ao redor da rosca: generosas (≥3–4); não “pele” de 1–2 walls

## Inserts

### Heat-set (térmico)

- Aquecer insert e pressionar no boss dimensionado para o fabricante do insert
- Temperatura/tempo: seguir datasheet do insert + TDS do polímero — **não** copiar tip viral
- PLA amolece cedo: risco de ovalizar o boss se excesso de calor
- PPE: queimadura; trabalhar em superfície estável

### Press-fit

- Requer folga negativa controlada e paredes robustas
- Risco de trinca em PLA; preferir PETG ou redesign

### Quando preferir insert

- Ciclos de montagem
- Torque de aperto real
- Peça de manutenção (desmontar sem destruir plástico)

## Boss design (checklist)

- [ ] Diâmetro externo ≥ função + paredes
- [ ] Filetes na raiz do boss (reduz concentração)
- [ ] Altura suficiente para engajamento do insert/parafuso
- [ ] Sem suporte interno no furo
- [ ] Carga alinhada com [anisotropia](resistencia-e-anisotropia.md)

## Modos de falha

| Sintoma | Hipótese | Ação |
|---|---|---|
| Parafuso não entra | ID pequeno / elephant foot | Cupom oversize; corrigir L1 |
| Rosca esfarela | Poucas paredes / PLA frágil | +walls; insert; PETG |
| Boss racha no aperto | Press/torque alto | Insert; reduzir torque; +filete |
| Insert frouxo | Furo grande / subaquecimento | Revisar datasheet; cupom de boss |

## Segurança

- Soldador/ferro de insert: risco de queimadura e fumaça — ventilar
- Não use fixação impressa em sistemas que possam ferir se falharem
- Sem claims food/medical

## Relações

- [tolerâncias e encaixes](tolerancias-e-encaixes-fff.md)
- [brackets funcionais](../16-cenarios-e-playbooks/pecas-funcionais-brackets.md)
- Legado: [encaixes-mecanicos](../projeto/geometria/encaixes-mecanicos.md)

## Lacunas

- Tabela de diâmetros de boss por fabricante de insert ainda não canônica neste repo
- Mapeamento de hole compensation por versão Bambu Studio: pendente
