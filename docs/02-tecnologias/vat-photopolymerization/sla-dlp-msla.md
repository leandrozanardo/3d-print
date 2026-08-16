---
id: "tech.sla-dlp-msla"
title: "SLA, DLP e MSLA — variantes de vat photopolymerization"
summary: "SLA (laser), DLP (projetor) e MSLA/LCD (máscara de cristal líquido) são variantes de vat photopolymerization: solidificam resina fotopolimérica camada a camada. Diferem em fonte de luz, velocidade tipica de área e artefatos, mas compartilham riscos químicos (pele, olhos, VOC, descarte) e a necessidade de lavagem + pós-cura. Não são FFF; não misture parâmetros. Esta página orienta princípios e navegação — não calibra exposição de uma marca específica."
doc_type: "technology"
domain: ["technologies", "resin"]
technology: ["vat-photopolymerization"]
process: ["sla", "dlp", "msla"]
applies_to: ["vat-photopolymerization", "resin-printing"]
not_for: ["fff-settings-transfer", "food-medical-resin-diy", "resin-without-ppe"]
knowledge_status: "draft"
evidence_status: "mixed"
safety_level: "high"
confidence: "medium"
last_reviewed: "2026-08-15"
review_cycle: "12-months"
sources: ["source.iso-astm-52900-entry", "source.niosh-am-entry", "source.epa-3d-printing-research"]
related: ["material.resin-families", "setting.resin-exposure-supports", "post.resin-wash-cure", "hazard.resin-ppe-disposal", "defect.resin.index"]
prerequisites: []
supersedes: []
aliases_pt_br: ["SLA", "DLP", "MSLA", "impressão em resina", "LCD resin"]
aliases_en: ["SLA", "DLP", "MSLA", "LCD 3D printing", "vat photopolymerization"]
tags: ["resin", "sla", "dlp", "msla", "vat"]
---

# SLA, DLP e MSLA

Hub pai: [Vat photopolymerization](INDEX.md) · [Tecnologias](../INDEX.md)

## O que é

Na categoria **vat photopolymerization**, uma resina líquida fotossensível é solidificada seletivamente. Variantes comerciais comuns:

| Variante | Fonte de luz (típica) | Como desenha a camada |
|---|---|---|
| **SLA** | Laser UV | Varre vetores |
| **DLP** | Projetor | Imagem da camada inteira |
| **MSLA** (LCD) | LED UV + máscara LCD | Pixels mascarados; muito comum em desktop |

Terminologia de categoria: [ISO/ASTM 52900](../../22-fontes/iso-astm-52900-entry.md). Nomes de marketing de fabricantes não são categorias ISO.

## Princípio físico (resumo)

1. Tanque com filme FEP/PFA (ou equivalente) e resina
2. Plataforma sobe/desce; camada adere à anterior e desprende do filme
3. Exposição (tempo × potência × espectro) define cura da camada
4. Peça green (verde) ainda reativa → [lavagem e pós-cura](../../14-pos-processamento/lavagem-e-pos-cura-resina.md)

## Comparação rápida vs FFF

| | Resina (vat) | FFF |
|---|---|---|
| Detalhe fino | Geralmente superior | Limitado pelo nozzle |
| Anisotropia | Diferente (ainda há planos de camada) | Forte no Z de cordões |
| PPE químico | Crítico | Emissões + calor |
| Pós | Lavagem + UV cure | Suporte mecânico / lixa |
| Máquina deste repo | Não é o default A1 Mini | [FFF](../material-extrusion/fff.md) |

## Forças e limitações

**Forças:** resolução aparente alta; superfícies suaves; bom para [miniaturas](../../16-cenarios-e-playbooks/miniaturas-detalhe-fino.md).

**Limitações:** resina irritante/tóxica potencial; suporte tipado; volume de tanque; envelhecimento de LCD/FEP; descarte regulado; propriedades mecânicas dependem da [família de resina](../../05-materiais/resina/familias-de-resina.md) e cura completa.

## Parâmetros críticos (conceitos)

- Tempo/exposição por camada e camadas de base
- Altura de camada
- Lift speed / distância (peel forces)
- Densidade e tip de [suportes](../../08-slicers-e-configuracoes/resina-exposicao-e-suportes.md)
- Temperatura da resina (viscosidade)

Números: **só** do fabricante da resina + calibrador da máquina — não inventar.

## Segurança (precede)

1. Luvas nitrílicas adequadas, óculos, roupa de cobertura
2. Ventilação; evitar pele/olhos; ler SDS de **cada** SKU
3. Não comer na área; não food-contact DIY
4. Fontes: [NIOSH](../../22-fontes/niosh-additive-manufacturing.md), [EPA](../../22-fontes/epa-3d-printing-research.md)
5. Página canônica: [resina PPE e descarte](../../15-seguranca-e-meio-ambiente/resina-ppe-e-descarte.md)

## Defeitos — entrada

Índice: [falhas resina](../../12-problemas-e-diagnostico/resina/indice-falhas-resina.md).

## Relações

- Materiais → [famílias de resina](../../05-materiais/resina/familias-de-resina.md)
- Settings → [exposição e suportes](../../08-slicers-e-configuracoes/resina-exposicao-e-suportes.md)

## Lacunas

- Nenhuma impressora resin neste repo como default operacional
- Calibração numérica por marca: não publicada
