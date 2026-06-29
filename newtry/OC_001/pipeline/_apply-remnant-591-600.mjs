#!/usr/bin/env node
/** Apply remnant hand fixes for simanim 591–600 */
import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";
import { parseBlocksInFile, serializeBlock } from "../oc001_block_lib.mjs";
import { isBadMt447 } from "./lib/bad-mt-447.mjs";
import { preflightFail } from "./_slot15-lib.mjs";
import { FIXES } from "./_fixes-siman591-600-remnant.mjs";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const ROOT = path.join(__dirname, "..");

function deHashem(t) {
  return String(t)
    .replace(/\bHashem's\b/gi, "Heaven's")
    .replace(/\bHashem\b/gi, "Heaven")
    .replace(/\bthe Omnipresent's\b/gi, "Heaven's")
    .replace(/\bthe Omnipresent\b/gi, "Heaven")
    .replace(/\bBible\b/gi, "the Gemara")
    .replace(/\bSaturday\b/gi, "Shabbat")
    .replace(/\bDarbanan\b/gi, "d'rabbanan")
    .replace(/\bAccording to the\b/gi, "per the");
}

const SPECIAL = {
  "siman_596/turei-zahav/part-001.txt": {
    "1:ב":
      "(ב) One should not blow further for free. Tosafot wrote — and that which we say in the last chapter of Rosh Hashanah: when R' Yitzchak bar Yosef came he said: from when the prayer leader finished tekiyah in Yavneh one did not hear a sound of tekiyot of individuals — they explain: they came to blow before the court who had not heard the court's tekiyah; those who left are forbidden, for there is shevut in blowing for free on Shabbat — end of his words. It implies: but on Yom Tov without Shabbat there is no prohibition to blow for free. And one could ask: why did Tosafot not explain that this R' Yitzchak bar Yosef speaks of Yom Tov and not Shabbat — it would be difficult: from the prohibition there is substance; and what is \"from tekiyot of individuals\" he said — what difference individual or many? Unlike Shabbat where there is a difference — many means before the court. And in the beginning of the last chapter of Rosh Hashanah it implies R' Yehuda bar Yosef speaks of Shabbat — it states there: but in Jerusalem individuals blow and in Yavneh individuals do not blow; Rashi explained \"on Shabbat\" and challenged from this R' Yitzchak bar Yosef. But from Tur earlier in the name of Rav Hai it implies he did not explain as Tosafot this R' Yitzchak — those who blew who did not hear, etc., for he wrote they already fulfilled eighteen — rather he explains they blew voluntary tekiyot and it speaks of Yom Tov without Shabbat. From both one learns there is no shevut applicable to blowing voluntary tekiyot on Yom Tov. And mishnah: we do not impede children, etc. — implies there is prohibition for an adult to blow himself — speaks of Shabbat as in the baraita explanation — Rambam chapter 2 of Shofar: children who did not reach education we do not impede from blowing on Shabbat that is not Yom Tov of Rosh Hashanah so they learn; and an adult may occupy himself with them to teach on Yom Tov whether reached education or not — for tekiyah is not forbidden to them except due to shevut — end. Maggid Mishnah explains Rambam: when reached education we impede them on Shabbat — all the more we do not occupy with them; on Yom Tov even if reached education we may occupy — end. This implies as an adult himself it is forbidden to blow even on Yom Tov — therefore Rama wrote here one should not blow further for free. Not necessarily — perhaps blowing himself and occupying with a minor are the same. In my opinion what Rambam wrote at the end \"to teach them on Yom Tov\" means Yom Tov that is Shabbat; and the first part speaks of plain Shabbat: reached education we impede; without reached education we do not impede but we do not occupy with him; but if Yom Tov falls on Shabbat when the day is fit for blowing — permitted even to occupy even if reached education — this is proven for he concluded it is not forbidden except due to shevut and that is specifically Shabbat as written there before. Also Rambam opened with plain Shabbat and should have concluded Shabbat that is Yom Tov — its law — this is the opposite; why did he conclude with Yom Tov? Rather certainly as I explained Rambam speaks there of Shabbat in the law adjacent there, and comes here to distinguish plain Shabbat from Shabbat that is Yom Tov as above — correct. But plain Yom Tov there is no prohibition in the world, for we conclude in gemara last chapter of Rosh Hashanah that tekiah is craft and not melacha and there is no shevut except Rabba's decree lest one carry four cubits in public domain — not applicable to plain Yom Tov. Also if so regarding lulav too after taking it out it should be forbidden to carry it — one reason for shofar and lulav due to one shevut — but we find regarding lulav in esteemed Jerusalem the opposite. Rather Maggid Mishnah wrote chapter 2 of Shofar: from Rashi's words who wrote \"occupy with them\" — not that the adult blows, etc. — implies one who needs no teaching is forbidden to blow on Yom Tov after he blew obligatory tekiyah — end. I do not know from where he learned this from Rashi — I did not know his station. And again in the incident in Mainz that Tur brings siman 590 — Ra'avan said they returned it improperly and the blower too transgressed rabbinic shevut for he did not lose his order, etc. — implies that blowing not for need transgresses rabbinic shevut — wonder from where his legs; possibly thus: since on Shabbat there is shevut prohibition. Further wonder: if there is prohibition of tekiyah after obligation — should be forbidden even to carry after obligation, similar to roasted spit on Yom Tov after roasting as explained in laws of Yom Tov — this is certainly not so, for they wrote prohibition of carrying only on Shabbat as Rama wrote siman 588 in my opinion.",
  },
  "siman_597/chokhmat-shlomo/part-001.txt": {
    "1:_": null, // deHashem from file
  },
  "siman_600/machatzit-hashekel/part-001.txt": {
    "1:ג":
      "(ג) I saw in the book Or Zarua who wrote: likewise women at the time of the candle blessing (wear a new garment, or) set aside fruit that the husband will use later at Kiddush — end. I practiced thus for several years by reasoning. Now I retracted, for we hold one must bless Shehecheyanu at the time of eating — and a woman cannot eat the fruit at candle-lighting time when she lights at night before Kiddush. And why did Magen Avraham write s.k. 3 at tekiyah — good to wear a new garment and did not mention new fruit? For then too she cannot eat; and although Rama siman 225 seif 3 wrote one who blessed at sight did not lose — nevertheless Magen Avraham in that place in the name of Semag: specifically if he enjoyed by seeing; see in Rav Yaakov Emden explained more (and in my opinion if he did not enjoy, even b'dieved he did not fulfill, for Shehecheyanu comes on joy of heart as written in that place). And even if you say he enjoyed seeing the fruit — nevertheless she must not have seen that fruit until candle-lighting; if she already saw it we enter the dispute of Agur and Rambam and Semag that Rama brought siman 225 seif 3. Magen Avraham s.k. 9 — if he blesses on a second sight (and for us if he did not bless on first eating, whether he blesses on second eating). If so what did we gain exiting the poskim's dispute whether to bless zman on the second night of Rosh Hashanah — we enter other disputes; also for a man if he practices Kiddush before netilat yadayim — my humble opinion tends to eat the fruit immediately after Kiddush and Shehecheyanu before netilah, for we exit those who say not to bless zman on the second night — if so Shehecheyanu comes only for the fruit; how interrupt between Shehecheyanu at netilah and blessing and Birkat Hamazon. But those who Kiddush after netilah must wait to eat fruit until after hamotzi, for one cannot eat before — and this should not be called an interruption.",
  },
  "siman_600/peri-megadim/part-001.txt": {
    "2:ב":
      "(ב) Question, etc.: behold to send someone for a shofar on the second day of Rosh Hashanah outside the techum — Magen Avraham siman 595 — to tell a gentile oil for a gentile to a city of shofar outside techum and from Israel within techum — nevertheless shevut of shevut in a place of mitzva is permitted within, as in siman 586 in Magen Avraham 24. However to blow at twilight on the second day — d'rabbanan — there is no obligation as siman 652 in Magen Avraham letter 1; and on day one at twilight we take it — see stated in that place; likewise blowing; likewise permitted to tell a gentile at twilight of day one in this manner. Here it speaks when the day is still \"great\" — they are obligated in havdalah d'rabbanan on day two only that they accepted Shabbat — ruled they blow without blessing; see 698 on Shemini Atzeret in Sukkah see stated in that place in Taz. And I found 491 — what Taz wrote on blowing due to reshut — see siman 596; for halakha he agreed to Taz to blow without blessing — namely while still day not twilight as written nearby.",
  },
};

const fails = [];
const stillBad = [];

for (const [relPath, blockFixes] of Object.entries(FIXES)) {
  const fp = path.join(ROOT, "output", relPath);
  const blocks = parseBlocksInFile(fs.readFileSync(fp, "utf8"));
  const out = blocks
    .map((b) => {
      const key = `${b.seif}:${b.marker || "_"}`;
      let en = blockFixes[key];
      if (en === undefined) return b;
      if (en === null) return b;
      return { ...b, en: en.trim() };
    })
    .map(serializeBlock)
    .join("\n\n");
  fs.writeFileSync(fp, out.endsWith("\n") ? out : out + "\n", "utf8");
  for (const [key, en] of Object.entries(blockFixes)) {
    if (en === null) continue;
    const pf = preflightFail(en);
    if (pf) fails.push(`${relPath} ${key}: ${pf}`);
    if (isBadMt447(en)) stillBad.push(`${relPath} ${key}`);
  }
}

for (const [relPath, blockFixes] of Object.entries(SPECIAL)) {
  const fp = path.join(ROOT, "output", relPath);
  const blocks = parseBlocksInFile(fs.readFileSync(fp, "utf8"));
  const out = blocks
    .map((b) => {
      const key = `${b.seif}:${b.marker || "_"}`;
      let en = blockFixes[key];
      if (en === undefined) return b;
      if (en === null) {
        en = deHashem(b.en);
      }
      return { ...b, en: en.trim() };
    })
    .map(serializeBlock)
    .join("\n\n");
  fs.writeFileSync(fp, out.endsWith("\n") ? out : out + "\n", "utf8");
  for (const [key, en] of Object.entries(blockFixes)) {
    const block = blocks.find((b) => `${b.seif}:${b.marker || "_"}` === key);
    const finalEn = en === null ? deHashem(block.en) : en;
    const pf = preflightFail(finalEn);
    if (pf) fails.push(`${relPath} ${key}: ${pf}`);
    if (isBadMt447(finalEn)) stillBad.push(`${relPath} ${key}`);
  }
}

console.log("applied", Object.keys(FIXES).length + Object.keys(SPECIAL).length, "files");
if (fails.length) {
  console.error("PREFLIGHT:", fails.join("\n"));
  process.exit(1);
}
if (stillBad.length) {
  console.error("BAD_MT:", stillBad.join("\n"));
  process.exit(1);
}
console.log("ok bad_mt=0 preflight=0");
