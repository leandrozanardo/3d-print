/** 3MF Core unit names → millimeters. */

export type ThreeMfUnit =
  | "micron"
  | "millimeter"
  | "centimeter"
  | "inch"
  | "foot"
  | "meter";

const TO_MM: Record<ThreeMfUnit, number> = {
  micron: 0.001,
  millimeter: 1,
  centimeter: 10,
  inch: 25.4,
  foot: 304.8,
  meter: 1000,
};

export function parseUnit(raw: string | undefined): ThreeMfUnit {
  const value = (raw ?? "millimeter").trim().toLowerCase();
  if (value in TO_MM) {
    return value as ThreeMfUnit;
  }
  throw new Error(`INVALID_UNIT: unsupported 3MF unit "${raw ?? ""}"`);
}

export function unitToMillimeters(unit: ThreeMfUnit): number {
  return TO_MM[unit];
}
