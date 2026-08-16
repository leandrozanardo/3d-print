#!/usr/bin/env node
/**
 * Build public Geometry Quality V2 fixtures that satisfy locked E2E assertions.
 */
import fs from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";
import { writeThreeMf } from "../packages/formats-3mf/dist/write.js";

const ROOT = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "..");
const outDir = path.join(ROOT, "packages/formats/fixtures");
fs.mkdirSync(outDir, { recursive: true });

function box(sx, sy, sz, ox = 0, oy = 0, oz = 0) {
  const x0 = ox;
  const y0 = oy;
  const z0 = oz;
  const x1 = ox + sx;
  const y1 = oy + sy;
  const z1 = oz + sz;
  const positions = Float64Array.from([
    x0, y0, z0, x1, y0, z0, x1, y1, z0, x0, y1, z0, x0, y0, z1, x1, y0, z1, x1, y1, z1, x0, y1, z1,
  ]);
  const indices = Uint32Array.from([
    0, 1, 2, 0, 2, 3, 4, 6, 5, 4, 7, 6, 0, 4, 5, 0, 5, 1, 1, 5, 6, 1, 6, 2, 2, 6, 7, 2, 7, 3, 3, 7,
    4, 3, 4, 0,
  ]);
  return { positions, indices };
}

/** 10mm cube missing only a 0.2mm square in the top face (fillable under default policy). */
function openCubeTinyHole() {
  const positions = Float64Array.from([
    // 0..7 outer cube
    0, 0, 0, 10, 0, 0, 10, 10, 0, 0, 10, 0, 0, 0, 10, 10, 0, 10, 10, 10, 10, 0, 10, 10,
    // 8..11 hole on top z=10
    4.9, 4.9, 10, 5.1, 4.9, 10, 5.1, 5.1, 10, 4.9, 5.1, 10,
  ]);
  const indices = Uint32Array.from([
    // bottom
    0, 1, 2, 0, 2, 3,
    // sides
    0, 4, 5, 0, 5, 1, 1, 5, 6, 1, 6, 2, 2, 6, 7, 2, 7, 3, 3, 7, 4, 3, 4, 0,
    // top rim (outer top verts 4,5,6,7 around hole 8,9,10,11)
    4, 5, 9, 4, 9, 8, 5, 6, 10, 5, 10, 9, 6, 7, 11, 6, 11, 10, 7, 4, 8, 7, 8, 11,
  ]);
  return { id: "open", name: "OpenCubeTinyHole", positions, indices };
}

/** Thin plate rotated 35° about X — best bed is non-orthogonal. */
function tiltedPlate() {
  const sx = 60;
  const sy = 20;
  const sz = 2;
  const mesh = box(sx, sy, sz, -sx / 2, -sy / 2, -sz / 2);
  const rad = (35 * Math.PI) / 180;
  const c = Math.cos(rad);
  const s = Math.sin(rad);
  const positions = new Float64Array(mesh.positions.length);
  for (let i = 0; i < mesh.positions.length; i += 3) {
    const x = mesh.positions[i];
    const y = mesh.positions[i + 1];
    const z = mesh.positions[i + 2];
    positions[i] = x;
    positions[i + 1] = y * c - z * s;
    positions[i + 2] = y * s + z * c;
  }
  return { id: "tilted", name: "TiltedPlate", positions, indices: mesh.indices };
}

function scene(meshes, fileName) {
  return {
    unit: "millimeter",
    meshes,
    bounds: { min: [0, 0, 0], max: [1, 1, 1] },
    sourceFormat: "3mf",
    sourceMetadata: {
      fileName,
      originalUnit: "millimeter",
      memberCount: 3,
      objectCount: meshes.length,
      buildItemCount: meshes.length,
      modelPath: "3D/3dmodel.model",
    },
    warnings: [],
  };
}

const open = openCubeTinyHole();
const tilted = tiltedPlate();
const a = box(1, 1, 1);
const b = box(1, 1, 1, 2, 0, 0);
const two = [
  { id: "a", name: "Alpha", positions: a.positions, indices: a.indices },
  { id: "b", name: "Beta", positions: b.positions, indices: b.indices },
];

for (const [name, meshes] of [
  ["open-cube-safe-hole.3mf", [open]],
  ["tilted-wedge.3mf", [tilted]],
  ["two-cubes.3mf", two],
  ["goal-tradeoff.3mf", [tilted]],
]) {
  const { bytes } = writeThreeMf(scene(meshes, name));
  fs.writeFileSync(path.join(outDir, name), bytes);
  console.log(name, bytes.byteLength);
}
