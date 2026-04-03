# Technical Specification - Kantanova React Frontend

## 1. System Architecture
This application is a modern Single Page Application (SPA), built with **React** taking a mobile-first approach. It connects comprehensively to an existing Kantanova REST APIs (`/api/v1`). 

## 2. Technology Stack
- **Framework**: React 18+ (using Vite for lightweight, fast HMR).
- **Routing**: React Router v6 mapping role-based dashboards (Customer/Vendor/Rider/Admin).
- **State Management**: Redux Toolkit or Zustand for global stores (Cart, Authed User Context) combined with React Query (TanStack Query) for async server-state caching (e.g., polling payments, paginated product feeds).
- **Styling**: Vanilla CSS or Tailwind CSS ensuring modern, mobile-responsive layout.
- **API Client**: Axios (configured with interceptors for token refreshes).
- **Image Handling**: Cloudinary SDK (direct uploads).

## 3. Core Modules & Components

### 3.1 Network & Interceptor Layer
- An `axios` singleton with `withCredentials = true`.
- **401 Interceptor Response handler**: When an access token expires (15m limit), a background call to `POST /auth/refresh` grabs a new token and retries the origin request without losing user context.

### 3.2 State Machines
#### Order Status Tracker
Maintains strict mappings on the UI reflecting:
`PENDING -> PAID -> DISPATCHED -> EN_ROUTE -> DELIVERED -> COMPLETED`

#### Payment Poller
A hook (`usePaymentPoller`) executing a 5000ms `setInterval` against `GET /payments/verify/:reference`. Stops and reroutes on `SUCCESS`, handling errors appropriately on `FAILED`.

### 3.3 Folder Structure
```text
/src
  /assets        # Global styles, icons
  /components    # Reusable UI widgets
  /features      # Domain-specific components (auth, catalog, cart, orders)
  /hooks         # Reusable behaviors (e.g. usePaymentPoller, useAxiosWithRetry)
  /layouts       # Main wrappers (CustomerLayout, VendorDashboard, AdminPanel)
  /pages         # Routable entry elements
  /services      # Abstracted API calls
  /lib           # Utility functions (Cloudinary upload bindings)
```

## 4. Routing & Role-Based Access Control (RBAC)
Routes are segmented strictly by role inferred via the JWT's claims fetched repeatedly at `/auth/me` to rebuild the session. 
- *Public Routes*: `/`, `/login`, `/register/*`, `/products/*`
- *Customer*: `/cart`, `/checkout`, `/orders`, `/profile`
- *Vendor*: `/vendor/dashboard`, `/vendor/products`, `/vendor/orders`
- *Rider*: `/rider/dashboard`, `/rider/active-delivery`
- *Admin*: `/admin/users`, `/admin/orders`
Unauthorized attempts bounce safely back to the relative `/login` with an appended redirect path.

## 5. Third-party Integrations
- **Cloudinary**: Forms with file inputs process base64 chunks through Cloudinary's upload presets, yielding public URLs that finally hit the Kantanova endpoints.
- **Hubtel**: Checkout sequences defer finalization until the backend webhook resolves Hubtel's prompt on the user’s device successfully.

## 6. Error Handling
Global handlers parse backend error payloads ensuring clear toast notification mappings for codes (e.g., `400` map to forms errors, others to global toasts).
