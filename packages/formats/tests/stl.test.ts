import * as fs from "node:fs";
import * as path from "node:path";

import { EngineException } from "@fix-my-print/contracts";

import {
  detectFormat,
  parseBinaryStl,
  parseMesh,
  parseObj,
  parsePly,
} from "../src/index";

const FIXTURES = path.join(__dirname, "..", "fixtures");
const CUBE = path.join(FIXTURES, "cube.stl");
const TRI_OBJ = path.join(FIXTURES, "triangle.obj");
const QUAD_OBJ = path.join(FIXTURES, "quad.obj");
const TRI_PLY = path.join(FIXTURES, "triangle.ply");
const SHARED_OBJ = path.join(
  __dirname,
  "..",
  "..",
  "..",
  "tests",
  "fixtures",
  "mesh",
  "triangle.obj",
);

function buildBinaryLittleEndianPly(): Uint8Array {
  const header = Buffer.from(
    [
      "ply",
      "format binary_little_endian 1.0",
      "element vertex 3",
      "property float x",
      "property float y",
      "property float z",
      "element face 1",
      "property list uchar int vertex_indices",
      "end_header\n",
    ].join("\n"),
    "ascii",
  );
  const body = Buffer.alloc(3 * 12 + 1 + 3 * 4);
  let o = 0;
  const writeF32 = (v: number) => {
    body.writeFloatLE(v, o);
    o += 4;
  };
  writeF32(0);
  writeF32(0);
  writeF32(0);
  writeF32(1);
  writeF32(0);
  writeF32(0);
  writeF32(0);
  writeF32(1);
  writeF32(0);
  body.writeUInt8(3, o);
  o += 1;
  body.writeInt32LE(0, o);
  o += 4;
  body.writeInt32LE(1, o);
  o += 4;
  body.writeInt32LE(2, o);
  return new Uint8Array(Buffer.concat([header, body]));
}

describe("@fix-my-print/formats", () => {
  it("parses binary STL cube", () => {
    const buf = new Uint8Array(fs.readFileSync(CUBE));
    expect(detectFormat(buf)).toBe("stl-binary");
    const mesh = parseBinaryStl(buf);
    expect(mesh.faces.length).toBe(12);
    expect(mesh.vertices.length).toBe(12 * 9);
    const parsed = parseMesh(buf);
    expect(parsed.format).toBe("stl-binary");
    expect(parsed.mesh.faces.length).toBe(12);
  });

  it("parses simple OBJ triangle", () => {
    const buf = new Uint8Array(fs.readFileSync(TRI_OBJ));
    expect(detectFormat(buf)).toBe("obj");
    const mesh = parseObj(buf);
    expect(mesh.vertices.length).toBe(9);
    expect(mesh.faces).toEqual([[0, 1, 2]]);
    expect(parseMesh(buf).format).toBe("obj");
  });

  it("triangulates OBJ n-gons and resolves negative indices", () => {
    const buf = new Uint8Array(fs.readFileSync(QUAD_OBJ));
    const mesh = parseObj(buf);
    expect(mesh.faces.length).toBe(3);
    expect(mesh.faces[0]).toEqual([0, 1, 2]);
    expect(mesh.faces[1]).toEqual([0, 2, 3]);
    expect(mesh.faces[2]).toEqual([0, 1, 2]);
  });

  it("parses simple PLY ASCII", () => {
    const buf = new Uint8Array(fs.readFileSync(TRI_PLY));
    expect(detectFormat(buf)).toBe("ply-ascii");
    const mesh = parsePly(buf);
    expect(mesh.faces).toEqual([[0, 1, 2]]);
    expect(parseMesh(buf).format).toBe("ply-ascii");
  });

  it("parses simple PLY binary little-endian", () => {
    const buf = buildBinaryLittleEndianPly();
    expect(detectFormat(buf)).toBe("ply-binary");
    const mesh = parsePly(buf);
    expect(mesh.faces).toEqual([[0, 1, 2]]);
    expect(mesh.vertices[0]).toBeCloseTo(0);
    expect(mesh.vertices[3]).toBeCloseTo(1);
  });

  it("loads shared mesh fixture path", () => {
    const buf = new Uint8Array(fs.readFileSync(SHARED_OBJ));
    expect(detectFormat(buf)).toBe("obj");
  });

  it("rejects empty buffer", () => {
    expect(() => parseMesh(new Uint8Array(0))).toThrow(EngineException);
  });

  it("rejects truncated binary STL", () => {
    const buf = new Uint8Array(fs.readFileSync(CUBE));
    const truncated = buf.subarray(0, 100);
    expect(() => parseBinaryStl(truncated)).toThrow(EngineException);
  });

  it("rejects malformed OBJ invalid face refs", () => {
    const bad = Buffer.from("v 0 0 0\nf 1 2 3\n", "utf8");
    expect(() => parseObj(new Uint8Array(bad))).toThrow(EngineException);
  });

  it("rejects truncated PLY ASCII", () => {
    const full = fs.readFileSync(TRI_PLY, "utf8");
    const truncated = Buffer.from(
      full.split("end_header")[0] + "end_header\n0 0",
      "utf8",
    );
    expect(() => parsePly(new Uint8Array(truncated))).toThrow(EngineException);
  });

  it("rejects NaN coordinates in OBJ", () => {
    const bad = Buffer.from("v NaN 0 0\nv 1 0 0\nv 0 1 0\nf 1 2 3\n", "utf8");
    expect(() => parseObj(new Uint8Array(bad))).toThrow(EngineException);
  });

  it("rejects unknown / malformed buffers", () => {
    expect(() => parseMesh(new Uint8Array([1, 2, 3, 4]))).toThrow(EngineException);
  });
});
