# Printer docs template

Copy this folder to `docs/printers/<printer-id>/` when onboarding a new machine.

## Required files

| File | Purpose |
|---|---|
| `INDEX.md` | Local hub + links to manuals |
| `wiki.md` | Bridges to official OEM wiki + project hub |
| Manual pages (`01-…md`) | Converted OEM docs |
| `assets/` | Extracted figures |

## Archive

Move original PDFs/binaries to:

`docs/_arquivo/printers/<printer-id>/`

## Project integration checklist

- [ ] Register row in [`../INDEX.md`](../INDEX.md)
- [ ] Add hardware pages under `docs/projeto/hardware/` (or printer-tagged section)
- [ ] Add profile pack under `docs/projeto/perfis-<printer-id>/` when ready
- [ ] Update `playbook.md` active-printer line **only** if this becomes default
- [ ] Run `python -m core validate-wiki docs`

## Do not

- Copy A1 Mini numbers blindly onto another machine
- Mark a printer `active` without a successful dry-run print
- Mix enclosure-required materials guidance without noting chamber capability
