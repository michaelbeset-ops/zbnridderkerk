// Screenshots van de productie-build: node shots/shoot.mjs <pad> [naam]
import { chromium } from 'playwright';
import { preview } from 'astro';
const pad = process.argv[2] ?? '/';
const naam = process.argv[3] ?? 'home';
const server = await preview({ root: process.cwd(), logLevel: 'silent' });
const base = `http://localhost:${server.port}/zbnridderkerk${pad}`;
const browser = await chromium.launch({ executablePath: '/opt/pw-browsers/chromium', args: ['--no-sandbox'] });
for (const [w, h] of [[1440, 900], [390, 844], [320, 640]]) {
  const page = await browser.newPage({ viewport: { width: w, height: h }, deviceScaleFactor: 1 });
  page.setDefaultTimeout(20000);
  await page.goto(base, { waitUntil: 'networkidle' });
  // Door de hele pagina scrollen zodat lazy-loaded foto's geladen zijn, dan terug naar boven.
  await page.evaluate(async () => {
    document.documentElement.style.scrollBehavior = 'auto';
    const hoogte = document.documentElement.scrollHeight;
    for (let y = 0; y <= hoogte; y += 500) { window.scrollTo(0, y); await new Promise((r) => setTimeout(r, 60)); }
    window.scrollTo(0, 0);
  });
  await page.waitForLoadState('networkidle', { timeout: 15000 }).catch(() => {});
  await page.waitForTimeout(500);
  const scroll = await page.evaluate(() => document.documentElement.scrollWidth);
  if (scroll > w) console.log(`LET OP: horizontale scroll op ${w}: scrollWidth ${scroll}`);
  await page.screenshot({ path: `shots/${naam}-${w}.png`, fullPage: true });
  await page.close();
}
await browser.close();
await server.stop();
console.log('klaar');
