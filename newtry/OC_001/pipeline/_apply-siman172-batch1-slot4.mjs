#!/usr/bin/env node
import fs from "fs";
import { parseBlocksInFile, serializeBlock } from "../oc001_block_lib.mjs";

const files = {
  "beer-hagolah/part-001.txt": {
    "2:_": `ibid. in the gemara.`,
  },
  "beur-hagra/part-001.txt": {
    "1:א": `(1) Seif 1 and he does not etc. Rashi there and so R' Chananel explained, and as brought Magen Avraham sign 1.`,
  },
  "kaf-hachayyim/part-001.txt": {
    "1:_": `(1) [seif 1] He forgot and put in etc.—he swallows them and does not bless etc., because they were removed from category of liquids fit for every person to drink; therefore one need not be stringent even if he could bless under pressure. And Raavad wrote specifically when he has no more liquids to drink and is pressed for these liquids; but if he has more he should spit out and not benefit without blessing because of a little liquid; and so proper to act not to enter dispute. And so Bach. Magen Avraham s.k. 1. Acharonim sign 1; nevertheless it appears better to bless in his heart, since Rambam's view chapter 1 Berakhot law of seven species—one fulfills b'dieved if he blessed in heart; and although we do not rule thus generally, here when he already put in mouth and if he spits they are lost and if he blesses afterward there is dispute—it is better to rely on Rambam that b'dieved he fulfills; except only if he cannot bear liquid remaining in mouth until he blesses in heart for some reason, one may say he should spit so as not to enter dispute and also not benefit without blessing.`,
  },
  "machatzit-hashekel/part-001.txt": {
    "2:_": `(s.k. 2) First blessing. But final blessing he blesses—for seemingly this is obvious. And this is one proof of Rav Yosef Karo—for Rambam wrote he swallows them and blesses on them at end, for he holds like the first view Rama brought; and that he blesses on them at end means first blessing, for if final blessing what is he teaching—obvious, see there; nevertheless possible to say therefore Magen Avraham wrote he blesses final blessing because he must say in s.k. afterward that for first view Rama wrote there is doubt regarding final blessing; therefore he wrote for first view obvious he blesses final blessing, and this is strained.`,
  },
  "magen-avraham/part-001.txt": {
    "1:ג": `(3) And some say he blesses—and to explain what is written siman 167 seif 8, here differs for after he remembered while still in mouth, somewhat like passing to perform them; and requires study if he blesses also final blessing, for we do not find two blessings adjacent; and it appears on seven species he blesses for some hold it is d'oraisa, but water and other species are disputed as in chapter 50; possible here one does not bless, requires study; therefore proper to spit them as said above.`,
  },
  "mishnah-berurah/part-001.txt": {
    "1:ב": `(2) And he does not bless on them etc.—some say all this specifically when he has no more liquids to drink and is pressed for these liquids; but if he has more he should spit out and not benefit without blessing; and so proper to practice [Magen Avraham and Acharonim].`,
  },
  "peri-megadim/part-001.txt": {
    "2:ב": `(2) Difficult to me what is written in siman 62 Taz 1 that thought is like speech under coercion one fulfills—here complete coercion, let him think and bless while liquid still in mouth; Magen Avraham will explain sign 1 from this.`,
  },
};

const base = "output/siman_172";
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
