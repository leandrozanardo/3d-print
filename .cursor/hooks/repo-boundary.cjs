"use strict";
const fs = require("fs");
const path = require("path");
const readline = require("readline");
const REPO_ROOT = path.resolve(__dirname, "..", "..");
function respond(payload) {
  process.stdout.write(JSON.stringify(payload) + "\n");
  process.exit(0);
}
function deny(msg) { respond({ permission: "deny", agentMessage: String(msg) }); }
function stripBom(s) { return s && s.charCodeAt(0) === 0xfeff ? s.slice(1) : s; }
function norm(p) {
  if (!p || typeof p !== "string") return null;
  let s = p.trim();
  if (!s) return null;
  if (s.startsWith("~") || /^\$HOME\b/i.test(s) || /^%USERPROFILE%/i.test(s)) return null;
  s = s.replace(/^file:\/\/\/?/i, "");
  if (process.platform === "win32" && /^\/[A-Za-z]:/.test(s)) s = s.slice(1);
  try { return path.resolve(s); } catch { return null; }
}
function cmp(p) { return process.platform === "win32" ? p.toLowerCase() : p; }
function same(a, b) { return cmp(a) === cmp(b); }
function inside(candidate, root) {
  const r = norm(candidate);
  if (!r) return false;
  const rootCmp = cmp(root);
  const cand = cmp(r);
  if (cand === rootCmp) return true;
  const prefix = rootCmp.endsWith(path.sep) ? rootCmp : rootCmp + path.sep;
  return cand.startsWith(prefix);
}
function real(p) {
  try { return fs.realpathSync(p); } catch {
    try { return path.join(fs.realpathSync(path.dirname(p)), path.basename(p)); }
    catch { return p; }
  }
}
function walk(obj, out) {
  if (!obj || typeof obj !== "object") return out;
  if (Array.isArray(obj)) { for (const x of obj) walk(x, out); return out; }
  for (const [k, v] of Object.entries(obj)) {
    if (typeof v === "string" && /path|file|cwd|directory|uri|target|workingDirectory|working_directory|dir/i.test(k)) out.push({ k, v });
    else if (v && typeof v === "object") walk(v, out);
  }
  return out;
}
async function readInput() {
  if (process.stdin.isTTY) return {};
  const rl = readline.createInterface({ input: process.stdin, crlfDelay: Infinity });
  let raw = "";
  for await (const line of rl) raw += line + "\n";
  raw = stripBom(raw.trim());
  if (!raw) return {};
  try { return JSON.parse(raw); } catch { return { __bad: true }; }
}
function destructiveTargets(cmd) {
  const out = [];
  const re = /(?:\b(?:rm|rmdir|del|Remove-Item|unlink)\b)(?:\s+(?:-[A-Za-z]+\b))*\s+(?:"([^"]+)"|'([^']+)'|([^\s&|;]+))/gi;
  let m; while ((m = re.exec(cmd))) out.push(m[1] || m[2] || m[3]);
  return out.filter(Boolean);
}
(async () => {
  try {
    const input = await readInput();
    if (input.__bad) return deny("REPO_BOUNDARY_VIOLATION: invalid hook stdin JSON");
    if (!input || Object.keys(input).length === 0) return respond({ permission: "allow" });
    const cwd = input.cwd || input.working_directory || input.workingDirectory || null;
    const base = cwd && norm(cwd) ? norm(cwd) : REPO_ROOT;
    if (cwd && !inside(cwd, REPO_ROOT)) return deny("REPO_BOUNDARY_VIOLATION: cwd outside repository root");
    for (const { k, v } of walk(input, [])) {
      if (v.startsWith("~") || /^\$HOME\b/i.test(v) || /^%USERPROFILE%/i.test(v)) return deny("REPO_BOUNDARY_VIOLATION: home-style destination forbidden");
      const abs = path.isAbsolute(v) ? norm(v) : norm(path.resolve(base, v));
      if (!abs) return deny("REPO_BOUNDARY_VIOLATION: ambiguous path");
      const proven = real(abs);
      if (!inside(proven, REPO_ROOT)) return deny("REPO_BOUNDARY_VIOLATION: path outside repository root");
      if (/delete|unlink|remove|rmdir/i.test(k) && same(proven, REPO_ROOT)) return deny("REPO_BOUNDARY_VIOLATION: refusing to delete repository root");
      try { if (fs.lstatSync(abs).isSymbolicLink() && !inside(real(abs), REPO_ROOT)) return deny("REPO_BOUNDARY_VIOLATION: symlink escapes repository"); } catch {}
    }
    const command = typeof input.command === "string" ? input.command : (typeof input.cmd === "string" ? input.cmd : null);
    if (command && /\b(rm|rmdir|del|Remove-Item|unlink)\b/i.test(command)) {
      const targets = destructiveTargets(command);
      if (!targets.length) return deny("REPO_BOUNDARY_VIOLATION: destructive command without determinable target");
      for (const t of targets) {
        if (t === "." || t === "./" || t === ".\\" || t === "*" || t === "**") return deny("REPO_BOUNDARY_VIOLATION: refusing broad destructive target");
        const abs = path.isAbsolute(t) ? norm(t) : norm(path.resolve(base, t));
        if (!abs) return deny("REPO_BOUNDARY_VIOLATION: ambiguous destructive target");
        const proven = real(abs);
        if (same(proven, REPO_ROOT)) return deny("REPO_BOUNDARY_VIOLATION: refusing to delete repository root");
        if (!inside(proven, REPO_ROOT)) return deny("REPO_BOUNDARY_VIOLATION: destructive target outside root");
      }
    }
    respond({ permission: "allow" });
  } catch (e) {
    deny("REPO_BOUNDARY_VIOLATION: hook error: " + (e && e.message ? e.message : String(e)));
  }
})();