/**
 * Quality-check CM corpus MT-fix replies vs worksheets.
 *   node qa_cm1_corpus_mt_replies.mjs --replies <dir> --worksheets <dir>
 */
import fs from "fs";
import path from "path";

const args = process.argv.slice(2);
function arg(name, def = null) {
  const i = args.indexOf(name);
  return i >= 0 ? args[i + 1] : def;
}
const repliesDir = arg("--replies");
const worksheetsDir = arg("--worksheets");

const DIRTY_RE =
  /\bthe Lord\b|Lord['\u2019]s Prayer|Hashem['\u2019]s Word|Hashem['\u2019]s people|Hashem['\u2019]s Son|\bPassover\b|\bPsalms?\b|\bthe Bible\b|\bYahweh\b|\bbaptis|\bbaptiz|Capernaum|Abu Dhabi|New Testament|\bchurch(?:es)?\b|crucifix|\bislam(?:ic)?\b|koran|qur['\u2019]?an|gospel|vatican|trinity|Magdalene|English translation pending|MYMEMORY|click here|Shield of Abraham|Golden Rows/i;
const HEBREW_LEAK = /[\u0590-\u05FF]{2,}/;
const DASH = /[\u2013\u2014]|--/;
const ID_KEYS = ["slug", "siman", "seif", "corpus_en_path"];

function walk(d, pred) {
  const out = [];
  function rec(p) {
    for (const e of fs.readdirSync(p, { withFileTypes: true })) {
      const fp = path.join(p, e.name);
      if (e.isDirectory()) rec(fp);
      else if (pred(e.name, fp)) out.push(fp);
    }
  }
  rec(d);
  return out.sort();
}

function stripTags(s) {
  return String(s || "")
    .replace(/<[^>]+>/g, " ")
    .replace(/&[a-z]+;/gi, " ")
    .replace(/\s+/g, " ")
    .trim();
}

const wsFiles = walk(worksheetsDir, (n) => n.endsWith(".json") && n.startsWith("cm1_"));
const replyFiles = walk(repliesDir, (n, fp) => /\.reply\.json$/i.test(n) && !/example/i.test(fp));
const wsBy = new Map();
for (const f of wsFiles) wsBy.set(path.basename(f).replace(/\.json$/i, ""), JSON.parse(fs.readFileSync(f, "utf8")));

const issues = [];
function issue(sev, rec) {
  issues.push({ sev, ...rec });
}

let parts = 0;
let ok = 0;
const samples = [];

for (const f of replyFiles) {
  const base = path.basename(f).replace(/\.reply\.json$/i, "");
  let j;
  try {
    j = JSON.parse(fs.readFileSync(f, "utf8"));
  } catch (e) {
    issue("fail", { file: path.basename(f), reason: "bad json " + e.message });
    continue;
  }
  const ws = wsBy.get(base);
  if (!ws) {
    issue("fail", { file: path.basename(f), reason: "no matching worksheet" });
    continue;
  }
  if ((ws.parts || []).length !== (j.parts || []).length) {
    issue("fail", {
      file: path.basename(f),
      reason: `parts length ws=${ws.parts.length} reply=${(j.parts || []).length}`,
    });
  }
  const n = Math.max(ws.parts?.length || 0, j.parts?.length || 0);
  for (let i = 0; i < n; i++) {
    parts++;
    const w = ws.parts?.[i] || {};
    const p = j.parts?.[i] || {};
    const en = typeof p.new_en === "string" ? p.new_en.trim() : "";
    const he = String(w.hebrew || p.hebrew || "");
    const old = String(w.en_current || "");
    if (!en) {
      issue("fail", { file: path.basename(f), part_index: i, siman: w.siman, seif: w.seif, reason: "empty new_en" });
      continue;
    }
    const mismatches = ID_KEYS.filter((k) => w[k] != null && p[k] != null && String(w[k]) !== String(p[k]));
    if (mismatches.length) {
      issue("fail", { file: path.basename(f), part_index: i, reason: "identity: " + mismatches.join(",") });
    }
    if (p.action && !/retranslate/i.test(String(p.action))) {
      issue("warn", { file: path.basename(f), part_index: i, reason: "action=" + p.action });
    }
    const dirty = en.match(DIRTY_RE);
    if (dirty) {
      issue("fail", {
        file: path.basename(f),
        part_index: i,
        siman: w.siman,
        seif: w.seif,
        reason: "dirty:" + dirty[0],
        preview: en.slice(0, 160),
      });
    }
    if (HEBREW_LEAK.test(en)) {
      issue("fail", { file: path.basename(f), part_index: i, siman: w.siman, seif: w.seif, reason: "hebrew_leak" });
    }
    if (DASH.test(en)) {
      issue("warn", { file: path.basename(f), part_index: i, siman: w.siman, seif: w.seif, reason: "dash" });
    }
    const hePlain = stripTags(he);
    const enPlain = stripTags(en);
    if (hePlain.length > 80 && enPlain.length < hePlain.length * 0.25) {
      issue("warn", {
        file: path.basename(f),
        part_index: i,
        siman: w.siman,
        seif: w.seif,
        reason: `short_en he=${hePlain.length} en=${enPlain.length}`,
        preview: enPlain.slice(0, 140),
      });
    }
    const oldPlain = stripTags(old).slice(0, 120);
    if (oldPlain.length > 40 && enPlain.toLowerCase().includes(oldPlain.toLowerCase().slice(0, 60))) {
      issue("warn", {
        file: path.basename(f),
        part_index: i,
        siman: w.siman,
        seif: w.seif,
        reason: "echoes_en_current",
      });
    }
    const heB = (he.match(/<b>/gi) || []).length;
    const enB = (en.match(/<b>/gi) || []).length;
    if (heB && !enB) {
      issue("warn", {
        file: path.basename(f),
        part_index: i,
        siman: w.siman,
        seif: w.seif,
        reason: `missing_b_lemma he_b=${heB}`,
      });
    }
    if (samples.length < 12 || (w.siman === 10 && w.seif === 2)) {
      samples.push({
        file: path.basename(f),
        part_index: i,
        siman: w.siman,
        seif: w.seif,
        he: hePlain.slice(0, 280),
        en: enPlain.slice(0, 280),
      });
    }
    ok++;
  }
}

const bySev = { fail: 0, warn: 0 };
for (const x of issues) bySev[x.sev] = (bySev[x.sev] || 0) + 1;
const out = {
  worksheets: wsFiles.length,
  reply_files: replyFiles.length,
  parts,
  ok_nonempty: ok,
  fail: bySev.fail || 0,
  warn: bySev.warn || 0,
  issues: issues.slice(0, 80),
  samples,
};
console.log(JSON.stringify(out, null, 2));
fs.writeFileSync(
  path.join("C:/Users/binya/Documents/shulchan-aruch-clean - Copy (2)/newtry/SA_Rebuild/CM_cleanup/qa_bh_k001-k005.json"),
  JSON.stringify({ ...out, issues }, null, 2)
);
