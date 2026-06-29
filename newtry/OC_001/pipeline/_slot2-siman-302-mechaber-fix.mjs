#!/usr/bin/env node
import fs from "fs";
import { parseBlocksInFile, serializeBlock } from "../oc001_block_lib.mjs";

const fixes = new Map([
  [
    `mechaber:1:main`,
    `The laws of cleaning and folding garments on Shabbat. It contains 13 seifim: One who shakes a new black tallit (1) from the dew on it is liable, for shaking benefits it like laundering — when he is particular about it not to wear it without shaking. {Rama: All the more so it is forbidden to shake a garment that was soaked in water or upon which rain fell; and specifically a new garment he is particular about (Kol Bo). Some say (5) it is forbidden to shake a garment from the dust on it if he is particular about it, and it is good to be concerned for their words (Rashi and Or Zarua). But (7) it is permitted (4) to remove feathers from a garment on Shabbat (Or Zarua); and see above siman 337.}`,
  ],
  [
    `mechaber:2:main`,
    `One who gathers tufts on top of garments (3)(8), such as those tufts on woolen vessels remaining in them from the weaving, is liable (1)(9) because of makeh bepatish (2)(5)(10), when he is particular about them (5). But if he removed them in the manner of business (11) he is exempt.`,
  ],
  [
    `mechaber:3:main`,
    `One may fold vessels on Shabbat (12) for Shabbat need (6)(13) to wear them on that day (6), and specifically (14) by one person (one), and with new ones that have not yet been laundered (15), and white (16), and he has nothing to change into; if one of these conditions is lacking it is forbidden (7). Some say that to fold them not in the order of their first folding (18) is permitted in every case (19), and his words appear correct.`,
  ],
  [
    `mechaber:4:main`,
    `A press (8) (it is a utensil with which garments are pressed after laundering — two boards one on the other and the garments between them) belonging to a homeowner — they permit him to take garments from it (20) for Shabbat need (7); but an artisan's is forbidden because it is presumed (21) pressed and permitting it is like nullifying a presumption.`,
  ],
  [
    `mechaber:5:main`,
    `A cloak after laundering becomes hard and they rub it with the hands to soften it (22) — permitted to do on Shabbat when he intends only to soften it (23); but a sudar is forbidden (24) because he intends to whiten it and it is like bleaching. {Rama: (25) And hats (8) and other linen utensils — their law is like a sudar (Beit Yosef in name of Shulchan Leket).}`,
  ],
  [
    `mechaber:6:main`,
    `Mud on his leg (9)(26) (or on his shoes) (Beit Yosef and R' Yerucham ch. 13) — he may wipe it on a wall but not on the ground, lest (10) he come to level hollows (11). Some forbid (4)(11)(27) even on a wall. {Rama: And some (12) permit (28) on both (Rosh); and likewise permitted to remove it (13)(29) with a little (9) earthenware (5)(30) fit to be moved (R' Yerucham ch. 13).}`,
  ],
  [
    `mechaber:7:main`,
    `Mud (12) on his garment (31)(32) — he may rub it from inside (33) so the matter is not evident to appear like laundering, but not outside (34) as it appears like laundering; and he may scrape it (14)(10) with a fingernail (13). Some say this is only when moist (35), but when dry (15) forbidden (16)(6)(36)(11) as it is tochen.`,
  ],
  [
    `mechaber:8:main`,
    `One may not scrape (37) (17)(38) a shoe — with a knife or fingernail — whether new or old (12), because it peels the leather and is memachek.`,
  ],
  [
    `mechaber:9:main`,
    `Permitted to put water on a shoe (39)(40) to rinse it; but to launder it — that is (41) rubbing this side on that side (42) — forbidden (16). But a garment that has filth on it (43) is forbidden (18) even (44) to rinse it (45), for that is its laundering; rather he wipes it with a rag (17) lightly and not with pressure lest he squeeze. {Rama: And a garment without filth — permitted (46) to put on it a small amount of water (19)(47) and not much, lest he squeeze (Beit Yosef in name of Semag, Semak, Sefer HaTerumah, and Rosh ch. 1 of Yoma) (20)(48). Some forbid in every case (Beit Yosef in name of Tur siman 334 and siman 319 and Tosafot chapter Kol Kitvei and glosses ch. 22).}`,
  ],
  [
    `mechaber:10:main`,
    `One who washes his hands (21)(49)(50) — good (51) to dry them forcefully one against the other and remove from them the water as he can before wiping them on a cloth. {Rama: And some wrote not to be concerned, for we do not say rinsing a garment is its laundering in such a case, for it is only (22)(52) the way of soiling (53), and so is the custom (Tur and Beit Yosef and Agur). Therefore permitted (14)(54) to dry his hands (23) on a garment into which a child urinated (24)(15)(55)(16) in order to nullify it, for that is only ordinary soiling (Tur); but (26) forbidden to put (17)(56) actual water on (57) the urine in order to nullify it (Hagahot Maimoniyot ch. 22 and Tosafot chapter 8 of Sheratzim).}`,
  ],
  [
    `mechaber:11:main`,
    `One whose hand became soiled with mud may wipe it on a horse's tail or a cow's tail (58) or on a hard cloth made to hold thorns, but not on a cloth with which one wipes hands, lest he act as on weekdays and come to launder the cloth.`,
  ],
  [
    `mechaber:12:main`,
    `Forbidden to wipe a cup that had water (59) or wine in it with a cloth (60) because of (27)(61) coming to (18) squeezing.`,
  ],
  [
    `mechaber:13:main`,
    `One may not look on Shabbat into a metal mirror (21) that is sharp like a scalpel (meaning like a small sharp knife), lest one cut dangling hairs with it; and even if it is (62) fixed in a wall (22). But permitted to look into a mirror (63)(64) without this concern (65), even if not fixed.`,
  ],
]);

const f = "output/siman_302/mechaber/part-001.txt";
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
console.log("Mechaber 302:", fixes.size, "missing:", missing.length);
if (missing.length) process.exit(1);
