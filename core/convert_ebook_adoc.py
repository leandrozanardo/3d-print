#!/usr/bin/env python3
"""Convert Guia Maker AsciiDoc chapters to GitHub-flavored Markdown."""

from __future__ import annotations

import re
import sys
from pathlib import Path

ATTRIBUTION = """\
> **Fonte:** Guia Maker de Impressão 3D (Cláudio Luís Marques Sampaio) — CC BY-SA 4.0
> **Nota:** o arquivo AsciiDoc original (`docs/_arquivo/ebook/`) foi removido deste repositório.
> **Obra:** http://www.makerlinux.com.br/ebook
"""

CHAPTER_MAP: list[tuple[str, str, str]] = [
    ("guia-maker-da-impressao-3d-prefacio.adoc", "01-prefacio.md", "Prefácio"),
    ("guia-maker-da-impressao-3d-introducao.adoc", "02-introducao.md", "Introdução"),
    ("guia-maker-da-impressao-3d-historico.adoc", "03-historico.md", "Histórico"),
    ("guia-maker-da-impressao-3d-universomaker.adoc", "04-universo-maker.md", "Universo Maker"),
    ("guia-maker-da-impressao-3d-tecnologiafff.adoc", "05-tecnologia-fff.md", "Tecnologia FFF"),
    ("guia-maker-da-impressao-3d-materiaisfff.adoc", "06-materiais-fff.md", "Materiais FFF"),
    ("guia-maker-da-impressao-3d-malhas.adoc", "07-malhas.md", "Malhas"),
    ("guia-maker-da-impressao-3d-operacao.adoc", "08-operacao.md", "Operação"),
    ("guia-maker-da-impressao-3d-gcode.adoc", "09-gcode.md", "G-code"),
    ("guia-maker-da-impressao-3d-acabamento.adoc", "10-acabamento.md", "Acabamento"),
    ("guia-maker-da-impressao-3d-manutencao.adoc", "11-manutencao.md", "Manutenção"),
    ("guia-maker-da-impressao-3d-apendices.adoc", "12-apendices.md", "Apêndices"),
    ("guia-maker-da-impressao-3d-sobre.adoc", "13-sobre.md", "Sobre"),
]

ADMONITION_LABELS = {
    "NOTE": "Nota",
    "TIP": "Dica",
    "WARNING": "Atenção",
    "CAUTION": "Cuidado",
    "IMPORTANT": "Importante",
}

WARNINGS: list[str] = []


def warn(msg: str) -> None:
    WARNINGS.append(msg)
    print(f"WARNING: {msg}", file=sys.stderr)


def unescape_attrs(text: str) -> str:
    return (
        text.replace("&quot;", '"')
        .replace("&lt;", "<")
        .replace("&gt;", ">")
        .replace("&amp;", "&")
    )


def convert_inline(text: str) -> str:
    """Convert AsciiDoc inline markup to Markdown (order matters)."""
    text = unescape_attrs(text)

    text = re.sub(
        r"(?:latexmath|stem):\[((?:[^\\\]]|\\.)*)\]",
        lambda m: f"${m.group(1)}$",
        text,
    )

    text = re.sub(
        r"(https?://[^\s\[\]]+)\[([^\]]*)\]",
        lambda m: f"[{m.group(2) or m.group(1)}]({m.group(1)})",
        text,
    )

    text = re.sub(
        r"link:([^\[]+)\[([^\]]*)\]",
        lambda m: f"[{m.group(2) or m.group(1)}]({m.group(1)})",
        text,
    )

    text = re.sub(
        r"mailto:([^\[]+)\[([^\]]*)\]",
        lambda m: f"[{m.group(2) or m.group(1)}](mailto:{m.group(1)})",
        text,
    )

    def inline_image(m: re.Match[str]) -> str:
        path = m.group(1).strip()
        attrs = m.group(2) or ""
        alt = attrs.split(",")[0].strip() if attrs else Path(path).stem
        title_m = re.search(r'title="([^"]*)"', attrs)
        if title_m:
            alt = unescape_attrs(title_m.group(1))
        name = Path(path).name
        caption = alt
        # Block-style image:: mid-paragraph still becomes a markdown image
        return f"![{caption}](imagens/{name})"

    # image:: (block macro used inline) then image: (inline macro)
    text = re.sub(r"image::([^:\[\s][^\[\s]*)\[([^\]]*)\]", inline_image, text)
    text = re.sub(r"(?<![:])image:([^:\[\s][^\[\s]*)\[([^\]]*)\]", inline_image, text)
    text = re.sub(r"\+([^+]+)\+", r"`\1`", text)
    text = re.sub(r"pass:\[([^\]]*)\]", r"\1", text)
    text = re.sub(r"\^([^\^]+)\^", r"<sup>\1</sup>", text)

    # Bold: unconstrained then constrained
    text = re.sub(r"\*\*([^*\n]+)\*\*", r"**\1**", text)
    text = re.sub(r"(?<!\*)\*([^*\n]+)\*(?!\*)", r"**\1**", text)

    # Italic
    text = re.sub(r"(?<![/\w])__([^_\n]+)__(?!\w)", r"*\1*", text)
    text = re.sub(r"(?<![/\w])_([^_\n]+)_(?!\w)", r"*\1*", text)

    text = re.sub(r"\{(Revision|Date|Author|Email)\}", r"*\1*", text)
    return text


def parse_image_block(line: str) -> str | None:
    m = re.match(r"^image::([^\[]+)\[(.*)\]\s*$", line)
    if not m:
        return None
    path = m.group(1).strip()
    attrs = m.group(2)
    name = Path(path).name
    title_m = re.search(r'title="((?:[^"\\]|\\.)*)"', attrs)
    alt_parts = [p.strip() for p in attrs.split(",") if "=" not in p and p.strip()]
    alt = alt_parts[0] if alt_parts else Path(name).stem
    if title_m:
        caption = unescape_attrs(title_m.group(1))
        return f"![{caption}](imagens/{name})\n\n*{caption}*"
    return f"![{alt}](imagens/{name})"


def convert_table(rows: list[str]) -> list[str]:
    parsed: list[list[str]] = []
    for row in rows:
        row = row.strip()
        if not row.startswith("|"):
            continue
        cells = [c.strip() for c in row.strip("|").split("|")]
        cells = [convert_inline(c.replace("\t", " ").strip()) for c in cells]
        if cells:
            parsed.append(cells)
    if not parsed:
        return ["<!-- empty table -->"]
    width = max(len(r) for r in parsed)
    for r in parsed:
        while len(r) < width:
            r.append("")
    out = [
        "| " + " | ".join(parsed[0]) + " |",
        "| " + " | ".join("---" for _ in range(width)) + " |",
    ]
    for r in parsed[1:]:
        out.append("| " + " | ".join(r) + " |")
    return out


def is_delimiter(line: str, char: str) -> bool:
    s = line.strip()
    return len(s) >= 4 and set(s) == {char}


def convert_adoc(source: str, source_name: str) -> str:
    lines = source.replace("\r\n", "\n").replace("\r", "\n").split("\n")
    out: list[str] = []
    i = 0
    pending_block_title: str | None = None
    para_buf: list[str] = []

    def flush_para() -> None:
        nonlocal para_buf
        if not para_buf:
            return
        text = convert_inline(" ".join(para_buf))
        para_buf = []
        if out and out[-1] != "":
            out.append("")
        out.append(text)
        out.append("")

    def flush_blank() -> None:
        flush_para()
        if out and out[-1] != "":
            out.append("")

    while i < len(lines):
        line = lines[i]
        stripped = line.strip()

        if (
            re.match(r"^:[^:]+:", stripped)
            or stripped.startswith("ifdef::")
            or stripped.startswith("ifndef::")
            or stripped.startswith("endif::")
        ):
            i += 1
            continue

        if re.match(r"^\[#[^\]]+\]\s*$", stripped) or re.match(r"^\[\[[^\]]+\]\]\s*$", stripped):
            i += 1
            continue

        if stripped == "<<<":
            flush_blank()
            out.append("---")
            flush_blank()
            i += 1
            continue

        # Block title (.Something) — not numbered list ". item"
        if re.match(r"^\.[^\s.].*", stripped) and not re.match(r"^\.\s+\S", stripped):
            pending_block_title = stripped[1:].strip()
            i += 1
            continue

        adm = re.match(r"^\[(NOTE|TIP|WARNING|CAUTION|IMPORTANT)\]\s*$", stripped)
        if adm:
            flush_para()
            kind = adm.group(1)
            label = ADMONITION_LABELS.get(kind, kind.title())
            i += 1
            body_lines: list[str] = []
            if i < len(lines) and is_delimiter(lines[i], "="):
                i += 1
                while i < len(lines) and not is_delimiter(lines[i], "="):
                    body_lines.append(lines[i])
                    i += 1
                if i < len(lines) and is_delimiter(lines[i], "="):
                    i += 1
            else:
                while i < len(lines) and lines[i].strip():
                    body_lines.append(lines[i])
                    i += 1
            flush_blank()
            title = pending_block_title
            pending_block_title = None
            header = f"**{label}:**" + (f" {title}" if title else "")
            out.append(f"> {header}")
            out.append(">")
            body_md = convert_adoc("\n".join(body_lines), f"{source_name}:admonition")
            for bl in body_md.rstrip().split("\n"):
                out.append(f"> {bl}" if bl else ">")
            flush_blank()
            continue

        src = re.match(r"^\[source(?:,\s*([^\]]+))?\]\s*$", stripped)
        if src or (stripped.startswith("[source") and stripped.endswith("]")):
            flush_para()
            lang = ""
            if src:
                lang = (src.group(1) or "").strip()
            else:
                mlang = re.match(r"^\[source,\s*([^\]]+)\]", stripped)
                lang = mlang.group(1).strip() if mlang else ""
            i += 1
            code: list[str] = []
            if i < len(lines) and is_delimiter(lines[i], "-"):
                i += 1
                while i < len(lines) and not is_delimiter(lines[i], "-"):
                    code.append(lines[i])
                    i += 1
                if i < len(lines) and is_delimiter(lines[i], "-"):
                    i += 1
            else:
                # Single-line listing without ---- fence
                while i < len(lines) and lines[i].strip() and not re.match(
                    r"^\[(NOTE|TIP|WARNING|CAUTION|IMPORTANT|source)", lines[i].strip()
                ) and not re.match(r"^=+\s+", lines[i].strip()) and not is_delimiter(
                    lines[i], "="
                ):
                    code.append(lines[i])
                    i += 1
                    # only one logical line for bare [source] without delimiter
                    break
            flush_blank()
            if pending_block_title:
                out.append(f"**{pending_block_title}**")
                out.append("")
                pending_block_title = None
            out.append(f"```{lang}")
            out.extend(code)
            out.append("```")
            flush_blank()
            continue

        if is_delimiter(stripped, "-") and len(stripped) >= 4:
            flush_para()
            i += 1
            code = []
            while i < len(lines) and not is_delimiter(lines[i], "-"):
                code.append(lines[i])
                i += 1
            if i < len(lines) and is_delimiter(lines[i], "-"):
                i += 1
            flush_blank()
            if pending_block_title:
                out.append(f"**{pending_block_title}**")
                out.append("")
                pending_block_title = None
            out.append("```")
            out.extend(code)
            out.append("```")
            flush_blank()
            continue

        if is_delimiter(stripped, "=") and len(stripped) >= 4:
            flush_para()
            i += 1
            body: list[str] = []
            while i < len(lines) and not is_delimiter(lines[i], "="):
                body.append(lines[i])
                i += 1
            if i < len(lines) and is_delimiter(lines[i], "="):
                i += 1
            flush_blank()
            if pending_block_title:
                out.append(f"**{pending_block_title}**")
                out.append("")
                pending_block_title = None
            body_md = convert_adoc("\n".join(body), f"{source_name}:openblock")
            out.extend(body_md.rstrip().split("\n"))
            flush_blank()
            continue

        if stripped.startswith("|==="):
            flush_para()
            i += 1
            rows: list[str] = []
            while i < len(lines) and not lines[i].strip().startswith("|==="):
                if lines[i].strip().startswith("|"):
                    rows.append(lines[i])
                elif lines[i].strip() == "":
                    pass
                else:
                    if rows:
                        rows[-1] = rows[-1] + " " + lines[i].strip()
                i += 1
            if i < len(lines) and lines[i].strip().startswith("|==="):
                i += 1
            flush_blank()
            if pending_block_title:
                out.append(f"**{pending_block_title}**")
                out.append("")
                pending_block_title = None
            out.extend(convert_table(rows))
            flush_blank()
            continue

        img = parse_image_block(stripped)
        if img:
            flush_para()
            flush_blank()
            if pending_block_title:
                out.append(f"*{pending_block_title}*")
                out.append("")
                pending_block_title = None
            out.append(img)
            flush_blank()
            i += 1
            continue

        hm = re.match(r"^(=+)\s+(.*)$", stripped)
        if hm:
            flush_para()
            level = len(hm.group(1))
            title = convert_inline(hm.group(2).strip())
            hashes = "#" * min(level, 6)
            flush_blank()
            pending_block_title = None
            out.append(f"{hashes} {title}")
            flush_blank()
            i += 1
            continue

        if re.match(r"^-{3,}$", stripped) and len(stripped) < 12:
            flush_blank()
            out.append("---")
            flush_blank()
            i += 1
            continue

        if not stripped:
            flush_para()
            if out and out[-1] != "":
                out.append("")
            i += 1
            continue

        lm = re.match(r"^(\*{1,5})\s+(.*)$", stripped)
        if lm:
            flush_para()
            depth = len(lm.group(1))
            content = convert_inline(lm.group(2))
            i += 1
            cont: list[str] = []
            while i < len(lines):
                if lines[i].strip() == "+":
                    i += 1
                    para: list[str] = []
                    while (
                        i < len(lines)
                        and lines[i].strip()
                        and not re.match(r"^(\*{1,5}|\.{1,5})\s+", lines[i].strip())
                        and not lines[i].strip().startswith("=")
                        and lines[i].strip() != "+"
                    ):
                        para.append(lines[i].strip())
                        i += 1
                    if para:
                        cont.append(" ".join(para))
                    continue
                break
            indent = "  " * (depth - 1)
            line_out = f"{indent}- {content}"
            if cont:
                line_out += " " + " ".join(convert_inline(c) for c in cont)
            out.append(line_out)
            pending_block_title = None
            continue

        om = re.match(r"^(\.{1,5})\s+(.*)$", stripped)
        if om:
            flush_para()
            depth = len(om.group(1))
            content = convert_inline(om.group(2))
            i += 1
            indent = "  " * (depth - 1)
            out.append(f"{indent}1. {content}")
            pending_block_title = None
            continue

        # Table/block attribute lines — skip (tables still parsed)
        if re.match(r"^\[[^\]]+\]\s*$", stripped):
            if not (
                stripped.startswith("[#")
                or stripped.startswith("[NOTE")
                or stripped.startswith("[TIP")
                or stripped.startswith("[WARNING")
                or stripped.startswith("[CAUTION")
                or stripped.startswith("[IMPORTANT")
                or stripped.startswith("[source")
            ):
                # Keep silent for cols=/width=/anchor ids before images
                pass
            i += 1
            continue

        if pending_block_title:
            flush_para()
            out.append(f"**{pending_block_title}**")
            out.append("")
            pending_block_title = None

        para_buf.append(stripped)
        i += 1

    flush_para()

    cleaned: list[str] = []
    blanks = 0
    for line in out:
        if line == "":
            blanks += 1
            if blanks <= 2:
                cleaned.append(line)
        else:
            blanks = 0
            cleaned.append(line)
    while cleaned and cleaned[0] == "":
        cleaned.pop(0)
    while cleaned and cleaned[-1] == "":
        cleaned.pop()
    return "\n".join(cleaned) + "\n"


def build_index(chapter_titles: list[tuple[str, str]]) -> str:
    lines = [
        "# Guia Maker de Impressão 3D",
        "",
        ATTRIBUTION.rstrip(),
        "",
        "Versão convertida para Markdown a partir dos originais AsciiDoc (v0.99.3).",
        "",
        "## Índice",
        "",
    ]
    for fname, title in chapter_titles:
        lines.append(f"- [{title}]({fname})")
    lines.extend(
        [
            "",
            "## Metadados",
            "",
            "- [Créditos e atribuição](CREDITOS.md)",
            "- [README da conversão](README.md)",
            "- [Licença CC BY-SA 4.0](LICENSE)",
            "",
        ]
    )
    return "\n".join(lines)


def build_creditos() -> str:
    return """# Créditos

## Obra original

- **Título:** Guia Maker de Impressão 3D — Teoria e Prática Consolidadas
- **Autor:** Cláudio Luís Marques Sampaio, MSc. (Patola)
- **Contato:** patola@makerlinux.com.br
- **Site oficial:** http://www.makerlinux.com.br/ebook
- **Repositório histórico:** https://github.com/Patola/ebook
- **Licença:** [Creative Commons Attribution-ShareAlike 4.0 International (CC BY-SA 4.0)](LICENSE)

## Esta conversão

Os arquivos Markdown em `docs/ebook/` são obras derivadas dos fontes AsciiDoc originais,
convertidos para uso nesta wiki/playbook de impressão 3D.

Conforme a CC BY-SA 4.0:

1. **Atribuição** — crédito ao autor original (acima) é mantido em cada capítulo.
2. **ShareAlike** — o material derivado permanece sob CC BY-SA 4.0 (ver `LICENSE`).
3. **Originais** — o arquivo AsciiDoc em `docs/_arquivo/ebook/` foi removido deste repositório.

Ilustrações de terceiros mencionadas no texto original permanecem copyright de seus autores,
conforme notas do próprio guia.

## Arquivos relacionados

- [Índice](INDEX.md)
- [README](README.md)
- [Licença](LICENSE)
"""


def build_readme() -> str:
    return """# Ebook — Guia Maker de Impressão 3D (Markdown)

Conversão do ebook AsciiDoc **Guia Maker de Impressão 3D** (Cláudio Luís Marques Sampaio)
para Markdown, sob a mesma licença **CC BY-SA 4.0**.

## Como foi convertido

1. Preferência: `pandoc -f asciidoc -t gfm` (não disponível neste ambiente).
2. Conversor Python: `python core/convert_ebook_adoc.py` — headings, listas, imagens, tabelas,
   blocos `NOTE`/`TIP`/`WARNING`/`IMPORTANT`, listagens `[source]`, links e `latexmath`/`stem`.
3. Cada capítulo começa com bloco de atribuição CC BY-SA apontando para o arquivo dos originais.
4. Imagens permanecem em `imagens/` com caminhos relativos `imagens/<arquivo>`.
5. Fontes SVG originais e `.adoc` viviam em `docs/_arquivo/ebook/` (árvore removida do repositório).

## Estrutura ativa

| Arquivo | Conteúdo |
|---|---|
| `INDEX.md` | Índice / capa |
| `01-prefacio.md` … `13-sobre.md` | Capítulos |
| `CREDITOS.md` | Atribuição detalhada |
| `LICENSE` | Texto CC BY-SA 4.0 |
| `imagens/` | Figuras referenciadas pelos capítulos |

## Editar

Edite apenas os `.md` e assets ativos nesta pasta.

Obra original: http://www.makerlinux.com.br/ebook
"""


def main() -> int:
    root = Path(__file__).resolve().parents[1]
    ebook = root / "docs" / "ebook"
    archive = root / "docs" / "_arquivo" / "ebook"
    source_dir = archive if (archive / CHAPTER_MAP[0][0]).exists() else ebook
    if not source_dir.is_dir():
        print(f"Missing sources in {archive} or {ebook}", file=sys.stderr)
        return 1

    ebook.mkdir(parents=True, exist_ok=True)
    chapter_titles: list[tuple[str, str]] = []
    for adoc_name, md_name, default_title in CHAPTER_MAP:
        src_path = source_dir / adoc_name
        if not src_path.exists():
            warn(f"missing source {adoc_name}")
            continue
        text = src_path.read_text(encoding="utf-8")
        title = default_title
        for line in text.splitlines():
            m = re.match(r"^=\s+(.*)$", line.strip())
            if m:
                title = m.group(1).strip()
                break
        body = convert_adoc(text, adoc_name)
        md_lines = body.split("\n")
        if md_lines and md_lines[0].startswith("# "):
            assembled = md_lines[0] + "\n\n" + ATTRIBUTION + "\n" + "\n".join(md_lines[1:])
        else:
            assembled = f"# {title}\n\n{ATTRIBUTION}\n{body}"
        if not assembled.endswith("\n"):
            assembled += "\n"
        dest = ebook / md_name
        dest.write_text(assembled, encoding="utf-8", newline="\n")
        chapter_titles.append((md_name, title))
        print(f"Wrote {dest.relative_to(root)} ({dest.stat().st_size} bytes) from {src_path.relative_to(root)}")

    index = ebook / "INDEX.md"
    index.write_text(build_index(chapter_titles), encoding="utf-8", newline="\n")
    print(f"Wrote {index.relative_to(root)}")

    (ebook / "CREDITOS.md").write_text(build_creditos(), encoding="utf-8", newline="\n")
    print("Wrote CREDITOS.md")

    (ebook / "README.md").write_text(build_readme(), encoding="utf-8", newline="\n")
    print("Wrote README.md")

    # Keep full English CC BY-SA text as docs/ebook/LICENSE (never replace with short PT summary)
    license_dest = ebook / "LICENSE"
    archive_license = archive / "LICENSE"
    if license_dest.exists() and license_dest.stat().st_size >= 5000:
        print(f"Kept existing LICENSE ({license_dest.stat().st_size} bytes)")
    elif archive_license.exists() and archive_license.stat().st_size >= 5000:
        license_dest.write_bytes(archive_license.read_bytes())
        print("Restored docs/ebook/LICENSE from archive")
    else:
        warn("LICENSE missing or too short in docs/ebook/ — restore CC BY-SA 4.0 full text")

    if WARNINGS:
        print(f"\n{len(WARNINGS)} warnings", file=sys.stderr)
    return 0


if __name__ == "__main__":
    raise SystemExit(main())
