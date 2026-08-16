import { flattenThreeMf, parseThreeMf } from "./parse";
import type {
  CanonicalScene,
  ThreeMfDocument,
  ThreeMfParseOptions,
  ThreeMfValidationResult,
  ThreeMfWriteOptions,
} from "./types";
import { validateThreeMf } from "./validate";
import { writeThreeMf } from "./write";

export interface ThreeMfPort {
  parse(bytes: Uint8Array, options: ThreeMfParseOptions): ThreeMfDocument;
  flatten(document: ThreeMfDocument, options?: { fileName?: string }): CanonicalScene;
  write(
    scene: CanonicalScene,
    options?: ThreeMfWriteOptions,
  ): { bytes: Uint8Array; preservation: import("./types").PreservationReport };
  validate(bytes: Uint8Array): ThreeMfValidationResult;
}

/** Default production port (pure TypeScript + fflate). */
export const threeMfPort: ThreeMfPort = {
  parse: parseThreeMf,
  flatten: flattenThreeMf,
  write: writeThreeMf,
  validate: validateThreeMf,
};
