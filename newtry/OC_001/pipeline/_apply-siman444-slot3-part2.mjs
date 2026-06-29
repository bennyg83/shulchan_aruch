#!/usr/bin/env node
/** worker slot 3 — siman 444 part 2 (Erev Pesach on Shabbat) */
import path from "path";
import { fileURLToPath } from "url";
import { spawnSync } from "child_process";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const root = path.resolve(__dirname, "..");
const script = path.join(root, "_apply-siman444-slot3-part2.mjs");
const r = spawnSync(process.execPath, [script], { cwd: root, stdio: "inherit" });
process.exit(r.status ?? 1);
