# Definition of Done — corrective pass

| ID | Gate | Status |
|---|---|---|
| DOD-WIKI-001 | Requirements register | PASS |
| DOD-WIKI-002 | Research ledger | PASS |
| DOD-WIKI-003 | Content reviewed | PASS |
| DOD-WIKI-004 | Sources complete | PASS |
| DOD-WIKI-005 | Printers honest coverage | PASS |
| DOD-WIKI-006 | Troubleshooting | PASS |
| DOD-WIKI-007 | Safety | PASS |
| DOD-WIKI-008 | Antifalse-green verifier | PASS |
| DOD-WIKI-009 | Editorial quality | PASS |
| DOD-WIKI-010 | Validators | PASS |
| DOD-WIKI-011 | Traceability | PASS |
| DOD-WIKI-012 | Diff allowlist | PASS |
| DOD-WIKI-013 | Single final commit | PASS |
| DOD-WIKI-014 | Push authorized branch | PASS |
| DOD-WIKI-015 | Clean checkout gates | PASS |
| DOD-WIKI-016 | Rollback documented | PASS |
| DOD-WIKI-017 | No hidden pendings in scope | PASS |
| DOD-WIKI-018 | Final declaration | PASS |

## Rollback

```bash
git revert <FINAL_COMMIT_SHA>
git push origin HEAD:refs/heads/wiki-enterprise-remediation-20260816-030814
```

Baseline parent: `c75213a3c20e58ddeab4601fd4918d54845846ab`
