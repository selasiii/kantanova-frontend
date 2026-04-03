import React from 'react';
import { Outlet, Link, useLocation, useNavigate } from 'react-router-dom';
import { 
  LayoutDashboard, 
  Package, 
  ShoppingBag, 
  Settings, 
  LogOut, 
  ChevronRight,
  TrendingUp,
  Store
} from 'lucide-react';
import { useAuthStore } from '../store/authStore';
import { Avatar, AvatarFallback, AvatarImage } from '../components/ui';
import { cn } from '../lib/utils';


const VendorLayout: React.FC = () => {
  const { user, logout } = useAuthStore();
  const location = useLocation();
  const navigate = useNavigate();

  const menuItems = [
    { label: 'Overview', path: '/vendor', icon: LayoutDashboard },
    { label: 'Inventory', path: '/vendor/products', icon: Package },
    { label: 'Orders', path: '/vendor/orders', icon: ShoppingBag },
    { label: 'Performance', path: '/vendor/performance', icon: TrendingUp },
    { label: 'Settings', path: '/vendor/settings', icon: Settings },
  ];

  return (
    <div className="flex min-h-screen bg-noir-gray/30">
      {/* Sidebar */}
      <aside className="w-72 bg-noir-black text-white flex flex-col fixed inset-y-0 z-50">
        <div className="p-8 flex items-center gap-3">
          <div className="h-10 w-10 bg-noir-blue rounded-none flex items-center justify-center">
            <Store className="w-5 h-5 text-white" />
          </div>
          <span className="font-display font-black uppercase tracking-tighter text-xl">Kantanova<br/><span className="text-[10px] text-noir-blue tracking-[0.3em] block -mt-1">Vendor Portal</span></span>
        </div>

        <nav className="flex-grow px-4 space-y-1 mt-8">
          {menuItems.map((item) => {
            const isActive = location.pathname === item.path;
            return (
              <Link 
                key={item.path} 
                to={item.path}
                className={cn(
                  "flex items-center justify-between p-4 group transition-all duration-300",
                  isActive ? "bg-white/10 text-white" : "text-white/40 hover:text-white hover:bg-white/5"
                )}
              >
                <div className="flex items-center gap-3">
                  <item.icon className={cn("w-5 h-5 transition-transform", isActive ? "text-noir-blue" : "group-hover:scale-110")} />
                  <span className="text-[10px] font-black uppercase tracking-[0.2em]">{item.label}</span>
                </div>
                {isActive && <div className="h-1 w-1 bg-noir-blue rounded-full" />}
              </Link>
            );
          })}
        </nav>

        <div className="p-4 mt-auto border-t border-white/5">
          <button 
            onClick={() => { logout(); navigate('/login'); }}
            className="flex items-center gap-3 p-4 w-full text-white/40 hover:text-red-400 transition-colors"
          >
            <LogOut className="w-5 h-5" />
            <span className="text-[10px] font-black uppercase tracking-widest">Terminate Session</span>
          </button>
        </div>
      </aside>

      {/* Main Content */}
      <main className="flex-grow ml-72">
        <header className="h-20 bg-white border-b border-noir-border flex items-center justify-between px-12 sticky top-0 z-40">
          <div className="flex items-center gap-2 text-noir-black/40 text-[10px] font-bold uppercase tracking-widest">
            <span>Storefront</span>
            <ChevronRight className="w-3 h-3" />
            <span className="text-noir-black italic">{location.pathname.split('/').pop() || 'overview'}</span>
          </div>

          <div className="flex items-center gap-6">
            <div className="text-right">
              <p className="text-[9px] font-black uppercase tracking-widest text-noir-black/40">Marketplace Identity</p>
              <p className="text-xs font-bold uppercase tracking-tight">{user?.name}</p>
            </div>
            <Avatar className="h-10 w-10 border border-noir-border pointer-events-none">
              <AvatarImage src={`https://ui-avatars.com/api/?name=${user?.name}&background=000&color=fff`} />
              <AvatarFallback>{user?.name?.[0]}</AvatarFallback>
            </Avatar>
          </div>
        </header>

        <div className="p-12 max-w-[1600px] mx-auto">
          <Outlet />
        </div>
      </main>
    </div>
  );
};

export default VendorLayout;
