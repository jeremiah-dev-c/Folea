"use client";

import { motion } from "framer-motion";

const EASE = [0.22, 1, 0.36, 1] as const;

// FOLÉA verkoopt alleen online, dus geen bezoekadres. Gegevens aangeleverd
// door de klant (14 aug); er komt nog een definitief zakelijk e-mailadres.
const MAIL = "info@folea.nl";
const BEREIKBAAR = "Maandag t/m zondag, 10:00 tot 20:00";

/**
 * Wie alleen het mailadres zoekt, moet niet eerst een formulier hoeven lezen.
 * Daarom staat het adres hier groot en direct, boven de rest van de pagina.
 */
export function ContactInfo() {
  return (
    <motion.div
      initial={{ opacity: 0, y: 16 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.8, delay: 0.3, ease: EASE }}
      className="mt-10 border-t border-ink/15 pt-8 md:mt-12"
    >
      <p className="text-[11px] font-medium uppercase tracking-[0.3em] text-ink/50">
        Rechtstreeks
      </p>

      {/* De onderlijn groeit vanaf links mee op hover, in plaats van een
          standaard underline die er altijd al staat. */}
      <a
        href={`mailto:${MAIL}`}
        className="group mt-4 inline-block font-sans text-[clamp(1.35rem,3.4vw,2.1rem)] font-medium leading-none tracking-tight text-ink"
      >
        {MAIL}
        <span
          aria-hidden="true"
          className="mt-2 block h-px w-full origin-left scale-x-100 bg-ink/25 transition-transform duration-500 ease-[var(--ease-elegant)] group-hover:scale-x-0"
        />
        <span
          aria-hidden="true"
          className="-mt-px block h-px w-full origin-left scale-x-0 bg-ink transition-transform duration-500 ease-[var(--ease-elegant)] group-hover:scale-x-100"
        />
      </a>

      <p className="mt-5 text-sm leading-relaxed text-charcoal-soft">
        {BEREIKBAAR}
      </p>
    </motion.div>
  );
}
