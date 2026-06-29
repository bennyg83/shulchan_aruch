/**
 * SA_Sandbox/scripts/serve.mjs
 *
 * Minimal static server for the SA_Sandbox viewer.
 * Serves ./public/ on http://localhost:5175
 *
 * Routes:
 *   GET /                    → public/index.html
 *   GET /bundles/oc1/*.json  → public/bundles/oc1/*.json
 *   GET /bundles/yd1/*.json  → public/bundles/yd1/*.json
 *   GET /scan-results/*.json → scan-results/*.json
 *
 * Usage: node scripts/serve.mjs
 */

import http from "http";
import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const SANDBOX_ROOT = path.join(__dirname, "..");
const PORT = parseInt(process.env.PORT || "5175", 10);

const MIME = {
  ".html": "text/html; charset=utf-8",
  ".json": "application/json; charset=utf-8",
  ".js":   "text/javascript",
  ".css":  "text/css",
  ".ico":  "image/x-icon",
};

function resolveFilePath(url) {
  const u = url.split("?")[0];

  if (u === "/" || u === "") return path.join(SANDBOX_ROOT, "public", "index.html");

  // scan-results served from sandbox root
  if (u.startsWith("/scan-results/")) {
    return path.join(SANDBOX_ROOT, u.replace(/^\//, ""));
  }

  // everything else from public/
  return path.join(SANDBOX_ROOT, "public", u.replace(/^\//, ""));
}

const server = http.createServer((req, res) => {
  const filePath = resolveFilePath(req.url);

  // Prevent path traversal outside sandbox
  if (!filePath.startsWith(SANDBOX_ROOT)) {
    res.writeHead(403); res.end("Forbidden"); return;
  }

  if (!fs.existsSync(filePath)) {
    res.writeHead(404); res.end(`Not found: ${req.url}`); return;
  }

  const ext = path.extname(filePath);
  const ct = MIME[ext] || "application/octet-stream";
  const data = fs.readFileSync(filePath);
  res.writeHead(200, { "Content-Type": ct, "Access-Control-Allow-Origin": "*" });
  res.end(data);
});

server.listen(PORT, () => {
  console.log(`\n[SA_Sandbox] Viewer running at http://localhost:${PORT}`);
  console.log(`  Bundles: http://localhost:${PORT}/bundles/`);
  console.log(`  Scan:    http://localhost:${PORT}/scan-results/garbage-report.json`);
  console.log("\n  Press Ctrl+C to stop.\n");
});
