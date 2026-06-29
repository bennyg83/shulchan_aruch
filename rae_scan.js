const fs=require('fs');
const j=JSON.parse(fs.readFileSync('C:/Users/binya/Documents/Shulchan aruch/Sefaria Pulls/shulchan-arukh/Orach_Chayim/commentaries/Rabbi_Akiva_Eiger_on_Shulchan_Arukh,_Orach_Chayim/merged.json','utf8'));

let explicitSeif=0, maNote=0, other=0, total=0;
const otherSamples=[], maSamples=[];

for(let si=0;si<j.text.length;si++){
  const seifim=j.text[si];
  if(!Array.isArray(seifim)) continue;
  for(let se=0;se<seifim.length;se++){
    const t=seifim[se];
    if(typeof t!=='string'||!t.trim()) continue;
    total++;
    const smallM=t.match(/<small>([\s\S]*?)<\/small>/);
    const label=smallM?smallM[1].trim():'';
    if(/^סעיף/.test(label)){
      explicitSeif++;
    } else if(/מג/.test(label)&&/א/.test(label)){
      maNote++;
      if(maSamples.length<3) maSamples.push('s'+(si+1)+'/se'+(se+1)+': '+label+' | '+t.replace(/<[^>]+>/g,'').slice(0,60));
    } else {
      other++;
      if(otherSamples.length<5) otherSamples.push('s'+(si+1)+'/se'+(se+1)+': ['+label+'] '+t.replace(/<[^>]+>/g,'').slice(0,60));
    }
  }
}

console.log('Total RAE entries:',total);
console.log('Explicit seif ref (סעיף X):',explicitSeif);
console.log('MA note ref:',maNote);
console.log('Other:',other);
console.log();
console.log('MA note samples:');
maSamples.forEach(s=>console.log(' ',s));
console.log('Other samples:');
otherSamples.forEach(s=>console.log(' ',s));
