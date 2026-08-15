"use client";

import { motion } from "framer-motion";
import { Container } from "@/components/ui/Container";

export function AboutHero() {
  return (
    <section className="bg-cream pt-16 pb-20 md:pt-24 md:pb-28">
      <Container>
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
          className="mx-auto max-w-2xl text-center"
        >
          <p className="text-[11px] font-medium uppercase tracking-[0.3em] text-ink/50">
            Ons verhaal
          </p>
          {/* De merkregel staat in het Engels omdat hij zo op de pot staat. */}
          <h1 className="mt-4 font-display text-2xl uppercase leading-[1.15] tracking-[0.02em] text-ink sm:text-3xl lg:text-4xl">
            Inspired by nature,
            <br />
            created with intention
          </h1>
          <p className="mx-auto mt-6 max-w-lg text-lg text-charcoal-soft leading-relaxed">
            FOLÉA ontstond uit een simpele overtuiging: goede
            haarverzorging hoort er voor iedereen te zijn, ongeacht
            haartype, textuur of structuur.
          </p>
        </motion.div>
      </Container>
    </section>
  );
}
