import { create } from "zustand";
import type { CartItem } from "@/types/cart";
import type { Product } from "@/types/product";

interface CartState {
  items: CartItem[];
  isOpen: boolean;
  addItem: (product: Product, quantity?: number) => void;
  removeItem: (productId: string) => void;
  updateQuantity: (productId: string, quantity: number) => void;
  openCart: () => void;
  closeCart: () => void;
  itemCount: () => number;
  subtotal: () => number;
}

export const useCartStore = create<CartState>((set, get) => ({
  items: [],
  isOpen: false,

  addItem: (product, quantity = 1) =>
    set((state) => {
      const existing = state.items.find(
        (item) => item.product.id === product.id,
      );
      if (existing) {
        return {
          items: state.items.map((item) =>
            item.product.id === product.id
              ? { ...item, quantity: item.quantity + quantity }
              : item,
          ),
          isOpen: true,
        };
      }
      return {
        items: [...state.items, { product, quantity }],
        isOpen: true,
      };
    }),

  removeItem: (productId) =>
    set((state) => ({
      items: state.items.filter((item) => item.product.id !== productId),
    })),

  updateQuantity: (productId, quantity) =>
    set((state) => ({
      items:
        quantity <= 0
          ? state.items.filter((item) => item.product.id !== productId)
          : state.items.map((item) =>
              item.product.id === productId ? { ...item, quantity } : item,
            ),
    })),

  openCart: () => set({ isOpen: true }),
  closeCart: () => set({ isOpen: false }),

  itemCount: () =>
    get().items.reduce((total, item) => total + item.quantity, 0),

  subtotal: () =>
    get().items.reduce(
      (total, item) => total + item.product.price * item.quantity,
      0,
    ),
}));
