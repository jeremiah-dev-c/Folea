import { useCartStore } from "@/lib/store/cart-store";

export function useCart() {
  const items = useCartStore((state) => state.items);
  const isOpen = useCartStore((state) => state.isOpen);
  const itemCount = useCartStore((state) => state.itemCount());
  const subtotal = useCartStore((state) => state.subtotal());

  const addItem = useCartStore((state) => state.addItem);
  const removeItem = useCartStore((state) => state.removeItem);
  const updateQuantity = useCartStore((state) => state.updateQuantity);
  const openCart = useCartStore((state) => state.openCart);
  const closeCart = useCartStore((state) => state.closeCart);

  return {
    items,
    isOpen,
    itemCount,
    subtotal,
    addItem,
    removeItem,
    updateQuantity,
    openCart,
    closeCart,
  };
}
