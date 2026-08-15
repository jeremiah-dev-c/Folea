"use client";

import Image from "next/image";
import { motion } from "framer-motion";
import { Container } from "@/components/ui/Container";
import { FillOnScroll } from "@/components/ui/FillOnScroll";

const EASE = [0.22, 1, 0.36, 1] as const;

// Teksten letterlijk aangeleverd door de klant (14 aug).
const steps = [
  {
    title: "Handgekozen ingrediënten",
    description:
      "Elke batch begint met ruwe shea butter, die we zelf beoordelen op geur, kleur en zuiverheid voordat er iets wordt gemengd.",
  },
  {
    title: "Kleine batches, koud verwerkt",
    description:
      "We werken in kleine oplages en verwerken op lage temperatuur, zodat de actieve voedingsstoffen intact blijven.",
  },
  {
    title: "Kwaliteitscontrole per batch",
    description:
      "Voor elk potje dat de deur uitgaat, testen we de textuur, geur en stabiliteit. Pas dan krijgt het onze naam.",
  },
];

export function AboutCraft() {
  return (
    <section className="bg-ink py-16 text-white md:py-24">
      <Container>
        <div className="max-w-2xl">
          <p className="text-[11px] font-medium uppercase tracking-[0.3em] text-blush">
            Het proces
          </p>
          <FillOnScroll
            text="Met de hand gemaakt, van begin tot eind"
            className="mt-4 text-[clamp(1.15rem,4vw,2.75rem)]"
          />
          <p className="mt-6 max-w-md leading-relaxed text-white/60">
            Geen fabriekslijnen. Elk potje FOLÉA doorloopt hetzelfde
            zorgvuldige proces.
          </p>
        </div>

        {/* Het beeld blijft staan terwijl de stappen ernaast langs scrollen.
            Op mobiel valt het weg: sticky naast een enkele kolom heeft daar
            geen zin. */}
        {/* items-start: anders rekt de stappenkolom mee met de sticky kolom en
            blijft er onderaan een lege balk over. */}
        <div className="mt-14 grid items-start gap-12 md:mt-20 md:grid-cols-2 md:gap-16">
          <div className="hidden md:block">
            <div className="sticky top-28">
              <div className="relative aspect-[4/5] overflow-hidden rounded-2xl bg-white/5">
                <Image
                  src="/images/product-drip.jpg"
                  alt="Gouden olie die over twee potten FOLÉA loopt"
                  fill
                  sizes="(min-width: 768px) 46vw, 100vw"
                  className="object-cover"
                />
              </div>
            </div>
          </div>

          {/* Scheidingslijnen via divide in plaats van een achtergrondvlak
              onder de items: zolang een stap nog aan het infaden is, zou dat
              vlak als een lege grijze balk doorschijnen. */}
          <ol className="divide-y divide-white/12 overflow-hidden rounded-2xl border border-white/12">
            {steps.map((step, i) => (
              <motion.li
                key={step.title}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-80px" }}
                transition={{ duration: 0.7, delay: i * 0.08, ease: EASE }}
                className="group relative overflow-hidden bg-ink p-8 transition-colors duration-500 hover:bg-white/[0.04] md:p-10"
              >
                {/* Blijft binnen de kaart: half afgesneden zag het eruit als
                    een fout in plaats van als decoratie. */}
                <span
                  className="pointer-events-none absolute right-6 top-5 font-display text-[4.5rem] leading-none text-transparent transition-transform duration-700 ease-[var(--ease-elegant)] group-hover:-translate-y-1 md:right-8 md:text-[5.5rem]"
                  style={{ WebkitTextStroke: "1.5px rgba(255,255,255,0.14)" }}
                  aria-hidden="true"
                >
                  {String(i + 1).padStart(2, "0")}
                </span>

                <span className="relative text-[11px] font-semibold tracking-[0.2em] text-blush">
                  {String(i + 1).padStart(2, "0")}
                </span>
                <h3 className="relative mt-3 max-w-[14ch] font-display text-lg uppercase leading-snug tracking-[0.02em] sm:text-xl">
                  {step.title}
                </h3>
                <p className="relative mt-3 max-w-sm leading-relaxed text-white/60">
                  {step.description}
                </p>
              </motion.li>
            ))}
          </ol>
        </div>
      </Container>
    </section>
  );
}
