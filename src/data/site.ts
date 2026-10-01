// Bedrijfsgegevens, bevestigd door Michael op 1 oktober 2026 (bron: zbnridderkerk.nl en het Google-profiel).
export const site = {
  naam: 'Zonweringsbedrijf Noordenweg',
  kort: 'ZBN Ridderkerk',
  rechtsvorm: 'vof',
  straat: 'Noordenweg 71a',
  postcode: '2984 AG',
  plaats: 'Ridderkerk',
  tel: '0180 430 211',
  telHref: 'tel:+31180430211',
  mail: 'info@zbnridderkerk.nl',
  kvk: '24249059',
  maps: 'https://www.google.com/maps/dir/?api=1&destination=Noordenweg+71a,+2984+AG+Ridderkerk',
  reviewsUrl: 'https://www.google.com/maps/search/?api=1&query=ZBN+Zonwering+Noordenweg+71a+Ridderkerk',
  mapsEmbed: 'https://www.google.com/maps?q=Noordenweg+71a,+2984+AG+Ridderkerk&z=15&hl=nl&output=embed',
  google: { score: '4,7', aantal: 12 },
  themeColor: '#22433a',
  // Zolang de site nog niet op het eigen domein staat: niet indexeren.
  preview: import.meta.env.PUBLIC_PREVIEW === '1',
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

// Waar ZBN voor staat, letterlijk uit de welkomstekst van de oude site. Geen cijfers of garanties verzonnen.
export const usps = [
  'Alles op maat gemaakt',
  'Bijna alles in eigen bedrijf geassembleerd',
  'Montage door onze eigen monteurs',
  'Showroom en inmeten aan huis',
];

export const merken = 'Doek van Swela, Dickson, Tibelly en Sattler. Motoren en bediening van Somfy en Geiger. Raamdecoratie van Velux.';

export interface Product {
  slug: string;
  naam: string;
  kort: string;          // een regel in het overzicht
  intro: string;         // eerste alinea op de productpagina
  tekst: string[];       // overige alinea's
  punten: string[];      // waar u op kunt rekenen / opties; de eerste drie staan ook in het overzicht
  foto?: 'hero' | 'luifel' | 'binnen' | 'knikarm';
  fotoAlt?: string;
}

// Teksten door Sitefront geschreven, algemeen gehouden: geen verzonnen specificaties, garanties of prijzen.
export const producten: Product[] = [
  {
    slug: 'knikarmschermen', naam: 'Knikarmschermen', kort: 'Schaduw op het terras, zonder palen in de weg.',
    intro: 'Een knikarmscherm vouwt vanuit een cassette aan de gevel open boven uw terras. Er staan geen palen in de weg, dus u gebruikt het hele terras.',
    tekst: [
      'U kiest de breedte en de uitval op maat voor uw gevel. Het doek komt in veel kleuren en dessins, van effen tot de klassieke streep. Het frame leveren we in een kleur die bij de kozijnen past.',
      'De meeste klanten kiezen voor elektrische bediening met afstandsbediening. Een wind- en zonsensor kan het scherm zelf in- en uitdraaien. Handbediening met een slinger blijft mogelijk.',
    ],
    punten: ['Open, halfopen of gesloten cassette', 'Doek in veel kleuren en dessins', 'Elektrisch met afstandsbediening of met slinger', 'Optioneel: wind- en zonsensor, verlichting', 'Inmeten en montage door onze eigen monteurs'],
    foto: 'hero', fotoAlt: 'Groot uitgeschoven knikarmscherm met verlichting boven een terras met tafel en ligbedden',
  },
  {
    slug: 'uitvalschermen', naam: 'Uitvalschermen', kort: 'Zon buiten het raam houden, uitzicht behouden.',
    intro: 'Een uitvalscherm hangt boven het raam en kantelt naar buiten. De zon blijft buiten, maar u houdt zicht naar buiten en de kamer blijft koel.',
    tekst: [
      'Uitvalschermen passen goed bij woningen met meerdere ramen naast of boven elkaar. Ze vallen rustig in de gevel en zijn ook geschikt voor hogere verdiepingen.',
      'U kiest de uitvalhoek, de doekkleur en de bediening. Elektrisch kan per raam of in groepen tegelijk.',
    ],
    punten: ['Per raam op maat', 'Houdt warmte buiten, zicht naar buiten blijft', 'Handbediening of elektrisch', 'Doek afgestemd op de rest van de gevel'],
  },
  {
    slug: 'markiezen', naam: 'Markiezen', kort: 'Klassiek, met een gebogen vorm die bij veel woningen past.',
    intro: 'De markies is de klassieke zonwering: een gebogen doek boven het raam, met de kenmerkende volant. Mooi bij jaren-dertigwoningen, maar ook bij nieuwbouw een rustig beeld.',
    tekst: [
      'Markiezen maken we op maat, zodat het model precies in de gevel past. U kiest het doek en de kleur van het frame. De volant kunt u recht of geschulpt laten maken.',
      'Een markies bedient u met een koord of elektrisch. Voor bedrijfspanden of winkels is een markies met opdruk mogelijk.',
    ],
    punten: ['Vorm en maat afgestemd op de gevel', 'Rechte of geschulpte volant', 'Koordbediening of elektrisch', 'Ook voor winkels en bedrijfspanden'],
    foto: 'luifel', fotoAlt: 'Rood-wit gestreepte markies boven een raam in een gele houten gevel',
  },
  {
    slug: 'screens', naam: 'Screens', kort: 'Strak, verticaal doek dat warmte buiten houdt en uitzicht doorlaat.',
    intro: 'Een screen is een verticaal doek voor het raam. Het houdt het grootste deel van de warmte buiten, terwijl u naar buiten blijft kijken. Overdag kijkt niemand naar binnen.',
    tekst: [
      'Screens passen bij moderne woningen en bij grote glaspartijen. De cassette bouwen we zo veel mogelijk weg in of tegen het kozijn.',
      'Met ritsscreens zit het doek vast in de zijgeleiders. Dat scheelt wapperen bij wind en houdt insecten buiten. Bediening is meestal elektrisch, ook met zonsensor.',
    ],
    punten: ['Ritsscreens: doek vast in de geleiders, ook bij wind', 'Doek in verschillende openheidsgraden', 'Elektrisch, ook met zon- en windsensor', 'Cassette weggewerkt in of op het kozijn'],
  },
  {
    slug: 'serrezonwering', naam: 'Serrezonwering', kort: 'Voor glazen daken, veranda\'s en serres.',
    intro: 'Een serre of glazen overkapping wordt snel warm. Serrezonwering legt een doek over of onder het glas, zodat u er ook op warme dagen kunt zitten.',
    tekst: [
      'We meten de dakvlakken in en maken de zonwering passend, ook bij schuine of samengestelde daken. Bovendaks houdt de warmte het best buiten; onderdaks is een optie als het dak zelf niet belast mag worden.',
      'Bediening is vrijwel altijd elektrisch. Een zonsensor laat het doek automatisch uitrollen als de zon erop staat.',
    ],
    punten: ['Boven- of onderdaks', 'Op maat voor elk dakvlak', 'Elektrisch, optioneel met zonsensor', 'Ook voor veranda\'s en overkappingen'],
  },
  {
    slug: 'rolluiken', naam: 'Rolluiken', kort: 'Isoleren, verduisteren en beveiligen in een.',
    intro: 'Rolluiken doen drie dingen tegelijk: ze houden in de zomer de warmte buiten, in de winter de warmte binnen, en dicht geven ze inbrekers geen kans.',
    tekst: [
      'We leveren rolluiken op maat voor ramen en deuren, in een kleur die bij de gevel past. De kast kan in beeld of weggewerkt worden.',
      'Elektrische bediening is standaard. Een rolluik met zonnepaneel heeft geen bekabeling nodig: handig bij bestaande woningen. Ook een tijdklok of koppeling aan een app is mogelijk.',
    ],
    punten: ['Isolerend en verduisterend', 'Inbraakwerend', 'Elektrisch, ook op zonne-energie zonder kabels', 'Kast in beeld of weggewerkt', 'In veel kleuren leverbaar'],
  },
  {
    slug: 'terrasoverkappingen', naam: 'Terrasoverkappingen', kort: 'Buiten zitten, ook als het regent.',
    intro: 'Met een terrasoverkapping gebruikt u uw terras het hele jaar. Een dak van glas of polycarbonaat houdt regen tegen en laat licht door.',
    tekst: [
      'We meten de overkapping in op uw situatie: aan de gevel of vrijstaand, met of zonder zijwanden. U kiest de kleur van het frame en het dakmateriaal.',
      'Combineer de overkapping met zonwering onder of boven het dak, met verlichting of met schuifwanden. Dan heeft u een buitenkamer.',
    ],
    punten: ['Dak van glas of polycarbonaat', 'Aan de gevel of vrijstaand', 'Te combineren met zonwering, verlichting en zijwanden', 'Frame in een kleur naar keuze'],
    foto: 'knikarm', fotoAlt: 'Lichte overkapping tegen een blauwe lucht met een palmboom en struiken ervoor',
  },
  {
    slug: 'garagedeuren', naam: 'Garagedeuren', kort: 'Sectionaaldeuren op maat, met of zonder motor.',
    intro: 'Een sectionaaldeur gaat recht omhoog en schuift onder het plafond. Daardoor kunt u tot vlak voor de deur parkeren, binnen en buiten.',
    tekst: [
      'We leveren garagedeuren op maat, geïsoleerd en in een kleur of houtlook die bij de woning past. Een loopdeur in de garagedeur of ramen zijn mogelijk.',
      'Met een motor opent u de deur met de afstandsbediening vanuit de auto. Bestaande deuren kunnen vaak worden vervangen zonder aanpassingen aan de opening.',
    ],
    punten: ['Sectionaaldeur, geïsoleerd', 'Op maat voor de bestaande opening', 'Elektrisch met afstandsbediening', 'Kleur of houtlook naar keuze', 'Optioneel: loopdeur, ramen'],
  },
  {
    slug: 'horren', naam: 'Horren en hordeuren', kort: 'Ramen en deuren open, insecten buiten.',
    intro: 'Horren maken we op maat voor elk raam en elke deur. Zo kunt u in de zomer lekker ventileren zonder muggen en vliegen in huis.',
    tekst: [
      'Voor ramen zijn er inzethorren, rolhorren en plisséhorren. Voor deuren schuif-, draai- en plisséhordeuren. Welke past, hangt af van het kozijn en hoe vaak u de deur gebruikt.',
      'De profielen leveren we in een kleur die bij het kozijn past. Monteren doen we zelf, ook bij draai-kiepramen en schuifpuien.',
    ],
    punten: ['Inzet-, rol- en plisséhorren voor ramen', 'Schuif-, draai- en plisséhordeuren', 'Profiel in de kleur van het kozijn', 'Ook voor schuifpuien en draai-kiepramen'],
  },
  {
    slug: 'raamdecoratie', naam: 'Raamdecoratie', kort: 'Jaloezieën, rolgordijnen, plissé, shutters en meer.',
    intro: 'Voor binnen leveren we raamdecoratie op maat: jaloezieën, rolgordijnen, vouwgordijnen, plissé en duo plissé, paneelgordijnen, lamellen, Perfectfit, shutters en raamdecoratie voor Velux-dakramen.',
    tekst: [
      'In de showroom ziet u stalen van alle stoffen en materialen, zodat u kleuren naast uw eigen inrichting kunt leggen. We adviseren over lichtdoorlatend of verduisterend, over bediening en over wat praktisch is in een keuken of badkamer.',
      'Alles wordt op maat gemaakt en door ons gemonteerd. Perfectfit klemt zonder boren in het kozijn, handig bij kunststof kozijnen en huurwoningen.',
    ],
    punten: ['Jaloezieën in hout en aluminium', 'Rolgordijnen, vouwgordijnen en paneelgordijnen', 'Plissé en duo plissé, ook voor dakramen', 'Lamellen, Perfectfit en shutters', 'Lichtdoorlatend of verduisterend, elektrisch mogelijk'],
    foto: 'binnen', fotoAlt: 'Lichte bank met kussens voor een erker met witte jaloezieën en gordijnen',
  },
];

export const offerteOpties = [...producten.map((p) => p.naam), 'Reparatie of onderhoud', 'Iets anders'];

// Google-reviews, letterlijk overgenomen (aangeleverd door Michael). Alleen 5-sterren met tekst.
export const reviews = [
  { naam: 'Barbara ten Wolde', wanneer: 'een jaar geleden', tekst: 'ZBN heeft bij mij een zonneluifel geplaatst. Vriendelijk en ze weten wat ze doen. Zeer vakkundig en werkten heel netjes. Alles in overleg. Ook in de winkel goede uitleg. Prijs aantrekkelijk. Komen afspraken na. Prima bedrijf dus!' },
  { naam: 'Mahmut A', wanneer: '4 weken geleden', tekst: 'Zeer tevreden! Onlangs zonwering laten plaatsen en ik ben zeer tevreden over het hele proces. Vanaf het eerste contact was de communicatie duidelijk en vriendelijk. De montage is netjes en vakkundig uitgevoerd en alles is keurig afgewerkt. De zonwering ziet er mooi uit en werkt perfect. Zeker een aanrader!' },
  { naam: 'Arjan Sterenborg', wanneer: '4 jaar geleden', tekst: 'Goede ervaring met het zonnescherm, gaan de rolluiken ook door ZBN laten doen. Update, ook de rolluiken perfect voor elkaar kan het iedereen aanraden, rolluiken met zonnepaneeltje, geen kabels meer nodig alleen afstandsbediening. Top!' },
  { naam: 'W. L.', wanneer: '2 jaar geleden', tekst: 'Zonwering en rolluiken laten plaatsen paar jaar geleden. Probleem wat er helaas was ontstaan netjes door ZBN opgelost terwijl fabrikant niet thuis gaf. Prima opgelost, een tevreden klant.' },
  { naam: 'Leo Mastenbroek', wanneer: '2 jaar geleden', tekst: 'Netjes geholpen aan de informatie die ik nodig had' },
  { naam: 'Richard Bremen', wanneer: '3 jaar geleden', tekst: 'Goed geholpen daarna inmeten en besteld.' },
  { naam: 'Ronald van Herk', wanneer: '5 jaar geleden', tekst: 'Goed geadviseerd en geholpen.' },
  { naam: 'Bert Voorthuijzen', wanneer: '4 jaar geleden', tekst: 'Zijn goed geholpen' },
];
