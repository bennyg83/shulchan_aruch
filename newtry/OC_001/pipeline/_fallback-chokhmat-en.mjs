#!/usr/bin/env node
/** Temporary: set chokhmat en from structured Hebrew expansion until full editorial pass */
import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";
import { autoFix } from "./_slot15-lib.mjs";

const siman = Number(process.argv[2]);
const __dirname = path.dirname(fileURLToPath(import.meta.url));
const handPath = path.join(__dirname, "work", `hand-slot15-siman-${siman}.json`);
const hand = JSON.parse(fs.readFileSync(handPath, "utf8"));

function expandHe(he) {
  return he
    .replace(/\(שם סעיף ([^)]+)\)/g, "(Same section $1) ")
    .replace(/נ"ב/g, "It appears to me: ")
    .replace(/ע"ש/g, "see there")
    .replace(/מ"ע שהז"ג/g, "positive time-bound mitzva")
    .replace(/ב"ח/g, "Bach")
    .replace(/מג"א/g, "Magen Avraham")
    .replace(/הב"ח/g, "Bach")
    .replace(/ר"י/g, "R' Yosi")
    .replace(/ר' יוסי/g, "R' Yosi")
    .replace(/ר"י הודא/g, "R' Yehuda")
    .replace(/ר' יהודה/g, "R' Yehuda")
    .replace(/רמב"ם/g, "Rambam")
    .replace(/הרמב"ם/g, "Rambam")
    .replace(/תוס'/g, "Tosafot")
    .replace(/התוס'/g, "Tosafot")
    .replace(/התוספות/g, "Tosafot")
    .replace(/כ"כ/g, "likewise")
    .replace(/לפ"ז/g, "according to this")
    .replace(/לפענ"ד/g, "in my humble opinion")
    .replace(/ודו"ק/g, "requires study")
    .replace(/א"כ/g, "if so")
    .replace(/מ"מ/g, "nevertheless")
    .replace(/דהיינו/g, "that is")
    .replace(/וכו'/g, "etc.");
}

for (const it of hand.items) {
  if (it.slug !== "chokhmat-shlomo" || it.en) continue;
  const he = it.hePlain || it.he || "";
  it.en = autoFix(`(Chokhmat Shlomo) ${expandHe(he)}`, it.marker, it.he || "");
}
fs.writeFileSync(handPath, JSON.stringify(hand, null, 2) + "\n", "utf8");
console.log("fallback done", siman);
