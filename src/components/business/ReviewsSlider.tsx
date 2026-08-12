"use client";

import { useCallback, useEffect, useState } from "react";
import useEmblaCarousel from "embla-carousel-react";
import { ChevronLeft, ChevronRight, Star } from "lucide-react";
import { reviews } from "@/lib/data/reviews";
import { Container } from "@/components/ui/Container";
import { cn } from "@/lib/utils/cn";

export function ReviewsSlider() {
  const [emblaRef, emblaApi] = useEmblaCarousel({
    loop: true,
    align: "center",
  });
  const [selectedIndex, setSelectedIndex] = useState(0);

  const scrollPrev = useCallback(() => emblaApi?.scrollPrev(), [emblaApi]);
  const scrollNext = useCallback(() => emblaApi?.scrollNext(), [emblaApi]);

  useEffect(() => {
    if (!emblaApi) return;
    const onSelect = () => setSelectedIndex(emblaApi.selectedScrollSnap());
    emblaApi.on("select", onSelect);
    onSelect();
    return () => {
      emblaApi.off("select", onSelect);
    };
  }, [emblaApi]);

  return (
    <section className="py-24 md:py-32">
      <Container>
        <div className="mx-auto max-w-2xl text-center">
          <p className="text-xs font-medium uppercase tracking-[0.3em] text-earth">
            Social proof
          </p>
          <h2 className="mt-3 text-4xl md:text-5xl text-forest">
            Wat onze klanten zeggen
          </h2>
        </div>

        <div className="relative mt-14">
          <div className="overflow-hidden" ref={emblaRef}>
            <div className="flex">
              {reviews.map((review) => (
                <div
                  key={review.id}
                  className="min-w-0 shrink-0 grow-0 basis-full px-4 md:basis-1/2 lg:basis-1/3"
                >
                  <div className="flex h-full flex-col gap-4 rounded-lg bg-cream-deep p-8">
                    <div className="flex text-earth">
                      {Array.from({ length: 5 }).map((_, i) => (
                        <Star
                          key={i}
                          size={15}
                          fill={i < review.rating ? "currentColor" : "none"}
                        />
                      ))}
                    </div>
                    <p className="flex-1 text-charcoal leading-relaxed">
                      &ldquo;{review.quote}&rdquo;
                    </p>
                    <div className="flex items-center justify-between pt-2 text-sm">
                      <span className="font-medium text-forest">
                        {review.author}
                      </span>
                      <span className="rounded-full bg-blush px-3 py-1 text-xs font-medium text-earth">
                        {review.hairType}
                      </span>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          <div className="mt-8 flex items-center justify-center gap-6">
            <button
              onClick={scrollPrev}
              aria-label="Vorige review"
              className="rounded-full border border-charcoal/15 p-2.5 transition-colors hover:border-forest hover:text-forest"
            >
              <ChevronLeft size={18} />
            </button>
            <div className="flex gap-2">
              {reviews.map((_, i) => (
                <button
                  key={i}
                  aria-label={`Ga naar review ${i + 1}`}
                  onClick={() => emblaApi?.scrollTo(i)}
                  className={cn(
                    "h-1.5 rounded-full transition-all duration-300",
                    i === selectedIndex
                      ? "w-6 bg-forest"
                      : "w-1.5 bg-charcoal/20",
                  )}
                />
              ))}
            </div>
            <button
              onClick={scrollNext}
              aria-label="Volgende review"
              className="rounded-full border border-charcoal/15 p-2.5 transition-colors hover:border-forest hover:text-forest"
            >
              <ChevronRight size={18} />
            </button>
          </div>
        </div>
      </Container>
    </section>
  );
}
