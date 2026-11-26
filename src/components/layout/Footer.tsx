'use client';

import React from 'react';
import Link from 'next/link';
import { BrandLogo } from '@/components/ui/BrandLogo';
import { useApp } from '@/lib/context/app-context';
import { ShieldCheck, Truck, Headphones, RotateCcw } from 'lucide-react';

export function Footer() {
  const { settings, t, language } = useApp();

  return (
    <footer className="w-full border-t border-neutral-800 bg-[#121316] text-neutral-200 pt-7 pb-8">
      <div className="w-full px-4 sm:px-6 lg:px-8 xl:px-12 2xl:px-16">
        {/* Value Proposition Highlights */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4 pb-6 border-b border-neutral-800/80">
          <div className="flex items-center gap-3 p-3.5 rounded-2xl border border-neutral-800/80 bg-neutral-900/70 backdrop-blur-md">
            <ShieldCheck className="w-6 h-6 text-white shrink-0 stroke-2" />
            <div>
              <div className="text-xs sm:text-sm font-bold text-white">{t.authenticGear}</div>
              <div className="text-xs text-neutral-400">100% Genuine Imported Tech</div>
            </div>
          </div>
          <div className="flex items-center gap-3 p-3.5 rounded-2xl border border-neutral-800/80 bg-neutral-900/70 backdrop-blur-md">
            <Truck className="w-6 h-6 text-white shrink-0 stroke-2" />
            <div>
              <div className="text-xs sm:text-sm font-bold text-white">{t.expressDelivery}</div>
              <div className="text-xs text-neutral-400">Dhaka & Nationwide Courier</div>
            </div>
          </div>
          <div className="flex items-center gap-3 p-3.5 rounded-2xl border border-neutral-800/80 bg-neutral-900/70 backdrop-blur-md">
            <RotateCcw className="w-6 h-6 text-white shrink-0 stroke-2" />
            <div>
              <div className="text-xs sm:text-sm font-bold text-white">7-Day Replacement</div>
              <div className="text-xs text-neutral-400">Hassle-free return policy</div>
            </div>
          </div>
          <div className="flex items-center gap-3 p-3.5 rounded-2xl border border-neutral-800/80 bg-neutral-900/70 backdrop-blur-md">
            <Headphones className="w-6 h-6 text-white shrink-0 stroke-2" />
            <div>
              <div className="text-xs sm:text-sm font-bold text-white">{t.customerSupport}</div>
              <div className="text-xs text-neutral-400">{settings.general.phone}</div>
            </div>
          </div>
        </div>

        {/* Links & Brand Info */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 py-6">
          <div className="space-y-3">
            <BrandLogo size="md" />
            <p className="text-xs text-neutral-400 leading-relaxed pt-1">
              {settings.general.tagline || 'Explore the World of Technology.'}
            </p>
            <p className="text-[11px] text-neutral-400 leading-normal">
              {settings.general.address || 'Motijheel Commercial Area, Dhaka 1000, Bangladesh'}
            </p>
            <div className="text-[11px] text-white font-semibold">
              https://nstechsphere.store
            </div>
          </div>

          <div>
            <h4 className="text-xs sm:text-sm font-bold uppercase tracking-wider text-white mb-3">Customer Care</h4>
            <ul className="space-y-2 text-xs sm:text-sm text-neutral-400">
              <li>
                <Link href="/shipping-policy" className="hover:text-white transition-colors">
                  Shipping & Delivery
                </Link>
              </li>
              <li>
                <Link href="/return-policy" className="hover:text-white transition-colors">
                  Return & Refund
                </Link>
              </li>
              <li>
                <Link href="/track-order" className="hover:text-white transition-colors">
                  Track Your Order
                </Link>
              </li>
              <li>
                <Link href="/contact" className="hover:text-white transition-colors">
                  Support & Help Center
                </Link>
              </li>
            </ul>
          </div>

          <div>
            <h4 className="text-xs sm:text-sm font-bold uppercase tracking-wider text-white mb-3">Corporate & Policies</h4>
            <ul className="space-y-2 text-xs sm:text-sm text-neutral-400">
              <li>
                <Link href="/about-us" className="hover:text-white transition-colors">
                  About Us
                </Link>
              </li>
              <li>
                <Link href="/privacy-policy" className="hover:text-white transition-colors">
                  Privacy Policy
                </Link>
              </li>
              <li>
                <Link href="/terms-and-conditions" className="hover:text-white transition-colors">
                  Terms & Conditions
                </Link>
              </li>
            </ul>
          </div>

          <div>
            <h4 className="text-xs sm:text-sm font-bold uppercase tracking-wider text-white mb-3">Official Channels</h4>
            <p className="text-xs text-neutral-400 mb-3">
              Follow official announcements and product launches:
            </p>
            <div className="flex flex-wrap gap-2">
              <a
                href={settings.social.facebook || 'https://www.facebook.com/nstechsphere'}
                target="_blank"
                rel="noreferrer"
                className="px-2.5 py-1.5 rounded-lg border border-neutral-800 bg-neutral-900/80 text-xs font-medium text-neutral-300 hover:text-white hover:bg-neutral-800 transition-colors"
              >
                Facebook
              </a>
              <a
                href={settings.social.instagram || 'https://www.instagram.com/nstechsphere/'}
                target="_blank"
                rel="noreferrer"
                className="px-2.5 py-1.5 rounded-lg border border-neutral-800 bg-neutral-900/80 text-xs font-medium text-neutral-300 hover:text-white hover:bg-neutral-800 transition-colors"
              >
                Instagram
              </a>
              <a
                href={settings.social.youtube || 'https://www.youtube.com/@nstechsphere'}
                target="_blank"
                rel="noreferrer"
                className="px-2.5 py-1.5 rounded-lg border border-neutral-800 bg-neutral-900/80 text-xs font-medium text-neutral-300 hover:text-white hover:bg-neutral-800 transition-colors"
              >
                YouTube
              </a>
              <a
                href="https://www.tiktok.com/@nstechsphere"
                target="_blank"
                rel="noreferrer"
                className="px-2.5 py-1.5 rounded-lg border border-neutral-800 bg-neutral-900/80 text-xs font-medium text-neutral-300 hover:text-white hover:bg-neutral-800 transition-colors"
              >
                TikTok
              </a>
              <a
                href="https://www.linkedin.com/company/nstechsphere"
                target="_blank"
                rel="noreferrer"
                className="px-2.5 py-1.5 rounded-lg border border-neutral-800 bg-neutral-900/80 text-xs font-medium text-neutral-300 hover:text-white hover:bg-neutral-800 transition-colors"
              >
                LinkedIn
              </a>
              <a
                href="https://x.com/nstechsphere"
                target="_blank"
                rel="noreferrer"
                className="px-2.5 py-1.5 rounded-lg border border-neutral-800 bg-neutral-900/80 text-xs font-medium text-neutral-300 hover:text-white hover:bg-neutral-800 transition-colors"
              >
                X
              </a>
            </div>
          </div>
        </div>

        {/* Bottom Bar - Extra small copyright */}
        <div className="pt-6 border-t border-neutral-800/80 text-center text-[10px] sm:text-[11px] text-neutral-500 uppercase tracking-widest font-mono">
          © {new Date().getFullYear()} {settings.general.brand_name}. {t.allRightsReserved}.
        </div>
      </div>
    </footer>
  );
}
