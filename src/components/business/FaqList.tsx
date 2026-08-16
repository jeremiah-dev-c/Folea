"use client";

import { Fragment, useState } from "react";
import { motion } from "framer-motion";
import { Plus } from "lucide-react";
import { cn } from "@/lib/utils/cn";
import type { FaqBlok, FaqItem } from "@/lib/data/faq";

const EASE = [0.22, 1, 0.36, 1] as const;

/** Maakt e-mailadressen klikbaar en zet de merknaam in het displayfont. */
function metMailLinks(tekst: string) {
  const delen = tekst.split(/([\w.+-]+@[\w-]+\.[\w.]+)/g);
  return delen.map((deel, i) =>
    /^[\w.+-]+@[\w-]+\.[\w.]+$/.test(deel) ? (
      <a
        key={i}
        href={`mailto:${deel}`}
        className="font-medium text-ink underline underline-offset-4 transition-colors hover:text-charcoal-soft"
      >
        {deel}
      </a>
    ) : (
      <Fragment key={i}>{deel}</Fragment>
    ),
  );
}

function Antwoord({ blokken }: { blokken: FaqBlok[] }) {
  return (
    <div className="space-y-4 pb-8 pr-4 sm:pr-16">
      {blokken.map((blok, i) =>
        typeof blok === "string" ? (
          <p key={i} className="leading-relaxed text-charcoal-soft">
            {metMailLinks(blok)}
          </p>
        ) : (
          <p
            key={i}
            className="pt-2 font-display text-sm uppercase tracking-[0.02em] text-ink"
          >
            {blok.heading}
          </p>
        ),
      )}
    </div>
  );
}

export function FaqList({ items }: { items: FaqItem[] }) {
  const [openId, setOpenId] = useState<string | null>(items[0]?.id ?? null);

  return (
    <dl className="border-t border-ink/12">
      {items.map((item, index) => {
        const isOpen = openId === item.id;
        return (
          <div
            key={item.id}
            className="group border-b border-ink/12 transition-colors duration-300 hover:bg-ink/[0.02]"
          >
            <dt>
              <button
                type="button"
                onClick={() => setOpenId(isOpen ? null : item.id)}
                aria-expanded={isOpen}
                aria-controls={`faq-antwoord-${item.id}`}
                className="flex w-full items-start gap-5 py-7 text-left sm:gap-8"
              >
                <span
                  className={cn(
                    "shrink-0 pt-1 text-xs font-semibold tabular-nums tracking-[0.2em] transition-colors duration-300",
                    isOpen ? "text-ink" : "text-ink/35",
                  )}
                >
                  {String(index + 1).padStart(2, "0")}
                </span>

                <span
                  className={cn(
                    "flex-1 font-display text-base uppercase leading-snug tracking-[0.02em] transition-colors duration-300 sm:text-lg",
                    isOpen ? "text-ink" : "text-ink/80 group-hover:text-ink",
                  )}
                >
                  {item.question}
                </span>

                <span
                  className={cn(
                    "mt-0.5 flex h-8 w-8 shrink-0 items-center justify-center rounded-full border transition-all duration-500 ease-[var(--ease-elegant)]",
                    isOpen
                      ? "rotate-45 border-ink bg-ink text-white"
                      : "border-ink/20 text-ink group-hover:border-ink",
                  )}
                  aria-hidden="true"
                >
                  <Plus size={15} strokeWidth={1.75} />
                </span>
              </button>
            </dt>

            {/* Blijft altijd in de DOM staan, alleen de hoogte animeert. Zo
                kunnen zoekmachines de antwoorden lezen ook als ze dicht zijn. */}
            <motion.dd
              id={`faq-antwoord-${item.id}`}
              initial={false}
              animate={{ height: isOpen ? "auto" : 0, opacity: isOpen ? 1 : 0 }}
              transition={{ duration: 0.4, ease: EASE }}
              className="overflow-hidden"
              aria-hidden={!isOpen}
            >
              <div className="pl-[calc(0.75rem+1.25rem)] sm:pl-[calc(1.5rem+1.25rem)]">
                <Antwoord blokken={item.answer} />
              </div>
            </motion.dd>
          </div>
        );
      })}
    </dl>
  );
}
