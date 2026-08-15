"use client";

import { useState, type FormEvent } from "react";
import { motion } from "framer-motion";
import { ArrowRight } from "lucide-react";
import { Container } from "@/components/ui/Container";
import { RotatingBadge } from "@/components/ui/RotatingBadge";

const EASE = [0.22, 1, 0.36, 1] as const;

const ONDERWERPEN = [
  "Mijn bestelling",
  "Gebruik van de hairbutter",
  "Retour of ruilen",
  "Samenwerking",
  "Iets anders",
];

/** Onderstreept veld dat in de zin meeloopt in plaats van in een eigen kader. */
const veldStijl =
  "max-w-full border-b-2 border-ink/30 bg-transparent pb-1 text-ink transition-colors duration-300 placeholder:text-ink/35 focus:border-ink focus:outline-none";

export function ContactForm() {
  const [naam, setNaam] = useState("");
  const [onderwerp, setOnderwerp] = useState("");
  const [bericht, setBericht] = useState("");
  const [email, setEmail] = useState("");
  const [verzonden, setVerzonden] = useState(false);

  const ingevuld = [naam, onderwerp, bericht, email].filter(
    (v) => v.trim() !== "",
  ).length;

  // Nog geen backend: dit toont alleen een bevestiging. Voordat de site live
  // gaat moet hier een mailservice achter, anders denken klanten dat ze
  // contact hebben opgenomen terwijl het bericht nergens aankomt.
  function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setVerzonden(true);
  }

  return (
    <section className="overflow-hidden bg-blush py-16 md:py-24">
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

        {verzonden ? (
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, ease: EASE }}
            className="relative mt-12 max-w-3xl md:mt-16"
          >
            <p className="font-display text-[clamp(1.6rem,5vw,3.4rem)] uppercase leading-[1.05] tracking-[0.02em] text-ink">
              Bericht
              <br />
              verzonden
            </p>
            <p className="mt-6 max-w-md text-lg leading-relaxed text-ink/70">
              Bedankt {naam.trim() || "voor je bericht"}. We reageren binnen één
              tot twee werkdagen op {email.trim() || "je e-mailadres"}.
            </p>
            <RotatingBadge
              text="bericht ontvangen · dank je wel · "
              className="mt-10 h-24 w-24 text-ink sm:h-28 sm:w-28"
            />
          </motion.div>
        ) : (
          <motion.form
            onSubmit={handleSubmit}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-80px" }}
            transition={{ duration: 0.8, ease: EASE }}
            className="mt-12 max-w-4xl md:mt-16"
          >
            {/* Het formulier leest als een brief: de velden lopen mee in de zin
                in plaats van als losse hokjes onder elkaar te staan. */}
            {/* Geen BrandText hier: die schaalt de merknaam naar 0.86em voor
                lopende tekst, en deze regel staat al volledig in Horizon. */}
            <p className="font-display text-xl uppercase tracking-[0.02em] text-ink sm:text-2xl">
              Hoi FOLÉA,
            </p>

            <p className="mt-7 text-lg leading-[2.1] text-ink/80 sm:text-2xl sm:leading-[2]">
              ik ben{" "}
              <label htmlFor="contact-naam" className="sr-only">
                Jouw naam
              </label>
              <input
                id="contact-naam"
                name="naam"
                type="text"
                required
                value={naam}
                onChange={(e) => setNaam(e.target.value)}
                placeholder="jouw naam"
                // size laat het veld meegroeien met wat er getypt wordt, zonder
                // dat er iets gemeten hoeft te worden.
                size={Math.min(Math.max(naam.length + 1, 11), 26)}
                className={veldStijl}
              />{" "}
              en ik heb een vraag over
            </p>

            <fieldset className="mt-7">
              <legend className="sr-only">Onderwerp</legend>
              <div className="flex flex-wrap gap-2.5">
                {ONDERWERPEN.map((optie) => (
                  <label key={optie} className="cursor-pointer">
                    <input
                      type="radio"
                      name="onderwerp"
                      value={optie}
                      required
                      checked={onderwerp === optie}
                      onChange={() => setOnderwerp(optie)}
                      className="peer sr-only"
                    />
                    <span className="block rounded-full border border-ink/30 px-5 py-2.5 text-sm text-ink transition-all duration-300 ease-[var(--ease-elegant)] hover:border-ink peer-checked:border-ink peer-checked:bg-ink peer-checked:text-white peer-focus-visible:ring-2 peer-focus-visible:ring-ink peer-focus-visible:ring-offset-2 peer-focus-visible:ring-offset-blush">
                      {optie}
                    </span>
                  </label>
                ))}
              </div>
            </fieldset>

            <div className="mt-10">
              <label
                htmlFor="contact-bericht"
                className="text-[11px] font-medium uppercase tracking-[0.2em] text-ink/60"
              >
                Dit wil ik kwijt
              </label>
              <textarea
                id="contact-bericht"
                name="bericht"
                required
                rows={3}
                value={bericht}
                onChange={(e) => setBericht(e.target.value)}
                placeholder="Vertel ons hoe we kunnen helpen"
                className={`${veldStijl} mt-3 block w-full resize-none text-lg leading-relaxed`}
              />
            </div>

            <p className="mt-10 text-lg leading-[2.1] text-ink/80 sm:text-2xl sm:leading-[2]">
              Je kunt me bereiken op{" "}
              <label htmlFor="contact-email" className="sr-only">
                Jouw e-mailadres
              </label>
              <input
                id="contact-email"
                name="email"
                type="email"
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="jouw@email.nl"
                size={Math.min(Math.max(email.length + 1, 14), 30)}
                className={veldStijl}
              />
            </p>

            <div className="mt-12 flex flex-col gap-6 border-t border-ink/20 pt-7 sm:flex-row sm:items-center sm:justify-between">
              {/* Voortgang in plaats van een knop die pas aan het eind reageert:
                  je ziet meteen hoeveel er nog mist. */}
              <div className="flex items-center gap-4">
                <div
                  className="h-px w-28 overflow-hidden bg-ink/20"
                  aria-hidden="true"
                >
                  <motion.span
                    className="block h-full bg-ink"
                    initial={false}
                    animate={{ width: `${(ingevuld / 4) * 100}%` }}
                    transition={{ duration: 0.5, ease: EASE }}
                  />
                </div>
                <p className="text-xs uppercase tracking-[0.2em] text-ink/60">
                  {ingevuld} van 4 ingevuld
                </p>
              </div>

              <button
                type="submit"
                className="group inline-flex items-center gap-3 self-start rounded-full bg-ink px-8 py-3.5 text-xs font-semibold uppercase tracking-[0.2em] text-white transition-transform duration-300 ease-[var(--ease-elegant)] hover:scale-105 sm:self-auto"
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
      </Container>
    </section>
  );
}
