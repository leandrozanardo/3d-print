---
id: "tech.sheet-lamination"
title: "Sheet lamination"
summary: "Categoria em que folhas (papel, polímero, metal, compósito) são unidas (adesivo, solda ultrassônica, brasagem, etc.) e cortadas contorno a contorno. Útil para protótipos rápidos, tooling e certas rotas metálicas; anisotropia planar e remoção de excesso são temas centrais."
doc_type: "technology"
domain: ["technologies"]
technology: ["sheet-lamination"]
process: ["sheet-lamination"]
applies_to: ["sheet-lamination", "uol", "laminated-object"]
not_for: ["fff-layer-height-as-same-physics"]
materials: []
printers: []
knowledge_status: "draft"
evidence_status: "mixed"
safety_level: "caution"
confidence: "medium"
last_reviewed: "2026-08-15"
review_cycle: "12-months"
sources: ["source.iso-astm-52900-entry", "source.niosh-am-entry"]
related: ["fund.terminology", "fund.anisotropy", "tech.fff"]
prerequisites: ["fund.terminology"]
aliases_pt_br: ["laminação de folhas", "LOM-like"]
aliases_en: ["sheet lamination", "laminated object manufacturing", "UAM"]
tags: ["sheet-lamination", "uol", "lamination"]
supersedes: []
---

# Sheet lamination

Hub pai: [Tecnologias](../INDEX.md) · pasta [sheet-lamination](./)

## Mecanismo

Folhas são alimentadas, **unidas** à pilha e **cortadas** (laser, faca, ultrassom) segundo o contorno da camada. O excesso pode permanecer como suporte temporário e ser removido depois. Variantes incluem papel com adesivo (histórico LOM), polímeros e **ultrasonic additive manufacturing** (UAM) em metais.

A “camada” aqui é a **espessura da folha**, não um cordão extrudado.

## Hardware

- Alimentação de filme/folha
- Sistema de bond (calor/pressão/ultrassom/adesivo)
- Corte 2D
- Em UAM: sonotrode, CNC, frequentemente usinagem intercalada

## Feedstock

Papel, PVC/filmes, fitas metálicas, prepregs — conforme processo. Propriedades finais refletem interfaces entre folhas (anisotropia planar forte).

## Resolução / precisão

- Resolução Z ≈ espessura da folha
- Contorno XY limitado pelo corte
- Em metal UAM: combinação com usinagem define tolerâncias

## Design rules (entrada)

- Evitar undercuts impossíveis de limpar no desperdício laminado
- Planejar direção das fibras/folhas vs carga
- Cavidades: estratégia de remoção de excesso
- Furos pequenos: qualidade do corte vs pós

## Failure modes (entrada)

- Delaminação entre folhas
- Bond incompleto
- Corte irregular / queima (laser em papel)
- Empeno da pilha
- Em UAM: falta de weld sólido entre foils

## Pós-processamento

Remoção de excesso, lixamento, infiltração (algumas rotas de papel), usinagem e tratamento térmico (metal).

## Segurança

Corte laser (fumos), adesivos, ruído ultrassônico, pó de usinagem. Seguir SDS e [NIOSH AM](../../22-fontes/niosh-additive-manufacturing.md) quando aplicável.

Em rotas de papel/filme, o risco parece “baixo” frente a metal — ainda assim há particulados de corte, adesivos e, em UAM, energia ultrassônica e cavacos. Não pule ventilação porque o feedstock parece inofensivo.

## Economia (entrada)

- Protótipos volumosos baratos em algumas rotas de papel/filme
- Metal UAM: nicho de embutir sensores / multi-metal — custo de capital alto
- Pouco overlap com o fluxo desktop FFF desta base, mas necessário para taxonomia completa

Trate sheet lamination como **ferramenta de categoria**, não como substituto do ecossistema A1 Mini. Quando surgir um caso real no projeto, documente machine+folha+bond com fonte antes de elevar `confidence`.
## Comparações (entrada)

| vs FFF | vs PBF |
|---|---|
| Camada = folha | Sem leito de pó |
| Bond interfacial dominante | Fusão seletiva diferente |
| Limpeza de excesso | Unpack de pó |

Se a pergunta do usuário for desktop filamento, **não** force sheet lamination na resposta — cite a categoria só para taxonomia ou quando o feedstock for folha de fato.
## Parâmetros críticos (orientação)

Espessura e tipo de folha, pressão/temperatura/energia de bond, estratégia de corte e (em UAM) passes de usinagem intercalados. Sem datasheet do sistema, não há “layer height ideal” transferível de FFF.

## Quando faz sentido

- Protótipos volumosos rápidos em rotas de filme/papel (nichos)
- Tooling e padrões onde usinagem do bloco seria pior buy-to-fly
- UAM: embutir sensores, multi-metal, features internas antes do seal

Quando **não**: substituir FFF doméstico; esperar isotropia; detalhe tipo MSLA.

## Checklist de decisão

1. A anisotropia entre folhas é aceitável para a carga?
2. Há plano de remoção de excesso / machining?
3. O bond interfacial está caracterizado (ensaio) para o uso?
4. Facility cobre fumos de corte/ultrassom?

## Relações

- is-a → categoria AM
- related → [terminologia](../../01-fundamentos/terminologia-manufatura-aditiva.md), [anisotropia](../../01-fundamentos/anisotropia-e-tensoes-residuais.md), [comparação](../comparacao-entre-categorias.md)

## Fontes

- [source.iso-astm-52900-entry](../../22-fontes/iso-astm-52900-entry.md)
- [source.niosh-am-entry](../../22-fontes/niosh-additive-manufacturing.md)

## Lacunas

- Página UAM metálica dedicada
- LOM histórico vs sistemas atuais
- Casos de tooling laminado
