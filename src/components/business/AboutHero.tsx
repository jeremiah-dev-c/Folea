"use client";

import Image from "next/image";
import { useRef } from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import { Container } from "@/components/ui/Container";

const EASE = [0.22, 1, 0.36, 1] as const;

export function AboutHero() {
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "end start"],
  });
  const y = useTransform(scrollYProgress, [0, 1], ["-8%", "8%"]);

  return (
    <section className="bg-cream pt-14 md:pt-20">
      <Container>
        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.6, ease: EASE }}
          className="text-[11px] font-medium uppercase tracking-[0.3em] text-ink/50"
        >
          Ons verhaal
        </motion.p>

        {/* De merkregel staat in het Engels omdat hij zo op de pot staat. */}
        <motion.h1
          initial={{ opacity: 0, y: 18 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.05, ease: EASE }}
          className="mt-5 max-w-4xl font-display text-[clamp(1.6rem,6vw,4rem)] uppercase leading-[1.05] tracking-[0.02em] text-ink"
        >
          Inspired by nature,
          <br />
          created with intention
        </motion.h1>
      </Container>

      <div ref={ref} className="mt-12 overflow-hidden md:mt-16">
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 1, delay: 0.15, ease: EASE }}
          className="relative h-[52vh] min-h-[320px] w-full md:h-[68vh]"
        >
          <motion.div style={{ y }} className="absolute inset-x-0 -top-[8%] h-[116%]">
            <Image
              src="/images/model-duo-seated.jpg"
              alt="De twee zussen achter FOLÉA"
              fill
              sizes="100vw"
              className="object-cover object-[50%_28%]"
              priority
            />
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
}
