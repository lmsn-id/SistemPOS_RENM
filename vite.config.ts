import { defineConfig } from "vite";
import react from "@vitejs/plugin-react-swc";

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
      "@public": "/public",
      "@assets": "/src/assets",
    },
  },
});
