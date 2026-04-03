import React, { useState } from 'react';
import { 
  Stack, 
  Button, 
  Card, 
  CardHeader, 
  CardContent,
  Badge,
  toast,
  Input
} from '../../components/ui';
import { useVendorProducts, useVendorActions } from '../../hooks/vendor-hooks';
import { ProductEditor } from '../../components/vendor/ProductEditor';
import type { Product } from '../../services/productService';
import { Plus, Search, Edit3, Trash2, ExternalLink } from 'lucide-react';


const ProductInventory: React.FC = () => {
  const { data: products, isLoading } = useVendorProducts();
  const { deleteProduct } = useVendorActions();
  const [search, setSearch] = useState('');
  const [editingProduct, setEditingProduct] = useState<Product | null>(null);
  const [isAdding, setIsAdding] = useState(false);


  const filteredProducts = products?.filter(p => 
    p.name.toLowerCase().includes(search.toLowerCase()) || 
    p.category.toLowerCase().includes(search.toLowerCase())
  );

  const handleDelete = async (id: string) => {
    if (confirm('Are you sure you want to remove this product from the marketplace?')) {
      await deleteProduct.mutateAsync(id);
      toast({ title: 'Product Removed', variant: 'success' });
    }
  };

  if (isLoading) {
    return (
      <div className="h-[60vh] flex items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-noir-blue"></div>
      </div>
    );
  }

  return (
    <Stack spacing="xl">
      <header className="flex flex-col md:flex-row justify-between items-end gap-6">
        <div className="space-y-2">
          <h1 className="text-4xl font-display font-black uppercase tracking-tighter">Inventory</h1>
          <p className="text-noir-black/40 text-[11px] font-bold uppercase tracking-[0.3em]">Lifecycle management for your product catalog</p>
        </div>
        <Button size="lg" onClick={() => setIsAdding(true)}>
          <Plus className="w-5 h-5 mr-2" /> Inject New Item
        </Button>
      </header>

      <Card className="border-noir-border shadow-none rounded-none overflow-hidden">
        <CardHeader className="bg-noir-gray/30 border-b border-noir-border p-4">
          <div className="relative">
            <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-noir-black/20" />
            <Input 
              placeholder="FILTER INVENTORY BY NAME OR CATEGORY..." 
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="pl-12 h-12 border-none bg-transparent font-black uppercase text-[10px] tracking-widest placeholder:text-noir-black/10 focus-visible:ring-0"
            />
          </div>
        </CardHeader>
        <CardContent className="p-0">
          <div className="overflow-x-auto">
            <table className="w-full text-left">
              <thead>
                <tr className="bg-noir-black text-white text-[9px] font-black uppercase tracking-[0.3em]">
                  <th className="px-8 py-4">Structure</th>
                  <th className="px-8 py-4">Class</th>
                  <th className="px-8 py-4 text-right">Value</th>
                  <th className="px-8 py-4 text-right">Availability</th>
                  <th className="px-8 py-4">Health</th>
                  <th className="px-8 py-4">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-noir-border">
                {filteredProducts?.map((product) => (
                  <tr key={product.id} className="hover:bg-noir-gray/20 transition-colors group">
                    <td className="px-8 py-6">
                      <div className="flex items-center gap-4">
                        <div className="h-12 w-12 bg-noir-gray border border-noir-border shrink-0 grayscale group-hover:grayscale-0 transition-all">
                          <img src={product.images?.[0]} className="w-full h-full object-cover" />
                        </div>
                        <div>
                          <p className="font-display font-black uppercase text-[11px] tracking-tight">{product.name}</p>
                          <p className="text-[8px] font-bold uppercase tracking-widest text-noir-black/40 italic">#PID-{product.id.slice(-6)}</p>
                        </div>
                      </div>
                    </td>
                    <td className="px-8 py-6">
                      <Badge variant="outline" className="text-[9px]">{product.category}</Badge>
                    </td>
                    <td className="px-8 py-6 text-right font-display font-black text-xs">
                      GH₵ {product.basePrice.toLocaleString()}
                    </td>
                    <td className="px-8 py-6 text-right font-black text-[10px] tracking-widest">
                      {product.stockQuantity < 10 && <span className="text-red-500 mr-2">LOW</span>}
                      {product.stockQuantity} UNITS
                    </td>
                    <td className="px-8 py-6">
                      <Badge variant={product.stockQuantity > 0 ? "success" : "error"} className="text-[8px]">
                        {product.stockQuantity > 0 ? 'ACTIVE' : 'DEPLETED'}
                      </Badge>
                    </td>
                    <td className="px-8 py-6">
                      <div className="flex items-center gap-2">
                        <Button 
                          variant="ghost" 
                          size="sm" 
                          className="h-9 w-9 p-0 hover:bg-noir-black hover:text-white"
                          onClick={() => setEditingProduct(product)}
                        >
                          <Edit3 className="w-4 h-4" />
                        </Button>
                        <Button 
                          variant="ghost" 
                          size="sm" 
                          className="h-9 w-9 p-0 hover:bg-red-50 hover:text-red-600"
                          onClick={() => handleDelete(product.id)}
                        >
                          <Trash2 className="w-4 h-4" />
                        </Button>
                        <Button variant="ghost" size="sm" className="h-9 w-9 p-0 cursor-alias">
                          <ExternalLink className="w-4 h-4" />
                        </Button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </CardContent>
      </Card>

      <ProductEditor 
        isOpen={isAdding || !!editingProduct}
        product={editingProduct}
        onClose={() => {
          setIsAdding(false);
          setEditingProduct(null);
        }}
      />
    </Stack>
  );
};


export default ProductInventory;
