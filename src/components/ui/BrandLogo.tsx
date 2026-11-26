'use client';

import React from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { useApp } from '@/lib/context/app-context';

interface BrandLogoProps {
  className?: string;
  showTagline?: boolean;
  iconOnly?: boolean;
  size?: 'sm' | 'md' | 'lg' | 'xl';
}

export function BrandLogo({
  className = '',
  showTagline = true,
  iconOnly = false,
  size = 'md',
}: BrandLogoProps) {
  const { settings } = useApp();
  const brandName = settings?.general?.brand_name || 'NS TechSphere';
  const tagline = settings?.general?.tagline || 'Explore the World of Technology.';
  const logoUrl = settings?.general?.logo_url || '/images/ns-logo.jpg';

  const iconSizes = {
    sm: 'w-8 h-8',
    md: 'w-10 h-10 sm:w-11 sm:h-11',
    lg: 'w-14 h-14',
    xl: 'w-20 h-20',
  };

  const textSizes = {
    sm: 'text-sm font-extrabold',
    md: 'text-base sm:text-lg font-black',
    lg: 'text-xl sm:text-2xl font-black',
    xl: 'text-2xl sm:text-3xl font-black',
  };

  return (
    <Link
      href="/"
      className={`flex items-center gap-2.5 group transition-opacity hover:opacity-90 ${className}`}
      aria-label="NS TechSphere Home"
    >
      {/* Official Golden Crest NS Monogram Emblem */}
      <div
        className={`relative ${iconSizes[size]} rounded-full overflow-hidden shrink-0 shadow-sm ring-1 ring-neutral-300 dark:ring-neutral-700 bg-white dark:bg-black flex items-center justify-center p-0.5`}
      >
        <Image
          src={logoUrl}
          alt={brandName}
          width={80}
          height={80}
          className="w-full h-full object-cover rounded-full transition-transform duration-300 group-hover:scale-105"
          priority
        />
      </div>

      {!iconOnly && (
        <div className="flex flex-col min-w-0">
          <div className="flex items-center gap-1">
            <span
              className={`${textSizes[size]} tracking-tight leading-none text-foreground uppercase`}
            >
              NS <span className="text-foreground">TechSphere</span>
            </span>
          </div>
          {showTagline && (
            <span className="text-[9px] sm:text-[10px] tracking-wider text-neutral-500 dark:text-neutral-400 font-medium truncate mt-0.5">
              {tagline}
            </span>
          )}
        </div>
      )}
    </Link>
  );
}
