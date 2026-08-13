"use client";

import { useState } from "react";
import Link from "next/link";
import { motion } from "framer-motion";
import { ChevronRight } from "lucide-react";
import type { Product } from "@/types/product";
import { Container } from "@/components/ui/Container";
import { Button } from "@/components/ui/Button";
import { QuantitySelector } from "@/components/ui/QuantitySelector";
import { Accordion } from "@/components/ui/Accordion";
import { ProductGallery } from "@/components/business/ProductGallery";
import { useCart } from "@/hooks/useCart";
import { formatPrice } from "@/lib/utils/format";

export function ProductDetail({ product }: { product: Product }) {
  const [quantity, setQuantity] = useState(1);
  const { addItem } = useCart();

  const ingredientItems = product.ingredients.map((ingredient) => ({
    id: ingredient.name,
    title: ingredient.name,
    content: ingredient.description,
  }));

  return (
    <div className="py-10 md:py-16">
      <Container>
        <nav className="mb-8 flex items-center gap-1.5 text-xs text-charcoal-soft">
          <Link href="/" className="hover:text-berry">
            Home
          </Link>
          <ChevronRight size={12} />
          <Link href="/producten" className="hover:text-berry">
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
              <p className="text-xs font-medium uppercase tracking-[0.3em] text-earth">
                {product.tagline}
              </p>
              <h1 className="mt-3 text-4xl md:text-5xl text-berry">
                {product.name}
              </h1>
            </div>

            <p className="text-2xl font-medium text-berry">
              {formatPrice(product.price)}
            </p>

            <p className="text-charcoal-soft leading-relaxed">
              {product.description}
            </p>

            <ul className="grid grid-cols-2 gap-3">
              {product.highlights.map((highlight) => (
                <li
                  key={highlight}
                  className="rounded-md bg-cream-deep px-4 py-3 text-sm font-medium text-charcoal"
                >
                  {highlight}
                </li>
              ))}
            </ul>

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

            <div className="pt-4">
              <h2 className="mb-2 text-sm font-semibold uppercase tracking-wider text-charcoal">
                Ingrediënten
              </h2>
              <Accordion items={ingredientItems} />
            </div>
          </motion.div>
        </div>

        <section className="mt-20 md:mt-28">
          <h2 className="text-3xl md:text-4xl text-berry text-center">
            Gebruiksaanwijzing per haartype
          </h2>
          <div className="mt-10 grid gap-6 sm:grid-cols-2">
            {product.usageMethods.map((method) => (
              <div
                key={method.id}
                className="rounded-lg bg-blush/40 p-8"
              >
                <p className="text-xs font-medium uppercase tracking-wider text-earth">
                  {method.hairType}
                </p>
                <h3 className="mt-2 text-2xl text-berry">{method.title}</h3>
                <p className="mt-3 text-charcoal-soft leading-relaxed">
                  {method.description}
                </p>
              </div>
            ))}
          </div>
        </section>
      </Container>
    </div>
  );
}
