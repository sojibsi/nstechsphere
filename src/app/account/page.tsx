'use client';

import React from 'react';
import Link from 'next/link';
import { useApp } from '@/lib/context/app-context';
import { Package, Heart, MapPin, ShieldCheck, ArrowRight, User } from 'lucide-react';

export default function AccountOverviewPage() {
  const { wishlist, cart } = useApp();

  return (
    <div className="w-full px-4 sm:px-6 lg:px-8 xl:px-12 2xl:px-16 py-8 space-y-8">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between pb-6 border-b border-neutral-200 dark:border-neutral-800 gap-4">
        <div>
          <span className="text-[11px] font-bold uppercase tracking-wider text-neutral-400">
            Customer Portal
          </span>
          <h1 className="text-2xl sm:text-3xl font-extrabold tracking-tight text-foreground">
            My Account
          </h1>
          <p className="text-xs text-neutral-400 mt-1">
            Manage your personal electronics orders, saved delivery addresses, and wishlist.
          </p>
        </div>
      </div>

      {/* Metrics Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
        <Link
          href="/account/orders"
          className="p-6 rounded-3xl border border-neutral-200 dark:border-neutral-800 bg-white dark:bg-neutral-950/40 hover:border-black dark:hover:border-white transition-smooth group"
        >
          <div className="w-10 h-10 rounded-2xl bg-neutral-100 dark:bg-neutral-900 flex items-center justify-center text-foreground mb-4">
            <Package className="w-5 h-5" />
          </div>
          <div className="text-xs text-neutral-400 font-semibold uppercase tracking-wider">
            Order History
          </div>
          <div className="text-xl font-black text-foreground mt-1 group-hover:underline flex items-center justify-between">
            <span>View Orders</span>
            <ArrowRight className="w-4 h-4 text-neutral-400 group-hover:translate-x-1 transition-transform" />
          </div>
        </Link>

        <Link
          href="/account/wishlist"
          className="p-6 rounded-3xl border border-neutral-200 dark:border-neutral-800 bg-white dark:bg-neutral-950/40 hover:border-black dark:hover:border-white transition-smooth group"
        >
          <div className="w-10 h-10 rounded-2xl bg-neutral-100 dark:bg-neutral-900 flex items-center justify-center text-foreground mb-4">
            <Heart className="w-5 h-5" />
          </div>
          <div className="text-xs text-neutral-400 font-semibold uppercase tracking-wider">
            Saved Items
          </div>
          <div className="text-xl font-black text-foreground mt-1 group-hover:underline flex items-center justify-between">
            <span>{wishlist.length} in Wishlist</span>
            <ArrowRight className="w-4 h-4 text-neutral-400 group-hover:translate-x-1 transition-transform" />
          </div>
        </Link>

        <Link
          href="/account/addresses"
          className="p-6 rounded-3xl border border-neutral-200 dark:border-neutral-800 bg-white dark:bg-neutral-950/40 hover:border-black dark:hover:border-white transition-smooth group"
        >
          <div className="w-10 h-10 rounded-2xl bg-neutral-100 dark:bg-neutral-900 flex items-center justify-center text-foreground mb-4">
            <MapPin className="w-5 h-5" />
          </div>
          <div className="text-xs text-neutral-400 font-semibold uppercase tracking-wider">
            Shipping Locations
          </div>
          <div className="text-xl font-black text-foreground mt-1 group-hover:underline flex items-center justify-between">
            <span>Saved Addresses</span>
            <ArrowRight className="w-4 h-4 text-neutral-400 group-hover:translate-x-1 transition-transform" />
          </div>
        </Link>
      </div>

      {/* Account Info Box */}
      <div className="rounded-3xl border border-neutral-200 dark:border-neutral-800 bg-white dark:bg-neutral-950/40 p-6 sm:p-8 space-y-4">
        <h2 className="text-sm font-bold uppercase tracking-wider text-foreground">
          Profile Details
        </h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs text-neutral-500">
          <div>
            <span className="font-semibold text-neutral-400 block mb-1">Account Role</span>
            <span className="px-2.5 py-1 rounded-md bg-neutral-100 dark:bg-neutral-900 font-mono font-bold text-foreground">
              Customer (Standard)
            </span>
          </div>
          <div>
            <span className="font-semibold text-neutral-400 block mb-1">Market Location</span>
            <span className="text-foreground font-medium">Bangladesh (BDT)</span>
          </div>
        </div>
      </div>
    </div>
  );
}
