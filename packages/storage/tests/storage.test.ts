import { EngineException } from "@fix-my-print/contracts";

import { MemoryStorageAdapter } from "../src/index";

describe("@fix-my-print/storage", () => {
  it("throws STORAGE_CONFLICT on overwrite", () => {
    const store = new MemoryStorageAdapter();
    store.putCreateOnly("a", new Uint8Array([1]));
    expect(() => store.putCreateOnly("a", new Uint8Array([2]))).toThrow(
      EngineException,
    );
    try {
      store.putCreateOnly("a", new Uint8Array([2]));
    } catch (e) {
      expect((e as EngineException).code).toBe("STORAGE_CONFLICT");
    }
    expect(store.get("a")).toEqual(new Uint8Array([1]));
  });
});
