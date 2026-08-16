type Props = {
  fileName: string | null;
  format: string | null;
  vertexCount: number | null;
  faceCount: number | null;
  watertight: boolean | null;
  issues: string[];
  limitations: string[];
};

/** Explicit inspect summary so success is visible without a 3D renderer. */
export function InspectSummary({
  fileName,
  format,
  vertexCount,
  faceCount,
  watertight,
  issues,
  limitations,
}: Props) {
  if (!fileName || !format) {
    return (
      <section className="panel" aria-labelledby="inspect-title">
        <h2 id="inspect-title">Inspect result</h2>
        <p className="note">Load a model to see inspect facts here.</p>
      </section>
    );
  }

  return (
    <section className="panel" aria-labelledby="inspect-title">
      <h2 id="inspect-title">Inspect result</h2>
      <ul className="diag-list">
        <li>
          <span>File</span>
          <strong>{fileName}</strong>
        </li>
        <li>
          <span>Format</span>
          <strong>{format}</strong>
        </li>
        <li>
          <span>Vertices</span>
          <strong>{vertexCount ?? "—"}</strong>
        </li>
        <li>
          <span>Faces / tris</span>
          <strong>{faceCount ?? "—"}</strong>
        </li>
        <li>
          <span>Watertight</span>
          <strong>{watertight === null ? "n/a" : watertight ? "yes" : "no"}</strong>
        </li>
      </ul>
      {issues.length > 0 ? (
        <p className="note">Issues: {issues.join("; ")}</p>
      ) : (
        <p className="note">No issues reported.</p>
      )}
      {limitations.length > 0 ? (
        <p className="note">Limitations: {limitations.join("; ")}</p>
      ) : null}
    </section>
  );
}
