import React from 'react';
import Link from 'next/link';
import {
  FileText,
  Scale,
  ShieldCheck,
  CheckCircle2,
  AlertCircle,
  ChevronRight,
} from 'lucide-react';

export default function TermsAndConditionsPage() {
  return (
    <div className="w-full px-3 sm:px-6 lg:px-8 xl:px-12 2xl:px-16 py-8 sm:py-12 space-y-10 max-w-5xl mx-auto">
      {/* Breadcrumb */}
      <nav className="flex items-center gap-1.5 text-xs text-neutral-400">
        <Link href="/" className="hover:text-foreground">
          Home
        </Link>
        <ChevronRight className="w-3.5 h-3.5" />
        <span className="text-foreground font-medium">Terms & Conditions</span>
      </nav>

      {/* Hero Header */}
      <div className="rounded-3xl border border-neutral-200/90 dark:border-neutral-800/90 liquid-glass-elevated p-6 sm:p-10 relative overflow-hidden space-y-3">
        <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full border border-neutral-300 dark:border-neutral-700 bg-black/5 dark:bg-white/10 text-[10px] font-bold uppercase tracking-wider text-foreground">
          <Scale className="w-3.5 h-3.5" />
          <span>Legal Agreement</span>
        </div>
        <h1 className="text-2xl sm:text-4xl font-black tracking-tight text-foreground">
          Terms & Conditions of Service
        </h1>
        <p className="text-xs sm:text-sm text-neutral-500 dark:text-neutral-400 max-w-2xl leading-relaxed">
          Please review these Terms and Conditions carefully before browsing or placing orders on <strong>nstechsphere.store</strong>. By accessing our platform, you acknowledge and agree to comply with these terms.
        </p>
      </div>

      {/* Quick Summary Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
        <div className="p-5 rounded-2xl border border-neutral-200 dark:border-neutral-800 liquid-glass space-y-2">
          <div className="w-10 h-10 rounded-xl bg-black text-white dark:bg-white dark:text-black flex items-center justify-center font-bold">
            <CheckCircle2 className="w-5 h-5" />
          </div>
          <h3 className="text-sm font-black text-foreground">Authentic Devices</h3>
          <p className="text-xs text-neutral-400">All products are guaranteed genuine and sourced from official global distributors.</p>
        </div>

        <div className="p-5 rounded-2xl border border-neutral-200 dark:border-neutral-800 liquid-glass space-y-2">
          <div className="w-10 h-10 rounded-xl bg-black text-white dark:bg-white dark:text-black flex items-center justify-center font-bold">
            <ShieldCheck className="w-5 h-5" />
          </div>
          <h3 className="text-sm font-black text-foreground">Warranty Protection</h3>
          <p className="text-xs text-neutral-400">Products are covered by official manufacturer warranties and our 7-day replacement policy.</p>
        </div>

        <div className="p-5 rounded-2xl border border-neutral-200 dark:border-neutral-800 liquid-glass space-y-2">
          <div className="w-10 h-10 rounded-xl bg-black text-white dark:bg-white dark:text-black flex items-center justify-center font-bold">
            <Scale className="w-5 h-5" />
          </div>
          <h3 className="text-sm font-black text-foreground">Governing Law</h3>
          <p className="text-xs text-neutral-400">Subject to the laws of Bangladesh and the jurisdiction of competent courts in Dhaka.</p>
        </div>
      </div>

      {/* Broad Detailed Terms Sections */}
      <div className="space-y-6 text-xs sm:text-sm text-neutral-600 dark:text-neutral-300 leading-relaxed">
        {/* Section 1 */}
        <div className="p-6 sm:p-8 rounded-3xl border border-neutral-200 dark:border-neutral-800 liquid-glass space-y-3">
          <h2 className="text-base font-black text-foreground">1. User Agreement & Eligibility</h2>
          <p>
            By using this website, you certify that you are at least 18 years of age or possess legal parental or guardian consent to conduct commercial transactions in Bangladesh. You agree to provide accurate, current, and complete personal and delivery information during the checkout process.
          </p>
        </div>

        {/* Section 2 */}
        <div className="p-6 sm:p-8 rounded-3xl border border-neutral-200 dark:border-neutral-800 liquid-glass space-y-3">
          <h2 className="text-base font-black text-foreground">2. Pricing, Specifications & Availability</h2>
          <p>
            All prices listed on <strong>nstechsphere.store</strong> are in Bangladeshi Taka (BDT ৳) and include applicable trade taxes unless explicitly stated otherwise. We continuously strive to ensure accurate descriptions, images, and technical specifications. In the unlikely event of a typographical pricing error or sudden supplier stock exhaustion, NS TechSphere reserves the right to cancel or amend the order and promptly notify the customer.
          </p>
        </div>

        {/* Section 3 */}
        <div className="p-6 sm:p-8 rounded-3xl border border-neutral-200 dark:border-neutral-800 liquid-glass space-y-3">
          <h2 className="text-base font-black text-foreground">3. Order Confirmation & Acceptance</h2>
          <p>
            Receipt of an automated electronic order summary does not constitute final binding acceptance. Order confirmation occurs once our verification team validates stock availability and customer telephone contact. We reserve the right to decline or cancel orders deemed suspect of fraud or speculative resale.
          </p>
        </div>

        {/* Section 4 */}
        <div className="p-6 sm:p-8 rounded-3xl border border-neutral-200 dark:border-neutral-800 liquid-glass space-y-3">
          <h2 className="text-base font-black text-foreground">4. Payment Terms & Cash on Delivery (COD)</h2>
          <p>
            For Cash on Delivery (COD) orders, payment must be handed in full to the authorized courier agent upon parcel arrival. For high-value custom tech gear or specific remote delivery locations, an advance delivery charge token may be requested prior to dispatch.
          </p>
        </div>

        {/* Section 5 */}
        <div className="p-6 sm:p-8 rounded-3xl border border-neutral-200 dark:border-neutral-800 liquid-glass space-y-3">
          <h2 className="text-base font-black text-foreground">5. Returns, Warranty & Replacement</h2>
          <p>
            Returns and replacements are governed strictly by our transparent{' '}
            <Link href="/return-policy" className="underline font-bold text-foreground">
              Return & Refund Policy
            </Link>
            . Customers are entitled to a 7-day replacement window for factory-proven manufacturing defects, subject to intact original packaging and warranty materials.
          </p>
        </div>

        {/* Section 6 */}
        <div className="p-6 sm:p-8 rounded-3xl border border-neutral-200 dark:border-neutral-800 liquid-glass space-y-3">
          <h2 className="text-base font-black text-foreground">6. Contact & Legal Notices</h2>
          <p>
            For official inquiries regarding these Terms of Service or corporate communications, please reach out to:
          </p>
          <div className="p-4 rounded-2xl bg-neutral-100/70 dark:bg-neutral-900/70 border border-neutral-200/60 dark:border-neutral-800 text-xs space-y-1">
            <p className="font-bold text-foreground">NS TechSphere Legal & Compliance</p>
            <p>Motijheel Commercial Area, Dhaka 1000, Bangladesh</p>
            <p>Direct Support Helpline: <strong>01642603236</strong></p>
            <p>Official Email: <strong>support@nstechsphere.store</strong></p>
          </div>
        </div>
      </div>
    </div>
  );
}
