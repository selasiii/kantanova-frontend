import { api } from './api';

export interface ProductVariant {
  id: string;
  name: string;
  additionalPrice: number;
  stock: number;
}

export interface Product {
  id: string;
  name: string;
  description: string;
  basePrice: number;
  category: string;
  images: string[];
  averageRating: number;
  reviewCount: number;
  variants: ProductVariant[];
  stockQuantity: number;
  featured?: boolean;
}

export interface ProductFilters {
  category?: string;
  search?: string;
  minPrice?: number;
  maxPrice?: number;
  page?: number;
  limit?: number;
  sort?: string;
}

export interface PaginatedProducts {
  products: Product[];
  total: number;
}

export const productService = {
  getProducts: async (filters?: ProductFilters): Promise<PaginatedProducts> => {
    const { data } = await api.get('/products', { params: filters });
    return data;
  },


  getProduct: async (id: string): Promise<Product> => {
    const { data } = await api.get(`/products/${id}`);
    return data;
  },

  getCategories: async (): Promise<string[]> => {
    const { data } = await api.get('/products/categories');
    return data;
  },
};
