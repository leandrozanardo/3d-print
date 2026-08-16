"""A1 Mini PDF → Markdown helper (DEPRECATED for these manuals).

Canonical corpus (OCR + assets):
  - docs/printers/A1mini/01-guia-rapido-combo.md
  - docs/printers/A1mini/02-guia-rapido-unidade.md
  - docs/printers/A1mini/assets/

Do not re-run a pypdf conversion over those files.
# Former PDF archive docs/_arquivo/printers/A1mini/ was deleted from this repository.
"""

from __future__ import annotations

import sys


def main() -> int:
    print(
        "convert_a1_pdfs.py is disabled: A1 Mini Quick Start PDFs need OCR, "
        "not pypdf. Active Markdown is already in docs/printers/A1mini/.",
        file=sys.stderr,
    )
    return 2


if __name__ == "__main__":
    raise SystemExit(main())
