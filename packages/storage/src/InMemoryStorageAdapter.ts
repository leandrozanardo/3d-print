import {
  formatObjectKey,
  ObjectKeyError,
  parseObjectKey,
  type ObjectKeyParts,
} from "./objectKey";
import { OverwriteRejectedError, type StoredObjectMeta } from "./errors";

/**
 * Process-local create-only object store used for unit tests and offline tooling.
 * Rejects overwrite of existing keys.
 */
export class InMemoryStorageAdapter {
  private readonly objects = new Map<
    string,
    { meta: StoredObjectMeta; data: Uint8Array }
  >();

  constructor(private readonly clock: () => Date = () => new Date()) {}

  has(key: string): boolean {
    parseObjectKey(key);
    return this.objects.has(key);
  }

  listKeys(): string[] {
    return [...this.objects.keys()].sort();
  }

  list(): StoredObjectMeta[] {
    return this.listKeys().map((key) => this.objects.get(key)!.meta);
  }

  put(
    parts: ObjectKeyParts,
    data: Uint8Array,
    contentType = "application/octet-stream",
  ): StoredObjectMeta {
    if (!(data instanceof Uint8Array)) {
      throw new ObjectKeyError("INVALID_OBJECT_BYTES");
    }
    const key = formatObjectKey(parts);
    if (this.objects.has(key)) {
      throw new OverwriteRejectedError("OVERWRITE_REJECTED");
    }
    const meta: StoredObjectMeta = {
      key,
      bytes: data.byteLength,
      contentType,
      createdAt: this.clock().toISOString(),
    };
    this.objects.set(key, { meta, data: new Uint8Array(data) });
    return meta;
  }

  get(key: string): StoredObjectMeta | undefined {
    parseObjectKey(key);
    return this.objects.get(key)?.meta;
  }

  getBytes(key: string): Uint8Array | undefined {
    parseObjectKey(key);
    const entry = this.objects.get(key);
    return entry === undefined ? undefined : new Uint8Array(entry.data);
  }
}
