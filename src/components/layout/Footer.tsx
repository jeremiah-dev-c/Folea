"use client";

import Link from "next/link";
import { useState, type FormEvent } from "react";
import { Container } from "@/components/ui/Container";
import {
  InstagramIcon,
  SnapchatIcon,
  TikTokIcon,
} from "@/components/ui/SocialIcons";
import { ApplePayBadge, IdealWeroBadge } from "@/components/ui/PaymentBadges";

const socialLinks = [
  { label: "Instagram", href: "https://instagram.com", icon: InstagramIcon },
  { label: "TikTok", href: "https://tiktok.com", icon: TikTokIcon },
  { label: "Snapchat", href: "https://snapchat.com", icon: SnapchatIcon },
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

export function Footer() {
  const [email, setEmail] = useState("");
  const [submitted, setSubmitted] = useState(false);

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
          {/* Geen uitspraak over korting: het merk kan later prima acties
              willen draaien, en dan staat die belofte in de weg. */}
          <h2 className="mt-3 font-display text-lg uppercase leading-[1.2] tracking-[0.02em] sm:text-2xl lg:text-4xl">
            Eén mail per maand, meer niet.
          </h2>
          <p className="mt-3 max-w-md text-sm leading-relaxed text-white/60">
            Wat we maken, wat erin gaat, en wanneer er een nieuwe batch
            klaarstaat.
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
                  placeholder="je@mail.nl"
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
              href="mailto:hello@folea.nl"
              className="mt-5 inline-block text-sm text-white/80 transition-colors hover:text-white"
            >
              hello@folea.nl
            </a>
          </div>
        </div>

        <div className="mt-10 flex flex-col-reverse gap-4 border-t border-white/12 pt-6 text-xs text-white/45 sm:flex-row sm:items-center sm:justify-between">
          <p>
            © {new Date().getFullYear()} FOLÉA. KvK 00000000 · BTW
            NL000000000B00
          </p>
          <div className="flex items-center gap-2">
            <IdealWeroBadge />
            <ApplePayBadge tone="light" />
          </div>
        </div>
      </Container>
    </footer>
  );
}
