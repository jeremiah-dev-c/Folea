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

Next.js 16 App Router + TypeScript + Tailwind CSS v4, building **FOLÉA**, a Dutch-language e-commerce site for a single flagship product (a hair butter). All UI copy is Dutch; keep it that way.

### Design tokens (`src/app/globals.css`)

Tailwind v4's CSS-based `@theme` is used instead of `tailwind.config.js` — colors, fonts, radii and the easing curve are all defined as CSS variables there and consumed as Tailwind utilities (`bg-blush`, `text-berry`, `font-serif`, etc.). Fonts (Cormorant Garamond for serif/headings, Plus Jakarta Sans for sans/body) are loaded via `next/font/google` in `src/app/layout.tsx` and exposed as the CSS variables `--font-cormorant` / `--font-jakarta` that `@theme` maps to `--font-serif` / `--font-sans`.

**Standing color-balance rule:** `cream`/`cream-deep` and `blush`/`blush-deep` are the dominant section backgrounds across the site. `berry` (the label red) and `earth` (brown) are accent-only — small labels, thin borders, icon strokes, headings, at most one CTA per section — never large section backgrounds. Default new sections to cream/blush.

**There is no green anywhere in the palette.** The original `forest` (Pantone Peridot) token was removed on client request and replaced site-wide by `berry` — the deep carmine red sampled from the FOLÉA jar label (`#a3182a`, hover `#c02236`). Don't reintroduce green, and don't rename `berry` back to `forest`. `blush` tracks Pantone Flushing Pink, `cream` tracks Papyrus, `earth` tracks Potting Soil; values are intentionally saturated, not pastel.

There is also a `blush`-filled button variant (`buttonVariants({ variant: "blush" })`, charcoal text on blush background) alongside `primary`/`secondary`/`ghost`/`earth`, used e.g. for the hero CTA.

### Directory layout

```
src/
  app/                 routes (App Router), one page.tsx per route, metadata exported per page
  components/
    ui/                generic, reusable primitives (Button, Container, Accordion, QuantitySelector, SocialIcons, PaymentBadges)
    layout/             global chrome: Header, Footer, CartDrawer — rendered once from src/app/layout.tsx
    business/           page-section components, one per homepage/PDP/etc. section, mostly client components
  lib/
    data/               static/dummy data (products.ts, faq.ts, portfolio.ts, blog.ts), typed against src/types
    store/              zustand stores (cart-store.ts)
    utils/              cn.ts (clsx + tailwind-merge), format.ts (Intl currency formatting, nl-NL/EUR)
  hooks/                thin hooks wrapping stores for components (useCart.ts)
  types/                shared domain types (product.ts, cart.ts, portfolio.ts, blog.ts)
```

`src/components/business/*` is the section-per-file pattern: every distinct visual block on a page (Hero, UspBar, ProductSpotlight, AboutStory, ContactForm, LookbookGrid, BlogGrid, etc.) is its own client component composed into a route's `page.tsx`. Follow this pattern for new sections rather than growing `page.tsx` files.

### Cart state

`useCartStore` (zustand, `lib/store/cart-store.ts`) holds `items`/`isOpen` and exposes `addItem`/`removeItem`/`updateQuantity`/`openCart`/`closeCart` plus derived getters `itemCount()`/`subtotal()`. `hooks/useCart.ts` is the only consumer-facing entry point — components should use `useCart()`, not the store directly. Adding an item auto-opens the `CartDrawer` (rendered globally in `layout.tsx`); free-shipping threshold (€45) is hardcoded in `CartDrawer.tsx`.

### Button-as-link pattern

`components/ui/Button.tsx` builds its variants with `cva` and exports the raw `buttonVariants` function alongside the `<Button>` component. When a CTA needs to be an `<a>`/`<Link>` (e.g. hero CTAs, anchor scrolls) rather than a `<button>`, apply `buttonVariants({ variant, size })` to the link's `className` instead of nesting a `<Button>` inside an anchor.

### Data layer

There is no backend/API — `lib/data/*.ts` exports typed constants (`hairbutter`/`products` in `products.ts`, `faqItems`, `lookbookItems`, `blogPosts`) consumed directly by server and client components. Product routes (`app/producten/hairbutter/page.tsx`) import the dummy data directly rather than fetching. `Product` has no rating/review fields — the site carries no reviews (real or dummy) anywhere, by explicit request.

### No reviews, no fake ratings

There is no reviews feature anywhere on the site (homepage slider, star ratings on product cards/PDP, etc. were all removed). Don't reintroduce star ratings, review counts, or testimonials unless the user explicitly asks — the site has no real reviews yet and fabricated ones were called out as misleading.

### Header

Always renders solid (`bg-cream/95 backdrop-blur-md`), regardless of scroll position — it does not go transparent over hero video. Don't reintroduce a transparent-header-over-hero state without checking; a prior version did that and had contrast/legibility problems.

### Copy style

No em dashes (—) anywhere in UI copy or metadata — rewrite with a period, colon, or comma instead (see any `lib/data/*.ts` file or business component for the established pattern). This was an explicit correction; em dashes read as AI-generated. Avoid the word "ambachtelijk" too (replaced site-wide with alternatives like "met zorg gemaakt" / "met de hand gemaakt" / "handgemaakt").

### 3D / video product media

There is no 3D viewer or in-PDP video (`@react-three/fiber` etc. were tried and then removed — don't reinstall unless asked again). The product-pour cinemagraph video lives in the Over Ons "Ons verhaal" section (`AboutStory.tsx`), not on the PDP; the PDP shows only the static photo gallery (`ProductGallery.tsx`).

### Image budget: every file in `public/images/` stays under 100 KB

Hard rule, no exceptions: **no image in `public/images/` may exceed 100 KB**, and quality must stay visually intact. Anything heavier gets compressed before it lands in the repo.

The method that satisfies both constraints (do this rather than picking a fixed quality by hand):

1. Keep JPEG quality high (**q82 is the floor** — below that the compression artifacts start showing on the soft pink/cream gradients this brand uses everywhere).
2. If a photo still doesn't fit at q82, **reduce the pixel dimensions instead of dropping quality further**. A smaller image at q88 looks better than a large one at q70, and these photos are never displayed at full width anyway — check the `sizes` attribute on the consuming `next/image` before deciding how small you can go (portfolio tiles render at ~25vw, blog cards at ~50vw).
3. Encode with `cjpeg -optimize -progressive` (libjpeg-turbo is installed); progressive JPEGs are smaller and paint sooner.
4. Never re-compress an already-compressed file — always start from the original in `source-media/images/`, otherwise generation loss stacks up.
5. If a re-encode comes out *larger* than the current file, keep the current file. The source was already efficiently encoded.

There's a helper script for this in the session scratchpad (walks a resolution ladder × quality ladder and picks the highest-quality combination that fits); it is not committed, so re-create it or do the same search by hand.

Current state: all 11 files sit between 24 KB and 94 KB, ~840 KB for the whole folder.

### Product photography

Product photos in rotation are the client's studio shots, stored in `public/images/`: `product-front.jpg` (jar straight on, primary image), `product-top.jpg` (top-down, logo lid plus ingredient list), `product-duo.jpg` (two jars with water droplets) — all 1400px wide, q92, 72-92 KB. Full-resolution originals live in `source-media/images/` (git-ignored). More photoshoot imagery is still to be delivered to the developer, but do NOT add visible "photos coming soon" placeholder sections to the site — that was tried (ImagePlaceholder/CampaignPreview/StudioPeek components) and removed on request: the pending photoshoot is an internal matter, not site content. The Instagram grid at the bottom of the homepage is the one deliberate stand-in section (real images, dummy links) and stays as-is until the client's real feeds/photos land.

### FAQ page

FAQ lives on its own route `/faq` (accordion + "Naar contact" card). The contact page (`/contact`) holds only the form + contact info and links to `/faq` from its hero. Footer "Klantenservice" links point at both.

### Known quirks

- The installed `lucide-react` version does not export brand/social icons (`Instagram`, etc. were removed upstream). Custom inline SVGs live in `components/ui/SocialIcons.tsx` (`InstagramIcon`, `TikTokIcon`, `SnapchatIcon`) — reach for these instead of trying to import from lucide-react. (Snapchat replaced Pinterest in the footer by request.)
- Payment badges in the footer (`components/ui/PaymentBadges.tsx`): `ApplePayBadge` is a hand-built SVG (black, by request). `IdealWeroBadge` renders the real official lockup image (`public/images/payment-ideal-wero.png`, resized from a user-supplied source) via `next/image` — don't replace it with a hand-drawn version again.
- Video/image assets under `public/video` and `public/images` were preprocessed with `ffmpeg`/`cjpeg` outside of any npm script — there's no build-time asset pipeline, so new source footage/photos need the same manual treatment (H.264 transcode at a quality-preserving CRF for video, the 100 KB budget above for stills) before landing in `public/`. Raw/unoptimized source masters live in `source-media/` (git-ignored, not shipped) rather than `public/`.
- The sandboxed shell (Bash tool) can lose macOS file-system permission to `~/Downloads` mid-session (TCC), even after working earlier in the same session — if a file copy from Downloads suddenly fails with "Operation not permitted", ask the user to drag the file into the project directly rather than retrying the same path.
