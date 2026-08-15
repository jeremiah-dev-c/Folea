"use client";

import { motion } from "framer-motion";
import { hairbutter } from "@/lib/data/products";
import { Container } from "@/components/ui/Container";
import { FillOnScroll } from "@/components/ui/FillOnScroll";

const EASE = [0.22, 1, 0.36, 1] as const;

export function Ingredients() {
  return (
    <section className="bg-ink pb-20 pt-16 text-white md:pb-28 md:pt-20">
      <Container>
        <div className="max-w-2xl">
          <p className="text-[11px] font-medium uppercase tracking-[0.3em] text-blush">
            De formule
          </p>
          {/* Niet "vier werkstoffen": de formule bevat er meer, dit zijn de
              vier die de klant wil uitlichten. */}
          <FillOnScroll
            text="De formule"
            className="mt-4 text-3xl sm:text-4xl lg:text-5xl"
          />
        </div>

        <ul className="mt-12 grid gap-px overflow-hidden rounded-2xl bg-white/12 sm:grid-cols-2 md:mt-16">
          {hairbutter.ingredients.map((ingredient, i) => (
            <motion.li
              key={ingredient.name}
              initial={{ opacity: 0, y: 16 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-60px" }}
              transition={{ duration: 0.6, delay: i * 0.07, ease: EASE }}
              className="group bg-ink p-7 transition-colors duration-500 hover:bg-white/[0.04] md:p-9"
            >
              <span className="text-xs font-semibold tracking-[0.2em] text-white/35">
                {String(i + 1).padStart(2, "0")}
              </span>
              <h3 className="mt-3 font-display text-lg uppercase tracking-[0.02em] text-white transition-colors duration-500 group-hover:text-blush sm:text-xl">
                {ingredient.name}
              </h3>
              {/* Alleen tonen als de klant een omschrijving heeft geleverd. */}
              {ingredient.description && (
                <p className="mt-3 text-sm leading-relaxed text-white/60">
                  {ingredient.description}
                </p>
              )}
            </motion.li>
          ))}
        </ul>

        {/* De link naar de volledige lijst is er op verzoek van de klant uit;
            de regel over parabenen blijft. */}
        <p className="mt-10 text-sm text-white/45">
          Geen parabenen, sulfaten of dierlijke bestanddelen.
        </p>
      </Container>
    </section>
  );
}
