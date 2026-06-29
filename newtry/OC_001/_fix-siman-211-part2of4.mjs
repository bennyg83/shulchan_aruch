import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";
import { parseBlocksInFile, serializeBlock } from "./oc001_block_lib.mjs";
import {
  gra3g,
  biur1b,
  chokhmat2,
  eliyah2,
  kaf3,
  kaf6,
} from "./pipeline/work/_siman-211-p2-long-en.mjs";

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

const gra = "output/siman_211/beur-hagra/part-001.txt";
const bhc = "output/siman_211/biur-halacha/part-001.txt";
const csf = "output/siman_211/chatam-sofer/part-001.txt";
const cks = "output/siman_211/chokhmat-shlomo/part-001.txt";
const er = "output/siman_211/eliyah-rabbah/part-001.txt";
const kh = "output/siman_211/kaf-hachayyim/part-001.txt";
const ls = "output/siman_211/levushei-serad/part-001.txt";

patch(
  gra,
  "beur-hagra",
  3,
  "א",
  `<b>Seif 3, and likewise regarding borei peri haAdamah, etc.</b> There:`,
);
patch(
  gra,
  "beur-hagra",
  3,
  "ב",
  `<b>Which of them, etc.</b> And Tosafot there, Magen Avraham s.k. 1 s.v. aval, etc., and it may be explained, etc., and as is implied in the Gemara there that it says one blesses on this, etc., one may bless whichever he wants first; and per Tosafot's explanation, the cherished one is first — as above.`,
);
patch(gra, "beur-hagra", 3, "ג", gra3g);
patch(
  gra,
  "beur-hagra",
  4,
  "א",
  `<b>Seif 4, and specifically, etc.</b> Hagahot Semak and as he wrote, and as written in the Gemara Mishnah 1 that wine on the vine, etc. — thus it is separated; and likewise regarding the first blessing, as written in the mishnah — and it is like borei peri haEtz regarding shehakol:`,
);
patch(
  gra,
  "beur-hagra",
  4,
  "ב",
  `<b>But a cooked dish, etc.</b> that it is also separated — and likewise wine precedes in the verse. There and Tur:`,
);
patch(
  gra,
  "beur-hagra",
  4,
  "ג",
  `<b>All, etc.</b> Tosafot there s.v. zeh, etc., and Magen Avraham:`,
);
patch(
  gra,
  "beur-hagra",
  5,
  "_",
  `<b>Seif 5, thus, etc.</b> Tur in the name of Beit HaGedolot, who wrote that he follows his view that borei peri haEtz is first; but for Rosh who disagrees — one may say even regarding chewing grain; and his words require further study, for we hold that when their blessings are not equal there is no law of precedence, as written in seif 1 — and likewise Tosafot Rid explicitly, and they establish it in porridge; and Rashi there s.v. that R' Yitzchak, etc. — and Rashba wrote for another reason that the verse does not deal with chewing grain, as written in Mishnah 1 — and a practical difference for his words in chewing grain: even wheat does not precede barley; rather per what is written in siman 208 seif 4 in the gloss "and thus," etc., there is no practical difference in this:`,
);
patch(
  gra,
  "beur-hagra",
  6,
  "_",
  `<b>Seif 6, there was, etc. Nevertheless, etc.</b> And they are also included in wheat and barley, for we bless on them borei minei mezonot and hamotzi and birkat hamazon; and Rashi Mishnah 1 s.v. five, etc., and as written in chapter 2 of Pesachim — and Magen Avraham:`,
);

patch(
  bhc,
  "biur-halacha",
  1,
  "א",
  `<b>Radish and olive</b> — and this is not like the view of "some say" in seif 3, which is Beit HaGedolot's view that borei peri haEtz precedes borei peri haAdamah — and even though the second is cherished it precedes; and Avudraham brought that many Rishonim hold like Beit HaGedolot that borei peri haEtz is first, and that is his halachic view — but Magen Avraham and Taz agreed that we follow the cherished one; see what is written below.`,
);
patch(bhc, "biur-halacha", 1, "ב", biur1b);
patch(
  bhc,
  "biur-halacha",
  2,
  "_",
  `<b>And if he does not want, etc., from the seven species, etc.</b> — This law when their blessings are equal is according to all; and when their blessings are not equal, such as radish and olive, it depends on the two views brought in seif 1. And per what we wrote there in Mishna Berurah that the halacha follows those who say there that even when their blessings are not equal the law of precedence also applies — if so, when there is no superiority of the cherished, we certainly follow the seven-species type.`,
);
patch(
  bhc,
  "biur-halacha",
  3,
  "_",
  `<b>And likewise regarding borei peri haAdamah and shehakol</b> — Avudraham wrote in the name of Shelah that it is not proper what the masses do when they place before them liquor and spiced confections from fruits whose blessing is borei peri haAdamah or borei peri haEtz, and they bless on the liquor first shehakol — and he wrote to justify their custom, for their reason is that initially they do not desire to eat any confections at all, and it is as one who does not want to eat now — as in seif 5 — that only after drinking the liquor they desire to eat them; and something similar is found in Beit Yosef. Nevertheless it is proper to always bless first on the confection, for afterward sometimes one thinks only to treat when it comes to remove only the sharpness of the drink and does not truly want to eat — as explained in siman 272; and see there what I wrote in Mishna Berurah s.k. 5 regarding confection with liquor.`,
);
patch(
  bhc,
  "biur-halacha",
  4,
  "_",
  `<b>Precedence for blessing</b> — The Acharonim were puzzled, for above in seif 1 the Mechaber wrote the first view in an anonymous formulation that when their blessings are not equal one blesses on whichever he wants and there is no mitzvah of precedence even if one is of the seven species; and here anonymously that everything earlier in the verse precedes for blessing — thus wheat precedes the other species of borei peri haEtz even though their blessings are not equal [and Rosh's and Tur's words themselves are very difficult, for they are the first view in seif 1, yet they also brought this matter that everything earlier, etc.] — see Bach and Magen Avraham what they wrote on this; and the Gra in s.k. 15 brought Tosafot Rid's words who establish that wheat precedes specifically when one made from them a dish that is very important — and therefore it is fit to precede them against all species; and so from Avudraham; and likewise in Beit Meir. And although Rosh's and Tur's words are strained per all the resolutions, nevertheless the Shulchan Aruch's words can be explained thus — as he himself explained in seif 5.`,
);
patch(
  bhc,
  "biur-halacha",
  5,
  "א",
  `<b>Provided that his intention, etc.</b> — see Mishna Berurah in what he wrote that even if both were before him we require that he intend explicitly to exempt it, for it is not the law that one exempts what is not important, etc. — and this is whether the seven-species type is not the seven species, or the cherished is not the cherished — as in Beit Yosef at the end of the siman in what he brought in the name of Rashba; and likewise Peri Megadim for the law. And if one eats at a host's — since the host's intent applies, it is as if his intent is explicitly to exempt everything the host wants to bring him [Chiddushei R' Akiva Eiger in the name of responsum Giu'er].`,
);
patch(
  bhc,
  "biur-halacha",
  5,
  "ב",
  `<b>On it through his blessing</b> — and behold all this is regarding two species of fruit; but regarding one species — if they brought him after the blessing fruits more beautiful than the first, see above siman 206 in Mishna Berurah s.k. 26 in the name of Avudraham.`,
);
patch(
  bhc,
  "biur-halacha",
  6,
  "_",
  `<b>And it is not of the seven species, etc.</b> — behold per what the Mechaber wrote above in seif 1 in the first view, which is the anonymous view, that where their blessings are not equal we do not follow the seven-species type — there is no place for these words; but the truth is that this matter is not from Hagahot Maimoniot in the name of the Rambam; and it is known that the Rambam's view is that even when their blessings are not equal the seven-species type is better.`,
);

patch(
  csf,
  "chatam-sofer",
  1,
  "_",
  `@11 In Magen Avraham in this siman "they were before him wine." NB see tractate Zevachim daf 90b and Tosafot s.v. chatat, etc., and already noted this in responsa Pri Megadim vol. 3 siman 38; see what is written.`,
);
patch(
  cks,
  "chokhmat-shlomo",
  1,
  "_",
  `<b>Seif 4.</b> Everything earlier in the verse "a land flowing with milk and honey," etc. — therefore dates precede grapes, for this is second to the latter land and that is second to the first land, etc. NB ostensibly one should investigate this from Mishnah Menachot chapter Kol HaKorbanot Tzibbur mishnah 5, which says there: the second in the first and the first in the second are equal; and likewise the third in the first and the second in the second and the first in the third are equal — and why not say there that the first in the second is better since it is first for the olive itself? Or here say the reverse — that the third adjacent to the first land should also be second adjacent to the latter land. It is possible that there the matter depends on reason and not on importance; but here the matter depends only on importance — therefore since it is adjacent to the latter land it is better; and still requires further study; examine well.`,
);
patch(cks, "chokhmat-shlomo", 2, "_", chokhmat2);

patch(
  er,
  "eliyah-rabbah",
  1,
  "_",
  `(1) <b>The seven-species type precedes, etc.</b> Even if one is half the fruit and the other whole; and if both are of the seven species, or both are not of the seven species — then he precedes the whole. In any case, if one is cherished and one whole — the whole is better — Magen Avraham; and see above siman 168:`,
);
patch(er, "eliyah-rabbah", 2, "_", eliyah2);
patch(
  er,
  "eliyah-rabbah",
  3,
  "_",
  `(3) <b>[Levush] One may precede, etc.</b> Bach challenged: behold Tur wrote wheat precedes olive because it is earlier in the verse — all the more so here where radish is not of the seven species at all; and he greatly strained to resolve it. Taz, Magen Avraham, and Shelah daf 89 divided — superiority of earlier in the verse is better than superiority of the seven species in something whose blessings are not equal; see there. One may wonder at them — for in Rashba's chiddushim daf 33b, and Kolbo daf 20, and Rabbenu Yonah chapter Keitzad Mevarchin, it is proven and clear that superiority of seven is always better; see there, for I shortened. In my humble opinion this came to them because they did not delve into Tur's words, as I wrote. But per my father's lord's view that they are equal — it is possible it deals even with chewing wheat; meaning for Rosh himself who holds one precedes whichever he wants — it cannot deal with chewing wheat that precedes olive except per his view that borei peri haEtz and borei peri haAdamah are equal; it is possible it deals with chewing wheat, and they explain he holds when their blessing is not equal the seven-species type precedes; and clear proof for this — that in Rosh's brief rulings he ruled wheat and olive — olive precedes. One need not challenge why he ruled olive precedes when he ruled one precedes whichever he wants — it seems to me because here he was concerned for Ba'al Halachot Gedolot, because wheat of the verse does not deal with chewing wheat at all, for we do not bless on it birkat hamazon and al hamichyah — see there, that it is not considered at all and is inferior to other things that are not of the seven species:`,
);
patch(
  er,
  "eliyah-rabbah",
  4,
  "_",
  `(4) <b>If their blessings are equal, etc.</b> It is difficult — behold he already wrote "and if there is not among them," etc., he precedes the cherished. One can say it teaches us that even "some say" who when their blessing is not equal precede the cherished — even though it has of the seven species — nevertheless when their blessing is equal he concedes they do not precede the cherished except when there is not among them of the seven species; and further one can divide — with difficulty:`,
);
patch(
  er,
  "eliyah-rabbah",
  5,
  "_",
  `(5) <b>[Levush] The one cherished to him now, etc.</b> And so he wrote in Sefer HaChinuch, parashat Ekev:`,
);
patch(
  er,
  "eliyah-rabbah",
  6,
  "_",
  `(6) <b>[Levush] Even though the species, etc.</b> Therefore one who has burnt wine and spiced confection from tree fruit or ground produce — it is forbidden for him to bless first on the burnt wine even though burnt wine is cherished to him; rather he blesses first on the confection. But if the confection's blessing is shehakol, he blesses on the burnt wine and exempts the confection — so Shelah wrote there, and concluded not like the masses who always bless first on burnt wine. In my humble opinion one can learn merit for them — the confection is not good and beneficial if he does not drink burnt wine first; and it is somewhat comparable to one who does not want to eat from both of them in seif 5. An example for this: Beit Yosef resolved the law of Rif that wine comes only to remove the taste of the fruit's sweetness, etc. — the same law applies here: the confection comes to remove the taste of burnt wine; see siman 272 seif 9 that they recite kiddush on beer even though he recites havdalah first — and one must say it is necessary because of kiddush:`,
);

patch(
  kh,
  "kaf-hachayyim",
  1,
  "_",
  `(1) [Seif 1] If their blessings are equal, etc. — such as olives and apples, both of which are borei peri haEtz, and he comes to exempt both with one blessing. Rashi Berachot 41a. Beit Yosef:`,
);
patch(
  kh,
  "kaf-hachayyim",
  2,
  "_",
  `(2) There he precedes the seven-species type, etc. — since their blessings are equal and one is exempted by his fellow's blessing, the seven-species type is better. Tur. And the reason — since the land of Israel was praised through them, it is fit to precede them in blessing. Levush. Orach Chayim letter 1. And that one must precede the seven-species type specifically if he wants to eat from both; but if he does not want to eat from both he blesses on that which he wants to eat, even if a seven-species type lies before him — as written below in the gloss seif 5; see there.`,
);
patch(kh, "kaf-hachayyim", 3, "_", kaf3);
patch(
  kh,
  "kaf-hachayyim",
  4,
  "_",
  `(4) There, and if there is not among them of the seven species, etc. — such as etrog and apple he precedes the cherished; and this is for all, both for R' Yehuda and for the Sages. Beit Yosef:`,
);
patch(
  kh,
  "kaf-hachayyim",
  5,
  "_",
  `(5) There he precedes the cherished. And that the cherished precedes, or what is earlier in the verse when both are before him and he is not particular to eat this before that. But if their manner of eating is for medicine, or from people's custom to precede one to the other — such as to eat fruits and drink after them — there is no law of precedence there. HaLeket vol. 2 siman 155:`,
);
patch(kh, "kaf-hachayyim", 6, "_", kaf6);

patch(
  ls,
  "levushei-serad",
  1,
  "_",
  `{Rama: Taz in this siman s.k. 1: If it is cherished to him now, like Rambam — as above — so it should read.}`,
);
patch(
  ls,
  "levushei-serad",
  2,
  "_",
  `{Rama: s.k. 6: It is difficult — behold Tur wrote in siman 208 — so it should read.}`,
);

const PATCH_COUNT = 33;
console.log(`ok siman 211 part 2/4 — ${PATCH_COUNT} blocks`);

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const OC_ROOT = __dirname;
const queuePath = path.join(
  OC_ROOT,
  "pipeline/work/editorial-queue-siman-211-part2of4.json",
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
  /\bskyscrapers\b/i,
  /\bCongratulations\b/i,
  /\bthe craft\b/i,
  /\bfirst dish\b/i,
  /\ballocated\b/i,
  /\bhand recoils\b/i,
  /\bIDF\b/,
  /\bDr\.\b/i,
  /\bIlan\b/i,
  /\bRach\b/i,
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
