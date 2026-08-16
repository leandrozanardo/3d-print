---
id: material.pla
title: PLA (ácido poliláctico) em FFF
summary: 'PLA é a família de filamento de menor barreira de entrada em FFF desktop:
  boa adesão em PEI, baixo empenamento relativo, alta tolerância a cooling e excelente
  para detalhe cosmético. É anisotrópico, amolece em temperaturas modestas e não é
  automaticamente food-safe nem estruturalmente certificado. Na A1 Mini é o material
  primário com nozzle 0,4 mm e Bambu Studio.'
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
not_for:
- sustained-heat-above-softening
- food-contact-without-certification
- chemical-tanks
materials:
- material.pla
printers:
- printer.bambu-lab-a1-mini
knowledge_status: draft
evidence_status: mixed
safety_level: caution
confidence: medium
last_reviewed: '2026-08-15'
review_cycle: 6-months
sources: []
related:
- material.petg
- process.fff.first-layer
- defect.fff.warping
- printer.bambu-lab-a1-mini
prerequisites:
- tech.fff
aliases_pt_br:
- PLA
- poliácido láctico
- ácido poliláctico
aliases_en:
- PLA
- polylactic acid
tags:
- material
- pla
- fff
supersedes: []
---
# PLA (ácido poliláctico) em FFF

Hub pai: [Materiais](../INDEX.md) · Família FFF

## O que é

**PLA** (*polylactic acid*) é um poliéster termoplástico amplamente usado como filamento FFF. “PLA” é **família**; variantes (PLA+, Matte, Silk, High Speed, Tough) e produtos de marca são formulações distintas — aditivos e pigmentos alteram janela de processo, abrasividade e estética.

## Quando importa

- Peças decorativas, miniaturas, prototipagem rápida em ambiente ambiente
- Necessidade de overhangs com cooling alto
- Quando PETG seria overkill ou pior cosmético

## Quando não usar (ou usar só com ressalvas)

- Carga térmica contínua perto/acima da faixa de amolecimento típica de PLA de consumo (ordem ~55–60 °C é citação recorrente de prática — **não** é Tg medida deste SKU; validar TDS do produto)
- Impacto estrutural crítico sem ensaio
- Contato alimentar / médico sem processo e certificação aplicáveis
- Exterior UV prolongado sem validação

## Compatibilidade A1 Mini

O fabricante lista PLA como **Ideal** nas [tech specs](../../22-fontes/bambu-a1-mini-tech-specs.md). Frame aberto: evitar jato de ar-condicionado na peça.

## Process window (contextual — não universal)

Faixas herdadas do corpus operacional do projeto e de prática Bambu Studio; **subordinar ao perfil do filamento e validar na impressora**:

| Parâmetro | Faixa de partida (projeto) | Papel |
|---|---|---|
| Nozzle | 190–220 °C (presets Bambu frequentemente ~220 °C) | Ponto inicial; marca/cor variam |
| Bed | 35–60 °C (ordem ~55 °C comum) | Adesão vs elephant foot |
| Part cooling | alto após camadas iniciais | Overhangs; reduzir se Z-bond fraco |
| Retract (direct drive) | ordem 0,4–1,2 mm | Validar; não inventar |

Fonte operacional detalhada (EN): [projeto/materiais/pla.md](../../projeto/materiais/pla.md).

## Comportamento mecânico relevante

1. **Anisotropia:** tração no eixo Z (entre camadas) costuma falhar antes da XY.
2. **Paredes vs infill:** para resistência, paredes adicionais frequentemente vencem infill esparso denso (heurística; validar geometria).
3. **Umidade:** moderadamente higroscópico; bobina aberta em clima úmido degrada superfície/stringing.

## Assinatura de falhas (PLA)

| Sintoma | Hipóteses iniciais | Próximo nó |
|---|---|---|
| Não gruda camada 1 | sujeira PEI, Z alto, bed frio, velocidade | [Primeira camada](../../10-processo-de-impressao/fff/primeira-camada.md) |
| Cantos sobem depois | warp + draft + flat longo | [Empenamento](../../12-problemas-e-diagnostico/fff/empenamento.md) |
| Stringing | úmido, temp alta, retract | [stringing](../../12-problemas-e-diagnostico/fff/stringing.md) |
| Quebra frágil | geometria + impacto + Z load | orientar carga; considerar PETG |

## Segurança

- Não afirmar “PLA é seguro”
- Emissões existem; ventilação importa em espaços fechados (página dedicada = lacuna)
- Superfícies quentes

## Relações com outros conceitos

- is-a → família de material FFF
- compatible-with → [A1 Mini](../../21-impressoras/bambu-lab-a1-mini.md)
- trades-off-with → [PETG](petg.md) (facilidade vs toughness/calor)
- indicated-by sintomas → primeira camada / warping
- conflicts-with → claims food-safe sem evidência

## Veja também

- [PETG](petg.md)
- [Playbook vertical](../../16-cenarios-e-playbooks/a1-mini-pla-petg-primeira-camada-empenamento.md)
- Tabela de temperaturas legada: [tabela-temperaturas-a1-mini](../../projeto/materiais/tabela-temperaturas-a1-mini.md)

## Fontes

- [source.bambu-a1-mini-tech-specs](../../22-fontes/bambu-a1-mini-tech-specs.md) (compatibilidade Ideal)
- TDS/SDS do SKU específico — **obrigatório** antes de claims de produto
- Corpus legado: [pla.md](../../projeto/materiais/pla.md)

## Lacunas / open questions

- Tg/HDT medidos por SKU
- Página de variantes PLA+/Silk/HS
- Emissões quantitativas por filamento
