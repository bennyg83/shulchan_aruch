/** worker-slot-16 — siman 600 manual fixes */
import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const tazEn = fs.readFileSync(path.join(__dirname, "work", "taz600-en.txt"), "utf8").trim();

export const FIXES = {
  "beer-hagolah/part-001.txt": {
    "3:_": "Tur.",
  },
  "beur-hagra/part-001.txt": {
    "2:ד":
      '(ד) And if there is none, etc., end of his words. For they were compelled that necessarily they say that if due to doubt it is like other diaspora festivals, and if due to court custom when they would come from minchah and onward from the second day they would count and that is the main point, and see Tosafot Yom Tov chapter 5 daf 2 s.v. who. Therefore it appears as Rosh Chodesh, etc., and one could say that the dispute, etc., and see Rivash siman 10 and see Tosafot Menachot 100b s.v. two, etc., and it appears, etc.',
  },
  "kaf-hachayyim/part-001.txt": {
    "3:_":
      "(ג) [Seif 2] At kiddush on the second night one wears a new garment, etc. The Tur brought a dispute on this regarding shehecheyanu on the second night on kiddush and on the second day on the shofar — some say they do not say Shehecheyanu except on the first day, for they are one sanctity and are like one long day; and some say there is no distinction between Rosh Hashanah Yom Tov and other diaspora festivals except regarding egg and connected prohibitions of one with the other, but regarding Shehecheyanu they say it on the second as on other festivals. The Tur wrote that his father the Rosh wrote that it is good to take new fruit and place it before him and bless shehecheyanu and have in mind also on the fruit and fulfill doubt — and so practiced the Rambam of Rothenburg, see there. Beit Yosef wrote that the world is accustomed to seek new fruit in order to bless Shehecheyanu on it at kiddush, but on the shofar they do not bless Shehecheyanu at all on the second unless day one falls on Shabbat — end of his words, and so are his words here in Shulchan Aruch. But the Mordechai in Darkei Moshe wrote that we are accustomed to bless Shehecheyanu on the shofar both days, and on kiddush they return for new fruit; however if they have no new fruit they bless Shehecheyanu in any case, and so too the Agur that thus practice meticulous people in Ashkenaz, see there. This is what he wrote in the gloss seif 3 and some say it, etc., and so is the custom in these lands — meaning in Ashkenaz lands, but in Sephardic lands they do not say Shehecheyanu on the shofar on the second day as Beit Yosef wrote, see there.",
  },
  "turei-zahav/part-001.txt": {
    "2:_": tazEn,
  },
};
