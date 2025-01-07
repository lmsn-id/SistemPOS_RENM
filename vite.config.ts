import { defineConfig } from "vite";
import react from "@vitejs/plugin-react-swc";
import path from "path";
import envCompatible from "vite-plugin-env-compatible";

export default defineConfig({
  plugins: [react(), envCompatible()],
  root: "./src/app",
  server: {
    port: 3000,
  },
  build: {
    outDir: "../dist",
  },
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "./src/"),
    },
  },
});
