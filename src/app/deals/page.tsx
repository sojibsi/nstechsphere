import { db } from '@/lib/store/local-db';
import { ProductCard } from '@/components/storefront/ProductCard';
import { Tag } from 'lucide-react';

export default function DealsPage() {
  // Products that have sale_price < regular_price
  const discountedProducts = db
    .getProducts()
    .filter((p) => p.sale_price && p.sale_price < p.regular_price);

  return (
    <div className="w-full px-4 sm:px-6 lg:px-8 xl:px-12 2xl:px-16 py-8 space-y-8">
      <div className="rounded-3xl border border-neutral-200 dark:border-neutral-800 bg-neutral-900 text-white p-8 sm:p-12 relative overflow-hidden">
        <div className="relative z-10 max-w-xl space-y-3">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full border border-neutral-700 bg-black/60 text-[10px] font-bold uppercase tracking-wider text-neutral-300">
            <Tag className="w-3.5 h-3.5" />
            <span>Limited Savings</span>
          </div>
          <h1 className="text-3xl sm:text-4xl font-black tracking-tight">
            Exclusive Deals & Discounts
          </h1>
          <p className="text-xs sm:text-sm text-neutral-400">
            Take advantage of special BDT discounts on certified authentic electronics, headphones, smart devices, and accessories.
          </p>
        </div>
      </div>

      <div>
        <div className="flex items-center justify-between mb-6">
          <span className="text-xs font-semibold text-neutral-400">
            {discountedProducts.length} Deals Active
          </span>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 2xl:grid-cols-6 gap-6">
          {discountedProducts.map((p) => (
            <ProductCard key={p.id} product={p} />
          ))}
        </div>
      </div>
    </div>
  );
}
