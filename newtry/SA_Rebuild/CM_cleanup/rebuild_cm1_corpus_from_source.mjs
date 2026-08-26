/**
 * Rebuild public/corpus/cm1 {he,en}.html from CM_001 source TXT.
 *   node rebuild_cm1_corpus_from_source.mjs
 *   node rebuild_cm1_corpus_from_source.mjs --slug beer-hagolah
 */
import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const CM_OUT = path.resolve(__dirname, "../../CM_001/output");
const CORPUS = path.resolve(
  __dirname,
  "../../OC_Mobile/oc318-mobile-reader/public/corpus/cm1"
);
const only = (() => {
  const i = process.argv.indexOf("--slug");
  return i >= 0 ? process.argv[i + 1] : null;
})();
const fromSiman = Number(
  (() => {
    const i = process.argv.indexOf("--from");
    return i >= 0 ? process.argv[i + 1] : "1";
  })()
);

const BLOCK_RE = /^\*{4}\s*CM001 SOURCE BLOCK\s*\*{4}\s*$/m;
const PENDING = /English translation pending/i;
const pad3 = (n) => String(n).padStart(3, "0");

function parseBlocks(raw) {
  const text = String(raw).replace(/\r\n/g, "\n");
  const parts = text.split(BLOCK_RE);
  const blocks = [];
  for (let i = 1; i < parts.length; i++) {
    const seg = parts[i];
    const endM = seg.match(/^\*{4}\s*END BLOCK\s*\*{4}\s*$/m);
    const body = endM ? seg.slice(0, endM.index) : seg;
    const slug = (body.match(/^slug:\s*(.+)$/m) || [])[1]?.trim() || "";
    const seif = Number((body.match(/^seif:\s*(\d+)/m) || [])[1] || 0);
    const heM = body.match(/\*{4}\s*HEBREW\s*\*{4}\r?\n?([\s\S]*?)\*{4}\s*ENGLISH\s*\*{4}/);
    const enM = body.match(/\*{4}\s*ENGLISH\s*\*{4}\r?\n?([\s\S]*)$/);
    blocks.push({
      slug,
      seif,
      he: heM ? heM[1].trim() : "",
      en: enM ? enM[1].trim() : "",
    });
  }
  return blocks;
}

function winPath(p) {
  const abs = path.resolve(p);
  if (process.platform !== "win32") return abs;
  if (abs.startsWith("\\\\?\\")) return abs;
  if (abs.startsWith("\\\\")) return "\\\\?\\UNC\\" + abs.slice(2);
  return "\\\\?\\" + abs;
}

function writeUtf8(p, text) {
  try {
    const existing = fs.existsSync(p) ? fs.readFileSync(p, "utf8") : null;
    if (existing === text) return "skip";
    const tmp = p + ".tmp";
    fs.writeFileSync(winPath(tmp), text, "utf8");
    fs.renameSync(winPath(tmp), winPath(p));
    return "ok";
  } catch (e) {
    try {
      fs.writeFileSync(winPath(p), text, "utf8");
      return "ok";
    } catch (e2) {
      writeFails++;
      if (writeFails <= 20) console.warn("WRITE FAIL", p, e2.code || e2.message);
      return "fail";
    }
  }
}

function mkdirp(p) {
  fs.mkdirSync(winPath(p), { recursive: true });
}

function joinField(blocks, field) {
  const parts = blocks.map((b) => String(b[field] || "").trim()).filter(Boolean);
  if (field === "en") {
    const kept = parts.filter((t) => !PENDING.test(t));
    if (!kept.length) return "";
    return kept.join("<br>\n") + "\n";
  }
  if (!parts.length) return "";
  return parts.join("<br>\n") + "\n";
}

let files = 0;
let seifs = 0;
let writeFails = 0;
let skipped = 0;
let written = 0;
const simDirs = fs
  .readdirSync(CM_OUT)
  .filter((n) => /^siman_\d+$/.test(n))
  .sort((a, b) => Number(a.replace("siman_", "")) - Number(b.replace("siman_", "")));
for (const simDir of simDirs) {
  const siman = Number(simDir.replace("siman_", ""));
  if (siman < fromSiman) continue;
  if (siman === fromSiman || siman % 25 === 0 || siman === 427) {
    console.log(`siman ${siman} files=${files} seifs=${seifs} wrote=${written} skip=${skipped} fails=${writeFails}`);
  }
  for (const slug of fs.readdirSync(path.join(CM_OUT, simDir))) {
    if (only && slug !== only) continue;
    const sdir = path.join(CM_OUT, simDir, slug);
    if (!fs.statSync(sdir).isDirectory()) continue;
    const bySeif = new Map();
    for (const fname of fs.readdirSync(sdir).filter((n) => /^part-\d+\.txt$/i.test(n))) {
      files++;
      for (const b of parseBlocks(fs.readFileSync(path.join(sdir, fname), "utf8"))) {
        if (!bySeif.has(b.seif)) bySeif.set(b.seif, []);
        bySeif.get(b.seif).push(b);
      }
    }
    for (const [seif, blocks] of bySeif) {
      const dest = path.join(CORPUS, `siman${siman}`, `seif-${pad3(seif)}`, slug);
      mkdirp(dest);
      const en = joinField(blocks, "en");
      if (en) {
        const r = writeUtf8(path.join(dest, "en.html"), en);
        if (r === "skip") skipped++;
        else if (r === "ok") written++;
      }
      seifs++;
    }
  }
}
console.log(JSON.stringify({ files, seifs, written, skipped, write_fails: writeFails, only: only || "all" }));
