"use client";

import { createContext, useContext, useState, useCallback, useEffect } from "react";
import type { CartItem, Product, ProductColor } from "@/types";
import { products } from "@/data/products";
import { CartDrawer } from "./cart-drawer";

interface CartContextType {
  items: CartItem[];
  addItem: (product: Product, color: ProductColor, size: number) => void;
  removeItem: (index: number) => void;
  updateQuantity: (index: number, quantity: number) => void;
  openCart: () => void;
  closeCart: () => void;
  itemCount: number;
}

const CartContext = createContext<CartContextType | null>(null);

const STORAGE_KEY = "stepforward-cart";

/**
 * Persisted cart entries store only stable references, not a full product
 * snapshot. On load we rehydrate against the current products data so prices,
 * names, and images stay fresh and removed products drop out of the cart.
 */
interface PersistedCartItem {
  productId: string;
  colorHex: string;
  size: number;
  quantity: number;
}

function loadCart(): CartItem[] {
  try {
    if (typeof window === "undefined") return [];
    const stored = localStorage.getItem(STORAGE_KEY);
    if (!stored) return [];
    const parsed = JSON.parse(stored) as PersistedCartItem[];
    return parsed
      .map((entry) => {
        const product = products.find((p) => p.id === entry.productId);
        if (!product) return null;
        const color =
          product.colors.find((c) => c.hex === entry.colorHex) ?? product.colors[0];
        if (!color) return null;
        return { product, color, size: entry.size, quantity: entry.quantity };
      })
      .filter((item): item is CartItem => item !== null);
  } catch {
    return [];
  }
}

function saveCart(items: CartItem[]) {
  try {
    const persisted: PersistedCartItem[] = items.map((item) => ({
      productId: item.product.id,
      colorHex: item.color.hex,
      size: item.size,
      quantity: item.quantity,
    }));
    localStorage.setItem(STORAGE_KEY, JSON.stringify(persisted));
  } catch {
    // localStorage unavailable
  }
}

export function useCart() {
  const ctx = useContext(CartContext);
  if (!ctx) throw new Error("useCart must be used within CartProvider");
  return ctx;
}

export function CartProvider({ children }: { children: React.ReactNode }) {
  const [items, setItems] = useState<CartItem[]>([]);
  const [isOpen, setIsOpen] = useState(false);

  useEffect(() => {
    setItems(loadCart());
  }, []);

  const addItem = useCallback(
    (product: Product, color: ProductColor, size: number) => {
      setItems((prev) => {
        const existing = prev.findIndex(
          (item) =>
            item.product.id === product.id &&
            item.color.hex === color.hex &&
            item.size === size
        );
        let next: CartItem[];
        if (existing >= 0) {
          next = [...prev];
          next[existing] = { ...next[existing], quantity: next[existing].quantity + 1 };
        } else {
          next = [...prev, { product, color, size, quantity: 1 }];
        }
        saveCart(next);
        return next;
      });
      setIsOpen(true);
    },
    []
  );

  const removeItem = useCallback((index: number) => {
    setItems((prev) => {
      const next = prev.filter((_, i) => i !== index);
      saveCart(next);
      return next;
    });
  }, []);

  const updateQuantity = useCallback((index: number, quantity: number) => {
    setItems((prev) => {
      const next = [...prev];
      next[index] = { ...next[index], quantity };
      saveCart(next);
      return next;
    });
  }, []);

  const itemCount = items.reduce((sum, item) => sum + item.quantity, 0);

  return (
    <CartContext.Provider
      value={{
        items,
        addItem,
        removeItem,
        updateQuantity,
        openCart: () => setIsOpen(true),
        closeCart: () => setIsOpen(false),
        itemCount,
      }}
    >
      {children}
      <CartDrawer
        isOpen={isOpen}
        onClose={() => setIsOpen(false)}
        items={items}
        onUpdateQuantity={updateQuantity}
        onRemove={removeItem}
      />
    </CartContext.Provider>
  );
}
