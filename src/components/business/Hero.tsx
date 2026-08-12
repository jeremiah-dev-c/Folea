"use client";

import { motion } from "framer-motion";
import { buttonVariants } from "@/components/ui/Button";

export function Hero() {
  return (
    <section className="relative h-[100svh] min-h-[640px] w-full overflow-hidden">
      <video
        className="absolute inset-0 h-full w-full object-cover"
        autoPlay
        muted
        loop
        playsInline
        poster="/video/hero-poster.jpg"
      >
        <source src="/video/hero.mp4" type="video/mp4" />
      </video>

      <div className="absolute inset-0 bg-gradient-to-t from-charcoal/70 via-charcoal/20 to-charcoal/40" />

      <div className="relative z-10 flex h-full w-full flex-col items-center justify-center px-6 text-center text-white">
        <motion.p
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
          className="mb-4 text-xs font-medium uppercase tracking-[0.35em] text-blush"
        >
          Inspired by nature, created with intention
        </motion.p>
        <motion.h1
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.9, delay: 0.1, ease: [0.22, 1, 0.36, 1] }}
          className="font-serif text-6xl leading-[1.05] sm:text-7xl md:text-8xl"
        >
          FOLÉA
        </motion.h1>
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.9, delay: 0.2, ease: [0.22, 1, 0.36, 1] }}
          className="mt-6 max-w-md text-base text-white/90 sm:text-lg"
        >
          Eén ambachtelijke hairbutter voor al je haar — natuurlijk gevoed,
          bewust gemaakt.
        </motion.p>
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.9, delay: 0.3, ease: [0.22, 1, 0.36, 1] }}
          className="mt-10"
        >
          <a
            href="#product-spotlight"
            className={buttonVariants({ variant: "primary", size: "lg" })}
          >
            Ontdek Hairbutter
          </a>
        </motion.div>
      </div>

      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 1, delay: 0.8 }}
        className="absolute bottom-8 left-1/2 z-10 -translate-x-1/2 text-white/70"
      >
        <div className="h-9 w-5 rounded-full border border-white/50 p-1">
          <motion.div
            animate={{ y: [0, 10, 0] }}
            transition={{ duration: 1.8, repeat: Infinity, ease: "easeInOut" }}
            className="h-1.5 w-1.5 rounded-full bg-white"
          />
        </div>
      </motion.div>
    </section>
  );
}
