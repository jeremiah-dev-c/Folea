"use client";

import { motion } from "framer-motion";
import { Container } from "@/components/ui/Container";
import { RotatingBadge } from "@/components/ui/RotatingBadge";
import { BrandText } from "@/components/ui/BrandText";

const EASE = [0.22, 1, 0.36, 1] as const;

export function AboutStory() {
  return (
    <section className="bg-blush py-16 md:py-24">
      <Container>
        <div className="grid items-center gap-12 md:grid-cols-2 md:gap-16 lg:gap-20">
          <motion.div
            initial={{ opacity: 0, scale: 0.97 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.8, ease: EASE }}
            className="relative md:order-2"
          >
            <div className="relative aspect-[4/5] overflow-hidden rounded-2xl bg-ink/5">
              <video
                className="h-full w-full object-cover"
                autoPlay
                muted
                loop
                playsInline
                poster="/video/product-pour-poster.jpg"
                aria-label="Twee potten FOLÉA Nourishing hairbutter met honing die langs de deksel loopt"
              >
                <source src="/video/product-pour.mp4" type="video/mp4" />
              </video>
            </div>

            <RotatingBadge
              text="100% natuurlijk · met de hand gemaakt · "
              className="absolute -bottom-6 -left-4 h-24 w-24 text-ink sm:-left-6 sm:h-28 sm:w-28"
            />
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.8, delay: 0.1, ease: EASE }}
            className="md:order-1"
          >
            <h2 className="text-[11px] font-medium uppercase tracking-[0.3em] text-ink/60">
              Het begin
            </h2>

            {/* Tekst letterlijk aangeleverd door de klant (14 aug). De eerste
                alinea is groter gezet, zodat het blok een aanhef heeft nu de
                kop eruit is. */}
            <div className="mt-6 space-y-4 leading-relaxed text-ink/75 [&>p:first-child]:text-lg [&>p:first-child]:leading-relaxed [&>p:first-child]:text-ink">
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
                <BrandText>
                  Uit deze zoektocht ontstond FOLÉA: een haarverzorgingsmerk
                  met 100% natuurlijke producten, ontwikkeld vanuit onze eigen
                  ervaring en de behoefte aan haarverzorging die natuurlijk,
                  eenvoudig en effectief is.
                </BrandText>
              </p>
            </div>
          </motion.div>
        </div>
      </Container>
    </section>
  );
}
