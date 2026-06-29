#!/usr/bin/env node
import fs from "fs";
import { parseBlocksInFile, serializeBlock } from "../oc001_block_lib.mjs";

const fixes = {
  "13:ח": `(ח) And practiced etc.—meaning like first view one need not bless hamotzi and three blessings.`,
  "13:י": `(י) And heaven-fearing should go out etc.—meaning even when his intent at time of kneading was to cook and fry.`,
  "17:א": `(א) Baked in oven—and likewise baked in pot without liquid.`,
  "17:ב": `(ב) Blesses hamotzi on it—meaning even if he did not establish on it; and unlike pat haba'ah b'kisnin (whose meaning is bread filled with fruits and spices explained seif 7) that one does not bless hamotzi without establishing meal on it—for there they are only for dessert and sweetening unlike pastida filled with meat which is way to eat for appetite and satiation and is like other bread and meat when eating together; and it appears plain if made small thin cakes mixed with meat crumbs and recognizable they are only for dessert after meal—law is exactly like bread mixed with fruits and other sweeteners that one does not bless birkat hamazon without establishing on it. And know bread baked in egg water i.e. what we call kichlach—Magen Avraham doubts if in category pat kisnin and this is difficult; Gra and Gra"z decided it is in category pat kisnin and so Magen Giborim and so is custom [later found Gra's practice also says so]; nevertheless Magen Giborim wrote heaven-fearing should not eat except when entire kneading is on egg water and no water mixed at all; and it appears if thin and dry need not be stringent even if water mixed.`,
  "17:ג": `(ג) Should not bless on it etc.—meaning even if he established meal on it—for this matter depends on dispute above seif 13: per first view since cooked in liquid left bread category entirely and in any case blesses only borei minei mezonot; per second view since kneaded thick at night and had name of full dough it does not leave through cooking and frying and blesses hamotzi in any case; therefore heaven-fearing should not bless and eat except within meal as above seif 13.`,
};

const path = "output/siman_168/mishnah-berurah/part-001.txt";
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
