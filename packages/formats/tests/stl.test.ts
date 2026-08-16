import * as fs from "node:fs";
import * as path from "node:path";

import { EngineException } from "@fix-my-print/contracts";

import { detectFormat, parseBinaryStl, parseMesh } from "../src/index";

const CUBE = path.join(__dirname, "..", "fixtures", "cube.stl");

describe("@fix-my-print/formats", () => {
  it("parses binary STL cube", () => {
    const buf = new Uint8Array(fs.readFileSync(CUBE));
    expect(detectFormat(buf)).toBe("stl-binary");
    const mesh = parseBinaryStl(buf);
    expect(mesh.faces.length).toBe(12);
    expect(mesh.vertices.length).toBe(12 * 9);
  });

  it("rejects empty buffer", () => {
    expect(() => parseMesh(new Uint8Array(0))).toThrow(EngineException);
  });

  it("rejects truncated binary STL", () => {
    const buf = new Uint8Array(fs.readFileSync(CUBE));
    const truncated = buf.subarray(0, 100);
    expect(() => parseBinaryStl(truncated)).toThrow(EngineException);
  });
});
