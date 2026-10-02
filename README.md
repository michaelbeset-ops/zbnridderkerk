# ZBN Zonwering Ridderkerk, website

    npm install
    PUBLIC_PREVIEW=1 PUBLIC_WEB3FORMS_KEY=... npm run build

- `PUBLIC_PREVIEW=1`: noindex, zolang de site nog niet op het eigen domein staat.
- `PUBLIC_WEB3FORMS_KEY`: access key van Web3Forms voor het offerteformulier (in GitHub als repository-variabele).
- Teksten en gegevens staan in `src/data/site.ts`, foto's in `src/assets`.
- Screenshots: `node shots/shoot.mjs / home` (na `npm run build`).

## Testen (na `npm run build`)

    node tests/interacties.mjs     # alle links en knoppen, mobiel en desktop (286 controles)
    node tests/pills-swipe.mjs     # productpills swipen en tikken op mobiel
    node tests/lighthouse.mjs /    # gedrag en Lighthouse van een pagina
    node tests/screenshots.mjs / home   # screenshots op 1440, 390 en 320 in shots/
