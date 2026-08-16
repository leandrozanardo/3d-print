---
id: "material.powder-feedstocks"
title: "Feedstocks em pó — polímeros e metais"
summary: "Feedstocks em pó para manufatura aditiva diferem de filamento FFF: distribuição granulométrica (PSD), morfologia (esfericidade), umidade, oxigênio intersticial (metais), reciclabilidade/refresh e SDS definem processabilidade e risco. Polímeros (ex.: PA12 para SLS/MJF) e metais (aços, Ti, Al, Ni) exigem armazenagem, manuseio e rastreabilidade distintos. Esta página orienta conceitos e controles — não substitui certificado de lote, TDS nem parâmetros de máquina."
doc_type: "material"
domain: ["materials", "metals", "polymers"]
technology: ["powder-bed-fusion", "binder-jetting", "directed-energy-deposition"]
process: []
applies_to: ["powder-bed-fusion", "binder-jetting", "ded-powder"]
not_for: ["fff-filament-diameter-rules", "resin-vat-chemistry"]
knowledge_status: "draft"
evidence_status: "mixed"
safety_level: "critical"
confidence: "medium"
last_reviewed: "2026-08-15"
review_cycle: "12-months"
sources: ["source.niosh-am-entry", "source.epa-3d-printing-research", "source.iso-astm-52900-entry"]
related: ["hub.materiais.po", "tech.sls-mjf", "tech.lpbf-ebm", "tech.binder-jetting-variants", "hazard.metal-powder", "defect.pbf", "post.depowdering-metal", "material.pa12-sls-mjf", "material.alsi10mg-lpbf"]
prerequisites: ["hazard.metal-powder"]
supersedes: []
aliases_pt_br: ["pó AM", "feedstock pó", "pó metálico", "pó polimérico"]
aliases_en: ["AM powder", "metal powder feedstock", "polymer powder", "PSD"]
tags: ["powder", "feedstock", "safety-critical"]
---

# Feedstocks em pó — polímeros e metais

Hub pai: [Materiais em pó](./INDEX.md) · [Materiais](../INDEX.md)

## Segurança primeiro

Pó fino = inalação + potencial de combustão/explosão (especialmente metais reativos). Controles: [hazard.metal-powder](../../15-seguranca-e-meio-ambiente/pos-metais-e-risco-explosao.md). Sem SDS e treinamento, **não manusear**.

## Definição

**Feedstock em pó** é o material particulado homologado para um processo (PBF, BJ, DED a pó). “Pó genérico de usinagem” **não** é equivalente a pó AM esférico atomizado a gás.

## Atributos críticos (fato de engenharia)

| Atributo | Por que importa |
|---|---|
| PSD / D10–D50–D90 | Espalhamento, densidade de leito, fusão |
| Morfologia | Esfericidade favorece flowability em PBF |
| Umidade | Aglomeração, poros, hidrogênio (alguns metais) |
| Química / O₂ intersticial | Propriedades mecânicas e soldabilidade |
| Contaminantes | Inclusões, corrosão, falha |
| Histórico de reciclagem | Drift de propriedades em polímeros e metais |

## Polímeros (entrada)

- Famílias comuns: PA12, PA11, TPU e filled grades em SLS/MJF
- Grade dedicada: [PA12 — SLS/MJF](pa12-sls-mjf.md)
- Aging térmico e oxidação no refresh alteram fusão e mecânica
- Política de **virgin/refresh** é OEM-específica — não inventar %
- Armazenar seco, fechado, rastreado

## Metais (entrada)

- Rotas: atomização a gás → esferas para LPBF/EBM/BJ
- Exemplos de famílias: 316L, 17-4PH, Ti-6Al-4V, AlSi10Mg, Inconel — cada uma com janela e riscos próprios
- Grade dedicada (safety-critical): [AlSi10Mg — LPBF](aluminio-alsi10mg-lpbf.md)
- Al e Ti: atenção máxima a inflamabilidade
- Misturar lotes/ligas sem procedimento = contaminação cruzada grave

## Vantagens / limitações vs filamento

| vs FFF filamento | Pó |
|---|---|
| Geometria / produtividade industrial | Facility e PPE pesados |
| Isotropia relativa (processo-dependente) | Custo e logística de reciclagem |
| Metal estrutural denso possível | Qualificação e NDE |

## Assinatura de falhas ligadas a feedstock

- PSD fora de spec → streaking, poros, lack of fusion
- Umidade → explosão de gás / poros
- Contaminação → inclusão, corrosão
- Refresh excessivo (polímero) → superfície ruim, fragilidade

Ver [defeitos PBF](../../12-problemas-e-diagnostico/po-metal/defeitos-pbf.md).

## Armazenagem e higiene (heurística)

1. Recipientes aterrados / procedimentos antiestáticos quando aplicável
2. Separação por liga/cor/lote
3. Proibir aspiradores domésticos
4. Spill kits e limpeza a úmido ou HEPA industrial conforme política
5. Inventário FIFO e certificados de lote

## Fontes

- [source.niosh-am-entry](../../22-fontes/niosh-additive-manufacturing.md)
- [source.epa-3d-printing-research](../../22-fontes/epa-3d-printing-research.md)
- [source.iso-astm-52900-entry](../../22-fontes/iso-astm-52900-entry.md)

## Lacunas

- Tabelas PSD por máquina/liga não publicadas
- Grades adicionais (Ti64, 316L, PA11, etc.) além de PA12 e AlSi10Mg
- Ensaios de flowability (Hall, Carney) só mencionados
