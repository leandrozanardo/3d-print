---
id: process.fff.first-layer
title: Primeira camada (first layer) em FFF
summary: A primeira camada determina se a peça nasce aderida com geometria correta
  na base. Falha aqui produz peels, spaghetti e falsos diagnósticos de warping. Em
  A1 Mini + PEI + PLA/PETG, priorize calibração/limpeza, squish visual (linhas se
  beijando), velocidade baixa e temperatura de mesa/nozzle no range do material —
  antes de compensações numéricas finas.
doc_type: process
domain:
- process
- fff
- quality
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
- mid-print-dimensional-error-only
- resin-first-layers
materials:
- material.pla
- material.petg
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
- defect.fff.warping
- material.pla
- material.petg
- printer.bambu-lab-a1-mini
- defect.fff.layer-shift
- defect.fff.elephant-foot
- troubleshoot.fff-symptom-index
prerequisites:
- printer.bambu-lab-a1-mini
- tech.fff
aliases_pt_br:
- primeira camada
- camada inicial
aliases_en:
- first layer
- initial layer
tags:
- first-layer
- adhesion
- fff
supersedes: []
symptom_tags:
- no-stick
- uneven-first-layer
- elephant-foot
---
# Primeira camada (first layer) em FFF

Hub pai: [Processo de impressão](../INDEX.md)

## Resumo de emergência

Se a peça **não gruda na camada 1**, não trate como empenamento. Pare, limpe a placa, confira Z/squish, reduza velocidade da first layer e só então mexe em brim/raft ou temperaturas dentro do range seguro da máquina.

## O que é

A **primeira camada** é o cordão inicial depositado sobre a build surface. Ela precisa: (1) molhar/aderir o suficiente; (2) ter espessura/largura controladas; (3) cobrir a área sem buracos nem “panqueca” excessiva.

## Quando importa

- Qualquer print FFF
- Tolerâncias de encaixe na base (elephant foot)
- Diagnóstico precoce de falhas

## Diferenciar de sintomas vizinhos

| Observação | Preferir |
|---|---|
| Nao (regra de seguranca) grudou / soltou na camada 1–3 | Esta página + adesão |
| Cantos sobem após muitas camadas, base ok | [Empenamento](../../12-problemas-e-diagnostico/fff/empenamento.md) |
| Deslocamento XY permanente | [Layer shift](../../12-problemas-e-diagnostico/fff/layer-shift.md) |
| Base alargada / furos apertados só embaixo | [Elephant foot](../../12-problemas-e-diagnostico/fff/elephant-foot.md) |
| Outros sintomas | [Índice por sintoma FFF](../../12-problemas-e-diagnostico/fff/indice-por-sintoma.md) |

## Facts a coletar

1. Material / marca / seco?
2. Placa (textured vs smooth) e limpeza
3. Live Z / resultado da calibração automática
4. First layer height / speed / bed / nozzle no Studio
5. Corrente de ar no frame aberto
6. Foto do squish (opcional mas poderoso)

## Critérios visuais (heurística)

- **Bom:** linhas se tocam (“kiss”), sem vales profundos nem transparência por falta de material
- **Z alto:** cordões redondos, buracos, peel
- **Z baixo / over-squish:** base muito espalhada → elephant foot / danos à placa em excessos extremos

Métodos gerais de calibração: [Ellis](../../22-fontes/ellis-print-tuning-guide.md), [Teaching Tech](../../22-fontes/teaching-tech-calibration.md) — adaptar ao Bambu Studio; não copiar números de outro firmware como verdade.

## Procedimento ordenado (A1 Mini + PLA/PETG)

1. **Segurança:** bed/hotend quentes — não tocar.
2. Lavar PEI (detergente neutro; IPA se oleosidade — validar revestimento).
3. Rodar calibração/assistências do ecossistema após transporte ou troca de placa.
4. First layer **lenta** (legado operacional: ordem 20–40 mm/s; PLA frequentemente 25–35; PETG 20–30) — **validar na impressora**.
5. First layer height tipicamente ≥ layer height de trabalho (ex.: 0,20–0,28 mm com nozzle 0,4) — ponto de partida do [legado](../../projeto/qualidade-e-acabamento/elephant-foot-e-primeira-camada.md).
6. Bed no range do material; na A1 Mini **≤ 80 °C** ([tech specs](../../22-fontes/bambu-a1-mini-tech-specs.md)).
7. Observar as primeiras passadas; abortar cedo se falhar (economiza spaghetti).
8. Só depois: brim, elephant foot compensation (ordem 0–0,2 mm se encaixes críticos), ajustes finos de temp.

## PLA vs PETG (primeira camada)

| Aspecto | PLA | PETG |
|---|---|---|
| Adesão PEI | geralmente fácil | pode soldar no smooth |
| Bed partida | ~35–60 °C | ~70–80 °C (respeitar teto da máquina) — ponto de partida de bancada; sem fonte pinada |
| Cooling inicial | baixo nas primeiras camadas | manter baixo por mais tempo |
| Placa | smooth ou textured | textured preferida |

## O que não mudar junto

Não altere simultaneamente Z offset, bed temp, first layer speed e flow. Uma variável por experimento em geral (condicional) que possível.

## Validação

Cupom pequeno (cupom pequeno (ordem de poucos centímetros) — tamanho ilustrativo; sem fonte pinada) antes da peça crítica. Encaixes: cupom de fit — aparência ≠ metrologia.

## Relações com outros conceitos

- requires → superfície limpa + nozzle/bed coerentes
- diagnosed-by → inspeção visual da first layer
- contributes-to → sucesso ou falha de [empenamento](../../12-problemas-e-diagnostico/fff/empenamento.md)
- worsened-by → draft, placa suja, velocidade alta
- fixed-by → limpeza, recalibração, ↓ speed, temp no range

## Veja também

- [Empenamento](../../12-problemas-e-diagnostico/fff/empenamento.md)
- [A1 Mini](../../21-impressoras/bambu-lab-a1-mini.md)
- Legado adesão: [a1-mini-mesa-e-adesao](../../projeto/hardware/a1-mini-mesa-e-adesao.md) · [falha-adesao](../../projeto/troubleshooting/falha-adesao.md)

## Fontes

- [Ellis Print Tuning Guide](../../22-fontes/ellis-print-tuning-guide.md)
- [Teaching Tech Calibration](../../22-fontes/teaching-tech-calibration.md)
- [Bambu A1 mini tech specs](../../22-fontes/bambu-a1-mini-tech-specs.md)
- Legado: [elephant-foot-e-primeira-camada](../../projeto/qualidade-e-acabamento/elephant-foot-e-primeira-camada.md)

## Lacunas

- Página atômica só de elephant foot
- Paths exatos de UI Bambu Studio pinados por versão
- Procedimento oficial Bambu de live Z se publicado em página específica
