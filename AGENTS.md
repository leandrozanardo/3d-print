# Agent contract — boundary is outside only

You are **inside** the `fix-my-print` project. Work here is allowed.

## Inside (allowed)

- Read/write/build/test anything under this repository root
  (`package.json` name `"fix-my-print"`).

## Outside (blocked)

- Never touch parent folders, sibling projects, home, or system paths.
- Escape attempt → `REPO_BOUNDARY_VIOLATION` and stop.

## Enforcement

| Surface | Role |
| --- | --- |
| `.cursor/rules/repo-boundary.mdc` | Always-on project rule |
| `@fix-my-print/repo-guard` | Runtime path proof for CLI/packages |

## In-repo constraints

- Never mutate `3ds/original/**`
- Path writes must pass `@fix-my-print/repo-guard`
- Python deletion only with `APPROVED: RETIRE PYTHON` + deletion manifest
