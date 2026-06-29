#!/usr/bin/env node
import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";
import { isBadMt447 } from "./lib/bad-mt-447.mjs";
import { preflightFail } from "./_slot13-lib.mjs";

const dataPath = path.join(path.dirname(fileURLToPath(import.meta.url)), "work", "hand153-garbled.json");

function postfix(en, marker, he) {
  let t = String(en ?? "").trim();
  t = t
    .replace(/\bAccording to the\b/gi, "per the")
    .replace(/\bthere in the\b/gi, "there,")
    .replace(/\bthe Bible\b/gi, "the Gemara")
    .replace(/\bBible\b/gi, "Gemara")
    .replace(/\bHeaven's enjoyment\b/gi, "Heaven's benefit")
    .replace(/\bwhore\b/gi, "zonah")
    .replace(/\bMkash\b/gi, "it appears")
    .replace(/\bTaffi\b/gi, "as")
    .replace(/\bDuff\b/gi, "Daf")
    .replace(/\bDKIL\b/gi, "for we hold")
    .replace(/\bKmash\b/gi, "as")
    .replace(/\bBhak\b/gi, "beit haknesset")
    .replace(/\bBhakti\b/gi, "beit haknesset")
    .replace(/\bKhanas\b/gi, "beit haknesset")
    .replace(/\[hand\]/gi, "")
    .replace(/\bKSHAL\b/g, "siman 152")
    .replace(/\bHadin\b/gi, "the law")
    .replace(/\bDassor\b/gi, "forbidden")
    .replace(/\bAccording to\b/gi, "per")
    .replace(/\bMaga\b/gi, "Magen Avraham")
    .replace(/\bMagan\b/gi, "Magen")
    .replace(/\bSkala\b/gi, "s.k.")
    .replace(/\bBhak\b/gi, "beit haknesset")
    .replace(/\bKhanas\b/gi, "beit haknesset")
    .replace(/\bBehkenas\b/gi, "beit haknesset")
    .replace(/\bPanad\b/gi, "it appears")
    .replace(/\bAkal\b/g, "end of his words")
    .replace(/\bEkal\b/g, "end of his words")
    .replace(/\bDSL\b/g, "meaning")
    .replace(/\bKSHAL\b/g, "siman 152")
    .replace(/\bAAG\b/g, "end of his words")
    .replace(/\bDam[a-z]{2,}\b/gi, "")
    .replace(/\bAmash\b/gi, "and from")
    .replace(/\bDamh\b/gi, "")
    .replace(/\s{2,}/g, " ")
    .trim();
  const mk = String(marker ?? "_").trim();
  const NUM = {
    א: "1", ב: "2", ג: "3", ד: "4", ה: "5", ו: "6", ז: "7", ח: "8", ט: "9", י: "10",
    יא: "11", יב: "12", יג: "13", יד: "14", טו: "15", טז: "16", יז: "17", יח: "18", יט: "19",
    כ: "20", ל: "30", מ: "40", נ: "50",
  };
  if (NUM[mk] && !new RegExp(`^\\(${NUM[mk]}\\)`).test(t)) {
    t = t.replace(/^\(\d+\)\s*/, "");
    t = `(${NUM[mk]}) ${t}`;
  }
  return t;
}

const data = JSON.parse(fs.readFileSync(dataPath, "utf8"));
let n = 0;
const still = [];
for (const it of data.items) {
  if (!it.en) continue;
  const next = postfix(it.en, it.marker, it.he);
  if (next !== it.en) {
    it.en = next;
    n++;
  }
  const pf = preflightFail(it.en);
  const bad = isBadMt447(it.en);
  if (pf || bad) still.push({ rel: it.rel, key: it.key, pf, bad, head: it.en.slice(0, 100) });
}
fs.writeFileSync(dataPath, JSON.stringify(data, null, 2) + "\n");
console.log(`postfix touched ${n}; still bad: ${still.length}`);
if (still.length) {
  console.log(still.slice(0, 30).map((x) => `${x.rel} ${x.key}: ${x.pf || "bad_mt"}`).join("\n"));
  fs.writeFileSync(
    path.join(path.dirname(dataPath), "hand153-garbled-still-bad.json"),
    JSON.stringify(still, null, 2)
  );
}
