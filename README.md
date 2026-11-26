# GADGET & GEAR — PREMIUM E-COMMERCE PLATFORM (BANGLADESH)

A high-performance, minimalist, production-ready full-stack eCommerce platform for premium gadgets, consumer electronics, smart wearables, studio audio, and photography gear.

---

## 1. System Overview

- **Target Market**: Bangladesh
- **Primary Currency**: Bangladeshi Taka (BDT, ৳)
- **Supported Languages**: English & Bengali (বাংলা) — dynamic runtime bilingual toggle with persisted preferences
- **Appearance**: Strict Black & White (#000000 & #FFFFFF with neutral grays) with Liquid Glass UI surfaces
- **Framework**: Next.js 15 (App Router), React 19, TypeScript
- **Styling**: Tailwind CSS with CSS Variables & Backdrop Blur Liquid Glass
- **Database Architecture**: PostgreSQL & Supabase (Migrations, Schema & Seed included)
- **Super Admin Panel Route**: Configurable (Default: `/control-room-x7k9`)

---

## 2. Key Features

### Storefront & Catalog
- **Dynamic Homepage**: Hero banner, Shop by Category, Curated Flagships, New Arrivals, Official Brand Showcase, Promotional Banners, and Newsletter subscription.
- **Dynamic Navigation**: Loaded from the database; Super Admin can create, modify, reorder, and remove links without touching code.
- **Real-time Product Search**: Instant modal search indexing product titles, Bengali titles, brands, SKUs, categories, and tags.
- **Product Details**: Multi-angle image gallery, dynamic variant selector (Storage, Color, Model) with automatic SKU/stock/pricing recalculation, live stock status, technical specifications table, official warranty details, and customer reviews.
- **Strict Black & White Design**: Pure white light mode and deep OLED black dark mode with subtle liquid glass backdrops on headers, drawers, and popovers.
- **Floating WhatsApp Support**: Direct link to configured support WhatsApp number (bottom-right fixed, zero AI clutter).

### Commerce, Cart & Checkout
- **Functional Shopping Cart**: Slide-out liquid-glass cart drawer and dedicated `/cart` page with quantity selectors and coupon validation.
- **Bangladesh-Focused Checkout**:
  - Guest checkout & registered customer checkout.
  - Delivery zones: **Inside Dhaka (৳60)** & **Outside Dhaka (৳120)** with automatic shipping calculation.
  - Fields: Full Name, Mobile Number, Division, District, Area/Thana, Full Street Address, Delivery Instructions.
  - Payment: Cash on Delivery (active out of the box), prepared architecture for bKash, Nagad, and SSLCommerz.
  - Server-side stock verification and unique order reference generation (`GG-YYYYMMDD-XXXX`).
- **Live Order Tracking**: Instant tracking timeline at `/track-order` for both guest and registered orders.
- **Customer Dashboard**: Overview, Order History with printable invoice preview, Saved Delivery Addresses, and Wishlist management.

### Super Admin Control Room (`/control-room-x7k9`)
1. **Dashboard Overview**: Real database metrics (Total Revenue in ৳, Total Orders, Pending Orders, Low Stock Alerts, Recent Orders queue).
2. **Product Catalog**: Add, Edit, Delete, Duplicate products, inline stock/price updates, and CSV export.
3. **Category Architecture**: Multi-level categories with Bengali titles, slugs, and image banners.
4. **Navigation Menus**: Dynamic header & mobile menu builder.
5. **Brands**: Manufacturer directory and official partner logos.
6. **Inventory & Warehouse**: Stock monitoring, stock adjustments with audit reason logging.
7. **Order Fulfillment**: Filter orders by status, change fulfillment (`pending` -> `confirmed` -> `processing` -> `shipped` -> `delivered`), update payment status, assign courier consignment numbers, and print invoices.
8. **Coupons & Promotions**: Create percentage or fixed-amount vouchers with minimum spend and maximum cap rules.
9. **Customer Reviews**: Moderation queue for customer feedback.
10. **Website CMS Pages**: Bilingual WYSIWYG editor for About Us, Shipping Policy, Return Policy, Terms, and Privacy Policy.
11. **Activity Logs**: Immutable server-side audit logs.
12. **Website Settings**: Modify brand name, logo, WhatsApp number, support helpline, address, and delivery fees directly from the UI.

---

## 3. Technology Stack

| Layer | Technology |
|---|---|
| **Framework** | Next.js 15 (App Router) |
| **Language** | TypeScript 5.7 |
| **UI Library** | React 19 |
| **Styling** | Tailwind CSS 3.4 (with CSS Variables & Custom Glass Utilities) |
| **Icons** | Lucide React |
| **Validation** | Zod |
| **Database** | PostgreSQL & Supabase (RLS enabled) |
| **Testing** | Vitest 3.0 |

---

## 4. Getting Started

### Prerequisites
- Node.js v18.18+ or v20+ (tested on Node v26)
- npm or pnpm

### Installation
```bash
# 1. Install dependencies
npm install

# 2. Run test suites
npm test

# 3. Start development server
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) to view the storefront.

---

## 5. Super Admin Control Room Access

The administrative panel is hosted at a private, configurable route:
- **Default URL**: [http://localhost:3000/control-room-x7k9](http://localhost:3000/control-room-x7k9)
- **Configuration**: Set `NEXT_PUBLIC_ADMIN_ROUTE` in `.env.local` to change the path.
- **Initial Admin Setup Secret**: Defined in `.env.local` via `ADMIN_SETUP_SECRET`.

---

## 6. Database Setup & Supabase Migrations

The database schema and policies are fully defined in `supabase/`:

1. `supabase/migrations/20260101000000_init_schema.sql`: Complete PostgreSQL schema for products, variants, categories, brands, orders, items, menus, coupons, reviews, and logs.
2. `supabase/migrations/20260101000001_row_level_security.sql`: Zero-trust Row Level Security (RLS) policies protecting customer data and restricting administrative operations.
3. `supabase/seed.sql`: Rich authentic seed data tailored for Bangladesh electronics retail.

To apply migrations to your live Supabase project:
```bash
npx supabase db push
# or execute the SQL scripts directly in the Supabase Dashboard SQL Editor
```

---

## 7. External Integrations & Credentials

| Integration | Status | Credentials Required in Production |
|---|---|---|
| **PostgreSQL / Supabase** | Architecture & Local Engine Active | `NEXT_PUBLIC_SUPABASE_URL`, `NEXT_PUBLIC_SUPABASE_ANON_KEY`, `SUPABASE_SERVICE_ROLE_KEY` |
| **Cash on Delivery (COD)** | **Fully Operational Out of the Box** | None |
| **bKash Merchant Gateway** | Architecture Prepared | `BKASH_APP_KEY`, `BKASH_APP_SECRET`, `BKASH_USERNAME`, `BKASH_PASSWORD` |
| **Nagad Merchant Gateway** | Architecture Prepared | `NAGAD_MERCHANT_ID`, `NAGAD_PRIVATE_KEY` |
| **SSLCommerz Payment Gateway** | Architecture Prepared | `SSLCOMMERZ_STORE_ID`, `SSLCOMMERZ_STORE_PASSWORD` |
| **WhatsApp Direct Support** | **Fully Operational Out of the Box** | WhatsApp Phone Number (Configurable in Admin Settings) |

---

## 8. Running Automated Tests

```bash
npm test
```
Runs 9 comprehensive automated tests across utility functions, database engine, coupon validation caps, and order creation with stock deduction.
