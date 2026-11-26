'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { Product } from '@/types';
import { useApp } from '@/lib/context/app-context';
import { formatPrice } from '@/lib/utils';
import { ShoppingBag, Heart, Star, Check } from 'lucide-react';

interface ProductCardProps {
  product: Product;
}

export function ProductCard({ product }: ProductCardProps) {
  const { language, settings, addToCart, wishlist, toggleWishlist, t } = useApp();
  const [isHovered, setIsHovered] = useState(false);

  const isWishlisted = wishlist.includes(product.id);
  const displayName = language === 'bn' ? product.name_bn || product.name : product.name;
  const currentPrice = product.sale_price ?? product.regular_price;
  const hasDiscount = product.sale_price && product.sale_price < product.regular_price;
  const discountPercent = hasDiscount
    ? Math.round(((product.regular_price - product.sale_price!) / product.regular_price) * 100)
    : 0;

  const isLowStock = product.stock_quantity > 0 && product.stock_quantity <= 8;
  const isOutOfStock = product.stock_quantity <= 0;

  // Secondary image on hover if available
  const primaryImg = product.images[0]?.image_url || '/placeholder.png';
  const secondaryImg = product.images[1]?.image_url || primaryImg;

  return (
    <div
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      className="group relative flex flex-col rounded-2xl border border-neutral-200/80 dark:border-neutral-800/80 liquid-glass overflow-hidden hover:border-black dark:hover:border-white transition-all duration-300 shadow-subtle hover:shadow-glass"
    >
      {/* Top Badges */}
      <div className="absolute top-3 left-3 z-10 flex flex-col gap-1.5 pointer-events-none">
        {hasDiscount && (
          <span className="px-2.5 py-0.5 rounded-full bg-black text-white dark:bg-white dark:text-black text-xs font-black uppercase tracking-wider border border-neutral-700/40">
            Save {discountPercent}%
          </span>
        )}
        {product.is_featured && (
          <span className="px-2.5 py-0.5 rounded-full bg-black text-white dark:bg-white dark:text-black border border-neutral-700/40 text-xs font-bold uppercase tracking-wider">
            Featured
          </span>
        )}
      </div>

      {/* Wishlist Button */}
      <button
        onClick={(e) => {
          e.preventDefault();
          e.stopPropagation();
          toggleWishlist(product.id);
        }}
        aria-label="Toggle Wishlist"
        className={`absolute top-3 right-3 z-10 p-2 rounded-full liquid-glass-btn transition-all ${
          isWishlisted
            ? 'text-black dark:text-white scale-110 ring-1 ring-neutral-400'
            : 'text-neutral-400 hover:text-foreground opacity-80 hover:opacity-100'
        }`}
      >
        <Heart className={`w-3.5 h-3.5 ${isWishlisted ? 'fill-current' : ''}`} />
      </button>

      {/* Image Container with Smooth Secondary Hover Transition */}
      <Link
        href={`/products/${product.slug}`}
        className="relative aspect-square w-full overflow-hidden bg-neutral-50 dark:bg-neutral-900/60 block"
      >
        <img
          src={isHovered && secondaryImg !== primaryImg ? secondaryImg : primaryImg}
          alt={product.name}
          className="w-full h-full object-cover object-center transition-all duration-700 ease-out group-hover:scale-105"
          loading="lazy"
        />
        {isOutOfStock && (
          <div className="absolute inset-0 bg-black/50 backdrop-blur-[2px] flex items-center justify-center">
            <span className="px-3 py-1 rounded-full bg-white text-black text-[11px] font-black uppercase tracking-widest">
              Sold Out
            </span>
          </div>
        )}
      </Link>

      {/* Product Information */}
      <div className="p-4 sm:p-5 flex flex-col flex-1">
        {/* Brand & Rating Bar */}
        <div className="flex items-center justify-between text-xs mb-2">
          <span className="text-neutral-400 font-bold uppercase tracking-wider">
            {product.brand?.name || 'Authentic'}
          </span>
          <div className="flex items-center gap-1 text-xs font-bold text-neutral-700 dark:text-neutral-300">
            <Star className="w-3.5 h-3.5 fill-current text-foreground" />
            <span>{product.rating || '4.9'}</span>
            <span className="text-neutral-400 font-normal">({product.review_count || 12})</span>
          </div>
        </div>

        {/* Title */}
        <Link
          href={`/products/${product.slug}`}
          className="text-sm sm:text-base font-bold text-foreground line-clamp-2 hover:underline mb-3 leading-snug flex-1"
        >
          {displayName}
        </Link>

        {/* Stock Urgency Indicator */}
        {isLowStock && (
          <div className="mb-3 space-y-1">
            <div className="flex justify-between text-xs font-semibold text-neutral-500 dark:text-neutral-400">
              <span>Only {product.stock_quantity} units remaining</span>
            </div>
            <div className="w-full h-1.5 rounded-full bg-neutral-100 dark:bg-neutral-800 overflow-hidden">
              <div
                className="h-full bg-neutral-900 dark:bg-neutral-100 rounded-full"
                style={{ width: `${Math.min(100, (product.stock_quantity / 10) * 100)}%` }}
              />
            </div>
          </div>
        )}

        {/* Price & Action */}
        <div className="pt-3 border-t border-neutral-100 dark:border-neutral-900 flex items-center justify-between mt-auto gap-2">
          <div>
            <div className="text-base sm:text-lg font-black text-foreground tracking-tight">
              {formatPrice(currentPrice, settings.general.currency_symbol)}
            </div>
            {hasDiscount && (
              <div className="text-xs text-neutral-400 line-through">
                {formatPrice(product.regular_price, settings.general.currency_symbol)}
              </div>
            )}
          </div>

          <button
            onClick={() => addToCart(product, 1)}
            disabled={isOutOfStock}
            aria-label="Add to cart"
            className="flex items-center gap-1.5 px-3.5 sm:px-4 py-2.5 rounded-xl liquid-glass-primary text-xs sm:text-sm font-bold uppercase tracking-wider active:scale-95 transition-all disabled:opacity-40 disabled:cursor-not-allowed shadow-sm shrink-0"
          >
            <ShoppingBag className="w-4 h-4" />
            <span className="hidden sm:inline">{t.addToCart}</span>
          </button>
        </div>
      </div>
    </div>
  );
}
