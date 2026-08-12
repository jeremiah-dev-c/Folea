"use client";

import { useState, type FormEvent } from "react";
import { motion } from "framer-motion";
import { CheckCircle2 } from "lucide-react";
import { Button } from "@/components/ui/Button";

export function ContactForm() {
  const [submitted, setSubmitted] = useState(false);

  function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setSubmitted(true);
  }

  if (submitted) {
    return (
      <motion.div
        initial={{ opacity: 0, y: 12 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
        className="flex flex-col items-center justify-center gap-3 rounded-lg bg-blush/50 px-8 py-16 text-center"
      >
        <CheckCircle2 size={32} strokeWidth={1.5} className="text-forest" />
        <p className="font-serif text-2xl text-forest">Bericht verzonden</p>
        <p className="max-w-sm text-charcoal-soft">
          Bedankt voor je bericht — we reageren binnen 1-2 werkdagen.
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
            className="mb-1.5 block text-sm font-medium text-charcoal"
          >
            Naam
          </label>
          <input
            id="name"
            name="name"
            type="text"
            required
            className="w-full rounded-md border border-charcoal/15 bg-cream px-4 py-2.5 text-sm focus:border-forest focus:outline-none"
            placeholder="Jouw naam"
          />
        </div>
        <div>
          <label
            htmlFor="email"
            className="mb-1.5 block text-sm font-medium text-charcoal"
          >
            E-mailadres
          </label>
          <input
            id="email"
            name="email"
            type="email"
            required
            className="w-full rounded-md border border-charcoal/15 bg-cream px-4 py-2.5 text-sm focus:border-forest focus:outline-none"
            placeholder="jouw@email.com"
          />
        </div>
      </div>

      <div>
        <label
          htmlFor="subject"
          className="mb-1.5 block text-sm font-medium text-charcoal"
        >
          Onderwerp
        </label>
        <input
          id="subject"
          name="subject"
          type="text"
          required
          className="w-full rounded-md border border-charcoal/15 bg-cream px-4 py-2.5 text-sm focus:border-forest focus:outline-none"
          placeholder="Waar gaat je bericht over?"
        />
      </div>

      <div>
        <label
          htmlFor="message"
          className="mb-1.5 block text-sm font-medium text-charcoal"
        >
          Bericht
        </label>
        <textarea
          id="message"
          name="message"
          required
          rows={5}
          className="w-full resize-none rounded-md border border-charcoal/15 bg-cream px-4 py-2.5 text-sm focus:border-forest focus:outline-none"
          placeholder="Vertel ons hoe we kunnen helpen..."
        />
      </div>

      <Button type="submit" variant="primary" size="lg" className="w-full sm:w-auto">
        Verstuur bericht
      </Button>
    </form>
  );
}
