// Gera cópias de comparação sem alterar a página principal.
const fs=require('fs'),crypto=require('crypto');
const dir='audit-visual/map-options',source=fs.readFileSync('index.html','utf8');
fs.writeFileSync(`${dir}/source.sha256`,crypto.createHash('sha256').update(source).digest('hex'));
for(const option of ['lateral','integrated']){
 let html=source.replaceAll('assets/','/assets/');
 const start=html.indexOf('<section class="sec map-sec'),end=html.indexOf('</section>',start);
 let section=html.slice(start,end);
 section=section.replace('class="map-copy reveal"','class="map-copy"');
 for(const name of ['map-reflection','map-outcome','map-action'])section=section.replace(`class="${name}"`,`class="${name} reveal"`);
 html=html.slice(0,start)+section+html.slice(end);
 html=html.replace('</style>',fs.readFileSync(`${dir}/${option}.css`,'utf8')+'\n</style>');
 fs.writeFileSync(`${dir}/${option}.html`,html);
}
console.log('Previews gerados; index.html preservado.');
