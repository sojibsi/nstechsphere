'use client';

import React from 'react';
import { useApp } from '@/lib/context/app-context';
import { X, Trash2, Plus, Minus, ArrowRight, ShoppingBag } from 'lucide-react';
import Link from 'next/link';
import { formatPrice } from '@/lib/utils';

export function CartDrawer() {
  const {
    cart,
    isCartDrawerOpen,
    setIsCartDrawerOpen,
    removeFromCart,
    updateQuantity,
    t,
    language,
    settings,
  } = useApp();

  if (!isCartDrawerOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex justify-end bg-black/60 backdrop-blur-sm animate-in fade-in duration-200">
      <div
        className="w-full max-w-md h-full liquid-glass-elevated border-l border-neutral-300 dark:border-neutral-800 shadow-2xl flex flex-col animate-in slide-in-from-right duration-300"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Drawer Header */}
        <div className="flex items-center justify-between px-6 py-5 border-b border-neutral-200 dark:border-neutral-800">
          <div className="flex items-center gap-2">
            <ShoppingBag className="w-5 h-5 text-foreground" />
            <h2 className="text-base font-semibold tracking-wide">
              {t.shoppingCart} ({cart.items.length})
            </h2>
          </div>
          <button
            onClick={() => setIsCartDrawerOpen(false)}
            aria-label="Close cart"
            className="p-1.5 rounded-full liquid-glass-btn text-neutral-400 hover:text-foreground transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Drawer Body */}
        <div className="flex-1 overflow-y-auto p-6 space-y-4">
          {cart.items.length === 0 ? (
            <div className="h-full flex flex-col items-center justify-center text-center py-12">
              <ShoppingBag className="w-12 h-12 text-neutral-300 dark:text-neutral-700 mb-4 stroke-1" />
              <p className="text-sm text-neutral-500 mb-6">{t.cartEmpty}</p>
              <button
                onClick={() => setIsCartDrawerOpen(false)}
                className="px-6 py-2.5 rounded-full liquid-glass-primary text-xs font-semibold"
              >
                {t.continueShopping}
              </button>
            </div>
          ) : (
            cart.items.map((item) => {
              const displayName =
                language === 'bn' ? item.product.name_bn || item.product.name : item.product.name;
              return (
                <div
                  key={item.id}
                  className="flex gap-4 p-3.5 rounded-xl liquid-glass"
                >
                  <img
                    src={
                      item.variant?.image_url ||
                      item.product.images[0]?.image_url ||
                      '/placeholder.png'
                    }
                    alt={item.product.name}
                    className="w-16 h-16 object-cover rounded-lg border border-neutral-200 dark:border-neutral-800 shrink-0"
                  />
                  <div className="flex-1 min-w-0">
                    <h3 className="text-xs font-semibold text-foreground line-clamp-2 leading-tight">
                      {displayName}
                    </h3>
                    {item.variant && (
                      <p className="text-[11px] text-neutral-400 mt-0.5">{item.variant.name}</p>
                    )}
                    <div className="text-xs font-bold text-foreground mt-1.5">
                      {formatPrice(item.unitPrice, settings.general.currency_symbol)}
                    </div>

                    <div className="flex items-center justify-between mt-3">
                      <div className="flex items-center border border-neutral-200 dark:border-neutral-800 rounded-lg overflow-hidden">
                        <button
                          onClick={() => updateQuantity(item.id, item.quantity - 1)}
                          className="px-2 py-1 text-neutral-500 hover:text-foreground hover:bg-neutral-100 dark:hover:bg-neutral-800 transition-colors"
                        >
                          <Minus className="w-3 h-3" />
                        </button>
                        <span className="px-2.5 py-1 text-xs font-medium">{item.quantity}</span>
                        <button
                          onClick={() => updateQuantity(item.id, item.quantity + 1)}
                          className="px-2 py-1 text-neutral-500 hover:text-foreground hover:bg-neutral-100 dark:hover:bg-neutral-800 transition-colors"
                        >
                          <Plus className="w-3 h-3" />
                        </button>
                      </div>

                      <button
                        onClick={() => removeFromCart(item.id)}
                        className="text-neutral-400 hover:text-red-500 transition-colors p-1"
                      >
                        <Trash2 className="w-3.5 h-3.5" />
                      </button>
                    </div>
                  </div>
                </div>
              );
            })
          )}
        </div>

        {/* Drawer Footer */}
        {cart.items.length > 0 && (
          <div className="p-6 border-t border-neutral-200 dark:border-neutral-800 bg-white/40 dark:bg-black/40 space-y-3">
            <div className="flex justify-between text-xs text-neutral-500">
              <span>{t.subtotal}</span>
              <span className="font-semibold text-foreground">
                {formatPrice(cart.subtotal, settings.general.currency_symbol)}
              </span>
            </div>
            {cart.discount > 0 && (
              <div className="flex justify-between text-xs text-neutral-500">
                <span>{t.discount}</span>
                <span className="font-semibold text-foreground">
                  -{formatPrice(cart.discount, settings.general.currency_symbol)}
                </span>
              </div>
            )}
            <div className="flex justify-between text-xs text-neutral-500">
              <span>{t.deliveryFee}</span>
              <span className="font-semibold text-foreground">
                {formatPrice(cart.shippingCharge, settings.general.currency_symbol)}
              </span>
            </div>
            <div className="flex justify-between text-sm font-bold text-foreground pt-2 border-t border-neutral-200 dark:border-neutral-800">
              <span>{t.grandTotal}</span>
              <span>{formatPrice(cart.grandTotal, settings.general.currency_symbol)}</span>
            </div>

            <Link
              href="/checkout"
              onClick={() => setIsCartDrawerOpen(false)}
              className="w-full flex items-center justify-center gap-2 py-3 px-4 rounded-xl liquid-glass-primary font-bold text-xs tracking-wider uppercase mt-4 shadow-md"
            >
              <span>{t.checkout}</span>
              <ArrowRight className="w-4 h-4" />
            </Link>
          </div>
        )}
      </div>
    </div>
  );
}
