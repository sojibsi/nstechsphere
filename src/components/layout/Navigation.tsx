'use client';

import React, { useEffect, useState } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useApp } from '@/lib/context/app-context';
import { MenuItem } from '@/types';
import { Menu, X, ChevronDown } from 'lucide-react';

export function Navigation() {
  const [menus, setMenus] = useState<MenuItem[]>([]);
  const [isMobileOpen, setIsMobileOpen] = useState(false);
  const pathname = usePathname();
  const { language } = useApp();

  useEffect(() => {
    fetch('/api/menus')
      .then((res) => (res.ok ? res.json() : []))
      .then((data) => setMenus(data))
      .catch(() => {});
  }, []);

  return (
    <nav className="w-full border-b border-neutral-200/60 dark:border-neutral-800/60 bg-white/70 dark:bg-black/70 backdrop-blur-md">
      <div className="w-full px-4 sm:px-6 lg:px-8 xl:px-12 2xl:px-16">
        <div className="flex items-center justify-between h-11">
          {/* Desktop Nav Items */}
          <div className="hidden md:flex items-center space-x-1 lg:space-x-4 overflow-x-auto no-scrollbar">
            {menus.map((item) => {
              const isActive = pathname === item.url;
              const title = language === 'bn' ? item.title_bn || item.title : item.title;
              return (
                <Link
                  key={item.id}
                  href={item.url}
                  className={`px-3 py-1.5 rounded-md text-xs font-medium tracking-wide transition-colors whitespace-nowrap ${
                    isActive
                      ? 'bg-black text-white dark:bg-white dark:text-black font-semibold'
                      : 'text-neutral-600 dark:text-neutral-400 hover:text-foreground hover:bg-neutral-100 dark:hover:bg-neutral-900'
                  }`}
                >
                  {title}
                </Link>
              );
            })}
          </div>

          {/* Mobile Menu Button */}
          <div className="flex md:hidden items-center justify-between w-full">
            <span className="text-xs font-semibold text-neutral-400 uppercase tracking-widest">
              Navigation
            </span>
            <button
              onClick={() => setIsMobileOpen(!isMobileOpen)}
              className="p-1.5 rounded-lg border border-neutral-200 dark:border-neutral-800 text-neutral-600 dark:text-neutral-300"
              aria-label="Toggle Navigation Menu"
            >
              {isMobileOpen ? <X className="w-4 h-4" /> : <Menu className="w-4 h-4" />}
            </button>
          </div>
        </div>

        {/* Mobile Nav Drawer */}
        {isMobileOpen && (
          <div className="md:hidden py-3 space-y-1 border-t border-neutral-200 dark:border-neutral-800 animate-in fade-in slide-in-from-top-2 duration-150">
            {menus.map((item) => {
              const isActive = pathname === item.url;
              const title = language === 'bn' ? item.title_bn || item.title : item.title;
              return (
                <Link
                  key={item.id}
                  href={item.url}
                  onClick={() => setIsMobileOpen(false)}
                  className={`block px-3 py-2 rounded-lg text-xs font-medium transition-colors ${
                    isActive
                      ? 'bg-black text-white dark:bg-white dark:text-black'
                      : 'text-neutral-600 dark:text-neutral-400 hover:bg-neutral-100 dark:hover:bg-neutral-900'
                  }`}
                >
                  {title}
                </Link>
              );
            })}
          </div>
        )}
      </div>
    </nav>
  );
}
