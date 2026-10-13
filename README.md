# ZBN Zonwering Ridderkerk, website

    npm install
    npm run build

- `PUBLIC_PREVIEW=1`: noindex en geen JSON-LD (alleen voor een preview buiten het eigen domein).
- Offerteformulier: FormSubmit (formsubmit.co) naar info@zbnridderkerk.nl, met foto's als bijlage; geen key nodig.
  De eerste aanvraag stuurt een activatiemail naar info@ die eenmalig bevestigd moet worden.
- Teksten en gegevens staan in `src/data/site.ts`, foto's in `src/assets`.
- Screenshots: `node shots/shoot.mjs / home` (na `npm run build`).

## Testen (na `npm run build`)

    node tests/interacties.mjs     # alle links en knoppen, mobiel en desktop (286 controles)
    node tests/lighthouse.mjs /    # gedrag en Lighthouse van een pagina
    node tests/screenshots.mjs / home   # screenshots op 1440, 390 en 320 in shots/
