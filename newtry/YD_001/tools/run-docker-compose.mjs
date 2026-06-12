#!/usr/bin/env node
/** Run docker compose with Docker Desktop path on Windows when docker is not on PATH. */
import { spawnSync } from "child_process";
import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const YD_ROOT = path.resolve(__dirname, "..");

function findDocker() {
  if (process.platform === "win32") {
    const candidates = [
      process.env.DOCKER_BIN,
      "C:\\Program Files\\Docker\\Docker\\resources\\bin\\docker.exe",
      "C:\\Program Files\\Docker\\Docker\\resources\\bin\\docker",
    ].filter(Boolean);
    for (const c of candidates) {
      if (fs.existsSync(c)) return c;
    }
  }
  return "docker";
}

const docker = findDocker();
const args = ["compose", ...process.argv.slice(2)];
const r = spawnSync(docker, args, {
  cwd: YD_ROOT,
  stdio: "inherit",
  shell: false,
});
process.exit(r.status ?? 1);
