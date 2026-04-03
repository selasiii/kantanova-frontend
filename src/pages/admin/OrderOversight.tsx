import React from 'react';
import { 
  Stack, 
  Card, 
  CardContent, 
  Badge,
} from '../../components/ui';
import { useAllOrders } from '../../hooks/admin-hooks';
import { 
  Clock, 
  ExternalLink,
  Briefcase,
  Store,
  Bike,
  CreditCard
} from 'lucide-react';
import { cn } from '../../lib/utils';

const OrderOversight: React.FC = () => {
  const { data: orders, isLoading } = useAllOrders();

  if (isLoading) {
    return <div className="animate-spin rounded-full h-10 w-10 border-b-2 border-noir-blue mx-auto mt-20"></div>;
  }

  return (
    <Stack spacing="xl">
      <header className="flex justify-between items-end">
        <div className="space-y-2">
          <p className="text-[10px] font-black uppercase tracking-[0.4em] text-noir-black/40">Transactional Audit</p>
          <h1 className="text-4xl font-display font-black uppercase tracking-tighter">Order Oversight</h1>
        </div>
        <div className="flex items-center gap-2 bg-noir-blue text-white px-8 py-4 text-[10px] font-black uppercase tracking-widest shadow-[0_8px_20px_rgba(0,102,255,0.3)]">
           <Briefcase className="w-4 h-4" /> Export Ledger
        </div>
      </header>

      <Card className="border-noir-border shadow-none rounded-none bg-white overflow-hidden">
        <CardContent className="p-0">
          <table className="w-full text-left">
            <thead className="bg-noir-gray/30 border-b border-noir-border">
              <tr>
                <th className="px-10 py-6 text-[10px] font-black uppercase tracking-widest opacity-40">Transaction Context</th>
                <th className="px-10 py-6 text-[10px] font-black uppercase tracking-widest opacity-40">Entity Attribution</th>
                <th className="px-10 py-6 text-[10px] font-black uppercase tracking-widest opacity-40">Status Grid</th>
                <th className="px-10 py-6 text-[10px] font-black uppercase tracking-widest opacity-40 text-right">Value Asset</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-noir-border">
              {orders?.map((order) => (
                <tr key={order.id} className="hover:bg-noir-gray/5 transition-colors group cursor-pointer">
                  <td className="px-10 py-8">
                    <div className="space-y-1.5">
                      <p className="font-black uppercase text-sm tracking-tight flex items-center gap-2">
                        ORD-{order.id.slice(-8)} <ExternalLink className="w-3 h-3 opacity-20" />
                      </p>
                      <p className="text-[9px] font-bold text-noir-black/40 uppercase tracking-tight flex items-center gap-1.5 font-mono">
                        <Clock className="w-3 h-3" /> {new Date(order.createdAt).toISOString()}
                      </p>
                    </div>
                  </td>
                  <td className="px-10 py-8">
                     <div className="flex flex-col gap-2">
                        <div className="flex items-center gap-2">
                           <Store className="w-3.5 h-3.5 text-noir-black opacity-30" />
                           <span className="text-[10px] font-black uppercase tracking-tight">{order.vendorName || 'Generic Store'}</span>
                        </div>
                        <div className="flex items-center gap-2">
                           <Bike className="w-3.5 h-3.5 text-noir-blue opacity-50" />
                           <span className="text-[10px] font-black uppercase tracking-tight text-noir-blue">{order.riderName || 'Unassigned'}</span>
                        </div>
                     </div>
                  </td>
                  <td className="px-10 py-8">
                    <Badge variant="outline" className={cn(
                      "text-[9px] tracking-[0.2em] font-black border-2 bg-white",
                      order.status === 'DELIVERED' ? "border-green-100 text-green-600" : "border-noir-blue text-noir-blue"
                    )}>
                      {order.status}
                    </Badge>
                  </td>
                  <td className="px-10 py-8 text-right">
                    <div className="space-y-1">
                      <p className="text-xl font-display font-black uppercase tracking-tight">GH₵ {order.totalAmount.toLocaleString()}</p>
                      <p className="text-[9px] font-black uppercase tracking-widest opacity-40 flex items-center justify-end gap-1">
                        <CreditCard className="w-3 h-3" /> {order.paymentStatus || 'SETTLED'}
                      </p>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </CardContent>
      </Card>
    </Stack>
  );
};

export default OrderOversight;
