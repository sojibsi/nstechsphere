import React from 'react';
import Link from 'next/link';
import {
  Truck,
  ShieldCheck,
  Clock,
  MapPin,
  Package,
  AlertCircle,
  HelpCircle,
  ChevronRight,
  PhoneCall,
  CheckCircle2,
} from 'lucide-react';

export default function ShippingPolicyPage() {
  return (
    <div className="w-full px-3 sm:px-6 lg:px-8 xl:px-12 2xl:px-16 py-8 sm:py-12 space-y-10">
      {/* Breadcrumb */}
      <nav className="flex items-center gap-1.5 text-xs text-neutral-400">
        <Link href="/" className="hover:text-foreground">
          Home
        </Link>
        <ChevronRight className="w-3.5 h-3.5" />
        <span className="text-foreground font-medium">Shipping & Delivery Policy</span>
      </nav>

      {/* Hero Header */}
      <div className="rounded-3xl border border-neutral-200/90 dark:border-neutral-800/90 liquid-glass-elevated p-6 sm:p-10 relative overflow-hidden space-y-3">
        <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full border border-neutral-300 dark:border-neutral-700 bg-black/5 dark:bg-white/10 text-[10px] font-bold uppercase tracking-wider text-foreground">
          <Truck className="w-3.5 h-3.5" />
          <span>Nationwide Logistics</span>
        </div>
        <h1 className="text-2xl sm:text-4xl font-black tracking-tight text-foreground">
          Shipping & Delivery Policy
        </h1>
        <p className="text-xs sm:text-sm text-neutral-500 dark:text-neutral-400 max-w-2xl leading-relaxed">
          At NS TechSphere, we take pride in delivering 100% authentic gadgets and high-performance electronics safely and swiftly to all 64 districts of Bangladesh.
        </p>
      </div>

      {/* Core Delivery Highlights Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {/* Inside Dhaka */}
        <div className="p-5 rounded-2xl border border-neutral-200 dark:border-neutral-800 liquid-glass space-y-2">
          <div className="w-10 h-10 rounded-xl bg-black text-white dark:bg-white dark:text-black flex items-center justify-center font-bold">
            <Truck className="w-5 h-5" />
          </div>
          <h3 className="text-sm font-black text-foreground">Inside Dhaka City</h3>
          <p className="text-xl font-black text-foreground">৳70</p>
          <p className="text-xs text-neutral-400">Estimated delivery within 24–48 hours after confirmation.</p>
        </div>

        {/* Outside Dhaka */}
        <div className="p-5 rounded-2xl border border-neutral-200 dark:border-neutral-800 liquid-glass space-y-2">
          <div className="w-10 h-10 rounded-xl bg-black text-white dark:bg-white dark:text-black flex items-center justify-center font-bold">
            <MapPin className="w-5 h-5" />
          </div>
          <h3 className="text-sm font-black text-foreground">Outside Dhaka (64 Districts)</h3>
          <p className="text-xl font-black text-foreground">৳130</p>
          <p className="text-xs text-neutral-400">Reliable nationwide courier within 2–4 working days.</p>
        </div>

        {/* Cash on Delivery */}
        <div className="p-5 rounded-2xl border border-neutral-200 dark:border-neutral-800 liquid-glass space-y-2">
          <div className="w-10 h-10 rounded-xl bg-black text-white dark:bg-white dark:text-black flex items-center justify-center font-bold">
            <CheckCircle2 className="w-5 h-5" />
          </div>
          <h3 className="text-sm font-black text-foreground">Cash On Delivery (COD)</h3>
          <p className="text-xl font-black text-foreground">Available</p>
          <p className="text-xs text-neutral-400">Pay safely upon receiving your parcel at your doorstep.</p>
        </div>

        {/* Free Shipping */}
        <div className="p-5 rounded-2xl border border-neutral-200 dark:border-neutral-800 liquid-glass space-y-2">
          <div className="w-10 h-10 rounded-xl bg-black text-white dark:bg-white dark:text-black flex items-center justify-center font-bold">
            <ShieldCheck className="w-5 h-5" />
          </div>
          <h3 className="text-sm font-black text-foreground">Free Delivery Tier</h3>
          <p className="text-xl font-black text-foreground">Over ৳25,000</p>
          <p className="text-xs text-neutral-400">Enjoy complimentary delivery on premium tech bundles.</p>
        </div>
      </div>

      {/* Broad Detailed Sections */}
      <div className="space-y-8">
        {/* Section 1: Order Processing & Dispatch Timelines */}
        <div className="p-6 sm:p-8 rounded-3xl border border-neutral-200 dark:border-neutral-800 liquid-glass space-y-4">
          <div className="flex items-center gap-2.5">
            <Clock className="w-5 h-5 text-foreground" />
            <h2 className="text-base sm:text-lg font-black text-foreground">
              1. Order Processing & Dispatch Timelines
            </h2>
          </div>
          <p className="text-xs sm:text-sm text-neutral-600 dark:text-neutral-300 leading-relaxed">
            All orders placed on <strong>nstechsphere.store</strong> undergo immediate stock validation and fraud verification.
          </p>
          <ul className="space-y-2 text-xs sm:text-sm text-neutral-600 dark:text-neutral-300 list-disc list-inside">
            <li><strong>Cut-off Time:</strong> Orders placed before 4:00 PM are processed and handed over to our courier partners on the same business day.</li>
            <li><strong>Order Confirmation:</strong> Our team will confirm high-value or COD orders via a quick verification call or SMS to ensure accurate address details.</li>
            <li><strong>Holidays & Weekends:</strong> Delivery schedules may occasionally vary during government holidays, severe weather conditions, or festive seasons (Eid, Puja, New Year).</li>
          </ul>
        </div>

        {/* Section 2: Logistics & Courier Partners */}
        <div className="p-6 sm:p-8 rounded-3xl border border-neutral-200 dark:border-neutral-800 liquid-glass space-y-4">
          <div className="flex items-center gap-2.5">
            <Truck className="w-5 h-5 text-foreground" />
            <h2 className="text-base sm:text-lg font-black text-foreground">
              2. Trusted Courier Partners
            </h2>
          </div>
          <p className="text-xs sm:text-sm text-neutral-600 dark:text-neutral-300 leading-relaxed">
            We partner with Bangladesh’s leading logistics networks to guarantee rapid parcel transit and real-time electronic tracking:
          </p>
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 pt-2">
            <div className="p-3 rounded-xl bg-neutral-100 dark:bg-neutral-900 text-center font-bold text-xs text-foreground">
              Steadfast Courier
            </div>
            <div className="p-3 rounded-xl bg-neutral-100 dark:bg-neutral-900 text-center font-bold text-xs text-foreground">
              Pathao Courier
            </div>
            <div className="p-3 rounded-xl bg-neutral-100 dark:bg-neutral-900 text-center font-bold text-xs text-foreground">
              RedX Delivery
            </div>
            <div className="p-3 rounded-xl bg-neutral-100 dark:bg-neutral-900 text-center font-bold text-xs text-foreground">
              Paperfly Private Ltd
            </div>
          </div>
        </div>

        {/* Section 3: Safe Packaging & Transit Protection */}
        <div className="p-6 sm:p-8 rounded-3xl border border-neutral-200 dark:border-neutral-800 liquid-glass space-y-4">
          <div className="flex items-center gap-2.5">
            <Package className="w-5 h-5 text-foreground" />
            <h2 className="text-base sm:text-lg font-black text-foreground">
              3. Packaging & Fragile Device Handling
            </h2>
          </div>
          <p className="text-xs sm:text-sm text-neutral-600 dark:text-neutral-300 leading-relaxed">
            Every gadget, smart watch, drone, or high-fidelity audio gear is packed in shock-absorbing multi-layer bubble wrap, reinforced corrugated boxes, and sealed with tamper-evident security tape.
          </p>
          <div className="p-4 rounded-2xl bg-amber-500/10 border border-amber-500/30 text-xs text-neutral-700 dark:text-neutral-300 space-y-1">
            <p className="font-bold flex items-center gap-1.5 text-amber-600 dark:text-amber-400">
              <AlertCircle className="w-4 h-4" />
              <span>Inspection on Delivery Recommended:</span>
            </p>
            <p>
              Please inspect the outer packaging in front of the delivery agent. If the security seal is broken or tampered with, do not accept the package and notify us immediately at <strong>01642603236</strong>.
            </p>
          </div>
        </div>

        {/* Section 4: Live Order Tracking */}
        <div className="p-6 sm:p-8 rounded-3xl border border-neutral-200 dark:border-neutral-800 liquid-glass space-y-4">
          <div className="flex items-center gap-2.5">
            <MapPin className="w-5 h-5 text-foreground" />
            <h2 className="text-base sm:text-lg font-black text-foreground">
              4. Real-Time Tracking & Helpline
            </h2>
          </div>
          <p className="text-xs sm:text-sm text-neutral-600 dark:text-neutral-300 leading-relaxed">
            Once dispatched, you will receive an SMS containing your tracking code. You can also view live delivery steps directly through our website tracker.
          </p>
          <div className="flex flex-wrap items-center gap-3 pt-2">
            <Link
              href="/track-order"
              className="px-5 py-2.5 rounded-xl bg-black text-white dark:bg-white dark:text-black text-xs font-bold uppercase tracking-wider hover:opacity-90 transition-opacity"
            >
              Track Order Live
            </Link>
            <a
              href="https://wa.me/8801642603236"
              target="_blank"
              rel="noreferrer"
              className="px-5 py-2.5 rounded-xl bg-[#25D366] text-white text-xs font-bold hover:opacity-90 transition-opacity"
            >
              WhatsApp Support (01642603236)
            </a>
          </div>
        </div>
      </div>
    </div>
  );
}
