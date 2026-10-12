// llms.txt: een korte, feitelijke samenvatting voor AI-assistenten (zie llmstxt.org), met links naar alle pagina's.
// Alleen gegevens die ook op de site staan.
import type { APIRoute } from 'astro';
import { site, url, tijden, categorieen, perCategorie } from '../data/site';

export const GET: APIRoute = ({ site: basis }) => {
  const abs = (p: string) => new URL(url(p), basis).href;
  const open = tijden.filter((t) => t.open).map((t) => `${t.naam} ${t.open} uur`).join(', ');
  const tekst = [
    `# ${site.naam} ${site.rechtsvorm} (${site.kort})`,
    '',
    `> Zonweringsbedrijf met eigen showroom in ${site.plaats}. Buiten- en binnenzonwering, rolluiken, garagedeuren en overkappingen op maat, ingemeten bij de klant thuis en gemonteerd door eigen monteurs.`,
    '',
    '## Contact',
    `- Adres: ${site.straat}, ${site.postcode} ${site.plaats}`,
    `- Telefoon: ${site.tel}`,
    `- E-mail: ${site.mail}`,
    `- KvK: ${site.kvk}`,
    `- Showroom open: ${open}. Zondag gesloten.`,
    `- Offerte aanvragen: ${abs('#offerte')}`,
    '',
    ...categorieen.flatMap((c) => [
      `## ${c.naam}`,
      `${c.kort}`,
      `- [Alle ${c.naam.toLowerCase()}](${abs(`${c.slug}/`)})`,
      ...perCategorie(c.categorie).map((p) => `- [${p.naam}](${abs(`producten/${p.slug}/`)}): ${p.kort}`),
      '',
    ]),
    '## Overig',
    `- [Privacyverklaring](${abs('privacy/')})`,
    `- [Algemene voorwaarden](${abs('algemene-voorwaarden/')})`,
  ];
  return new Response(tekst.join('\n') + '\n', { headers: { 'Content-Type': 'text/plain; charset=utf-8' } });
};
