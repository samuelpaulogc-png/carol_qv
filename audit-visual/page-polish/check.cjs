const {chromium}=require(process.env.TEMP+'\\gancho-validation\\node_modules\\playwright-core');
const fs=require('fs'),assert=require('assert/strict'),dir='audit-visual/page-polish';
const copy=html=>{const root=html?new DOMParser().parseFromString(html,'text/html').body:document.body;let n,s='';const w=document.createTreeWalker(root,NodeFilter.SHOW_TEXT);while(n=w.nextNode())if(!n.parentElement.closest('style,script'))s+=n.textContent;return s.replace(/\s+/g,' ').trim()};
(async()=>{const b=await chromium.launch({executablePath:'C:\\Program Files\\Google\\Chrome\\Application\\chrome.exe',headless:true}),report=[];
for(const width of [1440,768,375,320]){
 const p=await b.newPage({viewport:{width,height:1000}}),errors=[],failed=[];p.on('pageerror',e=>errors.push(e.message));p.on('response',r=>{if(r.status()>=400&&r.url().startsWith('http://localhost:5501/'))failed.push(r.url())});
 await p.goto('http://localhost:5501/',{waitUntil:'networkidle'});await p.evaluate(()=>document.fonts.ready);
 assert.equal(await p.evaluate(copy),await p.evaluate(copy,fs.readFileSync(`${dir}/before.html`,'utf8')));
 for(const selector of ['.sec-who','.sec-proof','#oferta','.sec-faq','.final']){const s=p.locator(selector);await s.scrollIntoViewIfNeeded();await p.waitForTimeout(180);for(const img of await s.locator('img').all())await img.evaluate(e=>e.decode());assert.equal(await p.evaluate(()=>document.documentElement.scrollWidth),width)}
 const summary=p.locator('.faq summary').first();await summary.focus();assert.equal(await summary.evaluate(e=>getComputedStyle(e).outlineStyle),'solid');await summary.press('Enter');assert.equal(await p.locator('.faq').first().evaluate(e=>e.open),true);assert.equal(await p.locator('.faq .a').first().isVisible(),true);await summary.press('Enter');assert.equal(await p.locator('.faq').first().evaluate(e=>e.open),false);
 await p.emulateMedia({reducedMotion:'reduce'});for(const el of await p.locator('.sec-faq .reveal').all())assert.equal(await el.evaluate(e=>getComputedStyle(e).opacity),'1');
 await p.locator('.final .btn').click();assert.equal(new URL(p.url()).hash,'#oferta');assert.equal(await p.locator('#checkout-link').getAttribute('href'),'#');assert.equal(await p.locator('#checkout-link').evaluate(e=>getComputedStyle(e).borderTopLeftRadius),'100px');
 assert.deepEqual(errors,[]);assert.deepEqual(failed,[]);report.push({width,noOverflow:true,textPreserved:true,faqKeyboard:true,ctaNavigation:true,errors,failed});console.log(report.at(-1));await p.close();
}
fs.writeFileSync(`${dir}/validation.json`,JSON.stringify(report,null,2));await b.close()})().catch(e=>{console.error(e);process.exit(1)});
