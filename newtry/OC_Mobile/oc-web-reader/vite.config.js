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
 * Precache entries for Workbox: siman bundles + catalog per published volume.
 */
function buildBundleManifestEntries(base) {
  const volumes = ["oc1", "yd1", "eh1"];
  const entries = [];
  for (const vol of volumes) {
    const bundlesDir = path.join(mobilePublic, "corpus", vol, "bundles");
    const catalogPath = path.join(mobilePublic, "corpus", vol, "catalog.json");
    try {
      if (fs.existsSync(catalogPath)) {
        entries.push({ url: `${base}corpus/${vol}/catalog.json`, revision: null });
      }
      if (!fs.existsSync(bundlesDir)) continue;
      const files = fs.readdirSync(bundlesDir).filter((f) => f.endsWith(".json"));
      entries.push(...files.map((f) => ({ url: `${base}corpus/${vol}/bundles/${f}`, revision: null })));
    } catch {
      console.warn(`[vite-config] corpus/${vol} bundles not found — publish + bundle first.`);
    }
  }
  return entries;
}

/**
 * Set VITE_STANDALONE=true to build a self-contained native shell (Android WebView / iOS Capacitor).
 * No PWA service worker — corpus is bundled in app assets.
 */
const isStandalone = process.env.VITE_STANDALONE === "true";

/** Standalone native builds use relative URLs so bundled assets resolve offline. */
const standaloneBase = "./";

/** https://bennyg83.github.io/shulchan_aruch/ (CI sets GITHUB_ACTIONS; override with VITE_BASE) */
const pagesBase = isStandalone
  ? process.env.VITE_BASE || standaloneBase
  : process.env.VITE_BASE || (process.env.GITHUB_ACTIONS === "true" ? "/shulchan_aruch/" : "/");

/** Stub PWA registration for standalone native builds (no service worker). */
function stubPwaRegisterPlugin() {
  const virtualId = "virtual:pwa-register";
  const resolvedId = "\0" + virtualId;
  return {
    name: "stub-pwa-register",
    resolveId(id) {
      if (id === virtualId) return resolvedId;
    },
    load(id) {
      if (id === resolvedId) {
        return "export function registerSW() { return () => {}; }";
      }
    },
  };
}

export default defineConfig(({ command }) => {
  const isBuild = command === "build";

  return {
    base: pagesBase,

    plugins: [
      react(),
      serveCorpusPlugin(),
      ...(isStandalone ? [stubPwaRegisterPlugin()] : []),

      ...(!isStandalone ? [VitePWA({
        registerType: "autoUpdate",

        includeAssets: ["favicon.ico", "favicon.svg", "apple-touch-icon.png"],

        manifest: {
          name: "Shulchan Aruch — OC & YD",
          short_name: "Shulchan Aruch",
          description:
            "Shulchan Aruch Orach Chayim and Yoreh De'ah with commentaries, translated. Fully offline after install.",
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
              urlPattern: /\/corpus\/(oc1|yd1|eh1)\/bundles\/siman\d+\.json$/,
              handler: "CacheFirst",
              options: {
                cacheName: "corpus-bundles",
                cacheableResponse: { statuses: [0, 200] },
                expiration: { maxEntries: 1200, maxAgeSeconds: 60 * 60 * 24 * 365 },
              },
            },
            {
              // Catalog (per volume)
              urlPattern: /\/corpus\/(oc1|yd1|eh1)\/catalog\.json$/,
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
      })] : []),

      ...(isBuild && !isStandalone ? [ghPagesDistPlugin()] : []),
    ],

    /** Build copies full corpus into dist/; dev serves /corpus via middleware only.
     *  Standalone APK build skips this — corpus is assembled by the CI step directly. */
    publicDir: isBuild && !isStandalone ? mobilePublic : false,

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
