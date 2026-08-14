"use client";

import Image from "next/image";
import Link from "next/link";
import { useState } from "react";
import { motion } from "framer-motion";
import type { Product } from "@/types/product";
import { formatPrice } from "@/lib/utils/format";
import { useCart } from "@/hooks/useCart";
import { cn } from "@/lib/utils/cn";

const EASE = [0.22, 1, 0.36, 1] as const;

/**
 * Presentatie van één product als hoofdonderwerp van de collectiepagina. Met
 * maar één product in het assortiment zou een kaartje in een raster de pagina
 * leeg laten ogen; dit maakt het product zelf de pagina.
 */
export function ProductShowcase({ product }: { product: Product }) {
  const { addItem } = useCart();
  const [actief, setActief] = useState(0);
  const beeld = product.images[actief];

  return (
    <div className="grid items-start gap-10 lg:grid-cols-2 lg:gap-16">
      <motion.div
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        viewport={{ once: true, margin: "-80px" }}
        transition={{ duration: 0.7, ease: EASE }}
      >
        <div className="relative aspect-[4/5] overflow-hidden rounded-2xl bg-blush/40">
          <Image
            src={beeld.src}
            alt={beeld.alt}
            fill
            sizes="(min-width: 1024px) 46vw, 92vw"
            className="object-cover"
            priority
          />
        </div>

        {product.images.length > 1 && (
          <div className="mt-3 flex gap-3">
            {product.images.map((afbeelding, i) => (
              <button
                key={afbeelding.src}
                type="button"
                onClick={() => setActief(i)}
                aria-label={`Toon afbeelding ${i + 1}`}
                aria-pressed={i === actief}
                className={cn(
                  "relative aspect-square w-16 shrink-0 overflow-hidden rounded-lg bg-blush/40 transition-opacity sm:w-20",
                  i === actief
                    ? "ring-2 ring-ink ring-offset-2 ring-offset-cream"
                    : "opacity-55 hover:opacity-100",
                )}
              >
                <Image
                  src={afbeelding.src}
                  alt=""
                  fill
                  sizes="80px"
                  className="object-cover"
                />
              </button>
            ))}
          </div>
        )}
      </motion.div>

      <motion.div
        initial={{ opacity: 0, y: 18 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: "-80px" }}
        transition={{ duration: 0.7, delay: 0.05, ease: EASE }}
        className="lg:pt-6"
      >
        <h2 className="font-display text-2xl uppercase leading-[1.15] tracking-[0.02em] text-ink sm:text-3xl">
          {product.name}
        </h2>
        <p className="mt-4 text-sm uppercase tracking-[0.2em] text-ink/50">
          {product.tagline}
        </p>

        <p className="mt-6 max-w-md leading-relaxed text-charcoal-soft">
          {product.description}
        </p>

        <div className="mt-8 flex flex-wrap items-center gap-x-6 gap-y-4 border-t border-ink/10 pt-7">
          <span className="text-3xl font-semibold text-ink">
            {formatPrice(product.price)}
          </span>
          <button
            type="button"
            onClick={() => addItem(product)}
            className="rounded-full bg-ink px-8 py-3.5 text-xs font-semibold uppercase tracking-[0.2em] text-white transition-transform duration-300 ease-[var(--ease-elegant)] hover:scale-105 hover:bg-ink-light"
          >
            In winkelmand
          </button>
        </div>

        <Link
          href={`/producten/${product.slug}`}
          className="mt-6 inline-block text-sm font-medium text-ink underline underline-offset-4 transition-colors hover:text-charcoal-soft"
        >
          Bekijk alle productinformatie
        </Link>
      </motion.div>
    </div>
  );
}
