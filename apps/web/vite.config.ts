import path from "node:path";
import { fileURLToPath } from "node:url";
import { defineConfig } from "vitest/config";
import react from "@vitejs/plugin-react";

const repoRoot = path.resolve(fileURLToPath(new URL("../..", import.meta.url)));

/** Resolve workspace packages to TS sources so Vite/Rollup get real ESM named exports. */
const workspaceSrc = {
  "@fix-my-print/contracts": path.join(repoRoot, "packages/contracts/src/index.ts"),
  "@fix-my-print/formats": path.join(repoRoot, "packages/formats/src/index.ts"),
  "@fix-my-print/formats-3mf": path.join(
    repoRoot,
    "packages/formats-3mf/src/index.ts",
  ),
  "@fix-my-print/geometry": path.join(repoRoot, "packages/geometry/src/index.ts"),
  "@fix-my-print/engine": path.join(repoRoot, "packages/engine/src/index.ts"),
};

/** COOP/COEP so local preview can prove crossOriginIsolated when needed. */
export default defineConfig({
  plugins: [react()],
  resolve: {
    alias: {
      buffer: "buffer/",
      ...workspaceSrc,
    },
  },
  optimizeDeps: {
    include: ["buffer", "fflate", "fast-xml-parser"],
  },
  worker: {
    format: "es",
  },
  define: {
    global: "globalThis",
  },
  server: {
    headers: {
      "Cross-Origin-Opener-Policy": "same-origin",
      "Cross-Origin-Embedder-Policy": "require-corp",
    },
  },
  preview: {
    headers: {
      "Cross-Origin-Opener-Policy": "same-origin",
      "Cross-Origin-Embedder-Policy": "require-corp",
    },
  },
  test: {
    environment: "jsdom",
    globals: true,
    include: ["src/**/*.test.ts", "src/**/*.test.tsx"],
  },
});
