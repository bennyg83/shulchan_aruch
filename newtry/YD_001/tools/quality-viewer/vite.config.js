import path from "path";
import { fileURLToPath } from "url";
import { defineConfig } from "vite";
import { qualityApiPlugin } from "./vite-plugin-quality-api.mjs";

const __dirname = path.dirname(fileURLToPath(import.meta.url));

export default defineConfig({
  root: __dirname,
  server: {
    port: 5188,
    strictPort: true,
    open: true,
    watch: {
      ignored: ["**/output/**", "!**/output/siman_*/mechaber/**"],
    },
    fs: {
      allow: [path.resolve(__dirname, "../..")],
    },
  },
  plugins: [qualityApiPlugin()],
});
