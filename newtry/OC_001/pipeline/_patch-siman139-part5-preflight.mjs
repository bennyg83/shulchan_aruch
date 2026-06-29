import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";

const ROOT = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "..");

function patch(rel, seif, marker, en) {
  const fp = path.join(ROOT, rel);
  let c = fs.readFileSync(fp, "utf8");
  const re = new RegExp(
    `(\\*\\*\\*\\* OC001 SOURCE BLOCK \\*\\*\\*\\*\\nslug: [^\\n]+\\nseif: ${seif}\\nmarker: ${marker}\\n\\*\\*\\*\\* HEBREW \\*\\*\\*\\*\\n[\\s\\S]*?\\*\\*\\*\\* ENGLISH \\*\\*\\*\\*\\n)[\\s\\S]*?(\\n\\*\\*\\*\\* END BLOCK \\*\\*\\*\\*)`,
  );
  if (!re.test(c)) throw new Error(`${rel} seif=${seif} marker=${marker}`);
  c = c.replace(re, `$1${en}$2`);
  fs.writeFileSync(fp, c, "utf8");
  console.log("OK", rel, seif, marker);
}

patch(
  "output/siman_139/mishnah-berurah/part-001.txt",
  "6",
  "ג",
  `(25) That the people should hear and respond — from the words of Rama it implies that he holds this opinion applies only to Barchu; but for the [Torah] blessings it does not invalidate after the fact if he blessed in a whisper — see in Biur Halacha what I wrote on this; but lekatchila certainly it is a mitzvah to say them in a loud voice, as stated.`,
);

patch(
  "output/siman_139/peri-megadim/part-001.txt",
  "4",
  "_",
  `And he sees [the verse] — Taz Megillah 32a and in Tosafot s.v. gollehu, etc.; Avnei Choshen explained what is written "everything in it" — gollehu: three views. View 1: R' Yehuda himself lekatchila concedes to R' Meir and argues only after the fact — meaning one should not rebuke him and there is no prohibition if he blesses while it is still open. View 2: they hold like R' Yehuda that specifically when open he blesses over it (or possibly as in siman 206 seif 3 — between blessing and action there should not be an interruption of more than kedei dibbur, even in silence). View 3: uncertain whether like view 1 or view 2 — and how should one act? Therefore he opens and turns his face — see there; and Taz explained another explanation. In my Chiddushim I challenged R' Yehuda who asks from one who reads who did not assist the translator — if it were so that lekatchila he concedes to R' Meir and only after the fact there is no prohibition, what is the question? Also according to explanation 2 it is trouble and therefore for the final blessing one rolls first — if so, for the translator too [one should roll]. Also for blessings there is no error implied; and Rashi explained "everyone knows there is no [blessing] written," etc. (and per the hint there — let us say the halachah follows R' Yehuda because they reversed them; and Rashi [explains] R' Meir according to R' Yehuda — do not err, for there are those who turn their faces, and therefore he noted at the beginning this [law] and afterward there is no error). See there in the note afterward.`,
);

patch(
  "output/siman_139/peri-megadim/part-001.txt",
  "7",
  "_",
  `And immediately — Taz summarized in this the words of Bach, z"l, who wondered at Beit Yosef from Semag and from there one can say Semag means immediately literally; and what is written "he engages in Torah" means he engages during the day — nevertheless now it is immediately; but what Tosafot wrote from there is no proof. What the Mechaber wrote in seif 9 that one is exempt from asher bachar banu but to engage and ha'arev is obligated — see siman 47 regarding ahavah rabbah similarly. And likewise Magen Avraham note 12.`,
);

patch(
  "output/siman_139/turei-zahav/part-001.txt",
  "4",
  "א",
  `All who read bless. In the Gemara chapter HaKoreh, Megillah: the opener blesses before it and the closer blesses after it; and nowadays that all bless before and after — the reason is that the Sages enacted because of those entering and those leaving — meaning they should not hear the blessing from the first and say that the Torah needs no blessing. And there is a difficulty from that which is said in chapter Bnei HaIr: we do not interrupt in curses — meaning one reads and all respond Amen — because it is impossible to recite blessings over punishment; rather how does one act? When he begins, he begins with the parashah before them and finishes with the parashah after them. And in Midrash Rabbah, brought by Tosafot in chapter Bnei HaIr on "we do not interrupt in curses and one reads" — because it is written "My son, do not despise the chastening of Hashem," etc.; R' Yehuda said: I am in distress with him — if so, it is not proper that my children bless me for my troubles; rather one reads, all respond Amen — end of his words. And this contradicts what is written here that the blessing each one recites is from enactment, but by law no blessing is needed except at beginning and end. And one can say this derivation is a mere asmakhta on a verse, as we find many times; for this "we do not interrupt in curses" is a mishnah, and in the days of the mishnah this enactment that each one bless had not yet been made until the days of the Amoraim — for it says "and nowadays," etc. And it appears to me that if two read, even though they do not bless, nevertheless it is considered as though each blessed — meaning each relies on the first one's blessing; and if two read curses...`,
);

patch(
  "output/siman_139/turei-zahav/part-001.txt",
  "4",
  "ב",
  `And he sees the verse, etc. In the baraita the Sages taught: he opens, sees, rolls, and blesses — R' Meir; R' Yehuda says: he opens, sees, and blesses and reads. What is R' Meir's reason? As Ulla said, etc. — likewise so that they not say blessings are written in the Torah; and R' Yehuda holds blessings are not mistaken for, and everyone knows blessings are not written in the Torah. R' Zeira said: the halachah is — he opens, sees, and blesses. And Tosafot wrote: lekatchila he rolls and closes it before he blesses so they not say the blessings are written in it; but after the fact one need not be concerned, for common amei ha'aretz are not so numerous; but after they read from it, certainly one must roll it before blessing — for R' Yehuda — end of his words. And one can question: why did Tosafot concern themselves with R' Meir's words since the halachah is not like him? And it appears to me Tosafot hold that since R' Yehuda's reason is that blessings are not mistaken for — that applies in their time when the generation were Torah scholars; but unless generations deteriorated and there are amei ha'aretz who know nothing — we are concerned for this as R' Meir was concerned; therefore lekatchila one should be concerned. And what is written "but after the fact" — meaning if he already ruled afterward, one need not concern to nullify his ruling; for even if now there are amei ha'aretz, nevertheless they are not so common, as stated, to resolve their words. But the poskim were not concerned for this, and even lekatchila one blesses while it is open — only Beit Yosef in the name of Kol Bo wrote he rolls and blesses; and some say not to roll it but to open, see, and bless — and such is Rambam's view; and some say he should turn his face so it not appear blessings are written in the Torah — end of his words. This Rama brought...`,
);

patch(
  "output/siman_139/turei-zahav/part-001.txt",
  "4",
  "ג",
  `And after he reads he rolls. Likewise also in the name of Tosafot thus; and what is written "for R' Yehuda" — meaning even for R' Yehuda who concedes in this to R' Meir; and as Beit Yosef, the reason is that initially for R' Meir one must roll and bless and afterward open — and this is public trouble; therefore R' Yehuda does not require it; but at the end when there is no further trouble, he rolls and afterward blesses — end of his words. And likewise Beit Yosef in the name of Mordechai, who deduced from the teaching "he opens and sees" that it was rolled between one reader and another; and likewise Rashal, who wrote: the final blessing for the first — the first [blessing] comes for the sake of reading, so it is proper that it be open that he see what he will read; but this one who already read — why should it be open? But this is a custom of ignoramuses, for we do not say that immediately after he rolls and blesses he returns and opens; rather it should be closed until another comes and opens for his reading — end of his words.`,
);
