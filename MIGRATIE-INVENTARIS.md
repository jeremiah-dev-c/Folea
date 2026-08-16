# Migratie-inventaris: Next.js naar Shopify Liquid

**Bron:** deze repo (Next.js 16 App Router, TypeScript, Tailwind v4)
**Doel:** custom thema voor winkel `folea-gsz0is6r`
**Eis:** de klant beheert daarna zelf teksten, afbeeldingen, kleuren en sectievolgorde

Nog niets omgezet. Dit is de inventaris ter goedkeuring.

---

## 1. Routes

De site telt zes routes. Shopify legt vaste voorvoegsels op die je niet kunt
wijzigen, dus vier van de zes URL's veranderen.

| Nu | Shopify-template | URL wordt | Type |
|---|---|---|---|
| `/` | `templates/index.json` | `/` | content (met commerce-blok) |
| `/producten` | `templates/collection.json` | `/collections/<handle>` | commerce |
| `/producten/hairbutter` | `templates/product.json` | `/products/nourishing-hairbutter` | commerce |
| `/over-ons` | `templates/page.over-ons.json` | `/pages/over-ons` | content |
| `/contact` | `templates/page.contact.json` | `/pages/contact` | content |
| `/faq` | `templates/page.faq.json` | `/pages/faq` | content |
| `src/app/layout.tsx` | `layout/theme.liquid` + `sections/header-group.json` + `sections/footer-group.json` | n.v.t. | chrome |

### Templates die er nieuw bij komen

Deze bestaan niet in de Next-site maar zijn wel nodig, en de accountpagina's
zijn juist de reden dat de klant naar Shopify wil:

- `templates/cart.json` (de huidige cart is alleen een drawer, geen pagina)
- `templates/search.json`
- `templates/404.json`
- `templates/customers/login`, `register`, `account`, `order`,
  `addresses`, `reset_password`, `activate_account`
- `templates/page.json` als generieke val voor toekomstige pagina's

De accountpagina's komen functioneel uit het basisthema, maar moeten wel in
deze huisstijl gezet worden. Dat is de post die bij dit soort migraties
standaard buiten de begroting valt.

---

## 2. Componenten

33 componenten. Indeling: **SECTION** is een paginabreed patroon dat de klant
in de theme editor kan verplaatsen, **BLOCK** is een herbruikbaar stuk dat ze
binnen een sectie plaatst, **SNIPPET** is een interne partial zonder eigen
instellingen.

### Layout (`src/components/layout/`)

| Component | Wordt | Hardcoded nu | Setting-type |
|---|---|---|---|
| `Header` | SECTION in `header-group.json` | 4 navigatie-items (Home, Producten, Over Ons, Contact) | `link_list` |
| | | logo als tekst "FOLÉA." | `image_picker` + `text` fallback |
| | | transparant-over-hero alleen op `/` | `checkbox` per template |
| | | scrolldrempel 40px | `range` |
| `Footer` | SECTION in `footer-group.json` | kop "Blijf verbonden met FOLÉA" | `text` |
| | | subtekst "Ontdek als eerste nieuwe producten…" | `inline_richtext` |
| | | 3 linkkolommen (Winkel, FOLÉA, Hulp) met 6 links | 3x `link_list` + 3x `text` |
| | | socials: instagram.com/foleahair, tiktok.com/@folea | `url` per blok |
| | | `info@folea.nl` | `text` |
| | | KvK 42022057, BTW NL005441000B68 | `text` (2x) |
| | | "Webdesign by SOM" + snelonlinemarketing.nl | `richtext` |
| | | jaartal via `BOUWJAAR` + `useSyncExternalStore` | vervalt, zie §5 |
| `CartDrawer` | SNIPPET + JS | drempel gratis verzending €45 | `range` in settings |
| | | "Je winkelmand is nog leeg." | `locales/nl.default.json` |

### Paginasecties (`src/components/business/`)

| Component | Wordt | Hardcoded nu | Setting-type |
|---|---|---|---|
| `Hero` | SECTION | `hero.mp4`, `hero-mobile.mp4`, `hero-poster.jpg` | `video` + `image_picker` |
| | | wordmark "FOLÉA." letter voor letter | `text` |
| | | "Inspired by nature, created with intention." | `inline_richtext` |
| | | CTA "Shop the collection" → `/producten` | `text` + `url` |
| | | overlay 45% ink + gradient | `range` (dekking) + `color` |
| `ProductSpotlight` | SECTION | `product-butter.jpg` | `product` (haalt beeld uit product) |
| | | zegeltekst "100% natuurlijk · voor elke textuur ·" | `text` |
| | | parallax op het beeld | `checkbox` |
| `Marquee` | BLOCK | tekstitems, `baseVelocity`, outlined ja/nee | `text`, `range`, `checkbox` |
| `PhotoMarquee` | SECTION | 6 modelfoto's | blocks met `image_picker` |
| | | overlaytekst "FOLÉA." 3x | `text` |
| `StatementSplit` | SECTION | `model-duo-floor.jpg` | `image_picker` |
| | | kop "Jouw haar. Jouw ritueel." | `text` |
| | | alinea (klanttekst) | `richtext` |
| | | CTA → `/producten/hairbutter` | `text` + `url` |
| `Ingredients` | SECTION | eyebrow + kop "De formule" | `text` (2x) |
| | | 4 ingrediënten uit `products.ts` | metaobject, zie §3 |
| | | "Geen parabenen, sulfaten of dierlijke bestanddelen." | `inline_richtext` |
| `InstagramGrid` | SECTION | kop "Laat je inspireren door FOLÉA" | `text` |
| | | 5 tegels met eigen `objectPosition` | blocks: `image_picker` + `select` |
| | | handles `foleahair` en `folea` + 2 URL's | `text` + `url` per blok |
| `AboutStory` | SECTION | h1 "Inspired by nature, created with intention" | `text` |
| | | eyebrow "Het begin" | `text` |
| | | 3 alinea's klanttekst | `richtext` |
| | | `product-pour.mp4` + poster | `video` + `image_picker` |
| | | zegeltekst "100% natuurlijk · met de hand gemaakt ·" | `text` |
| | | breedtecap 21rem op desktop | `range` |
| `AboutCraft` | SECTION | eyebrow "Het proces" + kop | `text` (2x) |
| | | 3 stappen (titel + omschrijving) | blocks: `text` + `richtext` |
| | | `product-duo.jpg` | `image_picker` |
| `AboutValues` | SECTION | eyebrow "Onze missie" + kop | `text` (2x) |
| | | 3 alinea's klanttekst | `richtext` |
| | | CTA "Ontdek de hairbutter" | `text` + `url` |
| `ContactHero` | SECTION | kop "We horen graag van je" | `text` |
| | | intro (letterlijke klanttekst) | `richtext` |
| `ContactInfo` | BLOCK | `info@folea.nl` | `text` |
| | | "Maandag t/m zondag, 10:00 tot 20:00" | `text` |
| | | labels "Rechtstreeks" / "Bereikbaar" | `text` (2x) |
| `ContactForm` | SECTION | 5 onderwerpen in de keuzelijst | blocks of `textarea` |
| | | `product-drip.jpg` + bijschrift | `image_picker` + `text` |
| | | bevestigingstekst | `richtext` |
| `ContactFaqCta` | SECTION | eyebrow, kop, knoptekst, `/faq` | `text` (3x) + `url` |
| `FaqList` | SECTION | vragen uit `faq.ts` | metaobject, zie §3 |
| `ProductDetail` | SECTION (`main-product`) | kop "Gebruiksaanwijzing Nourishing hairbutter" | `text` |
| | | kop "Hoofdingrediënten" | `text` |
| | | prijs, naam, omschrijving | Shopify `product` |
| `ProductGallery` | BLOCK binnen main-product | 2:3 kader, `object-cover` | `select` (verhouding) |
| `ProductShowcase` | SECTION | beeldcap, "Bekijk alle productinformatie" | `range` + `text` |
| `ProductCard` | SNIPPET (`card-product`) | — | — |
| `SearchOverlay` | SNIPPET + JS | placeholder, "Geen producten gevonden" | `locales` |

### UI-primitieven (`src/components/ui/`)

| Component | Wordt | Opmerking |
|---|---|---|
| `Container` | CSS-klasse | geen component; `max-w-[1440px]` + responsive padding |
| `Button` | SNIPPET | 5 varianten via `cva` → Liquid-parameters |
| `BrandText` | SNIPPET of Liquid-filter | wikkelt elke "FOLÉA" in het displayfont op `0.86em` |
| `RotatingBadge` | SNIPPET | SVG textPath, pure CSS-rotatie |
| `FillOnScroll` | SNIPPET + JS | `clip-path` gestuurd door scrollpositie |
| `VelocityTrack` | JS-module | zie §4 en §6, dit is het zwaarste onderdeel |
| `QuantitySelector` | SNIPPET + JS | koppelen aan Cart AJAX API |
| `PaymentBadges` | SNIPPET | Apple Pay als SVG, iDEAL/Wero als PNG |
| `SocialIcons` | SNIPPET | eigen SVG's; `lucide-react` levert geen merkiconen |

---

## 3. Data

### Nu

Er is geen backend. `src/lib/data/*.ts` exporteert getypte constanten die
direct in server- en clientcomponenten worden geïmporteerd.

| Bron | Inhoud | Wordt in Shopify |
|---|---|---|
| `products.ts` | 1 product: naam, tagline, omschrijving, prijs €39,95, 5 foto's | `product` object |
| `products.ts` → `ingredients[]` | 4 hoofdingrediënten met omschrijving | **metaobject** |
| `products.ts` → `usageMethods[]` | 2 methodes (Deep treatment, Styling butter) | **metaobject** |
| `products.ts` → `highlights[]` | 4 bullets, nergens gerenderd | vervalt |
| `faq.ts` | 5 vragen, antwoorden als blokken-array | **metaobject** |
| `cart-store.ts` | winkelmandstaat in zustand | `cart` object + Cart AJAX API |
| `InstagramGrid` tiles | 5 foto's met bijschrift | sectieblokken |
| `AboutCraft` steps | 3 processtappen | sectieblokken |

### Voorstel metaobjects

**`hoofdingredient`**
| Veld | Type | Opmerking |
|---|---|---|
| `naam` | single_line_text | bv. "Butyrospermum parkii" |
| `omschrijving` | multi_line_text | letterlijk van de klant, niet zelf invullen |

**`gebruiksmethode`**
| Veld | Type | Opmerking |
|---|---|---|
| `titel` | single_line_text | "Deep treatment" |
| `ondertitel` | single_line_text | "Voor intensieve verzorging" |
| `omschrijving` | multi_line_text | letterlijk van de klant |

**`veelgestelde_vraag`**
| Veld | Type | Opmerking |
|---|---|---|
| `vraag` | single_line_text | |
| `antwoord` | rich_text | ondersteunt tussenkoppen en links |

FAQ als metaobject in plaats van sectieblokken, omdat de antwoorden ook de
FAQPage structured data voeden. Eén bron, geen kans dat die twee uiteenlopen.

### Voorstel metafields op het product

| Metafield | Type |
|---|---|
| `custom.hoofdingredienten` | `list.metaobject_reference` → `hoofdingredient` |
| `custom.gebruiksmethodes` | `list.metaobject_reference` → `gebruiksmethode` |
| `custom.tagline` | `single_line_text` ("Inspired by nature. Created with intention.") |

**Alternatief, simpeler:** bij één product kun je ingrediënten en gebruik ook
als twee rich-text-metafields doen. Scheelt opzetwerk, maar de klant verliest
de structuur (nummering, consistente opmaak) en jij verliest de losse velden
voor de structured data. Ik adviseer metaobjects, maar zeg het als je liever
snel wilt.

---

## 4. Styling

### Tailwind

- **Tailwind v4** via `@tailwindcss/postcss`
- **Geen `tailwind.config.js`.** Alles staat in `src/app/globals.css` met de
  CSS-gebaseerde `@theme inline`-syntax
- In een thema wordt dit een buildstap die `assets/theme.css` oplevert; die
  committeer je mee, want Shopify draait zelf geen bundler

### Voorstel `config/settings_schema.json`

| Instelling | Type | Waarde nu |
|---|---|---|
| Beige achtergrond | `color` | `#e9e3cb` |
| Beige donker | `color` | `#d8d0ae` |
| Roze | `color` | `#f9a3bd` |
| Roze diep | `color` | `#f2779f` |
| Roze zacht | `color` | `#fbd3e0` |
| Zwart (ink) | `color` | `#0a0a0a` |
| Zwart hover | `color` | `#2e2e2e` |
| Tekstkleur | `color` | `#1c1c1c` |
| Tekst gedempt | `color` | `#4a4a4a` |
| Displayfont | `font_picker` + eigen upload | Horizon (zie §6) |
| Tekstfont | `font_picker` | Plus Jakarta Sans |
| Radius klein/midden/groot | `range` | 6 / 12 / 20 px |
| Paginabreedte | `range` | 1440px |
| Animaties aan | `checkbox` | true |

`theme.liquid` publiceert deze als CSS custom properties op `:root`, zodat
alle bestaande CSS-variabelen (`--color-blush` enz.) blijven werken.

**Let op:** `earth` en `earth-light` zijn gedefinieerd maar worden nergens meer
gebruikt. Niet meenemen.

### Animatie

| Nu | Straks |
|---|---|
| `framer-motion` 13 (23 van de 33 componenten) | zie hieronder |
| `whileInView` fade + verschuiving (verreweg de meeste) | één gedeelde IntersectionObserver + CSS-transitie |
| `VelocityTrack` (scrollsnelheid gekoppeld aan bandsnelheid) | `requestAnimationFrame`-lus, ~60 regels JS |
| `FillOnScroll` (`clip-path` op scrollpositie) | scroll-listener + CSS-variabele |
| `RotatingBadge` | pure CSS `@keyframes` rotatie |
| `Hero` letter-voor-letter | CSS-animatie met oplopende `animation-delay` |
| `AnimatePresence` in galerij/drawer/zoek | CSS-transities op `opacity` |
| `prefers-reduced-motion` (staat al in `globals.css`) | ongewijzigd overnemen |

Overweeg **Motion One** als je dichter bij het huidige gevoel wilt blijven:
zelfde makers als Framer Motion, geen React, een paar kB, en het doet
scroll-gekoppelde animatie native.

`embla-carousel-react` staat nog in `package.json` maar wordt nergens meer
geïmporteerd. Niet meenemen.

---

## 5. Weggooien

Expliciet niet migreren:

- **App Router** (`src/app/**`): routing, `layout.tsx`, `metadata`-export,
  `LayoutProps`. Shopify bepaalt de routing.
- **Data-laag** (`src/lib/data/*.ts`, `src/types/*.ts`): wordt Shopify-data.
- **Cart-state**: `zustand`, `cart-store.ts`, `useCart.ts`. Vervangen door het
  `cart`-object en de Cart AJAX API.
- **`next/image`**: vervangen door `image_url` met `srcset`. De hele
  beeldpijplijn en de 2400px/q84-regel uit CLAUDE.md gaan mee als
  *werkwijze voor bronbestanden*, maar de code vervalt.
- **`next/font`**: fonts worden `assets/*.woff2` met `@font-face`.
- **`SearchOverlay`-filterlogica**: filtert nu een array van 1 product. Wordt
  de Predictive Search API.
- **Hulpjes**: `cn.ts`, `clsx`, `tailwind-merge`, `class-variance-authority`.
  Liquid heeft geen className-merge nodig.
- **`useSyncExternalStore`-constructie voor het jaartal**: in Liquid is dat
  `{{ 'now' | date: '%Y' }}`. Het hele probleem verdwijnt.
- **Toolchain**: `eslint-config-next`, `next.config.ts`, `tsconfig.json`.
  Daarvoor in de plaats komt `shopify theme check`.
- **`highlights[]`** in `products.ts`: dode data, wordt nergens gerenderd.
- **`earth` / `earth-light`** kleurtokens: ongebruikt.
- **`embla-carousel-react`**: ongebruikte dependency.

---

## 6. Risico's

**1. Licentie Horizon-lettertype.** Staat al open in dit project en verandert
niet door de migratie, maar in een thema wordt `assets/Horizon.woff2` net zo
publiek opvraagbaar als nu. Uitzoeken vóór livegang.

**2. URL's veranderen.** Vier van de zes routes krijgen een Shopify-voorvoegsel.
De site staat nog niet echt live, dus de schade is beperkt, maar leg redirects
klaar als er ergens links naar de oude paden staan.

**3. `VelocityTrack` is het zwaarste onderdeel.** Het koppelt de loopsnelheid
van de banden aan je scrollsnelheid, inclusief omkeren bij omhoog scrollen, en
verdubbelt de inhoud voor een naadloze lus. Reken hier de meeste tijd voor.

**4. De typografie is uitgerekend, niet gekozen.** Meerdere koppen hebben een
`clamp()` die precies is afgestemd op de breedte van Horizon. "created with
intention" is ruim 20x de lettergrootte breed, en daar is de maat op gezet.
**Zodra de klant die tekst zelf kan wijzigen, klopt die afstemming niet meer.**
Voorstel: zulke koppen wel bewerkbaar maken, maar met een `range` voor de
lettergrootte erbij, plus een notitie in de sectiebeschrijving.

**5. Contactformulier.** Shopify's ingebouwde `{% form 'contact' %}` heeft
vaste velden (naam, e-mail, telefoon, bericht). Het onderwerp-keuzeveld kan
mee als extra veld, maar de opmaak is minder vrij dan nu. Positief: het
formulier krijgt eindelijk een werkende backend, wat nu het laatste
blokkerende punt voor livegang is.

**6. Hero met twee videobronnen.** De mobiele variant staat als eerste
`<source>` met een media-query, omdat de volle video op mobiele data traag
startte. In Shopify moet je die bestanden via Files hosten en de URL's zelf
uitschrijven; de `video`-setting geeft je Shopify-gehoste video met eigen
transcodering en daar heb je die controle niet. Voorstel: Files + directe
URL's, en de autoplay-reparatie in drie stappen ongewijzigd overnemen.

**7. FAQ structured data.** De JSON-LD wordt nu opgebouwd uit dezelfde data als
de accordeon. In Liquid kan dat identiek, mits de FAQ uit één bron komt. Nog
een argument voor het metaobject.

**8. `BrandText`.** Wikkelt automatisch elke "FOLÉA" in lopende tekst in het
displayfont op `0.86em`. In Liquid kan dat met een `replace`-filter, maar dan
alleen op platte tekst; in `richtext` van de klant moet je oppassen dat je geen
HTML kapot maakt. Voorstel: een snippet die alleen op afgebakende velden werkt.

**9. Themes leveren reviews mee.** Het Skeleton-startpunt en de meeste blokken
hebben rating-onderdelen. Die moeten er actief uit: de site draagt bewust
**geen reviews of sterren**, omdat er nog geen echte zijn.

**10. Kleurritme.** Sinds 15 augustus opent bijna elke pagina in het roze. Als
de klant straks zelf achtergronden per sectie kan zetten, kan dat verder
uitdijen. Voorstel: de achtergrondkeuze beperken tot een `select` met de drie
merkkleuren in plaats van een vrije `color`.

**11. Gratis verzending vanaf €45 bij een product van €39,95.** Met één potje
haalt niemand die drempel. Dat wordt in Shopify een verzendregel, dus iemand
moet dit besluiten vóór de inrichting.

---

## Vragen voordat we bouwen

1. **Collectie-handle en producttitel.** Wordt het product `nourishing-hairbutter`
   en de collectie `alle-producten`? Dat bepaalt de definitieve URL's.

2. **Metaobjects of rich-text-metafields** voor ingrediënten en gebruik? Zie §3.
   Metaobjects zijn netter, rich text is sneller opgezet.

3. **Hoe vrij mag de klant secties herschikken?** Volledige vrijheid betekent
   dat elke sectie op elke achtergrond en in elke volgorde kan staan, en dat
   het ontwerp uit balans te trekken is. Alternatief: vaste volgorde per
   template, wel alle teksten en beelden bewerkbaar.

4. **Meertaligheid?** Ik richt `locales/nl.default.json` in. Komt er later
   Engels bij, dan is het handig daar nu al rekening mee te houden.

5. **Bestaat de Shopify-winkel al met producten erin,** of moet ik in een
   development store beginnen? Voor het bouwen van het thema heb je nog geen
   betaald abonnement nodig.
