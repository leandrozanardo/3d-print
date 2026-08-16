import { useCallback, useRef, useState, type DragEvent } from "react";

type Props = {
  disabled?: boolean;
  onFileLoaded: (fileName: string, buffer: ArrayBuffer) => void;
};

export function FileDropZone({ disabled = false, onFileLoaded }: Props) {
  const inputRef = useRef<HTMLInputElement>(null);
  const [hint, setHint] = useState("Drop an STL/3MF file, or click to browse");

  const readFile = useCallback(
    async (file: File) => {
      const buffer = await file.arrayBuffer();
      setHint(`${file.name} (${buffer.byteLength} bytes)`);
      onFileLoaded(file.name, buffer);
    },
    [onFileLoaded],
  );

  const onDrop = useCallback(
    (event: DragEvent<HTMLDivElement>) => {
      event.preventDefault();
      if (disabled) {
        return;
      }
      const file = event.dataTransfer.files.item(0);
      if (file) {
        void readFile(file);
      }
    },
    [disabled, readFile],
  );

  return (
    <section className="panel" aria-labelledby="drop-title">
      <h2 id="drop-title">Model intake</h2>
      <div
        className={`dropzone${disabled ? " dropzone-disabled" : ""}`}
        onDragOver={(e) => e.preventDefault()}
        onDrop={onDrop}
        onClick={() => !disabled && inputRef.current?.click()}
        role="button"
        tabIndex={0}
        onKeyDown={(e) => {
          if (!disabled && (e.key === "Enter" || e.key === " ")) {
            inputRef.current?.click();
          }
        }}
      >
        <p>{hint}</p>
        <input
          ref={inputRef}
          type="file"
          accept=".stl,.3mf,model/stl,model/3mf"
          hidden
          disabled={disabled}
          onChange={(e) => {
            const file = e.target.files?.item(0);
            if (file) {
              void readFile(file);
            }
          }}
        />
      </div>
    </section>
  );
}
