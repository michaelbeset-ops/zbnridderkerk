// robots.txt wordt bij de build gemaakt. Preview op github.io: niets indexeren. Live: alles open, ook voor
// AI-zoekmachines (ChatGPT, Claude, Perplexity, Google AI), met de sitemap.
import type { APIRoute } from 'astro';
import { site, url } from '../data/site';

const aiBots = ['GPTBot', 'OAI-SearchBot', 'ChatGPT-User', 'ClaudeBot', 'Claude-SearchBot', 'Claude-User', 'PerplexityBot', 'Perplexity-User', 'Google-Extended', 'Applebot-Extended', 'Bingbot'];

export const GET: APIRoute = ({ site: basis }) => {
  const regels = site.preview
    ? ['# Preview: niet indexeren. Bij livegang (PUBLIC_PREVIEW leeg) gaat alles automatisch open.', 'User-agent: *', 'Disallow: /']
    : [
        'User-agent: *', 'Allow: /', '',
        '# AI-zoekmachines en assistenten mogen de site lezen en citeren.',
        ...aiBots.flatMap((b) => [`User-agent: ${b}`, 'Allow: /', '']),
        `Sitemap: ${new URL(url('sitemap-index.xml'), basis).href}`,
      ];
  return new Response(regels.join('\n') + '\n', { headers: { 'Content-Type': 'text/plain; charset=utf-8' } });
};
