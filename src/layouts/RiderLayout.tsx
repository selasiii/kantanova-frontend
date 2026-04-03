import React from 'react';
import { Outlet, Link, useLocation } from 'react-router-dom';

import { 
  Bike, 
  List, 
  User, 
  LayoutDashboard
} from 'lucide-react';
import { useAuthStore } from '../store/authStore';
import { useRiderStats, useRiderActions } from '../hooks/rider-hooks';
import { Avatar, AvatarFallback, AvatarImage, Switch } from '../components/ui';
import { cn } from '../lib/utils';

const RiderLayout: React.FC = () => {
  const { user } = useAuthStore();
  const { data: stats } = useRiderStats();
  const { toggleStatus } = useRiderActions();
  const location = useLocation();

  const navItems = [
    { label: 'Overview', path: '/rider', icon: LayoutDashboard },
    { label: 'Feed', path: '/rider/feed', icon: List },
    { label: 'Active', path: '/rider/active', icon: Bike },
    { label: 'Profile', path: '/profile', icon: User },
  ];

  return (
    <div className="min-h-screen bg-noir-gray/30 flex flex-col">
      {/* Header */}
      <header className="h-20 bg-noir-black text-white flex items-center justify-between px-6 sticky top-0 z-50">
        <div className="flex items-center gap-3">
          <div className="h-8 w-8 bg-noir-blue flex items-center justify-center">
            <Bike className="w-5 h-5 text-white" />
          </div>
          <span className="font-display font-black uppercase tracking-tighter text-lg leading-none">Kantanova<br/><span className="text-[8px] text-noir-blue tracking-[0.3em] block">Logistics</span></span>
        </div>

        <div className="flex items-center gap-4">
          <div className="flex items-center gap-2 bg-white/5 px-3 py-1.5 rounded-full border border-white/10">
            <span className={cn("h-2 w-2 rounded-full", stats?.isOnline ? "bg-green-500 shadow-[0_0_8px_rgba(34,197,94,0.6)]" : "bg-noir-black border border-white/20")} />
            <span className="text-[10px] font-black uppercase tracking-widest text-white/60">{stats?.isOnline ? 'Online' : 'Offline'}</span>
            <Switch 
              checked={stats?.isOnline || false} 
              onCheckedChange={(checked) => toggleStatus.mutate(checked)}
              className="scale-75"
            />
          </div>
          <Avatar className="h-8 w-8 border border-white/20">
            <AvatarImage src={`https://ui-avatars.com/api/?name=${user?.name}&background=fff&color=000`} />
            <AvatarFallback>{user?.name?.[0]}</AvatarFallback>
          </Avatar>
        </div>
      </header>

      {/* Main Content */}
      <main className="flex-grow pb-24 md:max-w-4xl md:mx-auto w-full p-6">
        <Outlet />
      </main>

      {/* Bottom Mobile Navigation */}
      <nav className="fixed bottom-0 inset-x-0 bg-white border-t border-noir-border h-20 px-4 flex items-center justify-around z-50 md:max-w-4xl md:mx-auto md:border-x">
        {navItems.map((item) => {
          const isActive = location.pathname === item.path;
          return (
            <Link 
              key={item.path} 
              to={item.path}
              className={cn(
                "flex flex-col items-center gap-1 transition-all duration-300",
                isActive ? "text-noir-blue" : "text-noir-black/30 hover:text-noir-black"
              )}
            >
              <item.icon className={cn("w-6 h-6", isActive && "scale-110")} />
              <span className="text-[9px] font-black uppercase tracking-widest">{item.label}</span>
              {isActive && <div className="h-1 w-1 bg-noir-blue rounded-full mt-0.5" />}
            </Link>
          );
        })}
      </nav>
    </div>
  );
};

export default RiderLayout;
