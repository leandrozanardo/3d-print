# Printers registry

Multi-printer documentation root. **Active printer for this project today:** [Bambu Lab A1 Mini](A1mini/INDEX.md).

## Active

| ID | Folder | Status | Notes |
|---|---|---|---|
| `a1-mini` | [A1mini/](A1mini/INDEX.md) | **active** | Default hardware for playbook + profiles |

## Reserved slots (prepared — no content yet)

Add a new printer by copying [`_TEMPLATE/`](_TEMPLATE/README.md) to `docs/printers/<id>/` and registering it here. Do **not** invent specs until hardware is owned/tested.

| ID | Folder | Status |
|---|---|---|
| *(none yet)* | — | Create when needed |

## Conventions

1. One folder per printer under `docs/printers/<id>/`
2. Local manuals/Quick Starts live in that folder; binaries in `docs/_arquivo/printers/<id>/`
3. Process knowledge that is **printer-specific** stays under `docs/projeto/hardware/` with clear printer tags, or under `docs/projeto/perfis-<printer>/`
4. **Generic** FFF knowledge stays in geometry / slicing / materials / troubleshooting
5. Playbook must name the active printer explicitly

## Related

- [Project hub](../projeto/INDEX.md)
- [Hardware section](../projeto/hardware/INDEX.md)
- [Materials](../projeto/materiais/INDEX.md)
- [Playbook](../../playbook.md)
