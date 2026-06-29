#!/usr/bin/env node
import fs from "fs";
import { parseBlocksInFile, serializeBlock } from "../oc001_block_lib.mjs";

const files = {
  "beer-hagolah/part-001.txt": {
    "1:ב": `(ב) Chullin 107.`,
    "1:ג": `(ג) ibid.`,
    "3:_": `Chullin 107.`,
  },
  "chatam-sofer/part-001.txt": {
    "1:_": `In Magen Avraham note 1—free man with harsh labor. See: requires study from Bava Metzia 73b Rava Seorim etc. see there; and one can say in any case forbidden to subjugate gratuitously entirely and no less than his money without knowledge which is forbidden to use—rather if he hired himself to serve then permitted even with harsh labor; there regarding Rava Seorim he said regarding Hebrew slave forbidden harsh labor work—from which we learn not sold for that initially; nevertheless if does not behave properly permitted—and therefore not because he is slave but because he does not behave properly—if so same for full free man too—and requires study; nevertheless Bava Kama 28a does not imply somewhat so; and difficult; must say refers when husband does not act with you and did not transgress blow prohibition; nevertheless money requires payment if goes to court—from which we learn even if does not act with you nevertheless Merciful One does not exempt him; strained to distinguish between blow and making him work; perhaps in Bava Kama one could say and per your reason examine well in all this.`,
  },
  "machatzit-hashekel/part-001.txt": {
    "1:א": `(א) To serve immediately—meaning small amount; and as seif 63 wrote if important person there at table need not bless each slice knowing they will give him all his bread needs; Taz wrote reason Shulchan Aruch specified bread—for certainly must give him for that; certainly important person warns unlike other species which are only measure of piety—for that scholar does not warn see there; still why mention bread specifically—for also other thing with smell from law must give him—so scholar should warn—and should say also for that need not bless each time they give him; nevertheless thing with smell suffices with small amount they give him—if so even scholar warns and they listen and give him—suffices with what they give immediately small amount; therefore if again give him more it is changed mind and certainly need not give much; and that large portion must give immediately—for to quiet his appetite small amount suffices; if nevertheless must give much certainly need not give immediately for not better than bread—as implies seif 3 do not give all bread needs at once.`,
  },
};

const base = "output/siman_169";
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
