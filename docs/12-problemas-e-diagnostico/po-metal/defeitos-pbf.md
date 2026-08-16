---
id: defect.pbf
title: Defeitos em powder bed fusion (polímero e metal)
summary: 'Defeitos em PBF agrupam modos de falha de leito (espalhamento), fusão (energia
  insuficiente/excessiva), tensão residual, contaminação de pó e pós-processamento.
  Em polímeros (SLS/MJF): soft cake, warpage, fusão incompleta, variação por refresh.
  Em metais (LPBF/EBM): lack of fusion, keyhole porosity, cracking, balling, spatter.
  Esta página é matriz de diagnóstico de engenharia — não calibração de laser nem
  liberação de peça crítica.'
doc_type: troubleshooting
domain:
- troubleshooting
- metals
- polymers
technology:
- powder-bed-fusion
process:
- sls
- mjf
- lpbf
- ebm
applies_to:
- powder-bed-fusion
not_for:
- fff-warping-only
- resin-print-failures
knowledge_status: draft
evidence_status: mixed
safety_level: critical
confidence: medium
last_reviewed: '2026-08-15'
review_cycle: 12-months
sources:
- source.niosh-am-entry
- source.iso-astm-52900-entry
related:
- hub.problemas.po-metal
- tech.sls-mjf
- tech.lpbf-ebm
- material.powder-feedstocks
- post.depowdering-metal
- hazard.metal-powder
prerequisites:
- tech.lpbf-ebm
supersedes: []
aliases_pt_br:
- defeitos PBF
- porosidade LPBF
- falha de fusão
- lack of fusion
aliases_en:
- PBF defects
- lack of fusion
- keyholing
- balling
- spatter
tags:
- pbf
- defects
- metal
- polymer
symptom_tags:
- porosity
- lack-of-fusion
- crack
- surface-rough
- warp-cake
cause_tags:
- energy-density
- powder-quality
- atmosphere
- scan-strategy
- thermal-stress
---
# Defeitos em powder bed fusion

Hub pai: [Problemas — pó/metal](./INDEX.md)

## Resumo de emergência

1. **Segurança:** vapores, pó residual, peça quente — PPE e procedimento de unpack antes de “inspecionar de perto”
2. Classifique: problema de **leito/pó**, **fusão**, **tensão/geometria** ou **pós**
3. Não altere energia, atmosfera e PSD ao mesmo tempo
4. Peça estrutural/crítica: isole lote, registre parâmetros, escale a qualidade — não “tente mais um tweak”

## Assinaturas comuns

| Assinatura | Família provável |
|---|---|
| Poros arredondados / cadeia de poros | gás / keyhole / umidade |
| Lacunas irregulares entre trilhas | lack of fusion / energia baixa / hatch |
| Rachaduras | tensão, liga crack-sensitive, HT ausente |
| Superfície com esferas | balling |
| Streaks no leito | recoater / PSD / umidade |
| Empeno após cool-down (polímero) | gradiente térmico / cake |

## Polímeros (SLS/MJF)

| Defeito | Causas plausíveis | Testes baratos → caros |
|---|---|---|
| Fusão incompleta / friável | energia, refresh, umidade | cupom densid.; revisar lotes de pó |
| Warpage / curl | câmara, orientação, geometria | reorientar; revisar cool-down |
| Superfície irregular | PSD, aging, contaminante | peneira; virgem controlado |
| Dimensional off | shrink/compensação OEM | metrologia vs nominal |

Detalhe de processo: [SLS/MJF](../../02-tecnologias/powder-bed-fusion/sls-mjf-polimeros.md).

## Metais (LPBF/EBM)

| Defeito | Mecanismo (resumo) | Notas |
|---|---|---|
| **Lack of fusion** | energia insuficiente / hatch largo / spatter bloqueando | poros irregulares, redução de fadiga |
| **Keyhole porosity** | energia excessiva → colapso de cavidade de vapor | poros mais arredondados |
| **Balling** | instabilidade de melt pool | superfície ruim |
| **Cracking** | tensão + metalurgia | pode exigir pré-aquecimento/HT/mudança de liga |
| **Spatter / inclusions** | ejeção e re-deposit | incluir NDE se crítico |
| **Distorção** | tensão residual | suporte, orientação, stress relief |

Processo: [LPBF/EBM](../../02-tecnologias/powder-bed-fusion/lpbf-ebm-metais.md).

## Cause matrix (ordem típica de investigação)

| Ordem | Verificar | Por quê |
|---|---|---|
| 1 | Atmosfera / O₂ (metal) / vácuo (EBM) | muda fusão e oxidação |
| 2 | Qualidade e lote do pó | PSD, umidade, contaminação |
| 3 | Recoater / streaks | defeito se propaga em Z |
| 4 | Energia / speed / hatch (OEM) | só com cupons e doc |
| 5 | Scan strategy / suporte | tensão e overheating local |
| 6 | Pós (HT/HIP) | pode mascarar ou revelar |

## Árvore de decisão (simplificada)

```text
Peça metálica com poros na CT/corte?
  ├─ Poros irregulares entre trilhas → suspeitar lack of fusion
  ├─ Poros arredondados em zona de alta energia → suspeitar keyhole / gás
  └─ Rachadura + geometria engessada → tensão / HT / suporte
Polímero friável / delamina?
  ├─ Pó úmido ou refresh extremo → feedstock
  └─ Energia/câmara fora do SOP OEM → processo
```

## O que não misturar

- Não compare numericamente “energia” entre máquinas sem normalização
- Não aplique correção de warping FFF (brim/bed) a PBF metal
- Não declare peça médica/aero OK sem NDE e plano de qualidade

## Validação

Cupons densitometria/Arquimedes ou CT; ensaios mecânicos com orientação declarada; repetibilidade em 3 builds quando o custo permitir.

## Prevenção

SOP de pó, calibração de óptica/recoater conforme OEM, design for support/removal, stress relief planejado.

## Fontes

- [source.niosh-am-entry](../../22-fontes/niosh-additive-manufacturing.md)
- [source.iso-astm-52900-entry](../../22-fontes/iso-astm-52900-entry.md)

## Lacunas

- Galeria visual própria e critérios numéricos de porosidade por setor: ausentes
- Defeitos específicos MJF vs SLS ainda não separados em páginas
