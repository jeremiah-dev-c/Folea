# FOLÉA

Webshop-front-end voor een Nederlands haarverzorgingsmerk met één product. Gebouwd
in opdracht van de klant en door meerdere feedbackrondes heen gegaan, dus de keuzes
hieronder komen uit de praktijk en niet uit een tutorial.

**Next.js 16 (App Router) · React 19 · TypeScript · Tailwind CSS v4 · Framer Motion · Zustand**

Zes routes: homepage, collectie, productpagina, over ons, contact en een FAQ.
Ongeveer 3.400 regels in `src/`, verdeeld over 30 componenten.

---

## Draaien

```bash
npm install
npm run dev      # http://localhost:3000
```

```bash
npm run build    # productiebuild
npm run lint     # eslint (flat config)
npx tsc --noEmit # typecheck
```

Er is geen backend en geen database. De productdata staat als getypte constanten in
`src/lib/data/`, dus het project draait direct na `npm install`.

---

## Wat hier technisch interessant aan is

Dit is het deel dat ik zelf zou willen lezen. Elk punt hieronder loste een concreet
probleem op dat tijdens het bouwen boven kwam.

### Scrollsnelheid gekoppeld aan de animatie

`VelocityTrack` is de basis onder elke bewegende band. De inhoud wordt twee keer
gerenderd en naar `-50%` geanimeerd, zodat de lus naadloos is. De snelheid hangt via
`useVelocity` aan de scrollsnelheid: sneller scrollen versnelt de band, omhoog
scrollen keert de looprichting om.

### Een jaartal dat niet vastvriest in statische HTML

Elke route wordt statisch voorgerenderd. `new Date().getFullYear()` tijdens de render
belandt dus als bouwjaar in de HTML, en het inline berekenen laat de eerste
client-render afwijken van die HTML: een hydration mismatch. De footer leest het jaar
daarom via `useSyncExternalStore`, met een server-snapshot voor de HTML en een
client-snapshot na hydratie. Getest door het bouwjaar op 2019 te zetten: de geserveerde
HTML gaf 2019, de pagina 2026.

### Autoplay dat ook op iOS werkt

De klant meldde dat de herovideo op de telefoon niet vanzelf startte. De markup was
niet het probleem: `autoplay muted loop playsinline` stond er al in de SSR-HTML. iOS
blokkeert autoplay in Low Power Mode onvoorwaardelijk, en in-app browsers vaak ook.
`Hero.tsx` probeert het daarom in drie stappen: direct na hydratie, op
`visibilitychange`, en op het eerste gebruikersgebaar. Die laatste is de betrouwbare,
want elke browser staat afspelen toe na interactie. De listeners ruimen zichzelf op.

### Twee herovideo's, mobiele bron eerst

Over mobiele data startte de volledige video merkbaar traag. Er is nu een tweede
bestand van 1280px (569 KB tegenover 4,3 MB), dat als **eerste** `<source>` staat met
`media="(max-width: 767px)"`, omdat de browser de eerste passende bron pakt. De
`moov`-atom stond al vooraan in beide bestanden, dus faststart was niet de oorzaak;
het was puur bestandsgrootte.

### Een FAQ die Google kan lezen

De accordeon animeert alleen de hoogte naar nul. De antwoorden blijven in de DOM,
want met `AnimatePresence` verdwenen ze uit de HTML en waren ze onvindbaar. Dezelfde
data voedt ook de FAQPage structured data, zodat er één bron is en de twee niet uit
elkaar kunnen lopen.

### Het bronbestand is niet wat de bezoeker binnenkrijgt

Er gold ooit een regel van maximaal 100 KB per afbeelding. Die maakte de foto's te
klein voor retina en de klant zag het. Omdat `next/image` de bron hercodeert naar WebP
op de breedte die de layout nodig heeft, kost een zwaardere bron repo-ruimte en geen
laadtijd: een JPEG van 276 KB wordt 30 KB bij `w=640` en 74 KB bij `w=1080`. De regel
is nu 2400px op de langste zijde, en meten doe je op de `/_next/image`-respons in
plaats van op het bestand op schijf.

### Niet downloaden wat je toch niet toont

De productfoto op de contactpagina staat op `hidden lg:block`. Alleen verbergen is niet
genoeg: de browser haalt het beeld dan alsnog op. Met
`sizes="(min-width: 1024px) 38vw, 0px"` slaat hij de download op telefoons volledig
over. Geverifieerd op 375px: geen `currentSrc`, dus geen verkeer.

### Contrast doorgerekend in plaats van geschat

Bij elke kleurwissel van een blok zijn de tinten nagerekend tegen de nieuwe
ondergrond. Op het roze bleek een placeholder op `ink/55` op 3,62 te zitten en dus
onder de AA-norm; die staat nu op `ink/65` en haalt 4,77. Randen en veldlijnen zijn op
de 3,0 voor niet-tekst gezet.

### Tailwind v4 zonder configbestand

Alle tokens staan als CSS-variabelen in `@theme` in `globals.css`. Eén val die me
tijd kostte: een kale `h1`-selector buiten `@layer` wint van alles wat Tailwind in
`@layer utilities` zet, waardoor `font-display` op koppen stil niets deed. Sindsdien
staan basisselectors in `@layer base`.

---

## Structuur

```
src/
  app/                 routes (App Router), metadata per route, icon/favicon
    fonts/             lokaal geladen displayfont
  components/
    ui/                herbruikbare primitieven (Button, Container, VelocityTrack, ...)
    layout/            Header, Footer, CartDrawer
    business/          sectiecomponenten, één per blok op een pagina
  lib/
    data/              getypte productdata en FAQ
    store/             winkelmand (zustand)
    utils/             cn, prijsformattering
  hooks/               useCart
  types/               gedeelde domeintypes
```

`components/business/` volgt bewust het patroon van één component per sectie. Elke
pagina is daardoor een korte `page.tsx` die secties samenstelt.

---

## Bewuste keuzes en wat er nog niet af is

- **Het contactformulier heeft geen backend.** Versturen toont alleen een bevestiging.
  Dat is opzettelijk zichtbaar gelaten in plaats van weggemoffeld: er moet een
  mailservice achter voordat dit live kan.
- **Geen reviews of sterren.** Er zijn nog geen echte, en verzonnen reviews zijn
  misleidend.
- **Geen verzonnen productclaims.** Alle teksten over ingrediënten en gebruik komen
  letterlijk van de klant.
- **De winkelmand rekent nog niet af.** Toevoegen, wijzigen en het subtotaal werken;
  er is geen betaalflow.
- Het displaylettertype is van het productetiket. De weblicentie moet nog bevestigd
  worden voordat dit publiek gaat.

---

## Context

Dit is klantwerk, geen oefenproject. De site is meerdere keren herzien op basis van
feedback van de klant: kleuren, typografie, de opbouw van pagina's en de
productfotografie. Een deel van de commits gaat daarom over het terugdraaien van
eerder werk, en dat is met opzet zo gedocumenteerd.

Het project wordt op termijn omgezet naar een Shopify Liquid-thema, omdat de klant
klantaccounts en bestelgeschiedenis wil. De inventaris daarvoor is apart uitgewerkt.
