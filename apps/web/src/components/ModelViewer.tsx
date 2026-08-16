import { useEffect, useRef, useState } from "react";

export type ModelViewerProps = {
  positions: Float32Array | null;
  indices: Uint32Array | null;
  bedWidthMm: number;
  bedDepthMm: number;
  label: string;
};

/**
 * Lazy Three.js mesh viewer. Loads three only when mounted with geometry.
 */
export function ModelViewer({
  positions,
  indices,
  bedWidthMm,
  bedDepthMm,
  label,
}: ModelViewerProps) {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (!positions || !indices || !canvasRef.current) {
      return;
    }
    let disposed = false;
    let cleanup: (() => void) | undefined;
    setLoading(true);
    setError(null);

    void (async () => {
      try {
        const THREE = await import("three");
        const { OrbitControls } = await import("three/examples/jsm/controls/OrbitControls.js");
        if (disposed || !canvasRef.current) return;

        const canvas = canvasRef.current;
        const renderer = new THREE.WebGLRenderer({ canvas, antialias: true, alpha: true });
        renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
        const scene = new THREE.Scene();
        scene.background = new THREE.Color(0xf4f6fa);

        const camera = new THREE.PerspectiveCamera(45, 1, 0.1, 5000);
        const controls = new OrbitControls(camera, canvas);
        controls.enableDamping = true;
        controls.dampingFactor = 0.08;

        const ambient = new THREE.AmbientLight(0xffffff, 0.65);
        const key = new THREE.DirectionalLight(0xffffff, 0.85);
        key.position.set(2, 3, 4);
        scene.add(ambient, key);

        const geometry = new THREE.BufferGeometry();
        geometry.setAttribute("position", new THREE.BufferAttribute(positions, 3));
        geometry.setIndex(new THREE.BufferAttribute(indices, 1));
        geometry.computeVertexNormals();
        geometry.computeBoundingBox();

        const material = new THREE.MeshStandardMaterial({
          color: 0x6b7cff,
          metalness: 0.05,
          roughness: 0.55,
          side: THREE.DoubleSide,
        });
        const mesh = new THREE.Mesh(geometry, material);
        scene.add(mesh);

        const box = geometry.boundingBox ?? new THREE.Box3();
        const size = new THREE.Vector3();
        box.getSize(size);
        const center = new THREE.Vector3();
        box.getCenter(center);
        mesh.position.sub(center);

        const grid = new THREE.GridHelper(
          Math.max(bedWidthMm, bedDepthMm),
          18,
          0xb0b8c8,
          0xdfe4ec,
        );
        grid.position.y = -size.z / 2;
        scene.add(grid);

        const axes = new THREE.AxesHelper(Math.max(size.length() * 0.15, 10));
        axes.position.y = -size.z / 2;
        scene.add(axes);

        const fit = Math.max(size.x, size.y, size.z, 1);
        camera.position.set(fit * 1.4, fit * 1.1, fit * 1.4);
        controls.target.set(0, 0, 0);
        controls.update();

        const resize = () => {
          const parent = canvas.parentElement;
          if (!parent) return;
          const w = parent.clientWidth || 640;
          const h = parent.clientHeight || 420;
          renderer.setSize(w, h, false);
          camera.aspect = w / h;
          camera.updateProjectionMatrix();
        };
        resize();
        const observer = new ResizeObserver(resize);
        if (canvas.parentElement) observer.observe(canvas.parentElement);

        let frame = 0;
        const tick = () => {
          frame = requestAnimationFrame(tick);
          controls.update();
          renderer.render(scene, camera);
        };
        tick();
        setLoading(false);

        cleanup = () => {
          cancelAnimationFrame(frame);
          observer.disconnect();
          controls.dispose();
          geometry.dispose();
          material.dispose();
          renderer.dispose();
        };
      } catch (err) {
        if (!disposed) {
          setLoading(false);
          setError(
            err instanceof Error ? err.message : "WEBGL_UNAVAILABLE",
          );
        }
      }
    })();

    return () => {
      disposed = true;
      cleanup?.();
    };
  }, [positions, indices, bedWidthMm, bedDepthMm]);

  if (error) {
    return (
      <div className="viewer-fallback" data-testid="viewer-fallback" role="img" aria-label={label}>
        Não foi possível iniciar o visualizador 3D. {error}
      </div>
    );
  }

  return (
    <div className="viewer-shell" data-testid="model-viewer">
      {loading ? (
        <div className="viewer-loading" data-testid="viewer-loading">
          Carregando visualização…
        </div>
      ) : null}
      <canvas ref={canvasRef} aria-label={label} role="img" />
    </div>
  );
}
