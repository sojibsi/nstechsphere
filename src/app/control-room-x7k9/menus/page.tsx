'use client';

import React, { useState, useEffect } from 'react';
import { MenuItem } from '@/types';
import { Plus, Trash2, ArrowUpDown, ExternalLink, Menu, X } from 'lucide-react';

export default function AdminMenusPage() {
  const [menus, setMenus] = useState<MenuItem[]>([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [title, setTitle] = useState('');
  const [titleBn, setTitleBn] = useState('');
  const [url, setUrl] = useState('/');

  const loadMenus = () => {
    fetch('/api/menus')
      .then((res) => (res.ok ? res.json() : []))
      .then((data) => setMenus(data));
  };

  useEffect(() => {
    loadMenus();
  }, []);

  const handleAdd = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!title || !url) return;

    await fetch('/api/menus', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        title,
        title_bn: titleBn || title,
        url,
      }),
    });

    setIsModalOpen(false);
    setTitle('');
    setTitleBn('');
    setUrl('/');
    loadMenus();
  };

  const handleDelete = async (id: string) => {
    if (!confirm('Remove this menu link?')) return;
    await fetch(`/api/menus?id=${id}`, { method: 'DELETE' });
    loadMenus();
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between pb-4 border-b border-neutral-200 dark:border-neutral-800">
        <div>
          <h1 className="text-xl sm:text-2xl font-black text-foreground tracking-tight">
            Navigation Menu Builder
          </h1>
          <p className="text-xs text-neutral-400 mt-0.5">
            Configure header and mobile menu items dynamically without editing code.
          </p>
        </div>

        <button
          onClick={() => setIsModalOpen(true)}
          className="flex items-center gap-1.5 px-4 py-2 rounded-xl bg-black text-white dark:bg-white dark:text-black text-xs font-bold uppercase tracking-wider hover:opacity-90"
        >
          <Plus className="w-3.5 h-3.5" />
          <span>Add Menu Item</span>
        </button>
      </div>

      <div className="rounded-2xl border border-neutral-200 dark:border-neutral-800 bg-white dark:bg-neutral-950 overflow-hidden shadow-sm">
        <div className="p-4 border-b border-neutral-200 dark:border-neutral-800 text-xs font-bold text-neutral-400 uppercase tracking-wider">
          Active Storefront Navigation Order
        </div>
        <div className="divide-y divide-neutral-200 dark:divide-neutral-800">
          {menus.map((item, idx) => (
            <div
              key={item.id}
              className="p-4 flex items-center justify-between hover:bg-neutral-50/50 dark:hover:bg-neutral-900/30 text-xs"
            >
              <div className="flex items-center gap-3">
                <span className="w-6 text-center text-neutral-400 font-mono font-bold">
                  {idx + 1}
                </span>
                <div>
                  <div className="font-bold text-foreground">{item.title}</div>
                  <div className="text-[11px] font-bengali text-neutral-400">{item.title_bn}</div>
                </div>
              </div>

              <div className="flex items-center gap-4">
                <span className="font-mono text-neutral-500 bg-neutral-100 dark:bg-neutral-900 px-2 py-0.5 rounded text-[11px]">
                  {item.url}
                </span>
                <button
                  onClick={() => handleDelete(item.id)}
                  className="text-neutral-400 hover:text-red-500 transition-colors p-1"
                >
                  <Trash2 className="w-4 h-4" />
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>

      {isModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm animate-in fade-in duration-200">
          <div className="w-full max-w-md liquid-glass-elevated border border-neutral-300 dark:border-neutral-800 rounded-3xl p-6 space-y-4 shadow-2xl">
            <div className="flex items-center justify-between pb-2 border-b border-neutral-200 dark:border-neutral-800">
              <h2 className="text-sm font-bold">New Navigation Link</h2>
              <button
                onClick={() => setIsModalOpen(false)}
                className="p-1 text-neutral-400 hover:text-foreground"
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            <form onSubmit={handleAdd} className="space-y-3">
              <div>
                <label className="text-xs font-semibold text-neutral-500 block mb-1">
                  Title (English) *
                </label>
                <input
                  type="text"
                  value={title}
                  onChange={(e) => setTitle(e.target.value)}
                  placeholder="e.g. Smart Watches"
                  className="w-full text-xs px-3 py-2 rounded-xl border border-neutral-300 dark:border-neutral-700 bg-background text-foreground outline-none"
                  required
                />
              </div>

              <div>
                <label className="text-xs font-semibold text-neutral-500 block mb-1">
                  Title (Bengali)
                </label>
                <input
                  type="text"
                  value={titleBn}
                  onChange={(e) => setTitleBn(e.target.value)}
                  placeholder="e.g. স্মার্ট ওয়াচ"
                  className="w-full text-xs px-3 py-2 rounded-xl border border-neutral-300 dark:border-neutral-700 bg-background text-foreground outline-none font-bengali"
                />
              </div>

              <div>
                <label className="text-xs font-semibold text-neutral-500 block mb-1">
                  Target Destination URL *
                </label>
                <input
                  type="text"
                  value={url}
                  onChange={(e) => setUrl(e.target.value)}
                  placeholder="e.g. /category/smart-wearables or https://..."
                  className="w-full text-xs px-3 py-2 rounded-xl border border-neutral-300 dark:border-neutral-700 bg-background text-foreground outline-none font-mono"
                  required
                />
              </div>

              <div className="flex justify-end gap-2 pt-3 border-t border-neutral-200 dark:border-neutral-800">
                <button
                  type="button"
                  onClick={() => setIsModalOpen(false)}
                  className="px-4 py-2 rounded-xl border border-neutral-300 dark:border-neutral-700 text-xs font-semibold"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-5 py-2 rounded-xl bg-black text-white dark:bg-white dark:text-black text-xs font-bold uppercase tracking-wider hover:opacity-90"
                >
                  Add Link
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
