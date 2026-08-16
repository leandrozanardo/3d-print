import { lstatSync, realpathSync } from "node:fs";
import { basename, dirname, isAbsolute, join, relative, resolve, sep } from "node:path";

/**
 * Thrown when a candidate path escapes the approved repository root.
 */
export class RepoBoundaryError extends Error {
  readonly code = "REPO_BOUNDARY_VIOLATION" as const;

  constructor(message = "REPO_BOUNDARY_VIOLATION") {
    super(message);
    this.name = "RepoBoundaryError";
  }
}

/**
 * Resolve candidate under root and prove it stays strictly inside the repository.
 * Rejects the root itself, absolute escapes, parent traversal, and symlink escapes.
 * Absolute paths that resolve inside the root are accepted; absolute outside are rejected.
 */
export function assertInsideRepository(root: string, candidate: string): string {
  if (candidate.trim() === "" || candidate === ".") {
    throw new RepoBoundaryError("REPO_BOUNDARY_VIOLATION");
  }

  let realRoot: string;
  try {
    realRoot = realpathSync(root);
  } catch {
    throw new RepoBoundaryError("REPO_BOUNDARY_VIOLATION");
  }

  // resolve() keeps absolute candidates as-is; relative ones are rooted under realRoot
  const absoluteCandidate = resolve(realRoot, candidate);

  let realParent: string;
  try {
    realParent = realpathSync(dirname(absoluteCandidate));
  } catch {
    // Missing parent directory — cannot prove containment
    throw new RepoBoundaryError("REPO_BOUNDARY_VIOLATION");
  }

  const normalizedCandidate = join(realParent, basename(absoluteCandidate));

  let provenPath = normalizedCandidate;
  try {
    const st = lstatSync(normalizedCandidate);
    if (st.isSymbolicLink()) {
      try {
        provenPath = realpathSync(normalizedCandidate);
      } catch {
        // Broken symlink — fail closed (unprovable target)
        throw new RepoBoundaryError("REPO_BOUNDARY_VIOLATION");
      }
    } else {
      try {
        provenPath = realpathSync(normalizedCandidate);
      } catch {
        provenPath = normalizedCandidate;
      }
    }
  } catch (e) {
    if (e instanceof RepoBoundaryError) {
      throw e;
    }
    // Path does not exist yet; parent already proven inside the root
    provenPath = normalizedCandidate;
  }

  const relativePath = relative(realRoot, provenPath);
  if (
    relativePath === "" ||
    relativePath === ".." ||
    relativePath.startsWith(`..${sep}`) ||
    isAbsolute(relativePath)
  ) {
    throw new RepoBoundaryError("REPO_BOUNDARY_VIOLATION");
  }

  return provenPath;
}

/**
 * Always validate candidate (absolute or relative) against root — never bypass.
 */
export function resolveInsideRepository(root: string, candidate: string): string {
  return assertInsideRepository(root, candidate);
}
