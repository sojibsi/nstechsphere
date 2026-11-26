import { db } from '@/lib/store/local-db';
import { ProductCard } from '@/components/storefront/ProductCard';
import { notFound } from 'next/navigation';
import Link from 'next/link';
import { ChevronRight } from 'lucide-react';

export default async function CategoryPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const category = db.getCategoryBySlug(slug);

  if (!category) {
    notFound();
  }

  const products = db
    .getProducts()
    .filter((p) => p.categories.some((c) => c.slug === slug));

  return (
    <div className="w-full px-3 sm:px-6 lg:px-8 xl:px-12 2xl:px-16 py-6 sm:py-8 space-y-6 sm:space-y-8">
      {/* Breadcrumb */}
      <nav className="flex items-center gap-1.5 text-xs text-neutral-400">
        <Link href="/" className="hover:text-foreground">
          Home
        </Link>
        <ChevronRight className="w-3.5 h-3.5" />
        <Link href="/products" className="hover:text-foreground">
          Categories
        </Link>
        <ChevronRight className="w-3.5 h-3.5" />
        <span className="text-foreground font-medium">{category.name}</span>
      </nav>

      {/* Category Header */}
      <div className="rounded-2xl sm:rounded-3xl border border-neutral-200 dark:border-neutral-800 bg-neutral-100 dark:bg-neutral-900/60 p-5 sm:p-10">
        <h1 className="text-xl sm:text-3xl font-black text-foreground">
          {category.name}
        </h1>
        {category.name_bn && (
          <p className="text-xs sm:text-sm font-bengali text-neutral-500 mt-0.5">
            {category.name_bn}
          </p>
        )}
        {category.description && (
          <p className="text-xs sm:text-sm text-neutral-500 max-w-2xl mt-2 leading-relaxed">
            {category.description}
          </p>
        )}
      </div>

      {/* Products Grid */}
      <div>
        <div className="flex items-center justify-between mb-4 sm:mb-6">
          <span className="text-xs font-semibold text-neutral-400">
            {products.length} Products Available
          </span>
        </div>

        {products.length === 0 ? (
          <div className="py-20 text-center text-sm text-neutral-400">
            No products found in this category yet.
          </div>
        ) : (
          <div className="grid grid-cols-2 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 2xl:grid-cols-6 gap-2.5 sm:gap-4 md:gap-5">
            {products.map((p) => (
              <ProductCard key={p.id} product={p} />
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
