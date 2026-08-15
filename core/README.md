# core

Fail-closed toolkit for this repository.

## Commands

```bash
pip install -r core/requirements.txt
python -m core validate-wiki docs
python -m core inspect-mesh 3ds/original/part.stl --json
python -m core inspect-3mf 3ds/original/part.3mf --json
python -m core repair-mesh 3ds/original/part.stl 3ds/upgraded/part.stl
```

## Design

- Domain reports in `models.py` (no trimesh import)
- Path guards refuse writes under `3ds/original`
- Trimesh isolated in `mesh.py` / `repair.py` adapters
- 3MF read-only via `zipfile` — no proprietary Bambu settings rewrite

## Exit codes

| Code | Meaning |
|------|---------|
| 0 | Success |
| 1 | Domain / validation failure |
| 2 | Bad CLI usage |
| 130 | Interrupted |
