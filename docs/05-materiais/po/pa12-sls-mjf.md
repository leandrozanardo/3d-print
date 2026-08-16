---
id: material.pa12-sls-mjf
title: PA12 para SLS e MJF
summary: 'PA12 (poliamida 12) é o feedstock polimérico mais citado em powder bed fusion
  industrial (SLS e MJF). Orientação de engenharia: quando escolher PA12, o que muda
  entre SLS e MJF em termos de processo/acabamento, controles de pó (umidade, refresh/virgin),
  anisotropia e pós (depowdering, tingimento). Não inventa percentuais de refresh,
  temperaturas de câmara nem propriedades mecânicas universais — use certificado de
  lote, TDS da plataforma e especificação do OEM. Não é processo doméstico de pó.'
doc_type: material
domain:
- materials
- polymers
technology:
- powder-bed-fusion
process:
- sls
- mjf
applies_to:
- powder-bed-fusion
- polymer-powder
- pa12
not_for:
- fff-pa12-filament-as-identical
- home-diy-powder-printing
- universal-refresh-percentages
knowledge_status: draft
evidence_status: mixed
safety_level: high
confidence: medium
last_reviewed: '2026-08-15'
review_cycle: 12-months
sources:
- source.iso-astm-52900-entry
- source.niosh-am-entry
- source.epa-3d-printing-research
related:
- hub.materiais.po
- material.powder-feedstocks
- tech.sls-mjf
- defect.pbf
- post.depowdering-metal
- hazard.metal-powder
prerequisites:
- material.powder-feedstocks
- tech.sls-mjf
supersedes: []
aliases_pt_br:
- nylon 12 SLS
- PA12 MJF
- poliamida 12 pó
aliases_en:
- PA12 SLS
- PA12 MJF
- nylon 12 powder
tags:
- pa12
- sls
- mjf
- powder
- polymer
---
# PA12 para SLS e MJF

Hub pai: [Materiais em pó](INDEX.md) · overview: [feedstocks](feedstocks-polimeros-e-metais.md)

## Decisão em uma frase

Use **PA12 em SLS/MJF** quando precisar de peça funcional em nylon com geometria complexa sem suporte FFF clássico — em **facility** com controle de pó, refresh e depowdering; não como substituto drop-in de filamento PA12 em FFF.

## Segurança primeiro

Pó polimérico fino: inalação, potencial combustível, higiene de sala. Controles gerais de AM: [NIOSH](../../22-fontes/niosh-additive-manufacturing.md). Pós metálicos são outro regime ([hazard](../../15-seguranca-e-meio-ambiente/pos-metais-e-risco-explosao.md)), mas **não** trate pó de PA12 como “inofensivo doméstico”.

## O que é

- **PA12**: poliamida 12 em forma de pó AM (PSD/morfologia de processo)
- Processos típicos: [SLS e MJF](../../02-tecnologias/powder-bed-fusion/sls-mjf-polimeros.md)
- Grades: natural, filled (ex.: glass/mineral — nomes comerciais variam), FR, etc. — cada um com TDS próprio

## Quando escolher / quando não

| Escolher PA12 PBF se… | Evitar / reconsiderar se… |
|---|---|
| Geometria complexa, canais internos, nesting em volume | Precisa de superfície “FFF lisa” sem pós |
| Lote médio industrial e custo de pó justifica | Protótipo barato em PLA/PETG resolve |
| Requisito de nylon (químico/térmico relativo) alinhado ao TDS | Precisa metal / alta T contínua fora da janela PA12 |
| Há processo de refresh e rastreio de lote | Sem controle de aging do pó |

## SLS vs MJF (decisão de processo — qualitativo)

| Aspecto | SLS (visão) | MJF (visão) |
|---|---|---|
| Mecanismo | Laser sinteriza/funde seletivamente | Agentes + energia IR |
| Suporte estrutural clássico | Leito de pó apoia | Idem |
| Acabamento / cor | Frequentemente natural; tingimento comum | Fluxos OEM com agentes influenciam aparência |
| Parâmetros | OEM/máquina — não copiar entre marcas | Idem |

Não declare “MJF sempre melhor que SLS” sem requisito: custo, lead time, certificação e pós pesam mais.

## Atributos de feedstock que importam

Herdados de [feedstocks](feedstocks-polimeros-e-metais.md):

| Atributo | Impacto em PA12 |
|---|---|
| Umidade | Aglomeração, poros, superfície ruim |
| Aging / refresh | Drift de fusão e mecânica |
| Contaminantes | Inclusões, falha local |
| PSD | Espalhamento e densidade de leito |

**Refresh %**: política **OEM + material** — não inventar fração aqui.

## Design e orientação (heurísticas)

- Orientação afeta anisotropia e rugosidade de “escada”
- Evitar seções extremamente finas sem validação
- Canais: planejar depowdering (acesso de ar/jateamento)
- Tolerâncias: validar no sistema real; não copiar tabela FFF

## Pós-processamento típico

1. Cool-down da cake conforme procedimento
2. Unpack / depowdering (ver fluxos em [depowdering](../../14-pos-processamento/depowdering-e-pos-metal.md) — princípios de remoção de pó; adaptar a polímero)
3. Jateamento / tumbling (opcional)
4. Tingimento / infiltração / usinagem local conforme especificação

## Assinatura de problemas ligados ao material

| Sintoma | Hipótese ligada a PA12/pó |
|---|---|
| Superfície “sugar” / fusão incompleta | Energia/aging/umidade — ver [defeitos PBF](../../12-problemas-e-diagnostico/po-metal/defeitos-pbf.md) |
| Warpage na cake | Gradiente térmico / orientação / packing |
| Propriedade mecânica fora do lote anterior | Refresh drift / lote / orientação |

## O que esta página deliberadamente não contém

- Tabelas de UTS/módulo “universais”
- Temperatura de câmara / laser power
- Percentual mágico de virgin/refresh
- Receita de tingimento comercial

## Relações

- part-of → [feedstocks](feedstocks-polimeros-e-metais.md)
- processed-by → [SLS/MJF](../../02-tecnologias/powder-bed-fusion/sls-mjf-polimeros.md)
- diagnosed-via → [defect.pbf](../../12-problemas-e-diagnostico/po-metal/defeitos-pbf.md)
- category → [ISO/ASTM 52900 entry](../../22-fontes/iso-astm-52900-entry.md)

## Fontes

- [source.iso-astm-52900-entry](../../22-fontes/iso-astm-52900-entry.md)
- [source.niosh-am-entry](../../22-fontes/niosh-additive-manufacturing.md)
- [source.epa-3d-printing-research](../../22-fontes/epa-3d-printing-research.md)
- Contexto de processo: [tech.sls-mjf](../../02-tecnologias/powder-bed-fusion/sls-mjf-polimeros.md)

## Lacunas

- Comparativo de grades filled vs natural com dados de lote reais do time
- Playbook de refresh interno (quando existir SOP)
