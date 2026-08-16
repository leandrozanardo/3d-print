# Ebook — Guia Maker de Impressão 3D (Markdown)

Portuguese source book converted to Markdown for offline reference. **Project operating docs (`docs/projeto/`, playbook) are English.**

## License

**CC BY-SA 4.0** — Cláudio Luís Marques Sampaio, MSc.
Original: http://www.makerlinux.com.br/ebook
Attribution required; ShareAlike for derivatives. See [LICENSE](LICENSE) and [CREDITOS.md](CREDITOS.md).

## How it was converted

1. Prefer `pandoc -f asciidoc -t gfm` when available.
2. Otherwise: `python core/convert_ebook_adoc.py`
3. Each chapter keeps a CC BY-SA attribution header (AsciiDoc archive removed from this repo)
4. Figures remain under `imagens/`; SVG sources also mirrored in `assets/`

## Active structure

| Path | Content |
|---|---|
| [INDEX.md](INDEX.md) | TOC |
| `01-…` … `13-…` | Chapters (**Portuguese source language**) |
| `CREDITOS.md` / `LICENSE` | Attribution |
| `imagens/` / `assets/` | Media |

## Edit policy

Edit active `.md` / assets here. The former `docs/_arquivo/ebook/` tree was deleted.

> Note: Chapter bodies remain in Portuguese (original work language). The optimization wiki used by the playbook is English under `docs/projeto/`.
