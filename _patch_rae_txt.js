const fs = require('fs'), path = require('path');
function brSegs(h) { return h.split(/<br\s*\/?>/).filter(s => s.trim()); }
function strip(h) { return h.replace(/<[^>]+>/g, '').replace(/&[^;]+;/g, '').replace(/\s+/g, ' ').trim(); }

const corpusBase = 'C:/Users/binya/Documents/Shulchan aruch/newtry/OC_Mobile/oc318-mobile-reader/public/corpus/oc1';
const txtBase = 'C:/Users/binya/Documents/Shulchan aruch/newtry/OC_001/output';

const entries = [
  { si: 'siman252', se: 'seif-002', siNum: '252' },
  { si: 'siman509', se: 'seif-002', siNum: '509' },
  { si: 'siman606', se: 'seif-004', siNum: '606' },
];

for (const { si, se, siNum } of entries) {
  const ep = path.join(corpusBase, si, se, 'rabbi-akiva-eiger', 'en.html');
  const hp = path.join(corpusBase, si, se, 'rabbi-akiva-eiger', 'he.html');
  const en = brSegs(fs.readFileSync(ep, 'utf8'));
  const he = brSegs(fs.readFileSync(hp, 'utf8'));

  const txtPath = path.join(txtBase, 'siman_' + siNum.padStart(3, '0'), 'rabbi-akiva-eiger', 'part-001.txt');
  const rawTxt = fs.readFileSync(txtPath, 'utf8');
  // Normalize to LF for consistent regex matching; we'll restore CRLF at write time if needed
  let txt = rawTxt.replace(/\r\n/g, '\n');
  const hasCRLF = rawTxt.includes('\r\n');

  // Parse blocks: find HE content and EN content regions
  const blockPattern = /(\*\*\*\* HEBREW \*\*\*\*\n)([\s\S]*?)(\n\*\*\*\* ENGLISH \*\*\*\*\n)([\s\S]*?)(\n\*\*\*\* END BLOCK \*\*\*\*)/g;

  let matched = [];
  let m;
  while ((m = blockPattern.exec(txt)) !== null) {
    matched.push({
      full: m[0],
      heContent: m[2],
      enStart: m.index + m[1].length + m[2].length + m[3].length,
      enContent: m[4],
      enEnd: m.index + m[1].length + m[2].length + m[3].length + m[4].length,
    });
  }

  // For each corpus HE segment, find the best-matching TXT block by HE content similarity
  const heKey = he.map(s => strip(s).slice(0, 50));
  let replacements = []; // {blockIdx, newEn}

  for (let i = 0; i < he.length; i++) {
    let bestScore = 0, bestIdx = -1;
    for (let j = 0; j < matched.length; j++) {
      const txtHe = strip(matched[j].heContent).slice(0, 50);
      // Score: length of common prefix
      let score = 0;
      while (score < heKey[i].length && score < txtHe.length && heKey[i][score] === txtHe[score]) score++;
      if (score > bestScore) { bestScore = score; bestIdx = j; }
    }
    if (bestIdx >= 0 && bestScore >= 10) {
      replacements.push({ idx: bestIdx, heScore: bestScore, en: en[i], txtHe: strip(matched[bestIdx].heContent).slice(0, 60) });
    } else {
      console.log(`  ${si}/${se} HE[${i}]: no TXT match (score ${bestScore})`);
    }
  }

  console.log(`${si}/${se}: matched ${replacements.length}/${he.length} blocks`);
  replacements.forEach((r, i) => console.log(`  HE[${i}] (score ${r.heScore}) TXT: "${r.txtHe}" → "${r.en.slice(0, 60)}"`));

  // Apply replacements in reverse order (to preserve offsets)
  // Rebuild txt by substituting EN content in matched blocks
  // Since we need to do string replacement, rebuild from scratch
  let newTxt = txt;
  // Sort by block index descending so earlier indices remain valid
  const sorted = [...replacements].sort((a, b) => b.idx - a.idx);
  for (const { idx, en: newEn } of sorted) {
    const block = matched[idx];
    // Replace the EN portion: from enStart to enEnd
    // We need to do this in the ORIGINAL txt offsets so rebuild by index
    // Easier: replace the entire block in newTxt
    const oldBlock = matched[idx].full;
    const newBlock = oldBlock.replace(
      /(\*\*\*\* ENGLISH \*\*\*\*\n)([\s\S]*?)(\n\*\*\*\* END BLOCK \*\*\*\*)/,
      (_, pre, _old, post) => pre + newEn + post
    );
    newTxt = newTxt.replace(oldBlock, newBlock);
  }

  const tmp = txtPath + '.tmp';
  const outTxt = hasCRLF ? newTxt.replace(/\n/g, '\r\n') : newTxt;
  fs.writeFileSync(tmp, outTxt, 'utf8');
  try { fs.renameSync(tmp, txtPath); } catch { fs.unlinkSync(txtPath); fs.renameSync(tmp, txtPath); }
  console.log(`  Written: ${txtPath}`);
}
