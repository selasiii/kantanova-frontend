import React from 'react';
import { CheckCircle2, Clock, Truck, Package, MapPin, Flag } from 'lucide-react';
import { cn } from '../../lib/utils';

export type OrderStatus = 'PENDING' | 'PAID' | 'DISPATCHED' | 'EN_ROUTE' | 'DELIVERED' | 'COMPLETED' | 'CANCELLED';

interface OrderStatusTrackerProps {
  currentStatus: OrderStatus;
}

const statusConfig = [
  { status: 'PENDING', label: 'Ordered', icon: Clock },
  { status: 'PAID', label: 'Paid', icon: CheckCircle2 },
  { status: 'DISPATCHED', label: 'Dispatched', icon: Package },
  { status: 'EN_ROUTE', label: 'In Transit', icon: Truck },
  { status: 'DELIVERED', label: 'Delivered', icon: MapPin },
  { status: 'COMPLETED', label: 'Completed', icon: Flag },
];

export const OrderStatusTracker: React.FC<OrderStatusTrackerProps> = ({ currentStatus }) => {
  if (currentStatus === 'CANCELLED') {
    return (
      <div className="bg-red-50 border border-red-200 p-6 text-center">
        <h3 className="text-red-600 font-display font-black uppercase tracking-widest text-lg">Order Cancelled</h3>
        <p className="text-red-500/70 text-xs font-bold uppercase mt-1">This transaction has been terminated.</p>
      </div>
    );
  }

  const currentIndex = statusConfig.findIndex((s) => s.status === currentStatus);

  return (
    <div className="relative w-full py-8">
      {/* Progress Line */}
      <div className="absolute top-[52px] left-[15%] right-[15%] h-0.5 bg-noir-gray">
        <div 
          className="h-full bg-noir-blue transition-all duration-1000" 
          style={{ width: `${(currentIndex / (statusConfig.length - 1)) * 100}%` }}
        />
      </div>

      <div className="flex justify-between items-start relative z-10">
        {statusConfig.map((step, index) => {
          const isCompleted = index < currentIndex;
          const isCurrent = index === currentIndex;
          const Icon = step.icon;

          return (
            <div key={step.status} className="flex flex-col items-center gap-3 w-20">
              <div 
                className={cn(
                  "h-12 w-12 rounded-full border-2 flex items-center justify-center transition-all duration-500",
                  isCompleted ? "bg-noir-blue border-noir-blue text-white" : 
                  isCurrent ? "bg-white border-noir-blue text-noir-blue shadow-[0_0_15px_rgba(30,138,255,0.3)] animate-pulse" : 
                  "bg-white border-noir-gray text-noir-black/20"
                )}
              >
                <Icon className={cn("w-5 h-5", isCurrent && "animate-bounce-slow")} />
              </div>
              <div className="text-center">
                <p 
                  className={cn(
                    "text-[9px] font-black uppercase tracking-widest transition-colors",
                    isCompleted || isCurrent ? "text-noir-black" : "text-noir-black/30"
                  )}
                >
                  {step.label}
                </p>
                {isCurrent && (
                  <span className="text-[7px] text-noir-blue font-bold uppercase tracking-[0.2em] block mt-0.5">Active</span>
                )}
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};
