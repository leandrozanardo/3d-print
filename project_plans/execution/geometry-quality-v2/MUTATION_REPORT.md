# Mutation Report — geometry-quality-v2

Harness: `scripts/mutation-geometry-quality-v2.mjs`

| Mutant | Killed by | Exit |
| --- | --- | --- |
| disable-repair-call | process-model-v2 | 1 |
| force-watertight-true | safe-repair | 1 |
| limit-v2-to-24 | orientation-v2 | 1 |
| ignore-goal | orientation-v2 | 1 |
| swap-output-for-input | process-model-v2 | 1 |
| skip-orientation-matrix | process-model-v2 | 1 |
| weld-merge-cross-object | instances-two-cubes | 1 |
| ignore-fidelity-gate | safe-repair | 1 |
| writer-first-mesh-only | multiobject-roundtrip | 1 |
| remove-output-reopen | process-model-v2 | 1 |

Artifact: `artifacts/geometry-quality-v2/mutation-matrix.json`

Never mutates `3ds/original/**`. Always restores sources in `finally`.
