#!/usr/bin/env node
/** Translate only audit-failing blocks in hand-slot14-siman-NNN.json via claude --print */
import fs from "fs";
import path from "path";
import { spawnSync } from "child_process";
import { fileURLToPath } from "url";
import { parseBlocksInFile } from "../oc001_block_lib.mjs";
import { autoFix, preflightFail } from "./_slot14-lib.mjs";
import { runBlockQualityChecks, maxSeverity, SEVERITY } from "./lib/quality-checks.mjs";

const siman = Number(process.argv[2]);
const __dirname = path.dirname(fileURLToPath(import.meta.url));
const OC_ROOT = path.join(__dirname, "..");
const OUT = path.join(OC_ROOT, "output");
const handPath = path.join(__dirname, "work", `hand-slot14-siman-${siman}.json`);

if (!fs.existsSync(handPath)) {
  console.error("missing", handPath);
  process.exit(1);
}

const hand = JSON.parse(fs.readFileSync(handPath, "utf8"));
const need = [];
for (const it of hand.items) {
  const fp = path.join(OUT, `siman_${siman}`, it.rel);
  const blocks = parseBlocksInFile(fs.readFileSync(fp, "utf8"));
  const b = blocks.find(
    (x) =>
      String(x.seif) === String(it.seif) &&
      String(x.marker || "_") === String(it.marker || "_")
  );
  let en = it.en || autoFix(b?.en ?? it.enBad ?? "", it.marker, it.he || "");
  const pf = preflightFail(en);
  const issues = runBlockQualityChecks({
    slug: it.slug,
    seif: it.seif,
    marker: it.marker,
    he: it.he,
    en,
  });
  const sev = maxSeverity(issues);
  if (pf || sev >= SEVERITY.warn) {
    it.en = "";
    need.push(it);
  }
}

if (!need.length) {
  console.log("siman", siman, "no blocks need translation");
  process.exit(0);
}

const BATCH = 4;
const SYSTEM = `You translate Shulchan Aruch Orach Chayim siman ${siman} from Hebrew to English.

MANDATORY RULES:
- Translate EVERY word. No omissions, no summarizing, no paraphrasing.
- Output ONLY the translation. No labels, headers, notes.
- Halachic terms: melacha, Tisha B'Av, beit kenesset, l'chatchila, b'dieved, d'oraisa, d'rabbanan, etc.
- Commentator names exactly: Magen Avraham, Taz, Beit Yosef, Rambam, Mishna Berurah, Bach, Gra, etc.
- Expand ALL Hebrew abbreviations in English.
- Rama glosses in Hebrew: {Rama: ...} with curly braces only.
- Note markers (א) (ב) etc. at start when Hebrew has them.
- Arabic numerals for siman/seif references.
- Translate Aramaic fully into English.

FORBIDDEN: Lord/God (use Hashem if needed), Capernaum, Lord's Prayer, Shield of Abraham, work/craft for melacha, hand recoils, first dish, allocated, Saturday, &quot;, repeated duplicate phrases.

Return ONLY valid JSON object: keys → English strings. No markdown fences.`;

function claudeJson(user) {
  const r = spawnSync(
    "claude",
    ["--print", "--permission-mode", "acceptEdits", `${SYSTEM}\n\n${user}`],
    { encoding: "utf8", timeout: 600000, cwd: OC_ROOT }
  );
  if (r.status !== 0) throw new Error((r.stderr || r.stdout || "claude failed").slice(0, 1200));
  let t = (r.stdout || "").trim();
  t = t.replace(/^```json?\n?/i, "").replace(/\n?```$/i, "").trim();
  return JSON.parse(t);
}

let done = 0;
for (let i = 0; i < need.length; i += BATCH) {
  const batch = need.slice(i, i + BATCH);
  const payload = {};
  for (const it of batch) payload[it.key] = it.hePlain || it.he;
  process.stdout.write(
    `siman ${siman} batch ${Math.floor(i / BATCH) + 1}/${Math.ceil(need.length / BATCH)} (${batch.length}) … `
  );
  const out = claudeJson(
    `Translate these ${batch.length} blocks. Keys are seif:marker.\n${JSON.stringify(payload, null, 2)}`
  );
  for (const it of batch) {
    if (!out[it.key]) throw new Error(`missing key: ${it.key}`);
    it.en = String(out[it.key]).trim();
    done++;
  }
  fs.writeFileSync(handPath, JSON.stringify(hand, null, 2) + "\n", "utf8");
  console.log("ok");
}
console.log("translated", done, "blocks for siman", siman);
