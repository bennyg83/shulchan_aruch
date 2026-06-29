#!/usr/bin/env node
import fs from "fs";
import { parseBlocksInFile, serializeBlock } from "../oc001_block_lib.mjs";

const fixes = {
  "peri-megadim/part-001.txt": {
    "4:_": `Must—Taz siman 129 s.1 and 271:17 then diners do not taste before blesser; see Beer HaGolah there wrote; possible even if pours into many cups and interrupts between blessing and tasting much need is blessing; possible require full for birkat hamazon then pour first then birkat hamazon; see siman 183; however seems custom blesser drinks first; Taz challenged when only one cup others drink from defective (answer pour little to empty vessels no revi'it each and when no vessels either); answer nevertheless where possible fix pour little into them fixes as seif 6; therefore nowadays even zimmun three each blesses quietly alone as siman 183 Taz 6—correct each has cup in hand.`,
    "5:_": `And there is—Taz 271:9 and Levush s.5-6 wrote some say and some say and Mechaber wrote one view stam; siman 150 and 271.`,
    "6:_": `First in first out—Taz seif 6 no contradiction for here all lenient since b'dieved valid with defective cup also as seif 6; so Pri Megadim and Magen Avraham letter 10 answer in Beit Meir see there.`,
    "7:_": `At time of pressure—Taz Pesachim 106a; Mechaber from this.`,
  },
  "rabbi-akiva-eiger/part-001.txt": {
    "1:_": `Magen Avraham s.k.1—and requires study; for Tosafot 102b and Rosh that which all drink in turn—since does not expect wine tomorrow; so below siman 296 s.3; if only one cup and does not expect; if we say for cup birkat hamazon need not pass eating time even when expects—would be law eats before havdalah and all drink after him—for if not permitted necessarily would havdalah now on cup and law eat afterward bless without cup—better do via cup as when not expecting; what difference not expecting vs expecting—therefore like Tur for birkat hamazon cup must pass eating time therefore when expects cup tomorrow rule havdalah and not eat until tomorrow—clear proof with God's help; requires study.`,
  },
  "turei-zahav/part-001.txt": {
    "1:_": `To bless on beer do not protest—in Maharshal responsa siman 23 wrote in pressure may bless even kvass or beer for otherwise forbidden drink after birkat hamazon without blessing; do not teach before multitude lest belittle even not pressure—end quote; I say disgrace to blessing and not comparable to defective cup—for this is greater disgrace and no importance more than water—do not do among Israel; also custom among masses if drink beer during meal then after eating set to drink honey water—they bless birkat hamazon on beer cup saying chamar medinah—seems disgrace to mitzvah included in do not let your table full while master's empty—for since desires drink honey water why not bless on it—certainly has advantage over wine; though honey water not seven species like beer we do not care preferred preferable as below siman 211; so Maharal.`,
    "2:_": `Some infer, etc.—reason in Beit Yosef Midrash HaNe'elam less than three no cup; to fulfill also poskim require cup they compromise to show law not decided.`,
    "3:_": `Into his hand, etc.—difficulty for all require full; may say pours afterward into small cup from it and full; or pours only little so still full on it.`,
    "4:_": `Must give from cup of blessing—before blesser drinks all drink from non-defective cup as siman 129 and 271; but practice blesser drinks then pours to diners' defective cups—no reason; question if only cup for blesser others drink defective since blesser tasted—answer wherever possible fix; where impossible suffices blesser drinks non-defective; better each have own cup if possible.`,
    "5:_": `Some say not needed—Ra'ah in Beit Yosef holds need non-defective cup only for blesser; seems proof from ch. 3 they ate at Ulla birkat hamazon at R' Nachman—Rav Nachman to Ulla send master cup of blessing—said so R' Yehudah woman does not bless from her fruit only man's fruit—meanwhile daughter-in-law heard left in anger broke ten barrels wine—Rav Nachman send another cup sent all this wine of blessing; Rashi vessels in barrel like cup of blessing drinks from it—implies when blesses on non-defective cup blessing applies to all wine even defective for did not bless that wine in barrel—no advantage from non-defective except need blessing only on one rest follows; so Beit Yosef siman 206 Hagahot Maimoniyot—all wine of blessing vessels before him blessing applies—end quote; implies even defective as I explained.`,
    "6:_": `First in first out nullified—seems poured in small trickle similar Yoreh Deah 134; question on what wrote afterward may fix with little wine or water—would be first in first out nullified no fix; seems since dispute Yoreh Deah whether first in first out nullified and here what needed not truly defective only l'chatchila for in pressure valid defective—we adopt leniency every way.`,
    "7:_": `At time of pressure, etc.—from Gemara Rav Yaakov particular about defective cup—only l'chatchila; told him cannot fix pour little water into it—refers already diluted with water if dilutes more will spoil.`,
  },
};

const base = "output/siman_182";
let total = 0;
for (const [rel, blockFixes] of Object.entries(fixes)) {
  const fp = `${base}/${rel}`;
  const blocks = parseBlocksInFile(fs.readFileSync(fp, "utf8"));
  const out = blocks
    .map((b) => {
      const key = `${b.seif}:${b.marker || "_"}`;
      if (blockFixes[key]) return { ...b, en: blockFixes[key] };
      return b;
    })
    .map(serializeBlock)
    .join("\n\n");
  fs.writeFileSync(fp, out);
  total += Object.keys(blockFixes).length;
}
console.log("fixed", total);
