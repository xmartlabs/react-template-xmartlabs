/// <reference types="vite/client" />

import react from "@vitejs/plugin-react";
import tsconfigPaths from "vite-tsconfig-paths";
import svgrPlugin from "vite-plugin-svgr";
import { resolve } from "path";
import { defineConfig } from "vite";

// https://vitejs.dev/config/
export default defineConfig({
  build: {
    outDir: "build",
    sourcemap: true,
  },
  resolve: {
    alias: {
      $fonts: resolve("./src/assets/fonts"),
    },
  },
  plugins: [
    react(),
    tsconfigPaths(),
    svgrPlugin({
      svgrOptions: {
        icon: true,
      },
      include: "**/*.svg",
    }),
  ],
  server: {
    proxy: {
      [process.env.VITE_API_BASE_PATH || "/api"]: {
        target: "http://localhost:3000",
        changeOrigin: true,
      },
    },
  },
});
