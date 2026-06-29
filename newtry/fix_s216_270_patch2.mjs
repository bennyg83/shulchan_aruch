import { readFileSync, writeFileSync } from 'fs';

// Use startsWith with short unambiguous ASCII prefix (no curly quotes, no apostrophes)
function fixLines(file, fixes) {
  let t = readFileSync(file, 'utf8');
  const lines = t.split('\n');
  let count = 0;
  const result = lines.map(line => {
    for (const [start, replacement] of fixes) {
      if (line.startsWith(start)) { count++; return replacement; }
    }
    return line;
  });
  writeFileSync(file, result.join('\n'), 'utf8');
  console.log(`Fixed ${count}:`, file.split('/').slice(-3).join('/'));
}

const base = 'C:/Users/binya/Documents/Shulchan aruch/newtry/YD_001/output';

// siman_234/baer-heitev — two remaining lines
fixLines(`${base}/siman_234/baer-heitev/part-001.txt`, [
  [
    'Father. Dham did not violate',
    'the father. For even though if the father did not annul at all she returns to the father\'s authority — nonetheless, since he annulled during the lifetime of the betrothed man it is worse, because the betrothed man\'s portion has been weakened and there is no power to transfer it to the father. Siftei Kohen:'
  ],
  [
    'The first. And so that the husband',
    'the first. And therefore, where the husband is not before us, she may be released by three laymen. Siftei Kohen:'
  ],
]);

// siman_237/baer-heitev — 'Written. And he said'
fixLines(`${base}/siman_237/baer-heitev/part-001.txt`, [
  [
    'Written. And he said,',
    'written in them. And it is written in the responsa of Maharam Mintz that if he opened them and swore by them — it is as if he said "by what is written in them." And even though the case there concerns the Ten Commandments, it appears the same applies to all holy books — for they share the same rationale. Siftei Kohen:'
  ],
]);

// siman_240/baer-heitev — 'enslaved. It seems that her husband'
fixLines(`${base}/siman_240/baer-heitev/part-001.txt`, [
  [
    'enslaved. It seems that her husband',
    'obligated. And it appears that if her husband does not insist, she is obligated in all matters that are possible — the same as a man. Siftei Kohen:'
  ],
]);

// siman_242/baer-heitev — 'Ordinaryly. We were in B&amp;D'
fixLines(`${base}/siman_242/baer-heitev/part-001.txt`, [
  [
    'Ordinaryly. We were in B&amp;D',
    'routinely. That is, on Mondays and Thursdays or on the weekly market day — but the annual market day, such as a fair, is not called routine. Siftei Kohen:'
  ],
]);

// siman_242/beur-hagra — starts with curly-quote "And he was eaten."
// Use includes match
{
  let t = readFileSync(`${base}/siman_242/beur-hagra/part-001.txt`, 'utf8');
  const lines = t.split('\n');
  let count = 0;
  const result = lines.map(line => {
    if (line.includes('And he was eaten.') && line.includes('Bible and the Bible are there')) {
      count++;
      return '"And some say the same applies to all, etc." Rambam — and likewise wrote Rashi in Eruvin there. But it is difficult from the case of Reish Lakish who ruled in the presence of Rabbi Yochanan in chapter 4 of Ketubot — and Rabbi Yochanan said: what shall I do, etc. — and a student is forbidden to disagree with his teacher. Granted, according to Tosafot (Bava Metzia 84a and elsewhere) who hold that he was initially a great man, it is understandable — but according to Rashi it is difficult. See also Maharik. And it appears that with permission it is permitted in this case too — see below se\'if 32:';
    }
    return line;
  });
  writeFileSync(`${base}/siman_242/beur-hagra/part-001.txt`, result.join('\n'), 'utf8');
  console.log(`Fixed ${count}: siman_242/beur-hagra/part-001.txt`);
}

// siman_252/baer-heitev — second block line 85 "If he is a cheater..."
// This is a continuation of the block that starts at line 84 — check if it's a separate block
{
  let t = readFileSync(`${base}/siman_252/baer-heitev/part-001.txt`, 'utf8');
  const lines = t.split('\n');
  let count = 0;
  const result = lines.map(line => {
    if (line.startsWith('If he is a cheater or accustomed to the execution of Starworkers')) {
      count++;
      return 'However, if he is a swindler or accustomed to borrowing from non-Jews so that others will redeem him — one does not redeem him. And one who was seized on a claim of fornication with a prostitute — even though by strict law the community need not redeem him, since the Name of Heaven must not be desecrated, one should redeem him; specifically when they did not seek to kill him — but if they sought to kill him, they are obligated by law to redeem him:';
    }
    return line;
  });
  writeFileSync(`${base}/siman_252/baer-heitev/part-001.txt`, result.join('\n'), 'utf8');
  console.log(`Fixed ${count}: siman_252/baer-heitev/part-001.txt`);
}

// siman_258/baer-heitev — 'When they come. And the'
fixLines(`${base}/siman_258/baer-heitev/part-001.txt`, [
  [
    'When they come. And the',
    'when it comes. And likewise even if he says this regarding a thing not yet in existence, he is obligated to fulfill it — as written in Choshen Mishpat siman 217 se\'if 7 in the gloss. Siftei Kohen:'
  ],
]);

// siman_267/baer-heitev — 'And even. And the knowledge of Hashem'
fixLines(`${base}/siman_267/baer-heitev/part-001.txt`, [
  [
    'And even. And the knowledge of Hashem',
    'And even. The view of Tosafot and Rosh is that in such a case he goes free; and see in Even HaEzer where both views are explained. Siftei Kohen:'
  ],
]);

// siman_267/siftei-kohen — 'He worked from a star worker.'
fixLines(`${base}/siman_267/siftei-kohen/part-001.txt`, [
  [
    'He worked from a star worker.',
    'One who purchases a slave from a non-Jew. Even though he acquired him through the modes by which a slave is acquired:'
  ],
]);

// siman_268/baer-heitev — 'Distance. And he said,'
fixLines(`${base}/siman_268/baer-heitev/part-001.txt`, [
  [
    'Distance. And he said,',
    'interposition. For we say in the Talmud: anything that interposes in immersion interposes for a convert. And see below siman 198 what constitutes an interposition in immersion — and likewise a valid mikveh is required as for the immersion of a niddah. Siftei Kohen:'
  ],
]);

console.log('\nPatch 2 complete.');
