---
id: format.stl-vs-3mf
title: STL vs 3MF
summary: STL é malha triangular legada sem metadados ricos; 3MF é formato moderno
  que pode carregar malha, unidades, cores/materiais e cenas multiobjeto quando o
  ecossistema preserva o fluxo. Prefira 3MF no pipeline Bambu Studio quando possível;
  mantenha STL quando o fornecedor só entrega malha ou quando o reparo opera em STL.
  Esta página não afirma superioridade absoluta em todos os CAD nem inventa precisão
  micrométrica — a qualidade depende da tessellação e do software.
doc_type: guide
domain:
- models
- formats
- meshes
technology:
- material-extrusion
process:
- fff
applies_to:
- fff
- digital-pipeline
- bambu-studio
not_for:
- guarantee-zero-mesh-error
- claim-3mf-always-lossless-from-any-cad
knowledge_status: draft
evidence_status: mixed
safety_level: normal
confidence: high
last_reviewed: '2026-08-15'
review_cycle: 12-months
sources: []
related:
- fund.digital-workflow
- format.mesh-repair
- format.units-scale-manifold
- hub.modelos
prerequisites:
- fund.digital-workflow
supersedes: []
aliases_pt_br:
- STL ou 3MF
- formato 3MF
- arquivo STL
aliases_en:
- STL vs 3MF
- 3MF file
- STL mesh
tags:
- stl
- 3mf
- formats
- mesh
---
# STL vs 3MF

Hub pai: [Modelos, formatos e malhas](INDEX.md)

## O que é

- **STL** (*stereolithography* file / malha triangular): representa a superfície como triângulos. Formato legado, ubíquo, sem metadados ricos de materiais, cores ou cena multiobjeto.
- **3MF** (*3D Manufacturing Format*): formato pensado para manufatura aditiva; pode carregar malha e metadados (unidades, objetos, cores/materiais, transformações) quando exportador e consumidor concordam.

**Fato:** ambos descrevem geometria aproximada por malha (quando o fluxo é mesh-based); nenhum “cura” sozinho um modelo não-manifold.
**Heurística:** no ecossistema Bambu Studio / fluxo desta base, preferir **3MF** como entregável de projeto quando o pipeline preservar o arquivo; usar **STL** quando a origem ou a ferramenta de reparo exigir.

## Quando importa

- Troca entre CAD, marketplace, reparo e slicer
- Multicolor / multiobjeto / orientação já definida na cena
- Risco de unidades erradas (mm vs polegadas) — ver [unidades, escala e manifold](unidades-escala-manifold.md)
- Jobs longos em que reimportar STL “cru” perde setup de placa/suporte

## Comparativo operacional

| Aspecto | STL | 3MF |
|---|---|---|
| Geometria | Triângulos | Triângulos (+ estrutura de cena) |
| Metadados | Mínimos / ausentes | Possíveis (materiais, cores, objetos) |
| Unidades | Ambíguas se o CAD exportou errado | Podem ser explícitas — **ainda valide** no slicer |
| Multiobjeto / cor | Frágil (múltiplos arquivos) | Nativo quando o software preenche |
| Interoperabilidade | Quase universal | Boa em pipelines modernos; CAD antigo pode falhar |
| Entregável típico nesta base | Malha reparada intermediária | Projeto Studio / upgrade preferencial |

## O que fazer (pipeline)

1. Preferir export **3MF** do CAD quando o destino (Studio) aceitar sem perda de intent.
2. Se só houver STL: inspecionar envelope e manifold antes do slice ([reparo](reparo-de-malha.md)).
3. Após reparo de malha que gera STL: reimportar e, se o fluxo do projeto pedir, salvar cena Studio em **3MF** com o mesmo *basename* (ver legado operacional em `projeto/workflow`).
4. Não assumir que “converter STL→3MF” no slicer recupera metadados que nunca existiram.

## Aplicabilidade e exclusão

**Aplica-se a:** FFF desktop, fluxo digital desta KB, Bambu Studio.
**Não se aplica a:** afirmação de que 3MF elimina necessidade de reparo; STEP/B-rep como substituto automático (outro tipo de dado); garantia de que todo marketplace entrega 3MF válido.

## Segurança

Arquivos de modelos não são risco químico. Risco operacional: geometria inválida → falha de impressão, colisão, desperdício. Trate malha suspeita antes de jobs longos desacompanhados — ver [elétrico/fogo](../15-seguranca-e-meio-ambiente/eletrico-fogo-e-impressao-desacompanhada.md).

## Relações

- part-of → [workflow digital](../01-fundamentos/workflow-digital-cad-ate-peca.md)
- depends-on → unidades/manifold corretos
- related-to → [glossário 3MF/STL](../23-glossario/glossario-inicial.md)

## Veja também

- [Reparo de malha](reparo-de-malha.md)
- [Unidades, escala e manifold](unidades-escala-manifold.md)

## Fontes

- Definições operacionais do fluxo desta base e glossário interno
- Padrão 3MF (ecossistema 3MF Consortium) — consultar documentação oficial do consórcio quando precisar de detalhes de schema; esta página não republica o padrão

## Lacunas

- Matriz CAD→export (quais softwares preservam quais pacotes 3MF): futura
- Comparativo STEP vs 3MF para usinagem/AM híbrida: fora do escopo desta página
