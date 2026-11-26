'use client';

import React from 'react';
import { useApp } from '@/lib/context/app-context';
import { PhoneCall } from 'lucide-react';

export function WhatsAppButton() {
  const { settings } = useApp();
  const rawNumber = settings.general.whatsapp || '+8801711223344';
  const cleanNumber = rawNumber.replace(/[^0-9]/g, '');

  const brand = settings?.general?.brand_name || 'NS TechSphere';
  const whatsappUrl = `https://wa.me/${cleanNumber}?text=${encodeURIComponent(
    `Hello ${brand}, I would like to inquire about a product.`
  )}`;

  return (
    <a
      href={whatsappUrl}
      target="_blank"
      rel="noopener noreferrer"
      aria-label="Contact on WhatsApp"
      className="fixed bottom-6 right-6 z-40 flex items-center gap-2.5 px-4 py-3 rounded-full liquid-glass-primary shadow-xl group border border-neutral-700/40"
    >
      <PhoneCall className="w-4 h-4 transition-transform group-hover:scale-110" />
      <span className="text-xs font-semibold tracking-wide">WhatsApp Support</span>
    </a>
  );
}
