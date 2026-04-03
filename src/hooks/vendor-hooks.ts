import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { vendorService } from '../services/vendorService';

export const useVendorStats = () => {
  return useQuery({
    queryKey: ['vendor', 'stats'],
    queryFn: () => vendorService.getStats(),
  });
};

export const useVendorProducts = () => {
  return useQuery({
    queryKey: ['vendor', 'products'],
    queryFn: () => vendorService.getProducts(),
  });
};

export const useVendorOrders = () => {
  return useQuery({
    queryKey: ['vendor', 'orders'],
    queryFn: () => vendorService.getOrders(),
  });
};

export const useVendorActions = () => {
  const queryClient = useQueryClient();

  const createProduct = useMutation({
    mutationFn: vendorService.createProduct,
    onSuccess: () => queryClient.invalidateQueries({ queryKey: ['vendor', 'products'] }),
  });

  const updateProduct = useMutation({
    mutationFn: ({ id, data }: { id: string; data: Record<string, unknown> }) => vendorService.updateProduct(id, data as any),
    onSuccess: () => queryClient.invalidateQueries({ queryKey: ['vendor', 'products'] }),
  });

  const deleteProduct = useMutation({
    mutationFn: vendorService.deleteProduct,
    onSuccess: () => queryClient.invalidateQueries({ queryKey: ['vendor', 'products'] }),
  });

  const updateOrderStatus = useMutation({
    mutationFn: ({ id, status }: { id: string; status: string }) => vendorService.updateOrderStatus(id, status as any),
    onSuccess: () => queryClient.invalidateQueries({ queryKey: ['vendor', 'orders'] }),
  });

  return {
    createProduct,
    updateProduct,
    deleteProduct,
    updateOrderStatus
  };
};
