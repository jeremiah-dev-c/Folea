"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { Container } from "@/components/ui/Container";

const EASE = [0.22, 1, 0.36, 1] as const;

/**
 * Missieblok. De statistieken (4 haartypes, 100%, 1 product) zijn op verzoek
 * van de klant vervallen; de tekst hieronder is letterlijk aangeleverd.
 */
export function AboutValues() {
  return (
    <section className="bg-blush py-20 md:py-28">
      <Container>
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-80px" }}
          transition={{ duration: 0.7, ease: EASE }}
          className="mx-auto max-w-2xl text-center"
        >
          <p className="text-[11px] font-medium uppercase tracking-[0.3em] text-ink/60">
            Onze missie
          </p>
          <h2 className="mt-4 font-display text-[clamp(1.15rem,4.4vw,3rem)] uppercase leading-[1.1] tracking-[0.02em] text-ink">
            Elk haar verdient goede verzorging
          </h2>

          <div className="mt-7 space-y-4 text-left leading-relaxed text-ink/75 sm:text-center">
            <p>
              FOLÉA is ontstaan vanuit de behoefte aan natuurlijke
              haarverzorging die eenvoudig is in gebruik en geschikt is voor
              verschillende haartypen. Ieder haar heeft een eigen structuur en
              vraagt om een passende manier van verzorgen. Daarom hebben we één
              veelzijdige hairbutter ontwikkeld die je op verschillende manieren
              kunt gebruiken, afhankelijk van jouw haar en behoefte.
            </p>
            <p>
              Met zorgvuldig gekozen, natuurlijke ingrediënten willen we
              haarverzorging overzichtelijk en toegankelijk maken. Geen
              ingewikkelde routines of een kast vol verschillende producten,
              maar één bewuste verzorging die het haar voedt, verzacht en een
              gezonde uitstraling geeft. Dat is waar FOLÉA voor staat.
            </p>
          </div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-80px" }}
          transition={{ duration: 0.6, delay: 0.05, ease: EASE }}
          className="mt-12 text-center"
        >
          <Link
            href="/producten/hairbutter"
            className="inline-flex items-center rounded-full bg-ink px-8 py-3.5 text-xs font-semibold uppercase tracking-[0.2em] text-white transition-transform duration-300 ease-[var(--ease-elegant)] hover:scale-105 hover:bg-ink-light"
          >
            Ontdek de hairbutter
          </Link>
        </motion.div>
      </Container>
    </section>
  );
}
