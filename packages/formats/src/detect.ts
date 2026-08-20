import type { DetectedFormat } from "./types";
import { decodeLatin1, decodeUtf8 } from "./text";

function headText(buffer: Uint8Array, maxBytes: number): string {
  const head = buffer.subarray(0, Math.min(buffer.byteLength, maxBytes));
  return decodeUtf8(head);
}

function looksLikePly(buffer: Uint8Array): DetectedFormat | null {
  if (buffer.byteLength < 3) {
    return null;
  }
  const magic = decodeLatin1(buffer.subarray(0, 4));
  if (!magic.startsWith("ply")) {
    return null;
  }
  const text = headText(buffer, 4096);
  if (!/^ply(?:\r\n|\n|\r)/i.test(text)) {
    return null;
  }
  if (/format\s+binary_little_endian\b/i.test(text)) {
    return "ply-binary";
  }
  if (/format\s+binary_big_endian\b/i.test(text)) {
    // Big-endian not supported yet — still detect as binary family for fail-closed parse.
    return "ply-binary";
  }
  if (/format\s+ascii\b/i.test(text)) {
    return "ply-ascii";
  }
  return "ply-ascii";
}

function looksLikeObj(buffer: Uint8Array): boolean {
  const text = headText(buffer, 8192);
  // Reject obvious binary (NUL in head).
  if (text.includes("\u0000")) {
    return false;
  }
  let hasVertex = false;
  let hasFace = false;
  for (const rawLine of text.split(/\r?\n/)) {
    const line = rawLine.trim();
    if (line.length === 0 || line.startsWith("#")) {
      continue;
    }
    if (/^v\s+[+-]?(?:\d+\.?\d*|\.\d+)/i.test(line)) {
      hasVertex = true;
    } else if (/^f\s+\S+/i.test(line)) {
      hasFace = true;
    } else if (
      /^(vn|vt|vp|o|g|s|mtllib|usemtl|cstype|deg|curv|surf|parm|trim|hole|scrv|sp|end)\b/i.test(
        line,
      )
    ) {
      // Wavefront keyword — strengthens OBJ signal once a vertex exists.
      if (hasVertex) {
        return true;
      }
    }
    if (hasVertex && hasFace) {
      return true;
    }
  }
  return hasVertex && hasFace;
}

/**
 * Detect mesh format by magic / structure. Fail-closed to unknown.
 */
export function detectFormat(buffer: Uint8Array): DetectedFormat {
  if (buffer.byteLength === 0) {
    return "unknown";
  }

  const ply = looksLikePly(buffer);
  if (ply !== null) {
    return ply;
  }

  if (looksLikeObj(buffer)) {
    return "obj";
  }

  const head = buffer.subarray(0, Math.min(buffer.byteLength, 256));
  const text = decodeLatin1(head).trimStart().toLowerCase();
  if (text.startsWith("solid")) {
    if (buffer.byteLength >= 84) {
      const view = new DataView(buffer.buffer, buffer.byteOffset, buffer.byteLength);
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
    const view = new DataView(buffer.buffer, buffer.byteOffset, buffer.byteLength);
    const triCount = view.getUint32(80, true);
    const expected = 84 + triCount * 50;
    if (expected === buffer.byteLength) {
      return "stl-binary";
    }
  }

  return "unknown";
}
