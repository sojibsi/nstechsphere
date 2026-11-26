'use client';

import React, { useState } from 'react';
import { useRouter } from 'next/navigation';
import { useApp } from '@/lib/context/app-context';
import { formatPrice } from '@/lib/utils';
import { ShieldCheck, Truck, ArrowRight, Lock, AlertCircle } from 'lucide-react';
import Link from 'next/link';

const BANGLADESH_DIVISIONS = [
  'Dhaka',
  'Chittagong',
  'Rajshahi',
  'Khulna',
  'Sylhet',
  'Barisal',
  'Rangpur',
  'Mymensingh',
];

export default function CheckoutPage() {
  const {
    cart,
    clearCart,
    deliveryZone,
    setDeliveryZone,
    settings,
    t,
    showToast,
  } = useApp();
  const router = useRouter();

  // Form Fields
  const [fullName, setFullName] = useState('');
  const [phone, setPhone] = useState('');
  const [email, setEmail] = useState('');
  const [division, setDivision] = useState('Dhaka');
  const [district, setDistrict] = useState('Dhaka');
  const [area, setArea] = useState('');
  const [fullAddress, setFullAddress] = useState('');
  const [orderNotes, setOrderNotes] = useState('');
  const [paymentMethod, setPaymentMethod] = useState<'cod' | 'bkash' | 'nagad' | 'sslcommerz'>('cod');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');

  if (cart.items.length === 0) {
    return (
      <div className="max-w-xl mx-auto px-4 py-24 text-center space-y-4">
        <h2 className="text-xl font-bold">{t.cartEmpty}</h2>
        <p className="text-xs text-neutral-400">
          Please add items to your cart before proceeding to checkout.
        </p>
        <Link
          href="/products"
          className="inline-block px-6 py-2.5 rounded-full bg-black text-white dark:bg-white dark:text-black text-xs font-semibold"
        >
          {t.continueShopping}
        </Link>
      </div>
    );
  }

  const handleSubmitOrder = async (e: React.FormEvent) => {
    e.preventDefault();
    setErrorMessage('');

    if (paymentMethod !== 'cod') {
      setErrorMessage(
        'Online Gateway Integration Note: bKash/Nagad/SSLCommerz require live merchant API credentials in production. Cash on Delivery is currently fully operational.'
      );
      return;
    }

    if (!fullName.trim() || !phone.trim() || !area.trim() || !fullAddress.trim()) {
      setErrorMessage('Please fill in all required delivery details.');
      return;
    }

    setIsSubmitting(true);

    try {
      const payload = {
        customer_name: fullName.trim(),
        customer_email: email.trim() || undefined,
        customer_phone: phone.trim(),
        division,
        district,
        area: area.trim(),
        full_address: fullAddress.trim(),
        order_notes: orderNotes.trim() || undefined,
        payment_method: paymentMethod,
        delivery_zone: deliveryZone,
        couponCode: cart.couponCode,
        items: cart.items.map((i) => ({
          productId: i.productId,
          variantId: i.variantId,
          quantity: i.quantity,
        })),
      };

      const res = await fetch('/api/orders', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload),
      });

      const data = await res.json();

      if (res.ok && data.order_number) {
        clearCart();
        showToast(t.orderSuccessTitle, 'success');
        router.push(`/order-confirmation/${data.order_number}`);
      } else {
        setErrorMessage(data.error || 'Failed to submit order. Please try again.');
      }
    } catch {
      setErrorMessage('A network error occurred. Please try again.');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="w-full px-3 sm:px-6 lg:px-8 xl:px-12 2xl:px-16 py-6 sm:py-8 space-y-6 sm:space-y-8">
      <div className="pb-4 sm:pb-6 border-b border-neutral-200 dark:border-neutral-800">
        <h1 className="text-xl sm:text-2xl md:text-3xl font-extrabold tracking-tight text-foreground">
          Checkout & Order Confirmation
        </h1>
        <p className="text-xs text-neutral-400 mt-1">
          Fast guest checkout or registered order processing for Bangladesh
        </p>
      </div>

      {errorMessage && (
        <div className="p-3.5 sm:p-4 rounded-xl border border-red-500/30 bg-red-500/10 text-red-600 dark:text-red-400 text-xs flex items-center gap-3">
          <AlertCircle className="w-4 h-4 shrink-0" />
          <span>{errorMessage}</span>
        </div>
      )}

      <form onSubmit={handleSubmitOrder}>
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 sm:gap-8">
          {/* Shipping & Delivery Details */}
          <div className="lg:col-span-2 space-y-6">
            <div className="p-4 sm:p-6 rounded-2xl sm:rounded-3xl border border-neutral-200 dark:border-neutral-800 bg-white dark:bg-neutral-950/40 space-y-4 sm:space-y-5">
              <h2 className="text-sm font-bold uppercase tracking-wider text-foreground flex items-center gap-2">
                <Truck className="w-4 h-4" />
                <span>1. {t.customerInformation}</span>
              </h2>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="text-xs font-semibold text-neutral-500 block mb-1">
                    {t.fullName} *
                  </label>
                  <input
                    type="text"
                    value={fullName}
                    onChange={(e) => setFullName(e.target.value)}
                    placeholder="e.g. Asif Mahmud"
                    className="w-full text-xs px-3.5 py-2.5 rounded-xl border border-neutral-300 dark:border-neutral-700 bg-background text-foreground outline-none"
                    required
                  />
                </div>

                <div>
                  <label className="text-xs font-semibold text-neutral-500 block mb-1">
                    {t.mobileNumber} *
                  </label>
                  <input
                    type="tel"
                    value={phone}
                    onChange={(e) => setPhone(e.target.value)}
                    placeholder="017XXXXXXXX"
                    className="w-full text-xs px-3.5 py-2.5 rounded-xl border border-neutral-300 dark:border-neutral-700 bg-background text-foreground outline-none"
                    required
                  />
                </div>
              </div>

              <div>
                <label className="text-xs font-semibold text-neutral-500 block mb-1">
                  {t.emailAddress}
                </label>
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="asif@gmail.com (for order tracking notifications)"
                  className="w-full text-xs px-3.5 py-2.5 rounded-xl border border-neutral-300 dark:border-neutral-700 bg-background text-foreground outline-none"
                />
              </div>

              {/* Delivery Zone Selector */}
              <div>
                <label className="text-xs font-semibold text-neutral-500 block mb-1.5">
                  Delivery Region *
                </label>
                <div className="grid grid-cols-2 gap-3">
                  <button
                    type="button"
                    onClick={() => {
                      setDeliveryZone('inside_dhaka');
                      setDivision('Dhaka');
                      setDistrict('Dhaka');
                    }}
                    className={`py-3 px-4 rounded-xl text-xs font-semibold border text-left transition-all ${
                      deliveryZone === 'inside_dhaka'
                        ? 'border-black bg-black text-white dark:border-white dark:bg-white dark:text-black shadow-sm'
                        : 'border-neutral-200 dark:border-neutral-800 text-neutral-500'
                    }`}
                  >
                    <div>{t.insideDhaka}</div>
                    <div className="text-[10px] opacity-70">24-48 Hours Express</div>
                  </button>

                  <button
                    type="button"
                    onClick={() => setDeliveryZone('outside_dhaka')}
                    className={`py-3 px-4 rounded-xl text-xs font-semibold border text-left transition-all ${
                      deliveryZone === 'outside_dhaka'
                        ? 'border-black bg-black text-white dark:border-white dark:bg-white dark:text-black shadow-sm'
                        : 'border-neutral-200 dark:border-neutral-800 text-neutral-500'
                    }`}
                  >
                    <div>{t.outsideDhaka}</div>
                    <div className="text-[10px] opacity-70">Nationwide Courier</div>
                  </button>
                </div>
              </div>

              {/* Address details */}
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                <div>
                  <label className="text-xs font-semibold text-neutral-500 block mb-1">
                    {t.division} *
                  </label>
                  <select
                    value={division}
                    onChange={(e) => setDivision(e.target.value)}
                    className="w-full text-xs px-3 py-2.5 rounded-xl border border-neutral-300 dark:border-neutral-700 bg-background text-foreground outline-none"
                  >
                    {BANGLADESH_DIVISIONS.map((div) => (
                      <option key={div} value={div}>
                        {div}
                      </option>
                    ))}
                  </select>
                </div>

                <div>
                  <label className="text-xs font-semibold text-neutral-500 block mb-1">
                    {t.district} *
                  </label>
                  <input
                    type="text"
                    value={district}
                    onChange={(e) => setDistrict(e.target.value)}
                    placeholder="e.g. Dhaka / Chittagong"
                    className="w-full text-xs px-3.5 py-2.5 rounded-xl border border-neutral-300 dark:border-neutral-700 bg-background text-foreground outline-none"
                    required
                  />
                </div>

                <div>
                  <label className="text-xs font-semibold text-neutral-500 block mb-1">
                    {t.area} *
                  </label>
                  <input
                    type="text"
                    value={area}
                    onChange={(e) => setArea(e.target.value)}
                    placeholder="e.g. Banani / Mirpur 10"
                    className="w-full text-xs px-3.5 py-2.5 rounded-xl border border-neutral-300 dark:border-neutral-700 bg-background text-foreground outline-none"
                    required
                  />
                </div>
              </div>

              <div>
                <label className="text-xs font-semibold text-neutral-500 block mb-1">
                  {t.fullAddress} *
                </label>
                <textarea
                  value={fullAddress}
                  onChange={(e) => setFullAddress(e.target.value)}
                  rows={2}
                  placeholder="House number, Road number, Flat/Apartment, Landmark"
                  className="w-full text-xs px-3.5 py-2.5 rounded-xl border border-neutral-300 dark:border-neutral-700 bg-background text-foreground outline-none resize-none"
                  required
                />
              </div>

              <div>
                <label className="text-xs font-semibold text-neutral-500 block mb-1">
                  {t.orderNotes}
                </label>
                <input
                  type="text"
                  value={orderNotes}
                  onChange={(e) => setOrderNotes(e.target.value)}
                  placeholder="e.g. Please deliver after 3:00 PM"
                  className="w-full text-xs px-3.5 py-2.5 rounded-xl border border-neutral-300 dark:border-neutral-700 bg-background text-foreground outline-none"
                />
              </div>
            </div>

            {/* Payment Method Selector */}
            <div className="p-6 rounded-3xl border border-neutral-200 dark:border-neutral-800 bg-white dark:bg-neutral-950/40 space-y-4">
              <h2 className="text-sm font-bold uppercase tracking-wider text-foreground flex items-center gap-2">
                <Lock className="w-4 h-4" />
                <span>2. {t.paymentMethod}</span>
              </h2>

              <div className="space-y-2.5">
                <label className="flex items-center gap-3 p-3.5 rounded-xl border border-black dark:border-white bg-neutral-50/50 dark:bg-neutral-900/60 cursor-pointer">
                  <input
                    type="radio"
                    name="payment_method"
                    value="cod"
                    checked={paymentMethod === 'cod'}
                    onChange={() => setPaymentMethod('cod')}
                    className="accent-black dark:accent-white"
                  />
                  <div>
                    <div className="text-xs font-bold text-foreground">
                      {t.cashOnDelivery}
                    </div>
                    <div className="text-[11px] text-neutral-400">
                      Pay with cash when the courier hands over the package at your doorstep.
                    </div>
                  </div>
                </label>

                <label className="flex items-center gap-3 p-3.5 rounded-xl border border-neutral-200 dark:border-neutral-800 opacity-60 cursor-pointer hover:opacity-100 transition-opacity">
                  <input
                    type="radio"
                    name="payment_method"
                    value="bkash"
                    checked={paymentMethod === 'bkash'}
                    onChange={() => setPaymentMethod('bkash')}
                    className="accent-black dark:accent-white"
                  />
                  <div>
                    <div className="text-xs font-bold text-foreground">
                      {t.bkashPayment} (Digital Gateway)
                    </div>
                    <div className="text-[11px] text-neutral-400">
                      Merchant credentials required in production.
                    </div>
                  </div>
                </label>
              </div>
            </div>
          </div>

          {/* Right Summary Panel */}
          <div>
            <div className="sticky top-24 p-6 rounded-3xl border border-neutral-200 dark:border-neutral-800 bg-neutral-50 dark:bg-neutral-950/60 space-y-5">
              <h3 className="text-sm font-bold uppercase tracking-wider text-foreground pb-2 border-b border-neutral-200 dark:border-neutral-800">
                Order Review ({cart.items.length})
              </h3>

              <div className="max-h-60 overflow-y-auto space-y-3 pr-1">
                {cart.items.map((item) => (
                  <div key={item.id} className="flex items-center gap-3 text-xs">
                    <img
                      src={item.product.images[0]?.image_url || '/placeholder.png'}
                      alt=""
                      className="w-10 h-10 object-cover rounded-lg border border-neutral-200 dark:border-neutral-800 shrink-0"
                    />
                    <div className="flex-1 min-w-0">
                      <div className="font-semibold text-foreground truncate">
                        {item.product.name}
                      </div>
                      <div className="text-neutral-400 text-[11px]">
                        Qty: {item.quantity} {item.variant && `• ${item.variant.name}`}
                      </div>
                    </div>
                    <div className="font-bold text-foreground">
                      {formatPrice(item.totalPrice, settings.general.currency_symbol)}
                    </div>
                  </div>
                ))}
              </div>

              {/* Price Breakdown */}
              <div className="pt-4 border-t border-neutral-200 dark:border-neutral-800 space-y-2 text-xs text-neutral-500">
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

              <button
                type="submit"
                disabled={isSubmitting}
                className="w-full py-3.5 px-6 rounded-full bg-black text-white dark:bg-white dark:text-black text-xs font-bold uppercase tracking-wider hover:opacity-90 transition-smooth flex items-center justify-center gap-2 shadow-md disabled:opacity-50"
              >
                <span>{isSubmitting ? 'Placing Order...' : t.orderNow}</span>
                <ArrowRight className="w-4 h-4" />
              </button>

              <div className="text-[11px] text-neutral-400 text-center flex items-center justify-center gap-1.5 pt-2">
                <ShieldCheck className="w-3.5 h-3.5" />
                <span>Zero fraud guarantee with official brand warranty</span>
              </div>
            </div>
          </div>
        </div>
      </form>
    </div>
  );
}
