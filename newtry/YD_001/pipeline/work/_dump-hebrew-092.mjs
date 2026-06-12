import fs from 'fs';

const j = JSON.parse(fs.readFileSync('_hebrew-092.json', 'utf8'));

function getHeb(s) {
  if (s.startsWith('["')) {
    try {
      return JSON.parse(s)[0];
    } catch {
      return s;
    }
  }
  return s;
}

const out = [];
for (const [slug, map] of Object.entries(j).sort()) {
  for (const [key, { heb }] of Object.entries(map).sort()) {
    out.push(`### ${slug} ${key}\n${getHeb(heb)}\n`);
  }
}
fs.writeFileSync('_hebrew-092-plain.txt', out.join('\n'));
console.log('blocks', out.length);
