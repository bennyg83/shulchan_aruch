/**
 * Apply corpus MT-fix replies → cm1 en.html
 *   node apply_cm1_corpus_mt_replies.mjs --replies <dir> --worksheets <dir>
 */
import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const args = process.argv.slice(2);
function arg(name, def = null) {
  const i = args.indexOf(name);
  return i >= 0 ? args[i + 1] : def;
}
const repliesDir = arg("--replies");
const worksheetsDir = arg("--worksheets");
const dry = args.includes("--dry-run");

const DIRTY_RE =
  /\bthe Lord\b|Lord['']?s Prayer|Hashem['']?s Word|Hashem['']?s people|Hashem['']?s Son|\bPassover\b|\bPsalms?\b|\bthe Bible\b|\bYahweh\b|\bbaptis|\bbaptiz|Capernaum|Abu Dhabi|New Testament|\bchurch(?:es)?\b|crucifix|\bislam(?:ic)?\b|koran|qur['']?an|gospel|vatican|trinity|Magdalene|English translation pending/i;
const HEBREW_LEAK = /[\u0590-\u05FF]{2,}/;

function collectReplyFiles(d) {
  const out = [];
  function walk(p) {
    for (const e of fs.readdirSync(p, { withFileTypes: true })) {
      const fp = path.join(p, e.name);
      if (e.isDirectory()) walk(fp);
      else if (/\.reply\.json$/i.test(e.name) && !/example/i.test(e.name)) out.push(fp);
    }
  }
  walk(d);
  return out.sort();
}

function sleep(ms) {
  Atomics.wait(new Int32Array(new SharedArrayBuffer(4)), 0, 0, ms);
}

function writeRetry(dest, body) {
  try {
    if (fs.readFileSync(dest, "utf8") === body) return;
  } catch {
    /* missing or unreadable */
  }
  const win = dest.startsWith("\\\\") ? dest : "\\\\?\\" + dest;
  let last;
  for (let i = 0; i < 40; i++) {
    try {
      fs.writeFileSync(win, body, "utf8");
      return;
    } catch (e) {
      last = e;
      const code = e && e.code;
      if (code !== "UNKNOWN" && code !== "EBUSY" && code !== "EPERM") throw e;
      sleep(Math.min(1500, 50 * (i + 1)));
    }
  }
  throw last;
}

if (!repliesDir || !fs.existsSync(repliesDir)) {
  console.error("Required: --replies <dir>");
  process.exit(1);
}
const wsByName = new Map();
if (worksheetsDir && fs.existsSync(worksheetsDir)) {
  for (const f of fs.readdirSync(worksheetsDir).filter((n) => n.endsWith(".json"))) {
    wsByName.set(f.replace(/\.json$/i, ""), JSON.parse(fs.readFileSync(path.join(worksheetsDir, f), "utf8")));
  }
}

let ok = 0;
let fail = 0;
const files = collectReplyFiles(repliesDir);
for (const f of files) {
  let j;
  try {
    j = JSON.parse(fs.readFileSync(f, "utf8"));
  } catch (e) {
    fail++;
    continue;
  }
  const base = path.basename(f).replace(/\.reply\.json$/i, "");
  const ws = wsByName.get(base);
  if (ws && Array.isArray(ws.parts) && Array.isArray(j.parts) && ws.parts.length !== j.parts.length) {
    fail++;
    console.warn("parts length mismatch", path.basename(f));
    continue;
  }
  for (const p of j.parts || []) {
    if (p.action && !/retranslate/i.test(String(p.action))) continue;
    const en = typeof p.new_en === "string" ? p.new_en.trim() : "";
    const dest = p.corpus_en_path;
    if (!en || !dest || !fs.existsSync(dest)) {
      fail++;
      continue;
    }
    if (DIRTY_RE.test(en) || HEBREW_LEAK.test(en)) {
      fail++;
      if (fail <= 15) console.warn("residual dirty", path.basename(f), p.part_index);
      continue;
    }
    if (!dry) writeRetry(dest, en.endsWith("\n") ? en : en + "\n");
    ok++;
  }
}
console.log({ reply_files: files.length, ok, fail, dry });
if (fail) process.exitCode = 1;
