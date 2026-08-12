"use client";

import Link from "next/link";
import { useState, type FormEvent } from "react";
import { Send } from "lucide-react";
import { Container } from "@/components/ui/Container";
import { Button } from "@/components/ui/Button";
import {
  InstagramIcon,
  PinterestIcon,
  TikTokIcon,
} from "@/components/ui/SocialIcons";

const paymentMethods = ["iDEAL", "Bancontact", "Creditcard"];

const socialLinks = [
  { label: "Instagram", href: "https://instagram.com", icon: InstagramIcon },
  { label: "TikTok", href: "https://tiktok.com", icon: TikTokIcon },
  { label: "Pinterest", href: "https://pinterest.com", icon: PinterestIcon },
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
      <Container className="py-16">
        <div className="grid gap-12 md:grid-cols-2 lg:grid-cols-4">
          <div className="lg:col-span-1 space-y-4">
            <p className="font-serif text-2xl text-forest">FOLÉA</p>
            <p className="text-sm text-charcoal-soft">
              Inspired by nature, created with intention.
            </p>
            <div className="flex gap-3 pt-2">
              {socialLinks.map(({ label, href, icon: Icon }) => (
                <a
                  key={label}
                  href={href}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label={label}
                  className="rounded-full border border-charcoal/15 p-2 text-forest transition-colors hover:bg-blush"
                >
                  <Icon width={16} height={16} />
                </a>
              ))}
            </div>
          </div>

          {footerNav.map((group) => (
            <div key={group.title} className="space-y-4">
              <p className="text-sm font-semibold uppercase tracking-wider text-earth">
                {group.title}
              </p>
              <ul className="space-y-2.5">
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

          <div className="space-y-4 md:col-span-2 lg:col-span-1">
            <p className="text-sm font-semibold uppercase tracking-wider text-earth">
              Blijf op de hoogte
            </p>
            <p className="text-sm text-charcoal-soft">
              Schrijf je in voor exclusieve aanbiedingen en haarverzorgingstips.
            </p>
            {submitted ? (
              <p className="text-sm font-medium text-forest">
                Bedankt voor je inschrijving!
              </p>
            ) : (
              <form onSubmit={handleSubmit} className="flex gap-2">
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
                  <Send size={16} />
                </Button>
              </form>
            )}
          </div>
        </div>

        <div className="mt-14 flex flex-col gap-4 border-t border-charcoal/10 pt-8 text-xs text-charcoal-soft md:flex-row md:items-center md:justify-between">
          <p>
            © {new Date().getFullYear()} FOLÉA. Alle rechten voorbehouden. KvK
            00000000 · BTW NL000000000B00 · hello@folea.nl
          </p>
          <div className="flex items-center gap-3">
            {paymentMethods.map((method) => (
              <span
                key={method}
                className="rounded border border-charcoal/15 px-2.5 py-1 font-medium tracking-wide text-charcoal-soft"
              >
                {method}
              </span>
            ))}
          </div>
        </div>
      </Container>
    </footer>
  );
}
