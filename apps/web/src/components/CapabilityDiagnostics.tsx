import type { CapabilityReport } from "../capabilities";

type Props = {
  report: CapabilityReport;
};

export function CapabilityDiagnostics({ report }: Props) {
  return (
    <section className="panel" aria-labelledby="capabilities-title">
      <h2 id="capabilities-title">Capability diagnostics</h2>
      <ul className="diag-list">
        <li>
          <span>crossOriginIsolated</span>
          <strong data-testid="cap-coi">{String(report.crossOriginIsolated)}</strong>
        </li>
        <li>
          <span>Worker support</span>
          <strong data-testid="cap-worker">{String(report.workerSupport)}</strong>
        </li>
        <li>
          <span>WASM support</span>
          <strong data-testid="cap-wasm">{String(report.wasmSupport)}</strong>
        </li>
      </ul>
      <p className="note" data-testid="cap-single-thread">
        {report.singleThreadNote}
      </p>
    </section>
  );
}
