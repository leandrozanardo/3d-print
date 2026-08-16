export class OverwriteRejectedError extends Error {
  readonly code = "OVERWRITE_REJECTED" as const;

  constructor(message = "OVERWRITE_REJECTED") {
    super(message);
    this.name = "OverwriteRejectedError";
  }
}

export class StorageOperationError extends Error {
  readonly code = "STORAGE_OPERATION_FAILED" as const;

  constructor(message = "STORAGE_OPERATION_FAILED") {
    super(message);
    this.name = "StorageOperationError";
  }
}

export type StoredObjectMeta = {
  key: string;
  bytes: number;
  contentType: string;
  createdAt: string;
};
