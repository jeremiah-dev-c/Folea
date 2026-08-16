"use client";

import { motion } from "framer-motion";
import { Container } from "@/components/ui/Container";
import { RotatingBadge } from "@/components/ui/RotatingBadge";

const EASE = [0.22, 1, 0.36, 1] as const;

/**
 * Opening van Over Ons. De pagina begon eerst met een beige blok waar de
 * merkregel in stond; dat blok is er op 15 aug uit en de titel staat sindsdien
 * hier. Hij draagt de h1 van de pagina.
 *
 * Titel, kopje en tekst staan bewust in dezelfde kolom als de video ernaast.
 * Toen de titel nog als losse regel over de volle breedte stond, viel er onder
 * die titel een groot gat naast de video en las de sectie als drie losse
 * stukken. Zo zijn het twee kolommen die boven- en onderaan ongeveer gelijk
 * uitkomen: links komt op 554px, de video op ongeveer 550px.
 */
export function AboutStory() {
  return (
    <section className="bg-blush pb-16 pt-14 md:pb-24 md:pt-20">
      <Container>
        {/* items-start, anders duwt de langere mediakolom de tekst omlaag en
            beginnen de twee kolommen niet op dezelfde hoogte. */}
        <div className="grid items-start gap-12 md:grid-cols-2 md:gap-16 lg:gap-20">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.8, ease: EASE }}
          >
            <p className="text-[11px] font-medium uppercase tracking-[0.3em] text-ink/60">
              Ons verhaal
            </p>

            {/* Engels, want zo staat de regel op de pot. Bewust klein gehouden
                op verzoek: hij zit nu dicht bij de aanhefalinea eronder in
                plaats van als display-kop boven de sectie te hangen. De
                ondergrens staat op 1.15rem, want daaronder werd de kop kleiner
                dan de alinea van 18px eronder. De 2vw is afgestemd op de
                kolombreedte: bij 2.1vw werd "created with intention" rond 1280px
                twee pixels breder dan de kolom en brak de titel in drie regels. */}
            <h1 className="mt-4 text-balance font-display text-[clamp(1.15rem,2vw,1.75rem)] uppercase leading-[1.25] tracking-[0.03em] text-ink">
              <span className="inline lg:block">Inspired by nature,</span>{" "}
              <span className="inline lg:block">created with intention</span>
            </h1>

            <h2 className="mt-10 text-[11px] font-medium uppercase tracking-[0.3em] text-ink/60 md:mt-12">
              Het begin
            </h2>

            {/* Tekst letterlijk aangeleverd door de klant (14 aug). Alle drie
                de alinea's staan bewust in hetzelfde lettertype en dezelfde
                maat: de eerste stond eerder groter als aanhef en de klant wilde
                dat gelijkgetrokken hebben. */}
            <div className="mt-6 space-y-4 leading-relaxed text-ink/75">
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

          {/* Begrensd op desktop, anders groeit een 4:5 video in een halve
              kolom door naar 680px. Bij 27.5rem komt de video op ongeveer 550px
              uit, vrijwel gelijk aan de 554px van de tekstkolom ernaast. */}
          <motion.div
            initial={{ opacity: 0, scale: 0.97 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.8, delay: 0.1, ease: EASE }}
            className="relative md:mx-auto md:w-full md:max-w-[27.5rem]"
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
        </div>
      </Container>
    </section>
  );
}
