---
id: "material.alsi10mg-lpbf"
title: "AlSi10Mg (alumínio) para LPBF — safety-critical"
summary: "AlSi10Mg é liga de alumínio fundível amplamente usada em Laser Powder Bed Fusion (LPBF/SLM/DMLS) para peças leves com geometria complexa. Esta página é orientação de engenharia e consciência de risco: pó de alumínio fino é combustível/reativo — facility qualificada, SDS, inertização, aterramento e EPI são pré-requisitos. PROIBIDO como projeto DIY/garage. Sem parâmetros de laser, PSD inventada ou ‘receita caseira’. Decisões: quando a liga faz sentido vs alternativas; cadeia build→stress relief→HIP/usinagem; falhas típicas."
doc_type: "material"
domain: ["materials", "metals"]
technology: ["powder-bed-fusion"]
process: ["lpbf"]
applies_to: ["lpbf", "metal-powder", "alsi10mg"]
not_for: ["diy-garage-metal-printing", "household-vacuum-cleanup", "universal-laser-parameters", "ebm-alsi10mg-assumptions"]
knowledge_status: "draft"
evidence_status: "mixed"
safety_level: "critical"
confidence: "high"
last_reviewed: "2026-08-15"
review_cycle: "6-months"
sources: ["source.niosh-am-entry", "source.epa-3d-printing-research", "source.iso-astm-52900-entry"]
related: ["hub.materiais.po", "material.powder-feedstocks", "tech.lpbf-ebm", "hazard.metal-powder", "defect.pbf", "post.depowdering-metal"]
prerequisites: ["hazard.metal-powder", "tech.lpbf-ebm"]
supersedes: []
aliases_pt_br: ["AlSi10Mg", "alumínio LPBF", "alumínio SLM", "pó alumínio AM"]
aliases_en: ["AlSi10Mg", "aluminum LPBF", "AlSi10Mg SLM", "aluminum AM powder"]
tags: ["alsi10mg", "aluminum", "lpbf", "safety-critical", "powder"]
---

# AlSi10Mg (alumínio) para LPBF — safety-critical

Hub pai: [Materiais em pó](INDEX.md) · overview: [feedstocks](feedstocks-polimeros-e-metais.md)

## Aviso crítico (leia antes de qualquer outra seção)

1. **Pó de alumínio fino para AM não é hobby.** Ambiente doméstico/garage: **inadequado**.
2. Risco: incêndio/explosão de nuvem de pó, inalação, contaminação cruzada, ignição por estática/fagulha.
3. Controles obrigatórios de consciência: [Pós metálicos e risco de explosão](../../15-seguranca-e-meio-ambiente/pos-metais-e-risco-explosao.md)
4. Esta base **não** ensina a operar LPBF de alumínio em casa, **não** fornece parâmetros de laser e **não** autoriza limpeza com aspirador doméstico.
5. Sem SDS do lote + treinamento + SOP de facility: **não manusear**.

## Decisão em uma frase

Considere **AlSi10Mg em LPBF** apenas em cadeia industrial/qualificada quando densidade, geometria e pós-tratamento (térmico/HIP/usinagem) forem especificados — nunca como “imprimir metal barato no fundo do quintal”.

## O que é

- Liga **Al-Si-Mg** (família de fundição) em pó esférico atomizado para AM
- Processo típico: [LPBF](../../02-tecnologias/powder-bed-fusion/lpbf-ebm-metais.md) sob atmosfera inerte
- Nomes de mercado (SLM/DMLS) descrevem a mesma categoria PBF a laser — categoria ISO/ASTM: [entry 52900](../../22-fontes/iso-astm-52900-entry.md)

## Quando escolher / quando não

| Pode fazer sentido (facility) | Não escolha este caminho se… |
|---|---|
| Peças leves com canais/geometria difícil de usinar do bloco | Você só tem impressora FFF/resina doméstica |
| Requisitos alinhados a propriedades **após** HT/HIP do sistema | Precisa de “alumínio estrutural” sem NDE/qualificação |
| Cadeia de depowdering inerte e stress relief definida | Equipe sem SOP de pó combustível |
| Alternativa a usinagem multi-setup cara | Bastaria polímero engenharia ou chapa dobrada |

Alternativas de decisão (não exaustivas): outra liga LPBF (ex.: Ti, Inconel, inox) conforme ambiente/carga; DED/usínagem; não-metal.

## Segurança operacional (hierarquia — resumo)

Detalhe canônico: [hazard.metal-powder](../../15-seguranca-e-meio-ambiente/pos-metais-e-risco-explosao.md).

| Camada | Exemplos (heurística) |
|---|---|
| Engenharia | Inertização no unpack quando exigido; aterramento; coleta adequada |
| Administrativo | Hot-work, treinamento, inventário por lote, proibição de soprar pó |
| EPI | Respirador adequado ao risco; não improvisar máscara cirúrgica |
| Proibido aqui | DIY garage; shop-vac doméstico; água “no reflexo” em fogo de metal sem SDS |

Fontes de higiene/ambiente: [NIOSH](../../22-fontes/niosh-additive-manufacturing.md), [EPA AM research](../../22-fontes/epa-3d-printing-research.md).

## Feedstock — o que controlar (sem números inventados)

| Controle | Por quê |
|---|---|
| Certificado de lote / química / O₂ | Propriedades e soldabilidade |
| PSD e morfologia homologadas à máquina | Espalhamento e fusão |
| Umidade / armazenagem | Porosidade e risco |
| Contaminação cruzada (outras ligas) | Inclusões e incidentes |
| Reuso de pó | Política OEM — não inventar % |

Ver [feedstocks](feedstocks-polimeros-e-metais.md).

## Cadeia de processo (decisão de etapas)

```text
Build prep (atmosfera OK?)
  → LPBF
  → Cool / unpack controlado
  → Depowdering (procedimento de metal)
  → Stress relief (quando especificado)
  → Remoção de suporte
  → HIP / heat treatment (se requisito)
  → Usinagem / NDE / liberação
```

Pós: [depowdering e pós-metal](../../14-pos-processamento/depowdering-e-pos-metal.md).

## Defeitos e qualidade (entrada)

Modos típicos de PBF metálico (lack of fusion, keyhole porosity, cracking, balling, spatter): [defeitos PBF](../../12-problemas-e-diagnostico/po-metal/defeitos-pbf.md).

**Decisão:** peça estrutural/crítica com porosidade suspeita → isole lote e escale qualidade; não “suba potência” ad hoc sem metrologia.

## O que esta página deliberadamente não contém

- Potência de laser, hatch, speed, layer thickness “universais”
- Curvas de propriedade mecânica genéricas apresentadas como spec
- Tutorial de montagem de LPBF caseiro
- Extinção de incêndio improvisada

## Relações

- requires → [hazard.metal-powder](../../15-seguranca-e-meio-ambiente/pos-metais-e-risco-explosao.md)
- processed-by → [tech.lpbf-ebm](../../02-tecnologias/powder-bed-fusion/lpbf-ebm-metais.md)
- diagnosed-via → [defect.pbf](../../12-problemas-e-diagnostico/po-metal/defeitos-pbf.md)
- part-of → [material.powder-feedstocks](feedstocks-polimeros-e-metais.md)

## Fontes

- [source.niosh-am-entry](../../22-fontes/niosh-additive-manufacturing.md)
- [source.epa-3d-printing-research](../../22-fontes/epa-3d-printing-research.md)
- [source.iso-astm-52900-entry](../../22-fontes/iso-astm-52900-entry.md)

## Lacunas

- Mapa de requisitos HT/HIP por aplicação do time (quando existir)
- Comparativo AlSi10Mg vs outras ligas Al AM com dados de lote internos
