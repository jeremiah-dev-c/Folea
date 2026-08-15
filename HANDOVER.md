# FOLÉA Webshop — Handover

**Laatst bijgewerkt:** 14 augustus 2026 (CEST)
**Repo:** `Snel Online Marketing/Folea` (git, branch `main`). Het volledige herontwerp staat in vier commits: `7eebe42` (herontwerp), `1c803ec` (collectiepagina), `747dad4` (ingrediëntteksten en hero) en `030e3c7` (nieuwsbriefcopy en fotoresolutie), plus de contactpagina.
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
    data/                  → dummy data (products, faq)
    store/                 → cart-store.ts (zustand)
    utils/                 → cn.ts, format.ts
  hooks/                   → useCart.ts
  types/                   → product.ts, cart.ts
```

### Pagina's

| Route | Inhoud |
|---|---|
| `/` | Hero (video) → Product Spotlight (boterfoto + draaiend zegel) → StatementSplit ("Jouw haar. Jouw ritueel.") → PhotoMarquee (bewegende fotostrip) → Ingredients (De formule) → Instagram-grid (felroze). **Geen USP-bar, geen marquee-band, geen lookbook, geen gebruiksaanwijzing, geen nieuwsbrieksectie in de body, geen reviews.** |
| `/producten` | `ProductShowcase`: groot productbeeld met aanklikbare thumbnails, naam, prijs en winkelmandknop. Schakelt naar een raster van kaarten zodra er een tweede product bijkomt |
| `/producten/hairbutter` | PDP: fotogalerij met 5 beelden (`object-contain`), prijs, aantal-selector, "in winkelmand", ingrediënten-accordeon en de gebruiksaanwijzing met twee methodes. **Geen sterren-rating, geen opsommingen.** |
| `/over-ons` | Ons verhaal (twee zussen), het proces (3 stappen) en de missie. Teksten aangeleverd door de klant; de statistieken zijn vervallen |
| `/contact` | Horizon-kop, formulier naast een productfoto met contactgegevens eronder, zwarte FAQ-verwijzing. Formulier is front-end only |
| `/faq` | Accordeon met veelgestelde vragen + "Naar contact"-kaart |

### Globale functionaliteit
- **Cart** (zustand): add/remove/update/subtotal, werkend getest overal waar "in winkelmand" staat.
- **Cart Drawer**: slide-in, gratis-verzending-indicator bij €45, checkout-knop doet nog niets (geen betaalflow).
- **Contact**: crème, roze, zwart in plaats van één beige vlak. De opening heeft dezelfde kopregel met haarlijn als Over Ons, met de productfoto ernaast en het mailadres groot uitgezet. Het formulier staat op roze en leest als een brief die je invult: onderstreepte velden die meegroeien met wat je typt, het onderwerp als klikbare chips, en een teller die laat zien hoeveel er nog mist. **Er zit nog geen mailservice achter**, zie de openstaande punten.
- **Header**: op de homepage `fixed` en transparant over de hero-video, solide crème zodra je scrollt; op alle andere routes `sticky top-0` en altijd solide. Mobiel hamburgermenu, werkende zoek-overlay (filtert live op producten.ts). Nav bevat nog 4 items: Home, Producten, Over Ons, Contact.
- **Footer**: zwart, met de nieuwsbriefinschrijving bovenin en compacte linkkolommen (twee kolommen op mobiel). Betaalbadges: iDEAL/Wero plus Apple Pay in de lichte variant. Onderin staan de copyright met KvK/BTW en de credit "Webdesign by SOM" met link naar snelonlinemarketing.nl. Het jaartal loopt automatisch mee: zie CLAUDE.md voor waarom dat via `useSyncExternalStore` gaat en niet via `new Date()` in de render.

### Copy-conventies (belangrijk voor vervolgwerk)
- **Geen em dashes (—)** waar dan ook. Herschrijven met punt, dubbele punt of komma.
- **Geen "ambachtelijk"** — vervangen door "met zorg gemaakt", "met de hand gemaakt", "handgemaakt", of gewoon weggelaten.
- **Geen reviews/sterren/testimonials** nergens op de site, omdat er geen echte reviews bestaan.
- **Geen verzonnen productclaims of beloftes.** De ingrediëntomschrijvingen zijn verwijderd omdat ze door mij bedacht waren; de nieuwsbriefcopy belooft niets over frequentie of korting. Wat het merk feitelijk doet, komt van de klant.
- **Geen bezoekadres:** FOLÉA verkoopt alleen online.

### Assets
- `public/video/hero.mp4` (4,3MB, 1920px) en `hero-mobile.mp4` (569KB, 1280px) + `hero-poster.jpg` (89KB). De mobiele variant staat als eerste `<source>` met `media="(max-width: 767px)"`, omdat de volledige video op mobiele data merkbaar traag startte. Bron: `IMG_9125.MOV`.
- `public/video/product-pour.mp4` (524KB, 1248x1664, 5s) + `product-pour-poster.jpg` — de honingcinemagraph in Over Ons ("Het begin"), niet meer op de PDP. Opnieuw gegenereerd op verzoek van de klant: de eerste versie liet een dikke straal links op de bovenste pot vallen, waardoor de honing dwars over FOLÉA liep. Nu valt een dun straaltje op de **witte deksel rechts** van de bovenste pot en blijft het woordmerk op beide potten leesbaar. Bron en startframe in `source-media/video/`.
- `public/images/product-*.jpg` (6 productstills) en `model-*.jpg` (16 modelfoto's, 2:3 staand) — de volledige studioshoot van de klant, allemaal 1600x2400 of 2400x1600. Masters staan als `Folea-0xx.jpg` in `source-media/images/` (git-ignored).
- **De oude 100KB-regel is vervallen**; die maakte de foto's te klein voor full-bleed en retinaschermen. Nu: 2400px langste zijde op q84, ~7MB voor de map. `next/image` comprimeert de bron alsnog naar 30-80KB WebP, dus de pagina wordt er niet zwaarder van. De werkwijze en de twee valkuilen (dev server herstarten na het vervangen van bestanden, en `naturalWidth` niet vertrouwen in de preview) staan in CLAUDE.md.
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

23. **Collectiepagina herzien (14 augustus, na de commit).** `/producten` stond nog volledig in de oude stijl: een klein vierkant kaartje met een bruine eyebrow midden op een lege pagina. Nu een Horizon-kop op beige, de productkaart in 4:5 (het vierkant sneed de staande studiofoto's te hard bij), en daarnaast de vier toepassingen genummerd. De pagina sluit af met dezelfde marquee-band als de homepage. Zodra er een tweede product bijkomt schakelt de layout automatisch terug naar een normaal raster.

24. **Verzonnen ingrediëntteksten verwijderd, hero lichter (14 augustus).** De omschrijvingen bij de ingrediënten waren door mij geschreven en dus feitelijk productclaims; die haalt de developer op bij de klant. `description` is nu optioneel en overal leeg: de PDP toont de namen als chips in plaats van een accordeon, en de homepage-sectie laat de alinea weg. Beide schakelen vanzelf terug zodra de teksten in `products.ts` staan. Verder is de eyebrow "Het vlaggenschip" geschrapt en is de hero-overlay flink lichter gemaakt (egale laag van 45% naar 22%), zodat de video zelf beter tot zijn recht komt terwijl de radiale kern de tekst leesbaar houdt.

25. **Contactpagina herbouwd (14 augustus).** Dit was de laatste pagina die nog in de oude stijl stond: gecentreerde Jakarta-kop, bruine `text-earth` eyebrows, een vaal `bg-blush/50` kaartje en verder één beige blok zonder beeld. Nu: Horizon-kop links uitgelijnd, formulier van zeven kolommen naast een productfoto met de contactgegevens eronder, een zwarte FAQ-verwijzing en dezelfde marquee-band als de andere pagina's. Twee copy-fouten meegenomen die er al vanaf de eerste bouw stonden: er stond "huidtype" bij een haarproduct, en het product heette nog "Hairbutter". Het bezoekadres is geschrapt: FOLÉA verkoopt alleen online.

26. **Mobiele video, collectiepagina als showcase, nieuwsbriefcopy (14 augustus).**
    - **Aparte mobiele hero-video:** `hero-mobile.mp4` (1280px, 569 KB) naast de bestaande `hero.mp4` (1920px, 4,3 MB), via een `<source media="(max-width: 767px)">` die als eerste staat. Over mobiele data startte de volledige video merkbaar traag. De metadata stond al vooraan bij beide bestanden, dus faststart was niet het probleem: het was puur de bestandsgrootte. De poster is meteen van 154 KB naar 89 KB gebracht, want die moet als eerste in beeld staan.
    - **`/producten` is nu een echte showcase:** het blok met toepassingen is eruit en `ProductShowcase` maakt het ene product de pagina, met een groot beeld, aanklikbare thumbnails, naam in Horizon, prijs en winkelmandknop. Bij een tweede product schakelt de pagina vanzelf terug naar een raster van kaarten.
    - **Nieuwsbriefcopy nogmaals aangepast:** "Nieuws uit de studio" suggereerde een studio die niet bestaat. Nu "Als eerste weten", met een regel die niets belooft over frequentie, korting of inhoud.

---

## 4. Openstaande punten

1. **Higgsfield-gebruik vereist voortaan expliciete toestemming per keer** — vastgelegd in memory. Niet meer proactief genereren.
2. **Checkout-flow ontbreekt** — "Naar afrekenen" doet niets.
3. **Formulieren zijn front-end only** — geen backend/e-mailservice. Het contactformulier toont "Bericht verzonden" terwijl er niets verstuurd wordt; koppel dit aan een mailservice voordat de site live gaat, anders denken klanten dat ze contact hebben opgenomen.
4. **Contactgegevens zijn aannames** — `hello@folea.nl` en de bereikbaarheid (ma t/m vr, 9:00-17:00) zijn door mij bedacht en moeten door de klant bevestigd worden.
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

---

## 6. Klantwijzigingen 14 augustus (document "Aanpassing webshop FOLEA 14 aug")

Alle punten uit dat document zijn doorgevoerd. Wat je moet weten voor vervolgwerk:

**Feitelijke correcties.** Er zat geen kokosolie in de formule, terwijl die wel op de site stond (in de ingrediëntenlijst én in de procestekst op Over Ons). Dat kwam uit mijn eerdere dummy-data en is nu rechtgezet met de door de klant aangeleverde ingrediënten. De kop "Vier werkstoffen, meer niet" is "De formule" geworden, omdat de formule er meer dan vier bevat.

**Nog te controleren bij de klant.** De INCI-naam bij ingrediënt 02 luidt "Chebe seed (lavandula stoechas)", maar *Lavandula stoechas* is Spaanse lavendel, niet chebe. Bij een cosmeticaproduct is een onjuiste INCI-naam vervelend, dus dit is het navragen waard.

**Nog open uit het document.** De instructie "Dan de link: Bekijk alle productinformatie:" loopt dood in het document; die link staat nog ongewijzigd op de collectiepagina. De honingvideo op Over Ons wordt door de developer zelf opnieuw opgenomen (minder honing, vallend op de deksel van de bovenste pot); tot die tijd blijft de huidige video staan.

**Marquee-band.** De klant vroeg de bewegende band met "100% natuurlijk / voor elke textuur" van de homepage te halen. Diezelfde band stond ook op `/producten` en `/contact` en is daar meegenomen, omdat de klacht over de band zelf ging en niet over de plek. Makkelijk terug te zetten met `<Marquee>` als dat niet de bedoeling was.

**Bedrijfsgegevens.** KVK en BTW zijn nu echt (42022057 / NL005441000B68). Het e-mailadres is overal `info@folea.nl`; er komt nog een definitief zakelijk adres. Snapchat is uit de footer.

---

## 7. Over Ons herontworpen (14 augustus)

De pagina liep als enige nog op de oude opzet. Nu:

- **Hero**: beige vlak met alleen typografie. Er stond eerst een modellenfoto met parallax; die is er op verzoek van de klant uit. Het roze zit een sectie lager, bij "Het begin".
- **Het verhaal**: de honingvideo met een ronddraaiend zegel eroverheen, naast de door de klant aangeleverde tekst. De kop is geschrapt, dus de eerste alinea is groter gezet om als aanhef te dienen.
- **Het proces**: zwart blok waar het beeld links blijft staan (`sticky`) terwijl de drie stappen ernaast langs scrollen, elk met een groot outline-nummer. Op mobiel valt het sticky beeld weg, want naast één kolom heeft dat geen zin. Twee dingen om niet terug te draaien: `items-start` op de grid (anders rekt de stappenkolom mee met het sticky beeld en blijft er onderaan lege ruimte over) en scheidingslijnen via `divide-y` in plaats van een achtergrondvlak onder de items (dat vlak schijnt door als een grijze balk zolang een stap nog aan het infaden is).
- **De missie**: beige, met de grote kop links en de tekst in een smallere kolom rechts, waarvan de eerste alinea een accentlijn krijgt. De productfoto die hier stond is er op verzoek uit; het blok draait nu volledig op typografie.

Kleurritme van de pagina: beige (hero) → roze (het begin) → zwart (het proces) → beige (de missie).

**Let op bij foto 110.** Die heet in de repo `model-portrait.jpg`, niet `model-kneeling-front`. Ik had hem eerst verkeerd benoemd op basis van de aanname dat hij de knielende foto verving; het is in werkelijkheid een schouderportret met kort krulhaar. Hij staat in de social-sectie op de vierde plek met `objectPosition: 50% 18%`, omdat een vierkant kader anders het hoofd afsnijdt.
