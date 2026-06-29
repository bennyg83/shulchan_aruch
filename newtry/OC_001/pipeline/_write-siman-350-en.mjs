#!/usr/bin/env node
import fs from "fs";
function esc(s) { return s.replace(/\\/g, "\\\\").replace(/`/g, "\\`"); }
function emit(obj, name) {
  const lines = ["export const t = {"];
  for (const [k, v] of Object.entries(obj)) lines.push(`  ${JSON.stringify(k)}: \`${esc(v)}\`,`);
  lines.push("};");
  fs.writeFileSync(name, lines.join("\n") + "\n", "utf8");
}

const bh = {
  "1:_": `Provided he not pass four amot — if he passed, liable (Raavad).`,
  "2:_": `And if he urinated or spat — liable, for his intent makes it a place; likewise throwing into furnace or dog mouth (Magen Avraham).`,
};

const beer = {
  "1:א": `Mishnah Eruvin 98 and first Tanna`,
  "1:ב": `There Gemara 99 from Mishnah should not stand etc.`,
  "1:ג": `There in Mishnah`,
  "1:ד": `Dragging there 99`,
  "1:ו": `There in Gemara and Rava`,
  "1:ז": `Likewise Piskei Rambam in Yad Malachi; Rambam's view`,
  "1:ח": `Rav Maggid per Rambam`,
  "2:א": `Mishnah there 98`,
  "2:ב": `Rosh chapter 6 Shabbat for all`,
  "3:א": `There inquiry unresolved; Tosafos Eruvin 93 forbid to take out`,
  "3:ב": `Tur and R' Yehuda Mishnah 98 implies first Tanna does not argue`,
};

const gra = {
  "1:א": `Seif 1 therefore permitted — Mishnah 101a; as written 99 beginning rabbis etc.`,
  "1:ב": `Since — as Rashi there.`,
  "1:ג": `And some — language "objects" forty — Rambam; seems even needed objects permitted.`,
  "2:א": `Seif 2 or karmelit — Rava agrees here.`,
  "2:ב": `And his amah — Rava inquiry; Tosafos 1a s.v. no; not so; Rif chapter 6 and Shulchan Aruch siman 303 s.k. 23 likewise karmelit permitted thus.`,
};

const mb = {
  "1:א": `(1) Not needed in place he stands — even fine vessels.`,
  "1:ב": `(2) Not pass four amot — standing reshut ha-yachid, hand moves object four amot in reshut ha-rabbim — liable even above ten if ends on ground.`,
  "1:ג": `(3) Take key reshut ha-yachid — key already there; open without hotza'ah — ganak outside, partitions reshut ha-yachid, or pegged lock; siman 346 s.k. 2 MB.`,
  "1:ד": `(4) Open there — not concerned bring to him — not needed outside.`,
  "1:ה": `(5) From reshut ha-yachid to reshut ha-rabbim — stand reshut ha-yachid take key in reshut ha-rabbim open shop — divisions; siman 346 s.k. 3 MB.`,
  "1:ו": `(6) Needs waters — fine or not fine vessels; food/clothing needed in place.`,
  "1:ז": `(7) Karmelit — reshut ha-rabbim decree lest bring to him; no decree on decree karmelit.`,
  "1:ח": `(8) Some explain — primary first view (Avodat HaRav).`,
  "2:א": `(9) Urinate spit — uprooting from body; intentional place four tefachim — chatat (Gemara).`,
  "2:ב": `(10) Karmelit — domain to domain d'oraisa — karmelit forbidden rabbinically; same far four amot (Avodat HaRav).`,
  "2:ג": `(11) Mouth amah outward — follow uprooting place not exit; standing domain; Gra: Torah domains only sfeika — lenient karmelit like siman 303 s.k. 23.`,
  "3:א": `(12) Ready to cast — Avodat HaRav: only after turned in mouth ready to exit.`,
  "3:ב": `(13) Some say — Mechaber "some say"; many Rishonim (Avodat HaRav).`,
  "3:ג": `(14) Not walk four amot — also not cross domains until spit; load on shoulder.`,
};

const ma = {
  "1:א": `Not pass four amot — if passed liable (Maggid Mishneh Raavad).`,
  "1:ב": `Place he drinks — drinking is hanachah unlike urinating; only seif 2; water in mouth makom patur — unlike hand siman 348; Rosh.`,
  "2:א": `Spit — intent makes place; furnace or dog mouth.`,
  "2:ב": `Took out mouth — Gemara doubt follow uprooting or export.`,
};

const mh = {
  "2:א": `(s.k. 2) place he drinks — drinking hanachah like urinating reshut ha-yachid to reshut ha-rabbim liable; mouth/amah same domain dragged after body; Rosh question why "took out mouth"; urine not rest in amah unlike water in mouth; hand siman 348 different — no makom patur interruption; drinking impossible without mouth hanachah; hand took vessel before makom patur on hand.`,
  "2:ב": `Impossible drink without placing mouth — unlike urinating; Rosh spit doubt even mouth out; Magen Avraham mouth out doubt; Rosh spit in mouth before makom patur.`,
  "2:ג": `Hand there — took before makom patur; drinking mouth makom patur before water.`,
  "2:ד": `Spit too — doubt liable; not mouth makom patur if spit in mouth with body; Magen Avraham spit; skip urinating no rest in amah.`,
  "3:_": `(s.k. 3) spit — Tosafos Eruvin 99a intent makes place: dog mouth, furnace; not sticks even intentional.`,
};

const er = {
  "1:_": `[1] provided not pass — liable (Raavad Magen Avraham ch.15); Rambam/Bach question "provided"; liable even above ten.`,
  "2:_": `[2] needs — food clothing needed in place (Avodat HaKodesh 14); Rosh end Eruvin questioned above ten; Yerushalmi study.`,
  "3:_": `[3] some explain — stringent first view (Maggid); primary for poskim.`,
};

const kaf = {
  "1:_": `(1) not needed — take key other domain open there not needed in standing domain; needed objects in standing domain forbidden lest forget pull (Beit Yosef).`,
  "2:_": `(2) even fine vessels — Rashba.`,
  "3:_": `(3) not pass four amot — standing reshut ha-yachid hand moves four amot reshut ha-rabbim (Taz s.k. 1).`,
};

const biur = {
  "2:א": `Urinate spit — likewise furnace or dog (Tosafos); not sticks intentional.`,
  "2:ב": `Reshut ha-yachid — rolls to reshut ha-rabbim forbidden; to karmelit permitted no decree (Avodat HaRaz).`,
  "3:א": `Spit ready — MB: inverted; Taz intent.`,
  "3:ב": `Reshut ha-rabbim — Torah or rabbinic like carrying; R' Yehuda adds before mouth; Abaye/Rava karmelit; lenient reshut ha-rabbim poskim; Gra incline karmelit not our reshut ha-rabbim.`,
};

const pm = {
  "1:א": `provided Taz — Mishnah Eruvin 98:2 Rashi "provided"; Gemara 99 exempt or liable; Raavad if exempt teach not outside four; less than four not decree on decree; Eruvin tower question; Taz/Avodat HaGershuni/Magen Avraham.`,
  "1:ב": `spit inverted — Mishnah commentary R' Meir; Gemara 99 exchange; Rashi wonder first Tanna inverted; halacha first Tanna inverted; kosher inverted not Shabbat.`,
  "1:ג": `Rambam ch.15 — inverted not watering; Shabbat 9a Tumah; study.`,
};

const taz = {
  "1:_": `provided four amot — standing reshut ha-yachid hand moves object four amot reshut ha-rabbim.`,
};

const small = {
  "rabbi-akiva-eiger:1:_": `head majority — animal too: majority inside; Rambam ch.15 camel long neck.`,
  "rabbi-akiva-eiger:2:_": `Magen Avraham s.k. 2 place in reshut ha-rabbim exempt — siman 348 intentional dark may cast chatat?`,
  "yad-ephraim:1:_": `Magen Avraham s.k. 2 lest take out openly — siman 348 no makom patur interruption unlike drinking mouth makom patur; hand took before makom patur; spit no hanachah makom patur; Rosh export; Rambam ch.13; Peri Megadim/Machatzit HaShekel; swallow spit reshut ha-rabbim? Tosafot Eruvin 20 R' Meir; Eben HaOzor 259; Yerushalmi spit wind liable sowing; Maharikash; Maharaz Azulai; study Yerushalmi.`,
};

emit(bh, "bh350-en.mjs");
emit(beer, "beer350-en.mjs");
emit(gra, "gra350-en.mjs");
emit(mb, "mb350-en.mjs");
emit(ma, "ma350-en.mjs");
emit(mh, "mh350-en.mjs");
emit(er, "er350-en.mjs");
emit(kaf, "kaf350-en.mjs");
emit(biur, "biur350-en.mjs");
emit(pm, "pm350-en.mjs");
emit(taz, "taz350-en.mjs");
emit(small, "small350-en.mjs");
console.log("350 en files written");
