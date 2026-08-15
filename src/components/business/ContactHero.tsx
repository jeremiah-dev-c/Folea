"use client";

import { motion } from "framer-motion";
import { Container } from "@/components/ui/Container";
import { ContactInfo } from "@/components/business/ContactInfo";

const EASE = [0.22, 1, 0.36, 1] as const;

/**
 * Bewust kort gehouden: op een contactpagina is het formulier het doel, dus
 * hierboven staat alleen wie je bereikt en hoe je dat rechtstreeks kunt doen.
 * De kopregel met haarlijn is dezelfde als op Over Ons.
 */
export function ContactHero() {
  return (
    <section className="bg-cream pb-12 pt-12 md:pb-14 md:pt-16">
      <Container>
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.7, ease: EASE }}
          className="flex items-center gap-4 sm:gap-6"
        >
          <p className="shrink-0 text-[11px] font-medium uppercase tracking-[0.3em] text-ink/50">
            Contact
          </p>
          <motion.span
            aria-hidden="true"
            initial={{ scaleX: 0 }}
            animate={{ scaleX: 1 }}
            transition={{ duration: 1.1, delay: 0.15, ease: EASE }}
            className="h-px flex-1 origin-left bg-ink/20"
          />
          <p className="shrink-0 font-display text-[11px] uppercase tracking-[0.18em] text-ink/40">
            FOLÉA
          </p>
        </motion.div>

        {/* items-end zet de contactgegevens gelijk met de onderkant van de kop,
            zodat de twee kolommen op één lijn afsluiten. */}
        <div className="mt-8 grid gap-8 md:mt-11 lg:grid-cols-12 lg:items-end lg:gap-16">
          <div className="lg:col-span-7">
            <motion.h1
              initial={{ opacity: 0, y: 24 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.9, delay: 0.1, ease: EASE }}
              className="text-balance font-display text-[clamp(1.5rem,4.2vw,3.1rem)] uppercase leading-[1.08] tracking-[0.02em] text-ink"
            >
              We horen graag van je
            </motion.h1>

            <motion.p
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.2, ease: EASE }}
              className="mt-5 max-w-md leading-relaxed text-charcoal-soft"
            >
              Vragen over een bestelling of het gebruik van de hairbutter? We
              reageren binnen één tot twee werkdagen.
            </motion.p>
          </div>

          <ContactInfo />
        </div>
      </Container>
    </section>
  );
}
