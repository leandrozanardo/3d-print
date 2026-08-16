import type { DetectedFormat } from "./types";

/**
 * Detect STL ascii/binary by magic / structure. Fail-closed to unknown.
 */
export function detectFormat(buffer: Uint8Array): DetectedFormat {
  if (buffer.byteLength === 0) {
    return "unknown";
  }

  const head = buffer.subarray(0, Math.min(buffer.byteLength, 256));
  const text = Buffer.from(head).toString("latin1").trimStart().toLowerCase();
  if (text.startsWith("solid")) {
    if (buffer.byteLength >= 84) {
      const view = new DataView(
        buffer.buffer,
        buffer.byteOffset,
        buffer.byteLength,
      );
      const triCount = view.getUint32(80, true);
      const expected = 84 + triCount * 50;
      if (expected === buffer.byteLength && triCount > 0) {
        return "stl-binary";
      }
    }
    if (text.includes("facet") || buffer.byteLength < 84) {
      return "stl-ascii";
    }
    if (buffer.byteLength >= 84) {
      return "stl-binary";
    }
    return "stl-ascii";
  }

  if (buffer.byteLength >= 84) {
    const view = new DataView(
      buffer.buffer,
      buffer.byteOffset,
      buffer.byteLength,
    );
    const triCount = view.getUint32(80, true);
    const expected = 84 + triCount * 50;
    if (expected === buffer.byteLength) {
      return "stl-binary";
    }
  }

  return "unknown";
}
