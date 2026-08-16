import * as fs from "node:fs";
import * as os from "node:os";
import * as path from "node:path";

import {
  compileKnowledgePack,
  parseFrontMatterYaml,
  parseMarkdownDocument,
  FrontMatterError,
  validateWiki,
} from "../src/index";

const REPO_ROOT = path.resolve(__dirname, "../../..");
const FIXTURES = path.join(REPO_ROOT, "tests", "fixtures");
const TODAY = new Date(Date.UTC(2026, 7, 16)); // 2026-08-16

describe("front matter safety", () => {
  it("rejects unsafe YAML tags", () => {
    expect(() =>
      parseFrontMatterYaml("id: !!python/object/apply:os.system ['echo pwned']\n"),
    ).toThrow(FrontMatterError);
  });

  it("detects UTF-8 BOM on markdown documents", () => {
    const dir = fs.mkdtempSync(path.join(os.tmpdir(), "kc-bom-"));
    const md = path.join(dir, "a.md");
    const summary = "word ".repeat(20).trimEnd();
    const body =
      "---\n" +
      'id: "x.test"\n' +
      'title: "T"\n' +
      `summary: "${summary}"\n` +
      'doc_type: "concept"\n' +
      "domain: []\n" +
      "technology: []\n" +
      "process: []\n" +
      "applies_to: []\n" +
      "not_for: []\n" +
      'knowledge_status: "draft"\n' +
      'evidence_status: "unknown"\n' +
      'safety_level: "normal"\n' +
      'confidence: "low"\n' +
      'last_reviewed: "2026-08-15"\n' +
      'review_cycle: "12-months"\n' +
      "sources: []\n" +
      "related: []\n" +
      "prerequisites: []\n" +
      "supersedes: []\n" +
      "aliases_pt_br: []\n" +
      "aliases_en: []\n" +
      "tags: []\n" +
      "---\n\n# T\n";
    fs.writeFileSync(md, Buffer.concat([Buffer.from([0xef, 0xbb, 0xbf]), Buffer.from(body, "utf8")]));

    const doc = parseMarkdownDocument(md);
    expect(doc.hasBom).toBe(true);
    expect(doc.frontMatter).not.toBeNull();
    expect(doc.frontMatter?.["id"]).toBe("x.test");

    fs.rmSync(dir, { recursive: true, force: true });
  });
});

describe("validateWiki strict fixtures", () => {
  it("wiki_strict_ok → ok true", () => {
    const result = validateWiki(path.join(FIXTURES, "wiki_strict_ok"), {
      strict: true,
      today: TODAY,
    });
    expect(result.ok).toBe(true);
    expect(result.errors).toEqual([]);
  });

  it("wiki_strict_broken reports duplicate_id", () => {
    const result = validateWiki(path.join(FIXTURES, "wiki_strict_broken"), {
      strict: true,
      today: TODAY,
    });
    expect(result.ok).toBe(false);
    expect(result.errors.some((e) => e.includes("duplicate_id"))).toBe(true);
  });

  it("wiki_strict_broken reports unresolved_id", () => {
    const result = validateWiki(path.join(FIXTURES, "wiki_strict_broken"), {
      strict: true,
      today: TODAY,
    });
    expect(result.errors.some((e) => e.includes("unresolved_id"))).toBe(true);
  });

  it("wiki_strict_broken reports prereq_cycle", () => {
    const result = validateWiki(path.join(FIXTURES, "wiki_strict_broken"), {
      strict: true,
      today: TODAY,
    });
    expect(result.errors.some((e) => e.includes("prereq_cycle"))).toBe(true);
  });

  it("wiki_strict_broken reports missing_front_matter", () => {
    const result = validateWiki(path.join(FIXTURES, "wiki_strict_broken"), {
      strict: true,
      today: TODAY,
    });
    expect(result.errors.some((e) => e.includes("missing_front_matter"))).toBe(true);
  });

  it("wiki_strict_broken reports invalid_promotion", () => {
    const result = validateWiki(path.join(FIXTURES, "wiki_strict_broken"), {
      strict: true,
      today: TODAY,
    });
    expect(result.errors.some((e) => e.includes("invalid_promotion"))).toBe(true);
  });

  it("wiki_strict_broken reports absolute_claim", () => {
    const result = validateWiki(path.join(FIXTURES, "wiki_strict_broken"), {
      strict: true,
      today: TODAY,
    });
    expect(result.errors.some((e) => e.includes("absolute_claim"))).toBe(true);
  });
});

describe("compileKnowledgePack determinism", () => {
  it("double-compile is byte-identical on a tiny fixture", () => {
    const root = path.join(FIXTURES, "wiki_strict_ok");
    const first = compileKnowledgePack(root);
    const second = compileKnowledgePack(root);
    expect(Buffer.compare(first.bytes, second.bytes)).toBe(0);
    expect(first.hash).toBe(second.hash);
    expect(first.hash).toMatch(/^[a-f0-9]{64}$/);
    expect(first.pack.schemaVersion).toBe(1);
  });
});
