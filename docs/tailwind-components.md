# Tailwind Component React Reference

This document provides ready-to-use React component scaffolding to immediately hit the "Kantamanto Noir" Brutalist Luxury aesthetic using the Tailwind CSS rules from `design-system.md`.

## 1. The Button Component
```tsx
import React from 'react';

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: 'primary' | 'outline' | 'ghost';
  children: React.ReactNode;
}

export const Button: React.FC<ButtonProps> = ({ variant = 'primary', children, ...props }) => {
  const baseClasses = "px-8 py-4 uppercase text-sm font-bold tracking-[0.15em] transition-colors focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-noir-blue";
  
  const variants = {
    primary: "bg-noir-blue text-white hover:bg-blue-700",
    outline: "border border-noir-black text-noir-black hover:bg-noir-black hover:text-white",
    ghost: "text-noir-black hover:bg-gray-100"
  };

  return (
    <button className={`${baseClasses} ${variants[variant]} ${props.className || ''}`} {...props}>
      {children}
    </button>
  );
};
```

## 2. Minimalist Text Input
```tsx
import React, { forwardRef } from 'react';

interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  label: string;
}

export const TextInput = forwardRef<HTMLInputElement, InputProps>(({ label, ...props }, ref) => {
  return (
    <div className="flex flex-col mb-6">
      <label className="text-[10px] font-bold uppercase tracking-[0.2em] text-gray-800 mb-2">
        {label}
      </label>
      <input 
        ref={ref}
        className="w-full border-b border-gray-300 py-3 bg-transparent placeholder-gray-300 focus:outline-none focus:border-noir-blue transition-colors text-noir-black"
        {...props} 
      />
    </div>
  );
});
TextInput.displayName = 'TextInput';
```

## 3. Curated Product Card
```tsx
import React from 'react';

interface ProductProps {
  title: string;
  category: string;
  price: number;
  imageUrl: string;
  tag?: string;
}

export const ProductCard: React.FC<ProductProps> = ({ title, category, price, imageUrl, tag }) => {
  return (
    <div className="group cursor-pointer flex flex-col gap-4 relative">
      <div className="w-full aspect-[3/4] bg-noir-gray overflow-hidden relative">
        {tag && (
          <div className="absolute top-4 left-4 bg-black text-white text-[10px] font-bold uppercase tracking-widest px-3 py-1 z-10">
            {tag}
          </div>
        )}
        <img 
          src={imageUrl} 
          alt={title} 
          className="w-full h-full object-cover transition-transform duration-700 ease-in-out group-hover:scale-105"
        />
      </div>
      <div className="flex justify-between items-start">
        <div className="flex flex-col gap-1">
          <h3 className="font-extrabold uppercase text-base leading-tight text-noir-black">{title}</h3>
          <span className="uppercase text-[10px] tracking-[0.2em] text-gray-400 font-semibold">{category}</span>
        </div>
        <span className="text-noir-blue font-bold text-lg">${price.toFixed(2)}</span>
      </div>
    </div>
  );
};
```

## 4. The Half-Screen Layout Grid (Authentication)
```tsx
export const AuthLayout = ({ children, imageSide }: { children: React.ReactNode, imageSide: string }) => {
  return (
    <div className="min-h-screen grid grid-cols-1 md:grid-cols-2">
      {/* Visual Identity Side */}
      <div className="hidden md:block bg-noir-gray relative overflow-hidden">
        <img 
          src={imageSide} 
          alt="Campaign" 
          className="absolute inset-0 w-full h-full object-cover grayscale opacity-90"
        />
        <div className="absolute top-10 left-10 text-white font-display font-black text-3xl uppercase tracking-tighter mix-blend-difference">
          Kantamanto Noir
        </div>
      </div>
      
      {/* Functional Side */}
      <div className="flex flex-col justify-center px-10 py-16 sm:px-20 lg:px-32 bg-white">
        <div className="w-full max-w-sm">
          {children}
        </div>
      </div>
    </div>
  );
}
```
