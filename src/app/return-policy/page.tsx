import React from 'react';
import Link from 'next/link';
import {
  RotateCcw,
  ShieldCheck,
  CheckCircle2,
  AlertCircle,
  HelpCircle,
  ChevronRight,
  MessageCircle,
  Clock,
  CreditCard,
  FileText,
} from 'lucide-react';

export default function ReturnPolicyPage() {
  return (
    <div className="w-full px-3 sm:px-6 lg:px-8 xl:px-12 2xl:px-16 py-8 sm:py-12 space-y-10">
      {/* Breadcrumb */}
      <nav className="flex items-center gap-1.5 text-xs text-neutral-400">
        <Link href="/" className="hover:text-foreground">
          Home
        </Link>
        <ChevronRight className="w-3.5 h-3.5" />
        <span className="text-foreground font-medium">Return & Refund Policy</span>
      </nav>

      {/* Hero Header */}
      <div className="rounded-3xl border border-neutral-200/90 dark:border-neutral-800/90 liquid-glass-elevated p-6 sm:p-10 relative overflow-hidden space-y-3">
        <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full border border-neutral-300 dark:border-neutral-700 bg-black/5 dark:bg-white/10 text-[10px] font-bold uppercase tracking-wider text-foreground">
          <ShieldCheck className="w-3.5 h-3.5" />
          <span>Customer Protection Guarantee</span>
        </div>
        <h1 className="text-2xl sm:text-4xl font-black tracking-tight text-foreground">
          Return, Replacement & Refund Policy
        </h1>
        <p className="text-xs sm:text-sm text-neutral-500 dark:text-neutral-400 max-w-2xl leading-relaxed">
          Customer satisfaction is our highest priority at NS TechSphere. Every authentic product purchased from us is protected by our transparent <strong>7-Day Replacement Guarantee</strong>.
        </p>
      </div>

      {/* Policy Highlights Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        <div className="p-5 rounded-2xl border border-neutral-200 dark:border-neutral-800 liquid-glass space-y-2">
          <div className="w-10 h-10 rounded-xl bg-black text-white dark:bg-white dark:text-black flex items-center justify-center font-bold">
            <RotateCcw className="w-5 h-5" />
          </div>
          <h3 className="text-sm font-black text-foreground">7 Days Window</h3>
          <p className="text-xl font-black text-foreground">Replacement</p>
          <p className="text-xs text-neutral-400">Claim free replacement within 7 days for any factory defect.</p>
        </div>

        <div className="p-5 rounded-2xl border border-neutral-200 dark:border-neutral-800 liquid-glass space-y-2">
          <div className="w-10 h-10 rounded-xl bg-black text-white dark:bg-white dark:text-black flex items-center justify-center font-bold">
            <CreditCard className="w-5 h-5" />
          </div>
          <h3 className="text-sm font-black text-foreground">Fast Refund</h3>
          <p className="text-xl font-black text-foreground">3–5 Days</p>
          <p className="text-xs text-neutral-400">Direct reimbursement via bKash, Nagad, or Bank Transfer.</p>
        </div>

        <div className="p-5 rounded-2xl border border-neutral-200 dark:border-neutral-800 liquid-glass space-y-2">
          <div className="w-10 h-10 rounded-xl bg-black text-white dark:bg-white dark:text-black flex items-center justify-center font-bold">
            <CheckCircle2 className="w-5 h-5" />
          </div>
          <h3 className="text-sm font-black text-foreground">100% Genuine</h3>
          <p className="text-xl font-black text-foreground">Warranty</p>
          <p className="text-xs text-neutral-400">All gadgets carry original official brand warranty support.</p>
        </div>

        <div className="p-5 rounded-2xl border border-neutral-200 dark:border-neutral-800 liquid-glass space-y-2">
          <div className="w-10 h-10 rounded-xl bg-black text-white dark:bg-white dark:text-black flex items-center justify-center font-bold">
            <MessageCircle className="w-5 h-5" />
          </div>
          <h3 className="text-sm font-black text-foreground">Live Support</h3>
          <p className="text-xl font-black text-foreground">WhatsApp</p>
          <p className="text-xs text-neutral-400">Instant resolution through our dedicated helpline 01642603236.</p>
        </div>
      </div>

      {/* Step by Step Return Process */}
      <div className="p-6 sm:p-8 rounded-3xl border border-neutral-200 dark:border-neutral-800 liquid-glass space-y-6">
        <div>
          <h2 className="text-base sm:text-xl font-black text-foreground">
            How to Request a Return or Replacement (Step-by-Step)
          </h2>
          <p className="text-xs text-neutral-400 mt-1">
            Follow these simple steps for hassle-free claim resolution:
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-5 gap-4">
          <div className="p-4 rounded-2xl bg-neutral-100/70 dark:bg-neutral-900/70 border border-neutral-200/60 dark:border-neutral-800 space-y-2">
            <span className="w-6 h-6 rounded-full bg-black text-white dark:bg-white dark:text-black text-xs font-black flex items-center justify-center">
              1
            </span>
            <h4 className="text-xs font-bold text-foreground">Contact Us</h4>
            <p className="text-[11px] text-neutral-500 dark:text-neutral-400 leading-normal">
              Message us on WhatsApp <strong>01642603236</strong> within 7 days of receiving your order.
            </p>
          </div>

          <div className="p-4 rounded-2xl bg-neutral-100/70 dark:bg-neutral-900/70 border border-neutral-200/60 dark:border-neutral-800 space-y-2">
            <span className="w-6 h-6 rounded-full bg-black text-white dark:bg-white dark:text-black text-xs font-black flex items-center justify-center">
              2
            </span>
            <h4 className="text-xs font-bold text-foreground">Share Evidence</h4>
            <p className="text-[11px] text-neutral-500 dark:text-neutral-400 leading-normal">
              Provide your order number, photos, or an unboxing video demonstrating the defect.
            </p>
          </div>

          <div className="p-4 rounded-2xl bg-neutral-100/70 dark:bg-neutral-900/70 border border-neutral-200/60 dark:border-neutral-800 space-y-2">
            <span className="w-6 h-6 rounded-full bg-black text-white dark:bg-white dark:text-black text-xs font-black flex items-center justify-center">
              3
            </span>
            <h4 className="text-xs font-bold text-foreground">Courier Pickup</h4>
            <p className="text-[11px] text-neutral-500 dark:text-neutral-400 leading-normal">
              We arrange a courier pickup from your doorstep or provide drop-off instructions.
            </p>
          </div>

          <div className="p-4 rounded-2xl bg-neutral-100/70 dark:bg-neutral-900/70 border border-neutral-200/60 dark:border-neutral-800 space-y-2">
            <span className="w-6 h-6 rounded-full bg-black text-white dark:bg-white dark:text-black text-xs font-black flex items-center justify-center">
              4
            </span>
            <h4 className="text-xs font-bold text-foreground">Quality Check</h4>
            <p className="text-[11px] text-neutral-500 dark:text-neutral-400 leading-normal">
              Our technical team verifies the defect within 24–48 hours of receiving the parcel.
            </p>
          </div>

          <div className="p-4 rounded-2xl bg-neutral-100/70 dark:bg-neutral-900/70 border border-neutral-200/60 dark:border-neutral-800 space-y-2">
            <span className="w-6 h-6 rounded-full bg-black text-white dark:bg-white dark:text-black text-xs font-black flex items-center justify-center">
              5
            </span>
            <h4 className="text-xs font-bold text-foreground">Replacement / Refund</h4>
            <p className="text-[11px] text-neutral-500 dark:text-neutral-400 leading-normal">
              Fresh brand-new replacement unit dispatched or full refund sent to your account.
            </p>
          </div>
        </div>
      </div>

      {/* Eligible vs Non-Eligible Conditions */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* Eligible */}
        <div className="p-6 rounded-3xl border border-emerald-500/30 bg-emerald-500/5 space-y-4">
          <div className="flex items-center gap-2">
            <CheckCircle2 className="w-5 h-5 text-emerald-600 dark:text-emerald-400" />
            <h3 className="text-sm font-black text-foreground uppercase tracking-wider">
              Eligible for Return / Replacement:
            </h3>
          </div>
          <ul className="space-y-2 text-xs text-neutral-600 dark:text-neutral-300 list-disc list-inside">
            <li>Product has a verified manufacturing defect or does not function as intended.</li>
            <li>Damaged, broken, or scratched in transit prior to delivery.</li>
            <li>Wrong model, specification, color, or variant received.</li>
            <li>Missing original accessories, cables, or manufacturer components.</li>
            <li>Original packaging, warranty card, and accessories are preserved.</li>
          </ul>
        </div>

        {/* Non-Eligible */}
        <div className="p-6 rounded-3xl border border-rose-500/30 bg-rose-500/5 space-y-4">
          <div className="flex items-center gap-2">
            <AlertCircle className="w-5 h-5 text-rose-600 dark:text-rose-400" />
            <h3 className="text-sm font-black text-foreground uppercase tracking-wider">
              Not Covered under Return Policy:
            </h3>
          </div>
          <ul className="space-y-2 text-xs text-neutral-600 dark:text-neutral-300 list-disc list-inside">
            <li>Physical damage, water damage, burns, or cracks caused by accidental mishandling.</li>
            <li>Damage resulting from using non-standard or unauthorized power adapters.</li>
            <li>Products returned without original retail box, serial numbers, or accessories.</li>
            <li>Change of mind after the product has been unsealed, activated, or used.</li>
          </ul>
        </div>
      </div>

      {/* Refund Method & Timelines */}
      <div className="p-6 sm:p-8 rounded-3xl border border-neutral-200 dark:border-neutral-800 liquid-glass space-y-4">
        <div className="flex items-center gap-2.5">
          <CreditCard className="w-5 h-5 text-foreground" />
          <h2 className="text-base sm:text-lg font-black text-foreground">
            Refund Processing & Payment Channels
          </h2>
        </div>
        <p className="text-xs sm:text-sm text-neutral-600 dark:text-neutral-300 leading-relaxed">
          When a refund is approved (if the customer prefers a refund over a replacement or the product is out of stock), the full amount is credited via:
        </p>
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 pt-2">
          <div className="p-4 rounded-2xl bg-neutral-100/70 dark:bg-neutral-900/70 border border-neutral-200/60 dark:border-neutral-800 space-y-1">
            <p className="font-bold text-xs text-foreground">bKash / Nagad Wallet</p>
            <p className="text-[11px] text-neutral-400">Processed within 24–48 hours directly to your personal number.</p>
          </div>
          <div className="p-4 rounded-2xl bg-neutral-100/70 dark:bg-neutral-900/70 border border-neutral-200/60 dark:border-neutral-800 space-y-1">
            <p className="font-bold text-xs text-foreground">Bank Transfer (EFT/NPSB)</p>
            <p className="text-[11px] text-neutral-400">Processed within 3–5 working banking days across Bangladesh.</p>
          </div>
          <div className="p-4 rounded-2xl bg-neutral-100/70 dark:bg-neutral-900/70 border border-neutral-200/60 dark:border-neutral-800 space-y-1">
            <p className="font-bold text-xs text-foreground">Store Credit Voucher</p>
            <p className="text-[11px] text-neutral-400">Instant promo coupon with no expiration for your next gadget purchase.</p>
          </div>
        </div>
      </div>

      {/* Direct Contact Call to Action */}
      <div className="p-6 sm:p-8 rounded-3xl border border-neutral-200 dark:border-neutral-800 liquid-glass-elevated flex flex-col sm:flex-row items-center justify-between gap-4">
        <div className="space-y-1 text-center sm:text-left">
          <h3 className="text-base font-black text-foreground">Need to Start a Return?</h3>
          <p className="text-xs text-neutral-400">Our support engineers are ready to assist you immediately.</p>
        </div>
        <a
          href="https://wa.me/8801642603236?text=Hello%20NS%20TechSphere,%20I%20would%20like%20to%20request%20a%20replacement%20or%20return."
          target="_blank"
          rel="noreferrer"
          className="px-6 py-3 rounded-2xl bg-[#25D366] text-white text-xs font-bold shadow-lg hover:scale-105 active:scale-95 transition-all flex items-center gap-2 shrink-0"
        >
          <MessageCircle className="w-4 h-4" />
          <span>Chat on WhatsApp (01642603236)</span>
        </a>
      </div>
    </div>
  );
}
