import { useEffect } from 'react';
import { RouterProvider } from 'react-router-dom';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { router } from './router';
import { useAuthStore } from './store/authStore';
import { useCartStore } from './store/cartStore';
import { authService } from './services/authService';
import { orderService } from './services/orderService';

const queryClient = new QueryClient();

function App() {
  const { setUser, setLoading } = useAuthStore();

  useEffect(() => {
    const initSession = async () => {
      try {
        setLoading(true);
        const user = await authService.getMe();
        setUser(user);
      } catch {
        setUser(null);
      } finally {
        setLoading(false);
      }
    };

    initSession();
  }, [setUser, setLoading]);

  const { isAuthenticated } = useAuthStore();
  const { items } = useCartStore();

  useEffect(() => {
    if (isAuthenticated && items.length > 0) {
      orderService.syncCart(items).catch(console.error);
    }
  }, [isAuthenticated, items]);


  return (
    <QueryClientProvider client={queryClient}>
      <RouterProvider router={router} />
    </QueryClientProvider>
  );
}

export default App;
