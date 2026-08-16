import { describe, expect, it } from "vitest";
import { GEOMETRY_WORKER_PROTOCOL_VERSION, isWorkerRequest } from "./protocol";

describe("geometry worker protocol", () => {
  it("accepts versioned process and cancel messages", () => {
    expect(
      isWorkerRequest({
        schemaVersion: GEOMETRY_WORKER_PROTOCOL_VERSION,
        type: "process",
        jobId: "j1",
        fileName: "cube.stl",
        bytes: new ArrayBuffer(8),
        printer: {
          id: "bambu-a1-mini",
          name: "Bambu Lab A1 Mini",
          bedWidthMm: 180,
          bedDepthMm: 180,
          maxHeightMm: 180,
        },
        goal: "balanced",
        repairMode: "safe",
      }),
    ).toBe(true);

    expect(
      isWorkerRequest({
        schemaVersion: GEOMETRY_WORKER_PROTOCOL_VERSION,
        type: "cancel",
        jobId: "j1",
      }),
    ).toBe(true);
  });

  it("rejects unversioned or malformed messages", () => {
    expect(
      isWorkerRequest({
        type: "process",
        jobId: "j1",
        fileName: "cube.stl",
        bytes: new ArrayBuffer(8),
      }),
    ).toBe(false);

    expect(
      isWorkerRequest({
        schemaVersion: 99,
        type: "process",
        jobId: "j1",
        fileName: "cube.stl",
        bytes: new ArrayBuffer(8),
      }),
    ).toBe(false);
  });
});
