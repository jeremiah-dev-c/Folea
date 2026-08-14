"use client";

import { useEffect, useRef, useState } from "react";
import Link from "next/link";
import { AnimatePresence, motion } from "framer-motion";
import { Search, X } from "lucide-react";
import { products } from "@/lib/data/products";
import { formatPrice } from "@/lib/utils/format";
import { Container } from "@/components/ui/Container";

interface SearchOverlayProps {
  open: boolean;
  onClose: () => void;
}

export function SearchOverlay({ open, onClose }: SearchOverlayProps) {
  useEffect(() => {
    function onKeyDown(event: KeyboardEvent) {
      if (event.key === "Escape") onClose();
    }
    window.addEventListener("keydown", onKeyDown);
    return () => window.removeEventListener("keydown", onKeyDown);
  }, [onClose]);

  return (
    <AnimatePresence>
      {open && (
        <>
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.25 }}
            className="fixed inset-0 z-40 bg-charcoal/30 backdrop-blur-[2px]"
            onClick={onClose}
          />
          <motion.div
            initial={{ opacity: 0, y: -8 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -8 }}
            transition={{ duration: 0.3, ease: [0.22, 1, 0.36, 1] }}
            className="fixed inset-x-0 top-0 z-50 border-b border-charcoal/10 bg-cream pt-20 pb-8 shadow-lg"
            role="dialog"
            aria-label="Zoeken"
          >
            <Container>
              <SearchPanel onClose={onClose} />
            </Container>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
}

function SearchPanel({ onClose }: { onClose: () => void }) {
  const [query, setQuery] = useState("");
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    inputRef.current?.focus();
  }, []);

  const results = products.filter((product) =>
    `${product.name} ${product.tagline}`
      .toLowerCase()
      .includes(query.trim().toLowerCase()),
  );

  return (
    <div className="mx-auto max-w-xl">
      <div className="flex items-center gap-3 border-b border-charcoal/20 pb-3">
        <Search size={20} className="text-ink" />
        <input
          ref={inputRef}
          type="text"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          placeholder="Zoek naar producten..."
          className="w-full bg-transparent text-lg text-charcoal placeholder:text-charcoal-soft/60 focus:outline-none"
        />
        <button
          onClick={onClose}
          aria-label="Zoeken sluiten"
          className="rounded-full p-1.5 text-charcoal-soft transition-colors hover:bg-blush hover:text-charcoal"
        >
          <X size={18} />
        </button>
      </div>

      <div className="mt-4">
        {query.trim() === "" ? (
          <p className="py-6 text-center text-sm text-charcoal-soft">
            Begin met typen om producten te vinden.
          </p>
        ) : results.length === 0 ? (
          <p className="py-6 text-center text-sm text-charcoal-soft">
            Geen producten gevonden voor &ldquo;{query}&rdquo;.
          </p>
        ) : (
          <ul className="space-y-1">
            {results.map((product) => (
              <li key={product.id}>
                <Link
                  href={`/producten/${product.slug}`}
                  onClick={onClose}
                  className="flex items-center justify-between gap-4 rounded-md px-3 py-3 transition-colors hover:bg-blush/50"
                >
                  <span>
                    <span className="block font-medium text-charcoal">
                      {product.name}
                    </span>
                    <span className="block text-sm text-charcoal-soft">
                      {product.tagline}
                    </span>
                  </span>
                  <span className="shrink-0 text-sm font-medium text-ink">
                    {formatPrice(product.price)}
                  </span>
                </Link>
              </li>
            ))}
          </ul>
        )}
      </div>
    </div>
  );
}
