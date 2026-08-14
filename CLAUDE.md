# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

@AGENTS.md

## Commands

```bash
npm run dev      # start dev server (localhost:3000), also wired as the "folea-dev" launch config
npm run build    # production build
npm run start    # serve the production build
npm run lint     # eslint (flat config: eslint-config-next core-web-vitals + typescript)
npx tsc --noEmit # typecheck (no separate typecheck script defined)
```

There is no test suite/framework configured in this repo — don't assume Jest/Vitest exist.

## Architecture

Next.js 16 App Router + TypeScript + Tailwind CSS v4, building **FOLÉA**, a Dutch-language e-commerce site for a single flagship product (a hair butter). UI copy is Dutch, with one deliberate exception: **the brand's own wording is English because it is printed on the jar** — `FOLÉA.`, the tagline *Inspired by nature, created with intention.* and the product name *Nourishing hairbutter*. Match the label, not a translation. Everything else stays Dutch.

### Design tokens (`src/app/globals.css`)

Tailwind v4's CSS-based `@theme` is used instead of `tailwind.config.js` — colors, fonts, radii and the easing curve are all defined as CSS variables there and consumed as Tailwind utilities (`bg-blush`, `text-ink`, `font-display`, etc.).

**Two fonts, and `font-serif` no longer exists.** Cormorant Garamond was dropped on client request.

- **Horizon** (`font-display`, `--font-horizon`) is the display face from the jar label, loaded from `src/app/fonts/Horizon.woff2` via `next/font/local`. It has a full charset including `É`, but the lowercase glyphs are the same shapes as the capitals at identical widths, so **it is an all-caps face in practice**. Only use it with `uppercase` for the FOLÉA wordmark, short section headings and labels. Never for running text or long Dutch headings.
- **Horizon Outlined** (`font-outline`, `--font-horizon-outline`) is the same face in outline. It exists for one effect: `FillOnScroll`, where a heading is drawn as an outline and fills in with the solid variant as you scroll past it. Don't use it as a plain heading font, since outline type at small sizes is unreadable.

**Horizon has a `€` glyph that renders empty.** A price set in `font-display` shows up as "39,95" with the euro sign silently missing. Set prices and any currency in `font-sans`. Digits and `%` are fine.
- **Plus Jakarta Sans** (`font-sans`, `--font-jakarta`) carries everything else, including all `h1`–`h6`. `globals.css` sets h1–h6 to `font-sans` at weight 500. Jakarta has a much larger x-height than the old serif, so headings sit one step lower on the scale than they did (`text-3xl md:text-4xl` where it used to be `text-4xl md:text-5xl`).

**Never put a bare element selector outside `@layer`.** `h1–h6` live in `@layer base` for a reason: unlayered CSS beats everything Tailwind puts in `@layer utilities`, so an unlayered `h1 { font-family: … }` silently overrode `font-display` on every heading and the hero rendered in the wrong face while looking plausible. If a utility class mysteriously does nothing, check for an unlayered rule in `globals.css` first.

**Standing color-balance rule:** three section backgrounds carry the site, and they alternate: `cream` beige, `blush` hot pink, and full-black `ink`. `earth` (brown) is accent-only. The client explicitly rejected white and pastel: `cream` is a visible khaki beige (`#e9e3cb`) and `blush` is a saturated pink (`#f9a3bd`), both sampled from the reference design they supplied. `blush-soft` (`#fbd3e0`) exists for the rare case where a genuinely soft pink is needed. Don't drift these back toward white or pastel.

**No green and no red in the interface.** The original `forest` (Pantone Peridot) green went first; the `berry` carmine red that replaced it was itself removed on client request and replaced site-wide by `ink` (`#0a0a0a`, hover `#2e2e2e`). Buttons, headings and accents are black now. Red still appears everywhere in the *product photography* (the jar label is carmine), which is exactly the point: the interface stays neutral so the product supplies the only colour. Don't reintroduce green or a red UI token.

There is also a `blush`-filled button variant (`buttonVariants({ variant: "blush" })`, charcoal text on blush background) alongside `primary`/`secondary`/`ghost`/`earth`.

### Directory layout

```
src/
  app/                 routes (App Router), one page.tsx per route, metadata exported per page
    fonts/              Horizon.woff2, consumed by next/font/local in layout.tsx
  components/
    ui/                generic, reusable primitives (Button, Container, Accordion, QuantitySelector, SocialIcons, PaymentBadges)
    layout/             global chrome: Header, Footer, CartDrawer — rendered once from src/app/layout.tsx
    business/           page-section components, one per homepage/PDP/etc. section, mostly client components
  lib/
    data/               static/dummy data (products.ts, faq.ts), typed against src/types
    store/              zustand stores (cart-store.ts)
    utils/              cn.ts (clsx + tailwind-merge), format.ts (Intl currency formatting, nl-NL/EUR)
  hooks/                thin hooks wrapping stores for components (useCart.ts)
  types/                shared domain types (product.ts, cart.ts)
```

`src/components/business/*` is the section-per-file pattern: every distinct visual block on a page (Hero, UspBar, ProductSpotlight, AboutStory, ContactForm, LookbookGrid, BlogGrid, etc.) is its own client component composed into a route's `page.tsx`. Follow this pattern for new sections rather than growing `page.tsx` files.

### Cart state

`useCartStore` (zustand, `lib/store/cart-store.ts`) holds `items`/`isOpen` and exposes `addItem`/`removeItem`/`updateQuantity`/`openCart`/`closeCart` plus derived getters `itemCount()`/`subtotal()`. `hooks/useCart.ts` is the only consumer-facing entry point — components should use `useCart()`, not the store directly. Adding an item auto-opens the `CartDrawer` (rendered globally in `layout.tsx`); free-shipping threshold (€45) is hardcoded in `CartDrawer.tsx`.

### Button-as-link pattern

`components/ui/Button.tsx` builds its variants with `cva` and exports the raw `buttonVariants` function alongside the `<Button>` component. When a CTA needs to be an `<a>`/`<Link>` (e.g. hero CTAs, anchor scrolls) rather than a `<button>`, apply `buttonVariants({ variant, size })` to the link's `className` instead of nesting a `<Button>` inside an anchor.

### Data layer

There is no backend/API — `lib/data/*.ts` exports typed constants (`hairbutter`/`products` in `products.ts`, `faqItems`) consumed directly by server and client components. Product routes (`app/producten/hairbutter/page.tsx`) import the dummy data directly rather than fetching. `Product` has no rating/review fields — the site carries no reviews (real or dummy) anywhere, by explicit request.

### Six routes: no Portfolio, no Blog

The site is `/`, `/producten`, `/producten/hairbutter`, `/over-ons`, `/contact`, `/faq`. Portfolio and Blog were built out fully and then **deleted on client request** — routes, `LookbookGrid`/`BlogGrid`, `portfolio.ts`/`blog.ts`, their types and their images are all gone. Don't rebuild them unless asked; if you do, note that `InstagramGrid` used to depend on three `portfolio-*.jpg` files and now uses the real shoot photos instead.

### Homepage composition

Image-led, playful, and with the product high up because the client asked for it explicitly:

`Hero` (video) → `ProductSpotlight` → `Marquee` (thin band) → `Lookbook` (hot-pink, numbered, auto-scrolling) → `StatementSplit` → `PhotoMarquee` (moving strip) → `Ingredients` → `InstagramGrid`.

**No full-bleed portraits.** `StatementSplit` replaced an earlier full-bleed treatment of `model-duo-floor`: a 2:3 portrait stretched edge to edge needs ~2880px on a retina desktop, which no source in this shoot can deliver. At half width it stays sharp and still lands big.

`PhotoMarquee` and `Ingredients` share the black background on purpose and read as one block: movement first, then substance.

There is no newsletter section in the body any more; the signup lives in the footer so the page ends on imagery rather than a form. `Newsletter.tsx` is deleted.

`UspBar`, `HowToUse`, `EditorialGrid`, `BrandStatement` and `RitualSteps` are all deleted. **The site carries no usage instructions on the homepage** — the client asked twice for that section to go, so `Lookbook` reuses its layout (numbered cards, outline numerals, mobile carousel) but carries only photography and one-word labels. Usage info still lives on the PDP via `usageMethods`.

**Motion components** (`src/components/ui/`):
- `VelocityTrack` is the base for every moving band: it renders its children twice, animates to `-50%` for a seamless loop, and couples the speed to scroll velocity via `useVelocity` — scrolling faster speeds the band up, scrolling up reverses it. `baseVelocity` sets direction and idle speed.
- `Marquee` wraps it for text. `textClassName` matters: a thin divider band and a wordmark overlay need wildly different sizes. It is `aria-hidden`.
- `FillOnScroll` is the outline-to-solid heading. The outline layer carries the real text; the solid layer sits on top, is `aria-hidden`, and its `clipPath` opens left to right with scroll progress.
- `PhotoMarquee` counter-scrolls the wordmark over the photo strip in `mix-blend-difference`. **Its images need `loading="eager"`**: the strip moves by transform, so cards that start off-screen are never seen as visible and lazy images stay blank forever.
- `Lookbook` is a scroll-snap carousel on mobile (`no-scrollbar` + `snap-x`) and a three-column grid from `md` up.
- `RotatingBadge` is the slowly spinning seal on the product photo: text on an SVG circle path, `useId` for the path id so several badges don't collide, `aria-hidden` because it's decorative.
- Everything looping is disabled under `prefers-reduced-motion`, along with smooth scrolling.

**Don't wrap animating children in a `motion` element that carries scroll transforms.** The hero briefly had its whole text block inside a `motion.div` with `style={{ y, opacity }}` from `useTransform`; every child with its own `initial`/`animate` then stayed stuck on its initial value and the entire hero text rendered invisible while the DOM looked healthy (`opacity: 0` on the letters was the giveaway). Apply parallax to the media layer, and leave the animating content in a plain `div`.

### No reviews, no fake ratings

There is no reviews feature anywhere on the site (homepage slider, star ratings on product cards/PDP, etc. were all removed). Don't reintroduce star ratings, review counts, or testimonials unless the user explicitly asks — the site has no real reviews yet and fabricated ones were called out as misleading.

### Footer

Black (`bg-ink`), and it carries the newsletter signup at the top: eyebrow, a Horizon heading, an underlined (not boxed) email field and a pink pill button. Below that, link columns in **two columns on mobile** and four from `md` up, because the client asked for a distinctly shorter footer on phones. Keep it compact: it sits around 750px tall on a 375px viewport.

`ApplePayBadge` needs `tone="light"` here — its default black pill is invisible against the black footer.

### Header

**On the homepage only** the header is `fixed` and starts transparent with white text over the hero video, turning solid cream once `scrollY > 40`. On every other route it is `sticky top-0` and always solid, which also keeps page content from sliding underneath it. The switch is driven by `usePathname() === "/"`.

The wordmark is **hidden on mobile on the homepage** (`overHero && "hidden md:block"`), because it already sits large over the hero video right below. It stays visible everywhere else, where there is no hero.

This reverses an earlier instruction to keep the header always solid. That earlier rule existed because a previous transparent version had contrast problems; the current one solves that with a 45% `ink` overlay plus a heavier gradient band along the top of the hero. If you touch the hero overlay, re-check the header's legibility against a light frame of the video.

### Copy style

No em dashes (—) anywhere in UI copy or metadata — rewrite with a period, colon, or comma instead (see any `lib/data/*.ts` file or business component for the established pattern). This was an explicit correction; em dashes read as AI-generated. Avoid the word "ambachtelijk" too (replaced site-wide with alternatives like "met zorg gemaakt" / "met de hand gemaakt" / "handgemaakt").

This rule outranks copy supplied by the client: the product description they delivered contained an em dash ("iedere haartextuur — van steil"), and it ships as a colon.

### 3D / video product media

There is no 3D viewer or in-PDP video (`@react-three/fiber` etc. were tried and then removed — don't reinstall unless asked again). The product-pour cinemagraph video lives in the Over Ons "Ons verhaal" section (`AboutStory.tsx`), not on the PDP; the PDP shows only the static photo gallery (`ProductGallery.tsx`).

### Image budget: resolution first, file size second

**The old rule ("no file in `public/images/` over 100 KB") has been retired — it was actively harming the site.** It squeezed the shoot down to 666–1100px wide, and once those photos were used full-bleed and half-screen instead of as small tiles they looked visibly soft, especially on retina. The client called the quality out.

The key fact: **`next/image` is enabled, so the file in `public/` is a source, not what ships.** Next re-encodes it to WebP at the width the layout actually needs. A heavier source therefore costs repo size, not page weight. Measured on `model-duo-floor.jpg`: 276 KB JPEG on disk serves as 30 KB (w=640), 38 KB (w=750) or 74 KB (w=1080) of WebP — lighter than the old 91 KB JPEG *and* far sharper.

The current rule:

1. **Longest edge 2400px**, JPEG **q84**, from the master in `source-media/images/`. Portraits land at 1600x2400, landscapes at 2400x1600. 1800px was tried first and was still too small: a half-width image on a 1440px retina screen already needs ~1300px, and the Lookbook needs more on wider monitors.
2. Encode with `cjpeg -optimize -progressive` (libjpeg-turbo is installed).
3. Never re-compress an already-compressed file; always start from the master, otherwise generation loss stacks up.
4. Sources now run 150–550 KB each, ~7 MB for the folder. That is fine. What matters is what `next/image` serves, so if you suspect a weight problem, measure the `/_next/image?...` response rather than the file on disk.
5. Don't add `unoptimized` or bypass `next/image`; that is what makes this trade-off work.

**After replacing files in `public/images/`, restart the dev server.** Next keeps optimized variants in memory, so it will happily keep serving the old, smaller derivative from the previous generation of the file — which makes it look like the re-encode did nothing. This cost real debugging time: `curl -s ".../_next/image?url=%2Fimages%2Ffoo.jpg&w=1920&q=75" -o /tmp/x.webp && sips -g pixelWidth /tmp/x.webp` is the reliable check.

**Don't trust `img.naturalWidth` in the Browser-pane preview** — it reports the CSS size rather than the bitmap, so every image looks half-resolution. Measure the `w=` parameter on `img.currentSrc` against `clientWidth * 2` instead.

The reprocessing script lives in the session scratchpad and is not committed; re-create it or run the same `sips -Z 1800` + `cjpeg -quality 88` pass by hand.

### Product photography

The client's full studio shoot has been delivered and is in rotation. Nineteen shots came in at 4.6–10.4 MB each (151 MB total); masters live in `source-media/images/` as `Folea-0xx.jpg` (git-ignored) and the optimized derivatives in `public/images/` under descriptive names:

- **Product stills**: `product-butter.jpg` (jar on a stack of real butter) is **the** product image, on the client's explicit instruction — don't swap it for a lifestyle shot. Plus `product-trio.jpg`, `product-drip.jpg`, `product-front.jpg`, `product-top.jpg`, `product-duo.jpg`.
- **Model shots**, all 2:3 portrait: `model-*.jpg` (sixteen files) covering both hair textures. `model-duo-floor.jpg` is the one the client singled out as especially good; it carries the full-bleed `FullBleedImage` section.

Because most of the shoot is 2:3 portrait while `product-trio` is 3:2 landscape, **the PDP gallery uses `object-contain` in a fixed frame rather than `object-cover` in a square** — cropping cut the jar off, which the client flagged. Keep that in mind for any new image frame: check the aspect ratio of the file before choosing a container.

No "photos coming soon" placeholders anywhere; that was tried (ImagePlaceholder/CampaignPreview/StudioPeek) and removed on request. The Instagram grid still uses dummy links, with real shoot photos as tiles.

### FAQ page

FAQ lives on its own route `/faq` (accordion + "Naar contact" card). The contact page (`/contact`) holds only the form + contact info and links to `/faq` from its hero. Footer "Klantenservice" links point at both.

### Known quirks

- The installed `lucide-react` version does not export brand/social icons (`Instagram`, etc. were removed upstream). Custom inline SVGs live in `components/ui/SocialIcons.tsx` (`InstagramIcon`, `TikTokIcon`, `SnapchatIcon`) — reach for these instead of trying to import from lucide-react. (Snapchat replaced Pinterest in the footer by request.)
- Payment badges in the footer (`components/ui/PaymentBadges.tsx`): `ApplePayBadge` is a hand-built SVG (black, by request). `IdealWeroBadge` renders the real official lockup image (`public/images/payment-ideal-wero.png`, resized from a user-supplied source) via `next/image` — don't replace it with a hand-drawn version again.
- Video/image assets under `public/video` and `public/images` were preprocessed with `ffmpeg`/`cjpeg` outside of any npm script — there's no build-time asset pipeline, so new source footage/photos need the same manual treatment (H.264 transcode at a quality-preserving CRF for video, the 100 KB budget above for stills) before landing in `public/`. Raw/unoptimized source masters live in `source-media/` (git-ignored, not shipped) rather than `public/`.
- The sandboxed shell (Bash tool) can lose macOS file-system permission to `~/Downloads` mid-session (TCC), even after working earlier in the same session — if a file copy from Downloads suddenly fails with "Operation not permitted", ask the user to drag the file into the project directly rather than retrying the same path.
- **Hero video autoplay (mobile).** The client reported having to press play on a shared link, mostly on phones. The markup is not at fault — the SSR'd HTML already carries `autoplay muted loop playsinline` (verified with `curl | grep '<video'`). iOS Low Power Mode blocks autoplay unconditionally and in-app webviews (WhatsApp, Instagram) often do too. `Hero.tsx` therefore retries in three escalating ways: right after hydration, on `visibilitychange`, and on the first `touchstart`/`pointerdown`/`keydown`/`scroll` — that last one is the reliable path, because every browser allows playback after a user gesture. The listeners remove themselves once a play succeeds. It still cannot be guaranteed, so keep `poster` populated.
- **Browser-preview screenshots go blank after a programmatic scroll.** `window.scrollTo` works (`scrollY` updates, DOM is correct) but the captured frame comes back as a flat background colour. Verify via `read_page` / computed styles instead, or temporarily `display:none` the preceding sections from `javascript_tool` so the target section renders at scroll position 0. Also note the `whileInView` fade-ins need a second or two before a screenshot shows the final state.
