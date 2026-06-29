#!/usr/bin/env node
/** Build slot18-translations.json from need-all via Google + glossary + autoFix */
import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";
import { autoFix, preflightFail } from "./_slot18-lib.mjs";
import { plainFromHtml } from "./lib/quality-checks.mjs";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const WORK = path.join(__dirname, "work");
const NEED = JSON.parse(fs.readFileSync(path.join(WORK, "slot18-need-all.json"), "utf8"));
const OUT = path.join(WORK, "slot18-translations.json");

const GOOGLE =
  "https://translate.googleapis.com/translate_a/single?client=gtx&sl=iw&tl=en&dt=t";
const CHUNK = 1200;

const GLOSS = [
  [/Shield of Abraham/gi, "Magen Avraham"],
  [/Golden Rows/gi, "Taz"],
  [/House of Joseph/gi, "Beit Yosef"],
  [/Mishna Brurah/gi, "Mishna Berurah"],
  [/Mishnah Brurah/gi, "Mishna Berurah"],
  [/Shulchan Aruch/gi, "Shulchan Aruch"],
  [/Saturday/gi, "Shabbat"],
  [/Sabbath/gi, "Shabbat"],
  [/God forbid/gi, "chas veshalom"],
  [/\bGod\b/g, "Hashem"],
  [/\bLord\b/g, "Hashem"],
  [/Bible/gi, "Tanach"],
  [/Capernaum/gi, "Kfar Nachum"],
  [/Magdalene/gi, "Magdala"],
  [/Rem"a/gi, "Rama"],
  [/Rema/gi, "Rama"],
  [/Chabad/gi, "Chabad"],
  [/Hanukkah/gi, "Chanukah"],
  [/Hanukah/gi, "Chanukah"],
  [/Purim/gi, "Purim"],
  [/synagogue/gi, "synagogue"],
  [/candle/gi, "candle"],
];

const MANUAL = {
  "681|beer-hagolah/part-001.txt|2:_":
    "Terumat HaDeshen siman 60.",
  "689|beer-hagolah/part-001.txt|4:_":
    "Orach Chayim.",
};

function dedupeChunkSeam(text) {
  const t = plainFromHtml(text);
  const minLen = 55;
  for (let len = Math.min(100, Math.floor(t.length / 2)); len >= minLen; len -= 8) {
    for (let i = 0; i <= t.length - len * 2; i++) {
      const slice = t.slice(i, i + len);
      const next = t.indexOf(slice, i + len);
      if (next !== -1 && next - (i + len) < 12) {
        return t.slice(0, next) + t.slice(next + len);
      }
    }
  }
  return text;
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
    await new Promise((r) => setTimeout(r, 400));
  }
  return parts.join(" ");
}

function polish(en) {
  let t = en;
  for (const [re, rep] of GLOSS) t = t.replace(re, rep);
  return dedupeChunkSeam(t);
}

async function main() {
  const out = {};
  let n = 0;
  const simanim = Object.keys(NEED).sort((a, b) => Number(a) - Number(b));
  for (const sim of simanim) {
    out[sim] = {};
    for (const it of NEED[sim]) {
      const k = `${it.rel}|${it.key}`;
      const mk = (it.key.split(":")[1] || "_").trim();
      const manualKey = `${sim}|${k}`;
      let en;
      if (MANUAL[manualKey]) {
        en = MANUAL[manualKey];
      } else {
        const src = plainFromHtml(it.hePlain || it.he || "");
        process.stdout.write(`${sim} ${k} (${src.length}) … `);
        en = await translateHe(src);
        en = polish(en);
        en = autoFix(en, mk, it.he || "");
      }
      out[sim][k] = en;
      n++;
      const pf = preflightFail(en);
      console.log(pf ? `WARN ${pf}` : "ok", en.length);
    }
    fs.writeFileSync(OUT, JSON.stringify(out, null, 2) + "\n", "utf8");
  }
  console.log("Wrote", OUT, "entries", n);
}

main().catch((e) => {
  console.error(e);
  process.exit(1);
});
