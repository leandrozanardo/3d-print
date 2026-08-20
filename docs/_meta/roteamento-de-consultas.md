---
id: meta.query-routing
title: Roteamento de consultas
summary: Algoritmo para a IA classificar intenção, aplicar safety, recuperar página
  canônica, prerequisites e relações sem carregar hubs inteiros desnecessariamente.
doc_type: policy
domain:
- meta
knowledge_status: draft
evidence_status: mixed
safety_level: caution
confidence: high
last_reviewed: '2026-08-15'
review_cycle: 3-months
related:
- meta.context-assembly
- meta.knowledge-map
tags:
- routing
- rag
---
# Roteamento de consultas

## Algoritmo

1. **Classificar intenção:** sintoma | material | máquina | objetivo | processo | setting | segurança | comparação | mito
2. **Identificar technology/process** (default operacional atual: material extrusion / FFF se contexto A1 Mini)
3. **Recuperar safety** se hazard plausível (resina, pó, VOC, laser, food/medical claims)
4. **Recuperar contexto** printer / material / slicer / versão quando mudar a recomendação
5. **Página canônica** do conceito (preferir `knowledge_status` reviewed/verified)
6. **Prerequisites** + até **um nível** de relações causais (causes/fixed-by/diagnosed-by)
7. **Não** carregar hub inteiro se página atômica basta
8. **Deduplicar** facts; preferir página canônica a cópias legadas
9. **Mostrar conflitos** ([contradicoes.md](contradicoes.md)) e **lacunas**
10. Conteúdo `archived`/`deprecated`: só com aviso explícito

## Mapas de entrada

| Entrada | Começar em |
|---|---|
| “cantos levantando” | defect warping + first-layer se camada 1 falhou |
| “spaghetti / novelo / imprimindo no ar” | `defect.fff.spaghetti` (momento: 1ª camada vs mid-print) |
| “qual material” | purpose/scenario → material family |
| “A1 Mini cabe?” | printer page + envelope |
| “o que mudar no Studio” | setting semântico → mapping Bambu Studio (quando existir) |
| “é food-safe?” | safety + regulation — provavelmente recusar certificação |

## Perguntas mínimas (só se mudam a resposta)

Ver [AGENT_GUIDE.md](../AGENT_GUIDE.md): tecnologia; impressora/revisão; nozzle/plate; material exato; slicer/versão; finalidade; geometria; settings; ambiente; calibração; sintoma/momento; mudanças recentes; restrições; risco.
