import { useQuery } from '@tanstack/react-query';
import { orderService } from '../services/orderService';

export const useOrders = () => {
  return useQuery({
    queryKey: ['orders'],
    queryFn: () => orderService.getOrders(),
  });
};

export const useOrderDetails = (id: string) => {
  return useQuery({
    queryKey: ['orders', id],
    queryFn: () => orderService.getOrder(id),
    enabled: !!id,
    refetchInterval: (query) => {
      const status = query.state.data?.status;
      if (['PAID', 'DISPATCHED', 'EN_ROUTE'].includes(status)) return 10000;
      return false;
    }
  });
};

