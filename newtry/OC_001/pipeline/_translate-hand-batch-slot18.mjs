#!/usr/bin/env node
/** Translate missing hand-slot18 items via claude --print */
import fs from "fs";
import path from "path";
import { spawnSync } from "child_process";
import { fileURLToPath } from "url";
import { autoFix, preflightFail } from "./_slot18-lib.mjs";
import { runBlockQualityChecks, maxSeverity, SEVERITY } from "./lib/quality-checks.mjs";

const siman = Number(process.argv[2]);
const __dirname = path.dirname(fileURLToPath(import.meta.url));
const OC_ROOT = path.join(__dirname, "..");
const handPath = path.join(__dirname, "work", `hand-slot18-siman-${siman}.json`);

if (!fs.existsSync(handPath)) {
  console.error("missing", handPath);
  process.exit(1);
}

const TOPICS = {
  669: "Simchat Torah order, three Torah scrolls Vezot Habracha Bereishit maftir, hakkafot songs, children aliyah, festive meal finishing Torah",
  670: "Chanukah eight days establishment, Megillat Taanit, women melacha custom, praise not Purim feast, oil miracle eight days",
  671: "Chanukah candle lighting obligation, poor must buy oil, placement, time, blessings, household members",
  672: "Chanukah who is obligated, women, children, guest, mourner, synagogue lighting",
  673: "Chanukah lighting time, sunset, until people leave market, Friday Shabbat timing",
  674: "Chanukah where to light, doorway, left side, height, apartment building",
  675: "Chanukah kindling accomplishes mitzvah not placement, relight after Shabbat, inside outside",
  676: "Chanukah invalid lighting, stolen oil, electric, broken wicks, precedence over wine",
  677: "Chanukah Shabbat Chanukah, Havdalah order, lighting before Havdalah, Motzei Shabbat",
  678: "Chanukah forgotten to light, compensation next night, traveling",
  679: "Chanukah seeing flames, blessing seeing, two people same house",
  680: "Chanukah not near door Shabbat eve, wind guard, leaving home",
  681: "Chanukah work permitted, sewing, scholars, women custom melacha",
  682: "Chanukah Torah reading, three aliyot, haftarah, Rosh Chodesh Tevet overlap",
  683: "Chanukah Hallel full eight days, no Tachanun Tzidkatcha, eve Mincha",
  684: "Chanukah Torah reading nesi'im portions, Shabbat Chanukah two scrolls, Rosh Chodesh Tevet overlap, haftarah mistakes",
  685: "Four special Torah portions Shekalim Zakhor Parah HaChodesh order, Rosh Chodesh Adar Shabbat",
  686: "Special Torah portions Zakhor Amalek, Shabbat before Purim, haftarah",
  687: "Megillah reading obligation night and day, times sunrise, missed reading",
  688: "Walled cities from Joshua read Purim 15th, batlanim, settlement order",
  689: "All obligated megillah men women converts slaves children education",
  690: "Megillah reading laws standing sitting, congregation honor, blessings before after",
  691: "Megillah invalid scrolls, missing words, reader qualifications, blessings",
  692: "Megillah when read, before Purim, after Purim, villages timing",
  693: "Megillah reader must have intent, congregation hear, invalid reading",
  694: "Megillah blessings, shehecheyanu, after blessing, congregation amen",
  695: "Purim festive meal obligation day not night, wine, rejoicing",
  696: "Purim mishloach manot, gifts to poor, matanot laevyonim",
  697: "Purim 14th 15th Adar I, Tachanun fasting eulogy, minor Purim",
};
const TOPIC = TOPICS[siman] || "Chanukah laws Orach Chayim";

const hand = JSON.parse(fs.readFileSync(handPath, "utf8"));
const need = hand.items.filter((it) => {
  if (!it.en || !String(it.en).trim()) return true;
  const en = autoFix(it.en, it.marker, it.he || "");
  const pf = preflightFail(en);
  const issues = runBlockQualityChecks({
    slug: it.slug,
    seif: it.seif,
    marker: it.marker,
    he: it.he,
    en,
  });
  return pf || maxSeverity(issues) >= SEVERITY.warn;
});

if (!need.length) {
  console.log("siman", siman, "all translated");
  process.exit(0);
}

const SYSTEM = `You translate Shulchan Aruch Orach Chayim siman ${siman} (${TOPIC}) from Hebrew to English.

MANDATORY RULES:
- Translate EVERY word. No omissions, no summarizing, no paraphrasing.
- Output ONLY the translation. No labels, headers, notes.
- Halachic terms: Chanukah, ner Chanukah, shamash, Hallel, Tachanun, musaf, Arvit, Shacharit, Mincha, haftarah, maftir, kohen Levi Yisrael, l'chatchila, b'dieved, d'oraisa, d'rabbanan, muktzeh, melacha, pirsumei nisa, etc.
- Commentator names exactly: Magen Avraham, Taz, Beit Yosef, Rambam, Mishna Berurah, Bach, Gra, Ran, Rosh, Eliyah Rabbah, Kaf HaChayyim, Peri Megadim, Chokhmat Shlomo, Levush, Maharil, Shaarei Teshuvah, Maharshal, etc.
- Expand ALL Hebrew abbreviations in English.
- Rama glosses: {Rama: ...} with curly braces only once at start of gloss.
- Note markers: Hebrew letter markers → (א) (ב) etc. at start when present in source.
- Arabic numerals for siman/seif citations.
- Translate Aramaic fully into English.

FORBIDDEN: Lord, God (use Hashem), Shield of Abraham, Golden Rows, hand recoils, first dish, allocated, Saturday, According to the, there in the, Bible, Capernaum, &quot;, Rem"a, Quran, Audience, lines of dots, duplicate repeated phrases, {Rama: Rema:.

Return ONLY valid JSON object: keys → English strings. No markdown fences.`;

function claudeJson(user) {
  const r = spawnSync("claude", ["--print"], {
    encoding: "utf8",
    input: `${SYSTEM}\n\n${user}`,
    timeout: 600000,
    cwd: OC_ROOT,
    shell: process.platform === "win32",
    maxBuffer: 80 * 1024 * 1024,
  });
  if (r.status !== 0) throw new Error((r.stderr || r.stdout || "claude failed").slice(0, 1200));
  let t = (r.stdout || "").trim();
  t = t.replace(/^```json?\n?/i, "").replace(/\n?```$/i, "").trim();
  return JSON.parse(t);
}

function batchSize(it) {
  const n = (it.hePlain || it.he || "").length;
  if (n > 3500) return 1;
  if (n > 1200) return 2;
  return 4;
}

let done = 0;
for (let i = 0; i < need.length; ) {
  const sz = batchSize(need[i]);
  const batch = need.slice(i, i + sz);
  const payload = {};
  for (const row of batch) payload[row.key] = row.hePlain || row.he;
  process.stdout.write(`siman ${siman} batch ${Math.floor(i / 4) + 1} (${batch.length}) … `);
  const out = claudeJson(
    `Translate these ${batch.length} block(s). Keys are seif:marker.\n${JSON.stringify(payload, null, 2)}`
  );
  for (const row of batch) {
    if (!out[row.key]) throw new Error(`missing key: ${row.key}`);
    row.en = String(out[row.key]).trim();
    done++;
  }
  fs.writeFileSync(handPath, JSON.stringify(hand, null, 2) + "\n", "utf8");
  console.log("ok");
  i += batch.length;
}
console.log("translated", done, "blocks for siman", siman);
