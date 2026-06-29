// Fix siman119/seif-015: batch 1 mistakenly applied seif-019 content.
// Replace last EN segment with the correct short translation.
import fs from 'fs';
import path from 'path';

const base = 'C:/Users/binya/Documents/Shulchan aruch/newtry/OC_Mobile/oc318-mobile-reader/public/corpus/yd1';
const ep = path.join(base,'siman119','seif-015','turei-zahav','en.html');

function brSegs(h){ return h.split(/<br\s*\/?>/).filter(s=>s.trim()); }
function join(segs){ return segs.join('<br />\n'); }
function safeWrite(p,c){ const t=p+'.tmp'; fs.writeFileSync(t,c,{encoding:'utf8'}); fs.renameSync(t,p); }

const CORRECT =
  `And what is written in the following seif "we remove him" — Beit Yosef wrote in Choshen Mishpat siman 34 in the view of Rambam: if he examines for himself, since he has monetary benefit from it, even if he repented he is not rehabilitated until he goes to a place where he is not recognized; but one who examines for others, since he has no monetary benefit from it, he is rehabilitated through repentance.`;

const enS = brSegs(fs.readFileSync(ep,'utf8').replace(/^﻿/,'').trim());
console.log('Current EN segs:',enS.length,'last seg len:',enS[enS.length-1].length);

// Replace last segment with correct content
enS[enS.length-1] = CORRECT;
try { fs.writeFileSync(ep, join(enS), {encoding:'utf8', flag:'w'}); }
catch(_){ safeWrite(ep, join(enS)); }

const v = brSegs(fs.readFileSync(ep,'utf8').replace(/^﻿/,'').trim());
console.log('Fixed. EN segs:',v.length,'last seg len:',v[v.length-1].length);
