"use client";

import Image from "next/image";
import Link from "next/link";
import { useRef } from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import { hairbutter } from "@/lib/data/products";
import { Container } from "@/components/ui/Container";
import { RotatingBadge } from "@/components/ui/RotatingBadge";
import { formatPrice } from "@/lib/utils/format";
import { useCart } from "@/hooks/useCart";

const EASE = [0.22, 1, 0.36, 1] as const;

export function ProductSpotlight() {
  const { addItem } = useCart();
  const sectionRef = useRef<HTMLElement>(null);

  // Parallax staat op de beeldwrapper zelf, nooit op een parent van elementen
  // met een eigen initial/animate: die blijven dan op hun beginwaarde hangen.
  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start end", "end start"],
  });
  const jarY = useTransform(scrollYProgress, [0, 1], ["6%", "-6%"]);

  return (
    <section
      ref={sectionRef}
      id="product-spotlight"
      className="overflow-hidden bg-cream py-16 md:py-24"
    >
      <Container>
        <div className="grid items-center gap-14 lg:grid-cols-2 lg:gap-20">
          {/* Geen roze vlak meer achter de pot en rechte hoeken: de klant vond
              het roze randje dat er onderuit stak niet mooi (15 aug). */}
          <div className="relative mx-auto w-full max-w-md lg:mx-0">
            {/* Langer kader op mobiel: de klant vond het 4:5 blok te gedrongen
                en wilde de foto verder naar boven en beneden doorgetrokken. */}
            <motion.div
              style={{ y: jarY }}
              className="relative aspect-[3/4.4] overflow-hidden sm:aspect-[4/5]"
            >
              <Image
                src={hairbutter.images[0].src}
                alt={hairbutter.images[0].alt}
                fill
                sizes="(min-width: 1024px) 42vw, 90vw"
                className="object-cover"
                priority
              />
            </motion.div>

            <RotatingBadge
              text="100% natuurlijk · voor elke textuur · "
              className="absolute -bottom-6 -left-4 h-28 w-28 text-ink sm:-left-8 sm:h-32 sm:w-32"
            />
          </div>

          <div>
            <motion.h2
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={{ once: true, margin: "-80px" }}
              transition={{ duration: 0.7, delay: 0.05, ease: EASE }}
              // clamp zodat "Nourishing hairbutter" ook op een smalle telefoon
              // op één regel blijft; Horizon is een brede letter.
              className="font-display text-[clamp(0.8rem,4.2vw,2rem)] uppercase leading-[1.15] tracking-[0.02em] text-ink"
            >
              {hairbutter.name}
            </motion.h2>

            <motion.p
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={{ once: true, margin: "-80px" }}
              transition={{ duration: 0.7, delay: 0.1, ease: EASE }}
              className="mt-5 max-w-md leading-relaxed text-charcoal-soft"
            >
              {hairbutter.description}
            </motion.p>

            <motion.div
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={{ once: true, margin: "-80px" }}
              transition={{ duration: 0.7, delay: 0.15, ease: EASE }}
              className="mt-8 flex flex-wrap items-center gap-x-6 gap-y-4 border-t border-ink/10 pt-7"
            >
              {/* Niet in font-display: Horizon heeft wel een €-glyph, maar die
                  rendert leeg, waardoor de prijs als "39,95" verscheen. */}
              <span className="text-3xl font-semibold text-ink">
                {formatPrice(hairbutter.price)}
              </span>
              <button
                type="button"
                onClick={() => addItem(hairbutter)}
                className="rounded-full bg-ink px-8 py-3.5 text-xs font-semibold uppercase tracking-[0.2em] text-white transition-transform duration-300 ease-[var(--ease-elegant)] hover:scale-105 hover:bg-ink-light"
              >
                In winkelmand
              </button>
            </motion.div>

            <motion.div
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={{ once: true, margin: "-80px" }}
              transition={{ duration: 0.7, delay: 0.2, ease: EASE }}
              className="mt-6"
            >
              <Link
                href={`/producten/${hairbutter.slug}`}
                className="text-sm font-medium text-ink underline underline-offset-4 transition-colors hover:text-charcoal-soft"
              >
                Bekijk volledige productinformatie
              </Link>
            </motion.div>
          </div>
        </div>
      </Container>
    </section>
  );
}
