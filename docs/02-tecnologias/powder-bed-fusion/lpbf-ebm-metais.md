---
id: tech.lpbf-ebm
title: LPBF e EBM — powder bed fusion de metais
summary: 'LPBF (Laser Powder Bed Fusion; também chamado SLM/DMLS no mercado) e EBM
  (Electron Beam Melting) fundem seletivamente pó metálico em leito. LPBF usa laser
  sob atmosfera controlada (tipicamente argônio/nitrogênio); EBM usa feixe de elétrons
  em vácuo, com leito pré-aquecido elevado. Ambos produzem peças densas para aeroespacial,
  médico e tooling, mas exigem facility qualificada: controle de O₂, manuseio de pó
  combustível/reativo, suporte metálico, stress relief, HIP/usinagem conforme requisito.
  Esta página é visão de engenharia parcial — não é procedimento de operação nem…'
doc_type: technology
domain:
- technologies
- metals
technology:
- powder-bed-fusion
process:
- lpbf
- ebm
applies_to:
- powder-bed-fusion
- metal-powder
not_for:
- fff-filament
- polymer-sls-as-metal
- garage-metal-pbf
knowledge_status: draft
evidence_status: mixed
safety_level: critical
confidence: medium
last_reviewed: '2026-08-15'
review_cycle: 12-months
sources:
- source.iso-astm-52900-entry
- source.niosh-am-entry
- source.epa-3d-printing-research
related:
- hub.tech.powder-bed-fusion
- tech.sls-mjf
- material.powder-feedstocks
- defect.pbf
- post.depowdering-metal
- hazard.metal-powder
- tech.ded-waam
prerequisites:
- hub.tech.powder-bed-fusion
- hazard.metal-powder
supersedes: []
aliases_pt_br:
- LPBF
- SLM
- DMLS
- EBM
- fusão a laser de leito de pó
- fusão por feixe de elétrons
aliases_en:
- LPBF
- Laser Powder Bed Fusion
- SLM
- DMLS
- EBM
- Electron Beam Melting
tags:
- lpbf
- ebm
- metal
- powder-bed-fusion
- safety-critical
---
# LPBF e EBM — powder bed fusion de metais

Hub pai: [Powder bed fusion](./INDEX.md)

## Precedência de segurança

Antes de qualquer discussão de qualidade: leia [Pós metálicos e risco de explosão](../../15-seguranca-e-meio-ambiente/pos-metais-e-risco-explosao.md). Pós de alumínio, titânio e ligas reativas **não** são hobby seguro em ambiente doméstico.

## O que é

| Processo | Fonte de energia | Ambiente típico | Notas |
|---|---|---|---|
| **LPBF** | Laser de fibra | Atmosfera inerte (Ar/N₂) | Mercado: SLM, DMLS, metal PBF |
| **EBM** | Feixe de elétrons | Alto vácuo | Leito frequentemente pré-aquecido a alta T |

Categoria pai: powder bed fusion (ISO/ASTM). Nomes comerciais **não** criam categorias novas.

## Princípio físico (resumo)

1. Camada de pó metálico espalhada
2. Energia funde trilhas segundo scan strategy
3. Solidificação rápida gera microestrutura característica e tensões residuais
4. Ciclo repete até a altura da peça
5. Remoção de pó + corte de suportes + tratamentos térmicos / HIP / usinagem conforme especificação

## Fluxo típico (industrial)

build prep → atmosphere/vacuum check → print → cool → unpack em condições controladas → depowder → stress relief (quando requerido) → suporte off → HIP/HT (se especificado) → usinagem/NDE → liberação.

## Materiais (entrada)

Aços inoxidáveis, superligas Ni, Ti-6Al-4V, AlSi10Mg e outras — **somente** com pó homologado para a máquina. PSD (distribuição granulométrica), esfericidade, umidade e oxigênio intersticial importam. Ver [feedstocks](../../05-materiais/po/feedstocks-polimeros-e-metais.md).

## Forças e limitações

| Forças | Limitações |
|---|---|
| Geometrias internas / lattice | Custo e facility exigentes |
| Densidade alta com processo maduro | Tensões residuais e distorção |
| Peças near-net-shape | Suportes metálicos difíceis de remover |
| Cadeia aeroespacial/médica existente | Qualificação longa e cara |

## LPBF vs EBM (heurística de engenharia)

| Aspecto | LPBF | EBM |
|---|---|---|
| Resolução/acabamento fino | frequentemente favorável | tipicamente mais rugoso |
| Tensões / pré-aquecimento | depende; muitas vezes precisa HT | pré-aquecimento alto pode reduzir crack em algumas ligas |
| Atmosfera | gás inerte | vácuo |
| Escopo | amplo em OEMs | menos plataformas; forte em certas aplicações Ti |

Sem números de energia/velocidade inventados — usar parâmetros do OEM e cupons.

## Design e orientação

- Orientar para reduzir suporte em faces críticas e controlar anisotropia
- Considerar escape de pó e acesso a canais
- Espessuras mínimas e overhangs: seguir design guide do sistema, não regras FFF

## Defeitos

Lack of fusion, keyholing/porosidade por excesso de energia, balling, crack por tensão, spatters, inclusions. Ver [defeitos PBF](../../12-problemas-e-diagnostico/po-metal/defeitos-pbf.md).

## Pós-processamento

[Depowdering e pós-metal](../../14-pos-processamento/depowdering-e-pos-metal.md)

## Comparação com DED

[DED e WAAM](../directed-energy-deposition/ded-e-waam.md) depositam material com feed contínuo — melhor para reparo/grande porte, tipicamente menor resolução que LPBF.

## Fontes

- [source.iso-astm-52900-entry](../../22-fontes/iso-astm-52900-entry.md)
- [source.niosh-am-entry](../../22-fontes/niosh-additive-manufacturing.md)
- [source.epa-3d-printing-research](../../22-fontes/epa-3d-printing-research.md)

## Lacunas

- Parâmetros por liga/máquina não catalogados
- NDE (CT, UT) e critérios de aceitação por setor ainda não detalhados
- Qualificação médico/aeroespacial: ver [limites de qualificação](../../18-aplicacoes-e-regulacao/limites-de-qualificacao.md)
