import React, { useState, useEffect } from 'react';
import { 
  Dialog, 
  DialogContent, 
  DialogHeader, 
  DialogTitle, 
  Button, 
  Input, 
  toast
} from '../../components/ui';

import { useVendorActions } from '../../hooks/vendor-hooks';
import type { Product } from '../../services/productService';

interface ProductEditorProps {
  product?: Product | null;
  isOpen: boolean;
  onClose: () => void;
}

export const ProductEditor: React.FC<ProductEditorProps> = ({ product, isOpen, onClose }) => {
  const { createProduct, updateProduct } = useVendorActions();
  const [loading, setLoading] = useState(false);
  const [formData, setFormData] = useState({
    name: '',
    description: '',
    category: '',
    basePrice: 0,
    stockQuantity: 0,
    image: '',
  });

  useEffect(() => {
    if (product) {
      setFormData({
        name: product.name,
        description: product.description,
        category: product.category,
        basePrice: product.basePrice,
        stockQuantity: product.stockQuantity,
        image: product.images?.[0] || '',
      });
    } else {
      setFormData({
        name: '',
        description: '',
        category: '',
        basePrice: 0,
        stockQuantity: 0,
        image: '',
      });
    }
  }, [product, isOpen]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    try {
      if (product) {
        await updateProduct.mutateAsync({ id: product.id, data: formData });
        toast({ title: 'Product Updated', variant: 'success' });
      } else {
        await createProduct.mutateAsync(formData);
        toast({ title: 'Product Injected', description: 'Item is now live in catalog', variant: 'success' });
      }
      onClose();
    } catch {
      toast({ title: 'Operation Failed', variant: 'destructive' });
    } finally {
      setLoading(false);
    }
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent aria-describedby={undefined} className="max-w-xl bg-white border-4 border-noir-black rounded-none">
        <DialogHeader>
          <DialogTitle className="font-display font-black uppercase text-3xl tracking-tighter">
            {product ? 'Modify Entity' : 'Inventory Injection'}
          </DialogTitle>
        </DialogHeader>

        <form onSubmit={handleSubmit} className="space-y-8 py-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="md:col-span-2">
              <Input 
                label="Identifier (Name)" 
                value={formData.name} 
                onChange={e => setFormData({...formData, name: e.target.value})} 
                required 
              />
            </div>
            <div className="md:col-span-2">
              <Input 
                label="Descriptive Data" 
                value={formData.description} 
                onChange={e => setFormData({...formData, description: e.target.value})} 
                required 
              />
            </div>
            <Input 
              label="Taxonomy (Category)" 
              value={formData.category} 
              onChange={e => setFormData({...formData, category: e.target.value})} 
              required 
            />
            <Input 
              label="Assigned Image URL" 
              value={formData.image} 
              onChange={e => setFormData({...formData, image: e.target.value})} 
            />
            <Input 
              type="number" 
              label="Market Value (GH₵)" 
              value={formData.basePrice} 
              onChange={e => setFormData({...formData, basePrice: parseFloat(e.target.value)})} 
              required 
            />
            <Input 
              type="number" 
              label="Initial Units" 
              value={formData.stockQuantity} 
              onChange={e => setFormData({...formData, stockQuantity: parseInt(e.target.value)})} 
              required 
            />
          </div>

          <div className="flex gap-4 pt-6 border-t border-noir-border">
            <Button variant="outline" type="button" onClick={onClose} className="flex-grow h-14">Abort</Button>
            <Button type="submit" loading={loading} className="flex-grow h-14">Confirm Status</Button>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  );
};
