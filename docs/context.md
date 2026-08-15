# Chat summary — 3d-print project

> F.2 structured summary · Updated: 2026-08-15 (command `/summarize` → `docs/context.md`)

---

## 1. Task atual

- **[OK]** Sistema híbrido de otimização 3D (wiki + playbook + `core/`) implantado conforme `start_plan.md` / fases engineer 0–4.
- **[OK]** Documentação operacional em **inglês**, densificada; ebook (Guia Maker) permanece em PT (CC BY-SA) com meta em EN.
- **[OK]** Multi-impressora preparado (`docs/printers/`); só **A1 Mini** preenchida.
- **[OK]** Biblioteca de materiais expandida (PLA/PETG + TPU/ABS-ASA/PA/PC/composites) com capability gates.
- **Último pedido:** `/summarize` gravado neste arquivo.

Nada em execução agora; sessão estável pós-validação de links.

---

## 2. Decisões

| Tema | Decisão |
|---|---|
| Sistema | **C** — híbrido: agente/wiki decidem; `core/` inspeciona/repara leve |
| Otimização | **B** — receita Bambu Studio + malha leve (não remodelagem pesada) |
| Fatiador | **Bambu Studio** (Orca opcional depois) |
| Hardware ativo | **Bambu Lab A1 Mini** / bico **0.4 mm** |
| Materiais | **PLA** default; **PETG** day-1; demais documentados com risk/capability gate |
| Docs path | `Documentações` → **`docs/`** |
| Tooling path | `tools/` → **`core/`** (`python -m core …`) |
| Idioma wiki/playbook/plan | **English** |
| Ebook capítulos | **Português** (fonte CC BY-SA); README/CREDITOS em EN |
| Originais | Arquivar em `docs/_arquivo/` (não hard-delete) |
| Manuais A1 Mini | `docs/printers/A1mini/` · PDFs em `docs/_arquivo/printers/A1mini/` |
| Outras impressoras | Só **estrutura** (`printers/INDEX` + `_TEMPLATE`); sem conteúdo inventado |
| 3MF settings Bambu | Best-effort; se opaco → documentar no `plan/*.md` + Studio UI |
| Commits | Só quando o usuário pedir |

---

## 3. Arquivos / árvore relevante

### Entrada operacional
- `playbook.md` — SOP (active printer + pipeline)
- `plan/_template.md`, `plan/_exemplo-dry-run.md`
- `start_plan.md` — plano original (+ errata docs/core)
- `docs/context.md` — este resumo (F.2)

### Core (Python)
- `core/` — `validate-wiki`, `inspect-mesh`, `inspect-3mf`, `repair-mesh`
- `core/requirements.txt`, `core/README.md`
- `core/convert_ebook_adoc.py`, `core/convert_a1_pdfs.py` (stub OCR-only)
- `tests/` — 10 testes (pytest green na última corrida)

### Docs
- `docs/projeto/` — wiki neural (**71** MD): hardware, materiais, geometria, proposito, fatiamento, qualidade, troubleshooting, perfis-a1-mini, profiles/, workflow
- `docs/projeto/materiais/` — **12** MD (INDEX, template, choosing, PLA, PETG, drying, temps, TPU, ABS/ASA, PA, PC, composites)
- `docs/printers/INDEX.md` + `A1mini/` + `_TEMPLATE/`
- `docs/ebook/` — MD convertido + `imagens/` + `assets/`
- `docs/_arquivo/ebook/`, `docs/_arquivo/printers/A1mini/`

### Modelos
- `3ds/original/_sample_cube.stl`
- `3ds/upgraded/_sample_cube.stl` (dry-run)

### Removido / migrado
- `Documentações/` → `docs/`
- `docs/A1mini/` → `docs/printers/A1mini/`
- pasta `tools/` consolidada em `core/`

---

## 4. TODO / status (sessão)

| ID | Item | Status |
|---|---|---|
| Implantação fases 0–4 | core + wiki + conversões + playbook | **[OK]** |
| Docs EN + densificar | projeto wiki | **[OK]** |
| printers/A1mini + refs | multi-printer ready | **[OK]** |
| Materiais densos + template | PLA…composites | **[OK]** |
| `validate-wiki` + pytest | última verificação | **[OK]** |
| Commit git | não pedido | **[WARNING]** pendente se/quando usuário pedir |
| Traduzir ebook PT→EN | opcional, não pedido agora | — |
| Otimizar modelo real do usuário | aguardando arquivo em `3ds/original/` | — |

---

## 5. Próximos passos (sugeridos)

1. Colocar um modelo real em `3ds/original/` e apontar `playbook.md` para a primeira otimização real.
2. (Opcional) `git commit` do estado atual — só se autorizado.
3. (Opcional) Traduzir capítulos do ebook para EN sob CC BY-SA.
4. Quando comprar PETG/outra máquina: preencher registry / risk plan conforme wiki.

---

## 6. Contexto / atenção

- **Comando de uso:** `playbook.md` + path do modelo; nunca escrever em `3ds/original/`.
- **CLI:** `python -m core validate-wiki docs` · `inspect-mesh` · `inspect-3mf` · `repair-mesh`.
- **ABS/ASA/PA/PC** no A1 Mini open-frame = documentados mas **capability-gated** (risk plan).
- Subagents tardios de densificação EN terminaram sem quebrar paths `printers/` nem a library de materiais.
- PDFs A1 Mini são Illustrator (sem text layer) → OCR; não re-rodar `convert_a1_pdfs.py` (stub exit 2).
- Números de processo: marcar **validate on printer** quando incerto.

---

## 7. Verificação (última evidência da sessão)

- `python -m pytest tests/ -q` → **10 passed**
- `python -m core validate-wiki docs` → **OK (exit 0)**
- Wiki `docs/projeto`: **71** páginas MD; materiais: **12** arquivos
