// Feiten van zbnridderkerk.nl (welkomstekst en productoverzicht, pagina's uit 2011/2012) en het Google-profiel
// (4,7 uit 5, 12 reviews). Showroomtijden staan letterlijk in de welkomstekst. KvK-nummer onbekend.
export const site = {
  naam: 'Zonwerings Bedrijf Noordenweg',
  kort: 'ZBN Ridderkerk',
  straat: 'Noordenweg 71a',
  postcode: '2984 AG',
  plaats: 'Ridderkerk',
  tel: '0180 430 211',
  telHref: 'tel:+31180430211',
  mail: 'info@zbnridderkerk.nl',
  maps: 'https://www.google.com/maps/search/?api=1&query=ZBN+Zonwering+Noordenweg+71a+Ridderkerk',
  google: { score: '4,7', aantal: 12 },
  themeColor: '#22433a',
  voorstel: import.meta.env.PUBLIC_VOORSTEL === '1',
};
export const url = (p = '') => `${import.meta.env.BASE_URL.replace(/\/$/, '')}/${p.replace(/^\//, '')}`;

// Showroom. dag = getDay() in JavaScript (0 = zondag).
export const tijden = [
  { dag: 1, naam: 'Maandag', open: '12.30 tot 16.30' },
  { dag: 2, naam: 'Dinsdag', open: '8.30 tot 16.30' },
  { dag: 3, naam: 'Woensdag', open: '8.30 tot 16.30' },
  { dag: 4, naam: 'Donderdag', open: '8.30 tot 16.30' },
  { dag: 5, naam: 'Vrijdag', open: '8.30 tot 16.30' },
  { dag: 6, naam: 'Zaterdag', open: '9.30 tot 12.30' },
  { dag: 0, naam: 'Zondag', open: '' },
];

export const buiten = [
  'Knikarmschermen', 'Uitvalschermen', 'Glijarmschermen', 'Markiezen', 'Screens', 'Serrezonwering',
  'Rolluiken', 'Terrasoverkappingen', 'Garagedeuren', 'Horren en hordeuren',
];
export const binnen = [
  'Jaloezieën', 'Rolgordijnen', 'Prestige rolgordijnen', 'Vouwgordijnen', 'Plissé', 'Duo plissé',
  'Paneelgordijnen', 'Lamellen', 'Perfectfit', 'Shutters', 'Velux raamdecoratie',
];
// Productgroepen zoals op hun productpagina, voor het offerteformulier.
export const groepen = [
  'Rolluiken', 'Knikarmschermen', 'Screens', 'Markiezen', 'Uitvalschermen', 'Garagedeuren',
  'Raamdecoratie', 'Binnenzonwering', 'Terrasoverkappingen', 'Reparatie of onderhoud', 'Iets anders',
];
