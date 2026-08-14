"use client";

import Link from "next/link";
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
          {/* Horizon is breed: op telefoon loopt "werkstoffen" bij text-3xl
              buiten beeld, vandaar een stap kleiner op mobiel. */}
          <FillOnScroll
            text="Vier werkstoffen, meer niet"
            className="mt-4 text-2xl sm:text-4xl lg:text-5xl"
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
              <p className="mt-3 text-sm leading-relaxed text-white/60">
                {ingredient.description}
              </p>
            </motion.li>
          ))}
        </ul>

        <div className="mt-10 flex flex-wrap items-center gap-x-8 gap-y-4">
          <Link
            href={`/producten/${hairbutter.slug}`}
            className="rounded-full bg-blush px-7 py-3.5 text-xs font-semibold uppercase tracking-[0.2em] text-ink transition-transform duration-300 ease-[var(--ease-elegant)] hover:scale-105 hover:bg-blush-deep"
          >
            Volledige ingrediëntenlijst
          </Link>
          <p className="text-sm text-white/45">
            Geen parabenen, sulfaten of dierlijke bestanddelen.
          </p>
        </div>
      </Container>
    </section>
  );
}
