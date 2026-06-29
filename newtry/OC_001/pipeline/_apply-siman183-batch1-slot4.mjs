#!/usr/bin/env node
import fs from "fs";
import { parseBlocksInFile, serializeBlock } from "../oc001_block_lib.mjs";

const fixes = {
  "ateret-zekenim/part-001.txt": {
    "1:_": `Cup of blessing—ten things said in cup of birkat hamazon; R' Yitzchak we have only nine—did not come to diminish except adornment and wrapping; so Tur in name Tosafot and concludes; wrapping too we do not practice—found diminishes only adornment; wrapping means arrange above hat but hat alone not called wrapping for anyway forbidden bless bareheaded (so Beit Yosef); but Sefer Yesh Sachar wrote wrapping practiced only in Eretz Yisrael for honor of Shechinah see there.`,
    "4:_": `Permitted—discusses large cups or Rosh Chodesh Tevet on Shabbat or weddings need extend birkat hamazon (Tosafot); some say if holds right in middle of cup may place left hand under cup (my teacher in Bach).`,
  },
  "baer-heitev/part-001.txt": {
    "1:_": `Cups—meaning wine remnants absorbed in bread Rashi; same when wipe with cloth permitted Magen Avraham.`,
    "2:_": `Living—meaning fresh wine; for us send buy from shop near blessing so be fresh Magen Avraham.`,
    "3:_": `Whole—even if base below broken invalid except time of pressure Maharil; see Shakh.`,
    "4:_": `With both hands—see responsa Chakham Tzvi siman 168 wrote specifically blesser must take cup in hand see there.`,
    "5:_": `In our right—place cup on right palm fingers erect around cup and secret; place cup on Pharaoh's palm Shelah; Sefer Nagid UMetzaveh cup stands on five fingers on them literally see there; see Beit Yaakov siman 174; do not take cup in palms only remove them first Maharam.`,
    "6:_": `To support permitted—Bach wrote if holds right in middle of cup permitted put left under cup; Magen Avraham disagrees; Taz forbids even put left under right to support not like Rema see there; Taz wrote saw many people do not fill cup literally and Rema wrote should be full; reason if very full much spills disgrace as do not pass full cup over diners.`,
    "7:_": `Glance—Taz and Magen Avraham challenged from where know put eyes in wine perhaps only in cup; therefore Taz raised if no other cup easily bless on it no invalidation concern see there; see Shakh.`,
    "8:_": `For his wife—even if did not eat with them as Gemara regarding daughter-in-law case.`,
    "9:_": `Quietly—Bach wrote better hear; so Peninei Me'orot siman 57 see there; Taz wrote since unfortunately when blesser blesses zimmun they do not hear and speak other things especially large meals—better not zimmun at all then each blesses alone unlike now they err think exempted by blesser; therefore obligation each speak blessings quietly with blesser see there; Tashbetz wrote must hear until who sustains all which is zimmun blessing; Magen Avraham and so is essence.`,
    "10:_": `Good eye—meaning hates stinginess and bestows kindness with money Rashi.`,
    "11:_": `With awe—fear Heaven careful at birkat hamazon wrap in upper garment and leave hat on head not bless with small cap; even alone practice so awe of Heaven on him and arouse intent Ari Bach Shelah; wrapping only in Eretz Yisrael for Shechinah honor Ateret Zekenim in name Sefer Yesh Sachar see there.`,
    "12:_": `In his work—even light use forbidden.`,
  },
  "beer-hagolah/part-001.txt": {
    "1:א": `Berakhot 51.`,
    "1:ב": `Tosafot and R' Yonah.`,
    "2:_": `Also in Gemara per Rif.`,
    "3:_": `Tur in name Yere'im.`,
    "4:א": `There in Gemara.`,
    "4:ב": `Tur and so in Yerushalmi.`,
    "4:ג": `There in Gemara.`,
    "4:ד": `See there.`,
    "5:_": `Shibolei HaLeket.`,
    "6:א": `There in Gemara.`,
    "6:ב": `There in Tosafot and R' Yonah and Rosh.`,
    "6:ג": `See there.`,
    "7:_": `Shibolei HaLeket and Or Zaruah in name Rabbeinu Peretz.`,
    "8:_": `There in Or Zaruah.`,
    "9:_": `There in Gemara.`,
    "10:_": `Beit Yosef per Rambam and Mordekhai.`,
    "11:_": `Rosh there and Kol Bo.`,
    "12:_": `Yerushalmi there.`,
  },
  "beur-hagra/part-001.txt": {
    "1:_": `(s.k. 1) And if, etc.—Tosafot there s.v. rinsing outside etc. do not require etc.; see Rashi Shabbat 75b s.v. cup etc.`,
    "2:א": `(s.k. 2) He gives, etc.—there R' Chananel and Chayei R' Shimon etc. and error it is; should read as Rif Chayei R' Shimon until blessing of Land; answer in this as above 50:2 modim etc. as Tosafot s.v. modim etc.; may say etc.`,
    "2:ב": `Some say if, etc.—see siman 272 s.5 in Rama.`,
    "2:ג": `And brought us out, etc.—Rashi there s.v. lives and Tosafot s.v. above.`,
    "2:ד": `And cup, etc.—Gemara there.`,
    "3:_": `(s.k. 3) Must, etc.—per latter explanation of Tosafot above; Tosafot Shabbat 75b s.v. enough fits well; so Rosh and Shulchan Shel Arba for all explanations.`,
    "4:א": `(s.k. 7) Receive it, etc.—there and Tosafot there s.v. there is not etc. therefore etc.; seems what wrote we do not have etc. to delay and with this resolves as above since first etc. we etc. for apparently what we—rather explanation for first cannot say stringently for leads to leniency unlike for us not delaying; Rosh wrote R' Yehudah comes to diminish only adornment and wrapping; so Tur in name Tosafot see there and there; so omitted in Shulchan Aruch and Rama; essence as wrote; so Levushei Serad.`,
    "4:ב": `And not so—there as above first etc.`,
    "4:ג": `And this is, etc.—as Shabbat 93b also we etc. received etc.`,
    "4:ד": `And raise it, etc.—there.`,
    "10:_": `(s.k. 10) Eleven, etc.—Rambam and per his view also type of three must return to place and sit there and bless; and Rambam.`,
    "11:_": `(s.k. 11) If, etc.—like prayer ch. 4 there.`,
    "12:_": `(s.k. 12) Forbidden, etc.—Yerushalim ch. 2 on that which we say in Gemara there and Yerushalmi there taught workers etc. R' Mana said this teaches forbidden do melacha while blessing.`,
  },
};

const base = "output/siman_183";
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
