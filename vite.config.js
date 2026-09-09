import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

export default defineConfig({
  plugins: [react()],
  // kuromoji (used by kuroshiro) calls path.join in the browser -> shim it.
  resolve: { alias: { path: "path-browserify" } },
});
