import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";
import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import sirv from "sirv";
import { VitePWA } from "vite-plugin-pwa";

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

/**
 * Precache entries for Workbox: the 697 siman bundles + catalog.
 * We register these explicitly rather than via globPattern to avoid
 * enumerating the 200 K+ individual he/en HTML files in dist/.
 */
function buildBundleManifestEntries(base) {
  const bundlesDir = path.join(mobilePublic, "corpus", "oc1", "bundles");
  try {
    const files = fs.readdirSync(bundlesDir).filter((f) => f.endsWith(".json"));
    return [
      { url: `${base}corpus/oc1/catalog.json`, revision: null },
      ...files.map((f) => ({ url: `${base}corpus/oc1/bundles/${f}`, revision: null })),
    ];
  } catch {
    console.warn("[vite-config] corpus bundles not found — run node scripts/bundle-corpus.mjs in oc318-mobile-reader first.");
    return [];
  }
}

/** https://bennyg83.github.io/shulchan_aruch/ (CI sets GITHUB_ACTIONS; override with VITE_BASE) */
const pagesBase =
  process.env.VITE_BASE || (process.env.GITHUB_ACTIONS === "true" ? "/shulchan_aruch/" : "/");

export default defineConfig(({ command }) => {
  const isBuild = command === "build";

  return {
    base: pagesBase,

    plugins: [
      react(),
      serveCorpusPlugin(),

      VitePWA({
        registerType: "autoUpdate",

        includeAssets: ["favicon.ico", "favicon.svg", "apple-touch-icon.png"],

        manifest: {
          name: "Shulchan Aruch — Orach Chayim",
          short_name: "Shulchan Aruch",
          description:
            "Complete Shulchan Aruch Orach Chayim with all commentaries, translated. Fully offline after install.",
          theme_color: "#141820",
          background_color: "#141820",
          display: "standalone",
          orientation: "portrait",
          start_url: pagesBase,
          scope: pagesBase,
          lang: "he",
          icons: [
            { src: "icon-192.png", sizes: "192x192", type: "image/png" },
            { src: "icon-512.png", sizes: "512x512", type: "image/png", purpose: "any maskable" },
            { src: "apple-touch-icon.png", sizes: "180x180", type: "image/png" },
          ],
        },

        workbox: {
          // Take control of all clients immediately on install/activate.
          skipWaiting: true,
          clientsClaim: true,

          // Glob only the small app-shell files; corpus handled via additionalManifestEntries.
          globPatterns: ["**/*.{js,css,html,ico,png,svg,woff,woff2}"],
          globIgnores: ["**/node_modules/**", "corpus/**/*"],
          additionalManifestEntries: isBuild ? buildBundleManifestEntries(pagesBase) : [],
          maximumFileSizeToCacheInBytes: 5 * 1024 * 1024,
          cleanupOutdatedCaches: true,
          runtimeCaching: [
            {
              // Cache corpus bundles at runtime too: CacheFirst so offline works
              // even for bundles the precache hasn't downloaded yet.
              urlPattern: /\/corpus\/oc1\/bundles\/siman\d+\.json$/,
              handler: "CacheFirst",
              options: {
                cacheName: "corpus-bundles",
                cacheableResponse: { statuses: [0, 200] },
                expiration: { maxEntries: 800, maxAgeSeconds: 60 * 60 * 24 * 365 },
              },
            },
            {
              // Catalog
              urlPattern: /\/corpus\/oc1\/catalog\.json$/,
              handler: "StaleWhileRevalidate",
              options: {
                cacheName: "corpus-catalog",
                cacheableResponse: { statuses: [0, 200] },
              },
            },
            {
              urlPattern: /^https:\/\/fonts\.googleapis\.com\/.*/i,
              handler: "StaleWhileRevalidate",
              options: {
                cacheName: "google-fonts-stylesheets",
                expiration: { maxEntries: 5, maxAgeSeconds: 60 * 60 * 24 * 30 },
              },
            },
            {
              urlPattern: /^https:\/\/fonts\.gstatic\.com\/.*/i,
              handler: "CacheFirst",
              options: {
                cacheName: "google-fonts-webfonts",
                cacheableResponse: { statuses: [0, 200] },
                expiration: { maxEntries: 30, maxAgeSeconds: 60 * 60 * 24 * 365 },
              },
            },
          ],
        },
      }),

      ...(isBuild ? [ghPagesDistPlugin()] : []),
    ],

    /** Build copies full corpus into dist/; dev serves /corpus via middleware only. */
    publicDir: isBuild ? mobilePublic : false,

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
  };
});
