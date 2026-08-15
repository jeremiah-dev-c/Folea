"use client";

import { motion } from "framer-motion";
import { Container } from "@/components/ui/Container";

const EASE = [0.22, 1, 0.36, 1] as const;

export function AboutHero() {
  return (
    <section className="bg-blush py-16 md:py-24 lg:py-28">
      <Container>
        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.6, ease: EASE }}
          className="text-[11px] font-medium uppercase tracking-[0.3em] text-ink/60"
        >
          Ons verhaal
        </motion.p>

        {/* De merkregel staat in het Engels omdat hij zo op de pot staat. */}
        <motion.h1
          initial={{ opacity: 0, y: 18 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.05, ease: EASE }}
          className="mt-5 max-w-4xl font-display text-[clamp(1.6rem,6vw,4rem)] uppercase leading-[1.05] tracking-[0.02em] text-ink"
        >
          Inspired by nature,
          <br />
          created with intention
        </motion.h1>
      </Container>
    </section>
  );
}
