import React from 'react';
import { Link } from 'react-router-dom';
import { Card, CardContent, CardFooter, Badge } from '../ui';
import type { Product } from '../../services/productService';
import { Star } from 'lucide-react';

interface ProductCardProps {
  product: Product;
}

export const ProductCard: React.FC<ProductCardProps> = ({ product }) => {
  return (
    <Link to={`/products/${product.id}`} className="block group">
      <Card className="overflow-hidden border-noir-border transition-all duration-300 group-hover:border-noir-black shadow-none rounded-none">
        <div className="aspect-[4/5] relative overflow-hidden bg-noir-gray">
          {product.images?.[0] ? (
            <img 
              src={product.images[0]} 
              alt={product.name}
              className="object-cover w-full h-full grayscale group-hover:grayscale-0 transition-all duration-500 scale-100 group-hover:scale-105"
            />
          ) : (
            <div className="w-full h-full flex items-center justify-center text-noir-black/20 font-black text-4xl">NO IMAGE</div>
          )}
          <Badge className="absolute top-3 left-3 bg-noir-black/80 backdrop-blur-md border-none text-noir-white">
            {product.category}
          </Badge>
        </div>
        <CardContent className="p-4 space-y-1">
          <div className="flex justify-between items-start gap-2">
            <h3 className="font-display font-bold uppercase tracking-tight text-sm line-clamp-1">{product.name}</h3>
            <div className="flex items-center gap-1 text-[10px] font-bold">
              <Star className="w-3 h-3 fill-noir-blue text-noir-blue" />
              <span>{product.averageRating}</span>
            </div>
          </div>
          <p className="text-xs text-noir-black/50 font-sans line-clamp-2 min-h-[32px]">{product.description}</p>
        </CardContent>
        <CardFooter className="px-4 pb-4 pt-0 flex justify-between items-center">
          <span className="font-display font-black text-lg">GH₵ {product.basePrice.toLocaleString()}</span>
          <span className="text-[10px] font-bold uppercase tracking-widest text-noir-blue group-hover:underline">View Details</span>
        </CardFooter>
      </Card>
    </Link>
  );
};
