/** Browser-safe text decoding helpers (no Node Buffer). */

const utf8 = new TextDecoder("utf-8");
const latin1 = new TextDecoder("latin1");

export function decodeUtf8(bytes: Uint8Array): string {
  return utf8.decode(bytes);
}

export function decodeLatin1(bytes: Uint8Array): string {
  return latin1.decode(bytes);
}
