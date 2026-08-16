# Capability board (Phase 13 → retirement)

| Capability | Status | Replacement |
|---|---|---|
| repo/path guard | cutover | `@fix-my-print/repo-guard` |
| wiki validate/compile | parity | `@fix-my-print/knowledge-compiler` |
| contracts/errors | cutover | `@fix-my-print/contracts` |
| CLI composition | cutover | `@fix-my-print/cli` |
| STL/OBJ/PLY sniff/parse | cutover | `@fix-my-print/formats` |
| 3MF safe read | cutover | `@fix-my-print/formats-3mf` |
| mesh inspect | cutover | `@fix-my-print/geometry` (+ weld-on-inspect) |
| repair | cutover | PureTS light ops + Manifold WASM |
| geometry WASM/Manifold | cutover | `@fix-my-print/geometry-manifold` |
| optimizer/Pareto | cutover | `@fix-my-print/optimizer` |
| storage | cutover | `@fix-my-print/storage` |
| web shell/worker | cutover | `@fix-my-print/web` |
| AI | retired-null | `NullAiPort` default off |
| editorial converters | cutover | `@fix-my-print/editorial` |
| Python runtime | **retired** | Node-only (`DELETION_MANIFEST.json`) |
