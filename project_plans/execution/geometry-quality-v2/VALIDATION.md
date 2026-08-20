# Validation — geometry-quality-v2

## Structural vs topological

| Signal | Meaning |
| --- | --- |
| `containerValid` / ZIP+XML | Archive and Core XML structure |
| `coreStructureValid` | Objects/build items present |
| `allPartsWatertight` | Per-part topology (no global weld) |
| `independentValidatorAccepted` | Optional lib3mf/Manifold when available |
| `printabilityEstimateAvailable` | Geometric proxies only |

## Output safety

Engine always reopens generated 3MF when format is 3MF and asserts instance count ≥ 1.

## Fireproof

`scripts/compare-one-piece-fireproof.mjs` writes:

- `.tmp/geometry-quality-v2/one-piece-fireproof.json`
- `artifacts/geometry-quality-v2/one-piece-fireproof.json`

Does not treat ZIP shrinkage as geometric improvement.
