"use client";

import { useState } from "react";
import Image from "next/image";
import { AnimatePresence, motion } from "framer-motion";
import { cn } from "@/lib/utils/cn";
import type { ProductImage } from "@/types/product";

interface ProductGalleryProps {
  images: ProductImage[];
}

export function ProductGallery({ images }: ProductGalleryProps) {
  const [activeIndex, setActiveIndex] = useState(0);
  const active = images[activeIndex];

  return (
    <div className="flex flex-col gap-4 sm:flex-row-reverse">
      <div className="relative aspect-square flex-1 overflow-hidden rounded-lg bg-blush">
        <AnimatePresence mode="wait" initial={false}>
          <motion.div
            key={activeIndex}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
            className="absolute inset-0"
          >
            <Image
              src={active.src}
              alt={active.alt}
              fill
              sizes="(min-width: 768px) 50vw, 100vw"
              className="object-cover transition-transform duration-700 ease-[var(--ease-elegant)] hover:scale-105"
              priority
            />
          </motion.div>
        </AnimatePresence>
      </div>

      {images.length > 1 && (
        <div className="flex gap-3 sm:flex-col">
          {images.map((image, index) => (
            <button
              key={image.src + index}
              onClick={() => setActiveIndex(index)}
              aria-label={`Toon afbeelding ${index + 1}`}
              className={cn(
                "relative h-20 w-20 shrink-0 overflow-hidden rounded-md bg-blush transition-opacity",
                index === activeIndex
                  ? "ring-2 ring-berry ring-offset-2 ring-offset-cream"
                  : "opacity-60 hover:opacity-100",
              )}
            >
              <Image
                src={image.src}
                alt={image.alt}
                fill
                sizes="80px"
                className="object-cover"
              />
            </button>
          ))}
        </div>
      )}
    </div>
  );
}
