"use client";

import Image from "next/image";
import { useState, type FormEvent } from "react";
import { motion } from "framer-motion";
import { ArrowRight } from "lucide-react";
import { Container } from "@/components/ui/Container";

const EASE = [0.22, 1, 0.36, 1] as const;

const ONDERWERPEN = [
  "Mijn bestelling",
  "Gebruik van de hairbutter",
  "Retour of ruilen",
  "Samenwerking",
  "Iets anders",
];

/**
 * Onderstreepte, transparante velden in plaats van omkaderde hokjes: dat sluit
 * aan op het nieuwsbriefveld in de footer en houdt het rustig op het roze.
 *
 * De eerdere invulbrief ("Hoi FOLÉA, ik ben ... en ik heb een vraag over")
 * vond de klant kinderlijk (15 aug). Die aanhef is eruit, net als de chips en
 * de voortgangsteller. Bouw dat niet terug: het onderwerp is nu een gewone
 * keuzelijst en het formulier leest als een formulier.
 */
const labelStijl =
  "block text-[11px] font-medium uppercase tracking-[0.2em] text-ink/60";
const veldStijl =
  "mt-3 w-full border-b border-ink/30 bg-transparent pb-2 text-ink transition-colors duration-300 placeholder:text-ink/40 focus:border-ink focus:outline-none";

export function ContactForm() {
  const [verzonden, setVerzonden] = useState(false);

  // Nog geen backend: dit toont alleen een bevestiging. Voordat de site live
  // gaat moet hier een mailservice achter, anders denken klanten dat ze
  // contact hebben opgenomen terwijl het bericht nergens aankomt.
  function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setVerzonden(true);
  }

  return (
    <section className="overflow-hidden bg-blush pb-14 pt-8 md:pb-20 md:pt-10">
      <Container>
        <div className="flex items-center gap-4 sm:gap-6">
          <p className="shrink-0 text-[11px] font-medium uppercase tracking-[0.3em] text-ink/60">
            Stuur een bericht
          </p>
          <motion.span
            aria-hidden="true"
            initial={{ scaleX: 0 }}
            whileInView={{ scaleX: 1 }}
            viewport={{ once: true, margin: "-80px" }}
            transition={{ duration: 1.1, ease: EASE }}
            className="h-px flex-1 origin-left bg-ink/25"
          />
        </div>

        <div className="mt-10 grid gap-12 md:mt-12 lg:grid-cols-12 lg:gap-16">
          <div className="lg:col-span-7">
            {verzonden ? (
              <motion.div
                initial={{ opacity: 0, y: 16 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, ease: EASE }}
              >
                <p className="font-display text-[clamp(1.4rem,4.5vw,2.4rem)] uppercase leading-[1.08] tracking-[0.02em] text-ink">
                  Bericht verzonden
                </p>
                <p className="mt-5 max-w-md leading-relaxed text-ink/75">
                  Bedankt voor je bericht. We reageren binnen één tot twee
                  werkdagen.
                </p>
              </motion.div>
            ) : (
              <motion.form
                onSubmit={handleSubmit}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-80px" }}
                transition={{ duration: 0.8, ease: EASE }}
                className="space-y-8"
              >
                <div className="grid gap-8 sm:grid-cols-2">
                  <div>
                    <label htmlFor="contact-naam" className={labelStijl}>
                      Naam
                    </label>
                    <input
                      id="contact-naam"
                      name="naam"
                      type="text"
                      required
                      autoComplete="name"
                      className={veldStijl}
                    />
                  </div>

                  <div>
                    <label htmlFor="contact-email" className={labelStijl}>
                      E-mailadres
                    </label>
                    <input
                      id="contact-email"
                      name="email"
                      type="email"
                      required
                      autoComplete="email"
                      className={veldStijl}
                    />
                  </div>
                </div>

                <div>
                  <label htmlFor="contact-onderwerp" className={labelStijl}>
                    Onderwerp
                  </label>
                  {/* appearance-none haalt de systeemstijl weg, zodat het veld
                      dezelfde onderstreepte vorm houdt als de rest. */}
                  <select
                    id="contact-onderwerp"
                    name="onderwerp"
                    required
                    defaultValue=""
                    className={`${veldStijl} appearance-none rounded-none`}
                  >
                    <option value="" disabled>
                      Maak een keuze
                    </option>
                    {ONDERWERPEN.map((optie) => (
                      <option key={optie} value={optie}>
                        {optie}
                      </option>
                    ))}
                  </select>
                </div>

                <div>
                  <label htmlFor="contact-bericht" className={labelStijl}>
                    Bericht
                  </label>
                  <textarea
                    id="contact-bericht"
                    name="bericht"
                    required
                    rows={5}
                    className={`${veldStijl} resize-none leading-relaxed`}
                  />
                </div>

                <div className="pt-2">
                  <button
                    type="submit"
                    className="group inline-flex items-center gap-3 rounded-full bg-ink px-8 py-3.5 text-xs font-semibold uppercase tracking-[0.2em] text-white transition-transform duration-300 ease-[var(--ease-elegant)] hover:scale-105"
                  >
                    Versturen
                    <ArrowRight
                      size={15}
                      strokeWidth={2}
                      className="transition-transform duration-300 ease-[var(--ease-elegant)] group-hover:translate-x-1"
                    />
                  </button>
                </div>
              </motion.form>
            )}
          </div>

          {/* De foto hoort bij het formulier en niet als los blok bovenaan de
              pagina: dit is het product waar de vragen over gaan. */}
          <motion.aside
            initial={{ opacity: 0, scale: 0.97 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true, margin: "-80px" }}
            transition={{ duration: 0.8, ease: EASE }}
            className="lg:col-span-5"
          >
            {/* Begrensd, anders wordt de foto veel groter dan het formulier:
                in een kolom van 520px werd dit 2:3 beeld 780px hoog tegen 444px
                formulier. Bij 21rem komt de foto op 504px uit. Sticky is
                daarmee zinloos geworden en is eruit. */}
            <div className="max-w-sm lg:mx-auto lg:max-w-[21rem]">
              <div className="relative aspect-[2/3] overflow-hidden rounded-2xl bg-ink/5">
                <Image
                  src="/images/product-drip.jpg"
                  alt="Gouden honing die over twee potten FOLÉA Nourishing hairbutter loopt"
                  fill
                  sizes="(min-width: 1024px) 38vw, 90vw"
                  className="object-cover"
                />
              </div>
              <p className="mt-4 text-[11px] font-medium uppercase tracking-[0.2em] text-ink/50">
                Nourishing hairbutter
              </p>
            </div>
          </motion.aside>
        </div>
      </Container>
    </section>
  );
}
