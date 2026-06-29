import fs from 'fs';
import path from 'path';

const base = 'C:/Users/binya/Documents/Shulchan aruch/newtry/OC_Mobile/oc318-mobile-reader/public/corpus/yd1';
function brSegs(h){ return h.split(/<br\s*\/?>/).filter(s => s.trim()); }
function loc(si,se){ return path.join(base,si,se,'beur-hagra','en.html'); }
function hep(si,se){ return path.join(base,si,se,'beur-hagra','he.html'); }
function join(segs){ return segs.join('<br />\n'); }
function safeWrite(p, content){
  const tmp = p + '.tmp';
  fs.writeFileSync(tmp, content, { encoding:'utf8' });
  fs.renameSync(tmp, p);
}

const siman='siman141', seif='seif-003';
const ep = loc(siman,seif);
const hp = hep(siman,seif);
const heS = brSegs(fs.readFileSync(hp,'utf8').replace(/^﻿/,'').trim());
const enS = brSegs(fs.readFileSync(ep,'utf8').replace(/^﻿/,'').trim());
console.log(`he=${heS.length} en=${enS.length} diff=${heS.length-enS.length}`);
const segs = [
  `But one may not keep them. It appears [this applies] specifically to [images of] the sun and moon — as written there: "but R' Gamliel — [his] was an individual's [property]," etc.; but regarding a dragon in our times there is no concern of suspicion at all.`,
  `And some are stringent, etc. So it is implied from Tosafot and the Tur. Beit Yosef — and his words are astonishing; and Shach already marveled at them.`,
  `(Supplement) And some are stringent, etc. So wrote Beit Yosef, saying it is implied from Tosafot and the Tur; but this is astonishing — for even according to the latter view, whenever it is known that the image is not worshipped it is permitted; and all the more so since he ruled according to the first view; and likewise in the gloss in seif 1; and see Shach (end). And the form of a dragon, etc. Gemara there: "rather, one who makes," etc.; and what is written "except that it is forbidden," etc. — that is according to the latter view, and as above — unlike Shach.`,
  `(Supplement) And the form of a dragon, etc. — "except," etc. The Rosh there and the Tur; and what is written "it is permitted to make it" — Gemara there; and what is written "except," etc. — there: "Shanena, remove," etc.; and Tosafot there s.v. "it is different" explained in the name of BaHaG: regarding the form of a dragon; and the meaning is: because of the suspicion that it was worshipped — making it is permitted; and the suspicion one might think [applies to] the images of the dwelling, etc. — which is forbidden to keep — is because of the suspicion of [having been] made [for worship]; and see Tosafot there s.v. "but" — "and it was not," etc. — meaning the questioner thought it was not a dragon, and it answers: because of the suspicion of idolatry — and regarding a dragon; and see what I wrote in seif 4 (end).`,
];
if (heS.length - enS.length !== segs.length) { console.log('MISMATCH'); process.exit(1); }
safeWrite(ep, join([...enS, ...segs]));
const verify = brSegs(fs.readFileSync(ep,'utf8').replace(/^﻿/,'').trim());
console.log(`Written. segs=${verify.length}`);
