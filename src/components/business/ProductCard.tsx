"use client";

import Image from "next/image";
import Link from "next/link";
import { motion } from "framer-motion";
import { Star } from "lucide-react";
import type { Product } from "@/types/product";
import { Button } from "@/components/ui/Button";
import { formatPrice } from "@/lib/utils/format";
import { useCart } from "@/hooks/useCart";

export function ProductCard({ product }: { product: Product }) {
  const { addItem } = useCart();

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-80px" }}
      transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
      className="group"
    >
      <Link
        href={`/producten/${product.slug}`}
        className="relative block aspect-square overflow-hidden rounded-lg bg-blush"
      >
        <Image
          src={product.images[0].src}
          alt={product.images[0].alt}
          fill
          sizes="(min-width: 768px) 33vw, 100vw"
          className="object-cover transition-transform duration-700 ease-[var(--ease-elegant)] group-hover:scale-105"
        />
      </Link>

      <div className="mt-4 flex items-start justify-between gap-3">
        <div>
          <Link href={`/producten/${product.slug}`}>
            <h3 className="text-xl text-forest hover:text-forest-light">
              {product.name}
            </h3>
          </Link>
          <div className="mt-1 flex items-center gap-1.5">
            <div className="flex text-earth">
              {Array.from({ length: 5 }).map((_, i) => (
                <Star
                  key={i}
                  size={12}
                  fill={i < Math.round(product.rating) ? "currentColor" : "none"}
                />
              ))}
            </div>
            <span className="text-xs text-charcoal-soft">
              ({product.reviewCount})
            </span>
          </div>
          <p className="mt-2 text-base font-medium text-charcoal">
            {formatPrice(product.price)}
          </p>
        </div>
        <Button
          variant="secondary"
          size="sm"
          onClick={() => addItem(product)}
          className="shrink-0"
        >
          Toevoegen
        </Button>
      </div>
    </motion.div>
  );
}
