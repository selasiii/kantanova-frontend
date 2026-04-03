import { api } from './api';
import type { Product } from './productService';

export interface VendorStats {
  totalEarnings: number;
  activeOrders: number;
  totalProducts: number;
  recentSales: { date: string; amount: number }[];
}

export const vendorService = {
  getStats: async (): Promise<VendorStats> => {
    const { data } = await api.get('/vendor/stats');
    return data;
  },

  getProducts: async (): Promise<Product[]> => {
    const { data } = await api.get('/vendor/products');
    return data;
  },

  createProduct: async (productData: any): Promise<Product> => {
    const { data } = await api.post('/vendor/products', productData);
    return data;
  },

  updateProduct: async (id: string, productData: any): Promise<Product> => {
    const { data } = await api.patch(`/vendor/products/${id}`, productData);
    return data;
  },

  deleteProduct: async (id: string): Promise<void> => {
    await api.delete(`/vendor/products/${id}`);
  },

  getOrders: async (): Promise<any[]> => {
    const { data } = await api.get('/vendor/orders');
    return data;
  },

  updateOrderStatus: async (orderId: string, status: 'DISPATCHED' | 'CANCELLED'): Promise<void> => {
    await api.patch(`/vendor/orders/${orderId}/status`, { status });
  },
};
