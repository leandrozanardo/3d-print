type Props = {
  ratio: number;
  message: string;
  busy: boolean;
  onCancel: () => void;
};

export function ProgressCancel({ ratio, message, busy, onCancel }: Props) {
  const pct = Math.round(Math.min(1, Math.max(0, ratio)) * 100);
  return (
    <section className="panel" aria-labelledby="progress-title">
      <h2 id="progress-title">Worker progress</h2>
      <div
        className="progress-track"
        aria-valuemin={0}
        aria-valuemax={100}
        aria-valuenow={pct}
        role="progressbar"
      >
        <div className="progress-fill" style={{ width: `${pct}%` }} />
      </div>
      <p data-testid="progress-message">{message || "Idle"}</p>
      <button type="button" disabled={!busy} onClick={onCancel}>
        Cancel (terminate worker)
      </button>
    </section>
  );
}
