import fs from 'fs';
for (let n = 271; n <= 300; n++) {
  const p = `output/siman_${String(n).padStart(3, '0')}/mechaber/part-001.txt`;
  try {
    const t = fs.readFileSync(p, 'utf8');
    const b = (t.match(/YD001 SOURCE BLOCK/g) || []).length;
    console.log(n, b, t.split('\n').length);
  } catch {
    console.log(n, 'MISSING');
  }
}
