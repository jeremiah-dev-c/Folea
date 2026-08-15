"use client";

import Image from "next/image";
import { motion } from "framer-motion";
import { Container } from "@/components/ui/Container";
import { ContactInfo } from "@/components/business/ContactInfo";

const EASE = [0.22, 1, 0.36, 1] as const;

/**
 * Opening van de contactpagina. Dezelfde kopregel met haarlijn als op Over Ons,
 * zodat de twee tekstpagina's als één familie lezen. De foto staat ernaast
 * omdat een contactpagina zonder beeld naast de rest van de site wegviel.
 */
export function ContactHero() {
  return (
    <section className="bg-cream pb-16 pt-12 md:pb-24 md:pt-16">
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

        <div className="mt-9 grid gap-10 md:mt-14 lg:grid-cols-12 lg:gap-16">
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
              className="mt-6 max-w-md text-lg leading-relaxed text-charcoal-soft"
            >
              Vragen over een bestelling of het gebruik van de hairbutter? Laat
              een bericht achter, we reageren binnen één tot twee werkdagen.
            </motion.p>

            <ContactInfo />
          </div>

          {/* 2:3 kader, precies de verhouding van het bestand: object-cover in
              een vierkanter kader sneed de pot af. */}
          <motion.div
            initial={{ opacity: 0, scale: 0.97 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.9, delay: 0.15, ease: EASE }}
            className="lg:col-span-5"
          >
            <div className="relative aspect-[2/3] overflow-hidden rounded-2xl bg-blush/30">
              <Image
                src="/images/product-duo.jpg"
                alt="Twee potten FOLÉA Nourishing hairbutter"
                fill
                sizes="(min-width: 1024px) 38vw, 90vw"
                className="object-cover"
                priority
              />
            </div>
          </motion.div>
        </div>
      </Container>
    </section>
  );
}
