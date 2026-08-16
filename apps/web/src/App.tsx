import { useCallback, useEffect, useMemo, useRef, useState } from "react";
import { CapabilityDiagnostics } from "./components/CapabilityDiagnostics";
import { FileDropZone } from "./components/FileDropZone";
import { ProgressCancel } from "./components/ProgressCancel";
import { ViewerPlaceholder } from "./components/ViewerPlaceholder";
import { detectCapabilities } from "./capabilities";
import { featureFlags, isAiEnabled } from "./flags";
import type { GeometryWorkerResponse } from "./workers/protocol";
import GeometryWorker from "./workers/geometryWorker?worker";

function newRequestId(): string {
  return `req_${Date.now().toString(36)}_${Math.random().toString(36).slice(2, 8)}`;
}

export default function App() {
  const capabilities = useMemo(() => detectCapabilities(), []);
  const workerRef = useRef<Worker | null>(null);
  const [busy, setBusy] = useState(false);
  const [ratio, setRatio] = useState(0);
  const [message, setMessage] = useState("Idle");
  const [viewerLabel, setViewerLabel] = useState("No model loaded");

  const disposeWorker = useCallback(() => {
    workerRef.current?.terminate();
    workerRef.current = null;
  }, []);

  useEffect(() => () => disposeWorker(), [disposeWorker]);

  const ensureWorker = useCallback(() => {
    if (workerRef.current) {
      return workerRef.current;
    }
    const worker = new GeometryWorker();
    worker.onmessage = (event: MessageEvent<GeometryWorkerResponse>) => {
      const data = event.data;
      if (data.type === "progress") {
        setRatio(data.ratio);
        setMessage(data.message);
        return;
      }
      if (data.type === "inspectResult") {
        setBusy(false);
        setRatio(1);
        setMessage(`Inspected ${data.fileName} (${data.byteLength} bytes)`);
        setViewerLabel(
          `${data.fileName} — stub result (${data.byteLength} bytes). WASM flag=${String(featureFlags.geometry.wasm.enabled)}`,
        );
        return;
      }
      if (data.type === "error") {
        setBusy(false);
        setMessage(`${data.code}: ${data.message}`);
      }
    };
    worker.onerror = () => {
      setBusy(false);
      setMessage("Worker error");
    };
    workerRef.current = worker;
    return worker;
  }, []);

  const onFileLoaded = useCallback(
    (fileName: string, buffer: ArrayBuffer) => {
      const worker = ensureWorker();
      const requestId = newRequestId();
      setBusy(true);
      setRatio(0);
      setMessage("Posting buffer to geometry worker");
      setViewerLabel(`Queued ${fileName}`);
      worker.postMessage(
        {
          type: "inspect",
          requestId,
          fileName,
          bytes: buffer,
        },
        [buffer],
      );
    },
    [ensureWorker],
  );

  const onCancel = useCallback(() => {
    disposeWorker();
    setBusy(false);
    setRatio(0);
    setMessage("Cancelled — worker terminated");
  }, [disposeWorker]);

  return (
    <main className="app">
      <header className="hero">
        <h1>Fix My Print</h1>
        <p>
          Browser shell scaffolding — engine.ts={String(featureFlags.engine.ts.enabled)},
          geometry.wasm={String(featureFlags.geometry.wasm.enabled)}, ai=
          {isAiEnabled() ? "on" : "off"}
        </p>
      </header>
      <CapabilityDiagnostics report={capabilities} />
      <FileDropZone disabled={busy} onFileLoaded={onFileLoaded} />
      <ProgressCancel ratio={ratio} message={message} busy={busy} onCancel={onCancel} />
      <ViewerPlaceholder label={viewerLabel} />
    </main>
  );
}
