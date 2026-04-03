import React, { useState, useEffect } from 'react';
import { Container, Stack, Sheet, SheetTrigger, SheetContent, SheetHeader, SheetTitle, Button } from '../components/ui';
import { ProductGrid } from '../components/catalog/ProductGrid';
import { CatalogFilters } from '../components/catalog/CatalogFilters';
import { useProducts } from '../hooks/product-hooks';
import type { ProductFilters } from '../services/productService';
import { useDebounce } from '../hooks/use-debounce';
import { Filter } from 'lucide-react';

const CatalogPage: React.FC = () => {
  const [filters, setFilters] = useState<ProductFilters>({
    page: 1,
    limit: 12,
    sort: 'newest',
    search: ''
  });

  const [searchTerm, setSearchTerm] = useState('');
  const debouncedSearch = useDebounce(searchTerm, 500);

  useEffect(() => {
    setFilters(f => ({ ...f, search: debouncedSearch, page: 1 }));
  }, [debouncedSearch]);

  const { data, isLoading } = useProducts(filters);

  const clearFilters = () => {
    setSearchTerm('');
    setFilters({ page: 1, limit: 12, sort: 'newest', search: '' });
  };

  const handleFilterChange = (newFilters: ProductFilters) => {
    if (newFilters.search !== undefined) {
      setSearchTerm(newFilters.search);
    } else {
      setFilters(newFilters);
    }
  };

  return (
    <Container size="xl" className="py-12">
      <div className="flex flex-col md:flex-row gap-12">
        {/* Desktop Sidebar */}
        <aside className="hidden md:block w-64 shrink-0">
          <CatalogFilters 
            filters={{ ...filters, search: searchTerm }} 
            onFilterChange={handleFilterChange} 
            onClear={clearFilters}
          />
        </aside>

        {/* Mobile Filter Button */}
        <div className="md:hidden">
          <Sheet>
            <SheetTrigger asChild>
              <Button variant="outline" className="w-full">
                <Filter className="w-4 h-4 mr-2" /> Filters
              </Button>
            </SheetTrigger>
            <SheetContent side="left" className="w-[300px]">
              <SheetHeader>
                <SheetTitle>Filters</SheetTitle>
              </SheetHeader>
              <div className="mt-8">
                <CatalogFilters 
                  filters={{ ...filters, search: searchTerm }} 
                  onFilterChange={handleFilterChange} 
                  onClear={clearFilters}
                />
              </div>
            </SheetContent>
          </Sheet>
        </div>

        {/* Main Content */}
        <main className="flex-grow">
          <Stack spacing="lg">
            <header className="flex justify-between items-baseline border-b border-noir-border pb-4">
              <h2 className="text-sm font-display font-black uppercase tracking-tighter">
                {isLoading ? 'Searching...' : `${data?.total || 0} Products Found`}
              </h2>
            </header>
            
            <ProductGrid 
              products={data?.products || []} 
              isLoading={isLoading} 
            />

            {/* Simple Pagination */}
            {data && data.total > filters.limit! && (
              <div className="flex justify-center gap-4 pt-12">
                <Button 
                  variant="outline" 
                  disabled={filters.page === 1}
                  onClick={() => setFilters({ ...filters, page: filters.page! - 1 })}
                >
                  Previous
                </Button>
                <div className="flex items-center text-xs font-bold uppercase tracking-widest px-4">
                  Page {filters.page} of {Math.ceil(data.total / filters.limit!)}
                </div>
                <Button 
                  variant="outline"
                  disabled={filters.page! * filters.limit! >= data.total}
                  onClick={() => setFilters({ ...filters, page: filters.page! + 1 })}
                >
                  Next
                </Button>
              </div>
            )}
          </Stack>
        </main>
      </div>
    </Container>
  );
};

export default CatalogPage;
