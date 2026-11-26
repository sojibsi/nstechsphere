'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { formatPrice } from '@/lib/utils';
import {
  DollarSign,
  ShoppingBag,
  Package,
  AlertTriangle,
  ArrowUpRight,
  TrendingUp,
  Layers,
  Tag,
  Clock,
  CheckCircle2,
  Truck,
  ArrowRight,
} from 'lucide-react';

export default function AdminDashboardPage() {
  const [stats, setStats] = useState<any>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    fetch('/api/admin/stats')
      .then((res) => (res.ok ? res.json() : null))
      .then((data) => setStats(data))
      .finally(() => setIsLoading(false));
  }, []);

  if (isLoading || !stats) {
    return (
      <div className="py-24 text-center text-xs text-neutral-400">
        Loading real-time enterprise store metrics...
      </div>
    );
  }

  const averageOrderValue = stats.totalOrders > 0 ? stats.totalSales / stats.totalOrders : 0;
  const fulfillmentRate =
    stats.totalOrders > 0
      ? Math.round((stats.completedOrders / stats.totalOrders) * 100)
      : 100;

  return (
    <div className="space-y-8">
      {/* Top Banner / Welcome */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-6 border-b border-neutral-200 dark:border-neutral-800">
        <div>
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-neutral-100 dark:bg-neutral-900 border border-neutral-200 dark:border-neutral-800 text-xs font-mono font-bold uppercase tracking-wider text-neutral-500 mb-2">
            <span>Operational Telemetry • Bangladesh</span>
          </div>
          <h1 className="text-2xl sm:text-3xl lg:text-4xl font-black text-foreground tracking-tight">
            Control Room Dashboard
          </h1>
          <p className="text-sm text-neutral-400 mt-1">
            Real-time sales velocity, order fulfillment pipelines, and warehouse telemetry.
          </p>
        </div>

        <div className="flex items-center gap-3">
          <Link
            href="/control-room-x7k9/products"
            className="px-4.5 py-2.5 rounded-xl bg-black text-white dark:bg-white dark:text-black text-sm font-bold uppercase tracking-wider hover:opacity-90 transition-smooth shadow-sm"
          >
            + Add New Product
          </Link>
          <Link
            href="/control-room-x7k9/orders"
            className="px-4.5 py-2.5 rounded-xl border border-neutral-300 dark:border-neutral-700 text-sm font-bold uppercase tracking-wider hover:bg-neutral-100 dark:hover:bg-neutral-900 transition-colors"
          >
            Manage Orders
          </Link>
        </div>
      </div>

      {/* KPI Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
        {/* Total Sales */}
        <div className="p-6 rounded-2xl border border-neutral-200 dark:border-neutral-800 bg-white dark:bg-neutral-950 space-y-3 shadow-subtle">
          <div className="flex items-center justify-between text-sm font-bold text-neutral-400 uppercase tracking-wider">
            <span>Total Revenue</span>
            <div className="w-8 h-8 rounded-lg bg-neutral-100 dark:bg-neutral-900 flex items-center justify-center text-foreground">
              <DollarSign className="w-4.5 h-4.5" />
            </div>
          </div>
          <div className="text-3xl sm:text-4xl font-black text-foreground tracking-tight">
            {formatPrice(stats.totalSales)}
          </div>
          <div className="text-xs text-neutral-400 flex items-center gap-1.5 pt-1 border-t border-neutral-100 dark:border-neutral-900">
            <TrendingUp className="w-4 h-4 text-emerald-500" />
            <span>Avg Order Value: <strong>{formatPrice(averageOrderValue)}</strong></span>
          </div>
        </div>

        {/* Total Orders */}
        <div className="p-6 rounded-2xl border border-neutral-200 dark:border-neutral-800 bg-white dark:bg-neutral-950 space-y-3 shadow-subtle">
          <div className="flex items-center justify-between text-sm font-bold text-neutral-400 uppercase tracking-wider">
            <span>Order Velocity</span>
            <div className="w-8 h-8 rounded-lg bg-neutral-100 dark:bg-neutral-900 flex items-center justify-center text-foreground">
              <ShoppingBag className="w-4.5 h-4.5" />
            </div>
          </div>
          <div className="text-3xl sm:text-4xl font-black text-foreground tracking-tight">
            {stats.totalOrders}
          </div>
          <div className="text-xs text-neutral-400 flex items-center gap-1.5 pt-1 border-t border-neutral-100 dark:border-neutral-900">
            <Clock className="w-4 h-4 text-foreground" />
            <span><strong>{stats.pendingOrders}</strong> pending confirmation</span>
          </div>
        </div>

        {/* Catalog Items */}
        <div className="p-6 rounded-2xl border border-neutral-200 dark:border-neutral-800 bg-white dark:bg-neutral-950 space-y-3 shadow-subtle">
          <div className="flex items-center justify-between text-sm font-bold text-neutral-400 uppercase tracking-wider">
            <span>Catalog Skus</span>
            <div className="w-8 h-8 rounded-lg bg-neutral-100 dark:bg-neutral-900 flex items-center justify-center text-foreground">
              <Package className="w-4.5 h-4.5" />
            </div>
          </div>
          <div className="text-3xl sm:text-4xl font-black text-foreground tracking-tight">
            {stats.totalProducts}
          </div>
          <div className="text-xs text-neutral-400 flex items-center gap-1.5 pt-1 border-t border-neutral-100 dark:border-neutral-900">
            <span>Across <strong>{stats.totalCategories}</strong> departments</span>
          </div>
        </div>

        {/* Low Stock Alerts */}
        <div className="p-6 rounded-2xl border border-neutral-200 dark:border-neutral-800 bg-white dark:bg-neutral-950 space-y-3 shadow-subtle">
          <div className="flex items-center justify-between text-sm font-bold text-neutral-400 uppercase tracking-wider">
            <span>Stock Alerts</span>
            <div className="w-8 h-8 rounded-lg bg-neutral-100 dark:bg-neutral-900 flex items-center justify-center text-foreground">
              <AlertTriangle className="w-4.5 h-4.5" />
            </div>
          </div>
          <div className="text-3xl sm:text-4xl font-black text-foreground tracking-tight">
            {stats.lowStockCount}
          </div>
          <div className="text-xs text-neutral-400 flex items-center gap-1.5 pt-1 border-t border-neutral-100 dark:border-neutral-900">
            <span>Threshold &lt; 10 units</span>
          </div>
        </div>
      </div>

      {/* Low Stock Warning Banner if applicable */}
      {stats.lowStockCount > 0 && (
        <div className="p-4.5 rounded-2xl border border-neutral-300 dark:border-neutral-800 bg-neutral-50 dark:bg-neutral-900 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div className="flex items-center gap-3">
            <AlertTriangle className="w-5 h-5 text-foreground shrink-0" />
            <div>
              <div className="text-sm font-bold text-foreground">
                Inventory Warning: {stats.lowStockCount} products are running critically low on stock
              </div>
              <div className="text-xs text-neutral-400 mt-0.5">
                Replenish stock to prevent checkout backorders.
              </div>
            </div>
          </div>
          <Link
            href="/control-room-x7k9/inventory"
            className="px-4 py-2.5 rounded-xl bg-black text-white dark:bg-white dark:text-black text-sm font-bold shrink-0 text-center"
          >
            Review Warehouse Stock
          </Link>
        </div>
      )}

      {/* Recent Orders Table */}
      <div className="rounded-2xl border border-neutral-200 dark:border-neutral-800 bg-white dark:bg-neutral-950 overflow-hidden shadow-subtle">
        <div className="p-5 sm:p-6 border-b border-neutral-200 dark:border-neutral-800 flex items-center justify-between">
          <div>
            <h2 className="text-base sm:text-lg font-bold text-foreground">Recent Customer Orders</h2>
            <p className="text-xs sm:text-sm text-neutral-400 mt-0.5">Live order queue ready for dispatch</p>
          </div>
          <Link
            href="/control-room-x7k9/orders"
            className="text-sm font-semibold hover:underline flex items-center gap-1"
          >
            <span>View All Orders</span>
            <ArrowUpRight className="w-4 h-4" />
          </Link>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-sm text-left">
            <thead className="bg-neutral-50 dark:bg-neutral-900/60 border-b border-neutral-200 dark:border-neutral-800 text-neutral-500 font-semibold uppercase tracking-wider text-xs">
              <tr>
                <th className="py-3.5 px-5">Order Reference</th>
                <th className="py-3.5 px-5">Customer</th>
                <th className="py-3.5 px-5">Delivery City</th>
                <th className="py-3.5 px-5">Total</th>
                <th className="py-3.5 px-5">Status</th>
                <th className="py-3.5 px-5 text-right">Fulfillment</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-neutral-200 dark:divide-neutral-800">
              {stats.recentOrders?.map((order: any) => (
                <tr key={order.id} className="hover:bg-neutral-50/50 dark:hover:bg-neutral-900/30">
                  <td className="py-4 px-5 font-mono font-bold text-foreground">
                    {order.order_number}
                  </td>
                  <td className="py-4 px-5">
                    <div className="font-semibold text-foreground text-sm">{order.customer_name}</div>
                    <div className="text-xs text-neutral-400">{order.customer_phone}</div>
                  </td>
                  <td className="py-4 px-5 text-neutral-500 text-sm">
                    {order.area}, {order.district}
                  </td>
                  <td className="py-4 px-5 font-bold text-foreground text-sm">
                    {formatPrice(order.grand_total)}
                  </td>
                  <td className="py-4 px-5">
                    <span className="px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wider bg-neutral-100 dark:bg-neutral-900 border border-neutral-200 dark:border-neutral-800">
                      {order.order_status}
                    </span>
                  </td>
                  <td className="py-4 px-5 text-right">
                    <Link
                      href={`/control-room-x7k9/orders`}
                      className="text-sm font-semibold hover:underline inline-flex items-center gap-1"
                    >
                      <span>Manage</span>
                      <ArrowRight className="w-3.5 h-3.5" />
                    </Link>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
