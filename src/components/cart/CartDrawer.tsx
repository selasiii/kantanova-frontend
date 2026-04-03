import React from 'react';
import { useNavigate } from 'react-router-dom';
import { 
  Sheet, 
  SheetContent, 
  SheetHeader, 
  SheetTitle, 
  SheetTrigger, 
  Button, 
  Stack 
} from '../ui';
import { CartItem } from './CartItem';
import { useCartStore } from '../../store/cartStore';
import { ShoppingBag, ArrowRight } from 'lucide-react';

export const CartDrawer: React.FC = () => {
  const { items, getTotal, getItemCount } = useCartStore();
  const navigate = useNavigate();

  return (
    <Sheet>
      <SheetTrigger asChild>
        <button className="relative p-2 hover:bg-noir-gray rounded-full transition-colors group">
          <ShoppingBag className="w-5 h-5 group-hover:text-noir-blue transition-colors" />
          {getItemCount() > 0 && (
            <span className="absolute -top-1 -right-1 h-5 w-5 bg-noir-blue text-white text-[10px] font-black flex items-center justify-center rounded-full border-2 border-noir-white">
              {getItemCount()}
            </span>
          )}
        </button>
      </SheetTrigger>
      <SheetContent side="right" className="w-full sm:max-w-md flex flex-col p-0">
        <SheetHeader className="p-6 border-b border-noir-border">
          <SheetTitle className="flex items-center gap-3 font-display font-black uppercase tracking-tighter text-xl">
            <ShoppingBag className="w-6 h-6" /> Shopping Bag
          </SheetTitle>
        </SheetHeader>

        <div className="flex-grow overflow-y-auto px-6 py-4">
          {items.length === 0 ? (
            <div className="h-full flex flex-col items-center justify-center space-y-4 opacity-40">
              <ShoppingBag className="w-16 h-16 stroke-1" />
              <p className="font-display font-black uppercase tracking-widest text-sm">Bag is empty</p>
            </div>
          ) : (
            <div className="divide-y divide-noir-border">
              {items.map((item) => (
                <CartItem key={item.id} item={item} />
              ))}
            </div>
          )}
        </div>

        {items.length > 0 && (
          <div className="p-6 border-t border-noir-border space-y-6 bg-noir-gray/30">
            <div className="flex justify-between items-baseline">
              <span className="text-[10px] font-bold uppercase tracking-[0.2em] text-noir-black/50">Subtotal</span>
              <span className="text-2xl font-display font-black">GH₵ {getTotal().toLocaleString()}</span>
            </div>
            
            <Stack spacing="sm">
              <Button 
                onClick={() => navigate('/checkout')} 
                className="w-full h-14 text-base tracking-[0.1em]"
              >
                Checkout Now <ArrowRight className="w-4 h-4 ml-2" />
              </Button>
              <p className="text-[10px] text-center text-noir-black/40 font-bold uppercase tracking-widest leading-relaxed px-4">
                Shipping and taxes calculated at checkout. Enjoy our secure escrow service.
              </p>
            </Stack>
          </div>
        )}
      </SheetContent>
    </Sheet>
  );
};
