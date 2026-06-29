#!/usr/bin/env node
import fs from "fs";
import { parseBlocksInFile, serializeBlock } from "../oc001_block_lib.mjs";

const fixes = {
  "kaf-hachayyim/part-001.txt": {
    "5:_": `(5) There in gloss: both places in one house—Bach wrote Rama did not write so in gloss but per Rambam who ruled like Rav Sheshet that for change of place must bless retroactively and l'chatchila even for things requiring blessing in their place; but per Rav Chisda for things requiring blessing in their place no blessing at all for change of place—not retroactively nor l'chatchila—even if he had no intent to eat elsewhere; nevertheless l'chatchila certainly may not uproot from first place to eat elsewhere as Kolbo wrote; however if at start when he established to eat in first place he had intent to eat elsewhere, he may l'chatchila go elsewhere and finish his meal even in two houses or more. He wrote so is custom, see there; so Levush, Ohr Torah note 1, Taz s.k. 7 and 9; see below notes 8 and 23.`,
  },
  "levushei-serad/part-001.txt": {
    "6:_": `Shulchan Aruch seif 2: ate in east. Difficulty—for this is corner to corner; one can say there walls of house surround both corners therefore considered one place; unlike fig tree standing where there are no partitions—therefore fig tree not precise but where no partitions any change of place is change. However possible where no partitions, all who see first place is not change of place; east and west of fig tree differ for fig tree divides—it is two places—and this appears more correct per Beit Yosef; thereby understand Magen Avraham s.k. 5 and 6 who hold what Beit Yosef wrote fig tree divides means he does not see his place; and holds further Beit Yosef requires two things: no partitions and also does not see his place—requires study; also implied from Bach's language who wrote where no partitions all who see, etc.—nevertheless where there are partitions even if he does not see, such as divider—no blessing needed.`,
  },
  "machatzit-hashekel/part-001.txt": {
    "1:א": `(s.k. 1) Must, etc.—meaning l'chatchila, etc., came to reconcile Shulchan Aruch language that implies after returning to first place he blesses birkat hamazon—whereas seif 2 explains forbidden to uproot until he blesses birkat hamazon first—therefore Taz: such is law l'chatchila; nevertheless if here he uprooted from there and did not bless birkat hamazon, so Taz in seif 2.`,
    "3:א": `(s.k. 3) And so, etc.—all agree, etc., in Pesachim 101a tanna teaches change of place requires blessing; Rav Chisda: we taught only things not requiring blessing after them in their place, but things requiring blessing after in their place—no blessing needed. Why? He returns to first establishment. Rav Sheshet: both this and that require blessing; Rif and Rambam ruled like Rav Sheshet that even things requiring blessing after in their place nevertheless require blessing. On this Kesef Mishneh challenged: since tanna teaches they were sitting to eat—implies bread—still requires blessing though per Rabbenu Chananel on bread requires blessing in its place (as seif 5)—nevertheless we hold like Rav Sheshet.`,
  },
};

const base = "output/siman_178";
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
