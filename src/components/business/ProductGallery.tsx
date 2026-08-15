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

  // sm:items-start is nodig: zonder dat rekt de flexrij het beeldkader uit tot
  // de hoogte van de rij, en dat overruled de aspect-ratio.
  return (
    <div className="flex min-w-0 flex-col gap-4 sm:flex-row-reverse sm:items-start">
      {/* Alle zes de productstills zijn 2:3 staand, dus een 2:3 kader met
          object-cover toont ze volledig zonder balken en zonder iets af te
          snijden. Komt er ooit een foto met een andere verhouding bij, dan
          moet die eerst naar 2:3 of dit kader krijgt weer randen. */}
      <div className="relative aspect-[2/3] flex-1 overflow-hidden rounded-lg bg-cream-deep/40">
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
              className="object-cover"
              priority
            />
          </motion.div>
        </AnimatePresence>
      </div>

      {images.length > 1 && (
        <div className="flex min-w-0 gap-2 sm:gap-3 sm:flex-col">
          {images.map((image, index) => (
            <button
              key={image.src + index}
              onClick={() => setActiveIndex(index)}
              aria-label={`Toon afbeelding ${index + 1}`}
              className={cn(
                "relative h-14 w-14 shrink-0 overflow-hidden rounded-md bg-blush transition-opacity sm:h-20 sm:w-20",
                index === activeIndex
                  ? "ring-2 ring-ink ring-offset-2 ring-offset-cream"
                  : "opacity-60 hover:opacity-100",
              )}
            >
              <Image
                src={image.src}
                alt={image.alt}
                fill
                sizes="(min-width: 640px) 80px, 56px"
                className="object-cover"
              />
            </button>
          ))}
        </div>
      )}
    </div>
  );
}
