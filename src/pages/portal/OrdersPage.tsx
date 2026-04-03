import React from 'react';
import { Link } from 'react-router-dom';
import { 
  Container, 
  Stack, 
  Button, 
  Card, 
  Badge
} from '../../components/ui';
import { useOrders } from '../../hooks/order-hooks';
import { Package, ChevronRight, Clock, AlertCircle } from 'lucide-react';

const OrdersPage: React.FC = () => {
  const { data: orders, isLoading, error } = useOrders();

  if (isLoading) {
    return (
      <Container size="lg" className="py-20 flex justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-noir-blue"></div>
      </Container>
    );
  }

  if (error) {
    return (
      <Container size="lg" className="py-20 text-center">
        <div className="flex flex-col items-center gap-4 text-noir-black/40">
          <AlertCircle className="w-12 h-12" />
          <h2 className="text-xl font-display font-black uppercase">Failed to load orders</h2>
          <Button variant="outline" onClick={() => window.location.reload()}>Retry fetch</Button>
        </div>
      </Container>
    );
  }

  return (
    <Container size="lg" className="py-12">
      <Stack spacing="xl">
        <header className="space-y-2">
          <h1 className="text-4xl font-display font-black uppercase tracking-tighter">Your Archives</h1>
          <p className="text-noir-black/50 text-xs font-bold uppercase tracking-[0.2em]">View and track all your previous acquisitions</p>
        </header>

        {!orders || orders.length === 0 ? (
          <Card className="border-dashed border-noir-border shadow-none p-20 text-center flex flex-col items-center gap-4 opacity-40">
            <Package className="w-16 h-16 stroke-1" />
            <div className="space-y-1">
              <p className="font-display font-black uppercase tracking-widest text-sm">No orders yet</p>
              <p className="text-[10px] font-bold uppercase tracking-tight">Your history will appear here once you make a purchase.</p>
            </div>
            <Button variant="outline" asChild className="mt-4"><Link to="/catalog">Start Exploring</Link></Button>
          </Card>
        ) : (
          <div className="space-y-4">
            {orders.map((order) => (
              <Card key={order.id} className="border-noir-border shadow-none hover:border-noir-black transition-all group rounded-none overflow-hidden">
                <div className="flex flex-col md:flex-row items-stretch">
                  <div className="p-6 flex-grow flex flex-col md:flex-row justify-between md:items-center gap-6">
                    <div className="flex items-center gap-6">
                      <div className="h-16 w-16 bg-noir-gray flex items-center justify-center shrink-0 border border-noir-border">
                        <Package className="w-8 h-8 text-noir-black/20" />
                      </div>
                      <div className="space-y-1">
                        <Badge variant={order.status === 'COMPLETED' ? 'success' : 'secondary'} className="mb-2">
                          {order.status}
                        </Badge>
                        <h3 className="font-display font-black uppercase tracking-tight text-sm">Order #{order.id.slice(-8)}</h3>
                        <p className="text-[10px] font-bold text-noir-black/40 uppercase tracking-widest flex items-center gap-1.5">
                          <Clock className="w-3 h-3" /> {new Date(order.createdAt).toLocaleDateString()}
                        </p>
                      </div>
                    </div>

                    <div className="flex items-center gap-12">
                      <div className="text-right hidden sm:block">
                        <p className="text-[9px] font-bold text-noir-black/40 uppercase tracking-widest">Total Value</p>
                        <p className="font-display font-black text-lg">GH₵ {order.totalValue.toLocaleString()}</p>
                      </div>
                      <div className="text-right hidden sm:block">
                        <p className="text-[9px] font-bold text-noir-black/40 uppercase tracking-widest">Items</p>
                        <p className="font-display font-black text-lg">{order.items.length}</p>
                      </div>
                      <Button asChild variant="ghost" className="h-12 w-12 p-0 group-hover:bg-noir-black group-hover:text-white transition-all">
                        <Link to={`/orders/${order.id}`}><ChevronRight className="w-5 h-5" /></Link>
                      </Button>
                    </div>
                  </div>
                </div>
              </Card>
            ))}
          </div>
        )}
      </Stack>
    </Container>
  );
};

export default OrdersPage;
