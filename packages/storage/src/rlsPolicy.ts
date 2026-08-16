/**
 * Pure helpers that encode owner-only RLS intent for unit tests
 * without requiring a live Supabase CLI.
 */

export type OwnedRow = {
  owner_id: string;
};

export type AuthContext = {
  uid: string | null;
};

/** SELECT / UPDATE / DELETE: row visible only to its owner. */
export function canOwnerAccess(row: OwnedRow, auth: AuthContext): boolean {
  if (auth.uid === null || auth.uid === "") {
    return false;
  }
  return row.owner_id === auth.uid;
}

/** INSERT: new row must set owner_id to auth.uid(). */
export function canOwnerInsert(proposedOwnerId: string, auth: AuthContext): boolean {
  if (auth.uid === null || auth.uid === "") {
    return false;
  }
  return proposedOwnerId === auth.uid;
}

/**
 * Simulate two-user isolation: user B cannot read/write user A's row.
 */
export function assertTwoUserIsolation(
  ownerA: string,
  ownerB: string,
  row: OwnedRow,
): { userA: boolean; userB: boolean } {
  if (ownerA === ownerB) {
    throw new Error("owners must differ for isolation check");
  }
  return {
    userA: canOwnerAccess(row, { uid: ownerA }),
    userB: canOwnerAccess(row, { uid: ownerB }),
  };
}
