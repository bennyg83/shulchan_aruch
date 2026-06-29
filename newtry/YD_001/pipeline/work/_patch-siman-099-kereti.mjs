#!/usr/bin/env node
/** Editorial cleanup — siman 099 kereti only */
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const ROOT = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '../..');
const OUT = path.join(ROOT, 'output');
const BLOCK = '**** YD001 SOURCE BLOCK ****';
const ENG = '**** ENGLISH ****';
const END = '**** END BLOCK ****';
const REL = 'siman_099/kereti/part-001.txt';
const SLUG = 'kereti';

const T = {
  '1#א': `Forbidden bones, etc. See Peleti what he wrote to resolve the Gemara's sugya.`,
  '1#ב': `With permitted food. See Peleti on Peri Chadash's difficulty — what he wrote from the pot: "Is it that the prohibition absorbed but the permitted did not absorb?"`,
  '1#ג': `The permitted food; and R' Yonah's view is specifically min b'mino. See Peleti.`,
  '1#ד': `Not to combine, etc. — bones of permitted food combine with permitted food.`,
  '1#ה': `To nullify. Soft bones are treated like meat. Shach.`,
  '1#ו': `For such is the essential ruling. Bach challenged: this is a clinging prohibition; Shach answered we do not say chein nafsho since hag'alah helps. See what Peleti wrote.`,
  '3#א': `It combines — for it too receives the taste of prohibition; but even though it combines to permit the food, the piece is forbidden because it can be squeezed — forbidden; see above siman 106.`,
  '3#ב': `And we do not practice thus; rather one needs sixty against each and every piece — nevertheless it is forbidden.`,
  '4#_': `And it diminished — for the prohibition too was greater and also diminished. But if we know the quantity of the prohibition, we also estimate what was absorbed; Maharshal rules each time one estimates only as it comes before us, without distinction.`,
  '5#א': `B'shogeg — that is, where chein nafsho does not apply; but where chein nafsho applies, nullification does not help.`,
  '5#ב': `Forbidden to sell it. Shach's view: if he does not sell at high price to a Jew, it is permitted. See Peleti.`,
  '5#ג': `Wet in wet. Shach challenged Bach from "some say," etc. See what Peleti wrote — that in truth Tur who wrote the teacher need not investigate deals with other prohibitions, but in basar b'chalav one certainly must investigate.`,
  '5#ד': `Before it became known. Issur VeHeter's view: even chein nafsho we do not say before it became known in the mixture; Shach challenged and wrote that therefore Rama omitted it. See what I wrote in Peleti — also Issur VeHeter's view in other prohibitions and not in basar b'chalav; and I settled Shach's difficulties.`,
  '5#ה': `But if it became known — see what I wrote in Peleti in resolving Shach's difficulty on Issur VeHeter.`,
  '6#א': `B'mezid forbidden — that is, for one who nullifies for himself; but for others it is permitted.`,
  '6#ב': `One increases upon it and nullifies it. Orach Chaim regarding permitted oil ruled one may not nullify it. See Peleti — there is a distinction between wet and dry, and also between muktzeh prohibition which is like d'oraisa and other prohibitions.`,
  '6#ג': `It returns and is stirred. Peri Chadash extended at length on this root. See what Peleti wrote in all views of the poskim; for halachah one may not be lenient against Rama's words — see there.`,
  '6#ד': `For behold it was nullified in water — even according to Ran in Nedarim that heter b'heter is not nullified — nevertheless it does not become nevelah; if so, when it falls from the milk, only according to its value falls, and there is sixty — permitted.`,
};

function patchFile() {
  const fp = path.join(OUT, REL);
  const s = fs.readFileSync(fp, 'utf8');
  const applied = new Set();
  const keysInFile = new Set();
  const parts = s.split(BLOCK);
  const out = parts.map((block, i) => {
    if (i === 0) return block;
    const slugM = block.match(/^\s*slug: (.+)$/m);
    const seifM = block.match(/^\s*seif: (.+)$/m);
    const markerM = block.match(/^\s*marker: (.+)$/m);
    if (!slugM || slugM[1].trim() !== SLUG) return BLOCK + block;
    const seif = seifM[1].trim();
    const marker = markerM ? markerM[1].trim() : 'main';
    const key = `${seif}#${marker}`;
    keysInFile.add(key);
    if (!(key in T)) throw new Error(`No translation for ${key}`);
    const enStart = block.indexOf(ENG);
    const enEnd = block.indexOf(END);
    if (enStart < 0 || enEnd < 0) throw new Error(`ENGLISH/END missing: ${key}`);
    const before = block.slice(0, enStart + ENG.length + 1);
    const after = block.slice(enEnd);
    const text = T[key].endsWith('\n') ? T[key] : T[key] + '\n';
    applied.add(key);
    return BLOCK + before + text + after;
  });
  const missing = [...keysInFile].filter((k) => !applied.has(k));
  if (missing.length) throw new Error(`Keys not patched: ${missing.join(', ')}`);
  fs.writeFileSync(fp, out.join(''), 'utf8');
  console.log(`OK ${REL} (${applied.size} blocks)`);
  return applied.size;
}

const n = patchFile();
const ts = new Date().toISOString().replace(/\.\d{3}Z$/, '');
fs.appendFileSync(
  path.join(ROOT, 'progress.log'),
  `${ts} siman_099/kereti ${n} blocks editorial CLEAN\n`
);
console.log(`[DONE] siman_099/kereti — ${n} blocks`);
