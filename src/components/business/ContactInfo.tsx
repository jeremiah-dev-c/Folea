"use client";

import { motion } from "framer-motion";
import { Clock, Mail, MapPin } from "lucide-react";

const items = [
  {
    icon: Mail,
    title: "E-mail",
    detail: "hello@folea.nl",
  },
  {
    icon: Clock,
    title: "Klantenservice",
    detail: "Maandag t/m vrijdag, 9:00 - 17:00",
  },
  {
    icon: MapPin,
    title: "Studio",
    detail: "Amsterdam, Nederland",
  },
];

export function ContactInfo() {
  return (
    <motion.div
      initial={{ opacity: 0, y: 16 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-80px" }}
      transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
      className="rounded-lg bg-blush/50 p-8"
    >
      <p className="text-xs font-medium uppercase tracking-[0.3em] text-earth">
        Rechtstreeks contact
      </p>
      <h2 className="mt-3 text-2xl text-berry">We helpen je graag</h2>
      <p className="mt-3 text-sm text-charcoal-soft leading-relaxed">
        Vragen over je bestelling, huidtype of het gebruik van de
        Hairbutter? Ons team staat voor je klaar.
      </p>

      <ul className="mt-8 space-y-6">
        {items.map((item) => (
          <li key={item.title} className="flex items-start gap-3">
            <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full border border-berry/25">
              <item.icon size={16} strokeWidth={1.5} className="text-berry" />
            </div>
            <div>
              <p className="text-sm font-medium text-charcoal">{item.title}</p>
              <p className="text-sm text-charcoal-soft">{item.detail}</p>
            </div>
          </li>
        ))}
      </ul>
    </motion.div>
  );
}
