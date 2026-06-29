#!/usr/bin/env node
/** Generate hand451-p1-b.mjs from embedded translations */
import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";

const __dirname = path.dirname(fileURLToPath(import.meta.url));

const T = {
  // —— baer-heitev (27) ——
  "baer-heitev/1:ו":
    "In a kiln. I was asked regarding pottery vessels that remained after burning — if it is permitted to use them on Pesach, since it is known this is more than returning to the kiln — and I permitted; nevertheless everything is according to the circumstances.",
  "baer-heitev/2:א":
    "From bricks. See Magen Avraham that bricks burned in a kiln like ours have every law of pottery vessels. Kaf HaChayyim wrote except we are not so concerned for them, and possibly heating helps for them even within our ovens per my view. But bricks dried in the sun have the law of earthenware vessels. See there.",
  "baer-heitev/3:א":
    "Kasher them in hagalah. Specifically the Pesach knife, or from meat to milk or vice versa; not so knives of [other] issur — they require libun even if there are no crevices, whenever one wants to use them in hot [food], as explained in Yoreh De'ah siman 121 seif 7. See in Peri Chadash there that he ruled even in knives of issur hagalah suffices even l'chatchila. Kaf HaChayyim wrote: it appears to me the main [rule] l'chatchila is as Shulchan Aruch ruled there, and so too in Or U'Mussar; however b'dieved one does not forbid if they kashered and used it in hot [food].",
  "baer-heitev/3:ב":
    "Boiling. Magen Avraham wrote to insert the knife into it; but one may not kasher it via a white-hot stone.",
  "baer-heitev/3:ג":
    "On a whetstone. The same applies in a case where removing rust suffices. Bach and other Acharonim wrote: because one must also kasher the handle; therefore if the handle is fixed with small nails hagalah does not help, for there are many crevices at the place of the nails — and the same applies whenever there are two parts in its handle. The same if part of the handle is in the corner or the handle is glued to the iron with glue — one may not kasher it, for we are concerned lest it split; libun too does not apply to a handle unless it is entirely iron. Since most knives are this way, therefore it is proper that the smith establish [the rule]: if possible to make new ones they are preferable. See Taz.",
  "baer-heitev/3:ד":
    "Rust. Meaning one need not sharpen except to remove rust; but if they sharpen well in a manner that removes some of the iron, as explained in Yoreh De'ah siman 121 — it is like libun. See there in the gloss. Rust means what we call rust in foreign language. But a black or red stain in some place of the vessel, and especially pots and pans — there is no concern, and one may kasher; and as an advice one should whiten that place if impossible by scraping. Taz — see there.",
  "baer-heitev/3:ה":
    "Libun. And with libun one need not remove rust, for fire burns everything.",
  "baer-heitev/4:ג":
    "Those who are lenient. Taz and Magen Avraham forbid even b'dieved if they did not libun it so much that sparks fly from them. See there.",
  "baer-heitev/5:א":
    "To pour. One must be careful that the stream not stop in the middle; and one need not pouring a second time — Acharonim.",
  "baer-heitev/6:א":
    "With rinsing. So too b'dieved if they did not kasher the bowls in kli rishon — they also do not forbid. And if it is known that within twenty-four hours they used it in kli rishon, even though its main use is in kli sheini — they require hagalah in kli rishon specifically, per all views. And rinsing means to scrub them first well in water to remove all adhesion on it, and afterward rinse in water as explained in Yoreh De'ah siman 121.",
  "baer-heitev/6:ב":
    "White-hot. So too is practiced regarding kashering tables and benches; and one dries the table so the water will not congeal. Acharonim. And siman 492 seif 2 in the gloss. Bowls that have rims and protrusions like buttons and flowers — when one cannot pass the stone over all of it — they have no remedy except to put it in a pot; and likewise a knife one may not kasher with a stone. Magen Avraham.",
  "baer-heitev/10:_":
    "To kasher them. It is simple that if they salted them without hagalah it is permitted, for salting does not apply to vessels — see seif 26, Magen Avraham there, that salt is not called a sharp substance unless very salty. Bach and Taz are stringent not to kasher baskets at all, lest there be chametz between the holes.",
  "baer-heitev/11:ב":
    "In hagalah. So too is practiced. Magen Avraham wrote: those pans in which they bake cakes require libun.",
  "baer-heitev/12:_":
    "B'dieved. For we do not say its absorption travels through the whole [vessel]; and even if its absorption travels, nevertheless it is like kli rishon. Kaf HaChayyim wrote b'dieved one does not forbid even if he stuck it into hot food, for we do not establish an issur; and like kli rishon — see there. Magen Avraham ruled: if he stuck the side that was not kashered — forbidden — see there. Taz ruled: in a knife one should be stringent even b'dieved if he cut with a knife whose handle was not kashered in hot food on Pesach, since certainly he touched the handle at the time of use with the knife — not so other vessels — see there. Magen Avraham wrote: it appears to me that what is written \"we do not forbid b'dieved\" means if they already used them; but l'chatchila it is forbidden to use them even during Pesach if impossible to kasher.",
  "baer-heitev/13:א":
    "Solder patch. Every solder patch in this seif means what was fixed by adhesion of piece on piece with nails; but in a solder patch made on a pewter vessel where they drip a pewter piece from heat — all absorption burns and what remains in existence [is permitted]. Also when repairing a silver spoon and the like, they place a silver piece there — then the craftsman puts the spoon in fire first, and therefore there is no concern. Taz, Kaf HaChayyim. Old vessels coated in pewter, like copper vessels — R' Eliyahu Mizrachi Chayei Adam siman 43 ruled no hagalah is needed since pewter interrupts — they are like new vessels. Magen Avraham wrote: accordingly even if coated with old pewter, for pewter itself becomes white. See in Knesset HaGedolah who elaborated to bring dissenting views; he wrote some great ones of the land are stringent on themselves; in any case it seems good in the eyes of God and man to immerse after pewter coating without a blessing — end of his words. See Yoreh De'ah siman 120. Peri Chadash Orach Chayyim ruled hagalah is required after pewter coating, and so is practiced in Jerusalem — see there.",
  "baer-heitev/13:ב":
    "The issur. Then even though the absorption of the issur preceded, it is permitted once the place of the solder became white. Bach wrote: it appears to me where absorption of issur preceded — one must libun the place of the solder — see there. Magen Avraham wrote: therefore it appears where absorption preceded the solder patch, one must place so many coals until sparks fly from it — not so if the solder preceded absorption, light libun suffices as written in this seif in the gloss. Kaf HaChayyim disagrees with Bach and Magen Avraham and upheld as the Mechaber's wording implies. If it became white thus or removed the solder once after kashering again — permitted to kasher thus with the solder each time, since it is no longer called absorption of issur preceding the solder; all this when the solder adheres well with no crack between the body of the vessel and the solder — otherwise even if the solder preceded, one needs libun or removal of solder or widening the crack so it can be scraped. Kaf HaChayyim.",
  "baer-heitev/14:_":
    "Forbidden. According to the Mechaber's view siman 447 that nitelaf is permitted on Pesach — it must be as the practice to forbid in covering even if not ben yomo, as explained in Yoreh De'ah siman 93.",
  "baer-heitev/16:_":
    "To whiten. Acharonim wrote: in our countries they never grind chametz in them, only saffron and spices — therefore hagalah suffices; nevertheless it is good to practice stringency to grind everything before the 14th. See there. And if they ground in our mortar with spices and put them in a dish — requires study whether to forbid b'dieved. Magen Avraham — see there.",
  "baer-heitev/18:א":
    "In a sifter. But one must buy new ones; and if he transgressed and sifted with it via scrubbing well with hagalah — one does not forbid even during Pesach, since per the Mechaber even l'chatchila this suffices. So too where water came on the sifter that was not scrubbed well first, even on part of it — it has no remedy to use on Pesach — Maharil. Magen Avraham wrote: it appears even where there is no new sifter, better that flour not be sifted. Kaf HaChayyim disagreed and wrote it is known that all where flour was not sifted have broken and whole wheat and the dough or matzah would be forbidden; but this sifter b'dieved helps with scrubbing well and hagalah, all the more if sifted before Pesach when cancelled — therefore in time of pressure it is correct to do so even l'chatchila. One asked me offhand that his custom is to wash the sifter well after Pesach to keep it for next year, and he sifted chametz flour for Pesach. I permitted what he sifted b'dieved, for even if we say adhesion remained from last year — it is hardened chametz and nullified in sixty even during Pesach. Kaf HaChayyim — see there.",
  "baer-heitev/18:ד":
    "The stitches. Meaning also what is on the edge of the bag that is the seam; Magen Avraham wrote: so too one should practice with cloths on which they make matzot — if wanting to use them a second time, not what they turn them over, for chametz oozes and goes from side to side; rather one must undo the stitches to launder well. If he acted b'dieved and made matzot on the sheet without any laundering, if during Pesach — even b'dieved one should forbid; but if he turned the sheet or laundered it even without undoing stitches — one need not be stringent b'dieved. So too regarding bags: if laundered and did not undo stitches and put flour inside — no prohibition b'dieved. Kaf HaChayyim — see there.",
  "baer-heitev/19:א":
    "Peel. In Ashkenaz language schievel; its use is by fire — therefore hagalah does not permit it. Taz wrote: if one keeps this Pesach peel for another year — no kashering needed; so too a trough in which they knead matzot — one who is stringent to kasher it did not act well, lest he come to err and kasher a chametz peel — only scrape it well. Magen Avraham in the name of Darkei Moshe in the name of Mahariv wrote it requires hagalah — see there; Kaf HaChayyim agreed with Taz. If one took matzah in a peel used all year — if clean, peeling the matzah suffices. If not clean, since used all year for cakes with fat — all forbidden per Magen Avraham. If chametz matzah was threshed in it — forbidden to thresh more; must bring another — Hagahot Maimoniyot and Shelah. If he did not bring another — all need peeling. All this deals with matzah that became full chametz. But doubled and puffed matzah, since it is itself a stringency as written siman 461 — suffices to forbid the peel l'chatchila but not other matzot — Magen Avraham. Kaf HaChayyim wrote: greater than this I saw by Maharatz Maharash — he did not forbid the peel when puffed or doubled matzah remained before him, because it is considered like b'dieved, since in most bakings one will not be forbidden because of puffed or doubled, and each time would need a new peel; also the oven would be forbidden and require relighting — Torah is sparing of money — see there; see siman 461 seif 3.",
  "baer-heitev/19:ג":
    "New. The author of Imrei Noam wrote in his siman 5: an incident where they baked 180 matzot in a peel and were unsure if new or old used for chametz — in these matzot there is no concern of chametz prohibition — see there.",
  "baer-heitev/20:_":
    "To pour. Mahariv siman 193 ruled pouring does not help — only kasher via white-hot stone or burning torch and pour boiling water on it. Acharonim wrote in the name of Maharil: even after hagalah if anything spilled on it on Pesach — do not lift it at all to eat; and even after hagalah do not use anything hot on them except via interruption of cloth or board or rags — all excessive stringencies, for the stringency of hagalah suffices, and so is practiced. Kaf HaChayyim: Taz wrote siman 492 women practice not to use on Pesach a pot into which they poured boiling water on the kashering stone, because chametz smell entered — yet there is no smell or taste, no issur at all on Pesach; Kaf HaChayyim upholds the custom l'chatchila but b'dieved certainly does not forbid.",
  "baer-heitev/21:ג":
    "And b'dieved. The reason is yeast in wine is nitelaf; and per what we hold nitelaf is forbidden on Pesach — therefore one may not be lenient except to pour from it before Pesach into a Pesach barrel; specifically wine whose yeast gives nitelaf; but in mead one may not be lenient unless the barrels are not ben yomo; but in a yayin nesech vessel even not ben yomo — forbidden, for it improves taste. Magen Avraham and Kaf HaChayyim — see there; see Taz.",
  "baer-heitev/22:ג":
    "The oven. Acharonim agree b'dieved the food cooked in it is permitted; and if time of pressure when impossible otherwise — considered b'dieved; nevertheless in any case scrub the oven well on all sides and heat it well, then plaster with clay the place the pot sits, finger-thickness — except if he placed matzah there or other things as it is without a pot while boiling — then forbid even b'dieved; see Magen Avraham, Taz, and Kaf HaChayyim.",
  "baer-heitev/24:א":
    "Dyed. Even dyed in saffron or what is called in foreign language malt. Maharil and Mahariv.",
  "baer-heitev/24:ב":
    "In pewter. Practiced in some places that a Jew stands over it during the work.",

  // —— beer-hagolah (19) ——
  "beer-hagolah/1:ה": "there in the Gemara",
  "beer-hagolah/2:_": "there in the Gemara",
  "beer-hagolah/3:א": "there in the Gemara",
  "beer-hagolah/3:ג":
    "the Rosh there in chapter 2 of Pesachim, and he brought proof from Sifri",
  "beer-hagolah/4:א":
    "baraita end Avodah Zarah 77b; the Rif and Rosh brought it in chapter 2 of Pesachim; and so the majority of poskim equate the law of chametz to other issurim",
  "beer-hagolah/5:א":
    "there in the baraita in Avodah Zarah, and the Rif and Rosh brought it in chapter 2 of Pesachim",
  "beer-hagolah/5:ב": "Tosafot in Shabbos 39 in the name of R' Yitzchak",
  "beer-hagolah/6:_":
    "the Rif and Rambam in chapter 5, and Ran and Rashba in responsum",
  "beer-hagolah/8:_": "the Rif in chapter 2 of Pesachim and Rosh there",
  "beer-hagolah/9:_":
    "Tur in siman 492 in the name of his father the Rosh, and Tosafot end Avodah Zarah, and Shach",
  "beer-hagolah/14:ב":
    "there; and so too Hagahot Maimoniyot in Laws of Hagalah from Mishnah end of chapter 20 that they kasher",
  "beer-hagolah/17:א": "Tur, and so too Hagahot Maimoniyot in chapter 5",
  "beer-hagolah/19:ב":
    "Hagahot Maimoniyot chapter 5 and Terumat HaDeshen from words of Semag",
  "beer-hagolah/22:א":
    "from this [that] Shmuel [said in] Pesachim 36 — as the girsa of the Rosh there",
  "beer-hagolah/22:ד": "as the girsa of the Rif there, as the Ran explained there",
  "beer-hagolah/23:_": "there in the Gemara",
  "beer-hagolah/26:א": "the Ran in chapter 2 of Pesachim",
  "beer-hagolah/26:ב": "Rashba in responsum",
  "beer-hagolah/27:_": "Mordechai end chapter 2 of Pesachim",
};

// Continue in part 2 via dynamic import or second file
const part2 = await import("./gen-hand451-p1-b-part2.mjs").catch(() => ({ T2: {} }));
Object.assign(T, part2.T2 || {});

const lines = [
  "/** siman 451 part 1 — batch b: machatzit-hashekel, magen-avraham, turei-zahav, beer-hagolah, baer-heitev */",
  "export const HAND = {",
];
for (const [k, v] of Object.entries(T).sort()) {
  lines.push(`  ${JSON.stringify(k)}:`);
  lines.push(`    ${JSON.stringify(v)},`);
}
lines.push("};");
lines.push("");
fs.writeFileSync(path.join(__dirname, "hand451-p1-b.mjs"), lines.join("\n"));
console.log("Wrote", Object.keys(T).length, "keys to hand451-p1-b.mjs");
