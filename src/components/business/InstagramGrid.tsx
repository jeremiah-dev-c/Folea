"use client";

import Image from "next/image";
import { motion } from "framer-motion";
import { Container } from "@/components/ui/Container";
import {
  InstagramIcon,
  InstagramIconColor,
} from "@/components/ui/SocialIcons";

const EASE = [0.22, 1, 0.36, 1] as const;

const INSTAGRAM_URL = "https://instagram.com";

// De eerste tile is bewust groot: een gelijkmatig raster van zes vierkantjes
// oogde als een opvulsectie in plaats van als een uitnodiging.
const tiles = [
  {
    src: "/images/model-duo-playful.jpg",
    alt: "Twee modellen met potten FOLÉA in een speelse pose",
    groot: true,
  },
  {
    src: "/images/model-duo-laugh.jpg",
    alt: "Twee lachende modellen met een pot FOLÉA",
  },
  {
    src: "/images/model-lounge.jpg",
    alt: "Model liggend met potten FOLÉA en een tas",
  },
  {
    src: "/images/model-kneeling.jpg",
    alt: "Model knielend op de studiovloer met een pot FOLÉA",
  },
  {
    src: "/images/model-duo-hair.jpg",
    alt: "Twee modellen van achteren met de handen in elkaars haar",
  },
];

export function InstagramGrid() {
  return (
    <section className="bg-cream py-16 md:py-24">
      <Container>
        <div className="flex flex-col gap-6 sm:flex-row sm:items-end sm:justify-between">
          <div>
            <p className="text-[11px] font-medium uppercase tracking-[0.3em] text-ink/50">
              @folea
            </p>
            <h2 className="mt-4 font-display text-2xl uppercase leading-[1.15] tracking-[0.02em] text-ink sm:text-3xl lg:text-4xl">
              Zie het in het wild
            </h2>
          </div>

          <a
            href={INSTAGRAM_URL}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex shrink-0 items-center gap-2.5 self-start rounded-full bg-ink px-7 py-3.5 text-xs font-semibold uppercase tracking-[0.2em] text-white transition-transform duration-300 ease-[var(--ease-elegant)] hover:scale-105 hover:bg-ink-light sm:self-auto"
          >
            <InstagramIconColor width={17} height={17} />
            Volg ons
          </a>
        </div>

        <div className="mt-10 grid grid-cols-2 gap-2.5 md:mt-14 md:grid-cols-4 md:gap-3">
          {tiles.map((tile, i) => (
            <motion.a
              key={tile.src}
              href={INSTAGRAM_URL}
              target="_blank"
              rel="noopener noreferrer"
              initial={{ opacity: 0, y: 18 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-60px" }}
              transition={{ duration: 0.6, delay: i * 0.06, ease: EASE }}
              aria-label={`Bekijk op Instagram: ${tile.alt}`}
              className={`group relative aspect-square overflow-hidden rounded-lg bg-cream-deep/50 ${
                tile.groot ? "col-span-2 row-span-2" : ""
              }`}
            >
              <Image
                src={tile.src}
                alt={tile.alt}
                fill
                sizes={
                  tile.groot
                    ? "(min-width: 768px) 50vw, 100vw"
                    : "(min-width: 768px) 25vw, 50vw"
                }
                className="object-cover transition-transform duration-[900ms] ease-[var(--ease-elegant)] group-hover:scale-[1.07]"
              />
              <div className="absolute inset-0 flex items-center justify-center bg-ink/0 transition-colors duration-500 group-hover:bg-ink/35">
                <InstagramIcon
                  width={tile.groot ? 30 : 22}
                  height={tile.groot ? 30 : 22}
                  className="translate-y-2 text-white opacity-0 transition-all duration-500 ease-[var(--ease-elegant)] group-hover:translate-y-0 group-hover:opacity-100"
                />
              </div>
            </motion.a>
          ))}
        </div>
      </Container>
    </section>
  );
}
