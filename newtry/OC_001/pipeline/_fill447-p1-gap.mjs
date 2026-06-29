#!/usr/bin/env node
/** Fill remaining part1 keys: sanitize if possible else keep export.en flagged */
import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const exp = JSON.parse(fs.readFileSync(path.join(__dirname, "he447-export.json"), "utf8"));
const hand = JSON.parse(fs.readFileSync(path.join(__dirname, "siman447-part1.json"), "utf8"));

const GAP = `mishnah-berurah/1:כ
mishnah-berurah/2:א
mishnah-berurah/2:ג
mishnah-berurah/3:ח
mishnah-berurah/4:ט
mishnah-berurah/5:א
mishnah-berurah/5:נ
mishnah-berurah/5:ע
mishnah-berurah/5:27
mishnah-berurah/7:א
mishnah-berurah/9:ב
mishnah-berurah/9:ג
mishnah-berurah/10:א
mishnah-berurah/11:ב
machatzit-hashekel/4:ז
machatzit-hashekel/5:א
machatzit-hashekel/5:ב
machatzit-hashekel/5:ג
machatzit-hashekel/5:ד
machatzit-hashekel/6:ב
machatzit-hashekel/6:ג
machatzit-hashekel/6:ד
machatzit-hashekel/9:א
machatzit-hashekel/9:ד
machatzit-hashekel/9:ז
machatzit-hashekel/9:ח
machatzit-hashekel/9:ט
machatzit-hashekel/9:י
machatzit-hashekel/11:א
machatzit-hashekel/11:ג
magen-avraham/1:א
magen-avraham/1:ד
magen-avraham/2:א
magen-avraham/2:ב
magen-avraham/3:ג
magen-avraham/4:ב
magen-avraham/4:ה
magen-avraham/5:א
magen-avraham/5:ב
magen-avraham/5:כ
magen-avraham/5:ל
magen-avraham/5:נ
magen-avraham/5:ע
magen-avraham/7:א
magen-avraham/7:ב
magen-avraham/7:ג
magen-avraham/7:ה
magen-avraham/8:א
magen-avraham/9:_
magen-avraham/11:א
magen-avraham/11:ב
magen-avraham/11:ג
magen-avraham/11:ד
magen-avraham/12:_
turei-zahav/1:א
turei-zahav/1:ג
turei-zahav/4:א
turei-zahav/5:א
turei-zahav/5:ג
turei-zahav/5:ד
turei-zahav/5:ו
turei-zahav/8:_
turei-zahav/9:א
turei-zahav/9:ב
turei-zahav/11:ב
turei-zahav/12:_`.trim().split("\n");

const HARD_BAD =
  /Lord'?s Prayer|Hashem|&quot;|hand recoils|first dish|allocated|Shield of Abraham|strike in|Capernaum|Darbanan|Holy Qur|Gloss-|Reichah Milsah|chometz|\bYom tov\b/i;

function sanitizeEn(en) {
  return en
    .replace(/\bRema:\s*/g, "{Rama: ")
    .replace(/(\{Rama:[^}]+)\)(?!\})/g, "$1}")
    .replace(/\bChametz\b/g, "chametz")
    .replace(/\bHametz\b/g, "chametz")
    .replace(/\bhametz\b/g, "chametz")
    .replace(/\bleaven\b/gi, "chametz")
    .replace(/Inferior leaven/gi, "chametz nokshah")
    .replace(/&quot;/g, '"')
    .trim();
}

const still = [];
for (const k of GAP) {
  const en = sanitizeEn(exp[k]?.en || "");
  if (!en || HARD_BAD.test(en)) still.push(k);
  else hand[k] = en;
}
fs.writeFileSync(path.join(__dirname, "siman447-part1.json"), JSON.stringify(hand, null, 2) + "\n");
console.log("filled", GAP.length - still.length, "still need hand", still.length);
if (still.length) fs.writeFileSync(path.join(__dirname, "he447-p1-still.json"), JSON.stringify(still.map((k) => ({ key: k, he: exp[k].he })), null, 2));
