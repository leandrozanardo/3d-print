import path from "node:path";
import { fileURLToPath } from "node:url";
import { defineConfig } from "vitest/config";
import react from "@vitejs/plugin-react";

const repoRoot = path.resolve(fileURLToPath(new URL("../..", import.meta.url)));

/** Resolve workspace packages to TS sources so Vite/Rollup get real ESM named exports. */
const workspaceSrc = {
  "@fix-my-print/contracts": path.join(repoRoot, "packages/contracts/src/index.ts"),
  "@fix-my-print/domain": path.join(repoRoot, "packages/domain/src/index.ts"),
  "@fix-my-print/formats": path.join(repoRoot, "packages/formats/src/index.ts"),
  "@fix-my-print/formats-3mf": path.join(repoRoot, "packages/formats-3mf/src/index.ts"),
  "@fix-my-print/geometry": path.join(repoRoot, "packages/geometry/src/index.ts"),
  "@fix-my-print/optimizer": path.join(repoRoot, "packages/optimizer/src/index.ts"),
  "@fix-my-print/engine": path.join(repoRoot, "packages/engine/src/index.ts"),
};

/**
 * Default hosting target is crossOriginIsolated=false (Lovable/static hosts).
 * Do not set COOP/COEP here — product must work without SharedArrayBuffer.
 */
export default defineConfig({
  plugins: [react()],
  // Bind IPv4 explicitly — bare "localhost" is [::1]-only on some Windows setups,
  // and pnpm's extra "--" was previously stripping CLI --host/--port.
  server: {
    host: "127.0.0.1",
    port: 5173,
    strictPort: true,
  },
  preview: {
    host: "127.0.0.1",
    port: 4173,
    strictPort: true,
  },
  resolve: {
    alias: {
      buffer: "buffer/",
      ...workspaceSrc,
    },
  },
  optimizeDeps: {
    include: ["buffer", "fflate", "three"],
  },
  worker: {
    format: "es",
  },
  define: {
    global: "globalThis",
  },
  build: {
    rollupOptions: {
      output: {
        manualChunks(id) {
          if (id.includes("node_modules/three")) {
            return "three";
          }
          if (id.includes("ModelViewer")) {
            return "viewer";
          }
        },
      },
    },
  },
  test: {
    environment: "jsdom",
    globals: true,
    include: ["src/**/*.test.ts", "src/**/*.test.tsx"],
  },
});
