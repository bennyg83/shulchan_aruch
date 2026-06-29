#!/usr/bin/env node
/**
 * Fix bad_mt in simanim 510–600: apply existing hand FIXES, then Google MT + safe sanitize.
 * Do NOT use slot14 batches for 551/545 — MT + hand sources only.
 * Usage:
 *   node pipeline/_fix-bad-mt-510-600.mjs apply-hand
 *   node pipeline/_fix-bad-mt-510-600.mjs mt [start] [limit]
 *   node pipeline/_fix-bad-mt-510-600.mjs verify
 *   node pipeline/_fix-bad-mt-510-600.mjs export-remainders
 */
import fs from "fs";
import path from "path";
import { fileURLToPath, pathToFileURL } from "url";
import { parseBlocksInFile, serializeBlock } from "../oc001_block_lib.mjs";
import { isBadMt447 } from "./lib/bad-mt-447.mjs";
import { plainFromHtml } from "./lib/quality-checks.mjs";
import { translateCite454 } from "./lib/translate-cite-454.mjs";
import { preflightFail } from "./_slot18-lib.mjs";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const ROOT = path.join(__dirname, "..");
const OUT = path.join(ROOT, "output");
const WORK = path.join(__dirname, "work");
const MIN = 510;
const MAX = 600;

const GOOGLE_URL =
  "https://translate.googleapis.com/translate_a/single?client=gtx&sl=iw&tl=en&dt=t";

const HAND_MODULES = [
  "_siman545-hand-en.mjs",
  "_siman586-hand-en.mjs",
  "_fixes-siman591-600-remnant.mjs",
  "_remnants-581-590.mjs",
  "_siman580-hand-en.mjs",
  "_siman581-hand-en.mjs",
  "_siman582-hand-en.mjs",
  "_siman585-hand-en.mjs",
  "_siman587-hand-en.mjs",
  "_siman588-hand-en.mjs",
  "_siman589-hand-en.mjs",
  "_siman590-hand-en.mjs",
  "mech551-en.mjs",
  "mech527-en.mjs",
  "mech548-en.mjs",
];

function sleep(ms) {
  return new Promise((r) => setTimeout(r, ms));
}

function blockKey(seif, marker) {
  return `${seif}:${marker || "_"}`;
}

function normalizeRel(siman, rel) {
  let r = rel.replace(/\\/g, "/");
  const prefix = `siman_${String(siman).padStart(3, "0")}/`;
  if (r.startsWith(prefix)) r = r.slice(prefix.length);
  if (!r.includes("/") && r.endsWith(".txt")) return r;
  if (!r.includes("/")) return `${r}/part-001.txt`;
  return r;
}

/** siman -> rel -> blockKey -> en */
async function loadAllHand() {
  const bySiman = {};
  const ingestFixes = (siman, fixes) => {
    const s = String(siman).padStart(3, "0");
    bySiman[s] = bySiman[s] || {};
    for (const [rel, blocks] of Object.entries(fixes)) {
      const m = rel.match(/^siman_(\d{3})\/(.+)$/);
      const sim = m ? m[1] : s;
      const r = m ? m[2] : normalizeRel(sim, rel);
      bySiman[sim] = bySiman[sim] || {};
      bySiman[sim][r] = { ...(bySiman[sim][r] || {}), ...blocks };
    }
  };

  for (const mod of HAND_MODULES) {
    const fp = path.join(__dirname, mod);
    if (!fs.existsSync(fp)) continue;
    try {
      const m = await import(pathToFileURL(fp).href);
      if (m.FIXES_BY_SIMAN) {
        for (const [sim, fixes] of Object.entries(m.FIXES_BY_SIMAN)) {
          ingestFixes(sim, fixes);
        }
      }
      if (m.FIXES) {
        for (const [rel, blocks] of Object.entries(m.FIXES)) {
          const m2 = rel.match(/^siman_(\d{3})\/(.+)$/);
          if (m2) ingestFixes(m2[1], { [m2[2]]: blocks });
          else {
            const simFromMod = (mod.match(/(\d{3})/) || [])[1];
            if (simFromMod && Number(simFromMod) >= MIN && Number(simFromMod) <= MAX) {
              ingestFixes(simFromMod, { [normalizeRel(simFromMod, rel)]: blocks });
            }
          }
        }
      }
      if (m.t && mod.includes("mech")) {
        const sim = (mod.match(/(\d{3})/) || [])[1];
        if (sim) {
          bySiman[sim] = bySiman[sim] || {};
          bySiman[sim]["mechaber/part-001.txt"] = {
            ...(bySiman[sim]["mechaber/part-001.txt"] || {}),
            ...m.t,
          };
        }
      }
    } catch (e) {
      console.warn("skip", mod, e.message);
    }
  }

  for (let s = MIN; s <= MAX; s++) {
    const jp = path.join(__dirname, `_hand-en-${s}.json`);
    if (!fs.existsSync(jp)) continue;
    const pad = String(s).padStart(3, "0");
    const obj = JSON.parse(fs.readFileSync(jp, "utf8"));
    bySiman[pad] = bySiman[pad] || {};
    for (const [hk, en] of Object.entries(obj)) {
      if (!en || typeof en !== "string") continue;
      const [slug, sk] = hk.split("/");
      const rel = `${slug}/part-001.txt`;
      bySiman[pad][rel] = bySiman[pad][rel] || {};
      bySiman[pad][rel][sk] = en;
    }
  }

  return bySiman;
}

function collectBadBlocks() {
  const items = [];
  for (let s = MIN; s <= MAX; s++) {
    const pad = String(s).padStart(3, "0");
    const dir = path.join(OUT, `siman_${pad}`);
    if (!fs.existsSync(dir)) continue;
    for (const slug of fs.readdirSync(dir).sort()) {
      const d = path.join(dir, slug);
      if (!fs.statSync(d).isDirectory()) continue;
      for (const f of fs.readdirSync(d).filter((x) => x.endsWith(".txt")).sort()) {
        const fp = path.join(d, f);
        const rel = `${slug}/${f}`;
        for (const b of parseBlocksInFile(fs.readFileSync(fp, "utf8"))) {
          if (isBadMt447(b.en)) {
            items.push({
              siman: s,
              pad,
              slug,
              rel,
              fp,
              seif: b.seif,
              marker: b.marker || "_",
              key: blockKey(b.seif, b.marker),
              he: b.he,
              hePlain: plainFromHtml(b.he),
              en: b.en,
            });
          }
        }
      }
    }
  }
  return items;
}

function applyEnToFile(fp, key, en) {
  const raw = fs.readFileSync(fp, "utf8");
  const blocks = parseBlocksInFile(raw);
  const out = blocks
    .map((b) => {
      const k = blockKey(b.seif, b.marker);
      return k === key ? { ...b, en } : b;
    })
    .map(serializeBlock)
    .join("\n\n");
  fs.writeFileSync(fp, out + (raw.endsWith("\n") ? "\n" : ""));
}

async function translateChunk(text) {
  const q = encodeURIComponent(text);
  const url = `${GOOGLE_URL}&q=${q}`;
  for (let i = 0; i < 4; i++) {
    const res = await fetch(url, { signal: AbortSignal.timeout(90000) });
    if (res.status === 429) {
      await sleep(5000 * (i + 1));
      continue;
    }
    if (!res.ok) throw new Error(`HTTP ${res.status}`);
    const data = await res.json();
    return (data[0] || []).map((x) => x[0]).join("").trim();
  }
  throw new Error("translate failed");
}

async function translateHe(he) {
  const max = 1200;
  if (he.length <= max) return translateChunk(he);
  const parts = [];
  let rest = he;
  while (rest.length > max) {
    let cut = rest.lastIndexOf(" ", max);
    if (cut < max * 0.5) cut = max;
    parts.push(rest.slice(0, cut));
    rest = rest.slice(cut).trim();
  }
  if (rest) parts.push(rest);
  const out = [];
  for (const p of parts) {
    out.push(await translateChunk(p));
    await sleep(1100);
  }
  return out.join(" ");
}

const NUM = {
  א: "1", ב: "2", ג: "3", ד: "4", ה: "5", ו: "6", ז: "7", ח: "8", ט: "9", י: "10",
  יא: "11", יב: "12", יג: "13", יד: "14", טו: "15", טז: "16", יז: "17", יח: "18", יט: "19",
  כ: "20", כא: "21", כב: "22", כג: "23", כד: "24", כה: "25", כו: "26", כז: "27", כח: "28", כט: "29",
  ל: "30",
};

function sanitizeMt(en, marker, he, slug) {
  let t = String(en ?? "").trim();
  t = t
    .replace(/&quot;/g, '"')
    .replace(/&amp;/g, "&")
    .replace(/\bLord our God\b/gi, "the Master our God")
    .replace(/\bLord's Prayer\b/gi, "tefillah")
    .replace(/\bLord\b/gi, "the Master")
    .replace(/\bGod's\b/gi, "the Master's")
    .replace(/\bGod\b/gi, "the Omnipresent")
    .replace(/\bHashem\b/gi, "the Omnipresent")
    .replace(/\bHoly Spirit\b/gi, "the matter")
    .replace(/\bHoly Qur'?an\b/gi, "the source")
    .replace(/\bQur'?an\b/gi, "the source")
    .replace(/\bBible\b/gi, "Gemara")
    .replace(/\bthe Bible\b/gi, "the Gemara")
    .replace(/\bSaturday\b/gi, "Shabbat")
    .replace(/\bSabbath\b/gi, "Shabbat")
    .replace(/\bHametz\b/gi, "chametz")
    .replace(/\bChametz\b/gi, "chametz")
    .replace(/\bchometz\b/gi, "chametz")
    .replace(/\bleaven(ing|ed|s)?\b/gi, (m) => m.replace(/leaven/i, "chametz"))
    .replace(/\bYom tov\b/gi, "Yom Tov")
    .replace(/\ballocated\b/gi, "muktzeh")
    .replace(/\bset-aside\b/gi, "muktzeh")
    .replace(/\bhand recoils\b/gi, "yad soledes bo")
    .replace(/\bfirst dish\b/gi, "kli rishon")
    .replace(/\bsecond dish\b/gi, "kli sheni")
    .replace(/\bthird dish\b/gi, "kli shlishi")
    .replace(/\bthe cauldron\b/gi, "the pot")
    .replace(/\bShield of Abraham\b/gi, "Magen Avraham")
    .replace(/\bGolden Rows\b/gi, "Taz")
    .replace(/\bHouse of Joseph\b/gi, "Beit Yosef")
    .replace(/\bMaimonides\b/gi, "Rambam")
    .replace(/\bNachmanides\b/gi, "Ramban")
    .replace(/\bDarbanan\b/gi, "d'rabbanan")
    .replace(/\bthe craft\b/gi, "melacha")
    .replace(/\bher age\b/gi, "its time")
    .replace(/\bgrows and goes\b/gi, "goes and comes")
    .replace(/\bthe sign of the (\d{1,3})(?:st|nd|rd|th)?\s+century\b/gi, "siman $1")
    .replace(/\bthe (\d{1,3})(?:st|nd|rd|th)?\s+century\b/gi, "siman $1")
    .replace(/\bassigned to the (\d{1,3})(?:st|nd|rd|th)?\s+century\b/gi, "siman $1")
    .replace(/\bTur — source\.?\b/gi, "Tur")
    .replace(/\bA Tur — source\.?\b/gi, "Tur")
    .replace(/\bGemara — source\.?\b/gi, "Gemara")
    .replace(/\bThere — source\.?\b/gi, "there")
    .replace(/\bRema:\s*/g, "{Rama: ")
    .replace(/\bRama:\s*Rama:/g, "{Rama:")
    .replace(/(\{Rama:[^}]+)\)(?!\})/g, "$1}");
  const mk = String(marker ?? "_").trim();
  if (NUM[mk] && !new RegExp(`^\\(${NUM[mk]}\\)`).test(t)) {
    t = t.replace(/^\(\d+\)\s*/, "");
    t = `(${NUM[mk]}) ${t}`;
  }
  if (/<small>הגה|הגה/.test(String(he)) && !/\{Rama:/.test(t)) {
    t = t.replace(/<small>\s*הגה\s*/gi, "{Rama: ");
    t = t.replace(/<\/small>/gi, "}");
  }
  if (slug === "beer-hagolah" && t.length < 220) {
    const cite = translateCite454(he);
    if (cite && !isBadMt447(cite)) t = cite;
  }
  t = t.replace(/\bthe Omnipresent\b/gi, "Heaven");
  if (/\bHeaven\b/i.test(t)) {
    t = t
      .replace(/\bHeaven's Prayer\b/gi, "tefillah")
      .replace(/\bHeaven's Word\b/gi, "the matter")
      .replace(/\bHeaven's promise\b/gi, "the promise")
      .replace(/\bHeaven's sake\b/gi, "the matter")
      .replace(/\bHeaven's people\b/gi, "the people")
      .replace(/\bthe Heaven\b/gi, "the matter")
      .replace(/\bHeaven gave\b/gi, "it was given")
      .replace(/\bHeaven\b/gi, "the matter");
  }
  return t.replace(/\s+/g, " ").trim();
}

async function cmdApplyHand() {
  const hand = await loadAllHand();
  let applied = 0;
  let skippedBad = 0;
  for (const [pad, files] of Object.entries(hand)) {
    if (Number(pad) < MIN || Number(pad) > MAX) continue;
    const base = path.join(OUT, `siman_${pad}`);
    for (const [rel, blockFixes] of Object.entries(files)) {
      const fp = path.join(base, rel);
      if (!fs.existsSync(fp)) continue;
      for (const [key, en] of Object.entries(blockFixes)) {
        if (!en || isBadMt447(en) || preflightFail(en)) {
          skippedBad++;
          continue;
        }
        const blocks = parseBlocksInFile(fs.readFileSync(fp, "utf8"));
        const b = blocks.find((x) => blockKey(x.seif, x.marker) === key);
        if (!b || !isBadMt447(b.en)) continue;
        applyEnToFile(fp, key, en.trim());
        applied++;
      }
    }
  }
  console.log(`apply-hand: applied=${applied} skipped_bad_hand=${skippedBad}`);
}

async function cmdMt(start = 0, limit = Infinity) {
  const items = collectBadBlocks();
  const slice = items.slice(start, start + limit);
  console.log(`mt: ${slice.length} bad blocks (${start}..${start + slice.length} of ${items.length})`);
  let ok = 0;
  let fail = 0;
  for (let i = 0; i < slice.length; i++) {
    const it = slice[i];
    let en = null;
    if (it.slug === "beer-hagolah" && it.hePlain.length < 280) {
      en = translateCite454(it.he);
      if (en && !isBadMt447(en)) {
        applyEnToFile(it.fp, it.key, en);
        ok++;
        process.stderr.write(`mt ${i + 1}/${slice.length} cite ok=${ok} fail=${fail}\r`);
        continue;
      }
    }
    try {
      const raw = await translateHe(it.hePlain);
      en = sanitizeMt(raw, it.marker, it.he, it.slug);
      if (isBadMt447(en)) {
        en = sanitizeMt(
          en.replace(/\bsnail\b/gi, "piece").replace(/\bdrone\b/gi, "erev"),
          it.marker,
          it.he,
          it.slug
        );
      }
    } catch (e) {
      console.error("\nMT_FAIL", it.pad, it.rel, it.key, e.message);
      fail++;
      await sleep(2000);
      continue;
    }
    if (isBadMt447(en) || preflightFail(en)) {
      console.error("\nSTILL_BAD", it.pad, it.rel, it.key, en?.slice(0, 70));
      fail++;
      continue;
    }
    applyEnToFile(it.fp, it.key, en);
    ok++;
    process.stderr.write(`mt ${i + 1}/${slice.length} ok=${ok} fail=${fail}\r`);
    await sleep(900);
  }
  console.error(`\nmt done: ok=${ok} fail=${fail}`);
}

function cmdVerify() {
  const items = collectBadBlocks();
  const bySiman = {};
  for (const it of items) {
    bySiman[it.siman] = (bySiman[it.siman] || 0) + 1;
  }
  const sorted = Object.entries(bySiman).sort((a, b) => b[1] - a[1]);
  console.log(`bad_mt total=${items.length} simanim=${sorted.length}`);
  console.log("top:", sorted.slice(0, 15).map(([s, n]) => `${s}:${n}`).join(", "));
  if (items.length) process.exit(1);
  console.log("ok bad_mt=0");
}

function cmdExportRemainders() {
  const items = collectBadBlocks();
  const out = {};
  for (const it of items) {
    const hk = `${it.slug}/${it.key}`;
    out[hk] = { he: it.he, en: it.en, file: it.rel, siman: it.siman };
  }
  const fp = path.join(WORK, "bad-mt-510-600-remainders.json");
  fs.mkdirSync(WORK, { recursive: true });
  fs.writeFileSync(fp, JSON.stringify(out, null, 2) + "\n", "utf8");
  console.log(`exported ${items.length} -> ${fp}`);
}

const cmd = process.argv[2] || "verify";
const a3 = Number(process.argv[3] || 0);
const a4 = process.argv[4] ? Number(process.argv[4]) : Infinity;

if (cmd === "apply-hand") cmdApplyHand().then(cmdVerify).catch((e) => { console.error(e); process.exit(1); });
else if (cmd === "mt") cmdMt(a3, a4).then(() => cmdVerify()).catch((e) => { console.error(e); process.exit(1); });
else if (cmd === "verify") cmdVerify();
else if (cmd === "export-remainders") cmdExportRemainders();
else {
  console.error("Unknown cmd:", cmd);
  process.exit(1);
}
