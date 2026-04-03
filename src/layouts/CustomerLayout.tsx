import React from 'react';
import { Outlet, Link, useNavigate } from 'react-router-dom';
import { Toaster } from '@/components/ui/Toaster';
import { Button, toast } from '@/components/ui';
import { CartDrawer } from '@/components/cart/CartDrawer';
import { useAuthStore } from '@/store/authStore';
import { authService } from '@/services/authService';

export const CustomerLayout: React.FC = () => {
  const { user, isAuthenticated, logout } = useAuthStore();
  const navigate = useNavigate();

  const handleLogout = async () => {
    try {
      await authService.logout();
      logout();
      toast({
        title: "Logged out",
        description: "You have been successfully logged out",
      });
      navigate('/');
    } catch (error) {
      // Still logout locally if server fails
      logout();
      navigate('/');
    }
  };

  return (
    <div className="min-h-screen flex flex-col bg-noir-white">
      <header className="py-6 px-10 border-b border-noir-border flex justify-between items-center tracking-tighter">
        <Link to="/" className="text-2xl font-black uppercase">Kantamanto Noir</Link>
        <nav className="hidden md:flex gap-8 text-[11px] font-bold uppercase tracking-[0.15em] text-gray-500">
           <Link to="/catalog" className="hover:text-black transition-colors">Exploring</Link>
           <a href="#collections" className="hover:text-black transition-colors">Collections</a>
           <a href="#curations" className="hover:text-black transition-colors">Curations</a>
           <a href="#archives" className="hover:text-black transition-colors">Archives</a>
        </nav>

        <div className="flex gap-4 items-center">
           {isAuthenticated && user ? (
             <div className="flex items-center gap-4">
               <span className="text-[10px] font-bold uppercase tracking-widest text-noir-black/60">
                 Hi, {user.name.split(' ')[0]}
               </span>
               <Button variant="ghost" size="sm" onClick={handleLogout} className="text-[10px]">
                 LOGOUT
               </Button>
               <Link to="/profile" className="font-bold cursor-pointer underline underline-offset-4">MY PROFILE</Link>
             </div>
           ) : (
             <div className="flex items-center gap-4">
               <Link to="/login" className="text-[10px] font-bold uppercase tracking-widest hover:text-noir-blue">Login</Link>
               <Link to="/register" className="text-[10px] font-bold uppercase tracking-widest hover:text-noir-blue">Register</Link>
             </div>
           )}
           <CartDrawer />
        </div>
      </header>


      
      <main className="flex-grow">
        <Outlet />
      </main>
      
      <footer className="py-12 border-t border-noir-border text-center flex flex-col items-center gap-4">
         <h2 className="text-xl font-black tracking-tighter uppercase">Kantamanto Noir</h2>
         <div className="flex gap-6 text-[10px] font-bold uppercase tracking-widest text-gray-500 mt-4">
             <a href="#terms">Terms</a>
             <a href="#privacy">Privacy</a>
             <a href="#shipping">Shipping</a>
         </div>
         <p className="text-[10px] uppercase font-bold tracking-[0.2em] text-gray-400 mt-8">
             © 2026 Kantamanto Noir. All Rights Reserved.
         </p>
      </footer>
      <Toaster />
    </div>
  );
};

