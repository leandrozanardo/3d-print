import {
  assertTwoUserIsolation,
  canOwnerAccess,
  canOwnerInsert,
} from "../src/rlsPolicy";

describe("RLS owner-only policy helpers", () => {
  const ownerA = "11111111-1111-1111-1111-111111111111";
  const ownerB = "22222222-2222-2222-2222-222222222222";
  const row = { owner_id: ownerA };

  it("allows the owner to access their row", () => {
    expect(canOwnerAccess(row, { uid: ownerA })).toBe(true);
  });

  it("denies a second authenticated user", () => {
    expect(canOwnerAccess(row, { uid: ownerB })).toBe(false);
  });

  it("denies anonymous access", () => {
    expect(canOwnerAccess(row, { uid: null })).toBe(false);
    expect(canOwnerInsert(ownerA, { uid: null })).toBe(false);
  });

  it("requires insert owner_id to match auth.uid", () => {
    expect(canOwnerInsert(ownerA, { uid: ownerA })).toBe(true);
    expect(canOwnerInsert(ownerB, { uid: ownerA })).toBe(false);
  });

  it("encodes two-user isolation (B denied on A's row)", () => {
    const result = assertTwoUserIsolation(ownerA, ownerB, row);
    expect(result.userA).toBe(true);
    expect(result.userB).toBe(false);
  });
});
