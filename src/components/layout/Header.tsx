"use client";

import Link from "next/link";
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
  { label: "Portfolio", href: "/portfolio" },
  { label: "Blog", href: "/blog" },
  { label: "Contact", href: "/contact" },
];

export function Header() {
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const [searchOpen, setSearchOpen] = useState(false);
  const { itemCount, openCart } = useCart();

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 40);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <header
      className={cn(
        "fixed inset-x-0 top-0 z-50 bg-cream/95 backdrop-blur-md transition-shadow duration-500 ease-[var(--ease-elegant)]",
        scrolled
          ? "shadow-[0_1px_0_0_rgba(28,28,28,0.08)]"
          : "shadow-[0_1px_0_0_rgba(28,28,28,0.03)]",
      )}
    >
      <div className="mx-auto flex h-20 w-full max-w-[var(--container-page)] items-center justify-between px-6 md:px-10 lg:px-16">
        <button
          className="-ml-2 p-2 text-charcoal transition-colors md:hidden"
          aria-label="Menu openen"
          onClick={() => setMobileOpen((v) => !v)}
        >
          {mobileOpen ? <X size={22} /> : <Menu size={22} />}
        </button>

        <Link
          href="/"
          className="font-serif text-2xl tracking-wide text-berry transition-colors"
        >
          FOLÉA
        </Link>

        <nav className="hidden md:flex items-center gap-8">
          {navItems.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              className="text-sm font-medium tracking-wide text-charcoal transition-colors hover:text-berry"
            >
              {item.label}
            </Link>
          ))}
        </nav>

        <div className="flex items-center gap-1">
          <button
            className="rounded-full p-2 text-charcoal transition-colors hover:bg-blush"
            aria-label="Zoeken"
            onClick={() => setSearchOpen((v) => !v)}
          >
            <Search size={20} />
          </button>
          <button
            className="relative rounded-full p-2 text-charcoal transition-colors hover:bg-blush"
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
                  className="absolute -right-0.5 -top-0.5 flex h-4 w-4 items-center justify-center rounded-full bg-berry text-[10px] font-semibold text-white"
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
            className="md:hidden overflow-hidden bg-cream border-t border-charcoal/10"
          >
            <div className="flex flex-col px-6 py-4">
              {navItems.map((item) => (
                <Link
                  key={item.href}
                  href={item.href}
                  onClick={() => setMobileOpen(false)}
                  className="py-3 text-base font-medium border-b border-charcoal/5 last:border-none"
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
