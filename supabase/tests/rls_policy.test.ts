import {
  assertTwoUserIsolation,
  canOwnerAccess,
  canOwnerInsert,
} from "../../packages/storage/src/rlsPolicy";

/**
 * Supabase-local CLI may be unavailable in CI agents.
 * These tests encode the same owner-only rules intended for SQL RLS policies
 * in supabase/migrations/20260816000000_init.sql.
 */
describe("supabase RLS policy mirror", () => {
  const userA = "aaaaaaaa-aaaa-aaaa-aaaa-aaaaaaaaaaaa";
  const userB = "bbbbbbbb-bbbb-bbbb-bbbb-bbbbbbbbbbbb";

  it("denies cross-user access on projects/runs/artifacts/events shape", () => {
    for (const table of ["profiles", "projects", "runs", "artifacts", "run_events"] as const) {
      const row = { owner_id: userA, table };
      const isolation = assertTwoUserIsolation(userA, userB, row);
      expect(isolation.userA).toBe(true);
      expect(isolation.userB).toBe(false);
      expect(canOwnerAccess(row, { uid: userB })).toBe(false);
      expect(canOwnerInsert(userA, { uid: userB })).toBe(false);
    }
  });
});
