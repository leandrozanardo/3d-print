import type { SupabaseClient } from "@supabase/supabase-js";

import { formatObjectKey, parseObjectKey, type ObjectKeyParts } from "./objectKey";
import {
  OverwriteRejectedError,
  StorageOperationError,
  type StoredObjectMeta,
} from "./errors";

/** Minimal body types accepted by supabase-js storage upload. */
export type StorageUploadBody = ArrayBuffer | ArrayBufferView | Buffer | string;

type StorageApiErrorLike = {
  message?: string;
  error?: string;
  statusCode?: string | number;
  status?: number;
};

function readStatus(error: StorageApiErrorLike): number | undefined {
  const raw = error.statusCode ?? error.status;
  if (raw === undefined || raw === null) {
    return undefined;
  }
  const n = typeof raw === "number" ? raw : Number(raw);
  return Number.isFinite(n) ? n : undefined;
}

/** Map Supabase create-only conflicts onto OverwriteRejectedError. */
export function isStorageConflictError(error: StorageApiErrorLike): boolean {
  const status = readStatus(error);
  const haystack = `${error.message ?? ""} ${error.error ?? ""}`.toLowerCase();
  if (status === 409) {
    return true;
  }
  if (
    status === 400 &&
    /already exists|duplicate|resource already exists/.test(haystack)
  ) {
    return true;
  }
  if (/duplicate/i.test(error.error ?? "")) {
    return true;
  }
  return false;
}

function isNotFoundError(error: StorageApiErrorLike | null | undefined): boolean {
  if (!error) {
    return false;
  }
  const status = readStatus(error);
  if (status === 404) {
    return true;
  }
  const haystack = `${error.message ?? ""} ${error.error ?? ""}`.toLowerCase();
  return /not found|object not found|does not exist/.test(haystack);
}

function estimateByteLength(body: StorageUploadBody): number {
  if (typeof body === "string") {
    return Buffer.byteLength(body);
  }
  if (Buffer.isBuffer(body)) {
    return body.byteLength;
  }
  if (body instanceof ArrayBuffer) {
    return body.byteLength;
  }
  return body.byteLength;
}

/**
 * Real Supabase Storage adapter (create-only uploads).
 * Inject a SupabaseClient; never log credentials or signed URLs.
 */
export class SupabaseStorageAdapter {
  private readonly client: SupabaseClient;
  private readonly bucket: string;
  private readonly clock: () => Date;

  constructor(options: { client: SupabaseClient; bucket: string; clock?: () => Date }) {
    if (typeof options.bucket !== "string" || options.bucket.trim() === "") {
      throw new StorageOperationError("INVALID_BUCKET");
    }
    this.client = options.client;
    this.bucket = options.bucket;
    this.clock = options.clock ?? (() => new Date());
  }

  async put(
    parts: ObjectKeyParts,
    body: StorageUploadBody,
    contentType = "application/octet-stream",
  ): Promise<StoredObjectMeta> {
    const key = formatObjectKey(parts);
    const { error } = await this.client.storage.from(this.bucket).upload(key, body, {
      upsert: false,
      contentType,
    });

    if (error) {
      if (isStorageConflictError(error)) {
        throw new OverwriteRejectedError("OVERWRITE_REJECTED");
      }
      throw new StorageOperationError(error.message || "STORAGE_UPLOAD_FAILED");
    }

    return {
      key,
      bytes: estimateByteLength(body),
      contentType,
      createdAt: this.clock().toISOString(),
    };
  }

  async get(key: string): Promise<Uint8Array | undefined> {
    parseObjectKey(key);
    const { data, error } = await this.client.storage.from(this.bucket).download(key);

    if (error) {
      if (isNotFoundError(error)) {
        return undefined;
      }
      throw new StorageOperationError(error.message || "STORAGE_DOWNLOAD_FAILED");
    }
    if (!data) {
      return undefined;
    }

    const buffer = await data.arrayBuffer();
    return new Uint8Array(buffer);
  }

  async list(prefix = ""): Promise<StoredObjectMeta[]> {
    if (prefix !== "") {
      // Validate when callers pass a full object-key-shaped prefix leaf.
      if (prefix.split("/").length === 5) {
        parseObjectKey(prefix);
      }
    }

    const { data, error } = await this.client.storage.from(this.bucket).list(prefix, {
      limit: 1000,
      offset: 0,
      sortBy: { column: "name", order: "asc" },
    });

    if (error) {
      throw new StorageOperationError(error.message || "STORAGE_LIST_FAILED");
    }

    const base = prefix.replace(/\/$/, "");
    return (data ?? [])
      .filter((entry) => typeof entry.name === "string" && entry.name.length > 0)
      .map((entry) => {
        const key = base ? `${base}/${entry.name}` : entry.name;
        const size = typeof entry.metadata?.size === "number" ? entry.metadata.size : 0;
        const contentType =
          typeof entry.metadata?.mimetype === "string"
            ? entry.metadata.mimetype
            : "application/octet-stream";
        return {
          key,
          bytes: size,
          contentType,
          createdAt: entry.created_at ?? this.clock().toISOString(),
        } satisfies StoredObjectMeta;
      });
  }
}
