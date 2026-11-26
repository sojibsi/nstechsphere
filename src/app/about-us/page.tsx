import React from 'react';
import Link from 'next/link';
import {
  ShieldCheck,
  Award,
  Truck,
  Users,
  CheckCircle2,
  Sparkles,
  ChevronRight,
  ArrowRight,
  Headphones,
  Globe,
  Zap,
} from 'lucide-react';
import { BrandLogo } from '@/components/ui/BrandLogo';

export default function AboutUsPage() {
  const stats = [
    { label: 'Happy Customers', value: '10,000+' },
    { label: 'Authentic Gadgets', value: '500+' },
    { label: 'Districts Reached', value: '64/64' },
    { label: 'Satisfaction Rate', value: '99.4%' },
  ];

  const pillars = [
    {
      title: '100% Original Tech Guarantee',
      title_bn: '১০০% অরিজিনাল ব্র্যান্ড পণ্য',
      desc: 'We strictly source from authorized global distributors. Every device comes with intact factory seals and verified serial numbers.',
      icon: ShieldCheck,
    },
    {
      title: '7-Day Replacement & Warranty',
      title_bn: 'অফিসিয়াল ওয়ারেন্টি ও রিপ্লেসমেন্ট',
      desc: 'Shop with absolute peace of mind. Any manufacturing defects within 7 days are promptly replaced with brand-new units.',
      icon: Award,
    },
    {
      title: 'Express Nationwide Delivery',
      title_bn: 'সারাদেশে দ্রুত কুরিয়ার ডেলিভারি',
      desc: 'Rapid 24–48 hours delivery inside Dhaka and 2–4 days across every upazila in all 64 districts of Bangladesh.',
      icon: Truck,
    },
    {
      title: 'Dedicated Technical Support',
      title_bn: 'সর্বোচ্চ গ্রাহক সেবা ও সহায়তা',
      desc: 'Our certified engineers and support specialists are readily available via WhatsApp and phone helpline to assist you.',
      icon: Headphones,
    },
  ];

  const brandPartners = ['Apple', 'Samsung', 'Sony', 'Anker', 'DJI', 'Logitech', 'Baseus', 'Xiaomi'];

  return (
    <div className="w-full px-3 sm:px-6 lg:px-8 xl:px-12 2xl:px-16 py-8 sm:py-12 space-y-12">
      {/* Breadcrumb */}
      <nav className="flex items-center gap-1.5 text-xs text-neutral-400">
        <Link href="/" className="hover:text-foreground">
          Home
        </Link>
        <ChevronRight className="w-3.5 h-3.5" />
        <span className="text-foreground font-medium">About Us</span>
      </nav>

      {/* Hero Header */}
      <div className="rounded-3xl border border-neutral-200/90 dark:border-neutral-800/90 liquid-glass-elevated p-6 sm:p-12 relative overflow-hidden space-y-4">
        <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full border border-neutral-300 dark:border-neutral-700 bg-black/5 dark:bg-white/10 text-[10px] font-bold uppercase tracking-wider text-foreground">
          <Sparkles className="w-3.5 h-3.5" />
          <span>Our Story & Mission</span>
        </div>
        <h1 className="text-2xl sm:text-4xl md:text-5xl font-black tracking-tight text-foreground">
          Explore the World of Technology.
        </h1>
        <p className="text-xs sm:text-base text-neutral-500 dark:text-neutral-400 max-w-2xl leading-relaxed">
          <strong>NS TechSphere</strong> is Bangladesh's trusted destination for genuine lifestyle electronics, audiophile sound systems, smart wearables, and computing peripherals.
        </p>
      </div>

      {/* Numerical Stats Banner */}
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
        {stats.map((s) => (
          <div
            key={s.label}
            className="p-5 sm:p-6 rounded-2xl border border-neutral-200 dark:border-neutral-800 liquid-glass text-center space-y-1"
          >
            <p className="text-2xl sm:text-3xl font-black text-foreground">{s.value}</p>
            <p className="text-xs font-semibold text-neutral-400 uppercase tracking-wider">{s.label}</p>
          </div>
        ))}
      </div>

      {/* The NS TechSphere Story Section */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-center">
        <div className="space-y-4 text-xs sm:text-sm text-neutral-600 dark:text-neutral-300 leading-relaxed">
          <h2 className="text-xl sm:text-2xl font-black text-foreground">
            Empowering Modern Lifestyle with Genuine Innovation
          </h2>
          <p>
            Founded in Dhaka, Bangladesh, <strong>NS TechSphere</strong> was born out of a clear passion: to eliminate counterfeit electronics and bring world-class, authentic personal technology directly into the hands of Bangladeshi enthusiasts at honest prices.
          </p>
          <p>
            Whether you are a content creator looking for studio-grade microphones and drones, a gamer seeking mechanical precision, or a professional needing long-lasting fast chargers and smartwatches, we curate only genuine products that pass our strict quality benchmarks.
          </p>
          <div className="pt-2 flex items-center gap-3">
            <Link
              href="/products"
              className="px-5 py-2.5 rounded-xl bg-black text-white dark:bg-white dark:text-black text-xs font-bold uppercase tracking-wider hover:opacity-90 transition-opacity"
            >
              Browse Catalog
            </Link>
            <Link
              href="/contact"
              className="px-5 py-2.5 rounded-xl liquid-glass-btn text-xs font-bold text-foreground"
            >
              Get in Touch
            </Link>
          </div>
        </div>

        <div className="p-6 sm:p-8 rounded-3xl border border-neutral-200 dark:border-neutral-800 liquid-glass-elevated space-y-4">
          <div className="flex items-center gap-3">
            <BrandLogo size="md" />
          </div>
          <p className="text-xs text-neutral-500 dark:text-neutral-400 leading-relaxed">
            "We believe that true technology should inspire, empower, and deliver uncompromising durability. That is our promise with every gadget that leaves our warehouse."
          </p>
          <div className="pt-3 border-t border-neutral-200 dark:border-neutral-800 text-[11px] text-neutral-400">
            <p className="font-bold text-foreground">Headquarters:</p>
            <p>Motijheel Commercial Area, Dhaka 1000, Bangladesh</p>
            <p>Direct Support: 01642603236 • support@nstechsphere.store</p>
          </div>
        </div>
      </div>

      {/* 4 Pillars of Excellence */}
      <div className="space-y-6">
        <div className="text-center space-y-1">
          <h2 className="text-xl sm:text-2xl font-black text-foreground">Our Four Pillars of Excellence</h2>
          <p className="text-xs text-neutral-400">The standards that guide everything we do</p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          {pillars.map((p) => {
            const Icon = p.icon;
            return (
              <div
                key={p.title}
                className="p-6 rounded-3xl border border-neutral-200 dark:border-neutral-800 liquid-glass space-y-3"
              >
                <div className="w-10 h-10 rounded-xl bg-black text-white dark:bg-white dark:text-black flex items-center justify-center font-bold">
                  <Icon className="w-5 h-5" />
                </div>
                <div>
                  <h3 className="text-sm font-black text-foreground">{p.title}</h3>
                  <p className="text-xs text-neutral-400 font-medium">{p.title_bn}</p>
                </div>
                <p className="text-xs text-neutral-500 dark:text-neutral-400 leading-relaxed">{p.desc}</p>
              </div>
            );
          })}
        </div>
      </div>

      {/* Top Brand Partners Retailed */}
      <div className="p-6 sm:p-8 rounded-3xl border border-neutral-200 dark:border-neutral-800 liquid-glass space-y-4">
        <h3 className="text-xs font-black uppercase tracking-wider text-neutral-400 text-center">
          Authorized & Genuine Global Brands
        </h3>
        <div className="flex flex-wrap items-center justify-center gap-3 pt-2">
          {brandPartners.map((b) => (
            <span
              key={b}
              className="px-4 py-2 rounded-xl bg-neutral-100 dark:bg-neutral-900 border border-neutral-200/80 dark:border-neutral-800 text-xs font-bold text-foreground"
            >
              {b}
            </span>
          ))}
        </div>
      </div>
    </div>
  );
}
