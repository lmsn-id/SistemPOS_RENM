import { defineConfig } from "vite";
import react from "@vitejs/plugin-react-swc";
import path from "path";

export default defineConfig({
  plugins: [react()],
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
      "@app": path.resolve(__dirname, "./src/app/"),
    },
  },
});
