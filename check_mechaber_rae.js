const fs=require('fs');
const j=JSON.parse(fs.readFileSync('C:/Users/binya/Documents/Shulchan aruch/Sefaria Pulls/shulchan-arukh/Orach_Chayim/mechaber/merged.json','utf8'));

const siTests=[{si:2,se:6},{si:3,se:11},{si:3,se:12},{si:3,se:17},{si:4,se:18},{si:37,se:3},{si:257,se:7}];

// Also check what commentators appear in the mechaber JSON at all
const commSet=new Set();
for(let si=0;si<Math.min(10,j.text.length);si++){
  const seifim=j.text[si];
  if(!Array.isArray(seifim)) continue;
  for(const s of seifim){
    if(typeof s!=='string') continue;
    const matches=s.match(/data-commentator="([^"]+)"/g)||[];
    matches.forEach(m=>{const n=m.match(/data-commentator="([^"]+)"/);if(n)commSet.add(n[1]);});
  }
}
console.log('Commentators embedded in mechaber (first 10 simanim):',Array.from(commSet).join(', '));
console.log();

for(const {si,se} of siTests){
  const seifText=j.text[si-1]?.[se-1]||'';
  const hasEiger=seifText.includes('Eiger')||seifText.includes('eiger');
  console.log('siman'+si+'/seif'+se+': textLen='+seifText.length+' hasEiger='+hasEiger);
  if(hasEiger) console.log('  FOUND: '+seifText.slice(0,300));
  else console.log('  preview: '+seifText.replace(/<[^>]+>/g,'').slice(0,80));
}
