import { lazy, Suspense, useCallback, useEffect, useMemo, useReducer, useRef } from "react";
import { CapabilityDiagnostics } from "./components/CapabilityDiagnostics";
import { detectCapabilities } from "./capabilities";
import { featureFlags, isAiEnabled } from "./flags";
import {
  GEOMETRY_WORKER_PROTOCOL_VERSION,
  type WorkerResponse,
} from "./workers/protocol";
import GeometryWorker from "./workers/geometryWorker?worker";

const ModelViewer = lazy(async () => {
  const mod = await import("./components/ModelViewer");
  return { default: mod.ModelViewer };
});

type UiState =
  | "idle"
  | "reading-file"
  | "file-ready"
  | "processing"
  | "success"
  | "failure"
  | "cancelled";

type PrinterPreset = {
  id: string;
  name: string;
  bedWidthMm: number;
  bedDepthMm: number;
  maxHeightMm: number;
};

const PRESETS: PrinterPreset[] = [
  {
    id: "bambu-a1-mini",
    name: "Bambu Lab A1 Mini",
    bedWidthMm: 180,
    bedDepthMm: 180,
    maxHeightMm: 180,
  },
  {
    id: "custom",
    name: "Impressora personalizada",
    bedWidthMm: 220,
    bedDepthMm: 220,
    maxHeightMm: 250,
  },
];

type SuccessPayload = Extract<WorkerResponse, { type: "processSuccess" }>;

type State = {
  ui: UiState;
  jobId: string | null;
  fileName: string | null;
  fileSize: number | null;
  ratio: number;
  stageMessage: string;
  errorTitle: string | null;
  errorMessage: string | null;
  errorCode: string | null;
  success: SuccessPayload | null;
  previewPositions: Float32Array | null;
  previewIndices: Uint32Array | null;
  downloadUrl: string | null;
  presetId: string;
  bedWidthMm: number;
  bedDepthMm: number;
  maxHeightMm: number;
  goal: "balanced" | "minimize-height" | "maximize-bed-contact";
};

type Action =
  | { type: "reading" }
  | { type: "file-ready"; fileName: string; fileSize: number; bytes: ArrayBuffer }
  | { type: "start"; jobId: string }
  | { type: "progress"; ratio: number; message: string }
  | { type: "success"; payload: SuccessPayload; downloadUrl: string }
  | { type: "failure"; code: string; message: string }
  | { type: "cancelled" }
  | { type: "clear-file" }
  | { type: "reset-result" }
  | { type: "set-preset"; presetId: string }
  | { type: "set-bed"; bedWidthMm: number; bedDepthMm: number; maxHeightMm: number }
  | { type: "set-goal"; goal: State["goal"] };

const initialState: State = {
  ui: "idle",
  jobId: null,
  fileName: null,
  fileSize: null,
  ratio: 0,
  stageMessage: "Envie um modelo 3MF ou STL para começar.",
  errorTitle: null,
  errorMessage: null,
  errorCode: null,
  success: null,
  previewPositions: null,
  previewIndices: null,
  downloadUrl: null,
  presetId: "bambu-a1-mini",
  bedWidthMm: 180,
  bedDepthMm: 180,
  maxHeightMm: 180,
  goal: "balanced",
};

// Held outside reducer to avoid cloning large ArrayBuffers in state snapshots.
let pendingBytes: ArrayBuffer | null = null;

function reducer(state: State, action: Action): State {
  switch (action.type) {
    case "reading":
      return {
        ...state,
        ui: "reading-file",
        success: null,
        errorTitle: null,
        errorMessage: null,
        errorCode: null,
        previewPositions: null,
        previewIndices: null,
        ratio: 0,
      };
    case "file-ready":
      pendingBytes = action.bytes;
      return {
        ...state,
        ui: "file-ready",
        fileName: action.fileName,
        fileSize: action.fileSize,
        stageMessage: "Arquivo pronto. Configure a impressora e otimize.",
        success: null,
        downloadUrl: null,
      };
    case "start":
      return {
        ...state,
        ui: "processing",
        jobId: action.jobId,
        ratio: 0,
        stageMessage: "Preparando o motor de geometria…",
        errorTitle: null,
        errorMessage: null,
        errorCode: null,
        success: null,
      };
    case "progress":
      return {
        ...state,
        ratio: action.ratio,
        stageMessage: action.message,
      };
    case "success":
      return {
        ...state,
        ui: "success",
        success: action.payload,
        downloadUrl: action.downloadUrl,
        previewPositions: action.payload.preview.positions,
        previewIndices: action.payload.preview.indices,
        ratio: 1,
        stageMessage: "Seu modelo está pronto.",
      };
    case "failure":
      return {
        ...state,
        ui: "failure",
        errorTitle: "Não foi possível processar o arquivo",
        errorMessage: action.message,
        errorCode: action.code,
        stageMessage: action.message,
      };
    case "cancelled":
      return {
        ...state,
        ui: "cancelled",
        jobId: null,
        ratio: 0,
        stageMessage: "Processamento cancelado.",
      };
    case "clear-file":
      pendingBytes = null;
      return {
        ...state,
        ui: "idle",
        fileName: null,
        fileSize: null,
        success: null,
        downloadUrl: null,
        previewPositions: null,
        previewIndices: null,
        errorTitle: null,
        errorMessage: null,
        errorCode: null,
        stageMessage: "Envie um modelo 3MF ou STL para começar.",
      };
    case "reset-result":
      return {
        ...state,
        ui: state.fileName ? "file-ready" : "idle",
        success: null,
        downloadUrl: null,
        previewPositions: null,
        previewIndices: null,
        stageMessage: state.fileName
          ? "Arquivo pronto. Configure a impressora e otimize."
          : initialState.stageMessage,
      };
    case "set-preset": {
      const preset = PRESETS.find((p) => p.id === action.presetId) ?? PRESETS[0]!;
      return {
        ...state,
        presetId: preset.id,
        bedWidthMm: preset.bedWidthMm,
        bedDepthMm: preset.bedDepthMm,
        maxHeightMm: preset.maxHeightMm,
      };
    }
    case "set-bed":
      return {
        ...state,
        presetId: "custom",
        bedWidthMm: action.bedWidthMm,
        bedDepthMm: action.bedDepthMm,
        maxHeightMm: action.maxHeightMm,
      };
    case "set-goal":
      return { ...state, goal: action.goal };
    default:
      return state;
  }
}

function newJobId(): string {
  return `job_${Date.now().toString(36)}_${Math.random().toString(36).slice(2, 8)}`;
}

function formatBytes(size: number): string {
  if (size < 1024) return `${size} B`;
  if (size < 1024 * 1024) return `${(size / 1024).toFixed(1)} KB`;
  return `${(size / (1024 * 1024)).toFixed(2)} MB`;
}

function userErrorMessage(code: string, technical: string): string {
  if (/EMPTY_FILE/i.test(code + technical)) return "O arquivo está vazio.";
  if (/NO_FILE_BUFFER/i.test(code + technical))
    return "O arquivo não está mais na memória. Envie o arquivo novamente.";
  if (/UNSUPPORTED_FORMAT|FORMAT/i.test(code + technical))
    return "Formato não suportado. Envie um arquivo 3MF ou STL.";
  if (/ZIP|ARCHIVE|BOMB|UNSAFE/i.test(code + technical))
    return "O pacote 3MF é inválido ou inseguro.";
  if (/BUILD_VOLUME|EXCEEDS/i.test(code + technical))
    return "O modelo não cabe no volume da impressora com nenhuma orientação.";
  if (/CANCEL/i.test(code + technical)) return "Processamento cancelado.";
  return "Ocorreu um erro ao processar o modelo. Tente outro arquivo ou ajuste as dimensões.";
}

const MAX_FILE_BYTES = 80 * 1024 * 1024;

export default function App() {
  const [state, dispatch] = useReducer(reducer, initialState);
  const workerRef = useRef<Worker | null>(null);
  const downloadUrlRef = useRef<string | null>(null);
  const jobIdRef = useRef<string | null>(null);
  const debug = useMemo(() => new URLSearchParams(location.search).has("debug"), []);
  const capabilities = useMemo(() => detectCapabilities(), []);

  const revokeDownload = useCallback(() => {
    if (downloadUrlRef.current) {
      URL.revokeObjectURL(downloadUrlRef.current);
      downloadUrlRef.current = null;
    }
  }, []);

  const disposeWorker = useCallback(() => {
    workerRef.current?.terminate();
    workerRef.current = null;
  }, []);

  useEffect(() => () => {
    disposeWorker();
    revokeDownload();
  }, [disposeWorker, revokeDownload]);

  const ensureWorker = useCallback(() => {
    if (workerRef.current) return workerRef.current;
    const worker = new GeometryWorker();
    worker.onmessage = (event: MessageEvent<WorkerResponse>) => {
      const data = event.data;
      if (data.type === "progress") {
        if (jobIdRef.current && data.jobId !== jobIdRef.current) return;
        dispatch({ type: "progress", ratio: data.ratio, message: data.message });
        return;
      }
      if (data.type === "processSuccess") {
        if (jobIdRef.current && data.jobId !== jobIdRef.current) return;
        revokeDownload();
        const blob = new Blob([data.bytes], { type: data.mimeType });
        const url = URL.createObjectURL(blob);
        downloadUrlRef.current = url;
        dispatch({ type: "success", payload: data, downloadUrl: url });
        return;
      }
      if (data.type === "processFailure") {
        if (jobIdRef.current && data.jobId !== jobIdRef.current) return;
        dispatch({
          type: "failure",
          code: data.code,
          message: userErrorMessage(data.code, data.message),
        });
        return;
      }
      if (data.type === "cancelled") {
        if (jobIdRef.current && data.jobId !== jobIdRef.current) return;
        dispatch({ type: "cancelled" });
      }
    };
    worker.onerror = () => {
      dispatch({
        type: "failure",
        code: "WORKER_CRASHED",
        message: "O motor de geometria falhou. Tente novamente.",
      });
    };
    workerRef.current = worker;
    return worker;
  }, [revokeDownload]);

  const onPickFile = useCallback(
    async (file: File | null) => {
      if (!file) return;
      disposeWorker();
      revokeDownload();
      dispatch({ type: "reading" });
      if (file.size === 0) {
        dispatch({
          type: "failure",
          code: "EMPTY_FILE",
          message: userErrorMessage("EMPTY_FILE", ""),
        });
        return;
      }
      if (file.size > MAX_FILE_BYTES) {
        dispatch({
          type: "failure",
          code: "FILE_TOO_LARGE",
          message: `Arquivo acima do limite de ${formatBytes(MAX_FILE_BYTES)}.`,
        });
        return;
      }
      if (!/\.(3mf|stl)$/i.test(file.name)) {
        dispatch({
          type: "failure",
          code: "UNSUPPORTED_FORMAT",
          message: userErrorMessage("UNSUPPORTED_FORMAT", ""),
        });
        return;
      }
      const buffer = await file.arrayBuffer();
      dispatch({
        type: "file-ready",
        fileName: file.name,
        fileSize: file.size,
        bytes: buffer,
      });
    },
    [disposeWorker, revokeDownload],
  );

  const onOptimize = useCallback(() => {
    // Never fail silently — "nothing happens" on click was a user-facing bug.
    if (!pendingBytes || !state.fileName) {
      dispatch({
        type: "failure",
        code: "NO_FILE_BUFFER",
        message:
          "O arquivo não está mais na memória (página recarregou ou o servidor de desenvolvimento reiniciou). Envie o arquivo novamente.",
      });
      return;
    }
    let worker: Worker;
    try {
      worker = ensureWorker();
    } catch {
      dispatch({
        type: "failure",
        code: "WORKER_CRASHED",
        message: "Não foi possível iniciar o motor de geometria. Recarregue a página e tente de novo.",
      });
      return;
    }
    const jobId = newJobId();
    jobIdRef.current = jobId;
    dispatch({ type: "start", jobId });
    const copy = pendingBytes.slice(0);
    worker.postMessage(
      {
        schemaVersion: GEOMETRY_WORKER_PROTOCOL_VERSION,
        type: "process",
        jobId,
        fileName: state.fileName,
        bytes: copy,
        printer: {
          id: state.presetId,
          name: PRESETS.find((p) => p.id === state.presetId)?.name ?? "Custom",
          bedWidthMm: state.bedWidthMm,
          bedDepthMm: state.bedDepthMm,
          maxHeightMm: state.maxHeightMm,
        },
        goal: state.goal,
      },
      [copy],
    );
  }, [ensureWorker, state]);

  const onCancel = useCallback(() => {
    const worker = workerRef.current;
    if (worker && state.jobId) {
      worker.postMessage({
        schemaVersion: GEOMETRY_WORKER_PROTOCOL_VERSION,
        type: "cancel",
        jobId: state.jobId,
      });
    }
    disposeWorker();
    dispatch({ type: "cancelled" });
  }, [disposeWorker, state.jobId]);

  const step =
    state.ui === "success"
      ? 4
      : state.ui === "processing"
        ? 3
        : state.fileName
          ? 2
          : 1;

  const canOptimize =
    state.ui === "file-ready" || state.ui === "cancelled" || state.ui === "failure";

  return (
    <div className="app-shell" data-testid="app-shell">
      <a className="skip-link" href="#conteudo-principal">
        Ir para o conteúdo
      </a>
      <header className="topbar">
        <div className="brand-block">
          <p className="brand">Fix My Print</p>
          <p className="tagline">Prepare seu modelo para imprimir melhor</p>
        </div>
        <div className="topbar-meta">
          <span className="badge" data-testid="local-processing-badge">
            Processamento local
          </span>
          <a className="quiet-link" href="#como-funciona">
            Como funciona
          </a>
        </div>
      </header>

      <main id="conteudo-principal" className="page">
        <section className="hero-compact" aria-labelledby="hero-title">
          <h1 id="hero-title">Otimize a orientação do seu modelo</h1>
          <p>
            Analise a geometria, reduza riscos e receba um arquivo pronto para revisar no seu
            fatiador.
          </p>
        </section>

        <ol className="stepper" data-testid="workflow-stepper" aria-label="Etapas do fluxo">
          <li aria-current={step === 1 ? "step" : undefined} className={step >= 1 ? "active" : ""}>
            1 Arquivo
          </li>
          <li aria-current={step === 2 ? "step" : undefined} className={step >= 2 ? "active" : ""}>
            2 Configuração
          </li>
          <li aria-current={step === 3 ? "step" : undefined} className={step >= 3 ? "active" : ""}>
            3 Otimização
          </li>
          <li aria-current={step === 4 ? "step" : undefined} className={step >= 4 ? "active" : ""}>
            4 Resultado
          </li>
        </ol>

        <div className="layout">
          <section className="primary-column" aria-label="Arquivo e visualização">
            <div
              className={`dropzone ${state.ui === "processing" ? "disabled" : ""}`}
              data-testid="upload-dropzone"
              role="button"
              tabIndex={state.ui === "processing" ? -1 : 0}
              aria-disabled={state.ui === "processing"}
              onKeyDown={(e) => {
                if (e.key === "Enter" || e.key === " ") {
                  e.preventDefault();
                  document.getElementById("file-input")?.click();
                }
              }}
              onDragOver={(e) => {
                e.preventDefault();
                e.currentTarget.classList.add("drag");
              }}
              onDragLeave={(e) => e.currentTarget.classList.remove("drag")}
              onDrop={(e) => {
                e.preventDefault();
                e.currentTarget.classList.remove("drag");
                void onPickFile(e.dataTransfer.files[0] ?? null);
              }}
              onClick={() => document.getElementById("file-input")?.click()}
            >
              <p className="drop-title">Envie seu modelo 3D</p>
              <p>Arraste um arquivo 3MF ou STL aqui ou escolha no computador</p>
              <p className="drop-meta">
                Formatos aceitos: 3MF e STL · Tamanho máximo: {formatBytes(MAX_FILE_BYTES)}
              </p>
              <input
                id="file-input"
                data-testid="file-input"
                type="file"
                accept=".3mf,.stl,model/3mf,model/stl"
                hidden
                disabled={state.ui === "processing"}
                onChange={(e) => void onPickFile(e.target.files?.[0] ?? null)}
              />
            </div>

            {state.fileName ? (
              <div className="file-card" data-testid="selected-file-card">
                <div>
                  <strong>{state.fileName}</strong>
                  <p>{state.fileSize !== null ? formatBytes(state.fileSize) : ""}</p>
                </div>
                <div className="file-actions">
                  <button
                    type="button"
                    data-testid="replace-file-button"
                    onClick={() => document.getElementById("file-input")?.click()}
                    disabled={state.ui === "processing"}
                  >
                    Trocar arquivo
                  </button>
                  <button
                    type="button"
                    data-testid="remove-file-button"
                    onClick={() => {
                      disposeWorker();
                      revokeDownload();
                      dispatch({ type: "clear-file" });
                    }}
                    disabled={state.ui === "processing"}
                  >
                    Remover
                  </button>
                </div>
              </div>
            ) : null}

            <div className="viewer-panel">
              <Suspense
                fallback={
                  <div data-testid="viewer-loading" className="viewer-loading">
                    Preparando o visualizador…
                  </div>
                }
              >
                <ModelViewer
                  positions={state.previewPositions}
                  indices={state.previewIndices}
                  bedWidthMm={state.bedWidthMm}
                  bedDepthMm={state.bedDepthMm}
                  label="Visualização do modelo otimizado"
                />
              </Suspense>
            </div>
          </section>

          <aside className="side-column" aria-label="Configuração">
            <div className="config-card">
              <h2>Configuração</h2>
              <label htmlFor="printer-preset">Impressora</label>
              <select
                id="printer-preset"
                data-testid="printer-preset"
                value={state.presetId}
                disabled={state.ui === "processing"}
                onChange={(e) => dispatch({ type: "set-preset", presetId: e.target.value })}
              >
                {PRESETS.map((p) => (
                  <option key={p.id} value={p.id}>
                    {p.name}
                  </option>
                ))}
              </select>

              <div className="field-grid">
                <label>
                  Largura (mm)
                  <input
                    data-testid="bed-width"
                    type="number"
                    min={1}
                    value={state.bedWidthMm}
                    disabled={state.ui === "processing"}
                    onChange={(e) =>
                      dispatch({
                        type: "set-bed",
                        bedWidthMm: Number(e.target.value),
                        bedDepthMm: state.bedDepthMm,
                        maxHeightMm: state.maxHeightMm,
                      })
                    }
                  />
                </label>
                <label>
                  Profundidade (mm)
                  <input
                    data-testid="bed-depth"
                    type="number"
                    min={1}
                    value={state.bedDepthMm}
                    disabled={state.ui === "processing"}
                    onChange={(e) =>
                      dispatch({
                        type: "set-bed",
                        bedWidthMm: state.bedWidthMm,
                        bedDepthMm: Number(e.target.value),
                        maxHeightMm: state.maxHeightMm,
                      })
                    }
                  />
                </label>
                <label>
                  Altura máxima (mm)
                  <input
                    data-testid="max-height"
                    type="number"
                    min={1}
                    value={state.maxHeightMm}
                    disabled={state.ui === "processing"}
                    onChange={(e) =>
                      dispatch({
                        type: "set-bed",
                        bedWidthMm: state.bedWidthMm,
                        bedDepthMm: state.bedDepthMm,
                        maxHeightMm: Number(e.target.value),
                      })
                    }
                  />
                </label>
              </div>

              <label htmlFor="optimization-goal">
                Objetivo
                <span
                  className="tooltip"
                  title="A estimativa geométrica de suporte não é um fatiamento real."
                >
                  ?
                </span>
              </label>
              <select
                id="optimization-goal"
                data-testid="optimization-goal"
                value={state.goal}
                disabled={state.ui === "processing"}
                onChange={(e) =>
                  dispatch({
                    type: "set-goal",
                    goal: e.target.value as State["goal"],
                  })
                }
              >
                <option value="balanced">Equilíbrio (altura × contato)</option>
                <option value="minimize-height">Minimizar altura</option>
                <option value="maximize-bed-contact">Maximizar contato com a mesa</option>
              </select>

              <button
                type="button"
                className="primary-cta"
                data-testid="optimize-button"
                disabled={!canOptimize || !pendingBytes}
                onClick={onOptimize}
              >
                Otimizar modelo
              </button>
              {!canOptimize && state.ui === "idle" ? (
                <p className="hint">Envie um arquivo para habilitar a otimização.</p>
              ) : null}
            </div>

            {state.ui === "processing" ? (
              <div
                className="processing-panel"
                data-testid="processing-panel"
                role="status"
                aria-live="polite"
              >
                <p data-testid="progress-stage">{state.stageMessage}</p>
                <div
                  className="progress-track"
                  data-testid="progress-bar"
                  role="progressbar"
                  aria-valuemin={0}
                  aria-valuemax={100}
                  aria-valuenow={Math.round(state.ratio * 100)}
                >
                  <div className="progress-fill" style={{ width: `${state.ratio * 100}%` }} />
                </div>
                <button type="button" data-testid="cancel-button" onClick={onCancel}>
                  Cancelar
                </button>
              </div>
            ) : null}

            {state.ui === "failure" ? (
              <div className="error-alert" data-testid="error-alert" role="alert">
                <h2>{state.errorTitle}</h2>
                <p>{state.errorMessage}</p>
                <details data-testid="error-details">
                  <summary>Detalhes técnicos</summary>
                  <p>{state.errorCode}</p>
                </details>
                <button
                  type="button"
                  data-testid="retry-button"
                  onClick={() => dispatch({ type: "reset-result" })}
                >
                  Tentar novamente
                </button>
              </div>
            ) : null}
          </aside>
        </div>

        {state.ui === "success" && state.success ? (
          <section className="result-panel" data-testid="result-panel" aria-live="polite">
            <div className="result-header">
              <h2>Seu modelo está pronto</h2>
              <span className="validation-badge" data-testid="validation-badge">
                Arquivo validado
              </span>
            </div>
            <div className="metrics-grid">
              <div data-testid="before-metrics">
                <h3>Antes</h3>
                <p>
                  {state.success.before.dimensionsMm.map((n) => n.toFixed(1)).join(" × ")} mm
                </p>
                <p>Altura: {state.success.before.dimensionsMm[2].toFixed(1)} mm</p>
                <p>Score: {state.success.optimization.scoreBefore.toFixed(3)}</p>
              </div>
              <div data-testid="after-metrics">
                <h3>Depois</h3>
                <p>
                  {state.success.after.dimensionsMm.map((n) => n.toFixed(1)).join(" × ")} mm
                </p>
                <p>Altura: {state.success.after.dimensionsMm[2].toFixed(1)} mm</p>
                <p>Score: {state.success.optimization.scoreAfter.toFixed(3)}</p>
              </div>
            </div>
            <ul className="result-facts">
              <li>Orientação: {state.success.optimization.orientationId}</li>
              <li>Triângulos: {state.success.after.triangleCount.toLocaleString("pt-BR")}</li>
              <li>
                Estanqueidade:{" "}
                {state.success.after.watertight === "unknown"
                  ? "desconhecida"
                  : state.success.after.watertight
                    ? "sim"
                    : "não"}
              </li>
              <li>Tempo: {(state.success.durationMs / 1000).toFixed(1)} s</li>
              <li>Algoritmo: {state.success.optimization.algorithm}</li>
              <li>
                Formato: {state.success.format.toUpperCase()} ·{" "}
                {formatBytes(state.success.bytes.byteLength)}
              </li>
            </ul>
            {state.success.preservation.notes.length > 0 ? (
              <div className="preservation-warning" data-testid="preservation-warning" role="note">
                <strong>Preservação do 3MF</strong>
                <ul>
                  {state.success.preservation.notes.map((note) => (
                    <li key={note}>{note}</li>
                  ))}
                </ul>
              </div>
            ) : null}
            <div className="result-actions">
              <a
                className="primary-cta"
                data-testid="download-button"
                href={state.downloadUrl ?? undefined}
                download={state.success.outputFileName}
              >
                Baixar arquivo otimizado
              </a>
              <button
                type="button"
                data-testid="optimize-another-button"
                onClick={() => {
                  disposeWorker();
                  revokeDownload();
                  const input = document.getElementById("file-input") as HTMLInputElement | null;
                  if (input) input.value = "";
                  dispatch({ type: "clear-file" });
                }}
              >
                Otimizar outro arquivo
              </button>
            </div>
            <details>
              <summary>Detalhes técnicos</summary>
              <p>SHA-256: {state.success.sha256}</p>
            </details>
          </section>
        ) : null}

        <section id="como-funciona" className="how-section">
          <h2>Como funciona</h2>
          <p>
            O processamento ocorre no seu navegador. Comparamos 24 orientações ortogonais com
            estimativa geométrica de suporte (não é fatiamento) e geramos um novo 3MF Core válido.
          </p>
        </section>

        {debug ? (
          <div data-testid="debug-panel" className="debug-panel">
            <CapabilityDiagnostics report={capabilities} />
            <p>
              engine.ts={String(featureFlags.engine.ts.enabled)} geometry.wasm=
              {String(featureFlags.geometry.wasm.enabled)} ai={isAiEnabled() ? "on" : "off"}
            </p>
          </div>
        ) : null}
      </main>
    </div>
  );
}
