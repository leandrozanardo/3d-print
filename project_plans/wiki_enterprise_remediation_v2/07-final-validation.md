# Final validation

Date: 2026-08-16
Worktree: `.tmp/wiki-enterprise-remediation-20260816-020510`
Branch: `wiki-enterprise-remediation-20260816-020510`

## Commands executed

```bash
git diff --check
python -m core validate-wiki docs --json
python -m core validate-wiki docs --strict --json
python -m core validate-wiki docs --strict --fail-on-warnings --json
```

## Results

| Gate | ok | errors | warnings |
|---|---|---|---|
| `git diff --check` | pass | 0 | 0 (trailing whitespace cleaned) |
| `validate-wiki docs --json` | true | 0 | 0 |
| `validate-wiki docs --strict --json` | true | 0 | 0 |
| `validate-wiki docs --strict --fail-on-warnings --json` | true | 0 | 0 |

### Strict / fail-on-warnings stats

```json
{
  "canonical_pages": 739,
  "pages_with_front_matter": 739,
  "unique_ids": 739,
  "error_count": 0,
  "warning_count": 0,
  "strict": true,
  "fail_on_warnings": true
}
```

## Additional audits

| Audit | Result |
|---|---|
| Printers | 354 |
| Coverage documented | 353 |
| Coverage troubleshooting-mapped | 1 |
| Coverage discovered/cataloged | 0 |
| Lifecycle unknown (justified) | 90 |
| pending-revalidation | 0 |
| Empty technology/process | 0 |
| Artificial markers `(fonte oficial/.../heuristic; ver sources)` | 0 |
| Manufacturers | 71 |
| Sources | 128 |
| Core files changed in this task | 0 |

Estado: **verified**
