"use client";

import { useState, type FormEvent } from "react";
import { motion } from "framer-motion";
import { Container } from "@/components/ui/Container";
import { Button } from "@/components/ui/Button";

export function Newsletter() {
  const [email, setEmail] = useState("");
  const [submitted, setSubmitted] = useState(false);

  function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    if (!email) return;
    setSubmitted(true);
    setEmail("");
  }

  return (
    <section className="py-24 md:py-32">
      <Container>
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
          className="mx-auto max-w-xl rounded-lg border border-earth/15 bg-blush/60 px-8 py-16 text-center sm:px-16"
        >
          <p className="text-xs font-medium uppercase tracking-[0.3em] text-earth">
            De FOLÉA-familie
          </p>
          <h2 className="mt-3 text-4xl text-forest md:text-5xl">
            Blijf op de hoogte
          </h2>
          <p className="mx-auto mt-4 max-w-sm text-charcoal-soft">
            Exclusieve aanbiedingen, nieuwe producten en haarverzorgingstips,
            rechtstreeks in je inbox.
          </p>

          {submitted ? (
            <p className="mt-8 font-medium text-forest">
              Welkom bij FOLÉA. Check je inbox!
            </p>
          ) : (
            <form
              onSubmit={handleSubmit}
              className="mx-auto mt-8 flex max-w-sm flex-col gap-3 sm:flex-row"
            >
              <input
                type="email"
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="jouw@email.com"
                className="w-full rounded-full border border-charcoal/15 bg-cream px-5 py-3 text-sm text-charcoal placeholder:text-charcoal-soft/60 focus:border-forest focus:outline-none"
              />
              <Button type="submit" variant="primary" size="md">
                Inschrijven
              </Button>
            </form>
          )}
        </motion.div>
      </Container>
    </section>
  );
}
