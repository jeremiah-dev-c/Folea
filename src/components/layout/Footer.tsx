"use client";

import Link from "next/link";
import { useState, useSyncExternalStore, type FormEvent } from "react";
import { Container } from "@/components/ui/Container";
import { InstagramIcon, TikTokIcon } from "@/components/ui/SocialIcons";

// Snapchat is er op verzoek van de klant uit.
const socialLinks = [
  {
    label: "Instagram",
    href: "https://instagram.com/foleahair",
    icon: InstagramIcon,
  },
  { label: "TikTok", href: "https://tiktok.com/@folea", icon: TikTokIcon },
];

const footerNav = [
  {
    title: "Winkel",
    links: [
      { label: "Nourishing hairbutter", href: "/producten/hairbutter" },
      { label: "Alle producten", href: "/producten" },
    ],
  },
  {
    title: "FOLÉA",
    links: [
      { label: "Ons verhaal", href: "/over-ons" },
      { label: "Contact", href: "/contact" },
    ],
  },
  {
    title: "Hulp",
    links: [
      { label: "Veelgestelde vragen", href: "/faq" },
      { label: "Verzending & retour", href: "/faq" },
    ],
  },
];

/**
 * De pagina's zijn statisch, dus het jaar in de HTML is het jaar waarin
 * gebouwd is. Dit is de waarde die zoekmachines en bezoekers zonder JS zien.
 * Werk hem bij zodra je toch in dit bestand zit; de site zelf corrigeert
 * zichzelf hieronder.
 */
const BOUWJAAR = 2026;

/** Het jaar wisselt niet tijdens een bezoek, dus er valt niets te abonneren. */
const geenAbonnement = () => () => {};
const jaarNu = () => new Date().getFullYear();
const jaarBijBouw = () => BOUWJAAR;

export function Footer() {
  const [email, setEmail] = useState("");
  const [submitted, setSubmitted] = useState(false);

  // Hydrateert op het bouwjaar en schakelt daarna door naar het echte jaar, zodat
  // de copyright ook klopt als de site een jaarwisseling lang niet opnieuw
  // gebouwd wordt. Rechtstreeks new Date() in de render zou de server-HTML en de
  // eerste client-render laten verschillen, en dat is een hydration mismatch.
  const jaar = useSyncExternalStore(geenAbonnement, jaarNu, jaarBijBouw);

  function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    if (!email) return;
    setSubmitted(true);
    setEmail("");
  }

  return (
    <footer className="bg-ink text-white">
      <Container className="py-10 md:py-20">
        {/* Nieuwsbrief zit in de footer in plaats van als losse sectie in de
            body, zodat de pagina op beeld eindigt en niet op een formulier. */}
        <div className="max-w-2xl">
          <p className="text-[11px] font-medium uppercase tracking-[0.3em] text-white/40">
            Brief
          </p>
          <h2 className="mt-3 font-display text-lg uppercase leading-[1.2] tracking-[0.02em] sm:text-2xl lg:text-4xl">
            Blijf verbonden met FOLÉA
          </h2>
          <p className="mt-3 max-w-md text-sm leading-relaxed text-white/60">
            Ontdek als eerste nieuwe producten, inspiratie en meer.
          </p>

          {submitted ? (
            <p className="mt-7 text-sm font-medium text-blush">
              Bedankt, je staat op de lijst.
            </p>
          ) : (
            <form
              onSubmit={handleSubmit}
              className="mt-6 flex flex-col items-start gap-4 sm:flex-row sm:items-end"
            >
              <div className="w-full sm:flex-1">
                <label htmlFor="footer-email" className="sr-only">
                  E-mailadres
                </label>
                <input
                  id="footer-email"
                  type="email"
                  required
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="jouw@mail.nl"
                  className="w-full border-0 border-b border-white/25 bg-transparent pb-2.5 text-base text-white placeholder:text-white/35 focus:border-blush focus:outline-none"
                />
              </div>
              <button
                type="submit"
                className="shrink-0 rounded-full bg-blush px-7 py-3 text-xs font-semibold uppercase tracking-[0.2em] text-ink transition-transform duration-300 ease-[var(--ease-elegant)] hover:scale-105 hover:bg-blush-deep"
              >
                Inschrijven
              </button>
            </form>
          )}
        </div>

        {/* Twee kolommen op mobiel houden dit blok kort; de klant vroeg om een
            compactere footer op telefoon. */}
        <div className="mt-11 grid grid-cols-2 gap-x-6 gap-y-7 md:mt-20 md:grid-cols-4">
          {footerNav.map((group) => (
            <div key={group.title}>
              <p className="text-[11px] font-medium uppercase tracking-[0.2em] text-white/40">
                {group.title}
              </p>
              <ul className="mt-4 space-y-2.5">
                {group.links.map((link) => (
                  <li key={link.label}>
                    <Link
                      href={link.href}
                      className="text-sm text-white/80 transition-colors hover:text-white"
                    >
                      {link.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}

          <div>
            <p className="text-[11px] font-medium uppercase tracking-[0.2em] text-white/40">
              Volg ons
            </p>
            <div className="mt-4 flex gap-2.5">
              {socialLinks.map(({ label, href, icon: Icon }) => (
                <a
                  key={label}
                  href={href}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label={label}
                  className="rounded-full border border-white/20 p-2.5 text-white transition-colors duration-300 hover:border-white hover:bg-white hover:text-ink"
                >
                  <Icon width={15} height={15} />
                </a>
              ))}
            </div>
            <a
              href="mailto:info@folea.nl"
              className="mt-5 inline-block text-sm text-white/80 transition-colors hover:text-white"
            >
              info@folea.nl
            </a>
          </div>
        </div>

        {/* De betaalbadges stonden hier rechts en zijn eruit op verzoek; de
            credit staat nu op die plek in plaats van onder de copyright. */}
        <div className="mt-10 flex flex-col-reverse gap-4 border-t border-white/12 pt-6 text-xs text-white/45 sm:flex-row sm:items-center sm:justify-between">
          <p>© {jaar} FOLÉA. KvK 42022057 · BTW NL005441000B68</p>
          <p>
            Webdesign by{" "}
            <a
              href="https://snelonlinemarketing.nl"
              target="_blank"
              rel="noopener noreferrer"
              className="underline underline-offset-2 transition-colors hover:text-white"
            >
              SOM
            </a>
          </p>
        </div>
      </Container>
    </footer>
  );
}
