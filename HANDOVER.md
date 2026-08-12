# FOLÉA Webshop — Handover

**Laatst bijgewerkt:** 12 augustus 2026, 14:06 (CEST)
**Repo:** `Snel Online Marketing/Folea` (git, branch `main`, nog geen commits van deze sessie — alles staat als untracked/gewijzigd op disk)
**Stack:** Next.js 16 (App Router) · TypeScript · Tailwind CSS v4 · Framer Motion · Zustand · lucide-react · embla-carousel-react

---

## 1. Status in één oogopslag

Fase 1–3 uit de oorspronkelijke opdracht (project setup, design tokens, componenten/pagina's) zijn onderweg. Vier van de zes geplande pagina's staan en zijn functioneel getest. Nog niet gestart: **Portfolio/Lookbook** en **Blog**. Fase 4 (code review/optimalisatie-pass) is nog niet als aparte stap uitgevoerd, al is elke pagina na bouwen gecontroleerd met `tsc --noEmit` en `eslint` (beide steeds schoon) plus browsertests.

Dev server draait via `.claude/launch.json` (`npm run dev`, poort 3000).

---

## 2. Wat er staat

### Design tokens & basis (`src/app/globals.css`)
- Kleuren als CSS-variabelen + Tailwind v4 `@theme`: `blush`, `blush-deep`, `cream`, `cream-deep`, `forest`, `forest-light`, `earth`, `earth-light`, `charcoal`, `charcoal-soft`.
- **Belangrijke designregel (expliciete klantfeedback tijdens sessie):** crème/beige en roze/blush zijn de dominante achtergrondkleuren op de site. Forest green en earth brown zijn alleen voor kleine details — labels, dunne randen, icoon-strokes, headings, hooguit één CTA-knop per sectie. Niet als grote kleurvlakken. Dit is ook vastgelegd in het auto-memory-systeem (`folea_color_balance.md`) zodat het in vervolgsessies wordt toegepast.
  - Homepage **Newsletter** en **Footer** zijn al omgezet van volledig groen naar crème/roze-met-groen-accent.
- Typografie: Cormorant Garamond (serif, headings) + Plus Jakarta Sans (sans, body) via `next/font/google`.
- Taal: 100% Nederlands, `lang="nl"` in de root layout.

### Mappenstructuur (OOP-opzet zoals gevraagd)
```
src/
  app/                     → routes (App Router)
  components/
    ui/                    → Button, Container, Accordion, QuantitySelector, SocialIcons
    layout/                → Header, Footer, CartDrawer
    business/              → alle sectie-/feature-componenten per pagina
  lib/
    data/                  → dummy data (products, reviews, faq)
    store/                 → cart-store.ts (zustand)
    utils/                 → cn.ts (class merge), format.ts (prijsformattering)
  hooks/                   → useCart.ts
  types/                   → product.ts, cart.ts, review.ts
```

### Pagina's die klaar en getest zijn

| Route | Inhoud |
|---|---|
| `/` | Header, Hero (video-achtergrond, geoptimaliseerd van `IMG_9125.MOV`), USP-bar, Product Spotlight, "Hoe te Gebruiken" (tabbed), Reviews slider, Newsletter, Instagram-grid, Footer |
| `/producten` | Shop-overzicht, productgrid (nu 1 product, schaalbaar) |
| `/producten/hairbutter` | Volledige PDP: fotogalerij met thumbnails, prijs, rating, aantal-selector, "in winkelmand", ingrediënten-accordeon, gebruiksaanwijzing per haartype |
| `/over-ons` | Storytelling: ontstaan, ambacht/kwaliteitscontrole (3 stappen), missie/waarden met stats |
| `/contact` | Contactformulier (front-end only, geen backend), contactinfo-kaart, FAQ-accordeon (5 vragen) |

### Globale functionaliteit
- **Cart (zustand store, `lib/store/cart-store.ts`)**: add/remove/update quantity, subtotal, item count — werkend getest (toevoegen vanaf homepage, PDP en shopgrid, hoeveelheid aanpassen, gratis-verzending-indicator bij €45).
- **Cart Drawer**: slide-in vanaf rechts, opent automatisch bij toevoegen, subtotaal + checkout-knop (checkout zelf nog niet gebouwd — geen betaalflow).
- **Header**: sticky, transparant → solid bij scroll, mobiel hamburgermenu, cart-badge met live counter.
- Alle interactieve componenten zijn getest op zowel desktop- als mobiel-viewport (375×812).

### Assets
- `public/video/hero.mp4` + `hero-poster.jpg` — getranscodeerd (H.264, ~1.9MB) van `IMG_9125.MOV` uit Downloads, want het origineel was HEVC (geen brede browsersupport).
- `public/images/hairbutter-stack.jpg` — productfoto, geëxporteerd/verkleind vanuit een PNG in Downloads (`hf_20260812_101411_...png`). Dit is momenteel de **enige** echte productfoto; wordt hergebruikt op meerdere plekken (PDP-galerij toont 'm 3x, Over Ons-storysectie, shopgrid).

### Kwaliteit
- `npx tsc --noEmit` en `npx eslint src --max-warnings=0` zijn na elke pagina schoon opgeleverd.
- Geen console-errors in de browser (geverifieerd per pagina, inclusief een sessie waarin een stale lucide-react import — `Instagram` bestaat niet meer in de geïnstalleerde versie — werd gefixt met eigen SVG-iconen in `components/ui/SocialIcons.tsx`).

---

## 3. Nog te doen (uit de oorspronkelijke scope)

1. **Portfolio / Lookbook** (`/portfolio`) — visuele gallery per haartype, filteropties. Nog niet gestart; er is geen fotomateriaal voor "resultaten" beschikbaar buiten het ene productfoto — moet besproken worden of er dummy/placeholder styling komt of dat er meer beeldmateriaal nodig is.
2. **Blog** (`/blog`) — artikeloverzicht met categorieën en leestijd. Nog niet gestart, geen content geschreven.
3. **Meer productfoto's** — voor een echte galerij-ervaring op de PDP is er nu maar 1 unieke foto (3x herhaald). Zou goed zijn om meer hoeken/foto's te krijgen.
4. **Checkout-flow** — de "Naar afrekenen" knop in de cart drawer doet nog niets; er is geen checkoutpagina of betaalintegratie (iDEAL/Bancontact/Creditcard staan nu alleen als visuele badges in de footer).
5. **Formulieren zijn front-end only** — contactformulier en nieuwsbrief-inschrijvingen simuleren alleen een succesmelding; er is geen backend/e-mailservice gekoppeld.
6. **Placeholder bedrijfsgegevens** — KvK-nummer en BTW-nummer in de footer zijn nog `00000000` / `NL000000000B00`, moeten vervangen worden door de echte gegevens.
7. Homepage Newsletter/Footer-kleuren zijn aangepast; het is de moeite waard om ook nog eens kritisch naar de rest van de site te kijken of alles consistent de crème/roze-dominant-regel volgt.

---

## 4. Hoe verder te werken

```bash
npm run dev        # dev server op localhost:3000
npx tsc --noEmit    # typecheck
npx eslint src      # lint
```

`.claude/launch.json` staat al klaar zodat de Browser-preview-tooling de dev server automatisch kan starten onder de naam `folea-dev`.

Voor de volgende sessie: begin met Portfolio of Blog (user's keuze), of vraag eerst om aanvullend fotomateriaal voor het Portfolio-lookbook.
