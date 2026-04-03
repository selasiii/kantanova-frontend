import React, { Suspense } from 'react';
import { createBrowserRouter, Navigate } from 'react-router-dom';
import { CustomerLayout } from './layouts/CustomerLayout';
import { ProtectedRoute } from './components/auth/ProtectedRoute';
import { useAuthStore } from './store/authStore';
import { useNavigate } from 'react-router-dom';
import { Button } from './components/ui';

// ----- Lazy-loaded pages (code-split by portal) -----

// Auth
const LoginPage = React.lazy(() => import('./pages/auth/LoginPage').then(m => ({ default: m.LoginPage })));
const RegisterPage = React.lazy(() => import('./pages/auth/RegisterPage').then(m => ({ default: m.RegisterPage })));

// Customer pages
const CatalogPage = React.lazy(() => import('./pages/CatalogPage'));
const ProductDetailsPage = React.lazy(() => import('./pages/ProductDetailsPage'));
const CheckoutPage = React.lazy(() => import('./pages/CheckoutPage'));
const OrderSuccessPage = React.lazy(() => import('./pages/OrderSuccessPage'));
const PlaygroundPage = React.lazy(() => import('./pages/PlaygroundPage'));
const ProfilePage = React.lazy(() => import('./pages/portal/ProfilePage'));
const OrdersPage = React.lazy(() => import('./pages/portal/OrdersPage'));
const OrderDetailPage = React.lazy(() => import('./pages/portal/OrderDetailPage'));

// Vendor portal
const VendorLayout = React.lazy(() => import('./layouts/VendorLayout'));
const VendorOverview = React.lazy(() => import('./pages/vendor/VendorOverview'));
const ProductInventory = React.lazy(() => import('./pages/vendor/ProductInventory'));
const VendorOrders = React.lazy(() => import('./pages/vendor/VendorOrders'));

// Rider portal
const RiderLayout = React.lazy(() => import('./layouts/RiderLayout'));
const RiderDashboard = React.lazy(() => import('./pages/rider/RiderDashboard'));
const DeliveryFeed = React.lazy(() => import('./pages/rider/DeliveryFeed'));
const ActiveDeliveries = React.lazy(() => import('./pages/rider/ActiveDeliveries'));

// Admin portal
const AdminLayout = React.lazy(() => import('./layouts/AdminLayout'));
const AdminDashboard = React.lazy(() => import('./pages/admin/AdminDashboard'));
const UserManagement = React.lazy(() => import('./pages/admin/UserManagement'));
const OrderOversight = React.lazy(() => import('./pages/admin/OrderOversight'));
const PlatformGovernance = React.lazy(() => import('./pages/admin/PlatformGovernance'));
const SystemLogs = React.lazy(() => import('./pages/admin/SystemLogs'));

// ----- Suspense fallback -----
const LazyFallback = () => (
  <div className="min-h-[60vh] flex items-center justify-center">
    <div className="animate-spin rounded-full h-10 w-10 border-b-2 border-noir-blue"></div>
  </div>
);

const Lazy = ({ children }: { children: React.ReactNode }) => (
  <Suspense fallback={<LazyFallback />}>{children}</Suspense>
);

// ----- Landing page (inline, always in main chunk) -----
const LandingPage = () => {
  const { isAuthenticated, user } = useAuthStore();
  const navigate = useNavigate();

  return (
    <div className="p-20 min-h-[50vh] flex flex-col items-center justify-center gap-8">
      <h1 className="text-5xl md:text-7xl font-black tracking-tighter text-center uppercase">
        WELCOME TO<br/>KANTANOVA
      </h1>
      <div className="flex gap-4">
        <Button variant="primary" size="lg" onClick={() => navigate('/catalog')}>EXPLORE CATALOG</Button>
        {isAuthenticated && user && (
          <Button variant="outline" size="lg" onClick={() => navigate('/profile')}>My Profile</Button>
        )}
      </div>
      {isAuthenticated && user && (
        <p className="font-display uppercase tracking-widest text-noir-black/60">Logged in as {user.role}</p>
      )}
    </div>
  );
};

// ----- Router -----
export const router = createBrowserRouter([
  {
    path: '/',
    element: <CustomerLayout />,
    children: [
      { index: true, element: <LandingPage /> },
      { path: 'catalog', element: <Lazy><CatalogPage /></Lazy> },
      { path: 'products/:id', element: <Lazy><ProductDetailsPage /></Lazy> },
      { 
        path: 'checkout', 
        element: (
          <ProtectedRoute>
            <Lazy><CheckoutPage /></Lazy>
          </ProtectedRoute>
        ) 
      },
      { path: 'orders/success', element: <Lazy><OrderSuccessPage /></Lazy> },
      { path: 'playground', element: <Lazy><PlaygroundPage /></Lazy> },
      { 
        path: 'profile', 
        element: (
          <ProtectedRoute>
            <Lazy><ProfilePage /></Lazy>
          </ProtectedRoute>
        ) 
      },
      { 
        path: 'profile/orders', 
        element: (
          <ProtectedRoute>
            <Lazy><OrdersPage /></Lazy>
          </ProtectedRoute>
        ) 
      },
      { 
        path: 'orders/:id', 
        element: (
          <ProtectedRoute>
            <Lazy><OrderDetailPage /></Lazy>
          </ProtectedRoute>
        ) 
      },
      { path: '*', element: <Navigate to="/" replace /> }
    ],
  },
  {
    path: '/vendor',
    element: (
      <ProtectedRoute allowedRoles={['VENDOR']}>
        <Lazy><VendorLayout /></Lazy>
      </ProtectedRoute>
    ),
    children: [
      { index: true, element: <Lazy><VendorOverview /></Lazy> },
      { path: 'products', element: <Lazy><ProductInventory /></Lazy> },
      { path: 'orders', element: <Lazy><VendorOrders /></Lazy> },
    ]
  },
  {
    path: '/rider',
    element: (
      <ProtectedRoute allowedRoles={['RIDER']}>
        <Lazy><RiderLayout /></Lazy>
      </ProtectedRoute>
    ),
    children: [
      { index: true, element: <Lazy><RiderDashboard /></Lazy> },
      { path: 'feed', element: <Lazy><DeliveryFeed /></Lazy> },
      { path: 'active', element: <Lazy><ActiveDeliveries /></Lazy> },
    ]
  },
  {
    path: '/admin',
    element: (
      <ProtectedRoute allowedRoles={['ADMIN']}>
        <Lazy><AdminLayout /></Lazy>
      </ProtectedRoute>
    ),
    children: [
      { index: true, element: <Lazy><AdminDashboard /></Lazy> },
      { path: 'users', element: <Lazy><UserManagement /></Lazy> },
      { path: 'orders', element: <Lazy><OrderOversight /></Lazy> },
      { path: 'governance', element: <Lazy><PlatformGovernance /></Lazy> },
      { path: 'logs', element: <Lazy><SystemLogs /></Lazy> },
    ]
  },
  {
    path: '/login',
    element: <Lazy><LoginPage /></Lazy>,
  },
  {
    path: '/register',
    element: <Lazy><RegisterPage /></Lazy>,
  }
]);
