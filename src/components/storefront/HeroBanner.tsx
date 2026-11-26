'use client';

import React from 'react';
import Link from 'next/link';
import { useApp } from '@/lib/context/app-context';
import { ArrowRight, ShieldCheck } from 'lucide-react';

export function HeroBanner() {
  const { t, language } = useApp();

  return (
    <section className="relative overflow-hidden pt-2 pb-2 sm:pt-3 sm:pb-3">
      <div className="w-full px-4 sm:px-6 lg:px-8 xl:px-12 2xl:px-16">
        <div className="relative rounded-3xl overflow-hidden border border-neutral-200 dark:border-neutral-800 bg-neutral-900 text-white min-h-[360px] md:min-h-[420px] flex items-center">
          {/* Subtle background image with darkening gradient overlay */}
          <div
            className="absolute inset-0 bg-cover bg-center opacity-30 mix-blend-luminosity scale-105 transition-transform duration-1000"
            style={{
              backgroundImage:
                'url(https://images.unsplash.com/photo-1550009158-9ebf69173e03?q=80&w=1600&auto=format&fit=crop)',
            }}
          />
          <div className="absolute inset-0 bg-gradient-to-r from-black via-black/90 to-transparent" />

          {/* Content */}
          <div className="relative z-10 max-w-2xl p-6 sm:p-10 md:p-12 space-y-4">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full border border-neutral-700/60 bg-black/50 text-xs font-bold uppercase tracking-wider text-neutral-300">
              <ShieldCheck className="w-3.5 h-3.5 text-white" />
              <span>{language === 'bn' ? 'অফিশিয়াল টেক হাব • ২০২৬' : 'Official Tech Hub 2026'}</span>
            </div>

            <h1 className="text-3xl sm:text-5xl md:text-6xl font-black tracking-tight leading-[1.08] text-white">
              {language === 'bn' ? (
                <>
                  এক্সপ্লোর করুন <br />
                  <span className="text-white">
                    প্রযুক্তির বিশ্ব।
                  </span>
                </>
              ) : (
                <>
                  Explore the World of <br />
                  <span className="text-white">
                    Technology.
                  </span>
                </>
              )}
            </h1>

            <p className="text-sm sm:text-base md:text-lg text-neutral-300 max-w-lg font-normal leading-relaxed">
              {language === 'bn'
                ? 'আবিষ্কার করুন স্মার্ট গ্যাজেট, প্রিমিয়াম অ্যাক্সেসরিজ এবং নিত্যদিনের আধুনিক প্রযুক্তি — অফিসিয়াল ওয়ারেন্টি ও সারা দেশে ক্যাশ অন ডেলিভারিসহ NS TechSphere-এ।'
                : 'Discover innovative electronics, smart gadgets, and everyday technology essentials at NS TechSphere. Genuine warranty with fast nationwide cash on delivery.'}
            </p>

            <div className="pt-2 flex flex-col sm:flex-row items-stretch sm:items-center gap-3 sm:gap-3.5">
              <Link
                href="/products"
                className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-6 py-3.5 rounded-full liquid-glass-primary text-sm font-bold uppercase tracking-wider group"
              >
                <span>{language === 'bn' ? 'শপ করুন এখনই' : 'Shop Now'}</span>
                <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
              </Link>
              <Link
                href="/products#categories"
                className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-6 py-3.5 rounded-full liquid-glass-btn text-foreground text-sm font-bold uppercase tracking-wider"
              >
                <span>{language === 'bn' ? 'ক্যাটাগরি দেখুন' : 'Explore Categories'}</span>
              </Link>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
