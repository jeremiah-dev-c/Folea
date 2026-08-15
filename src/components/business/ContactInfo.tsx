"use client";

import { motion } from "framer-motion";

const EASE = [0.22, 1, 0.36, 1] as const;

// FOLÉA verkoopt alleen online, dus geen bezoekadres. Gegevens aangeleverd
// door de klant (14 aug); er komt nog een definitief zakelijk e-mailadres.
const MAIL = "info@folea.nl";
const BEREIKBAAR = "Maandag t/m zondag, 10:00 tot 20:00";

/**
 * Staat naast de kop en niet als eigen blok verderop: wie alleen het mailadres
 * zoekt, moet daar niet eerst een formulier voor hoeven passeren.
 */
export function ContactInfo() {
  return (
    <motion.div
      initial={{ opacity: 0, y: 16 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.8, delay: 0.3, ease: EASE }}
      className="border-t border-ink/20 pt-6 lg:col-span-5 lg:border-t-0 lg:pt-0"
    >
      <p className="text-[11px] font-medium uppercase tracking-[0.3em] text-ink/60">
        Rechtstreeks
      </p>

      {/* De onderlijn wisselt op hover van de doffe naar de volle variant, in
          plaats van een underline die er altijd al staat. */}
      <a
        href={`mailto:${MAIL}`}
        className="group mt-3 inline-block font-sans text-[clamp(1.15rem,2.4vw,1.6rem)] font-medium leading-none tracking-tight text-ink"
      >
        {MAIL}
        <span
          aria-hidden="true"
          className="mt-2 block h-px w-full origin-left bg-ink/30 transition-transform duration-500 ease-[var(--ease-elegant)] group-hover:scale-x-0"
        />
        <span
          aria-hidden="true"
          className="-mt-px block h-px w-full origin-left scale-x-0 bg-ink transition-transform duration-500 ease-[var(--ease-elegant)] group-hover:scale-x-100"
        />
      </a>

      {/* Het kopje "Bereikbaar" staat zo in de aangeleverde tekst en hoort bij
          de tijden; zonder label bleef er een losse regel over. */}
      <p className="mt-6 text-[11px] font-medium uppercase tracking-[0.2em] text-ink/60">
        Bereikbaar
      </p>
      <p className="mt-2 text-sm leading-relaxed text-ink/70">{BEREIKBAAR}</p>
    </motion.div>
  );
}
