import fs from "fs";
import path from "path";
import { scanMechaberQuality } from "./scan-mechaber-quality.mjs";
import { getLlmStatus, readJsonBody, runLlmValidationJob } from "./llm-runner.mjs";
import { getCachePath } from "./llm-cache.mjs";

export function qualityApiPlugin() {
  /** @type {import('vite').ViteDevServer | null} */
  let devServer = null;
  let debounceTimer;

  function broadcast(event, payload) {
    devServer?.hot.send({ type: "custom", event, data: payload });
  }

  function scheduleRescan(reason) {
    clearTimeout(debounceTimer);
    debounceTimer = setTimeout(() => {
      try {
        const data = scanMechaberQuality();
        broadcast("quality-update", { reason, data });
      } catch (err) {
        broadcast("quality-update", { reason, error: String(err?.message || err) });
      }
    }, 350);
  }

  return {
    name: "yd001-quality-api",
    configureServer(server) {
      devServer = server;

      server.middlewares.use(async (req, res, next) => {
        if (!req.url?.startsWith("/api/")) return next();

        res.setHeader("Content-Type", "application/json; charset=utf-8");
        res.setHeader("Cache-Control", "no-store");

        try {
          const url = new URL(req.url, "http://localhost");

          if (url.pathname === "/api/mechaber-quality") {
            const siman = url.searchParams.get("siman");
            const data = scanMechaberQuality({
              siman: siman ? Number(siman) : null,
            });
            res.end(JSON.stringify(data));
            return;
          }

          if (url.pathname === "/api/llm-status") {
            res.end(JSON.stringify(await getLlmStatus()));
            return;
          }

          if (url.pathname === "/api/llm-validate" && req.method === "POST") {
            const body = await readJsonBody(req);
            const siman = body.siman ? Number(body.siman) : null;
            const pending = Boolean(body.pending);
            const limit = body.limit ? Number(body.limit) : pending ? 60 : 200;
            const force = Boolean(body.force);

            runLlmValidationJob(
              { siman, pending, limit, force },
              (progress) => {
                if (progress.type === "block" || progress.type === "done") {
                  broadcast("llm-progress", progress);
                }
                if (progress.type === "done") {
                  scheduleRescan("llm-validation-done");
                }
              }
            )
              .then((result) => {
                if (!res.writableEnded) {
                  res.end(JSON.stringify({ ok: true, ...result }));
                }
              })
              .catch((err) => {
                if (!res.writableEnded) {
                  res.statusCode = 500;
                  res.end(JSON.stringify({ error: String(err.message || err) }));
                }
              });
            return;
          }

          if (url.pathname === "/api/health") {
            res.end(JSON.stringify({ ok: true, ts: new Date().toISOString() }));
            return;
          }

          res.statusCode = 404;
          res.end(JSON.stringify({ error: "Not found" }));
        } catch (err) {
          res.statusCode = 500;
          res.end(JSON.stringify({ error: String(err?.message || err) }));
        }
      });

      const outputRoot = path.resolve(server.config.root, "../../output");
      if (fs.existsSync(outputRoot)) {
        server.watcher.add(outputRoot);
        const onOutputChange = (file) => {
          if (file.includes(`${path.sep}mechaber${path.sep}`) && file.endsWith(".txt")) {
            scheduleRescan("output-changed");
          }
        };
        server.watcher.on("change", onOutputChange);
        server.watcher.on("add", onOutputChange);
      }

      const progressLog = path.resolve(server.config.root, "../../progress.log");
      if (fs.existsSync(progressLog)) {
        server.watcher.add(progressLog);
        server.watcher.on("change", (file) => {
          if (file.endsWith("progress.log")) scheduleRescan("progress-log-changed");
        });
      }

      const cacheFile = getCachePath();
      if (fs.existsSync(cacheFile)) {
        server.watcher.add(cacheFile);
      } else {
        fs.mkdirSync(path.dirname(cacheFile), { recursive: true });
        server.watcher.add(path.dirname(cacheFile));
      }
      server.watcher.on("change", (file) => {
        if (/llm-reviewed(-\w+)?\.jsonl$/i.test(path.basename(file))) {
          scheduleRescan("llm-cache-changed");
        }
      });
    },
    handleHotUpdate({ file }) {
      if (
        file.endsWith("scan-mechaber-quality.mjs") ||
        file.endsWith("quality-checks.mjs") ||
        file.endsWith("llm-validator.mjs") ||
        file.endsWith("llm-cache.mjs")
      ) {
        scheduleRescan("scan-logic-changed");
      }
    },
  };
}
