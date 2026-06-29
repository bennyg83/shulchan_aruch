#!/usr/bin/env node
import fs from "fs";
import { parseBlocksInFile, serializeBlock } from "../oc001_block_lib.mjs";

const fixes = {
  "baer-heitev/part-001.txt": {
    "1:_": `Bread. For they are secondary to bread. If one has no desire to eat bread and eats a little bread and blesses hamotzi—requires study whether it exempts the foods; for we do not hold like those who say bread exempts all kinds of foods, but specifically when one establishes his meal on bread we say all foods come because of the bread; but when he has no desire to eat bread it does not exempt, and all the more if he eats less than a kezayit; and one can say that since it is customary to establish a meal on them, bread does not exempt them—therefore he should bless on them and not on bread except on Shabbat and Yom Tov. Magen Avraham.`,
  },
  "beer-hagolah/part-001.txt": {
    "3:ב": `Semag and Hagahot Maimoni chapter 4 Laws of Blessings.`,
  },
  "beur-hagra/part-001.txt": {
    "3:א": `Seif 3: and if one establishes, etc. Rosh there chapter 168, and one who eats, etc.; see in Ramazim and Tur whose text is in Rosh: one who eats, etc.—there is room to doubt if he ate of them at first without bread, etc., and reasoning, etc., and he proved from Yerushalmi from what is written quench after your food; if so it should have said eat without bread at first; and what Rosh wrote and one who eats at first means at the beginning of his meal that he establishes on them, but R' Yonah's text on his piece means afterward; and on that he ate with bread he did not question him at all, only on what he ate afterward, and it should not have said eat at first without bread; and what is written quench after your food, etc., whether per R' Yonah or per Rosh means he says he argues, etc., meaning Rav holds like the amoraim that require blessing before them, not like Rabbenu Chananel; and if you do not wish to enter the dispute against R' Chiya who quenches and thought it was not his main meal, he told him these are, etc.; and from here is proven the aforementioned law of seif 1 and if, etc., that beginning alone does not help.`,
    "5:א": `Seif 5: if, etc. As we wrote regarding blessing on wine, etc., and there in the Gemara he told him I reconsidered, and likewise orally; and Tosafot there one s.v. atcha, etc., and this is what is meant that he is not relying, etc.`,
  },
  "eliyah-rabbah/part-001.txt": {
    "1:_": `(1) Without bread, etc.—specifically when one establishes his meal on bread we say all foods come because of the bread; but when he has no desire to eat bread and eats a little bread and blesses hamotzi, Magen Avraham doubts whether bread exempts them, and all the more if he eats less than a kezayit, see there. In my humble opinion it appears from Berakhot 41a that there is no distinction, for otherwise Rav Safra would have distinguished from him; there is room to reconcile, and it requires study.`,
  },
  "kaf-hachayyim/part-001.txt": {
    "3:_": `(3) There: even if one eats them without bread they need no blessing, etc.—for they are secondary to bread and the main exempts the secondary, as said siman 212. So too Magen Avraham s.k. 1.`,
    "5:_": `(5) There: such as figs and grapes, etc.—the same for anything that comes for dessert; even if it was before him when he blessed hamotzi, even cooked fruits which bread does not exempt since they do not pertain to bread. So Shlah; Magen Avraham s.k. 2; Ohr Zaru'a note 2, etc. And such as are never customary to come because of the meal but their way is to eat them all day even not at mealtime, as the mountain wrote there. But fruit puree such as apple pudding or similar need no blessing on them; one who wants to be stringent takes another fruit, live or cooked, and blesses borei pri ha'etzah on it and then eats those purees as he wishes—Emek Berachah and Shlah HaKadosh, Ohr Zaru'a there. See Magen Avraham s.k. 3 and in our words above siman 168 end note 71.`,
  },
};

const base = "output/siman_177";
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
