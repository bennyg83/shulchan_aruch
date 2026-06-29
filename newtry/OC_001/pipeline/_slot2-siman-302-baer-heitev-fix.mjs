#!/usr/bin/env node
import fs from "fs";
import { parseBlocksInFile, serializeBlock } from "../oc001_block_lib.mjs";

const fixes = new Map([
  [`baer-heitev:1:א`, `New — that they have not used it much, rather it is still in its newness. Beit Yosef.`],
  [
    `baer-heitev:1:ב`,
    `New — because it shrinks in water; this prohibition applies to all garments, whether black or other colors. Sefer HaZichronot; see Magen Avraham.`,
  ],
  [`baer-heitev:1:ג`, `Dust — specifically black and new. Magen Avraham.`],
  [
    `baer-heitev:1:ד`,
    `Feathers — and in Sefer HaZichronot he was concerned about the prohibition of tearing, a primary category of melacha; therefore one whose garments became entangled in thorns separates them discreetly and delays so they will not tear, and if they tore he is not liable for he did not intend. Magen Avraham.`,
  ],
  [
    `baer-heitev:2:_`,
    `That he is particular about them — meaning he removes them intentionally to beautify the garment (Beit Yosef). And knots remaining from the weaving — their law is like a tuft (Tur). In Sefer HaZichronot he wrote: even if he is not particular it is forbidden. If flax seed or a dish fell on his garment — permitted to scrape it off (Hagahot Maimoniyot, Magen Avraham).`,
  ],
  [
    `baer-heitev:3:_`,
    `On that day — therefore forbidden to fold the tallit even though the mitzvah of tzitzit applies all day and he can wrap himself in it; nevertheless, since he does not intend to wrap himself in it, it is like one who has something to change into (Shulchan Lechem). One does not spread beds from Shabbat to weekday (Mishnah and Rambam). Magen Avraham wrote: it appears a bed standing in a room where one regularly walks there, and there is disgrace and a repulsive matter to stand thus — permitted to spread it, for it is for Shabbat need; see siman 289 s.a.; in Beit Shammai it implies even this is forbidden; and see what I wrote. One spreads beds from Shabbat night to Shabbat; nevertheless it is better to spread from erev Shabbat (Agudah).`,
  ],
  [
    `baer-heitev:4:_`,
    `And an artisan's — even if it were permitted from erev Shabbat, it is forbidden to remove vessels, a decree lest one come to permit it. The Rambam explains because it is muktzeh due to monetary loss and forbidden to move it.`,
  ],
  [
    `baer-heitev:5:_`,
    `Linen utensils — forbidden to place the collar on the neck called kolinar on sticks made for this, as written siman 541 s.g. and end of siman 519 see there (Magen Avraham wrote: the custom of the world is to rub them with the hands, but in Shulchan Aruch he forbids, and Eliyahu Rabbah agreed see there).`,
  ],
  [`baer-heitev:6:_`, `Earthenware — and this all permit.`],
  [`baer-heitev:7:א`, `With a fingernail — and likewise with a knife, even if blunt (Beit Yosef, Darkhei Moshe).`],
  [
    `baer-heitev:7:ב`,
    `Tochen — it appears specifically when there is actual substance of mud on the garment; but if there is only the appearance of mud and he scrapes there to nullify the appearance, this is not similar to tochen; for this reason there is room to permit one whose cloak is slightly soiled and there is no substance of excrement and it is dry — he may scrape with a fingernail and remove the appearance in order to pray in cleanliness. Taz.`,
  ],
  [
    `baer-heitev:8:_`,
    `The leather — Maharil would wipe his shoes on iron made for use before the synagogue, and it was thick and wide to scrape the edges from mud. Bach is stringent; see Magen Avraham and Taz.`,
  ],
  [
    `baer-heitev:10:א`,
    `Filth — nevertheless it appears that on a matter he is particular about its water it is forbidden, lest he come to squeezing, as written siman 301 s.g. and seif 46.`,
  ],
  [
    `baer-heitev:10:ב`,
    `To dry — and it is good not to take a child in his lap on Shabbat unless on a cloth (138, siman 267). One who bathes a child in water should not put the garment in water (138, siman 264).`,
  ],
  [
    `baer-heitev:10:ג`,
    `Urine — but when there is excrement on it, forbidden to pass it by hand-drying, as s.t. Magen Avraham.`,
  ],
  [`baer-heitev:10:ד`, `In order to nullify them — see Magen Avraham and see in responsum Chacham Tzvi siman 102.`],
  [`baer-heitev:10:ה`, `Actual water — and even to wash his hands on them is forbidden, for that is its laundering. Beit Yosef.`],
  [
    `baer-heitev:12:_`,
    `Squeezing — it appears that with a rag designated for this it is permitted, for we did not decree lest he squeeze; also it appears specifically with a cup that is narrow, for it is impossible that he not come to squeezing; but a stool is permitted to wipe; and specifically on a matter he is not particular about its water (Magen Avraham). (In Eliyahu Rabbah he left this matter in requires study see there.) And know that squeezing water is a derivative of laundering or dyeing, as Beit Yosef wrote end siman 320.`,
  ],
]);

const f = "output/siman_302/baer-heitev/part-001.txt";
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
console.log("Baer Heitev 302:", fixes.size, "missing:", missing.length);
if (missing.length) process.exit(1);
