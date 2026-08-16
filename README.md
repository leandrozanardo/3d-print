# fix-my-print / 3d-print

Knowledge base and toolkit for 3D printing (product **fix-my-print**).

## Status (2026-08-16)

- **Canonical knowledge:** `docs/` (PT-BR)
- **Runtime:** Node.js / TypeScript monorepo (`packages/*`, `apps/*`)
- **Geometry:** PureTS topology + Manifold WASM (`@fix-my-print/geometry-manifold`)
- **Python:** retired — see `project_plans/execution/phase-14/DELETION_MANIFEST.json`
- **AI:** disabled by default (`NullAiPort`)

## Node (only operational runtime)

```text
START.cmd
```

Or:

```text
npx --yes pnpm@10.12.1 start
```

Then open http://127.0.0.1:5173/

Other commands:

```text
npx --yes pnpm@10.12.1 install
npx --yes pnpm@10.12.1 test
npx --yes pnpm@10.12.1 run typecheck
npx --yes pnpm@10.12.1 run build:web
npx --yes pnpm@10.12.1 --filter @fix-my-print/cli exec node dist/bin.js help
```

## Safety

Never mutate `3ds/original/` or any path above this project folder. Cursor rules enforce an absolute workspace boundary (`alwaysApply`). Path writes must pass `@fix-my-print/repo-guard`. No slicer-accurate time/material claims without a real slicer adapter.

## License

See [LICENSE](LICENSE) if present.
