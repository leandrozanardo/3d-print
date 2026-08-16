# Capability board (Phase 13)

| Capability | Status | Replacement |
|---|---|---|
| repo/path guard | cutover | `@fix-my-print/repo-guard` |
| wiki validate/compile | parity | `@fix-my-print/knowledge-compiler` |
| contracts/errors | cutover | `@fix-my-print/contracts` |
| CLI composition | cutover | `@fix-my-print/cli` |
| STL sniff/parse | ported | `@fix-my-print/formats` |
| 3MF safe read | ported | `@fix-my-print/formats-3mf` |
| mesh inspect P1 | ported | `@fix-my-print/geometry` PureTS |
| repair transactions | characterized | PureTS limited; Python reference kept |
| geometry WASM/Manifold | unstarted spike | flag `geometry.wasm.enabled=false` |
| optimizer/Pareto | ported | `@fix-my-print/optimizer` |
| storage memory/supabase stubs | ported | `@fix-my-print/storage` |
| web shell/worker | ported | `@fix-my-print/web` |
| AI | retired-null | `NullAiPort` default off |
| editorial converters | deferred ADR | Python kept until recurrence proven |

Python runtime remains for reference/differential; Node CI is primary for new work.
