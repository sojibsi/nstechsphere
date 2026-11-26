'use client';

import React, { useState, useEffect, Suspense } from 'react';
import { Product, Category, Brand } from '@/types';
import { ProductCard } from '@/components/storefront/ProductCard';
import { useApp } from '@/lib/context/app-context';
import { Filter, SlidersHorizontal, X, Sparkles } from 'lucide-react';

function NewArrivalsContent() {
  const { t } = useApp();
  const [products, setProducts] = useState<Product[]>([]);
  const [categories, setCategories] = useState<Category[]>([]);
  const [brands, setBrands] = useState<Brand[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [isFilterDrawerOpen, setIsFilterDrawerOpen] = useState(false);

  // Filters state
  const [selectedCategory, setSelectedCategory] = useState<string>('');
  const [selectedBrand, setSelectedBrand] = useState<string>('');
  const [sortOption, setSortOption] = useState<string>('latest');

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

  const activeFilterCount = (selectedCategory ? 1 : 0) + (selectedBrand ? 1 : 0);

  const resetFilters = () => {
    setSelectedCategory('');
    setSelectedBrand('');
  };

  return (
    <div className="w-full px-3 sm:px-6 lg:px-8 xl:px-12 2xl:px-16 py-4 sm:py-6">
      {/* Compact Top Control Bar: Filter on Left, Sort on Right */}
      <div className="flex items-center justify-between gap-3 pb-3 mb-4 sm:mb-6 border-b border-neutral-200/80 dark:border-neutral-800/80">
        {/* Left: Filter Trigger Button */}
        <div className="flex items-center gap-2">
          <button
            onClick={() => setIsFilterDrawerOpen(true)}
            className="flex items-center gap-2 px-3.5 py-1.5 rounded-full liquid-glass-btn text-xs font-bold text-foreground transition-all hover:scale-105 active:scale-95"
          >
            <Filter className="w-3.5 h-3.5" />
            <span>Filters</span>
            {activeFilterCount > 0 && (
              <span className="min-w-[18px] h-[18px] px-1 rounded-full bg-black text-white dark:bg-white dark:text-black text-[10px] font-black flex items-center justify-center">
                {activeFilterCount}
              </span>
            )}
          </button>

          {/* Quick Active Filter Pill */}
          {selectedCategory && (
            <button
              onClick={() => setSelectedCategory('')}
              className="hidden sm:inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-neutral-200/80 dark:bg-neutral-800 text-xs font-semibold text-foreground hover:bg-neutral-300 dark:hover:bg-neutral-700 transition-colors"
            >
              <span>{categories.find((c) => c.slug === selectedCategory)?.name || selectedCategory}</span>
              <X className="w-3 h-3 opacity-60" />
            </button>
          )}

          <div className="hidden md:flex items-center gap-1.5 text-xs text-neutral-400 pl-2">
            <Sparkles className="w-3.5 h-3.5 text-amber-500" />
            <span className="font-semibold text-foreground">New Arrivals</span>
            <span>• {sortedProducts.length} devices</span>
          </div>
        </div>

        {/* Right: Sort By Dropdown */}
        <div className="flex items-center gap-2 shrink-0">
          <SlidersHorizontal className="w-3.5 h-3.5 text-neutral-400 hidden sm:block" />
          <span className="text-xs text-neutral-400 hidden sm:inline">{t.sortBy}:</span>
          <select
            value={sortOption}
            onChange={(e) => setSortOption(e.target.value)}
            className="text-xs bg-neutral-100 dark:bg-neutral-900 border border-neutral-200/80 dark:border-neutral-800 rounded-full px-3 py-1.5 text-foreground font-semibold outline-none cursor-pointer liquid-glass-btn"
          >
            <option value="latest">{t.sortLatest}</option>
            <option value="price-asc">{t.sortPriceAsc}</option>
            <option value="price-desc">{t.sortPriceDesc}</option>
            <option value="best-selling">{t.sortBestSelling}</option>
          </select>
        </div>
      </div>

      {/* Slide-Out Filter Drawer (From Left of Screen) */}
      {isFilterDrawerOpen && (
        <>
          <div
            className="fixed inset-0 bg-black/50 backdrop-blur-xs z-50 animate-in fade-in duration-200"
            onClick={() => setIsFilterDrawerOpen(false)}
          />
          <aside className="fixed inset-y-0 left-0 z-50 w-80 sm:w-96 max-w-[90vw] liquid-glass-elevated backdrop-blur-2xl border-r border-neutral-200 dark:border-neutral-800 shadow-2xl flex flex-col animate-in slide-in-from-left duration-200">
            {/* Drawer Header */}
            <div className="p-4 sm:p-5 border-b border-neutral-200 dark:border-neutral-800 flex items-center justify-between">
              <div className="flex items-center gap-2">
                <Filter className="w-4 h-4 text-foreground" />
                <h3 className="text-sm font-black uppercase tracking-wider text-foreground">
                  Filters
                </h3>
                {activeFilterCount > 0 && (
                  <span className="px-1.5 py-0.5 rounded-full bg-black text-white dark:bg-white dark:text-black text-[10px] font-black">
                    {activeFilterCount}
                  </span>
                )}
              </div>
              <div className="flex items-center gap-2">
                {activeFilterCount > 0 && (
                  <button
                    onClick={resetFilters}
                    className="text-xs text-neutral-400 hover:text-foreground font-semibold underline"
                  >
                    {t.clearAll}
                  </button>
                )}
                <button
                  onClick={() => setIsFilterDrawerOpen(false)}
                  className="p-1.5 rounded-full liquid-glass-btn text-neutral-500 hover:text-foreground"
                >
                  <X className="w-4 h-4" />
                </button>
              </div>
            </div>

            {/* Drawer Content */}
            <div className="flex-1 overflow-y-auto p-4 sm:p-5 space-y-6">
              {/* Categories */}
              <div>
                <h4 className="text-xs font-black uppercase tracking-wider text-neutral-400 mb-3">
                  Categories
                </h4>
                <div className="space-y-1">
                  <button
                    onClick={() => setSelectedCategory('')}
                    className={`w-full text-left px-3 py-2 rounded-xl text-xs font-bold transition-all ${
                      !selectedCategory
                        ? 'bg-black text-white dark:bg-white dark:text-black shadow-sm'
                        : 'text-neutral-600 dark:text-neutral-300 hover:bg-neutral-100 dark:hover:bg-neutral-900'
                    }`}
                  >
                    All Categories
                  </button>
                  {categories.map((c) => (
                    <button
                      key={c.id}
                      onClick={() => setSelectedCategory(selectedCategory === c.slug ? '' : c.slug)}
                      className={`w-full text-left px-3 py-2 rounded-xl text-xs font-bold transition-all flex items-center justify-between ${
                        selectedCategory === c.slug
                          ? 'bg-black text-white dark:bg-white dark:text-black shadow-sm'
                          : 'text-neutral-600 dark:text-neutral-300 hover:bg-neutral-100 dark:hover:bg-neutral-900'
                      }`}
                    >
                      <span>{c.name}</span>
                      {selectedCategory === c.slug && <span className="text-[10px]">✓</span>}
                    </button>
                  ))}
                </div>
              </div>

              {/* Brands */}
              <div>
                <h4 className="text-xs font-black uppercase tracking-wider text-neutral-400 mb-3">
                  Brands
                </h4>
                <div className="space-y-1">
                  <button
                    onClick={() => setSelectedBrand('')}
                    className={`w-full text-left px-3 py-2 rounded-xl text-xs font-bold transition-all ${
                      !selectedBrand
                        ? 'bg-black text-white dark:bg-white dark:text-black shadow-sm'
                        : 'text-neutral-600 dark:text-neutral-300 hover:bg-neutral-100 dark:hover:bg-neutral-900'
                    }`}
                  >
                    All Brands
                  </button>
                  {brands.map((b) => (
                    <button
                      key={b.id}
                      onClick={() => setSelectedBrand(selectedBrand === b.slug ? '' : b.slug)}
                      className={`w-full text-left px-3 py-2 rounded-xl text-xs font-bold transition-all flex items-center justify-between ${
                        selectedBrand === b.slug
                          ? 'bg-black text-white dark:bg-white dark:text-black shadow-sm'
                          : 'text-neutral-600 dark:text-neutral-300 hover:bg-neutral-100 dark:hover:bg-neutral-900'
                      }`}
                    >
                      <span>{b.name}</span>
                      {selectedBrand === b.slug && <span className="text-[10px]">✓</span>}
                    </button>
                  ))}
                </div>
              </div>
            </div>

            {/* Drawer Footer */}
            <div className="p-4 sm:p-5 border-t border-neutral-200 dark:border-neutral-800">
              <button
                onClick={() => setIsFilterDrawerOpen(false)}
                className="w-full py-3 rounded-2xl bg-black text-white dark:bg-white dark:text-black text-xs font-black uppercase tracking-wider shadow-lg hover:opacity-90 transition-opacity"
              >
                Show {sortedProducts.length} Products
              </button>
            </div>
          </aside>
        </>
      )}

      {/* Products Full Display Grid: 100% Screen Width */}
      {isLoading ? (
        <div className="py-24 text-center">
          <div className="w-8 h-8 rounded-full border-2 border-neutral-300 border-t-black dark:border-t-white animate-spin mx-auto mb-3" />
          <p className="text-xs text-neutral-400 font-medium">Loading new arrivals...</p>
        </div>
      ) : sortedProducts.length === 0 ? (
        <div className="py-24 text-center max-w-sm mx-auto space-y-3">
          <p className="text-sm font-bold text-foreground">No gadgets match your filters</p>
          <p className="text-xs text-neutral-400">Try resetting the category or brand filters.</p>
          <button
            onClick={resetFilters}
            className="px-4 py-2 rounded-xl bg-black text-white dark:bg-white dark:text-black text-xs font-bold"
          >
            Reset Filters
          </button>
        </div>
      ) : (
        <div className="grid grid-cols-2 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 2xl:grid-cols-6 gap-2.5 sm:gap-4 md:gap-5">
          {sortedProducts.map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>
      )}
    </div>
  );
}

export default function NewArrivalsPage() {
  return (
    <Suspense
      fallback={
        <div className="py-24 text-center">
          <div className="w-8 h-8 rounded-full border-2 border-neutral-300 border-t-black dark:border-t-white animate-spin mx-auto" />
        </div>
      }
    >
      <NewArrivalsContent />
    </Suspense>
  );
}
