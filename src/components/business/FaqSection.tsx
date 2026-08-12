"use client";

import { motion } from "framer-motion";
import { Accordion } from "@/components/ui/Accordion";
import { faqItems } from "@/lib/data/faq";

export function FaqSection() {
  return (
    <motion.div
      initial={{ opacity: 0, y: 16 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-80px" }}
      transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
      className="mx-auto max-w-2xl"
    >
      <div className="text-center">
        <p className="text-xs font-medium uppercase tracking-[0.3em] text-earth">
          Veelgestelde vragen
        </p>
        <h2 className="mt-3 text-3xl md:text-4xl text-charcoal">
          Misschien staat je antwoord er al tussen
        </h2>
      </div>

      <div className="mt-12">
        <Accordion items={faqItems} />
      </div>
    </motion.div>
  );
}
