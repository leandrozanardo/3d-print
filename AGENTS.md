# Agent contract — absolute repository boundary

**NON-NEGOTIABLE.** Every agent and subagent in this workspace is bound to the open `fix-my-print` project root only. Parent folders and anything outside that root must never be altered.

## Root identity

1. Resolve the project root by walking parents until `package.json` with `"name": "fix-my-print"`.
2. That directory is the **only** permitted read/write scope for implementation work.
3. Anything outside that root is a hard violation: respond with `REPO_BOUNDARY_VIOLATION` and stop.

## Enforcement surfaces

| Surface                                           | Role                                    |
| ------------------------------------------------- | --------------------------------------- |
| `.cursor/rules/repo-boundary.mdc`                 | Project rule (`alwaysApply: true`)      |
| `~/.cursor/rules/absolute-workspace-boundary.mdc` | Cursor user rule for all projects       |
| `@fix-my-print/repo-guard`                        | Runtime path proof for CLI and packages |

## Forbidden without exception

- Mutating files outside this repository or in any parent folder
- Treating a wider Cursor workspace as permission to touch sibling projects
- Bypassing Cursor rules or `repo-guard`

## In-repo constraints

- Never mutate `3ds/original/**`
- Path writes must pass `@fix-my-print/repo-guard`
- Python toolkit retired under mission MIGRATION-AND-RETIREMENT (see `project_plans/execution/phase-14/DELETION_MANIFEST.json`)
