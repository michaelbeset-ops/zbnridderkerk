// Inhoud per productpagina: voordelen, varianten, bediening, doeken en kleuren, veelgestelde vragen.
// Teksten door Sitefront geschreven en algemeen gehouden: geen prijzen, garanties of technische specificaties.
// Merken alleen die op de oude site van ZBN staan. Wat ZBN nog moet bevestigen staat als [[AANLEVEREN: ...]].

export type Icoon = 'zon' | 'schild' | 'oog' | 'wind' | 'thermo' | 'regen' | 'kleur' | 'maat' | 'motor' | 'stil' | 'licht' | 'huis';

export interface Voordeel { icoon: Icoon; kop: string; tekst: string }
export interface Variant { naam: string; tekst: string }
export interface Bediening { naam: string; tekst: string; beschikbaar: boolean }
export interface Doek { kop: string; tekst: string; stalen: { naam: string; kleur: string }[]; merken: string }
export interface Vraag { vraag: string; antwoord: string }
export interface Details { voordelen: Voordeel[]; varianten: Variant[]; bediening: Bediening[]; doek: Doek; vragen: Vraag[]; verwant: string[] }

// Bedieningsopties die bij de meeste buitenzonwering horen. Per product zet je aan wat van toepassing is.
const bediening = (opties: { hand?: boolean; motor?: boolean; app?: boolean; sensor?: boolean }): Bediening[] => [
  { naam: 'Handmatig', tekst: 'Met een slinger, koord of band. Eenvoudig en zonder stroom.', beschikbaar: opties.hand ?? false },
  { naam: 'Elektrisch met afstandsbediening', tekst: 'Een motor van Somfy of Geiger, bediend met een handzender of wandschakelaar.', beschikbaar: opties.motor ?? false },
  { naam: 'Somfy-app', tekst: 'Bedien de zonwering met uw telefoon, ook als u niet thuis bent, en stel tijden in.', beschikbaar: opties.app ?? false },
  { naam: 'Zon- en windsensor', tekst: 'De zonwering gaat zelf uit bij zon en zelf in bij harde wind.', beschikbaar: opties.sensor ?? false },
];

// Voorbeeldkleuren van zonweringsdoek. In de showroom liggen de echte stalen.
const doekStalen = [
  { naam: 'Ecru', kleur: '#e9e2d0' }, { naam: 'Zand', kleur: '#cdbb97' }, { naam: 'Taupe', kleur: '#8d8273' }, { naam: 'Grijs', kleur: '#9a9a96' },
  { naam: 'Antraciet', kleur: '#4a4c4e' }, { naam: 'Bordeaux', kleur: '#6e2a35' }, { naam: 'Groen', kleur: '#3f5a46' }, { naam: 'Blauw', kleur: '#2f4a6b' },
];
const screenStalen = [
  { naam: 'Wit', kleur: '#eeeeea' }, { naam: 'Lichtgrijs', kleur: '#c4c6c3' }, { naam: 'Grijs', kleur: '#8c8e8b' }, { naam: 'Antraciet', kleur: '#4a4c4e' },
  { naam: 'Zwart', kleur: '#242526' }, { naam: 'Brons', kleur: '#6b5a48' },
];
const lamelStalen = [
  { naam: 'Wit', kleur: '#f1f1ee' }, { naam: 'Crème', kleur: '#e8e1cd' }, { naam: 'Lichtgrijs', kleur: '#bfc2c0' }, { naam: 'Zilver', kleur: '#a7a9a6' },
  { naam: 'Antraciet', kleur: '#3f4245' }, { naam: 'Zwart', kleur: '#242526' }, { naam: 'Bruin', kleur: '#5b4634' },
];
const doekMerken = 'Doek van Swela, Dickson, Tibelly en Sattler. Motoren en bediening van Somfy en Geiger.';

export const details: Record<string, Details> = {
  knikarmschermen: {
    voordelen: [
      { icoon: 'zon', kop: 'Schaduw op het hele terras', tekst: 'Geen palen in de weg: het scherm hangt aan de gevel en vouwt boven het terras open.' },
      { icoon: 'thermo', kop: 'Koeler in huis', tekst: 'De zon blijft van het glas, dus de kamer achter het terras warmt minder op.' },
      { icoon: 'maat', kop: 'Op maat voor uw gevel', tekst: 'Breedte en uitval kiest u zelf, tot aan de maten die de constructie toelaat.' },
      { icoon: 'motor', kop: 'Comfortabel te bedienen', tekst: 'Met afstandsbediening, app of automatisch op zon en wind.' },
    ],
    varianten: [
      { naam: 'Open scherm', tekst: 'Het doek en de armen blijven zichtbaar als het scherm is ingerold. De eenvoudigste uitvoering.' },
      { naam: 'Halfopen cassette', tekst: 'Een kap beschermt het opgerolde doek tegen regen en vuil, de armen blijven zichtbaar.' },
      { naam: 'Gesloten cassette', tekst: 'Doek en armen zitten ingerold volledig in een gesloten kast. Het strakste beeld en de beste bescherming.' },
      { naam: 'Met verlichting', tekst: 'Ledverlichting in de cassette of in de armen, zodat u ook in de avond buiten zit.' },
    ],
    bediening: bediening({ hand: true, motor: true, app: true, sensor: true }),
    doek: { kop: 'Doek in veel kleuren en dessins', tekst: 'Van effen tot de klassieke streep. Het doek is waterafstotend en kleurvast. Het frame leveren we in een kleur die bij de kozijnen past.', stalen: doekStalen, merken: doekMerken },
    vragen: [
      { vraag: 'Hoe ver kan een knikarmscherm uitvallen?', antwoord: 'Dat hangt af van de breedte en de constructie van de gevel. Bij het inmeten bekijken we wat op uw terras mogelijk is en adviseren we een maat die goed in verhouding staat.' },
      { vraag: 'Mag het scherm uit blijven staan bij wind?', antwoord: 'Bij harde wind rolt u het scherm in. Met een windsensor gebeurt dat automatisch, ook als u niet thuis bent.' },
      { vraag: 'Kan ik het scherm bedienen met mijn telefoon?', antwoord: 'Ja, met een motor van Somfy en de bijbehorende app. We stellen dit bij de montage voor u in.' },
      { vraag: 'Hoe lang duurt de montage?', antwoord: 'Een knikarmscherm plaatsen onze monteurs meestal op een dag. We spreken de datum met u af nadat het scherm in onze werkplaats is gemaakt.' },
    ],
    verwant: ['uitvalschermen', 'terrasoverkappingen', 'screens'],
  },
  uitvalschermen: {
    voordelen: [
      { icoon: 'oog', kop: 'Zicht naar buiten blijft', tekst: 'Het doek kantelt naar buiten, dus u kijkt er onderdoor naar buiten.' },
      { icoon: 'thermo', kop: 'Warmte buiten het glas', tekst: 'De zon wordt tegengehouden voordat hij het raam raakt.' },
      { icoon: 'huis', kop: 'Rustig gevelbeeld', tekst: 'Past bij woningen met meerdere ramen naast of boven elkaar.' },
      { icoon: 'maat', kop: 'Per raam op maat', tekst: 'Elke maat en elke verdieping, ook bij hoge gevels.' },
    ],
    varianten: [
      { naam: 'Standaard uitvalscherm', tekst: 'Het doek valt vanuit een cassette boven het raam naar buiten, met armen aan de zijkant.' },
      { naam: 'Uitvalscherm met cassette', tekst: 'Het doek zit ingerold volledig in een gesloten kast.' },
      { naam: 'Combinatie met screen', tekst: 'Een screen dat eerst recht naar beneden loopt en daarna uitvalt. Twee standen in een product.' },
    ],
    bediening: bediening({ hand: true, motor: true, app: true, sensor: true }),
    doek: { kop: 'Doek afgestemd op de gevel', tekst: 'Kies een kleur die bij de kozijnen en de rest van de zonwering past, effen of gestreept.', stalen: doekStalen, merken: doekMerken },
    vragen: [
      { vraag: 'Wat is het verschil met een knikarmscherm?', antwoord: 'Een uitvalscherm hangt boven een raam en kantelt naar buiten. Een knikarmscherm hangt boven een terras en vouwt horizontaal open. Voor ramen is een uitvalscherm meestal de betere keuze.' },
      { vraag: 'Kan het ook op de eerste verdieping?', antwoord: 'Ja. Uitvalschermen worden vaak op hogere verdiepingen geplaatst. Dan kiest u voor elektrische bediening.' },
      { vraag: 'Kunnen meerdere schermen tegelijk bediend worden?', antwoord: 'Ja, elektrische schermen kunt u per raam of in groepen bedienen.' },
    ],
    verwant: ['knikarmschermen', 'screens', 'markiezen'],
  },
  markiezen: {
    voordelen: [
      { icoon: 'huis', kop: 'Klassieke uitstraling', tekst: 'De gebogen vorm en de volant passen bij jarendertigwoningen en bij karakteristieke panden.' },
      { icoon: 'zon', kop: 'Zon buiten, licht binnen', tekst: 'Het doek houdt de zon van het glas, maar de kamer blijft licht.' },
      { icoon: 'maat', kop: 'Op maat gemaakt', tekst: 'De vorm en de maat stemmen we af op het raam en de gevel.' },
      { icoon: 'kleur', kop: 'Doek en volant naar keuze', tekst: 'Rechte of geschulpte volant, effen of gestreept doek.' },
    ],
    varianten: [
      { naam: 'Standaard markies', tekst: 'Het klassieke model met gebogen doek en volant.' },
      { naam: 'Markies met cassette', tekst: 'Ingeklapt zit het doek beschermd in een kast boven het raam.' },
      { naam: 'Winkelmarkies', tekst: 'Voor winkels en bedrijfspanden, eventueel met opdruk van naam of logo.' },
    ],
    bediening: bediening({ hand: true, motor: true, app: true, sensor: false }),
    doek: { kop: 'Doek en volant', tekst: 'De volant kunt u recht of geschulpt laten maken. Het doek is er in veel kleuren en in de klassieke streep.', stalen: doekStalen, merken: doekMerken },
    vragen: [
      { vraag: 'Past een markies ook bij een moderne woning?', antwoord: 'Ja, in een effen kleur en met een rechte volant geeft een markies ook bij nieuwbouw een rustig beeld.' },
      { vraag: 'Kan ik een markies elektrisch laten bedienen?', antwoord: 'Ja, met een motor en afstandsbediening. Handbediening met een koord blijft ook mogelijk.' },
      { vraag: 'Is opdruk mogelijk?', antwoord: 'Voor winkels en bedrijven kunnen we een naam of logo op het doek of de volant laten drukken.' },
    ],
    verwant: ['uitvalschermen', 'knikarmschermen', 'raamdecoratie'],
  },
  screens: {
    voordelen: [
      { icoon: 'thermo', kop: 'Houdt de warmte buiten', tekst: 'Het doek stopt het grootste deel van de zonnewarmte voordat die het glas raakt.' },
      { icoon: 'oog', kop: 'Uitzicht blijft', tekst: 'Van binnen kijkt u naar buiten, van buiten kijkt overdag niemand naar binnen.' },
      { icoon: 'wind', kop: 'Windvast met ritsscreens', tekst: 'Het doek zit vast in de zijgeleiders, dus geen wapperen en geen insecten.' },
      { icoon: 'huis', kop: 'Strak in de gevel', tekst: 'De cassette werken we zo veel mogelijk weg in of tegen het kozijn.' },
    ],
    varianten: [
      { naam: 'Ritsscreen', tekst: 'Het doek loopt met een rits in de zijgeleiders. Blijft strak staan bij wind en houdt insecten buiten.' },
      { naam: 'Screen met geleiders', tekst: 'Het doek loopt vrij tussen twee geleiders. Een eenvoudigere uitvoering.' },
      { naam: 'Solar screen', tekst: 'Met een zonnepaneel op de cassette, zodat er geen bekabeling door de gevel hoeft.' },
    ],
    bediening: bediening({ hand: false, motor: true, app: true, sensor: true }),
    doek: { kop: 'Screendoek in verschillende openheden', tekst: 'Hoe dichter het doek, hoe meer warmte en inkijk het tegenhoudt en hoe minder u naar buiten kijkt. We adviseren per raam wat past.', stalen: screenStalen, merken: doekMerken },
    vragen: [
      { vraag: 'Kijk ik door een screen nog naar buiten?', antwoord: 'Ja. Screendoek is een gaasweefsel. Overdag kijkt u naar buiten en kijkt niemand naar binnen. In de avond, met licht aan, is dat andersom.' },
      { vraag: 'Wat is het verschil tussen een screen en een rolluik?', antwoord: 'Een screen houdt warmte en inkijk tegen maar laat licht en zicht door. Een rolluik sluit het raam helemaal af, isoleert en beveiligt.' },
      { vraag: 'Werken screens ook bij wind?', antwoord: 'Ritsscreens blijven strak staan bij wind omdat het doek in de geleiders zit. Bij storm rolt u ze in, met een windsensor gebeurt dat vanzelf.' },
    ],
    verwant: ['rolluiken', 'uitvalschermen', 'knikarmschermen'],
  },
  rolluiken: {
    voordelen: [
      { icoon: 'thermo', kop: 'Isoleert zomer en winter', tekst: 'Dicht houdt het rolluik warmte buiten in de zomer en binnen in de winter.' },
      { icoon: 'schild', kop: 'Beveiligt het raam', tekst: 'Een gesloten rolluik maakt het inbrekers lastig.' },
      { icoon: 'stil', kop: 'Verduistert en dempt geluid', tekst: 'Donker slapen en minder geluid van buiten.' },
      { icoon: 'motor', kop: 'Ook zonder kabels', tekst: 'Met een zonnepaneel heeft het rolluik geen stroomaansluiting nodig.' },
    ],
    varianten: [
      { naam: 'Opbouwrolluik', tekst: 'De kast zit zichtbaar boven het raam. Geschikt voor bestaande woningen.' },
      { naam: 'Inbouwrolluik', tekst: 'De kast is weggewerkt in de gevel of boven het kozijn. Voor nieuwbouw en verbouwing.' },
      { naam: 'Solar rolluik', tekst: 'Met zonnepaneel en accu, dus geen bekabeling door de muur.' },
      { naam: 'Rolluik voor deuren', tekst: 'Voor schuifpuien en garagedeuren, met een loopdeur of doorgang.' },
    ],
    bediening: bediening({ hand: true, motor: true, app: true, sensor: true }),
    doek: { kop: 'Kleuren van lamellen en kast', tekst: 'De lamellen en de kast leveren we in kleuren die bij de gevel en de kozijnen passen.', stalen: lamelStalen, merken: 'Motoren en bediening van Somfy en Geiger. [[AANLEVEREN: merken rolluiken]]' },
    vragen: [
      { vraag: 'Hoeveel scheelt een rolluik in de temperatuur?', antwoord: 'Dat hangt af van het raam, de oriëntatie en de isolatie van de woning. Een gesloten rolluik houdt in elk geval de directe zon helemaal van het glas.' },
      { vraag: 'Moet er een stroomkabel naar het rolluik?', antwoord: 'Bij een elektrisch rolluik wel, tenzij u kiest voor een solar rolluik met zonnepaneel en accu.' },
      { vraag: 'Kan ik het rolluik op tijden laten sluiten?', antwoord: 'Ja, met een tijdklok of via de Somfy-app. Handig als u op vakantie bent.' },
    ],
    verwant: ['screens', 'garagedeuren', 'binnenzonwering'],
  },
  terrasoverkappingen: {
    voordelen: [
      { icoon: 'regen', kop: 'Droog buiten zitten', tekst: 'Een dak van glas of polycarbonaat houdt de regen tegen en laat het licht door.' },
      { icoon: 'zon', kop: 'Te combineren met zonwering', tekst: 'Een doek onder of boven het dak houdt de warmte op zonnige dagen tegen.' },
      { icoon: 'licht', kop: 'Een buitenkamer', tekst: 'Met verlichting en zijwanden gebruikt u het terras het hele jaar.' },
      { icoon: 'maat', kop: 'Op maat, aan de gevel of vrijstaand', tekst: 'We meten de overkapping in op uw situatie.' },
    ],
    varianten: [
      { naam: 'Aan de gevel', tekst: 'De overkapping steunt aan de ene kant op de gevel en aan de andere kant op palen.' },
      { naam: 'Vrijstaand', tekst: 'Op vier of meer palen, los van de woning. Voor plekken verderop in de tuin.' },
      { naam: 'Met zijwanden', tekst: 'Glazen schuifwanden of screens aan de zijkanten tegen wind en inkijk.' },
    ],
    bediening: bediening({ hand: false, motor: true, app: true, sensor: true }),
    doek: { kop: 'Dak, frame en zonwering', tekst: 'Het dak is van helder of getint glas of van polycarbonaat. Het frame leveren we in een kleur naar keuze. Voor de zonwering eronder of erboven kiest u een doek.', stalen: doekStalen, merken: doekMerken + ' [[AANLEVEREN: merken overkappingen]]' },
    vragen: [
      { vraag: 'Heb ik een vergunning nodig?', antwoord: 'Dat hangt af van de gemeente, de maat en de plek. Vaak is een overkapping aan de achterzijde vergunningsvrij. We adviseren u hierover, de aanvraag regelt u zelf.' },
      { vraag: 'Glas of polycarbonaat?', antwoord: 'Glas is helder en oogt luxer, polycarbonaat is lichter en voordeliger. In de showroom ziet u beide.' },
      { vraag: 'Wordt het onder de overkapping niet te warm?', antwoord: 'Met zonwering onder of boven het dak blijft het aangenaam. Die kunt u automatisch op de zon laten reageren.' },
    ],
    verwant: ['knikarmschermen', 'screens', 'rolluiken'],
  },
  garagedeuren: {
    voordelen: [
      { icoon: 'maat', kop: 'Ruimte voor en achter de deur', tekst: 'Een sectionaaldeur gaat recht omhoog, dus u parkeert tot vlak voor de deur.' },
      { icoon: 'thermo', kop: 'Geïsoleerd', tekst: 'De panelen zijn geïsoleerd, dus de garage blijft koeler in de zomer en warmer in de winter.' },
      { icoon: 'schild', kop: 'Veilig en stevig', tekst: 'Een gesloten sectionaaldeur is lastig te forceren.' },
      { icoon: 'motor', kop: 'Open vanuit de auto', tekst: 'Met een motor en afstandsbediening hoeft u niet uit te stappen.' },
    ],
    varianten: [
      { naam: 'Sectionaaldeur', tekst: 'Panelen die recht omhoog schuiven en onder het plafond liggen.' },
      { naam: 'Met loopdeur', tekst: 'Een gewone deur in de garagedeur, zodat u niet de hele deur hoeft te openen.' },
      { naam: 'Met ramen', tekst: 'Een rij ramen in het bovenste paneel voor daglicht in de garage.' },
    ],
    bediening: bediening({ hand: true, motor: true, app: true, sensor: false }),
    doek: { kop: 'Kleur of houtlook', tekst: 'De panelen leveren we in een effen kleur of in een houtlook, glad of met profiel.', stalen: lamelStalen, merken: '[[AANLEVEREN: merken garagedeuren]]' },
    vragen: [
      { vraag: 'Past een sectionaaldeur in mijn bestaande opening?', antwoord: 'Meestal wel. We meten de opening in en maken de deur op maat.' },
      { vraag: 'Kan de deur ook met de hand open bij een stroomstoring?', antwoord: 'Ja, een elektrische deur heeft een noodontgrendeling.' },
      { vraag: 'Hoeveel ruimte is er boven de opening nodig?', antwoord: 'Dat hangt af van het type deur. Bij het inmeten bekijken we of de ruimte voldoende is en welk type past.' },
    ],
    verwant: ['rolluiken', 'terrasoverkappingen', 'screens'],
  },
  raamdecoratie: {
    voordelen: [
      { icoon: 'licht', kop: 'Licht naar wens', tekst: 'Lichtdoorlatend, lichtdempend of verduisterend, per kamer.' },
      { icoon: 'oog', kop: 'Privacy', tekst: 'Overdag en in de avond zelf bepalen wie naar binnen kijkt.' },
      { icoon: 'kleur', kop: 'Stoffen en materialen', tekst: 'Van hout en aluminium tot stof, in kleuren die bij uw inrichting passen.' },
      { icoon: 'maat', kop: 'Op maat gemaakt', tekst: 'Voor elk raam, ook erkers, schuine ramen en dakramen.' },
    ],
    varianten: [
      { naam: 'Jaloezieën', tekst: 'Lamellen van hout of aluminium die u kantelt voor licht en privacy.' },
      { naam: 'Rolgordijnen', tekst: 'Een strak doek dat oprolt, lichtdoorlatend of verduisterend.' },
      { naam: 'Vouwgordijnen', tekst: 'Stof die in vlakke plooien omhoog vouwt. Zachter dan een rolgordijn.' },
      { naam: 'Paneelgordijnen en lamellen', tekst: 'Voor grote ramen en schuifpuien.' },
      { naam: 'Shutters', tekst: 'Houten luiken aan de binnenkant met kantelbare lamellen.' },
      { naam: 'Velux-raamdecoratie', tekst: 'Rolgordijnen en plissés die passen in dakramen van Velux.' },
    ],
    bediening: [
      { naam: 'Handmatig', tekst: 'Met koord, ketting of handgreep.', beschikbaar: true },
      { naam: 'Elektrisch met afstandsbediening', tekst: 'Een stille motor, handig bij hoge of moeilijk bereikbare ramen.', beschikbaar: true },
      { naam: 'Somfy-app', tekst: 'Bedien de raamdecoratie met uw telefoon en stel tijden in.', beschikbaar: true },
      { naam: 'Zon- en windsensor', tekst: 'Niet van toepassing bij binnenzonwering.', beschikbaar: false },
    ],
    doek: { kop: 'Stoffen en kleuren', tekst: 'In de showroom liggen stalenboeken van alle stoffen en materialen. Neem gerust een kussen of een stukje behang mee om kleuren naast elkaar te leggen.', stalen: [{ naam: 'Wit', kleur: '#f3f2ee' }, { naam: 'Linnen', kleur: '#dcd3c0' }, { naam: 'Zand', kleur: '#c9b79a' }, { naam: 'Taupe', kleur: '#948878' }, { naam: 'Grijs', kleur: '#9b9c99' }, { naam: 'Antraciet', kleur: '#4b4d4f' }, { naam: 'Olijf', kleur: '#6f7a5a' }, { naam: 'Nachtblauw', kleur: '#2d3a55' }], merken: 'Raamdecoratie van Velux. [[AANLEVEREN: overige merken raamdecoratie]]' },
    vragen: [
      { vraag: 'Wat is het beste voor een slaapkamer?', antwoord: 'Verduisterende rolgordijnen of vouwgordijnen, eventueel in combinatie met een rolluik aan de buitenkant.' },
      { vraag: 'Kan raamdecoratie in een vochtige ruimte?', antwoord: 'Ja, voor keuken en badkamer zijn er vochtbestendige materialen zoals aluminium jaloezieën en kunststof.' },
      { vraag: 'Komen jullie thuis inmeten?', antwoord: 'Ja. We meten elk raam in, zodat de raamdecoratie precies past.' },
    ],
    verwant: ['binnenzonwering', 'rolluiken', 'screens'],
  },
  binnenzonwering: {
    voordelen: [
      { icoon: 'licht', kop: 'Licht en privacy in een', tekst: 'Met duo plissé combineert u een lichtdoorlatend en een verduisterend doek.' },
      { icoon: 'maat', kop: 'Zonder boren', tekst: 'Perfectfit klemt in het kozijn, ideaal bij kunststof kozijnen en huurwoningen.' },
      { icoon: 'huis', kop: 'Strak in het kozijn', tekst: 'Het systeem volgt het raam, ook bij draai-kiepramen.' },
      { icoon: 'kleur', kop: 'Veel stoffen', tekst: 'Van transparant tot verduisterend, in veel kleuren.' },
    ],
    varianten: [
      { naam: 'Plissé', tekst: 'Een gevouwen stof die compact opvouwt. Lichtdoorlatend of verduisterend.' },
      { naam: 'Duo plissé', tekst: 'Twee stoffen in een systeem: overdag licht, in de avond privacy.' },
      { naam: 'Perfectfit', tekst: 'Een slank frame dat zonder boren in het kozijn klemt, met plissé, rolgordijn of jaloezie erin.' },
      { naam: 'Dakraamplissé', tekst: 'Plissés die passen in Velux-dakramen en op hun plek blijven bij een schuin raam.' },
    ],
    bediening: [
      { naam: 'Handmatig', tekst: 'Met een handgreep of koord, boven en onder bedienbaar.', beschikbaar: true },
      { naam: 'Elektrisch met afstandsbediening', tekst: 'Een stille motor, handig bij hoge ramen en dakramen.', beschikbaar: true },
      { naam: 'Somfy-app', tekst: 'Bedien de binnenzonwering met uw telefoon.', beschikbaar: true },
      { naam: 'Zon- en windsensor', tekst: 'Niet van toepassing bij binnenzonwering.', beschikbaar: false },
    ],
    doek: { kop: 'Stoffen en kleuren', tekst: 'Transparant, lichtdoorlatend, lichtdempend of verduisterend. In de showroom ziet u alle stalen.', stalen: [{ naam: 'Wit', kleur: '#f3f2ee' }, { naam: 'Crème', kleur: '#e8e1cd' }, { naam: 'Zand', kleur: '#c9b79a' }, { naam: 'Lichtgrijs', kleur: '#c4c6c3' }, { naam: 'Grijs', kleur: '#8c8e8b' }, { naam: 'Antraciet', kleur: '#4b4d4f' }], merken: 'Raamdecoratie van Velux. [[AANLEVEREN: merken binnenzonwering]]' },
    vragen: [
      { vraag: 'Wat is het verschil tussen plissé en duo plissé?', antwoord: 'Een plissé heeft een stof. Een duo plissé heeft twee stoffen in een systeem, bijvoorbeeld een lichtdoorlatende en een verduisterende, die u apart kunt bedienen.' },
      { vraag: 'Kan Perfectfit op elk kozijn?', antwoord: 'Perfectfit klemt in de rubbers van kunststof en aluminium kozijnen. Bij houten kozijnen bekijken we wat past.' },
      { vraag: 'Blijft het op zijn plek bij een kiepraam?', antwoord: 'Ja, Perfectfit en plissés met spandraden volgen het raam als u het kiept.' },
    ],
    verwant: ['raamdecoratie', 'screens', 'rolluiken'],
  },
};
