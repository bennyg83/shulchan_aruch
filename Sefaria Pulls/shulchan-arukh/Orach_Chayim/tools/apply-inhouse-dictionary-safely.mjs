/**
 * Safer glossary runner:
 * - processes each en.html individually (separate child process)
 * - writes to a temp copy, then atomically replaces original
 * - creates a per-file backup before replace
 *
 * This DOES NOT translate Hebrew→English. It only applies the in-house dictionary
 * to existing English text.
 *
 * Usage:
 *   node tools/apply-inhouse-dictionary-safely.mjs --siman 1 --seif 1
 *   node tools/apply-inhouse-dictionary-safely.mjs --siman 1 --from 1 --to 9
 *   node tools/apply-inhouse-dictionary-safely.mjs --siman 1 --seif 1 --slug mechaber
 */
import fs from "fs";
import path from "path";
import crypto from "crypto";
import { fileURLToPath } from "url";
import { spawnSync } from "child_process";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const OC = path.resolve(__dirname, "..");
const dictTool = path.join(__dirname, "apply-inhouse-dictionary-to-html.mjs");

const pad = (n) => String(n).padStart(3, "0");

function parseArgs() {
  let siman = 1;
  let seif = null;
  let from = null;
  let to = null;
  let slug = null;
  const a = process.argv.slice(2);
  for (let i = 0; i < a.length; i++) {
    if (a[i] === "--siman" && a[i + 1]) siman = Number(a[++i]);
    else if (a[i] === "--seif" && a[i + 1]) seif = Number(a[++i]);
    else if (a[i] === "--from" && a[i + 1]) from = Number(a[++i]);
    else if (a[i] === "--to" && a[i + 1]) to = Number(a[++i]);
    else if (a[i] === "--slug" && a[i + 1]) slug = String(a[++i]);
  }
  if (!Number.isFinite(siman) || siman < 1) throw new Error("Invalid --siman");
  if (seif != null && (!Number.isFinite(seif) || seif < 1)) throw new Error("Invalid --seif");
  if (from != null && (!Number.isFinite(from) || from < 1)) throw new Error("Invalid --from");
  if (to != null && (!Number.isFinite(to) || to < (from ?? 1))) throw new Error("Invalid --to");

  if (seif == null) {
    if (from == null) from = 1;
    if (to == null) to = from;
  } else {
    from = seif;
    to = seif;
  }

  return { siman, from, to, slug };
}

function listSlugs(seifDir) {
  return fs
    .readdirSync(seifDir, { withFileTypes: true })
    .filter((d) => d.isDirectory())
    .map((d) => d.name)
    .sort();
}

function fileHash(p) {
  const b = fs.readFileSync(p);
  return crypto.createHash("sha256").update(b).digest("hex");
}

function runGlossaryOnce(enPath) {
  const r = spawnSync(process.execPath, [dictTool, "--in", enPath], {
    encoding: "utf8",
    stdio: ["ignore", "pipe", "pipe"],
  });
  if (r.status !== 0) {
    throw new Error((r.stderr || r.stdout || `exit ${r.status}`).trim());
  }
  return (r.stdout || "").trim();
}

function applySafely(enPath) {
  if (!fs.existsSync(enPath)) return { status: "missing" };
  const beforeHash = fileHash(enPath);
  const dir = path.dirname(enPath);
  const base = path.basename(enPath);
  const tmp = path.join(dir, `${base}.tmp-${process.pid}-${Date.now()}`);
  const bak = path.join(dir, `${base}.bak-${new Date().toISOString().replace(/[:.]/g, "-")}`);

  fs.copyFileSync(enPath, tmp);
  const out = runGlossaryOnce(tmp);
  const afterHashTmp = fileHash(tmp);

  if (afterHashTmp === beforeHash) {
    fs.unlinkSync(tmp);
    return { status: "nochange", out };
  }

  fs.copyFileSync(enPath, bak);
  fs.renameSync(tmp, enPath); // atomic replace on same volume
  return { status: "updated", out, backup: bak };
}

const { siman, from, to, slug } = parseArgs();

for (let s = from; s <= to; s++) {
  const seifDir = path.join(OC, "simanim", pad(siman), `seif-${pad(s)}`);
  if (!fs.existsSync(seifDir)) {
    console.log(`seif-${pad(s)}: (missing dir)`);
    continue;
  }

  const slugs = slug ? [slug] : listSlugs(seifDir);
  console.log(`\n== Siman ${siman} · Seif ${s} (${slugs.length} source(s)) ==`);

  for (const sg of slugs) {
    const enPath = path.join(seifDir, sg, "en.html");
    try {
      const res = applySafely(enPath);
      if (res.status === "missing") console.log(`${sg}: skip (no en.html)`);
      else if (res.status === "nochange") console.log(`${sg}: ok (no changes)`);
      else console.log(`${sg}: UPDATED (backup: ${path.basename(res.backup)})`);
    } catch (e) {
      console.log(`${sg}: ERROR: ${String(e.message || e)}`);
    }
  }
}

