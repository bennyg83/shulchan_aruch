/**
 * Replace remaining EN placeholders (iw→en) for YD001 part-*.txt trees.
 *
 * Machine translation backends (no official API key unless noted):
 *   google     — translate.googleapis.com gtx (unofficial; 429 common)
 *   mymemory   — api.mymemory.translated.net (free tier; daily limits)
 *   lingva     — lingva.ml Google mirror (523 when down)
 *   libre      — LibreTranslate (set LIBRE_URL; LIBRE_API_KEY if required)
 *   auto       — try --chain order; switch backend after repeated failures
 *
 *   node tools/translate-YD001-pending-mymemory.mjs --root output/siman_308 --backend libre --ms 100 --workers 3 --chunk-len 400
 *   node tools/translate-YD001-pending-mymemory.mjs --root output --backend google --ms 4000
 *   node tools/translate-YD001-pending-mymemory.mjs --backend auto --chain google,mymemory,lingva
 *
 * Env:
 *   YD001_MT_CHAIN=google,mymemory,lingva,libre
 *   YD001_MT_MS=100  YD001_MT_WORKERS=3  YD001_MT_CHUNK_LEN=400  (libre defaults)
 *   LIBRE_URL=https://libretranslate.com
 *   LIBRE_API_KEY=...   (if your instance requires it)
 *
 * Not machine translation (terminology after draft exists):
 *   npm run apply:dictionary  → full_dictionary (1).md at repo root
 */
import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";
import * as cheerio from "cheerio";
import { parseBlocksInFile, serializeBlock, EN_PENDING_DEFAULT } from "../yd001_block_lib.mjs";
import {
  applyGlossary,
  getInhouseDictionaryPath,
  loadDictionaryFromPath,
} from "../../OC_253/halacha_dictionary_lib.mjs";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const YD001_ROOT = path.resolve(__dirname, "..");

const GOOGLE_URL =
  "https://translate.googleapis.com/translate_a/single?client=gtx&sl=iw&tl=en&dt=t";

const ALL_BACKENDS = ["google", "mymemory", "lingva", "libre"];
const LIBRE_LOCAL_DEFAULT = "http://localhost:5000";

/** Self-hosted Docker (npm run libre:up). Public libretranslate.com needs LIBRE_API_KEY. */
function getLibreUrl() {
  const fromEnv = process.env.LIBRE_URL?.trim();
  return (fromEnv || LIBRE_LOCAL_DEFAULT).replace(/\/$/, "");
}

function defaultChain() {
  const fromEnv = process.env.YD001_MT_CHAIN?.trim();
  if (fromEnv) {
    return fromEnv
      .split(",")
      .map((s) => s.trim().toLowerCase())
      .filter((b) => ALL_BACKENDS.includes(b));
  }
  const chain = ["google", "mymemory", "lingva"];
  if (process.env.LIBRE_URL?.trim() || process.env.YD001_MT_INCLUDE_LIBRE === "1") {
    chain.push("libre");
  }
  return chain;
}

function defaultMs(backend) {
  const fromEnv = Number(process.env.YD001_MT_MS);
  if (Number.isFinite(fromEnv) && fromEnv >= 0) return fromEnv;
  if (backend === "libre") return 0;
  if (backend === "lingva") return 320;
  return 2500;
}

function defaultWorkers(backend) {
  const fromEnv = Number(process.env.YD001_MT_WORKERS);
  if (Number.isFinite(fromEnv) && fromEnv >= 1) return Math.min(12, Math.floor(fromEnv));
  if (backend === "libre") return 6;
  return 1;
}

function defaultChunkLen(backend) {
  const fromEnv = Number(process.env.YD001_MT_CHUNK_LEN);
  if (Number.isFinite(fromEnv) && fromEnv >= 80) return Math.min(2000, Math.floor(fromEnv));
  if (backend === "libre") return 500;
  return 120;
}

function minMs(backend) {
  return backend === "libre" ? 0 : 80;
}

function parseArgs(argv) {
  let rootRel = "";
  let ms = null;
  let workers = null;
  let chunkLen = null;
  let backend = "auto";
  let chain = null;
  for (let i = 0; i < argv.length; i++) {
    if (argv[i] === "--root" && argv[i + 1]) rootRel = argv[++i];
    else if (argv[i] === "--ms" && argv[i + 1]) ms = Number(argv[++i]);
    else if (argv[i] === "--workers" && argv[i + 1]) workers = Number(argv[++i]);
    else if (argv[i] === "--chunk-len" && argv[i + 1]) chunkLen = Number(argv[++i]);
    else if (argv[i] === "--backend" && argv[i + 1]) {
      backend = argv[++i].toLowerCase();
    } else if (argv[i] === "--chain" && argv[i + 1]) {
      chain = argv[++i]
        .split(",")
        .map((s) => s.trim().toLowerCase())
        .filter((b) => ALL_BACKENDS.includes(b));
    }
  }
  if (!ALL_BACKENDS.includes(backend) && backend !== "auto") {
    throw new Error(`--backend must be one of: auto, ${ALL_BACKENDS.join(", ")}`);
  }
  if (!rootRel) throw new Error("Required: --root <folder under YD_001 or absolute>");
  const root = path.isAbsolute(rootRel) ? rootRel : path.join(YD001_ROOT, rootRel);
  const resolvedChain = chain?.length ? chain : defaultChain();
  if (backend === "auto" && !resolvedChain.length) {
    throw new Error("auto backend needs a non-empty --chain or YD001_MT_CHAIN");
  }
  const rateBackend = backend === "auto" ? resolvedChain[resolvedChain.length - 1] || "google" : backend;
  if (ms == null) ms = defaultMs(rateBackend);
  ms = Math.max(minMs(rateBackend), ms);
  if (workers == null) workers = defaultWorkers(rateBackend);
  workers = Math.max(1, Math.min(12, Math.floor(workers) || 1));
  if (chunkLen == null) chunkLen = defaultChunkLen(rateBackend);
  chunkLen = Math.max(80, Math.min(2000, Math.floor(chunkLen) || 120));
  return { root, ms, workers, chunkLen, backend, chain: resolvedChain };
}

function walkTxt(dir, acc = []) {
  if (!fs.existsSync(dir)) return acc;
  for (const ent of fs.readdirSync(dir, { withFileTypes: true })) {
    const p = path.join(dir, ent.name);
    if (ent.isDirectory()) walkTxt(p, acc);
    else if (ent.isFile() && ent.name.endsWith(".txt")) acc.push(p);
  }
  return acc;
}

function hebrewToPlain(html) {
  const $ = cheerio.load(`<div id="r">${html ?? ""}</div>`, { decodeEntities: true });
  const t = $("#r")
    .text()
    .replace(/\u00a0/g, " ")
    .replace(/\s+/g, " ")
    .trim();
  return t;
}

function chunkText(s, max = 180) {
  if (s.length <= max) return [s];
  const parts = [];
  let i = 0;
  while (i < s.length) {
    let j = Math.min(i + max, s.length);
    if (j < s.length) {
      const cut = s.lastIndexOf(" ", j);
      if (cut > i + 80) j = cut;
    }
    parts.push(s.slice(i, j).trim());
    i = j;
  }
  return parts.filter(Boolean);
}

function splitForTranslation(input, maxLen = 120) {
  const lines = input.split(/\r?\n/);
  const out = [];
  let curr = "";
  for (const line of lines) {
    if (line.length > maxLen) {
      if (curr) {
        out.push(curr);
        curr = "";
      }
      for (let i = 0; i < line.length; i += maxLen) out.push(line.slice(i, i + maxLen));
      continue;
    }
    if (!line.trim()) {
      if (curr) {
        out.push(curr);
        curr = "";
      }
      out.push("");
      continue;
    }
    if (!curr) curr = line;
    else if ((curr + "\n" + line).length <= maxLen) curr += "\n" + line;
    else {
      out.push(curr);
      curr = line;
    }
  }
  if (curr) out.push(curr);
  return out;
}

function halakhicCleanup(text) {
  return text
    .replace(/\bGod\b/g, "Hashem")
    .replace(/\bthe LORD\b/g, "Hashem")
    .replace(/\bLORD\b/g, "Hashem")
    .replace(/\bHoly One, blessed be He\b/gi, "the Holy One, blessed be He")
    .replace(/\bcommandments\b/gi, "mitzvot")
    .replace(/\bcommandment\b/gi, "mitzvah")
    .replace(/\bhouse of prayer\b/gi, "synagogue")
    .replace(/\bHouse of prayer\b/g, "Synagogue")
    .replace(/\bSabbath\b/g, "Shabbat")
    .replace(/\bholiday\b/gi, "Yom Tov")
    .replace(/[ \t]+\n/g, "\n")
    .replace(/\n{3,}/g, "\n\n")
    .trim();
}

function escapeHtml(s) {
  return String(s)
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;");
}

const sleep = (ms) => new Promise((r) => setTimeout(r, ms));

/** Process items with a fixed concurrency pool (order of completion varies). */
async function runPool(items, concurrency, fn) {
  if (!items.length) return;
  let next = 0;
  const n = Math.min(concurrency, items.length);
  await Promise.all(
    Array.from({ length: n }, async () => {
      while (true) {
        const i = next++;
        if (i >= items.length) break;
        await fn(items[i], i);
      }
    })
  );
}

const backendStats = Object.fromEntries(ALL_BACKENDS.map((b) => [b, { ok: 0, fail: 0 }]));

function noteOk(name) {
  if (backendStats[name]) backendStats[name].ok++;
}
function noteFail(name) {
  if (backendStats[name]) backendStats[name].fail++;
}

async function translateLingva(piece, maxAttempts) {
  const enc = encodeURIComponent(piece);
  const url = `https://lingva.ml/api/v1/iw/en/${enc}`;
  for (let attempt = 0; attempt < maxAttempts; attempt++) {
    try {
      const res = await fetch(url);
      const j = await res.json().catch(() => ({}));
      const tr = j.translation;
      if (tr && String(tr).trim()) return String(tr).trim();
      console.warn("lingva retry", j.error || res.status, "attempt", attempt + 1);
    } catch (e) {
      console.warn("lingva error", String(e).slice(0, 50));
    }
    await sleep(Math.min(8000, 600 * 2 ** attempt));
  }
  return null;
}

async function translateGoogle(piece, maxAttempts) {
  for (let attempt = 1; attempt <= maxAttempts; attempt++) {
    try {
      const body = new URLSearchParams({ q: piece });
      const res = await fetch(GOOGLE_URL, { method: "POST", body });
      if (!res.ok) throw new Error(`HTTP ${res.status}`);
      const data = await res.json();
      return data[0].map((seg) => seg[0]).join("");
    } catch (err) {
      const waitMs = String(err).includes("429") ? 15000 + attempt * 1000 : 1200 + attempt * 300;
      console.warn("google retry", String(err).slice(0, 60), "in", waitMs, "ms");
      await sleep(waitMs);
    }
  }
  return null;
}

async function translateMymemory(piece, maxAttempts) {
  const url = `https://api.mymemory.translated.net/get?q=${encodeURIComponent(piece)}&langpair=iw|en`;
  for (let attempt = 0; attempt < maxAttempts; attempt++) {
    try {
      const res = await fetch(url);
      if (!res.ok) throw new Error(`HTTP ${res.status}`);
      const j = await res.json();
      const tr = j?.responseData?.translatedText;
      if (tr && String(tr).trim() && !/QUERY LENGTH LIMIT/i.test(tr)) {
        return String(tr).trim();
      }
      console.warn("mymemory empty/limit", tr?.slice?.(0, 40) || res.status);
    } catch (e) {
      console.warn("mymemory error", String(e).slice(0, 50));
    }
    await sleep(2000 + attempt * 500);
  }
  return null;
}

async function translateLibre(piece, maxAttempts) {
  const base = getLibreUrl();
  const apiKey = process.env.LIBRE_API_KEY?.trim();
  if (!piece?.trim()) return "";
  for (let attempt = 0; attempt < maxAttempts; attempt++) {
    try {
      const payload = { q: piece, source: "he", target: "en", format: "text" };
      if (apiKey) payload.api_key = apiKey;
      const res = await fetch(`${base}/translate`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });
      const bodyText = await res.text();
      if (!res.ok) {
        let detail = bodyText.slice(0, 160);
        try {
          const errJ = JSON.parse(bodyText);
          if (errJ.error) detail = String(errJ.error).slice(0, 160);
        } catch {
          /* ignore */
        }
        throw new Error(`HTTP ${res.status} @ ${base}: ${detail}`);
      }
      const j = JSON.parse(bodyText);
      if (j.translatedText && String(j.translatedText).trim()) {
        return String(j.translatedText).trim();
      }
    } catch (e) {
      console.warn("libre error", String(e).slice(0, 120));
    }
    await sleep(1500 + attempt * 500);
  }
  return null;
}

async function translateOneBackend(name, piece, maxAttempts) {
  switch (name) {
    case "google":
      return translateGoogle(piece, maxAttempts);
    case "lingva":
      return translateLingva(piece, maxAttempts);
    case "mymemory":
      return translateMymemory(piece, maxAttempts);
    case "libre":
      return translateLibre(piece, maxAttempts);
    default:
      return null;
  }
}

async function translatePiece(piece, { mode, chain, maxAttemptsSingle, maxAttemptsAuto }) {
  const backends = mode === "auto" ? chain : [mode];
  const perBackendAttempts = mode === "auto" ? maxAttemptsAuto : maxAttemptsSingle;

  for (let i = 0; i < backends.length; i++) {
    const name = backends[i];
    const tr = await translateOneBackend(name, piece, perBackendAttempts);
    if (tr) {
      noteOk(name);
      if (mode === "auto" && i > 0) {
        console.warn(`  (fallback: used ${name} after earlier backend(s) failed)`);
      }
      return tr;
    }
    noteFail(name);
    if (mode === "auto" && i < backends.length - 1) {
      console.warn(`  switching MT backend: ${name} → ${backends[i + 1]}`);
    }
  }
  return null;
}

async function translatePlain(text, msBetween, chunkLen, opts) {
  const pieces = splitForTranslation(text, chunkLen);
  const out = new Array(pieces.length).fill("");
  for (let i = 0; i < pieces.length; i++) {
    const piece = pieces[i];
    if (piece === "") continue;
    const tr = await translatePiece(piece, opts);
    if (!tr) {
      console.warn("translate gave up on chunk:", piece.slice(0, 50));
      return null;
    }
    out[i] = tr.trim();
    if (msBetween > 0) await sleep(msBetween);
  }
  return halakhicCleanup(out.join("\n").trim());
}

async function processFile(fp, msBetween, chunkLen, opts) {
  const raw = fs.readFileSync(fp, "utf8");
  const blocks = parseBlocksInFile(raw);
  let changed = 0;
  const out = [];
  for (const b of blocks) {
    const en = String(b.en ?? "").trim();
    if (en !== EN_PENDING_DEFAULT) {
      out.push(b);
      continue;
    }
    const plain = hebrewToPlain(b.he);
    if (!plain) {
      out.push(b);
      continue;
    }
    const translated = await translatePlain(plain, msBetween, chunkLen, opts);
    if (!translated) {
      out.push(b);
      continue;
    }
    const glossed = glossary.length ? applyGlossary(translated, glossary) : translated;
    out.push({ ...b, en: escapeHtml(glossed) });
    changed++;
    console.log(path.basename(fp), path.basename(path.dirname(fp)), `block +1 (${changed})`);
  }
  if (changed) {
    fs.writeFileSync(fp, out.map((b) => serializeBlock(b)).join("\n\n") + "\n", "utf8");
  }
  return changed;
}

const { root, ms, workers, chunkLen, backend, chain } = parseArgs(process.argv.slice(2));
const glossary = fs.existsSync(getInhouseDictionaryPath())
  ? loadDictionaryFromPath(getInhouseDictionaryPath())
  : [];
if (glossary.length) console.log("Dictionary entries:", glossary.length);
const translateOpts = {
  mode: backend,
  chain,
  maxAttemptsSingle: 25,
  maxAttemptsAuto: 3,
};

console.log("Backend:", backend === "auto" ? `auto [${chain.join(" → ")}]` : backend);
if (backend === "libre" || chain.includes("libre")) {
  const base = getLibreUrl();
  console.log("LibreTranslate URL:", base);
  if (base.includes("libretranslate.com") && !process.env.LIBRE_API_KEY?.trim()) {
    console.warn(
      "Warning: public libretranslate.com requires LIBRE_API_KEY. Use local Docker (npm run libre:up) or set LIBRE_URL=http://localhost:5000"
    );
  }
}
console.log("ms between chunks:", ms);
console.log("chunk length:", chunkLen);
console.log("file workers:", workers);
console.log("Scan root:", root);

const files = walkTxt(root).sort();
const totals = [];
await runPool(files, workers, async (fp) => {
  totals.push(await processFile(fp, ms, chunkLen, translateOpts));
});
const total = totals.reduce((a, b) => a + b, 0);

console.log("Done. Blocks translated:", total);
console.log("Backend usage (chunks):", JSON.stringify(backendStats));
if (backend === "auto") {
  console.log("Tip: set YD001_MT_CHAIN=google,mymemory,lingva,libre and LIBRE_URL for self-hosted LibreTranslate.");
}
