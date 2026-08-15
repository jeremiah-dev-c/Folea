"use client";

import { motion } from "framer-motion";

const EASE = [0.22, 1, 0.36, 1] as const;

export function ContactHero() {
  return (
    <motion.div
      initial={{ opacity: 0, y: 16 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.7, ease: EASE }}
    >
      <p className="text-[11px] font-medium uppercase tracking-[0.3em] text-ink/50">
        Contact
      </p>
      <h1 className="mt-4 max-w-2xl font-display text-2xl uppercase leading-[1.15] tracking-[0.02em] text-ink sm:text-3xl lg:text-4xl">
        We horen graag van je
      </h1>
      <p className="mt-5 max-w-md leading-relaxed text-charcoal-soft">
        Vragen over een bestelling of het gebruik van de hairbutter? Laat een
        bericht achter, we reageren binnen één tot twee werkdagen.
      </p>
    </motion.div>
  );
}
