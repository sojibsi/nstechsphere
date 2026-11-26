'use client';

import React, { useState, useEffect, Suspense } from 'react';
import { useSearchParams } from 'next/navigation';
import { Product, Category, Brand } from '@/types';
import { ProductCard } from '@/components/storefront/ProductCard';
import { useApp } from '@/lib/context/app-context';
import { Filter, SlidersHorizontal, X } from 'lucide-react';

function ProductsContent() {
  const searchParams = useSearchParams();
  const { t } = useApp();

  const [products, setProducts] = useState<Product[]>([]);
  const [categories, setCategories] = useState<Category[]>([]);
  const [brands, setBrands] = useState<Brand[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [isMobileFilterOpen, setIsMobileFilterOpen] = useState(false);

  // Filters state
  const [selectedCategory, setSelectedCategory] = useState<string>(
    searchParams.get('category') || ''
  );
  const [selectedBrand, setSelectedBrand] = useState<string>(
    searchParams.get('brand') || ''
  );
  const [sortOption, setSortOption] = useState<string>(
    searchParams.get('sort') || 'latest'
  );
  const [isFeaturedOnly, setIsFeaturedOnly] = useState<boolean>(
    searchParams.get('featured') === 'true'
  );

  useEffect(() => {
    Promise.all([
      fetch('/api/products').then((r) => r.json()),
      fetch('/api/categories').then((r) => r.json()),
      fetch('/api/brands').then((r) => r.json()),
    ])
      .then(([prods, cats, brs]) => {
        setProducts(prods);
        setCategories(cats);
        setBrands(brs);
      })
      .finally(() => setIsLoading(false));
  }, []);

  const filteredProducts = products.filter((p) => {
    if (selectedCategory && !p.categories.some((c) => c.slug === selectedCategory)) {
      return false;
    }
    if (selectedBrand && p.brand?.slug !== selectedBrand) {
      return false;
    }
    if (isFeaturedOnly && !p.is_featured) {
      return false;
    }
    return true;
  });

  const sortedProducts = [...filteredProducts].sort((a, b) => {
    const priceA = a.sale_price ?? a.regular_price;
    const priceB = b.sale_price ?? b.regular_price;

    if (sortOption === 'price-asc') return priceA - priceB;
    if (sortOption === 'price-desc') return priceB - priceA;
    if (sortOption === 'best-selling') return (b.review_count || 0) - (a.review_count || 0);
    return new Date(b.created_at).getTime() - new Date(a.created_at).getTime();
  });

  const activeFilterCount =
    (selectedCategory ? 1 : 0) + (selectedBrand ? 1 : 0) + (isFeaturedOnly ? 1 : 0);

  const resetFilters = () => {
    setSelectedCategory('');
    setSelectedBrand('');
    setIsFeaturedOnly(false);
  };

  return (
    <div className="w-full px-3 sm:px-6 lg:px-8 xl:px-12 2xl:px-16 py-6 sm:py-8">
      {/* Page Title & Sort Controls */}
      <div className="flex flex-col md:flex-row md:items-center justify-between pb-4 sm:pb-6 mb-6 sm:mb-8 border-b border-neutral-200 dark:border-neutral-800 gap-3 sm:gap-4">
        <div>
          <h1 className="text-xl sm:text-2xl md:text-3xl font-extrabold tracking-tight text-foreground">
            All Products & Gear
          </h1>
          <p className="text-xs text-neutral-400 mt-0.5 sm:mt-1">
            Showing {sortedProducts.length} authentic tech devices
          </p>
        </div>

        <div className="flex items-center justify-between md:justify-end gap-2.5 sm:gap-3">
          {/* Mobile Filter Toggle Button */}
          <button
            onClick={() => setIsMobileFilterOpen(!isMobileFilterOpen)}
            className="lg:hidden flex items-center gap-1.5 px-3 py-1.5 rounded-xl border border-neutral-300 dark:border-neutral-700 bg-neutral-100 dark:bg-neutral-900 text-xs font-bold text-foreground"
          >
            <Filter className="w-3.5 h-3.5" />
            <span>Filters</span>
            {activeFilterCount > 0 && (
              <span className="w-4 h-4 rounded-full bg-black text-white dark:bg-white dark:text-black text-[10px] font-bold flex items-center justify-center">
                {activeFilterCount}
              </span>
            )}
          </button>

          {/* Sort selector */}
          <div className="flex items-center gap-2">
            <SlidersHorizontal className="w-3.5 h-3.5 text-neutral-400" />
            <span className="text-xs text-neutral-400 hidden sm:inline">{t.sortBy}:</span>
            <select
              value={sortOption}
              onChange={(e) => setSortOption(e.target.value)}
              className="text-xs bg-neutral-100 dark:bg-neutral-900 border border-neutral-200 dark:border-neutral-800 rounded-lg px-2.5 py-1.5 text-foreground outline-none cursor-pointer"
            >
              <option value="latest">{t.sortLatest}</option>
              <option value="price-asc">{t.sortPriceAsc}</option>
              <option value="price-desc">{t.sortPriceDesc}</option>
              <option value="best-selling">{t.sortBestSelling}</option>
            </select>
          </div>
        </div>
      </div>

      {/* Horizontal Scrollable Category Pills for Fast Mobile/Tablet Browsing */}
      <div className="lg:hidden flex items-center gap-2 overflow-x-auto no-scrollbar pb-3 mb-4 -mx-3 px-3">
        <button
          onClick={() => setSelectedCategory('')}
          className={`px-3 py-1.5 rounded-full text-xs font-bold whitespace-nowrap transition-colors shrink-0 ${
            !selectedCategory
              ? 'bg-black text-white dark:bg-white dark:text-black shadow-sm'
              : 'liquid-glass-btn text-neutral-600 dark:text-neutral-300'
          }`}
        >
          All
        </button>
        {categories.map((c) => (
          <button
            key={c.id}
            onClick={() => setSelectedCategory(selectedCategory === c.slug ? '' : c.slug)}
            className={`px-3 py-1.5 rounded-full text-xs font-bold whitespace-nowrap transition-colors shrink-0 ${
              selectedCategory === c.slug
                ? 'bg-black text-white dark:bg-white dark:text-black shadow-sm'
                : 'liquid-glass-btn text-neutral-600 dark:text-neutral-300'
            }`}
          >
            {c.name}
          </button>
        ))}
      </div>

      {/* Mobile Expandable Filter Sheet */}
      {isMobileFilterOpen && (
        <div className="lg:hidden mb-6 p-4 rounded-2xl border border-neutral-200 dark:border-neutral-800 liquid-glass-elevated space-y-4 animate-in fade-in duration-150">
          <div className="flex items-center justify-between pb-2 border-b border-neutral-200 dark:border-neutral-800">
            <span className="text-xs font-bold uppercase tracking-wider text-foreground flex items-center gap-1.5">
              <Filter className="w-3.5 h-3.5" />
              <span>Filters</span>
            </span>
            <div className="flex items-center gap-3">
              {activeFilterCount > 0 && (
                <button
                  onClick={resetFilters}
                  className="text-xs text-neutral-400 hover:text-foreground underline"
                >
                  {t.clearAll}
                </button>
              )}
              <button
                onClick={() => setIsMobileFilterOpen(false)}
                className="p-1 rounded-full text-neutral-400 hover:text-foreground"
              >
                <X className="w-4 h-4" />
              </button>
            </div>
          </div>

          {/* Brands Selection */}
          <div>
            <h4 className="text-xs font-bold text-neutral-500 uppercase tracking-wider mb-2">
              {t.allBrands}
            </h4>
            <div className="flex flex-wrap gap-1.5">
              <button
                onClick={() => setSelectedBrand('')}
                className={`px-2.5 py-1 rounded-lg text-xs font-medium transition-colors ${
                  !selectedBrand
                    ? 'bg-black text-white dark:bg-white dark:text-black font-semibold'
                    : 'bg-neutral-100 dark:bg-neutral-900 text-neutral-600 dark:text-neutral-400'
                }`}
              >
                All Brands
              </button>
              {brands.map((b) => (
                <button
                  key={b.id}
                  onClick={() => setSelectedBrand(selectedBrand === b.slug ? '' : b.slug)}
                  className={`px-2.5 py-1 rounded-lg text-xs font-medium transition-colors ${
                    selectedBrand === b.slug
                      ? 'bg-black text-white dark:bg-white dark:text-black font-semibold'
                      : 'bg-neutral-100 dark:bg-neutral-900 text-neutral-600 dark:text-neutral-400'
                  }`}
                >
                  {b.name}
                </button>
              ))}
            </div>
          </div>

          <button
            onClick={() => setIsMobileFilterOpen(false)}
            className="w-full py-2.5 rounded-xl bg-black text-white dark:bg-white dark:text-black text-xs font-bold uppercase tracking-wider"
          >
            Apply Filters
          </button>
        </div>
      )}

      <div className="grid grid-cols-1 lg:grid-cols-4 gap-6 lg:gap-8">
        {/* Left Filter Sidebar - Visible only on Desktop (lg+) */}
        <aside className="hidden lg:block space-y-6">
          <div className="p-5 rounded-2xl border border-neutral-200 dark:border-neutral-800 bg-white/50 dark:bg-neutral-950/40 space-y-6 sticky top-24">
            <div className="flex items-center justify-between pb-3 border-b border-neutral-200 dark:border-neutral-800">
              <span className="text-xs font-bold uppercase tracking-wider text-foreground flex items-center gap-2">
                <Filter className="w-3.5 h-3.5" />
                <span>Filters</span>
              </span>
              {activeFilterCount > 0 && (
                <button
                  onClick={resetFilters}
                  className="text-[11px] text-neutral-400 hover:text-foreground underline"
                >
                  {t.clearAll}
                </button>
              )}
            </div>

            {/* Categories */}
            <div>
              <h4 className="text-xs font-bold text-neutral-500 uppercase tracking-wider mb-2.5">
                {t.allCategories}
              </h4>
              <div className="space-y-1">
                <button
                  onClick={() => setSelectedCategory('')}
                  className={`w-full text-left px-2.5 py-1.5 rounded-lg text-xs font-medium transition-colors ${
                    !selectedCategory
                      ? 'bg-black text-white dark:bg-white dark:text-black font-semibold'
                      : 'text-neutral-500 hover:text-foreground'
                  }`}
                >
                  All Categories
                </button>
                {categories.map((c) => (
                  <button
                    key={c.id}
                    onClick={() => setSelectedCategory(c.slug)}
                    className={`w-full text-left px-2.5 py-1.5 rounded-lg text-xs font-medium transition-colors ${
                      selectedCategory === c.slug
                        ? 'bg-black text-white dark:bg-white dark:text-black font-semibold'
                        : 'text-neutral-500 hover:text-foreground'
                    }`}
                  >
                    {c.name}
                  </button>
                ))}
              </div>
            </div>

            {/* Brands */}
            <div>
              <h4 className="text-xs font-bold text-neutral-500 uppercase tracking-wider mb-2.5">
                {t.allBrands}
              </h4>
              <div className="space-y-1">
                <button
                  onClick={() => setSelectedBrand('')}
                  className={`w-full text-left px-2.5 py-1.5 rounded-lg text-xs font-medium transition-colors ${
                    !selectedBrand
                      ? 'bg-black text-white dark:bg-white dark:text-black font-semibold'
                      : 'text-neutral-500 hover:text-foreground'
                  }`}
                >
                  All Brands
                </button>
                {brands.map((b) => (
                  <button
                    key={b.id}
                    onClick={() => setSelectedBrand(b.slug)}
                    className={`w-full text-left px-2.5 py-1.5 rounded-lg text-xs font-medium transition-colors ${
                      selectedBrand === b.slug
                        ? 'bg-black text-white dark:bg-white dark:text-black font-semibold'
                        : 'text-neutral-500 hover:text-foreground'
                    }`}
                  >
                    {b.name}
                  </button>
                ))}
              </div>
            </div>
          </div>
        </aside>

        {/* Product Grid Area - 2 columns on mobile, 2 on sm, 3 on md, 4 on xl */}
        <main className="lg:col-span-3">
          {isLoading ? (
            <div className="py-24 text-center text-sm text-neutral-400">
              Loading authentic devices...
            </div>
          ) : sortedProducts.length === 0 ? (
            <div className="py-24 text-center space-y-3">
              <p className="text-sm text-neutral-500">{t.noProductsFound}</p>
              <button
                onClick={resetFilters}
                className="px-4 py-2 rounded-full border border-neutral-300 dark:border-neutral-700 text-xs font-semibold"
              >
                Reset Filters
              </button>
            </div>
          ) : (
            <div className="grid grid-cols-2 sm:grid-cols-2 md:grid-cols-3 xl:grid-cols-4 gap-2.5 sm:gap-4 md:gap-5">
              {sortedProducts.map((product) => (
                <ProductCard key={product.id} product={product} />
              ))}
            </div>
          )}
        </main>
      </div>
    </div>
  );
}

export default function ProductsPage() {
  return (
    <Suspense fallback={<div className="py-24 text-center text-xs text-neutral-400">Loading catalog...</div>}>
      <ProductsContent />
    </Suspense>
  );
}
