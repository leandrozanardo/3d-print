import { describe, expect, it } from "vitest";
import { GEOMETRY_WORKER_PROTOCOL_VERSION, isGeometryWorkerRequest } from "./protocol";

describe("geometry worker protocol", () => {
  it("accepts versioned inspect and cancel messages", () => {
    expect(
      isGeometryWorkerRequest({
        schemaVersion: GEOMETRY_WORKER_PROTOCOL_VERSION,
        type: "inspect",
        requestId: "r1",
        fileName: "cube.stl",
        bytes: new ArrayBuffer(8),
      }),
    ).toBe(true);

    expect(
      isGeometryWorkerRequest({
        schemaVersion: GEOMETRY_WORKER_PROTOCOL_VERSION,
        type: "cancel",
        requestId: "r1",
      }),
    ).toBe(true);
  });

  it("rejects unversioned or malformed messages", () => {
    expect(
      isGeometryWorkerRequest({
        type: "inspect",
        requestId: "r1",
        fileName: "cube.stl",
        bytes: new ArrayBuffer(8),
      }),
    ).toBe(false);

    expect(
      isGeometryWorkerRequest({
        schemaVersion: 99,
        type: "inspect",
        requestId: "r1",
        fileName: "cube.stl",
        bytes: new ArrayBuffer(8),
      }),
    ).toBe(false);

    expect(
      isGeometryWorkerRequest({
        schemaVersion: GEOMETRY_WORKER_PROTOCOL_VERSION,
        type: "inspect",
        requestId: "",
        fileName: "cube.stl",
        bytes: new ArrayBuffer(8),
      }),
    ).toBe(false);
  });
});
