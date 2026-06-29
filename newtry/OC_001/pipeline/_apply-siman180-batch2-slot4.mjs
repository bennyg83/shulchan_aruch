#!/usr/bin/env node
import fs from "fs";
import { parseBlocksInFile, serializeBlock } from "../oc001_block_lib.mjs";

const fixes = {
  "mishnah-berurah/part-001.txt": {
    "1:_": `(1) Do not remove—so all see they bless Hashem on His great kindness preparing food for all creatures; also blessing does not rest on empty thing but when something there like Elisha's oil flask.`,
    "2:א": `(2) Whoever does not, etc.—must leave so poor person is ready when comes; as Sages said one who extends his table—days extended—lest poor come and he gives; also to thank Hashem for kindness He bestowed we were satisfied and left over as written eat and leave over.`,
    "2:ב": `(3) Does not see sign of blessing—as written no remnant for his food therefore will not apply his good; Shelah wrote proper to give poor the good on table, especially important poor—shows accepted with pleasant face. I praise communities supporting youths at table all year as sons—host fulfills two mitzvot: portion for poor and words of Torah at table—for such youth is poor and speaks Torah; certainly what eaten morning and evening on table like two tamid offerings—brought Eshel Avraham.`,
    "2:ג": `(4) But, etc.—if crumbs on table; if no crumbs on table permitted bring even whole loaf; Zohar wrote good l'chatchila to do so.`,
    "2:ד": `(5) Shall not bring, etc.—see Magen Avraham wrote likewise if whole loaf on table shall not bring crumbs; Peri Megadim wrote likewise shall not leave crumbs when whole loaf present; some lenient in matter need not remove from table, especially Shabbat certainly not remove until after birkat hamazon—both crumbs and whole—for all know placed for Shabbat honor.`,
    "3:א": `(6) Before he takes hands—for mayim acharonim.`,
    "3:ב": `(7) Shall honor house—place they ate; if swept on ground—honor ground; if on table—honor table from food crumbs scattered (Rashi); Terumat HaDeshen: honor where custom to remove table before netilah for birkat hamazon—honor ground under table lest bread crumbs scattered; thus Mechaber here wrote now when do not remove table—need not honor—that ground under table; but when take hands in vessel on table as our custom—all agree must clean crumbs around as below.`,
    "3:ג": `(8) We do not remove—implies previously practiced remove—must mean before all reclining but not before blesser, as seif 61 wrote do not remove, etc.`,
    "3:ד": `(9) We take, etc.—if sit in place and take hands in vessel on table—even now must clean table itself from bread crumbs lest disgusted by netilah water drops; from Rashi; seems nevertheless leave bread in one corner until after birkat hamazon as seif 61, somewhat distant from that place.`,
    "4:_": `(10) Difficult for poor—specifically when tramples—for great disgrace; but when throw to water even if lost thereby no concern since less than olive-size; some stringent when many crumbs combine to olive-size.`,
    "5:א": `(11) To cover knife—in Beit Yosef two reasons: first iron shortens man's days, improper on table similar to altar extending days—for so written do not raise iron on them; therefore after finished eating wants birkat hamazon covers knife. Second reason in name Rabbenu Simcha: once reached blessing Builder of Jerusalem, remembered Temple destruction, stabbed knife in belly—therefore custom remove at blessing time.`,
    "5:ב": `(12) Custom not to cover, etc.—reason not particular about this on Shabbat and Yom Tov—see Acharonim.`,
  },
  "peri-megadim/part-001.txt": {
    "1:_": `Shall not bring whole loaf. Taz Yoreh Deah 178 note 7—and seems even before birkat hamazon permitted; cover bread when birkat hamazon time. Arranging for Gad—only at birkat hamazon time; for Shabbat honor permitted; what wrote if already placed permitted—Magen Avraham note 2.`,
    "2:_": `We. Taz agreed no need honor house see there; nevertheless what not practiced honor house even after shaking cloth—not proper—or be careful take cloth with crumbs throw to water or give birds Magen Avraham 3 on this.`,
    "3:_": `Custom. Taz and Levush reconcile this Magen Avraham note 4; siman 151 Taz note 2 regarding synagogue see there; Magen Avraham note 4 other types of knives.`,
  },
  "shaarei-teshuvah/part-001.txt": {
    "2:_": `Whole loaf. Eshel Avraham; see Eshel Avraham and Biur Halacha—omitted Zohar language Yitro 87: person should arrange on table one bread or more to bless on it (truth in Magen Avraham explained wrote from Zohar Yitro means from start of meal); brought Yad Ephraim and Mikdash Melech lengthy there see there.`,
    "3:_": `For poor. Eshel Avraham; see Biur Halacha in name Maharshal that Eliyahu R' Eliyahu Glanti in introduction Zohar wrote to compel only when all crumbs together not olive-size—no prohibition see there.`,
    "4:_": `Knife. See Eshel Avraham and Biur Halacha wrote as if saw in name holy Maharam Cordovero no cover on Yom Tov; so I saw Maharshal R' Eliyahu Azulai in his hagahot manuscript—for Shabbat and Yom Tov hint to World to Come when at that time external forces sweetened death swallowed forever, etc. see there. What wrote cover table, etc.—Biur Halacha wrote in name Maharshal other reason lest mayim acharonim fall on bread and disgust—not shame since already blessed hamotzi. Biur Halacha wrote in their place no one practices—only some city saw a little practice see there.`,
  },
  "turei-zahav/part-001.txt": {
    "2:_": `Shall not bring whole loaf. See Yoreh Deah siman 178 no prohibition on what some practice arrange table Shabbat night with whole bread all night—for Shabbat honor, not like Levush who forbids there. Seems plain they warned only not bring whole loaf before birkat hamazon; if already on table they intended eat from—need not remove at all; so explained Beit Yosef brings whole after ate, etc.; many err in this.`,
    "3:_": `We take, etc. Moharchal wrote therefore those who netilah with mayim acharonim and sit at table must honor ground also now; I say further distinction—in Talmud times they removed table—fear lest by shaking table crumbs fell; also where they take hands crumbs not found.`,
    "5:_": `Custom to cover knife. Beit Yosef two reasons: first iron shortens days, improper on altar-table—for written do not raise iron; second Rabbenu Simcha: reached Builder of Jerusalem, remembered destruction, stabbed belly—custom remove at blessing. Beit Yosef wrote what practiced Shabbat Yom Tov not cover—per Rabbenu Simcha no distinction; nevertheless Israel's custom is Torah—end quote. Needs reason why challenged him specifically on Rabbenu Simcha's reason not other—possibly says even for Rabbenu Simcha and all the more first reason—for Rabbenu Simcha could somewhat say Shabbat Yom Tov man not so distressed; seems Rabbenu Simcha's reason fits well—for decree here similar to incident as Shabbat man not go out in nailed sandal from incident that happened—they decreed specifically like incident with nailed sandal; similarly end Yevamot decreed on sin-offering water from ship incident—incident on weekday therefore decreed weekday specifically; and see siman 151 seif 6 on this.`,
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
