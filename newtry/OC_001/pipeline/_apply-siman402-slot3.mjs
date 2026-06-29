#!/usr/bin/env node
/** worker slot 3 — siman 402 */
import fs from "fs";
import { parseBlocksInFile, serializeBlock } from "../oc001_block_lib.mjs";

const fixes = {
  "output/siman_402/mechaber/part-001.txt": {
    "1:main":
      "The law of a trench full of water between two techumin. A trench full of collected water that is between two Shabbat techumin — part in the techum of this city and part in the techum of the other city — both towns are forbidden to draw from it, even within the techum, for water within the techum acquires the residence of the city and they mingle with each other; one must make a partition at the end of the techumin to separate them, even if it is suspended and does not touch the ground of the trench; reeds alone suffice. {Rama: And a pit of straw standing between two techumin — these feed from here and these from there, with no concern that one will take his fellow's portion. (Gemara, chapter Helbon.) And if the water flows, no correction is needed, for they do not acquire residence and are like the feet of the one who draws.}",
  },
  "output/siman_402/beer-hagolah/part-001.txt": {
    "1:א": "Baraita of Rabbi Chiya, Eruvin 46.",
    "1:ב":
      "And not like ownerless property that does not acquire residence in its place — since they are adjacent to the city, the people of the city have intent regarding them.",
    "1:ג": "Gemara there.",
    "1:ד": "I cited it above, siman 397.",
  },
  "output/siman_402/baer-heitev/part-001.txt": {
    "1:_": "They acquire. See Magen Avraham and Taz.",
  },
  "output/siman_402/magen-avraham/part-001.txt": {
    "1:_":
      "They acquire the residence of the city — since they are adjacent to the city, the people of the city have intent regarding them and they are not like ownerless objects (Beit Yosef and R' Yonatan). Requires study, for in the Gemara it is established per Rabbi Yohanan — it implies per the Rabbis they do not acquire residence, as Tosafot wrote: although they have intent regarding them, since they flow from this techum to that techum their intent is nullified and they are like ownerless objects. One must say Rif and Raosh hold all this is per the questioner, but the conclusion is not so — requires study; see what I wrote siman 397 seif 15; see Hagahot Maimoniot — some disagree.",
  },
  "output/siman_402/mishnah-berurah/part-001.txt": {
    "1:א":
      "(1) Collected — for flowing rivers do not acquire residence at all; they are like the feet of anyone who draws from them, as below.",
    "1:ב":
      "(2) They acquire the residence of the city — since they are adjacent to the city, the people of the city have intent regarding them, and they are not like ownerless objects that do not acquire residence; specifically between two towns, because both towns have intent regarding them, therefore they forbid each other. But if there is only one city, even though water flows much from outside the techum and mingles with this — nevertheless it is permitted to draw within the techum, for water outside the techum, since not adjacent to the city and no other domain has authority over them, are like ownerless objects that do not acquire residence at all. See Biur Halachah what he wrote — some disagree on the essential law.",
    "1:ג":
      "(3) At the end of the techumin — meaning if between them were four thousand cubits, the measure of two techumin, one must make a partition at the end of the two thousand that is the end of both techumin; specifically when the trench is at the end of each one's techum and part of it is outside each one's techum. But if the trench stands entirely in the shared place of both towns — e.g., between two towns is only three thousand cubits and the trench is between them — they are permitted to draw without any partition, for we say there is clarification and each takes his portion.",
    "1:ד": "(4) To separate them — see Peri Megadim: even if the other city is non-Jewish, one must still separate them.",
    "1:ה":
      "(5) Even if it is suspended — for a reed partition they were lenient in water because of great need; nevertheless the end of the partition must sink a handbreadth in the water, for otherwise it does not appear as a separation at all, as explained above siman 61.",
    "1:ו": "(6) These feed from here, etc. — for each takes from his techum.",
    "1:ז":
      "(7) They do not acquire residence — because they move. And even if they belong to an individual, they are not like his feet but like the feet of the one who draws.",
  },
  "output/siman_402/beur-hagra/part-001.txt": {
    "1:א":
      "Seif 1 — trench. Per Tosafot in the name of Rabbi Chiya; so Rif, Raosh, Rambam; and it appears they did not have the Gemara text \"I might say because he taught,\" etc.; so R' Yonatan there explains. But per our text it is permitted in all cases; so Tosafot there s.v. cherem; Hagahot Maimoniot there s.v. vadok; Maharich, etc. — here, etc.",
    "1:ב":
      "Within the city's techum — meaning specifically between two towns, for even Rabbi Yehudah ben Rabbi Nosson agrees, per Tosafot's question there s.v. cherem. And if you ask, etc. — it is possible the questioner is that it does not deal with two towns but two individuals who rested [for Shabbat].",
    "1:ג": "And of reeds. There.",
  },
  "output/siman_402/kaf-hachayyim/part-001.txt": {
    "1:_":
      "(1) [Seif 1] A trench full of collected water — for if not so, behold it was taught: flowing rivers and springing fountains are like the feet of any person. Beit Yosef. And in flowing water, even if they do not leave the place of their springing, they do not acquire residence and are like the feet of any person. Perishah, letter 1; see above siman 397, letter bet nun. This matter applies on Yom Tov or on Shabbat with markers, as written below letter 11.",
  },
  "output/siman_402/eliyah-rabbah/part-001.txt": {
    "1:_":
      "[1] In another city, etc. — Bach and Taz challenged: even without another city there is prohibition, since outside the techum mingles with this. One may say that portion outside the techum is ownerless and is like flowing water. It is difficult: per this, if one who draws made eruv to the east, he may not carry to the west lest it be like the feet of the drawer; also he may not carry east except two thousand cubits lest it be like one who acquired residence. In my humble opinion: whenever there is no other city opposite, we regard the intent of this city on all one fills within this techum, even if it mingles from outside the techum — not so when there is another city opposite; they are strict with each other. So implies R' Yonatan.",
  },
  "output/siman_402/peri-megadim/part-001.txt": {
    "1:_":
      "And part of it — Taz, and so Bach wrote; he concluded there: even if the water was outside the techum of non-Jews, he is not particular about what mingled. See Tosafot 43 — it should read 47b; the law is not explained there; nevertheless it implies specifically a single non-Jew — a non-Jewish city is considered [like a Jewish city] and it is forbidden for a Jewish city to draw from a trench of collected water; and a single Jew too one may say it is forbidden; specifically a single non-Jew — for by law non-Jews' objects have no residence, only a decree lest Israel's; and whenever it is not clear it is non-Jewish, this is not the language — still requires study. See Perishah on 397 — pit of one city, one made eruv south and one north — there is clarification; they draw permissibly; not so here, where the beginning of drawing is in prohibition.",
  },
  "output/siman_402/turei-zahav/part-001.txt": {
    "1:א":
      "And part in another city. It is difficult — for it should be forbidden even without another city, since they are outside the techum and mingle with those inside the techum. One may say those outside the techum are ownerless and do not acquire residence, and are like flowing water; not so those within the techum — the people of the city have intent regarding them, as in the Gemara 45 regarding rain that fell on Yom Tov adjacent to the city — their intent applies.",
    "1:ב": "Even if it is suspended — for in water they were lenient that even a suspended partition is permitted.",
  },
  "output/siman_402/biur-halacha/part-001.txt": {
    "1:א":
      "Trench, etc. — this matter applies only on Yom Tov regarding techum prohibition; for on Shabbat, without techum prohibition, there is [still] carrying-out [prohibition] (Maamer Mordechai); see Peri Megadim.",
    "1:ב":
      "Part in the techum of this city, etc. — it appears specifically in this manner; but if the trench is very wide and there is a large area belonging neither to this techum nor that, each may draw within his techum and we do not say the waters mingle — for otherwise even if very wide, several miles, with one end reaching this city's techum and the other end the other techum, we would also say forbidden to draw; this is certainly reasonable that it is permitted. So too when the trench is very wide — interrupt in the middle an area where from its side there is no prohibition to draw, for they are ownerless objects; we need not worry that beyond the other side is water belonging to some city. This is Tosafot s.v. cheres: where they flow from this techum to that, their intent is nullified and they are like ownerless objects; all the more in our case it is reasonable all agree.",
    "1:ג":
      "Even within their techum — meaning even though each draws from the side within his techum, and even if he does not carry to his house — nevertheless forbidden, for the water has the law of having left the techum because of water from the other side that mingles with them.",
    "1:ד": `And one must make a partition, etc. — see Magen Avraham what he challenged on this law: in the Gemara it implies this is only per Rabbi Yohanan ben Nuri, but not for us who hold like the Rabbis; also Beur HaGra wonders at this sugya [and could not resolve unless Rif and Raosh lacked Rashi and Tosafot text — nevertheless in Rabbi Chiya and in Rashba and Ritva innovations they all copied this language] and wrote Hagahot Maimoniot disagrees with this ruling; Gra wrote so is proven from Tosafot s.v. cherem — for us who hold like Rabbis, one does not need even a reed partition; so Ritva's innovations appear; see there; so Rambam who omitted this sugya from his laws implies he holds thus — mistakenly the printer wrote Rambam in Gra's citations [and what Rabbi Akiva Eiger challenged on Magen Avraham, that Hagahot Maimoniot did not mean this — his words refer to flowing water, as Magen Avraham to the spring: if his words were on flowing water, what he concludes about ownerless objects would not apply, for there even in a spring belonging to owners we hold it is like the feet of the drawer]. Therefore the halachah requires study.`,
  },
  "output/siman_402/machatzit-hashekel/part-001.txt": {
    "1:א": `Acquire, etc. — requires study. It should read: Rif and Raosh hold all this is per the questioner's view. Gemara 47b: it was taught — Rabbi Chiya: a cherem (trench) between two Shabbat techumin requires an iron partition to separate it. Rabbi Yohanan ben Chanina laughed at it: why did he laugh? If you say because he taught like Rabbi Yehudah ben Rabbi Nosson that ownerless objects acquire residence, while he holds like the Rabbis — one who teaches like Rabbi Yehudah ben Rabbi Nosson, would he laugh? Rather because it teaches it needs an iron partition — what difference whether they acquire residence or not? Iron water also enters them from below; rather because the Sages were lenient in water — even a suspended partition is permitted; and likewise reeds suffice.`,
    "1:ב": `So Tosafot s.v. cherem: etc. — "If you ask, why establish it per Rabbi Yehudah ben Rabbi Nosson? For the Rabbis also said above regarding rain adjacent to the city that it is like the feet of the people of the city, since the people of the city have intent — as Magen Avraham wrote above siman 397 seif 13. One may say that because they flow from this techum to that techum their intent is nullified and they are like ownerless objects" — end Tosafot. This is Magen Avraham's difficulty: the baraita's law was stated only per Rabbi Yehudah ben Rabbi Nosson, not per Rabbis whose intent does not help, as Tosafot wrote; and it is somewhat reconciled if Rif holds that even flowing water, intent of the people of the city helps — then the baraita comes even per Rabbis; but the questioner did not consider why Rabbi Yohanan ben Chanina laughed — therefore he said "I might say because he taught like Rabbi Yehudah ben Rabbi Nosson," etc. — Rabbi Yohanan ben Chanina holds per Rabbis in such a case they do not acquire residence, for intent of the people of the city does not help since they flow, as Tosafot wrote; therefore he challenged: even if we concede per Rabbis intent does not help in this case, nevertheless why laugh? That one who teaches like Rabbi Yehudah ben Rabbi Nosson would he laugh because he holds like Rabbis? But in the conclusion that he laughed because it required an iron partition — the outer reason remains that even when flowing, intent of the people of the city helps, and the baraita comes even per Rabbis. See Hagahot Maimoniot letter 18: per Rabbis in truth they do not acquire residence, as said.`,
  },
};

for (const [file, blockFixes] of Object.entries(fixes)) {
  const blocks = parseBlocksInFile(fs.readFileSync(file, "utf8"));
  let n = 0;
  const out = blocks
    .map((b) => {
      const key = `${b.seif}:${b.marker || "_"}`;
      if (blockFixes[key]) {
        n++;
        return { ...b, en: blockFixes[key] };
      }
      return b;
    })
    .map(serializeBlock)
    .join("\n\n");
  fs.writeFileSync(file, out);
  console.log(file, n);
}
