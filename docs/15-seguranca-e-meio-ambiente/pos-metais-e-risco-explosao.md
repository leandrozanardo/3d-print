---
id: "hazard.metal-powder"
title: "Pós metálicos e risco de explosão / incêndio"
summary: "Pós metálicos finos usados em AM (especialmente Al, Ti e algumas ligas reativas) apresentam risco de incêndio e explosão de nuvem de pó, além de inalação e contaminação cruzada. Controles de engenharia (inertização, aterramento, ventilação, limpeza adequada), administrativos (SOP, treinamento, hot-work) e EPI são obrigatórios em facility séria. Esta página é orientação de consciência de risco baseada em princípios de higiene industrial — não substitui NFPA locais, SDS, PPR e avaliação de risco do site. Ambiente doméstico/garage para pó metálico AM: inadequado."
doc_type: "safety"
domain: ["safety", "metals"]
technology: ["powder-bed-fusion", "binder-jetting", "directed-energy-deposition"]
process: []
applies_to: ["metal-powder", "powder-handling"]
not_for: ["household-vacuum-cleanup", "diy-metal-powder-printing"]
knowledge_status: "draft"
evidence_status: "mixed"
safety_level: "critical"
confidence: "high"
last_reviewed: "2026-08-15"
review_cycle: "6-months"
sources: ["source.niosh-am-entry", "source.epa-3d-printing-research"]
related: ["material.powder-feedstocks", "post.depowdering-metal", "tech.lpbf-ebm", "tech.ded-waam", "tech.binder-jetting-variants"]
prerequisites: []
supersedes: []
aliases_pt_br: ["explosão de pó metálico", "risco de pó AM", "combustível metálico fino"]
aliases_en: ["metal powder explosion", "combustible dust", "AM powder hazard"]
tags: ["safety", "critical", "powder", "explosion"]
---

# Pós metálicos e risco de explosão / incêndio

Hub pai: [Segurança e meio ambiente](../INDEX.md)

## Aviso

Se você não tem facility, SDS, treinamento e controles de engenharia: **não manusear pó metálico AM**. Esta base não fornece “como fazer em casa”.

## Por que é crítico (fato)

1. Partículas finas aumentam área superficial → ignição mais fácil
2. Nuvem de pó em ar pode explodir se houver ignição e concentração adequada
3. Alguns metais (Ti, Al, etc.) são especialmente problemáticos quando finos e secos
4. Combustão de metal pode exigir agentes extintores específicos (não água em muitos casos — seguir SDS/brigada)
5. Inalação e sensibilização são riscos paralelos ao fogo

Polímeros em pó também podem ser combustíveis — não relaxar só porque “não é metal”.

## Hierarquia de controles (heurística industrial)

1. **Eliminação/substituição** quando possível (formas menos perigosas, processos alternativos)
2. **Engenharia:** inertização (Ar/N₂) em unpack quando exigido; sistemas aterrados; coleta HEPA industrial; salas classificadas
3. **Administrativo:** SOP, hot-work permit, treinamento, inventário, proibição de fumar/esmerilhar perto de pó
4. **EPI:** respirador adequado, luvas, vestimenta; sem improvisar máscara cirúrgica como proteção para pó fino

## Proibições práticas (esta base)

- Aspirador doméstico / shop-vac não certificado para combustível
- Ar comprimido para “soprar” pó (cria nuvem)
- Misturar ligas no mesmo coletor sem procedimento
- Ignorar acúmulo em cantos, filtros e roupas
- Usar água como reflexo em fogo metálico sem confirmação SDS

## Spill e incêndio

- Spill: isolar, evitar nuvem, limpeza conforme SOP (úmido/HEPA)
- Fogo: evacuar / acionar resposta treinada; classe de extintor conforme material
- Após incidente: investigar ignição + combustível + oxigênio (triângulo)

## Saúde ocupacional

Consulte materiais NIOSH/OSHA sobre AM e poeiras combustíveis. Entrada canônica: [source.niosh-am-entry](../22-fontes/niosh-additive-manufacturing.md). Emissões/ambiente: [source.epa-3d-printing-research](../22-fontes/epa-3d-printing-research.md).

## Relação com processo

- [LPBF/EBM](../02-tecnologias/powder-bed-fusion/lpbf-ebm-metais.md)
- [Depowdering](../14-pos-processamento/depowdering-e-pos-metal.md)
- [Feedstocks](../05-materiais/po/feedstocks-polimeros-e-metais.md)

## Fontes

- [source.niosh-am-entry](../22-fontes/niosh-additive-manufacturing.md)
- [source.epa-3d-printing-research](../22-fontes/epa-3d-printing-research.md)

## Lacunas

- NFPA 652/484 detalhadas não resumidas cláusula a cláusula (evitar falsa conformidade)
- Limites de exposição numéricos: usar SDS/órgão local, não memorizar aqui sem revisão
