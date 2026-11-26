'use client';

import React from 'react';
import { usePathname } from 'next/navigation';
import { TopAnnouncementBar } from '@/components/layout/TopAnnouncementBar';
import { Header } from '@/components/layout/Header';
import { Footer } from '@/components/layout/Footer';
import { CartDrawer } from '@/components/storefront/CartDrawer';
import { WhatsAppButton } from '@/components/layout/WhatsAppButton';

export function StorefrontShell({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  const adminBase = process.env.NEXT_PUBLIC_ADMIN_ROUTE || '/control-room-x7k9';

  // Check if current route is an admin route
  const isAdmin = pathname.startsWith(adminBase) || pathname.startsWith('/control-room');

  if (isAdmin) {
    // Return ONLY the clean admin layout without storefront header, footer, or buttons
    return <div className="min-h-screen w-full">{children}</div>;
  }

  // Storefront customer layout
  return (
    <>
      <TopAnnouncementBar />
      <Header />
      <main className="flex-1 pb-16 md:pb-0">{children}</main>
      <Footer />
      <CartDrawer />
      <WhatsAppButton />
    </>
  );
}
