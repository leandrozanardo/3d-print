# fix-my-print / 3d-print

Knowledge base and toolkit for 3D printing (product **fix-my-print**).

## Status (2026-08-16)

- **Canonical knowledge:** `docs/` (PT-BR)
- **Node monorepo:** packages under `packages/*`, apps under `apps/*` (CLI + Vite/React web shell)
- **Python `core/`:** retained as reference until live retirement is explicitly approved after mesh repair parity
- **AI:** disabled by default (`NullAiPort`)

## Node (primary for new work)

```text
npm install
npm test
npm run typecheck
npm run build:web
npx fix-my-print help
npx fix-my-print validate-wiki docs
npx fix-my-print inspect-mesh packages/formats/fixtures/cube.stl
```

## Python (reference)

```text
python -m pip install -r core/requirements.txt pytest
python -m pytest -q
python -m core validate-wiki docs --strict --json
```

## Safety

Never mutate `3ds/original/`. Path writes must pass `@fix-my-print/repo-guard`. No slicer-accurate time/material claims without a real slicer adapter.

## License

See [LICENSE](LICENSE) if present.
