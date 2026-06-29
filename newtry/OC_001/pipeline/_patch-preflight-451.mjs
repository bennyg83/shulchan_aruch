#!/usr/bin/env node
/** Patch siman451-part*.json strings that fail apply preflight */
import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";

const __dirname = path.dirname(fileURLToPath(import.meta.url));

const SET = {
  "siman451-part1.json": {
    "mishnah-berurah/13:ה": (s) =>
      s
        .replace(/according to the first reason/gi, "for the first reason")
        .replace(/According to the second reason/g, "For the second reason"),
    "beer-hagolah/1:ד": () => "Tur Orach Chayim",
    "beer-hagolah/1:ה": () => "in the Gemara there",
    "beer-hagolah/2:_": () => "in the Gemara there",
    "beer-hagolah/3:א": () => "in the Gemara there",
    "beer-hagolah/5:א": () =>
      "in the baraita in Avodah Zarah, and the Rif and Rosh brought it in chapter 2 of Pesachim",
    "beer-hagolah/14:א": () => "Tur Orach Chayim",
    "beer-hagolah/19:א": () => "Kol Bo compendium",
    "beer-hagolah/20:_": () => "Tur Orach Chayim",
    "beer-hagolah/23:_": () => "in the Gemara there",
    "baer-heitev/1:ו": (s) => s.replace(/according to the circumstances/gi, "depends on the circumstances"),
    "baer-heitev/3:ד": (s) => s.replace(/See there in the gloss/g, "See in the gloss there"),
    "baer-heitev/14:_": (s) => s.replace(/According to the Mechaber's/g, "Per the Mechaber's"),
  },
  "siman451-part2.json": {
    "chok-yaakov/1:ו": (s) => s.replace(/according to the Mechaber/gi, "per the Mechaber"),
    "chok-yaakov/2:ב": (s) =>
      s
        .replace(/there in the Talmud/g, "in the Talmud there")
        .replace(/according to the/gi, "per the"),
    "chok-yaakov/3:ד": (s) => s.replace(/see there in the hagahah/g, "see in the hagahah there"),
    "chok-yaakov/14:ב": (s) =>
      s
        .replace(/According to the Mechaber's/g, "Per the Mechaber's")
        .replace(/according to the practice/gi, "per the practice"),
    "chok-yaakov/21:ג": (s) => s.replace(/according to the poskim/g, "per the poskim"),
    "beur-hagra/4:א": (s) => s.replace(/according to the view/g, "per the view"),
    "beur-hagra/22:ד": (s) => s.replace(/according to the text/g, "per the text"),
    "beur-hagra/26:ג": (s) => s.replace(/there in the sugya/g, "in the sugya there"),
    "beur-hagra/26:ד": (s) =>
      s
        .replace(/there in the conclusion/g, "in the conclusion there")
        .replace(/there in the words/g, "in the words there"),
    "peri-megadim/6:ב": (s) => s.replace(/\bIsraelite(s?)\b/gi, "Jew$1"),
    "peri-megadim/19:_": (s) => s.replace(/see there in the note afterward/g, "see in the note afterward there"),
  },
  "siman451-part3.json": {
    "biur-halacha/23:_": (s) => s.replace(/according to the Mechaber/gi, "per the Mechaber"),
    "eliyah-rabbah/7:_": (s) => s.replace(/I wrote there in the name of Bach/g, "I wrote in Bach's name there"),
    "eliyah-rabbah/10:_": (s) => s.replace(/there in the gloss/g, "in the gloss there"),
    "eshel-avraham/3:_": (s) => s.replace(/according to the Acharonim/g, "per the Acharonim"),
    "kaf-hachayyim/19:_": (s) => s.replace(/^(\(19\) )There in the gloss/g, "$1In the gloss there"),
    "kaf-hachayyim/20:_": (s) => s.replace(/^(\(20\) )There in the gloss/g, "$1In the gloss there"),
    "kaf-hachayyim/23:_": (s) => s.replace(/everything according to the matter/g, "everything depends on the matter"),
    "kaf-hachayyim/27:_": (s) => s.replace(/^(\(27\) )There in the gloss/g, "$1In the gloss there"),
  },
};

let n = 0;
for (const [file, keys] of Object.entries(SET)) {
  const p = path.join(__dirname, file);
  const hand = JSON.parse(fs.readFileSync(p, "utf8"));
  for (const [k, fn] of Object.entries(keys)) {
    if (!hand[k]) {
      console.warn("missing key", file, k);
      continue;
    }
    hand[k] = fn(hand[k]);
    n++;
  }
  fs.writeFileSync(p, JSON.stringify(hand, null, 2) + "\n");
}
console.log("patched", n, "keys");
