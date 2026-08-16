import { useCallback, useEffect, useMemo, useRef, useState } from "react";
import { CapabilityDiagnostics } from "./components/CapabilityDiagnostics";
import { FileDropZone } from "./components/FileDropZone";
import { ProgressCancel } from "./components/ProgressCancel";
import { ViewerPlaceholder } from "./components/ViewerPlaceholder";
import { detectCapabilities } from "./capabilities";
import { featureFlags, isAiEnabled } from "./flags";
import {
  GEOMETRY_WORKER_PROTOCOL_VERSION,
  type GeometryWorkerResponse,
} from "./workers/protocol";
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
        setMessage(`${data.stage}: ${data.message}`);
        return;
      }
      if (data.type === "inspectResult") {
        setBusy(false);
        setRatio(1);
        setMessage(`Inspected ${data.fileName} (${data.format})`);
        setViewerLabel(
          data.format === "3mf"
            ? `${data.fileName} — 3MF container, ${data.vertexCount} verts / ${data.faceCount} tris (mesh AABB not computed yet)`
            : `${data.fileName} — ${data.format}, ${data.vertexCount} verts / ${data.faceCount} faces, bounds min=${data.bounds.min.join(",")} max=${data.bounds.max.join(",")}`,
        );
        return;
      }
      if (data.type === "error") {
        setBusy(false);
        setMessage(`${data.code}: ${data.message}`);
        setViewerLabel(`Error: ${data.code} — ${data.message}`);
      }
    };
    worker.onerror = () => {
      setBusy(false);
      setMessage("Worker error");
      setViewerLabel("Error: worker crashed (see browser console)");
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
          schemaVersion: GEOMETRY_WORKER_PROTOCOL_VERSION,
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
    const worker = workerRef.current;
    if (worker) {
      worker.postMessage({
        schemaVersion: GEOMETRY_WORKER_PROTOCOL_VERSION,
        type: "cancel",
        requestId: "ui-cancel",
      });
    }
    disposeWorker();
    setBusy(false);
    setRatio(0);
    setMessage("Cancelled — worker terminated");
    setViewerLabel("Cancelled");
  }, [disposeWorker]);

  return (
    <main className="app">
      <header className="hero">
        <h1>Fix My Print</h1>
        <p>
          Browser shell — drop STL/OBJ/PLY/3MF. engine.ts=
          {String(featureFlags.engine.ts.enabled)}, geometry.wasm=
          {String(featureFlags.geometry.wasm.enabled)}, ai=
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
