---
id: surface.pei
title: Placa PEI (build surface) em FFF
summary: PEI (polieterimida) como revestimento de mesa é a superfície de trabalho
  padrão em muitas FFF desktop, inclusive a A1 Mini com placa magnética. Texturizada
  (textured) e lisa (smooth) mudam adesão, acabamento da face de mesa e risco de soldagem
  — especialmente com PETG. Limpeza e remoção a frio protegem o coating; temperatura
  de mesa na A1 Mini não ultrapassa 80 °C (capability do fabricante).
doc_type: component
domain:
- hardware
- fff
- process
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
- abs-asa-default-on-a1-mini
- hot-yank-petg-from-smooth-pei
materials:
- material.pla
- material.petg
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
- material.pla
- material.petg
- process.fff.first-layer
- defect.fff.adhesion-failure
- defect.fff.warping
- printer.bambu-lab-a1-mini
prerequisites:
- tech.fff
supersedes: []
aliases_pt_br:
- placa PEI
- mesa PEI
- build plate PEI
aliases_en:
- PEI sheet
- PEI build plate
- smooth PEI
- textured PEI
tags:
- pei
- build-surface
- adhesion
- fff
---
# Placa PEI (build surface) em FFF

Hub pai: [Componentes e hardware](INDEX.md)

## O que é

**PEI** (*polyetherimide*) é um polímero de engenharia usado como **revestimento de mesa** (folha ou coating sobre base metálica/magnética). Em FFF, a peça gruda no PEI por combinação de temperatura, molhabilidade do primeiro cordão e geometria de contato — não por “cola mágica”.

Na [A1 Mini](../21-impressoras/bambu-lab-a1-mini.md) o ecossistema usa placa magnética com PEI; o bed aquecido tem **máximo oficial 80 °C** ([tech specs](../22-fontes/bambu-a1-mini-tech-specs.md)).

## Quando importa

- Escolher smooth vs textured para PLA/PETG
- Diagnóstico de falha de adesão na camada 1
- Peça “soldada” na placa ou coating arrancado
- Acabamento da face que toca a mesa

## Smooth vs textured (decisão)

| Critério | Textured (fosca/rugosa) | Smooth (lisa) |
|---|---|---|
| Adesão típica PLA | boa com limpeza | boa; às vezes “cola demais” |
| PETG | **preferida** — menos soldagem | alto risco de soldar / danificar coating |
| Face de mesa | textura transferida (matte) | espelho / semigloss |
| Remoção | geralmente mais fácil | frequentemente exige esfriar bem |
| Diagnóstico visual | esconde micro-imperfeições | revela squish e zebra |

**Regra desta base (A1 Mini + PETG):** preferir placa **texturizada**; se só houver smooth, remova a peça **fria** e aceite risco residual de dano — ver [PETG](../05-materiais/fff/petg.md).

## Limpeza (ordem prática)

1. **Segurança:** mesa quente — não tocar; deixe esfriar antes de lavar fora da máquina se o procedimento exigir remoção.
2. Resíduos sólidos: remova delicadamente; não use lâminas agressivas contra o coating.
3. Oleosidade / impressões digitais: detergente neutro + água, secar bem; IPA (isopropanol) para filme oleoso residual — **validar** compatibilidade com o revestimento do fabricante da placa.
4. Evitar: acetona agressiva, esponja de aço, spray de “adesão permanente” como hábito (mascara causa-raiz).
5. Após transporte, troca de placa ou falhas repetidas: limpar **antes** de culpar temperatura ou Z.

Sintoma de placa suja: primeira camada “pula”, buracos locais, adesão irregular — ver [primeira camada](../10-processo-de-impressao/fff/primeira-camada.md) e [falha de adesão](../12-problemas-e-diagnostico/fff/falha-adesao-primeira-camada.md).

## Risco de soldagem PETG

PETG pode **aderir tão forte** ao PEI liso que a remoção arranca o coating ou deforma a peça. Mitigações (decidir na ordem):

1. Usar **textured** quando disponível.
2. Remover **após esfriar** (contração ajuda a soltar).
3. Não forçar a quente com alicate na folha.
4. Bed no range do material, cap **≤ 80 °C** ([tech specs A1 mini](../22-fontes/bambu-a1-mini-tech-specs.md)) na A1 Mini — subir bed “além do necessário” não é alavanca ilimitada nesta máquina.
5. Se soldou: esfriar, flexionar a base magnética (se o design permitir) com cuidado; se o coating falhou, trocar a folha — não improvisar com cola permanente como “solução”.

PLA raramente solda com a mesma agressividade, mas over-squish + smooth suja/limpa errado ainda danifica superfície.

## A1 Mini — constraints que mudam a receita

| Constraint | Implicação |
|---|---|
| Bed max **80 °C** ([tech specs A1 mini](../22-fontes/bambu-a1-mini-tech-specs.md)) | Receitas de outros printers com bed 90–110 °C **não** transferem |
| Ideal: PLA, PETG, TPU, PVA | PEI + esses materiais é o caminho suportado pelo fabricante |
| Frame aberto | Corrente de ar fria a mesa “fria localmente” → adesão irregular; não é falha do PEI |
| Volume 180³ mm | Brim/raft consomem envelope — planejar margem |

Fonte de capabilities: [bambu-a1-mini-tech-specs](../22-fontes/bambu-a1-mini-tech-specs.md).

## O que a placa resolve / não resolve

**Resolve (com processo):** interface de adesão previsível para PLA/PETG; face de mesa consistente.
**Não resolve:** Z alto sistemático, under-extrusion, filamento úmido, draft severo, geometria sem área de contato, warping tardio (após boa adesão) — ver [empenamento](../12-problemas-e-diagnostico/fff/empenamento.md).

## Manutenção e sinais de falha

| Sinal | Hipótese | Ação |
|---|---|---|
| Manchas opacas / arranhões profundos | desgaste do coating | considerar troca da folha |
| Adesão só no centro | sujeira local / temperatura / nivelamento | limpar + recalibrar assistências |
| PETG “cola e leva PEI” | smooth + remoção quente | textured + remoção fria |
| Peça descola e o head bate | adesão perdida mid-print | **parar** — risco de blob |

## Segurança

- Mesa e nozzle quentes: queimadura.
- Folha magnética: não torcer de forma a danificar ímãs ou electronics.
- Solventes: ventilação; não misturar químicos sem SDS.

## Relações

- enables → [primeira camada](../10-processo-de-impressao/fff/primeira-camada.md)
- trades-off-with → acabamento vs risco de soldagem PETG
- applies-to → [A1 Mini](../21-impressoras/bambu-lab-a1-mini.md), [PLA](../05-materiais/fff/pla.md), [PETG](../05-materiais/fff/petg.md)

## Veja também

- [Falha de adesão na primeira camada](../12-problemas-e-diagnostico/fff/falha-adesao-primeira-camada.md)
- [Ambiente em frame aberto](../10-processo-de-impressao/fff/ambiente-frame-aberto.md)

## Fontes


## Lacunas

- Átomo separado smooth vs textured com IDs `surface.pei-*`
- Procedimento oficial Bambu de troca/limpeza da placa específica (versão de hardware)
- Glue stick / liquid glue como política editorial (quando é paliativo vs ferramenta)
