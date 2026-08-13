"use client";

import { motion } from "framer-motion";
import { Container } from "@/components/ui/Container";

export function AboutStory() {
  return (
    <section className="bg-blush/50 py-20 md:py-28">
      <Container>
        <div className="grid items-center gap-12 md:grid-cols-2 md:gap-20">
          <motion.div
            initial={{ opacity: 0, scale: 0.96 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
            className="relative aspect-[4/5] overflow-hidden rounded-lg bg-cream-deep md:order-2"
          >
            <video
              className="h-full w-full object-cover"
              autoPlay
              muted
              loop
              playsInline
              poster="/video/product-pour-poster.jpg"
              aria-label="FOLÉA Hairbutter met gouden olie overgoten"
            >
              <source src="/video/product-pour.mp4" type="video/mp4" />
            </video>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.8, delay: 0.1, ease: [0.22, 1, 0.36, 1] }}
            className="md:order-1"
          >
            <p className="text-xs font-medium uppercase tracking-[0.3em] text-earth">
              Het begin
            </p>
            <h2 className="mt-3 text-3xl md:text-4xl text-charcoal">
              Een potje dat ontbrak op de plank
            </h2>
            <div className="mt-6 space-y-4 text-charcoal-soft leading-relaxed">
              <p>
                Het begon met frustratie: schappen vol producten die
                beloofden voor &ldquo;alle haartypes&rdquo; te werken, maar in
                de praktijk voor niemand écht goed genoeg waren. Te zwaar
                voor steil haar, te licht voor kroeshaar, vol vulstoffen
                die op de lange termijn meer kapot maakten dan ze
                herstelden.
              </p>
              <p>
                Dus gingen we zelf aan de slag. Met natuurlijke boters en
                oliën, in onze eigen keuken, tot we een formule hadden die
                zich aanpast aan het haar dat het draagt, in plaats van
                andersom.
              </p>
            </div>
            <blockquote className="mt-8 border-l-2 border-berry pl-5 font-serif text-2xl italic text-berry">
              &ldquo;Haarverzorging die luistert naar je haar, niet naar een
              label.&rdquo;
            </blockquote>
          </motion.div>
        </div>
      </Container>
    </section>
  );
}
