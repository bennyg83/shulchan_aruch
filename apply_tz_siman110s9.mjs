// siman110/seif-009: he=9, en=5
// EN[0] = HE[0]+HE[1]+HE[2] merged; EN[1] = HE[3]+HE[4] merged; HE[7] missing entirely
// Fix: split EN[0] into 3, split EN[1] into 2, insert HE[7] translation before EN[4]
import fs from 'fs';
import path from 'path';

const DRY = process.argv.includes('--dry');
const base = 'C:/Users/binya/Documents/Shulchan aruch/newtry/OC_Mobile/oc318-mobile-reader/public/corpus/yd1';
const ep = path.join(base,'siman110','seif-009','turei-zahav','en.html');
const hp = path.join(base,'siman110','seif-009','turei-zahav','he.html');

function brSegs(h){ return h.split(/<br\s*\/?>/).filter(s=>s.trim()); }
function safeWrite(p,c){ const t=p+'.tmp'; fs.writeFileSync(t,c,{encoding:'utf8'}); fs.renameSync(t,p); }

const heS = brSegs(fs.readFileSync(hp,'utf8').replace(/^﻿/,'').trim());
const enS = brSegs(fs.readFileSync(ep,'utf8').replace(/^﻿/,'').trim());

console.log(`he=${heS.length} en=${enS.length} diff=${heS.length-enS.length}`);
if(heS.length!==9||enS.length!==5){
  console.log('ERROR: unexpected counts, aborting'); process.exit(1);
}

// Split EN[0] at two known markers
const SPLIT0A = 'And behold in siman 57';  // start of HE[1]
const SPLIT0B = 'I found again so in Darkei Moshe';  // start of HE[2]
const i0a = enS[0].indexOf(SPLIT0A);
const i0b = enS[0].indexOf(SPLIT0B);
if(i0a===-1||i0b===-1||i0a>=i0b){
  console.log(`ERROR: EN[0] split markers not found: ${i0a} ${i0b}`); process.exit(1);
}
const seg0 = enS[0].slice(0, i0a).trim();
const seg1 = enS[0].slice(i0a, i0b).trim();
const seg2 = enS[0].slice(i0b).trim();

// Split EN[1] at one known marker
const SPLIT1 = 'And I saw in a newly printed book of Maharar Binyamin';  // start of HE[4]
const i1 = enS[1].indexOf(SPLIT1);
if(i1===-1){ console.log(`ERROR: EN[1] split marker not found`); process.exit(1); }
const seg3 = enS[1].slice(0, i1).trim();
const seg4 = enS[1].slice(i1).trim();

// HE[5], HE[6], HE[6] = existing EN[2], EN[3]
const seg5 = enS[2];
const seg6 = enS[3];

// HE[7]: Nekudot HaKesef gloss — entirely missing, provide fresh translation
// Hebrew: העולה מדברינו להלכה דאפילו בכל איסור ודאי מהני ס"ס להתיר אם אינו סותר את החזקה עצמה
const seg7 = `<i data-commentator="Nekudot HaKesef" data-label="♯" data-order="17"></i>What emerges from our words for the halachah: that even in every case of certain issur, double safek [ספק ספיקא] is effective to permit — provided it does not contradict the chazakah itself. For example in the safek of shechitah: if double safek were effective there, it would negate the chazakah that the animal was presumed to be unslaughtered — that is, it would have the status of a limb from a living animal; in that case we say double safek is not effective. Similarly, a woman who has the chazakah of being a married woman and subsequently doubts arose about the death of her husband or her divorce — even if there were several instances of double safek they would not be effective, since you are coming to remove her from the category of married woman that she had initially, and you are coming to directly negate it. But in other cases of a presumptive issur where doubts arose regarding a permissive outcome from a different direction — such as through a mixture — double safek certainly is effective to remove it from the initial issur, for there is no element here that contradicts one thing with the other. Therefore in the case of safek derusah, if there were a full double safek, it is properly effective to nullify the presumptive issur of eiver min hachai from the outset — so it appears to my humble opinion, clearly and correctly.`;

// HE[8] = existing EN[4]
const seg8 = enS[4];

const newSegs = [seg0, seg1, seg2, seg3, seg4, seg5, seg6, seg7, seg8];

console.log('\nSegment preview:');
newSegs.forEach((s,i)=>console.log(`  Seg${i} (${s.length}): ${s.slice(0,70)}`));

if(DRY){ console.log('\nDRY: would write 9 segments'); process.exit(0); }

const out = newSegs.join('<br />\n');
try{ fs.writeFileSync(ep,out,{encoding:'utf8',flag:'w'}); }
catch(_){ safeWrite(ep,out); }
const v = brSegs(fs.readFileSync(ep,'utf8').replace(/^﻿/,'').trim());
console.log(`\nOK: wrote ${v.length} segments`);
