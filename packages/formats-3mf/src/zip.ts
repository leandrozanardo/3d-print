import { unzipSync } from "fflate";
import { createEngineError, EngineException } from "@fix-my-print/contracts";

export interface ZipOpenLimits {
  maxEntries: number;
  maxUncompressedBytes: number;
  maxCompressionRatio: number;
}

export const DEFAULT_ZIP_LIMITS: ZipOpenLimits = {
  maxEntries: 512,
  maxUncompressedBytes: 128 * 1024 * 1024,
  maxCompressionRatio: 200,
};

export interface ZipMember {
  path: string;
  compressedSize: number;
  uncompressedSize: number;
}

export function isUnsafeEntryPath(entryPath: string): boolean {
  const normalized = entryPath.replace(/\\/g, "/");
  if (normalized.startsWith("/") || /^[a-zA-Z]:/.test(normalized)) {
    return true;
  }
  const parts = normalized.split("/");
  return parts.some((p) => p === ".." || p === "");
}

function toBuffer(data: Uint8Array): Buffer {
  return Buffer.from(data.buffer, data.byteOffset, data.byteLength);
}

/**
 * Open a ZIP/3MF buffer read-only using fflate (works in Node and browser workers).
 * Does not extract to disk.
 */
export function openZipReadOnly(
  buffer: Buffer | Uint8Array,
  limits: ZipOpenLimits = DEFAULT_ZIP_LIMITS,
): { members: ZipMember[]; readMember(path: string): Buffer } {
  const input = buffer instanceof Uint8Array ? buffer : Uint8Array.from(buffer);

  const members: ZipMember[] = [];
  let totalUncompressed = 0;
  let entryCount = 0;

  let files: Record<string, Uint8Array>;
  try {
    files = unzipSync(input, {
      filter(file) {
        const name = file.name.replace(/\\/g, "/");
        if (name.endsWith("/")) {
          return false;
        }
        entryCount += 1;
        if (entryCount > limits.maxEntries) {
          throw new EngineException(
            createEngineError("ARCHIVE_BOMB_RISK", "too many zip entries", {
              context: { count: entryCount, maxEntries: limits.maxEntries },
            }),
          );
        }
        if (isUnsafeEntryPath(name)) {
          throw new EngineException(
            createEngineError(
              "REPO_BOUNDARY_VIOLATION",
              `unsafe zip entry path: ${name}`,
              { retryable: false },
            ),
          );
        }
        const compressed = file.size;
        const uncompressed = file.originalSize;
        if (uncompressed > 0 && compressed > 0) {
          const ratio = uncompressed / compressed;
          if (ratio > limits.maxCompressionRatio) {
            throw new EngineException(
              createEngineError("ARCHIVE_BOMB_RISK", "compression ratio exceeded", {
                context: { path: name, ratio },
              }),
            );
          }
        }
        totalUncompressed += uncompressed;
        if (totalUncompressed > limits.maxUncompressedBytes) {
          throw new EngineException(
            createEngineError("ARCHIVE_BOMB_RISK", "uncompressed size exceeded", {
              context: { totalUncompressed },
            }),
          );
        }
        members.push({
          path: name,
          compressedSize: compressed,
          uncompressedSize: uncompressed,
        });
        return true;
      },
    });
  } catch (err) {
    if (err instanceof EngineException) {
      throw err;
    }
    throw new EngineException(
      createEngineError(
        "MESH_PARSE_FAILED",
        `Not a valid ZIP/3MF container: ${err instanceof Error ? err.message : String(err)}`,
        { retryable: false },
      ),
    );
  }

  const byPath = new Map<string, Uint8Array>();
  for (const [rawPath, data] of Object.entries(files)) {
    byPath.set(rawPath.replace(/\\/g, "/"), data);
  }

  return {
    members: Object.freeze(members) as ZipMember[],
    readMember(memberPath: string): Buffer {
      const normalized = memberPath.replace(/\\/g, "/");
      if (isUnsafeEntryPath(normalized)) {
        throw new EngineException(
          createEngineError(
            "REPO_BOUNDARY_VIOLATION",
            `unsafe member path: ${normalized}`,
          ),
        );
      }
      const data = byPath.get(normalized);
      if (!data) {
        throw new EngineException(
          createEngineError("MESH_PARSE_FAILED", `member not found: ${normalized}`),
        );
      }
      return toBuffer(data);
    },
  };
}
