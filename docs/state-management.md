# State Management & Data Flow Architecture

## 1. Core Paradigm
The application divides state into two domains:
1. **Server State** (data sourced from Kantanova `/api/v1`). Managed via **TanStack Query (React Query)**.
2. **Client State** (UI toggles, sidebar open/close, shopping cart slide-out). Managed via **Zustand** (a lightweight alternative to Redux).

## 2. Server State (React Query)
React Query handles fetching, caching, deduplication, invalidation, and interval polling.

### Custom Hooks Map
- **Auth**: `useUserSession()` hits `GET /auth/me`. Cached globally so all components can access `user.role`.
- **Catalog**: `useProducts(filters)` hits `GET /catalog/products`. Uses query keys dependent on the filter object (`['products', { category: 'vintage', page: 1 }]`) for seamless pagination.
- **Cart/Orders**: `useCart()` queries `GET /orders/cart`. The `useAddToCart()` mutation automatically calls `queryClient.invalidateQueries({ queryKey: ['cart'] })` to refetch totals instantly upon success.
- **Payments**: `usePaymentPoller(referenceId)` uses `refetchInterval: 5000` to ping `GET /payments/verify/:reference`. It stops executing automatically when status evaluates to `SUCCESS` or `FAILED`.

### API Interceptor Layer (Axios)
A centralized Axios instance defined in `src/services/api.ts` manages credentials inherently:
- Requests send `withCredentials: true`.
- If an endpoint returns `401 Unauthorized`, a response interceptor catches it, pauses pending queries, POSTs to `/auth/refresh` to get a new `httpOnly` cookie, and then transparently retries the failed requests.

## 3. Client State (Zustand)
Global, non-secure UI state living transiently on the client.

```typescript
import { create } from 'zustand';

interface AppState {
   isMobileMenuOpen: boolean;
   toggleMobileMenu: () => void;
   
   // Tracking active overlays / modals (e.g., 'cart', 'quickview')
   activeOverlay: string | null;
   setActiveOverlay: (overlayId: string | null) => void;
}

export const useAppStore = create<AppState>((set) => ({
   isMobileMenuOpen: false,
   toggleMobileMenu: () => set((state) => ({ isMobileMenuOpen: !state.isMobileMenuOpen })),
   activeOverlay: null,
   setActiveOverlay: (id) => set({ activeOverlay: id }),
}));
```

*Security Note: Persistent tokens (JWT access/refresh) are strictly located in `httpOnly` cookies over HTTPS. The frontend JS context will never hold raw token strings, purely standardizing access via interceptors.*
