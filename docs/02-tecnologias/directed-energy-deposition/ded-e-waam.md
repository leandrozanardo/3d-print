---
id: "tech.ded-waam"
title: "DED e WAAM — deposição por energia dirigida"
summary: "Directed energy deposition (DED) funde material (pó ou arame) no ponto onde uma fonte de energia focada (laser, arco, feixe de elétrons) cria um melt pool sobre substrato ou peça em construção. WAAM (Wire Arc Additive Manufacturing) é uma rota DED baseada em arco elétrico e arame — produtiva para grandes estruturas metálicas e reparo, com menor resolução tipicamente frente a LPBF. Cobertura parcial e honestamente limitada: sem WFS, corrente ou estratégias de path inventadas."
doc_type: "technology"
domain: ["technologies", "metals"]
technology: ["directed-energy-deposition"]
process: ["ded", "waam"]
applies_to: ["directed-energy-deposition", "metal-wire", "metal-powder-feed"]
not_for: ["polymer-fff", "fine-lattice-lpbf-replacement"]
knowledge_status: "draft"
evidence_status: "mixed"
safety_level: "critical"
confidence: "medium"
last_reviewed: "2026-08-15"
review_cycle: "12-months"
sources: ["source.iso-astm-52900-entry", "source.niosh-am-entry"]
related: ["hub.tech.directed-energy-deposition", "tech.lpbf-ebm", "post.depowdering-metal", "hazard.metal-powder", "tech.category-comparison"]
prerequisites: []
supersedes: []
aliases_pt_br: ["DED", "WAAM", "deposição a arco com arame", "cladding a laser"]
aliases_en: ["DED", "WAAM", "Wire Arc Additive Manufacturing", "laser metal deposition", "LMD"]
tags: ["ded", "waam", "metal", "repair"]
---

# DED e WAAM — deposição por energia dirigida

Hub pai: [Directed energy deposition](./INDEX.md)

## O que é

**DED** (ISO/ASTM): energia dirigida funde feedstock no ponto de deposição. Feed comum:

- **Pó** soprado/coaxial (laser metal deposition / LMD)
- **Arame** (laser wire, arco, etc.)

**WAAM** é DED por **arco** + **arame** (famílias MIG/MAG/TIG adaptadas a AM). Não é categoria ISO separada — é processo/rota sob DED.

## Quando importa

- Reparo e cladding de componentes grandes
- Near-net-shape de porte (estruturas, flanges)
- Adição de feature em blank usinado
- Quando LPBF não cabe em volume/custo

## Princípio (resumo)

1. Substrato ou passagens anteriores formam a base
2. Energia cria melt pool
3. Feedstock entra e solidifica em cordões/passagens
4. Path planning (multi-axis frequentemente) controla geometria
5. HT/usinagem quase sempre necessários para peça final

## Forças e limitações

| Forças | Limitações |
|---|---|
| Taxa de deposição alta (especialmente WAAM) | Resolução e acabamento inferiores a PBF fino |
| Reparo in-situ | Tensões, distorção, anisotropia de passagens |
| Envelope grande | Controle metalúrgico exigente |
| Menos “leito de pó” para limpar | Fumos de solda, UV, elétrico |

## Segurança (crítica)

- Fumos metálicos e UV de arco: ventilação local, PPE soldagem
- Pó DED: riscos de combustão — [hazard.metal-powder](../../15-seguranca-e-meio-ambiente/pos-metais-e-risco-explosao.md)
- Elétrico / laser classe alta: só facility treinada
- Não improvisar WAAM em oficina sem soldador qualificado e exaustão

## Defeitos típicos

Lack of fusion entre passagens, porosidade, crack, inclusion, desvio dimensional, overheating. Estratégias de interpass temperature e path são **OEM/processo-específicas**.

## Pós

Usinagem agressiva, stress relief, NDE. Depowdering aplica-se sobretudo a rotas a pó; WAAM arame tem outro perfil de limpeza (escória/fumos).

## vs LPBF

Ver [LPBF/EBM](../powder-bed-fusion/lpbf-ebm-metais.md) e [comparação](../comparacao-entre-categorias.md): DED/WAAM privilegiando volume e reparo; LPBF privilegiando detalhe e densidade as-built em envelope menor.

## Fontes

- [source.iso-astm-52900-entry](../../22-fontes/iso-astm-52900-entry.md)
- [source.niosh-am-entry](../../22-fontes/niosh-additive-manufacturing.md)

## Lacunas

- Parâmetros elétricos/laser e WFS não documentados
- Qualificação aeroespacial de WAAM: só apontada em [limites de qualificação](../../18-aplicacoes-e-regulacao/limites-de-qualificacao.md)
