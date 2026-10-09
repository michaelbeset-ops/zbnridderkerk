// Foto's van de site. Eigen foto's van ZBN staan per product in assets/producten/<slug>/1.jpg, 2.jpg, ...
// (beschrijvingen in data/productfotos.ts). Voor screens en garagedeuren is er nog geen eigen foto: daar staat
// tijdelijk een gegenereerd stockbeeld uit assets/stock.
import type { ImageMetadata } from 'astro';
import { fotoAlts } from '../data/productfotos';
import knikarmscherm from '../assets/producten/knikarmschermen/3.jpg';
import binnen from '../assets/producten/jaloezieen/2.jpg';
import screens from '../assets/stock/screens.jpg';
import garagedeur from '../assets/stock/garagedeur.jpg';
export const fotos = { knikarmscherm, binnen, screens, garagedeur };

const eigen = import.meta.glob<{ default: ImageMetadata }>('../assets/producten/*/*.jpg', { eager: true });
export interface ProductFoto { src: ImageMetadata; alt: string }

// Alle foto's van een product, hoofdfoto eerst. Geen eigen foto's: dan het stockbeeld, als dat er is.
export const productFotos = (p: { slug: string; foto?: keyof typeof fotos; fotoAlt?: string }): ProductFoto[] => {
  const nummer = (pad: string) => parseInt(pad.split('/').at(-1)!, 10);
  const lijst = Object.entries(eigen)
    .filter(([pad]) => pad.split('/').at(-2) === p.slug)
    .sort(([a], [b]) => nummer(a) - nummer(b))
    .map(([, m], i) => ({ src: m.default, alt: fotoAlts[p.slug]?.[i] ?? '' }));
  if (lijst.length) return lijst;
  return p.foto ? [{ src: fotos[p.foto], alt: p.fotoAlt ?? '' }] : [];
};
