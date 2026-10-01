# ZBN Zonwering Ridderkerk, website

    npm install
    PUBLIC_PREVIEW=1 PUBLIC_WEB3FORMS_KEY=... npm run build

- `PUBLIC_PREVIEW=1`: noindex, zolang de site nog niet op het eigen domein staat.
- `PUBLIC_WEB3FORMS_KEY`: access key van Web3Forms voor het offerteformulier (in GitHub als repository-variabele).
- Teksten en gegevens staan in `src/data/site.ts`, foto's in `src/assets`.
- Screenshots: `node shots/shoot.mjs / home` (na `npm run build`).
