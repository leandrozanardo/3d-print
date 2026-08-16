/**
 * Canonical object key shape for Fix My Print storage:
 * userId/projectId/runId/artifactId/name
 */

const SEGMENT = /^[A-Za-z0-9._-]+$/;
const NAME = /^[A-Za-z0-9._-]+$/;

export type ObjectKeyParts = {
  userId: string;
  projectId: string;
  runId: string;
  artifactId: string;
  name: string;
};

export class ObjectKeyError extends Error {
  readonly code = "INVALID_OBJECT_KEY" as const;

  constructor(message = "INVALID_OBJECT_KEY") {
    super(message);
    this.name = "ObjectKeyError";
  }
}

export function parseObjectKey(key: string): ObjectKeyParts {
  if (typeof key !== "string" || key.trim() === "") {
    throw new ObjectKeyError("INVALID_OBJECT_KEY");
  }
  if (key.includes("\\") || key.includes("..") || key.startsWith("/")) {
    throw new ObjectKeyError("INVALID_OBJECT_KEY");
  }

  const parts = key.split("/");
  if (parts.length !== 5) {
    throw new ObjectKeyError("INVALID_OBJECT_KEY");
  }

  const [userId, projectId, runId, artifactId, name] = parts;
  if (!userId || !projectId || !runId || !artifactId || !name) {
    throw new ObjectKeyError("INVALID_OBJECT_KEY");
  }
  if (
    ![userId, projectId, runId, artifactId].every((s) => SEGMENT.test(s)) ||
    !NAME.test(name)
  ) {
    throw new ObjectKeyError("INVALID_OBJECT_KEY");
  }

  return { userId, projectId, runId, artifactId, name };
}

export function formatObjectKey(parts: ObjectKeyParts): string {
  const key = `${parts.userId}/${parts.projectId}/${parts.runId}/${parts.artifactId}/${parts.name}`;
  parseObjectKey(key);
  return key;
}
