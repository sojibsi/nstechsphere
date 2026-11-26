'use client';

import React, { useState, useEffect, Suspense } from 'react';
import { useSearchParams } from 'next/navigation';
import { Product, Category, Brand } from '@/types';
import { ProductCard } from '@/components/storefront/ProductCard';
import { useApp } from '@/lib/context/app-context';
import { Filter, SlidersHorizontal, X } from 'lucide-react';

function ProductsContent() {
  const searchParams = useSearchParams();
  const { t, language } = useApp();

  const [products, setProducts] = useState<Product[]>([]);
  const [categories, setCategories] = useState<Category[]>([]);
  const [brands, setBrands] = useState<Brand[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [isFilterDrawerOpen, setIsFilterDrawerOpen] = useState(false);

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
  const [searchQueryParam, setSearchQueryParam] = useState<string>(
    searchParams.get('q') || ''
  );
  const [isFeaturedOnly, setIsFeaturedOnly] = useState<boolean>(
    searchParams.get('featured') === 'true'
  );

  useEffect(() => {
    const cat = searchParams.get('category');
    if (cat !== null) setSelectedCategory(cat);
    const br = searchParams.get('brand');
    if (br !== null) setSelectedBrand(br);
    const q = searchParams.get('q');
    if (q !== null) setSearchQueryParam(q);
    const s = searchParams.get('sort');
    if (s !== null) setSortOption(s);
  }, [searchParams]);

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
    if (searchQueryParam.trim()) {
      const q = searchQueryParam.toLowerCase();
      const matchName =
        p.name.toLowerCase().includes(q) || (p.name_bn && p.name_bn.toLowerCase().includes(q));
      const matchBrand = p.brand?.name?.toLowerCase().includes(q);
      const matchCat = p.categories.some((c) => c.name.toLowerCase().includes(q));
      if (!matchName && !matchBrand && !matchCat) return false;
    }
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
    (selectedCategory ? 1 : 0) +
    (selectedBrand ? 1 : 0) +
    (isFeaturedOnly ? 1 : 0) +
    (searchQueryParam ? 1 : 0);

  const resetFilters = () => {
    setSelectedCategory('');
    setSelectedBrand('');
    setIsFeaturedOnly(false);
    setSearchQueryParam('');
  };

  const selectedCatObj = categories.find((c) => c.slug === selectedCategory);
  const selectedBrandObj = brands.find((b) => b.slug === selectedBrand);

  return (
    <div className="w-full px-3 sm:px-6 lg:px-8 xl:px-12 2xl:px-16 py-4 sm:py-6">
      {/* Compact Top Control Bar: Left = Filter Button & Active Pills; Right = Sort By */}
      <div className="flex items-center justify-between gap-3 pb-3 mb-4 sm:mb-6 border-b border-neutral-200/80 dark:border-neutral-800/80">
        {/* Left Side: Filter Button & Active Tags */}
        <div className="flex items-center gap-2 flex-wrap min-w-0">
          <button
            onClick={() => setIsFilterDrawerOpen(true)}
            className="flex items-center gap-2 px-3.5 py-1.5 rounded-full liquid-glass-btn text-xs font-bold text-foreground transition-all hover:scale-105 active:scale-95 shadow-sm"
          >
            <Filter className="w-3.5 h-3.5" />
            <span>{language === 'bn' ? 'ফিল্টার' : 'Filters'}</span>
            {activeFilterCount > 0 && (
              <span className="min-w-[18px] h-[18px] px-1 rounded-full bg-black text-white dark:bg-white dark:text-black text-[10px] font-black flex items-center justify-center">
                {activeFilterCount}
              </span>
            )}
          </button>

          {/* Quick Active Filter Badges */}
          {searchQueryParam && (
            <button
              onClick={() => setSearchQueryParam('')}
              className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-neutral-200/90 dark:bg-neutral-800 text-xs font-semibold text-foreground hover:bg-neutral-300 dark:hover:bg-neutral-700 transition-colors"
            >
              <span>"{searchQueryParam}"</span>
              <X className="w-3 h-3 opacity-60" />
            </button>
          )}

          {selectedCatObj && (
            <button
              onClick={() => setSelectedCategory('')}
              className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-neutral-200/90 dark:bg-neutral-800 text-xs font-semibold text-foreground hover:bg-neutral-300 dark:hover:bg-neutral-700 transition-colors"
            >
              <span>{language === 'bn' && selectedCatObj.name_bn ? selectedCatObj.name_bn : selectedCatObj.name}</span>
              <X className="w-3 h-3 opacity-60" />
            </button>
          )}

          {selectedBrandObj && (
            <button
              onClick={() => setSelectedBrand('')}
              className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-neutral-200/90 dark:bg-neutral-800 text-xs font-semibold text-foreground hover:bg-neutral-300 dark:hover:bg-neutral-700 transition-colors"
            >
              <span>{selectedBrandObj.name}</span>
              <X className="w-3 h-3 opacity-60" />
            </button>
          )}

          {activeFilterCount > 1 && (
            <button
              onClick={resetFilters}
              className="text-xs text-neutral-400 hover:text-foreground font-semibold underline ml-1"
            >
              {language === 'bn' ? 'মুছুন' : 'Clear all'}
            </button>
          )}

          <span className="hidden md:inline-block text-xs text-neutral-400 font-medium pl-1">
            • {sortedProducts.length} {language === 'bn' ? 'টি পণ্য' : 'products'}
          </span>
        </div>

        {/* Right Side: Sort By Selector */}
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

      {/* Slide-Out Left Filter Drawer Popup */}
      {isFilterDrawerOpen && (
        <>
          {/* Backdrop Overlay */}
          <div
            className="fixed inset-0 bg-black/50 backdrop-blur-xs z-50 animate-in fade-in duration-200"
            onClick={() => setIsFilterDrawerOpen(false)}
          />

          {/* Drawer Box (Slides out from left edge) */}
          <aside className="fixed inset-y-0 left-0 z-50 w-80 sm:w-96 max-w-[90vw] liquid-glass-elevated backdrop-blur-2xl border-r border-neutral-200 dark:border-neutral-800 shadow-2xl flex flex-col animate-in slide-in-from-left duration-200">
            {/* Drawer Header */}
            <div className="p-4 sm:p-5 border-b border-neutral-200 dark:border-neutral-800 flex items-center justify-between">
              <div className="flex items-center gap-2">
                <Filter className="w-4 h-4 text-foreground" />
                <h3 className="text-sm font-black uppercase tracking-wider text-foreground">
                  {language === 'bn' ? 'ফিল্টার সমূহ' : 'Filters'}
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
              {/* Categories Section */}
              <div>
                <h4 className="text-xs font-black uppercase tracking-wider text-neutral-400 mb-3">
                  {t.allCategories}
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
                      <span>{language === 'bn' && c.name_bn ? c.name_bn : c.name}</span>
                      {selectedCategory === c.slug && <span className="text-[10px]">✓</span>}
                    </button>
                  ))}
                </div>
              </div>

              {/* Brands Section */}
              <div>
                <h4 className="text-xs font-black uppercase tracking-wider text-neutral-400 mb-3">
                  {t.allBrands}
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

              {/* Featured Gadgets Toggle */}
              <div>
                <h4 className="text-xs font-black uppercase tracking-wider text-neutral-400 mb-3">
                  Special
                </h4>
                <button
                  onClick={() => setIsFeaturedOnly(!isFeaturedOnly)}
                  className={`w-full text-left px-3 py-2 rounded-xl text-xs font-bold transition-all flex items-center justify-between ${
                    isFeaturedOnly
                      ? 'bg-black text-white dark:bg-white dark:text-black shadow-sm'
                      : 'text-neutral-600 dark:text-neutral-300 hover:bg-neutral-100 dark:hover:bg-neutral-900'
                  }`}
                >
                  <span>Featured Gadgets Only</span>
                  {isFeaturedOnly && <span className="text-[10px]">✓</span>}
                </button>
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

      {/* Full-Display Products Grid (100% of Screen Width, Maximize Space) */}
      {isLoading ? (
        <div className="py-24 text-center">
          <div className="w-8 h-8 rounded-full border-2 border-neutral-300 border-t-black dark:border-t-white animate-spin mx-auto mb-3" />
          <p className="text-xs text-neutral-400 font-medium">Loading authentic gadgets...</p>
        </div>
      ) : sortedProducts.length === 0 ? (
        <div className="py-24 text-center max-w-sm mx-auto space-y-3">
          <p className="text-sm font-bold text-foreground">No gadgets match your filters</p>
          <p className="text-xs text-neutral-400">Try selecting a different category or clearing your search.</p>
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

export default function ProductsPage() {
  return (
    <Suspense
      fallback={
        <div className="py-24 text-center">
          <div className="w-8 h-8 rounded-full border-2 border-neutral-300 border-t-black dark:border-t-white animate-spin mx-auto" />
        </div>
      }
    >
      <ProductsContent />
    </Suspense>
  );
}
