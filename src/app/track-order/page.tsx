'use client';

import React, { useState, useEffect, Suspense } from 'react';
import { useSearchParams } from 'next/navigation';
import { Order } from '@/types';
import { formatPrice } from '@/lib/utils';
import { useApp } from '@/lib/context/app-context';
import { Search, CheckCircle2 } from 'lucide-react';

function TrackOrderContent() {
  const searchParams = useSearchParams();
  const { settings, t } = useApp();

  const [orderNumber, setOrderNumber] = useState(searchParams.get('number') || '');
  const [order, setOrder] = useState<Order | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [notFoundError, setNotFoundError] = useState(false);

  const fetchOrder = async (numberToFetch: string) => {
    if (!numberToFetch.trim()) return;
    setIsLoading(true);
    setNotFoundError(false);
    try {
      const res = await fetch(`/api/orders?number=${encodeURIComponent(numberToFetch.trim())}`);
      if (res.ok) {
        const data = await res.json();
        setOrder(data);
      } else {
        setOrder(null);
        setNotFoundError(true);
      }
    } catch {
      setOrder(null);
      setNotFoundError(true);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    if (orderNumber) {
      fetchOrder(orderNumber);
    }
  }, []);

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    fetchOrder(orderNumber);
  };

  const steps = [
    { key: 'pending', label: 'Pending Confirmation' },
    { key: 'confirmed', label: 'Order Confirmed' },
    { key: 'processing', label: 'Packaging & Quality Check' },
    { key: 'shipped', label: 'In Transit with Courier' },
    { key: 'delivered', label: 'Delivered' },
  ];

  const getStepIndex = (status: string) => {
    switch (status) {
      case 'pending':
        return 0;
      case 'confirmed':
        return 1;
      case 'processing':
        return 2;
      case 'shipped':
        return 3;
      case 'delivered':
        return 4;
      default:
        return 0;
    }
  };

  return (
    <div className="w-full px-4 sm:px-6 lg:px-8 xl:px-12 2xl:px-16 py-12 space-y-8">
      <div className="text-center space-y-2">
        <h1 className="text-2xl sm:text-3xl font-extrabold tracking-tight text-foreground">
          Track Your Delivery
        </h1>
        <p className="text-xs sm:text-sm text-neutral-400 max-w-md mx-auto">
          Enter your order reference number (e.g. NS-20261125-XXXX) to view live progress.
        </p>
      </div>

      <form onSubmit={handleSearch} className="max-w-md mx-auto flex gap-2">
        <input
          type="text"
          value={orderNumber}
          onChange={(e) => setOrderNumber(e.target.value.toUpperCase())}
          placeholder="GG-YYYYMMDD-XXXX"
          className="flex-1 text-xs px-4 py-3 rounded-xl border border-neutral-300 dark:border-neutral-700 bg-background text-foreground outline-none font-mono tracking-wider"
          required
        />
        <button
          type="submit"
          disabled={isLoading}
          className="px-6 py-3 rounded-xl bg-black text-white dark:bg-white dark:text-black text-xs font-bold uppercase tracking-wider hover:opacity-90 transition-smooth disabled:opacity-50 flex items-center gap-1.5"
        >
          <Search className="w-3.5 h-3.5" />
          <span>Track</span>
        </button>
      </form>

      {isLoading && (
        <div className="py-16 text-center text-xs text-neutral-400">
          Fetching tracking records from database...
        </div>
      )}

      {notFoundError && (
        <div className="p-4 rounded-xl border border-neutral-300 dark:border-neutral-800 text-center text-xs text-neutral-500">
          No order found matching &quot;{orderNumber}&quot;. Please verify the order reference code.
        </div>
      )}

      {order && (
        <div className="rounded-3xl border border-neutral-200 dark:border-neutral-800 bg-white dark:bg-neutral-950/60 p-6 sm:p-10 space-y-8 shadow-sm animate-in fade-in duration-200">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between pb-6 border-b border-neutral-200 dark:border-neutral-800 gap-4">
            <div>
              <span className="text-[11px] font-bold uppercase tracking-wider text-neutral-400">
                Order Tracking
              </span>
              <h2 className="text-lg font-black text-foreground font-mono">{order.order_number}</h2>
              <div className="text-xs text-neutral-500 mt-0.5">
                Recipient: {order.customer_name} ({order.customer_phone})
              </div>
            </div>

            <div className="text-right">
              <div className="text-xs font-bold uppercase px-3 py-1 rounded-full bg-neutral-100 dark:bg-neutral-900 border border-neutral-200 dark:border-neutral-800 inline-block">
                {order.order_status}
              </div>
              {order.tracking_number && (
                <div className="text-[11px] text-neutral-400 font-mono mt-1">
                  Courier Consignment: <strong>{order.tracking_number}</strong>
                </div>
              )}
            </div>
          </div>

          <div className="py-4">
            <div className="relative flex flex-col md:flex-row justify-between gap-6 md:gap-2">
              {steps.map((step, idx) => {
                const currentIdx = getStepIndex(order.order_status);
                const isPassed = idx <= currentIdx;
                const isCurrent = idx === currentIdx;

                return (
                  <div key={step.key} className="flex md:flex-col items-center gap-3 flex-1 text-center">
                    <div
                      className={`w-9 h-9 rounded-full flex items-center justify-center text-xs font-bold transition-all shrink-0 ${
                        isPassed
                          ? 'bg-black text-white dark:bg-white dark:text-black shadow-sm'
                          : 'border border-neutral-300 dark:border-neutral-700 text-neutral-400 bg-background'
                      }`}
                    >
                      {isPassed ? <CheckCircle2 className="w-4 h-4" /> : idx + 1}
                    </div>
                    <div className="text-left md:text-center">
                      <div
                        className={`text-xs font-semibold ${
                          isCurrent ? 'text-foreground font-bold' : 'text-neutral-500'
                        }`}
                      >
                        {step.label}
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>

          <div className="pt-6 border-t border-neutral-200 dark:border-neutral-800 space-y-4">
            <h3 className="text-xs font-bold uppercase tracking-wider text-neutral-400">
              Shipment Contents ({order.items.length} items)
            </h3>
            <div className="space-y-2">
              {order.items.map((item) => (
                <div
                  key={item.id}
                  className="flex items-center justify-between p-3 rounded-xl border border-neutral-100 dark:border-neutral-900 bg-neutral-50/50 dark:bg-neutral-900/30 text-xs"
                >
                  <div>
                    <div className="font-semibold text-foreground">{item.product_name}</div>
                    {item.variant_name && (
                      <div className="text-[11px] text-neutral-400">{item.variant_name}</div>
                    )}
                  </div>
                  <div className="text-right">
                    <div className="font-bold text-foreground">
                      {item.quantity} x {formatPrice(item.unit_price, settings.general.currency_symbol)}
                    </div>
                  </div>
                </div>
              ))}
            </div>

            <div className="flex justify-between text-xs font-bold pt-2 text-foreground">
              <span>Grand Total:</span>
              <span>{formatPrice(order.grand_total, settings.general.currency_symbol)} ({order.payment_method.toUpperCase()} - {order.payment_status})</span>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default function TrackOrderPage() {
  return (
    <Suspense fallback={<div className="py-24 text-center text-xs text-neutral-400">Loading tracking page...</div>}>
      <TrackOrderContent />
    </Suspense>
  );
}
