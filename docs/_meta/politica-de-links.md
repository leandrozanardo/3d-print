---
id: meta.link-policy
title: Política de links
summary: 'Regras de interconexão: breadcrumb, prerequisites, relações causais, links
  relativos Markdown, proibição de órfãos e links decorativos; validação via validate-wiki.'
doc_type: policy
domain:
- meta
knowledge_status: draft
evidence_status: mixed
safety_level: normal
confidence: high
last_reviewed: '2026-08-15'
review_cycle: 6-months
related:
- meta.ontology
- meta.editorial-guide
tags:
- links
---
# Política de links

## Obrigatório em página canônica

- Breadcrumb / link ao hub pai
- Prerequisites quando existirem
- ≥2 links relacionados úteis (não decorativos)
- Links symptoms/causes/fixes quando aplicável
- Links a materiais/tecnologias/printers/settings citados
- Links a fontes
- Seção **Relações com outros conceitos**
- Seção **Veja também** sem links de enfeite

## Forma

Use paths relativos Markdown, por exemplo:

`[Empenamento](../12-problemas-e-diagnostico/fff/empenamento.md)`

IDs no front matter **não** substituem links no corpo.

## Validação

Após cada batch:

```bash
python -m core validate-wiki docs --json
python -m core validate-wiki docs --strict --json
```

O validador padrão cobre links relativos quebrados. O modo `--strict` adiciona: front matter/YAML seguro, enums, IDs, related/sources/prerequisites/supersedes, anchors, órfãos, ciclos, absolutos duros, números sem evidência, promoção editorial inválida, lifecycle/coverage de impressoras.

Registrar falhas manuais remanescentes (warnings) em [lacunas.md](lacunas.md).

## Proibições

- Página canônica órfã
- Link só para bater métrica
- Link para archived/deprecated sem aviso
- Dependência exclusiva de ID sem path
