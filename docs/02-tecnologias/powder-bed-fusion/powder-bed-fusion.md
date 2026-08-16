---
id: tech.powder-bed-fusion
title: Powder bed fusion (SLS, MJF, LPBF)
summary: Categoria em que regiões de um leito de pó são fundidas ou sinterizadas seletivamente.
  Inclui SLS e MJF em polímeros e LPBF/EBM em metais. Forte em geometrias complexas
  e produção; exige gestão de pó, atmosfera, tensões e pós-processamento. Não é FFF
  com ‘pó’.
doc_type: technology
domain:
- technologies
technology:
- powder-bed-fusion
process:
- sls
- mjf
- lpbf
applies_to:
- powder-bed-fusion
- sls
- mjf
- lpbf
not_for:
- desktop-fff-defaults
- resin-wash-cure-as-primary
materials: []
printers: []
knowledge_status: draft
evidence_status: mixed
safety_level: high
confidence: medium
last_reviewed: '2026-08-15'
review_cycle: 12-months
sources:
- source.iso-astm-52900-entry
- source.niosh-am-entry
related:
- fund.terminology
- fund.anisotropy
- tech.binder-jetting
prerequisites:
- fund.terminology
aliases_pt_br:
- fusão em leito de pó
aliases_en:
- powder bed fusion
- PBF
tags:
- pbf
- sls
- mjf
- lpbf
- metal
- polymer
supersedes: []
---
# Powder bed fusion (SLS, MJF, LPBF)

Hub pai: [Tecnologias](../INDEX.md) · pasta [powder-bed-fusion](INDEX.md)

## Mecanismo

Um **leito de pó** é espalhado (recoating). Energia seletiva funde ou sinteriza a seção da camada; o leito desce e o ciclo repete. O pó não fundido pode atuar como **suporte natural** (especialmente em polímeros), habilitando geometrias complexas.

Famílias comuns:

| Nome | Feedstock típico | Energia / agente |
|---|---|---|
| **SLS** | polímero (ex. PA) | laser |
| **MJF** | polímero | agentes + energia térmica (ecossistema HP) |
| **LPBF** | metal | laser em atmosfera controlada |
| **EBM / PBF-EB** | metal | feixe de elétrons (vácuo) |

## Hardware

- Câmara, recoater, sistema de pó, filtros
- Laser/óptica ou sistema de agentes
- Atmosfera inerte / vácuo em metais
- Estações de unpacking, peneira, reuso de pó (com regras de qualidade)

## Feedstock

Pós com distribuição de tamanho, morfologia e química controladas. **Reuso de pó** altera processo — seguir procedimento do OEM. Metais e polímeros não compartilham janelas nem riscos.

## Resolução / precisão / acabamento

- Acabamento típico: superfície “granulada” de pó
- Precisão depende de máquina, material, orientação, estratégia térmica e pós (jateamento, usinagem)
- Em metal, distorção e residual stress são de primeira ordem — ver conceito de [anisotropia/tensões](../../01-fundamentos/anisotropia-e-tensoes-residuais.md)

Não cite tolerâncias universais; use datasheet do sistema e metrologia do job.

## Design rules (entrada)

- Orientação para reduzir suporte (metal) ou otimizar propriedades
- Espessuras e canais: escape de pó, limpeza
- Evitar volumes fechados sem escape em metal/polímero conforme regras do processo
- Compensação de encolhimento/sinter (quando aplicável ao fluxo)

## Failure modes (entrada)

- Fusão incompleta / porosidade
- Short feed / recoating defects
- Distortion, cracking (metal)
- Orange peel / surface defects
- Contaminação de pó
- Soft cake / partial sinter inadequado (polímero)

## Pós-processamento

- Unpack e recuperação de pó
- Remoção de suporte (metal)
- Jateamento, usinagem, HIP/stress relief (metal, quando especificado)
- Tingimento (polímero SLS/MJF comum)

## Segurança

Pó fino: inalação, combustibilidade/reatividade (especialmente alguns metais), eletricidade estática, atmosfera. Controles de engenharia e procedimentos de unpacking são críticos. Ver [NIOSH AM](../../22-fontes/niosh-additive-manufacturing.md). Ambiente doméstico tipicamente **não** é adequado para PBF metálico.

Decisão de facility: se não há protocolo de atmosfera, filtragem, EPI e descarte de pó, **não** trate PBF como “upgrade do FFF”. Polímero industrial SLS/MJF ainda exige higiene de pó e controle de refresh — só muda a escala do risco versus metal reativo.

## Economia (entrada)

- Alto custo de capital; forte quando complexidade e consolidação de peças pagam o processo
- Buy-to-fly e reuso de pó influenciam custo unitário
- Lead time inclui pós e inspeção (especialmente metal)

Erro de orçamento clássico: cotar só “horas de máquina” e esquecer unpacking, refresh de pó, suporte metálico, stress relief, usinagem e NDT. Em polímero, tingimento e acabamento também alteram margem.

## Comparações (entrada)

| vs FFF | vs binder jetting |
|---|---|
| Melhor consolidação in-situ típica | Binder jet: estado verde + sinter separado |
| Pó + energia | Pó + aglutinante |
| SLS/MJF: menos suporte geométrico | Diferentes materiais e densidades finais |

## Parâmetros críticos (orientação)

Em polímero: temperatura de câmara, energia de laser/agentes, refresh de pó, orientação. Em metal: potência/velocidade/hatch (OEM), atmosfera, preheat, estratégia de suporte e tratamento térmico. **Nenhum desses números é universal** — use procedimento do sistema.

## Navegação nesta base

- Polímeros: [SLS e MJF](sls-mjf-polimeros.md)
- Metais: [LPBF e EBM](lpbf-ebm-metais.md)
- Comparativo amplo: [comparação entre categorias](../comparacao-entre-categorias.md)

## Relações

- related → [binder jetting](../binder-jetting/binder-jetting.md), [terminologia](../../01-fundamentos/terminologia-manufatura-aditiva.md)
- incompatible-with → settings de filamento

## Fontes

- [source.iso-astm-52900-entry](../../22-fontes/iso-astm-52900-entry.md)
- [source.niosh-am-entry](../../22-fontes/niosh-additive-manufacturing.md)

## Lacunas

- Política de reuso de pó unificada
- Checklist de inspeção CT/ensaio para metal
- Mapa de normas ASTM de PBF por feedstock
