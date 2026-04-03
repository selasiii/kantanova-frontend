import axios from 'axios';
import { useAuthStore } from '../store/authStore';

export const api = axios.create({
  baseURL: 'https://api.kantanova.com/api/v1',
  withCredentials: true,
});

api.interceptors.response.use(
  (response) => response,
  async (error) => {
    const originalRequest = error.config;
    
    if (error.response?.status === 401 && !originalRequest._retry) {
      originalRequest._retry = true;
      try {
         await axios.post('https://api.kantanova.com/api/v1/auth/refresh', {}, { withCredentials: true });
         return api(originalRequest);
      } catch (e) {
         // Reset auth state if refresh fails
         useAuthStore.getState().logout();
         return Promise.reject(e);
      }
    }
    
    // Also reset if it's a 401 and we already tried to retry
    if (error.response?.status === 401 && originalRequest._retry) {
      useAuthStore.getState().logout();
    }

    return Promise.reject(error);
  }
);
