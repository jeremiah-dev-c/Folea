"use client";

import { useState } from "react";
import Image from "next/image";
import { motion, AnimatePresence } from "framer-motion";
import { cn } from "@/lib/utils/cn";
import { hairbutter } from "@/lib/data/products";
import { Container } from "@/components/ui/Container";

const EASE = [0.22, 1, 0.36, 1] as const;

export function HowToUse() {
  const [activeId, setActiveId] = useState(hairbutter.usageMethods[0].id);
  const active = hairbutter.usageMethods.find((m) => m.id === activeId)!;

  return (
    <section className="bg-blush/40 py-24 md:py-32">
      <Container>
        <div className="grid items-center gap-12 md:grid-cols-2 md:gap-16 lg:gap-20">
          <motion.div
            initial={{ opacity: 0, scale: 0.96 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.8, ease: EASE }}
            className="relative order-2 aspect-[4/5] overflow-hidden rounded-lg bg-cream md:order-1"
          >
            <Image
              src="/images/product-top.jpg"
              alt="FOLÉA Hairbutter van bovenaf met het logo op de deksel"
              fill
              sizes="(min-width: 768px) 50vw, 100vw"
              className="object-cover"
            />
          </motion.div>

          <div className="order-1 md:order-2">
            <p className="text-xs font-medium uppercase tracking-[0.3em] text-earth">
              Multifunctioneel
            </p>
            <h2 className="mt-3 text-4xl md:text-5xl text-berry">
              Hoe te Gebruiken
            </h2>
            <p className="mt-4 text-charcoal-soft leading-relaxed">
              Eén potje, vier manieren om je haar te verzorgen. Ontdek wat
              bij jouw haar past.
            </p>

            <div className="mt-8 flex flex-wrap gap-2.5">
              {hairbutter.usageMethods.map((method) => (
                <button
                  key={method.id}
                  onClick={() => setActiveId(method.id)}
                  className={cn(
                    "rounded-full border px-4 py-2 text-sm font-medium transition-colors duration-300",
                    activeId === method.id
                      ? "border-berry bg-berry text-white"
                      : "border-charcoal/15 bg-transparent text-charcoal hover:border-berry",
                  )}
                >
                  {method.title}
                </button>
              ))}
            </div>

            <div className="mt-6">
              <AnimatePresence mode="wait">
                <motion.div
                  key={active.id}
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -10 }}
                  transition={{ duration: 0.35, ease: EASE }}
                  className="rounded-lg bg-cream p-7 shadow-sm"
                >
                  <p className="text-xs font-medium uppercase tracking-wider text-earth">
                    {active.hairType}
                  </p>
                  <h3 className="mt-2 text-2xl text-berry">{active.title}</h3>
                  <p className="mt-3 text-charcoal-soft leading-relaxed">
                    {active.description}
                  </p>
                </motion.div>
              </AnimatePresence>
            </div>
          </div>
        </div>
      </Container>
    </section>
  );
}
