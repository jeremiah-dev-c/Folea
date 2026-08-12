"use client";

import { useMemo, useState } from "react";
import Image from "next/image";
import { AnimatePresence, motion } from "framer-motion";
import { X } from "lucide-react";
import { cn } from "@/lib/utils/cn";
import { lookbookItems } from "@/lib/data/portfolio";
import type { LookbookItem } from "@/types/portfolio";

const EASE = [0.22, 1, 0.36, 1] as const;

export function LookbookGrid() {
  const categories = useMemo(
    () => ["Alle", ...lookbookItems.map((item) => item.category)],
    [],
  );
  const [active, setActive] = useState("Alle");
  const [selected, setSelected] = useState<LookbookItem | null>(null);

  const filtered =
    active === "Alle"
      ? lookbookItems
      : lookbookItems.filter((item) => item.category === active);

  return (
    <div>
      <div className="flex flex-wrap justify-center gap-3">
        {categories.map((category) => (
          <button
            key={category}
            onClick={() => setActive(category)}
            className={cn(
              "rounded-full border px-5 py-2.5 text-sm font-medium transition-colors duration-300",
              active === category
                ? "border-forest bg-forest text-white"
                : "border-charcoal/15 bg-transparent text-charcoal hover:border-forest",
            )}
          >
            {category}
          </button>
        ))}
      </div>

      <motion.div
        layout
        className="mt-12 grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4"
      >
        <AnimatePresence mode="popLayout">
          {filtered.map((item, index) => (
            <motion.button
              key={item.id}
              layout
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95 }}
              transition={{ duration: 0.5, delay: index * 0.05, ease: EASE }}
              onClick={() => setSelected(item)}
              className="group relative aspect-[3/4] overflow-hidden rounded-lg bg-blush text-left"
            >
              <Image
                src={item.image}
                alt={item.alt}
                fill
                sizes="(min-width: 1024px) 25vw, (min-width: 640px) 50vw, 100vw"
                className="object-cover transition-transform duration-700 ease-[var(--ease-elegant)] group-hover:scale-110"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-charcoal/80 via-charcoal/0 to-charcoal/0 opacity-0 transition-opacity duration-500 group-hover:opacity-100" />
              <div className="absolute inset-x-0 bottom-0 translate-y-3 p-5 opacity-0 transition-all duration-500 group-hover:translate-y-0 group-hover:opacity-100">
                <p className="text-[10px] font-medium uppercase tracking-[0.25em] text-blush">
                  {item.category}
                </p>
                <p className="mt-1 font-serif text-xl text-white">
                  {item.title}
                </p>
              </div>
            </motion.button>
          ))}
        </AnimatePresence>
      </motion.div>

      <AnimatePresence>
        {selected && (
          <>
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.25 }}
              className="fixed inset-0 z-[60] bg-charcoal/60 backdrop-blur-sm"
              onClick={() => setSelected(null)}
            />
            <motion.div
              initial={{ opacity: 0, scale: 0.95, y: 12 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95, y: 12 }}
              transition={{ duration: 0.35, ease: EASE }}
              className="fixed inset-x-4 top-1/2 z-[70] mx-auto grid max-w-3xl -translate-y-1/2 overflow-hidden rounded-lg bg-cream shadow-2xl sm:grid-cols-2"
              role="dialog"
              aria-label={selected.title}
            >
              <div className="relative aspect-square sm:aspect-auto">
                <Image
                  src={selected.image}
                  alt={selected.alt}
                  fill
                  sizes="(min-width: 640px) 50vw, 100vw"
                  className="object-cover"
                />
              </div>
              <div className="relative flex flex-col justify-center p-8">
                <button
                  onClick={() => setSelected(null)}
                  aria-label="Sluiten"
                  className="absolute right-4 top-4 rounded-full p-1.5 text-charcoal-soft transition-colors hover:bg-blush hover:text-charcoal"
                >
                  <X size={18} />
                </button>
                <p className="text-xs font-medium uppercase tracking-[0.3em] text-earth">
                  {selected.category}
                </p>
                <h3 className="mt-3 text-3xl text-forest">{selected.title}</h3>
                <p className="mt-4 text-charcoal-soft leading-relaxed">
                  {selected.description}
                </p>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </div>
  );
}
