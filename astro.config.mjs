// @ts-check
import { defineConfig } from 'astro/config';
import tailwindcss from '@tailwindcss/vite';
import sitemap from '@astrojs/sitemap';

// Live op het eigen domein via GitHub Pages (public/CNAME). Terug naar preview op github.io: site
// https://michaelbeset-ops.github.io met base '/zbnridderkerk' en PUBLIC_PREVIEW '1' in de workflow.
export default defineConfig({
  site: 'https://www.zbnridderkerk.nl',
  trailingSlash: 'always',
  devToolbar: { enabled: false },
  integrations: [sitemap()],
  vite: {
    plugins: [tailwindcss()],
    // Scripts nooit inline, zodat de Content-Security-Policy ze zonder 'unsafe-inline' toestaat.
    build: { assetsInlineLimit: 0 },
  },
});
