'use client';

import React from 'react';
import Link from 'next/link';
import { Brand } from '@/types';

interface BrandShowcaseProps {
  brands: Brand[];
}

export function BrandShowcase({ brands }: BrandShowcaseProps) {
  return (
    <section className="py-3 sm:py-4 border-t border-neutral-200/60 dark:border-neutral-800/60">
      <div className="w-full px-4 sm:px-6 lg:px-8 xl:px-12 2xl:px-16">
        <div className="text-center max-w-xl mx-auto mb-3">
          <span className="text-xs font-bold uppercase tracking-wider text-neutral-400">
            Partners
          </span>
          <h2 className="text-xl sm:text-2xl font-black tracking-tight text-foreground">
            Official Brand Showcase
          </h2>
        </div>

        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 xl:grid-cols-8 gap-2.5 sm:gap-4">
          {brands.map((brand) => (
            <Link
              key={brand.id}
              href={`/brand/${brand.slug}`}
              className="flex items-center justify-center p-3.5 sm:p-6 rounded-2xl liquid-glass hover:border-black dark:hover:border-white transition-smooth group shadow-subtle hover:shadow-glass"
            >
              <span className="font-extrabold text-xs sm:text-sm md:text-base tracking-widest text-neutral-600 dark:text-neutral-400 group-hover:text-foreground transition-colors uppercase">
                {brand.name}
              </span>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}
