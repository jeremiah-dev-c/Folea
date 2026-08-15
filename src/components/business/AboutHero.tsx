"use client";

import { motion } from "framer-motion";
import { Container } from "@/components/ui/Container";

const EASE = [0.22, 1, 0.36, 1] as const;

/**
 * Opening van Over Ons. Dit blok bestaat alleen uit typografie, dus het moet
 * het van de opmaak hebben: een kopregel met een haarlijn geeft de sectie een
 * bovenrand, en de tweede regel van de titel springt in. Zonder die twee viel
 * de titel als een blok tekst midden op een leeg beige vlak.
 *
 * De titel is de regel die op de pot staat en blijft daarom Engels.
 */
export function AboutHero() {
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
            Ons verhaal
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

        {/* De maat is afgestemd op "created with intention": die regel is in
            Horizon ruim 20x de lettergrootte breed, dus boven md past hij
            precies binnen de container zonder af te breken. Zet je de vw-factor
            hoger, dan klapt de titel weer om in vier rafelige regels.

            Op mobiel past de regel bij geen enkele leesbare maat op twee
            regels, dus daar lopen beide helften als één tekst door en verdeelt
            text-balance de regels gelijkmatig. Zonder dat bleef "nature,"
            alleen op een regel achter. Vanaf md staat de tweedeling wel vast,
            precies zoals de regel op de pot is afgebroken. */}
        <motion.h1
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.9, delay: 0.1, ease: EASE }}
          className="mt-9 text-balance font-display text-[clamp(1.5rem,4.2vw,3.4rem)] uppercase leading-[1.08] tracking-[0.02em] text-ink md:mt-14"
        >
          <span className="inline md:block">Inspired by nature,</span>{" "}
          <span className="inline md:block">created with intention</span>
        </motion.h1>
      </Container>
    </section>
  );
}
