import React from 'react';
import { 
  Stack, 
  Card, 
  CardContent, 
  Button, 
  toast,

  Skeleton
} from '../../components/ui';
import { useAvailableTasks, useRiderActions } from '../../hooks/rider-hooks';
import { MapPin, Briefcase, ChevronRight, Clock, Store } from 'lucide-react';

const DeliveryFeed: React.FC = () => {
  const { data: tasks, isLoading } = useAvailableTasks();
  const { acceptTask } = useRiderActions();

  const handleAccept = async (id: string) => {
    try {
      await acceptTask.mutateAsync(id);
      toast({ title: 'Task Accepted', description: 'Proceed to store for pickup.', variant: 'success' });
    } catch (error) {
      toast({ title: 'Acceptance Failed', variant: 'destructive' });
    }
  };

  if (isLoading) {
    return (
      <Stack spacing="lg">
        {[1, 2, 3].map(i => <Skeleton key={i} className="h-40 w-full" />)}
      </Stack>
    );
  }

  return (
    <Stack spacing="xl">
      <header className="space-y-1">
        <h1 className="text-3xl font-display font-black uppercase tracking-tighter">Live Stream</h1>
        <div className="flex items-center gap-2">
          <div className="h-2 w-2 rounded-full bg-green-500 animate-pulse" />
          <p className="text-noir-black/40 text-[10px] font-bold uppercase tracking-[0.3em]">Scoping {tasks?.length || 0} available assignments</p>
        </div>
      </header>

      {!tasks || tasks.length === 0 ? (
        <Card className="border-dashed border-noir-border shadow-none p-20 text-center flex flex-col items-center gap-4 opacity-30">
          <Briefcase className="w-12 h-12 stroke-1" />
          <p className="text-[10px] font-bold uppercase tracking-tight italic">Fleet data stream is currently quiet.</p>
        </Card>
      ) : (
        <div className="space-y-4">
          {tasks.map((task) => (
            <Card key={task.id} className="border-noir-border shadow-none rounded-none overflow-hidden group hover:border-noir-blue transition-all">
              <CardContent className="p-0 flex flex-col md:flex-row">
                <div className="p-6 border-b md:border-b-0 md:border-r border-noir-border flex-grow space-y-6">
                  {/* Earnings Header */}
                  <div className="flex justify-between items-start">
                    <div className="space-y-1">
                      <p className="text-[9px] font-black uppercase tracking-widest text-noir-black/40">Logistics Segment</p>
                      <h3 className="font-display font-black uppercase tracking-tight text-xl">TASK-{task.id.slice(-6)}</h3>
                    </div>
                    <div className="text-right">
                      <p className="text-[9px] font-black uppercase tracking-widest text-noir-black/40 mb-1">Trip Value</p>
                      <p className="text-2xl font-display font-black text-noir-blue leading-none">GH₵ {task.earnings.toLocaleString()}</p>
                    </div>
                  </div>

                  {/* Route Visual (Iconic) */}
                  <div className="relative pl-6 space-y-6 after:absolute after:left-1.5 after:top-2 after:bottom-2 after:w-0.5 after:bg-noir-border">
                    <div className="relative flex flex-col gap-1">
                      <div className="absolute -left-[22px] top-0.5 h-3 w-3 rounded-full bg-noir-black border-2 border-white z-10" />
                      <p className="text-[10px] font-black uppercase tracking-widest text-noir-black/40 flex items-center gap-1.5">
                        <Store className="w-3 h-3" /> Pickup Interface
                      </p>
                      <p className="text-xs font-bold uppercase tracking-tight">{task.storeName}</p>
                    </div>
                    <div className="relative flex flex-col gap-1">
                      <div className="absolute -left-[22px] top-0.5 h-3 w-3 rounded-full bg-noir-blue border-2 border-white z-10" />
                      <p className="text-[10px] font-black uppercase tracking-widest text-noir-black/40 flex items-center gap-1.5">
                        <MapPin className="w-3 h-3" /> Drop Destination
                      </p>
                      <p className="text-xs font-bold uppercase tracking-tight truncate max-w-[250px]">{task.deliveryAddress}</p>
                    </div>
                  </div>
                </div>

                <div className="p-6 bg-noir-gray/20 flex flex-col justify-center items-center gap-4 min-w-[180px]">
                  <Button 
                    className="w-full h-14 bg-noir-black rounded-none group-hover:bg-noir-blue transition-colors"
                    onClick={() => handleAccept(task.id)}
                    loading={acceptTask.isPending}
                  >
                    Accept Segment <ChevronRight className="w-4 h-4 ml-1" />
                  </Button>
                  <p className="text-[9px] font-black uppercase tracking-widest opacity-30 flex items-center gap-1">
                    <Clock className="w-3 h-3" /> EXPIRES IN 5M
                  </p>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      )}
    </Stack>
  );
};

export default DeliveryFeed;
