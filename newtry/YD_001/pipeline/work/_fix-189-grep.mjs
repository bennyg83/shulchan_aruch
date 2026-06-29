#!/usr/bin/env node
/** Fix remaining grep_saturday / grep_lords_prayer blocks in siman 189 */
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const ROOT = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '../../output/siman_189');

const FIXES = [
  {
    file: 'baer-heitev/part-001.txt',
    slug: 'baer-heitev',
    key: '17#א',
    en: `For days. Known such as Rosh Chodesh or day one of the week as below seif 18. Shach.`,
  },
  {
    file: 'baer-heitev/part-001.txt',
    slug: 'baer-heitev',
    key: '17#ד',
    en: `Fixed. {Rama: even without a jump} But Rashba ruled we attribute one sighting on Shabbat to yesterday's jump and she fixed veset for day one and for jumping but not for days alone {Rama: and so Rabbi Maggid in name of Ramban since vesetot rabbinic we are lenient}. Wonder on Mechaber omitted this — should rule leniently vesetot rabbinic; nevertheless leniency becoming stringency per Mechaber view fixed veset for days alone if afterward did not see three times on day one uprooted veset; per Rashba did not fix veset only days and jumps veset not uprooted thereby since did not jump — not seeing because did not jump; but if she jumps that day concerned as below seif 26 — end quote Shach.`,
  },
  {
    file: 'torat-hashlamim/part-001.txt',
    slug: 'torat-hashlamim',
    key: '6#א',
    en: `She saw three times on day one of the week. E.g. she saw on day one of the week and returned and saw after three weeks on day one of the week — she fixed veset for day one of the week every three weeks; so Perishah Bach and Shach; and do not challenge if so why need teach this — for also fixed interval veset equally literally; one can say for interval veset would not be fixed until fourth sight because first sighting is not called interval at all unlike week-day fixation fixed after three times for first time is called day one of the week as Beit Yosef wrote.`,
  },
  {
    file: 'torat-hashlamim/part-001.txt',
    slug: 'torat-hashlamim',
    key: '6#ב',
    en: `Or on day five of the week. Meaning the intervals are not equal.`,
  },
  {
    file: 'pitchei-teshuva/part-001.txt',
    slug: 'pitchei-teshuva',
    key: '20#_',
    en: `Fixed day one of the week. See Chemdat David who wrote if all three times she saw on jump day only fourth on day after jump depends dispute Taz s.k. 36 — per Mechaber we say matter revealed today causes; per Rabbi there fixed only compound; Avodat HaTosafot in name of Shach brought poskim attribute yesterday's jump; further if all three equal intervals all three jumped day before sight fixed veset days alone not yesterday's jump — only if saw twice on jump day attribute third to yesterday unlike all three did not see on jump day attribute days alone; what Chemdat David further wrote not copied learn from s.k. 18; see Noda biYehudah second part siman 93 only yesterday's jump but if jumped in middle before interval several days did not see returned sight on interval day — all say matter revealed retroactively today causes — see there.`,
  },
  {
    file: 'siftei-kohen/part-001.txt',
    slug: 'siftei-kohen',
    key: '6#ב',
    en: `How she saw three times on day one of the week, etc. Meaning from first sight to second for equal count to third — e.g. saw day one of the week returned saw three weeks later day one of the week returned saw three weeks later day one of the week — fixed veset every three weeks on day one of the week; and though not equal month days likewise saw three times day five of the week at equal times fixed veset twice. Bach — plain.`,
  },
  {
    file: 'siftei-kohen/part-001.txt',
    slug: 'siftei-kohen',
    key: '17#ג',
    en: `Behold day one of the week fixed after twentieth. Even without jump; Rashba and Taz ruled attribute one sighting on Shabbat to yesterday's jump fixed veset day one and jump not days alone; Rabbi Maggid in name of Ramban since vesetot rabbinic lenient Beit Yosef; wonder Mechaber Rabbi omitted; also Raavad Baalei Nefesh 54 top side b; Rosh chapter HaIshah; though view to lighten nevertheless leniency becoming stringency Rambam fixed days alone if saw afterward three times day one uprooted; per lenient view fixed only days and jumps not uprooted since did not jump — not seeing because did not jump; if jumps that day concerned as below seif 26.`,
  },
  {
    file: 'siftei-kohen/part-001.txt',
    slug: 'siftei-kohen',
    key: '19#ג',
    en: `Sneezing downward. From Rambam mishnah commentary appears sneezing is upward; Tosafot Ashkenazi likewise upward as in entry sneezes light from nose and mouth German sternutor etc.; appears for law both true.`,
  },
];

function patchBlock(content, slug, key, newEn) {
  const re = new RegExp(
    `(\\*\\*\\*\\* YD001 SOURCE BLOCK \\*\\*\\*\\*\\s*slug: ${slug.replace(/[.*+?^${}()|[\]\\]/g, '\\$&')}[\\s\\S]*?marker: [^\\n]+\\s*\\*\\*\\*\\* HEBREW \\*\\*\\*\\*[\\s\\S]*?\\*\\*\\*\\* ENGLISH \\*\\*\\*\\*\\s*)[\\s\\S]*?(\\s*\\*\\*\\*\\* END BLOCK \\*\\*\\*\\*)`,
    'm',
  );
  const blocks = content.split('**** YD001 SOURCE BLOCK ****').slice(1);
  let found = false;
  const out = blocks.map((chunk) => {
    const block = '**** YD001 SOURCE BLOCK ****' + chunk;
    if (!block.includes(`slug: ${slug}`)) return block;
    const seifMatch = block.match(/seif: (\d+)/);
    const markerMatch = block.match(/marker: (.+)/);
    if (!seifMatch || !markerMatch) return block;
    const k = `${seifMatch[1]}#${markerMatch[1].trim() === '_' ? '_' : markerMatch[1].trim()}`;
    if (k !== key) return block;
    found = true;
    return block.replace(
      /(\*\*\*\* ENGLISH \*\*\*\*\s*)[\s\S]*?(\s*\*\*\*\* END BLOCK \*\*\*\*)/,
      `$1${newEn}$2`,
    );
  });
  if (!found) throw new Error(`block not found ${slug} ${key}`);
  return out.join('\n\n');
}

for (const f of FIXES) {
  const fp = path.join(ROOT, f.file);
  let text = fs.readFileSync(fp, 'utf8');
  text = patchBlock(text, f.slug, f.key, f.en);
  fs.writeFileSync(fp, text, 'utf8');
  console.log('fixed', f.slug, f.key);
}

// Fix chiddushei 13#א Saturday in long paragraph
const chPath = path.join(ROOT, 'chiddushei-hilkhot-niddah/part-001.txt');
let ch = fs.readFileSync(chPath, 'utf8');
ch = ch.replace(/\bSaturday\b/g, 'day four of the week');
ch = ch.replace(/\bSunday\b/g, 'day one of the week');
fs.writeFileSync(chPath, ch, 'utf8');
console.log('fixed chiddushei Saturday/Sunday');
