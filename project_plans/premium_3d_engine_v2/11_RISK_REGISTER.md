# 11 — Risk Register

**Date:** 2026-08-15  
Ordinals: likelihood / impact = L / M / H

| ID | Risk | L | I | Detection | Mitigation | Owner | Phase | Status |
|---|---|---|---|---|---|---|---|---|
| R1 | Inspection `process=True` misleads orientation | H | H | Dual raw/normalized tests | P3 split; never apply using processed-only facts | engine | 3 | open |
| R2 | Silent mm assumption on STL | H | H | Characterization + units confidence | Fail closed on scale; label unknown | engine | 3 | open |
| R3 | `fill_holes` closes functional openings | M | H | Intentional-opening fixture | Default off; classify boundary | engine | 6 | open |
| R4 | Repair exports dirty / exit 0 | H | M | CLI characterization | Exit 1; transaction | engine | 6 | open |
| R5 | 3MF treated as zip → corrupt rewrite | M | H | Golden round-trip | Inspect-only until proven | engine | 3–7 | open |
| R6 | ZIP bomb / XXE | M | H | Hostile fixtures | Budgets + defusedxml | engine | 3 | open |
| R7 | Wiki numbers copied as “verified” | H | H | Schema status + review | Compiler tags experimental | knowledge | 2 | open |
| R8 | PETG temp family vs Bambu SKU conflict | H | M | Conflict test | Fail closed / product override | knowledge | 4 | open |
| R9 | `if printer == a1` creeps in | M | H | grep CI | Capability objects only | engine | 4–12 | open |
| R10 | Bootstrap re-run wipes English wiki | L | H | Frozen main() | P0-T5 | maintainer | 0 | open |
| R11 | AGPL / SFC plugin dispute if we vendor Studio | L | H | License inventory | Subprocess; no plugin; no copy | maintainer | 7 | open |
| R12 | lib3mf strips Bambu members | M | M | Golden Bambu project | Opaque preserve or settings-only fallback | engine | 7 | open |
| R13 | Python 3.14 only locally; CI 3.11 differs | M | M | CI matrix | Test 3.11 in CI | engine | 1 | open |
| R14 | No lockfile → “works on my machine” | H | M | Reproduce on CI | uv.lock | engine | 1 | open |
| R15 | False probability in reports | M | H | Template review | Ban % success without calibration study | engine | 8 | open |
| R16 | Pareto hides weights | M | M | Manifest schema | Required weights field | engine | 5 | open |
| R17 | Scene concatenate loses parts | M | H | Multi-component fixture | Scene graph | engine | 3 | open |
| R18 | SaaS docs confuse implementers | M | M | This folder vs saas/ | Explicit non-goal; don’t delete | maintainer | 0 | open |
| R19 | Ebook ShareAlike contamination of rules | M | H | Source type check | Facts cited, not chapter paste | knowledge | 2 | open |
| R20 | Energy/cost invented | M | M | Report schema enums | Omit or mark unknown | engine | 8 | open |
| R21 | Windows symlink tests skipped → false safety | M | M | pytest skip count in CI | Extra non-symlink traversal cases | engine | 0 | open |
| R22 | Pass 3 always-on kills UX | M | M | Default flags | Gated analysis | engine | 3 | open |
| R23 | LLM later used as rule engine | L | H | AI policy tests | Schema + null default | engine | 11 | open |
| R24 | Root license absent vs public GitHub | H | M | User B-LIC | Don’t guess; inventory only | user | 0 | open |
| R25 | Performance gates before baseline | M | L | Policy in 07 | Measure first | engine | 7 | open |
