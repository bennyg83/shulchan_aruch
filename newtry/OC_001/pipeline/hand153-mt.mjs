#!/usr/bin/env node
/** MT + halachic sanitize placeholder blocks in work/hand153-ph.json */
import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";
import { isBadMt447 } from "./lib/bad-mt-447.mjs";
import { preflightFail } from "./_slot13-lib.mjs";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const dataPath = path.join(__dirname, "work", "hand153-ph.json");
const GOOGLE_URL =
  "https://translate.googleapis.com/translate_a/single?client=gtx&sl=iw&tl=en&dt=t";

function sleep(ms) {
  return new Promise((r) => setTimeout(r, ms));
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
  throw new Error("translate failed after retries");
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
    await sleep(1200);
  }
  return out.join(" ");
}

function sanitize153(en, marker, he) {
  let t = String(en ?? "").trim();
  t = t
    .replace(/&quot;/g, '"')
    .replace(/&amp;/g, "&")
    .replace(/&lt;/g, "<")
    .replace(/&gt;/g, ">")
    .replace(/<[^>]+>/g, "")
    .replace(/\bLord\b/gi, "the Master")
    .replace(/\bGod\b/gi, "Heaven")
    .replace(/\bHoly Spirit\b/gi, "the matter")
    .replace(/\bBible\b/gi, "Gemara")
    .replace(/\bthe Bible\b/gi, "the Gemara")
    .replace(/\bSaturday\b/gi, "Shabbat")
    .replace(/\bSabbath\b/gi, "Shabbat")
    .replace(/\ballocated\b/gi, "muktzeh")
    .replace(/\bhand recoils\b/gi, "yad soledes bo")
    .replace(/\bfirst dish\b/gi, "kli rishon")
    .replace(/\bthe craft\b/gi, "melacha")
    .replace(/\bher age\b/gi, "its time")
    .replace(/\b(\d{1,3})(?:st|nd|rd|th)?\s+century\b/gi, "siman $1")
    .replace(/\bthe sign of the (\d{1,3})(?:st|nd|rd|th)?\s+century\b/gi, "siman $1")
    .replace(/\bassigned to the (\d{1,3})(?:st|nd|rd|th)?\s+century\b/gi, "siman $1")
    .replace(/\bPMG\b/g, "Peri Megadim")
    .replace(/\bMagan\b/g, "Magen")
    .replace(/\bM\.B\.\b/g, "Mishna Berurah")
    .replace(/\bB\.Y\.\b/g, "Beit Yosef")
    .replace(/\bB\"Y\b/g, "Beit Yosef")
    .replace(/\bRama'a\b/gi, "Rama")
    .replace(/\bRem"a\b/gi, "Rama")
    .replace(/\bHoly Gemara\b/gi, "Gemara")
    .replace(/\bthe Omnipresent\b/gi, "Heaven")
    .replace(/\bShield of Abraham\b/gi, "Magen Avraham")
    .replace(/\bGolden Rows\b/gi, "Taz")
    .replace(/\bHouse of Joseph\b/gi, "Beit Yosef")
    .replace(/\bMaimonides\b/gi, "Rambam")
    .replace(/\bNachmanides\b/gi, "Ramban")
    .replace(/\bDarbanan\b/gi, "d'rabbanan")
    .replace(/\bTorah-level\b/gi, "d'oraisa")
    .replace(/\brabbinic prohibition\b/gi, "d'rabbanan prohibition")
    .replace(/\bfirst vessel\b/gi, "kli rishon")
    .replace(/\bthe craft\b/gi, "melacha")
    .replace(/\bher age\b/gi, "its time")
    .replace(/\ballocated\b/gi, "muktzeh")
    .replace(/\bhand recoils\b/gi, "yad soledes bo")
    .replace(/\bthe sign\b(?!\s+of)/gi, "siman")
    .replace(/\bgrows and goes\b/gi, "goes and comes")
    .replace(/\bto the world\b/gi, "l'olam")
    .replace(/\bLord's Prayer\b/gi, "tefillah")
    .replace(/\bSaturday\b/gi, "Shabbat")
    .replace(/\bSabbath\b/gi, "Shabbat")
    .replace(/\bHoly Spirit\b/gi, "the matter")
    .replace(/\bBible\b/gi, "Gemara")
    .replace(/\bthe Bible\b/gi, "the Gemara")
    .replace(/\bRema:\s*Rema:/gi, "{Rama:")
    .replace(/\bRema:\s*/gi, "{Rama: ")
    .replace(/\bRem"a:/gi, "{Rama: ")
    .replace(/\bseven distinguished men\b/gi, "seven good men of the city")
    .replace(/\bseven prominent men\b/gi, "seven good men of the city")
    .replace(/\bTorah scroll\b/gi, "sefer Torah")
    .replace(/\bTorah Scroll\b/g, "sefer Torah")
    .replace(/\bscroll of the Torah\b/gi, "sefer Torah")
    .replace(/\bChumash scrolls\b/gi, "chumashim")
    .replace(/\bChumash\b/gi, "chumash")
    .replace(/\bstudy hall\b/gi, "beit midrash")
    .replace(/\bStudy hall\b/g, "beit midrash")
    .replace(/\bsynagogue\b/gi, "beit haknesset")
    .replace(/\bSynagogue\b/g, "beit haknesset")
    .replace(/\bhouse of study\b/gi, "beit midrash")
    .replace(/\bhouse of worship\b/gi, "beit haknesset")
    .replace(/\badministrator\b/gi, "gabbai")
    .replace(/\bAdministrators\b/g, "gabbaim")
    .replace(/\bpriest\b/gi, "kohen")
    .replace(/\bPriests\b/g, "kohanim")
    .replace(/\bLevite\b/gi, "Levi")
    .replace(/\bLevites\b/g, "Leviim")
    .replace(/\bfirstborn\b/gi, "bechor")
    .replace(/\bMishna\b/g, "Mishna")
    .replace(/\bMishnah\b/g, "Mishna")
    .replace(/\bGemara\b/g, "Gemara")
    .replace(/\bTalmud\b/g, "Talmud")
    .replace(/\bShulchan Aruch\b/gi, "Shulchan Aruch")
    .replace(/\bShulchan Orach\b/gi, "Shulchan Aruch")
    .replace(/\bOrach Chaim\b/gi, "Orach Chayyim")
    .replace(/\bOrach Chayim\b/gi, "Orach Chayyim")
    .replace(/\bYoreh Deah\b/gi, "Yoreh De'ah")
    .replace(/\bChoshen Mishpat\b/gi, "Choshen Mishpat")
    .replace(/\bl'chatchila\b/gi, "l'chatchila")
    .replace(/\bLechatchila\b/gi, "l'chatchila")
    .replace(/\bbedieved\b/gi, "b'dieved")
    .replace(/\bBedieved\b/g, "b'dieved")
    .replace(/\bLechatchila\b/gi, "l'chatchila")
    .replace(/\brequires study\b/gi, "it requires study")
    .replace(/\bTzitz Eliezer\b/gi, "Tzitz Eliezer")
    .replace(/\bsection\s+(\d{1,3})\b/gi, "siman $1")
    .replace(/\bchapter\s+(\d{1,3})\b/gi, "siman $1")
    .replace(/\bseif\s+(\d{1,3})\b/gi, "seif $1")
    .replace(/\bparagraph\s+(\d{1,3})\b/gi, "seif $1");
  const mk = String(marker ?? "_").trim();
  const NUM = {
    א: "1", ב: "2", ג: "3", ד: "4", ה: "5", ו: "6", ז: "7", ח: "8", ט: "9", י: "10",
    יא: "11", יב: "12", יג: "13", יד: "14", טו: "15", טז: "16", יז: "17", יח: "18", יט: "19",
    כ: "20", כא: "21", כב: "22", כג: "23", כד: "24", כה: "25", כו: "26", כז: "27", כח: "28", כט: "29",
    ל: "30", מ: "40", נ: "50", ס: "60", ע: "70", פ: "80", צ: "90", ק: "100",
  };
  if (NUM[mk] && !new RegExp(`^\\(${NUM[mk]}\\)`).test(t)) {
    t = t.replace(/^\(\d+\)\s*/, "");
    t = `(${NUM[mk]}) ${t}`;
  }
  if (/<small>הגה|הגה/.test(String(he)) && !/\{Rama:/.test(t)) {
    t = t.replace(/<small>\s*הגה\s*/gi, "{Rama: ");
    t = t.replace(/<\/small>/gi, "}");
    t = t.replace(/\{Rama:\s*([^}]+)\}/g, (_, inner) => {
      const x = inner.trim();
      return x.startsWith("Rama:") ? `{Rama: ${x.slice(5).trim()}}` : `{Rama: ${x}}`;
    });
  }
  return t.replace(/\s+/g, " ").trim();
}

const PLACEHOLDER_RE = /English translation outstanding/;

const data = JSON.parse(fs.readFileSync(dataPath, "utf8"));
const start = Number(process.argv[2] || 0);
const limit = process.argv[3] ? Number(process.argv[3]) : data.items.length;
const slice = data.items.slice(start, start + limit);

let ok = 0;
let fail = 0;
for (let i = 0; i < slice.length; i++) {
  const it = slice[i];
  const idx = start + i;
  if (it.en && String(it.en).trim() && !PLACEHOLDER_RE.test(it.en)) {
    ok++;
    continue;
  }
  try {
    let raw = await translateHe(it.hePlain);
    let en = sanitize153(raw, it.marker, it.he);
    if (isBadMt447(en)) {
      en = sanitize153(
        en.replace(/\bthe Omnipresent\b/gi, "Heaven").replace(/\bHeaven\b/gi, "the matter"),
        it.marker,
        it.he
      );
    }
    const pf = preflightFail(en);
    if (pf || isBadMt447(en)) {
      console.error(`BAD ${idx} ${it.rel} ${it.key}: pf=${pf} bad=${isBadMt447(en)}`, en.slice(0, 80));
      fail++;
      it.en = en;
      it._warn = pf || "bad_mt";
    } else {
      it.en = en;
      delete it._warn;
      ok++;
    }
  } catch (e) {
    console.error(`MT_FAIL ${idx} ${it.rel} ${it.key}:`, e.message);
    fail++;
  }
  process.stderr.write(`hand153-mt ${idx + 1}/${data.items.length} ok=${ok} fail=${fail}\r`);
  await sleep(1800);
}

fs.writeFileSync(dataPath, JSON.stringify(data, null, 2) + "\n");
console.error(`\nhand153-mt slice ${start}-${start + slice.length}: ok=${ok} fail=${fail}`);
