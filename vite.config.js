import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import { fileURLToPath } from "node:url";

export default defineConfig({
  plugins: [react()],
  resolve: {
    alias: [
      // kuromoji (used by kuroshiro) calls path.join in the browser -> shim it.
      { find: /^path$/, replacement: "path-browserify" },
      // see src/lib/gunzip-shim.js
      { find: /^zlibjs\/bin\/gunzip\.min\.js$/, replacement: fileURLToPath(new URL("./src/lib/gunzip-shim.js", import.meta.url)) },
    ],
  },
});
