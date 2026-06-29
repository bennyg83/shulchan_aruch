#!/usr/bin/env node
import fs from "fs";
import { parseBlocksInFile, serializeBlock } from "../oc001_block_lib.mjs";

const mb = {
  "1:א":
    "(1) With less than ten — for it is a matter of sanctity, and it is not [done] with less than ten, as it is written: \"and I shall be sanctified among the children of Israel\"; and it is derived by gezeirah shavah: \"among,\" \"among\" is written here \"among the children of Israel,\" and it is written there: \"Separate yourselves from among this congregation\"; and a congregation is not less than ten.",
  "1:ב":
    "(2) Adults — to exclude minors, who are less than thirteen years and one day; for although a minor completes the count of seven, as below siman 282, s.k. 3 — nevertheless he does not complete [the count] to ten.",
  "1:ג": "(3) Free men — to exclude slaves.",
  "1:ד":
    "(4) They began with ten, etc. — and if he began only with the blessing alone, this is not considered a beginning for this [matter] [Peri Megadim].",
  "1:ה":
    "(5) And some of them left — and when the majority remained, meaning six suffice; and we do not require a recognizable majority; and of those who leave it is said: \"and those who forsake the Lord shall perish.\" And it is forbidden even between one man and another [aliyah]. And when it is permitted to leave between one man and another, this is specifically when ten remain [acharonim].",
  "1:ו":
    "(6) They finish — meaning on a weekday all three [readers], and on Yom Tov five, and on Shabbat all seven readers; but they do not add beyond this, and they say Kaddish after the reading. But for the maftir he does not read, for it is a separate matter and is not drawn after Torah reading; and all the more so he does not read haftara afterward from the Prophets. And there are those who wrote that nevertheless it is good to say the haftara from the Prophets without its blessings. And for the haftara too the law is thus: if they began the blessings of the haftara with ten and some left, they finish saying the haftara with its blessings afterward.",
  "2:א": "(7) One does not read from it — on account of honor of the congregation.",
  "2:ב":
    "(8) But in our chumashim, etc. — for they are not rolled [on a scroll], and likewise they are not sewn with sinews, nor on parchment, and all the laws of a Torah scroll [apply].",
  "2:ג":
    "(9) One does not bless over them — and in a settlement that does not have a Torah scroll, it is proper to read from chumashim without a blessing, so that the Torah of reading not be forgotten; and one does not call up the olelim by name as is the custom for a Torah scroll; rather the prayer leader reads everything in a loud voice before them.",
  "2:ד":
    "(10) And the one called up reads — and nowadays the practice is that one reads from the chumash in a whisper, and the prayer leader reads after him from a valid Torah scroll, because there are people who do not know how to read with cantillation and tropes, and even if they prompt them — therefore they prompt the prayer leader.",
  "3:א":
    "(11) That they do not have a valid Torah scroll — meaning, whether among the chumashim made in a roll as mentioned in seif 2, or a complete Torah scroll that has a disqualification in it.",
  "3:ב":
    "(12) One does not bless over it — this is the author's view, that even in a pressing circumstance one does not bless; and see below in this seif in the gloss at the end, where he brought two views on this; and see there in Mishna Berurah.",
  "4:א":
    "(13) If an error is found, etc. — in order to understand the words of this seif, I will precede it with a short introduction. Behold, the view of most poskim is that a Torah scroll missing one word or one letter, or in which an error is found, is pasul to read from; and according to them, if an error is found in it, even after they already read seven readers, one must return to the beginning in a valid Torah scroll and bless upon it, for that first reading is as if it never existed. And the view of some poskim is that even if several verses are missing — and all the more when an error is found in it in general — although it is not called a Torah scroll for fulfilling in it the positive mitzvah of writing a Torah scroll, nevertheless it is permitted to read from it if one has no other. And behold, the author in seif 3 ruled plainly that l'chatchila one should not take out an invalid Torah scroll to bless upon it, even in a place where one has no other, after the majority of poskim hold it is forbidden. However, if the error was found after they already read the sedra, Mahari Bei Rav ruled that for b'dieved one relies on the view of some of the aforementioned poskim who validate reading in it, and their reading is valid, and they need not take out another Torah scroll; and the acharonim agreed with him in this. And the same is true if the error was found between one man and another, and they have not yet completed the seven readers: regarding what they already read, one relies on the view of those who are lenient that they fulfilled b'dieved; but to read further in it is forbidden, and they take out another and begin from the place where the reading stopped, and complete the readers with those first ones who read in the erroneous scroll — meaning that they too join the seven readers, since it is b'dieved, as stated [and the acharonim wrote that nevertheless, if possible, it is better that they read seven readers in the Torah scroll they took out]. And all this if he already recited the closing blessing on the invalid scroll. But if in the middle of his reading they found an error, even if they already read many verses [and all the more when they have not yet read three verses], and even if he finished his reading entirely — as long as he has not yet recited the closing blessing, one does not recite the closing blessing on the invalid scroll, for this is l'chatchila; rather they take out another and read there three verses, and bless the closing blessing there alone. This is the method of Mahari Bei Rav that the author brought in this seif. And the view of Mordekhai is that if they already read three verses and it is possible to stop there — not being two verses adjacent to the parasha — they stop there and bless the closing blessing, and take out another for the remaining readers to ascend from there. And if he has not yet read three verses, or he read three verses but only two verses remain adjacent to the parasha where it is impossible to stop — he reads the error from memory and completes his reading in the invalid scroll and blesses the closing blessing, and afterward takes out another [and likewise if it is Rosh Chodesh and the like, where they must complete the parasha for the day's obligation and cannot add readers — if so, when the error is in the fourth reading, it is impossible to stop there to bless the closing blessing, for then they would need to add to the count of readers; and since it is impossible to stop there, he completes the reading in the invalid book and blesses the closing blessing]. And Rama in the gloss made a compromise between them: if he has not yet read only two verses, or even if he read three verses but cannot stop there — such as when it is two verses adjacent to the parasha and the like — he does not bless the closing blessing, but takes out another and completes his reading there and blesses the closing blessing, as the author's view; but if he already read three verses and is in a place where it is possible to stop there, his view is like Mordekhai: he blesses the closing blessing on the invalid scroll, and afterward takes out another. And now we come to explain the words of Shulchan Aruch in detail.",
  "4:ס":
    "(27) One does not take out another — and the same for large and small letters transmitted in the mesorah, or inverted ayin, or bent pei, and the like transmitted in the mesorah — this is not a change of pronunciation to take out another, for they are no better than the aforementioned missing and extra letters. And likewise if the nekudot that are sometimes in a Torah scroll are missing — such as in \"ei Sarah ishtekha\" that should have nekudot per the mesorah — if the nekudot are missing, one need not take out another.",
  "4:ע":
    "(28) One must compromise thus — meaning, this is the way of resolution: the view of Agur is that even in a complete error one does not take out another, for one does not gain, since the other Torah scroll too may be pasul through missing and extra letters; and the view of Beit Yosef is that even for missing and extra letters one takes out another; and therefore Rama personally decided this distinction as halakha.",
  "4:פ":
    "(29) And some invalidate — this is like the author's view above in s.k. 3; and so the acharonim ruled plainly that l'chatchila they do not take out another, even for the day's obligation. However, if they began to read and afterward an error was found in it, and there is no other Torah scroll besides it — some say they complete seven readers and bless before and after it; only the maftir should be the seventh, and they say Kaddish after the haftara. And Dagul MeRevavah wrote that one should not multiply blessings in this manner; and so Shaarei Ephraim wrote, section 6, letter 61 — rather, he completes with this oleh in whose reading the error was found his parasha, and he does not bless the closing blessing; he only stands there, and the prayer leader calls the other olelim until seven olelim are completed, and they do not bless at all; only the prayer leader reads for each one his parasha until the sedra is finished. And this oleh in whose reading the error was found, standing there, does not distract his attention and reads in a whisper with them; and at the end of the sedra he blesses the closing blessing, and he also says the haftara from the Prophets with its blessings. And there is one who wrote that he says the haftara without blessings — until here (and see in Pitchei She'arim, who wrote that Dagul MeRevavah also agrees to all this — see there). And if the error is found in the third [aliyah] or in the rest of the olelim after they finished their reading and blessed the closing blessing, and there is no other Torah scroll besides it — the reader reads the rest of the parshiyot until the sedra is finished without a blessing.",
  "4:צ":
    "(30) One chumash, etc. — meaning that the entire Torah scroll is in one scroll, but it is not complete without error except for one chumash; but if there is only one chumash there, per all opinions one does not read from it, as above in seif 2.",
  "4:ק":
    "(31) One may be lenient — meaning, even per the view of \"some invalidate\" who forbid even in a pressing hour — all this is when the disqualification is in that chumash from which he wants to read; but in the complete chumashim one need not be stringent in a pressing hour, since in any case in this portion in which he reads it is complete; and it is not comparable to one chumash that is pasul per all opinions to read from it — and as above in seif 2, for there it is different, since it is not honor of the congregation to read from one chumash, unlike here where all five chumashim are together.",
  "4:ר": "(32) To read — meaning, with a blessing; and see Biur Halacha.",
  "5:_":
    "(33) That there are not, etc. — meaning that they do not know how to read after the prayer leader word by word from the writing; and the author follows his reasoning in siman 139, s.k. 2, where he wrote that in this manner it does not count. However, per what Rama wrote there (in seif 5) [in seif 2 in the gloss] that we read even for a gentile, and even if he cannot read after the prompting — as we wrote there in Mishna Berurah — if so, this law changes: for us, always seven readers must read and bless, and the prayer leader takes them out in his reading; and so is implied in the explanation of the Gra there in this seif, in the matter of \"and Maharil,\" as we said.",
};

const pm = {
  "2:י":
    "And the rest of the matters will be explained below in Magen Avraham, letter 7, section 9; and here one need not elaborate further.",
};

const fileMb = "output/siman_143/mishnah-berurah/part-001.txt";
const filePm = "output/siman_143/peri-megadim/part-001.txt";

function apply(file, fixes) {
  const blocks = parseBlocksInFile(fs.readFileSync(file, "utf8"));
  let n = 0;
  const out = blocks
    .map((b) => {
      const key = `${b.seif}:${b.marker || "_"}`;
      if (fixes[key]) {
        n++;
        return { ...b, en: fixes[key] };
      }
      return b;
    })
    .map(serializeBlock)
    .join("\n\n");
  fs.writeFileSync(file, out);
  console.log(file, n);
}

apply(fileMb, mb);
apply(filePm, pm);
