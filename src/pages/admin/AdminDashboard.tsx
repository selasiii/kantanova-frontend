import React from 'react';
import { 
  Card, 
  CardContent, 
  Stack, 
  Badge,
  Skeleton
} from '../../components/ui';
import { useSystemStats } from '../../hooks/admin-hooks';
import { 
  TrendingUp, 
  Users, 
  ShoppingBag, 
  Wallet, 
  ArrowUpRight, 
  Activity,
  Calendar,
  AlertCircle
} from 'lucide-react';
import { cn } from '../../lib/utils';

const AdminDashboard: React.FC = () => {
  const { data: stats, isLoading } = useSystemStats();

  if (isLoading) {
    return (
      <Stack spacing="xl">
        <Skeleton className="h-12 w-1/3" />
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
          {[1, 2, 3, 4].map(i => <Skeleton key={i} className="h-40 w-full" />)}
        </div>
      </Stack>
    );
  }

  const kpis = [
    { label: "Platform Revenue", value: `GH₵ ${stats?.totalRevenue.toLocaleString()}`, icon: TrendingUp, trend: "+12%" },
    { label: "Active Nodes", value: stats?.totalOrders.toString(), icon: ShoppingBag, trend: "+84" },
    { label: "Escrow Reserve", value: `GH₵ ${stats?.escrowBalance.toLocaleString()}`, icon: Wallet, trend: "Stable" },
    { label: "Total Identities", value: "1,242", icon: Users, trend: "+126" },
  ];

  return (
    <Stack spacing="xl">

      <header className="flex justify-between items-end">
        <div className="space-y-4">
          <Badge variant="outline" className="text-noir-blue border-noir-blue/30 bg-noir-blue/5 py-1.5 px-4 tracking-[0.3em]">System Intelligence</Badge>
          <h1 className="text-6xl font-display font-black uppercase tracking-tighter leading-none">Command Grid</h1>
        </div>
        <div className="flex items-center gap-3 bg-white border border-noir-border px-6 py-4 shadow-sm">
           <Calendar className="w-5 h-5 text-noir-black/40" />
           <span className="text-xs font-black uppercase tracking-widest">{new Date().toLocaleDateString('en-GB', { day: '2-digit', month: 'long', year: 'numeric' })}</span>
        </div>
      </header>

      {/* KPI Grid */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
        {kpis.map((kpi, i) => (
          <Card key={i} className="border-noir-border shadow-2xl rounded-none bg-white group hover:-translate-y-2 transition-all duration-300">
            <CardContent className="p-8">
              <div className="flex justify-between items-start mb-8">
                <div className="h-12 w-12 bg-noir-black flex items-center justify-center text-white group-hover:bg-noir-blue transition-colors">
                  <kpi.icon className="w-6 h-6" />
                </div>
                <div className="flex items-center gap-1.5 text-[9px] font-black text-green-500 uppercase tracking-widest">
                  {kpi.trend} <ArrowUpRight className="w-3 h-3" />
                </div>
              </div>
              <p className="text-[10px] font-black uppercase tracking-[0.2em] text-noir-black/40 mb-2">{kpi.label}</p>
              <h3 className="text-3xl font-display font-black uppercase tracking-tight">{kpi.value}</h3>
            </CardContent>
          </Card>
        ))}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* User Distribution */}
        <Card className="lg:col-span-1 border-noir-border shadow-none rounded-none bg-white p-10">
          <h4 className="text-[11px] font-black uppercase tracking-[0.25em] mb-10 flex items-center gap-2">
            <Users className="w-4 h-4 text-noir-blue" /> Identity Distribution
          </h4>
          <div className="space-y-8">
             {[
               { label: 'Customers', count: stats?.activeUsers.customers, pct: 65, color: 'bg-noir-black' },
               { label: 'Vendors', count: stats?.activeUsers.vendors, pct: 20, color: 'bg-noir-blue' },
               { label: 'Riders', count: stats?.activeUsers.riders, pct: 15, color: 'bg-noir-black opacity-20' },
             ].map((u, i) => (
               <div key={i} className="space-y-3">
                 <div className="flex justify-between text-[10px] font-black uppercase tracking-widest">
                    <span>{u.label}</span>
                    <span className="opacity-40">{u.count} UNITS</span>
                 </div>
                 <div className="h-3 bg-noir-gray overflow-hidden">
                    <div className={cn("h-full transition-all duration-1000", u.color)} style={{ width: `${u.pct}%` }} />
                 </div>
               </div>
             ))}
          </div>
        </Card>

        {/* System activity Log */}
        <Card className="lg:col-span-2 border-noir-border shadow-none rounded-none bg-white overflow-hidden">
          <div className="p-8 border-b border-noir-border flex justify-between items-center bg-noir-gray/10">
            <h4 className="text-[11px] font-black uppercase tracking-[0.25em] flex items-center gap-2">
              <Activity className="w-4 h-4 text-noir-blue animate-pulse" /> Operational Telemetry
            </h4>
            <Badge variant="secondary" className="text-[9px]">Live Data</Badge>
          </div>
          <CardContent className="p-0">
             <div className="divide-y divide-noir-border">
                {stats?.recentLogs.map((log, i) => (
                  <div key={i} className="p-6 flex items-center gap-6 hover:bg-noir-gray/10 transition-colors group">
                    <div className="text-[10px] font-black opacity-20 group-hover:opacity-40 transition-opacity">[{log.timestamp}]</div>
                    <div className="flex-grow">
                      <p className="text-[11px] font-black uppercase tracking-tight">{log.action}</p>
                      <p className="text-[9px] font-bold text-noir-black/40 uppercase tracking-widest italic flex items-center gap-1.5">
                        <AlertCircle className="w-3 h-3 text-noir-blue" /> Entity: {log.user}
                      </p>
                    </div>
                    <ArrowUpRight className="w-4 h-4 opacity-0 group-hover:opacity-20 transition-opacity" />
                  </div>
                ))}
             </div>
          </CardContent>
        </Card>
      </div>
    </Stack>
  );
};

export default AdminDashboard;
