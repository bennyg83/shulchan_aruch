#!/usr/bin/env node
/** Build work/slot18-translations.json from slot18-need-all.json via claude --print */
import fs from "fs";
import path from "path";
import { spawnSync } from "child_process";
import { fileURLToPath } from "url";
import { autoFix } from "./_slot18-lib.mjs";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const WORK = path.join(__dirname, "work");
const needPath = path.join(WORK, "slot18-need-all.json");
const outPath = path.join(WORK, "slot18-translations.json");

const TOPICS = {
  670: "Chanukah eight days establishment, feasts, oil miracle, customs",
  671: "Chanukah candle lighting placement height arrangement",
  672: "Chanukah timing before sunset, oil amount, extinguishing",
  673: "Chanukah lighting time, Friday Shabbat, benefit from light",
  674: "Chanukah where to light doorway apartment",
  675: "Chanukah kindling accomplishes mitzvah placement",
  676: "Chanukah invalid oils wicks electric",
  677: "Chanukah Shabbat Havdalah order",
  679: "Chanukah seeing flames blessing",
  681: "Chanukah work melacha customs",
  682: "Chanukah Torah reading haftarah",
  684: "Chanukah Hallel days",
  685: "Chanukah Hallel full partial",
  686: "Chanukah Hallel without blessing",
  687: "Chanukah Torah reading portions",
  688: "Chanukah money wicks",
  689: "Chanukah aliyah Torah",
  690: "Chanukah haftarah",
  691: "Chanukah synagogue lighting",
  692: "Chanukah synagogue who lights",
  693: "Chanukah synagogue blessings",
  694: "Chanukah synagogue placement",
  695: "Chanukah synagogue times",
  696: "Chanukah synagogue Shabbat",
  697: "Chanukah synagogue customs end",
};

const need = JSON.parse(fs.readFileSync(needPath, "utf8"));
const simanim = Object.keys(need).sort((a, b) => Number(a) - Number(b));
let all = {};
if (fs.existsSync(outPath)) {
  try {
    all = JSON.parse(fs.readFileSync(outPath, "utf8"));
  } catch {
    all = {};
  }
}

const SYSTEM = `You translate Shulchan Aruch Orach Chayim Chanukah commentaries from Hebrew to English.

MANDATORY RULES:
- Translate EVERY Hebrew word. No omissions, no summarizing, no paraphrasing.
- Output ONLY valid JSON object mapping each key to its English string. No markdown fences.
- Halachic terms: Chanukah, ner Chanukah, shamash, Hallel, Tachanun, musaf, Arvit, Shacharit, Mincha, haftarah, maftir, kohen Levi Yisrael, l'chatchila, b'dieved, d'oraisa, d'rabbanan, muktzeh, melacha, pirsumei nisa, etc.
- Commentator names exactly: Magen Avraham, Taz, Beit Yosef, Rambam, Mishna Berurah, Bach, Gra, Ran, Rosh, Eliyah Rabbah, Kaf HaChayyim, Peri Megadim, Chokhmat Shlomo, Levush, Maharil, Shaarei Teshuvah, Maharshal, Beer Heitev, Beer HaGolah, Biur Halacha, etc.
- Expand ALL Hebrew abbreviations in English (e.g. מ״א = Magen Avraham, ע״ש = see there, כ״ה = so it is).
- Rama glosses in source: {Rama: ...} curly braces only once.
- Note markers א ב ג in Hebrew → prefix (א) (ב) etc. when applicable.
- Arabic numerals for siman/seif/daf citations.
- Translate Aramaic fully into English.
- No duplicate repeated phrases (fix chunk seams with one clean translation).

FORBIDDEN: Lord, God (use Hashem), Shield of Abraham, Golden Rows, hand recoils, first dish, allocated, Saturday, According to the, Bible, Capernaum, Magdalene, artist, &quot;, duplicate garbage.`;

function claudeJson(user) {
  const r = spawnSync("claude", ["--print"], {
    encoding: "utf8",
    input: `${SYSTEM}\n\n${user}`,
    timeout: 900000,
    cwd: path.join(__dirname, ".."),
    shell: process.platform === "win32",
    maxBuffer: 100 * 1024 * 1024,
  });
  if (r.status !== 0) throw new Error((r.stderr || r.stdout || "claude failed").slice(0, 2000));
  let t = (r.stdout || "").trim();
  t = t.replace(/^```json?\n?/i, "").replace(/\n?```$/i, "").trim();
  return JSON.parse(t);
}

function batchSize(he) {
  const n = he.length;
  if (n > 4000) return 1;
  if (n > 1500) return 1;
  if (n > 800) return 2;
  return 3;
}

let totalNew = 0;
for (const sim of simanim) {
  const items = need[sim];
  if (!all[sim]) all[sim] = {};
  const pending = items.filter((it) => {
    const k = `${it.rel}|${it.key}`;
    const ex = all[sim][k];
    return !ex || ex.length < 20;
  });
  if (!pending.length) {
    console.log(`siman ${sim} skip (${items.length} done)`);
    continue;
  }
  const topic = TOPICS[Number(sim)] || "Chanukah laws Orach Chayim";
  console.log(`\nsiman ${sim}: ${pending.length}/${items.length} pending — ${topic}`);
  for (let i = 0; i < pending.length; ) {
    const batch = [];
    let sz = 0;
    while (i + batch.length < pending.length && batch.length < 3) {
      const it = pending[i + batch.length];
      const bs = batchSize(it.hePlain || "");
      if (batch.length && sz + (it.hePlain || "").length > 5000) break;
      if (batch.length >= bs) break;
      batch.push(it);
      sz += (it.hePlain || "").length;
    }
    const payload = {};
    for (const it of batch) {
      payload[`${it.rel}|${it.key}`] = it.hePlain || "";
    }
    process.stdout.write(`  batch ${i + 1}-${i + batch.length} … `);
    const out = claudeJson(
      `Siman ${sim} (${topic}). Translate each key fully. Keys are "rel|seif:marker".\n${JSON.stringify(payload, null, 2)}`
    );
    for (const it of batch) {
      const k = `${it.rel}|${it.key}`;
      if (!out[k]) throw new Error(`missing ${k} in siman ${sim}`);
      const mk = (it.key.split(":")[1] || "_").trim();
      all[sim][k] = autoFix(String(out[k]), mk, it.he || "");
      totalNew++;
    }
    fs.writeFileSync(outPath, JSON.stringify(all, null, 2) + "\n", "utf8");
    console.log("ok");
    i += batch.length;
  }
}

let count = 0;
for (const sim of simanim) count += Object.keys(all[sim] || {}).length;
const needCount = simanim.reduce((n, s) => n + need[s].length, 0);
console.log(`\nWrote ${outPath}`);
console.log(`entries: ${count} / need ${needCount}`);
if (count < needCount) process.exit(1);
