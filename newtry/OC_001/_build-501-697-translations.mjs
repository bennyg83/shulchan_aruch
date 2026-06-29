#!/usr/bin/env node
/** Build _siman501-697-stragglers-translations.mjs from pending blocks + hand-en + Google MT */
import fs from "fs";
import path from "path";
import { fileURLToPath, pathToFileURL } from "url";
import { collectEditorialBlocks, loadEditorialDoneIds } from "./pipeline/lib/editorial-queue.mjs";
import { parseBlocksInFile } from "./oc001_block_lib.mjs";
import { preflightFail } from "./pipeline/_slot18-lib.mjs";
import { polishMtStragglers } from "./_lib-polish-mt-stragglers.mjs";
import { plainFromHtml } from "./pipeline/lib/quality-checks.mjs";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const OUT = path.join(__dirname, "output");
const WORK = path.join(__dirname, "pipeline/work");
const PIPE = path.join(__dirname, "pipeline");

const GOOGLE =
  "https://translate.googleapis.com/translate_a/single?client=gtx&sl=iw&tl=en&dt=t";
const CHUNK = 1200;

const GLOSS = [
  [/Shield of Abraham/gi, "Magen Avraham"],
  [/Golden Rows/gi, "Taz"],
  [/House of Joseph/gi, "Beit Yosef"],
  [/Mishna Brurah/gi, "Mishna Berurah"],
  [/Shulchan Aruch/gi, "Shulchan Aruch"],
  [/Saturday/gi, "Shabbat"],
  [/Sabbath/gi, "Shabbat"],
  [/God forbid/gi, "chas veshalom"],
  [/\bGod\b/g, "Hashem"],
  [/\bLord\b/g, "Hashem"],
  [/Rem"a/gi, "Rama"],
  [/Rema/gi, "Rama"],
  [/non-Jew/gi, "non-Jew"],
  [/gentile/gi, "gentile"],
];

function tKey(siman, slug, seif, marker) {
  return `${siman}|${slug}|${seif}|${marker}`;
}

function handKey(slug, seif, marker) {
  return `${slug}/${seif}:${marker || "_"}`;
}

function fileKey(rel, seif, marker) {
  return `${rel}|${seif}:${marker || "_"}`;
}

async function translateHe(text) {
  const parts = [];
  for (let i = 0; i < text.length; i += CHUNK) {
    const slice = text.slice(i, i + CHUNK);
    const q = encodeURIComponent(slice);
    const res = await fetch(`${GOOGLE}&q=${q}`);
    if (!res.ok) throw new Error(`google ${res.status}`);
    const data = await res.json();
    parts.push((data[0] || []).map((x) => x[0]).join(""));
    await new Promise((r) => setTimeout(r, 350));
  }
  return parts.join(" ");
}

function polish(en) {
  let t = en;
  for (const [re, rep] of GLOSS) t = t.replace(re, rep);
  return t.replace(/\s+/g, " ").trim();
}

/** Load hand-en from JSON and FIXES_BY_SIMAN mjs exports */
async function loadHandMaps() {
  const byTKey = new Map();
  const byFileKey = new Map();

  function ingestFlat(obj, siman) {
    for (const [k, v] of Object.entries(obj)) {
      if (!v || typeof v !== "string") continue;
      if (k.includes("|")) {
        const [rel, rest] = k.split("|");
        const [seif, marker = "_"] = rest.split(":");
        const slug = rel.replace(/\/part-001\.txt$/, "").replace(/\.txt$/, "");
        byTKey.set(tKey(siman, slug, seif, marker), v);
        byFileKey.set(`${siman}|${fileKey(rel.includes("/") ? rel : `${slug}/part-001.txt`, seif, marker)}`, v);
      } else if (k.includes("/")) {
        const [slugPart, rest] = k.split("/");
        const [seif, marker = "_"] = rest.split(":");
        byTKey.set(tKey(siman, slugPart, seif, marker), v);
      }
    }
  }

  function ingestFixes(simStr, fixes) {
    const siman = Number(simStr);
    for (const [rel, blocks] of Object.entries(fixes)) {
      for (const [bk, v] of Object.entries(blocks)) {
        if (!v || typeof v !== "string") continue;
        const [seif, marker = "_"] = bk.split(":");
        const slug = rel.replace(/\/part-001\.txt$/, "");
        byTKey.set(tKey(siman, slug, seif, marker), v);
        byFileKey.set(`${siman}|${fileKey(rel, seif, marker)}`, v);
      }
    }
  }

  for (let s = 501; s <= 697; s++) {
    const jp = path.join(PIPE, `_hand-en-${s}.json`);
    if (fs.existsSync(jp)) {
      try {
        ingestFlat(JSON.parse(fs.readFileSync(jp, "utf8")), s);
      } catch {
        /* skip */
      }
    }
  }

  const fixModules = [
    ["_hand684-696-en.mjs", null],
    ["_siman545-hand-en.mjs", 545],
    ["_siman518-remnant-hand-en.mjs", 518],
    ["_siman586-hand-en.mjs", 586],
    ["_siman591-600-remnant-hand-en.mjs", null],
    ["_hand624-need-en.mjs", 624],
    ["_hand629-need-en.mjs", 629],
    ["_hand629-need-en-b2.mjs", 629],
    ["_hand630-need-en.mjs", 630],
    ["_hand630-need-en-b2.mjs", 630],
    ["_hand638-need-en.mjs", 638],
    ["_hand694-need-en.mjs", 694],
    ["chokhmat-shlomo-696-en.mjs", 696],
  ];

  for (const [mod, forcedSiman] of fixModules) {
    const fp = path.join(PIPE, mod);
    if (!fs.existsSync(fp)) continue;
    try {
      const m = await import(pathToFileURL(fp).href);
      const simFromFile = forcedSiman || Number((mod.match(/(\d{3})/) || [])[1]) || 0;
      if (m.FIXES_BY_SIMAN) {
        for (const [sim, fixes] of Object.entries(m.FIXES_BY_SIMAN)) {
          ingestFixes(sim, fixes);
        }
      }
      if (m.FIXES && simFromFile) {
        ingestFixes(String(simFromFile), m.FIXES);
      }
      if (m.T && simFromFile) {
        for (const [k, v] of Object.entries(m.T)) {
          const m2 = k.match(/^([^|]+)\|(\d+):(.+)$/);
          if (m2) {
            const slug = m2[1].replace(/\/part-001\.txt$/, "");
            byTKey.set(tKey(simFromFile, slug, m2[2], m2[3]), v);
          }
        }
      }
      if (m.CHOKHMAT_SHLOMO_4) {
        byTKey.set(tKey(696, "chokhmat-shlomo", "4", "_"), m.CHOKHMAT_SHLOMO_4);
      }
    } catch (e) {
      console.warn("skip module", mod, e.message);
    }
  }

  return { byTKey, byFileKey };
}

function getHebrew(item) {
  const abs = path.join(OUT, item.file);
  const blocks = parseBlocksInFile(fs.readFileSync(abs, "utf8"));
  const b = blocks.find(
    (x) =>
      x.slug === item.slug &&
      String(x.seif) === String(item.seif) &&
      String(x.marker) === String(item.marker),
  );
  if (!b) throw new Error(`block not found ${item.id}`);
  return plainFromHtml(String(b.he ?? ""));
}

async function main() {
  const done = loadEditorialDoneIds(WORK);
  const items = [];
  for (let s = 501; s <= 697; s++) {
    items.push(...collectEditorialBlocks(OUT, s, "all", "warn", done));
  }
  console.log(`pending blocks: ${items.length}`);

  const { byTKey, byFileKey } = await loadHandMaps();
  const TRANSLATIONS = {};
  let hand = 0;
  let mt = 0;

  for (const it of items) {
    const k = tKey(it.siman, it.slug, it.seif, it.marker);
    const hk = handKey(it.slug, it.seif, it.marker);
    const fk = `${it.siman}|${fileKey(it.file.replace(/^siman_\d+\//, ""), it.seif, it.marker)}`;

    let en =
      byTKey.get(k) ||
      byFileKey.get(fk) ||
      byTKey.get(tKey(it.siman, it.slug, it.seif, it.marker));

    if (en && /\[ERROR\]|got cut off|Cannot proceed|Halachic\" appears/i.test(en)) {
      en = null;
    }

    const he = getHebrew(it);
    if (!en) {
      process.stdout.write(`MT ${k} (${he.length}) … `);
      en = polish(await translateHe(he));
      mt++;
      console.log("ok", en.length);
    } else {
      hand++;
      console.log(`HAND ${k}`);
    }
    en = polishMtStragglers(en, { seif: it.seif, marker: it.marker });
    const pf = preflightFail(en);
    if (pf) console.warn(`  preflight warn: ${pf}`);
    TRANSLATIONS[k] = en;
  }

  const body = `/** Auto-built editorial stragglers simanim 501–697 (${items.length} blocks) */\nexport const TRANSLATIONS = ${JSON.stringify(TRANSLATIONS, null, 2)};\n`;
  fs.writeFileSync(
    path.join(__dirname, "_siman501-697-stragglers-translations.mjs"),
    body,
    "utf8",
  );
  console.log(`Wrote translations: hand=${hand} mt=${mt} total=${items.length}`);
}

main().catch((e) => {
  console.error(e);
  process.exit(1);
});
