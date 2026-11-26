'use client';

import React, { useState, useEffect } from 'react';
import { StaticPage } from '@/types';
import { FileText, Edit2, Check, X } from 'lucide-react';

export default function AdminPagesPage() {
  const [pages, setPages] = useState<StaticPage[]>([
    {
      id: 'p-1',
      title: 'About Us',
      title_bn: 'আমাদের সম্পর্কে',
      slug: 'about-us',
      content: 'Gadget & Gear is the premier tech lifestyle and authentic gadget retailer in Bangladesh.',
      content_bn: 'গ্যাজেট অ্যান্ড গিয়ার বাংলাদেশের শীর্ষস্থানীয় প্রযুক্তি লাইফস্টাইল ও অরিজিনাল ইলেকট্রনিক্স পণ্যের বিশ্বস্ত প্রতিষ্ঠান।',
      is_published: true,
      updated_at: new Date().toISOString(),
    },
    {
      id: 'p-2',
      title: 'Shipping & Delivery Policy',
      title_bn: 'ডেলিভারি পলিসি',
      slug: 'shipping-policy',
      content: 'We offer express 24-48 hours delivery inside Dhaka and 48-72 hours nationwide courier delivery across all 64 districts.',
      content_bn: 'ঢাকার ভেতরে ২৪-৪৮ ঘণ্টার মধ্যে এবং ঢাকার বাইরে সারা বাংলাদেশে ৪৮-৭২ ঘণ্টার মধ্যে নির্ভরযোগ্য কুরিয়ারের মাধ্যমে ডেলিভারি করা হয়।',
      is_published: true,
      updated_at: new Date().toISOString(),
    },
  ]);

  const [editingPage, setEditingPage] = useState<StaticPage | null>(null);
  const [content, setContent] = useState('');
  const [contentBn, setContentBn] = useState('');

  const openEdit = (p: StaticPage) => {
    setEditingPage(p);
    setContent(p.content);
    setContentBn(p.content_bn);
  };

  const handleSave = () => {
    if (!editingPage) return;
    setPages(
      pages.map((p) =>
        p.id === editingPage.id ? { ...p, content, content_bn: contentBn } : p
      )
    );
    setEditingPage(null);
  };

  return (
    <div className="space-y-6">
      <div className="pb-4 border-b border-neutral-200 dark:border-neutral-800">
        <h1 className="text-xl sm:text-2xl font-black text-foreground tracking-tight">
          Website Content Management (CMS)
        </h1>
        <p className="text-xs text-neutral-400 mt-0.5">
          Manage bilingual legal policies, return terms, and corporate information pages.
        </p>
      </div>

      <div className="space-y-3">
        {pages.map((p) => (
          <div
            key={p.id}
            className="p-5 rounded-2xl border border-neutral-200 dark:border-neutral-800 bg-white dark:bg-neutral-950 flex items-center justify-between"
          >
            <div>
              <h3 className="text-xs font-bold text-foreground">{p.title}</h3>
              <p className="text-xs font-bengali text-neutral-400">{p.title_bn}</p>
              <span className="font-mono text-[10px] text-neutral-400 block mt-1">/{p.slug}</span>
            </div>

            <button
              onClick={() => openEdit(p)}
              className="px-3.5 py-1.5 rounded-xl border border-neutral-300 dark:border-neutral-700 hover:bg-neutral-100 dark:hover:bg-neutral-900 text-xs font-semibold flex items-center gap-1.5"
            >
              <Edit2 className="w-3.5 h-3.5" />
              <span>Edit Page</span>
            </button>
          </div>
        ))}
      </div>

      {editingPage && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm animate-in fade-in duration-200">
          <div className="w-full max-w-2xl max-h-[90vh] overflow-y-auto liquid-glass-elevated border border-neutral-300 dark:border-neutral-800 rounded-3xl p-6 sm:p-8 space-y-4 shadow-2xl">
            <div className="flex items-center justify-between pb-2 border-b border-neutral-200 dark:border-neutral-800">
              <h2 className="text-sm font-bold">Edit Page: {editingPage.title}</h2>
              <button
                onClick={() => setEditingPage(null)}
                className="p-1 text-neutral-400 hover:text-foreground"
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            <div className="space-y-3">
              <div>
                <label className="text-xs font-semibold text-neutral-500 block mb-1">
                  Content (English)
                </label>
                <textarea
                  value={content}
                  onChange={(e) => setContent(e.target.value)}
                  rows={4}
                  className="w-full text-xs px-3 py-2 rounded-xl border border-neutral-300 dark:border-neutral-700 bg-background text-foreground outline-none resize-none"
                />
              </div>

              <div>
                <label className="text-xs font-semibold text-neutral-500 block mb-1">
                  Content (Bengali)
                </label>
                <textarea
                  value={contentBn}
                  onChange={(e) => setContentBn(e.target.value)}
                  rows={4}
                  className="w-full text-xs px-3 py-2 rounded-xl border border-neutral-300 dark:border-neutral-700 bg-background text-foreground outline-none font-bengali resize-none"
                />
              </div>
            </div>

            <div className="flex justify-end gap-2 pt-3 border-t border-neutral-200 dark:border-neutral-800">
              <button
                type="button"
                onClick={() => setEditingPage(null)}
                className="px-4 py-2 rounded-xl border border-neutral-300 dark:border-neutral-700 text-xs font-semibold"
              >
                Cancel
              </button>
              <button
                type="button"
                onClick={handleSave}
                className="px-5 py-2 rounded-xl bg-black text-white dark:bg-white dark:text-black text-xs font-bold uppercase tracking-wider hover:opacity-90"
              >
                Save Changes
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
