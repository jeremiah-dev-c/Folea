"use client";

import Link from "next/link";
import { motion } from "framer-motion";

export function ContactHero() {
  return (
    <motion.div
      initial={{ opacity: 0, y: 16 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
      className="mx-auto max-w-xl text-center"
    >
      <p className="text-xs font-medium uppercase tracking-[0.3em] text-earth">
        Contact
      </p>
      <h1 className="mt-4 text-5xl leading-[1.1] text-forest md:text-6xl">
        We horen graag van je
      </h1>
      <p className="mt-6 text-lg text-charcoal-soft leading-relaxed">
        Vragen, feedback of gewoon even kennismaken? Stuur ons een bericht,
        of bekijk eerst de{" "}
        <Link
          href="/faq"
          className="font-medium text-forest underline underline-offset-4 hover:text-forest-light"
        >
          veelgestelde vragen
        </Link>
        .
      </p>
    </motion.div>
  );
}
