import { readFileSync, writeFileSync } from 'fs';

const BASE = 'C:/Users/binya/Documents/Shulchan aruch/newtry/YD_001/output';

function fixRegex(file, pairs) {
  let t = readFileSync(file, 'utf8');
  let count = 0;
  for (const [rx, replacement] of pairs) {
    const before = t;
    t = t.replace(rx, replacement);
    if (t !== before) count++;
  }
  writeFileSync(file, t, 'utf8');
  console.log(`Fixed ${count}:`, file.split('/').slice(-3).join('/'));
}

// siman_157/pitchei-teshuva
fixRegex(`${BASE}/siman_157/pitchei-teshuva/part-001.txt`, [
  [/^They will be sent or killed\. In the book of the wise men.*$/m,
   "They shall transgress or be killed. See the book Mishneh Chachamim in the introduction to the Laws of Avodah Zarah who was uncertain whether it is specifically in this case — that they told him to transgress and if not he will be killed — that we say he transgresses; or perhaps since the Torah freed one who is compelled, etc.; but if they come to kill him for some matter and do not come to compel him to transgress, God forbid he should say to save his life he will transgress some matter — for such compulsion is not called ones when their intention is to kill him since they do not intend to compel him to transgress. Or perhaps not — since we hold there is nothing that stands before pikuach nefesh, and even doubt pikuach nefesh, because of \"and he shall live by them\" — what difference whether the danger comes from Heaven or from a person — in any case he can save himself."],
  [/^It is an exaltation of Hashem's judgment.*$/m,
   "And it would seem that even if he is uncertain whether he will be spared by transgressing from the death penalty, it is a case of doubt regarding pikuach nefesh — see there that no clear ruling was reached. [See the Taz below siman 179 s.k. 4; and see the Haflaah Ketubot 4 page 19 on Tosafot s.v. de'amar mar]."],
  [/^“Damn as”.*$/m,
   "Intentionally, etc. See the Baer Heitev s.k. 1; and see the book Atzei Arazim in Even HaEzer siman 16 s.k. 7 at length. And in the book Tiferet Yisrael on the mishnayot chapter 1 of Berakhot mishnah 3 he wrote that nevertheless it is permitted to place oneself in possible danger where harm is uncommon, and a mitzvah one is engaged in protects him — proof from R. Akiva who placed himself in possible danger for netilas yadayim, relying that the prison guard would not let him die of thirst, as stated in Eruvin folio 21 — see there."],
]);

// siman_159/baer-heitev
fixRegex(`${BASE}/siman_159/baer-heitev/part-001.txt`, [
  [/^arrested\. It is because of the fact.*$/m,
   'They forbade it. Because of a decree lest he learn from his deeds; but regarding a Torah scholar there is no such concern. Shach.'],
  [/^interested\. Because we can.*$/m,
   'The matter. Because it is impossible for us to earn a living in any commerce unless we transact with them — therefore the concern lest one learn from his deeds applies less here than in other commerce. Tur.'],
  [/^from him\. Because you don.*$/m,
   'From him. Because of lo tashich and because of lifnei iver lo titen michshol.'],
  [/^forbidden\. The Bible said.*$/m,
   'Forbidden. The Shach wrote — meaning specifically the Karaites who were in the time of the Rambam who had several good qualities, etc. — see there.'],
  [/^forbidden\. Even to Man, we were told.*$/m,
   "Forbidden. Even to one who says it is permitted to lend to a mumar — that is specifically to the mumar himself who knows his Master and intends to rebel against Him; but this one who grew up among the gentiles is like one who acted in error. And Nekudot Yosef wrote in the name of Rabbeinu Tam that it is permitted to lend to him at interest. And in Darkei Moshe he wrote that it requires study; and a mumar who has a son from a gentile woman — the son is like her and his law is like that of a gentile. And see Even HaEzer siman 16 seif 2. Shach."],
]);

// siman_156/beur-hagra remaining — curly apostrophe in "there's" and "he's"
fixRegex(`${BASE}/siman_156/beur-hagra/part-001.txt`, [
  [/^And there’s a h\..*$/m,
   'And there are those who, etc. Like R. Meir, from what is written there 29a "may it come to me," etc. Tosafot there s.v. hamistaper.'],
  [/^Or if he’s broken.*$/m,
   'Or if he has his hair cut, etc. Gemara of Avodah Zarah there.'],
]);
