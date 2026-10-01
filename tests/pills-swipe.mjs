// Alle negen pills zoals een gebruiker: de rij swipen tot de pill in beeld is, wachten tot de snap klaar is, tikken.
import { chromium } from 'playwright';
import { preview } from 'astro';
const server = await preview({ root: process.cwd(), logLevel: 'silent' });
const base = `http://localhost:${server.port}/zbnridderkerk/`;
const browser = await chromium.launch({ executablePath: '/opt/pw-browsers/chromium', args: ['--no-sandbox'] });
const ctx = await browser.newContext({ viewport: { width: 390, height: 844 }, hasTouch: true });
const p = await ctx.newPage(); p.setDefaultTimeout(8000);
const cdp = await ctx.newCDPSession(p);
const swipe = async (x1, y, x2) => { const stappen = 8; await cdp.send('Input.dispatchTouchEvent', { type: 'touchStart', touchPoints: [{ x: x1, y }] }); for (let i = 1; i <= stappen; i++) { await cdp.send('Input.dispatchTouchEvent', { type: 'touchMove', touchPoints: [{ x: x1 + (x2 - x1) * i / stappen, y }] }); await p.waitForTimeout(16); } await cdp.send('Input.dispatchTouchEvent', { type: 'touchEnd', touchPoints: [] }); };
const slugs = ['knikarmschermen', 'uitvalschermen', 'markiezen', 'screens', 'rolluiken', 'terrasoverkappingen', 'garagedeuren', 'raamdecoratie', 'binnenzonwering'];
let goed = 0;
for (const slug of slugs) {
  await p.goto(base, { waitUntil: 'load' });
  await p.evaluate(() => { document.documentElement.style.scrollBehavior = 'auto'; document.querySelector('nav[aria-label="Snel naar een product"]').scrollIntoView({ block: 'center' }); });
  await p.waitForTimeout(300);
  const sel = `nav[aria-label="Snel naar een product"] a[href*="${slug}"]`;
  // Swipen tot de pill volledig binnen 390 px staat (maximaal 8 swipes).
  for (let i = 0; i < 8; i++) {
    const r = await p.locator(sel).evaluate((e) => { const b = e.getBoundingClientRect(); return { x: b.x, right: b.right, y: b.y + b.height / 2 }; });
    if (r.x >= 10 && r.right <= 380) break;
    if (r.right > 380) await swipe(260, r.y, 140); else await swipe(140, r.y, 260);
    await p.waitForTimeout(700);
  }
  const b = await p.locator(sel).boundingBox();
  const onder = await p.evaluate(([x, y]) => (document.elementFromPoint(x, y)?.closest('a')?.getAttribute('href') || '').replace('/zbnridderkerk/', '/'), [b.x + b.width / 2, b.y + b.height / 2]);
  await p.touchscreen.tap(b.x + b.width / 2, b.y + b.height / 2); await p.waitForTimeout(1500); await p.waitForLoadState('load');
  const ok = p.url().includes(slug); goed += ok;
  console.log(ok ? 'OK  ' : 'FOUT', slug, 'onder tik:', onder, '->', p.url().replace(base, '/'));
}
console.log(goed, 'van', slugs.length);
await browser.close(); await server.stop();
