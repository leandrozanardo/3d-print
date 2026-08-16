import type { SupabaseClient } from "@supabase/supabase-js";

import { OverwriteRejectedError, StorageOperationError } from "../src/errors";
import {
  isStorageConflictError,
  SupabaseStorageAdapter,
} from "../src/SupabaseStorageAdapter";

type UploadFn = jest.Mock;
type DownloadFn = jest.Mock;
type ListFn = jest.Mock;

function createMockClient(handlers: {
  upload?: UploadFn;
  download?: DownloadFn;
  list?: ListFn;
}): SupabaseClient {
  const upload =
    handlers.upload ?? jest.fn(async () => ({ data: { path: "x" }, error: null }));
  const download =
    handlers.download ??
    jest.fn(async () => ({
      data: new Blob([new Uint8Array([1, 2, 3])]),
      error: null,
    }));
  const list =
    handlers.list ??
    jest.fn(async () => ({
      data: [
        {
          name: "model.stl",
          id: "id-1",
          created_at: "2026-08-16T00:00:00.000Z",
          metadata: { size: 3, mimetype: "model/stl" },
        },
      ],
      error: null,
    }));

  return {
    storage: {
      from: jest.fn(() => ({
        upload,
        download,
        list,
      })),
    },
  } as unknown as SupabaseClient;
}

describe("SupabaseStorageAdapter (contract via mock client)", () => {
  const parts = {
    userId: "user-1",
    projectId: "proj-1",
    runId: "run-1",
    artifactId: "art-1",
    name: "model.stl",
  };
  const key = "user-1/proj-1/run-1/art-1/model.stl";

  it("uploads create-only with upsert:false", async () => {
    const upload = jest.fn(async () => ({ data: { path: key }, error: null }));
    const client = createMockClient({ upload });
    const adapter = new SupabaseStorageAdapter({
      client,
      bucket: "artifacts",
      clock: () => new Date("2026-08-16T00:00:00.000Z"),
    });

    const body = new Uint8Array([10, 20, 30]);
    const meta = await adapter.put(parts, body, "model/stl");

    expect(meta).toEqual({
      key,
      bytes: 3,
      contentType: "model/stl",
      createdAt: "2026-08-16T00:00:00.000Z",
    });
    expect(client.storage.from).toHaveBeenCalledWith("artifacts");
    expect(upload).toHaveBeenCalledWith(
      key,
      body,
      expect.objectContaining({ upsert: false, contentType: "model/stl" }),
    );
  });

  it("maps upload conflict to OverwriteRejectedError", async () => {
    const upload = jest.fn(async () => ({
      data: null,
      error: {
        message: "The resource already exists",
        statusCode: "409",
        error: "Duplicate",
      },
    }));
    const adapter = new SupabaseStorageAdapter({
      client: createMockClient({ upload }),
      bucket: "artifacts",
    });

    await expect(adapter.put(parts, new Uint8Array([1]))).rejects.toBeInstanceOf(
      OverwriteRejectedError,
    );
  });

  it("downloads object bytes via storage API", async () => {
    const download = jest.fn(async () => ({
      data: new Blob([new Uint8Array([7, 8, 9])]),
      error: null,
    }));
    const adapter = new SupabaseStorageAdapter({
      client: createMockClient({ download }),
      bucket: "artifacts",
    });

    const bytes = await adapter.get(key);
    expect(bytes).toEqual(new Uint8Array([7, 8, 9]));
    expect(download).toHaveBeenCalledWith(key);
  });

  it("returns undefined when download misses the object", async () => {
    const download = jest.fn(async () => ({
      data: null,
      error: { message: "Object not found", statusCode: "404" },
    }));
    const adapter = new SupabaseStorageAdapter({
      client: createMockClient({ download }),
      bucket: "artifacts",
    });

    await expect(adapter.get(key)).resolves.toBeUndefined();
  });

  it("lists objects under a prefix", async () => {
    const list = jest.fn(async () => ({
      data: [
        {
          name: "model.stl",
          id: "id-1",
          created_at: "2026-08-16T00:00:00.000Z",
          metadata: { size: 128, mimetype: "model/stl" },
        },
      ],
      error: null,
    }));
    const adapter = new SupabaseStorageAdapter({
      client: createMockClient({ list }),
      bucket: "artifacts",
    });

    const rows = await adapter.list("user-1/proj-1/run-1/art-1");
    expect(rows).toEqual([
      {
        key: "user-1/proj-1/run-1/art-1/model.stl",
        bytes: 128,
        contentType: "model/stl",
        createdAt: "2026-08-16T00:00:00.000Z",
      },
    ]);
    expect(list).toHaveBeenCalledWith(
      "user-1/proj-1/run-1/art-1",
      expect.objectContaining({ limit: 1000 }),
    );
  });

  it("surfaces non-conflict upload failures without leaking secrets", async () => {
    const upload = jest.fn(async () => ({
      data: null,
      error: { message: "service unavailable", statusCode: "503" },
    }));
    const adapter = new SupabaseStorageAdapter({
      client: createMockClient({ upload }),
      bucket: "artifacts",
    });

    await expect(adapter.put(parts, new Uint8Array([1]))).rejects.toBeInstanceOf(
      StorageOperationError,
    );
  });

  it("classifies conflict heuristics", () => {
    expect(
      isStorageConflictError({
        statusCode: 400,
        message: "Asset already exists",
      }),
    ).toBe(true);
    expect(isStorageConflictError({ statusCode: 500, message: "boom" })).toBe(false);
  });
});
