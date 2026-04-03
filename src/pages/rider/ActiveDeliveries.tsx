import React from 'react';
import { 
  Stack, 
  Card, 
  CardContent, 
  Button, 
  Badge, 
  toast
} from '../../components/ui';
import { useActiveTasks, useRiderActions } from '../../hooks/rider-hooks';
import { Truck, CheckCircle2, Phone, MessageSquare, MapPin, Store, HelpCircle } from 'lucide-react';

const ActiveDeliveries: React.FC = () => {
  const { data: tasks, isLoading } = useActiveTasks();
  const { pickUpTask, completeTask } = useRiderActions();

  const handleAction = async (id: string, currentStatus: string) => {
    try {
      if (currentStatus === 'ASSIGNED') {
        await pickUpTask.mutateAsync(id);
        toast({ title: 'Parcel Picked Up', description: 'Destination protocol active.', variant: 'success' });
      } else if (currentStatus === 'PICKED_UP') {
        await completeTask.mutateAsync(id);
        toast({ title: 'Delivery Finalized', description: 'Earnings credited.', variant: 'success' });
      }
    } catch (error) {
      toast({ title: 'Protocol Error', variant: 'destructive' });
    }
  };

  if (isLoading) {
    return <div className="animate-spin rounded-full h-10 w-10 border-b-2 border-noir-blue mx-auto mt-20"></div>;
  }

  return (
    <Stack spacing="xl">
      <header>
        <h1 className="text-3xl font-display font-black uppercase tracking-tighter">Current Queue</h1>
        <p className="text-noir-black/40 text-[10px] font-bold uppercase tracking-[0.3em]">Pipeline of assignments in active transit</p>
      </header>

      {!tasks || tasks.length === 0 ? (
        <Card className="border-4 border-noir-black shadow-none p-20 text-center flex flex-col items-center gap-4 bg-white/50">
          <Truck className="w-16 h-16 opacity-10 stroke-1" />
          <div className="space-y-1">
            <p className="font-display font-black uppercase tracking-widest text-sm">Pipeline Vacant</p>
            <p className="text-[10px] font-bold text-noir-black/40 uppercase tracking-tight">Acquire tasks from the feed to begin logistics.</p>
          </div>
          <Button variant="outline" size="sm" asChild>
             <a href="/rider/feed">Navigate to Feed</a>
          </Button>
        </Card>
      ) : (
        <div className="space-y-8">
          {tasks.map((task) => (
            <Card key={task.id} className="border-4 border-noir-black shadow-none rounded-none overflow-hidden bg-white">
              <div className="h-2 bg-noir-blue" />
              <CardContent className="p-8">
                {/* Status Indicator */}
                <div className="flex justify-between items-start mb-8">
                  <div className="space-y-1">
                    <Badge variant={task.status === 'PICKED_UP' ? 'success' : 'secondary'} className="text-[10px] tracking-[0.2em] px-4 py-1">
                      {task.status === 'ASSIGNED' ? 'AWAITING PICKUP' : 'IN TRANSIT'}
                    </Badge>
                  </div>
                  <div className="text-right">
                    <p className="text-[9px] font-black uppercase tracking-widest opacity-40">Segment ID</p>
                    <p className="font-black text-xs uppercase tracking-tight">KNT-TRN-{task.id.slice(-6)}</p>
                  </div>
                </div>

                <div className="space-y-10">
                  {/* Store Info */}
                  <div className="flex gap-6 items-start">
                    <div className="h-12 w-12 bg-noir-gray border border-noir-border shrink-0 flex items-center justify-center">
                      <Store className="w-6 h-6 text-noir-black/40" />
                    </div>
                    <div className="space-y-1 flex-grow">
                      <p className="text-[10px] font-black uppercase tracking-widest opacity-40 italic">Origins</p>
                      <h4 className="text-xl font-display font-black uppercase leading-tight">{task.storeName}</h4>
                      <p className="text-[11px] font-black uppercase text-noir-black/60">{task.storeAddress}</p>
                    </div>
                  </div>

                  {/* Customer Info */}
                  <div className="flex gap-6 items-start">
                    <div className="h-12 w-12 bg-noir-blue/10 border border-noir-blue/20 shrink-0 flex items-center justify-center">
                      <MapPin className="w-6 h-6 text-noir-blue" />
                    </div>
                    <div className="space-y-1 flex-grow">
                      <p className="text-[10px] font-black uppercase tracking-widest opacity-40 italic">Destination</p>
                      <h4 className="text-xl font-display font-black uppercase leading-tight">{task.customerName}</h4>
                      <p className="text-[11px] font-black uppercase text-noir-blue font-bold">{task.deliveryAddress}</p>
                    </div>
                  </div>
                </div>

                {/* Comms & Actions */}
                <div className="mt-12 pt-8 border-t-2 border-noir-gray border-dashed grid grid-cols-2 gap-4">
                  <Button variant="outline" className="h-14 font-black uppercase text-[10px] tracking-widest hover:bg-noir-blue hover:text-white transition-all">
                    <Phone className="w-4 h-4 mr-2" /> Signal Origin
                  </Button>
                  <Button variant="outline" className="h-14 font-black uppercase text-[10px] tracking-widest hover:bg-noir-blue hover:text-white transition-all">
                    <MessageSquare className="w-4 h-4 mr-2" /> Signal Destination
                  </Button>
                </div>

                <div className="mt-6 flex flex-col md:flex-row gap-4 items-center">
                   <Button 
                    className="w-full h-16 text-lg font-black uppercase tracking-tighter"
                    size="lg"
                    onClick={() => handleAction(task.id, task.status)}
                    loading={pickUpTask.isPending || completeTask.isPending}
                  >
                    {task.status === 'ASSIGNED' ? (
                      <><CheckCircle2 className="w-5 h-5 mr-3" /> Confirm Item Pickup</>
                    ) : (
                      <><CheckCircle2 className="w-5 h-5 mr-3" /> Finalize Handover</>
                    )}
                  </Button>
                  <button className="text-[10px] font-black uppercase tracking-widest opacity-30 hover:opacity-100 transition-all flex items-center gap-1 shrink-0">
                    <HelpCircle className="w-4 h-4" /> Issue Report
                  </button>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      )}
    </Stack>
  );
};

export default ActiveDeliveries;
