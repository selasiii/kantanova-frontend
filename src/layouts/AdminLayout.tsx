import React from 'react';
import { Outlet, Link, useLocation, useNavigate } from 'react-router-dom';
import { 
  BarChart3, 
  Users, 
  ShoppingBag, 
  ShieldCheck, 
  FileText, 
  LogOut, 
  ChevronRight,
  Database
} from 'lucide-react';
import { useAuthStore } from '../store/authStore';
import { Avatar, AvatarFallback, AvatarImage, Badge } from '../components/ui';
import { cn } from '../lib/utils';

const AdminLayout: React.FC = () => {
  const { user, logout } = useAuthStore();
  const location = useLocation();
  const navigate = useNavigate();

  const menuItems = [
    { label: 'Intelligence', path: '/admin', icon: BarChart3 },
    { label: 'User Directory', path: '/admin/users', icon: Users },
    { label: 'Order Audit', path: '/admin/orders', icon: ShoppingBag },
    { label: 'Governance', path: '/admin/governance', icon: ShieldCheck },
    { label: 'System Logs', path: '/admin/logs', icon: FileText },
  ];

  return (
    <div className="flex min-h-screen bg-[#F8F8F8]">
      {/* Sidebar */}
      <aside className="w-80 bg-noir-black text-white flex flex-col fixed inset-y-0 z-50">
        <div className="p-10 flex items-center gap-4">
          <div className="h-12 w-12 bg-white flex items-center justify-center rounded-none rotate-45 group">
            <Database className="w-6 h-6 text-noir-black -rotate-45" />
          </div>
          <div>
            <span className="font-display font-black uppercase tracking-tighter text-2xl block">Kantanova</span>
            <Badge variant="secondary" className="bg-white/10 text-[8px] tracking-[0.4em] py-0 px-2 border-none">CORE ADMIN</Badge>
          </div>
        </div>

        <nav className="flex-grow px-6 space-y-2 mt-12">
          {menuItems.map((item) => {
            const isActive = location.pathname === item.path;
            return (
              <Link 
                key={item.path} 
                to={item.path}
                className={cn(
                  "flex items-center justify-between px-6 py-5 group transition-all duration-300 border border-transparent",
                  isActive ? "bg-white/5 border-white/10 text-white shadow-xl" : "text-white/30 hover:text-white hover:bg-white/5"
                )}
              >
                <div className="flex items-center gap-4">
                  <item.icon className={cn("w-5 h-5 transition-transform", isActive ? "text-noir-blue" : "group-hover:scale-110")} />
                  <span className="text-[11px] font-black uppercase tracking-[0.25em]">{item.label}</span>
                </div>
                {isActive && <div className="h-1.5 w-1.5 bg-noir-blue rounded-full shadow-[0_0_8px_rgba(0,102,255,0.8)]" />}
              </Link>
            );
          })}
        </nav>

        <div className="p-6 mt-auto border-t border-white/5 bg-white/2">
          <button 
            onClick={() => { logout(); navigate('/login'); }}
            className="flex items-center gap-4 px-6 py-6 w-full text-white/30 hover:text-red-500 transition-all font-black uppercase text-[10px] tracking-widest"
          >
            <LogOut className="w-5 h-5" />
            <span>Terminate Master Session</span>
          </button>
        </div>
      </aside>

      {/* Main Content */}
      <main className="flex-grow ml-80 bg-pattern-white">
        <header className="h-24 bg-white/80 backdrop-blur-md border-b border-noir-border flex items-center justify-between px-16 sticky top-0 z-40">
          <div className="flex items-center gap-3 text-noir-black/30 text-[10px] font-black uppercase tracking-widest">
            <span className="flex items-center gap-1.5"><ShieldCheck className="w-3.5 h-3.5" /> Security Context</span>
            <ChevronRight className="w-4 h-4 opacity-30" />
            <span className="text-noir-black italic">{location.pathname.replace('/admin', '') || 'overview'}</span>
          </div>

          <div className="flex items-center gap-8">
             <div className="h-10 w-px bg-noir-border" />
             <div className="flex items-center gap-4">
                <div className="text-right">
                  <p className="text-[9px] font-black uppercase tracking-widest text-noir-black/40">Authorized Admin</p>
                  <p className="text-sm font-black uppercase tracking-tight">{user?.name}</p>
                </div>
                <Avatar className="h-12 w-12 border-2 border-noir-black p-0.5 pointer-events-none">
                  <AvatarImage src={`https://ui-avatars.com/api/?name=${user?.name}&background=000&color=fff`} className="rounded-none" />
                  <AvatarFallback>{user?.name?.[0]}</AvatarFallback>
                </Avatar>
             </div>
          </div>
        </header>

        <div className="p-16 max-w-[1800px] mx-auto min-h-[calc(100vh-6rem)]">
          <Outlet />
        </div>
      </main>
    </div>
  );
};

export default AdminLayout;
