#!/usr/bin/env node
/**
 * Cursor pre-tool / before-* hook: keep agent IO inside the Git repository root.
 * Always emits valid JSON on stdout and exits 0 so failClosed never locks agents
 * due to empty output or uncaught crashes.
 */
import { execFileSync } from "node:child_process";
import { existsSync, readFileSync, realpathSync } from "node:fs";
import path from "node:path";
import process from "node:process";
import { fileURLToPath } from "node:url";

const DENY_SHELL_PATTERNS = [
  /\brm\s+(-[a-zA-Z]*r[a-zA-Z]*f|-rf|-fr)\b/i,
  /\brm\s+-r\b/i,
  /\bgit\s+clean\b/i,
  /\bgit\s+reset\s+--hard\b/i,
  /\bgit\s+checkout\s+--\s+\./i,
  /\bgit\s+restore\s+\./i,
  /\bfind\b[\s\S]*\s-delete\b/i,
  /\bxargs\s+rm\b/i,
];

const PROTECTED_ORIGINAL = `${path.sep}3ds${path.sep}original${path.sep}`;

function writeDecision(decision) {
  // Flush a single JSON line; required when failClosed is true.
  process.stdout.write(`${JSON.stringify(decision)}\n`);
}

function allow(extra = {}) {
  writeDecision({ permission: "allow", ...extra });
  process.exit(0);
}

function deny(message) {
  writeDecision({
    permission: "deny",
    user_message: message,
    agent_message: message,
  });
  process.exit(0);
}

function readStdinSync() {
  try {
    return readFileSync(0, "utf8");
  } catch {
    return "";
  }
}

// Prefer sync stdin so the process never exits before writing a decision.
function loadPayload() {
  const raw = readStdinSync().trim();
  if (!raw) return {};
  return JSON.parse(raw);
}

function normalizePath(p) {
  if (typeof p !== "string" || p.trim() === "") return null;
  return path.resolve(p);
}

function tryRealpath(p) {
  try {
    return realpathSync(p);
  } catch {
    return p;
  }
}

function pathsEqual(a, b) {
  const left = tryRealpath(a);
  const right = tryRealpath(b);
  if (process.platform === "win32") {
    return left.toLowerCase() === right.toLowerCase();
  }
  return left === right;
}

/** True when candidate is the root or a path strictly under root. */
function isInsideOrEqualRoot(root, candidate) {
  if (!root || !candidate) return false;
  const realRoot = tryRealpath(normalizePath(root));
  const realCandidate = tryRealpath(normalizePath(candidate));
  if (pathsEqual(realRoot, realCandidate)) return true;
  const rel = path.relative(realRoot, realCandidate);
  if (!rel || rel === "..") return false;
  if (rel.startsWith(`..${path.sep}`)) return false;
  if (path.isAbsolute(rel)) return false;
  return true;
}

function resolveGitRoot(cwd, workspaceRoots = []) {
  const searchFrom = normalizePath(cwd) || process.cwd();
  try {
    const out = execFileSync("git", ["-C", searchFrom, "rev-parse", "--show-toplevel"], {
      encoding: "utf8",
      timeout: 5000,
      windowsHide: true,
      stdio: ["ignore", "pipe", "pipe"],
    });
    const root = out.trim();
    if (root) return tryRealpath(root);
  } catch {
    // Fall through to workspace_roots / script location.
  }

  for (const wr of workspaceRoots) {
    const normalized = normalizePath(wr);
    if (normalized && existsSync(path.join(normalized, ".git"))) {
      return tryRealpath(normalized);
    }
  }

  // Hook lives at <root>/.cursor/hooks/repo-boundary.mjs
  const here = path.dirname(fileURLToPath(import.meta.url));
  return tryRealpath(path.resolve(here, "..", ".."));
}

function extractShellCommand(payload) {
  if (typeof payload.command === "string") return payload.command;
  const input = payload.tool_input;
  if (input && typeof input.command === "string") return input.command;
  return "";
}

function extractCwd(payload) {
  const input = payload.tool_input;
  if (input && typeof input.working_directory === "string" && input.working_directory.trim()) {
    return input.working_directory;
  }
  if (typeof payload.cwd === "string" && payload.cwd.trim()) return payload.cwd;
  return process.cwd();
}

function extractFilePaths(payload) {
  const paths = [];
  if (typeof payload.file_path === "string") paths.push(payload.file_path);

  const input = payload.tool_input;
  if (input && typeof input === "object") {
    for (const key of ["path", "file_path", "target_directory", "working_directory"]) {
      if (typeof input[key] === "string" && input[key].trim()) paths.push(input[key]);
    }
    if (Array.isArray(input.paths)) {
      for (const p of input.paths) {
        if (typeof p === "string" && p.trim()) paths.push(p);
      }
    }
  }

  if (Array.isArray(payload.attachments)) {
    for (const a of payload.attachments) {
      if (a && typeof a.file_path === "string") paths.push(a.file_path);
    }
  }

  return paths;
}

function isDangerousShell(command) {
  if (!command) return false;
  return DENY_SHELL_PATTERNS.some((re) => re.test(command));
}

function touchesProtectedOriginal(targetPath) {
  const normalized = `${tryRealpath(normalizePath(targetPath))}${path.sep}`.replace(
    /\//g,
    path.sep,
  );
  const marker = PROTECTED_ORIGINAL.replace(/\//g, path.sep);
  if (process.platform === "win32") {
    return normalized.toLowerCase().includes(marker.toLowerCase());
  }
  return normalized.includes(marker);
}

function decide(payload) {
  const event = payload.hook_event_name || "";
  const toolName = payload.tool_name || "";
  const workspaceRoots = Array.isArray(payload.workspace_roots) ? payload.workspace_roots : [];
  const cwd = extractCwd(payload);
  const root = resolveGitRoot(cwd, workspaceRoots);

  if (!isInsideOrEqualRoot(root, cwd)) {
    return deny(
      `REPO_BOUNDARY_VIOLATION: cwd must stay inside the repository (${root}). Got: ${cwd}`,
    );
  }

  const command = extractShellCommand(payload);
  const isShell =
    event === "beforeShellExecution" ||
    toolName === "Shell" ||
    (event === "preToolUse" && toolName === "Shell");

  if (isShell && isDangerousShell(command)) {
    return deny(
      "REPO_BOUNDARY_VIOLATION: destructive recursive delete / hard reset commands are blocked.",
    );
  }

  const filePaths = extractFilePaths(payload);
  for (const filePath of filePaths) {
    if (!isInsideOrEqualRoot(root, filePath)) {
      return deny(
        `REPO_BOUNDARY_VIOLATION: path escapes repository root (${root}): ${filePath}`,
      );
    }
    const writing =
      toolName === "Write" ||
      toolName === "Delete" ||
      toolName === "StrReplace" ||
      event === "afterFileEdit";
    if (writing && touchesProtectedOriginal(filePath)) {
      return deny("REPO_BOUNDARY_VIOLATION: mutation of 3ds/original/** is forbidden.");
    }
  }

  return allow();
}

function main() {
  try {
    const payload = loadPayload();
    decide(payload);
  } catch (error) {
    // Never exit without JSON: failClosed would otherwise block every tool.
    const message =
      error instanceof Error ? error.message : "unknown repo-boundary hook failure";
    writeDecision({
      permission: "allow",
      agent_message: `repo-boundary hook recovered from error and allowed the action: ${message}`,
    });
    process.exit(0);
  }
}

main();
