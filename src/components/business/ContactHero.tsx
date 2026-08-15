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
    <section className="bg-blush pb-8 pt-14 md:pb-10 md:pt-20">
      <Container>
        {/* De kopregel met haarlijn en FOLÉA is er op verzoek uit (15 aug), en
            de pagina opent nu in het roze in plaats van in beige. */}
        {/* items-end zet de contactgegevens gelijk met de onderkant van de kop,
            zodat de twee kolommen op één lijn afsluiten. */}
        <div className="grid gap-8 lg:grid-cols-12 lg:items-end lg:gap-16">
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
              className="mt-5 max-w-md leading-relaxed text-ink/75"
            >
              Vragen over een bestelling of het gebruik van de hairbutter? Laat
              een bericht achter, we reageren binnen één tot twee werkdagen.
            </motion.p>
          </div>

          <ContactInfo />
        </div>
      </Container>
    </section>
  );
}
