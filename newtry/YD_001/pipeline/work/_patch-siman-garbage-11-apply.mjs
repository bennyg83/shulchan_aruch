#!/usr/bin/env node
/** Fix final 11 garbage-hit blocks across YD001 */
import fs from 'fs';
import path from 'path';
import { ROOT, OUT, BLOCK, ENG, END } from './_patch-siman-098-group-c-utils.mjs';

function patchFile(rel, slug, T) {
  const fp = path.join(OUT, rel);
  const s = fs.readFileSync(fp, 'utf8');
  const applied = new Set();
  const parts = s.split(BLOCK);
  const out = parts.map((block, i) => {
    if (i === 0) return block;
    const slugM = block.match(/^\s*slug: (.+)$/m);
    const seifM = block.match(/^\s*seif: (.+)$/m);
    const markerM = block.match(/^\s*marker: (.+)$/m);
    if (!slugM || slugM[1].trim() !== slug) return BLOCK + block;
    const seif = seifM[1].trim();
    const marker = markerM ? markerM[1].trim() : 'main';
    const key = `${seif}#${marker}`;
    if (!(key in T)) return BLOCK + block;
    const enStart = block.indexOf(ENG);
    const enEnd = block.indexOf(END);
    if (enStart < 0 || enEnd < 0) throw new Error(`ENGLISH/END missing: ${rel} ${key}`);
    const afterEng = block.slice(enStart + ENG.length);
    const lineEnd = afterEng.match(/^[\r\n]+/)?.[0] ?? '\n';
    const before = block.slice(0, enStart + ENG.length) + lineEnd;
    const after = block.slice(enEnd);
    const text = T[key].endsWith('\n') ? T[key] : T[key] + '\n';
    applied.add(key);
    return BLOCK + before + text + after;
  });
  fs.writeFileSync(fp, out.join(''), 'utf8');
  console.log(`OK ${rel} (${applied.size} blocks)`);
  return applied.size;
}

const patches = [
  ['siman_123/pitchei-teshuva/part-001.txt', 'pitchei-teshuva', {
    '13#_': `[And since he intended to draw it off. See the responsum of Chasam Sofer siman 117 regarding kosher wine made among the winepresses in countries where gentiles are common: a person went innocently and drew wine into his jug from a vat full of trodden grapes to take to the press; he made a wine-filter with his fingers between them so his hand would be like a strainer to strain pits from the wine flowing into the jug—and nevertheless some pits and skins remained in the clear wine in the jug. The winemakers paid no attention to this act and made the wine through a gentile as usual; that vat became mixed with several vats and they were put into the press. The wine is now mixed—whether there is concern of gentile contact in our wine. He elaborates: at first glance it is plainly forbidden per the Shulchan Aruch, and "since he intended to draw it off" implies everything depends on the drawer's intent; if he intended to draw off, even if he did not succeed properly, nevertheless through his intent the entire press becomes fit for libation. So too explicitly in Sheltei HaGibborim 4th year—that if he intended, it is considered drawing even if some skins and pits rose. However, since the loss to the merchants/winemakers was great, they permitted the wine without hesitation through combining several leniencies that apply here (see end).]`,
  }],
  ['siman_124/siftei-kohen/part-001.txt', 'siftei-kohen', {
    '23#ז': `Permissible to drink—so it is in most books; and it is simple that this is a scribal error and it should read "for benefit" (behanah); but for drinking it is forbidden, as with "he measured by hand." So too in Turei Zahav and in some books, and so is written in the responsum of R. Eliyahu of Candia printed in the responsa of R. Eliyahu Mizrachi, siman 54. And it is written in the responsum of R. Eliyahu Mizrachi siman 56: for us, who hold that gentiles nowadays are not idol-worshippers and their contact without intent is permitted for drinking—here too it is permitted for drinking. And it is implied explicitly from his words there that likewise where an Israelite is present we descend one level, and for us the whole thing is permitted; however this is only where there is financial loss, as stated below in se'if kuf alef.`,
  }],
  ['siman_158/beur-hagra/part-001.txt', 'beur-hagra', {
    '2#ג': `(Likut) Even if he ate neveilah, etc.—neveilah is stated regarding idolatry, and he split it here regarding food, etc.; and kilayim is a dispute in Horayot 11a: one [tanna]—R. Tarfon and R. Yosi, because they hold that Torah kilayim is only shearing, spinning, and dyeing; but the Rambam follows his view that kilayim of any one of them is Torah law even in one alone (end of comment).`,
  }],
  ['siman_161/turei-zahav/part-001.txt', 'turei-zahav', {
    '10#_': `They take from him the entire dinar. In the Gemara it says he cannot say "I rented at a high price"—meaning he thought he would profit from the interest, but now that he must return the interest, as "everyone rents" he may say "I thought and accepted." And it seems simple that likewise if he bought from him an object or land for the same sum from which he took interest, it is not enough to return the purchase now; since he thought and accepted, the purchase is as if he gave him the entire dinar in cash, for to him it was worth a dinar, and now he cannot force him to take the object—for he already owes him a dinar for it and he does not wish to take this object on his debt, which is worth only half a dinar. That which the Gemara and Tur mention this regarding hire and not purchase—they teach a greater case: even regarding hire, where his acquisition is not as strong as in purchase, nevertheless he can say "I thought and accepted," all the more so in purchase where acquisition is strong—he thought and accepted. So too the Rambam's wording teaches: "for he hired with a dinar and accepted upon himself"—and this is plainly applicable also to purchase, for he bought with a dinar and so accepted. I wrote this because in the Perishah he wrote: since the Tur said "hired" and not "bought," one may infer that in purchase of an object for a dinar when it is worth only half, he returns the vessel as he bought it—which is not so in hire, for he already used it and owes the hire fee for time passed, etc. In my humble opinion this does not seem correct: why should he pay in hire for more use than due at the proper rate? And what difference from returning the vessel he bought—if he returns the money for the hire, what applies to him is as returning the vessel as bought? Yet we see the main reason is because he thought and accepted—and this applies both to purchase and generally the law is so: one who knows it is worth less than what he gives and nevertheless gives—there is no ona'ah and the purchase stands; why should he retract here in purchase? Rather it is clear there is no distinction here, and also in purchase he must return a full dinar.`,
  }],
  ['siman_199/turei-zahav/part-001.txt', 'turei-zahav', {
    '1#א': `And its hidden places (beit hasetarim). The Tur writes "wrinkles" (kematzim) and "every hidden place"—and Yosef Dea wondered, for they are one thing. In the Gemara Rava said: wrinkles are separate, etc. He answered: as the Mordechai in the name of the Ra'am—wrinkles are under the armpits and under the thigh; hidden places are inward, such as nostrils and ears and inward from the lip, etc. This wording of the Tur appears in the Gemara in Niddah (66b): "They challenged from 'the wrinkles and the hidden places'..." And it is surprising on the Beit Yosef that he saw Rava's words and did not see the challenge that follows.`,
  }],
  ['siman_220/siftei-kohen/part-001.txt', 'siftei-kohen', {
    '1#ד': `And he does not need a sage's release. We do not decree because of one day, for it is known that the law of a fast is such—that its prohibition is not like other vows, for the Sages already fixed its time; therefore even if he released him at nightfall without inquiry, it does not interchange with one who vowed one day, for the laws of fasting and vows differ and do not interchange. From the Tur as well: one who accepts upon himself to fast one [day] on Shabbat—they do not obligate him to fast twenty-four hours, for certainly to fast as the Sages said means from before dawn until nightfall. So wrote the Ran.`,
  }],
  ['siman_237/turei-zahav/part-001.txt', 'turei-zahav', {
    '6#_': `Or on the Temple table—see what I wrote in siman 204 se'if 2 regarding what is surprising about the Rama there from here. And what he wrote "like vows of wicked people"—since wicked people are accustomed to swear, it is as extracting an oath from his mouth in what he accepted as a wicked person's vow. And what he wrote "that I will not eat for you"—the formula is also in some Tur manuscripts, but it is a scribal error; for if so it is obvious, and it should read "that I will not eat to you" (she'i okhel lekha)—for so we say explicitly in the Gemara in Rav Ashi's answer, and it challenges: it is obvious! Lest you say it is a language stumble—he should have said "that I will eat for you" and stumbled in his language to say "that I will not"—it teaches us: since he uttered with his lips "that I will not eat," we do not believe him in what he said that he was stammering. So wrote the Rosh, second chapter of Nedarim.`,
  }],
  ['siman_242/siftei-kohen/part-001.txt', 'siftei-kohen', {
    '14#_': `And even though semikhah in the early days was by law—the Rambam wrote in chapter 4 of Laws of Sanhedrin: that he be fit for all matters—how? A distinguished sage fit to rule on the entire Torah—the court may ordain him and give him permission to judge but not to rule on prohibition and permission; or give him permission on prohibition and permission but not to judge monetary cases, etc. Semikhah nowadays is only receiving permission in general, because he is fit—etc. See at the end of the responsum of Maharal ibn Chaviv, responsum of Mahari Bei Rav, and responsum of ibn Chaviv—several booklets on matters of semikhah.`,
  }],
  ['siman_258/siftei-kohen/part-001.txt', 'siftei-kohen', {
    '1#ג': `It has no remedy—through redemption it is forbidden to the whole world. There, however, this is specifically hekdesh of movable property; but land has redemption. So too he brought in the responsum of R. Eliyahu Mizrachi siman 53 the words of the Or Zaru'a, and wrote further there that the Rif and Rambam hold that even movable property has redemption for a small amount—see there.`,
  }],
  ['siman_274/baer-heitev/part-001.txt', 'baer-heitev', {
    '7#א': `Remove it—the Taz wrote: and he said to him, why should he remove from a written open mem that is attached—for it helps if he drags the tail alone and it remains like a nun, and then writes the tail anew; for here it detracts more, since the scribe's intent appears that he is not concerned for the masoret at all, and certainly for this purpose they wrote it, and it is as forged from within and entirely invalid—unlike where he wrote some error unintentionally, etc.`,
  }],
  ['siman_296/turei-zahav/part-001.txt', 'turei-zahav', {
    '44#_': `And it does not have four handbreadths width, etc.—meaning specifically when there is an important fence, i.e. ten handbreadths high and four wide; then we give a strip (mechol) to this vineyard—four cubits to the fence wall, as above. But anything that is not an important wall is as if it does not exist at all, and he sows outside the four cubits of open space—so it seems to me simply. However in the Levush he wrote on this: or if it had ten handbreadths height—even if it does not have four handbreadths width—it has no strip (mechol), for there is no path there, no place left empty, since there is a strong fence, etc. These are mistaken words; for if so, with ten height and four width—all the more so one should not give a strip.`,
  }],
];

let total = 0;
for (const [rel, slug, T] of patches) {
  total += patchFile(rel, slug, T);
}
const ts = new Date().toISOString().replace(/\.\d{3}Z$/, '');
fs.appendFileSync(path.join(ROOT, 'progress.log'), `${ts} YD001 garbage cleanup 11 blocks (simanim 123,124,158,161,199,220,237,242,258,274,296) CLEAN\n`);
console.log(`[DONE] ${total} blocks — 11 simanim garbage cleanup`);
