import { db } from '@/lib/store/local-db';
import { HeroBanner } from '@/components/storefront/HeroBanner';
import { CategoryGrid } from '@/components/storefront/CategoryGrid';
import { ProductCard } from '@/components/storefront/ProductCard';
import { BrandShowcase } from '@/components/storefront/BrandShowcase';
import Link from 'next/link';
import { ArrowRight } from 'lucide-react';

export default function HomePage() {
  const products = db.getProducts();
  const categories = db.getCategories();
  const brands = db.getBrands();

  const featured = products.filter((p) => p.is_featured);
  const newArrivals = products.slice(0, 4);

  return (
    <div className="space-y-4 pb-6">
      {/* 1. Hero Banner */}
      <HeroBanner />

      {/* 2. Shop by Category */}
      <CategoryGrid categories={categories} />

      {/* 3. Featured Flagships */}
      <section className="w-full px-4 sm:px-6 lg:px-8 xl:px-12 2xl:px-16">
        <div className="flex items-end justify-between mb-3">
          <div>
            <div className="text-xs font-bold uppercase tracking-wider text-neutral-400 mb-0.5">
              Curated Selection
            </div>
            <h2 className="text-xl sm:text-2xl font-black tracking-tight text-foreground">
              Featured Tech Gear
            </h2>
          </div>
          <Link
            href="/products?featured=true"
            className="text-xs sm:text-sm font-bold text-neutral-500 hover:text-foreground transition-colors flex items-center gap-1"
          >
            <span>See All Featured</span>
            <ArrowRight className="w-4 h-4" />
          </Link>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 2xl:grid-cols-6 gap-4 sm:gap-5">
          {featured.map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>
      </section>

      {/* 4. New Arrivals */}
      <section className="w-full px-4 sm:px-6 lg:px-8 xl:px-12 2xl:px-16">
        <div className="flex items-end justify-between mb-3">
          <div>
            <span className="text-xs font-bold uppercase tracking-wider text-neutral-400">
              Latest Additions
            </span>
            <h2 className="text-xl sm:text-2xl font-black tracking-tight text-foreground">
              New Arrivals
            </h2>
          </div>
          <Link
            href="/products?sort=latest"
            className="text-xs sm:text-sm font-bold text-neutral-500 hover:text-foreground transition-colors flex items-center gap-1"
          >
            <span>View All</span>
            <ArrowRight className="w-4 h-4" />
          </Link>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 2xl:grid-cols-6 gap-4 sm:gap-5">
          {newArrivals.map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>
      </section>

      {/* 5. Brand Showcase */}
      <BrandShowcase brands={brands} />

      {/* 6. Promotional BDT Savings Banner */}
      <section className="w-full px-4 sm:px-6 lg:px-8 xl:px-12 2xl:px-16">
        <div className="rounded-2xl p-5 sm:p-7 border border-neutral-200 dark:border-neutral-800 bg-neutral-100 dark:bg-neutral-900 flex flex-col md:flex-row items-center justify-between gap-4">
          <div className="space-y-1 text-center md:text-left">
            <h3 className="text-lg sm:text-xl md:text-2xl font-black text-foreground">
              Nationwide Express Delivery Across Bangladesh
            </h3>
            <p className="text-xs sm:text-sm text-neutral-500 max-w-2xl">
              24-48 Hours Express Delivery inside Dhaka (৳70) and Nationwide Courier Delivery (৳130). Official warranty with cash on delivery.
            </p>
          </div>
          <Link
            href="/products"
            className="px-6 py-3 rounded-full bg-black text-white dark:bg-white dark:text-black text-xs sm:text-sm font-bold uppercase tracking-wider shrink-0 hover:opacity-90 transition-smooth"
          >
            Order Now
          </Link>
        </div>
      </section>
    </div>
  );
}
