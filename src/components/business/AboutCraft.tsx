"use client";

import { motion } from "framer-motion";
import { Droplet, FlaskConical, ShieldCheck } from "lucide-react";
import { Container } from "@/components/ui/Container";

const steps = [
  {
    icon: Droplet,
    title: "Handgekozen ingrediënten",
    description:
      "Elke batch begint met ruwe shea- en kokosolie die we zelf beoordelen op geur, kleur en zuiverheid voordat er iets wordt gemengd.",
  },
  {
    icon: FlaskConical,
    title: "Kleine batches, koud verwerkt",
    description:
      "We werken in kleine oplages en verwerken op lage temperatuur, zodat de actieve voedingsstoffen intact blijven.",
  },
  {
    icon: ShieldCheck,
    title: "Kwaliteitscontrole per batch",
    description:
      "Voor elk potje de deur uitgaat, testen we textuur, geur en stabiliteit — pas dan krijgt het onze naam.",
  },
];

export function AboutCraft() {
  return (
    <section className="bg-cream-deep/70 py-20 md:py-28">
      <Container>
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
          className="mx-auto max-w-xl text-center"
        >
          <p className="text-xs font-medium uppercase tracking-[0.3em] text-earth">
            Het ambacht
          </p>
          <h2 className="mt-3 text-3xl md:text-4xl text-charcoal">
            Ambachtelijk gemaakt, van begin tot pot
          </h2>
          <p className="mt-4 text-charcoal-soft leading-relaxed">
            Geen fabriekslijnen, geen haast. Elk potje FOLÉA doorloopt
            hetzelfde zorgvuldige proces.
          </p>
        </motion.div>

        <div className="mt-16 grid gap-10 sm:grid-cols-3">
          {steps.map((step, index) => (
            <motion.div
              key={step.title}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-80px" }}
              transition={{
                duration: 0.6,
                delay: index * 0.1,
                ease: [0.22, 1, 0.36, 1],
              }}
              className="text-center"
            >
              <div className="mx-auto flex h-12 w-12 items-center justify-center rounded-full border border-forest/25">
                <step.icon size={20} strokeWidth={1.5} className="text-forest" />
              </div>
              <h3 className="mt-5 text-lg font-medium text-charcoal">
                {step.title}
              </h3>
              <p className="mt-2 text-sm text-charcoal-soft leading-relaxed">
                {step.description}
              </p>
            </motion.div>
          ))}
        </div>
      </Container>
    </section>
  );
}
