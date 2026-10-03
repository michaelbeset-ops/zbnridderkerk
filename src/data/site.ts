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
  mail: 'zonwering@zbnridderkerk.nl',
  kvk: '24249059',
  maps: 'https://www.google.com/maps/dir/?api=1&destination=Noordenweg+71a,+2984+AG+Ridderkerk',
  reviewsUrl: 'https://www.google.com/maps/search/?api=1&query=ZBN+Zonwering+Noordenweg+71a+Ridderkerk',
  mapsEmbed: 'https://www.google.com/maps?q=Noordenweg+71a,+2984+AG+Ridderkerk&z=15&hl=nl&output=embed',
  google: { score: '4,7', aantal: 12 },
  themeColor: '#3b4a47',
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
  'Maatwerk',
  'Eigen montage',
  'Eigen showroom in Ridderkerk',
  'Bijna alles zelf geassembleerd',
];

export const merken = 'Doek van Swela, Dickson, Tibelly en Sattler. Motoren en bediening van Somfy en Geiger. Raamdecoratie van Velux.';

export type Categorie = 'buiten' | 'binnen';

export interface Product {
  slug: string;
  naam: string;
  categorie: Categorie;
  kort: string;          // een regel in het overzicht
  intro: string;         // eerste alinea op de productpagina
  tekst: string[];       // overige alinea's
  punten: string[];      // waar u op kunt rekenen / opties; de eerste drie staan ook in het overzicht
  foto?: keyof typeof import('../components/Fotos').fotos;
  fotoAlt?: string;
}

// De twee categorieën met een eigen pagina. De tegel op de homepage gebruikt de foto.
export const categorieen = [
  { slug: 'buitenzonwering', naam: 'Buitenzonwering', categorie: 'buiten' as Categorie, foto: 'knikarmscherm' as const,
    kort: 'Zonwering aan de gevel, rolluiken, poorten, deuren en overkappingen.',
    intro: 'Alles wat aan de buitenkant van de woning de zon, de regen en ongewenste blikken tegenhoudt. Op maat gemaakt, bijna alles uit onze eigen werkplaats, en geplaatst door onze eigen monteurs.',
    fotoAlt: 'Antracietgrijs knikarmscherm met licht doek boven een terras aan een bakstenen woning' },
  { slug: 'binnenzonwering', naam: 'Binnenzonwering', categorie: 'binnen' as Categorie, foto: 'binnen' as const,
    kort: 'Raamdecoratie voor licht, privacy en sfeer, plus horren.',
    intro: 'Alles voor aan de binnenkant van het raam: van jaloezieën en rolgordijnen tot shutters en horren. In de showroom legt u de stalen naast uw eigen inrichting, daarna meten we elk raam in.',
    fotoAlt: 'Lichte bank met kussens voor een erker met witte jaloezieën en gordijnen' },
];

// Teksten door Sitefront geschreven, algemeen gehouden: geen verzonnen specificaties, garanties of prijzen.
// Volgorde per categorie is de volgorde op de site. Productlijst aangeleverd door Michael op 3 oktober 2026.
export const producten: Product[] = [
  // Buiten
  {
    slug: 'knikarmschermen', naam: 'Knikarmschermen', categorie: 'buiten', kort: 'Schaduw op het terras, zonder palen in de weg.',
    intro: 'Een knikarmscherm vouwt vanuit een cassette aan de gevel open boven uw terras. Er staan geen palen in de weg, dus u gebruikt het hele terras.',
    tekst: [
      'U kiest de breedte en de uitval op maat voor uw gevel. Het doek komt in veel kleuren en dessins, van effen tot de klassieke streep. Het frame leveren we in een kleur die bij de kozijnen past.',
      'De meeste klanten kiezen voor elektrische bediening met afstandsbediening. Een wind- en zonsensor kan het scherm zelf in- en uitdraaien. Handbediening met een slinger blijft mogelijk.',
    ],
    punten: ['Open, halfopen of gesloten cassette', 'Doek in veel kleuren en dessins', 'Elektrisch met afstandsbediening of met slinger', 'Optioneel: wind- en zonsensor, verlichting', 'Inmeten en montage door onze eigen monteurs'],
    foto: 'knikarmscherm', fotoAlt: 'Antracietgrijs knikarmscherm met licht doek boven een terras aan een bakstenen woning',
  },
  {
    slug: 'uitvalschermen', naam: 'Uitvalschermen', categorie: 'buiten', kort: 'Zon buiten het raam houden, uitzicht behouden.',
    intro: 'Een uitvalscherm hangt boven het raam en kantelt naar buiten. De zon blijft buiten, maar u houdt zicht naar buiten en de kamer blijft koel.',
    tekst: [
      'Uitvalschermen passen goed bij woningen met meerdere ramen naast of boven elkaar. Ze vallen rustig in de gevel en zijn ook geschikt voor hogere verdiepingen.',
      'U kiest de uitvalhoek, de doekkleur en de bediening. Elektrisch kan per raam of in groepen tegelijk.',
    ],
    punten: ['Per raam op maat', 'Houdt warmte buiten, zicht naar buiten blijft', 'Handbediening of elektrisch', 'Doek afgestemd op de rest van de gevel'],
    foto: 'uitvalscherm', fotoAlt: 'Lichtgrijs uitvalscherm schuin naar buiten boven een raam van een bakstenen woning',
  },
  {
    slug: 'rolluiken', naam: 'Rolluiken', categorie: 'buiten', kort: 'Isoleren, verduisteren en beveiligen in een.',
    intro: 'Rolluiken doen drie dingen tegelijk: ze houden in de zomer de warmte buiten, in de winter de warmte binnen, en dicht geven ze inbrekers geen kans.',
    tekst: [
      'We leveren rolluiken op maat voor ramen en deuren, in een kleur die bij de gevel past. De kast kan in beeld of weggewerkt worden.',
      'Elektrische bediening is standaard. Een rolluik met zonnepaneel heeft geen bekabeling nodig: handig bij bestaande woningen. Ook een tijdklok of koppeling aan een app is mogelijk.',
    ],
    punten: ['Isolerend en verduisterend', 'Inbraakwerend', 'Elektrisch, ook op zonne-energie zonder kabels', 'Kast in beeld of weggewerkt', 'In veel kleuren leverbaar'],
    foto: 'rolluiken', fotoAlt: 'Antracietgrijze rolluiken op de ramen van een bakstenen woning, een rolluik half gesloten',
  },
  {
    slug: 'screens', naam: 'Screens', categorie: 'buiten', kort: 'Verticaal doek dat warmte buiten houdt en uitzicht doorlaat.',
    intro: 'Een screen is een verticaal doek voor het raam. Het houdt het grootste deel van de warmte buiten, terwijl u naar buiten blijft kijken. Overdag kijkt niemand naar binnen.',
    tekst: [
      'Screens passen bij moderne woningen en bij grote glaspartijen. De cassette bouwen we zo veel mogelijk weg in of tegen het kozijn.',
      'Het doek loopt tussen twee zijgeleiders. Wilt u dat het doek ook bij wind strak blijft staan, kijk dan naar zipscreens. Bediening is meestal elektrisch, ook met zonsensor.',
    ],
    punten: ['Doek in verschillende openheidsgraden', 'Elektrisch, ook met zon- en windsensor', 'Cassette weggewerkt in of op het kozijn', 'Ook voor grote glaspartijen'],
    foto: 'screens', fotoAlt: 'Donkergrijze screens half neergelaten voor grote ramen van een moderne witte woning',
  },
  {
    slug: 'zipscreens', naam: 'Zipscreens', categorie: 'buiten', kort: 'Screens met het doek vast in de geleiders, ook bij wind.',
    intro: 'Bij een zipscreen zit het doek met een rits vast in de zijgeleiders. Het blijft strak staan bij wind, wappert niet en houdt insecten buiten.',
    tekst: [
      'Zipscreens zijn de meest gekozen screens voor grote ramen en schuifpuien, omdat ze ook bij een stevige bries uit kunnen blijven. Met het doek omlaag ontstaat een gesloten vlak zonder kieren aan de zijkant.',
      'U kiest de openheid van het doek, de kleur van de cassette en de geleiders, en de bediening. Vrijwel altijd elektrisch, eventueel met een zon- en windsensor.',
    ],
    punten: ['Doek vast in de geleiders, geen wapperen', 'Houdt insecten buiten', 'Elektrisch, ook met zon- en windsensor', 'Ook voor grote ramen en schuifpuien'],
    foto: 'zipscreens', fotoAlt: 'Antracietgrijze zipscreens half neergelaten voor de schuifpui van een moderne bakstenen woning',
  },
  {
    slug: 'serrezonwering', naam: 'Serrezonwering', categorie: 'buiten', kort: 'Doek boven het glazen dak van een serre of tuinkamer.',
    intro: 'Een glazen dak laat veel licht door, maar ook veel warmte. Serrezonwering spant een doek boven of onder het glas, zodat het in de serre aangenaam blijft.',
    tekst: [
      'Het doek loopt in geleiders over de lengte van het dak en kan in delen worden ingedeeld bij grote serres. Boven het glas houdt het de warmte buiten voordat die binnenkomt; onder het glas is de montage soms eenvoudiger.',
      'Serrezonwering is vrijwel altijd elektrisch. Met een zonsensor gaat het doek zelf uit als de zon erop staat en met een windsensor zelf in bij harde wind.',
    ],
    punten: ['Boven of onder het glas', 'Op maat voor elke dakvorm', 'Elektrisch, ook met zon- en windsensor', 'Doek in veel kleuren en openheden'],
    foto: 'serrezonwering', fotoAlt: 'Beige doek over het glazen dak van een serre aan een bakstenen woning',
  },
  {
    slug: 'pergolazonwering', naam: 'Pergolazonwering', categorie: 'buiten', kort: 'Een scherm op palen, voor grote terrassen en veel wind.',
    intro: 'Een pergolazonwering is een zonnescherm dat aan de voorkant op palen steunt. Daardoor kan het doek veel verder uitvallen dan een knikarmscherm en blijft het ook bij wind strak staan.',
    tekst: [
      'Het doek loopt in geleiders en wordt onderweg gesteund, dus ook een groot terras is in een keer overdekt. Zijschermen of screens tussen de palen maken er een beschutte plek van.',
      'U kiest de maat, de kleur van het frame en het doek. Bediening is elektrisch, eventueel met zon- en windsensor en verlichting.',
    ],
    punten: ['Grote uitval, gesteund op palen', 'Blijft strak bij wind', 'Te combineren met zijschermen en verlichting', 'Elektrisch, ook met zon- en windsensor'],
    foto: 'pergola', fotoAlt: 'Antracietgrijze pergolazonwering op twee palen boven een terras met loungebank aan een bakstenen woning',
  },
  {
    slug: 'rolpoorten', naam: 'Rolpoorten', categorie: 'buiten', kort: 'Een oprolbare poort voor garage, berging of bedrijfspand.',
    intro: 'Een rolpoort rolt op in een kast boven de opening en neemt binnen geen ruimte in. Geschikt voor garages, bergingen, carports en bedrijfspanden.',
    tekst: [
      'De poort bestaat uit stevige aluminium lamellen en loopt in geleiders aan de zijkant. Dicht is de opening volledig afgesloten, open ziet u er bijna niets van.',
      'We maken de rolpoort op maat voor de bestaande opening, in een kleur die bij het pand past. Elektrische bediening met afstandsbediening is standaard.',
    ],
    punten: ['Neemt binnen geen ruimte in', 'Stevige aluminium lamellen', 'Op maat voor de bestaande opening', 'Elektrisch met afstandsbediening'],
  },
  {
    slug: 'garagedeuren', naam: 'Garagedeuren', categorie: 'buiten', kort: 'Sectionaaldeuren op maat, met of zonder motor.',
    intro: 'Een sectionaaldeur gaat recht omhoog en schuift onder het plafond. Daardoor kunt u tot vlak voor de deur parkeren, binnen en buiten.',
    tekst: [
      'We leveren garagedeuren op maat, geïsoleerd en in een kleur of houtlook die bij de woning past. Een loopdeur in de garagedeur of ramen zijn mogelijk.',
      'Met een motor opent u de deur met de afstandsbediening vanuit de auto. Bestaande deuren kunnen vaak worden vervangen zonder aanpassingen aan de opening.',
    ],
    punten: ['Sectionaaldeur, geïsoleerd', 'Op maat voor de bestaande opening', 'Elektrisch met afstandsbediening', 'Kleur of houtlook naar keuze', 'Optioneel: loopdeur, ramen'],
    foto: 'garagedeur', fotoAlt: 'Antracietgrijze sectionaaldeur in een bakstenen woning met bestrate oprit',
  },
  {
    slug: 'overkappingen', naam: 'Overkappingen', categorie: 'buiten', kort: 'Buiten zitten, ook als het regent.',
    intro: 'Met een terrasoverkapping gebruikt u uw terras het hele jaar. Een dak van glas of polycarbonaat houdt regen tegen en laat licht door.',
    tekst: [
      'We meten de overkapping in op uw situatie: aan de gevel of vrijstaand, met of zonder zijwanden. U kiest de kleur van het frame en het dakmateriaal.',
      'Combineer de overkapping met zonwering onder of boven het dak, met verlichting of met schuifwanden. Dan heeft u een buitenkamer.',
    ],
    punten: ['Dak van glas of polycarbonaat', 'Aan de gevel of vrijstaand', 'Te combineren met zonwering, verlichting en zijwanden', 'Frame in een kleur naar keuze'],
    foto: 'overkapping', fotoAlt: 'Antracietgrijze terrasoverkapping met glazen dak aan een bakstenen woning, met loungebank eronder',
  },
  // Binnen
  {
    slug: 'jaloezieen', naam: 'Jaloezieën', categorie: 'binnen', kort: 'Kantelbare lamellen van hout of aluminium.',
    intro: 'Met jaloezieën bepaalt u per moment hoeveel licht en inkijk u wilt: lamellen kantelen, optrekken of helemaal sluiten.',
    tekst: [
      'Houten jaloezieën geven warmte aan een kamer, aluminium jaloezieën zijn slank en geschikt voor keuken en badkamer. De lamellen zijn er in verschillende breedtes en veel kleuren.',
      'We maken ze op maat voor elk raam, ook in een erker of voor een schuifpui. Bediening met koord of ketting, of elektrisch.',
    ],
    punten: ['Hout of aluminium', 'Lamellen in verschillende breedtes', 'Ook voor keuken en badkamer', 'Handmatig of elektrisch'],
    foto: 'jaloezie', fotoAlt: 'Lichte woonkamer met witte houten jaloezieën voor hoge ramen',
  },
  {
    slug: 'rolgordijnen', naam: 'Rolgordijnen', categorie: 'binnen', kort: 'Een strak doek, lichtdoorlatend of verduisterend.',
    intro: 'Een rolgordijn is de eenvoudigste raamdecoratie: een doek dat van een buis afrolt, in een stof die bij de kamer past.',
    tekst: [
      'Kies per kamer de stof: transparant voor de woonkamer, lichtdempend voor een werkkamer of verduisterend voor de slaapkamer. Er zijn honderden kleuren en dessins.',
      'Het rolgordijn kan in het kozijn of op de muur, met een open buis of in een cassette. Bediening met ketting of elektrisch.',
    ],
    punten: ['Transparant tot verduisterend', 'Honderden stoffen en kleuren', 'In het kozijn of op de muur', 'Handmatig of elektrisch'],
  },
  {
    slug: 'plissegordijnen', naam: 'Plisségordijnen', categorie: 'binnen', kort: 'Gevouwen stof die compact opvouwt, ook voor lastige ramen.',
    intro: 'Een plisségordijn is een stof in vouwen die u van boven en van onder kunt bedienen. Zo laat u licht boven binnen en houdt u inkijk beneden tegen.',
    tekst: [
      'Plissés zijn er in lichtdoorlatende en verduisterende stoffen, ook in een isolerende uitvoering. Ze passen in bijna elk raam, ook schuine ramen, dakramen en draai-kiepramen.',
      'Met spandraden blijft het plissé op zijn plek als u het raam kiept. Bediening met handgreep, koord of elektrisch.',
    ],
    punten: ['Van boven en onder te bedienen', 'Ook voor schuine ramen en dakramen', 'Lichtdoorlatend, verduisterend of isolerend', 'Blijft op zijn plek bij kiepramen'],
  },
  {
    slug: 'lamelgordijnen', naam: 'Lamelgordijnen', categorie: 'binnen', kort: 'Verticale lamellen voor grote ramen en schuifpuien.',
    intro: 'Lamelgordijnen zijn verticale stroken stof die u kantelt en opzij schuift. Ideaal voor brede ramen en schuifpuien, ook in kantoren en praktijkruimtes.',
    tekst: [
      'De lamellen zijn er in verschillende breedtes en in stoffen van transparant tot verduisterend. Gekanteld laten ze licht door zonder inkijk, opzij geschoven is het raam helemaal vrij.',
      'U kiest hoe het gordijn opent: naar een kant, naar twee kanten of vanuit het midden. Bediening met koord en ketting of elektrisch.',
    ],
    punten: ['Voor brede ramen en schuifpuien', 'Kantelen en opzij schuiven', 'Verschillende lamelbreedtes', 'Handmatig of elektrisch'],
  },
  {
    slug: 'smart-fit', naam: 'Smart-fit', categorie: 'binnen', kort: 'Raamdecoratie in een slank frame, zonder boren.',
    intro: 'Smart-fit is een slank frame dat in het kozijn klemt, zonder boren of schroeven. In het frame zit een plissé, rolgordijn of jaloezie die het raam precies volgt.',
    tekst: [
      'Omdat het frame op het raam zelf zit, beweegt de raamdecoratie mee als u het raam opent of kiept. Er is geen koord nodig en er blijft niets hangen.',
      'Handig bij kunststof en aluminium kozijnen, bij draai-kiepramen en in huurwoningen. In de showroom ziet u de stoffen en de bediening. [[AANLEVEREN: controle omschrijving Smart-fit]]',
    ],
    punten: ['Zonder boren in het kozijn', 'Beweegt mee met het raam', 'Met plissé, rolgordijn of jaloezie', 'Ook voor draai-kiepramen'],
  },
  {
    slug: 'duo-rolgordijnen', naam: 'Duo rolgordijnen', categorie: 'binnen', kort: 'Twee banen stof die u precies op elkaar afstemt.',
    intro: 'Een duo rolgordijn heeft twee lagen stof met afwisselend open en dichte banen. Schuift u de banen over elkaar, dan heeft u licht of juist privacy, in elke stand daartussen.',
    tekst: [
      'Het effect is strakker dan een jaloezie en zachter dan een gewoon rolgordijn. De stoffen zijn er in veel kleuren, van transparant tot lichtdempend.',
      'Het duo rolgordijn kan in het kozijn of op de muur, met open buis of cassette. Bediening met ketting of elektrisch.',
    ],
    punten: ['Licht en privacy traploos instelbaar', 'Open en dichte banen in een stof', 'Veel kleuren', 'Handmatig of elektrisch'],
  },
  {
    slug: 'shutters', naam: 'Shutters', categorie: 'binnen', kort: 'Houten luiken met kantelbare lamellen, aan de binnenkant.',
    intro: 'Shutters zijn luiken van hout met kantelbare lamellen, aan de binnenkant van het raam. Ze geven een kamer karakter en werken als zonwering en als privacy in een.',
    tekst: [
      'Shutters maken we op maat voor elk raam: hoog, breed, rond of schuin. U kiest de breedte van de lamellen, de kleur of de houtkleur en hoe de panelen openen.',
      'De lamellen kantelt u met de hand of met een verborgen bediening. Shutters zijn ook geschikt voor vochtige ruimtes in een waterbestendige uitvoering.',
    ],
    punten: ['Op maat, ook voor ronde en schuine ramen', 'Lamelbreedte en kleur naar keuze', 'Zonwering en privacy in een', 'Ook voor badkamer en keuken'],
  },
  {
    slug: 'fractions', naam: 'Fractions', categorie: 'binnen', kort: 'Collectie raamdecoratie met een eigen, strakke uitstraling.',
    intro: 'Fractions is een collectie raamdecoratie die we in de showroom laten zien. [[AANLEVEREN: korte omschrijving van de Fractions-collectie: welke producten en wat het onderscheidt]]',
    tekst: [
      'Kom langs in de showroom aan de Noordenweg om de collectie in het echt te zien en stalen naast uw inrichting te leggen.',
      'Net als onze andere raamdecoratie meten we Fractions op maat in en monteren onze eigen monteurs het.',
    ],
    punten: ['Te zien in de showroom', 'Op maat ingemeten', 'Montage door eigen monteurs'],
  },
  {
    slug: 'hordeuren', naam: 'Hordeuren', categorie: 'binnen', kort: 'Deur open, insecten buiten.',
    intro: 'Met een hordeur laat u de tuindeur of schuifpui open zonder dat er muggen en vliegen binnenkomen.',
    tekst: [
      'Er zijn plissé-hordeuren die opzij vouwen, schuifhordeuren voor schuifpuien en scharnierende hordeuren met een dranger. Welke past, hangt af van de deur en de ruimte ernaast.',
      'We maken de hordeur op maat in een kleur die bij het kozijn past. Het gaas is er ook in een uitvoering voor huisdieren.',
    ],
    punten: ['Plissé, schuif of scharnierend', 'Op maat voor elke deur', 'Kleur passend bij het kozijn', 'Ook huisdierbestendig gaas'],
  },
  {
    slug: 'horren', naam: 'Horren', categorie: 'binnen', kort: 'Raamhorren op maat, vast, oprolbaar of plissé.',
    intro: 'Een hor voor het raam houdt insecten buiten en laat frisse lucht door. Vast, oprolbaar of als plissé, altijd op maat.',
    tekst: [
      'Een inzethor klemt in het kozijn en haalt u in de winter weg. Een rolhor rolt op in een kast boven het raam en ziet u alleen als u hem gebruikt. Een plisséhor vouwt opzij.',
      'Ook voor draai-kiepramen en dakramen is er een passende hor. We maken ze op maat in een kleur die bij het kozijn past.',
    ],
    punten: ['Inzethor, rolhor of plisséhor', 'Ook voor draai-kiep- en dakramen', 'Op maat gemaakt', 'Kleur passend bij het kozijn'],
  },
];

export const perCategorie = (c: Categorie) => producten.filter((p) => p.categorie === c);

export const offerteOpties = [
  { groep: 'Buiten', opties: perCategorie('buiten').map((p) => p.naam) },
  { groep: 'Binnen', opties: perCategorie('binnen').map((p) => p.naam) },
  { groep: 'Anders', opties: ['Reparatie of onderhoud', 'Weet ik nog niet'] },
];

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
