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
  LayoutGrid,
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

  // WhatsApp URL formatter for mobile bottom nav
  const rawNumber = settings?.general?.whatsapp || '01642603236';
  let cleanWhatsApp = rawNumber.replace(/[^0-9]/g, '');
  if (cleanWhatsApp.startsWith('01') && cleanWhatsApp.length === 11) {
    cleanWhatsApp = `88${cleanWhatsApp}`;
  } else if (!cleanWhatsApp.startsWith('880') && cleanWhatsApp.startsWith('1')) {
    cleanWhatsApp = `880${cleanWhatsApp}`;
  }
  const mobileWhatsAppUrl = `https://wa.me/${cleanWhatsApp}?text=${encodeURIComponent(
    `Hello ${settings?.general?.brand_name || 'NS TechSphere'}, I would like to inquire about a product.`
  )}`;

  return (
    <>
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
          {/* 1. Brand Logo (Left on all screens) */}
          <div
            className={`shrink-0 transition-transform duration-300 origin-left ${
              isScrolled ? 'scale-90' : 'scale-100'
            }`}
          >
            <BrandLogo size="md" />
          </div>

          {/* 2. Middle Menus: Desktop (lg+) only */}
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

          {/* 3. Mobile Top-Right Search Bar (Only on mobile < md) */}
          <div
            className="relative block md:hidden flex-1 max-w-[210px] sm:max-w-xs ml-auto"
            ref={mobileSearchRef}
          >
            <form onSubmit={handleSearchSubmit} className="relative flex items-center w-full">
              <Search className="w-3.5 h-3.5 text-neutral-500 dark:text-neutral-800 absolute left-3 pointer-events-none shrink-0" />
              <input
                ref={mobileInputRef}
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
                    mobileInputRef.current?.focus();
                  }}
                  aria-label="Clear search"
                  className="absolute right-2 p-0.5 text-neutral-600 dark:text-neutral-800 hover:text-black rounded-full"
                >
                  <X className="w-3 h-3" />
                </button>
              )}
            </form>

            {/* Mobile Live Dropdown */}
            {isSearchFocused && (
              <div className="fixed inset-x-3 top-[58px] sm:top-[66px] rounded-2xl liquid-glass-elevated border border-neutral-200 dark:border-neutral-800 shadow-2xl z-50 animate-in fade-in zoom-in-95 duration-150 max-h-[70vh] overflow-y-auto no-scrollbar">
                {renderSearchDropdown()}
              </div>
            )}
          </div>

          {/* 4. Global Actions (Desktop / Tablet md+): Search, Wishlist, Cart, Profile */}
          <div className="hidden md:flex items-center gap-1.5 sm:gap-2.5 shrink-0">
            {/* Integrated Inline Search Bar (Desktop md+ only) */}
            <div className="relative" ref={desktopSearchRef}>
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

            {/* Tablet Menu Hamburger Button (md to lg) */}
            <button
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              aria-label="Toggle Navigation Menu"
              className="p-2 sm:p-2.5 rounded-full liquid-glass-btn text-neutral-700 dark:text-neutral-300 lg:hidden"
            >
              {isMobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
            </button>
          </div>
        </div>

        {/* Mobile Drawer Menu (Slides down when Menu is tapped) */}
        {isMobileMenuOpen && (
          <>
            <div
              className="fixed inset-0 bg-black/40 backdrop-blur-sm z-30 lg:hidden"
              onClick={() => setIsMobileMenuOpen(false)}
            />
            <div className="relative z-30 lg:hidden border-t border-neutral-200 dark:border-neutral-800 liquid-glass-elevated px-4 py-3 space-y-2 animate-in fade-in slide-in-from-top-2 duration-150 max-h-[75vh] overflow-y-auto">
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
          </>
        )}
      </header>

      {/* Mobile Bottom Navigation Bar with Premium Light Liquid Glass & Rounded Top Corners */}
      <nav
        aria-label="Mobile Bottom Navigation"
        className="fixed bottom-0 left-0 right-0 z-40 block md:hidden bg-white/75 dark:bg-neutral-950/75 backdrop-blur-2xl rounded-t-[26px] border-t border-white/80 dark:border-neutral-800/80 shadow-[0_-8px_25px_rgba(0,0,0,0.06)] dark:shadow-[0_-8px_25px_rgba(0,0,0,0.4)] px-2 pt-1.5 pb-2 transition-all duration-300"
      >
        <div className="grid grid-cols-5 items-center justify-items-center max-w-md mx-auto">
          {/* 1. Menu Button */}
          <button
            type="button"
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            aria-label="Toggle Navigation Menu"
            className="flex flex-col items-center justify-center group w-full py-0.5 focus:outline-none"
          >
            <div
              className={`w-[34px] h-[34px] rounded-full flex items-center justify-center transition-all duration-200 ${
                isMobileMenuOpen
                  ? 'bg-black text-white dark:bg-white dark:text-black shadow-sm scale-105'
                  : 'bg-neutral-100/90 dark:bg-neutral-900/90 text-neutral-800 dark:text-neutral-200 border border-neutral-200/60 dark:border-neutral-800/80 hover:bg-neutral-200/80 dark:hover:bg-neutral-800/80'
              }`}
            >
              {isMobileMenuOpen ? <X className="w-4 h-4" /> : <Menu className="w-4 h-4" />}
            </div>
            <span className="text-[9px] font-bold text-neutral-600 dark:text-neutral-400 mt-1 tracking-tight transition-colors group-hover:text-foreground">
              {language === 'bn' ? 'মেনু' : 'Menu'}
            </span>
          </button>

          {/* 2. Shop / Catalog Link */}
          <Link
            href="/products"
            aria-label="Browse Shop"
            className="flex flex-col items-center justify-center group w-full py-0.5 focus:outline-none"
          >
            <div
              className={`w-[34px] h-[34px] rounded-full flex items-center justify-center transition-all duration-200 ${
                pathname === '/products'
                  ? 'bg-black text-white dark:bg-white dark:text-black shadow-sm scale-105'
                  : 'bg-neutral-100/90 dark:bg-neutral-900/90 text-neutral-800 dark:text-neutral-200 border border-neutral-200/60 dark:border-neutral-800/80 hover:bg-neutral-200/80 dark:hover:bg-neutral-800/80'
              }`}
            >
              <LayoutGrid className="w-4 h-4" />
            </div>
            <span className="text-[9px] font-bold text-neutral-600 dark:text-neutral-400 mt-1 tracking-tight transition-colors group-hover:text-foreground">
              {language === 'bn' ? 'শপ' : 'Shop'}
            </span>
          </Link>

          {/* 3. Cart Trigger */}
          <button
            type="button"
            onClick={() => setIsCartDrawerOpen(true)}
            aria-label="Shopping Cart"
            className="flex flex-col items-center justify-center group w-full py-0.5 focus:outline-none"
          >
            <div className="relative w-[34px] h-[34px] rounded-full flex items-center justify-center bg-neutral-100/90 dark:bg-neutral-900/90 text-neutral-800 dark:text-neutral-200 border border-neutral-200/60 dark:border-neutral-800/80 hover:bg-neutral-200/80 dark:hover:bg-neutral-800/80 transition-all duration-200 active:scale-95">
              <ShoppingBag className="w-4 h-4" />
              {cart.items.length > 0 && (
                <span className="absolute -top-1 -right-1 min-w-[15px] h-[15px] px-0.5 rounded-full bg-black text-white dark:bg-white dark:text-black text-[8.5px] font-black flex items-center justify-center shadow-sm">
                  {cart.items.reduce((sum, item) => sum + item.quantity, 0)}
                </span>
              )}
            </div>
            <span className="text-[9px] font-bold text-neutral-600 dark:text-neutral-400 mt-1 tracking-tight transition-colors group-hover:text-foreground">
              {language === 'bn' ? 'কার্ট' : 'Cart'}
            </span>
          </button>

          {/* 4. Wishlist Link */}
          <Link
            href="/account/wishlist"
            aria-label="Wishlist"
            className="flex flex-col items-center justify-center group w-full py-0.5 focus:outline-none"
          >
            <div
              className={`relative w-[34px] h-[34px] rounded-full flex items-center justify-center transition-all duration-200 ${
                pathname === '/account/wishlist'
                  ? 'bg-black text-white dark:bg-white dark:text-black shadow-sm scale-105'
                  : 'bg-neutral-100/90 dark:bg-neutral-900/90 text-neutral-800 dark:text-neutral-200 border border-neutral-200/60 dark:border-neutral-800/80 hover:bg-neutral-200/80 dark:hover:bg-neutral-800/80'
              }`}
            >
              <Heart className="w-4 h-4" />
              {wishlist.length > 0 && (
                <span className="absolute top-0.5 right-0.5 w-2 h-2 rounded-full bg-rose-500 ring-1.5 ring-white dark:ring-black" />
              )}
            </div>
            <span className="text-[9px] font-bold text-neutral-600 dark:text-neutral-400 mt-1 tracking-tight transition-colors group-hover:text-foreground">
              {language === 'bn' ? 'উইশলিস্ট' : 'Wishlist'}
            </span>
          </Link>

          {/* 5. WhatsApp Button */}
          <a
            href={mobileWhatsAppUrl}
            target="_blank"
            rel="noopener noreferrer"
            aria-label="Chat on WhatsApp (01642603236)"
            className="flex flex-col items-center justify-center group w-full py-0.5 focus:outline-none"
          >
            <div className="relative w-[34px] h-[34px] rounded-full flex items-center justify-center bg-[#25D366] text-white shadow-md whatsapp-glow hover:scale-110 active:scale-95 transition-transform duration-200">
              <svg
                viewBox="0 0 24 24"
                className="w-4.5 h-4.5 fill-current text-white"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path d="M.057 24l1.687-6.163c-1.041-1.804-1.588-3.849-1.587-5.946.003-6.556 5.338-11.891 11.893-11.891 3.181.001 6.167 1.24 8.413 3.488 2.245 2.248 3.481 5.236 3.48 8.414-.003 6.557-5.338 11.892-11.893 11.892-1.99-.001-3.951-.5-5.688-1.448l-6.305 1.654zm6.597-3.807c1.676.995 3.276 1.591 5.392 1.592 5.448 0 9.886-4.434 9.889-9.885.002-5.462-4.415-9.89-9.881-9.892-5.452 0-9.887 4.434-9.889 9.884-.001 2.225.651 3.891 1.746 5.634l-.999 3.648 3.742-.981zm11.387-5.464c-.074-.124-.272-.198-.57-.347-.297-.149-1.758-.868-2.031-.967-.272-.099-.47-.149-.669.149-.198.297-.768.967-.941 1.165-.173.198-.347.223-.644.074-.297-.149-1.255-.462-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.297-.347.446-.521.151-.172.2-.296.3-.495.099-.198.05-.372-.025-.521-.075-.148-.669-1.611-.916-2.206-.242-.579-.487-.501-.669-.51l-.57-.01c-.198 0-.52.074-.792.372s-1.04 1.016-1.04 2.479 1.065 2.876 1.213 3.074c.149.198 2.095 3.2 5.076 4.487.709.306 1.263.489 1.694.626.712.226 1.36.194 1.872.118.571-.085 1.758-.719 2.006-1.413.248-.695.248-1.29.173-1.414z" />
              </svg>
            </div>
            <span className="text-[9px] font-bold text-[#25D366] mt-1 tracking-tight">
              WhatsApp
            </span>
          </a>
        </div>
      </nav>
    </>
  );
}
