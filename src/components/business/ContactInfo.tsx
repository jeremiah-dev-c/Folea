"use client";

import { motion } from "framer-motion";
import { Clock, Mail } from "lucide-react";

const EASE = [0.22, 1, 0.36, 1] as const;

// FOLÉA verkoopt alleen online, dus geen bezoekadres. Gegevens aangeleverd
// door de klant (14 aug); er komt nog een definitief zakelijk e-mailadres.
const items = [
  {
    icon: Mail,
    title: "E-mail",
    detail: "info@folea.nl",
    href: "mailto:info@folea.nl",
  },
  {
    icon: Clock,
    title: "Bereikbaar",
    detail: "Maandag t/m zondag, 10:00 tot 20:00",
  },
];

export function ContactInfo() {
  return (
    <motion.div
      initial={{ opacity: 0, y: 16 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-80px" }}
      transition={{ duration: 0.7, ease: EASE }}
      className="border-t border-ink/12 pt-8"
    >
      <p className="text-[11px] font-medium uppercase tracking-[0.3em] text-ink/50">
        Rechtstreeks
      </p>

      <ul className="mt-6 space-y-5">
        {items.map((item) => (
          <li key={item.title} className="flex items-start gap-3.5">
            <item.icon
              size={17}
              strokeWidth={1.5}
              className="mt-0.5 shrink-0 text-ink"
            />
            <div>
              <p className="font-display text-sm uppercase tracking-[0.02em] text-ink">
                {item.title}
              </p>
              {item.href ? (
                <a
                  href={item.href}
                  className="text-sm text-charcoal-soft underline underline-offset-4 transition-colors hover:text-ink"
                >
                  {item.detail}
                </a>
              ) : (
                <p className="text-sm text-charcoal-soft">{item.detail}</p>
              )}
            </div>
          </li>
        ))}
      </ul>
    </motion.div>
  );
}
