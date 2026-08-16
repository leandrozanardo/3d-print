import fs from "node:fs";
import path from "node:path";
import readline from "node:readline";
import { fileURLToPath } from "node:url";
const REPO_ROOT = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "..", "..");
function respond(p) {
  process.stdout.write(JSON.stringify(p) + "\n");
  process.exit(0);
}
function deny(m) {
  respond({ permission: "deny", agentMessage: String(m) });
}
function stripBom(s) {
  return s && s.charCodeAt(0) === 0xfeff ? s.slice(1) : s;
}
function norm(p) {
  if (!p || typeof p !== "string") return null;
  let s = p.trim();
  if (!s) return null;
  if (s.startsWith("~") || /^\$HOME\b/i.test(s) || /^%USERPROFILE%/i.test(s)) return null;
  s = s.replace(/^file:\/\/\/?/i, "");
  if (process.platform === "win32" && /^\/[A-Za-z]:/.test(s)) s = s.slice(1);
  try {
    return path.resolve(s);
  } catch {
    return null;
  }
}
function cmp(p) {
  return process.platform === "win32" ? String(p).toLowerCase() : String(p);
}
function same(a, b) {
  return cmp(a) === cmp(b);
}
function inside(candidate, root) {
  const r = norm(candidate);
  if (!r) return false;
  const rootCmp = cmp(root),
    cand = cmp(r);
  if (cand === rootCmp) return true;
  const prefix = rootCmp.endsWith(path.sep) ? rootCmp : rootCmp + path.sep;
  return cand.startsWith(prefix);
}
function real(p) {
  try {
    return fs.realpathSync(p);
  } catch {
    try {
      return path.join(fs.realpathSync(path.dirname(p)), path.basename(p));
    } catch {
      return p;
    }
  }
}
function pickPrimary(input) {
  const keys = [
    "file_path",
    "filePath",
    "target_directory",
    "targetDirectory",
    "path",
    "uri",
  ];
  for (const k of keys) {
    if (typeof input[k] === "string" && input[k].trim()) return input[k];
    if (
      input.arguments &&
      typeof input.arguments[k] === "string" &&
      input.arguments[k].trim()
    )
      return input.arguments[k];
    if (
      input.tool_input &&
      typeof input.tool_input[k] === "string" &&
      input.tool_input[k].trim()
    )
      return input.tool_input[k];
  }
  return null;
}
function destructiveTargets(cmd) {
  const out = [];
  const re =
    /(?:\b(?:rm|rmdir|del|Remove-Item|unlink)\b)(?:\s+(?:-[A-Za-z]+\b))*\s+(?:"([^"]+)"|'([^']+)'|([^\s&|;]+))/gi;
  let m;
  while ((m = re.exec(cmd))) out.push(m[1] || m[2] || m[3]);
  return out.filter(Boolean);
}
async function readInput() {
  if (process.stdin.isTTY) return {};
  const rl = readline.createInterface({ input: process.stdin, crlfDelay: Infinity });
  let raw = "";
  for await (const line of rl) raw += line + "\n";
  raw = stripBom(raw.trim());
  if (!raw) return {};
  try {
    return JSON.parse(raw);
  } catch {
    return { __bad: true };
  }
}
(async () => {
  try {
    const input = await readInput();
    if (input.__bad) return deny("REPO_BOUNDARY_VIOLATION: invalid hook stdin JSON");
    if (!input || Object.keys(input).length === 0)
      return respond({ permission: "allow" });
    const cwd = input.cwd || input.working_directory || input.workingDirectory || null;
    const base = cwd && norm(cwd) ? norm(cwd) : REPO_ROOT;
    if (cwd && !inside(cwd, REPO_ROOT))
      return deny("REPO_BOUNDARY_VIOLATION: cwd outside repository root");
    const primary = pickPrimary(input);
    if (primary) {
      if (
        primary.startsWith("~") ||
        /^\$HOME\b/i.test(primary) ||
        /^%USERPROFILE%/i.test(primary)
      )
        return deny("REPO_BOUNDARY_VIOLATION: home-style destination forbidden");
      const abs = path.isAbsolute(primary)
        ? norm(primary)
        : norm(path.resolve(base, primary));
      if (!abs) return deny("REPO_BOUNDARY_VIOLATION: ambiguous path");
      const proven = real(abs);
      if (!inside(proven, REPO_ROOT))
        return deny("REPO_BOUNDARY_VIOLATION: path outside repository root");
      try {
        if (fs.lstatSync(abs).isSymbolicLink() && !inside(real(abs), REPO_ROOT))
          return deny("REPO_BOUNDARY_VIOLATION: symlink escapes repository");
      } catch {}
    }
    const command =
      typeof input.command === "string"
        ? input.command
        : typeof input.cmd === "string"
          ? input.cmd
          : (input.arguments && input.arguments.command) || null;
    if (command && /\b(rm|rmdir|del|Remove-Item|unlink)\b/i.test(String(command))) {
      const targets = destructiveTargets(String(command));
      if (!targets.length)
        return deny(
          "REPO_BOUNDARY_VIOLATION: destructive command without determinable target",
        );
      for (const t of targets) {
        if (t === "." || t === "./" || t === ".\\" || t === "*" || t === "**")
          return deny("REPO_BOUNDARY_VIOLATION: refusing broad destructive target");
        const abs = path.isAbsolute(t) ? norm(t) : norm(path.resolve(base, t));
        if (!abs) return deny("REPO_BOUNDARY_VIOLATION: ambiguous destructive target");
        const proven = real(abs);
        if (same(proven, REPO_ROOT))
          return deny("REPO_BOUNDARY_VIOLATION: refusing to delete repository root");
        if (!inside(proven, REPO_ROOT))
          return deny("REPO_BOUNDARY_VIOLATION: destructive target outside root");
      }
    }
    respond({ permission: "allow" });
  } catch (e) {
    deny(
      "REPO_BOUNDARY_VIOLATION: hook error: " + (e && e.message ? e.message : String(e)),
    );
  }
})();
