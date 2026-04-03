import { api } from './api';

export interface DeliveryTask {
  id: string;
  orderId: string;
  customerName: string;
  customerPhone: string;
  deliveryAddress: string;
  storeName: string;
  storeAddress: string;
  status: 'ASSIGNED' | 'PICKED_UP' | 'DELIVERED' | 'CANCELLED';
  earnings: number;
  createdAt: string;
}

export interface RiderStats {
  todayEarnings: number;
  totalDeliveries: number;
  rating: number;
  isOnline: boolean;
}

export const riderService = {
  getAvailableTasks: async (): Promise<DeliveryTask[]> => {
    const { data } = await api.get('/rider/tasks/available');
    return data;
  },

  getActiveTasks: async (): Promise<DeliveryTask[]> => {
    const { data } = await api.get('/rider/tasks/active');
    return data;
  },

  acceptTask: async (taskId: string): Promise<void> => {
    await api.post(`/rider/tasks/${taskId}/accept`);
  },

  pickUpTask: async (taskId: string): Promise<void> => {
    await api.post(`/rider/tasks/${taskId}/pickup`);
  },

  completeTask: async (taskId: string): Promise<void> => {
    await api.post(`/rider/tasks/${taskId}/complete`);
  },

  getStats: async (): Promise<RiderStats> => {
    const { data } = await api.get('/rider/stats');
    return data;
  },

  toggleStatus: async (isOnline: boolean): Promise<void> => {
    await api.patch('/rider/status', { isOnline });
  }
};
