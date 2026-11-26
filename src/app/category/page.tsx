import { db } from '@/lib/store/local-db';
import Link from 'next/link';
import { ChevronRight, ArrowRight, Sparkles } from 'lucide-react';

export default function CategoriesIndexPage() {
  const categories = db.getCategories();

  return (
    <div className="w-full px-3 sm:px-6 lg:px-8 xl:px-12 2xl:px-16 py-6 sm:py-8 space-y-6 sm:space-y-8">
      {/* Breadcrumb */}
      <nav className="flex items-center gap-1.5 text-xs text-neutral-400">
        <Link href="/" className="hover:text-foreground">
          Home
        </Link>
        <ChevronRight className="w-3.5 h-3.5" />
        <span className="text-foreground font-medium">Categories</span>
      </nav>

      {/* Hero Banner */}
      <div className="rounded-2xl sm:rounded-3xl border border-neutral-200 dark:border-neutral-800 liquid-glass-elevated p-6 sm:p-10 relative overflow-hidden">
        <div className="max-w-xl space-y-2 relative z-10">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full border border-neutral-300 dark:border-neutral-700 bg-black/5 dark:bg-white/10 text-[10px] font-bold uppercase tracking-wider text-foreground">
            <Sparkles className="w-3.5 h-3.5" />
            <span>Product Catalog</span>
          </div>
          <h1 className="text-2xl sm:text-4xl font-black tracking-tight text-foreground">
            Explore All Categories
          </h1>
          <p className="text-xs sm:text-sm text-neutral-500 dark:text-neutral-400 leading-relaxed">
            Browse our complete selection of authentic gadgets, mobile accessories, audio, and smart home technology.
          </p>
        </div>
      </div>

      {/* Categories Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6">
        {categories.map((cat) => (
          <Link
            key={cat.id}
            href={`/products?category=${cat.slug}`}
            className="group rounded-2xl sm:rounded-3xl border border-neutral-200 dark:border-neutral-800 liquid-glass hover:border-black dark:hover:border-white transition-all duration-300 p-4 sm:p-5 flex flex-col justify-between overflow-hidden shadow-sm hover:shadow-xl"
          >
            <div className="space-y-3">
              <div className="relative aspect-video rounded-xl sm:rounded-2xl overflow-hidden bg-neutral-100 dark:bg-neutral-900 border border-neutral-200/60 dark:border-neutral-800">
                <img
                  src={cat.image_url || '/placeholder.png'}
                  alt={cat.name}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                />
              </div>

              <div>
                <h2 className="text-base sm:text-lg font-black text-foreground group-hover:underline">
                  {cat.name}
                </h2>
                {cat.name_bn && (
                  <p className="text-xs text-neutral-400 font-medium">{cat.name_bn}</p>
                )}
                {cat.description && (
                  <p className="text-xs text-neutral-500 dark:text-neutral-400 mt-1.5 line-clamp-2">
                    {cat.description}
                  </p>
                )}
              </div>
            </div>

            <div className="pt-4 mt-4 border-t border-neutral-100 dark:border-neutral-800 flex items-center justify-between text-xs font-bold text-foreground">
              <span>{cat.subcategories?.length ? `${cat.subcategories.length} Collections` : 'Explore'}</span>
              <span className="flex items-center gap-1 group-hover:translate-x-1 transition-transform">
                <span>View Products</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </span>
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
}
