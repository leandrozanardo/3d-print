---
id: "meta.gaps"
title: "Lacunas explícitas"
summary: "Lacunas após Waves 10–11: vat deep, settings catalog, glossário, VOC/UFP FFF com NIOSH detalhado, grades de pó por liga, ANVISA, experimentos locais, validator de front matter."
doc_type: "audit"
domain: ["meta"]
knowledge_status: "draft"
evidence_status: "unknown"
safety_level: "normal"
confidence: "high"
last_reviewed: "2026-08-16"
review_cycle: "per-batch"
related: ["meta.coverage", "meta.contradictions", "meta.continuation"]
tags: ["gaps"]
---

# Lacunas

Atualizado pós-Wave 10–11. Itens resolvidos parcialmente riscam contexto, não exclusão.

## Cobertura de conteúdo

1. **Vat photopolymerization** — parcialmente coberto por peers (`tech.vat-photopolymerization`, `tech.sla-dlp-msla`); ainda falta taxonomia de defeitos resina e materiais atômicos
2. Catálogo semântico completo de settings Bambu Studio (paths/versão)
3. Taxonomia completa de falhas FFF (além de warping/adesão) e resina
4. Segurança VOC/UFP FFF — página existe (`hazard.voc-ufp-ventilation`); aprofundar com números só via SDS/NIOSH pinados
5. DfAM, metrologia, economia — ainda hub-only / parcial peer
6. Qualquer impressora além de A1 Mini
7. Materiais FFF além de PLA/PETG; grades de pó (PA12, Ti64, AlSi10Mg) como páginas próprias
8. Glossário pt-BR ↔ EN sistemático
9. Parâmetros OEM (energia, refresh %, shrink BJ) — propositalmente não inventados; faltam pinagens com datasheet
10. NFPA 652/484 e limites de exposição numéricos — não resumidos (evitar falsa conformidade)
11. Mapeamento ANVISA / food-contact BR
12. Galeria visual de defeitos PBF
13. `source.*` dedicadas Marlin/Klipper docs oficiais
14. Revalidar cobertura real vs matriz após merges multi-agent

## Ferramentas

1. ~~`validate-wiki` não valida IDs/front matter~~ → **resolvido 2026-08-16** com `--strict` (`core/wiki_validate.py`); warnings de aliases/citações ainda abertos
2. Sem derivação automática completa da matriz de cobertura a partir do corpus
3. Lint de absolutos suaves ainda em modo warning

## Catálogo de impressoras

1. Denominador de mercado não fechado
2. Fabricantes seed não investigados (exceto fatia A1 Mini)
3. Nenhuma impressora em DoD `documented` / `cataloged` formal além do conteúdo draft A1 Mini

## Processo

1. Nenhuma página `verified` ainda
2. Experimentos locais não registrados como `experiment.*`
3. Versões exatas do Bambu Studio usadas nos paths de UI ainda não pinadas

## Licença

1. Política de reutilização de trechos do ebook CC BY-SA ainda não aplicada a páginas derivadas (nenhuma cópia textual feita nas waves 10–11)
