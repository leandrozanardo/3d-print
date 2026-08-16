import type { RawMesh } from "@fix-my-print/formats";

export interface Bounds {
  min: [number, number, number];
  max: [number, number, number];
}

export interface GeometryFacts {
  vertexCount: number;
  faceCount: number;
  bounds: Bounds;
}

export type TransformPlan =
  | { type: "translate"; dx: number; dy: number; dz: number }
  | { type: "rotate90"; axis: "x" | "y" | "z"; turns: number };

export type OutputFormat = "stl-binary";

export interface GeometryPort {
  inspect(mesh: RawMesh): GeometryFacts;
  transform(mesh: RawMesh, plan: TransformPlan): RawMesh;
  exportModel(mesh: RawMesh, format: OutputFormat): Uint8Array;
  dispose(): void;
}

function vertexCount(mesh: RawMesh): number {
  return mesh.vertices.length / 3;
}

export function computeBounds(mesh: RawMesh): Bounds {
  if (mesh.vertices.length < 3) {
    return { min: [0, 0, 0], max: [0, 0, 0] };
  }
  let minX = Infinity,
    minY = Infinity,
    minZ = Infinity;
  let maxX = -Infinity,
    maxY = -Infinity,
    maxZ = -Infinity;
  for (let i = 0; i < mesh.vertices.length; i += 3) {
    const x = mesh.vertices[i]!;
    const y = mesh.vertices[i + 1]!;
    const z = mesh.vertices[i + 2]!;
    if (x < minX) minX = x;
    if (y < minY) minY = y;
    if (z < minZ) minZ = z;
    if (x > maxX) maxX = x;
    if (y > maxY) maxY = y;
    if (z > maxZ) maxZ = z;
  }
  return { min: [minX, minY, minZ], max: [maxX, maxY, maxZ] };
}

function rotatePoint(
  x: number,
  y: number,
  z: number,
  axis: "x" | "y" | "z",
  turns: number,
): [number, number, number] {
  const t = ((turns % 4) + 4) % 4;
  let px = x,
    py = y,
    pz = z;
  for (let i = 0; i < t; i++) {
    if (axis === "x") {
      const ny = -pz;
      const nz = py;
      py = ny;
      pz = nz;
    } else if (axis === "y") {
      const nx = pz;
      const nz = -px;
      px = nx;
      pz = nz;
    } else {
      const nx = -py;
      const ny = px;
      px = nx;
      py = ny;
    }
  }
  return [px, py, pz];
}

function exportBinaryStl(mesh: RawMesh): Uint8Array {
  const triCount = mesh.faces.length;
  const buf = new ArrayBuffer(84 + triCount * 50);
  const u8 = new Uint8Array(buf);
  const view = new DataView(buf);
  const header = Buffer.from("fix-my-print export", "ascii");
  u8.set(header.subarray(0, Math.min(80, header.length)), 0);
  view.setUint32(80, triCount, true);

  for (let t = 0; t < triCount; t++) {
    const face = mesh.faces[t]!;
    const base = 84 + t * 50;
    const idxs = [face[0]!, face[1]!, face[2]!];
    const pts: [number, number, number][] = idxs.map((vi) => {
      const o = vi * 3;
      return [mesh.vertices[o]!, mesh.vertices[o + 1]!, mesh.vertices[o + 2]!];
    });
    const [a, b, c] = pts;
    const ux = b![0] - a![0],
      uy = b![1] - a![1],
      uz = b![2] - a![2];
    const vx = c![0] - a![0],
      vy = c![1] - a![1],
      vz = c![2] - a![2];
    let nx = uy * vz - uz * vy;
    let ny = uz * vx - ux * vz;
    let nz = ux * vy - uy * vx;
    const len = Math.hypot(nx, ny, nz) || 1;
    nx /= len;
    ny /= len;
    nz /= len;
    const floats = [nx, ny, nz, ...a!, ...b!, ...c!];
    for (let f = 0; f < 12; f++) {
      view.setFloat32(base + f * 4, floats[f]!, true);
    }
    view.setUint16(base + 48, 0, true);
  }
  return u8;
}

/** Pure TypeScript geometry adapter (no WASM). */
export class PureTsGeometryAdapter implements GeometryPort {
  inspect(mesh: RawMesh): GeometryFacts {
    return {
      vertexCount: vertexCount(mesh),
      faceCount: mesh.faces.length,
      bounds: computeBounds(mesh),
    };
  }

  transform(mesh: RawMesh, plan: TransformPlan): RawMesh {
    const vertices = new Float64Array(mesh.vertices);
    if (plan.type === "translate") {
      for (let i = 0; i < vertices.length; i += 3) {
        vertices[i]! += plan.dx;
        vertices[i + 1]! += plan.dy;
        vertices[i + 2]! += plan.dz;
      }
    } else {
      for (let i = 0; i < vertices.length; i += 3) {
        const [x, y, z] = rotatePoint(
          vertices[i]!,
          vertices[i + 1]!,
          vertices[i + 2]!,
          plan.axis,
          plan.turns,
        );
        vertices[i] = x;
        vertices[i + 1] = y;
        vertices[i + 2] = z;
      }
    }
    return {
      vertices,
      faces: mesh.faces.map((f) => [...f]),
    };
  }

  exportModel(mesh: RawMesh, format: OutputFormat): Uint8Array {
    if (format !== "stl-binary") {
      throw new Error("FORMAT_UNSUPPORTED");
    }
    return exportBinaryStl(mesh);
  }

  dispose(): void {
    // no-op for pure TS
  }
}
