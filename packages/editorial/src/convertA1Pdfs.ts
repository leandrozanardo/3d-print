/**
 * A1 Mini PDF → Markdown helper (disabled).
 * OCR corpus already lives under docs/printers/A1mini/.
 */
export function convertA1Pdfs(): {
  ok: false;
  exitCode: 2;
  message: string;
} {
  return {
    ok: false,
    exitCode: 2,
    message:
      "convertA1Pdfs is disabled: A1 Mini Quick Start PDFs need OCR, " +
      "not pypdf. Active Markdown is already in docs/printers/A1mini/.",
  };
}
