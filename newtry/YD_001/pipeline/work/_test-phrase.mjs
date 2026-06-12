import { applyPhrases } from './_yd001-translate-shared.mjs';
import fs from 'fs';

const LEX = JSON.parse(fs.readFileSync('./_lexicon-089-090.json', 'utf8'));

function finishLex(s) {
  for (const [he, en] of LEX) s = s.split(he).join(en);
  return s;
}

const h =
  "להדיח. כ' הש\"ך דפשיטא דבעי נמי קנוח אלא שהרב קיצר בלשון וכ' הר\"ן דא\"צ שהייה ו' שעות מאותו זמן שמסירו אלא מאכילה וכת' בת\"ח דה\"ה לענין המנהג בהמתנת שעה:";
let s = applyPhrases(h);
s = finishLex(s);
console.log(s);
