/**
 * Apply EH1 cleanup kit replies → corpus en.html.
 *
 *   node apply_eh1_cleanup_replies.mjs --replies <dir>
 *   node apply_eh1_cleanup_replies.mjs --replies <dir> --sync-source
 */
import fs from "fs";
import path from "path";
import { fileURLToPath, pathToFileURL } from "url";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const TOOLS = path.resolve(__dirname, "../../OC_Mobile/oc318-mobile-reader/tools");
const { GARBAGE_RE, hebrewLeakRuns, stripTags } = await import(
  pathToFileURL(path.join(TOOLS, "provenance-config.mjs")).href
);

const args = process.argv.slice(2);
function arg(name, def = null) {
  const i = args.indexOf(name);
  return i >= 0 ? args[i + 1] : def;
}
const repliesDir = arg("--replies");
const doSync = args.includes("--sync-source");
const kitIndex = path.join(__dirname, "gpt_kit_eh1_cleanup/INDEX.json");
const EH_OUT = path.resolve(__dirname, "../../EH_001/output");
const CORPUS = path.resolve(
  __dirname,
  "../../OC_Mobile/oc318-mobile-reader/public/corpus/eh1"
);

const RESIDUAL =
  /\bthe Lord\b|\bYahweh\b|\bthe Bible\b|\bPsalms?\b|\bPassover\b|\bbaptis(?:m|t|mal|ms)?\b|\bbaptiz(?:e|ed|es|ing)?\b|hashem[''']?s\s+(?:word|people)|crucifix|\bislam(?:ic)?\b|koran|qur['']?an/i;

function pad3(n) {
  return String(n).padStart(3, "0");
}
function plain(h) {
  return stripTags(String(h || ""))
    .replace(/\s+/g, " ")
    .trim();
}
function synthesizeCorpusEnPath(siman, seif, slug) {
  if (siman == null || seif == null || !slug) return null;
  return path.join(CORPUS, `siman${Number(siman)}`, `seif-${pad3(seif)}`, slug, "en.html");
}
function getSourceEnglish(siman, seif, slug) {
  const dir = path.join(EH_OUT, `siman_${pad3(siman)}`, slug);
  if (!fs.existsSync(dir)) return null;
  let seifText = "";
  for (const fname of fs.readdirSync(dir).filter((n) => /^part-\d+\.txt$/i.test(n)).sort()) {
    const text = fs.readFileSync(path.join(dir, fname), "utf8");
    for (const part of text.split(/(?=\*{4}\s)/)) {
      const sm = part.match(/^seif:\s*(\d+)/m);
      const em = part.match(/\*{4}\s*ENGLISH\s*\*{4}([\s\S]*?)\*{4}\s*END BLOCK\s*\*{4}/);
      if (sm && em && Number(sm[1]) === Number(seif)) seifText += em[1].trim() + "\n";
    }
  }
  return seifText.trim() || null;
}

if (!repliesDir || !fs.existsSync(repliesDir)) {
  console.error("Required: --replies <dir>");
  process.exit(1);
}

const files = [];
function collectJson(d) {
  for (const e of fs.readdirSync(d, { withFileTypes: true })) {
    const p = path.join(d, e.name);
    if (e.isDirectory()) collectJson(p);
    else if (/\.reply\.json$/i.test(e.name)) files.push(p);
  }
}
collectJson(repliesDir);

let ok = 0;
let fail = 0;
const report = [];

for (const f of files) {
  let j;
  try {
    j = JSON.parse(fs.readFileSync(f, "utf8"));
  } catch (e) {
    fail++;
    report.push({ file: path.basename(f), status: "fail", reason: "bad json: " + e.message });
    continue;
  }
  const slug = j.slug;
  for (const p of j.parts || []) {
    const action = p.action || p.decision || "";
    if (action && !/retranslate/i.test(String(action))) {
      report.push({ file: path.basename(f), part_index: p.part_index, status: "skipped", reason: action });
      continue;
    }
    const pathEmpty = !(p.corpus_en_path && String(p.corpus_en_path).trim());
    const dest =
      (pathEmpty ? null : p.corpus_en_path) ||
      synthesizeCorpusEnPath(p.siman, p.seif, p.slug || slug);
    const en = typeof p.new_en === "string" ? p.new_en.trim() : "";
    if (!dest || !en) {
      fail++;
      report.push({
        file: path.basename(f),
        part_index: p.part_index,
        status: "fail",
        reason: "missing path or new_en",
        path_empty_in_reply: pathEmpty,
      });
      continue;
    }
    if (!fs.existsSync(path.dirname(dest))) {
      fail++;
      report.push({
        file: path.basename(f),
        part_index: p.part_index,
        status: "fail",
        reason: "dest dir missing",
        dest,
      });
      continue;
    }
    const out = en.endsWith("\n") ? en : en + "\n";
    fs.writeFileSync(dest, out, "utf8");
    const pl = plain(out);
    const still =
      RESIDUAL.test(pl) || GARBAGE_RE.test(pl) || hebrewLeakRuns(pl).length > 0;
    ok++;
    report.push({
      file: path.basename(f),
      part_index: p.part_index,
      siman: p.siman,
      seif: p.seif,
      slug: p.slug || slug,
      status: still ? "wrote_but_still_flags" : "ok",
      path_was_empty_in_reply: pathEmpty,
      dest,
    });
  }
}

if (doSync && fs.existsSync(kitIndex)) {
  const idx = JSON.parse(fs.readFileSync(kitIndex, "utf8"));
  const seen = new Set();
  for (const s of idx.sync_rows || []) {
    const key = `${s.commentator}|${s.siman}|${s.seif}`;
    if (seen.has(key)) continue;
    seen.add(key);
    const dest =
      (s.corpus_en_path && String(s.corpus_en_path).trim()) ||
      synthesizeCorpusEnPath(s.siman, s.seif, s.commentator);
    const en = getSourceEnglish(s.siman, s.seif, s.commentator);
    if (!en || !dest || !fs.existsSync(path.dirname(dest))) {
      fail++;
      report.push({ status: "sync_fail", reason: !en ? "no source en" : "no corpus path", ...s, dest });
      continue;
    }
    fs.writeFileSync(dest, en.endsWith("\n") ? en : en + "\n", "utf8");
    ok++;
    report.push({
      status: "synced_from_source",
      siman: s.siman,
      seif: s.seif,
      commentator: s.commentator,
      dest,
    });
  }
}

const outReport = path.join(__dirname, "../audit/eh1_cleanup_apply_report.json");
fs.mkdirSync(path.dirname(outReport), { recursive: true });
fs.writeFileSync(outReport, JSON.stringify({ ok, fail, report }, null, 2));
console.log("ok", ok, "fail", fail);
console.log("report", outReport);
const still = report.filter((r) => r.status === "wrote_but_still_flags").length;
if (still) console.warn(`warning: ${still} parts still flag after write`);
