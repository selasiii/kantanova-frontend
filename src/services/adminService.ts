import { api } from './api';

export interface SystemStats {
  totalRevenue: number;
  totalOrders: number;
  activeUsers: {
    customers: number;
    vendors: number;
    riders: number;
  };
  escrowBalance: number;
  recentLogs: { timestamp: string; action: string; user: string }[];
}

export interface AdminUser {
  id: string;
  name: string;
  email: string;
  role: 'CUSTOMER' | 'VENDOR' | 'RIDER' | 'ADMIN';
  status: 'ACTIVE' | 'SUSPENDED';
  createdAt: string;
}

export const adminService = {
  getSystemStats: async (): Promise<SystemStats> => {
    const { data } = await api.get('/admin/stats');
    return data;
  },

  getUsers: async (role?: string): Promise<AdminUser[]> => {
    const { data } = await api.get('/admin/users', { params: { role } });
    return data;
  },

  updateUserStatus: async (userId: string, status: 'ACTIVE' | 'SUSPENDED'): Promise<void> => {
    await api.patch(`/admin/users/${userId}/status`, { status });
  },

  getAllOrders: async (): Promise<any[]> => {
    const { data } = await api.get('/admin/orders');
    return data;
  },

  resolveOrder: async (orderId: string, resolution: string): Promise<void> => {
    await api.post(`/admin/orders/${orderId}/resolve`, { resolution });
  },

  getFinancials: async (): Promise<any> => {
    const { data } = await api.get('/admin/financials');
    return data;
  }
};
