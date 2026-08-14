"use client";

import Image from "next/image";
import Link from "next/link";
import { motion } from "framer-motion";
import type { Product } from "@/types/product";
import { formatPrice } from "@/lib/utils/format";
import { useCart } from "@/hooks/useCart";

const EASE = [0.22, 1, 0.36, 1] as const;

export function ProductCard({ product }: { product: Product }) {
  const { addItem } = useCart();

  return (
    <motion.article
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-80px" }}
      transition={{ duration: 0.6, ease: EASE }}
      className="group"
    >
      {/* 4:5 in plaats van vierkant: de studiofoto's zijn 2:3 staand en werden
          in een vierkant kader te hard bijgesneden. */}
      <Link
        href={`/producten/${product.slug}`}
        className="relative block aspect-[4/5] overflow-hidden rounded-2xl bg-blush/60"
      >
        <Image
          src={product.images[0].src}
          alt={product.images[0].alt}
          fill
          sizes="(min-width: 1024px) 30vw, (min-width: 640px) 45vw, 90vw"
          className="object-cover transition-transform duration-[900ms] ease-[var(--ease-elegant)] group-hover:scale-[1.05]"
        />
      </Link>

      <div className="mt-5">
        <Link href={`/producten/${product.slug}`}>
          <h2 className="font-display text-lg uppercase tracking-[0.02em] text-ink transition-colors duration-300 group-hover:text-charcoal-soft sm:text-xl">
            {product.name}
          </h2>
        </Link>

        <p className="mt-3 text-sm leading-relaxed text-charcoal-soft">
          {product.tagline}
        </p>

        <div className="mt-5 flex items-center justify-between gap-4">
          <span className="text-xl font-semibold text-ink">
            {formatPrice(product.price)}
          </span>
          <button
            type="button"
            onClick={() => addItem(product)}
            className="rounded-full bg-ink px-6 py-3 text-[11px] font-semibold uppercase tracking-[0.2em] text-white transition-transform duration-300 ease-[var(--ease-elegant)] hover:scale-105 hover:bg-ink-light"
          >
            Toevoegen
          </button>
        </div>
      </div>
    </motion.article>
  );
}
