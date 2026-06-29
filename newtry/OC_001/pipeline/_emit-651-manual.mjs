import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";

const __dirname = path.dirname(fileURLToPath(import.meta.url));

const FIXES = {
  "baer-heitev/part-001.txt": {
    "12:ב":
      "Himself. Taz wrote from this one learns: one who blessed on the lulav and afterward saw the hadas was invalid because leaves fell from it, and afterward they bring him another valid hadas — he must bless on taking the hadas, meaning bind it to the lulav; so too Beit Yosef in the name of Avraham Chaviv — an incident with Rambam who took the lulav and blessed, then saw there was no aravah, returned and took it with the aravah and blessed on taking the aravah and shehecheyanu on account of the aravah; though he need take only the aravah alone, nevertheless it is preferable to take all four species at once — end of his words. Magen Avraham challenged him and raised that he need not bless unless he spoke in between — see there. Yad Ephraim reconciles Magen Avraham's difficulty — see there.",
    "15:_":
      "A fool. See siman 246 s.k. 8 what he wrote there on account of bright faces siman 9.",
    "3:ב":
      "The reverse. Meaning if a left-handed person reversed and took the etrog in the left, any person has fulfilled. Taz wrote in my humble opinion: even any person who reversed and put the etrog in the right and the lulav binding in the left has fulfilled b'dieved — see there. See responsum Chut HaShani siman 28 and responsum Beit Yaakov siman 149. Magen Avraham wrote if he took the lulav in the left and etrog in the right he should return and take again without a blessing — see there.",
    "4:_":
      "In the arm. See Beit Yaakov siman 149, Chut Yair siman 167, Halakhot Ketanot siman 77, and Magen Avraham s.k. 10.",
  },
  "beer-hagolah/part-001.txt": {
    "7:ב": "See there.",
  },
  "beur-hagra/part-001.txt": {
    "11:ג":
      "Seif 8: he shall shake etc. As written there regarding a minor who knows etc., even though he does not know to read Hallel; and in chapter 4 of Berakhot one who rises to travel etc.; and in Yerushalmi Rav Acha bar Yaakov brings it to him and shakes as he blesses on it and says etc.",
    "5:ב":
      "Or etc. As written, for example if they reversed. But this is not needed as written in chapter 1 of Pesachim that one blesses after they are in his hand and fulfills with them, and one does not bless before taking them as in chapter 3 of Menachot from when does one bless etc.; also reversal does not help since he blesses on the lulav and they are before him — they do not hinder each other as explained seif 12; and since the Gemara said one blesses on the lulav after fulfilling and we do not find how we act — for the better one should intend not to fulfill with it; and even for the view that mitzvot need no intent, see Tosafot there 39a and Ran there.",
  },
  "mishnah-berurah/part-001.txt": {
    "5:ד":
      "(27) And he shall bless standing — and his taking shall also be standing; b'dieved if he made the blessing and also the mitzvah seated he has fulfilled.",
  },
  "magen-avraham/part-001.txt": {
    "2:א":
      "In his right hand. Because these three are a mitzvah and the etrog is one mitzvah [Gemara]. Some challenge: why need this reason — derive that everything one blesses on one takes in the right as in siman 206 seif 4 and Berakhot chapter 8 regarding oil and hadas; one could say the Gemara teaches lulav in the right and etrog in the left — why not take both in the right? Therefore these three etc., meaning the verse separated these three mitzvot alone, for it wrote \"branch of a thick tree and willows of the brook\" and regarding palm fronds it did not write a vav [see seif 4]. Alternatively it comes to teach that even if he already blessed on it and afterward takes it a second time he must take it in the right, such as at the time of saying Hoshanot — see Maharil more on this.",
  },
  "kaf-hachayyim/part-001.txt": {
    "1:_":
      "(1) [Seif 1] The mitzvah of four species — each takes one lulav etc. So too in the introduction to Tikkunim and in Zohar Parashat Pinchas daf 256a and in Maggid Meisharim to our master z\"l Parashat Emor and in Shaar HaKavanot daf 105a — see there he gave a reason in sod that they allude to seven sefirot of chesed: three myrtle branches — chesed, gevurah, tiferet; two willow branches — netzach and hod; lulav — yesod; etrog — malkhut, crown of yesod — see there. See further Shaar HaKavanot daf 106: lulav and its species allude to the name Ban Havayah in the filling of the hei — three hadas branches in the vav, two aravot in the first hei, lulav in the vav (since it is yesod and includes six), etrog in the last hei (since it is atarah and chesed within it) — see there. See further there: lulav gematria chaim and hadas gematria chaim etc. Yerushalmi: \"fruit of a beautiful tree\" corresponds to One; \"palm branch\" to one nation; \"branch of a thick tree\" — three corresponding to three forefathers; \"willows of the brook\" — two corresponding to two tablets. R' A — a letter. See in Sefer Yismach Yisrael derush on the Torah Parashat Emor what I wrote of allusions — see there.",
    "9:_":
      "(9) There. And it is a mitzvah to bind them etc., and even though there is difficulty with the rabbis that lulav needs no binding, nevertheless it is a mitzvah to bind them for beauty, as written \"This is my God and I will adorn Him\" — Sukkah 33a, Tur, Beit Yosef, Levush. If so, since it is a mitzvah to bind them for all, one should say before tying: for the sake of unifying etc., behold I come to bind the hadas and aravah with the lulav to repair this root of mitzvah and all mitzvot included in it in the supernal place. May there be pleasantness etc.",
  },
  "levushei-serad/part-001.txt": {
    "8:_":
      "There — meaning he shall take the lulav. Initially it discusses Rokeach when his right hand remained, therefore he takes lulav and etrog in his arms — meaning he takes the lulav in his hand and etrog in his left arm; this is better than taking both in his hand one after the other, because they must be taken together at once and with one hand it is impossible to take together as Magen Avraham wrote afterward from Beit Yosef in the name of Avraham Chaviv; therefore he takes together and lulav in his right hand and etrog in the left arm. Then he says Rokeach's novelty that even if only the left hand remains he does likewise as initially — lulav in his hand and etrog in his arm, for now it is his right side and we follow his side, as Rama ruled seif 3.",
  },
  "shaarei-teshuvah/part-001.txt": {
    "11:_":
      "In his arm. Be'er Heitev; see Yerushalmi in the name of Mahari Molcho: if he has no right hand he takes both in the left; if he has no left he takes them in the right, for that is preferable to taking one after the other — see there. It is also written: if he has no hands or arms he takes with his teeth since \"hand\" is not written, as we hold for chalitzah regarding amputees — requires study in my humble opinion whether this is called taking when there is no manner of taking thus; see Halakhot Ketanot siman 77 that an amputee cannot take with teeth; see in responsa that Be'er Heitev cites. It appears at least he takes without a blessing; it is plain that \"he has no hand\" is not literal but even if he has hands forbidden for some reason he cannot take — the law is thus; see Avnei Nezer s.k. 13 in the name of Kol Bo that amputee takes with arms like chalitzah of amputee — implies not with teeth; see Avnei Nezer when he has even a left hand he takes lulav in his hand and etrog in his arm — see there. In my humble opinion Mahari Molcho's words are plausible that he takes both in one hand; it is also possible to fulfill both — take in the arm and afterward in one hand, or the reverse.",
  },
};

// Long blocks in separate import
const { LONG } = await import("./_651-manual-long.mjs");
Object.assign(FIXES, LONG);

fs.writeFileSync(
  path.join(__dirname, "_fixes-siman651-manual-slot17.mjs"),
  "export const FIXES = " + JSON.stringify(FIXES, null, 2) + ";\n"
);
const n = Object.values(FIXES).reduce((a, o) => a + Object.keys(o).length, 0);
console.log("wrote", n, "keys");
