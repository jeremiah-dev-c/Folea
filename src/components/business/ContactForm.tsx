"use client";

import { useState, type FormEvent } from "react";
import { motion } from "framer-motion";
import { CheckCircle2 } from "lucide-react";

const EASE = [0.22, 1, 0.36, 1] as const;

const veldStijl =
  "w-full rounded-lg border border-ink/15 bg-white/50 px-4 py-3 text-sm text-charcoal placeholder:text-charcoal-soft/55 transition-colors focus:border-ink focus:outline-none";

export function ContactForm() {
  const [submitted, setSubmitted] = useState(false);

  // Nog geen backend: dit toont alleen een bevestiging. Voordat de site live
  // gaat moet hier een mailservice achter, anders denken klanten dat ze
  // contact hebben opgenomen terwijl het bericht nergens aankomt.
  function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setSubmitted(true);
  }

  if (submitted) {
    return (
      <motion.div
        initial={{ opacity: 0, y: 12 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, ease: EASE }}
        className="flex flex-col items-start gap-3 rounded-2xl bg-blush px-8 py-14"
      >
        <CheckCircle2 size={28} strokeWidth={1.5} className="text-ink" />
        <p className="font-display text-xl uppercase tracking-[0.02em] text-ink">
          Bericht verzonden
        </p>
        <p className="max-w-sm text-sm leading-relaxed text-ink/70">
          Bedankt voor je bericht. We reageren binnen één tot twee werkdagen.
        </p>
      </motion.div>
    );
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-5">
      <div className="grid gap-5 sm:grid-cols-2">
        <div>
          <label
            htmlFor="name"
            className="mb-2 block text-[11px] font-medium uppercase tracking-[0.2em] text-ink/60"
          >
            Naam
          </label>
          <input
            id="name"
            name="name"
            type="text"
            required
            className={veldStijl}
            placeholder="Jouw naam"
          />
        </div>
        <div>
          <label
            htmlFor="email"
            className="mb-2 block text-[11px] font-medium uppercase tracking-[0.2em] text-ink/60"
          >
            E-mailadres
          </label>
          <input
            id="email"
            name="email"
            type="email"
            required
            className={veldStijl}
            placeholder="jouw@email.com"
          />
        </div>
      </div>

      <div>
        <label
          htmlFor="subject"
          className="mb-2 block text-[11px] font-medium uppercase tracking-[0.2em] text-ink/60"
        >
          Onderwerp
        </label>
        <input
          id="subject"
          name="subject"
          type="text"
          required
          className={veldStijl}
          placeholder="Waar gaat je bericht over?"
        />
      </div>

      <div>
        <label
          htmlFor="message"
          className="mb-2 block text-[11px] font-medium uppercase tracking-[0.2em] text-ink/60"
        >
          Bericht
        </label>
        <textarea
          id="message"
          name="message"
          required
          rows={6}
          className={`${veldStijl} resize-none`}
          placeholder="Vertel ons hoe we kunnen helpen"
        />
      </div>

      <button
        type="submit"
        className="rounded-full bg-ink px-8 py-3.5 text-xs font-semibold uppercase tracking-[0.2em] text-white transition-transform duration-300 ease-[var(--ease-elegant)] hover:scale-105 hover:bg-ink-light"
      >
        Verstuur bericht
      </button>
    </form>
  );
}
