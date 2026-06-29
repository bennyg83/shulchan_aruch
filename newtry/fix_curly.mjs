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

fixRegex(`${BASE}/siman_153/beer-hagolah/part-001.txt`, [
  [/^Change the Starwork page.*$/m, 'Mishnah Avodah Zarah folio 22b.'],
]);

fixRegex(`${BASE}/siman_155/baer-heitev/part-001.txt`, [
  [/^There is no\. Even through the hysteria.*$/m,
   "There is none. Even the Mordechai wrote it is permitted to eat raw fat even for a sick person without life-threatening danger; however a healthy person should be careful; and also it is forbidden for a healthy person to make a bath from their ordinary wine — for anointing is like drinking. Issur VeHeter. But for a sick person it is permitted, for gentiles nowadays are not practitioners of idolatry. And see below siman 108 seif 5 in the Hagah where the Shach raised a difficulty — see there."],
]);

fixRegex(`${BASE}/siman_155/beur-hagra/part-001.txt`, [
  [/^Not a quaint\..*$/m, 'That he is not, etc. Gemara 27a, 28a.'],
  [/^\(Lycott\) is no danger\..*$/m,
   "(Likkut) There is no danger. In place of danger it is not possible — not for the first reasoning in seif 2, but also for the last reason — that it is permitted for benefit because of idolatry; and it is not forbidden except because of their daughters; and when it is forbidden as in all idolatry prohibitions, it is forbidden to do so because of the work of the stars"],
  [/^And it is forbidden only to drink.*$/m,
   "and it is forbidden only for drinking, not for benefit, as stated siman 134 seif 2 (end)."],
]);

fixRegex(`${BASE}/siman_156/beur-hagra/part-001.txt`, [
  // still has "there's" with curly apostrophe
  [/^And there.s a h\..*$/m,
   'And there are those who, etc. Like R. Meir, from what is written there 29a "may it come to me," etc. Tosafot there s.v. hamistaper.'],
  [/^Or if he.s broken.*$/m,
   'Or if he has his hair cut, etc. Gemara of Avodah Zarah there.'],
]);

fixRegex(`${BASE}/siman_157/baer-heitev/part-001.txt`, [
  [/^Wake up\. It means that Israelis would practice.*$/m,
   "Arka. It means that Israelites practiced with their shoe-straps not in the manner of gentiles in this; and there is a Jewish element in the matter — the way of Israelites is to have black shoe-straps and those of gentiles red, so that there be a distinction in their garments. And the Beit Yosef wrote that Rambam explains specifically in such a case that he should not wear a gentile's garment, which is a positive prohibition — see there. And he also wrote that this law of public also applies in the parallel case, equating it with a time of persecution; and the Bach ruled that at a time of persecution even if he intends for his own benefit — he is killed and does not transgress (unlike in public); and the Shach challenged him and wrote that his words are not conclusive and one can say safek nefashot lehakel; and so wrote the Taz; and if the decree was over the entire country, even though Israelites are included, it is not called a time of destruction."],
  [/^A\) And he was given to him by the Bible.*$/m, ''],
]);

fixRegex(`${BASE}/siman_157/beur-hagra/part-001.txt`, [
  [/^And as a .six\...*$/m,
   'And all this, etc. See the Rosh in Bava Kamma 113a.'],
]);

fixRegex(`${BASE}/siman_157/turei-zahav/part-001.txt`, [
  [/^.Do not have any kind.*$/m,
   "Not to fulfill a positive commandment, etc. Yoreh De'ah — also gentiles can remove it from him, such as if they place him in prison, and automatically he will be prevented from that positive commandment."],
  [/^.Crying skin\..*/m,
   "Lifnei iver, etc. The Israelite does nothing — only gives him something that the gentile uses for his idol."],
]);

fixRegex(`${BASE}/siman_160/beur-hagra/part-001.txt`, [
  [/^You need a quaint\..*$/m,
   'Needs, etc., provided, etc. Tosafot there s.v. aval, etc. per both resolutions for stringency.'],
  [/^And if you are a quaint.*$/m,
   "And if, etc. and not like, etc. For granted with hire he owes him a dinar for his labor and what difference whether he pays in money or in work — unlike a loan; and the last reason holds that it is only forbidden when there is an addition in the matter of neshech or tarbis — unlike such a case; and proof from what is stated (75b in mishnah) all the days of drought, etc. even though there are short days and long days — because without neshech and tarbis it is only rabbinically forbidden and such was not decreed; see the Mordechai there. But the first reason is primary, for even speech is forbidden — and all this applies when he would not otherwise have done so."],
]);

fixRegex(`${BASE}/siman_160/pitchei-teshuva/part-001.txt`, [
  [/^Or to take the testicles.*$/m,
   "and he also wrote that registering the amount owed does not avail here as it avails regarding a gentile — even according to the Terumat HaDeshen who holds that registration avails even for what accrued after he converted — because that case is different: all that he registered while a gentile was completely permitted, for it was not apparent he would convert; thus even after he converted, he collects the interest because at the time of registration it was completely permitted. But regarding an orphan, if he registers even what will accrue after he matures, from the time of registration he creates a prohibition."],
]);
