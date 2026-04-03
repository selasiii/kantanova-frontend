import React from 'react';
import { 
  Card, 
  CardContent, 
  Stack, 
  Badge
} from '../../components/ui';
import { useVendorStats } from '../../hooks/vendor-hooks';
import { 
  DollarSign, 
  ShoppingBag, 
  Package, 
  ArrowUpRight, 
  TrendingUp
} from 'lucide-react';

const VendorOverview: React.FC = () => {
  const { data: stats, isLoading } = useVendorStats();

  if (isLoading) {
    return (
      <div className="h-[60vh] flex items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-noir-blue"></div>
      </div>
    );
  }

  const statCards = [
    { label: 'Cumulative Revenue', value: `GH₵ ${stats?.totalEarnings.toLocaleString()}`, icon: DollarSign, trend: '+12.5%' },
    { label: 'Active Shipments', value: stats?.activeOrders.toString(), icon: ShoppingBag, trend: '+3' },
    { label: 'Inventory Count', value: stats?.totalProducts.toString(), icon: Package, trend: 'Stable' },
  ];

  return (
    <Stack spacing="xl">

      <header className="space-y-2">
        <h1 className="text-5xl font-display font-black uppercase tracking-tighter">Command Center</h1>
        <p className="text-noir-black/40 text-[11px] font-bold uppercase tracking-[0.3em]">Real-time storefront intelligence and operations</p>
      </header>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
        {statCards.map((stat, i) => (
          <Card key={i} className="border-noir-border shadow-none rounded-none overflow-hidden group">
            <CardContent className="p-8">
              <div className="flex justify-between items-start mb-6">
                <div className="h-12 w-12 bg-noir-gray flex items-center justify-center border border-noir-border group-hover:bg-noir-blue group-hover:border-noir-blue group-hover:text-white transition-all">
                  <stat.icon className="w-6 h-6" />
                </div>
                <Badge variant="outline" className="text-noir-blue border-noir-blue/20 bg-noir-blue/5">
                  {stat.trend} <ArrowUpRight className="w-3 h-3 ml-1" />
                </Badge>
              </div>
              <div className="space-y-1">
                <p className="text-[10px] font-black uppercase tracking-widest text-noir-black/40">{stat.label}</p>
                <h3 className="text-3xl font-display font-black uppercase tracking-tight">{stat.value}</h3>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        {/* Performance Chart Placeholder */}
        <Card className="border-noir-border shadow-none h-[400px] bg-white flex flex-col items-center justify-center text-center p-12">
          <TrendingUp className="w-12 h-12 text-noir-black/10 mb-4" />
          <h4 className="font-display font-black uppercase text-sm mb-2">Revenue Velocity</h4>
          <p className="text-[10px] font-bold text-noir-black/40 uppercase tracking-widest max-w-[200px]">Historical transaction data visualization is aggregating...</p>
        </Card>

        {/* Recent Activity */}
        <Card className="border-noir-border shadow-none rounded-none bg-white overflow-hidden">
          <div className="p-6 bg-noir-gray/20 border-b border-noir-border flex justify-between items-center">
            <h4 className="text-[10px] font-black uppercase tracking-[0.2em]">Operational Stream</h4>
            <Badge variant="secondary">Live</Badge>
          </div>
          <CardContent className="p-0">
            <div className="divide-y divide-noir-border">
              {stats?.activeOrders === 0 ? (
                <div className="p-12 text-center text-noir-black/20 italic text-sm font-bold uppercase">No recent activity detected.</div>
              ) : (
                [1, 2, 3].map((item) => (
                  <div key={item} className="p-6 flex items-center gap-4 hover:bg-noir-gray/10 transition-colors">
                    <div className="h-2 w-2 rounded-full bg-noir-blue animate-pulse" />
                    <div>
                      <p className="text-xs font-black uppercase tracking-tight">New Order Received (#KNT-{item}42)</p>
                      <p className="text-[9px] font-bold text-noir-black/40 uppercase tracking-widest">2 items • 15 minutes ago</p>
                    </div>
                    <ArrowUpRight className="w-4 h-4 ml-auto text-noir-black/20" />
                  </div>
                ))
              )}
            </div>
          </CardContent>
        </Card>
      </div>
    </Stack>
  );
};

export default VendorOverview;
