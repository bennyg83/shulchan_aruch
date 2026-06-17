#!/usr/bin/env node
/** Bundle yd1 corpus — thin wrapper around bundle-corpus.mjs */
import { spawnSync } from "child_process";
import path from "path";
import { fileURLToPath } from "url";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const r = spawnSync(process.execPath, [path.join(__dirname, "bundle-corpus.mjs"), "--volume", "yd1"], {
  stdio: "inherit",
});
process.exit(r.status ?? 1);
