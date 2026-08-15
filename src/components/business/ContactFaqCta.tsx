"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { Container } from "@/components/ui/Container";

const EASE = [0.22, 1, 0.36, 1] as const;

/**
 * Staat bewust ná het formulier: wie hier komt heeft meestal een vraag die al
 * beantwoord is, en dit vangt die af zonder de weg naar het formulier te
 * blokkeren.
 *
 * Beige en niet zwart: de footer eronder is al zwart, en twee zwarte vlakken
 * op elkaar lezen als één blok waarin deze verwijzing verdwijnt.
 */
export function ContactFaqCta() {
  return (
    <section className="bg-cream py-14 md:py-20">
      <Container>
        <motion.div
          initial={{ opacity: 0, y: 18 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-80px" }}
          transition={{ duration: 0.7, ease: EASE }}
          className="flex flex-col gap-7 sm:flex-row sm:items-end sm:justify-between"
        >
          <div>
            <p className="text-[11px] font-medium uppercase tracking-[0.3em] text-ink/50">
              Sneller antwoord
            </p>
            <h2 className="mt-4 max-w-md font-display text-xl uppercase leading-[1.2] tracking-[0.02em] text-ink sm:text-2xl lg:text-3xl">
              Staat je vraag er misschien al bij?
            </h2>
          </div>

          <Link
            href="/faq"
            className="inline-flex shrink-0 items-center self-start rounded-full bg-ink px-7 py-3.5 text-xs font-semibold uppercase tracking-[0.2em] text-white transition-transform duration-300 ease-[var(--ease-elegant)] hover:scale-105 hover:bg-ink-light sm:self-auto"
          >
            Veelgestelde vragen
          </Link>
        </motion.div>
      </Container>
    </section>
  );
}
