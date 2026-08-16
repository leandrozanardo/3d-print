import { createEngineError, EngineException } from "@fix-my-print/contracts";

/** Reject NaN / Infinity coordinate values. */
export function assertFiniteCoord(value: number, label: string): number {
  if (!Number.isFinite(value)) {
    throw new EngineException(
      createEngineError("MESH_PARSE_FAILED", `non-finite coordinate: ${label}`, {
        retryable: false,
        context: { value: String(value) },
      }),
    );
  }
  return value;
}

export function assertFiniteTriple(
  x: number,
  y: number,
  z: number,
  label: string,
): [number, number, number] {
  return [
    assertFiniteCoord(x, `${label}.x`),
    assertFiniteCoord(y, `${label}.y`),
    assertFiniteCoord(z, `${label}.z`),
  ];
}
