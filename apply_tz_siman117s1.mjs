// siman117/seif-001: he=11, en=4
// EN[0]=HE[0], EN[1]=HE[1], EN[2]=HE[3], EN[3]=HE[4]
// HE[2] missing between EN[1] and EN[2]; HE[5-10] missing after EN[3]
import fs from 'fs';
import path from 'path';

const DRY = process.argv.includes('--dry');
const base = 'C:/Users/binya/Documents/Shulchan aruch/newtry/OC_Mobile/oc318-mobile-reader/public/corpus/yd1';
const ep = path.join(base,'siman117','seif-001','turei-zahav','en.html');
const hp = path.join(base,'siman117','seif-001','turei-zahav','he.html');

function brSegs(h){ return h.split(/<br\s*\/?>/).filter(s=>s.trim()); }
function safeWrite(p,c){ const t=p+'.tmp'; fs.writeFileSync(t,c,{encoding:'utf8'}); fs.renameSync(t,p); }

const heS = brSegs(fs.readFileSync(hp,'utf8').replace(/^﻿/,'').trim());
const enS = brSegs(fs.readFileSync(ep,'utf8').replace(/^﻿/,'').trim());

console.log(`he=${heS.length} en=${enS.length} diff=${heS.length-enS.length}`);
if(heS.length!==11||enS.length!==4){
  console.log('ERROR: unexpected counts, aborting'); process.exit(1);
}

// EN[0]=HE[0], EN[1]=HE[1] — kept as-is
// HE[2]: "שם להאכילו לפועליו עובדי כוכבים" — re: feeding tamei animals to non-Jewish workers
const he2 = `There, to feed them to his non-Jewish workers. In Beit Yosef no reason is found for this, and on the contrary he wrote in the name of the Yerushalmi that one who purchased pigs for the purpose of non-Jewish workers, when he sells them may only sell them at cost. One must say the Yerushalmi speaks of one who already transgressed and purchased them. As for the reason for the prohibition, [it derives] from the Talmud in Avodah Zarah (62a): donkey-drivers who did their work with shevi'it produce receive their wages in shevi'it produce; what does "wages in shevi'it produce" mean? If we give them from shevi'it produce, this one is paying his debt with shevi'it produce — and the Torah said "for eating" and not "for commerce." Behold, giving [produce] to one's workers is considered commerce; likewise it is forbidden to purchase [tamei animals] for one's workers on account of paying one's debt, which constitutes commerce. Even though Tosafot wrote there that the reason for "paying one's debt" is that he profits from shevi'it produce and it cannot be called "for eating" — and here one does not profit from tamei items since he purchases them with money — nevertheless presumably these items are sold to him cheaper than other pure species, and we therefore call it "commerce."

And at first glance it appears that even in the case of neveilot and tereifot that came into a Jew's home by chance, another Jew may not buy them cheaply and sell them to a non-Jew at a higher price — as Tosafot wrote in Avodah Zarah: R' Yitzchak says the commerce forbidden with shevi'it produce means to buy a large quantity together and transport from a cheap place to an expensive place, etc. And similarly in chapter Lulav HaGazul (Sukkah 39a): perhaps one who buys from another in order to profit and sell at a higher price — that too is commerce; and in the fourth chapter of Shevi'it we learn one may not engage in commerce with shevi'it produce... or with neveilot and tereifot... end of their words, as I copied nearby. Further proof from what Tur wrote in YD siman 151 regarding selling an animal, and Sefer HaTerumot wrote: even according to this, we only permit when it came to him [unexpectedly]; but to buy in order to profit — no. End of his words.

But upon careful examination you will find a case where it is permitted: for the Torah law on selling tereifot applies even nowadays, as Beit Yosef wrote — as the verse explicitly says "or sell to a non-Jew"; and this selling makes no distinction between selling oneself and selling through another, for we rule at the beginning of chapter HaIsh Mekadesh that throughout the Torah an agent is like the sender. The wording of the verse also supports this — it says "or sell" and not "you shall sell" as it said initially "to the convert you shall give it" — to indicate that even if the sale is not done through you directly but through another, it is permitted. This is not comparable to shevi'it and the animal sale we mentioned, for there the buyer is not considered the Israelite's agent, since the seller could sell them to the buyer to eat himself — why say he is his agent to sell to a non-Jew? But here, in the sale of a tereifah which can only be sold to a non-Jew — the seller to the buyer sells him specifically this role: to stand in his place and sell to a non-Jew. Think about it: if you do not say so, one who has a neveilah come to him and cannot sell it to a non-Jew himself — would he suffer a loss and not sell it to another who can? Certainly not. Nor does it matter whether the agent profits, for any middleman who buys and sells is called an agent. Therefore a Jew who buys a tereifah from another to feed to his non-Jewish workers incurs no prohibition, for there is no prohibition on this tereifah — he stands in the seller's place and is his agent. And so the practice is established as I have observed. Even though my father-in-law z"l wrote it is prohibited to buy in order to profit — in this I have written what appears to my humble opinion.`;

// EN[2]=HE[3], EN[3]=HE[4] — kept as-is

// HE[5]: "נשאלתי" — responsum question about young goats in Galilee
const he5 = `I was asked about those large rams in this region of Galilee — it is the practice of craftsmen not to purchase the hides except when the animals are slaughtered by nechira [cutting the windpipe without proper shechitah], but not when properly slaughtered, because they become somewhat damaged [by proper shechitah]. The question therefore arises: may a Jew slaughter the rams by nechira for this purpose, or not?`;

// HE[6]: "נראה" — responsum answer (long)
const he6 = `It appears to me that it is entirely permitted. For if we were to worry about bal tashchit [wanton destruction] — as I wrote at the end of the previous siman in the name of Tosafot, that one should not give exposed water even to a tamei animal — that does not apply here, for he derives benefit from this and there is no bal tashchit, as Semag (Lav 229) wrote that wherever one has great benefit from the destruction there is no prohibition of bal tashchit. And so too it states in Tosafot in Avodah Zarah (11a) that it is permitted to render an animal a tereifah [when there is benefit]. And similarly we find in chapter HaShochet (Chullin 28b) that one who slaughters and needs the blood may perform nechira or tear out [me'aker]; and it is explained there regarding a wild animal where one needs the blood to dye wool — here too the case is exactly analogous. And similarly in chapter Kisui HaDam (Chullin 85b) where Rabbi permitted Rabbi Chiyya to render the animal a tereifah, slaughter it, and draw its blood to dye wool.

And regarding the prohibition of engaging in commerce with neveilot and tereifot — that too does not apply here, since one renders it a neveilah in a permitted way; thereafter it is as if a neveilah came into his possession. For since he first acted in a permitted way for his own benefit, there is afterwards no prohibition — for the Sages only prohibited this when one originally intended to act in a prohibited manner, such as trapping tamei species [specifically for commerce] — not so here.

And similarly in chapter HaYah Korei (Berakhot 14a), Rav said: he shall not begin; but if he began he completes; Abaye said: we do begin, since they begin in the West; and since we begin, we also complete — meaning, since he began in a permitted way, even though at the moment of beginning he knows he will finish [in a particular manner], here too it is the same.

I also saw in a recently published responsum of the Rav R' Binyamin z"l [Nekudot HaKesef: he too permitted nechira of the rams]; except that in the gloss there it is written that the reason the Talmud permitted nechira and tearing-out to dye wool is that the person must afterwards discard the meat, on account of the prohibition of engaging in commerce with neveilot — and that is an error in my humble opinion. For if so, the Talmud should have stated that he must throw the meat to the dogs; and furthermore, in that case it should have prohibited the nechira from the outset too, lest he not discard the meat afterwards and eat it — for that is the very reason, according to Rashba cited by Beit Yosef, for which it is prohibited to deal in neveilot and tereifot. But it is a plain matter: anything one does first in a permitted way — such as when one needs the blood or the hide — the meat afterwards is as if a neveilah came to him, and he may sell it to a non-Jew. But one who does not know the laws of shechitah and wants to sell the meat to a non-Jew and wishes to slaughter improperly — this is certainly forbidden, for from the outset he makes it a neveilah solely for the purpose of selling the neveilah, not for any permitted reason. All this seems to me clear and obvious.`;

// HE[7]: "כתב ב"י בשם א"ח" — anointing with pig fat
const he7 = `Beit Yosef wrote in the name of Orchot Chaim that it is forbidden to anoint one's body with pig fat, for anointing is included in the category of drinking. It appears to me we do not rule so, for Tosafot in the last chapter of Yoma (77b) explicitly wrote that it is permitted to anoint with fat — for we do not find that anointing is like drinking except on Yom Kippur and with forbidden-benefit items, due to an asmakhta [supporting derivation]; but fat that is only prohibited in consumption — benefit [i.e., use] is permitted. And so too it is written in chapter Benot Kutim in the name of R' Tam. And so too Beit Yosef wrote in siman 123 in the name of Rashba in a responsum, that it is permitted to anoint with pig fat even not in a case of danger. [Nekudot HaKesef: Except that in Issur VeHeter at the end of kelal 39, I saw he wrote that the permit of anointing with fat or with pig fat only applies where there is pain, but for a healthy person it is not permitted merely for pleasure; therefore one should not anoint a baby with pig fat since this is only for pleasure. But one may allow a non-Jew to anoint them and feed them, for we do not say to warn adults about minors — but to anoint them with one's own hands, end of his words.] And so is the essential ruling. The Levush distinguished based on his own reasoning, prohibiting anointing with pig fat but not other fat, and he was not careful about the source of these laws, for they make no distinction whatsoever.`;

// HE[8]: "כתב מו"ח ז"ל" — father-in-law's ruling about leasing towns
const he8 = `My father-in-law z"l wrote that those who lease towns and villages from the lord — meaning all the lord's income, and included in this are the pigs in the courtyard — within the lease period a Jew raises the pigs and feeds them to his non-Jewish workers: they are not acting properly. Nevertheless it seems to me there is room to find a permissive ruling on this: since their principal intention at the time of the lease was to lease other things, and this is incidental, there is no prohibition. For our master Tur wrote at the beginning of this siman: "or one who traps tamei species together with tahor species" — implying he intentionally traps them together, and even so it is permitted. This is because his intention is only for the tahor ones; it is merely impossible for the tahor ones to be trapped alone since they are mixed together and the tamei ones are trapped along with them — therefore it is permitted, even though he knows in advance that this will happen, for we follow his primary intent regarding what he desires. And this is analogous to what is stated in chapter HaSho'el: regarding that which is permitted he is pleased to acquire it; regarding that which is forbidden he is not pleased to acquire it — similar to what Tur wrote in the laws of Pesach about a non-Jew who brings chametz to a Jew on the last day of Yom Tov; here too it is analogous.

And what increases during the lease period is [treated] as if a neveilah came into his possession by chance, which is permitted for him to feed to his non-Jewish workers. And the practice has already spread in the lands of Russia and Volyn, and many [Sages] did not protest against them — because they belong to the lord and the name of Israel is not upon them, and he has no direct dealings with them, and the non-Jewish workers are the lord's workers and eat from the lord's own. Thus it appears to me [as a way] to judge them favorably.`;

// HE[9]: "אסור למכור נבלה בחזקת כשרה" — short note
const he9 = `It is forbidden to sell neveilah as if it were kosher. The Tur gives the reason: because of deception [geneivat da'at], which is forbidden even toward a non-Jew.`;

// HE[10]: "ובמ"ש הטור" — question on Tur's wording
const he10 = `And regarding what the Tur wrote — "and it appears that even according to those interpreters, etc." — one may challenge: behold Tosafot in chapter Gid HaNasheh (Chullin 94a), beginning "tereifah," wrote: "there is no reason to worry that a Jew might buy from him, for the concern about deceiving the non-Jew is what he [the Jew] said to him" — end of their words. Here too: why should it be forbidden in the presence of a Jew? For a Jew would not buy from the non-Jew [the tereifah as kosher], since in our view deception of a non-Jew is permitted — so why not say that those interpreters also hold this reasoning, and you [the Tur] are creating a new dispute for no reason between this interpretation and the previous one regarding this reasoning? And even if you say the Tur has proof from the language "those interpreters" who said "we do not decree lest he give it, etc." — implying they hold no such decree, but if it truly were in the presence of a Jew we would be concerned that a Jew might buy from him — then the question falls on "those interpreters" themselves: why do they need this [reasoning], and why not simply say they were not concerned at all that a Jew might buy from him, [knowing] that the [Jew seller] said so out of concern for deceiving the non-Jew, since [deceiving a non-Jew] is permitted? This requires further study.`;

const newSegs = [
  enS[0],  // HE[0]
  enS[1],  // HE[1]
  he2,     // HE[2] — inserted
  enS[2],  // HE[3]
  enS[3],  // HE[4]
  he5,     // HE[5]
  he6,     // HE[6]
  he7,     // HE[7]
  he8,     // HE[8]
  he9,     // HE[9]
  he10,    // HE[10]
];

console.log('\nSegment preview:');
newSegs.forEach((s,i)=>console.log(`  Seg${i} (${s.length}): ${s.slice(0,70)}`));

if(newSegs.length!==11){
  console.log('ERROR: expected 11 segments, got '+newSegs.length); process.exit(1);
}

if(DRY){ console.log('\nDRY: would write 11 segments'); process.exit(0); }

const out = newSegs.join('<br />\n');
try{ fs.writeFileSync(ep,out,{encoding:'utf8',flag:'w'}); }
catch(_){ safeWrite(ep,out); }
const v = brSegs(fs.readFileSync(ep,'utf8').replace(/^﻿/,'').trim());
console.log(`\nOK: wrote ${v.length} segments`);
