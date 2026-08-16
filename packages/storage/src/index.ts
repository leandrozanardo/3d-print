import { createEngineError, EngineException } from "@fix-my-print/contracts";

export interface StoragePort {
  putCreateOnly(key: string, value: Uint8Array): void;
  get(key: string): Uint8Array | undefined;
  has(key: string): boolean;
}

/** In-memory create-only storage — overwrite of an existing key throws STORAGE_CONFLICT. */
export class MemoryStorageAdapter implements StoragePort {
  private readonly map = new Map<string, Uint8Array>();

  putCreateOnly(key: string, value: Uint8Array): void {
    if (this.map.has(key)) {
      throw new EngineException(
        createEngineError("STORAGE_CONFLICT", `key already exists: ${key}`, {
          retryable: false,
          context: { key },
        }),
      );
    }
    this.map.set(key, new Uint8Array(value));
  }

  get(key: string): Uint8Array | undefined {
    const v = this.map.get(key);
    return v === undefined ? undefined : new Uint8Array(v);
  }

  has(key: string): boolean {
    return this.map.has(key);
  }
}

export {
  formatObjectKey,
  ObjectKeyError,
  parseObjectKey,
  type ObjectKeyParts,
} from "./objectKey";
export {
  assertTwoUserIsolation,
  canOwnerAccess,
  canOwnerInsert,
  type AuthContext,
  type OwnedRow,
} from "./rlsPolicy";
export {
  OverwriteRejectedError,
  StorageOperationError,
  type StoredObjectMeta,
} from "./errors";
export { InMemoryStorageAdapter } from "./InMemoryStorageAdapter";
export {
  SupabaseStorageAdapter,
  isStorageConflictError,
  type StorageUploadBody,
} from "./SupabaseStorageAdapter";
