'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { useApp } from '@/lib/context/app-context';
import { Product } from '@/types';
import { ProductCard } from '@/components/storefront/ProductCard';
import { Heart, ChevronRight } from 'lucide-react';

export default function WishlistPage() {
  const { wishlist } = useApp();
  const [products, setProducts] = useState<Product[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    fetch('/api/products')
      .then((res) => (res.ok ? res.json() : []))
      .then((allProducts: Product[]) => {
        setProducts(allProducts.filter((p) => wishlist.includes(p.id)));
      })
      .finally(() => setIsLoading(false));
  }, [wishlist]);

  return (
    <div className="w-full px-4 sm:px-6 lg:px-8 xl:px-12 2xl:px-16 py-8 space-y-8">
      {/* Breadcrumb */}
      <nav className="flex items-center gap-1.5 text-xs text-neutral-400">
        <Link href="/" className="hover:text-foreground">
          Home
        </Link>
        <ChevronRight className="w-3.5 h-3.5" />
        <Link href="/account" className="hover:text-foreground">
          Account
        </Link>
        <ChevronRight className="w-3.5 h-3.5" />
        <span className="text-foreground font-medium">Wishlist</span>
      </nav>

      <div>
        <h1 className="text-2xl sm:text-3xl font-extrabold tracking-tight text-foreground">
          My Saved Devices ({wishlist.length})
        </h1>
        <p className="text-xs text-neutral-400 mt-1">
          Your bookmarked tech gear and accessories saved for future purchase.
        </p>
      </div>

      {isLoading ? (
        <div className="py-20 text-center text-xs text-neutral-400">Loading wishlist...</div>
      ) : products.length === 0 ? (
        <div className="py-24 text-center rounded-3xl border border-neutral-200 dark:border-neutral-800 p-8 space-y-4">
          <Heart className="w-12 h-12 text-neutral-300 dark:text-neutral-700 mx-auto stroke-1" />
          <h2 className="text-base font-bold text-foreground">Your wishlist is empty</h2>
          <p className="text-xs text-neutral-400 max-w-sm mx-auto">
            Browse our latest smartphones, noise-cancelling audio, and drones, and click the heart icon on any product to save it here.
          </p>
          <Link
            href="/products"
            className="inline-block px-6 py-2.5 rounded-full bg-black text-white dark:bg-white dark:text-black text-xs font-semibold"
          >
            Explore Gear
          </Link>
        </div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 2xl:grid-cols-6 gap-6">
          {products.map((p) => (
            <ProductCard key={p.id} product={p} />
          ))}
        </div>
      )}
    </div>
  );
}
