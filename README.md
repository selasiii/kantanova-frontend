# Kantamanto Noir (Kantanova Frontend)

Kantanova is a multi-sided e-commerce and logistics platform digitalizing Ghana's largest physical fashion market. This repository houses the React single-page application (SPA) serving four distinct users: Customers, Vendors, Riders, and Admins.

The visual identity embodies a **"Brutalist Luxury"** aesthetic integrating stark monochrome contrasts with an electric blue accent.

## 🚀 System Architecture & Implementation

Kantanova is a high-performance, multi-sided commerce engine. The implementation is divided into four operational pillars, all adhering to the **"Noir"** (Brutalist Luxury) design system:

### 1. Customer Experience (The Core Engine)
- **Status**: Operational
- **Highlights**: Zustand-based persistent cart, escrow-protected order tracking, and a high-contrast catalog with advanced filtering.

### 2. Vendor Storefront (Inventory & Fulfillment)
- **Status**: Operational
- **Highlights**: "Inventory Injection" CRUD system, real-time sales performance metrics, and a dedicated dispatch management hub.

### 3. Rider Logistics (Delivery Network)
- **Status**: Operational
- **Highlights**: Presence-based (Online/Offline) protocol, real-time delivery task feed, and mobile-optimized fulfillment workflows without GPS dependency.

### 4. Admin Command Center (Governance & Oversight)
- **Status**: Operational
- **Highlights**: Platform-wide KPI monitoring, identity lifecycle control (Suspend/Activate), and transactional audit trails.

## 🛠️ Technical Stack
- **Framework**: React 18 + Vite (TypeScript)
- **Styling**: Tailwind CSS v4 + Noir Design Tokens
- **State**: Zustand (Client) + TanStack Query (Server)
- **Security**: Role-based routing + Protected Security Contexts


## 📁 Repository Structure

```text
├── docs/                   # Contains complete architectural PRD, specs, tasks, and design-system guidelines
├── src/
│   ├── components/         # Reusable, brutalist presentation components (Buttons, Inputs, Cards)
│   ├── features/           # Domain-specific components (Auth, Catalog, Cart)
│   ├── hooks/              # Reusable React Query wrappers (e.g. useProducts, usePaymentPoller)
│   ├── layouts/            # Global page wrappers (CustomerLayout, AuthLayout, etc.)
│   ├── pages/              # Routable view components
│   ├── services/           # Axios singletons and generic utilities
│   ├── store/              # Zustand global client state
│   ├── App.tsx             # Context provider wrapper
│   └── router.tsx          # Configuration for role-based routes
├── tailwind.config.js      # Minimal aesthetic tokens (disabled for Tailwind v4, config is natively in index.css)
└── README.md
```

## 🛠️ Getting Started

### Prerequisites
Make sure you have [Node.js](https://nodejs.org/) installed on your machine.

### Installation
1. Clone the repository and navigate to the root directory.
2. Install the dependencies:
   ```bash
   npm install
   ```

### Running Locally
To spin up the fast Vite development server:
```bash
npm run dev
```
The application will usually mount on [http://localhost:5173/](http://localhost:5173/).

### Building for Production
To compile and bundle assets for production runs:
```bash
npm run build
```
This process inherently runs strict TypeScript type checking (`tsc -b`), ensuring the codebase stays solid.

## 🔗 Environment Variables
A `.env` config file may be necessary mapping remote endpoints based on the deployment target (e.g., `VITE_API_BASE_URL`).

***
_Internal design documentation resides precisely in the `./docs` directory._
