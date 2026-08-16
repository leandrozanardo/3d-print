type Props = {
  label: string;
};

/** Lightweight placeholder — no three.js dependency in this scaffolding phase. */
export function ViewerPlaceholder({ label }: Props) {
  return (
    <section className="panel" aria-labelledby="viewer-title">
      <h2 id="viewer-title">Viewer</h2>
      <div className="viewer" data-testid="viewer-placeholder">
        <canvas width={480} height={280} aria-label="Geometry viewer placeholder" />
        <p>{label}</p>
      </div>
    </section>
  );
}
