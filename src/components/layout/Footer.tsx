"use client";

import Link from "next/link";
import { useState, type FormEvent } from "react";
import { ArrowRight, Mail, MapPin } from "lucide-react";
import { Container } from "@/components/ui/Container";
import { Button } from "@/components/ui/Button";
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
    title: "Shop",
    links: [
      { label: "Hairbutter", href: "/producten/hairbutter" },
      { label: "Alle producten", href: "/producten" },
    ],
  },
  {
    title: "FOLÉA",
    links: [
      { label: "Over Ons", href: "/over-ons" },
      { label: "Portfolio", href: "/portfolio" },
      { label: "Blog", href: "/blog" },
    ],
  },
  {
    title: "Klantenservice",
    links: [
      { label: "Contact & FAQ", href: "/contact" },
      { label: "Verzending & Retour", href: "/contact" },
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
    <footer className="mt-24 border-t border-earth/15 bg-cream-deep/60 text-charcoal">
      <Container className="py-16 md:py-20">
        <div className="grid gap-14 lg:grid-cols-[1.3fr_1fr_1fr_1fr_1.2fr]">
          <div className="space-y-5">
            <p className="font-serif text-3xl text-forest">FOLÉA</p>
            <p className="max-w-xs text-sm leading-relaxed text-charcoal-soft">
              Haarverzorging geïnspireerd door natuur, gemaakt met intentie
              voor elk haartype.
            </p>
            <div className="flex gap-2.5 pt-1">
              {socialLinks.map(({ label, href, icon: Icon }) => (
                <a
                  key={label}
                  href={href}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label={label}
                  className="rounded-full border border-charcoal/15 p-2.5 text-forest transition-all duration-300 hover:border-forest hover:bg-forest hover:text-white"
                >
                  <Icon width={15} height={15} />
                </a>
              ))}
            </div>
          </div>

          {footerNav.map((group) => (
            <div key={group.title} className="space-y-4">
              <p className="text-xs font-semibold uppercase tracking-[0.15em] text-earth">
                {group.title}
              </p>
              <ul className="space-y-3">
                {group.links.map((link) => (
                  <li key={link.label}>
                    <Link
                      href={link.href}
                      className="text-sm text-charcoal-soft transition-colors hover:text-forest"
                    >
                      {link.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}

          <div className="space-y-4">
            <p className="text-xs font-semibold uppercase tracking-[0.15em] text-earth">
              Klantcontact
            </p>
            <ul className="space-y-3 text-sm text-charcoal-soft">
              <li className="flex items-center gap-2.5">
                <Mail size={15} className="shrink-0 text-forest" />
                <a href="mailto:hello@folea.nl" className="hover:text-forest">
                  hello@folea.nl
                </a>
              </li>
              <li className="flex items-center gap-2.5">
                <MapPin size={15} className="shrink-0 text-forest" />
                Amsterdam, Nederland
              </li>
            </ul>
          </div>
        </div>

        <div className="mt-14 rounded-lg bg-blush/50 p-6 sm:p-8">
          <div className="flex flex-col gap-5 sm:flex-row sm:items-center sm:justify-between">
            <div>
              <p className="font-serif text-xl text-forest">
                Blijf op de hoogte
              </p>
              <p className="mt-1 text-sm text-charcoal-soft">
                Exclusieve aanbiedingen en haarverzorgingstips, rechtstreeks
                in je inbox.
              </p>
            </div>
            {submitted ? (
              <p className="text-sm font-medium text-forest">
                Bedankt voor je inschrijving!
              </p>
            ) : (
              <form
                onSubmit={handleSubmit}
                className="flex w-full max-w-sm gap-2"
              >
                <input
                  type="email"
                  required
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="jouw@email.com"
                  className="w-full rounded-full border border-charcoal/15 bg-cream px-4 py-2.5 text-sm text-charcoal placeholder:text-charcoal-soft/60 focus:border-forest focus:outline-none"
                />
                <Button
                  type="submit"
                  variant="primary"
                  size="md"
                  className="shrink-0"
                  aria-label="Inschrijven"
                >
                  <ArrowRight size={16} />
                </Button>
              </form>
            )}
          </div>
        </div>

        <div className="mt-10 flex flex-col-reverse gap-4 border-t border-charcoal/10 pt-8 text-xs text-charcoal-soft sm:flex-row sm:items-center sm:justify-between">
          <p>
            © {new Date().getFullYear()} FOLÉA. Alle rechten voorbehouden. ·
            KvK 00000000 · BTW NL000000000B00
          </p>
          <div className="flex items-center gap-2">
            <span className="mr-1 text-[11px] text-charcoal-soft/70">
              Veilig betalen met
            </span>
            <IdealWeroBadge />
            <ApplePayBadge />
            <span className="rounded-md border border-charcoal/15 bg-cream px-2.5 py-1 text-[11px] font-medium tracking-wide text-charcoal-soft">
              Creditcard
            </span>
          </div>
        </div>
      </Container>
    </footer>
  );
}
