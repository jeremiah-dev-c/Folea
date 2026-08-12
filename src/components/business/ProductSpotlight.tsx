"use client";

import Image from "next/image";
import Link from "next/link";
import { motion } from "framer-motion";
import { hairbutter } from "@/lib/data/products";
import { Container } from "@/components/ui/Container";
import { Button } from "@/components/ui/Button";
import { formatPrice } from "@/lib/utils/format";
import { useCart } from "@/hooks/useCart";

export function ProductSpotlight() {
  const { addItem } = useCart();

  return (
    <section id="product-spotlight" className="py-24 md:py-32">
      <Container>
        <div className="grid items-center gap-12 md:grid-cols-2 md:gap-16">
          <motion.div
            initial={{ opacity: 0, scale: 0.96 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
            className="relative aspect-square overflow-hidden rounded-lg bg-blush"
          >
            <Image
              src={hairbutter.images[0].src}
              alt={hairbutter.images[0].alt}
              fill
              sizes="(min-width: 768px) 50vw, 100vw"
              className="object-cover"
              priority
            />
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
            className="space-y-6"
          >
            <p className="text-xs font-medium uppercase tracking-[0.3em] text-earth">
              Het vlaggenschip
            </p>
            <h2 className="text-4xl md:text-5xl text-forest">
              {hairbutter.name}
            </h2>

            <p className="text-charcoal-soft leading-relaxed">
              {hairbutter.description}
            </p>

            <ul className="grid grid-cols-2 gap-3">
              {hairbutter.highlights.map((highlight) => (
                <li
                  key={highlight}
                  className="rounded-md bg-cream-deep px-4 py-3 text-sm font-medium text-charcoal"
                >
                  {highlight}
                </li>
              ))}
            </ul>

            <div className="flex items-center gap-4 pt-2">
              <span className="text-3xl font-medium text-forest">
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
              className="inline-block text-sm font-medium text-forest underline underline-offset-4 hover:text-forest-light"
            >
              Bekijk volledige productinformatie
            </Link>
          </motion.div>
        </div>
      </Container>
    </section>
  );
}
