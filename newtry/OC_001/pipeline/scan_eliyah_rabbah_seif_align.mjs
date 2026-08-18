/**
 * Match Eliyah Rabbah dibbur-hamatchil lemmas to Mechaber/Rama seif text.
 * ER note numbers ([א],[ב],…) were often stored as seif N, which is not
 * the Mechaber seif.
 *
 *   node scan_eliyah_rabbah_seif_align.mjs
 *   node scan_eliyah_rabbah_seif_align.mjs --siman 1
 */
import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const OC_OUT = path.resolve(__dirname, "../output");
const AUDIT = path.resolve(__dirname, "../../SA_Rebuild/audit");

const onlySiman = (() => {
  const i = process.argv.indexOf("--siman");
  return i >= 0 ? Number(process.argv[i + 1]) : null;
})();

const BLOCK_RE = /^\*{4}\s*OC001 SOURCE BLOCK\s*\*{4}\s*$/m;

function stripHtml(s) {
  return String(s || "")
    .replace(/<script[\s\S]*?<\/script>/gi, " ")
    .replace(/<style[\s\S]*?<\/style>/gi, " ")
    .replace(/<[^>]+>/g, " ")
    .replace(/&quot;/g, '"')
    .replace(/&amp;/g, "&")
    .replace(/&nbsp;/g, " ")
    .replace(/\s+/g, " ")
    .trim();
}

function normHe(s) {
  return stripHtml(s)
    .replace(/[\u0591-\u05C7]/g, "")
    .replace(/[״"׳']/g, "")
    .replace(/[^\u0590-\u05FF\s]/g, " ")
    .replace(/\s+/g, " ")
    .trim();
}

function parseBlocks(raw) {
  const text = String(raw).replace(/\r\n/g, "\n");
  const parts = text.split(BLOCK_RE);
  const blocks = [];
  for (let i = 1; i < parts.length; i++) {
    const seg = parts[i];
    const seif = Number((seg.match(/^seif:\s*(\d+)/m) || [])[1] || 0);
    const heM = seg.match(/\*{4}\s*HEBREW\s*\*{4}\r?\n?([\s\S]*?)\*{4}\s*ENGLISH\s*\*{4}/);
    const he = heM ? heM[1] : "";
    blocks.push({ seif, he, heNorm: normHe(he) });
  }
  return blocks;
}

function extractLemma(he) {
  const bold = he.match(/<b>([\s\S]*?)<\/b>/i);
  let raw = bold ? stripHtml(bold[1]) : "";
  if (!raw) {
    const m = stripHtml(he).match(/^\[[^\]]+\]\s*(.+?)(?:\.|$)/);
    raw = m ? m[1] : "";
  }
  raw = raw.replace(/וכו['׳]?\s*$/g, "").replace(/[.:;,]+$/g, "").trim();
  return raw;
}

function lemmaTokens(lemma) {
  return normHe(lemma)
    .split(" ")
    .filter((w) => w.length >= 2 && !/^(וכו|כו|הגה|עיין|שם)$/.test(w));
}

function seifContainsTokens(heNorm, tokens) {
  if (!tokens.length || !heNorm) return { hit: false, score: 0 };
  let found = 0;
  let last = -1;
  for (const t of tokens) {
    const idx = heNorm.indexOf(t, last + 1);
    if (idx === -1) {
      if (heNorm.includes(t)) found += 0.4;
      continue;
    }
    found += 1;
    last = idx;
  }
  return { hit: found >= Math.min(tokens.length, Math.max(1, tokens.length - 1)) && found > 0, score: found / tokens.length };
}

function loadSimanMechaber(simDir) {
  const d = path.join(OC_OUT, simDir, "mechaber");
  if (!fs.existsSync(d)) return [];
  const files = fs.readdirSync(d).filter((n) => /^part-\d+\.txt$/i.test(n)).sort();
  const out = [];
  for (const f of files) out.push(...parseBlocks(fs.readFileSync(path.join(d, f), "utf8")));
  return out;
}

function loadSimanER(simDir) {
  const d = path.join(OC_OUT, simDir, "eliyah-rabbah");
  if (!fs.existsSync(d)) return [];
  const files = fs.readdirSync(d).filter((n) => /^part-\d+\.txt$/i.test(n)).sort();
  const out = [];
  for (const f of files) {
    const blocks = parseBlocks(fs.readFileSync(path.join(d, f), "utf8"));
    for (const b of blocks) out.push({ ...b, part_file: f });
  }
  return out;
}

const rows = [];
const simDirs = fs
  .readdirSync(OC_OUT)
  .filter((n) => /^siman_\d+$/.test(n))
  .sort((a, b) => Number(a.slice(6)) - Number(b.slice(6)));

for (const simDir of simDirs) {
  const siman = Number(simDir.replace("siman_", ""));
  if (onlySiman && siman !== onlySiman) continue;
  const mech = loadSimanMechaber(simDir);
  const ers = loadSimanER(simDir);
  if (!ers.length) continue;
  const mechBySeif = new Map();
  for (const m of mech) {
    const prev = mechBySeif.get(m.seif) || { seif: m.seif, heNorm: "" };
    prev.heNorm = (prev.heNorm + " " + m.heNorm).trim();
    mechBySeif.set(m.seif, prev);
  }
  const mechList = [...mechBySeif.values()];

  for (const er of ers) {
    const lemma = extractLemma(er.he);
    const tokens = lemmaTokens(lemma);
    const assigned = mechBySeif.get(er.seif);
    const assignedScore = assigned ? seifContainsTokens(assigned.heNorm, tokens).score : 0;
    const assignedHit = assigned ? seifContainsTokens(assigned.heNorm, tokens).hit : false;

    let best = { seif: null, score: 0 };
    const hits = [];
    for (const m of mechList) {
      const r = seifContainsTokens(m.heNorm, tokens);
      if (r.score > 0) hits.push({ seif: m.seif, score: r.score, hit: r.hit });
      if (r.score > best.score) best = { seif: m.seif, score: r.score };
    }
    hits.sort((a, b) => b.score - a.score || a.seif - b.seif);
    const uniqueStrong = hits.filter((h) => h.score >= 0.7);
    let status = "ok";
    let suggested = er.seif;
    if (!tokens.length) status = "no_lemma";
    else if (assignedHit && assignedScore >= 0.7) status = "ok";
    else if (uniqueStrong.length === 1 && uniqueStrong[0].seif !== er.seif) {
      status = "misaligned";
      suggested = uniqueStrong[0].seif;
    } else if (!assignedHit && uniqueStrong.length > 1) {
      status = "ambiguous_wrong_assigned";
      suggested = uniqueStrong[0].seif;
    } else if (!assignedHit && best.seif && best.seif !== er.seif && best.score >= 0.5) {
      status = "likely_misaligned";
      suggested = best.seif;
    } else if (!assignedHit && best.score < 0.4) status = "unmatched";

    rows.push({
      siman,
      assigned_seif: er.seif,
      suggested_seif: suggested,
      status,
      lemma,
      assigned_score: Number(assignedScore.toFixed(2)),
      best_seif: best.seif,
      best_score: Number(best.score.toFixed(2)),
      hits: hits.slice(0, 4),
      part_file: er.part_file,
    });
  }
}

const mis = rows.filter((r) => r.status === "misaligned" || r.status === "likely_misaligned" || r.status === "ambiguous_wrong_assigned");
const bySiman = new Map();
for (const r of mis) {
  if (!bySiman.has(r.siman)) bySiman.set(r.siman, []);
  bySiman.get(r.siman).push(r);
}

const summary = {
  scanned_blocks: rows.length,
  ok: rows.filter((r) => r.status === "ok").length,
  misaligned: rows.filter((r) => r.status === "misaligned").length,
  likely_misaligned: rows.filter((r) => r.status === "likely_misaligned").length,
  ambiguous_wrong_assigned: rows.filter((r) => r.status === "ambiguous_wrong_assigned").length,
  unmatched: rows.filter((r) => r.status === "unmatched").length,
  no_lemma: rows.filter((r) => r.status === "no_lemma").length,
  simanim_with_misalign: [...bySiman.keys()].sort((a, b) => a - b),
};

fs.mkdirSync(AUDIT, { recursive: true });
const jsonPath = path.join(AUDIT, "oc1_eliyah_rabbah_seif_align.json");
const mdPath = path.join(AUDIT, "oc1_eliyah_rabbah_seif_align.md");
fs.writeFileSync(jsonPath, JSON.stringify({ summary, rows }, null, 2));

let md = `# OC1 Eliyah Rabbah seif alignment\n\n`;
md += `- scanned: ${summary.scanned_blocks}\n- ok: ${summary.ok}\n- misaligned: ${summary.misaligned}\n- likely: ${summary.likely_misaligned}\n- ambiguous (assigned missing): ${summary.ambiguous_wrong_assigned}\n- unmatched: ${summary.unmatched}\n- no lemma: ${summary.no_lemma}\n\n`;
md += `## Siman 1 detail (user report: OC 1:6)\n\n`;
for (const r of rows.filter((x) => x.siman === 1)) {
  md += `- assigned ${r.assigned_seif} → ${r.suggested_seif} [${r.status}] lemma: ${r.lemma}\n`;
}
md += `\n## Misaligned by siman\n\n`;
for (const siman of [...bySiman.keys()].sort((a, b) => a - b)) {
  md += `### Siman ${siman}\n`;
  for (const r of bySiman.get(siman)) {
    md += `- ER seif ${r.assigned_seif} should be Mechaber ${r.suggested_seif} (${r.status}) — “${r.lemma}”\n`;
  }
  md += `\n`;
}
fs.writeFileSync(mdPath, md);
console.log(JSON.stringify({ ...summary, json: jsonPath, md: mdPath }, null, 2));
