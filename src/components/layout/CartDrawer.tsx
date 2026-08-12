"use client";

import Image from "next/image";
import { AnimatePresence, motion } from "framer-motion";
import { Minus, Plus, ShoppingBag, X } from "lucide-react";
import { useCart } from "@/hooks/useCart";
import { Button } from "@/components/ui/Button";
import { formatPrice } from "@/lib/utils/format";

const FREE_SHIPPING_THRESHOLD = 45;

export function CartDrawer() {
  const {
    items,
    isOpen,
    closeCart,
    subtotal,
    updateQuantity,
    removeItem,
  } = useCart();

  const remaining = Math.max(FREE_SHIPPING_THRESHOLD - subtotal, 0);
  const progress = Math.min((subtotal / FREE_SHIPPING_THRESHOLD) * 100, 100);

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
            className="fixed inset-0 z-[60] bg-charcoal/40 backdrop-blur-[2px]"
            onClick={closeCart}
          />
          <motion.aside
            initial={{ x: "100%" }}
            animate={{ x: 0 }}
            exit={{ x: "100%" }}
            transition={{ duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
            className="fixed right-0 top-0 z-[70] flex h-full w-full max-w-md flex-col bg-cream shadow-2xl"
            role="dialog"
            aria-label="Winkelmand"
          >
            <div className="flex items-center justify-between border-b border-charcoal/10 px-6 py-5">
              <h2 className="font-serif text-2xl text-forest">Winkelmand</h2>
              <button
                onClick={closeCart}
                aria-label="Winkelmand sluiten"
                className="rounded-full p-2 hover:bg-blush transition-colors"
              >
                <X size={20} />
              </button>
            </div>

            <div className="border-b border-charcoal/10 px-6 py-4">
              <p className="mb-2 text-xs font-medium text-charcoal-soft">
                {remaining > 0 ? (
                  <>
                    Nog{" "}
                    <span className="text-forest font-semibold">
                      {formatPrice(remaining)}
                    </span>{" "}
                    tot gratis verzending
                  </>
                ) : (
                  <span className="text-forest font-semibold">
                    Je hebt gratis verzending! 🎉
                  </span>
                )}
              </p>
              <div className="h-1.5 w-full overflow-hidden rounded-full bg-blush">
                <motion.div
                  className="h-full rounded-full bg-forest"
                  initial={{ width: 0 }}
                  animate={{ width: `${progress}%` }}
                  transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
                />
              </div>
            </div>

            <div className="flex-1 overflow-y-auto px-6 py-4">
              {items.length === 0 ? (
                <div className="flex h-full flex-col items-center justify-center gap-3 text-center text-charcoal-soft">
                  <ShoppingBag size={32} strokeWidth={1.25} />
                  <p>Je winkelmand is nog leeg.</p>
                </div>
              ) : (
                <ul className="space-y-6">
                  {items.map((item) => (
                    <li key={item.product.id} className="flex gap-4">
                      <div className="relative h-20 w-20 shrink-0 overflow-hidden rounded-md bg-blush">
                        <Image
                          src={item.product.images[0].src}
                          alt={item.product.images[0].alt}
                          fill
                          sizes="80px"
                          className="object-cover"
                        />
                      </div>
                      <div className="flex flex-1 flex-col justify-between">
                        <div className="flex items-start justify-between gap-2">
                          <p className="font-medium leading-tight">
                            {item.product.name}
                          </p>
                          <button
                            onClick={() => removeItem(item.product.id)}
                            aria-label={`${item.product.name} verwijderen`}
                            className="text-charcoal-soft hover:text-earth"
                          >
                            <X size={16} />
                          </button>
                        </div>
                        <div className="flex items-center justify-between">
                          <div className="flex items-center rounded-full border border-charcoal/15">
                            <button
                              className="p-1.5"
                              aria-label="Aantal verlagen"
                              onClick={() =>
                                updateQuantity(
                                  item.product.id,
                                  item.quantity - 1,
                                )
                              }
                            >
                              <Minus size={14} />
                            </button>
                            <span className="w-6 text-center text-sm">
                              {item.quantity}
                            </span>
                            <button
                              className="p-1.5"
                              aria-label="Aantal verhogen"
                              onClick={() =>
                                updateQuantity(
                                  item.product.id,
                                  item.quantity + 1,
                                )
                              }
                            >
                              <Plus size={14} />
                            </button>
                          </div>
                          <p className="text-sm font-medium text-forest">
                            {formatPrice(item.product.price * item.quantity)}
                          </p>
                        </div>
                      </div>
                    </li>
                  ))}
                </ul>
              )}
            </div>

            {items.length > 0 && (
              <div className="border-t border-charcoal/10 px-6 py-6 space-y-4">
                <div className="flex items-center justify-between text-base">
                  <span className="text-charcoal-soft">Subtotaal</span>
                  <span className="font-semibold text-forest">
                    {formatPrice(subtotal)}
                  </span>
                </div>
                <Button variant="primary" size="lg" className="w-full">
                  Naar afrekenen
                </Button>
              </div>
            )}
          </motion.aside>
        </>
      )}
    </AnimatePresence>
  );
}
