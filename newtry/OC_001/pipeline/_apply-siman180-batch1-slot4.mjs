#!/usr/bin/env node
import fs from "fs";
import { parseBlocksInFile, serializeBlock } from "../oc001_block_lib.mjs";

const fixes = {
  "beer-hagolah/part-001.txt": {
    "4:_": `Tosafot there in Berakhot and Chullin 105.`,
  },
  "beur-hagra/part-001.txt": {
    "1:_": `(Seif 61) One may not, etc. Tosafot 42a s.v. removed, etc.—see there.`,
  },
  "machatzit-hashekel/part-001.txt": {
    "2:ב": `So inferred from Rashi's words Sanhedrin 92a R' Eliezer: whoever does not leave bread on table never sees sign of blessing forever, as said; challenged—R' Elazar: whoever leaves crumbs on table as idolatry arranging table for Gad; answered contradiction: here whole loaf with him, here no whole loaf with him. Rashi: forbidden where whole loaf with him—brings whole loaf after ate and places on table with crumbs left; where no whole loaf with him—prepared for poor—end quote (see Perishah Rashi on where brings whole after ate implies if already placed permitted; possibly Zohar, etc., not precise Zohar need not agree with Talmud and predates much Talmud—intent though Zohar disputes Talmud elsewhere we do not rule like Zohar, here can rule like Zohar for not disputing Talmud and Talmud admits Zohar; thus precise Rashi's explanation does not settle, etc.—can reconcile Zohar to Talmud per Rashi where whole loaf means brings whole, therefore wrote crumbs explanation preferred from language where whole loaf implies already placed as said; also fits Zohar l'chatchila should prepare at meal start whole loaf for birkat hamazon as Ramak—for Rashi since main prohibition bringing whole after ate appears idolatry via whole loaf and transgresses on crumbs as Derisha, nevertheless since main prohibition from whole loaf how R' Eliezer not mention whole—for Zohar reasonable assumes does properly at start whole loaf for birkat hamazon, R' Eliezer need not mention, only what leaves crumbs now at birkat hamazon time brought on table per Magen Avraham they cause prohibition therefore mentioned, rejected. Shabbat—certainly practice then like Zohar; Taz Yoreh Deah 178 rules Shabbat permitted per some custom leave whole bread Shabbat night on table—not Levush who forbids there—and Shabbat no concern arranging for Gad—for Shabbat honor bread double portion, etc., no prohibition, also before Shabbat from oven place on table for Shabbat honor—see Shach).`,
    "3:א": `(s.k. 3) Difficult, etc.—requires study—is birkat hamazon not concerned for poor? Why say take hands first—rather only difficult when tramples; if throws to water permitted as Chullin 105 explicitly, brought Tosafot there—this Tosafot's intent: why need mention honoring house at all—should say no need honor house but rather even birkat hamazon admits must honor house afterward lest trample crumbs and difficult for poor; even though loses in netilah water since no olive-size we do not care; if olive-size forbidden destroy even without trampling as siman 171—as Magen Avraham clear.`,
    "3:ג": `Ch. 141 Shabbat. We taught 143a remove from table on Shabbat crumbs even without olive-size—not muktzeh for animal food. We say supports R' Yochanan who said even crumbs without olive-size forbidden destroy by hand. Rashi deduced from teaching remove by hand not throw—end quote; Tosafot challenged this version—for Berakhot 52 same gemara supports R' Yochanan crumbs without olive-size permitted destroy by hand—therefore emend other version see there. Per Magen Avraham I explain R' Yochanan two statements: one permitted destroy, one forbidden—both true: permitted when throw to water; forbidden when throw and trample; though two wordings same must say differ in explanation; Mishnah Shabbat truly only excludes trampling—why taught remove not throw—for then would trample; same Hillel throws to water only shortened taught remove.`,
  },
  "magen-avraham/part-001.txt": {
    "4:_": `Difficult for poor. So Rabbenu Yehuda in name Tosafot; requires study—is birkat hamazon not concerned for poor—why say take hands first—rather only difficult when tramples; if throws to water permitted as Chullin 105 explicitly, brought Tosafot there—Tosafot's intent: why need mention honoring house—should say no need honor house but even birkat hamazon admits must honor house afterward lest trample crumbs and difficult for poor; even though loses in netilah water since no olive-size we do not care; if olive-size forbidden destroy even without trampling siman 171—as above clear. Thus resolved Tosafot Shabbat 141 difficulties on Rashi who emended there forbidden destroy by hand—for there discusses when throw where they trample as Rashi from not teaching throw see there.`,
  },
};

const base = "output/siman_180";
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
