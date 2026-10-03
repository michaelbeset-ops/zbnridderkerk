// Gedragstests en Lighthouse op de productie-build, met een eigen previewserver: node shots/test.mjs <pad>
import { chromium } from 'playwright';
import { preview } from 'astro';
import lighthouse from 'lighthouse';
import { launch } from 'chrome-launcher';
const pad = process.argv[2] ?? '/';
const server = await preview({ root: process.cwd(), logLevel: 'silent' });
const url = `http://localhost:${server.port}/zbnridderkerk${pad}`;

const browser = await chromium.launch({ executablePath: '/opt/pw-browsers/chromium', args: ['--no-sandbox'] });
const page = await browser.newPage({ viewport: { width: 1440, height: 900 } });
const fouten = [];
page.on('pageerror', (e) => fouten.push(e.message));
await page.goto(url, { waitUntil: 'networkidle' });
if (await page.locator('main details summary').count()) {
  await page.click('main details summary');
  console.log('faq open:', await page.locator('main details[open]').count());
}
if (await page.locator('aside > div').count()) {
  await page.evaluate(() => { document.documentElement.style.scrollBehavior = 'auto'; window.scrollTo(0, 2200); });
  await page.waitForTimeout(400);
  console.log('sticky top:', await page.evaluate(() => document.querySelector('aside > div').getBoundingClientRect().top));
}
console.log('js-fouten:', fouten);
await browser.close();

const chrome = await launch({ chromePath: '/opt/pw-browsers/chromium-1194/chrome-linux/chrome', chromeFlags: ['--headless', '--no-sandbox'] });
const r = await lighthouse(url, { port: chrome.port, output: 'json', logLevel: 'silent' });
const cats = r.lhr.categories;
console.log(Object.values(cats).map((c) => `${c.id} ${Math.round(c.score * 100)}`).join(' | '), 'CLS', r.lhr.audits['cumulative-layout-shift'].displayValue);
await chrome.kill();
await server.stop();
