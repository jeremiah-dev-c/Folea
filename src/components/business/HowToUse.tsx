"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { cn } from "@/lib/utils/cn";
import { hairbutter } from "@/lib/data/products";
import { Container } from "@/components/ui/Container";

export function HowToUse() {
  const [activeId, setActiveId] = useState(hairbutter.usageMethods[0].id);
  const active = hairbutter.usageMethods.find((m) => m.id === activeId)!;

  return (
    <section className="bg-blush/40 py-24 md:py-32">
      <Container>
        <div className="mx-auto max-w-2xl text-center">
          <p className="text-xs font-medium uppercase tracking-[0.3em] text-earth">
            Multifunctioneel
          </p>
          <h2 className="mt-3 text-4xl md:text-5xl text-forest">
            Hoe te Gebruiken
          </h2>
          <p className="mt-4 text-charcoal-soft">
            Eén potje, vier manieren om je haar te verzorgen — ontdek wat bij
            jouw haar past.
          </p>
        </div>

        <div className="mt-12 flex flex-wrap justify-center gap-3">
          {hairbutter.usageMethods.map((method) => (
            <button
              key={method.id}
              onClick={() => setActiveId(method.id)}
              className={cn(
                "rounded-full border px-5 py-2.5 text-sm font-medium transition-colors duration-300",
                activeId === method.id
                  ? "border-forest bg-forest text-white"
                  : "border-charcoal/15 bg-transparent text-charcoal hover:border-forest",
              )}
            >
              {method.title}
            </button>
          ))}
        </div>

        <div className="mx-auto mt-10 max-w-2xl">
          <AnimatePresence mode="wait">
            <motion.div
              key={active.id}
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -12 }}
              transition={{ duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
              className="rounded-lg bg-cream p-8 text-center shadow-sm"
            >
              <p className="text-xs font-medium uppercase tracking-wider text-earth">
                {active.hairType}
              </p>
              <h3 className="mt-2 text-2xl text-forest">{active.title}</h3>
              <p className="mt-3 text-charcoal-soft leading-relaxed">
                {active.description}
              </p>
            </motion.div>
          </AnimatePresence>
        </div>
      </Container>
    </section>
  );
}
