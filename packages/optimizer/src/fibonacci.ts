/**
 * Deterministic Fibonacci sphere directions for sparse candidate sets (OPT-008).
 */

import { FIBONACCI_SPHERE_COUNT } from "./orientationPolicy";
import type { Vec3 } from "./pca";

const GOLDEN_ANGLE = Math.PI * (3 - Math.sqrt(5));

/**
 * Uniform-ish unit directions on the sphere (deterministic, fixed count).
 */
export function fibonacciSphereDirections(count = FIBONACCI_SPHERE_COUNT): Vec3[] {
  const n = Math.max(1, Math.floor(count));
  const out: Vec3[] = [];
  for (let i = 0; i < n; i++) {
    const y = 1 - (i / Math.max(1, n - 1)) * 2;
    const radius = Math.sqrt(Math.max(0, 1 - y * y));
    const theta = GOLDEN_ANGLE * i;
    const x = Math.cos(theta) * radius;
    const z = Math.sin(theta) * radius;
    out.push([x, y, z]);
  }
  return out;
}
