# FOLÉA Webshop — Handover

**Laatst bijgewerkt:** 14 augustus 2026, 12:30 (CEST)
**Repo:** `Snel Online Marketing/Folea` (git, branch `main`). Laatste commit: `ac42123`. Daarna de volledige herontwerpronde op verzoek van de klant (zie sectie 3, punt 17), nog niet gecommit.
**Stack:** Next.js 16 (App Router) · TypeScript · Tailwind CSS v4 · Framer Motion · Zustand · lucide-react · embla-carousel-react

---

## 1. Status in één oogopslag

De site telt nu 6 routes: Home, Producten (+ PDP), Over Ons, Contact en FAQ. Portfolio en Blog zijn op verzoek van de klant volledig verwijderd. De site is door meerdere feedbackrondes gegaan (kleuren, hero, footer, copy-toon) en in de laatste ronde grotendeels herontworpen richting zwart/crème met het Horizon-lettertype van het etiket. Zie sectie 3 voor wat er per ronde is aangepast. `npx tsc --noEmit`, `npx eslint src --max-warnings=0` en `npm run build` zijn schoon.

Dev server draait via `.claude/launch.json` (`npm run dev`, poort 3000).

---

## 2. Wat er staat

### Design tokens (`src/app/globals.css`)
Er zit **geen groen en geen rood** meer in de interface. Het oude `forest` (groen) werd `berry` (etiketrood), en dat is nu op klantverzoek vervangen door `ink` (`#0a0a0a`, hover `#2e2e2e`): knoppen, koppen en accenten zijn zwart. Rood komt alleen nog uit de productfotografie zelf.

Drie achtergrondkleuren dragen de site en wisselen elkaar af: **beige** `cream` (`#e9e3cb`), **felroze** `blush` (`#f9a3bd`) en **zwart** `ink`. De klant wees wit en pastel expliciet af, dus houd deze waarden verzadigd; `blush-soft` staat klaar voor de zeldzame plek waar wel een zacht roze past.

Er is een `blush`-gevulde button-variant (`buttonVariants({ variant: "blush" })`) naast primary/secondary/ghost/earth.

Typografie: **Horizon** (`font-display`, lokaal geladen uit `src/app/fonts/`) voor de wordmark en korte uppercase koppen, **Horizon Outlined** (`font-outline`) uitsluitend voor het invul-effect van `FillOnScroll`, en **Plus Jakarta Sans** (`font-sans`) voor alle h1-h6 en lopende tekst. `font-serif` bestaat niet meer. Taal: Nederlands, behalve de merkregels die letterlijk van het etiket komen (`FOLÉA.`, *Inspired by nature, created with intention.*, *Nourishing hairbutter*).

### Mappenstructuur
```
src/
  app/                     → routes (App Router)
  components/
    ui/                    → Button, Container, Accordion, QuantitySelector, SocialIcons, PaymentBadges
    layout/                → Header, Footer, CartDrawer
    business/              → alle sectie-/feature-componenten per pagina
  lib/
    data/                  → dummy data (products, faq, portfolio, blog)
    store/                 → cart-store.ts (zustand)
    utils/                 → cn.ts, format.ts
  hooks/                   → useCart.ts
  types/                   → product.ts, cart.ts, portfolio.ts, blog.ts
```

### Pagina's

| Route | Inhoud |
|---|---|
| `/` | Hero (video) → Product Spotlight (boterfoto + draaiend zegel) → Marquee-band → Lookbook (felroze, genummerd, carousel op mobiel) → FullBleedImage (parallax) → PhotoMarquee (bewegende fotostrip) → Ingredients (vier werkstoffen) → Instagram-grid. **Geen USP-bar, geen gebruiksaanwijzing, geen nieuwsbrieksectie in de body, geen reviews.** |
| `/producten` | Shop-overzicht, productgrid (1 product, gecentreerd i.p.v. links uitgelijnd in leeg grid) |
| `/producten/hairbutter` | PDP: fotogalerij met 5 beelden (`object-contain`), prijs, aantal-selector, "in winkelmand", ingrediënten-accordeon, gebruiksaanwijzing per haartype. **Geen sterren-rating.** |
| `/over-ons` | Storytelling: ontstaan (met de product-pour video), proces (3 stappen), missie/waarden met stats |
| `/contact` | Contactformulier (front-end only) + contactinfo, linkt naar `/faq` |
| `/faq` | Accordeon met veelgestelde vragen + "Naar contact"-kaart |

### Globale functionaliteit
- **Cart** (zustand): add/remove/update/subtotal, werkend getest overal waar "in winkelmand" staat.
- **Cart Drawer**: slide-in, gratis-verzending-indicator bij €45, checkout-knop doet nog niets (geen betaalflow).
- **Header**: op de homepage `fixed` en transparant over de hero-video, solide crème zodra je scrollt; op alle andere routes `sticky top-0` en altijd solide. Mobiel hamburgermenu, werkende zoek-overlay (filtert live op producten.ts). Nav bevat nog 4 items: Home, Producten, Over Ons, Contact.
- **Footer**: zwart, met de nieuwsbriefinschrijving bovenin en compacte linkkolommen (twee kolommen op mobiel). Betaalbadges: iDEAL/Wero plus Apple Pay in de lichte variant.

### Copy-conventies (belangrijk voor vervolgwerk)
- **Geen em dashes (—)** waar dan ook. Herschrijven met punt, dubbele punt of komma.
- **Geen "ambachtelijk"** — vervangen door "met zorg gemaakt", "met de hand gemaakt", "handgemaakt", of gewoon weggelaten.
- **Geen reviews/sterren/testimonials** nergens op de site, omdat er geen echte reviews bestaan.

### Assets
- `public/video/hero.mp4` (4,3MB, CRF 18, volledige 1920px breedte) + `hero-poster.jpg` — herzien tijdens deze sessie nadat een eerdere te agressieve compressie kwaliteitsverlies gaf. Bron: `IMG_9125.MOV`.
- `public/video/product-pour.mp4` (946KB) + `product-pour-poster.jpg` — de cinemagraph (gouden olie over de potjes), nu in Over Ons i.p.v. op de PDP.
- `public/images/product-*.jpg` (6 productstills, 1400px) en `model-*.jpg` (16 modelfoto's, 1000-1100px, 2:3 staand) — de volledige studioshoot van de klant. Masters staan als `Folea-0xx.jpg` in `source-media/images/` (git-ignored).
- **Harde regel: geen enkele afbeelding in `public/images/` boven de 100KB.** De hele map is nu ~1,9MB over 22 bestanden, elk tussen 24KB en 95KB. De werkwijze staat in CLAUDE.md: quality niet onder q82, liever de afmetingen verkleinen dan de kwaliteit, `cjpeg -optimize -progressive`, en altijd vanaf het origineel hercomprimeren.
- De AI-gegenereerde `portfolio-*.jpg` en `blog-*.jpg` beelden zijn verwijderd samen met hun pagina's.
- `src/app/fonts/Horizon.woff2` (17KB) is het displaylettertype; de OTF-varianten en Horizon Outlined staan in `source-media/fonts/`.
- Ruwe, ongecomprimeerde bronbestanden staan in `source-media/` (git-ignored, niet in `public/`).

### Kwaliteit
- `npx tsc --noEmit` en `npx eslint src --max-warnings=0` zijn na elke wijziging schoon.
- Uitgebreid browsergetest (desktop + mobiel) via de Browser-preview-tooling.

---

## 3. Wat er deze sessie is veranderd (chronologisch, kort)

1. Design-scan uitgevoerd, 6 concrete fixes doorgevoerd (header-contrast, hero-overlay, Portfolio/Blog placeholders → later vervangen door echte pagina's, shopgrid-centrering, PDP-galerij, werkende zoekfunctie).
2. Header permanent zichtbaar/solid gemaakt (was transparant-naar-solid).
3. 3D-productviewer (React Three Fiber + Higgsfield-gegenereerd GLB-model) gebouwd op de PDP, **later weer volledig verwijderd** op verzoek van de gebruiker, samen met de video-tab op de PDP.
4. Portfolio en Blog volledig uitgebouwd met filterbare grids en Higgsfield-gegenereerde beelden.
5. Nieuwe video (cinemagraph) verplaatst naar Over Ons in plaats van de (verwijderde) PDP-video-tab.
6. Kleurenpalet herzien: van zachte pastels naar Pantone-gerefereerde, verzadigde tinten (Flushing Pink / Peridot / Papyrus / Potting Soil).
7. Alle reviews, sterren-ratings en reviewCount-velden volledig verwijderd (site heeft geen echte reviews).
8. Social icon Pinterest → Snapchat.
9. Emoji verwijderd (🎉 in cart drawer vervangen door een icoon).
10. Footer volledig herbouwd: betere structuur, klantcontact-blok, betaal-badges (Apple Pay/iDEAL/Wero/Creditcard).
11. Hero-video kwaliteit hersteld (was te agressief gecomprimeerd) en visueel meermaals herzien: van gecentreerd/overlappend met gezichten → links onderaan → boven → **uiteindelijk gecentreerd + bovenaan**, met een roze CTA-knop.
12. Alle em dashes en het woord "ambachtelijk" uit de volledige site-copy verwijderd.
13. **Design-pass met nieuwe productfotografie (nog niet gecommit):** twee nieuwe studiofoto's verwerkt (`hairbutter-front.jpg` als primair beeld, `hairbutter-podium.jpg` als tweede hoek) zodat het gestapelde twee-potjes-beeld uit de primaire productplekken is. PDP-galerij toont nu 3 thumbnails. ProductSpotlight herstijld (checklist + floating badge, eyebrow "Onze hairbutter"), HowToUse omgebouwd naar split-layout met productfoto, UspBar met iconen-in-cirkels, InstagramGrid gevuld met echte beelden + hover-overlay, smooth scroll toegevoegd.
14. **Aparte FAQ-pagina + placeholders teruggedraaid:** `/faq` is nu een eigen pagina (accordeon + "Naar contact"-kaart); de contactpagina is geslankt tot formulier + contactinfo en linkt naar `/faq`; footer-Klantenservice linkt naar beide. De "fotoshoot komt eraan"-placeholdersecties (ImagePlaceholder/CampaignPreview/StudioPeek) zijn op verzoek weer verwijderd: de nog te ontvangen foto's zijn een interne kwestie voor de developer, geen site-content. De Instagram-grid onderaan de homepage blijft staan als de bewuste placeholder-sectie.
15. **Echte studiofotografie, nieuwe prijs, groen eruit (13 augustus):** de drie aangeleverde studiofoto's zijn verwerkt als `product-front.jpg` / `product-top.jpg` / `product-duo.jpg` (van ~19MB samen naar 286KB) en vervangen alle oude productbeelden site-breed; de oude `hairbutter-*.jpg` bestanden zijn verwijderd. Prijs van €24,95 naar **€39,95** per pot. Het `forest`-token (groen) is site-breed hernoemd naar `berry` met het karmijnrood van het etiket (`#a3182a`); 96 voorkomens in 28 bestanden omgezet, geverifieerd dat er nul groene kleuren meer op de pagina's staan.
16. **Alle afbeeldingen onder 100KB (13 augustus):** de hele `public/images/` map opnieuw gecomprimeerd volgens de nieuwe regel. Drie bestanden zaten boven de limiet en zijn met behoud van kwaliteit teruggebracht: `blog-ingredienten.jpg` 180→90KB, `portfolio-voeding.jpg` 182→90KB, `blog-deep-mask.jpg` 126→94KB (bij die drie zijn de afmetingen verkleind in plaats van de quality te verlagen, omdat ze in de UI toch nooit op volle breedte worden getoond). Drie andere bestanden werden bij hercompressie juist groter en zijn daarom op het origineel gelaten. Map totaal nu ~840KB. (De portfolio-/blogbeelden hieruit zijn bij punt 17 weer verwijderd.)

17. **Herontwerp op klantverzoek (14 augustus).** De klant leverde een referentievideo plus een Word-document met wijzigingen aan. Alles is doorgevoerd:
    - **Typografie:** Cormorant Garamond eruit, **Horizon** (het displaylettertype van het etiket) erin via `next/font/local` vanuit `src/app/fonts/`. Horizon blijkt in de praktijk een all-caps font (de lowercase-glyphs zijn dezelfde vormen op identieke breedtes), dus het wordt alleen ingezet voor de wordmark en korte uppercase koppen. Plus Jakarta Sans draagt alle h1-h6 en lopende tekst; koppen zijn één stap verkleind omdat Jakarta een veel grotere x-hoogte heeft dan de oude serif.
    - **Kleur:** het rode `berry`-token is volledig vervangen door `ink` (`#0a0a0a`). Knoppen, koppen en accenten zijn zwart. Rood zit nu alleen nog in de productfotografie zelf, wat het beeld juist sterker maakt. `cream` is warmer gemaakt (`#fbf8f0` → `#f7f2e8`) omdat de klant de achtergronden te wit vond. Er is een zwarte sectie toegevoegd (`BrandStatement`).
    - **Portfolio en Blog volledig verwijderd:** routes, componenten, data, types en beelden.
    - **Homepage opnieuw opgebouwd:** Hero → EditorialGrid → ProductSpotlight → BrandStatement → Newsletter → InstagramGrid. `UspBar` (vier iconen) en `HowToUse` zijn verwijderd inclusief hun bestanden.
    - **Hero:** video loopt vanaf de bovenste pixel door onder een transparante header. Gecentreerd op zowel mobiel als desktop: `FOLÉA.` in Horizon, daaronder de tagline in blush, daaronder een `SHOP THE COLLECTION`-link. Overlay verzwaard (45% ink, gradientband boven, radiale kern) omdat de blush tagline wegviel tegen de lichte studio-achtergrond in de video.
    - **Header:** op de homepage transparant over de hero en solide na scrollen; op alle andere routes `sticky` en altijd solide. Dit draait de eerdere afspraak "header altijd solide" bewust om.
    - **Product:** hernoemd naar **Nourishing hairbutter** (zoals op het etiket), nieuwe omschrijving van de klant (de em-dash daarin is een dubbele punt geworden conform de staande regel), de vier checkmark-bullets van de homepage weg. `product-butter.jpg` is het primaire beeld.
    - **Fotoshoot verwerkt:** 19 aangeleverde foto's (151 MB) zijn als masters naar `source-media/images/` gegaan en met beschrijvende namen geoptimaliseerd teruggezet, allemaal onder 100 KB (map nu ~1,9 MB voor 22 bestanden).
    - **PDP-galerij:** van `object-cover` in een vierkant naar `object-contain` in een vast kader, omdat de gemengde staande/liggende verhoudingen de pot afsneden. Dit was een expliciete klacht van de klant over centrering.
    - **Video-autoplay:** de gedeelde-link-klacht ligt niet aan de markup (SSR-HTML bevat `autoplay muted loop playsinline`, geverifieerd). Toegevoegd: `preload="auto"` en een expliciete `play()` na hydratie en op `visibilitychange`. iOS-energiebesparing en in-app browsers blijven autoplay kunnen blokkeren.

18. **Speelse ronde na klantfeedback (14 augustus, tweede ronde).** De klant stuurde screenshots van het referentie-ontwerp en vroeg om meer speelsheid:
    - **Horizon werkte niet, ondanks dat het geladen was.** De regel `h1..h6 { font-family: var(--font-sans) }` stond ongelaagd in `globals.css`, en ongelaagde CSS wint in de cascade van alles wat Tailwind in `@layer utilities` zet. Daardoor deed `font-display` op de hero-titel niets en rendeerde FOLÉA gewoon in Plus Jakarta Sans. Gemeten: 500px breed in Horizon versus 324px in Jakarta, dus goed zichtbaar. Opgelost door de regel in `@layer base` te zetten.
    - **Palet echt beige gemaakt:** `cream` van `#f7f2e8` naar `#e9e3cb` (duidelijk khaki, geen bijna-wit meer) en `blush` van zacht `#f4c9d3` naar verzadigd `#f9a3bd`, beide afgeleid van de aangeleverde referentie. `blush-soft` toegevoegd voor de gevallen waar wel een zacht roze nodig is.
    - **Product staat nu direct onder de hero**, op expliciet verzoek. Daarna pas het beeldmateriaal.
    - **Nieuwe secties:** `Marquee` (naadloos loopende band), `RitualSteps` (felroze, genummerd 01/02/03, scroll-snap carousel op mobiel en grid op desktop, met grote outline-nummers over de foto's) en `PhotoMarquee` (zwarte sectie met bewegende fotostrip en de wordmark er in `mix-blend-difference` tegenin overheen). `EditorialGrid` en `BrandStatement` zijn hierdoor vervallen en verwijderd.
    - **Lazy loading in de bewegende strip uitgezet:** kaarten die buiten beeld starten worden door de browser nooit als zichtbaar gezien omdat de strip met een transform beweegt, waardoor twee foto's permanent leeg bleven.
    - **Mobiele autoplay:** extra fallback die de video start bij het eerste gebruikersgebaar (touch, pointer, toets of scroll) en zichzelf daarna opruimt.
    - **Reduced motion:** alle loopende animaties en smooth scrolling staan uit onder `prefers-reduced-motion`.

19. **Speelser en interactiever (14 augustus, derde ronde).**
    - **Hero-titel verkleind** van `15vw` naar `11vw` en opgebouwd uit losse letters die één voor één binnenkomen; onder de cursor wipt elke letter los omhoog. Er is een parallax op de video (die schuift langzamer weg dan de pagina) en een scrollhint die verdwijnt zodra je begint.
    - **Valkuil onderweg:** de hele hero-tekst stond even in een `motion.div` met scroll-transforms. Elk kind met een eigen `initial`/`animate` bleef daardoor op zijn beginwaarde staan, waardoor de complete hero-tekst onzichtbaar was terwijl de DOM er gezond uitzag. Parallax hoort op de medialaag, de animerende inhoud in een gewone `div`.
    - **Scroll-reactieve banden:** nieuwe `VelocityTrack` koppelt de loopsnelheid aan de scrollsnelheid. Sneller scrollen versnelt de band, omhoog scrollen keert de richting om. `Marquee` en de fotostrip draaien er allebei op.
    - **Horizon Outlined in gebruik:** nieuwe `FillOnScroll` tekent een kop als omtrek die zich tijdens het scrollen van links naar rechts vult met de massieve variant.
    - **"Hoe te gebruiken" definitief weg.** `RitualSteps` is vervangen door `Lookbook`: dezelfde layout die de klant mooi vond (genummerde kaarten, outline-cijfers, carousel op mobiel), maar met alleen fotografie en labels van één woord.

20. **Footer, productsectie en titelmaat (14 augustus, vierde ronde).**
    - **Hero-titel:** de vorige verkleining gold per ongeluk ook voor mobiel. Nu `clamp(3.5rem, 9vw, 6rem)`: op telefoon 56px (80% van de schermbreedte, groot zoals gewenst) en op 1440px 96px in plaats van 120px.
    - **Footer herbouwd naar de referentie:** zwart, met de nieuwsbrief bovenin (eyebrow, Horizon-kop, onderlijnd invoerveld, roze pill-knop) en daaronder linkkolommen in twee kolommen op mobiel. Van 861px naar 756px hoogte op een 375px-scherm.
    - **"Blijf op de hoogte" uit de body:** de losse `Newsletter`-sectie is verwijderd, de inschrijving zit nu alleen nog in de footer. De pagina eindigt daardoor op beeld in plaats van op een formulier.
    - **Apple Pay-badge kreeg een `tone="light"`-variant**, omdat de standaard zwarte pill onzichtbaar was op de zwarte footer.
    - **Productsectie herontworpen:** grote sfeerfoto (`model-duo-floor`, de foto die de klant mooi vond) met de pot er overlappend voor, elk met eigen parallax bij scrollen. Tekst rechts met eyebrow, naam in Horizon, prijs en zwarte pill-knop. In `Lookbook` is die foto vervangen door `model-lounge`.
    - **Bug gevonden:** Horizon heeft wel een €-glyph, maar die rendert leeg, waardoor de prijs als "39,95" verscheen zonder euroteken. Prijzen staan nu in Plus Jakarta Sans.

21. **Beeldkwaliteit, productsectie en ingrediënten (14 augustus, vijfde ronde).**
    - **De 100 KB-regel is vervallen.** Die regel drukte de shootfoto's naar 666-1100px breed, en zodra ze full-bleed en half-screen gebruikt werden zag je dat: zichtbaar zacht, zeker op retina. Alles is opnieuw verwerkt vanaf de masters op **1800px langste zijde, q88**. Sleutelinzicht: `next/image` staat aan, dus het bestand in `public/` is een bron en niet wat er verstuurd wordt. Gemeten op `model-duo-floor.jpg`: 276 KB op schijf, maar 30 KB (w=640) tot 74 KB (w=1080) WebP naar de browser. Dus scherper én lichter dan de oude 91 KB JPEG. De map is nu ~5 MB.
    - **Logo weg uit de mobiele navbar op de homepage**, want de wordmark staat daar al groot over de hero. Op alle andere routes blijft hij staan.
    - **Productsectie herontworpen** met de boterfoto terug als hoofdbeeld (expliciete klantwens): groot in beeld met een roze vlak erachter, parallax bij het scrollen, en een langzaam ronddraaiend zegel ("100% natuurlijk · voor elke textuur") over de hoek.
    - **`model-duo-floor` heeft een eigen sectie gekregen:** `FullBleedImage`, over de volle breedte met parallax en één korte regel eroverheen.
    - **"Wat erin zit" vervangen door een echte ingrediëntensectie:** `Ingredients` toont de vier werkstoffen genummerd met omschrijving, met een outline-kop die zich vult bij het scrollen en een roze knop naar de volledige lijst. `PhotoMarquee` is teruggebracht tot alleen de bewegende fotostrip; die twee zwarte secties lopen bewust in elkaar over.

22. **Scherpte, carousel en social (14 augustus, zesde ronde).**
    - **Beeldbronnen nogmaals vergroot naar 2400px langste zijde** (q84). 1800px bleek nog te krap: half-breed op een 1440px retinascherm vraagt al ~1300px. Twee valkuilen kostten hier tijd en staan nu in CLAUDE.md: de dev server blijft na het vervangen van bronbestanden de oude, kleinere varianten uit z'n geheugen serveren (herstarten dus), en `img.naturalWidth` in de preview-browser rapporteert de CSS-maat in plaats van de bitmap, waardoor alles onterecht op halve resolutie lijkt.
    - **Geen full-bleed portretten meer:** `FullBleedImage` is vervangen door `StatementSplit`. Een 2:3 portret over de volle breedte vraagt ~2880px op retina, en dat haalt geen enkele foto uit deze shoot. Op halve breedte blijft `model-duo-floor` scherp en komt hij nog steeds groot binnen, nu met een eigen CTA.
    - **Lookbook loopt vanzelf door** in plaats van een swipebare rij met scroll-snap: dat gedrag voelde schokkerig. Vier foto's die nergens anders op de pagina terugkomen.
    - **Social-sectie herzien:** asymmetrisch raster met één groot beeld en vier kleine, een duidelijke "Volg ons"-knop, en het Instagram-icoon in de eigen merkverloop (`InstagramIconColor`).
    - **Footer-copy afgezwakt:** "over haar, niet over korting" is "Eén mail per maand, meer niet" geworden, zodat het merk zich niet vastlegt op nooit kortingen geven.

---

## 4. Openstaande punten

1. **Higgsfield-gebruik vereist voortaan expliciete toestemming per keer** — vastgelegd in memory. Niet meer proactief genereren.
2. **Checkout-flow ontbreekt** — "Naar afrekenen" doet niets.
3. **Formulieren zijn front-end only** — geen backend/e-mailservice.
4. **Placeholder bedrijfsgegevens** — KvK/BTW-nummer in de footer zijn nog dummy-waarden.
5. **Gratis-verzendingsdrempel staat op €45** (hardcoded in `CartDrawer.tsx`). Met de prijs van €39,95 haalt één pot dat net niet; controleren of dat de bedoeling is of dat de drempel mee moet bewegen.
6. **Horizon-licentie niet geverifieerd.** Het font (Horizon Bold, Fontense 2019) is door de klant aangeleverd en wordt nu als woff2 mee-gebundeld en publiek geserveerd. Controleer of de licentie web-embedding dekt voordat de site live gaat.
7. **Interpunctie merkregels:** op de pot staat "Inspired by nature**,** created with intention." en "FOLÉA**.**" met punt. De site volgt de pot; het Word-document van de klant schreef het net iets anders (punt in plaats van komma, FOLÉA zonder punt). Even bevestigen bij de klant.
8. **De Instagram-sectie linkt naar dummy-URL's** (`https://instagram.com`); vervangen zodra het echte account er is.
9. **Van de 19 shootfoto's zijn er 13 in gebruik.** De rest staat geoptimaliseerd klaar in `public/images/` voor toekomstige secties.

---

## 5. Hoe verder te werken

```bash
npm run dev        # dev server op localhost:3000
npx tsc --noEmit    # typecheck
npx eslint src      # lint
```

`.claude/launch.json` staat klaar zodat de Browser-preview-tooling de dev server automatisch kan starten onder de naam `folea-dev`.

**Voor de volgende sessie:** loop de openstaande punten hierboven langs, te beginnen bij de verzendingsdrempel (punt 5) en de fontlicentie (punt 6). Beide moeten geregeld zijn voordat de site live kan.
