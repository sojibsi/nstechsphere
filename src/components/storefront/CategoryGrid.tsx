'use client';

import React from 'react';
import Link from 'next/link';
import { useApp } from '@/lib/context/app-context';
import { Category } from '@/types';
import { ArrowUpRight } from 'lucide-react';

interface CategoryGridProps {
  categories: Category[];
}

export function CategoryGrid({ categories }: CategoryGridProps) {
  const { t, language } = useApp();

  return (
    <section id="categories" className="py-3 sm:py-4 border-t border-neutral-200/60 dark:border-neutral-800/60">
      <div className="w-full px-4 sm:px-6 lg:px-8 xl:px-12 2xl:px-16">
        <div className="flex items-end justify-between mb-3">
          <div>
            <span className="text-xs font-bold uppercase tracking-wider text-neutral-400">
              Department
            </span>
            <h2 className="text-xl sm:text-2xl font-black tracking-tight text-foreground">
              {t.allCategories}
            </h2>
          </div>
          <Link
            href="/products"
            className="text-xs sm:text-sm font-bold text-neutral-500 hover:text-foreground transition-colors flex items-center gap-1"
          >
            <span>View All</span>
            <ArrowUpRight className="w-4 h-4" />
          </Link>
        </div>

        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 xl:grid-cols-9 gap-2.5 sm:gap-4">
          {categories.map((cat) => {
            const displayName = language === 'bn' ? cat.name_bn || cat.name : cat.name;
            return (
              <Link
                key={cat.id}
                href={`/category/${cat.slug}`}
                className="group relative flex flex-col items-center text-center p-3 sm:p-4 rounded-2xl liquid-glass hover:border-black dark:hover:border-white transition-smooth overflow-hidden shadow-subtle hover:shadow-glass"
              >
                <div className="w-14 h-14 sm:w-20 sm:h-20 rounded-xl overflow-hidden mb-2 sm:mb-3 bg-neutral-100 dark:bg-neutral-900 flex items-center justify-center p-1">
                  <img
                    src={cat.image_url || '/placeholder.png'}
                    alt={cat.name}
                    className="w-full h-full object-cover rounded-lg group-hover:scale-110 transition-transform duration-300"
                    loading="lazy"
                  />
                </div>
                <h3 className="text-xs sm:text-sm font-bold text-foreground group-hover:underline line-clamp-1">
                  {displayName}
                </h3>
              </Link>
            );
          })}
        </div>
      </div>
    </section>
  );
}
