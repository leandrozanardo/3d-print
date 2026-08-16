---
id: "tech.vat-photopolymerization"
title: "Vat photopolymerization (SLA, DLP, MSLA)"
summary: "Categoria em que resina líquida fotopolimérica é curada seletivamente por luz em uma cuba (vat). Inclui SLA laser, DLP e MSLA/LCD. Excelente detalhe fino; exige manejo de resina não curada, pós-cura e descarte responsável. Não aplicar regras de FFF."
doc_type: "technology"
domain: ["technologies"]
technology: ["vat-photopolymerization"]
process: ["sla", "dlp", "msla"]
applies_to: ["vat-photopolymerization", "resin-printing"]
not_for: ["fff-filament-settings", "powder-bed-rules"]
materials: []
printers: []
knowledge_status: "draft"
evidence_status: "mixed"
safety_level: "high"
confidence: "medium"
last_reviewed: "2026-08-15"
review_cycle: "12-months"
sources: ["source.iso-astm-52900-entry", "source.niosh-am-entry"]
related: ["fund.terminology", "tech.fff", "hub.seguranca"]
prerequisites: ["fund.terminology"]
aliases_pt_br: ["fotopolimerização em cuba", "impressão em resina", "SLA", "DLP", "MSLA"]
aliases_en: ["vat photopolymerization", "SLA", "DLP", "MSLA", "LCD resin"]
tags: ["vat", "sla", "dlp", "msla", "resin"]
supersedes: []
---

# Vat photopolymerization (SLA, DLP, MSLA)

Hub pai: [Tecnologias](../INDEX.md) · pasta [vat-photopolymerization](./)

## Mecanismo

Uma **cuba** contém resina fotopolimérica líquida. Luz (laser UV, projetor DLP ou painel LCD/LED em MSLA) cura seletivamente uma camada; a plataforma se move e o ciclo repete. A peça tipicamente nasce **presa a uma plataforma** e mergulhada/orientada conforme arquitetura (bottom-up é comum em desktop).

Variações populares:

| Sigla | Ideia | Nota |
|---|---|---|
| **SLA** | laser varre o contorno/área | histórico “estereolitografia” |
| **DLP** | projetor cura a fatia de uma vez | tempo por camada menos dependente da área (até limites ópticos) |
| **MSLA / LCD** | máscara LCD + LEDs | dominante em desktop consumidor |

## Hardware (visão)

- Cuba / FEP ou filme equivalente, plataforma, elevador Z
- Fonte óptica e calibração de exposição
- Ambiente: resina sensível a luz ambiente; temperatura da resina afeta viscosidade
- Estação de lavagem e câmara de pós-cura (frequentes no ecossistema)

## Feedstock

Resinas de propósito geral, tough, flexible, castable, dental/engineering — **formulações distintas**. Propriedades finais dependem fortemente de **exposição + lavagem + pós-cura**. Não misturar marcas/lotes sem procedimento; consultar SDS e TDS do produto.

## Design rules (entrada)

- Orientação para reduzir área de sucção (peel force) e marcas de suporte
- Suportes tipicamente necessários; cicatrizes de remoção fazem parte do plano
- Espessuras mínimas e furos: seguir guia do fabricante da resina/máquina — sem inventar mm universais
- Canais ocos: prever drenagem de resina líquida

## Failure modes (entrada)

- Falha de adesão à plataforma
- Separação de camada / underexposure
- Overcure (perda de detalhe, aderência excessiva ao FEP)
- Sucção / film damage
- Empenamento pós-cura por cura desigual
- Resina aprisionada em cavidades

## Pós-processamento

1. Remoção da plataforma
2. Lavagem com solvente adequado ao sistema (isopropanol e alternativas conforme fabricante)
3. Remoção de suportes (antes ou depois da cura — trade-off de fragilidade)
4. Pós-cura UV conforme TDS
5. Acabamento mecânico / pintura se necessário

Peça “só lavada” ≠ propriedades nominais do datasheet.

## Segurança

Resina não curada é tipicamente **irritante/sensibilizante**; vapores e respingos importam. Usar luvas adequadas, ventilação, evitar contato cutâneo/ocular, e descartar resíduos conforme SDS e normas locais. Ver [NIOSH AM](../../22-fontes/niosh-additive-manufacturing.md). Não tratar resina como “plástico inocente tipo PLA”.

## Economia (entrada)

- Custo por peça pode ser alto em volume de resina + consumíveis (filme, álcool)
- Excelente para protótipos visuais, moldes indiretos, joalheria/dental **quando o sistema for certificado para o uso**
- Throughput: desktop MSLA é forte em detalhe; produção industrial usa outros envelopes

## Comparações (entrada)

| vs FFF | vs PBF polímero |
|---|---|
| Melhor detalhe fino típico | Sem leito de pó; outro pós |
| Materiais mais “fotopolímero” | Menos diversidade de termoplásticos de engenharia tipo PA12 |
| Manuseio químico mais exigente | Segurança diferente (pó vs líquido) |

## Parâmetros críticos (sem valores universais)

Exposição (tempo/potência/máscara), altura de camada, temperatura da resina, velocidade de elevação/peel, e política de pós-cura são **do sistema + TDS**. Inventar segundos de exposição “padrão de internet” é anti-padrão editorial desta base.

## Decisão: quando escolher vat vs FFF

Escolha **vat** quando detalhe fino, texto pequeno ou superfície lisa dominam e você aceita química de resina + pós. Escolha **FFF** quando quiser termoplásticos baratos, peças utilitárias e fluxo A1 Mini desta base. Híbridos (master em resina → molde → outro processo) existem; planeje o pós.

## Relações

- is-a → categoria ISO/ASTM (orientação)
- incompatible-with → copiar temps/retract de FFF
- related → [terminologia](../../01-fundamentos/terminologia-manufatura-aditiva.md), [comparação entre categorias](../comparacao-entre-categorias.md)

## Fontes

- [source.iso-astm-52900-entry](../../22-fontes/iso-astm-52900-entry.md)
- [source.niosh-am-entry](../../22-fontes/niosh-additive-manufacturing.md)

## Lacunas

- Página atômica MSLA desktop com checklist de exposição
- Materiais de resina canônicos nesta base
- Playbook de descarte e ventilação doméstica vs lab
