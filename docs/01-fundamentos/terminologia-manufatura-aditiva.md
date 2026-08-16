---
id: fund.terminology
title: Terminologia de manufatura aditiva
summary: Como falar de manufatura aditiva sem misturar categoria ISO/ASTM, processo
  genérico e marca comercial. Define AM vs 3D printing, as sete categorias de processo,
  o papel de FFF/FDM, e regras de linguagem para decisões técnicas nesta base canônica.
doc_type: concept
domain:
- fundamentals
technology: []
process: []
applies_to:
- all-am
not_for:
- machine-specific-settings
- material-datasheets
materials: []
printers: []
knowledge_status: draft
evidence_status: mixed
safety_level: normal
confidence: medium
last_reviewed: '2026-08-15'
review_cycle: 12-months
sources:
- source.iso-astm-52900-entry
related:
- hub.tecnologias
- tech.fff
- fund.digital-workflow
prerequisites: []
aliases_pt_br:
- terminologia AM
- vocabulário manufatura aditiva
- categorias ISO
aliases_en:
- AM terminology
- additive manufacturing vocabulary
tags:
- fundamentals
- terminology
- iso
supersedes: []
---
# Terminologia de manufatura aditiva

Hub pai: [Fundamentos](INDEX.md)

## O que é

**Manufatura aditiva** (*additive manufacturing*, AM) é o conjunto de processos que constroem um objeto juntando material, tipicamente camada a camada, a partir de dados de um modelo 3D. **Impressão 3D** é o termo popular; nesta base, preferimos AM quando a precisão conceitual importa, e “impressão 3D” quando o contexto é operacional desktop.

A norma de vocabulário de referência é a família **ISO/ASTM 52900**. O texto normativo completo é tipicamente pago; usamos a norma como **âncora de categorias e distinções**, sem reproduzir cláusulas. Ver [fonte ISO/ASTM 52900](../22-fontes/iso-astm-52900-entry.md).

## Três camadas que não devem se misturar

| Camada | Exemplo | Uso correto |
|---|---|---|
| **Categoria de processo** | material extrusion, vat photopolymerization, powder bed fusion | Comparar famílias físicas e riscos |
| **Processo genérico** | FFF, SLA, LPBF, binder jetting | Descrever mecanismo e design rules |
| **Nome comercial / marca** | FDM (histórico Stratasys), MJF, Digital Light Processing como produto | Marketing, ecossistema de máquina |

Erro comum: tratar “FDM” como categoria ISO distinta de “FFF”, ou aplicar regra de resina a filamento porque “é tudo impressão 3D”.

## As sete categorias (orientação)

A taxonomia amplamente usada em AM organiza processos em sete categorias. Nesta base, cada uma tem (ou terá) hub em [02-tecnologias](../02-tecnologias/INDEX.md):

1. **Material extrusion** — feedstock dispensado por bico (ex.: FFF)
2. **Vat photopolymerization** — resina líquida curada por luz (ex.: SLA, DLP, MSLA)
3. **Powder bed fusion** — fusão seletiva de leito de pó (ex.: SLS, LPBF, MJF)
4. **Binder jetting** — jato de aglutinante sobre pó
5. **Material jetting** — jato de gotas de material de construção
6. **Directed energy deposition** — energia focalizada funde material conforme depositado (ex.: DED, WAAM)
7. **Sheet lamination** — união de folhas/folhas cortadas

Detalhe de mecanismo e limites: páginas atômicas de cada categoria — não inventar equivalência de parâmetros entre categorias.

## FFF, FDM e material extrusion

- **Material extrusion** = categoria
- **FFF** (*Fused Filament Fabrication*) = processo genérico dominante em desktop com filamento
- **FDM** = termo comercial histórico, ainda usado como sinônimo popular

Nesta base: use **FFF** no texto técnico; aceite “FDM” do usuário e normalize. Página: [FFF](../02-tecnologias/material-extrusion/fff.md).

## Termos que mudam a decisão

| Termo | Por que importa |
|---|---|
| **Build volume** | Envelope oficial ≠ volume operacional útil (skirts, brims, folgas) |
| **Layer height** vs **resolução** | Altura de camada ≠ precisão dimensional total |
| **Accuracy** vs **precision** | Acerto ao alvo vs repetibilidade; ver [camadas e precisão](camadas-resolucao-precisao.md) |
| **Anisotropy** | Resistência depende da orientação; ver [anisotropia](anisotropia-e-tensoes-residuais.md) |
| **Feedstock** | Filamento, resina, pó, fio, folha — muda segurança e pós |
| **Toolpath / G-code** | Comando de máquina; não é o modelo CAD |
| **Support** | Estrutura sacrificial; regras diferem por tecnologia |
| **Chamber / enclosure** | Ambiente térmico; não confundir com “aquecedor de bed” |

## Vocabulário de evidência nesta base

- **Draft / reviewed / verified** — status da página (`knowledge_status`)
- **Contextual** — valor válido para máquina/material/versão citados, não universal
- **Heurística** — útil para triagem, exige validação
- **Normativo** — exige fonte padrão ou regulatória; não inventar

## Quando a terminologia falha na prática

1. Usuário pede “settings de SLA” para A1 Mini (FFF) → redirecionar categoria
2. Comparar “resolução 50 µm” de resina com “layer 0,2 mm” de FFF (heurística editorial (sem fonte pinada)) como se fossem a mesma métrica → explicar eixos diferentes
3. Afirmar “PEI resolve warping” sem material/ambiente → PEI é superfície; warping é fenômeno térmico/mecânico
4. Usar TDS de um SKU de PLA como regra de todos os PLAs → família ≠ formulação

## Regras de linguagem para agentes e autores

- Preferir IDs estáveis (`tech.fff`, `fund.terminology`) em metadados
- Nomes de settings, arquivos e IDs de máquina em **inglês** quando forem identificadores
- Explicar em **pt-BR**; não traduzir siglas consolidadas (SLA, SLS, G-code, 3MF)
- Não inventar temperaturas, tolerâncias ou tempos de cura/secagem como fatos universais
- Citar [22-fontes](../22-fontes/INDEX.md) ou criar página de fonte antes de elevar confiança

## Relações com outros conceitos

- depends-on → [ISO/ASTM 52900 entrada](../22-fontes/iso-astm-52900-entry.md)
- enables → hubs de tecnologia e glossário
- related → [workflow digital](workflow-digital-cad-ate-peca.md), [glossário inicial](../23-glossario/glossario-inicial.md)

## Fontes

- [source.iso-astm-52900-entry](../22-fontes/iso-astm-52900-entry.md)

## Lacunas

- Mapa formal categoria ↔ processo ↔ marcas comerciais em tabela completa
- Entradas de glossário ligadas a cada categoria industrial (além do foco FFF desktop)
- Tradução consistente de termos de pós-processamento metálico (HIP, stress relief) quando essas páginas existirem
