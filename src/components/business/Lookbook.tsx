"use client";

import Image from "next/image";
import { Container } from "@/components/ui/Container";
import { FillOnScroll } from "@/components/ui/FillOnScroll";
import { VelocityTrack } from "@/components/ui/VelocityTrack";

// Bewust bijna geen tekst: de klant vroeg om een sectie die op beeld drijft.
// Deze vier komen nergens anders op de pagina terug.
const frames = [
  {
    number: "01",
    label: "Textuur",
    src: "/images/model-curls-clip.jpg",
    alt: "Model met volle blonde krullen en een haarklem",
  },
  {
    number: "02",
    label: "Ritueel",
    src: "/images/model-duo-applying.jpg",
    alt: "Model brengt FOLÉA aan in het haar van een ander model",
  },
  {
    number: "03",
    label: "Samen",
    src: "/images/model-duo-seated.jpg",
    alt: "Twee modellen naast elkaar gezeten",
  },
  {
    number: "04",
    label: "Detail",
    src: "/images/model-shoulder.jpg",
    alt: "Model van opzij met een pot FOLÉA bij de schouder",
  },
];

export function Lookbook() {
  return (
    <section className="overflow-hidden bg-blush py-16 md:py-24">
      <Container>
        <p className="text-[11px] font-medium uppercase tracking-[0.3em] text-ink/60">
          In beeld
        </p>
        <FillOnScroll
          text="Eén pot, elke textuur"
          className="mt-4 text-2xl text-ink sm:text-4xl lg:text-5xl"
        />
      </Container>

      {/* Loopt vanzelf door in plaats van een swipebare rij: het scroll-snap
          gedrag voelde schokkerig en vroeg om handmatig slepen. */}
      <VelocityTrack
        baseVelocity={2}
        className="mt-10 md:mt-14"
        trackClassName="gap-4 md:gap-6"
      >
        {frames.map((frame) => (
          <figure
            key={frame.number}
            className="group w-[70vw] shrink-0 sm:w-[46vw] md:w-[30vw] lg:w-[24vw]"
          >
            <div className="relative aspect-[4/5] overflow-hidden rounded-2xl bg-ink/5">
              <Image
                src={frame.src}
                alt={frame.alt}
                fill
                sizes="(min-width: 1024px) 24vw, (min-width: 768px) 30vw, 70vw"
                // Niet lazy: de rij beweegt met een transform, dus kaarten die
                // buiten beeld starten worden nooit als zichtbaar gezien.
                loading="eager"
                className="object-cover"
              />
              <span
                className="pointer-events-none absolute -bottom-3 right-3 font-display text-7xl leading-none text-transparent sm:text-8xl"
                style={{ WebkitTextStroke: "2px rgba(255,255,255,0.85)" }}
                aria-hidden="true"
              >
                {frame.number}
              </span>
            </div>
            <figcaption className="mt-4 flex items-baseline gap-3">
              <span className="text-xs font-semibold tracking-[0.2em] text-ink/50">
                {frame.number}
              </span>
              <span className="font-display text-lg uppercase tracking-[0.02em] text-ink sm:text-xl">
                {frame.label}
              </span>
            </figcaption>
          </figure>
        ))}
      </VelocityTrack>
    </section>
  );
}
