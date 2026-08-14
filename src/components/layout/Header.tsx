"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { Menu, Search, ShoppingBag, X } from "lucide-react";
import { cn } from "@/lib/utils/cn";
import { useCart } from "@/hooks/useCart";
import { SearchOverlay } from "@/components/business/SearchOverlay";

const navItems = [
  { label: "Home", href: "/" },
  { label: "Producten", href: "/producten" },
  { label: "Over Ons", href: "/over-ons" },
  { label: "Contact", href: "/contact" },
];

export function Header() {
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const [searchOpen, setSearchOpen] = useState(false);
  const { itemCount, openCart } = useCart();
  const pathname = usePathname();

  // Alleen op de homepage ligt de header over de hero-video. Daar begint hij
  // transparant met witte tekst en wordt hij crème zodra je scrollt. Elders
  // is hij sticky en altijd leesbaar.
  const overHero = pathname === "/";

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 40);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const transparent = overHero && !scrolled && !mobileOpen;

  return (
    <header
      className={cn(
        "z-50 transition-colors duration-500 ease-[var(--ease-elegant)]",
        overHero ? "fixed inset-x-0 top-0" : "sticky top-0",
        transparent
          ? "bg-transparent text-white"
          : "bg-cream/95 text-charcoal shadow-[0_1px_0_0_rgba(28,28,28,0.08)] backdrop-blur-md",
      )}
    >
      <div className="mx-auto flex h-20 w-full max-w-[var(--container-page)] items-center justify-between px-6 md:px-10 lg:px-16">
        <button
          className="-ml-2 p-2 transition-colors md:hidden"
          aria-label="Menu openen"
          onClick={() => setMobileOpen((v) => !v)}
        >
          {mobileOpen ? <X size={22} /> : <Menu size={22} />}
        </button>

        <Link
          href="/"
          className={cn(
            "font-display text-xl uppercase tracking-[0.06em] transition-colors",
            transparent ? "text-white" : "text-ink",
            // Op de homepage staat de wordmark al groot over de hero-video,
            // dus op telefoon is hij in de balk dubbelop. Elders blijft hij
            // staan, want daar is geen hero.
            overHero && "hidden md:block",
          )}
        >
          FOLÉA.
        </Link>

        <nav className="hidden items-center gap-8 md:flex">
          {navItems.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              className={cn(
                "text-sm font-medium tracking-wide transition-colors",
                transparent
                  ? "text-white/90 hover:text-white"
                  : "text-charcoal hover:text-ink",
              )}
            >
              {item.label}
            </Link>
          ))}
        </nav>

        <div className="flex items-center gap-1">
          <button
            className={cn(
              "rounded-full p-2 transition-colors",
              transparent ? "hover:bg-white/15" : "hover:bg-blush",
            )}
            aria-label="Zoeken"
            onClick={() => setSearchOpen((v) => !v)}
          >
            <Search size={20} />
          </button>
          <button
            className={cn(
              "relative rounded-full p-2 transition-colors",
              transparent ? "hover:bg-white/15" : "hover:bg-blush",
            )}
            aria-label="Winkelmand openen"
            onClick={openCart}
          >
            <ShoppingBag size={20} />
            <AnimatePresence>
              {itemCount > 0 && (
                <motion.span
                  initial={{ scale: 0 }}
                  animate={{ scale: 1 }}
                  exit={{ scale: 0 }}
                  className={cn(
                    "absolute -right-0.5 -top-0.5 flex h-4 w-4 items-center justify-center rounded-full text-[10px] font-semibold",
                    transparent ? "bg-white text-ink" : "bg-ink text-white",
                  )}
                >
                  {itemCount}
                </motion.span>
              )}
            </AnimatePresence>
          </button>
        </div>
      </div>

      <AnimatePresence>
        {mobileOpen && (
          <motion.nav
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.3, ease: [0.22, 1, 0.36, 1] }}
            className="overflow-hidden border-t border-charcoal/10 bg-cream text-charcoal md:hidden"
          >
            <div className="flex flex-col px-6 py-4">
              {navItems.map((item) => (
                <Link
                  key={item.href}
                  href={item.href}
                  onClick={() => setMobileOpen(false)}
                  className="border-b border-charcoal/5 py-3 text-base font-medium last:border-none"
                >
                  {item.label}
                </Link>
              ))}
            </div>
          </motion.nav>
        )}
      </AnimatePresence>

      <SearchOverlay open={searchOpen} onClose={() => setSearchOpen(false)} />
    </header>
  );
}
