#!/usr/bin/env node
import fs from "fs";
import { parseBlocksInFile, serializeBlock } from "../oc001_block_lib.mjs";

const files = {
  "baer-heitev/part-001.txt": {
    "2:_": `Box—specifically box of Christians that bends and foods are repugnant. But box of wood that does not bend, even if sefarim inside, permitted to sit on them, and certainly food Bach. In Rama teshuvah wrote forbidden to sit on chest with sefarim inside; and Yoreh Deah siman 282 Taz wrote if fixed in wall permitted, and so practiced in beit haknesset; see teshuvat Ohel Yaakov siman 18.`,
  },
  "kaf-hachayyim/part-001.txt": {
    "3:_": `(3) There—one does not lean the bowl on it etc.—for if it falls on the bread it becomes repugnant to him; however Bach explains such as behind the bowl is wet or dirty with mud, then the bread one leans the bowl on is also repugnant; but we are not concerned lest fall from the soup and become repugnant, see there; and they brought in Shakh naG in hagah Bach sign 1 and wrote Levush agreed to the stringent view, see there; see Maamar Mordechai sign 2 what he greatly challenged on Bach's words, see there. And therefore one should not deviate from Shulchan Aruch words but only concern also Bach's words—that is if there is nothing in the bowl that if falls would make bread repugnant, one may not lean bowl on bread until he sees its base lest they are dirty and bread repugnant. Mishnat Zahav sign 2 wrote specifically to lean bowl for eating need is permitted if not repugnant, but to lean some thing is forbidden; however to cover vessel is permitted, see there.`,
  },
};

const base = "output/siman_171";
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
