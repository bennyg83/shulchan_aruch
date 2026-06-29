#!/usr/bin/env node
import fs from "fs";
import { parseBlocksInFile, serializeBlock } from "../oc001_block_lib.mjs";

const files = {
  "baer-heitev/part-001.txt": {
    "4:ב": `The meal. And likewise wine after the meal before birkat hamazon. Magen Avraham.`,
  },
  "beer-hagolah/part-001.txt": {
    "2:_": `ibid. (same source).`,
    "4:ד": `Beit Yosef.`,
    "8:_": `Berakhot 42.`,
  },
  "beur-hagra/part-001.txt": {
    "2:א": `(1) Seif 2 wine etc. there; and although they disagree with R' Chananel, for bread none disagree; Tur Yereim and Rosh, unlike Tosafot there s.v. and wine etc.`,
    "4:א": `(1) Seif 4 if he fixed etc.—mishnah and gemara Berakhot 40a etc.; Tosafot there s.v. Rashi; and appears wine etc.; and what is taken etc.; and so Rosh there from what R' Yitzchak bar Yosef told him I reconsidered—thus not dependent on Shabbat and Yom Tov but on his intent; mentions Shabbat and Yom Tov because wine was not available and they spoke in present tense; see Rosh there.`,
    "6:א": `(1) Seif 6 there is no etc.—because they come due to the meal as Magen Avraham 2 wrote; only for first blessing it causes etc., as Tosafot Pesachim and implies; but for hamotzi it does not exempt, although siman 208 seif 17 wrote but etc. only if blessed on wine itself or intended to exempt, as Rashi Magen Avraham 1 s.v. but etc. and Rashi Berakhot; Rosh brought there 28b Rosh ate etc.; with this resolves Rashba's difficulty; see Beit Yosef end siman 208; and this regarding wine etc.; Tosafot Pesachim cited; Tosafot there s.v. I etc.`,
    "6:ג": `(3) And even if not etc.—Rosh on Pesachim 24, unlike Tosafot there 102b s.v. hands of wine etc.; see Rashba there who erred here.`,
    "7:א": `(1) Seif 7 or etc. and some say etc.—Tosafot Berakhot 41b s.v. etc.`,
    "7:ב": `(2) And some say to bless etc.—Rosh in name of Geonim.`,
  },
};

const base = "output/siman_174";
let total = 0;
for (const [rel, fixes] of Object.entries(files)) {
  const fp = `${base}/${rel}`;
  const blocks = parseBlocksInFile(fs.readFileSync(fp, "utf8"));
  const out = blocks
    .map((b) => {
      const key = `${b.seif}:${b.marker || "_"}`;
      if (fixes[key]) return { ...b, en: fixes[key] };
      return b;
    })
    .map(serializeBlock)
    .join("\n\n");
  fs.writeFileSync(fp, out);
  total += Object.keys(fixes).length;
}
console.log("fixed", total);
