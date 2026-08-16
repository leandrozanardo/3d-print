---
id: "tech.directed-energy-deposition"
title: "Directed energy deposition (DED, WAAM)"
summary: "Categoria em que uma fonte de energia focalizada (laser, arco, feixe de elétrons) funde material (pó ou arame) no momento da deposição. Usada para reparo, features grandes e near-net-shape metálico. Distinta de powder bed fusion: sem leito completo; forte interação térmica e usinagem posterior frequente."
doc_type: "technology"
domain: ["technologies"]
technology: ["directed-energy-deposition"]
process: ["ded", "waam"]
applies_to: ["directed-energy-deposition", "waam", "metal-repair"]
not_for: ["desktop-polymer-fff", "fine-jewelry-detail-as-primary"]
materials: []
printers: []
knowledge_status: "draft"
evidence_status: "mixed"
safety_level: "high"
confidence: "medium"
last_reviewed: "2026-08-15"
review_cycle: "12-months"
sources: ["source.iso-astm-52900-entry", "source.niosh-am-entry"]
related: ["tech.powder-bed-fusion", "fund.anisotropy", "fund.terminology"]
prerequisites: ["fund.terminology"]
aliases_pt_br: ["deposição com energia direcionada", "DED", "WAAM"]
aliases_en: ["directed energy deposition", "DED", "WAAM", "laser cladding AM"]
tags: ["ded", "waam", "metal"]
supersedes: []
---

# Directed energy deposition (DED, WAAM)

Hub pai: [Tecnologias](../INDEX.md) · pasta [directed-energy-deposition](./)

## Mecanismo

Material de adição (**pó** ou **arame**) é alimentado na zona onde energia concentrada cria poça de fusão. O cabeçote e/ou a peça se movem, construindo cordões e camadas. **WAAM** (*Wire Arc Additive Manufacturing*) é uma família importante baseada em processo de arco + arame.

Diferente de **LPBF**: não há recoating de leito inteiro; geometria e path planning lembram soldagem robotizada + CAM.

## Hardware

- Fonte laser/arco/EB, tocha/cabeça de deposição
- Alimentação de arame ou bicos de pó
- Robô ou CNC de multi-eixos; posiçãoers
- Atmosfera / shielding gas
- Monitoramento de poça e temperatura (sistemas avançados)

## Feedstock

Ligas metálicas em arame ou pó compatíveis com o processo. Contaminação e parâmetros de gás alteram qualidade. Não há equivalente doméstico seguro típico.

## Resolução / precisão

- Near-net-shape: resolução bruta vs LPBF; **usinagem** frequentemente necessária para tolerâncias finais
- Distortion e residual stress dominam o planejamento — [anisotropia e tensões](../../01-fundamentos/anisotropia-e-tensoes-residuais.md)

## Design rules (entrada)

- Generosity para oversize de usinagem
- Evitar overhangs impossíveis sem posiçãoer/5 eixos
- Estratégia de passes para diluição e HAZ
- Features finas: DED raramente é a primeira escolha vs PBF

## Failure modes (entrada)

- Falta de fusão entre passes
- Porosidade, inclusão de escória (arco)
- Cracking a quente/frio
- Distortion excessiva
- Geometria fora por path errado

## Pós-processamento

Stress relief / tratamento térmico → usinagem → NDT conforme aplicação. Peça “as-deposited” raramente é acabamento final estrutural crítico.

## Segurança

Soldagem/corte: UV/IR, fumos metálicos, elétrico, gás, incêndio. Controles industriais obrigatórios. [NIOSH AM](../../22-fontes/niosh-additive-manufacturing.md).

DED herda disciplina de soldagem: WPS, qualificação de operador, inspeção e gestão de calor na peça-base. Tratar como “impressora 3D de metal de garagem” é erro de categoria e de risco.

## Economia (entrada)

- Bom para **reparo** de componentes caros e peças grandes
- Taxa de deposição pode ser alta vs PBF
- Custo de path planning, gás, usinagem e scrap térmico

O business case costuma ser **salvar um casting/forjado** ou evitar lead time de forja, não “imprimir um parafuso”. Sem usinagem e NDT no preço, a cotação mente.
## Comparações (entrada)

| vs LPBF | vs usinagem do bloco |
|---|---|
| Menos resolução, mais taxa | Menos desperdício de material em shapes certos |
| Reparo e add-on features | Buy-to-fly diferente |
| Path de solda | Chip removal |

WAAM não é “SLS de arame”. É DED; path planning, diluição e HAZ dominam. Use [DED e WAAM](ded-e-waam.md) quando a pergunta for específica de arco/arame.
## Parâmetros críticos (orientação)

Potência, velocidade de avanço, taxa de alimentação (wire feed / powder feed), gás de proteção, interpass temperature e estratégia de passe. Valores vêm de WPS/procedimento do processo — **não** de blogs genéricos.

## Quando faz sentido

- Reparo e rebuild de eixos, matrizes, componentes caros
- Peças grandes near-net onde LPBF não cabe no envelope
- Features adicionadas a um substrato usinado

Quando **não**: lattices finos, joalheria, polímeros desktop, “substituir LPBF sem usinagem”.

## Navegação

- Aprofundamento: [DED e WAAM](ded-e-waam.md)
- Contraste PBF metal: [LPBF e EBM](../powder-bed-fusion/lpbf-ebm-metais.md)
- Matriz: [comparação entre categorias](../comparacao-entre-categorias.md)

## Relações

- related → [powder bed fusion](../powder-bed-fusion/powder-bed-fusion.md)
- incompatible-with → expectativas de detalhe de resina/MSLA

## Fontes

- [source.iso-astm-52900-entry](../../22-fontes/iso-astm-52900-entry.md)
- [source.niosh-am-entry](../../22-fontes/niosh-additive-manufacturing.md)

## Lacunas

- Estratégias de toolpath e interpass temperature documentadas
- Qualificação de reparo aeronáutico (fora de escopo até fonte)
- Monitoramento de poça e closed-loop
