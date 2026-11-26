import React from 'react';
import Link from 'next/link';
import {
  ShieldCheck,
  Lock,
  Eye,
  FileText,
  Server,
  UserCheck,
  ChevronRight,
  HelpCircle,
} from 'lucide-react';

export default function PrivacyPolicyPage() {
  return (
    <div className="w-full px-3 sm:px-6 lg:px-8 xl:px-12 2xl:px-16 py-8 sm:py-12 space-y-10 max-w-5xl mx-auto">
      {/* Breadcrumb */}
      <nav className="flex items-center gap-1.5 text-xs text-neutral-400">
        <Link href="/" className="hover:text-foreground">
          Home
        </Link>
        <ChevronRight className="w-3.5 h-3.5" />
        <span className="text-foreground font-medium">Privacy Policy</span>
      </nav>

      {/* Hero Header */}
      <div className="rounded-3xl border border-neutral-200/90 dark:border-neutral-800/90 liquid-glass-elevated p-6 sm:p-10 relative overflow-hidden space-y-3">
        <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full border border-neutral-300 dark:border-neutral-700 bg-black/5 dark:bg-white/10 text-[10px] font-bold uppercase tracking-wider text-foreground">
          <Lock className="w-3.5 h-3.5" />
          <span>Data Protection & Privacy</span>
        </div>
        <h1 className="text-2xl sm:text-4xl font-black tracking-tight text-foreground">
          Privacy Policy
        </h1>
        <p className="text-xs sm:text-sm text-neutral-500 dark:text-neutral-400 max-w-2xl leading-relaxed">
          At NS TechSphere (nstechsphere.store), we respect your personal privacy and are committed to safeguarding your personal information in accordance with national and international digital data security standards.
        </p>
      </div>

      {/* Privacy Highlights */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
        <div className="p-5 rounded-2xl border border-neutral-200 dark:border-neutral-800 liquid-glass space-y-2">
          <div className="w-10 h-10 rounded-xl bg-black text-white dark:bg-white dark:text-black flex items-center justify-center font-bold">
            <Lock className="w-5 h-5" />
          </div>
          <h3 className="text-sm font-black text-foreground">256-Bit SSL Security</h3>
          <p className="text-xs text-neutral-400">All customer checkout data and contact information are encrypted end-to-end.</p>
        </div>

        <div className="p-5 rounded-2xl border border-neutral-200 dark:border-neutral-800 liquid-glass space-y-2">
          <div className="w-10 h-10 rounded-xl bg-black text-white dark:bg-white dark:text-black flex items-center justify-center font-bold">
            <Eye className="w-5 h-5" />
          </div>
          <h3 className="text-sm font-black text-foreground">No Spam Policy</h3>
          <p className="text-xs text-neutral-400">We never sell, rent, or trade your contact number or email to third-party telemarketers.</p>
        </div>

        <div className="p-5 rounded-2xl border border-neutral-200 dark:border-neutral-800 liquid-glass space-y-2">
          <div className="w-10 h-10 rounded-xl bg-black text-white dark:bg-white dark:text-black flex items-center justify-center font-bold">
            <UserCheck className="w-5 h-5" />
          </div>
          <h3 className="text-sm font-black text-foreground">Your Control & Rights</h3>
          <p className="text-xs text-neutral-400">You may update, request export, or delete your account records at any time.</p>
        </div>
      </div>

      {/* Broad Detailed Policy Sections */}
      <div className="space-y-6 text-xs sm:text-sm text-neutral-600 dark:text-neutral-300 leading-relaxed">
        {/* Section 1 */}
        <div className="p-6 sm:p-8 rounded-3xl border border-neutral-200 dark:border-neutral-800 liquid-glass space-y-3">
          <h2 className="text-base font-black text-foreground">1. Information We Collect</h2>
          <p>
            When you visit, browse, or place an order on <strong>nstechsphere.store</strong>, we collect relevant information to fulfill your orders and enhance your shopping experience:
          </p>
          <ul className="list-disc list-inside space-y-1.5 pl-1">
            <li><strong>Personal Contact Data:</strong> Name, phone number, email address, delivery address (division, district, area, full street address).</li>
            <li><strong>Order History:</strong> Products purchased, quantities, timestamps, transaction amounts, payment method selected.</li>
            <li><strong>Technical Information:</strong> IP address, device type, browser variant, and cookies to remember cart items and theme preferences.</li>
          </ul>
        </div>

        {/* Section 2 */}
        <div className="p-6 sm:p-8 rounded-3xl border border-neutral-200 dark:border-neutral-800 liquid-glass space-y-3">
          <h2 className="text-base font-black text-foreground">2. How We Use Your Information</h2>
          <p>We utilize the collected information strictly for legitimate commercial and customer care purposes:</p>
          <ul className="list-disc list-inside space-y-1.5 pl-1">
            <li>Processing, packing, and dispatching your ordered electronics and accessories.</li>
            <li>Sending SMS / WhatsApp notifications regarding order confirmation and tracking status.</li>
            <li>Providing warranty claim processing, technical troubleshooting, and customer service.</li>
            <li>Preventing fraudulent orders and maintaining e-commerce platform security.</li>
          </ul>
        </div>

        {/* Section 3 */}
        <div className="p-6 sm:p-8 rounded-3xl border border-neutral-200 dark:border-neutral-800 liquid-glass space-y-3">
          <h2 className="text-base font-black text-foreground">3. Sharing with Logistics & Payment Partners</h2>
          <p>
            We share only necessary delivery details (name, phone number, and street address) with our contracted, vetted courier logistics services (such as Steadfast Courier, Pathao, or RedX) solely to deliver your package to your doorstep. We never sell your personal data to external advertisers.
          </p>
        </div>

        {/* Section 4 */}
        <div className="p-6 sm:p-8 rounded-3xl border border-neutral-200 dark:border-neutral-800 liquid-glass space-y-3">
          <h2 className="text-base font-black text-foreground">4. Data Security & Storage</h2>
          <p>
            Our web platform is hosted on resilient, enterprise-grade cloud infrastructure protected by multi-layer firewalls and HTTPS SSL encryption. Access to customer order databases is restricted strictly to authorized operational staff.
          </p>
        </div>

        {/* Section 5 */}
        <div className="p-6 sm:p-8 rounded-3xl border border-neutral-200 dark:border-neutral-800 liquid-glass space-y-3">
          <h2 className="text-base font-black text-foreground">5. Inquiries & Data Rights</h2>
          <p>
            If you have any questions regarding your personal information, wish to modify your stored details, or request deletion of your order records, please contact our Data Protection Officer:
          </p>
          <div className="p-4 rounded-2xl bg-neutral-100/70 dark:bg-neutral-900/70 border border-neutral-200/60 dark:border-neutral-800 text-xs space-y-1">
            <p className="font-bold text-foreground">NS TechSphere Privacy Office</p>
            <p>Motijheel Commercial Area, Dhaka 1000, Bangladesh</p>
            <p>WhatsApp / Phone: <strong>01642603236</strong></p>
            <p>Email: <strong>support@nstechsphere.store</strong></p>
          </div>
        </div>
      </div>
    </div>
  );
}
