"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { Container } from "@/components/ui/Container";

const EASE = [0.22, 1, 0.36, 1] as const;

/**
 * Missieblok. De statistieken (4 haartypes, 100%, 1 product) en de productfoto
 * zijn op verzoek van de klant vervallen; de tekst is letterlijk aangeleverd.
 * Het blok draait nu volledig op typografie.
 */
export function AboutValues() {
  return (
    <section className="bg-cream py-20 md:py-28">
      <Container>
        <div className="grid gap-10 lg:grid-cols-12 lg:gap-16">
          <motion.div
            initial={{ opacity: 0, y: 18 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-80px" }}
            transition={{ duration: 0.8, ease: EASE }}
            className="lg:col-span-7"
          >
            <p className="text-[11px] font-medium uppercase tracking-[0.3em] text-ink/50">
              Onze missie
            </p>
            <h2 className="mt-5 font-display text-[clamp(1.4rem,5.4vw,3.25rem)] uppercase leading-[1.05] tracking-[0.02em] text-ink">
              Elk haar verdient
              <br />
              goede verzorging
            </h2>
          </motion.div>

          {/* Tekst in de smallere kolom rechts: onder een kop van deze grootte
              las een even brede alinea als een muur. */}
          <motion.div
            initial={{ opacity: 0, y: 18 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-80px" }}
            transition={{ duration: 0.8, delay: 0.1, ease: EASE }}
            className="space-y-5 leading-relaxed text-charcoal-soft lg:col-span-5 lg:pt-3"
          >
            <p className="border-l-2 border-ink pl-5 text-lg leading-relaxed text-ink">
              FOLÉA is ontstaan vanuit de behoefte aan natuurlijke
              haarverzorging die eenvoudig is in gebruik en geschikt is voor
              verschillende haartypen.
            </p>
            <p>
              Ieder haar heeft een eigen structuur en vraagt om een passende
              manier van verzorgen. Daarom hebben we één veelzijdige hairbutter
              ontwikkeld die je op verschillende manieren kunt gebruiken,
              afhankelijk van jouw haar en behoefte.
            </p>
            <p>
              Met zorgvuldig gekozen, natuurlijke ingrediënten willen we
              haarverzorging overzichtelijk en toegankelijk maken. Geen
              ingewikkelde routines of een kast vol verschillende producten,
              maar één bewuste verzorging die het haar voedt, verzacht en een
              gezonde uitstraling geeft. Dat is waar FOLÉA voor staat.
            </p>

            <div className="pt-4">
              <Link
                href="/producten/hairbutter"
                className="inline-flex items-center rounded-full bg-ink px-8 py-3.5 text-xs font-semibold uppercase tracking-[0.2em] text-white transition-transform duration-300 ease-[var(--ease-elegant)] hover:scale-105 hover:bg-ink-light"
              >
                Ontdek de hairbutter
              </Link>
            </div>
          </motion.div>
        </div>
      </Container>
    </section>
  );
}
