# MIGRATION-AND-RETIREMENT — acceptance

- HEAD baseline: e9925652c161766194d30d677ce413c5ff4d1efb
- Python deleted: 22 files (see DELETION_MANIFEST.json + deletion-log.json)
- git ls-files '*.py': empty
- pnpm build/test/typecheck/format:check/lint: see verification below
- Mesh parity: cube face_count=12 vertex_count=8 watertight=true volume≈1
- CLI Node-only; Manifold WASM production path
