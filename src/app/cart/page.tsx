'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { useApp } from '@/lib/context/app-context';
import { formatPrice } from '@/lib/utils';
import { Trash2, Plus, Minus, ArrowRight, ShoppingBag, Tag } from 'lucide-react';

export default function CartPage() {
  const {
    cart,
    removeFromCart,
    updateQuantity,
    applyCoupon,
    removeCoupon,
    deliveryZone,
    setDeliveryZone,
    t,
    language,
    settings,
  } = useApp();

  const [couponInput, setCouponInput] = useState('');
  const [isApplying, setIsApplying] = useState(false);

  const handleApplyCoupon = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!couponInput.trim()) return;
    setIsApplying(true);
    await applyCoupon(couponInput.trim());
    setIsApplying(false);
  };

  return (
    <div className="w-full px-3 sm:px-6 lg:px-8 xl:px-12 2xl:px-16 py-6 sm:py-8 space-y-6 sm:space-y-8">
      <div>
        <h1 className="text-xl sm:text-2xl md:text-3xl font-extrabold tracking-tight text-foreground">
          {t.shoppingCart}
        </h1>
        <p className="text-xs text-neutral-400 mt-1">
          {cart.items.length} devices ready for order confirmation
        </p>
      </div>

      {cart.items.length === 0 ? (
        <div className="py-20 sm:py-24 text-center rounded-2xl sm:rounded-3xl border border-neutral-200 dark:border-neutral-800 bg-neutral-50/50 dark:bg-neutral-950/40 p-6 sm:p-8 space-y-4">
          <ShoppingBag className="w-12 h-12 sm:w-16 sm:h-16 text-neutral-300 dark:text-neutral-700 mx-auto stroke-1" />
          <h2 className="text-base sm:text-lg font-bold text-foreground">{t.cartEmpty}</h2>
          <p className="text-xs text-neutral-400 max-w-sm mx-auto">
            Explore our curated flagship smartphones, noise-cancelling headphones, and smart devices.
          </p>
          <Link
            href="/products"
            className="inline-block px-6 py-3 rounded-full bg-black text-white dark:bg-white dark:text-black text-xs font-bold uppercase tracking-wider hover:opacity-90 transition-smooth"
          >
            {t.continueShopping}
          </Link>
        </div>
      ) : (
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 sm:gap-8">
          {/* Cart Items List */}
          <div className="lg:col-span-2 space-y-3 sm:space-y-4">
            {cart.items.map((item) => {
              const displayName =
                language === 'bn' ? item.product.name_bn || item.product.name : item.product.name;
              return (
                <div
                  key={item.id}
                  className="flex flex-col sm:flex-row items-start sm:items-center justify-between p-3.5 sm:p-5 rounded-2xl border border-neutral-200 dark:border-neutral-800 bg-white dark:bg-neutral-950/60 gap-3 sm:gap-4"
                >
                  <div className="flex items-center gap-3 sm:gap-4">
                    <img
                      src={
                        item.variant?.image_url ||
                        item.product.images[0]?.image_url ||
                        '/placeholder.png'
                      }
                      alt={item.product.name}
                      className="w-14 h-14 sm:w-20 sm:h-20 object-cover rounded-xl border border-neutral-200 dark:border-neutral-800 shrink-0"
                    />
                    <div>
                      <span className="text-[10px] font-mono uppercase text-neutral-400 font-semibold">
                        {item.variant ? item.variant.sku : item.product.sku}
                      </span>
                      <h3 className="text-xs sm:text-sm font-semibold text-foreground line-clamp-1">
                        {displayName}
                      </h3>
                      {item.variant && (
                        <p className="text-xs text-neutral-500 mt-0.5">{item.variant.name}</p>
                      )}
                      <div className="text-xs font-bold text-foreground mt-0.5 sm:hidden">
                        {formatPrice(item.unitPrice, settings.general.currency_symbol)}
                      </div>
                    </div>
                  </div>

                  <div className="flex items-center justify-between w-full sm:w-auto gap-3 sm:gap-6 pt-2 sm:pt-0 border-t border-neutral-100 dark:border-neutral-900 sm:border-0">
                    <div className="hidden sm:block text-right">
                      <div className="text-xs font-bold text-foreground">
                        {formatPrice(item.unitPrice, settings.general.currency_symbol)}
                      </div>
                      <div className="text-[10px] text-neutral-400">Unit Price</div>
                    </div>

                    {/* Quantity Selector */}
                    <div className="flex items-center border border-neutral-200 dark:border-neutral-800 rounded-lg overflow-hidden bg-background">
                      <button
                        onClick={() => updateQuantity(item.id, item.quantity - 1)}
                        className="px-2 sm:px-2.5 py-1 text-xs text-neutral-500 hover:text-foreground hover:bg-neutral-100 dark:hover:bg-neutral-800 transition-colors"
                      >
                        <Minus className="w-3.5 h-3.5" />
                      </button>
                      <span className="px-2.5 sm:px-3 py-1 text-xs font-bold min-w-[24px] sm:min-w-[28px] text-center">
                        {item.quantity}
                      </span>
                      <button
                        onClick={() => updateQuantity(item.id, item.quantity + 1)}
                        className="px-2 sm:px-2.5 py-1 text-xs text-neutral-500 hover:text-foreground hover:bg-neutral-100 dark:hover:bg-neutral-800 transition-colors"
                      >
                        <Plus className="w-3.5 h-3.5" />
                      </button>
                    </div>

                    <div className="text-right min-w-[70px] sm:min-w-[80px]">
                      <div className="text-xs sm:text-sm font-black text-foreground">
                        {formatPrice(item.totalPrice, settings.general.currency_symbol)}
                      </div>
                    </div>

                    <button
                      onClick={() => removeFromCart(item.id)}
                      className="p-1.5 text-neutral-400 hover:text-red-500 transition-colors"
                    >
                      <Trash2 className="w-4 h-4" />
                    </button>
                  </div>
                </div>
              );
            })}
          </div>

          {/* Cart Summary & Delivery Zone */}
          <div className="space-y-6">
            <div className="p-4 sm:p-6 rounded-2xl sm:rounded-3xl border border-neutral-200 dark:border-neutral-800 bg-neutral-50 dark:bg-neutral-950/60 space-y-4">
              <h3 className="text-sm font-bold uppercase tracking-wider text-foreground pb-2 border-b border-neutral-200 dark:border-neutral-800">
                Order Summary
              </h3>

              {/* Delivery Zone Selector */}
              <div>
                <label className="text-xs font-semibold text-neutral-500 block mb-2">
                  Delivery Destination:
                </label>
                <div className="grid grid-cols-2 gap-2">
                  <button
                    onClick={() => setDeliveryZone('inside_dhaka')}
                    className={`py-2 px-3 rounded-xl text-xs font-medium border text-center transition-all ${
                      deliveryZone === 'inside_dhaka'
                        ? 'border-black bg-black text-white dark:border-white dark:bg-white dark:text-black font-semibold'
                        : 'border-neutral-200 dark:border-neutral-800 text-neutral-600 dark:text-neutral-400'
                    }`}
                  >
                    Inside Dhaka (৳{settings.shipping.inside_dhaka_fee})
                  </button>
                  <button
                    onClick={() => setDeliveryZone('outside_dhaka')}
                    className={`py-2 px-3 rounded-xl text-xs font-medium border text-center transition-all ${
                      deliveryZone === 'outside_dhaka'
                        ? 'border-black bg-black text-white dark:border-white dark:bg-white dark:text-black font-semibold'
                        : 'border-neutral-200 dark:border-neutral-800 text-neutral-600 dark:text-neutral-400'
                    }`}
                  >
                    Outside Dhaka (৳{settings.shipping.outside_dhaka_fee})
                  </button>
                </div>
              </div>

              {/* Coupon Form */}
              <form onSubmit={handleApplyCoupon} className="pt-2">
                <label className="text-xs font-semibold text-neutral-500 block mb-1.5">
                  Have a Promo Code?
                </label>
                {cart.couponCode ? (
                  <div className="flex items-center justify-between p-2.5 rounded-xl border border-neutral-300 dark:border-neutral-700 bg-white dark:bg-black text-xs font-semibold">
                    <span className="flex items-center gap-1.5 text-foreground">
                      <Tag className="w-3.5 h-3.5" />
                      {cart.couponCode} applied
                    </span>
                    <button
                      type="button"
                      onClick={removeCoupon}
                      className="text-red-500 hover:underline text-[11px]"
                    >
                      Remove
                    </button>
                  </div>
                ) : (
                  <div className="flex gap-2">
                    <input
                      type="text"
                      value={couponInput}
                      onChange={(e) => setCouponInput(e.target.value.toUpperCase())}
                      placeholder="e.g. WELCOME10"
                      className="flex-1 text-xs px-3 py-2 rounded-xl border border-neutral-300 dark:border-neutral-700 bg-background text-foreground outline-none font-mono"
                    />
                    <button
                      type="submit"
                      disabled={isApplying}
                      className="px-4 py-2 rounded-xl bg-black text-white dark:bg-white dark:text-black text-xs font-bold uppercase tracking-wider hover:opacity-90 transition-smooth disabled:opacity-50"
                    >
                      {isApplying ? 'Checking...' : 'Apply'}
                    </button>
                  </div>
                )}
              </form>

              {/* Price Breakdown */}
              <div className="pt-4 border-t border-neutral-200 dark:border-neutral-800 space-y-2.5 text-xs text-neutral-500">
                <div className="flex justify-between">
                  <span>{t.subtotal}</span>
                  <span className="font-semibold text-foreground">
                    {formatPrice(cart.subtotal, settings.general.currency_symbol)}
                  </span>
                </div>
                {cart.discount > 0 && (
                  <div className="flex justify-between text-foreground font-semibold">
                    <span>{t.discount}</span>
                    <span>-{formatPrice(cart.discount, settings.general.currency_symbol)}</span>
                  </div>
                )}
                <div className="flex justify-between">
                  <span>{t.deliveryFee}</span>
                  <span className="font-semibold text-foreground">
                    {formatPrice(cart.shippingCharge, settings.general.currency_symbol)}
                  </span>
                </div>
                <div className="flex justify-between text-base font-black text-foreground pt-3 border-t border-neutral-200 dark:border-neutral-800">
                  <span>{t.grandTotal}</span>
                  <span>{formatPrice(cart.grandTotal, settings.general.currency_symbol)}</span>
                </div>
              </div>

              <Link
                href="/checkout"
                className="w-full py-3.5 px-6 rounded-full bg-black text-white dark:bg-white dark:text-black text-xs font-bold uppercase tracking-wider hover:opacity-90 transition-smooth flex items-center justify-center gap-2 shadow-md block text-center"
              >
                <span>{t.checkout}</span>
                <ArrowRight className="w-4 h-4" />
              </Link>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
