#!/usr/bin/env node
import fs from "fs";
import { parseBlocksInFile, serializeBlock } from "../oc001_block_lib.mjs";

const files = {
  "kaf-hachayyim/part-001.txt": {
    "1:_": `(1) [Seif 1] One may not converse at meal etc.—even in words of Torah. Taanit 5b. Magen Avraham note 1. Eshel Avraham letter 1. Maor HaKatan on Rambam chapter 7 Laws of Blessings halachah 6. Darkei Moshe in gloss Taz letter 2. Yoreh De'ah letter 9. Yad Ephraim letter 1. However to separate from prohibition one may converse. Eshel Avraham letter 1. Even between dish and dish no conversing while mind still to eat; proof from siman 174 and 175 wine blessing and hatov vehametiv one does not exempt fellow until says savri maranan so they turn house of swallowing from food etc.; can say for them when ate reclining on left—stomach above trachea below when speaks trachea opens food above may fall into trachea and endanger—unlike now we eat sitting equally no such concern; therefore never saw carefulness—Perishah letter 1 Eshel Avraham there. Birkat Yosef letter 1 Maor HaKatan letter 1 wrote Shlah Birkat Yosef; per this on Seder night when reclining should be extra careful fulfill sages' words—end quote; however in Shulchan Aruch there he retracted because now no reclining as above siman 167 seif 11; nevertheless wrote no conversing at meal—implies also for us who do not practice reclining; concluded but not careful as Perishah wrote etc.`,
    "7:_": `(7) There in gloss he does not take at all etc.—meaning if did not enter bathroom; if entered bathroom must wash even if did not relieve himself as above siman 4 letter 65 see there.`,
    "10:_": `(10) There and if spoke with fellow and urinated etc.—Rashi since urinated hour or two diverted mind from meal and not careful keep hands—they are busy—end quote. So Bach. Taz letter 1. However in Sefer Birkat Avraham part 4 siman 127 wrote in plain one hour can say perhaps careful not soil hands and not defile hands; but two hours does not help for majority custom hands busy touch not in pure place two hours—end quote. Brought Shakh Hagahot Taz letter 1 and Olat Tamid letter 2 except Olat Tamid wrote does not imply so from Mechaber's words—meaning he holds like Rashi even one hour we are concerned; so can be stringent.`,
    "12:_": `(12) There and one who urinated takes two hands etc.—from Mechaber implies spoke with fellow and urinated can wash outside—for specifically urination disgusting to company must wash before them; but from baraita and Rambam implies in all cases must wash before them—and so is essential. Peri Chadash letter 1. However Magen Avraham note 5 wrote also per Maran in urination must before and even for eating see there. Eshel Avraham letter 5. So Levush. Darkei Chaim letter 2 Yoreh De'ah there.`,
    "16:_": `(16) [Seif 2] Two wait etc.—when their waiting not long and not pause in conversation—Eshel Avraham end letter 6 in name Tzedah LaDerech page 59. Machatzit HaShekel note 7. Implies specifically if eat one bowl; if each eats own bowl plainly need not wait.`,
    "17:_": `(17) To drink etc.—Levush wrote reason lest this one be offended and choke while drinking—end quote; implies specifically for drinking must wait but other matter need not wait. However Rabbenu Yonah chapter 3 they ate wrote on this two wait for each other at bowl—meaning when one drinks or cuts bread or waits to receive slice from cutter—fellow must wait for him due to derech eretz—end quote. Brought Darkei Moshe letter 2 and Derishah letter 1 see there. Implies plainly not only drinking but other matters must wait; so Magen Avraham note 7 wrote and not like Levush. So Eshel Avraham letter 6 wrote omitted Levush Rabbenu Yonah's words see there. Yad Ephraim in Hagahot Beit Yosef 62b letter 1 Yoreh De'ah letter 12. Chasdei David letter 3—appears specifically when equal; but if reclines with them father mother older brother and whoever greater in wisdom and number obligated honor him—his honor that minors wait for elder even mid-eating and elder does not wait for minors. Chasdei David there.`,
    "21:_": `(21) [Seif 3] They leave corner in bowl etc.—Bach wrote since dispute in texts worthy every person be stringent for himself leave corner whether pot dish or pan see there. Brought Shakh Hagahot Beit Yosef letter 1 Eshel Avraham letter 7. However in Shulchan Aruch parashat Ekev Rav wrote no concern nowadays—for reason measure of corner is for some poor coming during meal or also leave portion for attendant serving meal; since they leave in pot after giving host to eat portion for wife household enough with this corner especially nowadays no custom poor coming during meal nor attendant—therefore law not practiced now—end quote. So wrote in Sefer Nagid uMitzvah; brought Yad Ephraim in Hagahot Taz. See our words above siman 127 letter 15 what person must be careful in eating and drinking see there.`,
  },
  "levushei-serad/part-001.txt": {
    "6:_": `Taz note 5—in baraita so. This language implies as Magen Avraham explained prohibition only when blesses birkat hamazon having eaten all needs and drinks two cups appears wants eat more; but mid-meal permitted drink two cups to moisten what he will eat later. Tur explains one view in birkat hamazon many cups—for drinking two within meal certainly forbidden due to pairs; but even when wants bless on one nevertheless bringing together forbidden for appears glutton.`,
  },
  "machatzit-hashekel/part-001.txt": {
    "10:א": `(א) Host should do etc.—he said to Rava son of R' Nachman why when etc.; difficult what he said at end etc.—already etc.; Maharsha also challenged this and answered initially could not answer except from laws of derech eretz but finally answered better from him one does not refuse elder—law derived from Avraham; this resolves for Rava Huna; but Magen Avraham's difficulty on questioners since Rava Huna already answered from five matters of derech eretz regarding sitting on bed—why asked again about drinking cup. Can say nevertheless derech eretz etc. until insists etc.; if so regarding sitting on bed must say truly did not sit immediately until they insisted—for there reason of not refusing elder does not apply; if so must say Tosafot's difficulty on what wrote why sat on bed immediately—there is no refusal etc.—not on Rava Huna who should say this reason but better why not sit immediately from not refusing; must say did not sit immediately since gave reason all host did and this alone does not help except he do as host said but must refuse as Magen Avraham.`,
    "10:ב": `(ב) As they say in Arakhin 16b end of chapter 3.`,
    "10:ג": `(ג) Even occasional guest etc.—R' Yehuda bar Chiyya derived not to change from guest from verse regarding Avraham to place where his tent was initially. R' Yosei bar Chama derived from verse and he went on his journeys and said there—what is difference—R' Yehuda occasional guest; Rashi explains such as traveler on road who lodged there by chance that sun set there; per one who learns from his tent only considers fixed guest; per one who learns from his journeys considers even occasional—end quote; therefore occasional guest depends on dispute; Magen Avraham possible stringent per one who learns even occasional and say Magen Avraham holds they do not dispute—does not imply so there.`,
  },
};

const base = "output/siman_170";
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
