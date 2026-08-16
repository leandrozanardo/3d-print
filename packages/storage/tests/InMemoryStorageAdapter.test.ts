import { ObjectKeyError, parseObjectKey } from "../src/objectKey";
import { OverwriteRejectedError } from "../src/errors";
import { InMemoryStorageAdapter } from "../src/InMemoryStorageAdapter";

describe("InMemoryStorageAdapter", () => {
  const parts = {
    userId: "user-1",
    projectId: "proj-1",
    runId: "run-1",
    artifactId: "art-1",
    name: "model.stl",
  };

  it("accepts canonical object keys", () => {
    const key = "user-1/proj-1/run-1/art-1/model.stl";
    expect(parseObjectKey(key)).toEqual(parts);
  });

  it("rejects malformed keys", () => {
    expect(() => parseObjectKey("too/short")).toThrow(ObjectKeyError);
    expect(() => parseObjectKey("../evil/a/b/c")).toThrow(ObjectKeyError);
  });

  it("stores once and rejects overwrite", () => {
    const adapter = new InMemoryStorageAdapter(
      () => new Date("2026-08-16T00:00:00.000Z"),
    );
    const payload = new Uint8Array([1, 2, 3, 4]);
    const first = adapter.put(parts, payload, "model/stl");
    expect(first.key).toBe("user-1/proj-1/run-1/art-1/model.stl");
    expect(first.bytes).toBe(4);
    expect(first.createdAt).toBe("2026-08-16T00:00:00.000Z");
    expect(() => adapter.put(parts, new Uint8Array([9]))).toThrow(OverwriteRejectedError);
    expect(adapter.get(first.key)?.bytes).toBe(4);
    expect(adapter.getBytes(first.key)).toEqual(payload);
    expect(adapter.listKeys()).toEqual([first.key]);
    expect(adapter.list()).toHaveLength(1);
  });
});
