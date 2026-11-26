'use client';

import React from 'react';
import Link from 'next/link';
import { BrandLogo } from '@/components/ui/BrandLogo';
import { useApp } from '@/lib/context/app-context';
import { ShieldCheck, Truck, Headphones, RotateCcw } from 'lucide-react';

export function Footer() {
  const { settings, t, language } = useApp();

  return (
    <footer className="w-full border-t border-neutral-200 dark:border-neutral-800 bg-neutral-50 dark:bg-black/90 text-foreground pt-6 pb-8">
      <div className="w-full px-4 sm:px-6 lg:px-8 xl:px-12 2xl:px-16">
        {/* Value Proposition Highlights */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4 pb-5 border-b border-neutral-200 dark:border-neutral-800">
          <div className="flex items-center gap-3 p-3.5 rounded-2xl liquid-glass">
            <ShieldCheck className="w-6 h-6 text-foreground shrink-0 stroke-2" />
            <div>
              <div className="text-xs sm:text-sm font-bold">{t.authenticGear}</div>
              <div className="text-xs text-neutral-400">100% Genuine Imported Tech</div>
            </div>
          </div>
          <div className="flex items-center gap-3 p-3.5 rounded-2xl liquid-glass">
            <Truck className="w-6 h-6 text-foreground shrink-0 stroke-2" />
            <div>
              <div className="text-xs sm:text-sm font-bold">{t.expressDelivery}</div>
              <div className="text-xs text-neutral-400">Dhaka & Nationwide Courier</div>
            </div>
          </div>
          <div className="flex items-center gap-3 p-3.5 rounded-2xl liquid-glass">
            <RotateCcw className="w-6 h-6 text-foreground shrink-0 stroke-2" />
            <div>
              <div className="text-xs sm:text-sm font-bold">7-Day Replacement</div>
              <div className="text-xs text-neutral-400">Hassle-free return policy</div>
            </div>
          </div>
          <div className="flex items-center gap-3 p-3.5 rounded-2xl liquid-glass">
            <Headphones className="w-6 h-6 text-foreground shrink-0 stroke-2" />
            <div>
              <div className="text-xs sm:text-sm font-bold">{t.customerSupport}</div>
              <div className="text-xs text-neutral-400">{settings.general.phone}</div>
            </div>
          </div>
        </div>

        {/* Links & Brand Info */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 py-6">
          <div className="space-y-3">
            <BrandLogo size="md" />
            <p className="text-xs text-neutral-500 leading-relaxed pt-1">
              {settings.general.tagline || 'Explore the World of Technology.'}
            </p>
            <p className="text-[11px] text-neutral-400 leading-normal">
              {settings.general.address || 'Motijheel Commercial Area, Dhaka 1000, Bangladesh'}
            </p>
            <div className="text-[11px] text-foreground font-semibold">
              https://nstechsphere.store
            </div>
          </div>

          <div>
            <h4 className="text-sm font-bold uppercase tracking-wider mb-3">Customer Care</h4>
            <ul className="space-y-2 text-sm text-neutral-500">
              <li>
                <Link href="/shipping-policy" className="hover:text-foreground transition-colors">
                  Shipping & Delivery
                </Link>
              </li>
              <li>
                <Link href="/return-policy" className="hover:text-foreground transition-colors">
                  Return & Refund
                </Link>
              </li>
              <li>
                <Link href="/track-order" className="hover:text-foreground transition-colors">
                  Track Your Order
                </Link>
              </li>
              <li>
                <Link href="/contact" className="hover:text-foreground transition-colors">
                  Support & Help Center
                </Link>
              </li>
            </ul>
          </div>

          <div>
            <h4 className="text-sm font-bold uppercase tracking-wider mb-3">Corporate & Policies</h4>
            <ul className="space-y-2 text-sm text-neutral-500">
              <li>
                <Link href="/about-us" className="hover:text-foreground transition-colors">
                  About Us
                </Link>
              </li>
              <li>
                <Link href="/privacy-policy" className="hover:text-foreground transition-colors">
                  Privacy Policy
                </Link>
              </li>
              <li>
                <Link href="/terms-and-conditions" className="hover:text-foreground transition-colors">
                  Terms & Conditions
                </Link>
              </li>
            </ul>
          </div>

          <div>
            <h4 className="text-sm font-bold uppercase tracking-wider mb-3">Official Channels</h4>
            <p className="text-xs sm:text-sm text-neutral-500 mb-3">
              Follow official announcements and product launches:
            </p>
            <div className="flex flex-wrap gap-2">
              <a
                href={settings.social.facebook || 'https://www.facebook.com/nstechsphere'}
                target="_blank"
                rel="noreferrer"
                className="px-2.5 py-1.5 rounded-lg border border-neutral-300 dark:border-neutral-800 text-xs font-medium hover:bg-neutral-200 dark:hover:bg-neutral-800 transition-colors"
              >
                Facebook
              </a>
              <a
                href={settings.social.instagram || 'https://www.instagram.com/nstechsphere/'}
                target="_blank"
                rel="noreferrer"
                className="px-2.5 py-1.5 rounded-lg border border-neutral-300 dark:border-neutral-800 text-xs font-medium hover:bg-neutral-200 dark:hover:bg-neutral-800 transition-colors"
              >
                Instagram
              </a>
              <a
                href={settings.social.youtube || 'https://www.youtube.com/@nstechsphere'}
                target="_blank"
                rel="noreferrer"
                className="px-2.5 py-1.5 rounded-lg border border-neutral-300 dark:border-neutral-800 text-xs font-medium hover:bg-neutral-200 dark:hover:bg-neutral-800 transition-colors"
              >
                YouTube
              </a>
              <a
                href="https://www.tiktok.com/@nstechsphere"
                target="_blank"
                rel="noreferrer"
                className="px-2.5 py-1.5 rounded-lg border border-neutral-300 dark:border-neutral-800 text-xs font-medium hover:bg-neutral-200 dark:hover:bg-neutral-800 transition-colors"
              >
                TikTok
              </a>
              <a
                href="https://www.linkedin.com/company/nstechsphere"
                target="_blank"
                rel="noreferrer"
                className="px-2.5 py-1.5 rounded-lg border border-neutral-300 dark:border-neutral-800 text-xs font-medium hover:bg-neutral-200 dark:hover:bg-neutral-800 transition-colors"
              >
                LinkedIn
              </a>
              <a
                href="https://x.com/nstechsphere"
                target="_blank"
                rel="noreferrer"
                className="px-2.5 py-1.5 rounded-lg border border-neutral-300 dark:border-neutral-800 text-xs font-medium hover:bg-neutral-200 dark:hover:bg-neutral-800 transition-colors"
              >
                X
              </a>
            </div>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="pt-8 border-t border-neutral-200 dark:border-neutral-800 text-center text-xs text-neutral-400">
          © {new Date().getFullYear()} {settings.general.brand_name}. {t.allRightsReserved}.
        </div>
      </div>
    </footer>
  );
}
