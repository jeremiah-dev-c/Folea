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
          <p className="text-xs font-medium uppercase tracking-[0.3em] text-earth">
            Ons verhaal
          </p>
          <h1 className="mt-4 text-5xl leading-[1.1] text-forest md:text-6xl">
            Geïnspireerd door natuur,
            <br />
            gemaakt met intentie
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
