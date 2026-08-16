# Validation

Command: python -m core validate-wiki docs --strict --fail-on-warnings --json

## Result (2026-08-16 batch)

`json
{
  "ok": true,
  "stats": {
    "canonical_pages": 706,
    "error_count": 0,
    "fail_on_warnings": true,
    "pages_with_front_matter": 706,
    "strict": true,
    "unique_ids": 706,
    "warning_count": 0
  },
  "summary_by_code": {}
}
`

Pass criteria: ok true, 0 errors, 0 warnings.
