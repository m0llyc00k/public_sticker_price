import { defineConfig } from "vite";
import { svelte } from "@sveltejs/vite-plugin-svelte";
import cssInjectedByJsPlugin from "vite-plugin-css-injected-by-js";

// `npm run dev`   -> local dev server (uses index.html)
// `npm run build` -> single self-contained embed/public-cost.js (CSS baked in)
export default defineConfig({
  plugins: [svelte(), cssInjectedByJsPlugin()],
  build: {
    outDir: "embed",
    emptyOutDir: true,
    lib: {
      entry: "src/embed.js",
      name: "PublicCost",
      formats: ["iife"],
      fileName: () => "public-cost.js"
    }
  }
});
