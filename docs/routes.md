# Frontend Routes Structure

## Public Routes
- `/` - Landing Page (Browse Categories / Top Products)
- `/login` - Universal Login Page 
- `/register/customer` - Customer Signup 
- `/register/vendor` - Vendor Onboarding
- `/register/rider` - Rider Onboarding
- `/product/:id` - Product Detail Page with variants & reviews

## Customer (Authed) Routes
- `/cart` - Shopping Cart UI
- `/checkout` - Address Details & Hubtel Initiation
- `/checkout/processing` - Polling Page watching the MoMo transaction
- `/profile` - Customer Settings & Edit
- `/orders` - Customer Order History & Tracking

## Vendor (Authed) Routes
- `/vendor` - Vendor Dashboard (Summary, active orders)
- `/vendor/products` - Catalog Management List
- `/vendor/products/new` - Product Creation Form (w/ Cloudinary UI)
- `/vendor/payments` - Wallet Balance & Withdrawal Requests

## Rider (Authed) Routes
- `/rider` - Rider Dashboard (Toggle status, New Jobs)
- `/rider/delivery/:id` - Active Delivery GPS View
- `/rider/payments` - Rider Wallet & Payout

## Admin (Authed) Routes
- `/admin` - Overall Stat Dashboard
- `/admin/verifications` - Pending Vendors & Riders forms 
- `/admin/users` - All System Users
- `/admin/categories` - Global Catalog taxonomy management 
- `/admin/orders` - Comprehensive bird's-eye view of active orders
