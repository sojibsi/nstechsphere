'use client';

import React, { createContext, useContext, useEffect, useState, useMemo } from 'react';
import { Language, Theme, Cart, CartItem, Product, ProductVariant, WebsiteSettings } from '@/types';
import { translations } from '@/lib/i18n/translations';

interface Toast {
  id: string;
  message: string;
  type?: 'success' | 'error' | 'info';
}

interface AppContextType {
  language: Language;
  setLanguage: (lang: Language) => void;
  theme: Theme;
  setTheme: (theme: Theme) => void;
  toggleTheme: () => void;
  t: (typeof translations)['en'] | (typeof translations)['bn'];
  cart: Cart;
  addToCart: (product: Product, quantity?: number, variant?: ProductVariant) => void;
  removeFromCart: (cartItemId: string) => void;
  updateQuantity: (cartItemId: string, quantity: number) => void;
  clearCart: () => void;
  applyCoupon: (code: string) => Promise<{ success: boolean; message: string }>;
  removeCoupon: () => void;
  wishlist: string[];
  toggleWishlist: (productId: string) => void;
  isCartDrawerOpen: boolean;
  setIsCartDrawerOpen: (open: boolean) => void;
  isSearchOpen: boolean;
  setIsSearchOpen: (open: boolean) => void;
  isSettingsOpen: boolean;
  setIsSettingsOpen: (open: boolean) => void;
  settings: WebsiteSettings;
  updateSettingsState: (settings: WebsiteSettings) => void;
  toasts: Toast[];
  showToast: (message: string, type?: 'success' | 'error' | 'info') => void;
  deliveryZone: 'inside_dhaka' | 'outside_dhaka';
  setDeliveryZone: (zone: 'inside_dhaka' | 'outside_dhaka') => void;
}

const defaultSettings: WebsiteSettings = {
  general: {
    brand_name: 'Gadget & Gear',
    tagline: 'Premium Electronics & Smart Technology',
    email: 'support@gadgetgear.com.bd',
    phone: '+880 9612 000 000',
    whatsapp: '+8801711223344',
    address: 'Bashundhara City, Dhaka, Bangladesh',
    currency: 'BDT',
    currency_symbol: '৳',
  },
  shipping: {
    inside_dhaka_fee: 60,
    outside_dhaka_fee: 120,
    free_shipping_threshold: 25000,
  },
  payment: {
    cod_enabled: true,
    bkash_enabled: false,
    nagad_enabled: false,
    sslcommerz_enabled: false,
  },
  social: {
    facebook: 'https://facebook.com/gadgetandgearbd',
    instagram: 'https://instagram.com/gadgetandgearbd',
    youtube: 'https://youtube.com/@gadgetandgearbd',
  },
};

const AppContext = createContext<AppContextType | undefined>(undefined);

export function AppProvider({ children }: { children: React.ReactNode }) {
  const [language, setLanguageState] = useState<Language>('en');
  const [theme, setThemeState] = useState<Theme>('light');
  const [cartItems, setCartItems] = useState<CartItem[]>([]);
  const [couponCode, setCouponCode] = useState<string | undefined>(undefined);
  const [couponDiscount, setCouponDiscount] = useState<number>(0);
  const [deliveryZone, setDeliveryZone] = useState<'inside_dhaka' | 'outside_dhaka'>('inside_dhaka');
  const [wishlist, setWishlist] = useState<string[]>([]);
  const [isCartDrawerOpen, setIsCartDrawerOpen] = useState(false);
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const [isSettingsOpen, setIsSettingsOpen] = useState(false);
  const [settings, setSettings] = useState<WebsiteSettings>(defaultSettings);
  const [toasts, setToasts] = useState<Toast[]>([]);

  // Load persisted client preferences safely
  useEffect(() => {
    // 1. Language
    const savedLang = localStorage.getItem('gng_lang') as Language;
    if (savedLang === 'en' || savedLang === 'bn') {
      setLanguageState(savedLang);
    }

    // 2. Theme
    const savedTheme = localStorage.getItem('gng_theme') as Theme;
    if (savedTheme === 'light' || savedTheme === 'dark') {
      setThemeState(savedTheme);
      document.documentElement.classList.toggle('dark', savedTheme === 'dark');
    } else if (window.matchMedia('(prefers-color-scheme: dark)').matches) {
      setThemeState('dark');
      document.documentElement.classList.add('dark');
    }

    // 3. Cart
    try {
      const savedCart = localStorage.getItem('gng_cart');
      if (savedCart) {
        setCartItems(JSON.parse(savedCart));
      }
    } catch (e) {
      console.error('Failed to load cart from storage', e);
    }

    // 4. Wishlist
    try {
      const savedWishlist = localStorage.getItem('gng_wishlist');
      if (savedWishlist) {
        setWishlist(JSON.parse(savedWishlist));
      }
    } catch (e) {
      console.error('Failed to load wishlist', e);
    }

    // 5. Fetch dynamic settings
    fetch('/api/settings')
      .then((res) => (res.ok ? res.json() : null))
      .then((data) => {
        if (data) setSettings(data);
      })
      .catch(() => {});
  }, []);

  const setLanguage = (lang: Language) => {
    setLanguageState(lang);
    localStorage.setItem('gng_lang', lang);
    document.cookie = `gng_lang=${lang}; path=/; max-age=31536000`;
  };

  const setTheme = (newTheme: Theme) => {
    setThemeState(newTheme);
    localStorage.setItem('gng_theme', newTheme);
    document.cookie = `gng_theme=${newTheme}; path=/; max-age=31536000`;
    document.documentElement.classList.toggle('dark', newTheme === 'dark');
  };

  const toggleTheme = () => {
    setTheme(theme === 'light' ? 'dark' : 'light');
  };

  const showToast = (message: string, type: 'success' | 'error' | 'info' = 'success') => {
    const id = `${Date.now()}-${Math.random().toString(36).substr(2, 4)}`;
    setToasts((prev) => [...prev, { id, message, type }]);
    setTimeout(() => {
      setToasts((prev) => prev.filter((t) => t.id !== id));
    }, 3500);
  };

  // Cart operations
  const addToCart = (product: Product, quantity = 1, variant?: ProductVariant) => {
    setCartItems((prev) => {
      const existingIdx = prev.findIndex(
        (i) => i.productId === product.id && i.variantId === (variant?.id || undefined)
      );

      const unitPrice = variant ? variant.price : (product.sale_price ?? product.regular_price);
      let updated: CartItem[];

      if (existingIdx > -1) {
        updated = [...prev];
        const newQty = updated[existingIdx].quantity + quantity;
        updated[existingIdx] = {
          ...updated[existingIdx],
          quantity: newQty,
          totalPrice: newQty * unitPrice,
        };
      } else {
        const newItem: CartItem = {
          id: `item-${Date.now()}-${Math.random().toString(36).substr(2, 4)}`,
          productId: product.id,
          variantId: variant?.id,
          product,
          variant,
          quantity,
          unitPrice,
          totalPrice: unitPrice * quantity,
        };
        updated = [...prev, newItem];
      }

      localStorage.setItem('gng_cart', JSON.stringify(updated));
      return updated;
    });

    const msg = language === 'bn' ? 'পণ্যটি কার্টে যোগ করা হয়েছে' : 'Added to cart';
    showToast(msg, 'success');
    setIsCartDrawerOpen(true);
  };

  const removeFromCart = (cartItemId: string) => {
    setCartItems((prev) => {
      const updated = prev.filter((i) => i.id !== cartItemId);
      localStorage.setItem('gng_cart', JSON.stringify(updated));
      return updated;
    });
  };

  const updateQuantity = (cartItemId: string, quantity: number) => {
    if (quantity <= 0) {
      removeFromCart(cartItemId);
      return;
    }

    setCartItems((prev) => {
      const updated = prev.map((item) => {
        if (item.id === cartItemId) {
          return {
            ...item,
            quantity,
            totalPrice: item.unitPrice * quantity,
          };
        }
        return item;
      });
      localStorage.setItem('gng_cart', JSON.stringify(updated));
      return updated;
    });
  };

  const clearCart = () => {
    setCartItems([]);
    setCouponCode(undefined);
    setCouponDiscount(0);
    localStorage.removeItem('gng_cart');
  };

  const applyCoupon = async (code: string) => {
    try {
      const res = await fetch('/api/coupons/validate', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ code, subtotal: cart.subtotal }),
      });
      const data = await res.json();
      if (res.ok && data.valid) {
        setCouponCode(code);
        setCouponDiscount(data.discount || 0);
        showToast(
          language === 'bn' ? 'কুপন সফলভাবে প্রয়োগ করা হয়েছে' : 'Coupon applied successfully',
          'success'
        );
        return { success: true, message: data.message };
      } else {
        showToast(data.message || 'Invalid coupon', 'error');
        return { success: false, message: data.message || 'Invalid coupon' };
      }
    } catch {
      showToast('Failed to validate coupon', 'error');
      return { success: false, message: 'Server validation error' };
    }
  };

  const removeCoupon = () => {
    setCouponCode(undefined);
    setCouponDiscount(0);
  };

  const toggleWishlist = (productId: string) => {
    setWishlist((prev) => {
      const exists = prev.includes(productId);
      const updated = exists ? prev.filter((id) => id !== productId) : [...prev, productId];
      localStorage.setItem('gng_wishlist', JSON.stringify(updated));
      const msg = exists
        ? language === 'bn'
          ? 'উইশলিস্ট থেকে সরানো হয়েছে'
          : 'Removed from wishlist'
        : language === 'bn'
        ? 'উইশলিস্টে যুক্ত করা হয়েছে'
        : 'Added to wishlist';
      showToast(msg, 'info');
      return updated;
    });
  };

  const updateSettingsState = (newSettings: WebsiteSettings) => {
    setSettings(newSettings);
  };

  const cart: Cart = useMemo(() => {
    const subtotal = cartItems.reduce((acc, item) => acc + item.totalPrice, 0);
    const shippingCharge =
      cartItems.length === 0
        ? 0
        : deliveryZone === 'inside_dhaka'
        ? settings.shipping.inside_dhaka_fee
        : settings.shipping.outside_dhaka_fee;
    const grandTotal = Math.max(0, subtotal - couponDiscount + shippingCharge);

    return {
      items: cartItems,
      subtotal,
      shippingCharge,
      discount: couponDiscount,
      couponCode,
      grandTotal,
    };
  }, [cartItems, deliveryZone, settings.shipping, couponDiscount, couponCode]);

  const t = translations[language];

  return (
    <AppContext.Provider
      value={{
        language,
        setLanguage,
        theme,
        setTheme,
        toggleTheme,
        t,
        cart,
        addToCart,
        removeFromCart,
        updateQuantity,
        clearCart,
        applyCoupon,
        removeCoupon,
        wishlist,
        toggleWishlist,
        isCartDrawerOpen,
        setIsCartDrawerOpen,
        isSearchOpen,
        setIsSearchOpen,
        isSettingsOpen,
        setIsSettingsOpen,
        settings,
        updateSettingsState,
        toasts,
        showToast,
        deliveryZone,
        setDeliveryZone,
      }}
    >
      {children}
    </AppContext.Provider>
  );
}

export function useApp() {
  const context = useContext(AppContext);
  if (!context) {
    throw new Error('useApp must be used within an AppProvider');
  }
  return context;
}
