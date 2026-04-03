import React from 'react';
import { 
  Stack, 
  Button, 
  Card, 
  Badge,
  toast
} from '../../components/ui';
import { useVendorOrders, useVendorActions } from '../../hooks/vendor-hooks';
import { ShoppingBag, Truck, Clock, ChevronRight, User } from 'lucide-react';

const VendorOrders: React.FC = () => {
  const { data: orders, isLoading } = useVendorOrders();
  const { updateOrderStatus } = useVendorActions();

  const handleDispatch = async (id: string) => {
    try {
      await updateOrderStatus.mutateAsync({ id, status: 'DISPATCHED' });
      toast({ title: 'Shipment Dispatched', description: 'Rider has been notified.', variant: 'success' });
    } catch (error) {
      toast({ title: 'Status Update Failed', variant: 'destructive' });
    }
  };

  if (isLoading) {
    return (
      <div className="h-[60vh] flex items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-noir-blue"></div>
      </div>
    );
  }

  return (
    <Stack spacing="xl">
      <header className="space-y-2">
        <h1 className="text-4xl font-display font-black uppercase tracking-tighter">Order Flow</h1>
        <p className="text-noir-black/40 text-[11px] font-bold uppercase tracking-[0.3em]">Logistics and fulfillment monitoring</p>
      </header>

      {!orders || orders.length === 0 ? (
        <Card className="border-dashed border-noir-border shadow-none p-20 text-center flex flex-col items-center gap-4 opacity-40">
          <ShoppingBag className="w-16 h-16 stroke-1" />
          <div className="space-y-1">
            <p className="font-display font-black uppercase tracking-widest text-sm">Quiet marketplace</p>
            <p className="text-[10px] font-bold uppercase tracking-tight">Orders will populate here as customers acquire your items.</p>
          </div>
        </Card>
      ) : (
        <div className="space-y-6">
          {orders.map((order) => (
            <Card key={order.id} className="border-noir-border shadow-none rounded-none overflow-hidden">
              <div className="grid grid-cols-1 md:grid-cols-4">
                {/* Info */}
                <div className="md:col-span-3 p-8 border-b md:border-b-0 md:border-r border-noir-border space-y-8">
                  <div className="flex justify-between items-start">
                    <div className="space-y-1">
                      <div className="flex items-center gap-3">
                        <h3 className="font-display font-black uppercase tracking-tight">KNT-{order.id.slice(-8)}</h3>
                        <Badge variant={order.status === 'PAID' ? 'secondary' : 'default'}>{order.status}</Badge>
                      </div>
                      <p className="text-[10px] font-bold text-noir-black/40 uppercase tracking-widest flex items-center gap-1.5">
                        <Clock className="w-3 h-3" /> AT {new Date(order.createdAt).toLocaleTimeString()} • {new Date(order.createdAt).toLocaleDateString()}
                      </p>
                    </div>
                    <div className="text-right">
                      <p className="text-[9px] font-black uppercase tracking-widest text-noir-black/40 mb-1">Customer Profile</p>
                      <div className="flex items-center gap-2">
                        <User className="w-3 h-3" />
                        <span className="text-[10px] font-black uppercase tracking-tight">{order.shippingAddress.fullName}</span>
                      </div>
                    </div>
                  </div>

                  <div className="space-y-4">
                    <p className="text-[10px] font-black uppercase tracking-widest opacity-30">Itemized Breakdown</p>
                    <div className="divide-y divide-noir-border border-y border-noir-border">
                      {order.items.map((item: any, i: number) => (
                        <div key={i} className="py-4 flex justify-between items-center text-[11px] font-bold uppercase tracking-tight">
                          <div className="flex items-center gap-4">
                            <span className="h-6 w-6 bg-noir-gray border border-noir-border flex items-center justify-center text-[8px] font-black">{item.quantity}X</span>
                            <span>{item.productName}</span>
                            {item.variantName && <span className="opacity-40 italic">{item.variantName}</span>}
                          </div>
                          <span className="font-display font-black">GH₵ {item.price.toLocaleString()}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>

                {/* Actions */}
                <div className="p-8 bg-noir-gray/10 flex flex-col justify-between gap-8">
                  <div className="space-y-1">
                    <p className="text-[9px] font-black uppercase tracking-widest text-noir-black/40">Shipment Value</p>
                    <p className="text-3xl font-display font-black leading-none">GH₵ {order.totalValue.toLocaleString()}</p>
                  </div>

                  <div className="space-y-3">
                    {order.status === 'PAID' ? (
                      <Button className="w-full h-14" onClick={() => handleDispatch(order.id)}>
                        <Truck className="w-4 h-4 mr-2" /> Dispatch Rider
                      </Button>
                    ) : (
                      <div className="p-4 bg-white/50 border border-noir-border text-center">
                        <p className="text-[9px] font-black uppercase tracking-widest opacity-40 italic">Fulfillment Locked</p>
                        <p className="text-[8px] font-bold uppercase tracking-tighter mt-1">Awaiting payment verification</p>
                      </div>
                    )}
                    <Button variant="ghost" className="w-full text-[10px] font-black uppercase tracking-[0.2em] opacity-40 hover:opacity-100">
                      Print Invoice <ChevronRight className="w-4 h-4 ml-1" />
                    </Button>
                  </div>
                </div>
              </div>
            </Card>
          ))}
        </div>
      )}
    </Stack>
  );
};

export default VendorOrders;
