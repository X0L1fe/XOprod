import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import { fileURLToPath } from "node:url";

export default defineConfig(({ command }) => ({
  plugins: [react()],
  base: command === "build" ? "/static/react/" : "/",
  server: {
    proxy: {
      "/api": "http://127.0.0.1:8000",
      "/media": "http://127.0.0.1:8000"
    }
  },
  build: {
    outDir: fileURLToPath(new URL("../static/react", import.meta.url)),
    emptyOutDir: false,
    cssCodeSplit: false,
    rollupOptions: {
      output: {
        entryFileNames: "app.js",
        chunkFileNames: "chunk-[name].js",
        assetFileNames: (assetInfo) => assetInfo.name?.endsWith(".css") ? "app.css" : "asset-[name][extname]"
      }
    }
  }
}));
