"use client";

import { useState } from "react";
import Link from "next/link";
import { motion } from "framer-motion";
import { ChevronRight } from "lucide-react";
import type { Product } from "@/types/product";
import { Container } from "@/components/ui/Container";
import { Button } from "@/components/ui/Button";
import { QuantitySelector } from "@/components/ui/QuantitySelector";
import { ProductGallery } from "@/components/business/ProductGallery";
import { useCart } from "@/hooks/useCart";
import { formatPrice } from "@/lib/utils/format";

export function ProductDetail({ product }: { product: Product }) {
  const [quantity, setQuantity] = useState(1);
  const { addItem } = useCart();

  return (
    <div className="pt-10 md:pt-16">
      <Container>
        <nav className="mb-8 flex items-center gap-1.5 text-xs text-charcoal-soft">
          <Link href="/" className="hover:text-ink">
            Home
          </Link>
          <ChevronRight size={12} />
          <Link href="/producten" className="hover:text-ink">
            Producten
          </Link>
          <ChevronRight size={12} />
          <span className="text-charcoal">{product.name}</span>
        </nav>

        <div className="grid gap-12 md:grid-cols-2 md:gap-16">
          <ProductGallery images={product.images} />

          <motion.div
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
            className="space-y-6"
          >
            <div>
              <p className="text-[11px] font-medium uppercase tracking-[0.3em] text-ink/50">
                {product.tagline}
              </p>
              {/* Zelfde displayfont als op de collectiepagina. */}
              <h1 className="mt-3 font-display text-[clamp(0.8rem,4.2vw,2rem)] uppercase leading-[1.15] tracking-[0.02em] text-ink">
                {product.name}
              </h1>
            </div>

            <p className="text-2xl font-medium text-ink">
              {formatPrice(product.price)}
            </p>

            <p className="text-charcoal-soft leading-relaxed">
              {product.description}
            </p>

            <div className="flex items-center gap-4 pt-2">
              <QuantitySelector value={quantity} onChange={setQuantity} />
              <Button
                variant="primary"
                size="lg"
                className="flex-1"
                onClick={() => addItem(product, quantity)}
              >
                In winkelmand
              </Button>
            </div>

            <div className="pt-2">
              <p className="text-[11px] font-medium uppercase tracking-[0.3em] text-ink/50">
                Ingrediënten
              </p>
              <ul className="mt-4 divide-y divide-ink/10 border-y border-ink/10">
                {product.ingredients.map((ingredient, i) => (
                  <li key={ingredient.name} className="flex gap-4 py-4">
                    <span className="shrink-0 pt-0.5 text-[11px] font-semibold tabular-nums tracking-[0.2em] text-ink/35">
                      {String(i + 1).padStart(2, "0")}
                    </span>
                    <div>
                      <p className="font-display text-sm uppercase tracking-[0.02em] text-ink">
                        {ingredient.name}
                      </p>
                      {ingredient.description && (
                        <p className="mt-1.5 text-sm leading-relaxed text-charcoal-soft">
                          {ingredient.description}
                        </p>
                      )}
                    </div>
                  </li>
                ))}
              </ul>
            </div>
          </motion.div>
        </div>
      </Container>

      {/* Gebruiksaanwijzing op een eigen gekleurd vlak: het stond eerder als
          twee vlakke kaartjes tussen de rest en viel volledig weg. */}
      <section className="mt-20 bg-blush py-16 md:mt-28 md:py-24">
        <Container>
          <p className="text-[11px] font-medium uppercase tracking-[0.3em] text-ink/60">
            Zo gebruik je het
          </p>
          <h2 className="mt-4 max-w-2xl font-display text-[clamp(1rem,4.2vw,2rem)] uppercase leading-[1.15] tracking-[0.02em] text-ink">
            Gebruiksaanwijzing Nourishing hairbutter
          </h2>

          <div className="mt-12 grid gap-px overflow-hidden rounded-2xl bg-ink/10 md:mt-16 md:grid-cols-2">
            {product.usageMethods.map((method, i) => (
              <article
                key={method.id}
                className="group relative overflow-hidden bg-blush p-8 transition-colors duration-500 hover:bg-blush-deep/35 md:p-10"
              >
                <span
                  className="pointer-events-none absolute -right-3 -top-6 font-display text-[7rem] leading-none text-transparent transition-transform duration-700 ease-[var(--ease-elegant)] group-hover:-translate-y-1"
                  style={{ WebkitTextStroke: "1.5px rgba(10,10,10,0.14)" }}
                  aria-hidden="true"
                >
                  {String(i + 1).padStart(2, "0")}
                </span>

                <p className="relative text-[11px] font-medium uppercase tracking-[0.2em] text-ink/60">
                  {method.hairType}
                </p>
                <h3 className="relative mt-3 font-display text-lg uppercase tracking-[0.02em] text-ink sm:text-xl">
                  {method.title}
                </h3>
                <p className="relative mt-4 max-w-md leading-relaxed text-ink/75">
                  {method.description}
                </p>
              </article>
            ))}
          </div>
        </Container>
      </section>
    </div>
  );
}
