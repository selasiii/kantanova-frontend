import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { adminService } from '../services/adminService';

export const useSystemStats = () => {
  return useQuery({
    queryKey: ['admin', 'stats'],
    queryFn: () => adminService.getSystemStats(),
  });
};

export const useAdminUsers = (role?: string) => {
  return useQuery({
    queryKey: ['admin', 'users', role],
    queryFn: () => adminService.getUsers(role),
  });
};

export const useAllOrders = () => {
  return useQuery({
    queryKey: ['admin', 'orders'],
    queryFn: () => adminService.getAllOrders(),
  });
};

export const useAdminActions = () => {
  const queryClient = useQueryClient();

  const updateUserStatus = useMutation({
    mutationFn: ({ userId, status }: { userId: string; status: 'ACTIVE' | 'SUSPENDED' }) => 
      adminService.updateUserStatus(userId, status),
    onSuccess: () => queryClient.invalidateQueries({ queryKey: ['admin', 'users'] }),
  });

  const resolveOrder = useMutation({
    mutationFn: ({ orderId, resolution }: { orderId: string; resolution: string }) => 
      adminService.resolveOrder(orderId, resolution),
    onSuccess: () => queryClient.invalidateQueries({ queryKey: ['admin', 'orders'] }),
  });

  return {
    updateUserStatus,
    resolveOrder
  };
};
