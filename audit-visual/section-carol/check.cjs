const {chromium}=require(process.env.TEMP+'\\gancho-validation\\node_modules\\playwright-core');
const fs=require('fs');const assert=require('assert/strict');
const text=()=>{const w=document.createTreeWalker(document.body,NodeFilter.SHOW_TEXT);let n,s='';while(n=w.nextNode())if(!n.parentElement.closest('script,style'))s+=n.textContent;return s.replace(/\s+/g,' ').trim()};
(async()=>{
const browser=await chromium.launch({executablePath:'C:\\Program Files\\Google\\Chrome\\Application\\chrome.exe',headless:true});
const mode=process.argv[2]||'after';const report=[];
const reference=await browser.newPage();await reference.goto('http://localhost:5501/audit-visual/section-carol/before.html');const original=await reference.evaluate(text);await reference.close();
for(const [label,width,height] of [['desktop',1440,1000],['mobile',375,812],['tablet',768,1024]]){
const page=await browser.newPage({viewport:{width,height}});let errors=[];page.on('pageerror',e=>errors.push(e.message));
await page.goto('http://localhost:5501/',{waitUntil:'networkidle'});await page.evaluate(()=>document.fonts.ready);
assert.equal(await page.evaluate(text),original,'All page copy remains identical');
const section=page.locator('.sec-who');const bounds=await section.evaluate(e=>({top:e.getBoundingClientRect().top+scrollY,height:e.offsetHeight}));
for(let y=bounds.top-200;y<bounds.top+bounds.height;y+=400){await page.evaluate(y=>scrollTo(0,y),y);await page.waitForTimeout(100)}
await page.waitForTimeout(800);
await page.evaluate(y=>scrollTo(0,y-52),bounds.top);await page.waitForTimeout(300);
// The section screenshot omits fixed UI, whose behavior is unchanged.
await page.screenshot({path:`audit-visual/section-carol/${mode}-${label}-viewport.png`});
await section.screenshot({path:`audit-visual/section-carol/${mode}-${label}.png`,style:'.topbar,.btn.is-docked{visibility:hidden!important}'});
const metrics=await page.evaluate(()=>({scrollWidth:document.documentElement.scrollWidth,clientWidth:document.documentElement.clientWidth,photoLoaded:document.querySelector('.carol-photo img').naturalWidth>0,sectionHeight:document.querySelector('.sec-who').offsetHeight}));
assert.equal(metrics.scrollWidth,metrics.clientWidth);assert(metrics.photoLoaded);assert.deepEqual(errors,[]);
report.push({label,copyUnchanged:true,...metrics,errors});console.log(label,JSON.stringify(metrics));await page.close();
}
fs.writeFileSync(`audit-visual/section-carol/${mode}-validation.json`,JSON.stringify(report,null,2));await browser.close();
})().catch(e=>{console.error(e);process.exit(1)});
