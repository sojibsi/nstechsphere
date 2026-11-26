'use client';

import React, { useState, useRef, useEffect } from 'react';
import Link from 'next/link';
import { usePathname, useRouter } from 'next/navigation';
import { BrandLogo } from '@/components/ui/BrandLogo';
import { useApp } from '@/lib/context/app-context';
import { Product } from '@/types';
import { formatPrice } from '@/lib/utils';
import {
  Search,
  ShoppingBag,
  User,
  Sun,
  Moon,
  Globe,
  Heart,
  Package,
  Menu,
  X,
  ArrowRight,
} from 'lucide-react';

interface MenuItem {
  title: string;
  title_bn: string;
  url: string;
}

export function Header() {
  const {
    theme,
    toggleTheme,
    language,
    setLanguage,
    t,
    cart,
    wishlist,
    setIsCartDrawerOpen,
    settings,
  } = useApp();

  const pathname = usePathname();
  const router = useRouter();

  // Profile and Mobile Menu states
  const [isProfileOpen, setIsProfileOpen] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const profileRef = useRef<HTMLDivElement>(null);

  // Search States
  const [searchQuery, setSearchQuery] = useState('');
  const [isSearchFocused, setIsSearchFocused] = useState(false);
  const [searchResults, setSearchResults] = useState<Product[]>([]);
  const [suggestedProducts, setSuggestedProducts] = useState<Product[]>([]);
  const [isSearching, setIsSearching] = useState(false);

  const desktopSearchRef = useRef<HTMLDivElement>(null);
  const mobileSearchRef = useRef<HTMLDivElement>(null);
  const desktopInputRef = useRef<HTMLInputElement>(null);
  const mobileInputRef = useRef<HTMLInputElement>(null);

  const mainMenus: MenuItem[] = [
    { title: 'Home', title_bn: 'হোম', url: '/' },
    { title: 'Shop', title_bn: 'শপ', url: '/products' },
    { title: 'Categories', title_bn: 'ক্যাটাগরি', url: '/products#categories' },
    { title: 'New Arrivals', title_bn: 'নতুন গ্যাজেট', url: '/products?sort=latest' },
    { title: 'Best Sellers', title_bn: 'সেরা পণ্য', url: '/products?sort=best-selling' },
    { title: 'Deals & Offers', title_bn: 'অফার', url: '/deals' },
    { title: 'Contact Us', title_bn: 'যোগাযোগ', url: '/contact' },
  ];

  // Load initial suggested / top products for search preview
  useEffect(() => {
    fetch('/api/products')
      .then((res) => (res.ok ? res.json() : []))
      .then((data: Product[]) => {
        if (Array.isArray(data)) {
          const featured = data.filter((p) => p.is_featured).slice(0, 4);
          setSuggestedProducts(featured.length > 0 ? featured : data.slice(0, 4));
        }
      })
      .catch(() => {});
  }, []);

  // Debounced live search
  useEffect(() => {
    if (!searchQuery.trim()) {
      setSearchResults([]);
      setIsSearching(false);
      return;
    }

    setIsSearching(true);
    const timer = setTimeout(async () => {
      try {
        const res = await fetch(`/api/products?q=${encodeURIComponent(searchQuery.trim())}`);
        if (res.ok) {
          const data = await res.json();
          setSearchResults(Array.isArray(data) ? data.slice(0, 8) : []);
        }
      } catch (e) {
        console.error(e);
      } finally {
        setIsSearching(false);
      }
    }, 150);

    return () => clearTimeout(timer);
  }, [searchQuery]);

  // Close dropdowns when clicking outside
  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      const target = event.target as Node;
      if (profileRef.current && !profileRef.current.contains(target)) {
        setIsProfileOpen(false);
      }
      const inDesktop = desktopSearchRef.current?.contains(target);
      const inMobile = mobileSearchRef.current?.contains(target);
      if (!inDesktop && !inMobile) {
        setIsSearchFocused(false);
      }
    }
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  // Close menus on route change
  useEffect(() => {
    setIsMobileMenuOpen(false);
    setIsSearchFocused(false);
    setIsProfileOpen(false);
  }, [pathname]);

  // Window scroll listener for animated compact header
  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const handleSearchSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      setIsSearchFocused(false);
      router.push(`/products?q=${encodeURIComponent(searchQuery.trim())}`);
    }
  };

  // Reusable Search Dropdown Content
  const renderSearchDropdown = () => (
    <div className="p-3">
      {isSearching ? (
        <div className="py-8 text-center text-xs text-neutral-400 flex items-center justify-center gap-2">
          <div className="w-4 h-4 rounded-full border-2 border-neutral-400 border-t-black dark:border-t-white animate-spin" />
          <span>{language === 'bn' ? 'খোঁজা হচ্ছে...' : 'Searching catalog...'}</span>
        </div>
      ) : searchQuery.trim() ? (
        searchResults.length > 0 ? (
          <div>
            <div className="flex items-center justify-between px-2 py-1.5 text-[11px] font-bold text-neutral-400 uppercase tracking-wider border-b border-neutral-100 dark:border-neutral-800/80 mb-2">
              <span>
                {language === 'bn'
                  ? `ফলাফল (${searchResults.length})`
                  : `Products Found (${searchResults.length})`}
              </span>
              <span className="text-[10px] text-neutral-400">NS TechSphere</span>
            </div>
            <div className="space-y-1">
              {searchResults.map((product) => {
                const currentPrice = product.sale_price ?? product.regular_price;
                const hasDiscount =
                  product.sale_price && product.sale_price < product.regular_price;
                const displayName =
                  language === 'bn' ? product.name_bn || product.name : product.name;
                const img = product.images?.[0]?.image_url || '/placeholder.png';

                return (
                  <Link
                    key={product.id}
                    href={`/products/${product.slug}`}
                    onClick={() => setIsSearchFocused(false)}
                    className="flex items-center gap-3 p-2 rounded-xl hover:bg-neutral-100 dark:hover:bg-neutral-900 transition-colors group"
                  >
                    <div className="relative w-11 h-11 rounded-xl overflow-hidden bg-neutral-100 dark:bg-neutral-900 border border-neutral-200 dark:border-neutral-800 shrink-0">
                      <img
                        src={img}
                        alt={displayName}
                        className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                      />
                    </div>
                    <div className="flex-1 min-w-0">
                      <div className="text-xs font-bold text-foreground truncate group-hover:underline">
                        {displayName}
                      </div>
                      <div className="text-[10px] text-neutral-400 font-medium">
                        {product.brand?.name || 'Gadgets'} •{' '}
                        {product.categories?.[0]?.name || 'Tech'}
                      </div>
                    </div>
                    <div className="text-right shrink-0">
                      <div className="text-xs font-black text-foreground">
                        {formatPrice(currentPrice, settings.general.currency_symbol)}
                      </div>
                      {hasDiscount && (
                        <div className="text-[10px] text-neutral-400 line-through">
                          {formatPrice(product.regular_price, settings.general.currency_symbol)}
                        </div>
                      )}
                    </div>
                  </Link>
                );
              })}
            </div>

            <Link
              href={`/products?q=${encodeURIComponent(searchQuery.trim())}`}
              onClick={() => setIsSearchFocused(false)}
              className="mt-2.5 flex items-center justify-center gap-1.5 py-2 px-3 rounded-xl liquid-glass-btn text-xs font-bold text-foreground transition-colors"
            >
              <span>
                {language === 'bn'
                  ? `সবগুলো ${searchResults.length}টি ফলাফল দেখুন`
                  : `View all ${searchResults.length} results`}
              </span>
              <ArrowRight className="w-3.5 h-3.5" />
            </Link>
          </div>
        ) : (
          <div className="p-2 text-center">
            <p className="text-xs text-neutral-400 mb-3">
              {language === 'bn'
                ? `"${searchQuery}" এর জন্য কোনো পণ্য পাওয়া যায়নি।`
                : `No gadgets found for "${searchQuery}".`}
            </p>

            {suggestedProducts.length > 0 && (
              <div className="text-left border-t border-neutral-100 dark:border-neutral-800 pt-2.5">
                <div className="text-[10px] font-bold text-neutral-400 uppercase tracking-wider mb-2 px-1">
                  {language === 'bn' ? 'সাজেস্টেড পণ্যসমূহ' : 'Suggested Gadgets'}
                </div>
                <div className="space-y-1">
                  {suggestedProducts.map((product) => {
                    const currentPrice = product.sale_price ?? product.regular_price;
                    const displayName =
                      language === 'bn' ? product.name_bn || product.name : product.name;
                    const img = product.images?.[0]?.image_url || '/placeholder.png';

                    return (
                      <Link
                        key={product.id}
                        href={`/products/${product.slug}`}
                        onClick={() => setIsSearchFocused(false)}
                        className="flex items-center gap-3 p-2 rounded-xl hover:bg-neutral-100 dark:hover:bg-neutral-900 transition-colors group"
                      >
                        <div className="relative w-10 h-10 rounded-lg overflow-hidden bg-neutral-100 dark:bg-neutral-900 border border-neutral-200 dark:border-neutral-800 shrink-0">
                          <img
                            src={img}
                            alt={displayName}
                            className="w-full h-full object-cover group-hover:scale-105 transition-transform"
                          />
                        </div>
                        <div className="flex-1 min-w-0">
                          <div className="text-xs font-bold text-foreground truncate group-hover:underline">
                            {displayName}
                          </div>
                          <div className="text-[10px] text-neutral-400">
                            {product.brand?.name || 'Gadgets'}
                          </div>
                        </div>
                        <div className="text-xs font-black text-foreground shrink-0">
                          {formatPrice(currentPrice, settings.general.currency_symbol)}
                        </div>
                      </Link>
                    );
                  })}
                </div>
              </div>
            )}
          </div>
        )
      ) : (
        <div>
          <div className="mb-3">
            <div className="text-[10px] font-bold uppercase tracking-wider text-neutral-400 mb-2 px-1">
              {language === 'bn' ? 'জনপ্রিয় অনুসন্ধান' : 'Trending Searches'}
            </div>
            <div className="flex flex-wrap gap-1.5 px-1">
              {['Smart Watch', 'Earbuds', 'Power Bank', 'Headphones', 'Fast Charger'].map(
                (tag) => (
                  <button
                    key={tag}
                    type="button"
                    onClick={() => {
                      setSearchQuery(tag);
                      desktopInputRef.current?.focus();
                      mobileInputRef.current?.focus();
                    }}
                    className="px-2.5 py-1 rounded-full text-[11px] font-medium liquid-glass-btn text-neutral-700 dark:text-neutral-300 transition-colors"
                  >
                    {tag}
                  </button>
                )
              )}
            </div>
          </div>

          {suggestedProducts.length > 0 && (
            <div>
              <div className="flex items-center justify-between px-1 py-1.5 text-[10px] font-bold text-neutral-400 uppercase tracking-wider border-t border-neutral-100 dark:border-neutral-800/80 mb-1.5 mt-2">
                <span>
                  {language === 'bn'
                    ? 'প্রস্তাবিত গ্যাজেটসমূহ'
                    : 'Suggested Gadgets & Top Picks'}
                </span>
              </div>
              <div className="space-y-1">
                {suggestedProducts.map((product) => {
                  const currentPrice = product.sale_price ?? product.regular_price;
                  const displayName =
                    language === 'bn' ? product.name_bn || product.name : product.name;
                  const img = product.images?.[0]?.image_url || '/placeholder.png';

                  return (
                    <Link
                      key={product.id}
                      href={`/products/${product.slug}`}
                      onClick={() => setIsSearchFocused(false)}
                      className="flex items-center gap-3 p-2 rounded-xl hover:bg-neutral-100 dark:hover:bg-neutral-900 transition-colors group"
                    >
                      <div className="relative w-10 h-10 rounded-lg overflow-hidden bg-neutral-100 dark:bg-neutral-900 border border-neutral-200 dark:border-neutral-800 shrink-0">
                        <img
                          src={img}
                          alt={displayName}
                          className="w-full h-full object-cover group-hover:scale-105 transition-transform"
                        />
                      </div>
                      <div className="flex-1 min-w-0">
                        <div className="text-xs font-bold text-foreground truncate group-hover:underline">
                          {displayName}
                        </div>
                        <div className="text-[10px] text-neutral-400">
                          {product.brand?.name || 'Gadgets'}
                        </div>
                      </div>
                      <div className="text-xs font-black text-foreground shrink-0">
                        {formatPrice(currentPrice, settings.general.currency_symbol)}
                      </div>
                    </Link>
                  );
                })}
              </div>
            </div>
          )}
        </div>
      )}
    </div>
  );

  return (
    <header
      className={`sticky top-0 z-40 w-full transition-all duration-300 ${
        isScrolled
          ? 'liquid-glass-elevated border-b border-neutral-300 dark:border-neutral-800 shadow-md'
          : 'liquid-glass border-b border-neutral-200/80 dark:border-neutral-800/80'
      }`}
    >
      {/* Top Header Row */}
      <div
        className={`w-full px-3 sm:px-6 lg:px-8 xl:px-12 2xl:px-16 flex items-center justify-between gap-2 sm:gap-4 lg:gap-6 transition-all duration-300 ${
          isScrolled ? 'h-13 sm:h-14 py-1' : 'h-15 sm:h-20 py-2 sm:py-3'
        }`}
      >
        {/* 1. Brand Logo */}
        <div
          className={`shrink-0 transition-transform duration-300 origin-left ${
            isScrolled ? 'scale-90' : 'scale-100'
          }`}
        >
          <BrandLogo size="md" />
        </div>

        {/* 2. Middle Menus: Desktop only */}
        <nav className="hidden lg:flex items-center gap-1 xl:gap-2.5 2xl:gap-3 flex-1 justify-center min-w-0">
          {mainMenus.map((item) => {
            const isActive =
              item.url === '/' ? pathname === '/' : pathname.startsWith(item.url.split('?')[0]);
            const label = language === 'bn' ? item.title_bn : item.title;

            return (
              <Link
                key={item.url}
                href={item.url}
                className={`relative rounded-xl font-bold tracking-tight transition-all duration-200 whitespace-nowrap flex items-center gap-1.5 ${
                  isScrolled ? 'px-2.5 py-1 text-xs xl:text-xs' : 'px-3 py-1.5 text-xs xl:text-sm'
                } ${
                  isActive
                    ? 'liquid-glass-primary shadow-sm'
                    : 'text-neutral-700 dark:text-neutral-300 hover:text-foreground hover:bg-neutral-100 dark:hover:bg-neutral-900'
                }`}
              >
                <span>{label}</span>
              </Link>
            );
          })}
        </nav>

        {/* 3. Global Actions: Search (desktop), Wishlist, Cart, Profile, Hamburger */}
        <div className="flex items-center gap-1.5 sm:gap-2.5 shrink-0">
          {/* Integrated Inline Search Bar (Desktop md+ only) */}
          <div className="relative hidden md:block" ref={desktopSearchRef}>
            <form onSubmit={handleSearchSubmit} className="relative flex items-center">
              <div className="relative flex items-center w-36 lg:w-44 xl:w-52 focus-within:w-48 lg:focus-within:w-56 xl:focus-within:w-64 transition-all duration-300">
                <Search className="w-3.5 h-3.5 text-neutral-500 dark:text-neutral-800 absolute left-3 pointer-events-none shrink-0 transition-colors" />
                <input
                  ref={desktopInputRef}
                  type="text"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  onFocus={() => setIsSearchFocused(true)}
                  placeholder={language === 'bn' ? 'খুঁজুন...' : 'Search...'}
                  className="w-full text-xs pl-8 pr-7 py-1.5 rounded-full bg-neutral-200/90 text-black border border-neutral-300/80 dark:bg-white dark:text-black dark:border-white focus:border-black dark:focus:border-black focus:outline-none placeholder:text-neutral-500 dark:placeholder:text-neutral-500 font-medium transition-all shadow-sm"
                />
                {searchQuery && (
                  <button
                    type="button"
                    onClick={() => {
                      setSearchQuery('');
                      desktopInputRef.current?.focus();
                    }}
                    aria-label="Clear search"
                    className="absolute right-2 p-0.5 text-neutral-600 dark:text-neutral-800 hover:text-black rounded-full transition-colors"
                  >
                    <X className="w-3 h-3" />
                  </button>
                )}
              </div>
            </form>

            {/* Desktop Live Dropdown */}
            {isSearchFocused && (
              <div className="absolute right-0 top-full mt-2 w-[340px] md:w-[380px] rounded-2xl liquid-glass-elevated border border-neutral-200 dark:border-neutral-800 shadow-2xl z-50 animate-in fade-in zoom-in-95 duration-150 max-h-[75vh] overflow-y-auto no-scrollbar">
                {renderSearchDropdown()}
              </div>
            )}
          </div>

          {/* Wishlist Link */}
          <Link
            href="/account/wishlist"
            aria-label="Wishlist"
            className="relative p-2 sm:p-2.5 rounded-full liquid-glass-btn text-neutral-700 dark:text-neutral-300"
          >
            <Heart className="w-4 h-4 sm:w-5 sm:h-5" />
            {wishlist.length > 0 && (
              <span className="absolute top-1 right-1 w-2 h-2 rounded-full bg-black dark:bg-white ring-2 ring-background" />
            )}
          </Link>

          {/* Shopping Cart Drawer Trigger */}
          <button
            onClick={() => setIsCartDrawerOpen(true)}
            aria-label="Shopping Cart"
            className="relative p-2 sm:p-2.5 rounded-full liquid-glass-btn text-neutral-700 dark:text-neutral-300"
          >
            <ShoppingBag className="w-4 h-4 sm:w-5 sm:h-5" />
            {cart.items.length > 0 && (
              <span className="absolute -top-0.5 -right-0.5 min-w-[18px] sm:min-w-[20px] h-[18px] sm:h-[20px] px-1 rounded-full bg-black text-white dark:bg-white dark:text-black text-[10px] sm:text-[11px] font-black flex items-center justify-center">
                {cart.items.reduce((sum, item) => sum + item.quantity, 0)}
              </span>
            )}
          </button>

          {/* Profile Dropdown */}
          <div className="relative" ref={profileRef}>
            <button
              onClick={() => setIsProfileOpen(!isProfileOpen)}
              aria-label="Customer Profile"
              className="p-2 sm:p-2.5 rounded-full liquid-glass-btn text-neutral-700 dark:text-neutral-300"
            >
              <User className="w-4 h-4 sm:w-5 sm:h-5" />
            </button>

            {isProfileOpen && (
              <div className="absolute right-0 mt-2 w-56 rounded-2xl liquid-glass-elevated border border-neutral-200 dark:border-neutral-800 py-2.5 shadow-2xl animate-in fade-in zoom-in-95 duration-150 z-50">
                <Link
                  href="/account"
                  onClick={() => setIsProfileOpen(false)}
                  className="flex items-center gap-3 px-4 py-2.5 text-xs sm:text-sm font-semibold hover:bg-neutral-100 dark:hover:bg-neutral-900 transition-colors"
                >
                  <User className="w-4 h-4 text-neutral-400" />
                  <span>{t.myAccount}</span>
                </Link>
                <Link
                  href="/account/orders"
                  onClick={() => setIsProfileOpen(false)}
                  className="flex items-center gap-3 px-4 py-2.5 text-xs sm:text-sm font-semibold hover:bg-neutral-100 dark:hover:bg-neutral-900 transition-colors"
                >
                  <Package className="w-4 h-4 text-neutral-400" />
                  <span>{t.myOrders}</span>
                </Link>
                <Link
                  href="/account/wishlist"
                  onClick={() => setIsProfileOpen(false)}
                  className="flex items-center gap-3 px-4 py-2.5 text-xs sm:text-sm font-semibold hover:bg-neutral-100 dark:hover:bg-neutral-900 transition-colors"
                >
                  <Heart className="w-4 h-4 text-neutral-400" />
                  <span>
                    {t.wishlist} ({wishlist.length})
                  </span>
                </Link>
                <div className="my-1.5 border-t border-neutral-200 dark:border-neutral-800" />
                <div className="px-3 py-1 flex items-center justify-between gap-2">
                  <button
                    onClick={toggleTheme}
                    title={theme === 'dark' ? 'Switch to Light Mode' : 'Switch to Dark Mode'}
                    aria-label="Toggle Theme"
                    className="flex-1 flex items-center justify-center py-2 rounded-xl liquid-glass-btn text-neutral-700 dark:text-neutral-300"
                  >
                    {theme === 'dark' ? (
                      <Sun className="w-4 h-4 text-foreground" />
                    ) : (
                      <Moon className="w-4 h-4 text-neutral-700" />
                    )}
                  </button>
                  <button
                    onClick={() => setLanguage(language === 'en' ? 'bn' : 'en')}
                    title="Change Language"
                    aria-label="Toggle Language"
                    className="flex-1 flex items-center justify-center gap-1.5 py-2 rounded-xl liquid-glass-btn text-neutral-700 dark:text-neutral-300 text-xs font-bold"
                  >
                    <Globe className="w-3.5 h-3.5" />
                    <span>{language === 'en' ? 'বাংলা' : 'ENG'}</span>
                  </button>
                </div>
              </div>
            )}
          </div>

          {/* Mobile Menu Hamburger Button */}
          <button
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            aria-label="Toggle Mobile Menu"
            className="p-2 sm:p-2.5 rounded-full liquid-glass-btn text-neutral-700 dark:text-neutral-300 lg:hidden"
          >
            {isMobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
          </button>
        </div>
      </div>

      {/* Dedicated Full-Width Mobile Search Bar (Only on mobile < md) */}
      <div className="block md:hidden px-3.5 pb-2.5 pt-0.5" ref={mobileSearchRef}>
        <form onSubmit={handleSearchSubmit} className="relative flex items-center w-full">
          <Search className="w-3.5 h-3.5 text-neutral-500 dark:text-neutral-800 absolute left-3.5 pointer-events-none shrink-0" />
          <input
            ref={mobileInputRef}
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            onFocus={() => setIsSearchFocused(true)}
            placeholder={language === 'bn' ? 'গ্যাজেট ও এক্সেসরিজ খুঁজুন...' : 'Search gadgets & gear...'}
            className="w-full text-xs pl-9 pr-8 py-2 rounded-full bg-neutral-200/90 text-black border border-neutral-300/80 dark:bg-white dark:text-black dark:border-white focus:border-black dark:focus:border-black focus:outline-none placeholder:text-neutral-500 dark:placeholder:text-neutral-500 font-medium transition-all shadow-sm"
          />
          {searchQuery && (
            <button
              type="button"
              onClick={() => {
                setSearchQuery('');
                mobileInputRef.current?.focus();
              }}
              aria-label="Clear search"
              className="absolute right-2.5 p-0.5 text-neutral-600 dark:text-neutral-800 hover:text-black rounded-full"
            >
              <X className="w-3.5 h-3.5" />
            </button>
          )}
        </form>

        {/* Mobile Live Dropdown */}
        {isSearchFocused && (
          <div className="fixed inset-x-3 top-[108px] rounded-2xl liquid-glass-elevated border border-neutral-200 dark:border-neutral-800 shadow-2xl z-50 animate-in fade-in zoom-in-95 duration-150 max-h-[70vh] overflow-y-auto no-scrollbar">
            {renderSearchDropdown()}
          </div>
        )}
      </div>

      {/* Mobile Drawer Navigation with Navigation Links + Settings */}
      {isMobileMenuOpen && (
        <div className="lg:hidden border-t border-neutral-200 dark:border-neutral-800 liquid-glass-elevated px-4 py-3 space-y-2 animate-in fade-in slide-in-from-top-2 duration-150 max-h-[80vh] overflow-y-auto">
          <div className="space-y-1">
            {mainMenus.map((item) => {
              const isActive =
                item.url === '/' ? pathname === '/' : pathname.startsWith(item.url.split('?')[0]);
              const label = language === 'bn' ? item.title_bn : item.title;

              return (
                <Link
                  key={item.url}
                  href={item.url}
                  onClick={() => setIsMobileMenuOpen(false)}
                  className={`flex items-center justify-between px-3.5 py-2.5 rounded-xl text-xs sm:text-sm font-bold transition-colors ${
                    isActive
                      ? 'liquid-glass-primary shadow-sm'
                      : 'text-neutral-700 dark:text-neutral-300 hover:bg-neutral-100 dark:hover:bg-neutral-900'
                  }`}
                >
                  <span>{label}</span>
                  <ArrowRight className="w-3.5 h-3.5 opacity-60" />
                </Link>
              );
            })}
          </div>

          {/* Quick Account Links in Drawer */}
          <div className="pt-2 border-t border-neutral-200/80 dark:border-neutral-800/80 space-y-1">
            <Link
              href="/account"
              onClick={() => setIsMobileMenuOpen(false)}
              className="flex items-center gap-2.5 px-3.5 py-2 rounded-xl text-xs font-semibold text-neutral-600 dark:text-neutral-300 hover:bg-neutral-100 dark:hover:bg-neutral-900"
            >
              <User className="w-3.5 h-3.5" />
              <span>{t.myAccount}</span>
            </Link>
            <Link
              href="/account/orders"
              onClick={() => setIsMobileMenuOpen(false)}
              className="flex items-center gap-2.5 px-3.5 py-2 rounded-xl text-xs font-semibold text-neutral-600 dark:text-neutral-300 hover:bg-neutral-100 dark:hover:bg-neutral-900"
            >
              <Package className="w-3.5 h-3.5" />
              <span>{t.myOrders}</span>
            </Link>
          </div>

          {/* Quick Theme & Language in Drawer */}
          <div className="pt-2 border-t border-neutral-200/80 dark:border-neutral-800/80 flex items-center justify-between gap-2">
            <button
              onClick={toggleTheme}
              className="flex-1 flex items-center justify-center gap-2 py-2 rounded-xl liquid-glass-btn text-xs font-bold text-foreground"
            >
              {theme === 'dark' ? <Sun className="w-3.5 h-3.5" /> : <Moon className="w-3.5 h-3.5" />}
              <span>{theme === 'dark' ? 'Light Mode' : 'Dark Mode'}</span>
            </button>
            <button
              onClick={() => setLanguage(language === 'en' ? 'bn' : 'en')}
              className="flex-1 flex items-center justify-center gap-2 py-2 rounded-xl liquid-glass-btn text-xs font-bold text-foreground"
            >
              <Globe className="w-3.5 h-3.5" />
              <span>{language === 'en' ? 'বাংলা' : 'English'}</span>
            </button>
          </div>
        </div>
      )}
    </header>
  );
}
