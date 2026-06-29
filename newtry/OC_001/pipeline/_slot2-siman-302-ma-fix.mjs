#!/usr/bin/env node
import fs from "fs";
import { parseBlocksInFile, serializeBlock } from "../oc001_block_lib.mjs";

const fixes = new Map([
  [`magen-avraham:1:א`, `New — that they have not used it much, rather it is still in its newness [Beit Yosef, Rambam].`],
  [
    `magen-avraham:1:ב`,
    `New that he is particular about — because it shrinks in water [Kol Bo]; implies that stam new he is particular about it, even though regarding dew the Gemara says "and he is particular" etc.; water is different because it shrinks. In Sefer HaZichronot he forbids on all garments.`,
  ],
  [`magen-avraham:1:ג`, `Garment from dust — specifically black and new as explained.`],
  [
    `magen-avraham:1:ד`,
    `To remove feathers — and in Sefer HaZichronot page 53 he was concerned about tearing, a primary category of melacha; therefore one whose garments entangled in thorns separates discreetly and delays so they not tear; if torn not liable for did not intend; and see siman 317 s.g.`,
  ],
  [
    `magen-avraham:2:_`,
    `And when he is particular about them — meaning he removes them intentionally to beautify the garment — forbidden; and knots remaining from weaving — their law is like a tuft [Tur]; in Sefer HaZichronot wrote even if not particular forbidden. If flax seed or dish on his garment — permitted to scrape [Hagahot Maimoniyot]. One who takes shavings tailors call inersesir — also completion of melacha — requires study if liable; to my heart lean to be stringent if not particular about them, end of his words Sh.A. ch. 7 [so siman 340].`,
  ],
  [
    `magen-avraham:3:_`,
    `To wear them on that day — therefore forbidden to fold tallit even though mitzvah tzitzit all day and can wrap; nevertheless since no intent to wrap is like one who has to change [Shulchan Lechem]. Do not spread beds Shabbat to weekday [Mishnah and Rambam ch. 23]; and see siman 567 and 323 s.v.; appears bed standing in room where regularly walks, disgrace and repulsive to stand thus — permitted spread for Shabbat need; see siman 289; Beit Shammai implies even this forbidden; to me as written; spread beds Shabbat night to Shabbat; nevertheless better from erev Shabbat [Agudah].`,
  ],
  [
    `magen-avraham:4:_`,
    `And artisan's — even if permitted erev Shabbat forbidden remove vessels decree lest permit; Rambam because muktzeh monetary loss forbidden move [nevertheless].`,
  ],
  [
    `magen-avraham:5:_`,
    `And other linen utensils — because they are hard; after washing and softening this is bleaching [Shulchan Lekhem]; custom world rub in hands; appears forbidden place collar on sticks made for this as siman 541 s.g.`,
  ],
  [`magen-avraham:6:א`, `Or on his shoes — Bach disputes this; see s.138.`],
  [
    `magen-avraham:6:ב`,
    `Lest come to level hollows — meaning he will forget and intend to level hollows; otherwise davar she'eino mitkaven and permitted, not psik reisha [nevertheless ch. 21 and Tosafot].`,
  ],
  [`magen-avraham:6:ג`, `Even on wall — because appears like adding to building; appears wooden wall permitted like beam.`],
  [`magen-avraham:6:ד`, `Who permits on both — field building; Bach ruled like forbidders.`],
  [`magen-avraham:6:ה`, `With a little earthenware — all permit.`],
  [`magen-avraham:7:א`, `With fingernail — likewise knife even blunt (Beit Yosef Darkhei Moshe).`],
  [`magen-avraham:7:ב`, `Dry forbidden — even to rub from inside.`],
  [
    `magen-avraham:7:ג`,
    `That it is tochen — even though melacha not needed for itself there is still prohibition; see siman 278; from stam here implies no difference silk flax wool when soiled with mud, unlike s.305; Tur end this siman likewise.`,
  ],
  [
    `magen-avraham:8:_`,
    `With knife — but on wall permitted as s.v.; Maharil wiped shoes on iron before synagogue to scrape edges from mud; appears thick wide head not sharp — if sharp at head like knife peels leather; nevertheless stringent for even back of knife forbidden; Bach forbids on beam see s.v.`,
  ],
  [`magen-avraham:9:א`, `Even to rinse — meaning forbidden to put water on it at all.`],
  [`magen-avraham:9:ב`, `And not much — appears on matter not particular about water permitted as siman 301 seif 46.`],
  [`magen-avraham:9:ג`, `And some forbid — per them way of soiling permitted as s.10 in gloss.`],
  [`magen-avraham:10:א`, `Good to dry them — but by law permitted since no filth as Rabbenu Yonah s.t.`],
  [
    `magen-avraham:10:ב`,
    `Way of soiling — nevertheless appears on matter particular about water forbidden lest squeeze as siman 301 s.g. and seif 46.`,
  ],
  [
    `magen-avraham:10:ג`,
    `On garment child urinated — good not take baby in lap Shabbat unless on cloth [138 siman 267]; bathing child in water do not put garment in water (138 siman 264).`,
  ],
  [
    `magen-avraham:10:ד`,
    `Urine — but when excrement on it forbidden pass by hand-drying as s.t. (Maharam of Ticktin in name Semag and Tosafot end 17 unlike Gemara).`,
  ],
  [
    `magen-avraham:10:ה`,
    `To nullify them — since small matter batel by hand-drying (Beit Yosef); requires study for in siman 77 I wrote in his name no difference much little always need revi'it; must say urine different for not visible only tefach letefach; when dries hands tefach letefach from water permitted; see ch. 2.`,
  ],
  [`magen-avraham:10:ו`, `Forbidden to put water — even wash hands on them forbidden; this is laundering [Beit Yosef].`],
  [
    `magen-avraham:12:_`,
    `Lest come to squeezing — some say why dry hands on cloth or cloak because hands soiled [Beit Yosef Teshuvot HaRashbatz in name Maharam]; Maharam responsum 4 sections siman 571: some say hand-drying because hands soiled (nevertheless need as stated Mishna Berurah) dry well one against other lest bleaching or squeezing; but cup forbidden end; appears intent: since wiping soiled hands it is way of soiling; dedicated rag permitted no decree lest squeeze as siman 301 seif 46; nevertheless requires study per siman 319 and 334 s.324 on other liquids no decree lest squeeze — why forbid wipe cup with wine; possible holds wine also launders as Beit Yosef end siman 320 in name Ran — then other liquids permitted; or say narrow cup impossible not squeeze, psik reisha as siman 320 s.16 and so s.t. in gloss — then even not particular forbidden; stool permitted wipe no psik reisha; specifically not particular; know squeezing water derivative laundering or dyeing as Beit Yosef end siman 320.`,
  ],
]);

const f = "output/siman_302/magen-avraham/part-001.txt";
const blocks = parseBlocksInFile(fs.readFileSync(f, "utf8"));
const out = blocks
  .map((b) => {
    const key = `${b.slug}:${b.seif}:${b.marker}`;
    const en = fixes.get(key);
    return en ? { ...b, en } : b;
  })
  .map(serializeBlock)
  .join("\n\n");
fs.writeFileSync(f, out);
const missing = blocks.map((b) => `${b.slug}:${b.seif}:${b.marker}`).filter((k) => !fixes.has(k));
console.log("Magen Avraham 302:", fixes.size, "missing:", missing.length);
if (missing.length) process.exit(1);
