/** Deterministic JSON: sorted keys; reject NaN/Infinity. */

function assertFiniteNumber(value: number): void {
  if (!Number.isFinite(value)) {
    throw new Error("canonicalJson rejects NaN and Infinity");
  }
}

export function canonicalize(value: unknown): unknown {
  if (value === null) {
    return null;
  }
  if (typeof value === "number") {
    assertFiniteNumber(value);
    return value;
  }
  if (typeof value === "string" || typeof value === "boolean") {
    return value;
  }
  if (typeof value === "bigint") {
    throw new Error("canonicalJson rejects bigint");
  }
  if (typeof value === "undefined") {
    throw new Error("canonicalJson rejects undefined");
  }
  if (typeof value === "symbol" || typeof value === "function") {
    throw new Error("canonicalJson rejects non-JSON types");
  }
  if (Array.isArray(value)) {
    return value.map(canonicalize);
  }
  if (value instanceof Date) {
    return value.toISOString();
  }
  const obj = value as Record<string, unknown>;
  const out: Record<string, unknown> = {};
  for (const key of Object.keys(obj).sort()) {
    const v = obj[key];
    if (v === undefined) {
      continue;
    }
    out[key] = canonicalize(v);
  }
  return out;
}

export function canonicalJson(value: unknown): string {
  return JSON.stringify(canonicalize(value));
}
