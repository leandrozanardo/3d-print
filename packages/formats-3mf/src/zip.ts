import AdmZip from "adm-zip";
import { createEngineError, EngineException } from "@fix-my-print/contracts";

export interface ZipOpenLimits {
  maxEntries: number;
  maxUncompressedBytes: number;
  maxCompressionRatio: number;
}

export const DEFAULT_ZIP_LIMITS: ZipOpenLimits = {
  maxEntries: 256,
  maxUncompressedBytes: 64 * 1024 * 1024,
  maxCompressionRatio: 100,
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

/**
 * Open a ZIP/3MF buffer read-only: list members after policy checks.
 * Does not extract to disk.
 */
export function openZipReadOnly(
  buffer: Buffer | Uint8Array,
  limits: ZipOpenLimits = DEFAULT_ZIP_LIMITS,
): { members: ZipMember[]; readMember(path: string): Buffer } {
  const zip = new AdmZip(Buffer.from(buffer));
  const entries = zip.getEntries();

  if (entries.length > limits.maxEntries) {
    throw new EngineException(
      createEngineError("ARCHIVE_BOMB_RISK", "too many zip entries", {
        context: { count: entries.length, maxEntries: limits.maxEntries },
      }),
    );
  }

  let totalUncompressed = 0;
  const members: ZipMember[] = [];

  for (const entry of entries) {
    if (entry.isDirectory) {
      continue;
    }
    const entryPath = entry.entryName;
    if (isUnsafeEntryPath(entryPath)) {
      throw new EngineException(
        createEngineError(
          "REPO_BOUNDARY_VIOLATION",
          `unsafe zip entry path: ${entryPath}`,
          { retryable: false },
        ),
      );
    }
    const compressed = entry.header.compressedSize;
    const uncompressed = entry.header.size;
    if (uncompressed > 0 && compressed > 0) {
      const ratio = uncompressed / compressed;
      if (ratio > limits.maxCompressionRatio) {
        throw new EngineException(
          createEngineError("ARCHIVE_BOMB_RISK", "compression ratio exceeded", {
            context: { path: entryPath, ratio },
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
      path: entryPath.replace(/\\/g, "/"),
      compressedSize: compressed,
      uncompressedSize: uncompressed,
    });
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
      const entry = zip.getEntry(normalized);
      if (!entry || entry.isDirectory) {
        throw new EngineException(
          createEngineError("MESH_PARSE_FAILED", `member not found: ${normalized}`),
        );
      }
      return entry.getData();
    },
  };
}
