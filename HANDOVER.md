# FOLÉA Webshop — Handover

**Laatst bijgewerkt:** 12 augustus 2026, 20:56 (CEST)
**Repo:** `Snel Online Marketing/Folea` (git, branch `main`, 2 commits voor op origin). Laatste commit: `4fd142a` (Portfolio/Blog, herontwerp, reviews weg). Daarna nog uncommitted: nieuwe productfoto's + placeholder-systeem + design-pass (zie sectie 3, punt 13).
**Stack:** Next.js 16 (App Router) · TypeScript · Tailwind CSS v4 · Framer Motion · Zustand · lucide-react · embla-carousel-react

---

## 1. Status in één oogopslag

Alle 6 hoofdpagina's uit de oorspronkelijke opdracht staan: Home, Producten (+ PDP), Over Ons, Portfolio, Blog, Contact & FAQ. De site is inmiddels door meerdere feedbackrondes gegaan (kleuren, hero, footer, copy-toon) — zie sectie 3 voor wat er per ronde is aangepast. `npx tsc --noEmit` en `npx eslint src --max-warnings=0` zijn doorlopend schoon gehouden.

Dev server draait via `.claude/launch.json` (`npm run dev`, poort 3000).

---

## 2. Wat er staat

### Design tokens (`src/app/globals.css`)
Kleuren zijn Pantone-gerefereerd en bewust verzadigd (niet de originele zachte pastels): `forest` volgt Pantone Peridot, `earth` volgt Potting Soil, `blush` volgt Flushing Pink, `cream` volgt Papyrus. Crème/blush blijven de dominante achtergrondkleuren; forest/earth zijn alleen voor kleine accenten (labels, iconen, dunne randen, hooguit één knop per sectie) — deze regel staat ook vastgelegd in het auto-memory-systeem.

Er is een `blush`-gevulde button-variant toegevoegd (`buttonVariants({ variant: "blush" })`) naast primary/secondary/ghost/earth, gebruikt voor de hero-CTA.

Typografie: Cormorant Garamond (serif) + Plus Jakarta Sans (sans). Taal: 100% Nederlands.

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
| `/` | Header, Hero (video-achtergrond, gecentreerd bovenaan), USP-bar, Product Spotlight, "Hoe te Gebruiken" (tabbed), Newsletter, Instagram-grid, Footer. **Geen reviews-sectie meer.** |
| `/producten` | Shop-overzicht, productgrid (1 product, gecentreerd i.p.v. links uitgelijnd in leeg grid) |
| `/producten/hairbutter` | PDP: alleen fotogalerij (geen 3D/video-tabs meer), prijs, aantal-selector, "in winkelmand", ingrediënten-accordeon, gebruiksaanwijzing per haartype. **Geen sterren-rating meer.** |
| `/over-ons` | Storytelling: ontstaan (nu met de product-pour video i.p.v. statisch beeld), proces (3 stappen), missie/waarden met stats |
| `/portfolio` | "Textuur & Ritueel" — filterbare lookbook-grid (4 stemmingsbeelden gekoppeld aan de 4 toepassingen), lightbox bij klikken |
| `/blog` | 4 artikelkaarten met categorie-filter, leestijd, datum |
| `/contact` | Contactformulier (front-end only), contactinfo-kaart, FAQ-accordeon |

### Globale functionaliteit
- **Cart** (zustand): add/remove/update/subtotal, werkend getest overal waar "in winkelmand" staat.
- **Cart Drawer**: slide-in, gratis-verzending-indicator bij €45, checkout-knop doet nog niets (geen betaalflow).
- **Header**: staat nu **altijd solid** (crème, backdrop-blur) — niet meer transparant boven de hero. Mobiel hamburgermenu, werkende zoek-overlay (filtert live op producten.ts).
- **Footer**: herbouwd met betaal-badges (Apple Pay/iDEAL/Wero/Creditcard) — zie openstaand punt hieronder over de logo's.

### Copy-conventies (belangrijk voor vervolgwerk)
- **Geen em dashes (—)** waar dan ook. Herschrijven met punt, dubbele punt of komma.
- **Geen "ambachtelijk"** — vervangen door "met zorg gemaakt", "met de hand gemaakt", "handgemaakt", of gewoon weggelaten.
- **Geen reviews/sterren/testimonials** nergens op de site, omdat er geen echte reviews bestaan.

### Assets
- `public/video/hero.mp4` (4,3MB, CRF 18, volledige 1920px breedte) + `hero-poster.jpg` — herzien tijdens deze sessie nadat een eerdere te agressieve compressie kwaliteitsverlies gaf. Bron: `IMG_9125.MOV`.
- `public/video/product-pour.mp4` (946KB) + `product-pour-poster.jpg` — de cinemagraph (gouden olie over de potjes), nu in Over Ons i.p.v. op de PDP.
- `public/images/hairbutter-stack.jpg`, `hairbutter-jar-solo.jpg` — echte productfoto's.
- `public/images/portfolio-*.jpg`, `blog-*.jpg` — via Higgsfield gegenereerde editorial stills (zie openstaand punt: gebruiker wil voortaan expliciet toestemming per generatie).
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
14. **Aparte FAQ-pagina + placeholders teruggedraaid (nog niet gecommit):** `/faq` is nu een eigen pagina (accordeon + "Naar contact"-kaart); de contactpagina is geslankt tot formulier + contactinfo en linkt naar `/faq`; footer-Klantenservice linkt naar beide. De "fotoshoot komt eraan"-placeholdersecties (ImagePlaceholder/CampaignPreview/StudioPeek) zijn op verzoek weer verwijderd: de nog te ontvangen foto's zijn een interne kwestie voor de developer, geen site-content. De Instagram-grid onderaan de homepage blijft staan als de bewuste placeholder-sectie.

---

## 4. Openstaande punten

1. **iDEAL/Wero-logo klopt niet.** De gebruiker stuurde de echte badge-afbeeldingen (Apple Pay + gecombineerde iDEAL/Wero) maar die zijn als inline chat-afbeelding geplakt, niet als bestand — ik kon ze niet oppakken. Zelfgetekende SVG-benadering in `components/ui/PaymentBadges.tsx` is door de gebruiker afgekeurd. **Actie nodig:** gebruiker moet de originele logo-bestanden (PNG/SVG) in `public/images/` zetten (bijv. `payment-ideal-wero.png`, `payment-apple-pay.png`), dan worden ze als `next/image` ingeladen i.p.v. de handgetekende versie.
2. **Higgsfield-gebruik vereist voortaan expliciete toestemming per keer** — vastgelegd in memory. Niet meer proactief genereren.
3. **Checkout-flow ontbreekt** — "Naar afrekenen" doet niets.
4. **Formulieren zijn front-end only** — geen backend/e-mailservice.
5. **Placeholder bedrijfsgegevens** — KvK/BTW-nummer in de footer zijn nog dummy-waarden.
6. **Meer echte productfoto's** zouden de PDP-galerij (nu 1 unieke foto) sterker maken.
7. Bericht van de gebruiker "de Ideal\\" kwam onvolledig binnen tijdens deze sessie — mogelijk was er meer te zeggen over het logo-punt hierboven; navragen bij volgende sessie als het niet vanzelf duidelijk wordt.

---

## 5. Hoe verder te werken

```bash
npm run dev        # dev server op localhost:3000
npx tsc --noEmit    # typecheck
npx eslint src      # lint
```

`.claude/launch.json` staat klaar zodat de Browser-preview-tooling de dev server automatisch kan starten onder de naam `folea-dev`.

**Voor de volgende sessie:** begin met het logo-bestand-punt hierboven (blokkerend voor een correcte footer), en overweeg een commit te maken nu de site door een grote hoeveelheid wijzigingen is gegaan sinds de laatste commit.
