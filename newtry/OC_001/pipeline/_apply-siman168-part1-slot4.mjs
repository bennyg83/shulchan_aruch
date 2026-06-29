#!/usr/bin/env node
import fs from "fs";
import { parseBlocksInFile, serializeBlock } from "../oc001_block_lib.mjs";

const fixes = {
  "2:_": `To join them—for we require lechem mishneh, and on weekdays they do not practice joining them. And when joining on Shabbat one should be careful not to take a stick that is muktzeh—Magen Avraham; see responsum of Panim Me'irot in his method to Zevachim daf 105b that he rejected Rokeach's words from what Tosafot wrote there on s.v. chibur ochlin etc., see there; and see Yad Aharon who reconciles.`,
  "7:א": `Honey—meaning Rashi explains pat haba'ah b'kisnin is from side of filling and the dough itself is kneaded in water but they filled it with fruit syrup or honey or nuts; and included in this is what they make on Purim—wide folded dough filled with sesame. And second view is Rambam who holds kisnin is from the dough itself kneaded in honey or spices. Bach was in doubt: do we say specifically when kneaded in much honey and minority water; but if minority honey is nullified against majority water it is full bread; or perhaps even through small mixture of honey—all where taste is recognizable in dough is called kisnin. He wrote for halachah since it is rabbinic one may be lenient like all views; and see what Magen Avraham wrote on Rambam; and see responsum Panim Me'irot siman 68.`,
  "7:ב": `Full bread—meaning if there is only a little honey, therefore they do well to bake on Shabbat matzalot kukin for lechem mishneh for there is only little fat. Taz wrote it seems Rama disputes only this matter alone; but on what Shulchan Aruch wrote first from side of filling and what he wrote afterward and second view etc.—he does not dispute. And it appears for kisnin that are from filling—even if filling is removed and dough alone remains, law of kisnin still applies; reason we follow time of baking—Taz. Purim kreplech are kisnin.`,
  "10:ג": `Borei minei mezonot—and in all these even if he established his meal on them he blesses borei minei mezonot since it is not bread at all; and see below note 17. It is in Gemara: if he crumbled bread until returning like flour and afterward kneaded together and baked again—he must bless hamotzi. Magen Avraham wrote: if so those who make pretzels from crumbled bread or bread soaked in water must bless hamotzi since beginning was bread—it does not leave Torah category of bread until each piece lacks olive size. Nevertheless if he mixed flour and fried in fat or kneaded them—this requires study if we follow majority. And see seif 13. And Kenesset HaGedolah in name of Shach Chayei Adam siman 163 ruled plainly he blesses borei minei mezonot, see there. However those who fry whole slices—it is simple he blesses hamotzi as Shulchan Aruch wrote—Magen Avraham, see there.`,
  "13:ד": `And kreplech—meaning filled with meat; but if filled with types of fruits they are kisnin as written seif 7 even if baked in oven—Magen Avraham. And Taz wrote always they are kisnin even filled with meat, see there; and see note 4.`,
  "17:_": `In cheese—see below note 31 from what is written. Taz wrote always they are kisnin whether filling meat or filling fruits. Shulchan Aruch refers here when he established his meal on them and teaches this pastida—even if he established his meal he does not bless hamotzi because essence is meat—teaches not on bread. Magen Avraham distinguishes between filling meat and filling fruits and spices—for filling fruits and spices it is dessert and is kisnin, see there. And know pat of kisnin on which one blesses borei minei mezonot is even if baked in oven. Rules of this siman: (a) dough kneaded in fruit juice and baked later in this seif. (b) If fried in fruit juice or water in seif 13. (c) If filled with fruits in this seif. (d) If filled with meat and fish in seif 16. All this when his batter is thick. (e) When batter is soft in seif 8 and seif 14 and 15. (f) Full bread they soaked and cooked afterward in seif 10. So for Mechaber—Magen Avraham distinguishes meat filling from fruit filling. But for Mechaber Taz there is no distinction between meat filling or other things—always kisnin; and he refers in this seif whether meat filling or other; and seif 17 refers when established on them—examine; and see Bnei Chiya and Perach Shoshan klal 1 simanim 5 and 3 and Yad Aharon.`,
};

const path = "output/siman_168/baer-heitev/part-001.txt";
const blocks = parseBlocksInFile(fs.readFileSync(path, "utf8"));
const out = blocks
  .map((b) => {
    const key = `${b.seif}:${b.marker || "_"}`;
    if (fixes[key]) return { ...b, en: fixes[key] };
    return b;
  })
  .map(serializeBlock)
  .join("\n\n");
fs.writeFileSync(path, out);
console.log("fixed", Object.keys(fixes).length);
