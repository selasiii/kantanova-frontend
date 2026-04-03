import React, { useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import { 
  Container, 
  Stack, 
  Button, 
  Card, 
  CardHeader, 
  CardTitle, 
  CardContent,
  Badge,
  toast,
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
  DialogFooter
} from '../../components/ui';
import { useOrderDetails } from '../../hooks/order-hooks';
import { orderService } from '../../services/orderService';
import { OrderStatusTracker } from '../../components/portal/OrderStatusTracker';
import { ChevronLeft, ShieldCheck, MapPin, Phone, CreditCard, AlertTriangle } from 'lucide-react';

const OrderDetailPage: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const { data: order, isLoading, refetch } = useOrderDetails(id!);
  const [isConfirming, setIsConfirming] = useState(false);
  const [isCancelling, setIsCancelling] = useState(false);
  const [showConfirmDialog, setShowConfirmDialog] = useState(false);
  const [showCancelDialog, setShowCancelDialog] = useState(false);

  const handleConfirmDelivery = async () => {
    setIsConfirming(true);
    try {
      await orderService.confirmDelivery(id!);
      toast({
        title: "Quality Confirmed",
        description: "Funds released to vendor.",
        variant: "success"
      });
      refetch();
      setShowConfirmDialog(false);
    } catch (error: any) {
      toast({ title: "Action Failed", variant: "destructive" });
    } finally {
      setIsConfirming(false);
    }
  };

  const handleCancelOrder = async () => {
    setIsCancelling(true);
    try {
      await orderService.cancelOrder(id!);
      toast({
        title: "Order Cancelled",
        description: "Your transaction has been terminated.",
        variant: "success"
      });
      refetch();
      setShowCancelDialog(false);
    } catch (error: any) {
      toast({ title: "Cancellation Failed", variant: "destructive" });
    } finally {
      setIsCancelling(false);
    }
  };


  if (isLoading) {
    return (
      <Container size="lg" className="py-20 flex justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-noir-blue"></div>
      </Container>
    );
  }

  if (!order) return null;

  return (
    <Container size="lg" className="py-12">
      <Link to="/profile/orders" className="inline-flex items-center text-xs font-bold uppercase tracking-widest text-noir-black/40 hover:text-noir-black mb-8 transition-colors">
        <ChevronLeft className="w-4 h-4 mr-1" /> Back to History
      </Link>

      <Stack spacing="xl">
        <header className="flex flex-col md:flex-row justify-between items-baseline gap-4">
          <div className="space-y-1">
            <div className="flex items-center gap-3">
              <h1 className="text-4xl font-display font-black uppercase tracking-tighter leading-none">Order Details</h1>
              <Badge variant="secondary" className="mt-1">#{order.id.slice(-8)}</Badge>
            </div>
            <p className="text-noir-black/50 text-[10px] font-bold uppercase tracking-[0.2em]">Placed on {new Date(order.createdAt).toLocaleDateString()}</p>
          </div>

          <div className="flex gap-4">
            {order.status === 'PENDING' && (
              <Button variant="outline" className="border-red-200 text-red-500 hover:bg-red-50" onClick={() => setShowCancelDialog(true)}>
                Cancel Order
              </Button>
            )}
            {order.status === 'DELIVERED' && (
              <Button size="lg" onClick={() => setShowConfirmDialog(true)}>
                Confirm Receipt & Quality
              </Button>
            )}
          </div>
        </header>


        <Card className="border-noir-border shadow-none rounded-none p-12 bg-white">
          <OrderStatusTracker currentStatus={order.status} />
        </Card>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {/* Order Items */}
          <div className="md:col-span-2 space-y-6">
            <Card className="border-noir-border shadow-none rounded-none overflow-hidden">
              <CardHeader className="bg-noir-gray/30 border-b border-noir-border">
                <CardTitle className="text-[10px] font-black uppercase tracking-widest">Acquired Items</CardTitle>
              </CardHeader>
              <CardContent className="p-0">
                <div className="divide-y divide-noir-border">
                  {order.items.map((item: any, i: number) => (
                    <div key={i} className="p-6 flex gap-6">
                      <div className="h-20 w-20 bg-noir-gray shrink-0 border border-noir-border">
                        <img src={item.productImage} className="w-full h-full object-cover grayscale" />
                      </div>
                      <div className="flex-grow space-y-1">
                        <h4 className="font-display font-black uppercase text-sm">{item.productName}</h4>
                        {item.variantName && <p className="text-[10px] font-bold text-noir-black/40 uppercase tracking-widest">{item.variantName}</p>}
                        <div className="flex justify-between items-baseline pt-4">
                          <p className="text-[10px] font-bold uppercase tracking-widest">Qty: {item.quantity}</p>
                          <p className="font-display font-black">GH₵ {item.price.toLocaleString()}</p>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Delivery & Payment Info */}
          <div className="space-y-6">
            <Card className="border-noir-border shadow-none bg-noir-gray/10">
              <CardHeader className="pb-2">
                <CardTitle className="text-[10px] font-black uppercase tracking-widest opacity-40">Delivery Endpoint</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex gap-3">
                  <MapPin className="w-4 h-4 text-noir-blue shrink-0" />
                  <div className="space-y-1">
                    <p className="text-xs font-black uppercase leading-tight">{order.shippingAddress.fullName}</p>
                    <p className="text-[11px] text-noir-black/60 leading-tight">{order.shippingAddress.address}, {order.shippingAddress.city}</p>
                  </div>
                </div>
                <div className="flex items-center gap-3">
                  <Phone className="w-4 h-4 text-noir-blue" />
                  <p className="text-[11px] font-bold uppercase">{order.shippingAddress.phone}</p>
                </div>
              </CardContent>
            </Card>

            <Card className="border-noir-border shadow-none bg-noir-gray/10">
              <CardHeader className="pb-2">
                <CardTitle className="text-[10px] font-black uppercase tracking-widest opacity-40">Financial Summary</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex items-center gap-3">
                  <CreditCard className="w-4 h-4 text-noir-blue" />
                  <p className="text-[10px] font-bold uppercase tracking-widest">{order.paymentMethod.replace('_', ' ')}</p>
                </div>
                <div className="pt-4 border-t border-dashed border-noir-border flex justify-between items-baseline">
                  <span className="text-[11px] font-black uppercase text-noir-black/40">Total Charged</span>
                  <span className="text-2xl font-display font-black">GH₵ {order.totalValue.toLocaleString()}</span>
                </div>
              </CardContent>
            </Card>

            <div className="p-6 bg-noir-blue/5 border border-noir-blue/10 flex gap-4">
              <ShieldCheck className="w-6 h-6 text-noir-blue shrink-0" />
              <div className="space-y-1">
                <p className="text-[10px] font-black uppercase tracking-tight">Kantanova Escrow Protection</p>
                <p className="text-[9px] text-noir-black/60 leading-relaxed uppercase font-bold tracking-wider">
                  The vendor is paid only AFTER you confirm the quality of the items delivered.
                </p>
              </div>
            </div>
          </div>
        </div>
      </Stack>

      <Dialog open={showConfirmDialog} onOpenChange={setShowConfirmDialog}>
        <DialogContent aria-describedby={undefined} className="max-w-md bg-white border-2 border-noir-black rounded-none">
          <DialogHeader>
            <DialogTitle className="font-display font-black uppercase text-2xl tracking-tighter">Confirm Delivery Quality?</DialogTitle>
            <DialogDescription className="text-sm font-sans pt-4">
              By confirming, you acknowledge that you have received all items in the expected quality. **This action will release the held funds to the vendor and cannot be reversed.**
            </DialogDescription>
          </DialogHeader>
          <div className="flex gap-4 p-4 bg-red-50 border border-red-100 mt-4">
             <AlertTriangle className="w-5 h-5 text-red-500 shrink-0" />
             <p className="text-[10px] font-bold uppercase text-red-600 leading-tight tracking-wider">
               DO NOT confirm if items are missing or damaged. Contact support instead.
             </p>
          </div>
          <DialogFooter className="mt-8 flex gap-4">
            <Button variant="outline" onClick={() => setShowConfirmDialog(false)} className="flex-grow h-12">Cancel</Button>
            <Button onClick={handleConfirmDelivery} loading={isConfirming} className="flex-grow h-12">Confirm & Release Funds</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      <Dialog open={showCancelDialog} onOpenChange={setShowCancelDialog}>
        <DialogContent aria-describedby={undefined} className="max-w-md bg-white border-2 border-red-200 rounded-none">
          <DialogHeader>
            <DialogTitle className="font-display font-black uppercase text-2xl tracking-tighter text-red-600">Terminate Order?</DialogTitle>
            <DialogDescription className="text-sm font-sans pt-4">
              Are you sure you want to cancel this order? This action will stop the fulfillment process.
            </DialogDescription>
          </DialogHeader>
          <DialogFooter className="mt-8 flex gap-4">
            <Button variant="ghost" onClick={() => setShowCancelDialog(false)} className="flex-grow h-12">Keep Order</Button>
            <Button onClick={handleCancelOrder} loading={isCancelling} variant="destructive" className="flex-grow h-12 bg-red-600">Confirm Termination</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </Container>

  );
};

export default OrderDetailPage;
