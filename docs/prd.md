# Product Requirements Document (PRD) - Kantanova React Frontend

## 1. Product Overview
Kantanova is a multi-sided e-commerce and logistics platform digitalizing Ghana's largest physical fashion market. This product caters to three distinct users on a mobile-first platform.
The frontend will handle user onboarding, product browsing, the checkout flow, order tracking, and account management for all user roles.

## 2. Target Audience & User Roles
1. **Customer**: Browses products, adds items to cart, places orders, tracks deliveries via MoMo (Hubtel), leaves reviews, and confirms receipt.
2. **Vendor**: Registers (PENDING until Admin approval), lists products with variants, manages inventory, oversees orders, and requests withdrawals to MoMo.
3. **Rider**: Registers (PENDING until approved), sets availability, receives assigned orders, updates delivery statuses via GPS, and requests payouts.
4. **Admin**: Has full platform control to verify user accounts (vendors/riders), manages categories, oversees all orders, and manages dispute resolution or payouts.

## 3. Features & Requirements

### 3.1 Authentication & Registration Flow
- Separate registration forms for Customers, Vendors (requires shop details), and Riders (requires vehicle details).
- Authentication managed automatically via `httpOnly` cookies (JWT). Frontend must silently refresh the token via Axios interceptors on `401 Unauthorized`.

### 3.2 Customer Journey
- **Discovery**: Filter products by category, vendor, price, search queries, and sorting.
- **Product Page**: Select variants (size/color), view descriptions, check stock, and read reviews.
- **Cart & Checkout**: Multi-item cart capabilities. Express or Standard delivery options. Initiate MoMo checkout sequence (triggering Hubtel prompt on phone), while the frontend polls for success state every 5 seconds.
- **Post-Purchase**: Track statuses (PENDING, PAID, DISPATCHED, EN_ROUTE, DELIVERED, COMPLETED) and confirm delivery securely to release escrow funds.

### 3.3 Vendor Journey
- **Dashboard**: Track incoming orders and historical sales.
- **Product Management**: Ability to create products (with up to 5 Cloudinary-hosted images), define bases and variant prices, modify inventory levels.
- **Order Processing**: Transition assigned orders to `DISPATCHED` when packed and a Rider is assigned.
- **Payouts**: Visibility of Wallet balances and straightforward MoMo manual withdrawal initiation. 

### 3.4 Rider Journey
- **Status Toggling**: Real-time status shifts (AVAILABLE, OFFLINE, ON_DELIVERY).
- **Location Publishing**: Push GPS coordinates continuously during active drops.
- **Task Execution**: Update orders from `DISPATCHED` to `EN_ROUTE` and finally `DELIVERED`. View their wallet and request MoMo payouts.

### 3.5 Admin Operations Management
- **Verification Portal**: Vet and activate pending Vendors and Riders.
- **Catalog Control**: Add central categories. Suspend or manage accounts. 
- **Order Override**: Manual status overwrites and dispatch assignment capability connecting specific Riders to orders.

## 4. Technical Constraints
- The platform follows a mobile-first design philosophy.
- The web application must make cross-origin requests configured with `credentials: include` (or axios `withCredentials: true`) to `https://api.kantanova.com/api/v1`.
- Any image must be uploaded to Cloudinary on the client side, sending only the resulting URLs to the backend.
