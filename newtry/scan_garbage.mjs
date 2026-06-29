import { readFileSync, readdirSync } from 'fs';
import path from 'path';

const base = 'C:/Users/binya/Documents/Shulchan aruch/newtry/YD_001/output';
const simanim = ['siman_187','siman_188','siman_189','siman_190','siman_192','siman_194','siman_197','siman_198','siman_199','siman_200','siman_201','siman_204','siman_205'];
const garbagePat = /star worker|Starwork|Bible and the Bible|quaint|KGB|"Third:|M\.M\.M\.|D\.D\.D\./i;

function walk(dir, files=[]) {
  for (const e of readdirSync(dir, {withFileTypes:true})) {
    const full = path.join(dir, e.name);
    if (e.isDirectory()) walk(full, files);
    else if (e.name.endsWith('.txt')) files.push(full);
  }
  return files;
}

for (const s of simanim) {
  const sdir = path.join(base, s);
  for (const filepath of walk(sdir)) {
    const lines = readFileSync(filepath, 'utf8').split('\n');
    let i=0;
    while(i<lines.length) {
      if(lines[i].trim()==='**** ENGLISH ****') {
        let j=i+1;
        const engLines=[];
        while(j<lines.length && lines[j].trim()!=='**** END BLOCK ****') {
          engLines.push([j+1, lines[j]]);
          j++;
        }
        for(const [lno,ltxt] of engLines) {
          if(garbagePat.test(ltxt)) {
            let heb='';
            for(let k=i-1;k>=Math.max(0,i-20);k--) {
              if(lines[k].trim()==='**** HEBREW ****') {
                const hebLines=[];
                let m=k+1;
                while(m<lines.length && lines[m].trim()!=='**** ENGLISH ****') {
                  hebLines.push(lines[m]);
                  m++;
                }
                heb=hebLines.join(' ');
                break;
              }
            }
            const fp2 = filepath.split(/[\\/]/).slice(-3).join('/');
            console.log('FILE:' + fp2 + ' LINE:' + lno);
            console.log('ENG:' + ltxt.trim().substring(0,150));
            console.log('HEB:' + heb.trim().substring(0,300));
            console.log();
          }
        }
      }
      i++;
    }
  }
}
