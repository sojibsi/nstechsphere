import { db } from '@/lib/store/local-db';
import { ProductCard } from '@/components/storefront/ProductCard';
import { notFound } from 'next/navigation';
import Link from 'next/link';
import { ChevronRight } from 'lucide-react';

export default async function BrandPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const brand = db.getBrands().find((b) => b.slug === slug);

  if (!brand) {
    notFound();
  }

  const products = db.getProducts().filter((p) => p.brand?.slug === slug);

  return (
    <div className="w-full px-4 sm:px-6 lg:px-8 xl:px-12 2xl:px-16 py-8 space-y-8">
      {/* Breadcrumb */}
      <nav className="flex items-center gap-1.5 text-xs text-neutral-400">
        <Link href="/" className="hover:text-foreground">
          Home
        </Link>
        <ChevronRight className="w-3.5 h-3.5" />
        <Link href="/products" className="hover:text-foreground">
          Brands
        </Link>
        <ChevronRight className="w-3.5 h-3.5" />
        <span className="text-foreground font-medium">{brand.name}</span>
      </nav>

      {/* Brand Header */}
      <div className="rounded-3xl border border-neutral-200 dark:border-neutral-800 bg-neutral-100 dark:bg-neutral-900/60 p-6 sm:p-10">
        <h1 className="text-2xl sm:text-3xl font-black text-foreground uppercase tracking-wider">
          {brand.name}
        </h1>
        {brand.description && (
          <p className="text-xs sm:text-sm text-neutral-500 max-w-2xl mt-2 leading-relaxed">
            {brand.description}
          </p>
        )}
      </div>

      {/* Products Grid */}
      <div>
        <div className="flex items-center justify-between mb-6">
          <span className="text-xs font-semibold text-neutral-400">
            {products.length} Official Products
          </span>
        </div>

        {products.length === 0 ? (
          <div className="py-20 text-center text-sm text-neutral-400">
            No products available for this brand currently.
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 2xl:grid-cols-6 gap-6">
            {products.map((p) => (
              <ProductCard key={p.id} product={p} />
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
