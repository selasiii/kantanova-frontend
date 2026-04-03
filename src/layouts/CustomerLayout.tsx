import React from 'react';
import { Outlet } from 'react-router-dom';

export const CustomerLayout: React.FC = () => {
  return (
    <div className="min-h-screen flex flex-col bg-noir-white">
      <header className="py-6 px-10 border-b border-noir-border flex justify-between items-center tracking-tighter">
        <h1 className="text-2xl font-black uppercase">Kantamanto Noir</h1>
        <nav className="hidden md:flex gap-8 text-[11px] font-bold uppercase tracking-[0.15em] text-gray-500">
           <a href="#collections" className="hover:text-black transition-colors">Collections</a>
           <a href="#curations" className="hover:text-black transition-colors">Curations</a>
           <a href="#archives" className="hover:text-black transition-colors">Archives</a>
        </nav>
        <div className="flex gap-4 items-center">
           {/* Replace with Lucide icons later */}
           <span className="font-bold cursor-pointer">BAG</span>
           <span className="font-bold cursor-pointer">USER</span>
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
    </div>
  );
};
