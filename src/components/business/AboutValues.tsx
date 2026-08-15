"use client";

import Image from "next/image";
import Link from "next/link";
import { useRef } from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import { Container } from "@/components/ui/Container";

const EASE = [0.22, 1, 0.36, 1] as const;

/**
 * Missieblok. De statistieken (4 haartypes, 100%, 1 product) zijn op verzoek
 * van de klant vervallen; de tekst hieronder is letterlijk aangeleverd.
 */
export function AboutValues() {
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "end start"],
  });
  const potY = useTransform(scrollYProgress, [0, 1], ["8%", "-8%"]);

  return (
    <section className="overflow-hidden bg-blush py-16 md:py-24">
      <Container>
        <motion.p
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true, margin: "-80px" }}
          transition={{ duration: 0.6, ease: EASE }}
          className="text-[11px] font-medium uppercase tracking-[0.3em] text-ink/60"
        >
          Onze missie
        </motion.p>

        <motion.h2
          initial={{ opacity: 0, y: 18 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-80px" }}
          transition={{ duration: 0.8, delay: 0.05, ease: EASE }}
          className="mt-5 max-w-4xl font-display text-[clamp(1.4rem,5.4vw,3.5rem)] uppercase leading-[1.05] tracking-[0.02em] text-ink"
        >
          Elk haar verdient
          <br />
          goede verzorging
        </motion.h2>

        <div className="mt-12 grid gap-10 md:mt-16 md:grid-cols-[1fr_auto] md:items-end md:gap-16">
          {/* Twee kolommen op desktop: één lange kolom tekst las als een
              muur, zeker onder een kop van deze grootte. */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-80px" }}
            transition={{ duration: 0.8, delay: 0.1, ease: EASE }}
            className="space-y-5 leading-relaxed text-ink/75 lg:columns-2 lg:gap-12 lg:space-y-0 [&>p]:break-inside-avoid [&>p+p]:mt-5 lg:[&>p+p]:mt-0"
          >
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
          </motion.div>

          <motion.div
            ref={ref}
            initial={{ opacity: 0, scale: 0.96 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true, margin: "-80px" }}
            transition={{ duration: 0.8, delay: 0.15, ease: EASE }}
            className="relative mx-auto w-full max-w-[16rem] shrink-0 md:mx-0 md:w-56 lg:w-64"
          >
            <motion.div
              style={{ y: potY }}
              className="relative aspect-[3/4] overflow-hidden rounded-2xl bg-ink/5"
            >
              <Image
                src="/images/product-front.jpg"
                alt="Pot FOLÉA Nourishing hairbutter"
                fill
                sizes="(min-width: 768px) 16rem, 60vw"
                className="object-cover"
              />
            </motion.div>
          </motion.div>
        </div>

        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true, margin: "-80px" }}
          transition={{ duration: 0.6, delay: 0.2, ease: EASE }}
          className="mt-12 border-t border-ink/15 pt-8 md:mt-16"
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
