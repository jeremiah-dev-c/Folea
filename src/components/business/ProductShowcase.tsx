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
    <div className="grid items-center gap-10 lg:grid-cols-2 lg:gap-16">
      {/* Beeldkolom begrensd en tekst een maat groter: op volle kolombreedte
          drukte de foto de tekst weg (klant, 15 aug). */}
      <motion.div
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        viewport={{ once: true, margin: "-80px" }}
        transition={{ duration: 0.7, ease: EASE }}
        className="mx-auto w-full min-w-0 max-w-sm lg:mx-0 lg:max-w-md"
      >
        <div className="relative aspect-[4/5] overflow-hidden rounded-2xl bg-ink/5">
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
          <div className="mt-3 flex min-w-0 gap-2 sm:gap-3">
            {product.images.map((afbeelding, i) => (
              <button
                key={afbeelding.src}
                type="button"
                onClick={() => setActief(i)}
                aria-label={`Toon afbeelding ${i + 1}`}
                aria-pressed={i === actief}
                className={cn(
                  "relative aspect-square w-14 shrink-0 overflow-hidden rounded-lg bg-ink/5 transition-opacity sm:w-20",
                  i === actief
                    ? "ring-2 ring-ink ring-offset-2 ring-offset-blush"
                    : "opacity-55 hover:opacity-100",
                )}
              >
                <Image
                  src={afbeelding.src}
                  alt=""
                  fill
                  sizes="(min-width: 640px) 80px, 56px"
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
        <h2 className="font-display text-[clamp(1rem,5vw,2.6rem)] uppercase leading-[1.12] tracking-[0.02em] text-ink">
          {product.name}
        </h2>

        <p className="mt-6 max-w-md text-lg leading-relaxed text-ink/70">
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
