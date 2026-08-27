# FOLÉA

Webshop voor een Nederlands haarverzorgingsmerk. Eén product, zes pagina's, en een
klant die er een duidelijk beeld bij had.

Bezoekers kunnen het product bekijken, in de winkelmand leggen, het merkverhaal lezen
en een bericht achterlaten. De site is Nederlandstalig, behalve de merkregels die
letterlijk van het etiket komen.

Dit was echt klantwerk, geen oefenproject, en dat zie je terug in de commits: er zit
werk tussen dat na een feedbackronde weer is teruggedraaid.

## Tech stack

- **Next.js 16** met de App Router
- **TypeScript**
- **Tailwind CSS v4**, met de tokens als CSS-variabelen in `globals.css` in plaats van
  een `tailwind.config.js`
- **Framer Motion** voor de animaties
- **Zustand** voor de winkelmand

Geen backend en geen database. De productdata staat als getypte constanten in
`src/lib/data/`.

## Features

- Productpagina met fotogalerij, aantal-selector en winkelmand
- Winkelmand als slide-in, met subtotaal en een indicator voor gratis verzending
- Zoekoverlay die live filtert
- FAQ met accordeon en FAQPage structured data
- Contactformulier met validatie
- Videohero met een aparte, lichtere versie voor mobiel
- Bewegende fotostrips waarvan de snelheid meebeweegt met hoe snel je scrolt
- Volledig responsive, en alle animaties staan uit bij `prefers-reduced-motion`

## Local setup

```bash
npm install
npm run dev
```

Draait op http://localhost:3000.

Verder:

```bash
npm run build     # productiebuild
npm run lint
npx tsc --noEmit
```

## Waar ik langer aan heb gezeten dan verwacht

Een paar dingen die er simpel uitzien maar dat niet waren.

**De hero-video startte niet vanzelf op telefoons.** De markup klopte al, met
`autoplay muted playsinline`. Het bleek aan iOS te liggen: in Low Power Mode wordt
autoplay gewoon geblokkeerd, en in de browsers binnen WhatsApp en Instagram vaak ook.
Nu wordt het in drie stappen geprobeerd, waarvan de laatste pas bij het eerste
gebruikersgebaar. Die werkt altijd, want na interactie staat elke browser afspelen toe.

**Het jaartal in de footer.** Alle pagina's worden statisch voorgerenderd, dus een
jaartal dat je tijdens de render berekent staat voor altijd in de HTML. Het inline
berekenen geeft weer een hydration mismatch. Het loopt nu via `useSyncExternalStore`.
Getest door het bouwjaar op 2019 te zetten: de HTML gaf 2019, de pagina 2026.

**De FAQ was onzichtbaar voor Google.** De antwoorden werden bij het inklappen uit de
DOM gehaald. Ze blijven er nu gewoon in staan en alleen de hoogte animeert.

**Foto's die er zacht uitzagen.** Er gold een limiet van 100 KB per afbeelding. Die
kostte zoveel resolutie dat de klant het zag. Omdat `next/image` de bron toch
hercodeert naar de breedte die de layout nodig heeft, kost een zwaardere bron alleen
repo-ruimte: een JPEG van 276 KB komt als 30 KB bij de bezoeker aan. De limiet is
eraf, de foto's zijn scherp en de pagina is niet zwaarder geworden.

## Nog niet af

Het contactformulier heeft geen mailservice erachter. Het toont een bevestiging, maar
er wordt niets verstuurd. Dat moet geregeld zijn voor livegang.

De winkelmand rekent nog niet af. Toevoegen, aanpassen en het subtotaal werken, maar
er is geen betaalflow.

Er staan geen reviews op de site. Die zijn er nog niet, en verzonnen reviews leken me
geen goed idee.
