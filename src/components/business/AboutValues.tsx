"use client";

import { motion } from "framer-motion";
import { Container } from "@/components/ui/Container";
import { buttonVariants } from "@/components/ui/Button";

const values = [
  {
    stat: "4",
    label: "Haartypes ondersteund — steil, slag, krul, kroes",
  },
  {
    stat: "100%",
    label: "Natuurlijke, herkenbare ingrediënten",
  },
  {
    stat: "1",
    label: "Multifunctioneel product voor je hele routine",
  },
];

export function AboutValues() {
  return (
    <section className="bg-blush/60 py-20 md:py-28">
      <Container>
        <div className="mx-auto max-w-2xl text-center">
          <p className="text-xs font-medium uppercase tracking-[0.3em] text-earth">
            Onze missie
          </p>
          <h2 className="mt-3 text-3xl md:text-4xl text-charcoal">
            Gemaakt voor ieder haartype, zonder compromis
          </h2>
          <p className="mt-4 text-charcoal-soft leading-relaxed">
            We geloven dat goede haarverzorging niet zou moeten vragen om
            tien verschillende producten. FOLÉA past zich aan — aan jouw
            structuur, jouw poreusheid, jouw routine.
          </p>
        </div>

        <div className="mt-16 grid gap-8 sm:grid-cols-3">
          {values.map((value, index) => (
            <motion.div
              key={value.stat}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-80px" }}
              transition={{
                duration: 0.6,
                delay: index * 0.1,
                ease: [0.22, 1, 0.36, 1],
              }}
              className="rounded-lg bg-cream/70 px-6 py-10 text-center"
            >
              <p className="font-serif text-5xl text-forest">{value.stat}</p>
              <p className="mt-3 text-sm text-charcoal-soft leading-relaxed">
                {value.label}
              </p>
            </motion.div>
          ))}
        </div>

        <motion.div
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-80px" }}
          transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
          className="mt-14 text-center"
        >
          <a
            href="/producten/hairbutter"
            className={buttonVariants({ variant: "primary", size: "lg" })}
          >
            Ontdek de Hairbutter
          </a>
        </motion.div>
      </Container>
    </section>
  );
}
