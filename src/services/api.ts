import axios from 'axios';

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
         // Return to login, prompt retry, etc.
         return Promise.reject(e);
      }
    }
    return Promise.reject(error);
  }
);
