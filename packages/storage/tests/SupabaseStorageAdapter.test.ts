import { ObjectKeyError, parseObjectKey } from "../src/objectKey";
import {
  OverwriteRejectedError,
  SupabaseStorageAdapter,
} from "../src/SupabaseStorageAdapter";

describe("SupabaseStorageAdapter", () => {
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
    const adapter = new SupabaseStorageAdapter(
      () => new Date("2026-08-16T00:00:00.000Z"),
    );
    const first = adapter.put(parts, 128, "model/stl");
    expect(first.key).toBe("user-1/proj-1/run-1/art-1/model.stl");
    expect(() => adapter.put(parts, 64)).toThrow(OverwriteRejectedError);
    expect(adapter.get(first.key)?.bytes).toBe(128);
  });
});
