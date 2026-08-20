# fix-my-print / 3d-print

Knowledge base and toolkit for 3D printing (product **fix-my-print**).

## Status (2026-08-16)

- **Canonical knowledge:** `docs/` (PT-BR)
- **Runtime:** Node.js / TypeScript monorepo (`packages/*`, `apps/*`)
- **Geometry:** PureTS topology + Manifold WASM (`@fix-my-print/geometry-manifold`)
- **Python:** retired — see `project_plans/execution/phase-14/DELETION_MANIFEST.json`
- **AI:** disabled by default (`NullAiPort`)

## Node (only operational runtime)

Requires Node.js ≥ 20 (`npm` comes with it). `pnpm` does **not** need to be installed globally.

```text
npm start
```

Or double-click `START.cmd` (Windows) / `./START.sh` (Unix). Then open http://127.0.0.1:5173/

Optional (so `pnpm start` works in the terminal): once, in an elevated PowerShell if Corepack cannot write shims:

```text
corepack enable
corepack prepare pnpm@10.12.1 --activate
```

Other commands (after Corepack, or via the wrapper):

```text
node scripts/run-pnpm.mjs install
node scripts/run-pnpm.mjs test
node scripts/run-pnpm.mjs run typecheck
node scripts/run-pnpm.mjs run build:web
node scripts/run-pnpm.mjs --filter @fix-my-print/cli exec node dist/bin.js help
```

## Safety

Work inside this repo is allowed. Never mutate paths **outside** this project (parents/siblings/home/system) or `3ds/original/`. Cursor project rule + `@fix-my-print/repo-guard` enforce that. No slicer-accurate time/material claims without a real slicer adapter.

## License

See [LICENSE](LICENSE) if present.
