"use client";

import Image from "next/image";
import { VelocityTrack } from "@/components/ui/VelocityTrack";
import { Marquee } from "@/components/business/Marquee";

// Puur sfeerbeeld, en elke foto verschijnt twee keer in de lus: daarom
// decoratief (alt="") in plaats van dubbele beschrijvingen voorlezen.
const shots = [
  "/images/model-duo-back.jpg",
  "/images/model-back-curls.jpg",
  "/images/model-duo-jar.jpg",
  "/images/model-short-curls.jpg",
  "/images/model-stack.jpg",
  "/images/model-back-tattoo.jpg",
];

export function PhotoMarquee() {
  return (
    <section className="overflow-hidden bg-ink pt-16 md:pt-24">
      <div className="relative">
        <VelocityTrack baseVelocity={-3} trackClassName="gap-3 sm:gap-4">
          {shots.map((src) => (
            <div
              key={src}
              className="relative aspect-[2/3] w-[190px] shrink-0 overflow-hidden rounded-xl bg-white/5 sm:w-[240px] md:w-[280px]"
            >
              <Image
                src={src}
                alt=""
                fill
                sizes="(min-width: 768px) 280px, 190px"
                // Niet lazy: de strip beweegt met een transform, waardoor de
                // browser kaarten die buiten beeld starten nooit als zichtbaar
                // ziet en die foto's leeg zouden blijven.
                loading="eager"
                className="object-cover"
              />
            </div>
          ))}
        </VelocityTrack>

        {/* Wordmark tegen de fotostrip in, zodat de twee richtingen elkaar
            kruisen. mix-blend-difference houdt hem leesbaar op zwart én op de
            lichte foto's. */}
        <div className="pointer-events-none absolute inset-x-0 top-1/2 -translate-y-1/2">
          <Marquee
            items={["FOLÉA.", "FOLÉA.", "FOLÉA."]}
            baseVelocity={4}
            textClassName="text-5xl sm:text-7xl md:text-8xl"
            className="text-white mix-blend-difference"
          />
        </div>
      </div>
    </section>
  );
}
