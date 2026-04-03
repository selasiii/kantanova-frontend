import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import type { Product } from '../services/productService';

export interface CartItem {
  id: string; // combination of product.id + variant.id
  productId: string;
  variantId?: string;
  name: string;
  variantName?: string;
  price: number;
  quantity: number;
  image: string;
}

interface CartStore {
  items: CartItem[];
  addItem: (product: Product, variantId?: string) => void;
  removeItem: (itemId: string) => void;
  updateQuantity: (itemId: string, quantity: number) => void;
  clearCart: () => void;
  getTotal: () => number;
  getItemCount: () => number;
}

export const useCartStore = create<CartStore>()(
  persist(
    (set, get) => ({
      items: [],
      addItem: (product, variantId) => {
        const variant = product.variants.find(v => v.id === variantId);
        const itemId = variantId ? `${product.id}-${variantId}` : product.id;
        
        set((state) => {
          const existingItem = state.items.find((item) => item.id === itemId);
          if (existingItem) {
            return {
              items: state.items.map((item) =>
                item.id === itemId
                  ? { ...item, quantity: item.quantity + 1 }
                  : item
              ),
            };
          }
          
          const newItem: CartItem = {
            id: itemId,
            productId: product.id,
            variantId,
            name: product.name,
            variantName: variant?.name,
            price: variant ? product.basePrice + variant.additionalPrice : product.basePrice,
            quantity: 1,
            image: product.images[0] || '',
          };
          
          return { items: [...state.items, newItem] };
        });
      },
      removeItem: (itemId) => {
        set((state) => ({
          items: state.items.filter((item) => item.id !== itemId),
        }));
      },
      updateQuantity: (itemId, quantity) => {
        set((state) => ({
          items: state.items.map((item) =>
            item.id === itemId ? { ...item, quantity: Math.max(1, quantity) } : item
          ),
        }));
      },
      clearCart: () => set({ items: [] }),
      getTotal: () => {
        return get().items.reduce((total, item) => total + item.price * item.quantity, 0);
      },
      getItemCount: () => {
        return get().items.reduce((count, item) => count + item.quantity, 0);
      },
    }),
    {
      name: 'kantanova-cart',
    }
  )
);
