import fs from 'fs';
import path from 'path';

const DRY = process.argv.includes('--dry');
const base = 'C:/Users/binya/Documents/Shulchan aruch/newtry/OC_Mobile/oc318-mobile-reader/public/corpus/yd1';

function brSegs(h){ return h.split(/<br\s*\/?>/).filter(s=>s.trim()); }
function loc(si,se){ return path.join(base,si,se,'turei-zahav','en.html'); }
function hep(si,se){ return path.join(base,si,se,'turei-zahav','he.html'); }
function join(segs){ return segs.join('<br />\n'); }
function getEN(si,se){ return brSegs(fs.readFileSync(loc(si,se),'utf8').replace(/^﻿/,'').trim()); }
function safeWrite(p,c){ const t=p+'.tmp'; fs.writeFileSync(t,c,{encoding:'utf8'}); fs.renameSync(t,p); }

const CASES = [

  { si:'siman323', se:'seif-001', seg:
    `My father-in-law of blessed memory wrote: one must be careful — when challah fell into a hot cooked dish and there is not enough in the pot to nullify the challah in the dish, [the dish] should be sold or given to a Kohen when there is a majority of non-sacred food; and the pot, if it is earthenware, requires breaking since rinsing [hagalah] is not possible — end of quote. And it has already been clarified that we do not give to a Kohen nowadays. And regarding his stringency here — I do not know why we should not rely on leniency in a rabbinic matter to nullify by majority, as I mentioned above in the name of Darkei Moshe.` },

  { si:'siman331', se:'seif-081', seg:
    `And what is written: "in his heart regarding everything" — thereby the lees [shemarim] are automatically also discharged.` },

  { si:'siman334', se:'seif-033', seg:
    `And what is written: "and a release is required" — Beit Yosef wrote in the name of [a certain work]: at the time of the release they should say: "Because so-and-so appeared [menacingly] in [someone's] dream — let it be permitted to him, let no suffering and no curse come upon him." And they should say: "Reuben shall live and not die, etc." (Deut. 33:6); "You will make known to me the path of life, etc." (Ps. 16:11); "Lord, I have heard Your report, etc." (Hab. 3:2); and "And He passed, etc." (Ex. 34:6) is recited three times.` },

  { si:'siman342', se:'seif-001', seg:
    `And throughout the seven days of the nuptial celebration he is permitted in ironing, etc. This is the reason for what was stated above — that [a mourner who married] does not count the thirty [days of mourning] except from after the festival; meaning that in other cases of festival overlap, the thirty days are counted from the days of the festival, since ironing and haircut are also forbidden during the festival due to mourning. But here during the wedding week ironing and haircut are permitted, as it is written: "a king in his beauty shall your eyes behold."` },

  { si:'siman344', se:'seif-001', seg:
    `There is [a passage] in the Jerusalem Talmud: the deceased knows and hears his praises as if from within a dream; and everything said in his presence he knows until the burial stone is sealed.` },

  { si:'siman344', se:'seif-017', seg:
    `In the book Torat HaAdam it is written that it is not customary and not proper practice to mention the deceased after twelve months; and whenever news [of the death] does not arrive until after twelve months, [the recipients] are exempt from eulogizing; and the leap month is not included, for what is mentioned is not "a year" but rather twelve months.` },

  { si:'siman371', se:'seif-004', seg:
    `They cannot be compelled, etc. The reason is from a responsum of Maharil: "if it is customary to delay [burial] out of honor for the deceased — to let many people hear and come to attend to him, or to purify him in his home — how then can we compel them to act disrespectfully against the custom? And the rule that the one who causes harm must distance himself does not apply here, since this is an unavoidable situation — once a custom exists, it exists" — end of quote. And my father-in-law of blessed memory wrote: if it is a stillborn, where there is no concern of honor, one may compel [the family] to remove it from the house for the sake of the Kohanim — for the one who causes harm must distance himself — end of quote. And I wondered about the responsum cited: the rule of compelling removal on the grounds that "the one who causes harm must distance himself" is not applicable here at all — as stated in Choshen Mishpat siman 155 seif 32: if one had a tree next to another's pit, the owner of the pit cannot say "the tree roots are damaging my pit," since this is damage that occurs by itself over time and at the time of planting it did not damage him, etc. All the more so here, where one never performs any action to harm [the Kohen] — it is entirely from Heaven — how can one compel him [to remove the body]? And it seems that the responsum also intended this when it wrote "it is an unavoidable situation" — meaning it occurs by itself; and its conclusion "once a custom exists, it exists" could itself require emendation — for how can one speak of "unavoidable situation" when it is a matter of custom? According to this reasoning, even in the case of a stillborn — where there is no concern of honor — one cannot compel removal, since there is no category of "one who causes harm" applicable here. But if a Kohen wishes to send someone to remove the stillborn to another place, the child's father cannot prevent this, since [the Kohen] is suffering harm and [the father] loses nothing thereby. So it seems to me.` },

  { si:'siman390', se:'seif-002', seg:
    `In this siman a seif is missing — namely seif 5 — and it should read: "A woman is permitted [to cut her hair] after seven days. Gloss: And some forbid even for a woman, and this is the main ruling." I received [reliable information] that this is found in the Shulchan Arukh in Rema's own handwriting, of blessed memory.` },

  { si:'siman391', se:'seif-002', seg:
    `I subsequently saw in Darkei Moshe that he ruled this way on his own reasoning, to prohibit until after thirty days. Now it is clear that this refers to one's father and mother — for regarding other relatives it is obvious that [haircut] is permitted after thirty days; and one should not say we are informing us of a prohibition within thirty days, for if so he should have said "and it is forbidden all thirty days"; rather this refers specifically to one's father and mother; and for other relatives, even within thirty days it is permitted after seven. And this is puzzling, for the Rosh explicitly wrote in chapter Elu Megalchin that within thirty days the law is equal for other relatives and for one's father and mother; nevertheless one should not be lenient within thirty days regarding one's father and mother against Rema's ruling.` },

  { si:'siman392', se:'seif-002', seg:
    `He is permitted to betroth immediately and take her in after seven [days]. He follows his own reasoning, having ruled in seif 1 like Rambam that in any case betrothal is permitted immediately; but according to what Rema ruled there — that even betrothal is forbidden — here too betrothal would be forbidden until after seven days. And it is surprising that Rema wrote nothing here at all.` },

];

let ok=0, fail=0;
for (const {si,se,seg} of CASES){
  const ep=loc(si,se), hp=hep(si,se);
  try {
    const heS=brSegs(fs.readFileSync(hp,'utf8').replace(/^﻿/,'').trim());
    const enS=getEN(si,se);
    const diff=heS.length-enS.length;
    if(diff!==1){ console.log(`SKIP ${si}/${se}: diff=${diff} he=${heS.length} en=${enS.length}`); fail++; continue; }
    const newSegs=[...enS,seg];
    if(DRY){ console.log(`DRY ${si}/${se}: ${enS.length}+1 → ${newSegs.length}`); ok++; continue; }
    try { fs.writeFileSync(ep,join(newSegs),{encoding:'utf8',flag:'w'}); }
    catch(_){ safeWrite(ep,join(newSegs)); }
    const v=brSegs(fs.readFileSync(ep,'utf8').replace(/^﻿/,'').trim());
    console.log(`OK ${si}/${se}: ${enS.length}+1 → ${v.length} segs`);
    ok++;
  } catch(e){ console.log(`ERROR ${si}/${se}: ${e.message}`); fail++; }
}
console.log(`\nDone. ok=${ok} fail=${fail}`);
