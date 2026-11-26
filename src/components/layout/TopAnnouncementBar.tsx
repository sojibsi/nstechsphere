'use client';

import React, { useState, useEffect } from 'react';
import { useApp } from '@/lib/context/app-context';
import { ShieldCheck, Truck, Zap, ChevronRight, X } from 'lucide-react';
import Link from 'next/link';

export function TopAnnouncementBar() {
  const { language, settings } = useApp();
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isVisible, setIsVisible] = useState(true);

  const announcements = [
    {
      en: 'Official 1-Year Brand Warranty & 7-Day Replacement Guarantee across Bangladesh',
      bn: 'সারা দেশে ১ বছরের অফিসিয়াল ব্র্যান্ড ওয়ারেন্টি এবং ৭ দিনের রিপ্লেসমেন্ট গ্যারান্টি',
      icon: ShieldCheck,
      link: '/shipping-policy',
    },
    {
      en: `Express 24-48h Delivery inside Dhaka (৳${settings.shipping.inside_dhaka_fee}) & Nationwide Courier`,
      bn: `ঢাকার ভেতরে ২৪-৪৮ ঘণ্টায় এক্সপ্রেস ডেলিভারি (৳${settings.shipping.inside_dhaka_fee}) ও সারাদেশে কুরিয়ার`,
      icon: Truck,
      link: '/shipping-policy',
    },
    {
      en: 'Use code "WELCOME10" for 10% instant discount on your order',
      bn: 'অর্ডারে ১০% ছাড় পেতে ব্যবহার করুন প্রোমোকোড "WELCOME10"',
      icon: Zap,
      link: '/deals',
    },
  ];

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentIndex((prev) => (prev + 1) % announcements.length);
    }, 4500);
    return () => clearInterval(timer);
  }, [announcements.length]);

  if (!isVisible) return null;

  const current = announcements[currentIndex];
  const Icon = current.icon;
  const message = language === 'bn' ? current.bn : current.en;

  return (
    <div className="relative z-50 bg-black text-white dark:bg-neutral-900 border-b border-neutral-800 text-xs sm:text-sm font-semibold py-2 px-4 sm:px-6 lg:px-8 xl:px-12 2xl:px-16 transition-colors">
      <div className="w-full flex items-center justify-between">
        <div className="hidden sm:block text-[10px] uppercase font-mono tracking-widest text-neutral-400">
          Official Tech Retailer
        </div>

        <Link
          href={current.link}
          className="mx-auto flex items-center gap-2 hover:opacity-80 transition-opacity text-center cursor-pointer"
        >
          <Icon className="w-3.5 h-3.5 text-neutral-300 shrink-0" />
          <span className="tracking-wide animate-in fade-in duration-300">
            {message}
          </span>
          <ChevronRight className="w-3 h-3 text-neutral-400" />
        </Link>

        <button
          onClick={() => setIsVisible(false)}
          className="text-neutral-400 hover:text-white p-0.5 rounded transition-colors hidden sm:block"
          title="Dismiss"
        >
          <X className="w-3 h-3" />
        </button>
      </div>
    </div>
  );
}
