const {chromium}=require(process.env.TEMP+'\\gancho-validation\\node_modules\\playwright-core');
const fs=require('fs'),assert=require('assert/strict');
const dir='audit-visual/hero-refinement';
const copy=()=>{let n,s='';const w=document.createTreeWalker(document.body,NodeFilter.SHOW_TEXT);while(n=w.nextNode())if(!n.parentElement.closest('style,script'))s+=n.textContent;return s.replace(/\s+/g,' ').trim()};
(async()=>{
const browser=await chromium.launch({executablePath:'C:\\Program Files\\Google\\Chrome\\Application\\chrome.exe',headless:true});
const mode=process.argv[2]||'after',report=[];
for(const [name,width,height] of [['desktop',1440,1000],['mobile',375,812],['tablet',768,1024]]){
const p=await browser.newPage({viewport:{width,height}}),errors=[];p.on('pageerror',e=>errors.push(e.message));
await p.goto('http://localhost:5501/',{waitUntil:'networkidle'});await p.evaluate(()=>document.fonts.ready);await p.waitForTimeout(500);
const text=await p.evaluate(copy);if(mode==='before')fs.writeFileSync(`${dir}/${name}-copy.txt`,text);else assert.equal(text,fs.readFileSync(`${dir}/${name}-copy.txt`,'utf8'));
const hero=p.locator('.hero');await hero.screenshot({path:`${dir}/${mode}-${name}.png`});
const metrics=await p.evaluate(()=>{
const backgrounds={};for(const selector of ['.hero','.hero-mobile-art','.hero-fx']){const el=document.querySelector(selector);if(!el)continue;for(const pseudo of [null,'::before','::after']){const s=getComputedStyle(el,pseudo);backgrounds[selector+(pseudo||'')]={image:s.backgroundImage,color:s.backgroundColor,size:s.backgroundSize,position:s.backgroundPosition};}}
return {width:document.documentElement.clientWidth,scrollWidth:document.documentElement.scrollWidth,heroHeight:document.querySelector('.hero').offsetHeight,backgrounds};
});
assert.equal(metrics.width,metrics.scrollWidth);assert.deepEqual(errors,[]);
if(mode==='before')fs.writeFileSync(`${dir}/${name}-metrics.json`,JSON.stringify(metrics,null,2));else assert.deepEqual(metrics.backgrounds,JSON.parse(fs.readFileSync(`${dir}/${name}-metrics.json`)).backgrounds,'Keep hero background styling');
report.push({name,...metrics,errors,textUnchanged:true});console.log(name,JSON.stringify({height:metrics.heroHeight,width:metrics.width,scrollWidth:metrics.scrollWidth}));
if(mode==='after'){
const button=p.getByRole('link',{name:'QUERO PARTICIPAR',exact:true});await button.focus();assert.equal(await button.evaluate(el=>getComputedStyle(el).outlineStyle),'solid');
await p.emulateMedia({reducedMotion:'reduce'});assert.equal(await p.locator('.hero h1').evaluate(el=>getComputedStyle(el).opacity),'1');
if(name==='mobile'){
await p.locator('#diagnostico').scrollIntoViewIfNeeded();await p.waitForTimeout(300);
assert(await button.evaluate(el=>el.classList.contains('is-docked')),'Mobile CTA docks');
assert((await button.evaluate(el=>getComputedStyle(el).backgroundImage)).includes('linear-gradient'));
await p.screenshot({path:`${dir}/after-mobile-docked.png`});
await button.click();await p.waitForTimeout(300);assert.equal(new URL(p.url()).hash,'#oferta');
await p.locator('.offer-purchase').scrollIntoViewIfNeeded();await p.waitForTimeout(300);
assert(!(await button.evaluate(el=>el.classList.contains('is-docked'))),'CTA restores at the offer');
await p.evaluate(()=>window.scrollTo(0,0));await p.waitForTimeout(300);
assert.equal(await button.evaluate(el=>el.parentElement.className),'hero-cta-slot');
}
}
await p.close();
}
fs.writeFileSync(`${dir}/${mode}-validation.json`,JSON.stringify(report,null,2));await browser.close();
})().catch(e=>{console.error(e);process.exit(1)});
