import AdmZip from "adm-zip";

import { EngineException } from "@fix-my-print/contracts";

import { openZipReadOnly } from "../src/index";

describe("@fix-my-print/formats-3mf", () => {
  it("rejects traversal path entry", () => {
    const zip = new AdmZip();
    const entry = zip.addFile("safe.txt", Buffer.from("x"));
    entry.entryName = "../escape.txt";
    const buf = zip.toBuffer();
    expect(() => openZipReadOnly(buf)).toThrow(EngineException);
    try {
      openZipReadOnly(buf);
    } catch (e) {
      expect(e).toBeInstanceOf(EngineException);
      expect((e as EngineException).code).toBe("REPO_BOUNDARY_VIOLATION");
    }
  });

  it("lists safe members read-only", () => {
    const zip = new AdmZip();
    zip.addFile("3D/3dmodel.model", Buffer.from("<model/>"));
    const opened = openZipReadOnly(zip.toBuffer());
    expect(opened.members.map((m) => m.path)).toEqual(["3D/3dmodel.model"]);
    expect(opened.readMember("3D/3dmodel.model").toString("utf8")).toBe(
      "<model/>",
    );
  });
});
