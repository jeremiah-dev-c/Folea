"use client";

import Image from "next/image";
import Link from "next/link";
import { motion } from "framer-motion";
import { Check, Leaf } from "lucide-react";
import { hairbutter } from "@/lib/data/products";
import { Container } from "@/components/ui/Container";
import { Button } from "@/components/ui/Button";
import { formatPrice } from "@/lib/utils/format";
import { useCart } from "@/hooks/useCart";

const EASE = [0.22, 1, 0.36, 1] as const;

export function ProductSpotlight() {
  const { addItem } = useCart();

  return (
    <section id="product-spotlight" className="py-24 md:py-32">
      <Container>
        <div className="grid items-center gap-12 md:grid-cols-2 md:gap-16 lg:gap-20">
          <motion.div
            initial={{ opacity: 0, scale: 0.96 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.8, ease: EASE }}
            className="relative"
          >
            <div className="relative aspect-square overflow-hidden rounded-lg bg-blush">
              <Image
                src={hairbutter.images[0].src}
                alt={hairbutter.images[0].alt}
                fill
                sizes="(min-width: 768px) 50vw, 100vw"
                className="object-cover"
                priority
              />
            </div>
            <div className="absolute -bottom-5 left-6 flex items-center gap-2 rounded-full bg-cream px-4 py-2.5 shadow-lg shadow-earth/10">
              <Leaf size={14} className="text-berry" />
              <span className="text-xs font-semibold tracking-wide text-charcoal">
                100% natuurlijke ingrediënten
              </span>
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.8, ease: EASE }}
            className="space-y-6"
          >
            <div>
              <p className="text-xs font-medium uppercase tracking-[0.3em] text-earth">
                Onze hairbutter
              </p>
              <h2 className="mt-3 text-4xl md:text-5xl text-berry">
                {hairbutter.name}
              </h2>
            </div>

            <p className="text-charcoal-soft leading-relaxed">
              {hairbutter.description}
            </p>

            <ul className="space-y-3">
              {hairbutter.highlights.map((highlight) => (
                <li
                  key={highlight}
                  className="flex items-center gap-3 text-sm font-medium text-charcoal"
                >
                  <span className="flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-blush/70">
                    <Check size={13} strokeWidth={2.5} className="text-berry" />
                  </span>
                  {highlight}
                </li>
              ))}
            </ul>

            <div className="flex items-center gap-5 border-t border-charcoal/10 pt-6">
              <span className="text-3xl font-medium text-berry">
                {formatPrice(hairbutter.price)}
              </span>
              <Button
                variant="primary"
                size="lg"
                onClick={() => addItem(hairbutter)}
              >
                In winkelmand
              </Button>
            </div>

            <Link
              href={`/producten/${hairbutter.slug}`}
              className="inline-block text-sm font-medium text-berry underline underline-offset-4 hover:text-berry-light"
            >
              Bekijk volledige productinformatie
            </Link>
          </motion.div>
        </div>
      </Container>
    </section>
  );
}
