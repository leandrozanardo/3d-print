---
id: "app.qualification-limits"
title: "Limites de qualificação em aplicações AM"
summary: "Qualificar uma peça de manufatura aditiva para uso médico, aeroespacial, food-contact ou safety-critical exige evidência de processo, material, rastreabilidade, inspeção e conformidade regulatória — não basta ‘imprimiu e parece bom’. Esta página delimita o que esta base pode e não pode afirmar: não certifica dispositivos, não substitui FDA/ANVISA/FAA/EASA nem QMS do fabricante. Cobertura parcial voltada a expectativas realistas."
doc_type: "guide"
domain: ["applications", "regulation"]
technology: []
process: []
applies_to: ["regulated-am", "end-use-parts"]
not_for: ["self-certifying-implants", "food-safe-pla-claims"]
knowledge_status: "draft"
evidence_status: "mixed"
safety_level: "high"
confidence: "high"
last_reviewed: "2026-08-15"
review_cycle: "12-months"
sources: ["source.fda-am-medical-devices-entry", "source.iso-astm-52900-entry"]
related: ["myth.pla-food-safe", "tech.lpbf-ebm", "hazard.metal-powder", "hub.aplicacoes"]
prerequisites: []
supersedes: []
aliases_pt_br: ["qualificação AM", "certificação peça impressa", "limites regulatórios"]
aliases_en: ["AM qualification limits", "process qualification", "device regulation"]
tags: ["regulation", "qualification", "medical", "aerospace"]
---

# Limites de qualificação em aplicações AM

Hub pai: [Aplicações e regulação](./INDEX.md)

## O que é qualificação (resumo)

Conjunto de evidências de que **processo + material + design + inspeção** produzem peças dentro de requisitos para um uso declarado. Em setores regulados, isso vive sob QMS, normas e submissões a autoridades — não sob truques de slicer.

## O que esta base NÃO faz

- Não declara peça médica, implantável ou food-contact como aprovada
- Não emite CoC / CoA
- Não substitui advogado regulatório ou responsible manufacturer
- Não inventa limites de fadiga ou biocompatibilidade

## Domínios e expectativas

| Uso | Expectativa típica | Papel desta wiki |
|---|---|---|
| Protótipo visual | Baixa | Orientação de processo |
| Ferramenta interna não crítica | Média | Boas práticas + testes locais |
| Food-contact | Alta; material+processo | [mito PLA](../20-pesquisa-e-mitos/mito-pla-food-safe.md); sem certificação |
| Dispositivo médico AM | Muito alta (design controls, etc.) | Apontar [FDA guidance entry](../22-fontes/fda-am-medical-devices-guidance-entry.md) |
| Aeroespacial | Muito alta (allowables, NDE) | Conceitos; sem allowables inventados |
| Metal pó | Facility + segurança | [hazard.metal-powder](../15-seguranca-e-meio-ambiente/pos-metais-e-risco-explosao.md) |

## Elementos frequentes de um dossier (heurística)

1. Requisitos de uso e falha
2. Especificação de material e lote
3. Parâmetros de processo congelados / janela validada
4. Cupons mecânicos e geometria representativa
5. NDE / metrologia
6. Rastreabilidade build → peça
7. Controle de mudanças
8. Avaliação de biocompatibilidade / toxicologia quando aplicável (fora do escopo detalhado aqui)

## FDA AM medical devices (entrada)

A FDA publicou guidance sobre considerações técnicas para dispositivos médicos manufaturados aditivamente. Use a página de fonte; leia o documento oficial para submissões. Link registrado em [source.fda-am-medical-devices-entry](../22-fontes/fda-am-medical-devices-guidance-entry.md).

## Relação com desktop FFF

A1 Mini + PLA/PETG nesta base serve a **aprendizado e peças não reguladas**. Subir para end-use crítico exige outro sistema de qualidade.

## Fontes

- [source.fda-am-medical-devices-entry](../22-fontes/fda-am-medical-devices-guidance-entry.md)
- [source.iso-astm-52900-entry](../22-fontes/iso-astm-52900-entry.md)

## Lacunas

- Mapeamento ANVISA / INMETRO específico BR: não detalhado
- Templates de IQ/OQ/PQ: não publicados
