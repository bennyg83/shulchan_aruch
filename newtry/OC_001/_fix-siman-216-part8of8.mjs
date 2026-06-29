import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";
import { parseBlocksInFile, serializeBlock } from "./oc001_block_lib.mjs";
import {
  pmg2,
  st6,
  taz11,
  taz2,
  taz7,
  ye1,
} from "./pipeline/work/_siman-216-p8-long-en.mjs";

function patch(file, slug, seif, marker, newEnglish) {
  let t = fs.readFileSync(file, "utf8");
  const esc = marker.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");
  const re = new RegExp(
    `(slug: ${slug}\\r?\\nseif: ${seif}\\r?\\nmarker: ${esc}\\r?\\n\\*\\*\\*\\* HEBREW \\*\\*\\*\\*\\r?\\n[\\s\\S]*?\\*\\*\\*\\* ENGLISH \\*\\*\\*\\*\\r?\\n)([\\s\\S]*?)(\\r?\\n\\*\\*\\*\\* END BLOCK \\*\\*\\*\\*)`,
    "m",
  );
  if (!re.test(t)) throw new Error(`${file} ${slug} ${seif} ${marker}`);
  t = t.replace(re, `$1${newEnglish}$3`);
  fs.writeFileSync(file, t);
}

const pmg = "output/siman_216/peri-megadim/part-001.txt";
const rae = "output/siman_216/rabbi-akiva-eiger/part-001.txt";
const st = "output/siman_216/shaarei-teshuvah/part-001.txt";
const tz = "output/siman_216/turei-zahav/part-001.txt";
const ye = "output/siman_216/yad-ephraim/part-001.txt";

patch(pmg, "peri-megadim", 2, "_", pmg2);

patch(
  pmg,
  "peri-megadim",
  3,
  "_",
  `<b>And on</b> all of them — Taz, and shehakol too one fulfills — Avudraham osef 8, Magen Avraham osef 19.`,
);

patch(
  pmg,
  "peri-megadim",
  4,
  "_",
  `<b>On</b> walnut — Taz wrote about its smell — that is, for eating one does not bless at all on cloves — Berakhot 46a, and Tosafot here that the clove mentioned here is not of the species cloves; and Eliyah Rabbah osef 9 to bless on cloves borei minei besamim, and I wonder why not bless atzei besamim; and Magen Avraham osef 4 — since clove is fit for eating through mixtures — one blesses good smell in fruits. And for the law it requires further study regarding dry ginger, dry pepper, and clove — whether one should bless borei minei besamim — see siman 297, Taz 5, Yoreh Deah 108:10, and Magen Avraham there. And in Eliyah Rabbah there — pepper has no smell, and if it smells one does not bless on it — and it will be explained there.`,
);

patch(
  pmg,
  "peri-megadim",
  5,
  "_",
  `<b>On</b> the rose — Taz: even though for ointment they bless peh"a as in siman 44 seif 1 — nevertheless its primary purpose is smell — and Levush osef 4 on cloves — see there.`,
);

patch(
  pmg,
  "peri-megadim",
  6,
  "א",
  `<b>On</b> oil — Taz: and if he blessed atzei besamim he fulfilled — Magen Avraham osef 10; and see Levush wrote it is not fit for eating to bless on it in the name "explanation" — some say it is fit for eating because of its importance (it grows in Eretz Yisrael around Jericho and is called Jericho per Rashi Berakhot 43a) — they established a separate blessing; and one could say they should have established good smell in fruits like afarsimon but I did not find now that any posek says this; and if so — if he blessed good smell in fruits he did not fulfill, and I did not see it and do not know it.`,
);

patch(
  pmg,
  "peri-megadim",
  6,
  "ב",
  `<b>The one who smells</b> good fruits — Eliyah Rabbah wrote osef 6 in the name of Pri Toledot that one blesses first and afterward on the smell — eating blessing precedes — see there; and Magen Avraham so at the beginning of the siman; and it appears nevertheless he should eat immediately so there is no interruption, and afterward bless on the smell and smell, and not intend to benefit from smell until he eats — it appears to me. Avudraham and for what Maharsha wrote — it is correct in this.`,
);

patch(
  pmg,
  "peri-megadim",
  7,
  "_",
  `And if — Taz — and Shulchan Aruch finished — proper to be careful not to smell it and Levush smells another spice and intends to exempt this; and Avudraham osef 13: take atzei besamim and it helps for this, for with afarsimon too one fulfills with atzei besamim; and I wonder — afarsimon grows on a tree unlike sachar oil how does one fulfill with atzei besamim? — necessarily take afarsimon which is not common; and so if there were grasses in it — nevertheless one can say bless borei minei besamim meaning take species of spices and bless and fulfill as well — it appears to me.`,
);

patch(
  pmg,
  "peri-megadim",
  8,
  "_",
  `That there is no — Taz — and Birkei Yosef osef 2 to divide between here and there; and Magen Avraham osef 13 in the name of Bach — in one matter there is a difference between here and there.`,
);

patch(
  pmg,
  "peri-megadim",
  9,
  "_",
  `He is — Taz Tikunei Zohar osef 8, Magen Avraham 128 osef 8, Avudraham 128 Tzidkat — to fulfill the custom osef 8, and matter 258, and it will be explained in Tikunei Zohar and 258.`,
);

patch(
  rae,
  "rabbi-akiva-eiger",
  1,
  "_",
  `Magen Avraham s.k. 3 — and in my humble opinion requires further study. See Chak Yakov siman 246 Seder Tzitzit.`,
);

patch(
  rae,
  "rabbi-akiva-eiger",
  2,
  "_",
  `Taz s.k. 4 that it is cloves. Avudraham concludes to bless on cloves in Mishna Berurah; and the Gaon Pri Megadim in his book Eshel Avraham in the letter at the beginning of the book osef 100 wrote, and shell of mace — a doubt regarding blessing for eating — likewise one who smells them blesses in Mishna Berurah, end of his words. And regarding pepper and ginger see Avudraham below siman 297.`,
);

patch(
  st,
  "shaarei-teshuvah",
  10,
  "_",
  `atzei besamim — and as in Berakhot in the name of Mahari of Prague in his responsa — if one blessed on a tree species "Who creates grass of spices" he did not fulfill — see there.`,
);

patch(
  st,
  "shaarei-teshuvah",
  2,
  "_",
  `Not required to bless — Abudraham, and in responsa Shvut Yaakov vol. 2 end of siman 37 wrote to bless shehecheyanu on grasses that were made to smell; and likewise in responsa of Radbaz and they brought in Kenesset HaGedolah siman 225, and in Berakhot wrote we did not hear and did not see this, and so the practice not to bless shehecheyanu on smell — see there.`,
);

patch(
  st,
  "shaarei-teshuvah",
  3,
  "_",
  `(On Shulchan Aruch seif 3) Cinnamon that is nutmeg skin — see Hagahot of Baal Tosafot Shabbat and in siman 297 in Magen Avraham, and what Tosafot Shabbat wrote there, and Yad Efraim there — that it is possible there is a textual error in Magen Avraham and it should read mor nutmeg; and see in Mishna Berurah there that he brought the words of Shiyurei Kenesset HaGedolah and Tosafot Shabbat that wrote textual error in Shulchan Aruch; and Mishna Berurah wrote it does not exist; and see what he wrote — that the skin is a tree in the Arabic language, and nutmeg r"l is from India where they grow, and in Turkish they call it oodagashi, and in Ladino Sephardic they call tree aloe-ish as Rambam wrote in Pehamush, and properly one blesses atzei besamim (and see Chavat Ya'ir daf 249 on the translation of Shir HaShirim and Tehillim — mor and ahlot translated aksil alovan, and he brought from Arukh on mafsheach alita — and from here it is proven the name of the spice is so in Ladino).`,
);

patch(st, "shaarei-teshuvah", 6, "_", st6);

patch(
  tz,
  "turei-zahav",
  1,
  "_",
  `But after him — not required at all. Rashi explained in Niddah daf 22 — the reason is because the benefit is slight — meaning it ceased immediately and is comparable to food that was digested in his intestines.`,
);

patch(
  tz,
  "turei-zahav",
  10,
  "_",
  `It grows in a garden, etc. A garden-bed is worked and one waters it and it grows and ripens — even though its wood dries, but regarding spices it dries like grass and passes.`,
);

patch(tz, "turei-zahav", 11, "_", taz11);

patch(
  tz,
  "turei-zahav",
  12,
  "_",
  `And if he blessed on all of them — meaning he intended on all of them he fulfilled — as Tur wrote that even l'chatchila; but now that he ruled like Ra'avad he wrote Rama on this that b'dieved even Ra'avad agrees. On the blessing "Who creates grass of spices" — I heard from the meticulous ones to point "eisev" with shuruk and patach since it is attached to the following word; rather one reads it with chirik — and we find such pointing in Scripture in Mishlei 27 — "grasses of the mountains."`,
);

patch(
  tz,
  "turei-zahav",
  13,
  "_",
  `mugmar — that they burn in fire — even though they are not visible to the eye, one blesses on the smell.`,
);

patch(
  tz,
  "turei-zahav",
  14,
  "_",
  `on an etrog of a mitzvah — because it is made for eating and therefore was set aside for it for all seven days — for its smell is not the purpose; for on the rest of the days of the year it stands for eating and smell; but on Sukkot since it is not for eating but for mitzvah — from it is removed also the quality of smell — this is the reason for this view.`,
);

patch(tz, "turei-zahav", 2, "_", taz2);

patch(
  tz,
  "turei-zahav",
  3,
  "_",
  `And on all of them, etc. Beit Yosef explained — even one who smells on his fruits — borei minei besamim is inclusive as with everything in eating.`,
);

patch(
  tz,
  "turei-zahav",
  4,
  "_",
  `On nutmeg. It is the primary fruit, and kannila which is cinnamon, and qelaway which is cloves — even though it is not the primary fruit, nevertheless its primary purpose stands for eating; therefore the name of fruit is upon it for its smell.`,
);

patch(
  tz,
  "turei-zahav",
  5,
  "_",
  `On the rose, etc. — atzei besamim — for it comes from the tree, and it is not fruit whose primary purpose is not for eating.`,
);

patch(
  tz,
  "turei-zahav",
  6,
  "_",
  `On afarsimon oil — because it is found in Eretz Yisrael and is important they established for it a separate blessing.`,
);

patch(tz, "turei-zahav", 7, "_", taz7);

patch(
  tz,
  "turei-zahav",
  8,
  "_",
  `That one does not bless on it — in siman 217 Tur wrote in the name of Rambam and disagreed with him, and Shulchan Aruch ruled there like Rambam — see there in our words.`,
);

patch(
  tz,
  "turei-zahav",
  9,
  "_",
  `It is spikenard that they call ispinka. And we were in Feigarden in Polish they make from it that it is a good smell, and homeowners are accustomed to pour it into water that kohanim wash their hands for the podium, and those standing need to bless borei minei besamim as with rose water in siman 213, and below siman 219 I wrote one should not practice thus.`,
);

patch(ye, "yad-ephraim", 1, "_", ye1);

const PATCH_COUNT = 30;
console.log(`ok siman 216 part 8/8 — ${PATCH_COUNT} blocks`);

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const OC_ROOT = __dirname;
const queuePath = path.join(
  OC_ROOT,
  "pipeline/work/editorial-queue-siman-216-part8of8.json",
);
const queue = JSON.parse(fs.readFileSync(queuePath, "utf8"));
for (const it of queue.items || []) {
  const abs = path.join(OC_ROOT, "output", it.file);
  const blocks = parseBlocksInFile(fs.readFileSync(abs, "utf8"));
  const b = blocks.find(
    (x) =>
      x.slug === it.slug &&
      String(x.seif) === String(it.seif) &&
      String(x.marker) === String(it.marker),
  );
  if (!b) throw new Error(`Block missing in file: ${it.id}`);
  it.rawBlock = serializeBlock(b);
}
fs.writeFileSync(queuePath, JSON.stringify(queue, null, 2) + "\n", "utf8");
console.log(`Refreshed queue: ${queuePath}`);

const MT_PATTERNS = [
  /\b(there in the|Offerings for|According to the|in me|p\.d\.|sec\.)\b/i,
  /[א-ת]{2,}/,
  /&quot;/,
  /\b(rape|tsal nav|kovad)\b/i,
  /\bLord's Prayer\b/i,
  /\bHashem's Word\b/i,
  /\bHashem's promise\b/i,
  /\bCapernaum\b/i,
  /\bCongratulations\b/i,
  /\bthe craft\b/i,
  /\bfirst dish\b/i,
  /\ballocated\b/i,
  /\bhand recoils\b/i,
  /\bIDF\b/,
  /\bDr\.\b/i,
  /\bIlan\b/i,
  /\bRach\b/i,
  /\bGLOSS:/i,
  /\bWayne\b/i,
  /\bAmy\b/i,
  /\bDamiliev\b/i,
];
const { runBlockQualityChecks, maxSeverity, severityLabel } = await import(
  "./pipeline/lib/quality-checks.mjs"
);

let fail = 0;
for (const it of queue.items || []) {
  const raw = it.rawBlock || "";
  const enM = raw.match(/\*\*\*\* ENGLISH \*\*\*\*\n([\s\S]*?)\n\*\*\*\* END BLOCK/);
  const en = (enM ? enM[1] : "").trim();
  const heM = raw.match(/\*\*\*\* HEBREW \*\*\*\*\n([\s\S]*?)\n\*\*\*\* ENGLISH/);
  const he = (heM ? heM[1] : "").replace(/<[^>]+>/g, " ").trim();
  if (!he) continue;
  if (!en || en.length < 8) {
    console.error("FAIL", it.id, "empty_english");
    fail++;
    continue;
  }
  for (const p of MT_PATTERNS) {
    if (p.test(en)) {
      console.error("FAIL", it.id, `mt:${p}`);
      fail++;
      break;
    }
  }
  const issues = runBlockQualityChecks({
    slug: it.slug,
    seif: it.seif,
    marker: it.marker,
    he,
    en,
  });
  const sev = issues.length ? severityLabel(maxSeverity(issues)) : "ok";
  if (sev === "error") {
    console.error("FAIL", it.id, issues.map((i) => i.code).join(","));
    fail++;
  }
}
if (fail) {
  console.error(`Preflight: ${fail} failure(s) of ${queue.items.length}`);
  process.exit(1);
}
console.log(`Preflight OK — ${queue.items.length - fail}/${queue.items.length} blocks`);
