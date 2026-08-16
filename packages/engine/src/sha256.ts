/** Portable SHA-256 (hex) via Web Crypto — available in Node 20+ and browsers. */

export async function sha256Hex(bytes: Uint8Array): Promise<string> {
  const subtle = globalThis.crypto?.subtle;
  if (!subtle) {
    throw new Error("SHA256_UNAVAILABLE: Web Crypto SubtleCrypto is required");
  }
  // Copy into a plain ArrayBuffer — SharedArrayBuffer views are rejected by some runtimes.
  const copy = new Uint8Array(bytes.byteLength);
  copy.set(bytes);
  const digest = await subtle.digest("SHA-256", copy.buffer);
  return bufferToHex(new Uint8Array(digest));
}

function bufferToHex(bytes: Uint8Array): string {
  let out = "";
  for (let i = 0; i < bytes.length; i++) {
    out += bytes[i]!.toString(16).padStart(2, "0");
  }
  return out;
}
