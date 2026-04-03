import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { 
  Container, 
  Input, 
  Button, 
  Card, 
  CardHeader, 
  CardTitle, 
  CardContent,
  toast 
} from '../components/ui';
import { useCartStore } from '../store/cartStore';
import { orderService } from '../services/orderService';
import type { OrderDetails } from '../services/orderService';
import { useAuthStore } from '../store/authStore';
import { ShieldCheck, Truck, CreditCard, ChevronRight } from 'lucide-react';

const CheckoutPage: React.FC = () => {
  const { items, getTotal, clearCart } = useCartStore();
  const { user } = useAuthStore();
  const navigate = useNavigate();
  const [isSubmitting, setIsSubmitting] = useState(false);

  const [formData, setFormData] = useState({
    fullName: user?.name || '',
    phone: '',
    city: '',
    address: '',
    notes: '',
    paymentMethod: 'PAYSTACK' as const,
  });

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (items.length === 0) return;

    setIsSubmitting(true);
    try {
      const orderDetails: OrderDetails = {
        items: items.map(i => ({
          productId: i.productId,
          variantId: i.variantId,
          quantity: i.quantity
        })),
        shippingAddress: {
          fullName: formData.fullName,
          phone: formData.phone,
          city: formData.city,
          address: formData.address,
          notes: formData.notes
        },
        paymentMethod: formData.paymentMethod
      };

      const response = await orderService.checkout(orderDetails);
      
      toast({
        title: "Order Placed",
        description: "Redirecting to payment...",
        variant: "success"
      });

      if (response.paymentUrl) {
        window.location.href = response.paymentUrl;
      } else {
        // If no payment URL (e.g. COD), go to success page
        clearCart();
        navigate(`/orders/success?ref=${response.reference}`);
      }
    } catch (error: any) {
      toast({
        title: "Checkout Failed",
        description: error.response?.data?.message || "Something went wrong during checkout",
        variant: "destructive"
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  const total = getTotal();
  const shippingFee = total > 0 ? 25 : 0;
  const grandTotal = total + shippingFee;

  if (items.length === 0) {

    return (
      <Container size="md" className="py-20 text-center">
        <h2 className="text-3xl font-display font-black uppercase mb-4">Your bag is empty</h2>
        <Button variant="outline" onClick={() => navigate('/catalog')}>Return to exploring</Button>
      </Container>
    );
  }

  return (
    <Container size="lg" className="py-12">
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
        {/* Left Column: Form */}
        <div className="lg:col-span-2 space-y-8">
          <header className="space-y-2">
            <h1 className="text-4xl font-display font-black uppercase tracking-tighter">Checkout Confirmation</h1>
            <p className="text-noir-black/50 text-sm font-bold uppercase tracking-widest">Complete your order details below</p>
          </header>

          <form id="checkout-form" onSubmit={handleSubmit} className="space-y-8">
            <Card className="border-noir-border shadow-none rounded-none">
              <CardHeader className="border-b border-noir-border bg-noir-gray/30">
                <CardTitle className="text-xs font-black flex items-center gap-2">
                  <Truck className="w-4 h-4" /> 1. SHIPPING & CONTACT
                </CardTitle>
              </CardHeader>
              <CardContent className="p-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <Input 
                    label="Recipient Full Name" 
                    name="fullName" 
                    value={formData.fullName} 
                    onChange={handleInputChange} 
                    required 
                  />
                  <Input 
                    label="Phone Number" 
                    name="phone" 
                    value={formData.phone} 
                    onChange={handleInputChange} 
                    required 
                  />
                  <Input 
                    label="City" 
                    name="city" 
                    value={formData.city} 
                    onChange={handleInputChange} 
                    required 
                  />
                  <Input 
                    label="Precise Address / Neighborhood" 
                    name="address" 
                    value={formData.address} 
                    onChange={handleInputChange} 
                    required 
                  />
                </div>
                <div className="mt-6">
                  <Input 
                    label="Delivery Notes (Optional)" 
                    name="notes" 
                    value={formData.notes} 
                    onChange={handleInputChange} 
                  />
                </div>
              </CardContent>
            </Card>

            <Card className="border-noir-border shadow-none rounded-none">
              <CardHeader className="border-b border-noir-border bg-noir-gray/30">
                <CardTitle className="text-xs font-black flex items-center gap-2">
                  <CreditCard className="w-4 h-4" /> 2. PAYMENT METHOD
                </CardTitle>
              </CardHeader>
              <CardContent className="p-6 grid grid-cols-1 md:grid-cols-2 gap-4">
                {[
                  { id: 'PAYSTACK', label: 'Card / Mobile Money (Paystack)', icon: '⚡' },
                  { id: 'HUBTEL', label: 'Hubtel Mobile Payment', icon: '📱' },
                  { id: 'CASH_ON_DELIVERY', label: 'Cash on Delivery', icon: '💵' },
                ].map((method) => (
                  <button
                    key={method.id}
                    type="button"
                    onClick={() => setFormData({ ...formData, paymentMethod: method.id as any })}
                    className={`flex items-center gap-4 p-4 border transition-all text-left ${
                      formData.paymentMethod === method.id 
                        ? 'border-noir-black bg-noir-black/5 ring-1 ring-noir-black' 
                        : 'border-noir-border hover:border-noir-black/30'
                    }`}
                  >
                    <span className="text-2xl">{method.icon}</span>
                    <span className="text-[11px] font-black uppercase tracking-tight">{method.label}</span>
                  </button>
                ))}
              </CardContent>
            </Card>
          </form>
        </div>

        {/* Right Column: Order Summary */}
        <div className="space-y-6">
          <Card className="border-noir-black border-2 shadow-none rounded-none bg-noir-white sticky top-8">
            <CardHeader className="border-b border-noir-border pb-4">
              <CardTitle className="text-sm font-black uppercase tracking-widest">Order Summary</CardTitle>
            </CardHeader>
            <CardContent className="p-6 space-y-6">
              <div className="space-y-4 max-h-[40vh] overflow-y-auto pr-2 scrollbar-hide">
                {items.map((item) => (
                  <div key={item.id} className="flex gap-4">
                    <img src={item.image} className="w-12 h-12 bg-noir-gray object-cover grayscale" />
                    <div className="flex-grow">
                      <p className="text-[10px] font-black uppercase leading-tight line-clamp-1">{item.name}</p>
                      <p className="text-[9px] font-bold text-noir-black/40 uppercase tracking-widest">Qty: {item.quantity}</p>
                    </div>
                    <span className="text-[10px] font-black">GH₵ {(item.price * item.quantity).toLocaleString()}</span>
                  </div>
                ))}
              </div>

              <div className="border-t border-noir-border pt-4 space-y-2">
                <div className="flex justify-between text-[10px] font-bold uppercase tracking-widest text-noir-black/50">
                  <span>Subtotal</span>
                  <span>GH₵ {total.toLocaleString()}</span>
                </div>
                <div className="flex justify-between text-[10px] font-bold uppercase tracking-widest text-noir-black/50">
                  <span>Standard Shipping</span>
                  <span>GH₵ {shippingFee.toLocaleString()}</span>
                </div>
                <div className="flex justify-between pt-4 border-t border-noir-border">
                  <span className="font-display font-black uppercase text-xs">Total</span>
                  <span className="font-display font-black text-xl">GH₵ {grandTotal.toLocaleString()}</span>
                </div>
              </div>


              <Button 
                form="checkout-form"
                type="submit" 
                className="w-full h-14 text-base" 
                loading={isSubmitting}
              >
                Place Order <ChevronRight className="w-4 h-4 ml-2" />
              </Button>

              <div className="flex items-start gap-3 p-4 bg-noir-blue/5 rounded-sm">
                <ShieldCheck className="w-4 h-4 text-noir-blue shrink-0 mt-0.5" />
                <p className="text-[9px] leading-relaxed text-noir-black/60 font-bold uppercase tracking-wider">
                  Funds held in Kantanova Escrow. Quality guaranteed or your money back.
                </p>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </Container>
  );
};

export default CheckoutPage;
