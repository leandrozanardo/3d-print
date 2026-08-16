import { formatObjectKey, ObjectKeyError, parseObjectKey, type ObjectKeyParts } from "./objectKey";

export type StoredObjectMeta = {
  key: string;
  bytes: number;
  contentType: string;
  createdAt: string;
};

export class OverwriteRejectedError extends Error {
  readonly code = "OVERWRITE_REJECTED" as const;

  constructor(message = "OVERWRITE_REJECTED") {
    super(message);
    this.name = "OverwriteRejectedError";
  }
}

/**
 * In-memory stub of a Supabase Storage adapter.
 * Validates key shape and rejects overwrite of existing keys.
 */
export class SupabaseStorageAdapter {
  private readonly objects = new Map<string, StoredObjectMeta>();

  constructor(private readonly clock: () => Date = () => new Date()) {}

  has(key: string): boolean {
    parseObjectKey(key);
    return this.objects.has(key);
  }

  listKeys(): string[] {
    return [...this.objects.keys()].sort();
  }

  put(
    parts: ObjectKeyParts,
    bytes: number,
    contentType = "application/octet-stream",
  ): StoredObjectMeta {
    if (!Number.isFinite(bytes) || bytes < 0) {
      throw new ObjectKeyError("INVALID_OBJECT_BYTES");
    }
    const key = formatObjectKey(parts);
    if (this.objects.has(key)) {
      throw new OverwriteRejectedError("OVERWRITE_REJECTED");
    }
    const meta: StoredObjectMeta = {
      key,
      bytes,
      contentType,
      createdAt: this.clock().toISOString(),
    };
    this.objects.set(key, meta);
    return meta;
  }

  get(key: string): StoredObjectMeta | undefined {
    parseObjectKey(key);
    return this.objects.get(key);
  }
}
