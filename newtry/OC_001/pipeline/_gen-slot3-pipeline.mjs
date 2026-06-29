#!/usr/bin/env node
/** Generate 452-pattern slot3 pipeline files for simanim (export, analyze, hand, merge, apply, run). */
import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const ROOT = path.resolve(__dirname, "..");

const SIMANIM = (process.argv.slice(2).map(Number).filter(Boolean).length
  ? process.argv.slice(2).map(Number).filter(Boolean)
  : [455, 456, 457]);

const TOPICS = {
  455: "mayim shelanu",
  456: "measure of matzah dough",
  457: "challah on matzah dough",
};

const PART1_BASE = [
  "mechaber",
  "mishnah-berurah",
  "machatzit-hashekel",
  "magen-avraham",
  "turei-zahav",
  "beer-hagolah",
  "baer-heitev",
];
const PART2_BASE = ["chok-yaakov", "beur-hagra", "peri-megadim"];
const PART3_BASE = [
  "biur-halacha",
  "ateret-zekenim",
  "chatam-sofer",
  "dagul-merevavah",
  "eliyah-rabbah",
  "eshel-avraham",
  "kaf-hachayyim",
  "levushei-serad",
  "rabbi-akiva-eiger",
  "shaarei-teshuvah",
  "netiv-chayim",
  "yad-ephraim",
  "chokhmat-shlomo",
];

function slugsForSiman(siman) {
  const dir = path.join(ROOT, "output", `siman_${siman}`);
  return fs
    .readdirSync(dir)
    .filter((s) => fs.statSync(path.join(dir, s)).isDirectory())
    .sort();
}

function partsForSlugs(slugs) {
  return {
    PART1: PART1_BASE.filter((s) => slugs.includes(s)),
    PART2: PART2_BASE.filter((s) => slugs.includes(s)),
    PART3: PART3_BASE.filter((s) => slugs.includes(s)),
  };
}

function writeExport(siman) {
  const p = path.join(__dirname, `_export-he${siman}.mjs`);
  const body = `#!/usr/bin/env node
import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";
import { parseBlocksInFile } from "../oc001_block_lib.mjs";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const ROOT = path.resolve(__dirname, "..");
const SIMAN = path.join(ROOT, "output/siman_${siman}");

function keyFor(b) {
  return \`\${b.seif}:\${b.marker || "_"}\`;
}

const out = {};
for (const slug of fs.readdirSync(SIMAN).sort()) {
  const dir = path.join(SIMAN, slug);
  if (!fs.statSync(dir).isDirectory()) continue;
  for (const f of fs.readdirSync(dir).filter((x) => x.endsWith(".txt")).sort()) {
    const raw = fs.readFileSync(path.join(dir, f), "utf8");
    for (const b of parseBlocksInFile(raw)) {
      out[\`\${slug}/\${keyFor(b)}\`] = { he: b.he, en: b.en, file: \`output/siman_${siman}/\${slug}/\${f}\` };
    }
  }
}
const p = path.join(__dirname, "he${siman}-export.json");
fs.writeFileSync(p, JSON.stringify(out, null, 2) + "\\n");
console.log("keys", Object.keys(out).length, "->", p);
`;
  fs.writeFileSync(p, body);
}

function writeAnalyze(siman, parts) {
  const p = path.join(__dirname, `_analyze-bad-mt${siman}.mjs`);
  const body = `#!/usr/bin/env node
import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";
import { isBadMt447 as isBad } from "./lib/bad-mt-447.mjs";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const exp = JSON.parse(fs.readFileSync(path.join(__dirname, "he${siman}-export.json"), "utf8"));

export const PART1 = ${JSON.stringify(parts.PART1)};
export const PART2 = ${JSON.stringify(parts.PART2)};
export const PART3 = ${JSON.stringify(parts.PART3)};

export function partOf(slug) {
  if (PART1.includes(slug)) return 1;
  if (PART2.includes(slug)) return 2;
  if (PART3.includes(slug)) return 3;
  return 0;
}

const stats = { total: 0, bad: 0, good: 0, byPart: { 1: { total: 0, bad: 0 }, 2: { total: 0, bad: 0 }, 3: { total: 0, bad: 0 } } };
const badKeys = { 1: [], 2: [], 3: [] };

for (const [k, v] of Object.entries(exp)) {
  const slug = k.split("/")[0];
  const pn = partOf(slug);
  if (!pn) continue;
  stats.total++;
  stats.byPart[pn].total++;
  if (isBad(v.en)) {
    stats.bad++;
    stats.byPart[pn].bad++;
    badKeys[pn].push(k);
  } else {
    stats.good++;
  }
}

console.log(JSON.stringify(stats, null, 2));
for (const pn of [1, 2, 3]) {
  fs.writeFileSync(
    path.join(__dirname, \`he${siman}-bad-p\${pn}.json\`),
    JSON.stringify(badKeys[pn], null, 2) + "\\n"
  );
  console.log(\`he${siman}-bad-p\${pn}.json\`, badKeys[pn].length);
}
`;
  fs.writeFileSync(p, body);
}

function writeSeed(siman) {
  const topic = TOPICS[siman];
  const p = path.join(__dirname, `_build-hand${siman}-seed.mjs`);
  const body = `#!/usr/bin/env node
import fs from "fs";
import path from "path";
import { fileURLToPath, pathToFileURL } from "url";
import { isBadMt447 as isBad } from "./lib/bad-mt-447.mjs";
import { partOf } from "./_analyze-bad-mt${siman}.mjs";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const exp = JSON.parse(fs.readFileSync(path.join(__dirname, "he${siman}-export.json"), "utf8"));
const handPath = path.join(__dirname, "_hand-en-${siman}.json");
const handJson = fs.existsSync(handPath) ? JSON.parse(fs.readFileSync(handPath, "utf8")) : {};
const mech = await import(pathToFileURL(path.join(__dirname, "mech${siman}-en.mjs")).href);

function sanitizeEn(en) {
  return en
    .replace(/\\bRema:\\s*/g, "{Rama: ")
    .replace(/\\bRama:\\s*Rama:/g, "{Rama:")
    .replace(/(\\{Rama:[^}]+)\\)(?!\\})/g, "$1}")
    .replace(/\\bChametz\\b/g, "chametz")
    .replace(/\\bHametz\\b/g, "chametz")
    .replace(/\\bhametz\\b/gi, "chametz")
    .replace(/\\bchometz\\b/gi, "chametz")
    .replace(/\\bleaven(ing|ed|s)?\\b/gi, (m) => m.replace(/leaven/i, "chametz"))
    .replace(/&quot;/g, '"')
    .replace(/\\bkitniyiot\\b/gi, "kitniyot")
    .replace(/\\bcauldron\\b/gi, "kettle")
    .trim();
}

const parts = { 1: {}, 2: {}, 3: {} };
for (const [k, en] of Object.entries(mech.t || {})) {
  const hk = \`mechaber/\${k}\`;
  const pn = partOf("mechaber");
  if (pn) parts[pn][hk] = en;
}
let fromHand = 0,
  fromSanitize = 0,
  need = 0;
for (const [k, v] of Object.entries(exp)) {
  const pn = partOf(k.split("/")[0]);
  if (!pn) continue;
  if (handJson[k]) {
    parts[pn][k] = handJson[k];
    fromHand++;
    continue;
  }
  let en = v.en || "";
  if (isBad(en)) {
    const s = sanitizeEn(en);
    if (!isBad(s)) {
      parts[pn][k] = s;
      fromSanitize++;
      continue;
    }
    need++;
    continue;
  }
  parts[pn][k] = sanitizeEn(en);
  fromSanitize++;
}
for (const pn of [1, 2, 3]) {
  const out = path.join(__dirname, \`siman${siman}-part\${pn}.json\`);
  fs.writeFileSync(out, JSON.stringify(parts[pn], null, 2) + "\\n");
  console.log(\`siman${siman}-part\${pn}.json\`, Object.keys(parts[pn]).length);
}
console.log("fromHand", fromHand, "fromSanitize", fromSanitize, "still need", need);
`;
  fs.writeFileSync(p, body);
}

function writeMergeHandChunks(siman) {
  const p = path.join(__dirname, `_merge-all-hand${siman}-chunks.mjs`);
  const body = `#!/usr/bin/env node
/** Merge hand${siman}-p{N}-*.mjs chunks into siman${siman}-part{N}.json */
import fs from "fs";
import path from "path";
import { fileURLToPath, pathToFileURL } from "url";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const part = process.argv[2] || "all";

async function mergePart(p) {
  const hand = JSON.parse(fs.readFileSync(path.join(__dirname, \`siman${siman}-part\${p}.json\`), "utf8"));
  const files = fs.readdirSync(__dirname).filter((f) => f.match(new RegExp(\`^hand${siman}-p\${p}-.+\\\\.mjs$\`)));
  let n = 0;
  for (const f of files.sort()) {
    const mod = await import(pathToFileURL(path.join(__dirname, f)).href);
    const h = mod.HAND || mod.t || mod.default || {};
    Object.assign(hand, h);
    n += Object.keys(h).length;
  }
  fs.writeFileSync(path.join(__dirname, \`siman${siman}-part\${p}.json\`), JSON.stringify(hand, null, 2) + "\\n");
  console.log(\`part\${p}: merged \${files.length} chunks, \${Object.keys(hand).length} total keys\`);
}

if (part === "all") {
  for (const p of [1, 2, 3]) await mergePart(p);
} else {
  await mergePart(part);
}
`;
  fs.writeFileSync(p, body);

  for (const pn of [1, 2, 3]) {
    const chunkPath = path.join(__dirname, `hand${siman}-p${pn}-import.mjs`);
    if (!fs.existsSync(chunkPath)) {
      fs.writeFileSync(
        chunkPath,
        `/** hand chunk siman ${siman} part ${pn} — import from _hand-en-${siman}.json at seed; extend here if needed */\nexport const HAND = {};\n`
      );
    }
  }
}

function writeMergeBuildFixes(siman, topic) {
  const citeFile = fs.existsSync(path.join(__dirname, `lib/translate-cite-${siman}.mjs`))
    ? `translate-cite-${siman}`
    : "translate-cite-454";
  const citeExport = fs.existsSync(path.join(__dirname, `lib/translate-cite-${siman}.mjs`))
    ? `translateCite${siman}`
    : "translateCite454";
  const p = path.join(__dirname, `_merge-build-fixes-${siman}.mjs`);
  const body = `#!/usr/bin/env node
/** Merge siman${siman}-part{1,2,3}.json + cite + mechaber → _fixes-siman${siman}-part{1,2,3}.mjs */
import fs from "fs";
import path from "path";
import { fileURLToPath, pathToFileURL } from "url";
import { parseBlocksInFile } from "../oc001_block_lib.mjs";
import { ${citeExport} as translateCite } from "./lib/${citeFile}.mjs";
import { isBadMt447 as isBad } from "./lib/bad-mt-447.mjs";
import { PART1, PART2, PART3 } from "./_analyze-bad-mt${siman}.mjs";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const ROOT = path.resolve(__dirname, "..");

function sanitizeEn(en) {
  return en
    .replace(/\\bRema:\\s*/g, "{Rama: ")
    .replace(/\\bRama:\\s*Rama:/g, "{Rama:")
    .replace(/(\\{Rama:[^}]+)\\)(?!\\})/g, "$1}")
    .replace(/\\bChametz\\b/g, "chametz")
    .replace(/\\bhametz\\b/gi, "chametz")
    .replace(/\\bHametz\\b/g, "chametz")
    .replace(/\\bchometz\\b/gi, "chametz")
    .replace(/\\bleaven(ing|ed|s)?\\b/gi, (m) => m.replace(/leaven/i, "chametz"))
    .replace(/&quot;/g, '"')
    .replace(/\\bkitniyiot\\b/gi, "kitniyot")
    .replace(/\\bcauldron\\b/gi, "kettle")
    .trim();
}

async function loadHand() {
  const mech = await import(pathToFileURL(path.join(__dirname, "mech${siman}-en.mjs")).href);
  const hand = {};
  for (const [k, en] of Object.entries(mech.t || {})) hand[\`mechaber/\${k}\`] = en;
  for (const f of ["siman${siman}-part1.json", "siman${siman}-part2.json", "siman${siman}-part3.json"]) {
    const fp = path.join(__dirname, f);
    if (fs.existsSync(fp)) Object.assign(hand, JSON.parse(fs.readFileSync(fp, "utf8")));
  }
  return hand;
}

function keyFor(b) {
  return \`\${b.seif}:\${b.marker || "_"}\`;
}

function listPartFiles(slug) {
  const dir = path.join(ROOT, \`output/siman_${siman}/\${slug}\`);
  if (!fs.existsSync(dir)) return [];
  return fs
    .readdirSync(dir)
    .filter((f) => f.endsWith(".txt"))
    .sort()
    .map((f) => \`output/siman_${siman}/\${slug}/\${f}\`);
}

function buildPart(slugs, partNum, hand) {
  const fixes = {};
  const missing = [];
  for (const slug of slugs) {
    for (const file of listPartFiles(slug)) {
      const abs = path.join(ROOT, file.replace(/\\//g, path.sep));
      const blocks = parseBlocksInFile(fs.readFileSync(abs, "utf8"));
      fixes[file] = fixes[file] || {};
      for (const b of blocks) {
        const k = keyFor(b);
        const hk = \`\${slug}/\${k}\`;
        let en = hand[hk];
        if (!en && slug === "beer-hagolah") en = translateCite(b.he);
        if (!en) {
          const cur = b.en || "";
          if (!isBad(cur)) en = sanitizeEn(cur);
        }
        if (!en) missing.push(hk);
        else fixes[file][k] = en;
      }
    }
  }
  const outPath = path.join(__dirname, \`_fixes-siman${siman}-part\${partNum}.mjs\`);
  fs.writeFileSync(
    outPath,
    \`/** siman ${siman} part \${partNum} — ${topic} */\\nexport const fixes = \${JSON.stringify(fixes, null, 2)};\\n\`
  );
  return { fixes, missing };
}

const hand = await loadHand();
const r1 = buildPart(PART1, 1, hand);
const r2 = buildPart(PART2, 2, hand);
const r3 = buildPart(PART3, 3, hand);
let n = 0;
for (const f of [r1, r2, r3]) {
  for (const x of Object.values(f.fixes)) n += Object.keys(x).length;
}
console.log("HAND_KEYS", Object.keys(hand).length);
console.log("FIXED", n);
const miss = r1.missing.length + r2.missing.length + r3.missing.length;
console.log("MISSING", miss);
if (r1.missing.length) console.log("MISSING_P1", r1.missing.join(", "));
if (r2.missing.length) console.log("MISSING_P2", r2.missing.join(", "));
if (r3.missing.length) console.log("MISSING_P3", r3.missing.join(", "));
if (miss) process.exit(1);
`;
  fs.writeFileSync(p, body);
}

function writeApply(siman, partNum, topic) {
  const p = path.join(ROOT, `_apply-siman${siman}-slot3-part${partNum}.mjs`);
  const body = `#!/usr/bin/env node
/** worker slot 3 (400-499) — siman ${siman} part ${partNum} (${topic}) */
import fs from "fs";
import { parseBlocksInFile, serializeBlock } from "./oc001_block_lib.mjs";
import { fixes } from "./pipeline/_fixes-siman${siman}-part${partNum}.mjs";

const PREFLIGHT = [];

let total = 0;
const risks = [];
const missing = [];

for (const [rel, blockFixes] of Object.entries(fixes)) {
  const file = rel.replace(/\\//g, "\\\\");
  const raw = fs.readFileSync(file, "utf8");
  const blocks = parseBlocksInFile(raw);
  let n = 0;
  for (const b of blocks) {
    const key = \`\${b.seif}:\${b.marker || "_"}\`;
    if (!blockFixes[key]) missing.push({ file, key });
  }
  const out = blocks
    .map((b) => {
      const key = \`\${b.seif}:\${b.marker || "_"}\`;
      if (blockFixes[key]) {
        n++;
        const en = blockFixes[key];
        for (const re of PREFLIGHT) {
          if (re.test(en)) risks.push({ file, key, pattern: re.source });
        }
        return { ...b, en };
      }
      return b;
    })
    .map(serializeBlock)
    .join("\\n\\n");
  fs.writeFileSync(file, out + (raw.endsWith("\\n") ? "\\n" : ""));
  console.log(file, n, "/", blocks.length);
  total += n;
}

console.log("PART${partNum} TOTAL", total);
if (missing.length) console.log("MISSING_KEYS", JSON.stringify(missing, null, 2));
if (risks.length) console.log("PREFLIGHT_RISKS", JSON.stringify(risks, null, 2));
else console.log("PREFLIGHT_RISKS none");
if (missing.length) process.exit(1);
`;
  fs.writeFileSync(p, body);
}

function writeRunPipeline(siman, topic) {
  const p = path.join(__dirname, `_run-siman${siman}-slot3-pipeline.mjs`);
  const body = `#!/usr/bin/env node
/** Full apply pipeline siman ${siman} (452 pattern): export → seed → hand merge → build fixes → apply 3 parts → bad_mt=0 → progress.log */
import { spawnSync } from "child_process";
import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";
import { parseBlocksInFile } from "../oc001_block_lib.mjs";
import { isBadMt447 as isBad } from "./lib/bad-mt-447.mjs";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const OC_ROOT = path.join(__dirname, "..");
const SIMAN = ${siman};
const pad = String(SIMAN).padStart(3, "0");

function run(script, args = [], cwd = __dirname) {
  const isRoot = script.startsWith("_apply-");
  const full = isRoot ? path.join(OC_ROOT, script) : path.join(__dirname, script);
  console.log(\`\\n>> node \${isRoot ? script : "pipeline/" + script} \${args.join(" ")}\`);
  const r = spawnSync(process.execPath, [full, ...args], { cwd: OC_ROOT, stdio: "inherit" });
  if (r.status !== 0) process.exit(r.status ?? 1);
}

console.log(\`\\n######## siman \${SIMAN} slot3 apply pipeline ########\`);

run("_export-he${siman}.mjs");
run("_analyze-bad-mt${siman}.mjs");
run("_build-hand${siman}-seed.mjs");
run("_merge-all-hand${siman}-chunks.mjs");
run("_merge-build-fixes-${siman}.mjs");

for (let p = 1; p <= 3; p++) {
  run(\`_apply-siman${siman}-slot3-part\${p}.mjs\`);
}

run("_export-he${siman}.mjs");

let total = 0;
let bad = 0;
const dir = path.join(OC_ROOT, "output", \`siman_\${pad}\`);
for (const slug of fs.readdirSync(dir).sort()) {
  const d = path.join(dir, slug);
  if (!fs.statSync(d).isDirectory()) continue;
  for (const f of fs.readdirSync(d).filter((x) => x.endsWith(".txt")).sort()) {
    for (const b of parseBlocksInFile(fs.readFileSync(path.join(d, f), "utf8"))) {
      total++;
      if (isBad(b.en)) bad++;
    }
  }
}
console.log(\`\\nVERIFY siman_\${pad}: total=\${total} bad_mt=\${bad}\`);
if (bad > 0) {
  console.error("bad_mt not zero — abort");
  process.exit(1);
}

const logPath = path.join(OC_ROOT, "progress.log");
const ts = new Date().toISOString().replace(/\\.\\d{3}Z$/, "Z");
const line = \`\${ts} worker-slot-3 siman_\${pad} bad_mt=0 apply-pipeline COMPLETE\\n\`;
const prog = fs.existsSync(logPath) ? fs.readFileSync(logPath, "utf8") : "";
if (!prog.includes(\`siman_\${pad} apply-pipeline COMPLETE\`) && !prog.includes(\`siman_\${pad} COMPLETE\`)) {
  fs.appendFileSync(logPath, line);
}
console.log(\`\\n[COMPLETE] Siman \${SIMAN} — \${total} blocks, bad_mt=0, PREFLIGHT none\`);
`;
  fs.writeFileSync(p, body);
}

for (const siman of SIMANIM) {
  const slugs = slugsForSiman(siman);
  const parts = partsForSlugs(slugs);
  const topic = TOPICS[siman] || "Pesach";
  writeExport(siman);
  writeAnalyze(siman, parts);
  writeSeed(siman);
  writeMergeHandChunks(siman);
  writeMergeBuildFixes(siman, topic);
  for (const pn of [1, 2, 3]) writeApply(siman, pn, topic);
  writeRunPipeline(siman, topic);
  console.log(`generated slot3 pipeline for siman ${siman}`);
}

const combined = `#!/usr/bin/env node
/** Run slot3 apply pipelines for simanim ${SIMANIM.join(", ")} */
import { spawnSync } from "child_process";
import path from "path";
import { fileURLToPath } from "url";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const OC = path.join(__dirname, "..");

for (const s of [${SIMANIM.join(", ")}]) {
  console.log("\\n========== siman " + s + " ==========");
  const r = spawnSync(process.execPath, [path.join(__dirname, \`_run-siman\${s}-slot3-pipeline.mjs\`)], {
    cwd: OC,
    stdio: "inherit",
  });
  if (r.status !== 0) process.exit(r.status ?? 1);
}
console.log("\\n[COMPLETE] Session done — simanim: ${SIMANIM.join(", ")}");
`;
fs.writeFileSync(path.join(__dirname, `_run-simanim-${SIMANIM.join("-")}-slot3.mjs`), combined);
console.log("wrote", `_run-simanim-${SIMANIM.join("-")}-slot3.mjs`);
