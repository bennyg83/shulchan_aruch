#!/usr/bin/env node
/** Final 6 hand EN fixes — simanim 621–640 remnants */
import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";
import { parseBlocksInFile, serializeBlock } from "../oc001_block_lib.mjs";
import { isBadMt447 } from "./lib/bad-mt-447.mjs";
import { preflightFail } from "./_slot16-lib.mjs";

const FIXES = {
  "siman_621/kaf-hachayyim/part-001.txt": {
    "6:_":
      "(6) There. If it falls on Shabbat they read seven, like other Shabbatot. If there is a custom on other Shabbatot to read more than seven, on Yom Kippur too they do not reduce. Levush. I heard that some great authorities ruled not to add on Yom Kippur even when it falls on Shabbat, because the parsha headings are aligned to support atonement matters and therefore it is better not to change them. Magen Avraham siman 282 sk 2. Eliyah Rabbah in this siman seif 2. Matzas wrote in siman 219 seif 50 that even where because of many aliyot there is surplus from aliyot for charity they did not practice adding and they conclude the sixth or seventh reading at the verse \"and it was so\" etc. — see there. And so he wrote in his book Shaarei Efraim shaar 7 seif 17. However, Ateret Zekenim at the start of the siman wrote that in a place where they give much charity from aliyot they do add — see his words at length there.",
  },
  "siman_629/mishnah-berurah/part-001.txt": {
    "4:ב":
      "(12) Invalid — rabbinically, because its form does not stand upright and it appears as though it is not from ground growth; and further, since it is fit to place into beds and pillows and then it would receive impurity, therefore also in tow of broken flax stalks shaken from flax one does not roof, for from that too it is fit to fill beds and pillows. Behold, per these reasons even in cotton and hemp that do not receive impurity in negaim, if crushed and beaten one does not roof with them; and they also wrote a reason: since once crushed and beaten it is close to being spun and would receive impurity, therefore they decreed not to roof with it; per this, for cotton and hemp that do not receive impurity at all this decree does not apply — nevertheless one should be stringent.",
  },
  "siman_638/levushei-serad/part-001.txt": {
    "2:_":
      "There, that both are from the Torah. On this Rosh challenged; but Rosh admits that rabbinically the walls too are forbidden.",
  },
  "siman_638/netiv-chayim/part-001.txt": {
    "1:_":
      "(Magen Avraham sk 1) Likewise reeds — it should read canes, meaning canes that they lean against the sukkah walls to thicken and strengthen them.",
  },
  "siman_639/chokhmat-shlomo/part-001.txt": {
    "2:_":
      "(There, seif 5) Rain fell — therefore he entered the house, etc. NB: I was asked at a time when rain was falling only on one sukkah while rain did not fall into another — whether to bless leishev basukkah or not. I answered that one does not bless. Proof from what the poskim wrote: even when there is no discomfort before him he is also exempt; if so, since the Sages gave a measure of when discomfort begins, it implies that this is the reason for exemption; nevertheless, even when there is no discomfort before him he is exempt — since if there were discomfort before him he would be exempt, and also since afterward there will be discomfort and he will be exempt, therefore here too he is exempt. It appears one could bring proof to the contrary from what Magen Avraham wrote siman 629: if rain drips from the sekhakh one may tie a sheet — see there and consider.",
  },
  "siman_639/yad-ephraim/part-001.txt": {
    "4:_":
      "Taz sk 17 — therefore it appears that also on the second night, etc. — meaning the law is clear to us per Semag and Asheri only regarding the second night; and since we are expert in fixing the month and there is also the view of Semak and Or Zarua, one should be concerned on the second night to be stringent per their words not to bless.",
  },
};

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const ROOT = path.join(__dirname, "..", "output");
const bad = [];
const pf = [];

for (const [relPath, blockFixes] of Object.entries(FIXES)) {
  const fp = path.join(ROOT, relPath);
  const blocks = parseBlocksInFile(fs.readFileSync(fp, "utf8"));
  const out = blocks
    .map((b) => {
      const key = `${b.seif}:${b.marker || "_"}`;
      if (blockFixes[key]) return { ...b, en: blockFixes[key].trim() };
      return b;
    })
    .map(serializeBlock)
    .join("\n\n");
  fs.writeFileSync(fp, out.endsWith("\n") ? out : out + "\n", "utf8");
  for (const [key, en] of Object.entries(blockFixes)) {
    if (isBadMt447(en)) bad.push(`${relPath} ${key}`);
    const p = preflightFail(en);
    if (p) pf.push(`${relPath} ${key}: ${p}`);
  }
}

if (pf.length) {
  console.error("PREFLIGHT:", pf.join("\n"));
  process.exit(1);
}
if (bad.length) {
  console.error("BAD_MT:", bad.join("\n"));
  process.exit(1);
}
console.log("ok bad_mt=0 preflight=0 applied", Object.keys(FIXES).length, "files");
