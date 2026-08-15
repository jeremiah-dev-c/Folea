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
              aria-label="FOLÉA Nourishing hairbutter met gouden olie overgoten"
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
            <p className="text-[11px] font-medium uppercase tracking-[0.3em] text-ink/50">
              Het begin
            </p>
            <h2 className="mt-4 font-display text-2xl uppercase leading-[1.15] tracking-[0.02em] text-ink sm:text-3xl">
              Een potje dat ontbrak op de plank
            </h2>
            {/* Tekst letterlijk aangeleverd door de klant (14 aug). */}
            <div className="mt-6 space-y-4 leading-relaxed text-charcoal-soft">
              <p>
                Wij zijn twee zussen met een passie voor beauty en meerdere
                jaren ervaring in de beautywereld. Tijdens ons werk merkten we
                dat we haarproducten misten die het haar op een natuurlijke
                manier verzorgen en tegelijkertijd een mooi resultaat geven.
              </p>
              <p>
                Daarom zijn we ons gaan verdiepen in ingrediënten en
                haarverzorging. We ontdekten hoeveel verschil de samenstelling
                van een product kan maken en besloten onze eigen haarproducten
                te ontwikkelen.
              </p>
              <p>
                Uit deze zoektocht ontstond FOLÉA: een haarverzorgingsmerk met
                100% natuurlijke producten, ontwikkeld vanuit onze eigen
                ervaring en de behoefte aan haarverzorging die natuurlijk,
                eenvoudig en effectief is.
              </p>
            </div>
          </motion.div>
        </div>
      </Container>
    </section>
  );
}
