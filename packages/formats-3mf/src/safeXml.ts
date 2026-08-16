import { XMLParser } from "fast-xml-parser";
import { createEngineError, EngineException } from "@fix-my-print/contracts";

/** Reject DTD / entity declarations before any XML parse. */
export function assertSafeXmlText(text: string): void {
  if (
    /<!DOCTYPE\b/i.test(text) ||
    /<!ENTITY\b/i.test(text) ||
    /<!\[CDATA\[[\s\S]*?<!(?:DOCTYPE|ENTITY)/i.test(text)
  ) {
    throw new EngineException(
      createEngineError(
        "MESH_PARSE_FAILED",
        "unsafe XML: DTD or ENTITY declarations are not allowed",
        { retryable: false },
      ),
    );
  }
}

/** Approximate element nesting depth from raw XML text. */
export function estimateXmlDepth(text: string): number {
  let depth = 0;
  let max = 0;
  const re = /<\/?([A-Za-z_][\w:.-]*)\b[^>]*\/?>/g;
  let match: RegExpExecArray | null;
  while ((match = re.exec(text)) !== null) {
    const token = match[0]!;
    if (token.startsWith("<?") || token.startsWith("<!")) {
      continue;
    }
    if (token.startsWith("</")) {
      depth = Math.max(0, depth - 1);
      continue;
    }
    if (token.endsWith("/>")) {
      continue;
    }
    depth += 1;
    if (depth > max) {
      max = depth;
    }
  }
  return max;
}

export function parseSafeXml(
  text: string,
  options: { maxDepth: number; maxBytes: number },
): unknown {
  if (new TextEncoder().encode(text).byteLength > options.maxBytes) {
    throw new EngineException(
      createEngineError("INPUT_TOO_LARGE", "XML exceeds maxXmlBytes", {
        context: { maxXmlBytes: options.maxBytes },
      }),
    );
  }
  assertSafeXmlText(text);
  const depth = estimateXmlDepth(text);
  if (depth > options.maxDepth) {
    throw new EngineException(
      createEngineError("MESH_PARSE_FAILED", "XML nesting depth exceeded", {
        retryable: false,
        context: { depth, maxXmlDepth: options.maxDepth },
      }),
    );
  }

  const parser = new XMLParser({
    ignoreAttributes: false,
    attributeNamePrefix: "@_",
    processEntities: false,
    trimValues: true,
    removeNSPrefix: true,
    allowBooleanAttributes: true,
  });
  return parser.parse(text);
}

export function asArray<T>(value: T | T[] | undefined | null): T[] {
  if (value === undefined || value === null) {
    return [];
  }
  return Array.isArray(value) ? value : [value];
}

export function attr(
  node: Record<string, unknown> | undefined,
  name: string,
): string | undefined {
  if (!node) {
    return undefined;
  }
  const key = name.startsWith("@_") ? name : `@_${name}`;
  const value = node[key];
  return typeof value === "string" || typeof value === "number"
    ? String(value)
    : undefined;
}
