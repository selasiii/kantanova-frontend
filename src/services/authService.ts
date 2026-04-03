import { api } from './api';
import type { User, UserRole } from '../store/authStore';

export interface LoginResponse {
  user: User;
  token?: string; // If not only cookie-based
}

export const authService = {
  login: async (credentials: any): Promise<LoginResponse> => {
    const { data } = await api.post('/auth/login', credentials);
    return data;
  },

  register: async (role: UserRole, details: any): Promise<LoginResponse> => {
    const endpoint = `/auth/register/${role.toLowerCase()}`;
    const { data } = await api.post(endpoint, details);
    return data;
  },

  logout: async (): Promise<void> => {
    await api.post('/auth/logout');
  },

  getMe: async (): Promise<User> => {
    const { data } = await api.get('/auth/me');
    return data;
  },

  updateProfile: async (profileData: any): Promise<User> => {
    const { data } = await api.patch('/auth/profile', profileData);
    return data;
  },
};

