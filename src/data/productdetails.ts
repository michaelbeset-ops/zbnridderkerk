// Inhoud per productpagina: voordelen, varianten, bediening, doeken en kleuren, veelgestelde vragen.
// Teksten door Sitefront geschreven en algemeen gehouden: geen prijzen, garanties of technische specificaties.
// Merken alleen die op de oude site van ZBN staan. Wat ZBN nog moet bevestigen staat als [[AANLEVEREN: ...]].

export type Icoon = 'zon' | 'schild' | 'oog' | 'wind' | 'thermo' | 'regen' | 'kleur' | 'maat' | 'motor' | 'stil' | 'licht' | 'huis';

export interface Voordeel { icoon: Icoon; kop: string; tekst: string }
export interface Variant { naam: string; tekst: string }
export interface Bediening { naam: string; tekst: string; beschikbaar: boolean }
export interface Doek { kop: string; tekst: string; stalen: { naam: string; kleur: string }[]; merken: string }
export interface Vraag { vraag: string; antwoord: string }
export interface Details { voordelen: Voordeel[]; varianten: Variant[]; bediening?: Bediening[]; doek?: Doek; vragen: Vraag[]; verwant: string[] }

// Bedieningsopties die bij de meeste buitenzonwering horen. Per product zet je aan wat van toepassing is.
const bediening = (opties: { hand?: boolean; motor?: boolean; app?: boolean; sensor?: boolean }): Bediening[] => [
  { naam: 'Handmatig', tekst: 'Met een slinger, koord of band. Eenvoudig en zonder stroom.', beschikbaar: opties.hand ?? false },
  { naam: 'Elektrisch met afstandsbediening', tekst: 'Een motor van Somfy of Geiger, bediend met een handzender of wandschakelaar.', beschikbaar: opties.motor ?? false },
  { naam: 'Somfy-app', tekst: 'Bedien de zonwering met uw telefoon, ook als u niet thuis bent, en stel tijden in.', beschikbaar: opties.app ?? false },
  { naam: 'Zon- en windsensor', tekst: 'De zonwering gaat zelf uit bij zon en zelf in bij harde wind.', beschikbaar: opties.sensor ?? false },
];
// Bediening voor binnen: geen sensor, wel een stille motor.
const binnenBediening = (wat: string, hand = 'Met koord, ketting of handgreep.', motor = true): Bediening[] => [
  { naam: 'Handmatig', tekst: hand, beschikbaar: true },
  { naam: 'Elektrisch met afstandsbediening', tekst: 'Een stille motor, handig bij hoge of moeilijk bereikbare ramen.', beschikbaar: motor },
  { naam: 'Somfy-app', tekst: `Bedien ${wat} met uw telefoon en stel tijden in.`, beschikbaar: motor },
  { naam: 'Zon- en windsensor', tekst: 'Niet van toepassing bij binnenzonwering.', beschikbaar: false },
];

// Voorbeeldkleuren. In de showroom liggen de echte stalen.
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
const stofStalen = [
  { naam: 'Wit', kleur: '#f3f2ee' }, { naam: 'Linnen', kleur: '#dcd3c0' }, { naam: 'Zand', kleur: '#c9b79a' }, { naam: 'Taupe', kleur: '#948878' },
  { naam: 'Grijs', kleur: '#9b9c99' }, { naam: 'Antraciet', kleur: '#4b4d4f' }, { naam: 'Olijf', kleur: '#6f7a5a' }, { naam: 'Nachtblauw', kleur: '#2d3a55' },
];
const houtStalen = [
  { naam: 'Wit', kleur: '#f3f2ee' }, { naam: 'Crème', kleur: '#e8e1cd' }, { naam: 'Eiken', kleur: '#c4a06c' }, { naam: 'Noten', kleur: '#6e4b32' },
  { naam: 'Grijs', kleur: '#9b9c99' }, { naam: 'Antraciet', kleur: '#4b4d4f' },
];
const gaasStalen = [
  { naam: 'Wit', kleur: '#f1f1ee' }, { naam: 'Crème', kleur: '#e8e1cd' }, { naam: 'Grijs', kleur: '#a7a9a6' }, { naam: 'Antraciet', kleur: '#3f4245' }, { naam: 'Zwart', kleur: '#242526' },
];
const doekMerken = 'Doek van Swela, Dickson, Tibelly en Sattler. Motoren en bediening van Somfy en Geiger.';
const binnenMerken = 'Raamdecoratie van Velux en Fakro. [[AANLEVEREN: merken binnenzonwering]]';
const stoffen: Doek = { kop: 'Stoffen en kleuren', tekst: 'Transparant, lichtdoorlatend, lichtdempend of verduisterend. In de showroom liggen stalenboeken van alle stoffen; neem gerust een kussen of een stukje behang mee om kleuren naast elkaar te leggen.', stalen: stofStalen, merken: binnenMerken };

export const details: Record<string, Details> = {
  // Buiten
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
      { vraag: 'Hoe ver kan een knikarmscherm uitvallen?', antwoord: 'Dat hangt af van de breedte en de constructie van de gevel. Bij het inmeten bekijken we wat op uw terras mogelijk is en adviseren we een maat die goed in verhouding staat. Moet het doek verder uitvallen, kijk dan naar een pergolazonwering.' },
      { vraag: 'Mag het scherm uit blijven staan bij wind?', antwoord: 'Bij harde wind rolt u het scherm in. Met een windsensor gebeurt dat automatisch, ook als u niet thuis bent.' },
      { vraag: 'Kan ik het scherm bedienen met mijn telefoon?', antwoord: 'Ja, met een motor van Somfy en de bijbehorende app. We stellen dit bij de montage voor u in.' },
      { vraag: 'Hoe lang duurt de montage?', antwoord: 'Een knikarmscherm plaatsen onze monteurs meestal op een dag. We spreken de datum met u af zodra het scherm klaar is voor montage.' },
    ],
    verwant: ['pergolazonwering', 'uitvalschermen', 'overkappingen'],
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
    verwant: ['knikarmschermen', 'screens', 'rolluiken'],
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
      { naam: 'Rolluik voor deuren', tekst: 'Voor schuifpuien en tuindeuren. Voor een garage kijkt u naar een rolpoort.' },
    ],
    bediening: bediening({ hand: true, motor: true, app: true, sensor: true }),
    doek: { kop: 'Kleuren van lamellen en kast', tekst: 'De lamellen en de kast leveren we in kleuren die bij de gevel en de kozijnen passen.', stalen: lamelStalen, merken: 'Motoren en bediening van Somfy en Geiger. [[AANLEVEREN: merken rolluiken]]' },
    vragen: [
      { vraag: 'Hoeveel scheelt een rolluik in de temperatuur?', antwoord: 'Dat hangt af van het raam, de oriëntatie en de isolatie van de woning. Een gesloten rolluik houdt in elk geval de directe zon helemaal van het glas.' },
      { vraag: 'Moet er een stroomkabel naar het rolluik?', antwoord: 'Bij een elektrisch rolluik wel, tenzij u kiest voor een solar rolluik met zonnepaneel en accu.' },
      { vraag: 'Kan ik het rolluik op tijden laten sluiten?', antwoord: 'Ja, met een tijdklok of via de Somfy-app. Handig als u op vakantie bent.' },
    ],
    verwant: ['screens', 'rolpoorten', 'garagedeuren'],
  },
  screens: {
    voordelen: [
      { icoon: 'thermo', kop: 'Houdt de warmte buiten', tekst: 'Het doek stopt het grootste deel van de zonnewarmte voordat die het glas raakt.' },
      { icoon: 'oog', kop: 'Uitzicht blijft', tekst: 'Van binnen kijkt u naar buiten, van buiten kijkt overdag niemand naar binnen.' },
      { icoon: 'huis', kop: 'Strak in de gevel', tekst: 'De cassette werken we zo veel mogelijk weg in of tegen het kozijn.' },
      { icoon: 'motor', kop: 'Automatisch op de zon', tekst: 'Met een zonsensor gaat het screen zelf omlaag als de zon erop staat.' },
    ],
    varianten: [
      { naam: 'Screen met geleiders', tekst: 'Het doek loopt vrij tussen twee geleiders. De eenvoudigste uitvoering.' },
      { naam: 'Screen met cassette', tekst: 'Het opgerolde doek zit beschermd in een gesloten kast boven het raam.' },
      { naam: 'Solar screen', tekst: 'Met een zonnepaneel op de cassette, zodat er geen bekabeling door de gevel hoeft.' },
    ],
    bediening: bediening({ hand: false, motor: true, app: true, sensor: true }),
    doek: { kop: 'Screendoek in verschillende openheden', tekst: 'Hoe dichter het doek, hoe meer warmte en inkijk het tegenhoudt en hoe minder u naar buiten kijkt. We adviseren per raam wat past.', stalen: screenStalen, merken: doekMerken },
    vragen: [
      { vraag: 'Kijk ik door een screen nog naar buiten?', antwoord: 'Ja. Screendoek is een gaasweefsel. Overdag kijkt u naar buiten en kijkt niemand naar binnen. In de avond, met licht aan, is dat andersom.' },
      { vraag: 'Wat is het verschil met een zipscreen?', antwoord: 'Bij een zipscreen zit het doek met een rits vast in de geleiders. Het blijft daardoor strak staan bij wind en sluit aan de zijkant helemaal af. Bij een gewoon screen loopt het doek los tussen de geleiders.' },
      { vraag: 'Wat is het verschil tussen een screen en een rolluik?', antwoord: 'Een screen houdt warmte en inkijk tegen maar laat licht en zicht door. Een rolluik sluit het raam helemaal af, isoleert en beveiligt.' },
    ],
    verwant: ['zipscreens', 'rolluiken', 'uitvalschermen'],
  },
  zipscreens: {
    voordelen: [
      { icoon: 'wind', kop: 'Blijft strak bij wind', tekst: 'Het doek zit met een rits in de geleiders en kan niet wapperen.' },
      { icoon: 'thermo', kop: 'Houdt de warmte buiten', tekst: 'De zon wordt tegengehouden voordat hij het glas raakt.' },
      { icoon: 'schild', kop: 'Geen insecten', tekst: 'Het doek sluit aan de zijkanten af, dus muggen blijven buiten.' },
      { icoon: 'oog', kop: 'Uitzicht blijft', tekst: 'Overdag kijkt u naar buiten en kijkt niemand naar binnen.' },
    ],
    varianten: [
      { naam: 'Zipscreen met cassette', tekst: 'Het opgerolde doek zit beschermd in een gesloten kast, in of op het kozijn.' },
      { naam: 'Inbouw zipscreen', tekst: 'De cassette is weggewerkt in de gevel. Voor nieuwbouw en verbouwing.' },
      { naam: 'Solar zipscreen', tekst: 'Met een zonnepaneel op de cassette, zonder bekabeling door de gevel.' },
      { naam: 'Voor overkappingen', tekst: 'Als zijwand onder een overkapping of pergola, tegen wind, zon en inkijk.' },
    ],
    bediening: bediening({ hand: false, motor: true, app: true, sensor: true }),
    doek: { kop: 'Screendoek in verschillende openheden', tekst: 'Van bijna dicht tot behoorlijk open. Hoe dichter, hoe meer warmte het tegenhoudt. We adviseren per raam wat past.', stalen: screenStalen, merken: doekMerken },
    vragen: [
      { vraag: 'Tot welke windkracht kan een zipscreen uit blijven?', antwoord: 'Dat hangt af van de maat van het screen en de situatie. Omdat het doek in de geleiders zit, kan het aanzienlijk meer wind hebben dan een gewoon screen. Met een windsensor rolt het bij storm vanzelf in.' },
      { vraag: 'Kan een zipscreen ook voor een schuifpui?', antwoord: 'Ja. Zipscreens zijn juist geschikt voor grote ramen en schuifpuien. Bij het inmeten bekijken we de maximale maat voor uw situatie.' },
      { vraag: 'Houdt een zipscreen ook insecten buiten?', antwoord: 'Ja, met het doek omlaag sluit het screen aan de zijkanten en onderkant af. U kunt dan het raam open laten.' },
    ],
    verwant: ['screens', 'rolluiken', 'overkappingen'],
  },
  serrezonwering: {
    voordelen: [
      { icoon: 'thermo', kop: 'Koel onder glas', tekst: 'Het doek houdt de zon tegen voordat die het glazen dak raakt.' },
      { icoon: 'licht', kop: 'Licht blijft', tekst: 'U kiest een doek dat warmte tegenhoudt maar daglicht doorlaat.' },
      { icoon: 'maat', kop: 'Voor elke dakvorm', tekst: 'Recht, schuin of in delen: we meten het doek in op uw serre.' },
      { icoon: 'motor', kop: 'Automatisch op de zon', tekst: 'Met een zonsensor hoeft u er niet aan te denken.' },
    ],
    varianten: [
      { naam: 'Boven het glas', tekst: 'Het doek loopt over het dak en houdt de warmte buiten voordat die binnenkomt. Het meest effectief.' },
      { naam: 'Onder het glas', tekst: 'Het doek loopt aan de binnenkant onder het dak. Soms eenvoudiger te monteren en beschermd tegen weer.' },
      { naam: 'Verticaal voor de serre', tekst: 'Screens of zipscreens voor de staande glaswanden, als aanvulling op het dak.' },
    ],
    bediening: bediening({ hand: false, motor: true, app: true, sensor: true }),
    doek: { kop: 'Doek in veel kleuren en openheden', tekst: 'Een dicht doek houdt het meeste tegen, een open weefsel laat meer licht door. In de showroom ziet u het verschil.', stalen: doekStalen, merken: doekMerken },
    vragen: [
      { vraag: 'Boven of onder het glas?', antwoord: 'Boven het glas houdt de warmte het beste tegen. Onder het glas is het doek beschermd tegen weer en vuil. Bij het inmeten adviseren we wat bij uw serre past.' },
      { vraag: 'Kan het ook op een bestaande serre?', antwoord: 'Ja. We meten de serre in en maken het doek en de geleiders op maat.' },
      { vraag: 'Wat gebeurt er bij harde wind?', antwoord: 'Met een windsensor rolt het doek vanzelf in. Zonder sensor rolt u het zelf in met de afstandsbediening.' },
    ],
    verwant: ['zipscreens', 'overkappingen', 'pergolazonwering'],
  },
  pergolazonwering: {
    voordelen: [
      { icoon: 'maat', kop: 'Grote uitval', tekst: 'Gesteund op palen kan het doek veel verder uit dan een knikarmscherm.' },
      { icoon: 'wind', kop: 'Blijft strak bij wind', tekst: 'Het doek loopt in geleiders en wordt onderweg gesteund.' },
      { icoon: 'regen', kop: 'Ook bij een bui', tekst: 'Een waterafstotend doek op afschot laat lichte regen afstromen.' },
      { icoon: 'licht', kop: 'Een buitenkamer', tekst: 'Met zijschermen en verlichting zit u er ook in de avond.' },
    ],
    varianten: [
      { naam: 'Aan de gevel', tekst: 'De pergola steunt aan de ene kant op de gevel en aan de andere kant op palen.' },
      { naam: 'Vrijstaand', tekst: 'Op vier of meer palen, los van de woning.' },
      { naam: 'Met zijschermen', tekst: 'Zipscreens tussen de palen tegen wind, lage zon en inkijk.' },
      { naam: 'Met verlichting', tekst: 'Ledverlichting in het frame, dimbaar met de afstandsbediening.' },
    ],
    bediening: bediening({ hand: false, motor: true, app: true, sensor: true }),
    doek: { kop: 'Doek en frame', tekst: 'Het doek is er in veel kleuren, van effen tot gestreept. Het frame leveren we in een kleur die bij de woning past.', stalen: doekStalen, merken: doekMerken },
    vragen: [
      { vraag: 'Wat is het verschil met een knikarmscherm?', antwoord: 'Een knikarmscherm hangt vrij aan de gevel en is beperkt in uitval. Een pergolazonwering steunt op palen, kan daardoor veel verder uit en blijft ook bij wind strak staan.' },
      { vraag: 'Wat is het verschil met een overkapping?', antwoord: 'Een overkapping heeft een vast dak van glas of polycarbonaat. Bij een pergolazonwering rolt het doek weg, zodat u ook open lucht boven het terras heeft.' },
      { vraag: 'Heb ik een vergunning nodig?', antwoord: 'Dat hangt af van de gemeente, de maat en de plek. Vaak is een pergola aan de achterzijde vergunningsvrij. We adviseren u hierover, de aanvraag regelt u zelf.' },
    ],
    verwant: ['knikarmschermen', 'overkappingen', 'zipscreens'],
  },
  rolpoorten: {
    voordelen: [
      { icoon: 'maat', kop: 'Neemt geen ruimte in', tekst: 'De poort rolt op in een kast boven de opening, binnen blijft alles vrij.' },
      { icoon: 'schild', kop: 'Stevig en veilig', tekst: 'Aluminium lamellen in geleiders, dicht is de opening helemaal afgesloten.' },
      { icoon: 'huis', kop: 'Op maat voor het pand', tekst: 'Voor garages, bergingen, carports en bedrijfspanden.' },
      { icoon: 'motor', kop: 'Open vanuit de auto', tekst: 'Elektrisch met afstandsbediening, u hoeft niet uit te stappen.' },
    ],
    varianten: [
      { naam: 'Opbouw', tekst: 'De kast zit zichtbaar boven de opening. Geschikt voor bestaande gebouwen.' },
      { naam: 'Inbouw', tekst: 'De kast is weggewerkt in de gevel. Voor nieuwbouw en verbouwing.' },
      { naam: 'Met kijkvensters', tekst: 'Lamellen met vensters voor daglicht in de garage.' },
    ],
    bediening: bediening({ hand: true, motor: true, app: true, sensor: false }),
    doek: { kop: 'Kleuren van lamellen en kast', tekst: 'De lamellen, de kast en de geleiders leveren we in kleuren die bij de gevel passen.', stalen: lamelStalen, merken: '[[AANLEVEREN: merken rolpoorten]]' },
    vragen: [
      { vraag: 'Rolpoort of sectionaaldeur?', antwoord: 'Een rolpoort rolt op in een kast en laat het plafond vrij. Een sectionaaldeur schuift onder het plafond en is beter geïsoleerd. Welke past, hangt af van de ruimte en of de garage verwarmd is.' },
      { vraag: 'Kan de poort ook met de hand open bij een stroomstoring?', antwoord: 'Ja, een elektrische rolpoort heeft een noodbediening.' },
      { vraag: 'Past een rolpoort in mijn bestaande opening?', antwoord: 'Meestal wel. We meten de opening in en maken de poort op maat.' },
    ],
    verwant: ['garagedeuren', 'rolluiken', 'overkappingen'],
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
      { vraag: 'Hoeveel ruimte is er boven de opening nodig?', antwoord: 'Dat hangt af van het type deur. Is er weinig ruimte, dan is een rolpoort soms de betere keuze. Bij het inmeten bekijken we wat past.' },
    ],
    verwant: ['rolpoorten', 'rolluiken', 'overkappingen'],
  },
  overkappingen: {
    voordelen: [
      { icoon: 'regen', kop: 'Droog buiten zitten', tekst: 'Een dak van glas of polycarbonaat houdt de regen tegen en laat het licht door.' },
      { icoon: 'zon', kop: 'Te combineren met zonwering', tekst: 'Een doek onder of boven het dak houdt de warmte op zonnige dagen tegen.' },
      { icoon: 'licht', kop: 'Een buitenkamer', tekst: 'Met verlichting en zijwanden gebruikt u het terras het hele jaar.' },
      { icoon: 'maat', kop: 'Op maat, aan de gevel of vrijstaand', tekst: 'We meten de overkapping in op uw situatie.' },
    ],
    varianten: [
      { naam: 'Aan de gevel', tekst: 'De overkapping steunt aan de ene kant op de gevel en aan de andere kant op palen.' },
      { naam: 'Vrijstaand', tekst: 'Op vier of meer palen, los van de woning. Voor plekken verderop in de tuin.' },
      { naam: 'Met zijwanden', tekst: 'Glazen schuifwanden of zipscreens aan de zijkanten tegen wind en inkijk.' },
    ],
    bediening: bediening({ hand: false, motor: true, app: true, sensor: true }),
    doek: { kop: 'Dak, frame en zonwering', tekst: 'Het dak is van helder of getint glas of van polycarbonaat. Het frame leveren we in een kleur naar keuze. Voor de zonwering eronder of erboven kiest u een doek.', stalen: doekStalen, merken: doekMerken + ' [[AANLEVEREN: merken overkappingen]]' },
    vragen: [
      { vraag: 'Heb ik een vergunning nodig?', antwoord: 'Dat hangt af van de gemeente, de maat en de plek. Vaak is een overkapping aan de achterzijde vergunningsvrij. We adviseren u hierover, de aanvraag regelt u zelf.' },
      { vraag: 'Glas of polycarbonaat?', antwoord: 'Glas is helder en oogt luxer, polycarbonaat is lichter en voordeliger. In de showroom ziet u beide.' },
      { vraag: 'Wordt het onder de overkapping niet te warm?', antwoord: 'Met zonwering onder of boven het dak blijft het aangenaam. Die kunt u automatisch op de zon laten reageren.' },
    ],
    verwant: ['pergolazonwering', 'serrezonwering', 'zipscreens'],
  },
  markiezen: {
    voordelen: [
      { icoon: 'zon', kop: 'Zon buiten het raam', tekst: 'De kap klapt boven het raam uit en houdt de zon van het glas.' },
      { icoon: 'huis', kop: 'Klassiek gevelbeeld', tekst: 'Past bij karakteristieke woningen en winkelpuien.' },
      { icoon: 'maat', kop: 'Op maat', tekst: 'Voor elk raam, elke deur en elke etalage.' },
      { icoon: 'kleur', kop: 'Doek naar keuze', tekst: 'Effen of in de klassieke streep, passend bij de gevel.' },
    ],
    varianten: [
      { naam: 'Voor ramen', tekst: 'Een markies boven een raam, aan de voor- of achtergevel.' },
      { naam: 'Voor deuren en etalages', tekst: 'Boven een voordeur, winkeldeur of etalage.' },
    ],
    bediening: bediening({ hand: true, motor: true, app: true }),
    doek: { kop: 'Doek effen of gestreept', tekst: 'Kies een kleur die bij de kozijnen en de rest van de gevel past. Het frame leveren we in een passende kleur.', stalen: doekStalen, merken: doekMerken },
    vragen: [
      { vraag: 'Wat is het verschil met een uitvalscherm?', antwoord: 'Een markies heeft een gebogen kap die als geheel uitklapt. Een uitvalscherm is een plat doek dat schuin naar buiten kantelt. Een markies geeft een klassiek beeld, een uitvalscherm een strakker beeld.' },
      { vraag: 'Kan een markies boven een winkelpui?', antwoord: 'Ja. Markiezen worden veel boven etalages en winkeldeuren gebruikt. We meten de pui in en maken het scherm op maat.' },
      { vraag: 'Kan ik een markies in het echt zien?', antwoord: 'Ja, in de showroom aan de Noordenweg hangt een markies. Daar liggen ook de doekstalen.' },
    ],
    verwant: ['uitvalschermen', 'knikarmschermen', 'zonweringsdoek'],
  },
  motoren: {
    voordelen: [
      { icoon: 'motor', kop: 'Gemak', tekst: 'Een druk op de knop in plaats van slingeren of trekken.' },
      { icoon: 'wind', kop: 'Automatisch op het weer', tekst: 'Met een sensor gaat de zonwering uit bij zon en in bij harde wind.' },
      { icoon: 'huis', kop: 'Ook als u niet thuis bent', tekst: 'Met de Somfy-app bedient u alles op afstand en stelt u tijden in.' },
      { icoon: 'schild', kop: 'Minder kans op schade', tekst: 'Met een windsensor rolt het scherm bij harde wind vanzelf in.' },
    ],
    varianten: [
      { naam: 'Met afstandsbediening', tekst: 'Een handzender voor een product of voor een groep tegelijk.' },
      { naam: 'Met wandschakelaar', tekst: 'Een vaste schakelaar aan de muur, bijvoorbeeld naast de tuindeur.' },
      { naam: 'Met de Somfy-app', tekst: 'Bedien met uw telefoon en stel tijden in, ook als u niet thuis bent.' },
      { naam: 'Met zon- en windsensor', tekst: 'De zonwering reageert zelf op zon en wind.' },
    ],
    bediening: bediening({ motor: true, app: true, sensor: true }),
    vragen: [
      { vraag: 'Kan er een motor in mijn bestaande zonwering?', antwoord: 'Dat hangt af van het product en hoe het gemonteerd is. Neem contact op of kom langs in de showroom, dan bekijken we wat bij u kan.' },
      { vraag: 'Welke merken gebruiken jullie?', antwoord: 'We werken met motoren en bediening van Somfy en Geiger.' },
      { vraag: 'Is er stroom nodig bij het raam?', antwoord: 'Een motor heeft stroom nodig. Bij rolluiken en screens kan het ook met een zonnepaneel en accu, zonder bekabeling door de muur.' },
    ],
    verwant: ['knikarmschermen', 'rolluiken', 'screens'],
  },
  screendoek: {
    voordelen: [
      { icoon: 'thermo', kop: 'Houdt de warmte buiten', tekst: 'Het doek stopt de zon voordat die het glas raakt.' },
      { icoon: 'oog', kop: 'Uitzicht blijft', tekst: 'Overdag kijkt u naar buiten en kijkt niemand naar binnen.' },
      { icoon: 'licht', kop: 'Licht naar wens', tekst: 'Van open tot bijna dicht, per raam te kiezen.' },
      { icoon: 'kleur', kop: 'Veel kleuren', tekst: 'Van wit tot zwart, passend bij kozijnen en gevel.' },
    ],
    varianten: [
      { naam: 'Open weefsel', tekst: 'Meer licht en meer uitzicht, houdt minder warmte tegen.' },
      { naam: 'Dicht weefsel', tekst: 'Houdt meer warmte en inkijk tegen, minder uitzicht.' },
    ],
    doek: { kop: 'Kleuren en openheden', tekst: 'Hoe dichter het doek, hoe meer warmte en inkijk het tegenhoudt. We adviseren per raam wat past.', stalen: screenStalen, merken: doekMerken },
    vragen: [
      { vraag: 'Welke openheid moet ik kiezen?', antwoord: 'Dat hangt af van wat u belangrijker vindt: uitzicht of warmte en privacy tegenhouden. In de showroom ziet u het verschil en adviseren we u.' },
      { vraag: 'Kan alleen het doek van mijn screen vervangen worden?', antwoord: 'Dat hangt af van het screen en of er passend doek voor te krijgen is. Neem contact op of kom langs, dan bekijken we het.' },
    ],
    verwant: ['screens', 'zipscreens', 'zonweringsdoek'],
  },
  zonweringsdoek: {
    voordelen: [
      { icoon: 'kleur', kop: 'Veel kleuren en dessins', tekst: 'Effen of gestreept, van rustig tot opvallend.' },
      { icoon: 'zon', kop: 'Houdt de zon tegen', tekst: 'Een goed doek geeft schaduw en houdt de warmte buiten.' },
      { icoon: 'huis', kop: 'Bepaalt het gevelbeeld', tekst: 'Het doek is het eerste wat opvalt aan uw zonwering.' },
      { icoon: 'maat', kop: 'Voor elk scherm', tekst: 'Voor knikarmschermen, markiezen, uitvalschermen en pergola’s.' },
    ],
    varianten: [
      { naam: 'Effen', tekst: 'Een kleur over het hele doek. Rustig en tijdloos.' },
      { naam: 'Gestreept', tekst: 'De klassieke streep, in brede of smalle banen.' },
    ],
    doek: { kop: 'Doek in veel kleuren en dessins', tekst: 'In de showroom hangen de stalenboeken. Neem gerust een foto van uw gevel mee om kleuren te vergelijken.', stalen: doekStalen, merken: doekMerken },
    vragen: [
      { vraag: 'Kan alleen het doek van mijn zonnescherm vervangen worden?', antwoord: 'Dat hangt af van het scherm en of er passend doek voor te krijgen is. Neem contact op of kom langs, dan bekijken we het.' },
      { vraag: 'Hoe houd ik het doek mooi?', antwoord: 'Heeft u het scherm nat ingerold, rol het dan zo snel mogelijk weer uit zodat het doek kan drogen. Blad en vuil borstelt u droog af.' },
    ],
    verwant: ['knikarmschermen', 'markiezen', 'screendoek'],
  },
  // Binnen
  jaloezieen: {
    voordelen: [
      { icoon: 'licht', kop: 'Licht per moment', tekst: 'Kantel de lamellen voor precies de hoeveelheid licht die u wilt.' },
      { icoon: 'oog', kop: 'Privacy', tekst: 'Gekanteld kijkt niemand naar binnen, terwijl er licht blijft binnenkomen.' },
      { icoon: 'kleur', kop: 'Hout of aluminium', tekst: 'Warm hout voor de woonkamer, slank aluminium voor keuken en badkamer.' },
      { icoon: 'maat', kop: 'Op maat', tekst: 'Voor elk raam, ook in een erker of voor een schuifpui.' },
    ],
    varianten: [
      { naam: 'Houten jaloezieën', tekst: 'Lamellen van hout of bamboe, in natuurlijke tinten of geschilderd.' },
      { naam: 'Aluminium jaloezieën', tekst: 'Slanke lamellen in veel kleuren, vochtbestendig, ook voor de badkamer.' },
      { naam: 'Met ladderband', tekst: 'Een stoffen band in plaats van koord langs de lamellen, voor een klassieke uitstraling.' },
    ],
    bediening: binnenBediening('de jaloezieën', 'Kantelen met een stok of koord, optrekken met een koord.'),
    doek: { kop: 'Lamellen en kleuren', tekst: 'Lamellen in verschillende breedtes, in hout, bamboe of aluminium. In de showroom ziet u de stalen.', stalen: houtStalen, merken: binnenMerken },
    vragen: [
      { vraag: 'Welke lamelbreedte past bij mijn raam?', antwoord: 'Smalle lamellen ogen fijner en passen bij kleine ramen, brede lamellen geven rust bij grote ramen. In de showroom ziet u het verschil.' },
      { vraag: 'Kunnen jaloezieën in de badkamer?', antwoord: 'Ja, aluminium jaloezieën kunnen tegen vocht. Houten jaloezieën adviseren we niet in een vochtige ruimte.' },
      { vraag: 'Kunnen de jaloezieën ook elektrisch?', antwoord: 'Ja, met een stille motor en afstandsbediening. Handig bij hoge ramen.' },
    ],
    verwant: ['shutters', 'rolgordijnen', 'smart-fit'],
  },
  rolgordijnen: {
    voordelen: [
      { icoon: 'licht', kop: 'Licht naar wens', tekst: 'Transparant, lichtdempend of verduisterend, per kamer te kiezen.' },
      { icoon: 'kleur', kop: 'Honderden stoffen', tekst: 'Effen, met structuur of met dessin, in elke kleur.' },
      { icoon: 'huis', kop: 'Strak en eenvoudig', tekst: 'Een rustig beeld dat bij elke inrichting past.' },
      { icoon: 'maat', kop: 'Op maat', tekst: 'In het kozijn of op de muur, ook voor brede ramen.' },
    ],
    varianten: [
      { naam: 'Open buis', tekst: 'Het doek rolt zichtbaar op een buis. De eenvoudigste uitvoering.' },
      { naam: 'Met cassette', tekst: 'Het opgerolde doek zit in een cassette, strak afgewerkt.' },
      { naam: 'Verduisterend', tekst: 'Met een verduisterende stof en eventueel zijgeleiders tegen lichtkieren. Voor de slaapkamer.' },
    ],
    bediening: binnenBediening('de rolgordijnen', 'Met een ketting aan de zijkant of een veer zonder koord.'),
    doek: stoffen,
    vragen: [
      { vraag: 'Welke stof voor de slaapkamer?', antwoord: 'Een verduisterende stof, eventueel met zijgeleiders zodat er geen licht langs de randen komt.' },
      { vraag: 'Kan een rolgordijn voor een heel breed raam?', antwoord: 'Tot een bepaalde breedte in een stuk, daarna in delen naast elkaar of gekoppeld. We bekijken dat bij het inmeten.' },
      { vraag: 'Kan het zonder koord?', antwoord: 'Ja, met een veersysteem of elektrisch. Veilig als er kleine kinderen in huis zijn.' },
    ],
    verwant: ['duo-rolgordijnen', 'plissegordijnen', 'jaloezieen'],
  },
  plissegordijnen: {
    voordelen: [
      { icoon: 'licht', kop: 'Van boven en onder', tekst: 'Licht boven binnenlaten, inkijk beneden tegenhouden.' },
      { icoon: 'maat', kop: 'Voor lastige ramen', tekst: 'Schuine ramen, dakramen, draai-kiepramen: een plissé past bijna overal.' },
      { icoon: 'thermo', kop: 'Isolerend mogelijk', tekst: 'Een honingraatstof houdt warmte binnen in de winter en buiten in de zomer.' },
      { icoon: 'huis', kop: 'Compact', tekst: 'Opgevouwen neemt het plissé bijna geen ruimte in.' },
    ],
    varianten: [
      { naam: 'Enkel plissé', tekst: 'Een stof, lichtdoorlatend of verduisterend.' },
      { naam: 'Duo plissé', tekst: 'Twee stoffen in een systeem: overdag licht, in de avond privacy of verduistering.' },
      { naam: 'Honingraatplissé', tekst: 'Een dubbele stof met luchtkamers die isoleert.' },
      { naam: 'Dakraamplissé', tekst: 'Past in dakramen van Velux en blijft op zijn plek bij een schuin raam.' },
    ],
    bediening: binnenBediening('de plissés', 'Met een handgreep boven en onder, of met een koord.'),
    doek: stoffen,
    vragen: [
      { vraag: 'Wat is het verschil tussen plissé en duo plissé?', antwoord: 'Een plissé heeft een stof. Een duo plissé heeft twee stoffen in een systeem, bijvoorbeeld een lichtdoorlatende en een verduisterende, die u apart kunt bedienen.' },
      { vraag: 'Blijft het op zijn plek bij een kiepraam?', antwoord: 'Ja, met spandraden of in een Smart-fit-frame volgt het plissé het raam als u het kiept.' },
      { vraag: 'Is een plissé geschikt voor de badkamer?', antwoord: 'Ja, er zijn vochtbestendige stoffen voor keuken en badkamer.' },
    ],
    verwant: ['smart-fit', 'duo-rolgordijnen', 'rolgordijnen'],
  },
  lamelgordijnen: {
    voordelen: [
      { icoon: 'maat', kop: 'Voor brede ramen', tekst: 'Schuifpuien en grote raampartijen in een keer bekleed.' },
      { icoon: 'licht', kop: 'Kantelen en schuiven', tekst: 'Gekanteld licht zonder inkijk, opzij geschoven een vrij raam.' },
      { icoon: 'kleur', kop: 'Veel stoffen', tekst: 'Van transparant tot verduisterend, in veel kleuren.' },
      { icoon: 'huis', kop: 'Ook zakelijk', tekst: 'Geschikt voor kantoren en praktijkruimtes.' },
    ],
    varianten: [
      { naam: 'Stoffen lamellen', tekst: 'In verschillende breedtes en stoffen, van transparant tot verduisterend.' },
      { naam: 'Kunststof of aluminium lamellen', tekst: 'Vochtbestendig en makkelijk schoon, voor keuken en badkamer.' },
      { naam: 'Schuin of gebogen', tekst: 'Voor schuine ramen en erkers maken we de rail op maat.' },
    ],
    bediening: binnenBediening('de lamellen', 'Kantelen met een ketting, schuiven met een koord.'),
    doek: stoffen,
    vragen: [
      { vraag: 'Welke kant moet het gordijn op openen?', antwoord: 'Naar links, naar rechts, naar twee kanten of vanuit het midden. We stemmen dat af op de deur en de looproute.' },
      { vraag: 'Kunnen lamellen voor een schuifpui?', antwoord: 'Ja, lamelgordijnen worden juist veel voor schuifpuien gebruikt. Opzij geschoven is de deur vrij.' },
      { vraag: 'Hoe breed zijn de lamellen?', antwoord: 'Er zijn verschillende breedtes. Smal oogt fijner, breed geeft rust bij grote ramen. In de showroom ziet u ze naast elkaar.' },
    ],
    verwant: ['rolgordijnen', 'jaloezieen', 'shutters'],
  },
  'smart-fit': {
    voordelen: [
      { icoon: 'maat', kop: 'Zonder boren', tekst: 'Het frame klemt in het kozijn, dus geen schroefgaten.' },
      { icoon: 'huis', kop: 'Beweegt mee met het raam', tekst: 'Ook bij draai-kiepramen blijft alles strak op zijn plek.' },
      { icoon: 'licht', kop: 'Plissé, rolgordijn of jaloezie', tekst: 'U kiest wat er in het frame komt.' },
      { icoon: 'stil', kop: 'Geen koorden', tekst: 'Niets hangt los, veilig bij kinderen en huisdieren.' },
    ],
    varianten: [
      { naam: 'Met plissé', tekst: 'Lichtdoorlatend, verduisterend of duo plissé in het frame.' },
      { naam: 'Met rolgordijn', tekst: 'Een strak doek in het frame, in veel stoffen.' },
      { naam: 'Met jaloezie', tekst: 'Aluminium lamellen in het frame, kantelbaar.' },
      { naam: 'Met hor', tekst: 'Een plisséhor in hetzelfde frame, zodat het raam open kan.' },
    ],
    bediening: binnenBediening('Smart-fit', 'Met een handgreep op het frame.', false),
    doek: stoffen,
    vragen: [
      { vraag: 'Past Smart-fit op elk kozijn?', antwoord: 'Smart-fit klemt in de rubbers van kunststof en aluminium kozijnen. Bij houten kozijnen bekijken we wat past. [[AANLEVEREN: controle kozijnen Smart-fit]]' },
      { vraag: 'Kan ik het raam nog openen?', antwoord: 'Ja, het frame zit op het raam zelf en beweegt mee als u het raam opent of kiept.' },
      { vraag: 'Is het geschikt voor een huurwoning?', antwoord: 'Ja, er wordt niet geboord. Bij verhuizing haalt u het frame zonder sporen weg.' },
    ],
    verwant: ['plissegordijnen', 'rolgordijnen', 'horren'],
  },
  'duo-rolgordijnen': {
    voordelen: [
      { icoon: 'licht', kop: 'Traploos licht', tekst: 'Schuif de banen over elkaar voor precies de hoeveelheid licht die u wilt.' },
      { icoon: 'oog', kop: 'Privacy', tekst: 'Met de dichte banen over elkaar kijkt niemand naar binnen.' },
      { icoon: 'huis', kop: 'Strak beeld', tekst: 'Rustiger dan een jaloezie, met hetzelfde effect.' },
      { icoon: 'kleur', kop: 'Veel kleuren', tekst: 'Van wit en linnen tot antraciet, effen of met structuur.' },
    ],
    varianten: [
      { naam: 'Open buis', tekst: 'De stof rolt zichtbaar op een buis.' },
      { naam: 'Met cassette', tekst: 'De opgerolde stof zit in een cassette, strak afgewerkt.' },
      { naam: 'Lichtdempend', tekst: 'Met dichtere banen voor meer verduistering, bijvoorbeeld in de slaapkamer.' },
    ],
    bediening: binnenBediening('de duo rolgordijnen', 'Met een ketting aan de zijkant.'),
    doek: stoffen,
    vragen: [
      { vraag: 'Verduistert een duo rolgordijn?', antwoord: 'Gedeeltelijk. De transparante banen laten altijd wat licht door. Voor volledige verduistering kiest u een verduisterend rolgordijn.' },
      { vraag: 'Wat is het verschil met een jaloezie?', antwoord: 'Beide regelen licht en inkijk traploos. Een duo rolgordijn is van stof en oogt zachter en strakker, een jaloezie heeft harde lamellen die u ook kunt optrekken.' },
      { vraag: 'Kan het in het kozijn?', antwoord: 'Ja, in het kozijn of op de muur. Bij het inmeten bekijken we wat het mooiste is.' },
    ],
    verwant: ['rolgordijnen', 'plissegordijnen', 'jaloezieen'],
  },
  shutters: {
    voordelen: [
      { icoon: 'huis', kop: 'Karakter', tekst: 'Houten luiken geven een kamer een eigen gezicht, van landelijk tot strak.' },
      { icoon: 'licht', kop: 'Licht en privacy', tekst: 'Kantel de lamellen of open de panelen helemaal.' },
      { icoon: 'maat', kop: 'Voor elk raam', tekst: 'Ook ronde, schuine en hoge ramen en schuifpuien.' },
      { icoon: 'thermo', kop: 'Isoleert', tekst: 'Dichte shutters houden warmte en geluid tegen.' },
    ],
    varianten: [
      { naam: 'Volledig raam', tekst: 'Panelen over de hele hoogte van het raam.' },
      { naam: 'Café-shutters', tekst: 'Alleen het onderste deel van het raam, voor privacy met licht van boven.' },
      { naam: 'Schuivend of vouwend', tekst: 'Voor schuifpuien en brede ramen schuiven of vouwen de panelen opzij.' },
      { naam: 'Waterbestendig', tekst: 'Een kunststof uitvoering voor badkamer en keuken.' },
    ],
    bediening: binnenBediening('de shutters', 'Met de hand, met een zichtbare of verborgen lamelstok.', false),
    doek: { kop: 'Hout en kleuren', tekst: 'Shutters in massief hout of in een waterbestendige uitvoering, wit, in een kleur of in een houtkleur. Lamellen in verschillende breedtes.', stalen: houtStalen, merken: binnenMerken },
    vragen: [
      { vraag: 'Kunnen shutters voor een rond raam?', antwoord: 'Ja. Shutters maken we op maat, ook rond, schuin of in een boogvorm.' },
      { vraag: 'Hoe lang duurt het?', antwoord: 'Shutters worden op maat gemaakt en hebben een langere levertijd dan andere raamdecoratie. We geven bij de offerte een inschatting.' },
      { vraag: 'Zijn shutters geschikt voor de badkamer?', antwoord: 'Ja, in een waterbestendige uitvoering.' },
    ],
    verwant: ['jaloezieen', 'lamelgordijnen', 'plissegordijnen'],
  },
  fractions: {
    voordelen: [
      { icoon: 'kleur', kop: 'Eigen collectie', tekst: 'Stoffen en kleuren die op elkaar zijn afgestemd.' },
      { icoon: 'huis', kop: 'Te zien in de showroom', tekst: 'Leg de stalen naast uw eigen inrichting.' },
      { icoon: 'maat', kop: 'Op maat', tekst: 'Voor elk raam ingemeten en gemaakt.' },
      { icoon: 'motor', kop: 'Montage door ons', tekst: 'Onze eigen monteurs plaatsen het.' },
    ],
    varianten: [
      { naam: '[[AANLEVEREN: producten in de Fractions-collectie]]', tekst: 'Welke producten uit de collectie ZBN levert, vullen we in na overleg.' },
    ],
    bediening: binnenBediening('de raamdecoratie'),
    doek: stoffen,
    vragen: [
      { vraag: 'Waar kan ik de collectie zien?', antwoord: 'In onze showroom aan de Noordenweg in Ridderkerk. Daar liggen de stalen en ziet u de bediening.' },
      { vraag: 'Komen jullie thuis inmeten?', antwoord: 'Ja. We meten elk raam in, zodat de raamdecoratie precies past.' },
    ],
    verwant: ['rolgordijnen', 'plissegordijnen', 'jaloezieen'],
  },
  hordeuren: {
    voordelen: [
      { icoon: 'schild', kop: 'Insecten buiten', tekst: 'Deur open, muggen en vliegen buiten.' },
      { icoon: 'wind', kop: 'Frisse lucht', tekst: 'Ventileren op warme dagen zonder zorgen.' },
      { icoon: 'maat', kop: 'Op maat', tekst: 'Voor tuindeuren, schuifpuien en openslaande deuren.' },
      { icoon: 'huis', kop: 'Past bij het kozijn', tekst: 'Frame in een kleur die bij de deur past.' },
    ],
    varianten: [
      { naam: 'Plissé-hordeur', tekst: 'Het gaas vouwt opzij in een smal pakket. Neemt weinig ruimte in en is makkelijk te bedienen.' },
      { naam: 'Schuifhordeur', tekst: 'Loopt in een rail, geschikt voor schuifpuien.' },
      { naam: 'Scharnierende hordeur', tekst: 'Een deur met gaas die met een dranger vanzelf dichtvalt.' },
    ],
    bediening: binnenBediening('de hordeur', 'Met de hand, open en dicht zoals een gewone deur.', false),
    doek: { kop: 'Gaas en kleuren', tekst: 'Het frame leveren we in een kleur die bij het kozijn past. Het gaas is er in standaard uitvoering en in een stevigere uitvoering voor huisdieren.', stalen: gaasStalen, merken: '[[AANLEVEREN: merken horren en hordeuren]]' },
    vragen: [
      { vraag: 'Welke hordeur past bij een schuifpui?', antwoord: 'Een schuifhordeur in een eigen rail of een plissé-hordeur. Bij het inmeten bekijken we wat past bij de pui en de ruimte ernaast.' },
      { vraag: 'Is het gaas bestand tegen een hond of kat?', antwoord: 'Er is een stevigere gaassoort voor huisdieren die krassen beter doorstaat.' },
      { vraag: 'Kan de hordeur in de winter blijven zitten?', antwoord: 'Ja. Een plissé-hordeur vouwt u opzij, een schuifhordeur schuift u weg.' },
    ],
    verwant: ['horren', 'smart-fit', 'zipscreens'],
  },
  horren: {
    voordelen: [
      { icoon: 'schild', kop: 'Insecten buiten', tekst: 'Raam open, muggen buiten.' },
      { icoon: 'wind', kop: 'Frisse lucht', tekst: 'Ventileren zonder zorgen, ook in de slaapkamer.' },
      { icoon: 'maat', kop: 'Voor elk raam', tekst: 'Ook draai-kiepramen en dakramen.' },
      { icoon: 'oog', kop: 'Bijna onzichtbaar', tekst: 'Een rolhor ziet u alleen als u hem gebruikt.' },
    ],
    varianten: [
      { naam: 'Inzethor', tekst: 'Klemt in het kozijn. Eenvoudig en in de winter weg te halen.' },
      { naam: 'Rolhor', tekst: 'Rolt op in een kast boven het raam. Alleen zichtbaar in gebruik.' },
      { naam: 'Plisséhor', tekst: 'Vouwt opzij of omhoog. Voor grote ramen en in een Smart-fit-frame.' },
      { naam: 'Dakraamhor', tekst: 'Voor dakramen, ook van Velux.' },
    ],
    bediening: binnenBediening('de horren', 'Met de hand: inzetten, oprollen of opvouwen.', false),
    doek: { kop: 'Gaas en kleuren', tekst: 'Het frame leveren we in een kleur die bij het kozijn past. Het gaas is er in standaard uitvoering en in een stevigere uitvoering voor huisdieren.', stalen: gaasStalen, merken: '[[AANLEVEREN: merken horren en hordeuren]]' },
    vragen: [
      { vraag: 'Welke hor past bij een draai-kiepraam?', antwoord: 'Een inzethor of een plisséhor in het kozijn. Het raam blijft gewoon te openen en te kiepen.' },
      { vraag: 'Moet er geboord worden?', antwoord: 'Een inzethor klemt zonder boren. Een rolhor wordt op of in het kozijn geschroefd.' },
      { vraag: 'Kan een hor samen met een plissé?', antwoord: 'Ja, in een Smart-fit-frame zitten een plissé en een hor in hetzelfde frame.' },
    ],
    verwant: ['hordeuren', 'smart-fit', 'plissegordijnen'],
  },
  'dakramen-fakro': {
    voordelen: [
      { icoon: 'maat', kop: 'Precies passend', tekst: 'Gemaakt voor het type en de maat van uw Fakro-dakraam.' },
      { icoon: 'licht', kop: 'Donker slapen', tekst: 'Een verduisterend gordijn houdt het licht tegen, ook in de zomer.' },
      { icoon: 'thermo', kop: 'Koeler onder het dak', tekst: 'Zonwering aan de buitenkant houdt de warmte tegen voordat die het glas raakt.' },
      { icoon: 'huis', kop: 'Blijft op zijn plek', tekst: 'Loopt in geleiders, dus ook bij een schuin raam hangt niets los.' },
    ],
    varianten: [
      { naam: 'Verduisterend gordijn', tekst: 'Houdt het licht tegen. Voor slaapkamers en zolders.' },
      { naam: 'Rolgordijn', tekst: 'Dempt het licht en houdt inkijk tegen.' },
      { naam: 'Plissé', tekst: 'Een gevouwen stof die u op elke hoogte kunt zetten.' },
      { naam: 'Buitenzonwering', tekst: 'Een rolluik of screen aan de buitenkant, tegen warmte.' },
    ],
    bediening: binnenBediening('de dakraamzonwering', 'Met de hand, met een greep aan de onderlat.'),
    doek: { ...stoffen, kop: 'Stoffen en kleuren', merken: 'Zonwering van Fakro.' },
    vragen: [
      { vraag: 'Hoe weet ik welk dakraam ik heb?', antwoord: 'Het type en de maat staan op het typeplaatje in het raam, meestal bovenin het kozijn als u het raam opent. Maak er een foto van en neem die mee naar de showroom of stuur hem mee met uw offerteaanvraag.' },
      { vraag: 'Kan de zonwering elektrisch?', antwoord: 'Voor veel dakramen is er elektrische zonwering, ook op zonne-energie. Of het bij uw raam kan, hangt af van het type.' },
      { vraag: 'Binnen of buiten?', antwoord: 'Binnen regelt u licht en privacy. Buiten houdt de warmte het beste tegen, omdat de zon het glas niet raakt. Ze zijn ook te combineren.' },
    ],
    verwant: ['dakramen-velux', 'plissegordijnen', 'rolgordijnen'],
  },
  'dakramen-velux': {
    voordelen: [
      { icoon: 'maat', kop: 'Precies passend', tekst: 'Gemaakt voor het type en de maat van uw Velux-dakraam.' },
      { icoon: 'licht', kop: 'Donker slapen', tekst: 'Een verduisterend gordijn houdt het licht tegen, ook in de zomer.' },
      { icoon: 'thermo', kop: 'Koeler onder het dak', tekst: 'Zonwering aan de buitenkant houdt de warmte tegen voordat die het glas raakt.' },
      { icoon: 'huis', kop: 'Blijft op zijn plek', tekst: 'Loopt in geleiders, dus ook bij een schuin raam hangt niets los.' },
    ],
    varianten: [
      { naam: 'Verduisterend gordijn', tekst: 'Houdt het licht tegen. Voor slaapkamers en zolders.' },
      { naam: 'Rolgordijn', tekst: 'Dempt het licht en houdt inkijk tegen.' },
      { naam: 'Plissé', tekst: 'Een gevouwen stof die u op elke hoogte kunt zetten.' },
      { naam: 'Buitenzonwering', tekst: 'Een rolluik of screen aan de buitenkant, tegen warmte.' },
    ],
    bediening: binnenBediening('de dakraamzonwering', 'Met de hand, met een greep aan de onderlat.'),
    doek: { ...stoffen, kop: 'Stoffen en kleuren', merken: 'Zonwering van Velux.' },
    vragen: [
      { vraag: 'Hoe weet ik welk dakraam ik heb?', antwoord: 'Het type en de maat staan op het typeplaatje in het raam, meestal bovenin het kozijn als u het raam opent. Maak er een foto van en neem die mee naar de showroom of stuur hem mee met uw offerteaanvraag.' },
      { vraag: 'Kan de zonwering elektrisch?', antwoord: 'Voor veel dakramen is er elektrische zonwering, ook op zonne-energie. Of het bij uw raam kan, hangt af van het type.' },
      { vraag: 'Binnen of buiten?', antwoord: 'Binnen regelt u licht en privacy. Buiten houdt de warmte het beste tegen, omdat de zon het glas niet raakt. Ze zijn ook te combineren.' },
    ],
    verwant: ['dakramen-fakro', 'plissegordijnen', 'rolgordijnen'],
  },
};
