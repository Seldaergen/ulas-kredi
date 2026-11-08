// Read-only release acceptance: no database, SMTP, worker or deployment.
const root=process.cwd();
const fs=require('node:fs'),path=require('node:path'),assert=require('node:assert/strict'),{spawn}=require('node:child_process');
const requireRoot=require('node:module').createRequire(path.join(root,'package.json'));
const {chromium}=requireRoot('playwright');
requireRoot('./tests/register.cjs');
const {POSTS,PUBLISHED_POSTS}=requireRoot('./lib/content/posts.ts');
const {publication}=requireRoot('./lib/content/publication.ts');
const {JSDOM}=requireRoot('jsdom');
const output=path.join(root,'artifacts/release-acceptance');
fs.mkdirSync(output,{recursive:true});
const origin='http://127.0.0.1:3197';
const env=Object.fromEntries(['PATH','HOME','TMPDIR','LANG'].filter(k=>process.env[k]).map(k=>[k,process.env[k]]));
Object.assign(env,{NEXT_TELEMETRY_DISABLED:'1',NODE_ENV:'production',APPLICATION_ACCEPTING_SUBMISSIONS:'true',APPLICATION_ALLOW_LOCAL:'true'});
const node=process.execPath;
const log=fs.openSync(path.join(output,'runtime.log'),'a');
const server=spawn(node,['--max-old-space-size=256','node_modules/next/dist/bin/next','start','--hostname','127.0.0.1','--port','3197'],{env,stdio:['ignore',log,log]});
let browser,peak=0,cold=0,minimum=Infinity,failed=false;
const result={};
function rss(pid){try{const own=Number(fs.readFileSync(`/proc/${pid}/status`,'utf8').match(/^VmRSS:\s+(\d+)/m)?.[1]||0);const children=fs.readFileSync(`/proc/${pid}/task/${pid}/children`,'utf8').trim().split(/\s+/).filter(Boolean);return own+children.reduce((n,p)=>n+rss(p),0);}catch{return 0;}}
const monitor=setInterval(()=>{peak=Math.max(peak,rss(server.pid));const mem=fs.readFileSync('/proc/meminfo','utf8');const available=Number(mem.match(/^MemAvailable:\s+(\d+)/m)[1])/1024;minimum=Math.min(minimum,available);if(available<512&&!failed){failed=true;server.kill('SIGTERM');browser?.close().catch(()=>{});}},250);
const get=(p,options={})=>fetch(origin+p,{signal:AbortSignal.timeout(15000),...options});
(async()=>{try{
 assert.ok(fs.existsSync('.next/BUILD_ID'),'current build exists');
 let ready=false;for(let i=0;i<50;i++){try{if((await get('/api/health')).ok){ready=true;break;}}catch{}if(server.exitCode!==null)throw Error('runtime exited');await new Promise(r=>setTimeout(r,200));}assert.ok(ready,'runtime ready');cold=rss(server.pid);result.staging='PASS';
 const policy=await get('/api/application-policy');assert.equal(policy.status,503);assert.deepEqual(await policy.json(),{enabled:false});
 const submission=await get('/api/applications',{method:'POST',headers:{'Content-Type':'application/json',Origin:'https://ulaskredi.com.tr','Idempotency-Key':require('node:crypto').randomUUID()},body:JSON.stringify({name:'Sentetik Test',phone:'05550000001',topic:'OTHER',channel:'CONTACT_FORM',note:'',privacyAcknowledged:true,privacyVersion:'application-v1-2026-11'})});assert.equal(submission.status,503);result.closedAPI='PASS';
 const sitemap=await(await get('/sitemap.xml')).text();let withheld=0;
 for(const post of POSTS.filter(p=>publication(p).status!=='published')){
  const response=await get('/rehber/'+encodeURIComponent(post.slug));assert.equal(response.status,200);
  const dom=new JSDOM(await response.text());try{const d=dom.window.document;assert.match(d.querySelector('meta[name="robots"]').content,/noindex/);assert.match(d.body.textContent,/İçerik kaynak kontrolünde/);assert.equal(d.querySelectorAll('article').length,0);for(const script of d.querySelectorAll('script[type="application/ld+json"]'))assert.ok(!JSON.stringify(JSON.parse(script.textContent)).includes('"Article"'));assert.ok(!sitemap.includes('/rehber/'+encodeURIComponent(post.slug)));}finally{dom.window.close();}withheld++;
 }assert.equal(withheld,57);result.publication='PASS: 57 withheld / 8 published';
 browser=await chromium.launch({headless:true});
 for(const width of [390,1440])for(const theme of ['dark','light']){
  const context=await browser.newContext({viewport:{width,height:width===390?844:1000},colorScheme:theme,reducedMotion:'reduce',isMobile:width===390,hasTouch:width===390});
  await context.route('**/*',route=>new URL(route.request().url()).origin===origin?route.continue():route.abort());
  const page=await context.newPage();const errors=[];page.on('pageerror',e=>errors.push(e.message));
  for(const [name,url] of [['home','/'],['services','/hizmetler'],['calculators','/#hesaplama'],['guides','/rehber'],['article','/rehber/banka-ic-skor-nedir'],['contact','/iletisim']]){
   const response=await page.goto(origin+url);assert.equal(response.status(),200);
   if(name==='home'){
    await page.getByRole('button',{name:'Görünüm seçin',exact:true}).click();
    await page.getByRole('menuitemradio',{name:theme==='dark'?'Koyu':'Açık',exact:true}).click();
   }
   await page.waitForFunction(t=>document.documentElement.dataset.theme===t,theme);
   await page.evaluate(()=>document.fonts.ready);assert.ok(await page.evaluate(()=>document.documentElement.scrollWidth<=innerWidth),`overflow ${name}/${width}/${theme}`);
   if(name==='calculators'){
    await page.getByLabel('Kredi tutarı (₺)',{exact:true}).fill('1200');await page.getByLabel('Varsayımsal aylık faiz (%)',{exact:true}).fill('0');await page.getByLabel('Vade (ay)',{exact:true}).fill('12');assert.match(await page.getByTestId('monthly-payment').innerText(),/100,00/);await page.getByLabel('Kredi tutarı (₺)',{exact:true}).fill('2400');assert.match(await page.getByTestId('monthly-payment').innerText(),/200,00/);await page.getByLabel('Kredi tutarı (₺)',{exact:true}).fill('');assert.equal(await page.getByTestId('monthly-payment').count(),0);await page.getByLabel('Kredi tutarı (₺)',{exact:true}).fill('1200');await page.locator('#hesaplama').scrollIntoViewIfNeeded();
    assert.equal(await page.locator('#hesaplama a[href="/rehber/kredi-maliyeti-toplam-geri-odeme-nasil-bakilir"]').count(),1);
   }
   if(name==='home'||name==='contact'){
    const form=page.getByRole('form',{name:'Danışmanlık başvurusu'}).first();await form.locator('[data-application-contact-fallback]').waitFor();
    assert.equal(await form.locator('fieldset[hidden][disabled]').count(),1);assert.ok(await form.locator('button[type="submit"]').isDisabled());
    assert.equal(await form.locator('a[href="tel:+905416061356"]').count(),1);assert.equal(await form.locator('a[href="https://wa.me/905416061356"]').count(),1);
   }
   if(name==='home'){assert.equal(await page.locator('h1').count(),1);assert.match(await page.locator('h1').innerText(),/Yüksek limitli kredi danışmanlığında/);assert.equal(await page.locator('iframe,.ef-guide-card,.ef-top-note').count(),0);}
   if(name==='guides')assert.equal(await page.locator('.ef-guide-card').count(),8);
   if(name==='contact')assert.equal(await page.locator('.ef-contact-info a[href="https://wa.me/905416061356"]').count(),1);
   await page.screenshot({path:path.join(output,`${name}-${width}-${theme}.png`),animations:'disabled'});
   if(name==='home'){assert.equal(await page.locator('.cro-hero-copy .cro-primary').getAttribute('href'),'#iletisim');await page.locator('#iletisim').scrollIntoViewIfNeeded();await page.locator('#basvuru [data-application-contact-fallback]').waitFor();}
   if(name==='services'){await page.locator('[data-inner-cta]').first().click();await page.locator('#iletisim').waitFor();}
   if(name==='calculators'){await page.locator('#hesaplama [data-inner-cta]').first().click();assert.equal(new URL(page.url()).hash,'#iletisim');}
  }
  assert.deepEqual(errors,[],`page errors ${width}/${theme}`);await context.close();console.log(`PASS browser ${width}/${theme}`);
 }
 await browser.close();browser=null;
 for(let i=0;i<3;i++)for(const route of ['/','/hizmetler','/rehber','/iletisim','/api/health','/api/application-policy']){const r=await get(route);assert.ok(r.status===200||r.status===503);await r.arrayBuffer();}
 await new Promise(r=>setTimeout(r,3000));assert.equal(server.exitCode,null);assert.equal(failed,false);
 result.browser='PASS: 390/1440 dark/light';result.contacts='PASS';result.runtime={coldRssMiB:cold/1024,peakTotalRssMiB:peak/1024,idleRssMiB:rss(server.pid)/1024,minSystemAvailableMiB:minimum,scope:'single web runtime and descendants; sequential HTTP/browser requests; 256 MiB V8 heap',budget512MiB:peak/1024<448?'PASS':'FAIL'};
 assert.ok(peak/1024<448,'Runtime must leave at least 64 MiB headroom below 512 MiB');
 result.buildId=fs.readFileSync('.next/BUILD_ID','utf8').trim();
 console.log(JSON.stringify(result));
}catch(e){result.failure=e.stack;process.exitCode=1;console.error(e.stack);}finally{clearInterval(monitor);if(browser)await browser.close();server.kill('SIGTERM');await new Promise(r=>{if(server.exitCode!==null)return r();server.once('exit',r);setTimeout(()=>{if(server.exitCode===null)server.kill('SIGKILL');},5000).unref();});fs.closeSync(log);fs.writeFileSync(path.join(output,'staging-result.json'),JSON.stringify(result,null,2));}})();
