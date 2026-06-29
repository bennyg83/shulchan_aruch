const fs = require('fs'), path = require('path');
function brSegs(h) { return h.split(/<br\s*\/?>/).filter(s => s.trim()); }
function strip(h) { return h.replace(/<[^>]+>/g, '').replace(/\s+/g, ' ').trim(); }
const GARBAGE = /terrorist|heaven'?s people|kgb|lord'?s prayer|starwork|star work|lycott|bible and the bible|hand recoils|first dish|saturday\b|muktzeh.*allocat|m\.m\.m|d\.d\.d|her age\b|the craft\b/i;

const cases = [
  'siman190/seif-004','siman202/seif-003','siman202/seif-008','siman208/seif-003',
  'siman252/seif-002','siman263/seif-005','siman318/seif-003','siman32/seif-017',
  'siman328/seif-007','siman358/seif-005','siman363/seif-006','siman371/seif-004',
  'siman452/seif-003','siman498/seif-015','siman509/seif-002','siman606/seif-004',
  'siman89/seif-007'
];

const base = 'C:/Users/binya/Documents/Shulchan aruch/newtry/OC_Mobile/oc318-mobile-reader/public/corpus/oc1';

for (const c of cases) {
  const [si, se] = c.split('/');
  const hp = path.join(base, si, se, 'rabbi-akiva-eiger', 'he.html');
  const ep = path.join(base, si, se, 'rabbi-akiva-eiger', 'en.html');
  const he = brSegs(fs.readFileSync(hp, 'utf8'));
  const en = brSegs(fs.readFileSync(ep, 'utf8'));
  const seifNum = parseInt(se.replace('seif-', ''));
  const en0 = strip(en[0]);
  // Does EN[0] mention a seif number lower than current?
  const seifRef = en0.match(/[Ss]e[i']?[if]?\s+(\d+)/);
  const refNum = seifRef ? parseInt(seifRef[1]) : null;
  const isStrayPrior = refNum !== null && refNum < seifNum;
  const isGarbage0 = GARBAGE.test(en0);
  const isGarbage12 = (en[1] && GARBAGE.test(strip(en[1]))) || (en[2] && GARBAGE.test(strip(en[2])));
  console.log(`${c} (HE:${he.length} EN:${en.length}): EN[0]="${en0.slice(0,60)}" | stray=${isStrayPrior} ref=${refNum} garbage12=${isGarbage12}`);
}
