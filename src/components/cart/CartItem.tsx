import React from 'react';
import { useCartStore } from '../../store/cartStore';
import type { CartItem as CartItemType } from '../../store/cartStore';
import { Minus, Plus, Trash2 } from 'lucide-react';

interface CartItemProps {
  item: CartItemType;
}

export const CartItem: React.FC<CartItemProps> = ({ item }) => {
  const { updateQuantity, removeItem } = useCartStore();

  return (
    <div className="flex gap-4 py-4 border-b border-noir-border last:border-0">
      <div className="h-20 w-20 bg-noir-gray border border-noir-border overflow-hidden shrink-0">
        <img src={item.image} alt={item.name} className="w-full h-full object-cover grayscale" />
      </div>
      
      <div className="flex-grow flex flex-col justify-between py-1">
        <div className="space-y-0.5">
          <div className="flex justify-between items-start gap-2">
            <h4 className="text-[11px] font-display font-black uppercase tracking-tight line-clamp-1">{item.name}</h4>
            <span className="text-[11px] font-black">GH₵ {(item.price * item.quantity).toLocaleString()}</span>
          </div>
          {item.variantName && (
            <p className="text-[10px] uppercase tracking-widest text-noir-black/50 font-bold">{item.variantName}</p>
          )}
        </div>

        <div className="flex justify-between items-center pt-2">
          <div className="flex items-center gap-2 bg-noir-gray px-2 py-1 rounded-sm">
            <button 
              onClick={() => updateQuantity(item.id, item.quantity - 1)}
              className="hover:text-noir-blue transition-colors"
            >
              <Minus className="w-3 h-3" />
            </button>
            <span className="text-[10px] font-black w-4 text-center">{item.quantity}</span>
            <button 
              onClick={() => updateQuantity(item.id, item.quantity + 1)}
              className="hover:text-noir-blue transition-colors"
            >
              <Plus className="w-3 h-3" />
            </button>
          </div>
          
          <button 
            onClick={() => removeItem(item.id)}
            className="text-noir-black/30 hover:text-red-500 transition-colors"
          >
            <Trash2 className="w-3.5 h-3.5" />
          </button>
        </div>
      </div>
    </div>
  );
};
