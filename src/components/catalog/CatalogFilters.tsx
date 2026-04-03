import React from 'react';
import { Input, Button, Stack, Badge } from '../ui';
import { Search, X } from 'lucide-react';
import { useCategories } from '../../hooks/product-hooks';
import type { ProductFilters } from '../../services/productService';

interface CatalogFiltersProps {
  filters: ProductFilters;
  onFilterChange: (filters: ProductFilters) => void;
  onClear: () => void;
}

export const CatalogFilters: React.FC<CatalogFiltersProps> = ({ 
  filters, 
  onFilterChange,
  onClear 
}) => {
  const { data: categories } = useCategories();

  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    onFilterChange({ ...filters, search: e.target.value, page: 1 });
  };

  const toggleCategory = (category: string) => {
    onFilterChange({ 
      ...filters, 
      category: filters.category === category ? undefined : category,
      page: 1 
    });
  };

  return (
    <div className="space-y-8">
      <div className="relative">
        <span className="absolute left-3 top-1/2 -translate-y-1/2 text-noir-black/40">
          <Search className="w-4 h-4" />
        </span>
        <Input 
          placeholder="Search products..." 
          className="pl-10" 
          value={filters.search || ''}
          onChange={handleSearchChange}
        />
      </div>

      <Stack spacing="sm">
        <h4 className="text-[10px] font-bold uppercase tracking-widest text-noir-black/50">Price Range (GH₵)</h4>
        <div className="flex items-center gap-2">
          <Input 
            placeholder="Min" 
            type="number"
            className="h-8 text-xs" 
            value={filters.minPrice || ''}
            onChange={(e) => onFilterChange({ ...filters, minPrice: Number(e.target.value) || undefined })}
          />
          <span className="text-noir-black/20">-</span>
          <Input 
            placeholder="Max" 
            type="number"
            className="h-8 text-xs" 
            value={filters.maxPrice || ''}
            onChange={(e) => onFilterChange({ ...filters, maxPrice: Number(e.target.value) || undefined })}
          />
        </div>
      </Stack>

      <Stack spacing="sm">
        <h4 className="text-[10px] font-bold uppercase tracking-widest text-noir-black/50">Categories</h4>
        <div className="flex flex-wrap gap-2">

          {categories?.map((cat) => (
            <Badge 
              key={cat}
              variant={filters.category === cat ? 'secondary' : 'outline'}
              className="cursor-pointer"
              onClick={() => toggleCategory(cat)}
            >
              {cat}
            </Badge>
          ))}
        </div>
      </Stack>

      <Stack spacing="sm">
        <h4 className="text-[10px] font-bold uppercase tracking-widest text-noir-black/50">Sort By</h4>
        <div className="flex flex-col gap-1">
          {[
            { label: 'Newest', value: 'newest' },
            { label: 'Price: Low to High', value: 'price_asc' },
            { label: 'Price: High to Low', value: 'price_desc' },
            { label: 'Top Rated', value: 'rating_desc' },
          ].map((option) => (
            <Button
              key={option.value}
              variant="ghost"
              size="sm"
              className={`justify-start h-8 px-2 text-xs ${filters.sort === option.value ? 'bg-noir-gray' : ''}`}
              onClick={() => onFilterChange({ ...filters, sort: option.value, page: 1 })}
            >
              {option.label}
            </Button>
          ))}
        </div>
      </Stack>

      {(filters.category || filters.search || filters.sort !== 'newest') && (
        <Button 
          variant="link" 
          size="sm" 
          onClick={onClear}
          className="text-noir-blue h-auto p-0"
        >
          <X className="w-3 h-3 mr-1" /> Clear all filters
        </Button>
      )}
    </div>
  );
};
