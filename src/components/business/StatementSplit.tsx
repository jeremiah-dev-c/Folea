"use client";

import Image from "next/image";
import Link from "next/link";
import { useRef } from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import { Container } from "@/components/ui/Container";

const EASE = [0.22, 1, 0.36, 1] as const;

/**
 * Statementblok met het sterkste beeld uit de shoot. Bewust geen full-bleed:
 * de foto is 2:3 staand, en over de volle breedte uitrekken vraagt ~2880px op
 * een retina-desktop terwijl de bron 1600px is. Op de helft van de breedte
 * blijft hij scherp en komt hij alsnog groot binnen.
 */
export function StatementSplit() {
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "end start"],
  });
  const imageY = useTransform(scrollYProgress, [0, 1], ["-6%", "6%"]);

  return (
    <section className="bg-ink py-16 text-white md:py-24">
      <Container>
        <div className="grid items-center gap-12 lg:grid-cols-[1.05fr_1fr] lg:gap-20">
          <div ref={ref} className="relative">
            <motion.div
              style={{ y: imageY }}
              className="relative aspect-[4/5] overflow-hidden rounded-2xl bg-white/5"
            >
              <Image
                src="/images/model-duo-floor.jpg"
                alt="Twee modellen liggend op de studiovloer, van bovenaf gefotografeerd"
                fill
                sizes="(min-width: 1024px) 52vw, 92vw"
                className="object-cover"
              />
            </motion.div>
          </div>

          <div>
            <motion.p
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={{ once: true, margin: "-80px" }}
              transition={{ duration: 0.6, ease: EASE }}
              className="text-[11px] font-medium uppercase tracking-[0.3em] text-blush"
            >
              Voor iedereen
            </motion.p>

            <motion.h2
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={{ once: true, margin: "-80px" }}
              transition={{ duration: 0.7, delay: 0.05, ease: EASE }}
              className="mt-4 font-display text-2xl uppercase leading-[1.15] tracking-[0.02em] sm:text-3xl lg:text-4xl"
            >
              Gemaakt voor het haar dat je al hebt
            </motion.h2>

            <motion.p
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={{ once: true, margin: "-80px" }}
              transition={{ duration: 0.7, delay: 0.1, ease: EASE }}
              className="mt-6 max-w-md leading-relaxed text-white/65"
            >
              Geen belofte dat je haar iets anders wordt. Eén pot die doet wat
              er nodig is, of je nu strakke coils, losse slag of steil haar
              hebt.
            </motion.p>

            <motion.div
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={{ once: true, margin: "-80px" }}
              transition={{ duration: 0.7, delay: 0.15, ease: EASE }}
              className="mt-9"
            >
              <Link
                href="/producten/hairbutter"
                className="inline-flex items-center rounded-full bg-blush px-8 py-3.5 text-xs font-semibold uppercase tracking-[0.2em] text-ink transition-transform duration-300 ease-[var(--ease-elegant)] hover:scale-105 hover:bg-blush-deep"
              >
                Ontdek de hairbutter
              </Link>
            </motion.div>
          </div>
        </div>
      </Container>
    </section>
  );
}
