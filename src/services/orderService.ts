import { api } from './api';

export interface OrderDetails {
  items: {
    productId: string;
    variantId?: string;
    quantity: number;
  }[];
  shippingAddress: {
    fullName: string;
    phone: string;
    city: string;
    address: string;
    notes?: string;
  };
  paymentMethod: 'HUBTEL' | 'PAYSTACK' | 'CASH_ON_DELIVERY';
}

export const orderService = {
  syncCart: async (items: any[]): Promise<void> => {
    await api.post('/orders/cart/sync', { items });
  },

  checkout: async (details: OrderDetails): Promise<{ orderId: string; paymentUrl?: string; reference: string }> => {
    const { data } = await api.post('/orders/checkout', details);
    return data;
  },

  verifyPayment: async (reference: string): Promise<{ status: 'PENDING' | 'SUCCESS' | 'FAILED' }> => {
    const { data } = await api.get(`/payments/verify/${reference}`);
    return data;
  },

  getOrders: async (): Promise<any[]> => {
    const { data } = await api.get('/orders');
    return data;
  },

  getOrder: async (id: string): Promise<any> => {
    const { data } = await api.get(`/orders/${id}`);
    return data;
  },

  confirmDelivery: async (id: string): Promise<void> => {
    await api.post(`/orders/${id}/confirm`);
  },

  cancelOrder: async (id: string): Promise<void> => {
    await api.post(`/orders/${id}/cancel`);
  },
};

