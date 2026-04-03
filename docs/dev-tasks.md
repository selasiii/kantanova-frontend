# Frontend Development Checklist

## Phase 1: Shared UI Component Library (Brutalist Aesthetic)
- [ ] Implement `Button` (Primary, Outline, Ghost)
- [ ] Implement `TextInput` and `Select` (Bottom-border only, error state)
- [ ] Implement `ProductCard` (Minimalist container, hover effects)
- [ ] Implement `Modal` and `SlideOver` (Cart/Menu glassmorphism overlays)
- [ ] Implement `TopNavigation` (Customer header)
- [ ] Implement `SidebarNavigation` (Dashboard wrappers)
- [ ] Implement generic `Toast` or use generic library for alerts

## Phase 2: Authentication & Session
- [ ] Create `useUserSession()` React Query Hook checking `GET /auth/me`
- [ ] Setup Axios `401` Interceptor to handle Refresh Logic implicitly
- [ ] Develop `/login` View (Universal)
- [ ] Develop `/register/customer` View
- [ ] Develop `/register/vendor` View (Includes Shop Name, MoMo Number)
- [ ] Develop `/register/rider` View (Includes Vehicle details)

## Phase 3: Catalog & Browsing
- [ ] Setup `useProducts()` Query with caching and pagination params
- [ ] Create **Landing Page** (Hero section, Top Categories, New Arrivals)
- [ ] Create **Product Feed Grid** (Filtering, Sorting capabilities)
- [ ] Develop **Product Detail Page** (Image Carousel, Variant Selectors, Add to Cart)

## Phase 4: Cart, Checkout & Payment
- [ ] Implement Zustand `useCartStore` for local cart management
- [ ] Develop **Slide-out Cart UI** (View items, Modify Quantity, Subtotal)
- [ ] Develop **Checkout Screen** (Capture Address, GPS Lat/Lng, Notes, Delivery Method)
- [ ] Engineer MoMo Integration: `POST /payments/initiate`
- [ ] Built **Processing/Polling View**: Auto-checks `GET /payments/verify` every 5 seconds until `SUCCESS`
- [ ] Design success confirmation screen

## Phase 5: Customer Portal
- [ ] Develop **Order History View**
- [ ] Develop **Order Tracking Detailing** (Status timeline)
- [ ] Implement `Confirm Receipt` action

## Phase 6: Vendor Dashboard
- [ ] Build **Vendor Overview** (Stats cards, active orders snapshot)
- [ ] Develop **Products List View** 
- [ ] Build **New Curation/Product Form** (Cloudinary Image Upload SDK integration)
- [ ] Develop **Orders Fulfillment View** (Marking orders `DISPATCHED`)
- [ ] Build **Payments & Withdrawals View**

## Phase 7: Rider Portal
- [ ] Develop **Rider Real-time View** (Toggle `AVAILABLE` / `OFFLINE`)
- [ ] Develop **Available Jobs Feed** (List `DISPATCHED` orders assigned to them)
- [ ] Build **Active Delivery Screen** (Map/GPS coordinate pushing interval)
- [ ] Enable transitioning orders `EN_ROUTE` -> `DELIVERED`
- [ ] Build **Wallet & Payout View**

## Phase 8: Admin Panel
- [ ] Create **Platform High-level Dashboard**
- [ ] Build **User Management** (Suspend/Activate views)
- [ ] Build **Verification Portal** (Approve Vendors / Riders from `PENDING`)
- [ ] Build **Global Orders Control**
