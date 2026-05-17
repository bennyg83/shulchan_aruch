import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";
import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import sirv from "sirv";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const mobilePublic = path.resolve(__dirname, "../oc318-mobile-reader/public");
const corpusRoot = path.join(mobilePublic, "corpus");

/** Dev: serve only /corpus/* from mobile public (avoid indexing 10k+ files as publicDir). */
function serveCorpusMiddleware() {
  const serve = sirv(corpusRoot, { dev: true, etag: true, maxAge: 0 });
  return (req, res, next) => {
    const url = (req.url || "").split("?")[0];
    if (!url.startsWith("/corpus/") && url !== "/corpus") return next();
    const sub = url === "/corpus" ? "/" : url.slice("/corpus".length) || "/";
    const prev = req.url;
    req.url = sub;
    serve(req, res, (err) => {
      req.url = prev;
      if (err) return next(err);
      if (!res.writableEnded) next();
    });
  };
}

function serveCorpusPlugin() {
  return {
    name: "serve-oc-corpus",
    configureServer(server) {
      server.middlewares.use(serveCorpusMiddleware());
    },
  };
}

/** GitHub Pages serves from repo subpath; disable Jekyll so /corpus paths work. */
function ghPagesDistPlugin() {
  return {
    name: "gh-pages-dist",
    closeBundle() {
      fs.writeFileSync(path.join(__dirname, "dist", ".nojekyll"), "\n");
    },
  };
}

/** https://bennyg83.github.io/shulchan_aruch/ (CI sets GITHUB_ACTIONS; override with VITE_BASE) */
const pagesBase =
  process.env.VITE_BASE || (process.env.GITHUB_ACTIONS === "true" ? "/shulchan_aruch/" : "/");

export default defineConfig(({ command }) => ({
  base: pagesBase,
  plugins: [react(), serveCorpusPlugin(), ...(command === "build" ? [ghPagesDistPlugin()] : [])],
  /** Build copies full corpus into dist/; dev serves /corpus via middleware only. */
  publicDir: command === "build" ? mobilePublic : false,
  server: {
    host: true,
    port: 5174,
    strictPort: true,
    fs: {
      allow: [__dirname, path.resolve(__dirname, ".."), mobilePublic],
    },
  },
  preview: {
    host: true,
    port: 4174,
    strictPort: true,
    fs: {
      allow: [__dirname, path.resolve(__dirname, ".."), mobilePublic],
    },
  },
  optimizeDeps: {
    include: ["react", "react-dom"],
  },
}));
