import path from "path";
import { fileURLToPath } from "url";
import { defineConfig } from "vite";
import { translationApiPlugin } from "./vite-plugin-translation-api.mjs";

const __dirname = path.dirname(fileURLToPath(import.meta.url));

export default defineConfig({
  root: __dirname,
  server: {
    port: 5190,
    strictPort: true,
    open: true,
    watch: {
      usePolling: false,
    },
    fs: {
      allow: [path.resolve(__dirname, "../..")],
    },
  },
  plugins: [translationApiPlugin()],
});
