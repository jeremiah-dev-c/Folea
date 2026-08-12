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

Tailwind v4's CSS-based `@theme` is used instead of `tailwind.config.js` — colors, fonts, radii and the easing curve are all defined as CSS variables there and consumed as Tailwind utilities (`bg-blush`, `text-forest`, `font-serif`, etc.). Fonts (Cormorant Garamond for serif/headings, Plus Jakarta Sans for sans/body) are loaded via `next/font/google` in `src/app/layout.tsx` and exposed as the CSS variables `--font-cormorant` / `--font-jakarta` that `@theme` maps to `--font-serif` / `--font-sans`.

**Standing color-balance rule:** `cream`/`cream-deep` and `blush`/`blush-deep` are the dominant section backgrounds across the site. `forest` (green) and `earth` (brown) are accent-only — small labels, thin borders, icon strokes, headings, at most one CTA per section — never large section backgrounds. This was an explicit correction from the client partway through the build (the homepage originally had solid-forest Newsletter/Footer sections; those were reworked to match). Default new sections to cream/blush.

### Directory layout

```
src/
  app/                 routes (App Router), one page.tsx per route, metadata exported per page
  components/
    ui/                generic, reusable primitives (Button, Container, Accordion, QuantitySelector, SocialIcons)
    layout/             global chrome: Header, Footer, CartDrawer — rendered once from src/app/layout.tsx
    business/           page-section components, one per homepage/PDP/etc. section, mostly client components
  lib/
    data/               static/dummy data (products.ts, reviews.ts, faq.ts), typed against src/types
    store/              zustand stores (cart-store.ts)
    utils/              cn.ts (clsx + tailwind-merge), format.ts (Intl currency formatting, nl-NL/EUR)
  hooks/                thin hooks wrapping stores for components (useCart.ts)
  types/                shared domain types (product.ts, cart.ts, review.ts)
```

`src/components/business/*` is the section-per-file pattern: every distinct visual block on a page (Hero, UspBar, ProductSpotlight, AboutStory, ContactForm, etc.) is its own client component composed into a route's `page.tsx`. Follow this pattern for new sections rather than growing `page.tsx` files.

### Cart state

`useCartStore` (zustand, `lib/store/cart-store.ts`) holds `items`/`isOpen` and exposes `addItem`/`removeItem`/`updateQuantity`/`openCart`/`closeCart` plus derived getters `itemCount()`/`subtotal()`. `hooks/useCart.ts` is the only consumer-facing entry point — components should use `useCart()`, not the store directly. Adding an item auto-opens the `CartDrawer` (rendered globally in `layout.tsx`); free-shipping threshold (€45) is hardcoded in `CartDrawer.tsx`.

### Button-as-link pattern

`components/ui/Button.tsx` builds its variants with `cva` and exports the raw `buttonVariants` function alongside the `<Button>` component. When a CTA needs to be an `<a>`/`<Link>` (e.g. hero CTAs, anchor scrolls) rather than a `<button>`, apply `buttonVariants({ variant, size })` to the link's `className` instead of nesting a `<Button>` inside an anchor.

### Data layer

There is no backend/API — `lib/data/*.ts` exports typed constants (`hairbutter`/`products` in `products.ts`, `reviews`, `faqItems`) consumed directly by server and client components. Product routes (`app/producten/hairbutter/page.tsx`) import the dummy data directly rather than fetching.

### Known quirks

- The installed `lucide-react` version does not export brand/social icons (`Instagram`, etc. were removed upstream). Custom inline SVGs live in `components/ui/SocialIcons.tsx` (`InstagramIcon`, `TikTokIcon`, `PinterestIcon`) — reach for these instead of trying to import from lucide-react.
- Video/image assets under `public/video` and `public/images` were preprocessed with `ffmpeg` (HEVC → H.264 transcode for the hero video, PNG → resized JPG for product photography) outside of any npm script — there's no build-time asset pipeline, so new source footage/photos need the same manual treatment before landing in `public/`.
