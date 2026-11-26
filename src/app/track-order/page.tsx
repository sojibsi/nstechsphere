'use client';

import React, { useState, useEffect, Suspense } from 'react';
import { useSearchParams } from 'next/navigation';
import { Order } from '@/types';
import { formatPrice } from '@/lib/utils';
import { useApp } from '@/lib/context/app-context';
import {
  Search,
  CheckCircle2,
  Package,
  Truck,
  MapPin,
  Clock,
  ShieldCheck,
  AlertCircle,
  Phone,
  MessageCircle,
  HelpCircle,
  ChevronRight,
  ExternalLink,
} from 'lucide-react';
import Link from 'next/link';

function TrackOrderContent() {
  const searchParams = useSearchParams();
  const { settings, language } = useApp();

  const [orderNumber, setOrderNumber] = useState(searchParams.get('number') || '');
  const [phoneNumber, setPhoneNumber] = useState(searchParams.get('phone') || '');
  const [order, setOrder] = useState<Order | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');

  const fetchOrder = async (numberToFetch: string, phoneToFetch: string) => {
    if (!numberToFetch.trim() && !phoneToFetch.trim()) {
      setErrorMessage(
        language === 'bn'
          ? 'অনুগ্রহ করে অর্ডার নম্বর অথবা ফোন নম্বর লিখুন'
          : 'Please enter an order number or phone number'
      );
      return;
    }

    setIsLoading(true);
    setErrorMessage('');
    try {
      const params = new URLSearchParams();
      if (numberToFetch.trim()) params.append('number', numberToFetch.trim());
      if (phoneToFetch.trim()) params.append('phone', phoneToFetch.trim());

      const res = await fetch(`/api/orders?${params.toString()}`);
      if (res.ok) {
        const data = await res.json();
        setOrder(data);
        setErrorMessage('');
      } else {
        setOrder(null);
        setErrorMessage(
          language === 'bn'
            ? 'প্রদত্ত তথ্যের সাথে কোনো অর্ডার পাওয়া যায়নি। অনুগ্রহ করে সঠিক অর্ডার নম্বর ও ফোন নম্বর দিন।'
            : 'No order found with the provided details. Please verify your order number and phone number.'
        );
      }
    } catch {
      setOrder(null);
      setErrorMessage(
        language === 'bn'
          ? 'অর্ডার তথ্য লোড করতে সমস্যা হয়েছে। কিছুক্ষণ পর আবার চেষ্টা করুন।'
          : 'Failed to retrieve order tracking information. Please try again later.'
      );
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    const num = searchParams.get('number');
    const ph = searchParams.get('phone');
    if (num || ph) {
      if (num) setOrderNumber(num);
      if (ph) setPhoneNumber(ph);
      fetchOrder(num || '', ph || '');
    }
  }, []);

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    fetchOrder(orderNumber, phoneNumber);
  };

  const steps = [
    {
      key: 'pending',
      title: 'Order Placed',
      title_bn: 'অর্ডার গৃহীত হয়েছে',
      desc: 'We have received your order details.',
      icon: Clock,
    },
    {
      key: 'confirmed',
      title: 'Order Confirmed',
      title_bn: 'অর্ডার নিশ্চিত হয়েছে',
      desc: 'Order verified and assigned to fulfillment.',
      icon: CheckCircle2,
    },
    {
      key: 'processing',
      title: 'Packaging & QC',
      title_bn: 'প্যাকিং ও কোয়ালিটি চেক',
      desc: 'Passed rigorous inspection and bubble-wrapped.',
      icon: Package,
    },
    {
      key: 'shipped',
      title: 'In Transit',
      title_bn: 'কুরিয়ারে হস্তান্তর',
      desc: 'Handed over to courier service for delivery.',
      icon: Truck,
    },
    {
      key: 'delivered',
      title: 'Delivered',
      title_bn: 'সফলভাবে ডেলিভারি',
      desc: 'Safely delivered to customer address.',
      icon: ShieldCheck,
    },
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

  const activeStepIdx = order ? getStepIndex(order.order_status) : 0;

  const supportWhatsAppUrl = `https://wa.me/8801642603236?text=${encodeURIComponent(
    `Hello NS TechSphere, I need assistance regarding my order #${order?.order_number || orderNumber} (Phone: ${order?.customer_phone || phoneNumber}).`
  )}`;

  return (
    <div className="w-full px-3 sm:px-6 lg:px-8 xl:px-12 2xl:px-16 py-8 sm:py-12 space-y-8 max-w-5xl mx-auto">
      {/* Breadcrumb */}
      <nav className="flex items-center gap-1.5 text-xs text-neutral-400">
        <Link href="/" className="hover:text-foreground">
          Home
        </Link>
        <ChevronRight className="w-3.5 h-3.5" />
        <span className="text-foreground font-medium">Track Your Order</span>
      </nav>

      {/* Hero Header */}
      <div className="text-center space-y-2">
        <h1 className="text-2xl sm:text-4xl font-black tracking-tight text-foreground">
          {language === 'bn' ? 'অর্ডার লাইভ ট্র্যাকিং' : 'Track Your Order'}
        </h1>
        <p className="text-xs sm:text-sm text-neutral-400 max-w-lg mx-auto">
          {language === 'bn'
            ? 'আপনার অর্ডার নম্বর এবং ফোন নম্বর দিয়ে লাইভ স্ট্যাটাস ও ডেলিভারি অগ্রগতি যাচাই করুন।'
            : 'Enter your order reference number and phone number to monitor live shipment status.'}
        </p>
      </div>

      {/* Dual Input Search Card (Order Number + Phone Number) */}
      <div className="p-5 sm:p-7 rounded-3xl liquid-glass-elevated border border-neutral-200/90 dark:border-neutral-800/90 backdrop-blur-2xl shadow-xl max-w-2xl mx-auto">
        <form onSubmit={handleSearch} className="space-y-4">
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 sm:gap-4">
            {/* 1. Order Number Field */}
            <div className="space-y-1.5">
              <label className="text-xs font-bold text-foreground flex items-center gap-1.5">
                <Package className="w-3.5 h-3.5 text-neutral-400" />
                <span>{language === 'bn' ? 'অর্ডার নম্বর' : 'Order Number'}</span>
              </label>
              <input
                type="text"
                value={orderNumber}
                onChange={(e) => setOrderNumber(e.target.value.toUpperCase())}
                placeholder="e.g. NS-20261125-XXXX"
                className="w-full text-xs sm:text-sm px-3.5 py-2.5 rounded-xl border border-neutral-200 dark:border-neutral-800 bg-neutral-100/80 dark:bg-neutral-900/80 text-foreground outline-none font-mono tracking-wider focus:border-black dark:focus:border-white transition-colors"
              />
            </div>

            {/* 2. Phone Number Field (As requested by user) */}
            <div className="space-y-1.5">
              <label className="text-xs font-bold text-foreground flex items-center gap-1.5">
                <Phone className="w-3.5 h-3.5 text-neutral-400" />
                <span>{language === 'bn' ? 'মোবাইল নম্বর' : 'Phone Number'}</span>
              </label>
              <input
                type="tel"
                value={phoneNumber}
                onChange={(e) => setPhoneNumber(e.target.value)}
                placeholder="e.g. 01XXXXXXXXX"
                className="w-full text-xs sm:text-sm px-3.5 py-2.5 rounded-xl border border-neutral-200 dark:border-neutral-800 bg-neutral-100/80 dark:bg-neutral-900/80 text-foreground outline-none font-medium focus:border-black dark:focus:border-white transition-colors"
              />
            </div>
          </div>

          <div className="flex flex-col sm:flex-row items-center justify-between gap-3 pt-2">
            <span className="text-[11px] text-neutral-400">
              {language === 'bn'
                ? '* অর্ডার নম্বর অথবা ফোন নম্বর দিয়ে অনুসন্ধান করতে পারেন'
                : '* You can track using either or both for security verification'}
            </span>
            <button
              type="submit"
              disabled={isLoading}
              className="w-full sm:w-auto px-7 py-2.5 rounded-xl bg-black text-white dark:bg-white dark:text-black text-xs font-black uppercase tracking-wider hover:opacity-90 active:scale-95 transition-all disabled:opacity-50 flex items-center justify-center gap-2 shadow-md shrink-0"
            >
              {isLoading ? (
                <>
                  <div className="w-3.5 h-3.5 border-2 border-white/40 dark:border-black/40 border-t-white dark:border-t-black rounded-full animate-spin" />
                  <span>Checking...</span>
                </>
              ) : (
                <>
                  <Search className="w-3.5 h-3.5" />
                  <span>{language === 'bn' ? 'অর্ডার খুঁজুন' : 'Track Order'}</span>
                </>
              )}
            </button>
          </div>
        </form>
      </div>

      {/* Error Message */}
      {errorMessage && (
        <div className="max-w-2xl mx-auto p-4 rounded-2xl bg-rose-50 dark:bg-rose-950/30 border border-rose-200 dark:border-rose-900/50 text-rose-700 dark:text-rose-300 flex items-start gap-3 animate-in fade-in">
          <AlertCircle className="w-5 h-5 shrink-0 mt-0.5" />
          <div className="text-xs font-medium space-y-1">
            <p className="font-bold">{errorMessage}</p>
            <p className="text-[11px] text-rose-600/80 dark:text-rose-400/80">
              Need assistance? WhatsApp helpline:{' '}
              <a
                href="https://wa.me/8801642603236"
                target="_blank"
                rel="noreferrer"
                className="underline font-bold"
              >
                01642603236
              </a>
            </p>
          </div>
        </div>
      )}

      {/* Order Details Display Card */}
      {order && (
        <div className="space-y-6 animate-in fade-in slide-in-from-bottom-2 duration-300">
          {/* Main Status & Order Header */}
          <div className="p-6 sm:p-8 rounded-3xl liquid-glass-elevated border border-neutral-200/90 dark:border-neutral-800/90 backdrop-blur-2xl shadow-xl space-y-6">
            <div className="flex flex-col md:flex-row md:items-center justify-between pb-6 border-b border-neutral-200/80 dark:border-neutral-800/80 gap-4">
              <div className="space-y-1">
                <div className="flex items-center gap-2.5">
                  <span className="font-mono text-base sm:text-lg font-black text-foreground">
                    #{order.order_number}
                  </span>
                  <span
                    className={`px-3 py-1 rounded-full text-xs font-black uppercase tracking-wider ${
                      order.order_status === 'delivered'
                        ? 'bg-emerald-500 text-white'
                        : order.order_status === 'shipped'
                        ? 'bg-blue-500 text-white'
                        : order.order_status === 'cancelled'
                        ? 'bg-rose-500 text-white'
                        : 'bg-amber-500 text-white'
                    }`}
                  >
                    {order.order_status}
                  </span>
                </div>
                <p className="text-xs text-neutral-400">
                  Placed on {new Date(order.created_at).toLocaleDateString('en-US', {
                    day: 'numeric',
                    month: 'long',
                    year: 'numeric',
                    hour: '2-digit',
                    minute: '2-digit',
                  })}
                </p>
              </div>

              <div className="flex items-center gap-3">
                <a
                  href={supportWhatsAppUrl}
                  target="_blank"
                  rel="noreferrer"
                  className="flex items-center gap-2 px-4 py-2 rounded-xl bg-[#25D366] text-white text-xs font-bold shadow-md hover:opacity-90 active:scale-95 transition-all"
                >
                  <MessageCircle className="w-4 h-4" />
                  <span>Support on WhatsApp</span>
                </a>
              </div>
            </div>

            {/* Stepper Progress Bar */}
            <div className="py-4">
              <div className="relative">
                {/* Horizontal Bar (Desktop) */}
                <div className="hidden md:block absolute top-1/2 left-0 right-0 h-1 bg-neutral-200 dark:bg-neutral-800 -translate-y-1/2 z-0" />
                <div
                  className="hidden md:block absolute top-1/2 left-0 h-1 bg-black dark:bg-white -translate-y-1/2 transition-all duration-500 z-0"
                  style={{ width: `${(activeStepIdx / (steps.length - 1)) * 100}%` }}
                />

                <div className="grid grid-cols-1 md:grid-cols-5 gap-6 md:gap-2 relative z-10">
                  {steps.map((st, idx) => {
                    const isPassed = idx <= activeStepIdx;
                    const isCurrent = idx === activeStepIdx;
                    const Icon = st.icon;

                    return (
                      <div key={st.key} className="flex md:flex-col items-center gap-3.5 md:gap-2 md:text-center">
                        <div
                          className={`w-10 h-10 rounded-full flex items-center justify-center font-bold text-xs transition-all duration-300 shrink-0 ${
                            isPassed
                              ? 'bg-black text-white dark:bg-white dark:text-black shadow-md scale-105'
                              : 'bg-neutral-100 dark:bg-neutral-900 text-neutral-400 border border-neutral-300 dark:border-neutral-700'
                          } ${isCurrent ? 'ring-4 ring-black/20 dark:ring-white/20' : ''}`}
                        >
                          <Icon className="w-4 h-4" />
                        </div>
                        <div>
                          <p
                            className={`text-xs font-bold ${
                              isPassed ? 'text-foreground' : 'text-neutral-400'
                            }`}
                          >
                            {language === 'bn' ? st.title_bn : st.title}
                          </p>
                          <p className="text-[10px] text-neutral-400 mt-0.5 line-clamp-1">{st.desc}</p>
                        </div>
                      </div>
                    );
                  })}
                </div>
              </div>
            </div>

            {/* Delivery Info & Ordered Items Grid */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 pt-6 border-t border-neutral-200/80 dark:border-neutral-800/80">
              {/* Shipping Details */}
              <div className="space-y-4">
                <h4 className="text-xs font-black uppercase tracking-wider text-neutral-400 flex items-center gap-2">
                  <MapPin className="w-3.5 h-3.5" />
                  <span>Delivery Address</span>
                </h4>
                <div className="p-4 rounded-2xl bg-neutral-100/70 dark:bg-neutral-900/70 border border-neutral-200/60 dark:border-neutral-800 space-y-2 text-xs">
                  <div className="flex justify-between font-bold text-foreground">
                    <span>{order.customer_name}</span>
                    <span className="font-mono text-neutral-400">{order.customer_phone}</span>
                  </div>
                  <p className="text-neutral-600 dark:text-neutral-300">{order.full_address}</p>
                  <p className="text-neutral-400">
                    {order.area}, {order.district}, {order.division}
                  </p>
                  <div className="pt-2 mt-2 border-t border-neutral-200/60 dark:border-neutral-800 flex items-center justify-between text-[11px]">
                    <span className="text-neutral-400">Payment:</span>
                    <span className="font-bold uppercase text-foreground">
                      {order.payment_method === 'cod' ? 'Cash on Delivery' : order.payment_method} (
                      {order.payment_status})
                    </span>
                  </div>
                </div>
              </div>

              {/* Items Summary */}
              <div className="space-y-4">
                <h4 className="text-xs font-black uppercase tracking-wider text-neutral-400 flex items-center gap-2">
                  <Package className="w-3.5 h-3.5" />
                  <span>Items Ordered ({order.items?.length || 0})</span>
                </h4>
                <div className="space-y-2 max-h-56 overflow-y-auto no-scrollbar pr-1">
                  {order.items?.map((item) => (
                    <div
                      key={item.id}
                      className="flex items-center gap-3 p-2.5 rounded-2xl bg-neutral-100/70 dark:bg-neutral-900/70 border border-neutral-200/60 dark:border-neutral-800"
                    >
                      <div className="w-12 h-12 rounded-xl overflow-hidden bg-neutral-200 dark:bg-neutral-800 shrink-0">
                        <img
                          src={item.image_url || '/placeholder.png'}
                          alt={item.product_name}
                          className="w-full h-full object-cover"
                        />
                      </div>
                      <div className="flex-1 min-w-0">
                        <p className="text-xs font-bold text-foreground truncate">
                          {item.product_name}
                        </p>
                        {item.variant_name && (
                          <p className="text-[10px] text-neutral-400 truncate">
                            {item.variant_name}
                          </p>
                        )}
                        <p className="text-[10px] text-neutral-400">
                          Qty: {item.quantity} × {formatPrice(item.unit_price, settings.general.currency_symbol)}
                        </p>
                      </div>
                      <div className="text-xs font-black text-foreground">
                        {formatPrice(item.total_price || item.unit_price * item.quantity, settings.general.currency_symbol)}
                      </div>
                    </div>
                  ))}
                </div>

                {/* Total breakdown */}
                <div className="p-3.5 rounded-2xl bg-neutral-100/70 dark:bg-neutral-900/70 border border-neutral-200/60 dark:border-neutral-800 text-xs space-y-1.5">
                  <div className="flex justify-between text-neutral-500">
                    <span>Subtotal:</span>
                    <span>{formatPrice(order.subtotal, settings.general.currency_symbol)}</span>
                  </div>
                  <div className="flex justify-between text-neutral-500">
                    <span>Delivery Fee:</span>
                    <span>{formatPrice(order.shipping_charge, settings.general.currency_symbol)}</span>
                  </div>
                  {order.discount > 0 && (
                    <div className="flex justify-between text-emerald-600 dark:text-emerald-400 font-semibold">
                      <span>Discount:</span>
                      <span>-{formatPrice(order.discount, settings.general.currency_symbol)}</span>
                    </div>
                  )}
                  <div className="flex justify-between font-black text-sm text-foreground pt-1.5 border-t border-neutral-200/60 dark:border-neutral-800">
                    <span>Total Payable:</span>
                    <span>{formatPrice(order.grand_total, settings.general.currency_symbol)}</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Frequently Asked Questions */}
      <div className="pt-8 border-t border-neutral-200 dark:border-neutral-800 space-y-4">
        <div className="flex items-center gap-2">
          <HelpCircle className="w-4 h-4 text-neutral-400" />
          <h3 className="text-sm font-black uppercase tracking-wider text-foreground">
            {language === 'bn' ? 'ডেলিভারি সম্পর্কিত সচরাচর জিজ্ঞাসা' : 'Delivery Tracking FAQs'}
          </h3>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-3.5">
          <div className="p-4 rounded-2xl border border-neutral-200 dark:border-neutral-800 liquid-glass space-y-1">
            <h4 className="text-xs font-bold text-foreground">
              {language === 'bn' ? 'অর্ডার পৌঁছাতে কত সময় লাগে?' : 'How long does delivery take?'}
            </h4>
            <p className="text-xs text-neutral-400 leading-relaxed">
              Inside Dhaka: 24–48 hours via express courier. Outside Dhaka: 2–4 working days nationwide across all 64 districts.
            </p>
          </div>
          <div className="p-4 rounded-2xl border border-neutral-200 dark:border-neutral-800 liquid-glass space-y-1">
            <h4 className="text-xs font-bold text-foreground">
              {language === 'bn' ? 'আমি কি ডেলিভারি ঠিকানা পরিবর্তন করতে পারি?' : 'Can I modify my delivery address?'}
            </h4>
            <p className="text-xs text-neutral-400 leading-relaxed">
              Yes, before your parcel is handed over to the courier (status "In Transit"), contact our WhatsApp helpline at 01642603236 to update details.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}

export default function TrackOrderPage() {
  return (
    <Suspense
      fallback={
        <div className="py-24 text-center">
          <div className="w-8 h-8 rounded-full border-2 border-neutral-300 border-t-black dark:border-t-white animate-spin mx-auto" />
        </div>
      }
    >
      <TrackOrderContent />
    </Suspense>
  );
}
