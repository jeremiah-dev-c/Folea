"use client";

import { motion } from "framer-motion";
import { buttonVariants } from "@/components/ui/Button";

const EASE = [0.22, 1, 0.36, 1] as const;

export function Hero() {
  return (
    <section className="relative flex h-[100svh] min-h-[640px] w-full items-center overflow-hidden bg-charcoal">
      <motion.video
        initial={{ scale: 1.12 }}
        animate={{ scale: 1 }}
        transition={{ duration: 3.5, ease: EASE }}
        className="absolute inset-0 h-full w-full object-cover"
        autoPlay
        muted
        loop
        playsInline
        poster="/video/hero-poster.jpg"
      >
        <source src="/video/hero.mp4" type="video/mp4" />
      </motion.video>

      {/* Mobiel: egale overlay achter gecentreerde tekst */}
      <div className="absolute inset-0 bg-charcoal/45 sm:hidden" />
      {/* Desktop: donkerst links waar de tekst staat, uitdovend naar rechts */}
      <div
        className="absolute inset-0 hidden sm:block"
        style={{
          background:
            "linear-gradient(to right, rgba(28,28,28,0.85) 0%, rgba(28,28,28,0.6) 35%, rgba(28,28,28,0.2) 65%, rgba(28,28,28,0.05) 100%)",
        }}
      />

      <div className="relative z-10 mx-auto w-full max-w-[var(--container-page)] px-6 sm:px-10 md:px-16 lg:px-20">
        <div className="mx-auto max-w-md text-center text-white sm:mx-0 sm:text-left">
          <motion.p
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, ease: EASE }}
            className="mb-5 text-[11px] font-medium uppercase tracking-[0.4em] text-blush"
          >
            Geïnspireerd door natuur, gemaakt met intentie
          </motion.p>
          <motion.h1
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.9, delay: 0.1, ease: EASE }}
            className="font-serif text-6xl leading-[1.02] sm:text-7xl md:text-8xl"
          >
            FOLÉA
          </motion.h1>
          <motion.p
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.9, delay: 0.2, ease: EASE }}
            className="mt-6 text-balance text-base leading-relaxed text-white/85 sm:text-lg"
          >
            Eén hairbutter voor al je haar, natuurlijk gevoed en bewust
            gemaakt.
          </motion.p>
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.9, delay: 0.32, ease: EASE }}
            className="mt-9"
          >
            <a
              href="#product-spotlight"
              className={buttonVariants({ variant: "blush", size: "lg" })}
            >
              Ontdek Hairbutter
            </a>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
