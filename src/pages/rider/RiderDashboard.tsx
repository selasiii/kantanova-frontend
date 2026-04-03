import React from 'react';
import { 
  Card, 
  CardContent, 
  Stack, 
  Badge,
  Button
} from '../../components/ui';
import { useRiderStats } from '../../hooks/rider-hooks';
import { 
  Banknote, 
  Target, 
  Star, 
  ChevronRight, 
  Activity,
  Package,
  AlertCircle,
  List
} from 'lucide-react';
import { Link } from 'react-router-dom';
import { cn } from '../../lib/utils';

const RiderDashboard: React.FC = () => {
  const { data: stats, isLoading } = useRiderStats();

  if (isLoading) {
    return (
      <div className="h-[60vh] flex items-center justify-center">
        <div className="animate-spin rounded-full h-10 w-10 border-b-2 border-noir-blue"></div>
      </div>
    );
  }

  const metrics = [
    { label: "Today's Yield", value: `GH₵ ${stats?.todayEarnings || 0}`, icon: Banknote, color: "text-green-600" },
    { label: "Success Rate", value: "98.5%", icon: Target, color: "text-noir-blue" },
    { label: "Reputation", value: stats?.rating || 5.0, icon: Star, color: "text-yellow-500" },
  ];

  return (
    <Stack spacing="xl">
      <header>
        <h1 className="text-4xl font-display font-black uppercase tracking-tighter">Fleet Portal</h1>
        <p className="text-noir-black/40 text-[10px] font-bold uppercase tracking-[0.3em]">Operational performance and logistics analytics</p>
      </header>

      {/* Metrics Grid */}
      <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
        {metrics.map((m, i) => (
          <Card key={i} className="border-noir-border shadow-none rounded-none bg-white">
            <CardContent className="p-6 text-center md:text-left">
              <div className="flex justify-between items-start mb-4">
                <m.icon className={cn("w-5 h-5", m.color)} />
                <Badge variant="outline" className="text-[8px] opacity-40">Live</Badge>
              </div>
              <p className="text-[9px] font-black uppercase tracking-widest text-noir-black/40 mb-1">{m.label}</p>
              <p className="text-2xl font-display font-black uppercase">{m.value}</p>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Revenue Velocity Visualization */}
      <Card className="border-noir-border shadow-none rounded-none bg-white p-6">
        <div className="flex justify-between items-center mb-6">
          <p className="text-[9px] font-black uppercase tracking-widest text-noir-black/40">Weekly Yield Projection</p>
          <div className="flex gap-1">
            {[0.4, 0.7, 0.5, 0.9, 0.6, 0.8, 0.3].map((h, i) => (
              <div key={i} className="w-1.5 bg-noir-blue/20" style={{ height: '12px' }}>
                <div 
                  className={cn("w-full bg-noir-blue transition-all duration-1000", i === 6 && "bg-noir-black animate-pulse")} 
                  style={{ height: `${h * 100}%` }} 
                />
              </div>
            ))}
          </div>
        </div>
      </Card>


      {!stats?.isOnline && (
        <Card className="border-4 border-noir-black shadow-none rounded-none bg-noir-gray/20 p-8 text-center flex flex-col items-center gap-4">
          <AlertCircle className="w-12 h-12 text-noir-black/20" />
          <div className="space-y-1">
            <h4 className="font-display font-black uppercase text-sm tracking-widest">Protocol Dormant</h4>
            <p className="text-[10px] font-bold text-noir-black/40 uppercase tracking-tight">Toggle online status to receive new delivery assignments.</p>
          </div>
          <Button size="sm" variant="primary" className="h-10 px-6">Go Active</Button>
        </Card>
      )}

      {/* Active Work Summary */}
      <section className="space-y-4">
        <div className="flex justify-between items-end px-1">
          <h3 className="text-[10px] font-black uppercase tracking-[0.2em] flex items-center gap-2">
            <Activity className="w-4 h-4 text-noir-blue" /> Pipeline Overview
          </h3>
          <Link to="/rider/active" className="text-[9px] font-black uppercase tracking-widest text-noir-blue flex items-center hover:underline">
            Manage Queue <ChevronRight className="w-3 h-3 ml-1" />
          </Link>
        </div>

        <Card className="border-noir-border shadow-none rounded-none bg-white overflow-hidden">
          <CardContent className="p-0">
            <div className="p-12 text-center flex flex-col items-center gap-4 opacity-30 italic">
              <Package className="w-12 h-12 stroke-1" />
              <p className="text-[10px] font-bold uppercase tracking-widest">No active assignments in pipeline.</p>
            </div>
          </CardContent>
        </Card>
      </section>

      {/* Quick Action */}
      <Link to="/rider/feed">
        <Button size="lg" className="w-full h-16 bg-noir-black rounded-none group">
          <span className="group-hover:scale-110 transition-transform flex items-center gap-3">
             <List className="w-5 h-5 text-noir-blue" />
             Scout Available Shipments
          </span>
        </Button>
      </Link>
    </Stack>
  );
};

export default RiderDashboard;
