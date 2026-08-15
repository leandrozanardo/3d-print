# 3D Print Optimization Wiki + Playbook Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Build a dense, cross-linked Portuguese (PT-BR) knowledge wiki for Bambu Lab A1 Mini + a hybrid agent playbook that reads a model from `3ds/original`, consults the wiki, and delivers an optimized artifact in `3ds/upgraded` with a matching change log in `plan/`.

**Architecture:** Documentation-first neural wiki under `docs/projeto` (hub + topic nodes + backlinks). Operational entrypoint is `playbook.md`. Conversion of existing sources (ebook AsciiDoc, A1 Mini PDFs) into Markdown with originals moved to `docs/_arquivo/`. Light Python toolkit in `core/` validates wiki links and inspects/repairs STL/3MF; heavy geometry remeshing is out of scope (optimization mode B).

**Tech Stack:** Markdown wiki (PT-BR), Bambu Studio project `.3mf` as upgraded deliverable when possible, Python 3.11+ package `core/` + pytest, `trimesh` + stdlib `zipfile` for file analysis.

**Path errata (approved during implant):** `Documentações` → `docs`; `tools/` → `core/` (`python -m core ...`). See `docs/projeto/IMPLANTACAO-FASES.md`.

## Global Constraints

- System mode: **C (hybrid)** — playbook + wiki first; light analysis scripts second; no full auto-optimizer app in v1.
- Optimization mode: **B** — print recipe (orientation, supports, profiles, brim, temps, speeds) + light mesh ops (repair, scale, embedded orientation, non-manifold cleanup). No heavy remodel unless source is parametric or user explicitly requests.
- Slicer reference: **Bambu Studio** (A1 Mini). OrcaSlicer is optional future; document only when a clear gain appears.
- Materials: **PLA primary**; **PETG** fully documented and profiled from day 1 even before purchase.
- Hardware-specific content: **Bambu Lab A1 Mini** only. General FFF knowledge is allowed and encouraged.
- Part intents to prioritize: miniatures, tools, decorative parts, vases, characters/figurines.
- Language: wiki, playbook, and `plan/*.md` in **English**; ebook chapter bodies may remain Portuguese source (CC BY-SA) with English meta; all code/comments/identifiers in **English**.
- Source handling: convert to MD, **archive** originals under `Documentações/_arquivo/` (do not hard-delete). Ebook is **CC BY-SA 4.0** — keep attribution, license copy, and ShareAlike on derived MD.
- Model I/O: read from `3ds/original/`; write optimized to `3ds/upgraded/`; write rationale to `plan/<same-basename>.md`.
- Entry ritual: user always points `playbook.md` + the target 3D file to start an optimization run.
- Wiki rule: every new doc must have inbound link from an index/hub and outbound links to related nodes (no orphan pages).
- YAGNI: no web UI, no database, no cloud sync in v1.
- Commits: only when the user explicitly asks.

### Locked decisions (brainstorming)

| Topic | Choice |
|---|---|
| System | C — hybrid |
| Optimize | B — recipe + light mesh |
| Slicer | A — Bambu Studio (Orca later if worth it) |
| Materials | PLA now; PETG contemplated |
| Source files | B — MD active + `_arquivo/` |
| Part mix | Miniatures, tools, decorative, vases, characters |

### Approaches considered

| ID | Approach | Verdict |
|---|---|---|
| A1 | Wiki dump only, ad-hoc chat optimization | Rejected — no repeatable SOP |
| A2 | Full CLI auto-optimizer day 1 | Rejected — YAGNI; STL lacks true parameters |
| A3 | Wiki neural net + playbook SOP + validators + later inspectors | **Selected** |

### Target tree (after implementation)

```text
3d-print/
├── playbook.md                          # agent entry SOP
├── start_plan.md                        # this plan
├── 3ds/
│   ├── original/                        # inputs (untouched)
│   └── upgraded/                        # optimized outputs
├── plan/
│   └── _template.md                     # upgrade report template
├── tools/                               # Python validators/inspectors
│   ├── requirements.txt
│   ├── validate_wiki_links.py
│   ├── inspect_mesh.py                  # phase 2
│   └── inspect_3mf.py                   # phase 2
├── tests/
│   ├── test_validate_wiki_links.py
│   ├── test_inspect_mesh.py
│   └── fixtures/
└── Documentações/
    ├── _arquivo/                        # originals (adoc, pdf, ebook git bits)
    ├── A1mini/                          # converted MD + assets
    ├── ebook/                           # converted MD + assets (CC BY-SA)
    └── projeto/                         # NEW dense wiki hub
        ├── INDEX.md
        ├── 00-como-usar-esta-wiki.md
        ├── fontes-e-atribuicao.md
        ├── hardware/
        ├── materiais/
        ├── geometria/
        ├── proposito/
        ├── fatiamento/
        ├── qualidade-e-acabamento/
        ├── troubleshooting/
        ├── perfis-a1-mini/
        └── workflow/
```

---

### Task 1: Wiki link validator (TDD foundation)

**Files:**
- Create: `tools/requirements.txt`
- Create: `tools/validate_wiki_links.py`
- Create: `tests/test_validate_wiki_links.py`
- Create: `tests/fixtures/wiki_ok/INDEX.md`
- Create: `tests/fixtures/wiki_ok/a.md`
- Create: `tests/fixtures/wiki_broken/INDEX.md`
- Create: `tests/fixtures/wiki_broken/a.md`

**Interfaces:**
- Consumes: nothing (bootstrap)
- Produces: `validate_wiki_links(root: Path) -> list[str]` returning human-readable error strings; empty list means pass. CLI: `python tools/validate_wiki_links.py <root>` exit 0 if valid, 1 if errors.

- [ ] **Step 1: Write the failing test**

```python
# tests/test_validate_wiki_links.py
from pathlib import Path
import sys

ROOT = Path(__file__).resolve().parents[1]
sys.path.insert(0, str(ROOT / "tools"))

from validate_wiki_links import validate_wiki_links


def test_valid_fixture_has_no_errors():
    errors = validate_wiki_links(ROOT / "tests" / "fixtures" / "wiki_ok")
    assert errors == []


def test_broken_link_is_reported():
    errors = validate_wiki_links(ROOT / "tests" / "fixtures" / "wiki_broken")
    assert any("missing.md" in e for e in errors)
```

Fixture `wiki_ok/INDEX.md`:

```markdown
# OK
See [A](a.md)
```

Fixture `wiki_ok/a.md`:

```markdown
# A
Back to [Index](INDEX.md)
```

Fixture `wiki_broken/INDEX.md`:

```markdown
# Broken
See [Missing](missing.md)
```

Fixture `wiki_broken/a.md`:

```markdown
# A
```

- [ ] **Step 2: Run test to verify it fails**

Run: `python -m pytest tests/test_validate_wiki_links.py -v`  
Expected: FAIL with `ModuleNotFoundError` or import error for `validate_wiki_links`.

- [ ] **Step 3: Write minimal implementation**

`tools/requirements.txt`:

```text
pytest>=8.0.0
trimesh>=4.0.0
numpy>=1.26.0
```

`tools/validate_wiki_links.py`:

```python
"""Validate relative Markdown links under a documentation root."""

from __future__ import annotations

import re
import sys
from pathlib import Path

LINK_RE = re.compile(r"\[([^\]]+)\]\(([^)]+)\)")


def validate_wiki_links(root: Path) -> list[str]:
    root = root.resolve()
    errors: list[str] = []
    md_files = sorted(root.rglob("*.md"))
    for md in md_files:
        text = md.read_text(encoding="utf-8")
        for _label, target in LINK_RE.findall(text):
            if target.startswith(("http://", "https://", "mailto:")):
                continue
            if target.startswith("#"):
                continue
            path_part = target.split("#", 1)[0]
            if not path_part:
                continue
            resolved = (md.parent / path_part).resolve()
            try:
                resolved.relative_to(root)
            except ValueError:
                errors.append(f"{md}: link escapes root -> {target}")
                continue
            if not resolved.exists():
                errors.append(f"{md}: broken link -> {target}")
    return errors


def main(argv: list[str]) -> int:
    if len(argv) != 2:
        print("Usage: python tools/validate_wiki_links.py <docs-root>")
        return 2
    errors = validate_wiki_links(Path(argv[1]))
    for err in errors:
        print(err)
    return 1 if errors else 0


if __name__ == "__main__":
    raise SystemExit(main(sys.argv))
```

- [ ] **Step 4: Run test to verify it passes**

Run: `python -m pytest tests/test_validate_wiki_links.py -v`  
Expected: PASS

- [ ] **Step 5: Commit** (only if user asks)

```bash
git add tools/requirements.txt tools/validate_wiki_links.py tests/
git commit -m "feat: add markdown wiki link validator"
```

---

### Task 2: Archive existing sources and convert ebook → Markdown

**Files:**
- Create: `Documentações/_arquivo/README.md`
- Create: `Documentações/ebook/README.md` (attribution + how converted)
- Create: `Documentações/ebook/LICENSE` (CC BY-SA 4.0 text retained)
- Create: `Documentações/ebook/CREDITOS.md`
- Create: `Documentações/ebook/INDEX.md`
- Create: one MD per chapter currently as `.adoc` (see list below)
- Move: entire current ebook binary/source tree (`.adoc`, `.git`, `fontes/`, Makefile, etc.) → `Documentações/_arquivo/ebook/`
- Copy/move: SVG/PNG assets needed by MD into `Documentações/ebook/assets/` (from archived `fontes/`)

**Chapter mapping (adoc → md):**

| Source (archive after convert) | Target MD |
|---|---|
| `guia-maker-da-impressao-3d.adoc` | `Documentações/ebook/INDEX.md` (toc only) |
| `guia-maker-da-impressao-3d-prefacio.adoc` | `Documentações/ebook/01-prefacio.md` |
| `guia-maker-da-impressao-3d-introducao.adoc` | `Documentações/ebook/02-introducao.md` |
| `guia-maker-da-impressao-3d-historico.adoc` | `Documentações/ebook/03-historico.md` |
| `guia-maker-da-impressao-3d-universomaker.adoc` | `Documentações/ebook/04-universo-maker.md` |
| `guia-maker-da-impressao-3d-tecnologiafff.adoc` | `Documentações/ebook/05-tecnologia-fff.md` |
| `guia-maker-da-impressao-3d-materiaisfff.adoc` | `Documentações/ebook/06-materiais-fff.md` |
| `guia-maker-da-impressao-3d-malhas.adoc` | `Documentações/ebook/07-malhas.md` |
| `guia-maker-da-impressao-3d-operacao.adoc` | `Documentações/ebook/08-operacao.md` |
| `guia-maker-da-impressao-3d-gcode.adoc` | `Documentações/ebook/09-gcode.md` |
| `guia-maker-da-impressao-3d-acabamento.adoc` | `Documentações/ebook/10-acabamento.md` |
| `guia-maker-da-impressao-3d-manutencao.adoc` | `Documentações/ebook/11-manutencao.md` |
| `guia-maker-da-impressao-3d-apendices.adoc` | `Documentações/ebook/12-apendices.md` |
| `guia-maker-da-impressao-3d-sobre.adoc` | `Documentações/ebook/13-sobre.md` |

**Interfaces:**
- Consumes: Task 1 validator
- Produces: browsable MD ebook tree with relative links; originals only under `_arquivo/ebook/`

- [ ] **Step 1: Create archive README**

```markdown
# Arquivo de originais

Fontes não-Markdown preservadas após conversão.
Não editar aqui — editar apenas os `.md` ativos em `Documentações/`.
```

- [ ] **Step 2: Convert each `.adoc` to Markdown without content loss**

Rules for conversion:
1. Preserve headings, lists, tables, notes/tips/warnings (map AsciiDoc `NOTE`/`TIP`/`WARNING`/`IMPORTANT`/`CAUTION` to blockquotes with bold label).
2. Rewrite image refs to `assets/<filename>`.
3. Strip AsciiDoc include/conditionals; inline already-included chapter content into discrete files.
4. Keep formulas as fenced `latex` or Unicode when simple.
5. Every chapter header must include:

```markdown
> **Fonte:** Guia Maker de Impressão 3D (Cláudio Luís Marques Sampaio) — CC BY-SA 4.0  
> **Original arquivado em:** [`Documentações/_arquivo/ebook/`](../_arquivo/ebook/)  
> **Obra:** http://www.makerlinux.com.br/ebook
```

6. After each chapter file exists and links resolve, move the corresponding `.adoc` into `_arquivo/ebook/`.
7. Move `.git/`, `Makefile`, `fontes/`, and other non-MD ebook scaffolding into `_arquivo/ebook/` in one batch after chapter conversion succeeds.
8. Keep a copy of `LICENÇA`/`LICENSE` at `Documentações/ebook/LICENSE`.

- [ ] **Step 3: Write `Documentações/ebook/CREDITOS.md` and `INDEX.md` with full TOC linking every chapter**

- [ ] **Step 4: Validate links**

Run: `python tools/validate_wiki_links.py "Documentações/ebook"`  
Expected: exit 0 (or only pre-declared external http links skipped).

- [ ] **Step 5: Spot-check content integrity**

Manually verify that `05-tecnologia-fff.md` and `08-operacao.md` (largest chapters) retained tables and critical diagrams links. If an image is missing, copy it from `_arquivo/ebook/fontes/` into `Documentações/ebook/assets/`.

- [ ] **Step 6: Commit** (only if user asks)

```bash
git add Documentações/ebook Documentações/_arquivo
git commit -m "docs: convert maker ebook to markdown and archive sources"
```

---

### Task 3: Convert A1 Mini PDFs → Markdown and archive PDFs

**Files:**
- Create: `Documentações/A1mini/INDEX.md`
- Create: `Documentações/A1mini/01-manual-usuario.md` (from one PDF — identify by content)
- Create: `Documentações/A1mini/02-guia-rapido-ou-specs.md` (from the other PDF)
- Create: `Documentações/A1mini/assets/` (extracted figures as needed)
- Modify: `Documentações/A1mini/wiki.md` → replace raw URL with linked hub pointing to converted pages + official wiki
- Move: both PDFs → `Documentações/_arquivo/A1mini/`

**Interfaces:**
- Consumes: Task 1 validator
- Produces: A1 Mini local MD corpus linked to official Bambu wiki

- [ ] **Step 1: Identify each PDF**

Run a text extraction pass (e.g. `pdftotext` if available, or Python `pypdf`) on:
- `7ff47ecf930b41528bcb99791e282fd4.pdf`
- `e3b68efcce2840cfbfae3b4a6332aa05.pdf`

Rename logically in the archive (example): `_arquivo/A1mini/a1-mini-user-manual.pdf`.

- [ ] **Step 2: Convert full textual content to MD**

Requirements:
1. No intentional truncation — if PDF is huge, split into numbered MD parts (`01a`, `01b`) but keep an INDEX that lists all parts.
2. Preserve warnings, specs tables, maintenance schedules, nozzle/bed temps, AMS Lite notes if present.
3. Extract key images when they carry unique info (bed layout, wiring, UI screens); store under `Documentações/A1mini/assets/`.
4. Add header:

```markdown
> **Hardware:** Bambu Lab A1 Mini  
> **PDF arquivado em:** [`Documentações/_arquivo/A1mini/`](../_arquivo/A1mini/)  
> **Wiki oficial:** https://wiki.bambulab.com/en/a1-mini/manual
```

- [ ] **Step 3: Rewrite `wiki.md` as a stub hub**

```markdown
# A1 Mini — pontes

- [Índice local](INDEX.md)
- [Wiki oficial Bambu Lab](https://wiki.bambulab.com/en/a1-mini/manual)
- [Hub do projeto](../projeto/INDEX.md)
```

- [ ] **Step 4: Move PDFs to archive; validate links**

Run: `python tools/validate_wiki_links.py "Documentações/A1mini"`  
Expected: exit 0

- [ ] **Step 5: Commit** (only if user asks)

```bash
git add Documentações/A1mini Documentações/_arquivo/A1mini
git commit -m "docs: convert A1 Mini PDFs to markdown and archive binaries"
```

---

### Task 4: Create `Documentações/projeto` neural wiki skeleton + hub

**Files:**
- Create: `Documentações/projeto/INDEX.md`
- Create: `Documentações/projeto/00-como-usar-esta-wiki.md`
- Create: `Documentações/projeto/fontes-e-atribuicao.md`
- Create: `Documentações/projeto/mapa-da-rede.md` (graph-like list of all nodes + relations)
- Create: empty section indexes listed below (each with purpose + child links)

**Section indexes to create:**

```text
Documentações/projeto/hardware/INDEX.md
Documentações/projeto/materiais/INDEX.md
Documentações/projeto/geometria/INDEX.md
Documentações/projeto/proposito/INDEX.md
Documentações/projeto/fatiamento/INDEX.md
Documentações/projeto/qualidade-e-acabamento/INDEX.md
Documentações/projeto/troubleshooting/INDEX.md
Documentações/projeto/perfis-a1-mini/INDEX.md
Documentações/projeto/workflow/INDEX.md
```

**Interfaces:**
- Consumes: converted ebook + A1 Mini docs (link out)
- Produces: navigable hub that every later page attaches to

- [ ] **Step 1: Write `INDEX.md` as the neural hub**

Must include:
1. One-paragraph project mission (peças perfeitas, suportes firmes/removíveis, falhas evitadas, acabamento superior).
2. Quickstart: “para otimizar um modelo, abra `playbook.md`”.
3. Link grid to every section INDEX + ebook + A1mini.
4. Legend of page types: `hardware`, `material`, `geometria`, `proposito`, `perfil`, `falha`, `workflow`.

- [ ] **Step 2: Write `00-como-usar-esta-wiki.md`**

Explain: how agents/humans traverse links; rule that every page has “Relacionados” and “Voltar ao hub”; how `plan/*.md` must cite wiki pages used.

- [ ] **Step 3: Write `fontes-e-atribuicao.md`**

Seed with:
- Guia Maker (CC BY-SA 4.0) + link to local ebook MD
- Bambu Lab Wiki / manuals
- Placeholder sections for Ellis Print Tuning Guide, Teaching Tech, CNC Kitchen, MakerWorld/Bambu forum, r/FixMyPrint — to be filled in Task 5 with concrete URLs and what was absorbed

- [ ] **Step 4: Write each section INDEX with 3–6 planned child links (can be stubs titled and linked; stubs must say “conteúdo na Task 5/6”)**

Stub format (required — no empty files):

```markdown
# Título

> Status: stub — expandir na Task correspondente

## Objetivo
...

## Relacionados
- [Hub](../INDEX.md)
```

- [ ] **Step 5: Validate**

Run: `python tools/validate_wiki_links.py "Documentações/projeto"`  
Expected: exit 0

- [ ] **Step 6: Commit** (only if user asks)

```bash
git add Documentações/projeto
git commit -m "docs: scaffold projeto neural wiki hub"
```

---

### Task 5: Dense community research corpus (general FFF + A1 Mini)

**Files (create all; each ≥ substantial practical content, not stubs):**

**Hardware**
- `Documentações/projeto/hardware/a1-mini-visao-geral.md`
- `Documentações/projeto/hardware/a1-mini-mesa-e-adesao.md`
- `Documentações/projeto/hardware/a1-mini-extrusao-e-bico.md`
- `Documentações/projeto/hardware/a1-mini-manutencao.md`
- `Documentações/projeto/hardware/a1-mini-ams-lite.md` (optional accessory notes)

**Materiais**
- `Documentações/projeto/materiais/pla.md`
- `Documentações/projeto/materiais/petg.md`
- `Documentações/projeto/materiais/secagem-e-umidade.md`
- `Documentações/projeto/materiais/tabela-temperaturas-a1-mini.md`

**Geometria (decision trees)**
- `Documentações/projeto/geometria/classificar-geometria.md`
- `Documentações/projeto/geometria/balancos-e-angulos.md`
- `Documentações/projeto/geometria/paredes-finas.md`
- `Documentações/projeto/geometria/organicos-e-miniaturas.md`
- `Documentações/projeto/geometria/encaixes-mecanicos.md`
- `Documentações/projeto/geometria/vasos-e-vasilhames.md`

**Propósito**
- `Documentações/projeto/proposito/miniaturas.md`
- `Documentações/projeto/proposito/ferramentas.md`
- `Documentações/projeto/proposito/decorativas.md`
- `Documentações/projeto/proposito/vasos.md`
- `Documentações/projeto/proposito/personagens.md`

**Fatiamento / qualidade**
- `Documentações/projeto/fatiamento/orientacao.md`
- `Documentações/projeto/fatiamento/suportes-estrategia.md`
- `Documentações/projeto/fatiamento/suportes-face-e-interface.md`
- `Documentações/projeto/fatiamento/preenchimento-e-paredes.md`
- `Documentações/projeto/fatiamento/altura-de-camada-e-velocidade.md`
- `Documentações/projeto/fatiamento/brim-raft-saia.md`
- `Documentações/projeto/qualidade-e-acabamento/costura-e-superficie.md`
- `Documentações/projeto/qualidade-e-acabamento/stringing-e-retract.md`
- `Documentações/projeto/qualidade-e-acabamento/elephant-foot-e-primeira-camada.md`
- `Documentações/projeto/qualidade-e-acabamento/pos-processamento.md`

**Troubleshooting**
- `Documentações/projeto/troubleshooting/INDEX.md` (expand)
- `Documentações/projeto/troubleshooting/falha-adesao.md`
- `Documentações/projeto/troubleshooting/warping.md`
- `Documentações/projeto/troubleshooting/under-extrusion.md`
- `Documentações/projeto/troubleshooting/layer-shift.md`
- `Documentações/projeto/troubleshooting/suporte-dificil-remover.md`
- `Documentações/projeto/troubleshooting/detalhe-perdido-miniatura.md`
- `Documentações/projeto/troubleshooting/matriz-sintoma-causa.md`

**Research sources that MUST be consulted and cited in `fontes-e-atribuicao.md` (and in-page “Fontes” footers):**

1. https://wiki.bambulab.com/ (A1 Mini manual, maintenance, filament guides)
2. https://forum.bambulab.com/ (A1 Mini quality / support threads — summarize patterns, do not dump copyrighted posts wholesale)
3. https://github.com/AndrewEllis93/Print-Tuning-Guide (Ellis)
4. Teaching Tech calibration concepts (temp tower, retraction, flow)
5. CNC Kitchen strength / infill / wall research summaries (cite articles)
6. MakerWorld / Bambu Studio preset documentation
7. Prusa Knowledge Base (general FFF failure modes — adapt to A1 Mini)
8. r/FixMyPrint common failure taxonomy (synthesize, don’t scrape personal data)
9. Local converted ebook chapters (Tasks 2) — cross-link heavily
10. Local A1 Mini MD (Task 3)

**Page template (mandatory for every non-stub page):**

```markdown
# Título

## Resumo
(2–4 frases)

## Quando usar
...

## Regras para A1 Mini
...

## Presets sugeridos (PLA)
| Parâmetro | Valor | Motivo |
|---|---|---|

## Presets sugeridos (PETG)
| Parâmetro | Valor | Motivo |
|---|---|---|

## Geometria / propósito relacionados
- [...]

## Troubleshooting relacionado
- [...]

## Relacionados
- [Hub](../INDEX.md)

## Fontes
- ...
```

**Interfaces:**
- Consumes: Tasks 2–4
- Produces: dense linked corpus used by playbook decisions

- [ ] **Step 1: Research pass — collect notes per source into `Documentações/projeto/fontes-e-atribuicao.md` (URL + what knowledge absorbed)**

- [ ] **Step 2: Write all geometry + purpose pages first (they drive optimization branching)**

- [ ] **Step 3: Write materials + hardware pages**

- [ ] **Step 4: Write slicing + quality + troubleshooting pages with explicit A1 Mini numbers where known; mark unknowns as “validar na impressora” rather than inventing false precision**

- [ ] **Step 5: Update every section INDEX and `mapa-da-rede.md` with real links (remove stub status)**

- [ ] **Step 6: Validate entire `Documentações/`**

Run: `python tools/validate_wiki_links.py "Documentações"`  
Expected: exit 0

- [ ] **Step 7: Commit** (only if user asks)

```bash
git add Documentações/projeto
git commit -m "docs: add dense A1 Mini project wiki corpus"
```

---

### Task 6: A1 Mini profile sheets (Bambu Studio)

**Files:**
- Create: `Documentações/projeto/perfis-a1-mini/pla-miniatura-0.4.md`
- Create: `Documentações/projeto/perfis-a1-mini/pla-ferramenta-resistente-0.4.md`
- Create: `Documentações/projeto/perfis-a1-mini/pla-decorativo-superficie-0.4.md`
- Create: `Documentações/projeto/perfis-a1-mini/pla-vaso-vase-mode-0.4.md`
- Create: `Documentações/projeto/perfis-a1-mini/pla-personagem-detalhe-0.4.md`
- Create: `Documentações/projeto/perfis-a1-mini/petg-funcional-0.4.md`
- Create: `Documentações/projeto/perfis-a1-mini/suportes-arvore-vs-normal.md`
- Modify: `Documentações/projeto/perfis-a1-mini/INDEX.md`

**Interfaces:**
- Consumes: Task 5 corpus
- Produces: named profile recipes referenced by playbook and `plan/*.md`

Each profile page must include concrete Bambu Studio fields:
- layer height, first layer height
- wall loops, top/bottom shells
- infill %, pattern
- support type (normal/tree), threshold angle, interface layers, Z/XY distance
- brim type/width
- nozzle/bed temps (PLA and notes for PETG profile)
- cooling %, slow-down for bridges
- speed overview (outer wall vs infill)
- when NOT to use this profile

- [ ] **Step 1: Draft all six profile pages + supports comparison**

- [ ] **Step 2: Cross-link each profile to matching `proposito/*.md` and `geometria/*.md`**

- [ ] **Step 3: Validate links**

Run: `python tools/validate_wiki_links.py "Documentações/projeto"`  
Expected: exit 0

- [ ] **Step 4: Commit** (only if user asks)

```bash
git add Documentações/projeto/perfis-a1-mini
git commit -m "docs: add A1 Mini Bambu Studio profile sheets"
```

---

### Task 7: Playbook SOP + upgrade plan template + workflow docs

**Files:**
- Modify: `playbook.md` (fill completely — this is the agent entrypoint)
- Create: `plan/_template.md`
- Create: `Documentações/projeto/workflow/otimizar-modelo.md`
- Create: `Documentações/projeto/workflow/checklist-qualidade.md`
- Create: `Documentações/projeto/workflow/quando-editar-malha.md`
- Create: `Documentações/projeto/workflow/como-escrever-plan-md.md`
- Modify: `Documentações/projeto/workflow/INDEX.md`
- Modify: `Documentações/projeto/INDEX.md` (link workflows)

**Interfaces:**
- Consumes: Tasks 4–6
- Produces: executable human/agent procedure

- [ ] **Step 1: Write `playbook.md` with this exact section structure**

```markdown
# Playbook — Otimização A1 Mini

## Entrada obrigatória
- Este arquivo
- Caminho do modelo em `3ds/original/`

## Premissas do projeto
(sistema C, otimização B, Bambu Studio, PLA/PETG, etc.)

## Pipeline (seguir em ordem)
1. Inventário do arquivo (STL vs 3MF; metadados; unidades)
2. Classificar geometria → link wiki
3. Classificar propósito → link wiki
4. Escolher perfil `perfis-a1-mini/*`
5. Decidir orientação / suportes / brim
6. Intervenções leves de malha (se necessário) — ver workflow
7. Gerar artefato em `3ds/upgraded/`
8. Escrever `plan/<basename>.md` a partir de `_template.md`
9. Autocheck contra `checklist-qualidade.md`

## Regras de ouro
- Nunca alterar `3ds/original/`
- Sempre citar páginas da wiki usadas
- Preferir suporte firme e removível a “zero suporte” se qualidade cair
- Não inventar números: se incerto, marcar validação na impressora

## Saídas
- `3ds/upgraded/<nome>.*`
- `plan/<nome>.md`
```

- [ ] **Step 2: Write `plan/_template.md`**

```markdown
# Plano de otimização — <nome-do-arquivo>

## Entrada
- Arquivo: `3ds/original/...`
- Formato:
- Material alvo: PLA | PETG
- Propósito:
- Geometria (resumo):

## Diagnóstico
- Problemas potenciais:
- Restrições:

## Alterações aplicadas
| # | Alteração | Motivo | Wiki |
|---|---|---|---|

## Perfil Bambu Studio escolhido
- Página:
- Desvios do perfil (se houver):

## Malha
- Ops leves:
- Ferramenta:

## Resultado esperado
- Qualidade:
- Suportes:
- Riscos residuais:

## Como imprimir / validar
1. ...
```

- [ ] **Step 3: Write the four workflow pages; link them from playbook and hub**

- [ ] **Step 4: Validate**

Run: `python tools/validate_wiki_links.py "Documentações"`  
Also open `playbook.md` and confirm every mentioned path exists.

- [ ] **Step 5: Commit** (only if user asks)

```bash
git add playbook.md plan/_template.md Documentações/projeto/workflow
git commit -m "docs: add optimization playbook and plan template"
```

---

### Task 8: Mesh + 3MF inspectors (hybrid phase 2)

**Files:**
- Create: `tools/inspect_mesh.py`
- Create: `tools/inspect_3mf.py`
- Create: `tests/test_inspect_mesh.py`
- Create: `tests/fixtures/cube_ok.stl` (generate in test setup)
- Modify: `playbook.md` (add optional “rodar inspectors” step)
- Modify: `Documentações/projeto/workflow/otimizar-modelo.md`

**Interfaces:**
- Consumes: `trimesh` from requirements
- Produces:
  - `inspect_mesh(path: Path) -> dict` with keys: `watertight: bool`, `bounds: tuple`, `volume: float | None`, `face_count: int`, `issues: list[str]`
  - `inspect_3mf(path: Path) -> dict` with keys: `files: list[str]`, `has_model: bool`, `metadata_notes: list[str]`

- [ ] **Step 1: Write failing tests for mesh inspector**

```python
# tests/test_inspect_mesh.py
from pathlib import Path
import sys
import numpy as np
import trimesh

ROOT = Path(__file__).resolve().parents[1]
sys.path.insert(0, str(ROOT / "tools"))

from inspect_mesh import inspect_mesh


def _write_cube(path: Path) -> None:
    mesh = trimesh.creation.box(extents=(10.0, 10.0, 10.0))
    mesh.export(path)


def test_inspect_cube_reports_faces(tmp_path: Path):
    stl = tmp_path / "cube.stl"
    _write_cube(stl)
    report = inspect_mesh(stl)
    assert report["face_count"] > 0
    assert "bounds" in report
```

- [ ] **Step 2: Run test to verify it fails**

Run: `python -m pytest tests/test_inspect_mesh.py -v`  
Expected: FAIL import/`inspect_mesh` missing

- [ ] **Step 3: Implement `inspect_mesh.py` and `inspect_3mf.py`**

`inspect_mesh.py` minimal behavior:
- load via `trimesh.load`
- detect non-watertight
- record bounds (mm assumption)
- list issues (`empty mesh`, `not watertight`, `zero volume`)

`inspect_3mf.py` minimal behavior:
- open as zip
- list members
- flag presence of `3D/3dmodel.model` or equivalent
- do not mutate file

- [ ] **Step 4: Run tests**

Run: `python -m pytest tests/ -v`  
Expected: all PASS

- [ ] **Step 5: Document CLI usage in playbook**

```text
python tools/inspect_mesh.py 3ds/original/foo.stl
python tools/inspect_3mf.py 3ds/original/foo.3mf
```

- [ ] **Step 6: Commit** (only if user asks)

```bash
git add tools/inspect_mesh.py tools/inspect_3mf.py tests playbook.md
git commit -m "feat: add STL and 3MF inspection tools"
```

---

### Task 9: End-to-end dry-run protocol (no real print required)

**Files:**
- Create: `Documentações/projeto/workflow/dry-run-exemplo.md`
- Create: `plan/_exemplo-dry-run.md` (sample filled plan)
- Optional fixture: if user has no model yet, generate a simple STL cube into `3ds/original/_sample_cube.stl` via trimesh for pipeline rehearsal, and produce `3ds/upgraded/_sample_cube.3mf` notes **or** upgraded STL + plan explaining Bambu Studio steps the human must click (v1 may not binary-edit complex Bambu project 3MF settings — document honest limit)

**Honest v1 deliverable rule (must appear in playbook + dry-run doc):**
- Agent produces: orientation decision, support strategy, profile choice, optional repaired/scaled mesh, and a complete `plan/<name>.md`.
- Agent produces upgraded file as: repaired/oriented STL/3MF mesh **and/or** instructions to save a Bambu Studio project 3MF with the chosen profile.
- Full programmatic rewriting of proprietary Bambu process settings inside 3MF is **best-effort**; if schema is opaque, do not fake it — put settings in `plan/*.md` and wiki profile page.

- [ ] **Step 1: Generate sample cube in `3ds/original/` for rehearsal**

- [ ] **Step 2: Execute playbook mentally/ practically; write `plan/_exemplo-dry-run.md`**

- [ ] **Step 3: Place upgraded sample outputs under `3ds/upgraded/`**

- [ ] **Step 4: Validate docs links one last time**

Run: `python tools/validate_wiki_links.py "Documentações"`  
Run: `python -m pytest tests/ -v`  
Expected: both green

- [ ] **Step 5: Commit** (only if user asks)

```bash
git add 3ds plan Documentações/projeto/workflow/dry-run-exemplo.md
git commit -m "docs: add end-to-end optimization dry-run example"
```

---

### Task 10: Final coherence pass

**Files:**
- Modify: any orphan pages found
- Modify: `Documentações/projeto/mapa-da-rede.md` to list every MD node
- Modify: `playbook.md` if paths drifted

- [ ] **Step 1: Generate file inventory**

Run: `Get-ChildItem -Recurse Documentações -Filter *.md | Select-Object FullName`

- [ ] **Step 2: Ensure every MD under `Documentações/projeto` appears in `mapa-da-rede.md` and has a Relacionados section**

- [ ] **Step 3: Run validators**

Run:
```bash
python tools/validate_wiki_links.py "Documentações"
python -m pytest tests/ -v
```

Expected: exit 0 / all PASS

- [ ] **Step 4: Write short verification note at bottom of `Documentações/projeto/INDEX.md`**

```markdown
## Estado da wiki
- Última validação de links: YYYY-MM-DD
- Perfis A1 Mini: N páginas
- Troubleshooting: N páginas
```

- [ ] **Step 5: Stop and request user approval for first real model optimization**

---

## Self-review (plan author)

1. **Spec coverage:** Conversion + archive (Tasks 2–3), dense wiki + community research (4–5), profiles (6), playbook/plan I/O (7), hybrid scripts (8), dry-run (9), coherence (10), validator foundation (1). Matches user goals.
2. **Placeholder scan:** No TBD/TODO steps; concrete files, commands, templates included.
3. **Type consistency:** `validate_wiki_links(root) -> list[str]`; `inspect_mesh`/`inspect_3mf` dict shapes defined in Task 8 and referenced consistently.
4. **Scope split note:** Documentation wiki and playbook are one shippable subsystem; inspectors are second; binary Bambu setting injection is explicitly best-effort to avoid fake automation.

---

## Acceptance criteria (user approval gate)

- [ ] `playbook.md` usable as sole entry ritual with a model path
- [ ] Existing ebook + A1 Mini PDFs converted to MD; originals only under `Documentações/_arquivo/`
- [ ] `Documentações/projeto` is a dense cross-linked wiki covering hardware, materials (PLA+PETG), geometry, purpose (miniatures/tools/decorative/vases/characters), slicing, quality, troubleshooting, profiles
- [ ] Community sources cited in `fontes-e-atribuicao.md`
- [ ] `plan/_template.md` exists; upgraded outputs go to `3ds/upgraded/`
- [ ] `python tools/validate_wiki_links.py Documentações` exits 0
- [ ] pytest suite green
- [ ] Honest limit documented for proprietary 3MF process settings

---

## Execution handoff

After you approve this plan, implementation options:

1. **Subagent-Driven (recommended)** — fresh subagent per task, review between tasks  
2. **Inline Execution** — execute tasks in this session with checkpoints  

Which approach?
